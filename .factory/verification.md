# Independent verification — FAIL

**Candidate:** `96fafe2f20dec95b393a92440103dae1d2173570`  
**Live URL:** https://game-logic-tiles.sociobot.in  
**Verified:** 2026-08-28 (UTC)  
**Verdict:** **FAIL — do not release this candidate.**

## Cold first read

The cold landing page plainly says it is a small game-logic workshop where a
puzzle beginner changes rules and sees the game react. It identifies the
audience (“puzzle beginners”), and its first primary action is **Try it with
sample data**, with the adjacent explanation that it opens puzzle 1 with five
rules to change. This satisfies the plain-words and one-click-demo first-read
gate.

## Release-blocking findings

### High — interactive targets are below the required 44 × 44 CSS px

The persistent demo banner contains controls that are too small on the live
site. Measured by a fresh Playwright browser context:

| Route / viewport | Control | Measured size |
| --- | --- | --- |
| `/demo`, 1440 × 900 | Reset demo | 99 × 41 px |
| `/demo`, 1440 × 900 | Start for real | 95 × 36 px |
| `/demo`, 390 × 844 | Start for real | 61 × 37 px |
| `/demo`, 390 × 844 | Terms footer link | 35 × 44 px |

The contract and accessibility baseline require every touch/click target to be
at least 44 × 44 px. These controls are keyboard reachable and have a visible
3px focus outline, but that does not meet the minimum physical target size.

### High — user-facing claims are missing from `.factory/claims.json`

The claims contract requires every visitor-reliant claim in the landing page
and README to have a corresponding claim entry and a tagged demo-sandbox test.
The README asserts **“Each step shows a plain state diff”** and **“Keyboard and
touch controls.”** Neither appears in `.factory/claims.json`, whose five IDs
only cover ten lessons, free use, local privacy, challenge seeds, and offline
reload. The landing-page statement **“Every move changes a small, visible
world”** is likewise not listed. This is a release-blocking claims-contract
failure even though the independently exercised examples behaved as stated.

## Required claims from a clean checkout

The first direct claim command before dependency installation correctly could
not launch because this clean checkout had no `node_modules` (`vitest: not
found`). After the required `npm ci`, every exact command in
`.factory/claims.json` passed, each through the `/demo` entry point:

| Claim ID | Exact command | Result |
| --- | --- | --- |
| `ten-lessons` | `npm test -- --grep @claim:ten-lessons` | PASS |
| `free-use` | `npm test -- --grep @claim:free-use` | PASS |
| `private-local` | `npm test -- --grep @claim:private-local` | PASS |
| `share-seed` | `npm test -- --grep @claim:share-seed` | PASS |
| `offline-reload` | `npm test -- --grep @claim:offline-reload` | PASS |

## Build and test evidence

- `npm ci`: completed. `npm audit --omit=dev --audit-level=high`: **0 runtime
  vulnerabilities**. (The full install audit reported two dev-only findings.)
- `npm test`: **PASS** — 5 Vitest tests, exact production build, and 13
  Playwright tests; Playwright’s final status was `passed`.
- `npm run build`: **PASS** — TypeScript type check and Vite production build.
  Output is in `dist/`.
- No separate lint script exists. The type check is included in `npm run build`.
- No `verify-url.sh` exists in this checkout or `/work`; equivalent live checks
  were performed independently below.

## Independent live-product exercise

- Normal flow: in `/demo`, changed Move from 2 to 1, stepped, collected the
  seed, undid, reset, and created a challenge URL. The created URL was
  `https://game-logic-tiles.sociobot.in/demo?seed=GLT1-11S151-4`.
- Keyboard: focused the game, used ArrowRight and Enter, and observed the same
  collection state change. Tabbing reached every visible control and showed a
  `rgb(245, 187, 85) solid 3px` focus ring; no trap was observed.
- Boundary/recovery: Timer advanced 6 → 7 → 8 → 9 → 10 → 11 → 12 → 3; an
  invalid seed produced “That seed is incomplete or damaged. Copy the full seed
  and try again.”, set `aria-invalid="true"`, and returned focus to the input.
- Demo isolation: demo wrote only `demo:game-logic-tiles:progress`; choosing
  Start for real removed it and `/play` started with no demo key.
- Offline/PWA: after the live service worker controlled `/demo`, offline reload
  returned 200 from the cache, rendered “The missed seed”, and showed Offline.
  The service worker has an explicit versioned cache, `skipWaiting`,
  `clients.claim`, and old-cache cleanup, which provides the update path.
- Mobile: at 390 × 844 there was no horizontal overflow (`390 == 390`) and the
  Left touch control changed facing direction. The target-size defect above
  remains.
- Reduced motion: live computed styles on the animated seed were
  `animation: none`, `transition: none`, and document scroll behavior `auto`.

## Accessibility and browser evidence

- Fresh live Axe scans of `/`, `/demo`, `/privacy`, `/terms`, and an unknown
  route found **zero serious or critical violations**.
- Each scan found `lang="en"`, exactly one `main`, exactly one `h1`, valid
  route title, and no console or page errors.
- The custom 404 page rendered at an unknown SPA route with a return-home link.
- The attempted Lighthouse CLI run could not complete in this container: its
  supplied Chrome path caused a browser-tab crash. This is not used to excuse
  the target-size failure; Axe, browser behavior, and bundle measurements were
  independently completed.

## Privacy, deployment, and performance

- Fresh-page request recording across the landing and demo flows found no
  foreign runtime origin or tracking request. The application has no API or
  product-unlock endpoint, so rate-limit testing is not applicable.
- HTTPS responses carry CSP restricted to `'self'`, HSTS, `nosniff`, and a
  strict cross-origin referrer policy. Hashed JS/CSS have
  `cache-control: public, max-age=31536000, immutable`; `sw.js` is `no-cache`.
- Local production sizes: JS 25,306 B / **9,012 B gzip**; CSS 18,603 B /
  **5,011 B gzip**; mobile hero WebP **29,732 B**. These meet the stated
  static-web budgets.
- All application and visible-asset hashes match the built candidate, including
  `index.html`, JS, CSS, service worker, manifest, hero images, social preview,
  favicon, and app icons. The live deployment is therefore this candidate.
- Crawled internal routes and the declared Param Factory external link; all
  returned HTTP 200.

## Remediation before re-verification

1. Make every interactive target at least 44 × 44 CSS px on desktop and 390px
   mobile, including demo-banner and footer links, while preserving spacing.
2. Add or remove every unlisted user-facing assertion. For retained promises,
   add one corresponding `.factory/claims.json` entry and one exact
   `@claim:<id>` demo-sandbox test. Re-run all claim commands from a fresh
   install.

