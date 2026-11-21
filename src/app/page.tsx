import Link from "next/link";
import { ArrowRight, Cpu, Database, ShieldCheck } from "lucide-react";
import { HomeHero } from "@/components/home/HomeHero";
import { ClosingCta } from "@/components/site/ClosingCta";
import { Eyebrow, Index, Section } from "@/components/site/Section";
import { pageMetadata } from "@/lib/metadata";
import { pillars } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata = {
  ...pageMetadata({
    title: "Enterprise AI & Data Infrastructure",
    description:
      "Sunbloom AI builds enterprise AI systems, powers AI training through high-quality data operations, and evaluates intelligent systems for real-world performance.",
    path: "/",
  }),
  title: { absolute: "Sunbloom AI — Enterprise AI & Data Infrastructure" },
};

const pillarIcons = [Database, Cpu, ShieldCheck];

const stages = [
  { n: "01", title: "Collect", text: "Acquire and organise high-quality real-world data." },
  { n: "02", title: "Prepare", text: "Process, annotate and validate structured datasets." },
  { n: "03", title: "Build", text: "Develop and deploy intelligent AI systems." },
  { n: "04", title: "Evaluate", text: "Test performance, reliability and real-world capabilities." },
];

const stageSpans = [
  { label: "AI Data Operations", href: "/data-operations", span: "col-span-2" },
  { label: "Enterprise AI Engineering", href: "/enterprise-ai", span: "col-span-1" },
  { label: "AI Evaluation", href: "/evaluation", span: "col-span-1" },
];

const audiences = [
  {
    title: "AI Companies & Research Organisations",
    text: "Real-world data collection, annotation and quality-controlled delivery for teams training and testing advanced models.",
    items: ["AI labs", "AI training companies", "AI research organisations", "AI technology providers"],
    href: "/data-operations",
    cta: "Data operations",
  },
  {
    title: "Enterprise Organisations",
    text: "AI agents, automation and custom systems that integrate with existing infrastructure and solve operational problems.",
    items: [
      "Technology companies",
      "Financial services",
      "Healthcare organisations",
      "Real estate companies",
      "Education companies",
      "Growing enterprises",
    ],
    href: "/enterprise-ai",
    cta: "Enterprise AI engineering",
  },
];

const differentiators = [
  {
    title: "Integrated data and AI engineering",
    text: "Data operations and AI engineering under one roof, so datasets and the systems built on them are designed together.",
  },
  {
    title: "Flexible contributor operations",
    text: "Contributor sourcing and coordination that adapts to each project's modality, language and scope.",
  },
  {
    title: "Custom enterprise AI development",
    text: "Systems designed around your workflows, data and tools rather than off-the-shelf templates.",
  },
  {
    title: "Structured quality assurance",
    text: "Defined review and validation steps across collection, annotation, build and delivery.",
  },
  {
    title: "Reliable implementation and delivery",
    text: "Clear scoping, milestones and communication from the first conversation to deployment.",
  },
  {
    title: "Long-term technology partnerships",
    text: "We work as an extension of your team and stay engaged as your requirements evolve.",
  },
];

export default function Home() {
  return (
    <>
      <HomeHero />

      {/* ---------------- Capabilities ---------------- */}
      <section id="capabilities" aria-labelledby="capabilities-title" className="border-t border-line bg-ink">
        <div className="shell grid lg:grid-cols-12">
          <div className="reveal py-20 pr-8 md:py-24 lg:col-span-4 lg:py-28">
            <Eyebrow>Our capabilities</Eyebrow>
            <h2 id="capabilities-title" className="font-display text-display-md mt-7">
              Three pillars.
              <br />
              One ecosystem.
            </h2>
            <p className="mt-7 max-w-sm text-[1.0625rem] leading-relaxed text-mute">
              From data to deployment, we help organisations build, scale and validate intelligent systems.
            </p>
          </div>

          <ul className="grid border-t border-line lg:col-span-8 lg:grid-cols-3 lg:border-t-0">
            {pillars.map((p, i) => {
              const Icon = pillarIcons[i];
              return (
                <li key={p.href} className="reveal border-b border-line lg:border-b-0 lg:border-l">
                  <Link
                    href={p.href}
                    className="group flex h-full flex-col py-12 transition-colors duration-500 hover:bg-coal md:py-14 lg:px-10 lg:py-28 xl:px-12"
                  >
                    <div className="flex items-start justify-between">
                      <Icon aria-hidden="true" strokeWidth={1} className="h-11 w-11 text-white" />
                      <Index>{p.index}</Index>
                    </div>
                    <h3 className="font-display mt-9 text-[1.6rem] leading-tight">{p.title}</h3>
                    <p className="mt-4 max-w-xs text-[0.975rem] leading-relaxed text-mute">{p.summary}</p>
                    <span className="link-arrow mt-auto self-start pt-10 text-[0.8125rem]">
                      Explore
                      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ---------------- How we work ---------------- */}
      <Section tone="coal" labelledBy="process-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="reveal lg:col-span-7">
            <Eyebrow>How we work</Eyebrow>
            <h2 id="process-title" className="font-display text-display-md mt-7">
              From real-world data
              <br className="hidden sm:block" /> to intelligent systems.
            </h2>
          </div>
          <p className="reveal max-w-md text-[1.0625rem] leading-relaxed text-mute lg:col-span-4 lg:col-start-9 lg:self-end">
            One continuous chain. Each stage can be engaged on its own, or connected end to end across our three
            practices.
          </p>
        </div>

        {/* Desktop: horizontal chain */}
        <div className="reveal mt-24 hidden md:block">
          <div className="grid grid-cols-4 gap-0">
            {stageSpans.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                className={cn(
                  "group mr-6 border-t border-line-strong pt-3 text-xs uppercase tracking-[0.14em] text-mute transition-colors hover:border-white hover:text-white",
                  s.span,
                )}
              >
                {s.label}
              </Link>
            ))}
          </div>

          <div className="relative mt-14">
          <div aria-hidden="true" className="absolute left-0 right-0 top-[5px] h-px bg-line-strong" />
          <ol className="relative grid grid-cols-4">
            {stages.map((s, i) => (
              <li key={s.n} className="relative pr-10">
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative block h-[11px] w-[11px] rounded-full border border-white",
                    i === 0 ? "bg-white" : "bg-coal",
                  )}
                />
                <div className="mt-10 flex items-baseline gap-4">
                  <Index>{s.n}</Index>
                </div>
                <h3 className="font-display mt-4 text-[2.1rem] leading-none lg:text-[2.6rem]">{s.title}</h3>
                <p className="mt-5 max-w-[15rem] text-[0.975rem] leading-relaxed text-mute">{s.text}</p>
              </li>
            ))}
          </ol>
          </div>
        </div>

        {/* Mobile: vertical chain */}
        <ol className="relative mt-16 space-y-12 border-l border-line-strong pl-8 md:hidden">
          {stages.map((s, i) => (
            <li key={s.n} className="reveal relative">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -left-[38px] top-1.5 h-[11px] w-[11px] rounded-full border border-white",
                  i === 0 ? "bg-white" : "bg-coal",
                )}
              />
              <Index>{s.n}</Index>
              <h3 className="font-display mt-2 text-[2rem] leading-none">{s.title}</h3>
              <p className="mt-3 text-[0.975rem] leading-relaxed text-mute">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ---------------- Who we work with ---------------- */}
      <Section labelledBy="audience-title">
        <div className="reveal max-w-3xl">
          <Eyebrow>Who we work with</Eyebrow>
          <h2 id="audience-title" className="font-display text-display-md mt-7">
            Supporting the teams building the future of AI.
          </h2>
        </div>

        <div className="mt-20 grid gap-20 lg:mt-24 lg:grid-cols-2 lg:gap-0">
          {audiences.map((a, i) => (
            <div key={a.title} className={cn("reveal", i === 1 && "lg:border-l lg:border-line lg:pl-16 xl:pl-20", i === 0 && "lg:pr-16 xl:pr-20")}>
              <Index>{`0${i + 1}`}</Index>
              <h3 className="font-display text-display-sm mt-5">{a.title}</h3>
              <p className="mt-5 max-w-md text-[0.975rem] leading-relaxed text-mute">{a.text}</p>
              <ul className="mt-10 border-t border-line">
                {a.items.map((item) => (
                  <li key={item} className="flex items-center justify-between border-b border-line py-4 text-[1.0625rem] text-soft">
                    {item}
                    <span aria-hidden="true" className="h-px w-4 bg-line-strong" />
                  </li>
                ))}
              </ul>
              <Link href={a.href} className="link-arrow mt-9">
                {a.cta}
                <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------------- Why Sunbloom ---------------- */}
      <Section tone="coal" labelledBy="why-title">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="reveal lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
              <Eyebrow>Why Sunbloom AI</Eyebrow>
              <h2 id="why-title" className="font-display text-display-md mt-7">
                Built for real-world AI execution.
              </h2>
              <p className="mt-7 max-w-sm text-[1.0625rem] leading-relaxed text-mute">
                We combine operations and engineering, which keeps the people, data and systems behind your AI
                accountable to the same standard.
              </p>
            </div>
          </div>

          <ol className="grid gap-x-12 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {differentiators.map((d, i) => (
              <li key={d.title} className="reveal border-t border-line pb-12 pt-7">
                <Index>{String(i + 1).padStart(2, "0")}</Index>
                <h3 className="font-display mt-5 text-[1.45rem] leading-snug">{d.title}</h3>
                <p className="mt-3 text-[0.975rem] leading-relaxed text-mute">{d.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <ClosingCta
        label="Start a conversation"
        title="Let's build what comes next."
        text="Whether you need high-quality data operations or intelligent enterprise AI systems, our team is ready to explore your requirements."
        cta="Talk to our team"
      />
    </>
  );
}
