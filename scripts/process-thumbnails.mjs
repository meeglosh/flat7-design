import { createCanvas, loadImage } from 'canvas';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const SRC_DIR = path.resolve('public/thumbnails');
const MYSPACE_DIR = path.resolve('public/thumbnails/myspace');
const MIDCENTURY_DIR = path.resolve('public/thumbnails/midcentury');

const PROJECTS = [
  'onix', 'soluna', 'wingman', 'woltspace', 'signal-desk',
  'decathlon', 'hololabs', 'bandsintown', 'flashtract', 'estateably',
];

async function cropSquare(img, size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const s = Math.min(img.width, img.height);
  const sx = Math.round((img.width - s) / 2);
  const sy = 0; // crop from top for websites
  ctx.drawImage(img, sx, sy, s, s, 0, 0, size, size);
  return canvas.toBuffer('image/png');
}

async function resize(img, w, h) {
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, w, h);
  return canvas.toBuffer('image/png');
}

async function main() {
  for (const dir of [MYSPACE_DIR, MIDCENTURY_DIR]) {
    if (!existsSync(dir)) await mkdir(dir, { recursive: true });
  }

  for (const name of PROJECTS) {
    const src = path.join(SRC_DIR, `${name}.png`);
    if (!existsSync(src)) { console.log(`  ✗ missing: ${src}`); continue; }

    const img = await loadImage(src);
    console.log(`  ${name}: ${img.width}x${img.height}`);

    const square = await cropSquare(img, 160);
    await writeFile(path.join(MYSPACE_DIR, `${name}.png`), square);

    const wide = await resize(img, 1280, 800);
    await writeFile(path.join(MIDCENTURY_DIR, `${name}.png`), wide);

    console.log(`    ✓ myspace 160x160, midcentury 1280x800`);
  }

  console.log('\nDone.');
}

main().catch(console.error);
