# Epiphany Learn

**AI education for people who aren't engineers.** Seven gamified modules, roughly 30 minutes each, that explain what AI actually is and how to use it. No jargon, no hype, no prerequisites.

Live at **[epiphany.help](https://epiphany.help)**.

Built by [Epiphany Dynamics](https://epiphanydynamics.ai).

---

## What it is

Most AI education is written for people who already understand AI. Epiphany Learn is written for everyone else: the business owner deciding whether to buy an AI tool, the person who keeps hearing that AI will take their job, the curious skeptic who wants a straight answer.

Each module is a set of short lessons followed by a quiz. You earn XP for correct answers, unlock badges as you finish modules, and get a certificate at the end. Progress is saved as you go.

## Curriculum

| # | Module | What you learn | Lessons | Time |
|---|--------|----------------|---------|------|
| 1 | **What AI Actually Is** | Cut through the hype and understand what's really going on | 4 | 30 min |
| 2 | **Talking to AI** | How to actually get good results from ChatGPT, Claude, and friends | 5 | 35 min |
| 3 | **AI in Your Everyday Life** | Real ways AI can save you time starting today | 4 | 30 min |
| 4 | **Staying Safe and Smart with AI** | What you need to know to protect yourself | 4 | 32 min |
| 5 | **Evaluating AI Tools and Vendors** | Make smarter buying decisions before you spend a dollar | 4 | 32 min |
| 6 | **Try It Yourself** | Your personal AI experiment, start small and see results | 4 | 32 min |
| 7 | **AI Anxiety Is Normal** | What's really happening and what you can actually do about it | 4 | 30 min |

**29 lessons, about 3 hours 40 minutes total.**

## How it works

- **Lessons** are MDX files under `content/module-N/`, each with frontmatter declaring `estimatedMinutes` and `xpReward`.
- **Progress** is tracked in `localStorage` by default, so the site works with no account and no sign-up.
- **Optional sign-in** (Firebase Auth) syncs that progress to Firestore so it follows you across devices.
- **Gamification** covers XP, badges, module-completion celebrations, and a downloadable certificate.

## Tech stack

| | |
|---|---|
| Framework | [Next.js 14](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Content | MDX via `@next/mdx`, with `remark-gfm` and `remark-frontmatter` |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Auth and sync | Firebase Auth + Firestore (optional, progress works without it) |
| Hosting | Vercel |

## Local development

Requires **Node 22** and **pnpm 9**.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Set the six Firebase variables in `.env.local` before running `pnpm build`. Several pages initialize Firebase and are prerendered at build time, so the production build fails with `auth/invalid-api-key` if they are missing:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

These configure sign-in and cross-device sync only. A reader never has to create an account: lesson progress is kept in `localStorage`, and signing in just carries that progress between devices.

Other commands:

```bash
pnpm build   # production build
pnpm start   # serve the production build
pnpm lint    # eslint
```

## Project structure

```
app/           Next.js App Router pages (modules, dashboard, rewards)
components/    UI, lesson, quiz, gamification, auth, nav
content/       Lesson content as MDX, one directory per module
lib/           Progress tracking, Firebase sync, achievements, design tokens
public/        Images and static assets
docs/planning/ Internal curriculum planning documents (see its README)
```

## Deployment

Pushes to `main` build and deploy to production via `.github/workflows/vercel-deploy.yml`, followed by an IndexNow ping to Bing and Yandex.

---

© Epiphany Dynamics. All rights reserved.
