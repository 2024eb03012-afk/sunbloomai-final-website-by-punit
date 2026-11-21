import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { site } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Sunbloom AI — Enterprise AI & Data Infrastructure",
    template: "%s — Sunbloom AI",
  },
  description: site.description,
  keywords: [
    "enterprise AI",
    "AI data operations",
    "data collection for AI",
    "data annotation",
    "AI agents",
    "AI voice agents",
    "workflow automation",
    "AI evaluation",
    "AI agent benchmarking",
    "Sunbloom AI",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Sunbloom AI — Enterprise AI & Data Infrastructure",
    description: "Build, power and evaluate intelligent systems.",
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
    images: [{ url: "/images/home.webp", width: 2400, height: 1637, alt: "Sunbloom AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunbloom AI — Enterprise AI & Data Infrastructure",
    description: "Build, power and evaluate intelligent systems.",
    images: ["/images/home.webp"],
  },
  icons: {
    icon: "/sunbloom-logo.png",
    apple: "/sunbloom-logo.png",
    shortcut: "/sunbloom-logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/sunbloom-logo.png`,
  email: site.email,
  description: site.description,
  sameAs: [site.linkedin],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body className="min-h-screen bg-ink font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
