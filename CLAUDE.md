# Epiphany Learn session state

## 2026-09-29 — Gravity article reading layout

Articles dated August 1, 2026 onward use a 1540px editorial canvas with a wide prose column and a 262px right reading guide. The guide is sticky only within the article body; it stacks above the article below 1200px and cannot overlap later article sections or network links. Body horizontal overflow uses `clip` so it does not create a non-scrolling sticky ancestor; lesson-active still locks scrolling. Existing July articles retain their current layout. The implementation is on `codex/2026-09-29-learn-reading-layout`; generated drafts and their draft flags remain untouched. The Next build completed and a recent rendered article contains the guide while a July article retains the old structure. Independent exact-SHA review and release are next.

## 2026-09-25 — Gravity editorial articles

The article renderer is being extended for optional Gravity `editorial` frontmatter: three takeaways, H2 contents links, optional sourced figures and methods, and article scoped prose styles. The current implementation worktree is `codex/2026-09-25-gravity-editorial-learn`; the base is `origin/main` at `d3ef44b`. Existing article URLs, SEO metadata, schema and course links must remain intact. This request stays in the current session and outside Linear at Patrick's direction.

Handoff: `next build` passed with the site's local environment; a temporary editorial article fixture rendered three takeaways, five working contents anchors, a cited figure, and methods. The fixture was removed and the legacy article remains unchanged. Independent exact-SHA review is next.

## 2026-09-25 — Wide editorial article layout

The article page now uses a 1160px editorial canvas for the title, hero image, tables, and visual sections. Running text remains limited to 72ch. The compact guide pairs takeaways with contents; older articles get contents navigation too. Figures at a glance follow the article body. Changes are on `codex/2026-09-25-wide-editorial-help`; generated drafts, deployment, and publication were untouched. `npm run build` passed with the site's local environment; the first worktree build lacked Firebase configuration, so the local environment was linked for the successful run. Impeccable's static detector reported only warnings in incumbent CSS; no tests were run.

### Archived Codex Resume

- 2026-09-25: In-session Gravity editorial article rendering is ready for independent review in `codex/2026-09-25-gravity-editorial-learn`. New articles use optional `editorial` MDX frontmatter. The build and a temporary fixture render passed; the fixture was removed. Existing articles remain supported. No Linear issue was requested for this work.
