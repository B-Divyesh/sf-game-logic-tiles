# Adversarial first-read review 2 — Game Logic Tiles

**Verdict: FAIL**

Reviewed 29 August 2026 against live production at
`https://game-logic-tiles.sociobot.in` and repository candidate
`4582164589bdce4ce8707100df9920a84be087d7`. The cold first screen and demo
pass. All 12 declared claim commands pass from a clean clone. Two blocking,
two major, and five minor findings remain, so this round cannot pass.

## Findings

### Blocking

#### F-1-22 — The deployed 404 still does not use the shared accessible shell

- **Exact location:** live `GET /not-a-real-route` at 390 × 844 and
  `public/404.html` / `public/404.css`. The standalone header omits “How it
  works”; the footer omits “Environmental artwork generated for this project”
  and the external-site cue used by app routes. “Skip to main content” measures
  186.6 × 39 px and “Terms” measures 38.3 × 44 px. Both fail the 44 × 44 px
  target baseline.
- **Why this fails:** F-1-22 required the standalone response to use the shared
  header and footer. It now has a similar shell, but not the same shell, and its
  mobile targets regress accessibility. The local target-size test exercises
  Vite's in-app 404 rather than the deployed `404.html`, so it cannot detect
  this defect. This earlier finding is only half-fixed and is therefore
  blocking again under the same ID.
- **Concrete fix:** generate the standalone 404 from the same shell content and
  target-size rules as app routes. Add a production-server or deployed test
  that requests an unknown path, asserts HTTP 404, compares the header/footer
  destinations, and checks every visible target at 390 px.

#### F-2-1 — Back navigation discards the previous scroll and focus state

- **Exact location:** live SPA navigation and `src/main.ts`, `popstate` handler.
  From home scrolled to “How it works,” the measured scroll position was
  `1612`. After opening Privacy and pressing Back, the home route returned at
  `0` with focus forced to the home h1.
- **Why this fails:** the routing contract requires back/forward navigation to
  restore scroll and focus. The correct URL returns, but the visitor loses
  their place. `popstate` calls `render(true)`, and `render(true)` always focuses
  the h1 and scrolls to the top.
- **Concrete fix:** save scroll position and the focused element per history
  entry. Restore them on `popstate`; keep h1 focus and top scroll for new
  `pushState` navigation. Add a browser test that starts below the fold, opens
  another route, presses Back, and asserts the prior scroll and focus state.

### Major

#### F-2-2 — “Start lesson 1” can resume a different lesson

- **Exact quote/location:** landing boundary action, “Start lesson 1.”
- **Why this fails:** `/play` loads `game-logic-tiles:progress`. With saved
  lesson 2 progress, this action opens “Hands full,” not lesson 1. The button is
  a result-naming promise that is false for returning visitors.
- **Concrete fix:** rename it “Start or resume a lesson,” or make this specific
  action explicitly reset and open lesson 1. Add a test with saved lesson 2
  progress that asserts the chosen behavior.

#### F-2-3 — README demo reset/resume is an unlisted claim

- **Exact quote/location:** README demo paragraph, “Reset demo restores the
  sample, and Start for real leaves the demo and resumes your saved progress.”
- **Why this fails:** no `.factory/claims.json` claim states this full promise.
  `private-local` covers separate storage and does assert resuming a sentinel,
  but after reset it checks only the lesson heading, not restoration of the
  sample's five default rule values. The live behavior worked, but the claim
  contract has a regression gap.
- **Concrete fix:** add the reset-and-resume wording to a claim entry and assert
  lesson 1 plus all five default rules after Reset, then assert the untouched
  real sentinel is resumed after Start for real.

### Minor

#### F-2-4 — “Three steps” conflicts with the product's use of “turn”

- **Exact quote/location:** landing h2, “Solve each lesson in three steps.”
- **Why this fails:** the numbered items are phases, while the game uses
  “turn” for simulation actions. Lesson 1 needs several turns, so “three steps”
  can be read as an exact solution length and breaks the terminology table.
- **Concrete fix:** use “How to solve a lesson.”

#### F-2-5 — “Browser key” is storage jargon

- **Exact quote/location:** README, “The demo stores progress under a separate
  `demo:` browser key.”
- **Why this fails:** “browser key” does not tell a reader what remains
  separate or why it matters.
- **Concrete fix:** “The demo keeps its progress separate from your saved
  puzzles in this browser.”

#### F-2-6 — “Verification sandbox” is unexplained jargon

- **Exact quote/location:** README Run locally, “Open
  `http://localhost:5173/?demo=1` for the verification sandbox.”
- **Why this fails:** the phrase describes the factory process rather than what
  the URL does for the reader.
- **Concrete fix:** “Open `http://localhost:5173/?demo=1` to test sample data
  without changing normal progress.”

#### F-2-7 — “Deterministic rule-engine tests” is needlessly dense

- **Exact quote/location:** README Test and build, “`npm test` runs
  deterministic rule-engine tests, builds the site, and runs Chromium browser
  tests.”
- **Why this fails:** two technical modifiers hide the useful result.
- **Concrete fix:** “`npm test` checks repeatable game rules, builds the site,
  and tests it in Chromium.”

#### F-2-8 — The deploy description uses implementation jargon before outcome

- **Exact quote/location:** README Deploy, “`staticwebapp.config.json` rewrites
  only the product routes, supplies security headers, and returns the styled
  404 response for unknown paths.”
- **Why this fails:** “rewrites” and “supplies” make a simple deployment outcome
  harder to scan.
- **Concrete fix:** “The deployment config serves app routes, adds security
  headers, and shows the designed not-found page for unknown paths.”

## Cold first screen

Fresh Chromium contexts were opened without scrolling.

| Viewport | What this does, in reviewer words | For whom | First click | Result |
|---|---|---|---|---|
| 390 × 844 | Lets someone change game rules and see each resulting turn. | Puzzle beginners learning game logic before code. | “Try it with sample data.” | Clear; pass. |
| 1440 × 900 | Lets someone change rules in small game puzzles and observe each turn. | Puzzle beginners learning game logic before code. | “Try it with sample data.” | Clear; pass. |

At both sizes the first screen contains the job headline, audience, primary
action, the action result, and all three facts. The desktop “Offline” line is
near the bottom but remains fully visible.

## Copy audit

Counts treat hyphenated terms, paths, and displayed numbers as one word.
Symbols are not words. No sentence exceeds 22 words and no banned marketing
word appears. Every landing-page copy unit and every README prose sentence or
heading is listed. Finding IDs mark the flagged copy.

### Landing page

| Location | Exact copy | Words | Result |
|---|---|---:|---|
| Skip link | Skip to main content | 4 | Pass |
| Wordmark | Game Logic Tiles | 3 | Pass |
| Header link | Demo | 1 | Pass |
| Header link | How it works | 3 | Pass |
| Header link | Privacy | 1 | Pass |
| Hero h1 | Change game rules. See each turn. | 6 | Pass |
| Hero audience | For puzzle beginners who want to understand game logic before learning code. | 12 | Pass |
| Hero action | Try it with sample data | 5 | Pass |
| Hero action note | Opens lesson 1 with five rule controls. | 7 | Pass: `demo-first-action` |
| Fact | Free. | 1 | Pass: `free-use` |
| Fact | No purchases. | 2 | Pass: `free-use` |
| Fact | Private. | 1 | Pass: `private-local` |
| Fact | No account or tracking. | 4 | Pass: `private-local` |
| Fact | Offline. | 1 | Pass: `offline-reload` |
| Fact | Reopens after your first visit. | 5 | Pass: `offline-reload` |
| Hero image alt | A lantern explorer crosses a moonlit grid toward a glowing seed. | 11 | Pass |
| Hero caption | Run one turn to update the board and change list. | 10 | Pass: `visible-board-change` |
| Preview label | Live preview | 2 | Pass |
| Preview h2 | Preview a movement rule | 4 | Pass |
| Preview instruction | Set Move to see the board result. | 7 | Pass: `landing-preview` |
| Preview rule | Move | 1 | Pass |
| Preview value | 2 squares | 2 | Pass |
| Preview button | Set Move to 1 square | 5 | Pass |
| Preview state | Before: the explorer skips the seed. | 6 | Pass: `landing-preview` |
| Section label | How it works | 3 | Pass |
| Section h2 | Solve each lesson in three steps | 6 | F-2-4 |
| Step h3 | Read the goal | 3 | Pass |
| Step text | Each puzzle asks you to reach one result. | 8 | Pass: covered by playable-lesson checks |
| Step h3 | Change a rule | 3 | Pass |
| Step text | Edit movement, collisions, collecting, time, or points. | 7 | Pass: `rule-types` |
| Step h3 | Run one turn | 3 | Pass |
| Step text | After each turn, see the position, turn, seeds, and score that changed. | 12 | Pass: `turn-change-list` |
| Section label | Product limits | 2 | Pass |
| Section h2 | Fixed puzzles for learning game rules | 6 | Pass |
| Boundary sentence | Game Logic Tiles has ten playable lessons. | 7 | Pass: `ten-lessons` |
| Boundary sentence | It does not include accounts, multiplayer, freeform code, or an asset store. | 12 | Pass: `scope-boundaries` |
| Boundary action | Start lesson 1 | 3 | F-2-2 |
| Footer brand | Game Logic Tiles | 3 | Pass |
| Footer sentence | Change a rule. | 3 | Pass |
| Footer sentence | See what it caused. | 4 | Pass |
| Footer link | Privacy | 1 | Pass |
| Footer link | Terms | 1 | Pass |
| Footer link | Built by Param Factory | 4 | Pass |
| External cue | external site | 2 | Pass |
| Footer build | Version 1.0 · build 2026.08 | 4 | Pass |
| Footer credit | Environmental artwork generated for this project. | 6 | Pass |

### README

Code blocks are commands rather than prose and are not separate rows.

| Location | Exact copy | Words | Result |
|---|---|---:|---|
| h1 | Game Logic Tiles | 3 | Pass |
| Intro | Change game rules and see each turn. | 7 | Pass |
| Intro | Game Logic Tiles is for puzzle-loving beginners who want to learn game logic before learning a programming language or engine. | 20 | Pass |
| Intro | Ten lessons cover movement, collisions, collecting, timers, and scoring. | 9 | Pass: `rule-types` |
| Intro | After each turn, a list shows the position, turn, seeds, and score that changed. | 14 | Pass: `turn-change-list` |
| Demo | Try the isolated sample at `?demo=1` or `/demo`. | 8 | Pass |
| Demo | The demo stores progress under a separate `demo:` browser key. | 10 | F-2-5 |
| Demo | Reset demo restores the sample, and Start for real leaves the demo and resumes your saved progress. | 17 | F-2-3 |
| h2 | What it includes | 3 | Pass |
| Feature | Ten playable lessons with editable rule tiles. | 7 | Pass: `ten-lessons` |
| Feature | Keyboard and touch controls. | 4 | Pass: `keyboard-touch-controls` |
| Feature | Challenge seeds that hold one lesson and five rule values. | 10 | Pass: `share-seed` |
| Feature | Offline reloads after the first visit. | 6 | Pass: `offline-reload` |
| Feature | Local browser storage with no account or tracking. | 8 | Pass: `private-local` |
| Feature | Free use with no purchases. | 5 | Pass: `free-use` |
| Boundary | The project does not include accounts, multiplayer, freeform programming, or an asset store. | 13 | Pass: `scope-boundaries` |
| h2 | Run locally | 2 | Pass |
| Requirement | Requires Node.js 20 or later. | 5 | Pass |
| Instruction | Open `http://localhost:5173/?demo=1` for the verification sandbox. | 6 | F-2-6 |
| h2 | Test and build | 3 | Pass |
| Test | `npm test` runs deterministic rule-engine tests, builds the site, and runs Chromium browser tests. | 14 | F-2-7 |
| Build | The exact production build command is `npm run build`. | 9 | Pass |
| Build | Output lands in `dist/`, with `dist/index.html` at its root. | 9 | Pass |
| h2 | Deploy | 1 | Pass |
| Deploy | Deploy the contents of `dist/` as a static site. | 9 | Pass |
| Deploy | `staticwebapp.config.json` rewrites only the product routes, supplies security headers, and returns the styled 404 response for unknown paths. | 18 | F-2-8 |
| h2 | Privacy and license | 3 | Pass |
| Privacy | Puzzle progress stays in local browser storage. | 7 | Pass: `private-local` |
| Privacy | See `/privacy` and `/terms` for the user-facing policies. | 8 | Pass |
| License | The source code is available under the MIT License. | 9 | Pass; `LICENSE` exists |
| Artwork | The environmental artwork was generated for this project. | 8 | Pass; provenance is recorded |
| Artwork | Its prompt and provenance are recorded in `.factory/design.md`. | 8 | Pass |

## Demo and sandbox

- The landing action enters a populated lesson in one click on mobile and
  desktop. The first demo screen already shows “The missed seed,” its objective,
  board, five editable rules, status, and controls.
- The persistent banner says “Demo — sample data, nothing is saved” and offers
  Reset demo and Start for real.
- A pre-existing real-progress sentinel for lesson 2 remained byte-for-byte
  unchanged while Move changed in demo and after Reset. Demo writes only
  `demo:game-logic-tiles:progress`. Start for real removed that key and resumed
  lesson 2.
- Reset restored lesson 1 and Move to 2 squares in the live exercise. The
  missing complete regression assertion is F-2-3.
- The full live flow made no cross-origin request. No analytics, third-party
  script, provider key, Azure endpoint, or AI endpoint appears in source.
- After the first live load, the service worker controlled the demo. An offline
  reload rendered “The missed seed” and the visible Offline status.

## Claims from a clean clone

Fresh clone: `/tmp/game-logic-tiles-review-2.BMGJjS` at the reviewed candidate.
Every exact command in `.factory/claims.json` was run separately.

| Claim ID | Result | Evidence checked |
|---|---|---|
| `demo-first-action` | PASS | Landing click opened `?demo=1`, lesson 1, banner, and five controls. |
| `landing-preview` | PASS | Move changed and the before/after result changed. |
| `ten-lessons` | PASS | All ten distinct lessons loaded; unit tests solve all ten. |
| `rule-types` | PASS | Movement, collision, collection, timer, and score changed observable state. |
| `scope-boundaries` | PASS | Shipped routes expose no account, multiplayer, editor, or marketplace path. |
| `free-use` | PASS | No purchase control or payment destination exists. |
| `private-local` | PASS | Real sentinel persisted, demo namespace was removed, and requests were same-origin. |
| `share-seed` | PASS | Lesson 5 and all five rule values reopened in a fresh context. |
| `offline-reload` | PASS | Demo reloaded with the test browser offline. |
| `visible-board-change` | PASS | One turn changed the board and four-row change list. |
| `turn-change-list` | PASS | Movement, collision, collection, timer, and solved turns showed changes. |
| `keyboard-touch-controls` | PASS | Keyboard turn and 390 px touch direction both worked. |

The full `npm test` also passed: 5 unit tests and 24 Playwright tests. A separate
`npm run build` produced `dist/`. Built JS is 9,148 bytes gzip and CSS is 5,040
bytes gzip. Production-only `npm audit --omit=dev --audit-level=high` reports
zero vulnerabilities. Live JS and CSS hashes match the fresh build. F-2-3 is
an unlisted/under-specified claim, not a failing declared command.

## Structure, accessibility, and links

- Home, Demo, Play, Privacy, Terms, and the 404 have route-specific titles,
  descriptions, canonicals, Open Graph and Twitter metadata, exactly one h1,
  one main, `lang="en"`, and meaningful heading order.
- Favicon, apple-touch icon, manifest, real 1200 × 630 social image,
  `robots.txt`, and a five-route sitemap are live.
- `/demo`, `/play`, `/privacy`, and `/terms` deep links return HTTP 200.
  An unknown path returns the designed page with HTTP 404. Back restoration
  still fails under F-2-1.
- All discovered internal destinations and the Param Factory external link
  return HTTP 200. No dead link was found.
- Fresh live Axe scans found zero serious or critical violations on every app
  route and the deployed 404. App-route visible controls meet 44 × 44 px; the
  standalone 404 exceptions are F-1-22.
- `verify-url.sh` passed the live home: HTTP 200, title, language, one h1, main,
  image alt text, labelled buttons, and no console errors.
- The dark moonlit-marsh art, brass clipped controls, grid board, serif display
  type, and restrained signal motion are specific to this product. This is not
  a generic SaaS template. Reduced-motion styles disable animation and smooth
  scrolling.

## Earlier finding verification

Every finding from `.factory/review-1.md` and closure claim from
`.factory/polish-1.md` / the prior handoff was checked in live behavior and
source.

| Earlier finding | Current status | Independent evidence |
|---|---|---|
| F-1-1 | Fixed | Unknown live path returns HTTP 404. |
| F-1-2 | Fixed | Declared claim test and cold live click pass. |
| F-1-3 | Fixed | Preview claim test and live interaction pass. |
| F-1-4 | Fixed | Five rule types have observable test coverage; “one-screen” is gone. |
| F-1-5 | Fixed | Scope claim and route/control crawl pass. |
| F-1-6 | Fixed | All ten lessons load; all ten have unit-tested solutions. |
| F-1-7 | Fixed | Non-default lesson and all five values reopen. |
| F-1-8 | Fixed | Seeded normal bytes survive demo use/reset/exit. |
| F-1-9 | Fixed | Caption now names the board and change list. |
| F-1-10 | Fixed | “State diff” is gone; representative change lists are tested. |
| F-1-11 | Fixed | README correctly says saved progress resumes. F-2-2 is a separate landing-button defect. |
| F-1-12 | Fixed | Decorative hero label is absent. |
| F-1-13 | Fixed | Heading is “Preview a movement rule.” |
| F-1-14 | Fixed as requested | Heading uses the prior proposed wording; its new terminology ambiguity is F-2-4. |
| F-1-15 | Fixed | Landing uses “puzzle,” not “clearing.” |
| F-1-16 | Fixed | Interface and instructions consistently use “Run one turn.” |
| F-1-17 | Fixed | Label is “Product limits.” |
| F-1-18 | Fixed | Boundary heading plainly names fixed puzzles. |
| F-1-19 | Fixed | Preview button names the next Move value. |
| F-1-20 | Fixed | Rule buttons name results and say “Tap or press Enter.” |
| F-1-21 | Fixed | Route title, canonical, OG, and Twitter values update. |
| F-1-22 | **Blocking again** | Standalone 404 shell remains inconsistent and has two undersized targets. |
| F-1-23 | Fixed | Terms h1 names the Terms page. |

## Missed leverage

No missing AI feature is justified. The brief asks for deterministic,
age-appropriate rule puzzles; model-generated moves would weaken that job and
offline behavior. Challenge seeds already provide the brief's useful
import/export path, work without accounts, and preserve local-first privacy.
Sync would conflict with the stated no-account scope. No decorative AI feature
or embedded provider key is present.

## What would make this perfect

Resolve every finding above: use one accessible shell for the deployed 404,
restore history scroll/focus, make the landing resume action honest, register
and fully test demo reset/resume, and apply the four proposed plain-word
rewrites. Then rerun all claim commands and the full suite from a fresh clone,
deploy, and repeat the live 390 px 404 and Back checks. The acceptance standard
is zero remaining findings.
