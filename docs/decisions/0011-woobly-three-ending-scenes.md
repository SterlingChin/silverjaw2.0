# 0011. Woobly tracks three distinct endings

Date: 2026-10-18
Status: Accepted

## Context
The player requested additional victories for flying up to heaven and walking backwards, with a different running scene for each ending.

## Decision
Extend the existing win state with an ending identifier. Flying below a gap reaches the mine shaft, flying above the sky threshold reaches heaven, and walking past the left boundary reaches home. Flight camera tracking supports negative world heights, using the same offset for drawing and pointer conversion.

Persist a validated set of discovered endings. Migrate the previous secret victory flag to the underground discovery. Keep the selected character and shared running animation, drawing a mine shaft, cloud floor with halo, or grassy ground according to the ending.

## Alternatives rejected
Separate levels or separate animation implementations would duplicate the existing movement and victory flow.

## Consequences
Existing saves remain compatible. Flight is required for the vertical exits, but ordinary walking can reach the backward exit. ADR 0010 remains the basis for underground movement and discovery.

## Content hooks
Three secret exits are demoable after family review.

## Extension: 1,000-step couch ending
On 2026-10-18, added a fourth ending when the current run reaches 1,000 steps. It uses the same validated discovery set, with a seated character rubbing a foot instead of running. The discovery counter derives its total from the ending registry. Flight is optional, and existing exit and loss handling retain priority.
