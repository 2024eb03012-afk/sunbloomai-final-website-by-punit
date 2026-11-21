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

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/**
 * Submit an inquiry to Web3Forms as a native HTML form POST (top-level
 * navigation). This is Web3Forms' primary documented method: it runs in the
 * visitor's browser (a free-plan requirement) and is not subject to CORS,
 * which blocks fetch() calls through Web3Forms' Cloudflare front end.
 * Web3Forms emails the inquiry, then redirects to `redirectUrl` (must be an
 * absolute URL on the same domain on the free plan).
 *
 * Field names are human-readable because Web3Forms prints them as-is in the
 * notification email; `email` sets Reply-To to the lead.
 */
function web3FormsFields(p: ContactPayload, accessKey: string): Record<string, string> {
  // Web3Forms' documented core fields are name / email / message. Extra
  // fields use plain snake_case names; the full inquiry is also written into
  // `message` so the notification email reads well on its own.
  const message = [
    `Inquiry type: ${inquiryLabel(p.inquiryType)}`,
    `Company: ${p.company}`,
    p.jobTitle ? `Job title: ${p.jobTitle}` : null,
    "",
    p.description,
    p.requirements ? `\nEstimated requirements:\n${p.requirements}` : null,
  ]
    .filter((l) => l !== null)
    .join("\n");

  return {
    access_key: accessKey,
    subject: `New ${inquiryLabel(p.inquiryType)} inquiry from ${p.company}`,
    from_name: "Sunbloom AI website",
    name: p.fullName,
    email: p.workEmail,
    message,
    company: p.company,
    job_title: p.jobTitle,
    inquiry_type: inquiryLabel(p.inquiryType),
  };
}

/**
 * Web3Forms' official JavaScript method: fetch() with FormData and no custom
 * headers. Resolves with Web3Forms' answer; rejects only if the browser could
 * not complete the request (network or CORS), in which case callers can fall
 * back to postToWeb3Forms().
 */
export async function fetchWeb3Forms(p: ContactPayload, accessKey: string): Promise<{ ok: boolean; message?: string }> {
  const body = new FormData();
  for (const [name, value] of Object.entries(web3FormsFields(p, accessKey))) body.append(name, value);
  const response = await fetch(WEB3FORMS_ENDPOINT, { method: "POST", body });
  const data = (await response.json().catch(() => ({}))) as { success?: boolean; message?: string };
  return { ok: response.ok && data.success !== false, message: data.message };
}

export function postToWeb3Forms(p: ContactPayload, accessKey: string, redirectUrl: string) {
  const fields = { ...web3FormsFields(p, accessKey), redirect: redirectUrl };
  const form = document.createElement("form");
  form.method = "POST";
  form.action = WEB3FORMS_ENDPOINT;
  form.acceptCharset = "UTF-8";
  form.style.display = "none";
  for (const [name, value] of Object.entries(fields)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();
}
