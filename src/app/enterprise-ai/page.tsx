import { Bot, Boxes, Cable, Mic, Workflow } from "lucide-react";
import ElevenLabsConvAI from "@/components/ElevenLabsConvAI";
import { PageHero } from "@/components/site/PageHero";
import { ButtonLink } from "@/components/site/Button";
import { ClosingCta } from "@/components/site/ClosingCta";
import { Eyebrow, Index, Section } from "@/components/site/Section";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Enterprise AI Engineering",
  description:
    "Sunbloom AI designs, builds and deploys AI voice agents, autonomous agents, workflow automation and custom enterprise AI systems integrated with your existing tools.",
  path: "/enterprise-ai",
  image: "engineering",
});

const voice = {
  title: "AI Voice Agents",
  text: "Human-like, task-driven voice systems for sales, support and business operations.",
  scope: [
    "Inbound voice agents",
    "Outbound voice agents",
    "Customer support agents",
    "Appointment booking agents",
    "Lead qualification agents",
    "Recruitment screening agents",
  ],
};

const capabilities = [
  {
    icon: Workflow,
    title: "Workflow Automation",
    text: "Automate complex business processes across tools and teams.",
    scope: ["Business process & CRM automation", "Sales operations", "Document processing", "Reporting and analytics"],
  },
  {
    icon: Bot,
    title: "Autonomous AI Agents",
    text: "Multi-step AI agents that plan, execute and complete real-world tasks.",
    scope: ["Custom AI agents", "Internal knowledge assistants", "Business process agents", "Multi-agent workflows"],
  },
  {
    icon: Boxes,
    title: "Custom Enterprise AI Systems",
    text: "Tailored AI solutions integrated with existing data, tools and business processes.",
    scope: ["AI-powered business applications", "Workflow orchestration", "Custom AI infrastructure", "Deployment and monitoring"],
  },
  {
    icon: Cable,
    title: "AI Integrations",
    text: "Connect intelligent systems with CRMs, databases, APIs and enterprise software.",
    scope: ["CRMs and databases", "API and third-party integrations", "Enterprise software", "Existing infrastructure"],
  },
];

const approach = [
  { title: "Discover", text: "Understand business problems and operational requirements." },
  { title: "Architect", text: "Design the appropriate AI system and architecture." },
  { title: "Build", text: "Develop agents, integrations and workflows." },
  { title: "Deploy", text: "Integrate into your existing environment." },
  { title: "Optimise", text: "Monitor, test and improve system performance." },
];

const outcomes = [
  "Faster business processes",
  "Reduced repetitive workloads",
  "Better customer experience",
  "Improved operational efficiency",
  "More scalable workflows",
];

function Scope({ items }: { items: string[] }) {
  return (
    <ul className="mt-7 space-y-2.5 text-sm text-soft">
      {items.map((s) => (
        <li key={s} className="flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-3 bg-mute" />
          {s}
        </li>
      ))}
    </ul>
  );
}

export default function EnterpriseAIPage() {
  return (
    <>
      <PageHero
        label="Enterprise AI Engineering"
        title="Build and deploy production-ready AI agents."
        intro="Custom AI systems that automate critical workflows, reduce operational effort and drive measurable impact."
        image="engineering"
        imagePosition="60% 35%"
        actions={
          <>
            <ButtonLink href="/contact?type=enterprise-ai-agents">Discuss a project</ButtonLink>
            <ButtonLink href="#capabilities" variant="text">
              Our capabilities
            </ButtonLink>
          </>
        }
      />

      {/* ---------- Capabilities: featured + grid ---------- */}
      <Section id="capabilities" labelledBy="eng-cap-title">
        <div className="reveal max-w-3xl">
          <Eyebrow>Our capabilities</Eyebrow>
          <h2 id="eng-cap-title" className="font-display text-display-md mt-7">
            Agents and systems engineered around how your business runs.
          </h2>
        </div>

        <div className="mt-20 grid border-t border-line lg:grid-cols-12">
          {/* Featured: voice */}
          <article className="reveal border-b border-line py-12 lg:col-span-5 lg:border-b-0 lg:border-r lg:py-16 lg:pr-14">
            <div className="flex items-start justify-between">
              <Mic aria-hidden="true" strokeWidth={1} className="h-10 w-10 text-white" />
              <Index>01</Index>
            </div>
            <h3 className="font-display text-display-sm mt-14 !text-[2.4rem]">{voice.title}</h3>
            <p className="mt-5 max-w-sm text-[1.0625rem] leading-relaxed text-mute">{voice.text}</p>
            <ul className="mt-10 grid grid-cols-1 border-t border-line sm:grid-cols-2">
              {voice.scope.map((s, i) => (
                <li
                  key={s}
                  className={cn("border-b border-line py-4 text-[0.95rem] text-soft", i % 2 === 1 && "sm:pl-6", i % 2 === 0 && "sm:pr-6")}
                >
                  {s}
                </li>
              ))}
            </ul>
          </article>

          {/* The rest */}
          <div className="grid sm:grid-cols-2 lg:col-span-7">
            {capabilities.map((c, i) => (
              <article
                key={c.title}
                className={cn(
                  "reveal border-b border-line py-12 sm:px-0 lg:px-12 lg:py-16",
                  i % 2 === 1 && "sm:border-l sm:pl-10",
                  i % 2 === 0 && "sm:pr-10",
                  i >= 2 && "lg:border-b-0",
                )}
              >
                <div className="flex items-start justify-between">
                  <c.icon aria-hidden="true" strokeWidth={1} className="h-8 w-8 text-white" />
                  <Index>{String(i + 2).padStart(2, "0")}</Index>
                </div>
                <h3 className="font-display mt-10 text-[1.55rem] leading-tight">{c.title}</h3>
                <p className="mt-3 text-[0.975rem] leading-relaxed text-mute">{c.text}</p>
                <Scope items={c.scope} />
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------- Statement ---------- */}
      <section className="border-t border-line bg-graphite">
        <div className="shell grid gap-10 py-24 md:py-32 lg:grid-cols-12">
          <p className="reveal font-display text-display-md lg:col-span-8">
            Not chatbots. <span className="text-mute">Operational systems that integrate with your infrastructure and
            are measured by the work they complete.</span>
          </p>
        </div>
      </section>

      {/* ---------- Approach: columns ---------- */}
      <Section tone="coal" labelledBy="approach-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="reveal lg:col-span-6">
            <Eyebrow>Our development approach</Eyebrow>
            <h2 id="approach-title" className="font-display text-display-md mt-7">
              Five stages from problem to production.
            </h2>
          </div>
        </div>

        <ol className="mt-20 grid border-t border-line md:grid-cols-5">
          {approach.map((a, i) => (
            <li
              key={a.title}
              className={cn(
                "reveal flex gap-6 border-b border-line py-8 md:block md:border-b-0 md:py-10 md:pr-6",
                i > 0 && "md:border-l md:pl-6 lg:pl-8",
              )}
            >
              <Index className="w-8 shrink-0 pt-2 md:block md:w-auto md:pt-0">{String(i + 1).padStart(2, "0")}</Index>
              <div>
                <h3 className="font-display text-[1.75rem] leading-tight md:mt-16 lg:text-[2rem]">{a.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-mute">{a.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ---------- Outcomes: typographic list ---------- */}
      <Section labelledBy="outcomes-title">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="reveal lg:col-span-4">
            <Eyebrow>Business outcomes</Eyebrow>
            <h2 id="outcomes-title" className="font-display text-display-md mt-7">
              What the work is for.
            </h2>
            <p className="mt-7 max-w-sm text-[1.0625rem] leading-relaxed text-mute">
              We scope every system against the operational outcome it should change, and agree how it will be
              measured before we build.
            </p>
          </div>
          <ul className="lg:col-span-7 lg:col-start-6">
            {outcomes.map((o, i) => (
              <li
                key={o}
                className="reveal flex items-baseline justify-between gap-6 border-b border-line py-7 first:border-t"
              >
                <span className="font-display text-[1.75rem] leading-tight text-white md:text-[2.4rem]">{o}</span>
                <Index>{String(i + 1).padStart(2, "0")}</Index>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <ClosingCta
        label="Start a project"
        title="Let's engineer your next intelligent system."
        text="Tell us about the workflow, the tools it touches and what success looks like. We'll propose an approach."
        cta="Start a conversation"
        href="/contact?type=enterprise-ai-agents"
      />

      {/* Live Sunbloom voice agent (existing ElevenLabs integration) */}
      <ElevenLabsConvAI />
    </>
  );
}
