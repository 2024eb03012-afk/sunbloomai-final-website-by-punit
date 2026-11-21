import { NextResponse } from "next/server";
import { inquiryLabel, validateContact, type ContactPayload } from "@/lib/contact";

/**
 * Contact / partnership inquiries.
 *
 * Delivery is configured with the CONTACT_WEBHOOK_URL environment variable
 * (for example an n8n, Zapier or Make webhook, or a CRM intake endpoint).
 * The inquiry is POSTed there as JSON. When it is not set, the route answers
 * 503 with code "not_configured" and the form falls back to a prefilled
 * email to the company address.
 */
export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request" }, { status: 400 });
  }

  const s = (v: unknown) => (typeof v === "string" ? v : "");
  const r = (raw ?? {}) as Record<string, unknown>;
  const payload: ContactPayload = {
    fullName: s(r.fullName).trim(),
    workEmail: s(r.workEmail).trim(),
    company: s(r.company).trim(),
    jobTitle: s(r.jobTitle).trim(),
    inquiryType: s(r.inquiryType) as ContactPayload["inquiryType"],
    description: s(r.description).trim(),
    requirements: s(r.requirements).trim(),
    website: s(r.website),
  };

  // Honeypot: silently accept bot submissions without forwarding them.
  if (payload.website) return NextResponse.json({ ok: true });

  const errors = validateContact(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, code: "invalid", errors }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });
  }

  // `website` is the honeypot and is always empty here; leave it out.
  const { website: _honeypot, ...fields } = payload;
  void _honeypot;
  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...fields,
        inquiryTypeLabel: inquiryLabel(payload.inquiryType),
        submittedAt: new Date().toISOString(),
        source: "sunbloomai.com/contact",
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("Contact webhook delivery failed", err);
    return NextResponse.json({ ok: false, code: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
