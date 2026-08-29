import {expect, test, type Page} from '@playwright/test';

const demoUrl = '/?demo=1';
const testOrigin = new URL(process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:4173').origin;
const step = (page: Page) => page.getByRole('button', {name: /Run one turn/});

async function selectLesson(page: Page, id: number) {
  await page.locator('#level-select').selectOption(String(id));
  await expect(page.locator('.game-heading .eyebrow')).toContainText(`Lesson ${id} of 10`);
}

async function expectChangeList(page: Page) {
  await expect(page.locator('.state-panel li')).toHaveCount(4);
  for (const [index, label] of ['Position', 'Turns', 'Seeds', 'Score'].entries()) {
    await expect(page.locator('.state-panel li').nth(index)).toContainText(label);
  }
}

test('@claim:demo-first-action opens the isolated sample in one click', async ({page}) => {
  await page.goto('/');
  await page.getByRole('link', {name: 'Try it with sample data'}).click();
  await expect(page).toHaveURL(/\?demo=1$/);
  await expect(page.getByRole('heading', {level: 1, name: 'The missed seed'})).toBeVisible();
  await expect(page.getByLabel('Demo mode')).toContainText('sample data, nothing is saved');
  await expect(page.locator('.rule-tile')).toHaveCount(5);
});

test('@claim:landing-preview changes Move and explains the board result', async ({page}) => {
  await page.goto('/');
  await page.getByRole('button', {name: 'Set Move to 1 square'}).click();
  await expect(page.locator('#preview-value')).toHaveText('1 square');
  await expect(page.locator('#preview-result')).toContainText('After:');
  await expect(page.locator('#preview-result')).toContainText('lands on the seed and collects it');
  await expect(page.getByRole('button', {name: 'Set Move to 2 squares'})).toBeVisible();
});

test('@claim:ten-lessons loads each distinct playable lesson', async ({page}) => {
  const names = ['The missed seed', 'Hands full', 'Stone rebound', 'Last light', 'Worth the walk', 'Long stride', 'Bank shot', 'Quiet cargo', 'Signal chain', 'The whole clearing'];
  await page.goto(demoUrl);
  await expect(page.locator('#level-select option')).toHaveCount(10);
  for (const [index, name] of names.entries()) {
    await selectLesson(page, index + 1);
    await expect(page.getByRole('heading', {level: 1})).toHaveText(name);
    await expect(page.locator('.game-board')).toHaveAttribute('aria-label', new RegExp(`${name} board`));
    await expect(page.locator('.rule-tile')).toHaveCount(5);
    await expect(page.locator('.game-heading p').last()).not.toBeEmpty();
  }
});

test('@claim:rule-types changes movement, collision, collection, time, and points', async ({page}) => {
  await page.goto(demoUrl);
  await page.getByRole('button', {name: 'Set Move to 1 square'}).click();
  await step(page).click();
  await expect(page.locator('.game-board')).toHaveAttribute('aria-label', /Explorer at column 2, row 3/);

  await selectLesson(page, 3);
  await page.getByRole('button', {name: 'Set Collide to bounce'}).click();
  await step(page).click();
  await expect(page.locator('.event-text')).toContainText('Collision changed direction');

  await selectLesson(page, 2);
  await page.getByRole('button', {name: 'Set Collect to on'}).click();
  await page.getByRole('button', {name: 'Up'}).click();
  await step(page).click();
  await step(page).click();
  await expect(page.locator('.score-strip')).toContainText('Seeds 1/2');

  await selectLesson(page, 4);
  await page.getByRole('button', {name: 'Set Timer to 6 turns'}).click();
  await page.getByRole('button', {name: 'Set Timer to 7 turns'}).click();
  await expect(page.locator('.status-chip')).toHaveText('0 / 7 turns');

  await selectLesson(page, 5);
  await page.getByRole('button', {name: 'Set Score to 2 per seed'}).click();
  await page.getByRole('button', {name: 'Down'}).click();
  await step(page).click();
  await page.getByRole('button', {name: 'Right'}).click();
  await step(page).click();
  await page.getByRole('button', {name: 'Down'}).click();
  await step(page).click();
  await expect(page.locator('.score-strip')).toContainText('Score 2/4');
});

test('@claim:scope-boundaries ships no account, multiplayer, editor, or marketplace path', async ({page}) => {
  for (const path of ['/', '/?demo=1', '/play', '/privacy', '/terms']) {
    await page.goto(path);
    const interactiveText = await page.locator('a, button, input, select').allTextContents();
    expect(interactiveText.join(' ')).not.toMatch(/sign in|log in|account|multiplayer|marketplace|asset store|code editor/i);
    const destinations = await page.locator('a').evaluateAll(links => links.map(link => (link as HTMLAnchorElement).href).join(' '));
    expect(destinations).not.toMatch(/auth|login|account|multiplayer|marketplace|store|editor/i);
  }
});

test('@claim:free-use has no purchase or payment path', async ({page}) => {
  await page.goto('/');
  await expect(page.getByText('Free.', {exact: true})).toBeVisible();
  const destinations = await page.locator('a').evaluateAll(links => links.map(link => (link as HTMLAnchorElement).href).join(' '));
  expect(destinations).not.toMatch(/checkout|payment|billing|buy/i);
  await expect(page.getByRole('button', {name: /buy|purchase|pay/i})).toHaveCount(0);
});

test('@claim:private-local preserves real progress and removes the demo namespace', async ({page}) => {
  const foreignRequests: string[] = [];
  page.on('request', request => {
    if (new URL(request.url()).origin !== testOrigin) foreignRequests.push(request.url());
  });
  const sentinel = JSON.stringify({levelId: 2, completed: [1], rules: {move: 1, collide: 'stop', collect: true, timer: 10, score: 1}});
  await page.goto('/');
  await page.evaluate(value => localStorage.setItem('game-logic-tiles:progress', value), sentinel);
  await page.goto(demoUrl);
  await page.getByRole('button', {name: 'Set Move to 1 square'}).click();
  await page.getByRole('button', {name: 'Reset demo'}).click();
  await expect(page.getByRole('heading', {level: 1})).toHaveText('The missed seed');
  await page.getByRole('link', {name: 'Start for real'}).click();
  await expect(page).toHaveURL(/\/play$/);
  await expect(page.getByRole('heading', {level: 1})).toHaveText('Hands full');
  const keys = await page.evaluate(() => ({real: localStorage.getItem('game-logic-tiles:progress'), demo: localStorage.getItem('demo:game-logic-tiles:progress')}));
  expect(keys.real).toBe(sentinel);
  expect(keys.demo).toBeNull();
  expect(foreignRequests).toEqual([]);
  await expect(page.getByRole('textbox', {name: /email|name|account/i})).toHaveCount(0);
});

test('@claim:demo-reset-resume restores every sample default and resumes untouched progress', async ({page}) => {
  const sentinel = JSON.stringify({levelId: 2, completed: [1], rules: {move: 2, collide: 'bounce', collect: true, timer: 9, score: 3}});
  await page.goto('/');
  await page.evaluate(value => localStorage.setItem('game-logic-tiles:progress', value), sentinel);
  await page.goto(demoUrl);
  for (const name of ['Set Move to 1 square', 'Set Collide to bounce', 'Set Collect to off', 'Set Timer to 6 turns', 'Set Score to 2 per seed']) {
    await page.getByRole('button', {name}).click();
  }
  await page.getByRole('button', {name: 'Reset demo'}).click();
  await expect(page.getByRole('heading', {level: 1})).toHaveText('The missed seed');
  for (const defaultAction of ['Set Move to 1 square', 'Set Collide to bounce', 'Set Collect to off', 'Set Timer to 6 turns', 'Set Score to 2 per seed']) {
    await expect(page.getByRole('button', {name: defaultAction})).toBeVisible();
  }
  await page.getByRole('link', {name: 'Start for real'}).click();
  await expect(page).toHaveURL(/\/play$/);
  await expect(page.getByRole('heading', {level: 1})).toHaveText('Hands full');
  for (const savedAction of ['Set Move to 1 square', 'Set Collide to stop', 'Set Collect to off', 'Set Timer to 10 turns', 'Set Score to 1 per seed']) {
    await expect(page.getByRole('button', {name: savedAction})).toBeVisible();
  }
  const stored = await page.evaluate(() => ({real: localStorage.getItem('game-logic-tiles:progress'), demo: localStorage.getItem('demo:game-logic-tiles:progress')}));
  expect(stored).toEqual({real: sentinel, demo: null});
});

test('@claim:start-or-resume opens saved progress from the landing action', async ({page}) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('game-logic-tiles:progress', JSON.stringify({
    levelId: 2,
    completed: [1],
    rules: {move: 2, collide: 'bounce', collect: true, timer: 9, score: 3},
  })));
  await page.getByRole('link', {name: 'Start or resume a lesson'}).click();
  await expect(page).toHaveURL(/\/play$/);
  await expect(page.getByRole('heading', {level: 1})).toHaveText('Hands full');
  await expect(page.getByRole('button', {name: 'Set Move to 1 square'})).toBeVisible();
});

test('@claim:share-seed restores a non-default lesson and all five rule values', async ({page, browser}) => {
  await page.goto(demoUrl);
  await selectLesson(page, 5);
  await page.getByRole('button', {name: 'Set Move to 2 squares'}).click();
  await page.getByRole('button', {name: 'Set Collide to bounce'}).click();
  await page.getByRole('button', {name: 'Set Collect to off'}).click();
  await page.getByRole('button', {name: 'Set Timer to 3 turns'}).click();
  await page.getByRole('button', {name: 'Set Score to 2 per seed'}).click();
  await page.getByRole('button', {name: 'Create challenge link'}).click();
  const link = await page.getByLabel('Challenge link').inputValue();
  expect(link).toContain('/demo?seed=GLT1-');
  const context = await browser.newContext({baseURL: testOrigin});
  const restored = await context.newPage();
  await restored.goto(new URL(link).pathname + new URL(link).search);
  await expect(restored.getByRole('heading', {level: 1})).toHaveText('Worth the walk');
  for (const name of ['Set Move to 1 square', 'Set Collide to stop', 'Set Collect to on', 'Set Timer to 4 turns', 'Set Score to 3 per seed']) {
    await expect(restored.getByRole('button', {name})).toBeVisible();
  }
  await context.close();
});

test('@claim:offline-reload reopens the demo after the first visit', async ({page, context}) => {
  await page.goto(demoUrl);
  await page.waitForFunction(() => navigator.serviceWorker?.controller !== null);
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading', {level: 1, name: 'The missed seed'})).toBeVisible();
  await expect(page.getByText('Offline', {exact: true})).toBeVisible();
});

test('@claim:visible-board-change updates the board and change list after one turn', async ({page}) => {
  await page.goto(demoUrl);
  await page.getByRole('button', {name: 'Set Move to 1 square'}).click();
  const before = await page.locator('.game-board').getAttribute('aria-label');
  await step(page).click();
  const after = await page.locator('.game-board').getAttribute('aria-label');
  expect(before).not.toBe(after);
  await expectChangeList(page);
});

test('@claim:turn-change-list shows all changes for representative turns', async ({page}) => {
  await page.goto(demoUrl);
  await step(page).click();
  await expectChangeList(page);

  await selectLesson(page, 3);
  await page.getByRole('button', {name: 'Set Collide to bounce'}).click();
  await step(page).click();
  await expectChangeList(page);

  await selectLesson(page, 2);
  await page.getByRole('button', {name: 'Set Collect to on'}).click();
  await page.getByRole('button', {name: 'Up'}).click();
  await step(page).click(); await step(page).click();
  await expectChangeList(page);

  await selectLesson(page, 1);
  for (let index = 0; index < 8; index += 1) await page.getByRole('button', {name: /Set Timer to/}).click();
  await page.getByRole('button', {name: 'Up'}).click();
  await step(page).click(); await step(page).click(); await step(page).click();
  await expect(page.locator('.event-text')).toContainText('The timer ended');
  await expectChangeList(page);

  await page.getByRole('button', {name: 'Reset R'}).click();
  await page.getByRole('button', {name: 'Set Timer to 4 turns'}).click();
  await page.getByRole('button', {name: 'Set Timer to 5 turns'}).click();
  await page.getByRole('button', {name: 'Set Move to 1 square'}).click();
  for (let index = 0; index < 4; index += 1) await step(page).click();
  await expect(page.locator('.event-text')).toContainText('Puzzle solved');
  await expectChangeList(page);
});

test('@claim:keyboard-touch-controls supports keyboard turns and 390px touch controls', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844});
  await page.goto(demoUrl);
  await page.locator('main').focus();
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Enter');
  await expect(page.locator('.event-text')).toContainText('Moved 2 squares.');
  await page.getByRole('button', {name: 'Left'}).click();
  await expect(page.getByText('Facing Left')).toBeVisible();
});
