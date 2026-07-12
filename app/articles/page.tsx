import Link from "next/link";
import { getAllArticles } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles - Epiphany Learn",
  description: "Practical guides on using AI to work smarter, learn faster, and grow your career.",
  alternates: {
    canonical: "/articles",
    types: { "application/rss+xml": "/rss.xml" },
  },
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <main className="min-h-screen px-6 py-16 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Articles</h1>
      <p className="text-lg text-white/60 mb-12 max-w-2xl">
        Practical guides on using AI to work smarter, learn faster, and grow your career.
      </p>

      {articles.length > 0 ? (
        <div className="grid gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="block p-6 border border-white/10 rounded-lg hover:border-white/25 transition-colors"
            >
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-white/60 text-sm mb-3">{article.description}</p>
              <time className="text-xs text-white/40" dateTime={article.pubDate}>
                {new Date(article.pubDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-white/60">Articles coming soon.</p>
      )}
    </main>
  );
}
