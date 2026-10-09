# 0001. Q-BEE uses the existing standalone games convention

Date: 2026-10-09
Status: Accepted

## Context
Q-BEE is a family-designed browser dropper for sterlingchin.com/games. Existing games are self-contained HTML documents in public/games, registered in data/games.ts. Taylor specified four-direction steering viewed from above, finite themed levels, cosmetics, paid revives, and durable progress without mid-fall saves.

## Decision
Use a dependency-free Canvas 2D perspective renderer and a versioned browser-local save in one HTML document. Separate the pure progression model from rendering so economy and persistence rules can be tested with Node. Save earned coins, owned/equipped skins, separate mode records, and the interrupted level/attempt count. Never persist a fall's position or unbanked coins. A paid revive costs 20 banked coins, resets carried coins, adds one try, and clears the next four obstacle layers including the collision layer.

## Alternatives rejected
A new 3D engine adds a runtime dependency for a deliberately compact arcade game. A backend account system introduces identity and services beyond the requested scope. Saving an entire run would contradict the requested restart-from-top behavior.

## Consequences
Q-BEE works offline when downloaded and integrates without changing application dependencies. Saves are specific to the browser and origin. Clearing browser data removes progress. Blocked storage is surfaced visibly. Perspective, collision, input, and layer ordering are implemented locally and verified separately.

## Content hooks
Proposed family-reviewed demo: a child's game design becomes a playable cube dropper, including their coin and revive rules. No family content publication is part of this change.
