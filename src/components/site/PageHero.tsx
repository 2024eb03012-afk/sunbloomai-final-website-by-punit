import { HeroImage } from "./HeroImage";
import { Eyebrow } from "./Section";
import { cn } from "@/lib/utils";

/** Cinematic hero used by internal pages: photograph right, editorial type left. */
export function PageHero({
  label,
  title,
  intro,
  image,
  imagePosition = "center",
  imageClassName,
  actions,
  compact = false,
}: {
  label: string;
  title: React.ReactNode;
  intro: React.ReactNode;
  image: string;
  imagePosition?: string;
  imageClassName?: string;
  actions?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <div className="absolute inset-0 -z-10 lg:left-[22%]">
        <HeroImage name={image} position={imagePosition} className={cn("anim-settle", imageClassName)} />
      </div>
      <div aria-hidden="true" className="hero-scrim absolute inset-0 -z-10" />

      <div
        className={cn(
          "shell flex flex-col justify-end pb-16 pt-[calc(var(--header-h)+6rem)] md:pb-24",
          compact ? "min-h-[min(78svh,700px)]" : "min-h-[min(92svh,860px)]",
        )}
      >
        <div className="max-w-[46rem]">
          <Eyebrow className="anim-rise">{label}</Eyebrow>
          <h1 className="font-display text-display-lg anim-rise mt-8 [animation-delay:80ms]">{title}</h1>
          <div className="text-lede anim-rise mt-7 max-w-[34rem] [animation-delay:160ms]">{intro}</div>
          {actions ? (
            <div className="anim-rise mt-11 flex flex-wrap items-center gap-x-8 gap-y-5 [animation-delay:240ms]">
              {actions}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
