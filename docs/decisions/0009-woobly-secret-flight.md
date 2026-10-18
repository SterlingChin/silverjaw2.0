# 0009. Woobly supports local secret ability unlocks

Date: 2026-10-18
Status: Accepted

## Context
The player requested a code screen with code 1526 unlocking flight. Released feet should stay in the air, and falling should become very difficult.

## Decision
Use a stable code registry for secret cosmetic skins. Hide secret pieces until their code is redeemed, then equip and persist the unlock without duplicate entries. Validate inventory and selected pieces on load. Cosmetic codes do not grant flight. Validate the flight code in the standalone model and save an explicit flight unlock plus enabled preference in the existing local record. Unlocking also enables flight. The code screen exposes a toggle after discovery; the next run snapshots that choice.

In flight mode, released feet become hovering support points. Balance forces are reduced and danger grows 40 times more slowly. Solid obstacle collision still applies. Limit upward foot placement to a visible altitude within the current fixed vertical camera. Show wings and foot ripples while flying. Normal runs retain their original physics.

## Alternatives rejected
Server-backed codes and paid entitlements add unnecessary infrastructure for a free local secret. Disabling every collision would let the character pass through crates rather than fly over them.

## Consequences
Unlocks persist in this browser and are not security-sensitive. Codes are discoverable in client source. Existing saves remain compatible. Flight is intentionally a powerful assist and uses the current distance record.

## Content hooks
Family review required for any demo that reveals the secret code.
