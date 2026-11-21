/**
 * Central site configuration. Contact details and links here are the
 * verified values carried over from the previous sunbloomai.com site.
 */
export const site = {
  name: "Sunbloom AI",
  url: "https://sunbloomai.com",
  tagline: "Enterprise AI & Data Infrastructure",
  description:
    "Sunbloom AI builds enterprise AI systems, powers AI training through high-quality data operations, and evaluates intelligent systems for real-world performance.",
  email: "sunbloomai@gmail.com",
  bookingUrl: "https://cal.com/punit-gupta-grdgmd/30min",
  linkedin: "https://www.linkedin.com/company/sunbloom-ai/",
  /**
   * Web3Forms access key for the contact form. Web3Forms access keys are
   * public by design (they can only send email to the owner's inbox), and
   * free-plan submissions must come from the browser. Override per
   * environment with NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY.
   */
  web3formsAccessKey: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "0f1c4d8a-15fc-4693-943d-318ed6125885",
} as const;

export type Pillar = {
  index: string;
  title: string;
  shortTitle: string;
  href: string;
  summary: string;
};

export const pillars: Pillar[] = [
  {
    index: "01",
    title: "AI Data Operations",
    shortTitle: "Data Operations",
    href: "/data-operations",
    summary: "Collect, process and deliver high-quality real-world data for advanced AI systems.",
  },
  {
    index: "02",
    title: "Enterprise AI Engineering",
    shortTitle: "Enterprise AI",
    href: "/enterprise-ai",
    summary: "Build and deploy production-ready AI agents and intelligent systems.",
  },
  {
    index: "03",
    title: "AI Evaluation & Reliability",
    shortTitle: "Evaluation",
    href: "/evaluation",
    summary: "Test, benchmark and evaluate intelligent systems for real-world performance.",
  },
];

export const primaryNav = [
  { label: "Data Operations", href: "/data-operations" },
  { label: "Enterprise AI", href: "/enterprise-ai" },
  { label: "Evaluation", href: "/evaluation" },
  { label: "Research", href: "/research" },
  { label: "Company", href: "/company" },
] as const;

export const inquiryTypes = [
  { value: "data-collection", label: "Data Collection" },
  { value: "data-operations", label: "Data Operations" },
  { value: "enterprise-ai-agents", label: "Enterprise AI Agents" },
  { value: "workflow-automation", label: "Workflow Automation" },
  { value: "ai-evaluation", label: "AI Evaluation" },
  { value: "other", label: "Other" },
] as const;

export type InquiryType = (typeof inquiryTypes)[number]["value"];
