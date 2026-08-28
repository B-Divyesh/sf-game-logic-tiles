import './style.css';
import {createSeed, initialState, levels, parseSeed, stepWorld, type Direction, type GameState, type Level, type Rules} from './game';

type Route = '/' | '/demo' | '/play' | '/privacy' | '/terms' | '/404';

const app = document.querySelector<HTMLDivElement>('#app')!;
const siteUrl = 'https://game-logic-tiles.sociobot.in';
let currentCleanup: (() => void) | undefined;

const routeInfo: Record<Route, {title: string; description: string}> = {
  '/': {title: 'Game Logic Tiles — Learn rules through play', description: 'Change one rule, step the world, and see why the game state changed across ten small puzzles.'},
  '/demo': {title: 'Demo — Game Logic Tiles', description: 'Try a sample game-logic puzzle without saving to your progress.'},
  '/play': {title: 'Play — Game Logic Tiles', description: 'Change movement, collision, collection, timer, and score rules in ten small puzzles.'},
  '/privacy': {title: 'Privacy — Game Logic Tiles', description: 'How Game Logic Tiles keeps puzzle progress in your browser.'},
  '/terms': {title: 'Terms — Game Logic Tiles', description: 'The terms for using the free Game Logic Tiles learning tool.'},
  '/404': {title: 'Page not found — Game Logic Tiles', description: 'Return to Game Logic Tiles and choose a puzzle.'},
};

function iconMark() {
  return `<svg class="wordmark-icon" aria-hidden="true" viewBox="0 0 40 40"><path d="M4 4h32v32H4z"/><path d="M15 4v32M26 4v32M4 15h32M4 26h32"/><circle cx="15" cy="26" r="4"/><path d="m27 12 6 4-6 4z"/></svg>`;
}

function shell(content: string, route: Route, demo = false) {
  return `
    <a class="skip-link" href="#main">Skip to main content</a>
    ${demo ? `<aside class="demo-banner" aria-label="Demo mode"><span><strong>Demo</strong> — sample data, nothing is saved</span><div><button class="text-button" data-reset-demo>Reset demo</button><a href="/play" data-start-real>Start for real</a></div></aside>` : ''}
    <header class="site-header">
      <a class="wordmark" href="/" data-route aria-label="Game Logic Tiles home">${iconMark()}<span>Game Logic Tiles</span></a>
      <nav aria-label="Main navigation">
        <a href="/demo" data-route ${route === '/demo' ? 'aria-current="page"' : ''}>Demo</a>
        <a href="/#how" data-home-anchor>How it works</a>
        <a href="/privacy" data-route ${route === '/privacy' ? 'aria-current="page"' : ''}>Privacy</a>
      </nav>
    </header>
    <div id="route-status" class="sr-only" aria-live="polite"></div>
    ${content}
    <footer class="site-footer">
      <div><span class="footer-mark">◇</span><p><strong>Game Logic Tiles</strong><br>Change a rule. See what it caused.</p></div>
      <nav aria-label="Footer navigation"><a href="/privacy" data-route>Privacy</a><a href="/terms" data-route>Terms</a><a href="https://hello-factory.sociobot.in" rel="noreferrer">Built by Param Factory <span class="sr-only">(external site)</span></a></nav>
      <p class="build-id">Version 1.0 · build 2026.08</p>
      <p class="art-credit">Environmental artwork generated for this project.</p>
    </footer>`;
}

function homePage() {
  return shell(`
    <main id="main" tabindex="-1">
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">A tiny game-logic workshop</p>
          <h1>Change rules. See the game react.</h1>
          <p class="hero-lede">For puzzle beginners who want to understand game logic before learning code.</p>
          <div class="hero-action"><a class="primary-button" href="/demo" data-route>Try it with sample data</a><span>It opens puzzle 1 with five rules to change.</span></div>
          <ul class="plain-facts" aria-label="Product facts">
            <li><strong>Free.</strong> No purchases.</li>
            <li><strong>Private.</strong> No account or tracking.</li>
            <li><strong>Offline.</strong> Reopens after your first visit.</li>
          </ul>
        </div>
        <figure class="hero-art">
          <picture>
            <source media="(max-width: 700px)" srcset="/assets/moonlit-rule-marsh-720.webp">
            <img src="/assets/moonlit-rule-marsh-1200.webp" width="1200" height="800" alt="A lantern explorer crosses a moonlit grid toward a glowing seed." fetchpriority="high" decoding="async">
          </picture>
          <figcaption>Every move changes a small, visible world.</figcaption>
        </figure>
      </section>

      <section class="preview-section" aria-labelledby="preview-title">
        <div class="section-heading"><p class="eyebrow">Live preview</p><h2 id="preview-title">A rule is a cause you can touch</h2><p>Change Move below. The state preview explains the result.</p></div>
        <div class="mini-lab">
          <div class="mini-board" aria-label="Preview board with explorer, seed, stone, and beacon">
            <span class="mini-cell explorer">●</span><span class="mini-cell seed">✦</span><span class="mini-cell stone">■</span><span class="mini-cell"></span><span class="mini-cell beacon">◇</span>
          </div>
          <div class="mini-rule"><span>MOVE</span><strong id="preview-value">2 squares</strong><button type="button" id="preview-change">Change to 1</button></div>
          <p id="preview-result" class="mini-result" aria-live="polite"><strong>Before:</strong> the explorer skips the seed.</p>
        </div>
      </section>

      <section id="how" class="how-section" aria-labelledby="how-title">
        <div class="section-heading"><p class="eyebrow">How it works</p><h2 id="how-title">Learn one cause at a time</h2></div>
        <ol class="steps">
          <li><span>01</span><div><h3>Read the goal</h3><p>Each clearing asks for one small result.</p></div></li>
          <li><span>02</span><div><h3>Change a rule</h3><p>Edit movement, collisions, collecting, time, or points.</p></div></li>
          <li><span>03</span><div><h3>Step the world</h3><p>Move once. A state diff shows what changed.</p></div></li>
        </ol>
      </section>

      <section class="boundary-section" aria-labelledby="boundary-title">
        <div><p class="eyebrow">A focused learning toy</p><h2 id="boundary-title">Small worlds, not a full game engine</h2></div>
        <p>Game Logic Tiles has ten fixed puzzles. It does not include accounts, multiplayer, freeform code, or an asset store.</p>
        <a class="secondary-button" href="/play" data-route>Start lesson 1</a>
      </section>
    </main>`, '/');
}

function legalPage(kind: 'privacy' | 'terms') {
  const privacy = kind === 'privacy';
  const content = privacy ? `
    <p class="eyebrow">Plain privacy notes</p><h1>Your puzzle progress stays here</h1>
    <p>Game Logic Tiles stores lesson progress and rule choices in this browser. The demo uses a separate temporary namespace.</p>
    <h2>What this site stores</h2><p>The site stores your current lesson, completed lessons, and changed rules. Resetting site data removes them.</p>
    <h2>What this site sends</h2><p>The app sends no puzzle progress, names, contact details, or analytics. Hosting servers may keep short security logs.</p>
    <h2>Your choices</h2><p>Use the demo without keeping progress. Use your browser settings to remove saved progress at any time.</p>` : `
    <p class="eyebrow">Use terms</p><h1>Use these puzzles with care</h1>
    <p>Game Logic Tiles is a free learning tool. You may use and share challenge links for personal or classroom learning.</p>
    <h2>No warranty</h2><p>The tool is provided as is. Check it before relying on it in a lesson or workshop.</p>
    <h2>Fair use</h2><p>Do not use the site to disrupt its service or harm other people. Shared seeds only contain puzzle settings.</p>
    <h2>Project license</h2><p>The source code is available under the MIT License. Generated artwork remains project material.</p>`;
  return shell(`<main id="main" class="legal-page" tabindex="-1"><article>${content}<p class="updated">Updated 28 August 2026</p></article></main>`, privacy ? '/privacy' : '/terms');
}

function notFoundPage() {
  return shell(`<main id="main" class="lost-page" tabindex="-1"><div class="lost-grid" aria-hidden="true"><span>●</span><i></i><i></i><i></i><span>◇</span></div><p class="eyebrow">404 · Lost clearing</p><h1>This path leaves the game board</h1><p>The page is not here. Return to the first clearing.</p><a class="primary-button" href="/" data-route>Return home</a></main>`, '/404');
}

interface SavedProgress { levelId: number; completed: number[]; rules?: Rules }

function storageFor(demo: boolean) {
  const key = demo ? 'demo:game-logic-tiles:progress' : 'game-logic-tiles:progress';
  return {
    load(): SavedProgress {
      try {
        const raw = localStorage.getItem(key);
        if (raw) return JSON.parse(raw) as SavedProgress;
      } catch { /* Start clean if storage is unavailable. */ }
      return {levelId: 1, completed: []};
    },
    save(value: SavedProgress) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* The game still works in memory. */ }
    },
    reset() { try { localStorage.removeItem(key); } catch { /* Nothing else to clear. */ } },
  };
}

function cellLabel(level: Level, state: GameState, x: number, y: number) {
  const here = {x, y};
  const parts = [`column ${x + 1}, row ${y + 1}`];
  if (level.walls.some(item => item.x === x && item.y === y)) parts.push('stone');
  if (level.goal.x === x && level.goal.y === y) parts.push('beacon');
  if (level.gems.some(item => item.x === x && item.y === y) && !state.collected.includes(`${x},${y}`)) parts.push('seed');
  if (state.player.x === here.x && state.player.y === here.y) parts.push('explorer');
  return parts.join(', ');
}

function renderBoard(level: Level, state: GameState) {
  let cells = '';
  for (let y = 0; y < level.size; y += 1) {
    for (let x = 0; x < level.size; x += 1) {
      const wall = level.walls.some(item => item.x === x && item.y === y);
      const goal = level.goal.x === x && level.goal.y === y;
      const gem = level.gems.some(item => item.x === x && item.y === y) && !state.collected.includes(`${x},${y}`);
      const player = state.player.x === x && state.player.y === y;
      cells += `<div class="board-cell${wall ? ' is-wall' : ''}${goal ? ' is-goal' : ''}${gem ? ' has-gem' : ''}${player ? ' has-player' : ''}" role="gridcell" aria-label="${cellLabel(level, state, x, y)}">${goal ? '<span class="goal-piece" aria-hidden="true">◇</span>' : ''}${gem ? '<span class="gem-piece" aria-hidden="true">✦</span>' : ''}${player ? `<span class="player-piece faces-${state.direction}" aria-hidden="true">●<i></i></span>` : ''}</div>`;
    }
  }
  return `<div class="game-board size-${level.size}" role="grid" aria-label="${level.name} game board">${cells}</div>`;
}

const directionNames: Record<Direction, string> = {up: 'Up', right: 'Right', down: 'Down', left: 'Left'};

function appTemplate(level: Level, rules: Rules, state: GameState, completed: number[], demo: boolean, showHint = false, shareValue = '') {
  const seed = createSeed(level.id, rules);
  const ruleTiles = [
    ['move', 'Move', `${rules.move} square${rules.move === 1 ? '' : 's'}`],
    ['collide', 'Collide', rules.collide],
    ['collect', 'Collect', rules.collect ? 'on' : 'off'],
    ['timer', 'Timer', `${rules.timer} turns`],
    ['score', 'Score', `${rules.score} per seed`],
  ];
  return shell(`<main id="main" class="game-page" tabindex="-1">
    <section class="game-heading">
      <div><p class="eyebrow">Lesson ${level.id} of ${levels.length} · ${level.lesson}</p><h1>${level.name}</h1><p>${level.objective}</p></div>
      <label class="level-picker">Choose lesson<select id="level-select">${levels.map(item => `<option value="${item.id}" ${item.id === level.id ? 'selected' : ''}>${item.id}. ${item.name}${completed.includes(item.id) ? ' ✓' : ''}</option>`).join('')}</select></label>
    </section>
    <div class="game-layout">
      <section class="world-panel" aria-labelledby="world-title">
        <div class="panel-top"><h2 id="world-title">The clearing</h2><span class="status-chip ${state.status}">${state.status === 'playing' ? `${state.turns} / ${rules.timer} turns` : state.status === 'won' ? 'Solved' : 'Timer ended'}</span></div>
        ${renderBoard(level, state)}
        <div class="direction-row" aria-label="Choose move direction">
          ${(Object.keys(directionNames) as Direction[]).map(direction => `<button class="direction-button ${state.direction === direction ? 'selected' : ''}" type="button" data-direction="${direction}" aria-pressed="${state.direction === direction}"><span aria-hidden="true">${{up: '↑', right: '→', down: '↓', left: '←'}[direction]}</span>${directionNames[direction]}</button>`).join('')}
        </div>
        <div class="world-actions"><button class="primary-button" type="button" id="step-world" ${state.status !== 'playing' ? 'disabled' : ''}>Step world <kbd>Enter</kbd></button><button class="secondary-button" type="button" id="undo-step">Undo step</button><button class="text-button" type="button" id="reset-world">Reset <kbd>R</kbd></button></div>
      </section>
      <section class="logic-panel" aria-labelledby="rules-title">
        <div class="panel-top"><div><p class="panel-kicker">Editable tiles</p><h2 id="rules-title">Rules</h2></div><button class="hint-button" type="button" id="toggle-hint" aria-expanded="${showHint}">${showHint ? 'Hide hint' : 'Show hint'}</button></div>
        ${showHint ? `<p class="hint-box"><strong>Try this:</strong> ${level.hint}</p>` : ''}
        <div class="rule-grid">${ruleTiles.map(([key, label, value]) => `<button type="button" class="rule-tile" data-rule="${key}"><span>${label}</span><strong>${value}</strong><small>Click to change</small></button>`).join('')}</div>
        <div class="state-panel" aria-live="polite" aria-atomic="true">
          <p class="panel-kicker">What just happened</p><p class="event-text">${state.event}</p>
          <ul>${state.diff.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>
        <div class="score-strip"><span>Seeds <strong>${state.collected.length}/${level.gems.length}</strong></span><span>Score <strong>${state.score}/${level.targetScore}</strong></span><span>Facing <strong>${directionNames[state.direction]}</strong></span></div>
      </section>
    </div>
    <section class="share-section" aria-labelledby="share-title">
      <div><p class="eyebrow">Pass the puzzle on</p><h2 id="share-title">Share these rules</h2><p>A challenge seed holds the lesson and five rule values.</p></div>
      <div class="share-controls"><button class="secondary-button" type="button" id="publish-seed">Create challenge link</button>${shareValue ? `<div class="share-output"><label for="share-link">Challenge link</label><div><input id="share-link" value="${shareValue}" readonly><button type="button" id="copy-link">Copy link</button></div><p>Seed: <code>${seed}</code></p></div>` : ''}<form id="seed-form"><label for="seed-input">Open a challenge seed</label><div><input id="seed-input" name="seed" autocomplete="off" spellcheck="false" placeholder="GLT1-…"><button type="submit">Load seed</button></div><p id="seed-error" class="form-error" aria-live="polite"></p></form></div>
    </section>
    <section class="keyboard-note"><h2>Keyboard controls</h2><p>Use arrow keys to face a direction. Press Enter to step. Press R to reset.</p></section>
  </main>`, demo ? '/demo' : '/play', demo);
}

function setupGame(demo: boolean) {
  const storage = storageFor(demo);
  let progress = storage.load();
  const querySeed = new URLSearchParams(location.search).get('seed');
  const parsed = querySeed ? parseSeed(querySeed) : null;
  let level = levels.find(item => item.id === (parsed?.levelId ?? progress.levelId)) ?? levels[0];
  let rules: Rules = parsed?.rules ?? progress.rules ?? {...level.rules};
  let state = initialState(level);
  let undoHistory: GameState[] = [];
  let showHint = false;
  let shareValue = '';

  const save = () => {
    progress = {...progress, levelId: level.id, rules};
    storage.save(progress);
  };
  const rerender = (focusSelector?: string) => {
    app.innerHTML = appTemplate(level, rules, state, progress.completed, demo, showHint, shareValue);
    bindShell();
    bindGame();
    if (focusSelector) requestAnimationFrame(() => document.querySelector<HTMLElement>(focusSelector)?.focus());
  };
  const resetWorld = (message = 'World reset. Choose a direction, then step.') => {
    state = {...initialState(level), event: message};
    undoHistory = [];
  };
  const changeLevel = (id: number, seedRules?: Rules) => {
    level = levels.find(item => item.id === id) ?? levels[0];
    rules = seedRules ?? {...level.rules};
    shareValue = '';
    showHint = false;
    resetWorld();
    save();
    rerender('#level-select');
  };
  const bindGame = () => {
    document.querySelector<HTMLSelectElement>('#level-select')?.addEventListener('change', event => changeLevel(Number((event.target as HTMLSelectElement).value)));
    document.querySelectorAll<HTMLButtonElement>('[data-direction]').forEach(button => button.addEventListener('click', () => {
      state = {...state, direction: button.dataset.direction as Direction, event: `Facing ${button.textContent?.trim()}. Press Step world.`, diff: ['Direction changed. World state is unchanged.']};
      rerender(`[data-direction="${state.direction}"]`);
    }));
    document.querySelector<HTMLButtonElement>('#step-world')?.addEventListener('click', () => {
      undoHistory.push(structuredClone(state));
      state = stepWorld(level, rules, state);
      if (state.status === 'won' && !progress.completed.includes(level.id)) progress.completed.push(level.id);
      save();
      rerender('#step-world');
    });
    document.querySelector<HTMLButtonElement>('#undo-step')?.addEventListener('click', () => {
      const previous = undoHistory.pop();
      state = previous ? {...previous, event: 'Last step undone.', diff: ['Restored the state before the last step.']} : {...state, event: 'There is no step to undo.', diff: ['World state is unchanged.']};
      rerender('#undo-step');
    });
    document.querySelector<HTMLButtonElement>('#reset-world')?.addEventListener('click', () => { resetWorld(); rerender('#reset-world'); });
    document.querySelector<HTMLButtonElement>('#toggle-hint')?.addEventListener('click', () => { showHint = !showHint; rerender('#toggle-hint'); });
    document.querySelectorAll<HTMLButtonElement>('[data-rule]').forEach(button => button.addEventListener('click', () => {
      const key = button.dataset.rule as keyof Rules;
      if (key === 'move') rules.move = rules.move === 1 ? 2 : 1;
      if (key === 'collide') rules.collide = rules.collide === 'stop' ? 'bounce' : 'stop';
      if (key === 'collect') rules.collect = !rules.collect;
      if (key === 'timer') rules.timer = rules.timer >= 12 ? 3 : rules.timer + 1;
      if (key === 'score') rules.score = (rules.score === 3 ? 1 : rules.score + 1) as 1 | 2 | 3;
      resetWorld(`${button.querySelector('span')?.textContent} changed. The world reset so you can test the new cause.`);
      shareValue = '';
      save();
      rerender(`[data-rule="${key}"]`);
    }));
    document.querySelector<HTMLButtonElement>('#publish-seed')?.addEventListener('click', () => {
      const seed = createSeed(level.id, rules);
      shareValue = `${siteUrl}${demo ? '/demo' : '/play'}?seed=${seed}`;
      rerender('#share-link');
    });
    document.querySelector<HTMLButtonElement>('#copy-link')?.addEventListener('click', async event => {
      try {
        await navigator.clipboard.writeText(shareValue);
        (event.currentTarget as HTMLButtonElement).textContent = 'Copied';
      } catch {
        const input = document.querySelector<HTMLInputElement>('#share-link');
        input?.select();
        (event.currentTarget as HTMLButtonElement).textContent = 'Link selected';
      }
    });
    document.querySelector<HTMLFormElement>('#seed-form')?.addEventListener('submit', event => {
      event.preventDefault();
      const input = document.querySelector<HTMLInputElement>('#seed-input')!;
      const result = parseSeed(input.value);
      const error = document.querySelector<HTMLParagraphElement>('#seed-error')!;
      if (!result) {
        error.textContent = 'That seed is incomplete or damaged. Copy the full seed and try again.';
        input.setAttribute('aria-invalid', 'true');
        input.focus();
        return;
      }
      history.replaceState({}, '', `${demo ? '/demo' : '/play'}?seed=${createSeed(result.levelId, result.rules)}`);
      changeLevel(result.levelId, result.rules);
    });
    document.querySelector<HTMLButtonElement>('[data-reset-demo]')?.addEventListener('click', () => {
      storage.reset();
      progress = {levelId: 1, completed: []};
      changeLevel(1);
    });
  };
  rerender();

  const keyboard = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement;
    if (target.matches('input, select, textarea, button, a')) return;
    const mapping: Record<string, Direction | undefined> = {ArrowUp: 'up', ArrowRight: 'right', ArrowDown: 'down', ArrowLeft: 'left'};
    if (mapping[event.key]) {
      event.preventDefault();
      state = {...state, direction: mapping[event.key]!};
      rerender();
    } else if (event.key === 'Enter' && state.status === 'playing') {
      event.preventDefault(); undoHistory.push(structuredClone(state)); state = stepWorld(level, rules, state); rerender('#step-world');
    } else if (event.key.toLowerCase() === 'r') {
      event.preventDefault(); resetWorld(); rerender('#reset-world');
    }
  };
  window.addEventListener('keydown', keyboard);
  return () => window.removeEventListener('keydown', keyboard);
}

function bindShell() {
  document.querySelectorAll<HTMLAnchorElement>('a[data-route]').forEach(link => link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || link.target) return;
    event.preventDefault();
    navigate(new URL(link.href).pathname);
  }));
  document.querySelectorAll<HTMLAnchorElement>('a[data-home-anchor]').forEach(link => link.addEventListener('click', event => {
    if (location.pathname === '/') return;
    event.preventDefault();
    navigate('/');
    requestAnimationFrame(() => document.querySelector('#how')?.scrollIntoView());
  }));
  document.querySelector<HTMLAnchorElement>('[data-start-real]')?.addEventListener('click', event => {
    event.preventDefault();
    storageFor(true).reset();
    navigate('/play');
  });
}

function setMeta(route: Route) {
  const info = routeInfo[route];
  document.title = info.title;
  document.querySelector<HTMLMetaElement>('meta[name="description"]')!.content = info.description;
  document.querySelector<HTMLLinkElement>('link[rel="canonical"]')!.href = `${siteUrl}${route === '/404' ? '/404' : route}`;
}

function render(moveFocus = false) {
  currentCleanup?.();
  currentCleanup = undefined;
  const known = ['/', '/demo', '/play', '/privacy', '/terms'];
  const route = (known.includes(location.pathname) ? location.pathname : '/404') as Route;
  setMeta(route);
  if (route === '/') app.innerHTML = homePage();
  else if (route === '/privacy' || route === '/terms') app.innerHTML = legalPage(route.slice(1) as 'privacy' | 'terms');
  else if (route === '/404') app.innerHTML = notFoundPage();
  else currentCleanup = setupGame(route === '/demo');
  if (route !== '/demo' && route !== '/play') bindShell();
  if (route === '/') {
    document.querySelector('#preview-change')?.addEventListener('click', event => {
      const button = event.currentTarget as HTMLButtonElement;
      const changed = button.dataset.changed === 'true';
      button.dataset.changed = String(!changed);
      button.textContent = changed ? 'Change to 1' : 'Change to 2';
      document.querySelector('#preview-value')!.textContent = changed ? '2 squares' : '1 square';
      document.querySelector('#preview-result')!.innerHTML = changed ? '<strong>Before:</strong> the explorer skips the seed.' : '<strong>After:</strong> the explorer lands on the seed and collects it.';
    });
  }
  if (moveFocus) {
    requestAnimationFrame(() => {
      const heading = document.querySelector<HTMLElement>('h1');
      heading?.setAttribute('tabindex', '-1');
      heading?.focus();
      const status = document.querySelector('#route-status');
      if (status) status.textContent = `${document.title} loaded`;
      scrollTo({top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    });
  }
}

function navigate(path: string) {
  history.pushState({}, '', path);
  render(true);
}

addEventListener('popstate', () => render(true));
addEventListener('online', () => document.body.dataset.network = 'online');
addEventListener('offline', () => document.body.dataset.network = 'offline');
document.body.dataset.network = navigator.onLine ? 'online' : 'offline';
render();

if ('serviceWorker' in navigator) addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => undefined));
