import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';

// A partial render set cannot validate the finished scroll experience.
for (const variant of ['sequence','sequence-mobile']) {
 for(let frame=0;frame<=180;frame++) {
  const file=`public/spasynth/assets/${variant}/frame-${String(frame).padStart(3,'0')}.webp`;
  try { assert((await fs.stat(file)).size>0); }
  catch { throw new Error(`Final sequence verification is waiting for rendered asset: ${file}`); }
 }
}
const root='scrollcraft/builds/spasynth/lab';await fs.mkdir(root,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--disable-dev-shm-usage']});
try {
for(const [name,width,height,reduced] of [['desktop',1440,1000,false],['mobile',390,844,false],['compact',360,640,false],['reduced',1440,1000,true]]){
 const page=await browser.newPage({viewport:{width,height},reducedMotion:reduced?'reduce':'no-preference'});
 await page.addInitScript(()=>{Element.prototype.requestPointerLock=()=>{};Element.prototype.setPointerCapture=()=>{};});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4540/spasynth/',{waitUntil:'networkidle'});
 await page.evaluate(()=>document.fonts.ready);
 await page.waitForFunction(()=>document.documentElement.classList.contains('sc-ready'));
 await page.screenshot({path:`${root}/${name}-hero.png`});
 const samples=[];
 for(const p of [0,.17,.40,.68,.79,.93,1,.40,.17]){
  await page.evaluate(({p,reduced})=>{
   const e=document.querySelector('#teardown');
   if(reduced){scrollTo({top:e.offsetTop,behavior:'instant'});return;}
   // Invert the same content landmarks used by page.js. These are semantic
   // animation positions, not equally spaced fractions of the document.
   const top=e.getBoundingClientRect().top;
   const line=innerHeight*(innerWidth<=650?.58:.5);
   const positions=[0,...['chaos-note','matrix-note','native-note','reassembly-note'].map(id=>document.querySelector('#'+id+' .note-content').getBoundingClientRect().top-top-line),e.offsetHeight-innerHeight];
   const stops=[0,.26,.51,.72,.82,1];let distance=positions.at(-1);
   for(let i=0;i<stops.length-1;i++)if(p>=stops[i]&&p<=stops[i+1]){distance=positions[i]+(positions[i+1]-positions[i])*(p-stops[i])/(stops[i+1]-stops[i]);break;}
   scrollTo({top:e.offsetTop+distance,behavior:'instant'});
  },{p,reduced});
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  try {
   if(reduced) {
    await page.waitForFunction(()=>{const s=document.querySelector('#synth-stage'),i=s.querySelector('img');return s.dataset.modelReady==='poster'&&i.getAttribute('src').endsWith('studio-exploded.webp')&&i.complete&&i.naturalWidth>0;});
   } else {
    await page.waitForFunction(()=>{const s=document.querySelector('#synth-stage');return s.dataset.modelReady==='true'&&Number(s.dataset.targetFrame)>=0&&s.dataset.targetFrame===s.dataset.displayedFrame;},{},{timeout:30000});
   }
  } catch(error) {
   await page.screenshot({path:`${root}/${name}-frame-wait-failed.png`});
   throw new Error(`${name} p=${p}: exact target was not displayed. ${await page.locator('#synth-stage').getAttribute('data-sc-verify-state')}`,{cause:error});
  }
  const state=await page.locator('#synth-stage').getAttribute('data-sc-verify-state');
  samples.push({progress:p,state});
  await page.screenshot({path:`${root}/${name}-${String(p).replace('.','_')}.png`});
 }
 // Load the actual software screenshot before classifying lazy images as broken.
 await page.locator('#build').scrollIntoViewIfNeeded();
 await page.locator('.interface-figure img').evaluate(img=>img.decode());
 const result=await page.evaluate(()=>({ready:document.querySelector('#synth-stage').dataset.modelReady,overflow:document.documentElement.scrollWidth>innerWidth,broken:[...document.images].filter(x=>!x.complete||!x.naturalWidth).map(x=>x.src),state:document.querySelector('#synth-stage').dataset.scVerifyState}));
 assert.equal(result.overflow,false,`${name}: horizontal overflow`);assert.deepEqual(result.broken,[],`${name}: broken images`);assert.deepEqual(errors,[],`${name}: JavaScript errors`);
 await fs.writeFile(`${root}/${name}-sequence-results.json`,JSON.stringify({...result,samples,errors},null,2));
 console.log(name,JSON.stringify({...result,samples,errors}));await page.close();
}
} finally {await browser.close();}
