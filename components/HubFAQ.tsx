import Link from "next/link";

export interface HubFAQItem {
  question: string;
  answer: string;
  /** Optional cross-link rendered after the answer. Its label text is included in the schema so visible text and JSON-LD match exactly. */
  linkLabel?: string;
  linkHref?: string;
}

export function HubFAQ({ items }: { items: HubFAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: [item.answer, item.linkLabel].filter(Boolean).join(" "),
      },
    })),
  };

  return (
    <section className="max-w-3xl mx-auto px-6 pb-20">
      <h2 className="text-2xl md:text-4xl font-display font-bold text-[var(--text-primary)] mb-8 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.question}
            className="rounded-2xl p-5 md:p-6"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <h3 className="font-display font-bold text-[var(--text-primary)] mb-2 text-lg">
              {item.question}
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              {item.answer}
              {item.linkLabel && item.linkHref && (
                <>
                  {" "}
                  <Link
                    href={item.linkHref}
                    className="underline hover:text-[var(--text-primary)] transition-colors"
                  >
                    {item.linkLabel}
                  </Link>
                </>
              )}
            </p>
          </div>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
}
