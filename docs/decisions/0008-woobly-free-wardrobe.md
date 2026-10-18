# 0008. Woobly has a free cosmetic wardrobe

Date: 2026-10-18
Status: Accepted

## Context
The player wants side-view walking and free outfits with matching boy and girl variants.

## Decision
Draw the character in profile with arm swing and toe lift derived from foot positions. Keep collision geometry shared with the model and keep outfits cosmetic.

Store outfit and character variant as independently validated, optional fields in the existing local save. Old saves default to Explorer and Boy while preserving distance and sound. Every outfit is available immediately for both variants, with no currency or unlock requirement.

## Alternatives rejected
Separate boy and girl outfit inventories would duplicate choices and make matching themes harder to maintain. Paid unlocks conflict with the player's request. Changing collision physics per outfit would affect fairness.

## Consequences
The wardrobe previews all twelve combinations and persists choices locally. Existing records and movement rules remain compatible.

## Content hooks
Family review required for a demo of the side-view character and free wardrobe.
