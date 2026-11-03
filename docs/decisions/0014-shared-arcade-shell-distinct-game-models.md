# 0014. Shared arcade shell with distinct game models

Date: 2026-11-03
Status: Accepted

## Context
The family requested all nine proposed games plus a new original platformer inspired by the coin-collecting structure of Low's Adventures.

## Decision
Add ten standalone routes using a shared vanilla JavaScript Canvas shell for menus, pause, input, rendering primitives, and versioned per-game local saves. Keep ten distinct simulation classes in an ES module that also runs in Node tests. Each game implements its own interaction and victory/failure rules. Static wrapper pages select the game by slug. Existing games are not migrated.

Provide level selection, instructions, desktop and touch controls, restart, accessible status, and storage fallback consistently. Each new game has authored or deterministically generated stages, an original SVG tile, and a series assignment. The parkour game uses original layouts and artwork with collectibles and a gated finish, not copied levels or assets.

## Consequences
Shared shell fixes reach all ten new games, while model changes remain isolated by class. Saves use separate keys and validation so one game cannot overwrite another. No framework, runtime dependency, or remote asset is added. The launcher retains one dialog and renders each collection as a full-width shelf to accommodate the expanded catalog.

## Alternatives rejected
Ten copies of menu/input code would drift. Reusing one mechanic with different names would not fulfill the proposed games.

## Content hooks
Ten family-designed games and the different control experiments are demoable after family review.
