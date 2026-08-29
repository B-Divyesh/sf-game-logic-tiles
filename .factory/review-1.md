# Adversarial first-read review 1 — Game Logic Tiles

**Verdict: FAIL**

Reviewed 29 August 2026 against live production at
`https://game-logic-tiles.sociobot.in` and repository candidate
`db788139c6ca8a496f5cc96dbddf096691abf691`. One blocking routing defect,
ten major claim/copy defects, and twelve minor copy/structure defects remain.
The demo itself is usable, isolated, and immediately populated.

## Findings

### Blocking

#### F-1-1 — Unknown routes are soft 404s

- **Exact location:** `GET https://game-logic-tiles.sociobot.in/not-a-real-route`
  returned HTTP `200`; the rendered page then said “404 · Lost clearing” and
  “This path leaves the game board.” `public/staticwebapp.config.json` sends
  every unresolved navigation through `navigationFallback`, so its configured
  `responseOverrides.404` is not reached.
- **Why this fails:** the screen looks like a not-found page, but browsers,
  crawlers, caches, and monitoring are told that the nonexistent URL is valid.
  This is broken routing.
- **Concrete fix:** replace the blanket fallback with explicit rewrites for the
  real SPA routes (`/`, `/demo`, `/play`, `/privacy`, `/terms`) and allow other
  paths to reach the styled `/404.html` response with HTTP 404. Add a deployed
  test that asserts both the 404 status and the designed response body.

### Major

#### F-1-2 — The first-action result is an unlisted claim

- **Exact quote/location:** landing hero, “It opens puzzle 1 with five rules to
  change.”
- **Why this fails:** no `.factory/claims.json` entry names or tests this
  promise. `ten-lessons` starts directly at `/demo`; it does not follow the
  landing action or assert that five rule controls appear.
- **Concrete fix:** add a claim and one tagged test that clicks “Try it with
  sample data,” asserts `/demo`, lesson 1, and exactly five editable rule
  controls.

#### F-1-3 — The live-preview behavior is an unlisted claim

- **Exact quotes/location:** landing preview, “Change Move below.” and “The
  state preview explains the result.”
- **Why this fails:** no claim entry or tagged test checks the landing preview.
- **Concrete fix:** add a `landing-preview` claim/test that changes Move and
  asserts the displayed value and before/after explanation, or remove the
  behavioral promise.

#### F-1-4 — Coverage of all five rule types is unlisted

- **Exact quotes/locations:** landing How it works, “Edit movement,
  collisions, collecting, time, or points.” README, “Ten one-screen lessons
  cover movement, collisions, collecting, timers, and scoring.”
- **Why this fails:** `ten-lessons` counts ten options and solves only lesson
  1 by changing Move. It does not prove that the other four rule types work.
  “One-screen” is also misleading at 390 px, where one lesson spans multiple
  viewport heights.
- **Concrete fix:** rewrite the README sentence as “Ten lessons cover movement,
  collisions, collecting, timers, and scoring.” Add a claim/test that changes
  each rule and verifies its observable game-state effect.

#### F-1-5 — The scope boundary is an unlisted claim

- **Exact quote/location:** landing boundary, “It does not include accounts,
  multiplayer, freeform code, or an asset store.”
- **Why this fails:** `private-local` covers the lack of an account, but the
  other three product-boundary promises have no claim entry or test.
- **Concrete fix:** add one `scope-boundaries` claim with a crawl/UI test for
  those absent capabilities, or narrow the sentence to covered claims.

#### F-1-6 — `ten-lessons` does not prove ten lessons are playable

- **Exact location:** `tests/e2e/claims.spec.ts`,
  `@claim:ten-lessons offers ten playable lessons`.
- **Why this fails:** the test counts ten `<option>` elements, then exercises
  and solves only lesson 1. Nine lessons can regress while the claim still
  passes.
- **Concrete fix:** load every lesson, assert its distinct goal, board, and
  editable rules, and add deterministic engine tests that reach a solved state
  for all ten supplied lessons.

#### F-1-7 — `share-seed` does not test the whole stated payload

- **Exact location:** `tests/e2e/claims.spec.ts`,
  `@claim:share-seed creates a link that restores the same five rules`.
- **Why this fails:** the claim says a seed holds the lesson and five rule
  values. The test keeps lesson 1, changes only Move and Score, and asserts only
  those two values after reopening.
- **Concrete fix:** choose a non-default lesson, set all five rule values,
  reopen the generated URL in a fresh context, and assert the lesson plus all
  five restored values.

#### F-1-8 — `private-local` does not protect pre-existing real data in its test

- **Exact location:** `tests/e2e/claims.spec.ts`,
  `@claim:private-local keeps demo progress separate...`.
- **Why this fails:** the test starts with no real key and only confirms that
  one was not created. It would not catch demo code that reads, changes, or
  deletes existing real progress; it also skips Reset demo and Start for real.
- **Concrete fix:** seed `game-logic-tiles:progress` with a sentinel, exercise
  and reset the demo, leave through Start for real, and assert the sentinel is
  unchanged while the `demo:` key is removed.

#### F-1-9 — “Every move” is broader than its test and uses metaphor

- **Exact quote/location:** landing image caption, “Every move changes a small,
  visible world.”
- **Why this fails:** “small world” does not name the board or state, and the
  `visible-world-change` test checks only one move in lesson 1 despite the word
  “Every.”
- **Concrete fix:** use “Run one turn to update the board and change list.” and
  align the claim wording and test with that single observable action.

#### F-1-10 — “Each step” is broader than its test and uses developer jargon

- **Exact quotes/locations:** landing, “A state diff shows what changed.”
  README, “Each step shows a plain state diff.”
- **Why this fails:** “state diff” is unexplained programming jargon for the
  stated beginner audience. The tagged test checks one step, not each step.
- **Concrete fix:** use “After each turn, a list shows the position, turn,
  seeds, and score that changed.” Then exercise representative movement,
  collision, collection, timer, and solved steps in the tagged test.

#### F-1-11 — README incorrectly promises a clean run

- **Exact quote/location:** README demo paragraph, “Start for real starts a
  clean run.”
- **Why this fails:** with existing normal progress at lesson 2, Start for real
  correctly preserved that record and opened lesson 2. The sentence promises
  lesson 1 instead.
- **Concrete fix:** write “Start for real leaves the demo and resumes your saved
  progress.” If no saved progress exists, the app naturally starts at lesson 1.

### Minor

#### F-1-12 — Decorative hero label carries no useful information

- **Exact quote/location:** landing hero, “A tiny game-logic workshop.”
- **Why this fails:** it is mood copy and does not clarify the task, audience,
  or action.
- **Concrete fix:** delete it; the headline and audience sentence already
  supply the useful context.

#### F-1-13 — Preview heading is metaphorical

- **Exact quote/location:** landing preview heading, “A rule is a cause you can
  touch.”
- **Why this fails:** heard out of context, it does not name the section or the
  interaction.
- **Concrete fix:** use “Preview a movement rule.”

#### F-1-14 — How-it-works heading is vague

- **Exact quote/location:** landing heading, “Learn one cause at a time.”
- **Why this fails:** it does not describe the section when headings are read
  alone.
- **Concrete fix:** use “Solve each lesson in three steps.”

#### F-1-15 — “Clearing” hides the concrete task

- **Exact quote/location:** landing step 1, “Each clearing asks for one small
  result.”
- **Why this fails:** “clearing” is setting lore rather than the product noun a
  beginner needs.
- **Concrete fix:** use “Each puzzle asks you to reach one result.”

#### F-1-16 — “Step the world” does not name the result

- **Exact locations:** landing step heading “Step the world”; demo control
  “Step world.”
- **Why this fails:** the phrase is invented terminology and the button does
  not plainly say that it advances one turn.
- **Concrete fix:** use “Run one turn” for both the heading and control, and
  update the keyboard instructions to match.

#### F-1-17 — Boundary label is promotional rather than informative

- **Exact quote/location:** landing boundary label, “A focused learning toy.”
- **Why this fails:** “focused” is an unsupported adjective and “toy” does not
  name the section.
- **Concrete fix:** replace it with “Product limits” or delete it.

#### F-1-18 — Boundary heading is metaphorical

- **Exact quote/location:** landing boundary heading, “Small worlds, not a full
  game engine.”
- **Why this fails:** it relies on the “world” metaphor instead of naming the
  limits.
- **Concrete fix:** use “What Game Logic Tiles does not include.”

#### F-1-19 — Preview button omits the thing it changes

- **Exact quote/location:** landing preview button, “Change to 1.”
- **Why this fails:** the action is ambiguous when read by itself and does not
  name its result.
- **Concrete fix:** use “Set Move to 1 square,” then “Set Move to 2 squares”
  after activation.

#### F-1-20 — Rule controls give mouse-only instructions

- **Exact quote/location:** all five rule buttons on `/demo` and `/play`,
  “Click to change.”
- **Why this fails:** the first-use review is on a phone, where the visitor
  taps rather than clicks. The label also does not say which value comes next.
- **Concrete fix:** give each control a result-naming label such as “Set Move to
  1 square”; if helper text remains, use “Tap or press Enter to change.”

#### F-1-21 — Route-specific social metadata stays on the home-page values

- **Exact location:** live `/demo`, `/play`, `/privacy`, `/terms`, and the
  not-found view all retain `og:title="Game Logic Tiles — Learn rules through
  play"`, the home description, and `og:url` for `/`.
- **Why this fails:** sharing a legal or demo URL describes and identifies the
  home page instead of the current route.
- **Concrete fix:** update Open Graph and Twitter title, description, and URL in
  the route metadata function, and add route-level assertions.

#### F-1-22 — The not-found copy and fallback document do not meet the shared skeleton

- **Exact locations:** live not-found heading “This path leaves the game
  board”; `public/404.html` label “404 · Lost clearing.” The standalone file
  has no site header, footer, Privacy/Terms links, canonical, Open Graph data,
  manifest, or apple-touch icon.
- **Why this fails:** the headings are metaphorical, and the document intended
  for the real 404 response does not provide the navigation and metadata used
  by every other route.
- **Concrete fix:** use the heading “Page not found,” add the shared header and
  footer, and include the route metadata. Keep the existing visual grid as the
  product-specific treatment.

#### F-1-23 — The Terms h1 does not name the page

- **Exact quote/location:** `/terms`, “Use these puzzles with care.”
- **Why this fails:** the heading sounds like general advice when read alone;
  it does not identify the terms.
- **Concrete fix:** use “Terms for using Game Logic Tiles.”

## Cold first screen

Fresh browser contexts were opened without scrolling.

| Viewport | What this does, in reviewer words | For whom | First click | Result |
|---|---|---|---|---|
| 390 × 844 | Lets a learner change game rules and see the game state react. | Puzzle beginners learning game logic before code. | “Try it with sample data.” | Clear; pass. |
| 1440 × 900 | Lets a learner change game rules and observe the result in a puzzle. | Puzzle beginners learning game logic before code. | “Try it with sample data.” | Clear; pass. |

The mobile first screen showed the headline, audience sentence, sample action,
what opens next, and all three facts. The desktop first screen showed the same
content. The unusually large desktop headline wraps to four short lines, but
it remains readable and does not obscure the action.

## Copy audit

Counts treat hyphenated terms, paths, and displayed numbers as one word.
Headings, navigation labels, and controls are included even when they are
fragments. No item exceeds 22 words and no word from the supplied banned-word
list appears. Rows marked with an ID are findings above.

### Landing page

| Location | Exact copy | Words | Result |
|---|---|---:|---|
| Skip link | Skip to main content | 4 | Pass |
| Header | Game Logic Tiles | 3 | Pass |
| Header | Demo | 1 | Pass |
| Header | How it works | 3 | Pass |
| Header | Privacy | 1 | Pass |
| Hero label | A tiny game-logic workshop | 4 | F-1-12 |
| Hero h1, sentence 1 | Change rules. | 2 | Pass |
| Hero h1, sentence 2 | See the game react. | 4 | Pass |
| Hero | For puzzle beginners who want to understand game logic before learning code. | 12 | Pass |
| Hero action | Try it with sample data | 6 | Pass |
| Hero action note | It opens puzzle 1 with five rules to change. | 9 | F-1-2 |
| Fact | Free. | 1 | Pass |
| Fact | No purchases. | 2 | Pass |
| Fact | Private. | 1 | Pass |
| Fact | No account or tracking. | 4 | Pass |
| Fact | Offline. | 1 | Pass |
| Fact | Reopens after your first visit. | 5 | Pass |
| Hero caption | Every move changes a small, visible world. | 7 | F-1-9 |
| Preview label | Live preview | 2 | Pass |
| Preview heading | A rule is a cause you can touch | 8 | F-1-13 |
| Preview instruction | Change Move below. | 3 | F-1-3 |
| Preview explanation | The state preview explains the result. | 6 | F-1-3 |
| Preview rule label | MOVE | 1 | Pass |
| Preview value | 2 squares | 2 | Pass |
| Preview button | Change to 1 | 3 | F-1-19 |
| Preview state | Before: the explorer skips the seed. | 6 | Pass |
| Section label | How it works | 3 | Pass |
| Section heading | Learn one cause at a time | 6 | F-1-14 |
| Step heading | Read the goal | 3 | Pass |
| Step text | Each clearing asks for one small result. | 7 | F-1-15 |
| Step heading | Change a rule | 3 | Pass |
| Step text | Edit movement, collisions, collecting, time, or points. | 7 | F-1-4 |
| Step heading | Step the world | 3 | F-1-16 |
| Step text, sentence 1 | Move once. | 2 | Pass |
| Step text, sentence 2 | A state diff shows what changed. | 6 | F-1-10 |
| Boundary label | A focused learning toy | 4 | F-1-17 |
| Boundary heading | Small worlds, not a full game engine | 7 | F-1-18 |
| Boundary text, sentence 1 | Game Logic Tiles has ten fixed puzzles. | 7 | Pass (`ten-lessons`) |
| Boundary text, sentence 2 | It does not include accounts, multiplayer, freeform code, or an asset store. | 12 | F-1-5 |
| Boundary action | Start lesson 1 | 3 | Pass |
| Footer | Game Logic Tiles | 3 | Pass |
| Footer, sentence 1 | Change a rule. | 3 | Pass |
| Footer, sentence 2 | See what it caused. | 4 | Pass |
| Footer link | Privacy | 1 | Pass |
| Footer link | Terms | 1 | Pass |
| Footer link | Built by Param Factory | 4 | Pass |
| Footer | Version 1.0 · build 2026.08 | 4 | Pass |
| Footer | Environmental artwork generated for this project. | 6 | Pass |

### README

Code blocks are commands rather than prose sentences and are not counted.

| Location | Exact copy | Words | Result |
|---|---|---:|---|
| h1 | Game Logic Tiles | 3 | Pass |
| Intro | Change one rule, step the world, and see why the game state changed. | 13 | Pass |
| Intro | Game Logic Tiles is for puzzle-loving beginners who want to learn game-state logic before learning a programming language or engine. | 20 | Pass |
| Intro | Ten one-screen lessons cover movement, collisions, collecting, timers, and scoring. | 10 | F-1-4 |
| Intro | Each step shows a plain state diff. | 7 | F-1-10 |
| Demo | Try the isolated sample at `/demo`. | 6 | Pass |
| Demo | The demo stores progress under a separate `demo:` browser key. | 10 | Pass |
| Demo | Reset demo removes that progress, and Start for real starts a clean run. | 13 | F-1-11 |
| h2 | What it includes | 3 | Pass |
| Feature | Ten playable lessons with editable rule tiles. | 7 | Pass (`ten-lessons`) |
| Feature | Keyboard and touch controls. | 4 | Pass (`keyboard-touch-controls`) |
| Feature | Challenge seeds that hold one lesson and five rule values. | 10 | Pass (`share-seed`; test gap F-1-7) |
| Feature | Offline reloads after the first visit. | 6 | Pass (`offline-reload`) |
| Feature | Local browser storage with no account or tracking. | 8 | Pass (`private-local`; test gap F-1-8) |
| Feature | Free use with no purchases. | 6 | Pass (`free-use`) |
| Boundary | The project does not include freeform programming, multiplayer, or an asset marketplace. | 12 | F-1-5 |
| h2 | Run locally | 2 | Pass |
| Requirement | Requires Node.js 20 or later. | 5 | Pass |
| Instruction | Open `http://localhost:5173/demo` for the verification sandbox. | 6 | Pass |
| h2 | Test and build | 3 | Pass |
| Test | `npm test` runs deterministic rule-engine tests, builds the site, and runs Chromium browser tests. | 14 | Pass |
| Build | The exact production build command is `npm run build`. | 9 | Pass |
| Build | Output lands in `dist/`, with `dist/index.html` at its root. | 9 | Pass |
| h2 | Deploy | 1 | Pass |
| Deploy | Deploy the contents of `dist/` as a static site. | 9 | Pass |
| Deploy | `staticwebapp.config.json` supplies the SPA fallback, security headers, and the styled 404 response for Azure Static Web Apps. | 17 | Pass; live status fails F-1-1 |
| h2 | Privacy and license | 3 | Pass |
| Privacy | Puzzle progress stays in local browser storage. | 7 | Pass (`private-local`) |
| Privacy | See `/privacy` and `/terms` for the user-facing policies. | 8 | Pass |
| License | The source code is available under the MIT License. | 9 | Pass |
| Artwork | The environmental artwork was generated for this project. | 8 | Pass |
| Artwork | Its prompt and provenance are recorded in `.factory/design.md`. | 8 | Pass |

## Demo and sandbox verification

- Landing to populated demo takes one click at both viewports.
- The first demo viewport shows “The missed seed,” its goal, the populated
  board, and the persistent “Demo — sample data, nothing is saved” banner.
- Changing Move writes only `demo:game-logic-tiles:progress`.
- Reset demo restores lesson 1 and Move 2.
- A seeded real record for lesson 2 remained byte-for-byte unchanged during
  demo use and reset. Start for real removed the demo key and resumed lesson 2.
- The live flow produced no console error and no cross-origin request.
- The shipped sample was also reopened successfully with the browser offline.

The demo gate passes. F-1-8 concerns the permanent regression test, not the
observed live behavior.

## Claim results from a clean clone

Fresh clone: `/tmp/glt-review.4t3AFb` at the reviewed candidate. Every command
was run exactly as listed in `.factory/claims.json`.

| Claim | Result | Evidence |
|---|---|---|
| `ten-lessons` | PASS | 5 unit tests, build, and tagged browser test passed; coverage gap F-1-6. |
| `free-use` | PASS | 5 unit tests, build, and tagged browser test passed. |
| `private-local` | PASS | 5 unit tests, build, and tagged browser test passed; coverage gap F-1-8. |
| `share-seed` | PASS | 5 unit tests, build, and tagged browser test passed; coverage gap F-1-7. |
| `offline-reload` | PASS | 5 unit tests, build, and tagged browser test passed. |
| `visible-world-change` | PASS | 5 unit tests, build, and tagged browser test passed; wording gap F-1-9. |
| `state-diff` | PASS | 5 unit tests, build, and tagged browser test passed; wording gap F-1-10. |
| `keyboard-touch-controls` | PASS | 5 unit tests, build, and tagged browser test passed. |

Each claim ID occurs in exactly one test file. The commands pass, but the
manifest is not complete because of F-1-2 through F-1-5, and several passing
tests assert less than their claim wording.

## Structure, accessibility, and quality checks

- `npm test`: PASS — 5 Vitest tests and 17 Playwright tests.
- `npm run build`: PASS — `dist/` created; JavaScript is 25.31 kB raw and
  9.01 kB gzip.
- Factory `verify-url.sh`: PASS — HTTPS 200, title, `lang`, one `h1`, one
  `main`, image alt text, and no console errors.
- Live Axe integration: zero violations on `/`, `/demo`, `/play`, `/privacy`,
  `/terms`, and the in-app not-found view at 1440 px and 390 px.
- Live target sweep: no visible button, link, input, or select below 44 × 44 px
  on those six routes at either viewport.
- Deep links: PASS. Direct loads for all five sitemap routes render the correct
  route with one h1 and route-specific document title, description, and
  canonical URL.
- History and focus: PASS. Client navigation and browser Back focus the new h1
  after the route frame and reset scroll to the top.
- Link crawl: PASS. All discovered internal links and the Param Factory
  external link returned HTTP 200.
- Metadata assets: PASS on the home route. Title is 43 characters; description,
  canonical, Open Graph/Twitter image, SVG favicon, apple-touch icon,
  `robots.txt`, sitemap, and manifest are present. See F-1-21 for route-specific
  social metadata.
- Security/privacy: PASS. The live CSP is self-only for runtime connections;
  HSTS, nosniff, referrer policy, and permissions policy are present.
- Motion: PASS. The repeating signal animation is disabled under
  `prefers-reduced-motion: reduce`.
- Visual identity: PASS. The asymmetrical moonlit-marsh artwork, brass clipped
  controls, serif/system type pairing, and teal/amber palette are distinct and
  match `.factory/design.md`; this is not a generic SaaS template.

## Earlier-history verification

No earlier `.factory/review-*.md` or `.factory/polish-*.md` exists. The prior
handoff named two repaired blockers:

- **44 × 44 px targets:** confirmed in CSS, in the repository regression test,
  and by the live two-viewport sweep; fixed.
- **Three previously missing claims:** `visible-world-change`, `state-diff`, and
  `keyboard-touch-controls` are present once each and their exact commands
  pass. F-1-9 and F-1-10 are new scope/wording findings, not a regression to
  absence.

## Missed leverage

No missing AI feature is justified. These deterministic teaching puzzles need
predictable feedback, work offline, and do not benefit from sending puzzle
state to a model. Shareable challenge links already provide the brief's useful
export path. Accounts, cloud sync, and multiplayer would contradict the stated
local, no-account boundary rather than complete the core job.

## What would make this perfect

Return a real HTTP 404 for unknown routes while keeping the product-styled
not-found page. Then make the claim manifest exhaustive, strengthen the four
under-scoped claim tests, correct the README's Start for real wording, replace
the flagged lore/jargon with direct task language, use touch-neutral
result-naming rule controls, and set route-specific social metadata. Re-run
every claim command, the full suite, deployed status check, live Axe scan,
link crawl, storage sentinel flow, and both cold viewports. PASS is appropriate
only when those checks produce no remaining finding.
