# Game Logic Tiles

Change one rule, step the world, and see why the game state changed.

Game Logic Tiles is for puzzle-loving beginners who want to learn game-state logic before learning a programming language or engine. Ten one-screen lessons cover movement, collisions, collecting, timers, and scoring. Each step shows a plain state diff.

Try the isolated sample at [`/demo`](https://game-logic-tiles.sociobot.in/demo). The demo stores progress under a separate `demo:` browser key. **Reset demo** removes that progress, and **Start for real** starts a clean run.

## What it includes

- Ten playable lessons with editable rule tiles.
- Keyboard and touch controls.
- Challenge seeds that hold one lesson and five rule values.
- Offline reloads after the first visit.
- Local browser storage with no account or tracking.
- Free use with no purchases.

The project does not include freeform programming, multiplayer, or an asset marketplace.

## Run locally

Requires Node.js 20 or later.

```sh
npm install
npm run dev
```

Open `http://localhost:5173/demo` for the verification sandbox.

## Test and build

```sh
npm test
npm run build
```

`npm test` runs deterministic rule-engine tests, builds the site, and runs Chromium browser tests. The exact production build command is `npm run build`. Output lands in `dist/`, with `dist/index.html` at its root.

## Deploy

Deploy the contents of `dist/` as a static site. `staticwebapp.config.json` supplies the SPA fallback, security headers, and the styled 404 response for Azure Static Web Apps.

## Privacy and license

Puzzle progress stays in local browser storage. See `/privacy` and `/terms` for the user-facing policies. The source code is available under the [MIT License](LICENSE).

The environmental artwork was generated for this project. Its prompt and provenance are recorded in [`.factory/design.md`](.factory/design.md).
