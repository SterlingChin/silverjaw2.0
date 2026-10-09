# Q-BEE

Pronounced “cubey.” A standalone, top-down perspective dropper. Open index.html directly, or play /games/q-bee through the website. No game dependencies, network calls, or external assets.

## Controls

- WASD / arrow keys steer across the falling plane. Q-BEE falls automatically.
- Press and drag with mouse or touch to steer toward a spot.
- P / Escape pauses; use the pause dialog to resume, restart, or return home.
- Sound is optional and starts off. Reduced-motion settings disable decorative motion and facial animation.

## Rules

Six finite worlds end in jello: Space, Kitchen, Attic, Greenhouse, Candy Factory, and Volcano. Story Mode unlocks worlds in order. Free Play opens all worlds immediately. Mode records are independent; wallet and wardrobe are shared.

Touch qoins to collect them. A crash discards every qoin from that fall. Finishing deposits the remaining qoins and a try bonus of 5, 4, 3, 2, 1, then 0 on try six or later. A free restart adds one try. A paid revive costs 20 banked qoins, adds a try, clears the collision layer plus the next three layers (or all remaining layers if fewer), and keeps no carried qoins.

Eight cosmetic skins cost 0, 10, 25, 40, 60, 80, 100, and 200 qoins. Cosmetics do not change collision size or difficulty. The active cube blinks, moves its closed smile, briefly grins, and occasionally yawns.

## Saving

The versioned localStorage key is `qbee-save-v1`. It stores banked qoins, owned/equipped skins, sound preference, per-mode records, and the interrupted level plus attempt counts. It never saves fall depth, position, or carried qoins. Reopening an interrupted game offers a new attempt from the top. A completed level resets that level's pending try count for replays. Going home does not reset an unfinished level's try count.

Progress belongs to the current browser and origin. Local preview, downloaded HTML, and sterlingchin.com have separate saves. Storage failures show a visible warning. Restart whole game requires confirmation and resets only Q-BEE's save.

## Validation

From the repository root:

```sh
node --test tests/qbee.test.mjs
npm run build
```

Use the repository's Node 22 runtime for the website build. The model tests cover all rewards, purchases, crashes, paid/free retries, save/reload, corrupt or blocked storage, mode separation, collision/collection, all six reachable courses, and facial animation timing.

Browser validation on 2026-10-09 covered desktop and 390px mobile layouts, real drag input, wardrobe rendering and purchase, pause/resume, death and revive, interrupted-run reload, reset confirmation, game window identity, iframe removal on close, focus return, and the existing Notebook Invasion start flow. The production `/games` route lists Q-BEE and `/games/q-bee` returns the standalone game.
