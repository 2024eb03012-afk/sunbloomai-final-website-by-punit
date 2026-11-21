import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = [
  { path: "", priority: 1 },
  { path: "/data-operations", priority: 0.9 },
  { path: "/enterprise-ai", priority: 0.9 },
  { path: "/evaluation", priority: 0.9 },
  { path: "/research", priority: 0.7 },
  { path: "/company", priority: 0.7 },
  { path: "/contact", priority: 0.8 },
  { path: "/careers", priority: 0.5 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
