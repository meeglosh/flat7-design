import { chromium } from 'playwright';
import path from 'path';

const OUT_DIR = path.resolve('public/thumbnails');

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();

  console.log('Loading decathlon...');
  await page.goto('https://www.decathlon.ca/en', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(2000);

  // Dismiss cookie consent dialog
  const acceptBtn = page.getByRole('button', { name: /agree and close/i });
  if (await acceptBtn.isVisible()) {
    console.log('Dismissing cookie dialog...');
    await acceptBtn.click();
    await page.waitForTimeout(1000);
  }

  await page.screenshot({
    path: path.join(OUT_DIR, 'decathlon.png'),
    clip: { x: 0, y: 0, width: 1280, height: 800 },
  });
  console.log('✓ saved');
  await browser.close();
}

main().catch(console.error);
