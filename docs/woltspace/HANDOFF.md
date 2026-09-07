# Woltspace case study handoff

Branch: `codex/woltspace-case-study`, based on `origin/main` at `a46611a`.

## What this adds

- `/woltspace/`: standalone scroll-craft product design case study, using the existing static-page pattern. The Your turn chapter now includes the original prototype inline, loaded only when Start exploring is pressed. Reset removes the iframe and its temporary state; Open larger retains the separate wrapper.
- `/woltspace/prototype.html`: labeled, sandboxed wrapper around Mike's supplied interactive design prototype.
- All six Selected Work tiles now link to `/woltspace/`.
- Vite trailing-slash handling includes Woltspace.

Direction confirmed by Mike: distinct chapters, a “make it crazier” moment, technical clarity first and personality as the surprise. Credits identify Mike as solo product designer and Jeremy Pinto as creator and principal architect. No invented dates, metrics, or research outcomes.

## Files and constraints

`public/woltspace/index.html`, `page.css`, and `page.js` are the final authored source. `scrollcraft.css` and `scrollcraft.js` are unchanged copies of the shared skill engine. Original screenshots and pixel sprites are under `assets/`. `prototype/index.html` is the supplied prototype, not the live production product.

The opening hierarchy screenshot remains the supplied project view with its `#bg-scene` decoration hidden. The reveal now uses a separate AI-generated polished grayscale dashboard (`workspace-modern-before.png`), requested by Mike because the original modern direction looked different and no screenshot survives. Its caption explicitly labels it as a reconstruction. Never describe it as the actual earlier design.

The setup chapter explains the original design approach; current install documentation remains linked to woltspace.com. Do not replace it with runnable installation commands without checking the current docs.

The prototype contains sample conversations, projects, simulated terminal behavior, and mock connector flows. The wrapper explicitly labels it as such. It does not run real agents or connect accounts. Preserve that label. Its original interactions/accessibility are not a claim about production behavior.

## Preview and verification

`npm run build`

`npm run dev -- --host 127.0.0.1 --port 4551`, then `/woltspace/`.

`WOLTSPACE_URL=http://localhost:4551/woltspace/ node scripts/verify-woltspace.mjs`

The verification script expects local Google Chrome on macOS. Screenshot evidence and machine reports are kept in the ignored `scrollcraft/builds/woltspace/lab/`; the summarized results are in `VERIFICATION.md`. The brief is committed here so Claude Code does not depend on local skill memory.

## Merge

Review and merge this branch into the then-current main using Claude Code. A push to main deploys the portfolio through its existing GitHub Pages workflow. This task only publishes the feature branch, not the live site. No changes to RenoRun or SPASynth are included.

The inline host injects a small layout adaptation into the iframe: onboarding scrolls vertically when taller than the panel. On phones the first-wolt conversation uses one full-width view, toggled by the existing Chat and Project buttons. The supplied HTML file itself remains byte-for-byte unchanged.

Active embed chrome: the explanatory toolbar hides when exploration starts. Reset and Open larger move below the iframe as quiet text controls. Reset restores the original preview toolbar and returns focus to Start exploring.
