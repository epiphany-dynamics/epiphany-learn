import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import GlobalNav from "@/components/nav/GlobalNav";
import "./globals.css";

const GA_ID = "G-5B61XZ9M1H";

/* Kahoot uses Montserrat globally — weight 700+ for headings, 400-600 for body */
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
    { media: "(prefers-color-scheme: light)", color: "#050505" },
  ],
};

export const metadata: Metadata = {
  title: "AI for Everyone — Epiphany Dynamics",
  description:
    "Learn AI in bite-sized modules. Cut through the hype and build real skills you can use every day. Free, gamified, no signup required.",
  metadataBase: new URL("https://epiphany.help"),
  verification: {
    google: "qnZM-ul4YDP07ZQCztpnsq6A0vASIXfWIzT2p7pxixM",
  },
  openGraph: {
    title: "Learn AI Without the Hype — Free, Gamified Modules",
    description:
      "7 modules, 29 lessons, 300+ quiz questions. Earn XP, unlock badges, and actually understand AI. Built for regular people, not engineers.",
    siteName: "Epiphany Dynamics",
    url: "https://epiphany.help",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1376,
        height: 768,
        alt: "Epiphany Learn — AI education for everyone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn AI Without the Hype — Free, Gamified Modules",
    description:
      "7 modules, 29 lessons, 300+ quiz questions. Earn XP, unlock badges, and actually understand AI.",
    images: ["/images/og-image.png"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Epiphany Learn",
  url: "https://epiphany.help",
  description:
    "Free, gamified AI learning platform. 7 modules, 29 lessons, 300+ quiz questions. Built by Epiphany Dynamics.",
  publisher: {
    "@type": "Organization",
    "@id": "https://www.wikidata.org/wiki/Q139569923",
    name: "Epiphany Dynamics",
    url: "https://epiphanydynamics.ai",
    logo: {
      "@type": "ImageObject",
      url: "https://epiphanydynamics.ai/logo.png",
    },
  },
};

const educationalOrgSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Epiphany Learn",
  url: "https://epiphany.help",
  description:
    "Gamified AI education platform — learn AI in 30-minute modules. 7 modules, 29 lessons, 300+ quiz questions.",
  parentOrganization: {
    "@type": "Organization",
    "@id": "https://www.wikidata.org/wiki/Q139569923",
    name: "Epiphany Dynamics",
    url: "https://epiphanydynamics.ai",
    sameAs: [
      "https://www.wikidata.org/wiki/Q139569923",
      "https://github.com/epiphany-dynamics",
      "https://www.linkedin.com/company/epiphanydynamics",
      "https://www.crunchbase.com/organization/epiphany-dynamics",
      "https://epiphanydynamics.ai",
    ],
  },
  founder: {
    "@type": "Person",
    "@id": "https://www.wikidata.org/wiki/Q139572015",
    name: "Patrick Gibbs",
    sameAs: [
      "https://www.wikidata.org/wiki/Q139572015",
      "https://github.com/patrickg21212",
      "https://www.linkedin.com/in/patrick-gibbs-839b7b237",
    ],
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    name: "Free AI Courses",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.wikidata.org/wiki/Q139572015",
  name: "Patrick Gibbs",
  url: "https://epiphanydynamics.ai",
  sameAs: [
    "https://www.wikidata.org/wiki/Q139572015",
    "https://github.com/patrickg21212",
    "https://www.linkedin.com/in/patrick-gibbs-839b7b237",
  ],
  worksFor: {
    "@type": "Organization",
    "@id": "https://www.wikidata.org/wiki/Q139569923",
    name: "Epiphany Dynamics",
    url: "https://epiphanydynamics.ai",
  },
  founder: "https://www.wikidata.org/wiki/Q139569923",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body
        className={`${montserrat.variable} ${geistMono.variable} antialiased`}
      >
        <GlobalNav />
        {children}
        <footer
          className="w-full py-4 text-center border-t"
          style={{
            background: "var(--bg-card)",
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          <p
            className="text-sm font-medium"
            style={{ color: "var(--text-muted)" }}
          >
            Brought to you by{" "}
            <a
              href="https://epiphanydynamics.ai"
              className="transition-colors"
              style={{ color: "#f0efeb" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Epiphany Dynamics
            </a>
            {" "}— Work, Reimagined.
          </p>
        </footer>
      </body>
    </html>
  );
}
