// Smoke test without external dependencies: executes the real inline game script in a mocked browser.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('games/bomb-maze/index.html','utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(script,'game script exists');
const listeners={},buttons={};
const canvasContext=new Proxy({},{get:(target,prop)=>prop in target?target[prop]:()=>{} ,set:(target,prop,value)=>{target[prop]=value;return true}});
const canvas={getContext:()=>canvasContext};
const element=id=>buttons[id]??=( {textContent:'',dataset:{},style:{},setAttribute(k,v){this[k]=v},addEventListener(k,fn){this[k]=fn},getBoundingClientRect(){return {left:0,top:0,width:148,height:148}},setPointerCapture(){}} );
const directions=['0,-1','-1,0','0,1','1,0'].map(dir=>({dataset:{dir},addEventListener(k,fn){this[k]=fn}}));
let now=1000,frame=null,oscillators=0;
class Oscillator{constructor(){this.frequency={setValueAtTime(){},exponentialRampToValueAtTime(){}}}connect(){}start(){oscillators++}stop(){}}
class Gain{constructor(){this.gain={setValueAtTime(){},exponentialRampToValueAtTime(){}}}connect(){}}
class AudioContext{constructor(){this.currentTime=0;this.state='running';this.destination={}}createOscillator(){return new Oscillator()}createGain(){return new Gain()}}
const document={querySelector(sel){return sel==='canvas'?canvas:sel==='#stats'?element('stats'):element(sel.slice(1))},querySelectorAll:()=>directions,addEventListener(k,fn){listeners[k]=fn}};
const moves=[];const context={document,window:{AudioContext},performance:{now:()=>now},requestAnimationFrame(fn){frame=fn},AudioContext,Math,console,__moves:moves};
vm.runInNewContext(script.replace('function move(dx,dy){','function move(dx,dy){globalThis.__moves.push([dx,dy]);'),context,{timeout:3000});
const tick=delta=>{now+=delta;assert.ok(frame,'animation loop scheduled');frame(now)};
const key=(key,code)=>listeners.keydown({key,code,preventDefault(){}});
tick(20);
assert.match(element('stats').textContent,/❤ 3/);assert.match(element('stats').textContent,/👾 3/);
key('ArrowRight','ArrowRight');key(' ','Space');tick(1950);
assert.ok(element('stats').textContent.includes('★'),'HUD updated after explosion');
element('sound').onclick();assert.equal(element('sound')['aria-pressed'],'true');
key(' ','Space');assert.ok(oscillators>0,'sound oscillator started');
element('sound').onclick();assert.equal(element('sound')['aria-pressed'],'false');
const joystick=element('joystick');
const pointer=(name,x,y,id=1)=>joystick[name]({pointerId:id,clientX:x,clientY:y});
let count=moves.length;
pointer('pointerdown',76,74);tick(400);
assert.equal(moves.length,count,'dead zone must not move');
pointer('pointermove',120,74);assert.deepEqual(Array.from(moves.at(-1)),[1,0],'right gesture moves right');
count=moves.length;tick(160);tick(160);
assert.ok(moves.length>=count+2,'holding joystick repeats movement');
pointer('pointermove',74,15);assert.deepEqual(Array.from(moves.at(-1)),[1,0],'direction changes on next scheduled step');
tick(160);assert.deepEqual(Array.from(moves.at(-1)),[0,-1],'up gesture moves up');
count=moves.length;pointer('pointermove',74,74);tick(300);
assert.equal(moves.length,count,'return to dead zone stops movement');
pointer('pointermove',20,74);tick(160);
pointer('pointerup',20,74);
assert.equal(element('stick').style.transform,'translate(-50%,-50%)','joystick recenters after release');
count=moves.length;tick(400);assert.equal(moves.length,count,'release stops movement');
pointer('pointerdown',74,120,2);pointer('pointercancel',74,120,2);
count=moves.length;tick(400);assert.equal(moves.length,count,'pointer cancellation stops movement');
element('bomb').onclick();tick(2000);
key('r','KeyR');tick(16);assert.match(element('stats').textContent,/❤ 3/);
element('restart').onclick();tick(16);assert.match(element('stats').textContent,/👾 3/);
console.log('OK: render loop, HUD, keyboard, analog continuous motion, dead zone, release, cancel, bombs, restart, audio toggle and oscillator');
