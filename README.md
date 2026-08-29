# Game Logic Tiles

Change game rules and see each turn.

Game Logic Tiles is for puzzle-loving beginners who want to learn game logic before learning a programming language or engine. Ten lessons cover movement, collisions, collecting, timers, and scoring. After each turn, a list shows the position, turn, seeds, and score that changed.

Try the isolated sample at [`?demo=1`](https://game-logic-tiles.sociobot.in/?demo=1) or [`/demo`](https://game-logic-tiles.sociobot.in/demo). The demo keeps its progress separate from your saved puzzles in this browser. **Reset demo** restores the sample, and **Start for real** leaves the demo and resumes your saved progress.

## What it includes

- Ten playable lessons with editable rule tiles.
- Keyboard and touch controls.
- Challenge seeds that hold one lesson and five rule values.
- Offline reloads after the first visit.
- Local browser storage with no account or tracking.
- Free use with no purchases.

The project does not include accounts, multiplayer, freeform programming, or an asset store.

## Run locally

Requires Node.js 20 or later.

```sh
npm install
npm run dev
```

Open `http://localhost:5173/?demo=1` to test sample data without changing normal progress.

## Test and build

```sh
npm test
npm run build
```

`npm test` checks repeatable game rules, builds the site, and tests it in Chromium. The exact production build command is `npm run build`. Output lands in `dist/`, with `dist/index.html` at its root.

## Deploy

Deploy the contents of `dist/` as a static site. The deployment config serves app routes, adds security headers, and shows the designed not-found page for unknown paths.

## Privacy and license

Puzzle progress stays in local browser storage. See `/privacy` and `/terms` for the user-facing policies. The source code is available under the [MIT License](LICENSE).

The environmental artwork was generated for this project. Its prompt and provenance are recorded in [`.factory/design.md`](.factory/design.md).
