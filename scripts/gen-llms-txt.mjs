#!/usr/bin/env node
/**
 * Regenerates public/llms.txt from modules + articles so it never goes stale.
 * Wired into `prebuild` — runs automatically before every `next build`.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const contentRoot = join(root, 'content');
const articlesDir = join(contentRoot, 'articles');
const outPath = join(root, 'public/llms.txt');
const SITE = 'https://epiphany.help';

const truncate = (s, n) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}...` : s);

// --- Modules + lessons from content/module-N/index.json ---
const modules = [];
if (existsSync(contentRoot)) {
  for (const name of readdirSync(contentRoot).filter((n) => /^module-\d+$/.test(n)).sort()) {
    const indexPath = join(contentRoot, name, 'index.json');
    if (!existsSync(indexPath)) continue;
    try {
      const mod = JSON.parse(readFileSync(indexPath, 'utf8'));
      const id = mod.id || name;
      const title = String(mod.title || name).trim();
      const description = String(mod.description || '').replace(/\s+/g, ' ').trim();
      const lessons = Array.isArray(mod.lessons)
        ? mod.lessons.map((l) => ({
            slug: l.slug,
            title: String(l.title || l.slug).trim(),
          }))
        : [];
      modules.push({ id, title, description, lessons });
    } catch {
      // skip malformed module indexes
    }
  }
}

// --- Articles (source of truth is content/articles/index.json, same as getAllArticles) ---
const articles = [];
const articlesIndexPath = join(articlesDir, 'index.json');
if (existsSync(articlesIndexPath)) {
  try {
    const list = JSON.parse(readFileSync(articlesIndexPath, 'utf8'));
    if (Array.isArray(list)) {
      for (const item of list) {
        if (!item || item.draft === true) continue;
        const slug = String(item.slug || '').trim();
        if (!slug || slug === 'test-article' || slug === 'test-post') continue;
        const title = String(item.title || slug).trim();
        const description = String(item.description || '')
          .replace(/\s+/g, ' ')
          .trim();
        const dateRaw = item.updated || item.pubDate || item.date;
        const date = dateRaw ? new Date(String(dateRaw)) : new Date(0);
        articles.push({
          slug,
          title,
          description,
          date: Number.isNaN(date.getTime()) ? new Date(0) : date,
        });
      }
    }
  } catch {
    // fall through with empty articles list
  }
}
articles.sort((a, b) => b.date - a.date);

const lessonCount = modules.reduce((n, m) => n + m.lessons.length, 0);

const header = `# Epiphany Learn

> Gamified AI education platform. Learn practical AI skills in short modules with quizzes, XP, and plain-English lessons. Built for business owners and operators who are not technical.

## Ownership

- Owned by: Epiphany Dynamics (Wikidata: Q139569923, https://epiphanydynamics.ai)
- Creator: Patrick Gibbs (Wikidata: Q139572015)

## Core Pages

- [Home](${SITE}/): Platform overview and start path
- [Modules](${SITE}/modules): ${modules.length} learning modules (${lessonCount} lessons)
- [Articles](${SITE}/articles): ${articles.length} beginner-friendly AI explainers
- [Dashboard](${SITE}/dashboard): Progress and XP (signed-in learners)
- [Rewards](${SITE}/rewards): Badges and completion rewards
`;

let modulesBody = `\n## Modules (${modules.length})\n\n`;
if (modules.length === 0) {
  modulesBody += `_No modules found._\n`;
} else {
  for (const mod of modules) {
    const desc = mod.description ? `: ${truncate(mod.description, 160)}` : '';
    modulesBody += `- [${mod.title}](${SITE}/modules/${mod.id})${desc}\n`;
    for (const lesson of mod.lessons) {
      modulesBody += `  - [${lesson.title}](${SITE}/modules/${mod.id}/${lesson.slug})\n`;
    }
  }
}

const articlesBody =
  articles.length === 0
    ? '\n## Articles\n\n_No published articles yet._\n'
    : `\n## Articles (${articles.length})\n\n${articles
        .map((a) => {
          const desc = a.description ? `: ${truncate(a.description, 160)}` : '';
          return `- [${a.title}](${SITE}/articles/${a.slug})${desc}`;
        })
        .join('\n')}\n`;

const footer = `
## Audience

Business owners, operators, and non-technical workers learning AI for the first time. Focus: practical skills, honest answers to job-anxiety questions, and clear next steps.

## Contact

- Website: ${SITE}
- Publisher: https://epiphanydynamics.ai
- Owner Wikidata: https://www.wikidata.org/wiki/Q139569923
- Author Wikidata: https://www.wikidata.org/wiki/Q139572015
`;

writeFileSync(outPath, `${header}${modulesBody}${articlesBody}${footer}`);
console.log(
  `[gen-llms-txt] Wrote ${outPath} — ${modules.length} modules, ${lessonCount} lessons, ${articles.length} published articles.`,
);
