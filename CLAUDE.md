# karlenkovenant — CLAUDE.md

Guided 10-week marriage Bible study for **the Karlens** — "The Marriage Walk."
Live: https://karlenkovenant.vercel.app

## Stack & ship
- React 18 + Vite 5 + Tailwind + framer-motion. localStorage only — no backend.
- **Ship = `git push`.** Connected to Vercel (origin: thejpcampbell/karlenkovenant) → auto-deploys on push to `main`. Do NOT run `vercel deploy` by hand.

## Identity values (this app's namespace)
- Role key: `kc_role` (fixed 2026-06-25 — was `cc_role`, which collided with campbell-covenant)
- Progress key: `karlen_covenant_progress_v1` (correct/distinct)
- `src/components/Creed.jsx` is **deliberately a no-op** here (returns `null`) — the creed is JP's personal motto and is omitted on the Karlens' copy. Don't "restore" it.

## ⚠️ Verbatim content — do not rewrite
- `src/data/sessions.js` is **CSB- + lexicon-verified, hand-approved by JP.** Never paraphrase or regenerate. Apply only the exact change asked; preserve `[NEEDS JP]` placeholders.
- The verbatim-guard hook flags edits here; run the **lexicon-verifier** subagent on the diff before committing content.

## Shared shell
One of the covenant family. Shared-shell fixes here don't auto-propagate — see the drift report.

## Visual changes
Render and show JP before "done" (open + copy to `~/Desktop/MSOX_VISUAL_REVIEW_LATEST/`). Generated ≠ approved.
