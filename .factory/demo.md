# Demo sandbox

- **URL:** `https://game-logic-tiles.sociobot.in/?demo=1` (also `/demo`; local: `http://localhost:5173/?demo=1`)
- **Sample:** lesson 1, “The missed seed,” starts with Move set to 2 squares. Change Move to 1 square, then step right four times to solve it.
- **Reset:** choose **Reset demo** in the persistent amber banner.
- **Leave:** choose **Start for real**. This removes demo progress before opening `/play` and resumes normal saved progress when it exists.
- **Storage:** demo state uses `localStorage` key `demo:game-logic-tiles:progress`. Normal play uses `game-logic-tiles:progress`. Demo mode never reads or writes the normal key.
- **Network:** all sample levels and art ship with the app. No account or external request is needed.

Challenge-seed checks choose a non-default lesson, change all five rules, choose **Create challenge link**, and open the resulting `/demo?seed=...` URL in a clean browser context.
