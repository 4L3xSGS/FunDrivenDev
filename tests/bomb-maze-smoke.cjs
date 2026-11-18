// Smoke test without external dependencies: executes the real inline game script in a mocked browser.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('games/bomb-maze/index.html','utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(script,'game script exists');
const listeners={},buttons={};
const canvasContext=new Proxy({},{get:(target,prop)=>prop in target?target[prop]:()=>{} ,set:(target,prop,value)=>{target[prop]=value;return true}});
const canvas={getContext:()=>canvasContext};
const element=id=>buttons[id]??=( {textContent:'',dataset:{},setAttribute(k,v){this[k]=v},addEventListener(k,fn){this[k]=fn}} );
const directions=['0,-1','-1,0','0,1','1,0'].map(dir=>({dataset:{dir},addEventListener(k,fn){this[k]=fn}}));
let now=1000,frame=null,oscillators=0;
class Oscillator{constructor(){this.frequency={setValueAtTime(){},exponentialRampToValueAtTime(){}}}connect(){}start(){oscillators++}stop(){}}
class Gain{constructor(){this.gain={setValueAtTime(){},exponentialRampToValueAtTime(){}}}connect(){}}
class AudioContext{constructor(){this.currentTime=0;this.state='running';this.destination={}}createOscillator(){return new Oscillator()}createGain(){return new Gain()}}
const document={querySelector(sel){return sel==='canvas'?canvas:sel==='#stats'?element('stats'):element(sel.slice(1))},querySelectorAll:()=>directions,addEventListener(k,fn){listeners[k]=fn}};
const context={document,performance:{now:()=>now},requestAnimationFrame(fn){frame=fn},AudioContext,Math,console};
vm.runInNewContext(script,context,{timeout:3000});
const tick=delta=>{now+=delta;assert.ok(frame,'animation loop scheduled');frame(now)};
const key=(key,code)=>listeners.keydown({key,code,preventDefault(){}});
assert.match(element('stats').textContent,/❤ 3/);
tick(20);assert.match(element('stats').textContent,/👾 3/);
key('ArrowRight','ArrowRight');key(' ','Space');tick(1950);
assert.ok(element('stats').textContent.includes('★'),'HUD updated after explosion');
element('sound').onclick();assert.equal(element('sound')['aria-pressed'],'true');
key(' ','Space');assert.ok(oscillators>0,'sound oscillator started');
element('sound').onclick();assert.equal(element('sound')['aria-pressed'],'false');
directions[0].click();element('bomb').onclick();tick(2000);
key('r','KeyR');tick(16);assert.match(element('stats').textContent,/❤ 3/);
element('restart').onclick();tick(16);assert.match(element('stats').textContent,/👾 3/);
console.log('OK: render loop, HUD, keyboard, touch controls, bombs, restart, audio toggle and oscillator');
