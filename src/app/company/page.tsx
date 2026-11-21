import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ButtonLink } from "@/components/site/Button";
import { ClosingCta } from "@/components/site/ClosingCta";
import { Eyebrow, Index, Section } from "@/components/site/Section";
import { pageMetadata } from "@/lib/metadata";
import { pillars } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Company",
  description:
    "Sunbloom AI is an enterprise AI company building data, intelligence and evaluation systems that help businesses and AI innovators create real-world impact.",
  path: "/company",
  image: "company",
});

const principles = [
  { title: "Quality First", text: "We would rather deliver less, correctly, than more with errors. Quality is checked throughout, not inspected at the end." },
  { title: "Long-term Partnerships", text: "We work as an extension of our clients' teams and measure success over the life of a relationship." },
  { title: "Responsible AI", text: "We handle data with care, respect contributors, and are honest about what AI systems can and cannot do." },
  { title: "People + Technology", text: "Reliable AI depends on skilled people and well-built systems working together." },
  { title: "Operational Excellence", text: "Clear processes, clear communication and dependable delivery on every engagement." },
];

/* Founders as listed on the previous sunbloomai.com site. */
const leadership = [
  {
    name: "Punit Gupta",
    role: "Co-Founder",
    image: "/images/team-punit.webp",
    width: 443,
    height: 553,
    linkedin: "https://www.linkedin.com/in/punit-kumar-402252287",
  },
  {
    name: "Anmol Malik",
    role: "Co-Founder",
    image: "/images/team-anmol.webp",
    width: 640,
    height: 800,
    linkedin: "https://www.linkedin.com/in/anmolzenquill",
  },
];

export default function CompanyPage() {
  return (
    <>
      <PageHero
        label="Company"
        title="Building the infrastructure for an AI-driven world."
        intro="Sunbloom AI is an enterprise AI company building data, intelligence and evaluation systems that help businesses and AI innovators create real-world impact."
        image="company"
        imagePosition="center 55%"
        actions={<ButtonLink href="/contact">Talk to our team</ButtonLink>}
      />

      {/* ---------- Mission / Vision ---------- */}
      <section aria-label="Mission and vision" className="border-t border-line bg-ink">
        <div className="shell grid md:grid-cols-2">
          <div className="reveal border-b border-line py-20 md:border-b-0 md:border-r md:py-28 md:pr-14 lg:pr-20">
            <Eyebrow>Our mission</Eyebrow>
            <p className="font-display text-display-sm mt-10 !text-[clamp(1.6rem,2.6vw,2.5rem)] text-white">
              To build reliable, scalable and real-world AI infrastructure for enterprises and AI innovators across the
              globe.
            </p>
          </div>
          <div className="reveal py-20 md:py-28 md:pl-14 lg:pl-20">
            <Eyebrow>Our vision</Eyebrow>
            <p className="font-display text-display-sm mt-10 !text-[clamp(1.6rem,2.6vw,2.5rem)] text-white">
              To become a trusted infrastructure partner for organisations building and deploying intelligent systems.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Evolution ---------- */}
      <Section tone="coal" labelledBy="evolution-title">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="reveal lg:col-span-5">
            <Eyebrow>Where we are going</Eyebrow>
            <h2 id="evolution-title" className="font-display text-display-md mt-7">
              From AI automation to AI infrastructure.
            </h2>
          </div>
          <div className="reveal space-y-6 text-[1.0625rem] leading-relaxed text-mute lg:col-span-6 lg:col-start-7">
            <p>
              Sunbloom AI began by designing and deploying AI agents and automation for businesses: voice agents,
              workflow automation and custom AI systems that do real operational work.
            </p>
            <p>
              Building those systems showed us how much depends on what surrounds the model: the quality of the data
              it learns from, and the rigour with which it is tested. So we are expanding across the AI lifecycle,
              from real-world data operations to enterprise deployment and system evaluation.
            </p>
          </div>
        </div>

        <ol className="mt-20 grid border-t border-line md:grid-cols-3">
          {pillars.map((p, i) => (
            <li key={p.href} className={`reveal border-b border-line py-10 md:border-b-0 md:pr-10 ${i > 0 ? "md:border-l md:pl-10" : ""}`}>
              <Index>{p.index}</Index>
              <h3 className="font-display mt-4 text-[1.5rem] leading-tight">{p.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-mute">{p.summary}</p>
              <ButtonLink href={p.href} variant="text" className="mt-6 text-[0.8125rem]">
                Explore
              </ButtonLink>
            </li>
          ))}
        </ol>
      </Section>

      {/* ---------- Principles ---------- */}
      <Section labelledBy="principles-title">
        <div className="reveal max-w-2xl">
          <Eyebrow>Our principles</Eyebrow>
          <h2 id="principles-title" className="font-display text-display-md mt-7">
            How we work.
          </h2>
        </div>
        <ol className="mt-16">
          {principles.map((p, i) => (
            <li
              key={p.title}
              className="reveal grid gap-4 border-t border-line py-10 last:border-b md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <Index className="md:col-span-1">{String(i + 1).padStart(2, "0")}</Index>
              <h3 className="font-display text-[1.9rem] leading-tight md:col-span-5 md:text-[2.4rem]">{p.title}</h3>
              <p className="max-w-lg text-[1rem] leading-relaxed text-mute md:col-span-6">{p.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ---------- Leadership ---------- */}
      <Section tone="coal" labelledBy="leadership-title">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="reveal lg:col-span-4">
            <Eyebrow>Leadership</Eyebrow>
            <h2 id="leadership-title" className="font-display text-display-md mt-7">
              The founders.
            </h2>
          </div>
          <ul className="grid grid-cols-2 gap-5 sm:gap-10 lg:col-span-7 lg:col-start-6">
            {leadership.map((person) => (
              <li key={person.name} className="reveal">
                <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
                  <Image
                    src={person.image}
                    alt={`Portrait of ${person.name}`}
                    width={person.width}
                    height={person.height}
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    className="h-full w-full object-cover opacity-90 transition-opacity duration-500 hover:opacity-100"
                  />
                </div>
                <div className="mt-6 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-[1.5rem] leading-tight">{person.name}</h3>
                    <p className="mt-1 text-sm text-mute">{person.role}</p>
                  </div>
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${person.name} on LinkedIn`}
                    className="inline-flex items-center gap-1.5 pt-1.5 text-sm text-soft transition-colors hover:text-white"
                  >
                    LinkedIn
                    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <ClosingCta
        label="Join us"
        title="Help build what comes next."
        text="We work with engineers, operators and data contributors who care about doing AI work properly."
        cta="View careers"
        href="/careers"
      />
    </>
  );
}
