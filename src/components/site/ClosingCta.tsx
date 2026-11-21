import { ButtonLink } from "./Button";
import { Eyebrow } from "./Section";

/** End-of-page call to action. Solid graphite with a single orbital hairline. */
export function ClosingCta({
  label = "Get in touch",
  title,
  text,
  cta,
  href = "/contact",
}: {
  label?: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  cta: string;
  href?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-t border-line bg-graphite">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-[18%] top-1/2 -z-10 h-[150%] w-auto -translate-y-1/2 text-white/[0.07] md:-right-[8%]"
        viewBox="0 0 800 800"
        fill="none"
      >
        <circle cx="400" cy="400" r="399" stroke="currentColor" />
        <circle cx="400" cy="400" r="300" stroke="currentColor" />
        <circle cx="400" cy="1" r="3.5" fill="currentColor" className="text-white/40" />
      </svg>

      <div className="shell grid gap-12 py-28 md:py-36 lg:grid-cols-12 lg:items-end">
        <div className="reveal lg:col-span-8">
          <Eyebrow>{label}</Eyebrow>
          <h2 className="font-display text-display-lg mt-8">{title}</h2>
        </div>
        <div className="reveal lg:col-span-4 lg:pb-3">
          {text ? <p className="text-[1.0625rem] leading-relaxed text-mute">{text}</p> : null}
          <ButtonLink href={href} className="mt-9">
            {cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
