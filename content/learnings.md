# Build learnings

## 2026-10-09: Exercise rendered cosmetics, not just purchase logic

Q-BEE's core economy tests passed, but the browser wardrobe check found a renderer crash: the preview canvas uses `data-skin-art`, which maps to `dataset.skinArt`, while purchase buttons use `data-skin`. Reading the button key from a canvas produced an undefined skin. Fix the attribute lookup and keep wardrobe rendering in browser checks alongside the isolated coin/save tests.

## 2026-10-09: Standalone back links need a top-level target in the launcher

A standalone game's default `/games` link navigates inside its iframe when embedded. Set its target to `_top` so it returns to the gallery rather than nesting a second gallery inside the active game window. Applied to both Q-BEE and Notebook Invasion.
