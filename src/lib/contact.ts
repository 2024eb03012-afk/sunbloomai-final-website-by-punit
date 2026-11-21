import { inquiryTypes, site, type InquiryType } from "./site";

export type ContactPayload = {
  fullName: string;
  workEmail: string;
  company: string;
  jobTitle: string;
  inquiryType: InquiryType | "";
  description: string;
  requirements: string;
  /** Honeypot — must stay empty. */
  website?: string;
};

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const limits: Partial<Record<keyof ContactPayload, number>> = {
  fullName: 120,
  workEmail: 200,
  company: 160,
  jobTitle: 120,
  description: 4000,
  requirements: 2000,
};

/** Shared by the form (client) and /api/contact (server). */
export function validateContact(p: ContactPayload): ContactErrors {
  const e: ContactErrors = {};
  if (p.fullName.trim().length < 2) e.fullName = "Please enter your full name.";
  if (!EMAIL_RE.test(p.workEmail.trim())) e.workEmail = "Please enter a valid work email.";
  if (p.company.trim().length < 2) e.company = "Please enter your company.";
  if (!inquiryTypes.some((t) => t.value === p.inquiryType)) e.inquiryType = "Please choose an inquiry type.";
  if (p.description.trim().length < 20) e.description = "Please describe your project in a few sentences (20+ characters).";

  for (const [key, max] of Object.entries(limits) as [keyof ContactPayload, number][]) {
    const v = p[key];
    if (typeof v === "string" && v.length > max && !e[key]) e[key] = `Please keep this under ${max} characters.`;
  }
  return e;
}

export function inquiryLabel(value: string) {
  return inquiryTypes.find((t) => t.value === value)?.label ?? value;
}

/** Prefilled email used when no submission webhook is configured. */
export function contactMailto(p: ContactPayload) {
  const subject = `${inquiryLabel(p.inquiryType)} inquiry — ${p.company}`;
  const body = [
    `Name: ${p.fullName}`,
    `Email: ${p.workEmail}`,
    `Company: ${p.company}`,
    p.jobTitle ? `Job title: ${p.jobTitle}` : null,
    `Inquiry type: ${inquiryLabel(p.inquiryType)}`,
    "",
    "Project description:",
    p.description,
    p.requirements ? `\nEstimated requirements:\n${p.requirements}` : null,
  ]
    .filter((l) => l !== null)
    .join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
