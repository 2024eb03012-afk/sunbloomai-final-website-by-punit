import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ButtonLink } from "@/components/site/Button";
import { ClosingCta } from "@/components/site/ClosingCta";
import { Eyebrow, Index, Section } from "@/components/site/Section";
import { researchEntries, type ResearchCategory } from "@/content/research";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Research & Insights",
  description:
    "Practical research, technical insights and perspectives on building reliable and scalable intelligent systems, from Sunbloom AI.",
  path: "/research",
  image: "research",
});

const topics: { name: ResearchCategory; text: string }[] = [
  { name: "AI Infrastructure", text: "The systems, pipelines and practices that keep AI dependable in production." },
  { name: "Data Operations", text: "Collecting, annotating and validating real-world data for AI training." },
  { name: "Enterprise AI Agents", text: "Designing agents that integrate with business systems and complete real work." },
  { name: "AI Evaluation", text: "Testing, benchmarking and understanding how intelligent systems fail." },
  { name: "Emerging AI Technologies", text: "Considered perspectives on new models, tools and techniques." },
  { name: "Industry Insights", text: "How organisations are adopting and operating AI in practice." },
];

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function ResearchPage() {
  const entries = [...researchEntries].sort((a, b) => b.date.localeCompare(a.date));
  const [lead, ...rest] = entries;

  return (
    <>
      <PageHero
        label="Research & Insights"
        title="Advancing real-world AI."
        intro="Practical research, technical insights and perspectives on building reliable and scalable intelligent systems."
        image="research"
        imagePosition="center 60%"
        compact
        actions={
          <ButtonLink href="#publications" variant="text">
            Latest publications
          </ButtonLink>
        }
      />

      {/* ---------- Topics ---------- */}
      <Section labelledBy="topics-title">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="reveal lg:col-span-4">
            <Eyebrow>Areas of focus</Eyebrow>
            <h2 id="topics-title" className="font-display text-display-md mt-7">
              What we write about.
            </h2>
          </div>
          <ul className="grid gap-x-12 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {topics.map((t, i) => (
              <li key={t.name} className="reveal border-t border-line pb-10 pt-6">
                <Index>{String(i + 1).padStart(2, "0")}</Index>
                <h3 className="font-display mt-4 text-[1.45rem] leading-snug">{t.name}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-mute">{t.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---------- Publications ---------- */}
      <Section id="publications" tone="coal" labelledBy="pubs-title">
        <div className="reveal flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Eyebrow>Publications</Eyebrow>
            <h2 id="pubs-title" className="font-display text-display-md mt-7">
              Notes from the field.
            </h2>
          </div>
          <ButtonLink href={site.linkedin} variant="text">
            Follow for new publications
          </ButtonLink>
        </div>

        {lead ? (
          <div className="mt-16 grid border-t border-line lg:grid-cols-12">
            <Link
              href={lead.href}
              className="reveal group border-b border-line py-12 lg:col-span-7 lg:border-b-0 lg:border-r lg:pr-14"
            >
              <p className="eyebrow text-mute">
                {lead.category} · <time dateTime={lead.date}>{dateFmt.format(new Date(lead.date))}</time>
              </p>
              <h3 className="font-display text-display-md mt-8 transition-colors group-hover:text-soft">{lead.title}</h3>
              <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-mute">{lead.summary}</p>
              <span className="link-arrow mt-10">
                Read
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
              </span>
            </Link>
            <ul className="lg:col-span-5 lg:pl-14">
              {rest.map((e) => (
                <li key={e.href} className="border-b border-line">
                  <Link href={e.href} className="group block py-8">
                    <p className="eyebrow text-mute">
                      {e.category} · <time dateTime={e.date}>{dateFmt.format(new Date(e.date))}</time>
                    </p>
                    <h3 className="font-display mt-4 text-[1.5rem] leading-snug transition-colors group-hover:text-soft">
                      {e.title}
                    </h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            <p className="reveal mt-10 max-w-xl text-[1.0625rem] leading-relaxed text-mute">
              Our first notes are in preparation. The slots below are placeholders and will be replaced as we publish.
            </p>
            <ul className="mt-14 grid border-t border-line md:grid-cols-3">
              {topics.slice(0, 3).map((t, i) => (
                <li
                  key={t.name}
                  aria-label={`Placeholder: forthcoming note on ${t.name}`}
                  className={cn("reveal border-b border-line py-10 md:border-b-0", i > 0 && "md:border-l md:pl-10", "md:pr-10")}
                >
                  <p className="eyebrow text-mute">{t.name}</p>
                  <div aria-hidden="true" className="mt-8 space-y-3">
                    <div className="h-3 w-11/12 bg-charcoal" />
                    <div className="h-3 w-3/4 bg-charcoal" />
                  </div>
                  <p className="mt-8 text-sm text-mute">Placeholder · Forthcoming</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </Section>

      <ClosingCta
        label="Collaborate"
        title="Working on a hard AI problem?"
        text="We're interested in practical questions about data, deployment and evaluation. Tell us what you're exploring."
        cta="Talk to our team"
      />
    </>
  );
}
