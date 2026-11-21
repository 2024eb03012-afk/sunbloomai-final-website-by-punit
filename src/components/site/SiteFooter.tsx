import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Solutions",
    links: [
      { label: "Data Operations", href: "/data-operations" },
      { label: "Enterprise AI Engineering", href: "/enterprise-ai" },
      { label: "AI Evaluation", href: "/evaluation" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/company" },
      { label: "Research", href: "/research" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="shell pb-10 pt-20 md:pt-28">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-7 max-w-sm text-[0.9375rem] leading-relaxed text-mute">
              Sunbloom AI is an enterprise AI &amp; data infrastructure company. We build enterprise AI systems, run
              data operations for AI teams, and evaluate intelligent systems for real-world performance.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="eyebrow text-mute">{col.title}</h2>
                <ul className="mt-6 space-y-3.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[0.9375rem] text-soft transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="col-span-2 sm:col-span-1">
              <h2 className="eyebrow text-mute">Connect</h2>
              <ul className="mt-6 space-y-3.5">
                <li>
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[0.9375rem] text-soft transition-colors hover:text-white"
                  >
                    LinkedIn
                    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </a>
                </li>
                <li>
                  <a
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[0.9375rem] text-soft transition-colors hover:text-white"
                  >
                    Book a call
                    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="font-display mt-24 select-none whitespace-nowrap text-[clamp(3.5rem,15.5vw,16rem)] leading-[0.8] tracking-[-0.04em] text-[#161616]"
        >
          Sunbloom AI
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-8 text-[0.8125rem] text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Sunbloom AI. All rights reserved.</p>
          <ul className="flex gap-7">
            <li>
              <Link href="/privacy" className="transition-colors hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition-colors hover:text-white">
                Terms and Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
