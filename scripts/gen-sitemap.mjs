#!/usr/bin/env node
/**
 * Writes a static public/sitemap.xml at build time.
 *
 * Next.js app/sitemap.ts is served as an App Router metadata route
 * (x-matched-path /sitemap.xml, Vary: RSC, and /sitemap.xml.rsc on
 * RSC requests). Google Search Console's sitemap fetcher has a long
 * history of "Couldn't fetch" / "Sitemap could not be read" on those
 * dynamic Next responses even when curl returns 200 + valid urlset.
 * Sister sites that GSC marks Success serve static XML from disk.
 *
 * Wired into `prebuild` so every production build refreshes the file.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const contentRoot = join(root, "content");
const articlesIndexPath = join(contentRoot, "articles", "index.json");
const outPath = join(root, "public/sitemap.xml");
const SITE = "https://epiphany.help";

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function toLastmod(value) {
  if (!value) return null;
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
  const lines = [`  <url>`, `    <loc>${escapeXml(loc)}</loc>`];
  if (lastmod) lines.push(`    <lastmod>${escapeXml(lastmod)}</lastmod>`);
  if (changefreq) lines.push(`    <changefreq>${escapeXml(changefreq)}</changefreq>`);
  if (priority != null) lines.push(`    <priority>${escapeXml(priority)}</priority>`);
  lines.push(`  </url>`);
  return lines.join("\n");
}

const modules = [];
if (existsSync(contentRoot)) {
  for (const name of readdirSync(contentRoot).filter((n) => /^module-\d+$/.test(n)).sort()) {
    const indexPath = join(contentRoot, name, "index.json");
    if (!existsSync(indexPath)) continue;
    const mod = JSON.parse(readFileSync(indexPath, "utf8"));
    const id = String(mod.id || name).trim();
    const lessons = Array.isArray(mod.lessons)
      ? mod.lessons
          .map((lesson) => String(lesson?.slug || "").trim())
          .filter(Boolean)
      : [];
    modules.push({ id, lessons });
  }
}

const articles = [];
if (existsSync(articlesIndexPath)) {
  const list = JSON.parse(readFileSync(articlesIndexPath, "utf8"));
  if (Array.isArray(list)) {
    for (const item of list) {
      if (!item || item.draft === true || item.noindex === true) continue;
      const slug = String(item.slug || "").trim();
      if (!slug || slug === "test-article" || slug === "test-post") continue;
      articles.push({
        slug,
        lastmod: toLastmod(item.updated || item.pubDate || item.date),
      });
    }
  }
}

const contentLastmod = articles.map((a) => a.lastmod).filter(Boolean).sort().at(-1) ?? null;

const entries = [
  { loc: SITE, lastmod: contentLastmod, changefreq: "weekly", priority: "1.0" },
  { loc: `${SITE}/modules`, lastmod: contentLastmod, changefreq: "weekly", priority: "0.9" },
  { loc: `${SITE}/articles`, lastmod: contentLastmod, changefreq: "weekly", priority: "0.8" },
];

for (const mod of modules) {
  entries.push({
    loc: `${SITE}/modules/${mod.id}`,
    lastmod: contentLastmod,
    changefreq: "monthly",
    priority: "0.8",
  });
  for (const slug of mod.lessons) {
    entries.push({
      loc: `${SITE}/modules/${mod.id}/${slug}`,
      lastmod: contentLastmod,
      changefreq: "monthly",
      priority: "0.7",
    });
  }
}

for (const article of articles) {
  entries.push({
    loc: `${SITE}/articles/${article.slug}`,
    lastmod: article.lastmod,
    changefreq: "weekly",
    priority: "0.7",
  });
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(urlEntry).join("\n")}
</urlset>
`;

writeFileSync(outPath, xml);
console.log(
  `[gen-sitemap] Wrote ${outPath} — ${entries.length} URLs (${modules.length} modules, ${articles.length} articles).`,
);
