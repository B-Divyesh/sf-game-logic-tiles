# Game Logic Tiles — polish round 2 handoff

## Outcome

All findings in `.factory/review-1.md` and `.factory/review-2.md` are fixed and verified in production. The moonlit-marsh visual system, vanilla TypeScript stack, and static-web deployment class remain intact.

The repair adds a shared app/404 shell with accessible mobile targets, history scroll-and-focus restoration, honest resume wording, complete demo reset/resume claim coverage, and every requested plain-word rewrite. The catalog line is verb-first and 69 characters. Vite and Vitest were also updated to patched releases.

- Implementation commit: `437c7b6`
- Live-verification commit: `ea759ae`
- Clean-clone candidate: `4f434395b8855c36fa79216d96038d2073728596`
- Deployment ID: `c19a4b88-d78e-44e9-b503-2843a5482d83`
- Live URL: <https://game-logic-tiles.sociobot.in>

## How to run

```sh
npm ci
npm run dev
npm test
npm run build
```

`npm run build` produces `dist/` with `dist/index.html` at its root. `npm run preview` serves the built artifact with the explicit route and 404 behavior expected from Azure Static Web Apps.

## Verification evidence

- Final-candidate clone `/tmp/game-logic-tiles-final.shku0N`: each of the 14 exact claim commands passed independently, then the full suite, separate build, and audit passed.
- Full local suite: 5 Vitest engine tests and 28 Playwright browser tests passed.
- Separate production build passed: 9.52 KB gzip JavaScript and 5.03 KB gzip CSS.
- Live claim suite: 14/14 passed against production.
- Live routes: Home, both demo entries, Play, Privacy, and Terms returned 200; an unknown route returned 404.
- Live Axe: zero serious or critical findings on every app route and the standalone 404.
- Live 390 px check: zero undersized visible targets and no horizontal overflow.
- Live history: scroll restored from 1637 to 1637 and focus returned to Privacy.
- Live privacy/demo: zero cross-origin requests; reset removed only demo storage and normal progress remained byte-for-byte unchanged.
- Live offline reload passed after service-worker control.
- Factory `verify-url.sh` passed title, language, landmarks, alt text, labels, and console checks; measured load was 612 ms.
- Live Lighthouse mobile: 100 performance, accessibility, best practices, and SEO; FCP 0.9 s, LCP 1.5 s, CLS 0, TBT 0 ms.
- `npm audit --audit-level=high`: zero vulnerabilities.

Evidence lives under `.factory/evidence/polish-2-live/` and `.factory/evidence/polish-2-verify-url/`. The finding-by-finding matrix is `.factory/polish-2.md`.

## Known gaps and next steps

None. No review finding or severity is deferred.
