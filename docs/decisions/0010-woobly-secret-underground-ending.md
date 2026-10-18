# 0010. Woobly has a flight-only underground ending

Date: 2026-10-18
Status: Accepted

## Context
The player requested a secret way to finish the endless game by flying down a hole, with the camera following. The victory screen should show the chosen character running.

## Decision
Extend flight foot placement below ground inside existing gaps. Treat the shaft walls as solid and follow the character with a vertical camera offset shared by rendering and pointer conversion. Reach an underground exit while flying to win. Ordinary falls remain losses.

Persist discovery separately from distance and unlocks. Show a victory dialog with the current character running, respecting reduced motion, plus replay and home buttons. Reset vertical camera state for a new run.

## Alternatives rejected
A separate underground level would require additional terrain and transitions. Awarding a win for any fall would remove the flight requirement.

## Consequences
Every gap can hide an exit, so discovery does not depend on finding a specific random gap. Existing records and cosmetics remain compatible. The game remains endless for ordinary play.

## Content hooks
Family review required before publishing a demo that reveals the hidden ending.
