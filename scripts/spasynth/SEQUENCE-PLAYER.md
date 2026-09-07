# Photoreal sequence player

`public/spasynth/scene.js` draws Blender-rendered frames into a decorative canvas.
It listens to `spasynth:progress` with `detail.progress` from 0 through 1.
Frame selection is `round(progress * 180)`. There is no autoplay timeline.

## Asset contract

- Desktop: `assets/sequence/frame-000.webp` through `frame-180.webp`, 1200 × 1080.
- Portrait: `assets/sequence-mobile/frame-000.webp` through `frame-180.webp`, 900 × 640.
- Inspected Cycles posters: `assets/studio-assembled.webp` and `assets/studio-exploded.webp`.
- `data-poster-assembled` / `data-poster-exploded` on `#synth-stage` point to those posters. Its initial fallback image remains complete until any replacement poster loads.

The final render set must pass the file-completeness gate in `verify.mjs` before browser verification. See `VERIFICATION.md` for the latest completed checks.

## Loading and memory

The sequence starts loading within 650 px of its stage. Four requests maximum run concurrently. The latest requested frame and its six neighbors on either side take priority, followed by increasingly dense coverage of the rest of the sequence. Existing in-flight requests finish on seeks so the concurrency ceiling holds.

Compressed blobs can be cached for all frames. Only the target and its two immediate neighbors on either side enter the decode queue, with at most two decode jobs at once. The decoded LRU holds 20 frames. Eviction explicitly closes `ImageBitmap` objects; the compatibility path removes the image source and revokes its object URL. Canvas pixels remain complete while an uncached target loads.

A failed target displays the static poster. A later successful target restores the sequence. The reduced-motion preference shows the exploded poster, aborts pending requests, releases all decoded frames, and fetches no sequence. Changes to reduced motion and portrait layout are handled at runtime.

## Verification contract

`#synth-stage` exposes:

- `data-model-ready`: `true`, `poster`, or `false` (failed target).
- `data-target-frame` and `data-displayed-frame`; displayed is -1 when showing a poster.
- `data-sc-verify-state`: variant, target, displayed frame, mode, decoded count and active fetch count.

`spasynth:ready` requests the latest page progress after initialization and when the first frame becomes available, so an initial event emitted before this module loaded is not lost.

## Fixture checks, before final render completion

Headless Chrome checks used intercepted image responses, not the final render sequence. They verified no frame fetch at the hero, forward and reverse frame targeting, a maximum of four concurrent requests, a 20-frame decoded cache, zero console errors, no sequence requests with initial reduced motion, dynamic reduced-motion cleanup and restoration, portrait frame selection, complete-poster fallback on a failed frame, and recovery on a valid seek.

Final rendered files passed completeness, decoding, exact forward/reverse scroll state checks and desktop/mobile viewport visual inspection. See `VERIFICATION.md` for actual asset sizes, results and physical-device limits.

The final verifier (`verify.mjs`) refuses to run until all 362 frame files exist, inverts the page content landmarks to choose semantic progress samples, then waits for the exact displayed frame to match the current target before each screenshot. It also includes backward seeks. The page label changes to Reassembly at progress .84, matching the Blender assembly track, and Reassembled at the end.
