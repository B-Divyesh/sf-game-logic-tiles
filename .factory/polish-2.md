# Polish round 2 — cumulative finding closure

- Reviewed base: `cc49a09e5724a4d17ecb1524023a9d369525e813`
- Repair commits: `437c7b6`, `ea759ae`
- Live URL: <https://game-logic-tiles.sociobot.in>
- Live check: 29 August 2026

Shared evidence: `.factory/evidence/polish-2-live/live-verification.json`; live `landing-mobile.png`, `demo-mobile.png`, `demo-desktop.png`, `history-restored.png`, and `404-mobile.png` in that directory; `.factory/evidence/polish-2-verify-url/`; and `.factory/evidence/polish-2-live/lighthouse.json`.

## Review 1 findings

| Finding | Change made | Evidence |
|---|---|---|
| F-1-1 | Kept explicit app-route rewrites and the real standalone 404 response. The built-server test now checks its status. | `production server returns the shared accessible shell with HTTP 404`; `404-mobile.png`; live unknown route returned 404. |
| F-1-2 | Kept the one-click `?demo=1` action with lesson 1 and five controls. | `@claim:demo-first-action`; `demo-mobile.png`; live `/?demo=1`. |
| F-1-3 | Kept the working Move preview and concrete before/after text. | `@claim:landing-preview`; `landing-mobile.png`; live `/`. |
| F-1-4 | Kept all five rule types in the copy and observable browser coverage. | `@claim:rule-types`; `demo-desktop.png`; live `/?demo=1`. |
| F-1-5 | Kept the explicit product limits and route/control crawl. | `@claim:scope-boundaries`; `landing-mobile.png`; live `/`. |
| F-1-6 | Kept checks for all ten distinct lessons and engine solutions for every lesson. | `@claim:ten-lessons`; `solves all ten supplied lessons`; `demo-desktop.png`; live `/demo`. |
| F-1-7 | Kept restoration of a non-default lesson and all five shared rule values. | `@claim:share-seed`; `demo-desktop.png`; live `/demo`. |
| F-1-8 | Preserved a seeded real record through demo use/reset/exit and now verifies every reset default. | `@claim:private-local`, `@claim:demo-reset-resume`; `demo-mobile.png`; live `/?demo=1`. |
| F-1-9 | Kept “Run one turn to update the board and change list.” | `@claim:visible-board-change`; `landing-mobile.png`; live `/`. |
| F-1-10 | Kept plain change-list wording and representative movement, collision, collection, timer, and solved-turn checks. | `@claim:turn-change-list`; `demo-desktop.png`; live `/demo`. |
| F-1-11 | README now accurately says normal saved progress resumes. | `@claim:demo-reset-resume`; `demo-mobile.png`; live `/?demo=1`. |
| F-1-12 | The decorative workshop label remains removed. | `.factory/copy-audit.md`; `landing-mobile.png`; live `/`. |
| F-1-13 | The heading remains “Preview a movement rule.” | `@claim:landing-preview`; `landing-mobile.png`; live `/`. |
| F-1-14 | Replaced the ambiguous “three steps” heading with “How to solve a lesson.” | `.factory/copy-audit.md`; `landing-mobile.png`; live `/#how`. |
| F-1-15 | The instruction continues to use “puzzle,” not setting lore. | `.factory/copy-audit.md`; `landing-mobile.png`; live `/#how`. |
| F-1-16 | Controls and instructions consistently say “Run one turn.” | `@claim:turn-change-list`; `demo-mobile.png`; live `/demo`. |
| F-1-17 | The boundary label remains “Product limits.” | `.factory/copy-audit.md`; `landing-mobile.png`; live `/`. |
| F-1-18 | The boundary heading remains “Fixed puzzles for learning game rules.” | `.factory/copy-audit.md`; `landing-mobile.png`; live `/`. |
| F-1-19 | The preview button names the next Move value. | `@claim:landing-preview`; `landing-mobile.png`; live `/`. |
| F-1-20 | Each rule control names its result and uses touch-neutral helper text. | `@claim:rule-types`, `@claim:keyboard-touch-controls`; `demo-mobile.png`; live `/demo`. |
| F-1-21 | Every app route retains route-specific title, description, canonical, Open Graph, and Twitter values. | `each route updates title, canonical URL, and social metadata`; `live-verification.json`; live app/legal routes. |
| F-1-22 | App and generated standalone 404 now consume one shared shell module. The skip link and every visible mobile target are at least 44 × 44 px. | `production server returns the shared accessible shell with HTTP 404`, target-size test; `404-mobile.png`; live unknown route: 404, zero undersized targets, zero serious/critical Axe findings. |
| F-1-23 | The Terms h1 remains “Terms for using Game Logic Tiles.” | route Axe/outline test; `live-verification.json`; live `/terms`. |

## Review 2 findings

| Finding | Change made | Evidence |
|---|---|---|
| F-2-1 | Each history entry records scroll coordinates and a stable focus key. Popstate restores both; new navigation focuses the h1 at the top. | `back and forward restore the saved scroll position and focused control`; `history-restored.png`; live restoration 1637 → 1637 with focus on Privacy. |
| F-2-2 | Renamed the action to “Start or resume a lesson” and verify saved lesson 2 opens. | `@claim:start-or-resume`; `landing-mobile.png`; live `/` → `/play`. |
| F-2-3 | Added `demo-reset-resume`. It changes all rules, resets every default, exits, and verifies untouched saved lesson 2 state. | `@claim:demo-reset-resume`; `demo-mobile.png`; live `/?demo=1` flow. |
| F-2-4 | Replaced “Solve each lesson in three steps” with “How to solve a lesson.” | `.factory/copy-audit.md`; `landing-mobile.png`; live `/#how`. |
| F-2-5 | README now says demo progress stays separate from saved puzzles in the browser. | `.factory/copy-audit.md`; `demo-mobile.png`; live isolation check. |
| F-2-6 | README explains that `?demo=1` tests sample data without changing normal progress. | `.factory/copy-audit.md`; `demo-mobile.png`; live `/?demo=1`. |
| F-2-7 | README says `npm test` checks repeatable game rules and tests them in Chromium. | Full `npm test`: 5 unit and 28 browser tests passed; `lighthouse.json`. |
| F-2-8 | README describes the deployment outcome in plain words. | `.factory/copy-audit.md`; `404-mobile.png`; live app routes 200 and unknown route 404. |

## Final verification

- All 14 exact commands in `.factory/claims.json` passed independently from clean clone `/tmp/game-logic-tiles-polish-2.H7F6cV`.
- Full local `npm test`: 5 unit tests and 28 Chromium tests passed.
- Live claim suite: 14 tests passed against production.
- Live Lighthouse: 100 performance, accessibility, best practices, and SEO; LCP 1.5 s, CLS 0, TBT 0 ms.
- Built output: JavaScript 9.52 KB gzip; CSS 5.03 KB gzip.
- `npm audit --audit-level=high`: zero vulnerabilities.
- Deployment ID: `c19a4b88-d78e-44e9-b503-2843a5482d83`.

Every finding in both adversarial reviews is closed. No severity remains deferred.
