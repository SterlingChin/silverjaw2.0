# Build learnings

## 2026-10-09: Exercise rendered cosmetics, not just purchase logic

Q-BEE's core economy tests passed, but the browser wardrobe check found a renderer crash: the preview canvas uses `data-skin-art`, which maps to `dataset.skinArt`, while purchase buttons use `data-skin`. Reading the button key from a canvas produced an undefined skin. Fix the attribute lookup and keep wardrobe rendering in browser checks alongside the isolated coin/save tests.

## 2026-10-09: Standalone back links need a top-level target in the launcher

A standalone game's default `/games` link navigates inside its iframe when embedded. Set its target to `_top` so it returns to the gallery rather than nesting a second gallery inside the active game window. Applied to both Q-BEE and Notebook Invasion.

## 2026-10-09: Inspect deployment metadata when build logs are empty

The Thunder Pen production deployment failed before building with `git_info_fail`, despite a successful preview. The build-event endpoint returned no logs; deployment metadata exposed the Git retrieval error. Retried the same production commit through Vercel's redeploy API rather than changing tested source to trigger another build.

## 2026-10-10: Random pickups can invalidate a spawn-count assertion

The opening-pickup test occasionally spawned a pickup directly on the player and collected it in the same update. Moved the test player outside the spawn range so it verifies spawning without depending on random placement.
