"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { contactMailto, fetchWeb3Forms, postToWeb3Forms, validateContact, type ContactErrors, type ContactPayload } from "@/lib/contact";
import { inquiryTypes, site, type InquiryType } from "@/lib/site";
import { cn } from "@/lib/utils";

const empty: ContactPayload = {
  fullName: "",
  workEmail: "",
  company: "",
  jobTitle: "",
  inquiryType: "",
  description: "",
  requirements: "",
  website: "",
};

type Status = "idle" | "submitting" | "success" | "fallback" | "error";

const pathways: { title: string; text: string; type: InquiryType; index: string }[] = [
  {
    index: "01",
    title: "Data Operations Partnerships",
    text: "For AI labs, AI training companies and organisations requiring data collection and data operations.",
    type: "data-collection",
  },
  {
    index: "02",
    title: "Enterprise AI Projects",
    text: "For businesses looking to build, integrate or deploy AI agents and intelligent systems.",
    type: "enterprise-ai-agents",
  },
];

const dataTypes: string[] = ["data-collection", "data-operations"];

export function ContactForm() {
  const [values, setValues] = useState<ContactPayload>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorDetail, setErrorDetail] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  // Preselect inquiry type from ?type= (used by CTAs across the site).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // Returning from Web3Forms after a successful submission.
    if (params.get("submitted") === "1") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL on mount
      setStatus("success");
      window.history.replaceState(null, "", "/contact");
      window.setTimeout(() => document.getElementById("form-title")?.scrollIntoView({ block: "start" }), 50);
      return;
    }
    const t = params.get("type");
    if (t && inquiryTypes.some((i) => i.value === t)) {
      setValues((v) => ({ ...v, inquiryType: t as InquiryType }));
    }
  }, []);

  const set =
    (key: keyof ContactPayload) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setValues((v) => ({ ...v, [key]: value }));
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    };

  const choosePathway = (type: InquiryType) => {
    setValues((v) => ({ ...v, inquiryType: type }));
    setErrors((er) => ({ ...er, inquiryType: undefined }));
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => formRef.current?.querySelector<HTMLInputElement>("input[name=fullName]")?.focus({ preventScroll: true }), 450);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name=${first}]`)?.focus();
      return;
    }

    // Honeypot filled: a bot. Pretend success without sending anything.
    if (values.website) {
      setStatus("success");
      return;
    }

    setStatus("submitting");

    // Primary delivery: Web3Forms, using its official fetch + FormData method.
    if (site.web3formsAccessKey) {
      setErrorDetail(undefined);
      let result: { ok: boolean; message?: string };
      try {
        result = await fetchWeb3Forms(values, site.web3formsAccessKey);
      } catch {
        // The browser blocked the request (network/CORS), so nothing was sent.
        // Fall back to a native form POST, which Web3Forms redirects back here.
        try {
          postToWeb3Forms(values, site.web3formsAccessKey, `${window.location.origin}/contact?submitted=1`);
        } catch {
          setStatus("error");
        }
        return;
      }
      if (result.ok) {
        setStatus("success");
      } else {
        setErrorDetail(result.message);
        setStatus("error");
      }
      return;
    }

    // Fallback delivery: server route forwarding to CONTACT_WEBHOOK_URL.
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string; errors?: ContactErrors };
      if (res.ok && data.ok) {
        setStatus("success");
      } else if (data.code === "not_configured") {
        setStatus("fallback");
      } else if (data.code === "invalid" && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const fieldId = (k: string) => `${uid}-${k}`;
  const errId = (k: string) => `${uid}-${k}-error`;

  const Field = ({
    name,
    label,
    optional,
    children,
  }: {
    name: keyof ContactPayload;
    label: string;
    optional?: boolean;
    children: React.ReactNode;
  }) => (
    <div>
      <label htmlFor={fieldId(name)} className="flex items-baseline justify-between text-[0.8125rem] text-mute">
        <span>
          {label}
          {!optional ? <span aria-hidden="true"> *</span> : null}
        </span>
        {optional ? <span className="text-xs text-[#5c5c5c]">Optional</span> : null}
      </label>
      {children}
      {errors[name] ? (
        <p id={errId(name)} className="mt-2 text-[0.8125rem] text-white">
          {errors[name]}
        </p>
      ) : null}
    </div>
  );

  const a11y = (name: keyof ContactPayload) => ({
    id: fieldId(name),
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? errId(name) : undefined,
  });

  const isData = dataTypes.includes(values.inquiryType);
  const isEnterprise = values.inquiryType !== "" && !isData;

  return (
    <>
      {/* ---------- Pathways ---------- */}
      <section aria-label="Partnership pathways" className="border-t border-line bg-ink">
        <div className="shell grid md:grid-cols-2">
          {pathways.map((p, i) => {
            const selected = i === 0 ? isData : isEnterprise;
            return (
              <button
                key={p.title}
                type="button"
                onClick={() => choosePathway(p.type)}
                aria-pressed={selected}
                className={cn(
                  "group relative border-b border-line py-14 text-left transition-colors duration-500 md:border-b-0 md:py-20",
                  i === 0 ? "md:pr-14 lg:pr-20" : "md:border-l md:pl-14 lg:pl-20",
                )}
              >
                <span className="flex items-center justify-between">
                  <span className="text-xs tabular-nums tracking-[0.12em] text-mute">{p.index}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full border transition-colors",
                      selected ? "border-white bg-white text-ink" : "border-line-strong text-transparent",
                    )}
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                </span>
                <span className="font-display text-display-sm mt-8 block text-white">{p.title}</span>
                <span className="mt-4 block max-w-md text-[0.975rem] leading-relaxed text-mute">{p.text}</span>
                <span className="link-arrow mt-8">
                  {selected ? "Selected" : "Start this inquiry"}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ---------- Form ---------- */}
      <section aria-labelledby="form-title" className="border-t border-line bg-coal">
        <div className="shell grid gap-16 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-5 bg-current opacity-80" />
              Inquiry
            </p>
            <h2 id="form-title" className="font-display text-display-md mt-7">
              Tell us about your project.
            </h2>
            <p className="mt-7 max-w-sm text-[1.0625rem] leading-relaxed text-mute">
              A member of our team will review your inquiry and reply by email.
            </p>
            <dl className="mt-14 space-y-8 border-t border-line pt-10 text-[0.9375rem]">
              <div>
                <dt className="eyebrow text-mute">Prefer to talk?</dt>
                <dd className="mt-2">
                  <a
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline hover:underline-offset-4"
                  >
                    Book a 30-minute call
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-mute">Follow</dt>
                <dd className="mt-2">
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline hover:underline-offset-4"
                  >
                    LinkedIn
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {status === "success" ? (
              <div role="status" className="border border-line bg-ink p-10 md:p-14">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white">
                  <Check aria-hidden="true" className="h-4 w-4 text-white" strokeWidth={1.5} />
                </span>
                <h3 className="font-display text-display-sm mt-8">Thank you. Your inquiry has been received.</h3>
                <p className="mt-4 max-w-md text-mute">
                  {values.workEmail ? (
                    <>
                      We&rsquo;ll be in touch at <span className="text-white">{values.workEmail}</span>.
                    </>
                  ) : (
                    "A member of our team will reply by email shortly."
                  )}
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} noValidate className="scroll-mt-32" aria-describedby={`${uid}-req`}>
                <p id={`${uid}-req`} className="sr-only">
                  Fields marked with an asterisk are required.
                </p>
                {/* Honeypot */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Website
                    <input tabIndex={-1} autoComplete="off" name="website" value={values.website} onChange={set("website")} />
                  </label>
                </div>

                <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
                  {Field({
                    name: "fullName",
                    label: "Full name",
                    children: <input {...a11y("fullName")} className="field" autoComplete="name" value={values.fullName} onChange={set("fullName")} />,
                  })}
                  {Field({
                    name: "workEmail",
                    label: "Work email",
                    children: (
                      <input
                        {...a11y("workEmail")}
                        type="email"
                        inputMode="email"
                        className="field"
                        autoComplete="email"
                        value={values.workEmail}
                        onChange={set("workEmail")}
                      />
                    ),
                  })}
                  {Field({
                    name: "company",
                    label: "Company",
                    children: <input {...a11y("company")} className="field" autoComplete="organization" value={values.company} onChange={set("company")} />,
                  })}
                  {Field({
                    name: "jobTitle",
                    label: "Job title",
                    optional: true,
                    children: <input {...a11y("jobTitle")} className="field" autoComplete="organization-title" value={values.jobTitle} onChange={set("jobTitle")} />,
                  })}
                  <div className="sm:col-span-2">
                    {Field({
                      name: "inquiryType",
                      label: "Inquiry type",
                      children: (
                        <select
                          {...a11y("inquiryType")}
                          className={cn("field", !values.inquiryType && "text-[#5c5c5c]")}
                          value={values.inquiryType}
                          onChange={set("inquiryType")}
                        >
                          <option value="" disabled>
                            Select an inquiry type
                          </option>
                          {inquiryTypes.map((t) => (
                            <option key={t.value} value={t.value}>
                              {t.label}
                            </option>
                          ))}
                        </select>
                      ),
                    })}
                  </div>
                  <div className="sm:col-span-2">
                    {Field({
                      name: "description",
                      label: "Project description",
                      children: (
                        <textarea
                          {...a11y("description")}
                          rows={5}
                          className="field"
                          placeholder="What are you looking to build, collect or evaluate?"
                          value={values.description}
                          onChange={set("description")}
                        />
                      ),
                    })}
                  </div>
                  <div className="sm:col-span-2">
                    {Field({
                      name: "requirements",
                      label: "Estimated project requirements",
                      optional: true,
                      children: (
                        <textarea
                          {...a11y("requirements")}
                          rows={3}
                          className="field !min-h-[5.5rem]"
                          placeholder="Scope, modalities or languages, systems involved, timeline"
                          value={values.requirements}
                          onChange={set("requirements")}
                        />
                      ),
                    })}
                  </div>
                </div>

                {status === "fallback" ? (
                  <div role="status" className="mt-12 border border-line bg-ink p-8">
                    <p className="text-white">Online submissions aren&rsquo;t available right now.</p>
                    <p className="mt-2 text-sm leading-relaxed text-mute">
                      Your inquiry has been prepared as an email to {site.email}. Nothing has been sent yet.
                    </p>
                    <a href={contactMailto(values)} className="btn btn-primary mt-6">
                      <span>Send by email</span>
                      <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
                    </a>
                  </div>
                ) : null}

                {status === "error" ? (
                  <p role="alert" className="mt-10 text-sm text-white">
                    {errorDetail ? <span className="block text-mute">{errorDetail}</span> : null}
                    Something went wrong sending your inquiry. Please try again, or email us at{" "}
                    <a className="underline underline-offset-4" href={contactMailto(values)}>
                      {site.email}
                    </a>
                    .
                  </p>
                ) : null}

                <div className="mt-12 flex flex-col-reverse gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs leading-relaxed text-mute">
                    By submitting, you agree to our handling of your details as described in our{" "}
                    <Link href="/privacy" className="text-soft underline underline-offset-4">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                  <button type="submit" className="btn btn-primary shrink-0" disabled={status === "submitting"}>
                    <span>{status === "submitting" ? "Submitting…" : "Submit inquiry"}</span>
                    <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
