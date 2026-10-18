# 0012. Woobly secrets use landmarks and movement challenges

Date: 2026-10-18
Status: Accepted

## Context
The player requested eight funny victories based on precision, balancing, flight, and recovering from crossed legs, instead of distance alone.

## Decision
Extend the existing ending registry with eight outcomes and keep their state in each Walk instance. Fixed world landmarks define three precision entrances, a hidden button, two parking targets, and the lava start and exit. Parking requires five uninterrupted seconds. Pretzel requires three sustained crosses followed by stable recoveries. Frame contact requires backing out before retrying.

Anchor heaven to world x=210 instead of the camera and bound its entry vertically so flight can bypass it to reach the moon. Keep the existing underground, backward, and thousand-step endings. Save discoveries through the existing validated set, with a derived total.

Use separate illustrated victory scenes that reuse the selected character renderer and respect reduced motion. No new dependencies or save keys are needed.

## Consequences
Landmarks are deterministic and learnable while ordinary road terrain remains random. A new run resets all challenge timers and progress. Flight is needed for aerial entrances, the moon, parking, and the bridge button; the lava challenge enforces no ground contact. Existing saves remain compatible.

## Alternatives rejected
Random rare triggers would make discovery depend on luck. Separate games for each challenge would duplicate movement and cosmetic rendering.

## Content hooks
A secret-ending scavenger hunt is demoable after family review.
