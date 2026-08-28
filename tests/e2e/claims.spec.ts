import {expect, test} from '@playwright/test';

test('@claim:ten-lessons offers ten playable lessons', async ({page}) => {
  await page.goto('/demo');
  await expect(page.locator('#level-select option')).toHaveCount(10);
  await page.getByRole('button', {name: /Move 2 squares/}).click();
  for (let turn = 0; turn < 4; turn += 1) await page.getByRole('button', {name: /Step world/}).click();
  await expect(page.getByText('The beacon is lit. Puzzle solved.')).toBeVisible();
  await expect(page.getByText('Solved', {exact: true})).toBeVisible();
});

test('@claim:free-use has no purchase or payment path', async ({page}) => {
  await page.goto('/');
  await expect(page.getByText('Free.', {exact: true})).toBeVisible();
  const destinations = await page.locator('a').evaluateAll(links => links.map(link => (link as HTMLAnchorElement).href).join(' '));
  expect(destinations).not.toMatch(/checkout|payment|billing|buy/i);
  await expect(page.getByRole('button', {name: /buy|purchase|pay/i})).toHaveCount(0);
});

test('@claim:private-local keeps demo progress separate and sends no tracking request', async ({page}) => {
  const foreignRequests: string[] = [];
  page.on('request', request => {
    if (new URL(request.url()).origin !== 'http://127.0.0.1:4173') foreignRequests.push(request.url());
  });
  await page.goto('/demo');
  await page.getByRole('button', {name: /Collect on/i}).click();
  const keys = await page.evaluate(() => Object.keys(localStorage));
  expect(keys).toContain('demo:game-logic-tiles:progress');
  expect(keys).not.toContain('game-logic-tiles:progress');
  expect(foreignRequests).toEqual([]);
  await expect(page.getByRole('textbox', {name: /email|name|account/i})).toHaveCount(0);
});

test('@claim:share-seed creates a link that restores the same five rules', async ({page}) => {
  await page.goto('/demo');
  await page.getByRole('button', {name: /Move 2 squares/}).click();
  await page.getByRole('button', {name: /Score 1 per seed/}).click();
  await page.getByRole('button', {name: 'Create challenge link'}).click();
  const link = await page.getByLabel('Challenge link').inputValue();
  expect(link).toContain('/demo?seed=GLT1-');
  await page.goto(new URL(link).pathname + new URL(link).search);
  await expect(page.getByRole('button', {name: /Move 1 square/})).toBeVisible();
  await expect(page.getByRole('button', {name: /Score 2 per seed/})).toBeVisible();
});

test('@claim:offline-reload reopens the demo after the first visit', async ({page, context}) => {
  await page.goto('/demo');
  await page.waitForFunction(() => navigator.serviceWorker?.controller !== null);
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading', {level: 1, name: 'The missed seed'})).toBeVisible();
  await expect(page.getByText('Offline', {exact: true})).toBeVisible();
});
