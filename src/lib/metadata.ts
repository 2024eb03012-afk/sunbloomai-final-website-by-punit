import type { Metadata } from "next";
import { site } from "./site";

export function pageMetadata({
  title,
  description,
  path,
  image = "home",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const ogTitle = `${title} — ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: `${site.url}${path}`,
      siteName: site.name,
      type: "website",
      locale: "en_US",
      images: [{ url: `/images/${image}.webp`, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [`/images/${image}.webp`],
    },
  };
}
