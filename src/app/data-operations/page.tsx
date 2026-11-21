import { AudioLines, Camera, CheckCheck, Film, Tags, Users } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ButtonLink } from "@/components/site/Button";
import { ClosingCta } from "@/components/site/ClosingCta";
import { Eyebrow, Index, Section } from "@/components/site/Section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "AI Data Operations",
  description:
    "Video, image and audio data collection, contributor operations, annotation and quality-assured dataset delivery for AI companies and research teams.",
  path: "/data-operations",
  image: "data",
});

const capabilities = [
  {
    icon: Film,
    title: "Video Data",
    text: "Real-world and task-specific video collection.",
    scope: ["Human activity video", "Egocentric / first-person video", "Task-specific recordings"],
  },
  {
    icon: Camera,
    title: "Image Data",
    text: "Diverse, structured, high-quality image datasets.",
    scope: ["Custom capture briefs", "Diverse subjects and environments", "Structured metadata"],
  },
  {
    icon: AudioLines,
    title: "Audio Data",
    text: "Speech, conversations and environmental audio collection.",
    scope: ["Speech and read-aloud", "Conversational audio", "Multilingual collection"],
  },
  {
    icon: Users,
    title: "Human Data Collection",
    text: "Structured contributor-based collection operations.",
    scope: ["Contributor sourcing", "Recruitment and onboarding", "Contributor management"],
  },
  {
    icon: Tags,
    title: "Data Annotation",
    text: "Accurate labelling, tagging and metadata organisation.",
    scope: ["Labelling and tagging", "Data processing", "Dataset organisation"],
  },
  {
    icon: CheckCheck,
    title: "Quality Assurance",
    text: "Data validation, quality checks and delivery management.",
    scope: ["Specification checks", "Validation and review", "Delivery in requested formats"],
  },
];

const steps = [
  { title: "Project requirements", text: "Understand client specifications and collection requirements." },
  { title: "Contributor sourcing", text: "Identify and recruit suitable data contributors." },
  { title: "Data collection", text: "Coordinate recording, submission and project execution." },
  { title: "Quality assurance", text: "Validate submissions against client requirements." },
  { title: "Structured delivery", text: "Organise and deliver datasets in the requested format." },
];

const reasons = [
  "Flexible contributor sourcing",
  "Structured data operations",
  "Multiple data modalities",
  "Quality-controlled delivery",
  "Custom collection projects",
  "Scalable project coordination",
];

export default function DataOperationsPage() {
  return (
    <>
      <PageHero
        label="Data Operations"
        title="High-quality data for advanced AI."
        intro="We collect, curate and process real-world data that powers the next generation of AI systems."
        image="data"
        imagePosition="center 40%"
        actions={
          <>
            <ButtonLink href="/contact?type=data-collection">Work with us</ButtonLink>
            <ButtonLink href="#capabilities" variant="text">
              Our data capabilities
            </ButtonLink>
          </>
        }
      />

      {/* ---------- Capabilities: hairline grid ---------- */}
      <Section id="capabilities" labelledBy="dc-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="reveal lg:col-span-6">
            <Eyebrow>Our data capabilities</Eyebrow>
            <h2 id="dc-title" className="font-display text-display-md mt-7">
              Every modality, collected and delivered to specification.
            </h2>
          </div>
          <p className="reveal max-w-md text-[1.0625rem] leading-relaxed text-mute lg:col-span-4 lg:col-start-9 lg:self-end">
            We operate as a data collection and data operations partner for AI companies, research labs and training
            organisations, from contributor sourcing through to structured delivery.
          </p>
        </div>

        <ul className="mt-20 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <li
              key={c.title}
              className="reveal group flex flex-col border-b border-r border-line p-8 transition-colors duration-500 hover:bg-coal md:p-10 xl:p-12"
            >
              <div className="flex items-start justify-between">
                <c.icon aria-hidden="true" strokeWidth={1} className="h-9 w-9 text-white" />
                <Index>{String(i + 1).padStart(2, "0")}</Index>
              </div>
              <h3 className="font-display mt-12 text-[1.65rem] leading-tight">{c.title}</h3>
              <p className="mt-3 text-[0.975rem] leading-relaxed text-mute">{c.text}</p>
              <ul className="mt-8 space-y-2.5 border-t border-line pt-6 text-sm text-soft">
                {c.scope.map((s) => (
                  <li key={s} className="flex items-center gap-3">
                    <span aria-hidden="true" className="h-px w-3 bg-mute" />
                    {s}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------- Operations: ledger ---------- */}
      <Section tone="coal" labelledBy="ops-title">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="reveal lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
              <Eyebrow>How our operations work</Eyebrow>
              <h2 id="ops-title" className="font-display text-display-md mt-7">
                From specification to structured delivery.
              </h2>
              <p className="mt-7 max-w-sm text-[1.0625rem] leading-relaxed text-mute">
                Every project runs through the same five stages, with quality checks built into collection rather than
                added at the end.
              </p>
            </div>
          </div>

          <ol className="lg:col-span-7 lg:col-start-6">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="reveal grid grid-cols-[3.5rem_1fr] gap-x-4 border-t border-line py-10 last:border-b md:grid-cols-[6rem_1fr_1fr] md:py-12"
              >
                <span className="font-display text-[2.25rem] leading-none text-[#4a4a4a] md:text-[3rem]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display self-center text-[1.5rem] leading-tight md:text-[1.75rem]">{s.title}</h3>
                <p className="col-start-2 mt-3 text-[0.975rem] leading-relaxed text-mute md:col-start-3 md:mt-0 md:self-center">
                  {s.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* ---------- Why partner ---------- */}
      <Section labelledBy="why-data-title">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-start">
          <div className="reveal lg:col-span-5">
            <Eyebrow>Why partner with us</Eyebrow>
            <h2 id="why-data-title" className="font-display text-display-md mt-7">
              Operations built for reliability, not volume alone.
            </h2>
          </div>
          <ul className="grid gap-x-12 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {reasons.map((r, i) => (
              <li key={r} className="reveal flex items-baseline gap-5 border-b border-line py-6">
                <Index>{String(i + 1).padStart(2, "0")}</Index>
                <span className="text-[1.125rem] text-white">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <ClosingCta
        label="Work with Sunbloom AI"
        title="Need reliable data collection operations?"
        text="Share your modality, specification and timeline. We'll come back with how we'd source, collect, check and deliver it."
        cta="Discuss a data project"
        href="/contact?type=data-collection"
      />
    </>
  );
}
