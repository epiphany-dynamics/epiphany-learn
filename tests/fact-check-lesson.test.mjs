import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const root = process.cwd();

test('fact-checking article leads readers to the live AI-errors lesson', () => {
  const article = matter(fs.readFileSync(path.join(root, 'content/articles/how-to-fact-check-chatgpt.mdx'), 'utf8'));
  const target = '/modules/module-2/when-ai-gets-it-wrong';
  assert.match(article.content, new RegExp(`\\[[^\\]]+\\]\\(${target}\\)`));
  const moduleMeta = JSON.parse(fs.readFileSync(path.join(root, 'content/module-2/index.json'), 'utf8'));
  const lesson = moduleMeta.lessons.find(item => `/modules/${moduleMeta.id}/${item.slug}` === target);
  assert.ok(lesson, 'target must resolve to a lesson in the module manifest');
  assert.ok(fs.existsSync(path.join(root, `content/${moduleMeta.id}/${lesson.id}-${lesson.slug}.mdx`)));
  const published = JSON.parse(fs.readFileSync(path.join(root, 'content/articles/index.json'), 'utf8'));
  assert.ok(published.some(item => item.slug === article.data.slug && !item.draft));
});
