# 0016. Individually authored parkour rooms

Date: 2026-11-03
Status: Accepted

## Context
Rooftop Rascal reused one generated rooftop layout with small difficulty variations. The player requested entirely different stages and more puzzle-platforming mechanics.

## Decision
Replace generated geometry with six explicit course definitions in a standalone data module. Keep the existing model and shell, with per-course palettes, names, instructions, spawn points, checkpoints, coins, and trophy positions. Add ladders, switches that enable bridges, moving platforms that carry the player, and a collectible umbrella that enables gliding. Preserve existing stage unlocks.

## Consequences
Each course can be revised independently. Physics and rendering consume the same course data. Existing rooftop layout tests must become actual course-specific traversal checks. No dependency is added.

## Content hooks
How authored layouts create different challenges with a small shared set of mechanics. Family review required before content publication.
