import {chromium} from 'playwright';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
for(const mode of ['frame-failure','no-js','reduced','normal']){
 const page=await browser.newPage({viewport:{width:390,height:844},javaScriptEnabled:mode!=='no-js',reducedMotion:mode==='reduced'?'reduce':'no-preference'});
 await page.addInitScript(()=>{Element.prototype.requestPointerLock=()=>{};Element.prototype.setPointerCapture=()=>{};});
 if(mode==='frame-failure') await page.route('**/assets/sequence-mobile/*.webp',route=>route.abort());
 const requests=[];page.on('request',r=>requests.push(r.url()));const errs=[];page.on('pageerror',e=>errs.push(e.message));
 await page.goto('http://127.0.0.1:4540/spasynth/',{waitUntil:'networkidle'});
 await page.locator('#teardown').scrollIntoViewIfNeeded();await page.waitForTimeout(1200);
 const state=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,poster:[...document.querySelectorAll('#synth-stage img')].every(i=>i.complete&&i.naturalWidth>0),ready:document.querySelector('#synth-stage').dataset.modelReady,heading:document.querySelector('#hero-title').textContent}));
 if(mode==='normal'){
  await page.locator('#listening').scrollIntoViewIfNeeded();
  await page.evaluate(async()=>{const a=[...document.querySelectorAll('audio')];await a[0].play();await new Promise(r=>setTimeout(r,200));await a[1].play();});
  state.audio=await page.evaluate(()=>[...document.querySelectorAll('audio')].map(a=>({paused:a.paused,duration:a.duration,error:a.error?.code})));
  await page.locator('a[href="#matrix-note"]').first().click();await page.waitForTimeout(1000);
  state.nav=await page.locator('#module-label').textContent();
 }
 console.log(mode,JSON.stringify({...state,sequenceRequests:requests.filter(u=>/sequence(-mobile)?\/frame/.test(u)).length,errs}));
 await page.screenshot({path:`scrollcraft/builds/spasynth/lab/fallback-${mode}.png`});await page.close();
}
const p=await browser.newPage();const response=await p.request.get('http://127.0.0.1:4540/spasynth',{maxRedirects:0});console.log('route',response.status(),response.headers().location);
await browser.close();
