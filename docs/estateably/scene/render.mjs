// Renders the eight worldflight legs from world.html by stepping the global
// time parameter T and screenshotting each frame at 30fps, then leaves
// ffmpeg assembly to render.sh.
import { chromium } from 'playwright-core';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const LEGS = process.env.LEGS ? process.env.LEGS.split(',').map(Number) : [0,1,2,3,4,5,6,7];
const SECONDS = { 6: 9 };
const FPS = 30;

async function renderOrientation(orientation, w, h){
  const browser = await chromium.launch({ executablePath: CHROME, args: ['--autoplay-policy=no-user-gesture-required'] });
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.addInitScript(() => { Element.prototype.requestPointerLock = () => {}; Element.prototype.setPointerCapture = () => {}; });
  const url = 'file://' + path.join(__dirname, 'world.html') + '?o=' + orientation;
  await page.goto(url);
  await page.waitForFunction(() => window.sceneReady !== undefined);
  try {
    await page.evaluate(() => window.sceneReady);
  } catch (err) {
    console.error(`[${orientation}] scene failed to become ready:`, err.message);
    throw err;
  }
  const fontsOk = await page.evaluate(() => window.__fontsOk === true);
  if (!fontsOk) {
    throw new Error(`[${orientation}] fonts did not load before first frame: ` +
      (await page.evaluate(() => window.__fontLoadError || 'unknown')));
  }
  console.log(`[${orientation}] fonts confirmed loaded (DM Mono, Manrope 400/600/800)`);

  for (const leg of LEGS){
    const secs = SECONDS[leg] || 7;
    const frames = Math.round(secs * FPS);
    const dir = path.join(__dirname, 'frames', orientation, 'leg' + leg);
    fs.mkdirSync(dir, { recursive: true });
    console.log(`[${orientation}] leg ${leg}: ${frames} frames over ${secs}s`);
    for (let f = 0; f < frames; f++){
      const T = leg + (f / (frames - 1)) * (0.999999);
      await page.evaluate((t) => window.setT(t), T);
      // let the seek promise (if any) settle and paint
      await page.waitForTimeout(0);
      const fname = path.join(dir, String(f).padStart(4,'0') + '.png');
      await page.screenshot({ path: fname });
    }
  }
  await browser.close();
}

const which = process.argv[2] || 'both';
(async () => {
  if (which === 'desktop' || which === 'both') await renderOrientation('landscape', 1280, 720);
  if (which === 'mobile' || which === 'both') await renderOrientation('portrait', 720, 1280);
  console.log('done');
})();
