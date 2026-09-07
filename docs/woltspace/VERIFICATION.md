# Verification

Build reviewed September 7, 2026.

- `npm run build`: TypeScript and production Vite build pass.
- `git diff --check`: pass.
- Final production package served at `http://localhost:4550/woltspace/`.
- Vite dev route: `/woltspace` returns 302 to `/woltspace/`; resulting page has the expected case-study title.
- Scroll-craft harness: 36 samples each at 1440×900, 390×844, and reduced motion. Final runs report no console errors, failed requests, or dead scroll. Contact sheets reviewed.
- Functional checks: desktop, 390×844, compact 360×640, reduced motion, and JavaScript disabled. No page overflow or broken images. All essential sections remain visible.
- Setup buttons change explanatory content. Workspace controls change image, caption, and design rationale. The landscape button updates its pressed state and content; an explicit visitor choice survives further scrolling. Space activates the focused button and its focus ring is visible.
- Original prototype: create a wolt named Cedar, return to the workspace, open a project, return, open terminal and connectors. The original file is preserved byte-for-byte (SHA-256 `2b48f9026ffa05fd2d9837537a4066a835ad27d7862c78402e584a85c0bfed4f`).
- Six theme links checked. Shared scroll-craft engine files match the skill copies byte-for-byte.

## Findings and corrections

The first harness reported a missing favicon and classified the bespoke reveal as static because it does not use engine cues. Added the existing sprite as favicon and exposed actual rendered sprite transforms and opacity to the harness. The quiet lead-in is an intentional hold. No engine modifications.

The first visual pass revealed the landscape too early in the opening workspace screenshot. Changed that image to the labeled scenery-hidden view so the “make it zanier” exhibit delivers the principal visual change. Mobile review caught the escaped beaver colliding with the status caption; confined it to the picture boundary and moved the cloud away from interface text.

The prototype test initially tried to use the sidebar while the newly created wolt's full-screen conversation was open. The correct flow uses its visible Back/Lodge button first, then clicks the project title (not the surrounding card). This was a test navigation issue, not a change to the supplied design.

## Feel check

Intended: curiosity → recognition → relief → delight → confidence → agency → resolve.
First read: curiosity → clarity → relief → familiarity → confidence → invitation → resolve. The early landscape stole the surprise; removing it from the opening screenshot restored the reveal's contrast. The peak is the only pinned exhibit and gets 2.5 viewport-heights on desktop. Phones and reduced motion use normal flow plus a button. The final credit plate remains visible.

## Limits

Desktop Chrome emulation is not a physical phone or Safari test. No WCAG certification is claimed. The screenshot assets preserve the supplied prototype's own text contrast; the harness has no engine-cued copy to measure, so its green report is not an automatic contrast certification. Essential case-study prose sits on solid grounds and was visually checked. Original prototype animation and accessibility behavior are preserved, not redesigned by this case-study task. Production GitHub Pages deployment is deferred to the user's Claude Code merge.

Evidence: local ignored `scrollcraft/builds/woltspace/lab/`. Reproducible interaction checks: `scripts/verify-woltspace.mjs`. No generated imagery or paid generation was used. Optional preflight omissions: KIE key and ffmpeg WebP encoder, neither needed for this asset route.

## Inline prototype revision

Embedded the supplied HTML directly in the Your turn chapter behind an explicit Start exploring button. Verified desktop and phone lazy loading (no iframe before activation), creating a wolt, reset/unload, absence of page overflow, and absence of script errors. Reviewed cover and active screenshots. Original prototype remains unchanged. The larger standalone view remains available.

Embed testing caught the original fixed onboarding overflowing the shorter iframe. The host now applies vertical overflow and safe alignment inside that screen so Create wolt stays reachable.

Phone visual review also caught an overly narrow split after creating a wolt. The host now presents one full-width panel and uses the existing Chat/Project buttons to switch. Both states were exercised in the final passing run.

## Active header simplification

Verified that the extra toolbar hides after Start exploring, its controls move below the frame, and reset restores both the preview header and keyboard focus. Desktop and phone onboarding, Chat/Project switching, and reset continue to pass.

Back from the larger prototype now targets `#prototype-demo`. The page realigns that anchor after fonts and scroll-craft layout settle, preventing late height changes from moving the destination offscreen. Verified actual back-link navigation at 1440px and 390px: prototype begins approximately 48px below the viewport top in both.

## Reconstructed grayscale before state

Replaced only the reveal’s scenery-hidden before image with the user-requested generated grayscale modern dashboard. The opening hierarchy screenshot remains the original design with scenery hidden. Reviewed the generated asset and the composed transition at 1440px and 390px; before/after switching, image decoding, and absence of horizontal overflow pass. Production build passes. The reconstruction is explicitly labeled and the generation prompt is recorded in GENERATED-BEFORE.md.

Skeletal revision: replaced the polished grayscale before with a generated text-free wireframe using pale gray placeholder bars, squares, and circles. Verified the resulting asset, desktop/phone transition, image loading, and no horizontal overflow. Production build passes. Caption now says illustrative wireframe.

## Concept introduction revision

Removed the opening dashboard screenshot and expanded the harness, scaffold, and wolt cards with decorative illustrations. The dashboard now first appears in the zanier reveal. Reviewed screenshots at 1440px and 390px; verified three concept cards, no workspace image in the challenge section, and no horizontal overflow. Production build and whitespace checks pass.

Current animal revision: production build and diff checks pass. Verified concept cards and animal group at 1440px and 390px, with no horizontal overflow; confirmed footer head is absent. Visually reviewed the rendered updated sprites at both sizes.

Workspace view selector: replaced understated underline tabs with bordered buttons, a filled rust selected state, and an explicit invitation to choose a view. Verified all three screenshot selections at desktop and mobile widths, no horizontal overflow, and mobile visual layout. Build passes.

Setup selector and Retina revision: setup buttons now use bounded cards and a filled selected state. All three choices update the visual, alt text, full-size link, and caption. First two visuals are explicitly labeled concept illustrations because installation screens are absent from the supplied prototype. Last choice shows original onboarding. Desktop/mobile selection and image decoding checks pass. Recaptured original onboarding, workspace, conversation, and terminal screens at device scale 2 (2880 × 1960), waiting for fonts. Build passes. Reusable capture script: scripts/capture-woltspace.mjs.

Onboarding framing: recaptured the form bounds with 24px padding at 2x resolution, removing the surrounding empty viewport. The setup image retains its natural portrait proportions so the full form stays visible at a larger size. Visually checked the complete capture; production build passes. Also repaired stale sprite extraction lines in the capture script.

Landscape reveal: light green transitions to a blue sky with layered pixel hills, drifting clouds, and flowing river highlights when the zanier state activates. Uses the same scroll/button state as the dashboard reveal. Decorative layers are hidden from assistive technology; reduced motion disables animation and transitions. Desktop/mobile toggles, overflow checks, reduced-motion assertions, and build pass.

Refined reveal scenery with smaller stepped hill contours, layered woodland tones and trees, shaded clouds, and finer river highlights. Removed foreground cloud decorations from the exhibit. Dashboard shadow is absent in the wireframe state and fades in only for the zany state. Build, desktop/mobile reveal checks, overflow, and reduced-motion checks pass; reviewed desktop render.

Workspace scroll indexing: sticky presentation advances Projects → Conversation → Terminal across three scroll segments, reversing on upward scroll. Direct selection remains in effect until a segment boundary is crossed. Reduced motion uses manual controls without the long sticky track. Verified all three scroll states and manual selection on desktop/mobile; reviewed mobile layout; build passes.

Setup now advances across three scroll segments with a sticky layout and compact mobile controls. Setup and workspace share a 450ms image crossfade, preloading the incoming image and ignoring stale requests during rapid selection. Outgoing images are decorative and removed when the fade finishes. Reduced motion changes images immediately. Desktop/mobile scroll sequences and manual controls pass; reviewed mobile setup composition; build passes.
