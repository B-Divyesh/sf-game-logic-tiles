# Independent verification 2 — PASS

**Candidate:** `bed5b8eea9f290308b73e3321c5270403ca0f81f`  
**Live URL:** https://game-logic-tiles.sociobot.in  
**Verified:** 2026-08-29 UTC  
**Verdict:** **PASS — release candidate is acceptable.**

This fresh independent verification follows the earlier failure report in
`verification.md`. Product source was not modified.

## Cold first read

On a cold live visit, the first screen says **“Change rules. See the game
react.”** It names **“puzzle beginners who want to understand game logic before
learning code.”** Its primary action is **“Try it with sample data,”** with the
adjacent result **“It opens puzzle 1 with five rules to change.”** It also gives
three short facts: free/no purchases, private/no account or tracking, and
offline after the first visit. The first-read and one-click-demo gates pass.

## Required claims from a clean install

`npm ci` completed. Every exact command declared in `.factory/claims.json`
passed, each building the production app and exercising `/demo`:

| Claim ID | Exact command | Result |
| --- | --- | --- |
| `ten-lessons` | `npm test -- --grep @claim:ten-lessons` | PASS |
| `free-use` | `npm test -- --grep @claim:free-use` | PASS |
| `private-local` | `npm test -- --grep @claim:private-local` | PASS |
| `share-seed` | `npm test -- --grep @claim:share-seed` | PASS |
| `offline-reload` | `npm test -- --grep @claim:offline-reload` | PASS |
| `visible-world-change` | `npm test -- --grep @claim:visible-world-change` | PASS |
| `state-diff` | `npm test -- --grep @claim:state-diff` | PASS |
| `keyboard-touch-controls` | `npm test -- --grep @claim:keyboard-touch-controls` | PASS |

The eight entries cover the visitor-reliant promises in the landing page and
README: lessons, free use, browser-local privacy, challenge seeds, offline,
visible changes, state diffs, and keyboard/touch input.

## Local quality gates

- `npm test`: **PASS** — 5 Vitest rule-engine tests and 17 Chromium Playwright
  tests; its script includes the production build.
- `npm run build`: **PASS** — TypeScript `--noEmit` and Vite build produced
  `dist/`.
- No separate lint script is declared; `npm run lint` reports `Missing script`.
  The available type check runs in the build.
- `npm audit --omit=dev --audit-level=high`: **0 vulnerabilities**.
- Build output: JS 25,306 B (**9,010 B gzip**); CSS 18,739 B (**5,021 B gzip**);
  mobile hero WebP 29,732 B. These meet the static-web budgets.

## Independent live-product exercise

- Changed Move from 2 to 1 and stepped four times: **“The beacon is lit.
  Puzzle solved.”** Undo produced **“Last step undone.”** Reset produced
  **“World reset. Choose a direction, then step.”**
- Loading `BROKEN` displayed **“That seed is incomplete or damaged. Copy the
  full seed and try again.”**, set `aria-invalid="true"`, and restored focus to
  `seed-input`.
- Timer cycles at its upper boundary from 12 to 3. Rule edits reset the world
  for a clean experiment.
- After changing Move and Score, a generated
  `.../demo?seed=GLT1-11S152-5` link restored **Move 1 Square**, **Score 2 Per
  Seed**, and all five rule tiles in a fresh page.
- Demo wrote only `demo:game-logic-tiles:progress`. **Start for real** opened
  `/play` and the demo key was absent afterward.
- At 390 × 844, ArrowRight then Enter yielded **“Moved 2 squares.”** The Left
  touch button yielded **“Facing ←Left. Press Step world.”** There was no
  horizontal overflow (390 = 390) and no visible enabled control below 44 × 44
  CSS px.
- Keyboard focus showed `rgb(245, 187, 85) solid 3px`. With reduced motion,
  gem animation and player transition were `none` and scroll behavior `auto`.

## Accessibility, privacy, PWA, and headers

- Fresh Axe Playwright scans of `/`, `/demo`, `/privacy`, `/terms`, and an
  unknown route found **zero serious or critical violations**. Every route had
  `lang="en"`, exactly one `<main>` and `<h1>`, correct title, and no console or
  page error. The unknown route rendered the themed in-app 404.
- A live request log across the demo, edits, sharing, and leaving demo had **no
  foreign request** and no tracking. There is no backend, sign-in, payment,
  product-unlock, or API endpoint, so Entra and 429/rate-limit checks do not
  apply.
- The service worker controlled `/demo`; `registration.update()` left no
  waiting worker and reported active `/sw.js` at the root scope. Offline reload
  rendered **“The missed seed”** and visible **Offline** status. Source review
  confirms a versioned cache, `skipWaiting`, `clients.claim`, and old-cache
  cleanup.
- HTTPS returns self-only CSP with response-header `frame-ancestors 'none'`,
  HSTS, `nosniff`, strict cross-origin referrer policy, and restrictive
  permissions policy. Hashed JS/CSS are immutable for one year; `sw.js` is
  `no-cache`.
- All discovered internal links and the Param Factory link returned HTTP 200;
  `robots.txt` and `sitemap.xml` are present.

## Deployment identity

The rebuilt candidate and live deployment have matching SHA-256 bytes for
`index.html`, JS/CSS, service worker, manifest, icons, 404 assets,
robots/sitemap, hero image, and social image. The live site is this candidate,
not merely a similar prior deployment.

## Defects by severity

- **Critical:** none.
- **High:** none.
- **Medium:** none.
- **Low:** none.
- **Informational:** no standalone lint command exists; type checking runs in
  the required build.
