# 0015. Endless Q-STACK and one-button Grabby

Date: 2026-11-03
Status: Accepted

## Context
Q-STACK's short target stages were too easy. Grabby's separate pumping, aiming, and release controls were confusing. The player requested endless precision stacking and a hold/release rope game with skins.

## Decision
Keep both models in the shared arcade shell. Add an opt-in endless mode with a single-run menu, height scoring, and records saved on loss. Give Q-STACK a v2 save key because its new height records are incompatible with the old stage scores. Preserve the old save without treating it as a height record.

Grabby uses one continuous held input across keyboard, canvas pointer, and touch button. Pausing clears held input without releasing the attached rope. Six free skins use a separate validated preference key and do not alter physics. Keep the existing Grabby stage unlock key.

## Consequences
Other games retain their existing stage menus and storage. Q-STACK inherits the surviving overlap width, removes overhang, and increases speed. Grabby provides a safe start and reachable-anchor highlights with original courses and artwork.

## Content hooks
Timing and clearer controls change how a game feels. Family review is required before publishing related content.
