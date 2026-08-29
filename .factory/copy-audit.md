# Copy audit

Audited 29 August 2026 after polish round 2. Counts treat hyphenated terms, paths, and displayed numerals as one word. No copy exceeds 22 words. No banned marketing word appears.

## Landing page

| Location | Exact copy | Words | Result |
|---|---|---:|---|
| Skip link | Skip to main content | 4 | Pass |
| Wordmark | Game Logic Tiles | 3 | Pass |
| Header link | Demo | 1 | Pass |
| Header link | How it works | 3 | Pass |
| Header link | Privacy | 1 | Pass |
| Hero h1 | Change game rules. See each turn. | 6 | Pass |
| Hero audience | For puzzle beginners who want to understand game logic before learning code. | 12 | Pass |
| Hero action | Try it with sample data | 5 | Pass: `demo-first-action` |
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
| Preview button | Set Move to 1 square | 5 | Pass: `landing-preview` |
| Preview state | Before: the explorer skips the seed. | 6 | Pass: `landing-preview` |
| Section label | How it works | 3 | Pass |
| Section h2 | How to solve a lesson | 5 | Pass |
| Phase h3 | Read the goal | 3 | Pass |
| Phase text | Each puzzle asks you to reach one result. | 8 | Pass |
| Phase h3 | Change a rule | 3 | Pass |
| Phase text | Edit movement, collisions, collecting, time, or points. | 7 | Pass: `rule-types` |
| Phase h3 | Run one turn | 3 | Pass |
| Phase text | After each turn, see the position, turn, seeds, and score that changed. | 12 | Pass: `turn-change-list` |
| Section label | Product limits | 2 | Pass |
| Section h2 | Fixed puzzles for learning game rules | 6 | Pass |
| Boundary sentence | Game Logic Tiles has ten playable lessons. | 7 | Pass: `ten-lessons` |
| Boundary sentence | It does not include accounts, multiplayer, freeform code, or an asset store. | 12 | Pass: `scope-boundaries` |
| Boundary action | Start or resume a lesson | 5 | Pass: `start-or-resume` |
| Footer brand | Game Logic Tiles | 3 | Pass |
| Footer sentence | Change a rule. | 3 | Pass |
| Footer sentence | See what it caused. | 4 | Pass |
| Footer links | Privacy · Terms · Built by Param Factory | 8 | Pass |
| Footer build | Version 1.0 · build 2026.08 | 4 | Pass |
| Footer credit | Environmental artwork generated for this project. | 6 | Pass |

## README

| Location | Exact copy | Words | Result |
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

## Terminology

| Concept | One term used |
|---|---|
| Configured behavior | rule |
| One simulation action | turn |
| Ordered instruction phase | phase |
| Playable map | board |
| Collectible | seed |
| Destination | beacon |
| Changed values | change list |
| Portable configuration | challenge seed |
| Isolated sample mode | demo |

First-screen read-aloud: “Change game rules. See each turn. For puzzle beginners who want to understand game logic before learning code. Try it with sample data.”

Catalog description: “Change five game rules and see each turn across ten beginner puzzles.” (69 characters)
