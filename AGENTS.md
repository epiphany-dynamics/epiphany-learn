# Epiphany Learn agent context

The workspace rules in `../AGENTS.md` apply. This repository serves the Epiphany Learn course and article hub at epiphany.help. Preserve published article URLs, metadata, structured data, lesson flows, and course links. Use a session worktree and the current `origin/main` tip for implementation. Review changes independently before merging or publishing. Generated Gravity drafts in the shared checkout are active work; preserve them.

## Codex Resume

- 2026-09-29: Articles dated August 1, 2026 onward use a wider article body and a right reading guide bounded to the body. The feature branch is `codex/2026-09-29-learn-reading-layout` in `.worktrees/2026-09-29-learn-reading-layout`. Body horizontal overflow uses `clip` so sticky positioning follows the page scroll; lesson-active still locks scrolling. Older articles retain their current presentation. Draft flags and lesson pages are unchanged. Independent exact-SHA review and release are next.

### Archived Codex Resume

- 2026-09-25: The article template and scoped CSS are widened in `codex/2026-09-25-wide-editorial-help` from `origin/main` at 32e257e. The 1160px canvas applies to all articles while paragraphs retain a 72ch measure; lessons are unaffected. The Next build passed with the site's local environment. Existing Gravity drafts were untouched. Independent exact-SHA review is next. This work stays in-session and out of Linear.
