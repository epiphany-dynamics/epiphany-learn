import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { buildFAQSchema, extractFAQItems } from "../lib/faq-schema.ts";

const markdown = `## Frequently Asked Questions

### What should a beginner automate first?

Choose one low-risk task with a clear result.

### When should a person stay involved?

Keep a human involved for sensitive or judgment-heavy decisions.
`;

test("extracts visible Markdown FAQ items and builds FAQPage JSON-LD", () => {
  assert.deepEqual(extractFAQItems(markdown), [
    { question: "What should a beginner automate first?", answer: "Choose one low-risk task with a clear result." },
    { question: "When should a person stay involved?", answer: "Keep a human involved for sensitive or judgment-heavy decisions." },
  ]);
  assert.equal(buildFAQSchema(markdown)?.["@type"], "FAQPage");
});

test("returns null when the article has no visible FAQ", () => {
  assert.equal(buildFAQSchema("## Start here\n\nNo FAQ."), null);
});

test("the article page emits sanitized FAQ JSON-LD from the parsed article body", () => {
  const source = readFileSync(new URL("../app/articles/[slug]/page.tsx", import.meta.url), "utf8");
  assert.match(source, /buildFAQSchema\(article\.body\)/);
  assert.match(source, /replace\(\/<\/g, ['"]\\\\u003c['"]\)/);
});
