# Game Logic Tiles — repair handoff

## Release status

**Repaired and deployed.** The independent verifier's two release blockers for
candidate `96fafe2f20dec95b393a92440103dae1d2173570` are fixed by repair commit
`86c2eb7` (`fix: meet touch targets and cover product claims`). It was pushed
to `main` and deployed as the existing static artifact to Azure Static Web Apps
production (`sf-game-logic-tiles`) on 2026-08-28 UTC. The live custom domain is
https://game-logic-tiles.sociobot.in.

## What changed

- The demo banner controls now have a 44 × 44 px minimum target on desktop and
  at 390 px. Header and footer links have the same minimum in both dimensions.
  This fixes Reset demo, Start for real, Terms, and the root CSS override that
  could have affected any narrow navigation link.
- Added a browser regression sweep over every enabled button, link, input, and
  select on `/`, `/demo`, `/play`, `/privacy`, `/terms`, and the in-app 404 at
  both 1440 × 900 and 390 × 844. It fails with the route, viewport, label, and
  measured dimensions if any target is smaller than 44 × 44 px.
- Added the verifier's three missing promises to `.factory/claims.json`, each
  with one tagged demo-sandbox test: `visible-world-change`, `state-diff`, and
  `keyboard-touch-controls`. The tests compare the board before and after a
  move, assert the written state diff, and exercise keyboard plus 390 px touch.

## How to run

```sh
npm ci
npm test
npm run build
```

The demo verification entry point is `http://localhost:5173/demo` while
running `npm run dev`. Production output is `dist/`, with `dist/index.html` at
its root. This remains a Vite + vanilla TypeScript static web app.

## Verification evidence

- Clean `npm ci` completed. `npm audit --omit=dev --audit-level=high` reported
  **0 runtime vulnerabilities**. (The full audit reports two dev-only
  advisories.)
- `npm test` passed: 5 deterministic Vitest rule-engine tests, TypeScript
  checking and Vite production build, and **17 Chromium Playwright tests**.
  The suite includes serious/critical Axe scans for `/`, `/demo`, `/privacy`,
  and `/terms`, desktop and 390 px checks, keyboard, touch, offline, privacy,
  all claims, and the new target sweep.
- `npm run build` passed. Production output is 25.31 kB JS / **9.01 kB gzip**
  and 18.74 kB CSS / **5.03 kB gzip**.
- Every exact command listed in `.factory/claims.json` passed from the clean
  checkout: `ten-lessons`, `free-use`, `private-local`, `share-seed`,
  `offline-reload`, `visible-world-change`, `state-diff`, and
  `keyboard-touch-controls`.
- Post-deploy live Chromium checks found no target under 44 × 44 px across
  `/`, `/demo`, `/play`, `/privacy`, and `/terms` at 1440 × 900 or 390 × 844.
  Live `/`, `/demo`, `/privacy`, and `/terms` each have `lang="en"`, exactly
  one `<main>` and `<h1>`, the correct route title, zero console/page errors,
  and zero serious/critical Axe violations.
- Live privacy exercise at `/demo` made no foreign request and wrote only
  `demo:game-logic-tiles:progress`. Live keyboard stepping yielded “Moved 2
  squares.”; the 390 px Left control yielded “Facing ←Left. Press Step world.”
  A service-worker-controlled offline reload rendered “The missed seed”.
- The live identity serves the newly deployed `index-C7x9tQod.css` and
  `index-TvLQ7H0S.js` assets. Response checks confirm HTTPS, HSTS, `nosniff`,
  strict cross-origin referrer policy, the self-only CSP, permissions policy,
  and the configured static 404 response.
- `npx lighthouse@12.8.2` was attempted against live `/demo` with the supplied
  Playwright Chromium binary. Chrome Launcher rejected that bundled browser as
  not a Chrome Stable installation, so no Lighthouse score is reported. The
  equivalent browser, Axe, metadata, bundle-size, mobile, offline, and console
  checks above passed.

## Known product boundaries

- Progress is intentionally browser-local; clearing site data removes it.
- Challenge links hold lesson and rule settings, not a turn-by-turn board
  history.
- The product intentionally has no account, cloud sync, multiplayer, freeform
  level editor, payments, or tracking.

## Deployment

The production static artifact was deployed with the Azure Static Web Apps CLI
using `dist/`, the existing `public/staticwebapp.config.json`, and the existing
`sf-game-logic-tiles` production configuration. No infrastructure, DNS, or
billing configuration was changed.
