# 0007. Woobly generates random terrain with solid legs

Date: 2026-10-18
Status: Accepted
Amends: 0006

## Context
The player requested random obstacles, solid legs, slippery puddles, and holes of varying sizes.

## Decision
Keep the standalone movement model. Inject a random source into each run, defaulting to Math.random, so tests can reproduce courses. Randomize terrain type, spacing, crate dimensions, and gap widths from 45 to 125 world units. Keep clear space between hazards and prune terrain behind the player.

Share the bent-leg geometry between drawing and collision checks. Sweep foot and body movement against expanded crate bounds so knees and shins cannot pass through crates. Puddles accelerate grounded feet sideways, disturb balance, and lose their effect when the foot is lifted or reaches dry ground.

## Alternatives rejected
Foot-only collision allows visible legs to pass through obstacles. A separate physics engine remains unnecessary for this small game. Unbounded gap widths could make courses impossible.

## Consequences
Runs have different courses while tests remain repeatable. Players may need to step onto crates before stepping off the far side. Slipping can be recovered from by lifting a foot onto dry ground. Existing best-distance saves remain compatible.

## Content hooks
Family review required before publishing a demo of solid legs and slippery puddles.
