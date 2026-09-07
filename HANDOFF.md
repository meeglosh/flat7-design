# flat7.design — Session Handoff

Last updated: 2026-09-06 (repo at `7055619`, live at https://flat7.design). Read this first when picking the project back up.

flat7.design is Mike Jerugim's portfolio for Flat7 Design (AI product design consultancy). React 18 + Vite + TypeScript + Tailwind + React Router v7. Every push to `main` deploys to GitHub Pages via GitHub Actions (about one to two minutes; `gh run list --limit 1` shows the run). There is no staging environment: `main` is production.

## What's on the site

- **Homepage, six themes** selectable from a tab bar: Neo (id `noir`, the default, `src/themes/DefaultPage.tsx` + `src/components/*`), Mid-Century, Luxury, Bauhaus, Gen Z, MySpace (`src/themes/<name>/<Name>Page.tsx`). The chosen theme persists in `localStorage.styleTheme`.
- **Selected Work grid**: NOT shared across themes. Each theme has its own hardcoded project array (Neo in `src/components/Work.tsx`, the rest in each theme page). Any add/remove/reorder/relink is **six separate edits**, each in that theme's own field names and styling. Current order: Onix, Soluna, Wingman, Woltspace, SPASynth, Decathlon, Hololabs, Bandsintown, Flashtract, Estateably.
- **React case studies** at `/case-studies` and `/case-studies/:slug`, driven by `src/data/caseStudies.ts` (Kooth/Soluna, Decathlon, Estateably, Bandsintown and others). Theme-aware media blocks (`quotes`, `ideation`) live in `src/pages/CaseStudyDetail.tsx`; fullscreen zoomable Lightbox in `src/components/Lightbox.tsx`. **Deliberately low visibility**: no nav or hero link in any theme, only a small footer link. Do not re-add prominent links without asking.
- **Scroll-craft case studies** (standalone static pages, the newer format, one folder each under `public/`):

  | URL | Grammar | Notes |
  |---|---|---|
  | `/onix/` | Chaptered editorial | Typographic title page; fixed 16-week rail as nav. Two designers on the team: never imply Mike was sole designer. Brand-guide text must not be quoted. |
  | `/soluna/` | Split stage (before vs after) | Divider is the chrome; context cards cross into the summary sheet; collapses into a live Figma prototype. No invented numbers (see BRIEF). |
  | `/decathlon/` | Filmic one-shot, pinned phone | One CSS phone carries stills, then a scroll-scrubbed booking clip, then the Figma prototype. First-person copy, no headcount claims, published facts only. |
  | `/wingman/` | Live surface (the page is a Wingman deck) | Wingman's own chrome is the nav; "scroll is speaking" transcript ribbon; ends in a real prompt form to wingman.design (`?topic=` prefill is live on the Wingman side). Mike's personal project; solo builder framing. |

  Each Selected Work tile for those four projects links to its `/<slug>/` page (in all six themes). The old React pages for Soluna and Decathlon remain reachable.

## Scroll-craft: how the static case studies are built

- Engine: `scrollcraft.js` + `scrollcraft.css` copied into each `public/<slug>/`. **Never edit the engine**; bespoke behaviour is page JS driven from each act's `--sc-p`. The skill lives at `~/.claude/plugins/cache/nateherk/nateherk-design/<version>/skills/scroll-craft/` (SKILL.md, references/, scripts/).
- Workspace: `scrollcraft/` at the repo root is **gitignored** (`FINGERPRINTS.md` registry, `builds/<slug>/BRIEF.md`, research, lab shots). It exists only on Mike's machine. The BRIEF for each build is the record of every decision, cleared claim and disclosure limit; if it is missing, the memory notes below are the fallback.
- **Fingerprint gate**: every new build must differ from every existing row in `scrollcraft/FINGERPRINTS.md` on 4 of 6 dimensions (grammar, nav, hero, act sequence, close, signature move). Chaptered editorial, split stage, pinned-object filmic one-shot and live-surface-as-deck are all taken.
- **Process Mike wants**: interview first (AskUserQuestion rounds), write BRIEF.md, then a **Sonnet subagent builds the page from the brief** while the orchestrator verifies independently. Building the page directly (as happened on Decathlon) was flagged; do not repeat.
- **Verification**: `node <skill>/scripts/serve.mjs --root public/<slug> --port 45xx` then `shoot.mjs` desktop, `--width 390 --height 844`, and `--reduced-motion`; read `sheet.png`. The harness misses anything parked under 0.85 opacity, so ALSO run a Playwright probe (real Chrome at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`, `playwright-core` is in `node_modules`) that scrolls to exact act positions and reads computed opacities of headings, cues and bullets. That probe caught four real defects the harness reported as clean on Wingman.
- **Do not verify scroll pages in the Claude-in-Chrome tab**: it is a background tab, Chrome pauses its rAF loop and CSS transitions, `--sc-p` never advances, and media will not play. Use headless Playwright (foreground) instead.
- **Figma embeds**: use `scaling=scale-down-width` with the iframe at 100% and never upscale it (Figma's canvas margin varies with frame size, so any fixed upscale crops at some width). Figma is blocked in the headless harness (`ERR_ABORTED`); confirm embeds in real Chrome.
- **Dev server**: `npm run dev` on port 5174. `vite.config.ts` has `staticCaseStudyPages([...])`: add each new slug. It **redirects** `/<slug>` to `/<slug>/` (relative `scrollcraft.css/js` paths break without the trailing slash and the page renders unstyled). GitHub Pages already redirects in production.

## Recent history (2026-09-06)

- Wingman scroll-craft case study built and shipped, including the landing "case study" framing (eyebrow, self-typing prompt, "Scroll to start presenting" ribbon nudge which Mike asked for despite scroll-craft's ban on scroll cues, "· Case study" top-bar tag), the 14-stop tools rail grouped by stage with the heading pinned above it and the rail panning through the exit, and Mike's own slide backgrounds (`public/wingman/assets/bg-1,3,4,5.jpg`; `bg-2` villa is unused).
- Decathlon scroll-craft case study shipped; both Decathlon role lines now "Lead Product Designer".
- Neo hero: static plant still replaced by a looping clip (`public/hero-plants-1080-ai.mp4`, a Real-ESRGAN 2x upscale of the clean 720p source; the 1080p file in `videos/` is a bad upscale, do not use it). Light/dark toggle removed from the Neo nav.
- Luxury hero: static portrait replaced by `public/hero-luxury.mp4` with `hero-luxury-poster.jpg`; `unsplash5.jpg` is now unreferenced.
- `videos/` is gitignored source footage (contains personal info in some clips); never commit it.

## Standing preferences

- **No em dashes in visible copy** anywhere (durable). Period, comma, colon or parentheses.
- Case studies stay low-visibility (footer link only). Share links privately.
- Research artifacts that are text or data become themed HTML blocks, not screenshots.
- No invented numbers or timelines: only figures Mike has cleared. Name AI tools only when cleared; on Wingman the models are named as the code shows them.
- Mike gives direct, iterative visual feedback with screenshots; expect several small rounds after a build and verify each in a foreground browser before reporting it fixed.
- Commit messages end with the Claude co-author trailer; commit and push only when Mike asks. He usually says "commit and push" or "merge and deploy" explicitly.

## Deeper context

Claude's project memory at `~/.claude/projects/-Users-mikejerugim-flat7-design/memory/` holds one note per case study (decisions, cleared claims, disclosure limits, verification lessons) plus the roster, privacy and media-block notes. This file is the summary; those are the deep dives. The Wingman product itself has its own `HANDOFF.md` at `/Users/mikejerugim/wingman`.
