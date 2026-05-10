import { chromium } from 'playwright';

const baseUrl = process.env.SMOKE_BASE_URL ?? 'http://127.0.0.1:4178';
const checks = [
  ['/', 'get dozens of ux mockups'],
  ['/pricing', 'pricing for ux mock contests'],
  ['/contests/3', 'finalist review'],
  ['/contests/3/submit', 'submissions closed'],
  ['/contests/2', 'winner selected'],
  ['/contests/1/compare', 'comparison matrix'],
  ['/contests/1/entries/101', 'annotated screen notes'],
  ['/contests/new/success', 'draft marketplace listing'],
  ['/terms', 'prototype marketplace terms'],
  ['/privacy', 'prototype privacy boundary'],
  ['/safety', 'prototype terms'],
  ['/creators', 'creator verification preview'],
  ['/creators/mika-ux-lab', 'portfolio setup'],
  ['/contests/1/handoff/101', 'static handoff receipt'],
  ['/contests/999', 'contest not found'],
  ['/unknown-route', 'this page is not available'],
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const failures = [];

for (const [path, marker] of checks) {
  await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle' });
  const text = (await page.locator('body').innerText()).toLowerCase();
  if (!text.includes(marker)) {
    failures.push(`${path} missing "${marker}"`);
  }
}

await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
await page.evaluate(() => window.localStorage.clear());
await page.reload({ waitUntil: 'networkidle' });
await page.getByRole('button', { name: /Japanese/ }).first().click();
const japaneseText = await page.locator('body').innerText();
if (!japaneseText.includes('複数のUXモック')) {
  failures.push('Japanese homepage copy did not render');
}
await page.reload({ waitUntil: 'networkidle' });
const persistedJapaneseText = await page.locator('body').innerText();
if (!persistedJapaneseText.includes('複数のUXモック')) {
  failures.push('Japanese language preference did not persist after reload');
}

await page.evaluate(() => window.localStorage.setItem('mockcontest-language', 'en'));
await page.goto(`${baseUrl}/contests/1/compare`, { waitUntil: 'networkidle' });
await page.reload({ waitUntil: 'networkidle' });
await page.evaluate(() => window.sessionStorage.clear());
await page.reload({ waitUntil: 'networkidle' });
const addToShortlist = page.getByRole('button', { name: /Add to shortlist/ });
if ((await addToShortlist.count()) > 0) {
  await addToShortlist.first().click();
  await page.reload({ waitUntil: 'networkidle' });
  const persistedText = await page.locator('body').innerText();
  if (!persistedText.includes('3 entries marked')) {
    failures.push('Shortlist did not persist after reload');
  }
} else {
  failures.push('No add-to-shortlist control found');
}

await page.goto(`${baseUrl}/contests/5/compare`, { waitUntil: 'networkidle' });
const emptyCompareText = (await page.locator('body').innerText()).toLowerCase();
if (!emptyCompareText.includes('no entries to compare yet') || !emptyCompareText.includes('submit first proposal')) {
  failures.push('No-entry comparison state did not render expected content');
}

await page.goto(`${baseUrl}/contests/1/submit`, { waitUntil: 'networkidle' });
await page.getByRole('button', { name: /Submit entry/ }).click();
let submitText = (await page.locator('body').innerText()).toLowerCase();
if (!submitText.includes('title is required') || !submitText.includes('demo url is required')) {
  failures.push('Submit form validation did not render expected errors');
}
await page.getByLabel(/Entry title/).fill('Smoke test proposal');
await page.getByLabel(/Demo URL/).fill('https://example.com/smoke');
await page.getByLabel(/AI tools used/).fill('UI generator and manual edits');
await page.locator('textarea').fill('A static smoke-test proposal with declared prototype scope.');
for (const checkbox of await page.locator('form input[type="checkbox"]').all()) {
  await checkbox.check();
}
await page.getByRole('button', { name: /Submit entry/ }).click();
await page.waitForURL(/submit\/success/);

await page.goto(`${baseUrl}/contests/1/winner-review/101`, { waitUntil: 'networkidle' });
await page.getByRole('button', { name: /Confirm winner review/ }).click();
let winnerText = (await page.locator('body').innerText()).toLowerCase();
if (!winnerText.includes('confirm every responsibility acknowledgement')) {
  failures.push('Winner review validation did not render expected error');
}
for (const checkbox of await page.locator('form input[type="checkbox"]').all()) {
  await checkbox.check();
}
await page.getByRole('button', { name: /Confirm winner review/ }).click();
await page.waitForURL(/winner-review\/101\/success/);

await page.goto(`${baseUrl}/contests/new`, { waitUntil: 'networkidle' });
await page.getByRole('button', { name: /Booking/ }).first().click();
await page.getByRole('button', { name: /^Next$/ }).click();
await page.getByRole('button', { name: /Standard/ }).first().click();
await page.getByRole('button', { name: /^Next$/ }).click();
await page.getByRole('button', { name: /^Next$/ }).click();
for (const checkbox of await page.locator('input[type="checkbox"]').all()) {
  await checkbox.check();
}
await page.getByRole('button', { name: /^Next$/ }).click();
await page.getByRole('button', { name: /Confirm mock contest/ }).click();
await page.waitForURL(/contests\/new\/success/);

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${baseUrl}/contests/1/compare`, { waitUntil: 'networkidle' });
const mobileText = (await page.locator('body').innerText()).toLowerCase();
if (!mobileText.includes('comparison matrix') || !mobileText.includes('client shortlist')) {
  failures.push('Mobile comparison board did not render expected content');
}

await browser.close();

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Smoke checks passed for ${baseUrl}`);
