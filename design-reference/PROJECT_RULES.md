# Sticky Card Stacking Fix

## Problem
When using `position: sticky` cards that stack on scroll, a subsequent section (like Recognition) gets tucked underneath and disappears as you scroll past the cards.

## Solution
Add `position: relative; z-index: 10;` to the section that should appear on top of the sticky cards.

**Example:**
```html
<section style="background:#FFFBF3;overflow:hidden;position:relative;z-index:10;">
  <!-- Recognition content -->
</section>
```

The sticky cards will have incrementing z-index values (1, 2, 3, etc.) from the loop. Setting the next section's z-index higher (10+) ensures it layers on top when scrolled into view.

## CRITICAL — never delete an original image without a verified backup
An image compression/resize mistake once permanently deleted 8 original photos (headshot, award-moment, portrait-blue, press-gendergap, press-staysharp, stage-wide-yellow, reading-room-hero-texture, personal-red-wall) because a script deleted the source file before confirming the replacement had actually saved. Rules, permanent:

1. **Never call delete_file on an original image as part of a resize/compress/recompress operation.** Always save the new version to a NEW path first (e.g. `foo.jpg.tmp` or `foo-optimized.jpg`), confirm it exists and looks right, THEN and only then overwrite/rename — never delete-then-regenerate.
2. **`run_script` overwrites that shrink a file >50% are refused by a safeguard — treat that refusal as a hard stop, not an obstacle to route around.** If it fires, the safe path is: keep the original untouched, save the new version under a different filename, and only replace the reference/rename once the new file is confirmed on disk.
3. Before deleting ANY asset file for any reason, grep the whole project for its filename first to confirm nothing live still references it, and confirm a working replacement is already saved on disk — not just generated in memory in the same script that's about to delete the original.

## CRITICAL — never bulk-overwrite `.image-slots.state.json`
This file is the shared sidecar every page's `<image-slot>` uploads live in. On 2026-08-22, reading the whole file, editing one entry, and writing the entire file back clobbered other photos the user had just dropped in concurrently — permanent, unrecoverable loss. Rules, permanent:

1. **Never read-modify-write the whole sidecar file.** If a single slot's override needs clearing or fixing, that is a targeted edit — treat it with the same caution as deleting an original image (see the image-safety rule above). Prefer leaving stale overrides alone unless the user asks, over touching this file.
2. If a slot's static `src` isn't showing because a stale local override is winning, tell the user and ask them to clear/re-drop it themselves via the UI, rather than editing the sidecar file directly.
3. Before touching this file for any reason, assume the user may be actively dropping images into it right now — there is no safe moment to bulk-rewrite it.

## Rule — every user-provided image gets resized + compressed, never used raw
When the user drops in a photo for a specific slot, don't just save it as-is. Resize it to a sensible max dimension for where it will display (generous ~2x retina headroom over the rendered size — e.g. a 500px-wide card gets ~1000-1600px max dimension), and compress to JPEG (~0.85-0.9 quality unless transparency is needed). Goal: never heavily pixelated, never an unreasonably large file (multi-MB) for a small on-page slot. Follow the safe-save process above (new filename first, confirm, then finalize) — never overwrite the user's uploaded original in place.

## CRITICAL — never break the Home Page "My Experiments" stacking section again
This section (`Home Page.dc.html`, `id="experiments"`) uses `position:sticky` polaroid-style cards that pin and stack on top of each other while scrolling. It has broken multiple times from well-intentioned edits. Rules, permanent:

1. **`overflow-x: hidden` goes on `body` ONLY, never on `html` or any ancestor wrapper div.** Putting it on `html` (or a wrapping div) turns that element into the scroll container and silently kills `position: sticky` for everything inside — this was the real root cause of the stacking breaking, not the card styles themselves.
2. The sticky wrapper (`entry.stickyStyle`) background must be **transparent** — not `#FFFBF3` or any solid color. A solid background there blocks the card underneath from showing through during the stack transition.
3. Reference copy of the known-good section/logic: `reference/Home Page - Experiments Section (KNOWN GOOD).md`. If this section ever looks broken again, diff against that file before changing anything else.
