# 0002. Game tiles launch one isolated game window

Date: 2026-10-09
Status: Accepted

## Context
Taylor requested a square symbol for each game and a game screen that pops up after selection, so games are easy to distinguish.

## Decision
Replace text-led game cards with illustrated square launcher tiles. Use a native modal dialog with a labeled header and one iframe for the selected standalone game. Only load a game when opened; remove its iframe when closed. Preserve each game's existing URL and browser-local save key. Keep Q-BEE's outward games link targeted at the top-level gallery.

## Alternatives rejected
Injecting games into the gallery DOM mixes input handlers, styles, and animation loops. Always loading all games wastes resources and risks background play. A full navigation works but does not provide the requested pop-up game screen.

## Consequences
Games keep independent behavior and saves. Native dialog provides focus containment and background inertness. Closing a window ends an unfinished fall under Q-BEE's established save rules. Direct game URLs remain playable.

## Content hooks
Proposed family-reviewed walkthrough: using visual game identities and one-at-a-time game windows to make a small family arcade easier to navigate.
