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

The first visual pass revealed the landscape too early in the opening workspace screenshot. Changed that image to the labeled scenery-hidden view so the “make it crazier” exhibit delivers the principal visual change. Mobile review caught the escaped beaver colliding with the status caption; confined it to the picture boundary and moved the cloud away from interface text.

The prototype test initially tried to use the sidebar while the newly created wolt's full-screen conversation was open. The correct flow uses its visible Back/Lodge button first. This was a test navigation issue, not a change to the supplied design.

## Feel check

Intended: curiosity → recognition → relief → delight → confidence → agency → resolve.
First read: curiosity → clarity → relief → familiarity → confidence → invitation → resolve. The early landscape stole the surprise; removing it from the opening screenshot restored the reveal's contrast. The peak is the only pinned exhibit and gets 2.5 viewport-heights on desktop. Phones and reduced motion use normal flow plus a button. The final credit plate remains visible.

## Limits

Desktop Chrome emulation is not a physical phone or Safari test. No WCAG certification is claimed. The screenshot assets preserve the supplied prototype's own text contrast; the harness has no engine-cued copy to measure, so its green report is not an automatic contrast certification. Essential case-study prose sits on solid grounds and was visually checked. Original prototype animation and accessibility behavior are preserved, not redesigned by this case-study task. Production GitHub Pages deployment is deferred to the user's Claude Code merge.

Evidence: local ignored `scrollcraft/builds/woltspace/lab/`. Reproducible interaction checks: `scripts/verify-woltspace.mjs`. No generated imagery or paid generation was used. Optional preflight omissions: KIE key and ffmpeg WebP encoder, neither needed for this asset route.
