# Estateably orbit artwork

Visual refinement requested September 8, 2026. Keeps the approved continuous orbit, push-in camera, scroll timing, narrative, and navigation. Replaces plain nodes with engraved participant medallions, adds concentric tracks and fine index marks, and replaces the glowing cube with layered ledger plates. Navy and Estateably blue remain the palette.

The editable SVG scene and its deterministic render pipeline are preserved here because the original `scrollcraft/` working directory is ignored by Git.

From the repository root:

```sh
node docs/estateably/scene/render.mjs both
bash docs/estateably/scene/encode.sh
```

Requires installed Google Chrome, Playwright, and ffmpeg with libx264. Rendering produces eight 30 fps clips per orientation, with the original seven-second legs and nine-second peak. The encoded outputs and first-frame JPEG posters go to `public/estateably/assets/`. The scene's fonts and original Data Flow excerpts are local for reproducible rendering.

Native pointer lock and capture are disabled during rendering. Desktop GOP is 8; portrait GOP is 4. Audio is stripped. Real-phone decoder and touch behavior require a physical device check.

## Verification

- Production build and `git diff --check` pass.
- Final `worldflight-assert.mjs`: 24 passed, 0 failed, including actual decoded frames and all reduced-motion copy windows.
- Desktop 1440 × 900 and mobile 390 × 844: six samples per chapter plus seam samples, 78 captures each. No dead scroll; all eight legs paint actual frames; text clears 4.5:1. Contact sheets and representative full-size frames visually inspected.
- Final SVG labels: no pairwise overlap across 81 time samples per orientation. Portrait label offsets were widened after visual review.
- Fourteen encoded seams: PSNR 45.43–49.80 dB between outgoing final and incoming first frames.
- Reduced-motion portrait screenshots verify responsive posters. The coarse three-sample screenshot pass misses three narrow copy windows; the final dedicated assertion samples their peaks and confirms every block reaches opacity 1.
- The generic screenshot harness reports frozen hidden clips: its visibility metric considers element bounds but not chapter opacity. The worldflight assertion and visible-frame captures confirm movement in the active chapter. No shared engine changes were made.
- Physical iPhone decoding, Low Power Mode, and touch scrolling were not tested.

The existing recognition → fragmented handoffs → connected participants → unified network story and peak are retained. The refinement adds readable object detail to the same wide-view and close-up sequence, with the resolved orbit holding at the end. No new grammar or fingerprint registry entry is needed for an artwork-only revision.

### Laptop government-label correction

During the government close-up, the landscape label and leader ease into a position directly beneath the medallion. This clears the CRA whiteboard while retaining radial placement at chapter seams. Rebuilt only desktop leg 4. Verified three close-up positions at 1280×800, 1366×768, 1440×900, 1510×826, and 1728×1117: zero whiteboard intersections, with at least 102 px horizontal clearance. Visually checked the 1510×826 page capture.
