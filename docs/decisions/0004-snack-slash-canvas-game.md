# 0004. Snack Slash uses a standalone Canvas game and pure round model

Date: 2026-10-10
Status: Accepted

## Context
Taylor wants a cursor-controlled junk-food slicing game, playing as a parent clearing flying snacks. It needs its own arcade square and isolated game screen.

## Decision
Follow the existing standalone HTML convention. Keep physics, swept slice collision, scoring and round state in a pure model tested with Node. Draw foods and sliced halves with Canvas vector artwork. Use pointer events for mouse, pen and touch. Save best scores and total slices under a separate versioned localStorage key. Classic has 60 seconds and three mistakes; practice has 90 seconds without penalties. Pause when hidden or unfocused. No dependencies or backend.

## Alternatives rejected
An image pipeline or game engine adds unnecessary assets and dependencies for these small illustrated objects. A server leaderboard adds identity and network state beyond this game.

## Consequences
The game works offline as a single file and cannot overwrite the other games' saves. Records are local to the browser. Tests cover complete rounds and collision paths; visual and touch checks remain browser work.

## Content hooks
Proposed family-reviewed demo: turning a flying-junk-food idea into a cursor slicing game.
