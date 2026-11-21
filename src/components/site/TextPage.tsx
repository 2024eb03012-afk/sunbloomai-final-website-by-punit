import { Eyebrow } from "./Section";

/** Imageless page frame for careers and legal pages: same header rhythm, solid background. */
export function TextPage({
  label,
  title,
  intro,
  children,
}: {
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="bg-ink">
        <div className="shell pb-20 pt-[calc(var(--header-h)+6rem)] md:pb-24 md:pt-[calc(var(--header-h)+8rem)]">
          <Eyebrow className="anim-rise">{label}</Eyebrow>
          <h1 className="font-display text-display-lg anim-rise mt-8 max-w-4xl [animation-delay:80ms]">{title}</h1>
          {intro ? <div className="text-lede anim-rise mt-7 max-w-2xl [animation-delay:160ms]">{intro}</div> : null}
        </div>
      </section>
      {children}
    </>
  );
}

/** Long-form legal copy. */
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <section className="border-t border-line bg-ink">
      <div className="shell grid py-20 md:py-28 lg:grid-cols-12">
        <div className="max-w-2xl space-y-6 text-[1rem] leading-[1.75] text-soft lg:col-span-8 lg:col-start-4 [&_h2]:font-display [&_h2]:pt-8 [&_h2]:text-[1.75rem] [&_h2]:leading-tight [&_h2]:text-white [&_a]:text-white [&_a]:underline [&_a]:underline-offset-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:marker:text-mute">
          {children}
        </div>
      </div>
    </section>
  );
}
