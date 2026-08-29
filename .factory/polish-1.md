# Polish round 1 — review finding closure

Reviewed candidate: `bed5b8eea9f290308b73e3321c5270403ca0f81f`  
Repair commits: `879fe72a2ad0efe804343c5a771e8605f9bec458`, `b46bc3feecfadc6bd71ecb0e142046ce603665ab`  
Live verification: 2026-08-29 at [game-logic-tiles.sociobot.in](https://game-logic-tiles.sociobot.in/)

| Finding | Change made | Evidence |
|---|---|---|
| F-1-1 | Replaced blanket navigation fallback with explicit rewrites for the four app routes; unknown paths now reach `404.html`. | Live `/not-a-real-route`: HTTP 404 and “Page not found”; static config assertion. |
| F-1-2 | Landing action now opens `?demo=1`, lesson 1, banner, and five rule controls. | `@claim:demo-first-action`; live cold action check. |
| F-1-3 | Rewrote the preview and added an observable preview claim test. | `@claim:landing-preview`; [landing mobile screenshot](evidence/landing-mobile.png). |
| F-1-4 | Added a five-rule-type claim test and removed the inaccurate “one-screen” wording. | `@claim:rule-types`; deterministic game tests. |
| F-1-5 | Kept the explicit product limit and added a route/control/destination boundary claim test. | `@claim:scope-boundaries`; live route sweep. |
| F-1-6 | Browser test loads all ten distinct lessons; deterministic engine test solves every supplied lesson. | `@claim:ten-lessons`; `tests/unit/game.test.ts`. |
| F-1-7 | Share test selects lesson 5, changes all five rules, and restores every value in a fresh context. | `@claim:share-seed`. |
| F-1-8 | Privacy test seeds a normal-progress sentinel, uses/reset demo, starts real play, and proves normal bytes persist while demo storage is removed. | `@claim:private-local`; live cold demo isolation check. |
| F-1-9 | Replaced the broad caption with “Run one turn to update the board and change list.” | `@claim:visible-board-change`; [live demo screenshot](evidence/live-demo-desktop.png). |
| F-1-10 | Replaced “state diff” with a concrete change list and exercised movement, collision, collection, timer, and solved turns. | `@claim:turn-change-list`. |
| F-1-11 | Corrected README and demo documentation: normal progress resumes after leaving demo. | `@claim:private-local`; live sentinel flow. |
| F-1-12 | Removed the decorative hero label. | Live cold landing copy sweep. |
| F-1-13 | Renamed preview heading to “Preview a movement rule.” | `@claim:landing-preview`; live copy sweep. |
| F-1-14 | Renamed the process section “Solve each lesson in three steps.” | Live copy sweep. |
| F-1-15 | Replaced “clearing” with “puzzle” in the first step. | Live copy sweep. |
| F-1-16 | Renamed action and keyboard instruction to “Run one turn.” | `@claim:turn-change-list`; [demo mobile screenshot](evidence/demo-mobile.png). |
| F-1-17 | Renamed the boundary label “Product limits.” | Live copy sweep. |
| F-1-18 | Renamed the boundary heading “Fixed puzzles for learning game rules.” | Live copy sweep. |
| F-1-19 | Preview control names the changed value: “Set Move to 1 square/2 squares.” | `@claim:landing-preview`. |
| F-1-20 | Each rule button has a result-naming accessible label and touch-neutral helper text. | `@claim:rule-types`; live rule-label check. |
| F-1-21 | Route metadata now updates title, description, canonical, Open Graph, and Twitter fields. | `each route updates title, canonical URL, and social metadata`; live route sweep. |
| F-1-22 | Rebuilt standalone 404 with the shared header/footer, legal links, metadata, manifest, icons, and direct wording. | Live HTTP 404 skeleton check; [404 screenshot](evidence/not-found-app-preview.png). |
| F-1-23 | Changed the Terms h1 to “Terms for using Game Logic Tiles.” | Live `/terms` title/heading check. |

No earlier `.factory/review-*.md` or `.factory/polish-*.md` existed before this round. All review findings are closed.
