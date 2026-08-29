import {writeFile} from 'node:fs/promises';
import {shellFooter, shellHeader} from '../src/shell.js';

const document = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Page not found — Game Logic Tiles</title>
  <meta name="description" content="Return to Game Logic Tiles and choose a puzzle.">
  <link rel="canonical" href="https://game-logic-tiles.sociobot.in/404">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Page not found — Game Logic Tiles">
  <meta property="og:description" content="Return to Game Logic Tiles and choose a puzzle.">
  <meta property="og:url" content="https://game-logic-tiles.sociobot.in/404">
  <meta property="og:image" content="https://game-logic-tiles.sociobot.in/assets/social-preview.webp">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Page not found — Game Logic Tiles">
  <meta name="twitter:description" content="Return to Game Logic Tiles and choose a puzzle.">
  <meta name="twitter:image" content="https://game-logic-tiles.sociobot.in/assets/social-preview.webp">
  <meta name="theme-color" content="#071314">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="stylesheet" href="/404.css">
</head>
<body>
  <a class="skip-link" href="#main">Skip to main content</a>
  ${shellHeader('/404')}
  <main id="main" class="lost-page" tabindex="-1">
    <div class="lost-grid" aria-hidden="true"><span>●</span><i></i><i></i><i></i><span>◇</span></div>
    <p class="eyebrow">404</p>
    <h1>Page not found</h1>
    <p>This page is not available. Return home to choose a puzzle.</p>
    <a class="primary-button" href="/">Return home</a>
  </main>
  ${shellFooter()}
</body>
</html>
`;

await writeFile(new URL('../public/404.html', import.meta.url), document);
