# Game Logic Tiles — polish round 1 handoff

## Outcome

All 23 findings in `.factory/review-1.md` are resolved and verified. The
production static site is deployed at
https://game-logic-tiles.sociobot.in.

The repair preserves the moonlit-marsh and brass-instrument visual system. It
adds an isolated one-click `?demo=1` path, a persistent demo banner with reset
and leave actions, exhaustive claim coverage, direct beginner copy, explicit
SWA route rewrites, true HTTP 404 handling, complete 404/legal skeletons, and
route-specific social metadata.

## Commits and deployment

- Repair: `879fe72a2ad0efe804343c5a771e8605f9bec458`
- Visual evidence: `b46bc3feecfadc6bd71ecb0e142046ce603665ab`
- Deployment: `/opt/fleet/lib/deploy-static.sh game-logic-tiles dist`

The deployment was cold-checked after upload. Home returned HTTP 200 with
“Game Logic Tiles — Change rules through play”; `/demo` returned HTTP 200;
`/not-a-real-route` returned HTTP 404 with the full styled not-found
document.

## Verification

- Fresh clone: `/tmp/game-logic-tiles-clean.7QBGCZ`; ran `npm ci`, `npm test`,
  and every command declared in `.factory/claims.json` individually.
- Unit, typecheck, build, and browser suite: 5 Vitest tests and 24 Playwright
  tests passed. The browser suite includes Axe on every product route,
  offline reload, no-console-error flow, 44px target sweep, mobile overflow,
  metadata, and error-state checks.
- All 12 claim commands passed: `demo-first-action`, `landing-preview`,
  `ten-lessons`, `rule-types`, `scope-boundaries`, `free-use`,
  `private-local`, `share-seed`, `offline-reload`,
  `visible-board-change`, `turn-change-list`, and
  `keyboard-touch-controls`.
- Live cold-browser recheck passed for landing action, demo storage isolation,
  reset/leave behavior, rewritten copy, rule labels, preview behavior,
  mobile 390px layout, route titles/metadata, Terms heading, HTTP 404, zero
  serious/critical Axe findings, and no console errors.
- Lighthouse against live `/?demo=1`: Performance **100**, Accessibility
  **100**, LCP **1.1 s**, CLS **0**.
- Production audit: `npm audit --omit=dev` reports 0 vulnerabilities.
- Built JavaScript is 9.14 kB gzip; CSS is 5.03 kB gzip.

Screenshots: `.factory/evidence/landing-mobile.png`,
`.factory/evidence/demo-desktop.png`,
`.factory/evidence/demo-mobile.png`,
`.factory/evidence/live-demo-desktop.png`, and
`.factory/evidence/live-landing-mobile.png`.

## How to run

```sh
npm ci
npm test
npm run build
npm run dev
```

Use `http://localhost:5173/?demo=1` for the isolated sample. Deployment
uploads `dist/` through the static work-order command above.

## Known gaps

None.
