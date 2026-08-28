import AxeBuilder from '@axe-core/playwright';
import {expect, test} from '@playwright/test';

for (const path of ['/', '/demo', '/privacy', '/terms']) {
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
  await page.goto('/demo');
  const sizes = await page.evaluate(() => ({scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth}));
  expect(sizes.scroll).toBe(sizes.client);
  await page.getByRole('button', {name: /Left/}).click();
  await expect(page.getByText('Facing Left')).toBeVisible();
});

test('bad challenge seeds explain what happened and what to do', async ({page}) => {
  await page.goto('/demo');
  await page.getByLabel('Open a challenge seed').fill('BROKEN');
  await page.getByRole('button', {name: 'Load seed'}).click();
  await expect(page.getByText('That seed is incomplete or damaged. Copy the full seed and try again.')).toBeVisible();
});

test('navigation, history, and normal play produce no console errors', async ({page}) => {
  const errors: string[] = [];
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/demo');
  await page.getByRole('link', {name: 'Privacy', exact: true}).first().click();
  await expect(page.getByRole('heading', {level: 1})).toHaveText('Your puzzle progress stays here');
  await page.goBack();
  await expect(page.getByRole('heading', {level: 1})).toHaveText('The missed seed');
  await page.getByRole('button', {name: /Move 2 squares/}).click();
  await page.getByRole('button', {name: /Step world/}).click();
  expect(errors).toEqual([]);
});

test('unknown routes show a useful themed 404 screen', async ({page}) => {
  await page.goto('/lost-in-the-marsh');
  await expect(page.getByRole('heading', {level: 1})).toHaveText('This path leaves the game board');
  await expect(page.getByRole('link', {name: 'Return home'})).toBeVisible();
});
