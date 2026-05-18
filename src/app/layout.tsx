import type { Metadata } from "next";
import { Inter } from "next/font/google";
// Favicon updated to use the branded sunbloom logo asset
import Script from "next/script";
import Footer from "../components/Footer";
import ElevenLabsConvAI from "../components/ElevenLabsConvAI";
import { SmoothCursor } from "../components/ui/smooth-cursor";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "sunbloom ai — AI agents that work the way your team does",
  description:
    "Sunbloom AI designs, deploys, and operates bespoke AI agents that reduce costs and response times while protecting your brand voice.",
  keywords: [
    "AI agents",
    "AI as a service",
    "automation",
    "customer support AI",
    "sales assistant",
    "Sunbloom AI",
  ],
  openGraph: {
    title: "sunbloom ai — AI agents that work the way your team does",
    description:
      "Design, deploy, and operate AI agents with measurable ROI. Professional, reliable, on-brand.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/sunbloom-logo.png",
    apple: "/sunbloom-logo.png",
    shortcut: "/sunbloom-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
      </head>
      <body className={`${inter.variable} font-sans antialiased scroll-smooth`}>
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />
        <SmoothCursor />
        {children}
        <Footer />
        <ElevenLabsConvAI />

      </body>
    </html>
  );
}
