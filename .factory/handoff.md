# Game Logic Tiles — build handoff

## What was built

- A finished Vite + TypeScript static app with ten deterministic grid lessons.
- Five editable rule tiles: Move, Collide, Collect, Timer, and Score.
- Direction controls, one-turn stepping, undo, reset, hints, and written state diffs.
- A tested solution path for every lesson.
- Shareable, validated challenge seeds containing the lesson and five rule values.
- `/demo` with a persistent sandbox banner, reset, and a separate `demo:` storage namespace.
- `/play`, `/privacy`, `/terms`, in-app 404, and static-host 404 routes.
- History navigation, route focus, keyboard shortcuts, 390px layouts, and reduced-motion behavior.
- An offline service worker, install manifest, responsive local art, metadata, sitemap, CSP, and cache headers.
- An original cinematic moonlit-marsh visual system and generated environmental artwork with provenance.
- Plain-language landing copy, a copy audit, claim inventory, README, and MIT license.

## How to run

```sh
npm install
npm run dev
npm test
npm run build
```

The verification sandbox is `http://localhost:5173/demo`. The production build command is exactly `npm run build`. Static output lands in `dist/`, and `dist/index.html` is present at its root.

## Verification completed

- `npm test`: passed — 5 rule-engine tests and 13 Chromium tests.
- All five `.factory/claims.json` claim paths passed from the demo sandbox.
- Every lesson passed an automated solution-path test.
- Axe browser checks: no serious or critical findings on `/`, `/demo`, `/privacy`, or `/terms`.
- Factory `verify-url.sh`: passed at `/demo`; 200 response, title, `lang`, one `h1`, main landmark, labelled buttons, zero missing alt attributes, and zero console errors.
- Mobile check: 390 × 844, no horizontal overflow, touch controls exercised.
- Offline check: the full demo reloaded after the browser context went offline.
- Production bundle: 9.01 KB JS gzip and 5.01 KB CSS gzip. Mobile hero: 32 KB WebP.
- Lighthouse 11.7.1 mobile run on `/demo`: Performance 100, Accessibility 100, Best Practices 100, SEO 100, PWA 100.
- Measured FCP 0.9 s, LCP 1.6 s, total blocking time 50 ms, and CLS 0.
- Production dependency audit: 0 runtime vulnerabilities.

## Known gaps

- Progress is intentionally browser-local. Clearing site data removes it.
- Challenge links share rule settings, not the current turn-by-turn board state.
- The app has no cloud sync, accounts, multiplayer, or freeform level editor. These are product boundaries from the brief.

## Suggested next steps

- Observe whether first-time players solve lesson 1 and create a challenge seed using privacy-safe aggregate page counts.
- Play-test lessons 6–10 with beginners, then tune hint timing without expanding the rule language.
