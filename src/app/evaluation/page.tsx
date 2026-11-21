import { PageHero } from "@/components/site/PageHero";
import { ButtonLink } from "@/components/site/Button";
import { ClosingCta } from "@/components/site/ClosingCta";
import { Eyebrow, Index, Section } from "@/components/site/Section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "AI Evaluation & Reliability",
  description:
    "AI agent testing, benchmarking, LLM evaluation, tool-use evaluation and reliability assessment for teams deploying intelligent systems.",
  path: "/evaluation",
  image: "evaluation",
});

const capabilities = [
  { title: "AI Agent Benchmarking", text: "Compare agent performance against defined tasks and benchmarks." },
  { title: "Agent Testing", text: "Test instruction following, task completion and tool usage." },
  { title: "Model Evaluation", text: "Assess model outputs, consistency and accuracy." },
  { title: "Real-world Task Evaluation", text: "Evaluate intelligent systems against practical scenarios." },
  { title: "Reliability Assessment", text: "Identify failure cases and performance weaknesses." },
  { title: "Evaluation Reporting", text: "Provide structured evaluation findings and recommendations." },
];

const process = [
  { title: "Define evaluation criteria", text: "Agree what good looks like for your system, your users and your risk profile." },
  { title: "Create realistic test scenarios", text: "Design tasks and inputs that reflect how the system is used in practice." },
  { title: "Run structured evaluations", text: "Execute tests consistently so results are comparable across runs and versions." },
  { title: "Measure performance", text: "Score outputs against the agreed criteria, including tool use and task completion." },
  { title: "Identify failures", text: "Isolate failure cases, patterns and the conditions that trigger them." },
  { title: "Deliver evaluation reports", text: "Document findings with clear, prioritised recommendations." },
];

const dimensions = [
  "Task completion",
  "Instruction following",
  "Tool use",
  "Accuracy",
  "Consistency",
  "Failure modes",
];

export default function EvaluationPage() {
  return (
    <>
      <PageHero
        label="AI Evaluation"
        title="Test, benchmark and improve intelligent systems."
        intro="Rigorous testing and real-world evaluation to understand the performance, accuracy and reliability of AI systems."
        image="evaluation"
        imagePosition="center 70%"
        actions={
          <>
            <ButtonLink href="/contact?type=ai-evaluation">Evaluate your system</ButtonLink>
            <ButtonLink href="#capabilities" variant="text">
              Evaluation capabilities
            </ButtonLink>
          </>
        }
      />

      {/* ---------- Dimensions band ---------- */}
      <section aria-label="What we evaluate" className="border-t border-line bg-ink">
        <div className="shell">
          <ul className="grid grid-cols-2 gap-px border-x border-line bg-line md:grid-cols-3 lg:grid-cols-6">
            {dimensions.map((d, i) => (
              <li key={d} className="flex flex-col gap-3 bg-ink px-6 py-8 text-[0.95rem] text-white md:py-10">
                <Index>{String(i + 1).padStart(2, "0")}</Index>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Capabilities: index list ---------- */}
      <Section id="capabilities" tone="coal" labelledBy="ev-cap-title">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="reveal lg:col-span-5">
            <Eyebrow>Our evaluation capabilities</Eyebrow>
            <h2 id="ev-cap-title" className="font-display text-display-md mt-7">
              Know whether your AI works before your users find out.
            </h2>
            <div className="mt-10 max-w-md border-l border-line-strong pl-6">
              <p className="text-[0.975rem] leading-relaxed text-mute">
                <span className="text-white">A practice in development.</span> Evaluation is our newest vertical. We
                are building it alongside early partners and shape each engagement around your systems and criteria,
                rather than offering an off-the-shelf benchmark.
              </p>
            </div>
          </div>

          <ol className="lg:col-span-6 lg:col-start-7">
            {capabilities.map((c, i) => (
              <li key={c.title} className="reveal group grid grid-cols-[3rem_1fr] border-t border-line py-8 last:border-b">
                <Index className="pt-2">{String(i + 1).padStart(2, "0")}</Index>
                <div>
                  <h3 className="font-display text-[1.6rem] leading-tight">{c.title}</h3>
                  <p className="mt-2 text-[0.975rem] leading-relaxed text-mute">{c.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* ---------- Process: vertical timeline in two columns ---------- */}
      <Section labelledBy="ev-process-title">
        <div className="reveal max-w-3xl">
          <Eyebrow>Our evaluation process</Eyebrow>
          <h2 id="ev-process-title" className="font-display text-display-md mt-7">
            A repeatable method, adapted to your system.
          </h2>
        </div>

        <ol className="mt-20 grid gap-x-16 md:grid-cols-2 xl:grid-cols-3">
          {process.map((p, i) => (
            <li key={p.title} className="reveal relative border-l border-line-strong pb-14 pl-8">
              <span
                aria-hidden="true"
                className="absolute -left-[5px] top-0 h-[9px] w-[9px] border border-white bg-ink"
              />
              <Index>Step {String(i + 1).padStart(2, "0")}</Index>
              <h3 className="font-display mt-4 text-[1.5rem] leading-tight">{p.title}</h3>
              <p className="mt-3 max-w-xs text-[0.975rem] leading-relaxed text-mute">{p.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <ClosingCta
        label="Evaluate with us"
        title="Build AI systems you can rely on."
        text="Tell us what your system does and where you need confidence. We'll propose criteria and a test plan."
        cta="Discuss an evaluation project"
        href="/contact?type=ai-evaluation"
      />
    </>
  );
}
