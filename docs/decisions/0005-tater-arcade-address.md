# 0005. Move the arcade to /tater with legacy redirects

Date: 2026-10-10
Status: Accepted

## Context
Sterling requested sterlingchin.com/tater as the arcade address instead of /games.

## Decision
Move the gallery route and standalone public games to /tater. Update iframe URLs, icons, back links, metadata, rewrites and noindex headers. Permanently redirect /games and all its subpaths to their /tater equivalents.

## Alternatives rejected
Changing only the gallery would leave game links split between two namespaces. Removing the old routes without redirects would break shared links.

## Consequences
Existing bookmarks continue to work. Browser-local saves retain their original keys and origin, preserving progress. This updates the URL convention in the earlier game ADRs; their implementation and state decisions remain in effect.

## Content hooks
Proposed family-reviewed note: giving the family arcade its own address without losing game progress.
