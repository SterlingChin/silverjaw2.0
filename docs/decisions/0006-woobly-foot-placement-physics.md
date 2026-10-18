# 0006. Woobly uses bounded foot-placement physics

Date: 2026-10-18
Status: Amended by 0007 for terrain generation and leg collisions

## Context
Woobly is an endless long-legged walking game. The cursor controls legs, obstacles interrupt walking, and distance ends when the character falls.

## Decision
Use the arcade's standalone Canvas convention with a pure deterministic movement model. Drag one foot at a time. Swept foot movement prevents crossing solid obstacles, reach is limited, grounded feet support a spring-driven body, and overextension or loss of balance causes a fall. Generate bounded obstacle/gap patterns ahead and prune passed terrain. Store only best distance and sound preference in a separate local save key. Mouse, touch, and optional keyboard controls share the same model.

## Alternatives rejected
A full rigid-body engine adds a dependency and tuning complexity. Automatic walking would undermine the user's cursor-controlled legs. Saving mid-walk poses would complicate recovery and is not needed for a distance record.

## Consequences
The game works as a standalone offline document, with repeatable physics tests and browser playtests. Best distance remains local to the browser. Course geometry and active objects are bounded during long runs.

## Content hooks
Proposed family-reviewed demo: turning deliberately wobbly movement into a playable foot-placement game.
