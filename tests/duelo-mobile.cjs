// Run with playwright-core on NODE_PATH and a local Chromium or Google Chrome.
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright-core');

const game = pathToFileURL(path.resolve('jogos/duelo-de-tanques/index.html')).href;
const catalog = pathToFileURL(path.resolve('index.html')).href;

async function center(page, selector) {
  const target = page.locator(selector);
  await target.evaluate(node => node.scrollIntoView({block:'nearest',inline:'nearest'}));
  const box = await target.boundingBox();
  assert.ok(box, selector + ' deve estar visível');
  return { x: box.x + box.width/2, y: box.y + box.height/2 };
}
async function tap(page, selector) {
  const { x, y } = await center(page, selector);
  await page.touchscreen.tap(x, y);
}
async function checkLayout(page, orientation) {
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  for (const selector of ['#arena', '#stick', '#fire', '#pause']) {
    const b = await page.locator(selector).boundingBox();
    assert.ok(b && b.x >= -1 && b.y >= -1 && b.x+b.width <= page.viewportSize().width+1 &&
      b.y+b.height <= page.viewportSize().height+1, selector + ' deve caber na tela');
    assert.ok(b.width >= 44 && b.height >= 44, selector + ' deve ser grande o suficiente');
  }
  const b = await page.locator('#arena').boundingBox();
  assert.equal(b.height>b.width,orientation==='portrait');
}

async function mobileRound(browser) {
  const context = await browser.newContext({viewport:{width:360,height:740}, deviceScaleFactor:2, hasTouch:true, isMobile:true});
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(catalog);
  await page.locator('a[href="jogos/duelo-de-tanques/index.html"]').tap();
  await page.waitForURL(game);
  await page.clock.install({time:new Date('2026-01-01T00:00:00Z')});
  await page.clock.pauseAt(new Date('2026-01-01T00:00:01Z'));
  await page.clock.runFor(32);
  const cdp = await context.newCDPSession(page);
  const touches = (type, touchPoints) => cdp.send('Input.dispatchTouchEvent',{type,touchPoints});
  await checkLayout(page,'portrait');
  await tap(page,'#primary');
  assert.equal(await page.evaluate(() => phase), 'playing');
  const stick = await center(page,'#stick'), fire = await center(page,'#fire');
  const drivePoint = {x:stick.x,y:stick.y-22,id:1}, firePoint = {...fire,id:2};
  await touches('touchStart',[{...stick,id:1}]);
  await touches('touchMove',[drivePoint]);
  await touches('touchStart',[drivePoint,firePoint]);
  await page.clock.runFor(450);
  const moved = await page.evaluate(() => ({x:tanks[0].x,y:tanks[0].y,shots:bullets.filter(b=>b.owner===0 && b.kind==='tank').length}));
  assert.ok(moved.x>185 && Math.abs(moved.y-250)<1,'polegar para cima avança na tela vertical');
  assert.equal(moved.shots,1,'o segundo dedo dispara durante o movimento');
  await page.clock.runFor(1200);
  assert.ok(await page.evaluate(() => playerReady>2.9),'segurar dispara novamente após a recarga');
  await touches('touchEnd',[]);
  const stopped = await page.evaluate(() => [tanks[0].x,tanks[0].y,drive.id,fireId]);
  await page.clock.runFor(120);
  assert.deepEqual(await page.evaluate(() => [tanks[0].x,tanks[0].y,drive.id,fireId]),stopped);
  assert.deepEqual(stopped.slice(2),[null,null]);

  await tap(page,'#pause');
  const frozen = await page.evaluate(() => [time,rescue.phase,bullets.length]);
  await page.clock.runFor(500);
  assert.deepEqual(await page.evaluate(() => [time,rescue.phase,bullets.length]),frozen);
  await page.setViewportSize({width:740,height:360});
  await page.clock.runFor(48);
  await checkLayout(page,'landscape');
  await tap(page,'#restart');
  assert.deepEqual(await page.evaluate(() => [mode,tanks[0].hp,tanks[0].x,bullets.length]),['solo',100,145,0]);
  const landscapeStick = await center(page,'#stick');
  await touches('touchStart',[{x:landscapeStick.x+20,y:landscapeStick.y,id:3}]);
  await page.clock.runFor(250);
  assert.ok(await page.evaluate(() => tanks[0].x>160));
  await touches('touchCancel',[]);
  assert.equal(await page.evaluate(() => drive.id),null);
  await page.evaluate(() => window.dispatchEvent(new Event('blur')));
  assert.equal(await page.evaluate(() => phase),'paused');
  await tap(page,'#primary');

  // Set up repeatable impacts, then exercise the real projectile and end-of-round paths.
  const hit = () => page.evaluate(() => {
    const rival=tanks[1];
    bullets=[{x:rival.x,y:rival.y,vx:260,vy:0,owner:0,kind:'tank',radius:4}];
    update(STEP);
    updateHud();
    return rival.hp;
  });
  assert.equal(await hit(),50);
  assert.equal(await page.locator('#orangeHp').textContent(),'50%');
  assert.equal(await hit(),0);
  assert.equal(await page.locator('#status').textContent(),'Você venceu!');
  await tap(page,'#primary');
  assert.equal(await page.evaluate(() => tanks[1].hp),100);
  await tap(page,'#pause'); await tap(page,'#secondary'); await tap(page,'#secondary');
  assert.equal(await page.evaluate(() => mode),'auto');
  await page.clock.runFor(1650);
  assert.ok(await page.evaluate(() => nextShot===3 && tanks[0].x!==145));
  assert.equal(await page.locator('#fire').isDisabled(),true);
  assert.equal(await hit(),0,'um tiro de tanque encerra o duelo da simulação original');
  for (const size of [{width:320,height:568},{width:568,height:320},{width:412,height:915}]) {
    await page.setViewportSize(size);
    await page.clock.runFor(48);
    await checkLayout(page,size.width<size.height?'portrait':'landscape');
    const primary = await center(page,'#primary');
    assert.equal(await page.evaluate(({x,y}) => document.elementFromPoint(x,y)?.id,primary),'primary');
  }
  assert.deepEqual(errors,[]);
  await context.close();
}
async function desktopRound(browser) {
  const page = await browser.newPage({viewport:{width:1280,height:800}});
  await page.goto(game);
  await page.getByRole('button',{name:'Pilotar o azul'}).click();
  await page.keyboard.down('ArrowRight'); await page.keyboard.down('Space');
  await page.waitForFunction(() => tanks[0].x>160 && playerReady>0);
  await page.keyboard.up('ArrowRight'); await page.keyboard.up('Space');
  await page.keyboard.press('p');
  assert.equal(await page.evaluate(() => phase),'paused');
  await page.keyboard.press('Escape');
  assert.equal(await page.evaluate(() => phase),'playing');
  await page.close();
}
(async()=>{
  const browser = await chromium.launch({executablePath:process.env.CHROME_BIN || '/usr/bin/google-chrome',args:['--no-sandbox']});
  try { await mobileRound(browser); await desktopRound(browser); console.log('OK: multitoque, recarga, rotação, pausa, revanche, simulação e teclado.'); }
  finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode=1 });
