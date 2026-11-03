# 0013. Pencil Patrol and arcade series

Date: 2026-11-03
Status: Accepted

## Context
The family requested a notebook-styled pencils-versus-erasers lane-defense game and an arcade organized by game series.

## Decision
Keep Pencil Patrol as a standalone Canvas game, following the other arcade games. Separate its deterministic gameplay model from rendering so economy, combat, wave completion, and save validation can be tested without a browser. Use a new versioned localStorage key for five-level progression. No dependencies or backend are added.

Give each game an explicit series in the registry. The launcher groups tiles into Notebook Series, Q Series, Dude Series, and Snack Drawer, while retaining one shared modal and keyboard focus restoration. Notebook contains Notebook Invasion and Pencil Patrol; Q contains Q-BEE; Dude contains Woobly; Snack Drawer contains Snack Slash. Existing routes and saves stay unchanged.

## Consequences
Progress is local to the browser, with a graceful fallback when storage is unavailable. The new series property is required, preventing ungrouped additions. Series is presentation metadata, not a new URL hierarchy.

## Alternatives rejected
A new framework or external game engine would add unnecessary dependencies. Separate launchers per collection would duplicate dialog state and focus handling.

## Content hooks
Notebook defense and the family-designed game shelf are demoable after family review.
