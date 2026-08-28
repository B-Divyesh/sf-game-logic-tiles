# Game Logic Tiles — visual thesis

## Direction

**Cinematic environmental art: a moonlit signal marsh.** The game board is a small clearing seen from above, with each rule presented as a brass field instrument. Changing a rule should feel like moving a physical switch in a mysterious but readable landscape. The scene supports the product's causal lesson: one signal travels through the world and leaves visible consequences.

This is intentionally a single dark treatment. The night setting makes bright state changes easy to spot and avoids the look of a generic coding canvas.

## Palette

- `night-950 #071314` — page background; deep wetland night
- `night-900 #0c1d1e` — raised surfaces
- `night-800 #153033` — board edges and separators
- `mist-100 #f1f1df` — primary text
- `mist-300 #c8cbb7` — secondary text (7.9:1 on night-950)
- `reed-400 #9cc4a1` — quiet signals and focus support
- `amber-400 #f5bb55` — primary action and active rule (9.4:1 dark text)
- `ember-400 #ef8c68` — collision and warning
- `water-300 #72c7cd` — movement and selected tile
- `success-300 #8fd18e` — solved state
- `danger-300 #ff9a8b` — errors

All body text combinations target at least 4.5:1. State is also expressed through labels, shapes, and symbols.

## Type

- Display: Georgia, `Times New Roman`, serif. Its engraved, storybook character frames the puzzles as small worlds.
- Body and controls: system UI (`ui-sans-serif`, Segoe UI, sans-serif) for fast, readable rule editing.
- No font files are needed, keeping the first load small and private.

## Spacing and shapes

- 8px base rhythm; primary section spacing 72–96px; control gaps 8–16px.
- Reading measure: 62 characters.
- Rule tiles use clipped corners and fine brass outlines, like portable instruments.
- The board uses inset depth and square cells; the landing composition is asymmetric, with copy beside a wide landscape frame.
- Touch targets are at least 44px. On phones, the world stacks above the rule instruments.

## Interaction grammar

- A rule tile is a native button. Selected tiles gain an amber inset line and expose one labelled control.
- `Step world` advances exactly one turn and highlights the state diff in a written event log.
- The player can also use arrow keys to choose a direction, Enter to step, and R to reset.
- Changes appear first on the board, then in the state readout. Undo restores the prior turn.

## Motion policy

Signature motion is a brief **signal wake**: the player and changed cells move 160–240ms along their actual grid path while a soft light expands once from the affected cell. Nothing loops. With `prefers-reduced-motion: reduce`, transforms and transitions are removed; the new state appears immediately and the written event remains.

## Asset plan and prompt sheet

One original hero environment supplies the product's atmosphere and the social preview. It shows an overhead moonlit marsh clearing arranged like a logic board, with a tiny lantern-bearing explorer, stone walls, a glowing seed, and brass rule tokens along the bank. It is illustrative context, not a screenshot and contains no required text.

Prompt: “Cinematic environmental concept art, high oblique overhead view of a small square moonlit marsh clearing arranged subtly like a board-game grid, tiny cloaked explorer carrying a warm lantern, mossy stone blocks, one luminous seed pod, still dark teal water, reeds, several small blank brass mechanical rule tiles resting on the bank, volumetric fog, tactile painted detail, quiet mystery, deep pine black and blue-green palette with restrained amber light, 35mm cinematic lens, strong readable silhouettes, generous dark negative space on the left, no people close-up, no text, no letters, no numbers, no watermark, no logo, no interface, no copyrighted characters.”

Negative list: readable text, logos, brand marks, close faces, modern screens, neon gradient, glossy SaaS illustration, clutter, horror, weapons.

Provenance: generated for this product on 2026-08-28 with the factory image model (`factory-image`) through `/opt/fleet/lib/gen-image.sh`. The generated source and prompt sidecar live in `assets/src/`. Shipping WebP/AVIF derivatives are local assets. MIT project license; generated art is original project material.
