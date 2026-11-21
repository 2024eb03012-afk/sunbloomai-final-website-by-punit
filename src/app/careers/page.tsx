import { TextPage } from "@/components/site/TextPage";
import { ButtonLink } from "@/components/site/Button";
import { Index } from "@/components/site/Section";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Careers",
  description:
    "Work with Sunbloom AI as a data contributor on collection projects, or join the team building enterprise AI and data infrastructure.",
  path: "/careers",
});

const mail = (subject: string) => `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

const paths = [
  {
    title: "Data contributors",
    text: "Our data operations rely on contributors who record video, images and audio, or help annotate and review data, according to project specifications. Opportunities depend on active projects and their requirements.",
    cta: "Register interest",
    href: mail("Data contributor interest"),
  },
  {
    title: "Join the team",
    text: "We work with engineers, operations specialists and project coordinators who care about doing AI work properly. We do not have open roles listed right now, but we're glad to hear from people who want to build with us.",
    cta: "Introduce yourself",
    href: mail("Careers at Sunbloom AI"),
  },
];

export default function CareersPage() {
  return (
    <TextPage
      label="Careers"
      title="Build the infrastructure behind real-world AI."
      intro="Two ways to work with Sunbloom AI: as a contributor on data projects, or as part of the team."
    >
      <section className="border-t border-line bg-ink">
        <div className="shell grid md:grid-cols-2">
          {paths.map((p, i) => (
            <div
              key={p.title}
              className={`reveal border-b border-line py-16 md:border-b-0 md:py-24 ${i === 0 ? "md:pr-14 lg:pr-20" : "md:border-l md:pl-14 lg:pl-20"}`}
            >
              <Index>{`0${i + 1}`}</Index>
              <h2 className="font-display text-display-sm mt-6">{p.title}</h2>
              <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-mute">{p.text}</p>
              <ButtonLink href={p.href} variant="outline" className="mt-10">
                {p.cta}
              </ButtonLink>
            </div>
          ))}
        </div>
      </section>
    </TextPage>
  );
}
