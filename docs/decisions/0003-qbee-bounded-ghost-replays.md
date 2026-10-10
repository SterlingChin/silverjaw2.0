# 0003. Bounded local Q-BEE ghost replays

Date: 2026-10-10
Status: Accepted

## Context
Ghost races need successful fall trajectories without changing the existing wallet or interrupted-fall rules.

## Decision
Extend the existing version-1 local save with optional validated ghost records per mode and level. Record positions at 10 Hz, capped at 1,200 samples. Keep the fastest successful run without paid revives. Older saves continue to load. Attempt power-ups and tunnel rewards remain provisional; a hidden skin is awarded only on completion. No service or dependency is added.

## Alternatives rejected
Server leaderboards would introduce accounts and network state. Saving every frame would waste storage. Saving unfinished replays would conflict with restarting interrupted falls.

## Consequences
Ghosts remain in this browser, separate for Story and Free Play. Corrupt, oversized, or incompatible replay records are discarded without affecting saved currency. Reset clears replays alongside other game progress.

## Content hooks
Potential family-reviewed demo: racing your past squishy cube through a candy factory.
