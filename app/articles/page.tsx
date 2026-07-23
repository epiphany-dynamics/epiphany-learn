import Link from "next/link";
import Image from "next/image";
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
        <div className="grid gap-6 sm:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group block overflow-hidden border border-white/10 rounded-lg hover:border-white/25 transition-colors"
            >
              {article.image ? (
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-white/5">
                  <Image
                    src={article.image}
                    alt={article.imageAlt || article.title}
                    width={article.imageWidth ?? 1536}
                    height={article.imageHeight ?? 1024}
                    className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              ) : null}
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-white/60 text-sm mb-3">{article.description}</p>
                <time className="text-xs text-white/40" dateTime={article.pubDate}>
                  {new Date(article.pubDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-white/60">Articles coming soon.</p>
      )}
    </main>
  );
}
