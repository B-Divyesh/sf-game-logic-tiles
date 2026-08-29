# Adversarial first-read review 3 — Game Logic Tiles

**Verdict: PASS**

Reviewed 29 August 2026 against live production at
<https://game-logic-tiles.sociobot.in> and clean-clone candidate
`c0655e445db236570ede3cc8a20a05bc3d5d6fd7`. There are zero findings: no
blocking, major, or minor issue remains, and each declared claim was tested.

## Cold first read

Fresh Chromium contexts loaded the live home page without prior storage,
cookies, or scrolling.

| Viewport | What it does, in reviewer words | For whom | First click | Result |
|---|---|---|---|---|
| 390 × 844 | Change a game rule and see the next game turn in a small puzzle. | Puzzle beginners learning game logic before code. | Try it with sample data. | Clear. The job, audience, action, action result, and three facts all appear in the first viewport. |
| 1440 × 900 | Change rules in a playable game puzzle and observe each turn. | Puzzle beginners learning game logic before code. | Try it with sample data. | Clear. The same first-action information appears before scrolling. |

The exact first-screen copy is “Change game rules. See each turn.”,
“For puzzle beginners who want to understand game logic before learning code.”,
and “Try it with sample data” followed by “Opens lesson 1 with five rule
controls.” It answers all three first-read questions without needing the art
or below-the-fold copy.

## Copy audit

Counts treat hyphenated words, paths, and displayed numerals as one word.
This includes landing controls, headings, and labels so that a screen-reader
or phone user gets the same audit. No row exceeds 22 words, uses a banned
marketing adjective, uses unexplained product jargon, or has inconsistent
terminology. Buttons name their result. Claim-like product statements name a
corresponding `claims.json` ID where applicable.

### Landing page

| Location | Exact copy | Words | Check |
|---|---|---:|---|
| Skip link | Skip to main content | 4 | Pass |
| Wordmark | Game Logic Tiles | 3 | Pass |
| Header links | Demo; How it works; Privacy | 1; 3; 1 | Pass |
| Hero h1 | Change game rules. See each turn. | 6 | Pass |
| Hero audience | For puzzle beginners who want to understand game logic before learning code. | 12 | Pass |
| Primary action | Try it with sample data | 5 | Pass: `demo-first-action` |
| Action note | Opens lesson 1 with five rule controls. | 7 | Pass: `demo-first-action` |
| Facts | Free. No purchases. | 1; 2 | Pass: `free-use` |
| Facts | Private. No account or tracking. | 1; 4 | Pass: `private-local` |
| Facts | Offline. Reopens after your first visit. | 1; 5 | Pass: `offline-reload` |
| Hero image alt | A lantern explorer crosses a moonlit grid toward a glowing seed. | 11 | Pass |
| Hero caption | Run one turn to update the board and change list. | 10 | Pass: `visible-board-change` |
| Preview label | Live preview | 2 | Pass |
| Preview h2 | Preview a movement rule | 4 | Pass |
| Preview instruction | Set Move to see the board result. | 7 | Pass: `landing-preview` |
| Preview rule/value | Move; 2 squares | 1; 2 | Pass |
| Preview button | Set Move to 1 square | 5 | Pass: `landing-preview` |
| Preview result | Before: the explorer skips the seed. | 6 | Pass: `landing-preview` |
| How label/h2 | How it works; How to solve a lesson | 3; 5 | Pass |
| Phase | Read the goal | 3 | Pass |
| Phase text | Each puzzle asks you to reach one result. | 8 | Pass |
| Phase | Change a rule | 3 | Pass |
| Phase text | Edit movement, collisions, collecting, time, or points. | 7 | Pass: `rule-types` |
| Phase | Run one turn | 3 | Pass |
| Phase text | After each turn, see the position, turn, seeds, and score that changed. | 12 | Pass: `turn-change-list` |
| Limits label/h2 | Product limits; Fixed puzzles for learning game rules | 2; 6 | Pass |
| Limits | Game Logic Tiles has ten playable lessons. | 7 | Pass: `ten-lessons` |
| Limits | It does not include accounts, multiplayer, freeform code, or an asset store. | 12 | Pass: `scope-boundaries` |
| Limits action | Start or resume a lesson | 5 | Pass: `start-or-resume` |
| Footer brand | Game Logic Tiles | 3 | Pass |
| Footer sentence | Change a rule. | 3 | Pass |
| Footer sentence | See what it caused. | 4 | Pass |
| Footer links | Privacy; Terms; Built by Param Factory; external site | 1; 1; 4; 2 | Pass |
| Footer build | Version 1.0 · build 2026.08 | 4 | Pass |
| Footer credit | Environmental artwork generated for this project. | 6 | Pass |

### README

| Location | Exact copy | Words | Check |
|---|---|---:|---|
| h1 | Game Logic Tiles | 3 | Pass |
| Intro | Change game rules and see each turn. | 7 | Pass |
| Intro | Game Logic Tiles is for puzzle-loving beginners who want to learn game logic before learning a programming language or engine. | 20 | Pass |
| Intro | Ten lessons cover movement, collisions, collecting, timers, and scoring. | 9 | Pass: `rule-types` |
| Intro | After each turn, a list shows the position, turn, seeds, and score that changed. | 14 | Pass: `turn-change-list` |
| Demo | Try the isolated sample at `?demo=1` or `/demo`. | 8 | Pass |
| Demo | The demo keeps its progress separate from your saved puzzles in this browser. | 13 | Pass: `private-local` |
| Demo | Reset demo restores the sample, and Start for real leaves the demo and resumes your saved progress. | 17 | Pass: `demo-reset-resume` |
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
| Instruction | Open `http://localhost:5173/?demo=1` to test sample data without changing normal progress. | 10 | Pass |
| h2 | Test and build | 3 | Pass |
| Test | `npm test` checks repeatable game rules, builds the site, and tests it in Chromium. | 13 | Pass |
| Build | The exact production build command is `npm run build`. | 9 | Pass |
| Build | Output lands in `dist/`, with `dist/index.html` at its root. | 9 | Pass |
| h2 | Deploy | 1 | Pass |
| Deploy | Deploy the contents of `dist/` as a static site. | 9 | Pass |
| Deploy | The deployment config serves app routes, adds security headers, and shows the designed not-found page for unknown paths. | 18 | Pass |
| h2 | Privacy and license | 3 | Pass |
| Privacy | Puzzle progress stays in local browser storage. | 7 | Pass: `private-local` |
| Privacy | See `/privacy` and `/terms` for the user-facing policies. | 8 | Pass |
| License | The source code is available under the MIT License. | 9 | Pass |
| Artwork | The environmental artwork was generated for this project. | 8 | Pass |
| Artwork | Its prompt and provenance are recorded in `.factory/design.md`. | 8 | Pass |

The terminology stays stable: **rule**, **turn**, **board**, **seed**,
**beacon**, **change list**, **challenge seed**, and **demo** each name one
concept.

## Demo and sandbox

The primary landing action opened `/?demo=1` in one click at both viewports.
The first resulting screen already showed the sample lesson “The missed seed,”
its concrete objective, a populated board, five editable rule tiles, controls,
and the persistent banner “Demo — sample data, nothing is saved.” The banner
offers working **Reset demo** and **Start for real** actions.

The live suite seeded normal lesson-2 progress, changed demo values, reset the
demo, and left it. It confirmed every sample default after reset, normal
progress remained byte-for-byte unchanged, and the demo key was removed when
leaving. Source confirms separate `demo:game-logic-tiles:progress` and
`game-logic-tiles:progress` namespaces. A request log across the demo flow
contained only same-origin requests. The offline claim was also exercised after
service-worker control; the sample reloaded while the browser was offline.

## Claims

From clean clone `/tmp/game-logic-tiles-review-3.id3cTY`, every exact command
listed by `.factory/claims.json` passed independently. Each command ran its
unit tests, build, and its tagged Playwright check.

| Claim ID | Result |
|---|---|
| `demo-first-action` | Pass |
| `landing-preview` | Pass |
| `ten-lessons` | Pass |
| `rule-types` | Pass |
| `scope-boundaries` | Pass |
| `free-use` | Pass |
| `private-local` | Pass |
| `demo-reset-resume` | Pass |
| `start-or-resume` | Pass |
| `share-seed` | Pass |
| `offline-reload` | Pass |
| `visible-board-change` | Pass |
| `turn-change-list` | Pass |
| `keyboard-touch-controls` | Pass |

The live site was reread after this run. All landing and README product claims
above have a matching entry and observable test. No unlisted claim remains.

## Structure, routing, and visual check

- Live home, `/?demo=1`, `/demo`, `/play`, `/privacy`, and `/terms` return
  HTTP 200. A fabricated route returns the designed standalone page with HTTP
  404. The Param Factory footer destination returns HTTP 200.
- Home and app/legal routes have a route-specific title, description,
  canonical URL, Open Graph/Twitter metadata, one `h1`, one `main`, and
  `lang="en"`. `robots.txt`, sitemap, favicon, apple touch icon, manifest, and
  a 1200 × 630 social image are present.
- The full live Playwright suite passed **28/28**, including deep links,
  Back/Forward scroll-and-focus restoration, direct 404 checks, 390 px target
  size and overflow checks, keyboard/touch operation, no serious/critical Axe
  issues, and console-error checks.
- `npm test` passed locally (5 unit tests and 28 browser tests). `npm run
  build` passed and produced `dist/`; production JavaScript is 9.52 KB gzip
  and CSS is 5.03 KB gzip.
- The moonlit marsh art, brass clipped controls, grid board, and dark
  teal/amber system follow `.factory/design.md` and form a product-specific
  identity rather than a generic SaaS template. Reduced motion disables the
  signal animation.

## Earlier finding verification

Every prior finding was checked against the live site and the current source,
not merely the earlier closure note.

| Earlier ID | Current result | Confirmed by |
|---|---|---|
| F-1-1 | Fixed | Live unknown route is HTTP 404; explicit routes and `404.html` are configured. |
| F-1-2 | Fixed | One-click action claim opens lesson 1, banner, and five tiles. |
| F-1-3 | Fixed | Live Move preview changes value and board explanation. |
| F-1-4 | Fixed | Five rule types are worded plainly and have observable coverage. |
| F-1-5 | Fixed | Scope boundary has its own crawl/control claim. |
| F-1-6 | Fixed | Test loads all ten distinct lessons; engine tests solve all ten. |
| F-1-7 | Fixed | Non-default lesson plus all five rule values reopen from a seed. |
| F-1-8 | Fixed | Sentinel normal progress survives demo change, reset, and exit. |
| F-1-9 | Fixed | Caption now names one observable board/change-list result. |
| F-1-10 | Fixed | “State diff” is absent; representative turns show the concrete change list. |
| F-1-11 | Fixed | README accurately says saved progress resumes. |
| F-1-12 | Fixed | Decorative hero label is absent. |
| F-1-13 | Fixed | Heading is “Preview a movement rule.” |
| F-1-14 | Fixed | Heading is “How to solve a lesson.” |
| F-1-15 | Fixed | Instruction uses puzzle, not setting lore. |
| F-1-16 | Fixed | Control and instruction consistently say “Run one turn.” |
| F-1-17 | Fixed | Limits label is “Product limits.” |
| F-1-18 | Fixed | Limits heading plainly names fixed learning puzzles. |
| F-1-19 | Fixed | Preview action names the next Move value. |
| F-1-20 | Fixed | Rule tiles name their result and say “Tap or press Enter.” |
| F-1-21 | Fixed | Route metadata test verifies title, canonical, OG, and Twitter values. |
| F-1-22 | Fixed | Deployed standalone 404 has the shared destinations/footer, 44 px controls, metadata, and HTTP 404. |
| F-1-23 | Fixed | Terms h1 is “Terms for using Game Logic Tiles.” |
| F-2-1 | Fixed | Back/Forward test restores saved scroll and the focused footer control. |
| F-2-2 | Fixed | Landing action is “Start or resume a lesson” and opens saved lesson 2. |
| F-2-3 | Fixed | `demo-reset-resume` asserts all reset defaults and untouched resumed data. |
| F-2-4 | Fixed | Section heading no longer promises a three-turn solution. |
| F-2-5 | Fixed | README describes separate saved puzzles, not a browser key. |
| F-2-6 | Fixed | README explains the sample URL's user outcome. |
| F-2-7 | Fixed | README test wording is direct and accurate. |
| F-2-8 | Fixed | README deploy wording leads with the deployment outcome. |

## Missed leverage

No missing AI, import/export, or sync feature is implied by the brief. These
are deterministic, offline-friendly beginner puzzles; an AI step would weaken
the causal lesson. Challenge links already provide the useful portable-sharing
path called for by the brief. Accounts or sync would conflict with the stated
no-account, local-first scope. No decorative AI feature or provider key is
present.

## What would make this perfect

Nothing is currently required for acceptance. Preserve the one-click isolated
demo, the claim-to-test mapping, route behavior, and plain terminology as new
lessons are added; any new user-facing promise should receive a matching
claimed test before release.
