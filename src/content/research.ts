/**
 * Research & insights entries.
 *
 * Intentionally empty: Sunbloom AI has not published research yet, and the
 * site must not show invented articles. Add real entries here and the
 * /research page renders them in its editorial layout automatically.
 * `href` may point to an internal page or an external post (e.g. LinkedIn).
 */
export type ResearchCategory =
  | "AI Infrastructure"
  | "Data Operations"
  | "Enterprise AI Agents"
  | "AI Evaluation"
  | "Emerging AI Technologies"
  | "Industry Insights";

export type ResearchEntry = {
  title: string;
  summary: string;
  category: ResearchCategory;
  /** ISO date, e.g. "2026-12-01" */
  date: string;
  href: string;
  readingTime?: string;
};

export const researchEntries: ResearchEntry[] = [];
