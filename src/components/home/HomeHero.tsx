import { HeroImage } from "@/components/site/HeroImage";
import { Eyebrow } from "@/components/site/Section";

export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-ink">
      {/* Full-bleed cinematic landscape; the arcs and nodes are part of the artwork. */}
      <div className="absolute inset-0 -z-20">
        <HeroImage
          name="home"
          alt="Black-and-white mountain ridges catching the light, crossed by thin orbital arcs"
          position="72% 15%"
          className="anim-settle"
        />
      </div>
      <div aria-hidden="true" className="hero-scrim-home absolute inset-0 -z-10" />

      <div className="shell flex min-h-svh flex-col items-center justify-center pb-[28vh] pt-[calc(var(--header-h)+4rem)] text-center">
        <div className="flex flex-col items-center">
          <Eyebrow className="anim-rise justify-center max-sm:[&>span]:hidden">
            Enterprise AI &amp; Data Infrastructure
            <span aria-hidden="true" className="h-px w-5 bg-current opacity-80" />
          </Eyebrow>
          <h1
            id="hero-title"
            className="anim-rise mt-8 font-sans text-[clamp(2.5rem,5.7vw,6rem)] font-normal leading-[1.1] tracking-[-0.01em] text-white [animation-delay:90ms] lg:whitespace-nowrap"
          >
            Enterprise AI Infrastructure
          </h1>
          <p className="anim-rise mt-7 max-w-[52rem] text-[1.0625rem] leading-relaxed text-[#b4b4b4] [animation-delay:180ms]">
            We build enterprise AI systems, power AI training through high-quality data operations,
            <br className="hidden lg:block" /> and evaluate intelligent systems for real-world performance.
          </p>
        </div>
      </div>
    </section>
  );
}
