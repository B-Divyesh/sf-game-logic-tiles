import assert from 'node:assert/strict';
import {mkdir, writeFile} from 'node:fs/promises';
import AxeBuilder from '@axe-core/playwright';
import {chromium} from '@playwright/test';

const baseUrl = process.argv[2] ?? 'https://game-logic-tiles.sociobot.in';
const evidenceDir = process.argv[3] ?? '.factory/evidence/polish-2-live';
await mkdir(evidenceDir, {recursive: true});
const browser = await chromium.launch();
const routeResults = [];

for (const path of ['/', '/?demo=1', '/demo', '/play', '/privacy', '/terms', '/not-a-real-route-polish-2']) {
  const context = await browser.newContext({viewport: {width: 390, height: 844}});
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(String(error)));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  const response = await page.goto(`${baseUrl}${path}`, {waitUntil: 'networkidle'});
  const expectedStatus = path.includes('not-a-real') ? 404 : 200;
  assert.equal(response?.status(), expectedStatus, `${path} status`);
  assert.equal(await page.locator('h1').count(), 1, `${path} h1`);
  assert.equal(await page.locator('main').count(), 1, `${path} main`);
  assert.equal(await page.locator('html').getAttribute('lang'), 'en', `${path} lang`);
  assert.match(await page.title(), /Game Logic Tiles/, `${path} title`);
  const axe = await new AxeBuilder({page}).analyze();
  const serious = axe.violations.filter(item => ['serious', 'critical'].includes(item.impact ?? ''));
  assert.deepEqual(serious, [], `${path} serious Axe findings`);
  const undersized = await page.locator('button:not([disabled]), a[href], input:not([type="hidden"]), select').evaluateAll(elements => elements
    .filter(element => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && (rect.width < 44 || rect.height < 44);
    })
    .map(element => element.getAttribute('aria-label') || element.textContent?.trim() || element.tagName));
  assert.deepEqual(undersized, [], `${path} touch targets`);
  const unexpectedErrors = expectedStatus === 404
    ? errors.filter(message => !message.includes('server responded with a status of 404'))
    : errors;
  assert.deepEqual(unexpectedErrors, [], `${path} console errors`);
  routeResults.push({path, status: expectedStatus, title: await page.title(), seriousAxeFindings: 0, undersizedTargets: 0});
  if (path === '/') await page.screenshot({path: `${evidenceDir}/landing-mobile.png`, fullPage: false});
  if (path === '/?demo=1') await page.screenshot({path: `${evidenceDir}/demo-mobile.png`, fullPage: false});
  if (path.includes('not-a-real')) await page.screenshot({path: `${evidenceDir}/404-mobile.png`, fullPage: true});
  await context.close();
}

const context = await browser.newContext({viewport: {width: 1440, height: 900}});
const page = await context.newPage();
const foreignRequests = [];
page.on('request', request => {
  if (new URL(request.url()).origin !== new URL(baseUrl).origin) foreignRequests.push(request.url());
});
await page.goto(`${baseUrl}/`, {waitUntil: 'networkidle'});
assert.equal(await page.locator('h1').textContent(), 'Change game rules. See each turn.');
await page.getByRole('link', {name: 'Try it with sample data'}).click();
assert.match(page.url(), /\?demo=1$/);
assert.equal(await page.locator('.rule-tile').count(), 5);
assert.match(await page.getByLabel('Demo mode').textContent(), /sample data, nothing is saved/);
await page.screenshot({path: `${evidenceDir}/demo-desktop.png`, fullPage: false});

const sentinel = JSON.stringify({levelId: 2, completed: [1], rules: {move: 2, collide: 'bounce', collect: true, timer: 9, score: 3}});
await page.evaluate(value => localStorage.setItem('game-logic-tiles:progress', value), sentinel);
for (const name of ['Set Move to 1 square', 'Set Collide to bounce', 'Set Collect to off', 'Set Timer to 6 turns', 'Set Score to 2 per seed']) {
  await page.getByRole('button', {name}).click();
}
await page.getByRole('button', {name: 'Reset demo'}).click();
for (const name of ['Set Move to 1 square', 'Set Collide to bounce', 'Set Collect to off', 'Set Timer to 6 turns', 'Set Score to 2 per seed']) {
  assert.equal(await page.getByRole('button', {name}).count(), 1, `reset default ${name}`);
}
await page.getByRole('link', {name: 'Start for real'}).click();
assert.equal(await page.locator('h1').textContent(), 'Hands full');
assert.deepEqual(await page.evaluate(() => ({
  real: localStorage.getItem('game-logic-tiles:progress'),
  demo: localStorage.getItem('demo:game-logic-tiles:progress'),
})), {real: sentinel, demo: null});

await page.goto(`${baseUrl}/`, {waitUntil: 'networkidle'});
const footerPrivacy = page.locator('.site-footer').getByRole('link', {name: 'Privacy'});
await footerPrivacy.scrollIntoViewIfNeeded();
await footerPrivacy.focus();
const savedScroll = await page.evaluate(() => scrollY);
await footerPrivacy.click();
assert.equal(await page.locator('h1').textContent(), 'Privacy for Game Logic Tiles');
await page.goBack();
await page.waitForTimeout(250);
const restored = await page.evaluate(() => ({scrollY, focus: document.activeElement?.textContent?.trim()}));
assert.ok(restored.scrollY >= savedScroll - 2, `history scroll ${restored.scrollY} >= ${savedScroll}`);
assert.equal(restored.focus, 'Privacy');
await page.screenshot({path: `${evidenceDir}/history-restored.png`, fullPage: false});

await page.goto(`${baseUrl}/?demo=1`, {waitUntil: 'networkidle'});
await page.waitForFunction(() => navigator.serviceWorker?.controller !== null);
await context.setOffline(true);
await page.reload({waitUntil: 'domcontentloaded'});
assert.equal(await page.locator('h1').textContent(), 'The missed seed');
assert.equal(await page.getByText('Offline', {exact: true}).isVisible(), true);
await context.setOffline(false);
assert.deepEqual(foreignRequests, []);

const report = {
  checkedAt: new Date().toISOString(),
  baseUrl,
  routes: routeResults,
  demo: {oneClick: true, fiveRuleControls: true, resetAllDefaults: true, resumesUntouchedSavedProgress: true},
  history: {savedScroll, restoredScroll: restored.scrollY, restoredFocus: restored.focus},
  privacy: {foreignRequests},
  offlineReload: true,
};
await writeFile(`${evidenceDir}/live-verification.json`, `${JSON.stringify(report, null, 2)}\n`);
await browser.close();
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
