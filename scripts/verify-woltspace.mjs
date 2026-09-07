import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const url=process.env.WOLTSPACE_URL || 'http://localhost:4550/woltspace/';
const out='scrollcraft/builds/woltspace/lab/functional';
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const reports=[];
for(const config of [{name:'desktop',width:1440,height:900},{name:'mobile',width:390,height:844},{name:'compact',width:360,height:640},{name:'reduced',width:1440,height:900,reducedMotion:'reduce'},{name:'nojs',width:390,height:844,javaScriptEnabled:false}]){
 const context=await browser.newContext({viewport:{width:config.width,height:config.height},reducedMotion:config.reducedMotion,javaScriptEnabled:config.javaScriptEnabled});
 await context.addInitScript(()=>{Element.prototype.requestPointerLock=()=>Promise.reject(new Error('disabled'));Element.prototype.setPointerCapture=()=>{};Element.prototype.releasePointerCapture=()=>{};});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(url);await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:`${out}/${config.name}-opening.png`});
 assert.match(await page.title(),/Woltspace/);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${config.name} overflow`);
 for(const selector of ['#challenge','#setup','#crazier','#workspace','#explore','.closing']){
  await page.locator(selector).scrollIntoViewIfNeeded();await page.waitForTimeout(350);
  assert.equal(await page.locator(selector).isVisible(),true);
 }
 if(config.javaScriptEnabled!==false){
  await page.locator('[data-step="1"]').click();await page.waitForTimeout(100);
  assert.match(await page.locator('#step-copy').textContent(),/local copy/);
  await page.locator('[data-step="2"]').click();assert.match(await page.locator('#step-title').textContent(),/destination/);
  for(const key of ['workflow','terminal','workspace']){await page.locator(`[data-view="${key}"]`).click();await page.locator('#view-image').evaluate(img=>img.decode());assert.match(await page.locator('#view-image').getAttribute('src'),new RegExp(key));}
  await page.locator('#crazy-toggle').scrollIntoViewIfNeeded();
  const before=await page.locator('#crazy-toggle').getAttribute('aria-pressed');
  await page.locator('#crazy-toggle').click();assert.notEqual(await page.locator('#crazy-toggle').getAttribute('aria-pressed'),before);
  if(await page.locator('#crazy-toggle').getAttribute('aria-pressed')==='false') await page.locator('#crazy-toggle').click();
  await page.waitForTimeout(350);
  await page.screenshot({path:`${out}/${config.name}-crazy.png`});
  await page.locator('#workspace').scrollIntoViewIfNeeded();assert.equal(await page.locator('#crazy-toggle').getAttribute('aria-pressed'),'true','Manual choice survives scrolling');
  await page.locator('#crazy-toggle').focus();await page.keyboard.press('Space');assert.equal(await page.locator('#crazy-toggle').getAttribute('aria-pressed'),'false');
  const ring=await page.locator('#crazy-toggle').evaluate(b=>getComputedStyle(b).outlineStyle);assert.notEqual(ring,'none');
 }
 await page.locator('.closing').scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/${config.name}-ending.png`});
 const broken=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src));assert.deepEqual(broken,[]);
 assert.deepEqual(errors,[]);reports.push({name:config.name,overflow:false,brokenImages:broken,errors});await context.close();
}
const context=await browser.newContext({viewport:{width:1440,height:980}});
await context.addInitScript(()=>{Element.prototype.requestPointerLock=()=>{};Element.prototype.setPointerCapture=()=>{};});
const page=await context.newPage();await page.goto(new URL('prototype.html',url).href);
const frame=page.frameLocator('iframe');
await frame.locator('#ob-name').fill('Cedar');await frame.locator('#ob-cta').click();await page.waitForTimeout(650);
assert.equal(await frame.locator('#onboarding').isVisible(),false);
assert.match(await frame.locator('body').innerText(),/Cedar/);
await frame.locator('#waking-view .pd-back-btn').click();
await frame.locator('#nav-projects').click();await frame.locator('.project-card').filter({hasText:'Creatorspace'}).first().click();await page.waitForTimeout(200);
const inner=page.frames().find(f=>f.url().includes('/prototype/index.html'));
await frame.locator('#project-detail .pd-back-btn').click();
await frame.locator('a[onclick="toggleTerminal(event)"]').click();
await frame.locator('.connectors-toggle').click();
await page.waitForTimeout(450);
assert.equal(await frame.locator('#terminal-panel').evaluate(e=>e.classList.contains('open')),true);
assert.equal(await frame.locator('#connectors-list').evaluate(e=>e.classList.contains('open')),true);
await page.screenshot({path:`${out}/prototype-terminal-connectors.png`});
reports.push({name:'prototype',createdWolt:'Cedar',projectOpened:true,terminal:true,connectors:true});
await fs.writeFile(`${out}/report.json`,JSON.stringify(reports,null,2));
console.log(JSON.stringify(reports,null,2));await browser.close();
