import { notFound } from "next/navigation";
import { getArticle, getAllArticles } from "@/lib/content";
import type { ArticleMeta } from "@/lib/content";
import Link from "next/link";
import type { Metadata } from "next";
import NetworkLinks from "@/components/NetworkLinks";
import { buildFAQSchema } from "@/lib/faq-schema";
import { articleHeadingId, getArticleHeadings } from "@/lib/article-headings";
import { Children, isValidElement } from "react";
import type { ReactNode } from "react";

function headingText(children: ReactNode): string {
  return Children.toArray(children).map((child) => {
    if (typeof child === "string" || typeof child === "number") return String(child);
    return isValidElement<{ children?: ReactNode }>(child) ? headingText(child.props.children) : "";
  }).join("");
}

interface Props {
  params: { slug: string };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllArticles().map((a: ArticleMeta) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle(params.slug);
  if (!article) return {};
  return {
    title: `${article.seoTitle} - Epiphany Learn`,
    description: article.description,
    robots: article.noindex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : undefined,
    alternates: {
      canonical: `/articles/${article.slug}`,
      types: { "application/rss+xml": "/rss.xml" },
    },
    openGraph: {
      type: "article",
      url: `/articles/${article.slug}`,
      publishedTime: article.pubDate,
      modifiedTime: article.updated || article.pubDate,
      images: article.image
        ? [{
            url: new URL(article.image, "https://epiphany.help").href,
            width: article.imageWidth ?? 1536,
            height: article.imageHeight ?? 1024,
            alt: article.imageAlt ?? article.title,
          }]
        : undefined,
    },
    twitter: article.image
      ? {
          card: "summary_large_image",
          images: [{ url: new URL(article.image, "https://epiphany.help").href, alt: article.imageAlt ?? article.title }],
        }
      : undefined,
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  let Content: React.ComponentType<{ components?: Record<string, React.ElementType> }> | null = null;
  try {
    const mod = await import(
      /* webpackInclude: /\.mdx$/ */
      `../../../content/articles/${params.slug}.mdx`
    );
    Content = mod.default;
  } catch {
    notFound();
  }

  if (!Content) notFound();

  const formattedDate = new Date(article.pubDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  const formattedUpdated = article.updated
    ? new Date(article.updated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      })
    : null;

  const pageURL = `https://epiphany.help/articles/${article.slug}`;
  const headings = article.editorial ? getArticleHeadings(article.body) : [];
  const headingCounts = new Map<string, number>();
  const editorialComponents = {
    h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
      const base = articleHeadingId(headingText(children));
      const count = headingCounts.get(base) ?? 0;
      headingCounts.set(base, count + 1);
      return <h2 id={count ? `${base}-${count + 1}` : base} {...props}>{children}</h2>;
    },
    table: ({ children }: React.HTMLAttributes<HTMLTableElement>) => (
      <div className="article-table-wrap" role="region" aria-label="Article data table" tabIndex={0}>
        <table>{children}</table>
      </div>
    ),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Person",
      "@id": "https://www.wikidata.org/wiki/Q139572015",
      name: "Patrick Gibbs",
      sameAs: [
        "https://www.wikidata.org/wiki/Q139572015",
        "https://github.com/mcpeezy",
        "https://www.linkedin.com/in/patrick-gibbs-839b7b237",
      ],
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://www.wikidata.org/wiki/Q139569923",
      name: "Epiphany Dynamics",
      url: "https://epiphanydynamics.ai",
      sameAs: [
        "https://www.wikidata.org/wiki/Q139569923",
        "https://github.com/epiphany-dynamics",
        "https://www.linkedin.com/company/epiphanydynamics",
        "https://epiphanydynamics.ai",
      ],
    },
    datePublished: article.pubDate,
    dateModified: article.updated || article.pubDate,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageURL },
    ...(article.image
      ? { image: new URL(article.image, "https://epiphany.help").href }
      : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://epiphany.help" },
      { "@type": "ListItem", position: 2, name: "Articles", item: "https://epiphany.help/articles" },
      { "@type": "ListItem", position: 3, name: article.title, item: pageURL },
    ],
  };
  const faqStructuredData = buildFAQSchema(article.body);
  const jsonLd = (value: Record<string, unknown>) => JSON.stringify(value).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }}
      />
      {faqStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(faqStructuredData) }}
        />
      )}
      <main className="min-h-screen px-6 py-16 max-w-[65ch] mx-auto">
        <nav className="text-sm text-white/40 mb-8">
          <Link href="/articles" className="hover:text-white/70 transition-colors">
            &larr; All Articles
          </Link>
        </nav>

        <article>
          <header className="mb-8 pb-8 border-b border-white/10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/40">
              <time dateTime={article.pubDate}>{formattedDate}</time>
              <span>by Patrick Gibbs</span>
              {formattedUpdated && <span>Updated {formattedUpdated}</span>}
            </div>
            {article.image && (
              <figure className="mt-6 overflow-hidden rounded-xl border border-white/10">
                <img
                  src={article.image}
                  alt={article.imageAlt ?? article.title}
                  width={article.imageWidth ?? 1536}
                  height={article.imageHeight ?? 1024}
                  className="h-auto w-full"
                />
              </figure>
            )}
          </header>

          {article.editorial && (
            <>
              <section className="article-takeaways" aria-labelledby="article-takeaways-title">
                <h2 id="article-takeaways-title">Key takeaways</h2>
                <div className="article-takeaway-grid">
                  {article.editorial.takeaways.map((takeaway, index) => (
                    <div className="article-takeaway" key={index}>
                      <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                      <p>{takeaway}</p>
                    </div>
                  ))}
                </div>
              </section>
              {headings.length > 0 && (
                <nav className="article-contents" aria-label="On this page">
                  <h2>In this article</h2>
                  <ol>{headings.map((heading) => (
                    <li key={heading.id}><a href={`#${heading.id}`}>{heading.title}</a></li>
                  ))}</ol>
                </nav>
              )}
              {article.editorial.stats && (
                <section className="article-stat-section" aria-labelledby="article-stat-title">
                  <h2 id="article-stat-title">Figures at a glance</h2>
                  <div className="article-stat-grid">
                    {article.editorial.stats.map((stat, index) => (
                      <div className="article-stat" key={`${stat.sourceUrl}-${index}`}>
                        <strong>{stat.value}</strong>
                        <p>{stat.label}</p>
                        <a href={stat.sourceUrl} target="_blank" rel="noopener noreferrer">Source: {stat.sourceName}</a>
                        <span> ({stat.sourceDate})</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          <div className="prose-lesson article-prose max-w-none">
            {article.editorial ? <Content components={editorialComponents} /> : <Content />}
          </div>

          {article.editorial?.methodology && (
            <section className="article-methodology" aria-labelledby="article-methodology-title">
              <h2 id="article-methodology-title">Sources and methodology</h2>
              <p>{article.editorial.methodology}</p>
              {article.editorial.verifiedAt && <p>Sources checked: {article.editorial.verifiedAt}</p>}
            </section>
          )}

          <NetworkLinks links={article.networkLinks} />
        </article>
      </main>
    </>
  );
}
