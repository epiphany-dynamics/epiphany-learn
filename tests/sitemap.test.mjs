import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sitemapPath = join(root, "public/sitemap.xml");
const articlesIndexPath = join(root, "content/articles/index.json");

function generate() {
  const result = spawnSync(process.execPath, [join(root, "scripts/gen-sitemap.mjs")], {
    cwd: root,
    encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);
}

function parseLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

test("generates a well-formed static urlset with indexed article and lesson URLs", () => {
  generate();
  assert.equal(existsSync(sitemapPath), true);
  const xml = readFileSync(sitemapPath, "utf8");

  assert.match(xml, /^<\?xml version="1\.0" encoding="UTF-8"\?>\n<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  assert.match(xml, /<\/urlset>\n$/);
  assert.doesNotMatch(xml, /T\d{2}:\d{2}:\d{2}/);

  const locs = parseLocs(xml);
  assert.ok(locs.includes("https://epiphany.help"));
  assert.ok(locs.includes("https://epiphany.help/modules"));
  assert.ok(locs.includes("https://epiphany.help/articles"));
  assert.ok(locs.includes("https://epiphany.help/modules/module-1/ai-vs-hype"));

  const articles = JSON.parse(readFileSync(articlesIndexPath, "utf8"));
  for (const article of articles) {
    const loc = `https://epiphany.help/articles/${article.slug}`;
    if (article.draft || article.noindex) {
      assert.ok(!locs.includes(loc), `excluded ${loc}`);
    } else {
      assert.ok(locs.includes(loc), `included ${loc}`);
    }
  }

  assert.equal(new Set(locs).size, locs.length);
  assert.ok(locs.length >= 40);
});
