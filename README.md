# Epiphany Learn

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A free, gamified course that explains what AI is and how to use it, in seven short modules with quizzes, XP, badges, and a certificate.

Live at [epiphany.help](https://epiphany.help). Built by [Epiphany Dynamics](https://epiphanydynamics.ai).

## Why this exists

Most AI education assumes the reader already understands AI, which leaves the business owner and the curious skeptic without a starting point. This course is written for people who are not engineers, so a reader can finish a module in one sitting and use something from it the same day.

## Quickstart

Requires Node 22 and pnpm.

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000> and start module 1. Progress is stored in `localStorage`, so a lesson and its quiz work with no account and no sign up, and the first completed lesson lands within a minute or two.

Sign in is optional and only carries progress between devices. Firebase is initialized at import time in `lib/firebase.ts`, so a production build needs the six variables below in `.env.local`:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Other commands:

| Command | Action |
| --- | --- |
| `pnpm build` | Production build. `prebuild` regenerates `public/llms.txt` and the sitemap. |
| `pnpm start` | Serve the production build. |
| `pnpm test` | Run the Node test suites. |
| `pnpm gen:sitemap` | Regenerate `public/sitemap.xml` on its own. |
| `pnpm lint` | ESLint. |

## How it works

The app is a Next.js App Router site. Course material is markdown, and progress lives in the browser until a reader chooses to sync it.

- `app/modules/[moduleId]/[lessonId]/page.tsx` renders one lesson, `app/modules/page.tsx` lists the modules, and `app/dashboard`, `app/rewards`, and `app/articles` cover progress, badges, and written articles.
- Lessons are MDX under `content/module-N/` with frontmatter for `estimatedMinutes` and `xpReward`, and `content/module-N/index.json` holds that module's title, description, badge, and lesson list. There are 29 lessons across the 7 modules.
- `lib/content.ts` reads those files with gray-matter, so adding a lesson file is enough for it to appear with no registry to edit.
- `lib/progress.ts` keeps lesson and module progress in `localStorage` under `epiphany_learn_progress`, and `lib/achievements.ts` plus `lib/rewards.ts` derive badges and XP from it.
- `lib/firebase.ts` and `lib/sync.ts` move that local progress into Firestore when a reader signs in. Interactive lesson pieces such as quizzes and drag and drop exercises are MDX components under `components/mdx`.

The 58 written articles live in `content/articles`, and `scripts/gen-llms-txt.mjs` and `scripts/gen-sitemap.mjs` run on every build to publish `public/llms.txt` and a static `public/sitemap.xml`.

## Tests

```bash
pnpm test
```

This runs the Node test runner over `tests/*.test.ts` and `tests/*.test.mjs`. Four tests pass on Node 26: three cover the FAQ JSON-LD builder that the article pages emit, and one generates the sitemap and checks it is a well formed `urlset` containing the indexed article and lesson URLs.

The sitemap test regenerates `public/sitemap.xml`, so expect that file to show as modified in `git status` after a test run.

## Roadmap and known limits

- Firebase is needed for sign in and cross device sync only. A reader without an account keeps progress in one browser and loses it if local storage is cleared.
- Running the test suite rewrites the tracked `public/sitemap.xml` file.
- Course content is not under the code license. See below.

## License

Source code is MIT (see [LICENSE](LICENSE)). That covers the interface assets the app needs to run, including fonts, icons, badge and reward art, and module cover art.

Course content is copyright 2026 Epiphany Dynamics LLC, all rights reserved. That covers the lessons under `content/`, the lesson images under `public/images/generated/`, and the downloadable materials under `public/downloads/`. The boundary and full terms are in [CONTENT_LICENSE.md](CONTENT_LICENSE.md).
