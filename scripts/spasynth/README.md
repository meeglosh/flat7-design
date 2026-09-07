# SPASynth case study source

Branch: `codex/spasynth-case-study`. Pre-release draft, not deployed.

- `SPASynth.blend` and `build_model.py`: editable modular geometry. Regeneration requires the supplied reference `/Users/mikejerugim/spasynth/docs/spasynth-marketing.png`.
- `SPASynth-Studio.blend` and `render_studio.py`: Cycles studio materials, softbox lighting, real shadows, and camera/assembly choreography. Run Blender with `--background --python scripts/spasynth/render_studio.py -- --proof` for six poses and matching posters (`--posters` regenerates only the transparent posters), or `--sequence` / `--sequence --mobile` for production frames. CPU rendering is used because Metal's shader compiler crashes on this host.
- Production: 181 WebP frames per layout, desktop 1200 × 1080 and mobile 900 × 640. The script renders PNG intermediates into the gitignored lab and encodes WebP with system Python/Pillow. Existing WebP files are skipped to resume interrupted renders; remove the relevant output set before changing lighting or choreography.
- `public/spasynth/scene.js`: scroll-driven canvas player. `SEQUENCE-PLAYER.md` documents its loading, memory and fallback behavior. `page.js` maps readable field notes to progress.
- `scene-webgl-reference.js`: previous real-time renderer, retained as source reference. Its original assets and vendored Three.js license are retained in `reference-assets/`, outside the shipped public directory.
- `make_placeholder_audio.py`: regenerates the three temporary WAV sketches. They are not recordings of SPASynth. Replace both assets and visible labels when real demonstrations are ready.
- `verify.mjs`: desktop/mobile/compact/reduced-motion checks against the preview on port 4540.

Camera: full instrument, sample oscillator close-in, pan to Organic Chaos, pan down to modulation matrix, wide exploded hold, deliberate reassembly. Scroll reversal reverses the same sequence. Mobile uses a wider camera for its separate landscape stage. Reduced motion uses the exploded poster and regular reading flow.

The model uses actual interface imagery with separate geometry for knobs, plates, chassis and illustrative internal components. It is an imagined physical embodiment of software, not a production hardware design.

Preview: `npm run dev -- --host 127.0.0.1 --port 4540`, then `/spasynth/`.
Build: `npm run build`. No publication is part of these scripts.
