import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const baseUrl = process.env.QA_BASE_URL ?? process.env.SMOKE_BASE_URL ?? 'http://127.0.0.1:4178';
const outDir = new URL('../.qa/', import.meta.url);
const outDirPath = fileURLToPath(outDir);

const captures = [
  {
    name: 'mobile-long-contest-title.png',
    path: '/contests/5',
    viewport: { width: 390, height: 844 },
  },
  {
    name: 'mobile-dense-entry-card.png',
    path: '/contests/1',
    viewport: { width: 390, height: 844 },
  },
  {
    name: 'mobile-embedded-creation-wizard.png',
    path: '/contests/new',
    viewport: { width: 390, height: 844 },
  },
  {
    name: 'desktop-entry-threaded-notes.png',
    path: '/contests/1/entries/101',
    viewport: { width: 1280, height: 900 },
  },
];

await mkdir(outDirPath, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const failures = [];

for (const capture of captures) {
  await page.setViewportSize(capture.viewport);
  await page.goto(`${baseUrl}${capture.path}`, { waitUntil: 'networkidle' });
  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  if (hasOverflow) failures.push(`${capture.path} has horizontal overflow at ${capture.viewport.width}px`);
  await page.screenshot({ path: fileURLToPath(new URL(capture.name, outDir)), fullPage: true });
}

await browser.close();

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`QA screenshots written to ${outDir.pathname}`);
