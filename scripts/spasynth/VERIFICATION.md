# SPASynth draft verification

Verified locally on 2026-09-06/07. Not deployed; no physical-phone verification.

## Final studio sequence

- All 362 WebP files open and decode at expected dimensions: 181 desktop frames at 1200 × 1080 and 181 mobile frames at 900 × 640. Desktop total 9,679,288 bytes; mobile total 5,690,290 bytes. Each layout loads only its own sequence near the stage. Transparent posters are about 190 KB each.
- `node scripts/spasynth/verify.mjs` passed in real headless Chrome at 1440×1000, 390×844, 360×640 and reduced motion. Captures await exact displayed target frames at 0, .17, .40, .68, .79, .93, 1, then reverse to .40 and .17. No horizontal overflow, broken images or page errors.
- Independent visual inspection covered assembled, all three module close-ups, exploded wide view, reassembly, reverse scroll, desktop/mobile heroes and reduced-motion layout. Full instrument fits at wide/end; selected assemblies fit their close-ups. Narrow contain-fit letterboxes preserve the geometry on compact displays.
- `check_fallbacks.mjs` confirmed complete-poster fallback when frame requests fail, readable no-JS content, zero sequence requests with reduced motion, native audio playback with single-track exclusivity, correct mobile matrix anchor label, and trailing-slash redirect.
- Earlier player fixture checks verified at most four concurrent requests, twenty decoded frames, dynamic reduced-motion cleanup/restoration, variant switching, failed-target fallback and recovery. Actual final sequence captures reached the twenty-frame cache cap without errors.
- `npm run build`, `git diff --check`, Python/JS syntax checks and bytewise comparisons of the unchanged scroll-craft engine copies passed.

## Design and source notes

The lighting uses Cycles softboxes, real shadows, selective turquoise emission, material roughness and glass reflections. Camera moves into the sample oscillator, pans to Organic Chaos, moves down to the matrix, pulls wide, then returns during reassembly. Source is editable in `SPASynth-Studio.blend` and reproducible with `render_studio.py`.

Corrected issues: poster RGB matte (regenerated RGBA, then optimized to alpha WebP), caption stacking, old mobile anchor offset, and reassembly label timing. Old WebGL assets are preserved outside the shipped public directory.

The original scroll-craft harness was run desktop/mobile/reduced. It initially caught missing engine mounting, fixed before this iteration. Its flow-based low-pixel-change flags included ordinary reading regions; it was not treated as a clean automated pass. Final custom verification samples the actual rendered animation states precisely.

Limits: local Chrome and emulated mobile viewports, not a physical phone or throttled production network. The camera sequence is prerendered and scroll-seekable, not a free-orbit scene. Product is approaching release; audio remains explicitly labelled placeholder sketches, not SPASynth output. Hardware internals are illustrative. This is ready for user visual review, not an assertion of final creative approval.
