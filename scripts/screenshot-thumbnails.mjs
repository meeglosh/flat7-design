import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const PROJECTS = [
  { name: 'onix',        url: 'https://onix.life' },
  { name: 'soluna',      url: 'https://solunaapp.com' },
  { name: 'wingman',     url: 'https://wingman.design' },
  { name: 'woltspace',   url: 'https://woltspace.com' },
  { name: 'signal-desk', url: 'https://signaldeskpro.com' },
  { name: 'decathlon',   url: 'https://www.decathlon.ca/en' },
  { name: 'hololabs',    url: 'https://hololabs.org' },
  { name: 'bandsintown', url: 'https://www.artist.bandsintown.com' },
  { name: 'flashtract',  url: 'https://flashtract.com' },
  { name: 'estateably',  url: 'https://www.estateably.com' },
];

const OUT_DIR = path.resolve('public/thumbnails');

async function screenshot(page, name, url) {
  console.log(`  → ${name}: ${url}`);
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(OUT_DIR, `${name}.png`),
      clip: { x: 0, y: 0, width: 1280, height: 800 },
    });
    console.log(`    ✓ saved`);
  } catch (err) {
    console.error(`    ✗ failed: ${err.message}`);
  }
}

async function main() {
  if (!existsSync(OUT_DIR)) await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();

  for (const { name, url } of PROJECTS) {
    await screenshot(page, name, url);
  }

  await browser.close();
  console.log(`\nDone. Thumbnails saved to ${OUT_DIR}`);
}

main().catch(console.error);
