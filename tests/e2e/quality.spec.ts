import AxeBuilder from '@axe-core/playwright';
import {expect, test} from '@playwright/test';

for (const path of ['/', '/?demo=1', '/demo', '/play', '/privacy', '/terms']) {
  test(`${path} has one clear page outline and no serious accessibility findings`, async ({page}) => {
    await page.goto(path);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page).toHaveTitle(/Game Logic Tiles/);
    const results = await new AxeBuilder({page}).analyze();
    expect(results.violations.filter(item => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]);
  });
}

test('mobile demo fits without horizontal scrolling and supports touch controls', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844});
  await page.goto('/?demo=1');
  const sizes = await page.evaluate(() => ({scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth}));
  expect(sizes.scroll).toBe(sizes.client);
  await page.getByRole('button', {name: /Left/}).click();
  await expect(page.getByText('Facing Left')).toBeVisible();
});

test('every visible interactive target is at least 44 by 44 pixels on desktop and 390px mobile', async ({page}) => {
  const viewports = [{width: 1440, height: 900}, {width: 390, height: 844}];
  const paths = ['/', '/?demo=1', '/demo', '/play', '/privacy', '/terms', '/lost-in-the-marsh'];
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    for (const path of paths) {
      await page.goto(path);
      const undersized = await page.locator('button:not([disabled]), a[href], input:not([type="hidden"]), select').evaluateAll(elements => elements
        .filter(element => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return style.display !== 'none' && style.visibility !== 'hidden' && (rect.width < 44 || rect.height < 44);
        })
        .map(element => {
          const rect = element.getBoundingClientRect();
          return {name: element.getAttribute('aria-label') || element.textContent?.trim() || element.tagName, width: rect.width, height: rect.height};
        }));
      expect(undersized, `${path} at ${viewport.width}px`).toEqual([]);
    }
  }
});

test('bad challenge seeds explain what happened and what to do', async ({page}) => {
  await page.goto('/?demo=1');
  await page.getByLabel('Open a challenge seed').fill('BROKEN');
  await page.getByRole('button', {name: 'Load seed'}).click();
  await expect(page.getByText('That seed is incomplete or damaged. Copy the full seed and try again.')).toBeVisible();
});

test('navigation, history, and normal play produce no console errors', async ({page}) => {
  const errors: string[] = [];
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/?demo=1');
  await page.getByRole('link', {name: 'Privacy', exact: true}).first().click();
  await expect(page.getByRole('heading', {level: 1})).toHaveText('Privacy for Game Logic Tiles');
  await page.goBack();
  await expect(page.getByRole('heading', {level: 1})).toHaveText('The missed seed');
  await page.getByRole('button', {name: 'Set Move to 1 square'}).click();
  await page.getByRole('button', {name: /Run one turn/}).click();
  expect(errors).toEqual([]);
});

test('unknown routes show a useful themed 404 screen in the application fallback', async ({page}) => {
  await page.goto('/lost-in-the-marsh');
  await expect(page.getByRole('heading', {level: 1})).toHaveText('Page not found');
  await expect(page.getByRole('link', {name: 'Return home'})).toBeVisible();
});

test('each route updates title, canonical URL, and social metadata', async ({page}) => {
  const expected = [
    ['/', 'Game Logic Tiles — Change rules through play', 'https://game-logic-tiles.sociobot.in/'],
    ['/?demo=1', 'Demo — Game Logic Tiles', 'https://game-logic-tiles.sociobot.in/demo'],
    ['/play', 'Play — Game Logic Tiles', 'https://game-logic-tiles.sociobot.in/play'],
    ['/privacy', 'Privacy — Game Logic Tiles', 'https://game-logic-tiles.sociobot.in/privacy'],
    ['/terms', 'Terms — Game Logic Tiles', 'https://game-logic-tiles.sociobot.in/terms'],
    ['/lost-in-the-marsh', 'Page not found — Game Logic Tiles', 'https://game-logic-tiles.sociobot.in/404'],
  ];
  for (const [path, title, canonical] of expected) {
    await page.goto(path);
    await expect(page).toHaveTitle(title);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', title);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', canonical);
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', title);
  }
});
