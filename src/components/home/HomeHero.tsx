import { HeroImage } from "@/components/site/HeroImage";
import { ButtonLink } from "@/components/site/Button";
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

      <div className="shell flex min-h-[max(660px,min(84svh,780px))] flex-col items-center justify-center pb-16 pt-[calc(var(--header-h)+4rem)] text-center md:pb-20">
        <div className="flex max-w-[52rem] flex-col items-center">
          <Eyebrow className="anim-rise justify-center">
            Enterprise AI &amp; Data Infrastructure
            <span aria-hidden="true" className="h-px w-5 bg-current opacity-80" />
          </Eyebrow>
          <h1 id="hero-title" className="font-display text-display-xl anim-rise mt-8 [animation-delay:90ms]">
            Enterprise AI
            <br />
            Infrastructure
          </h1>
          <p className="text-lede anim-rise mt-7 max-w-[34rem] [animation-delay:180ms]">
            Build, power and evaluate intelligent systems.
          </p>
          <p className="anim-rise mt-6 max-w-[34rem] text-[0.975rem] leading-relaxed text-mute [animation-delay:240ms]">
            We build enterprise AI systems, power AI training through high-quality data operations, and evaluate
            intelligent systems for real-world performance.
          </p>
          <div className="anim-rise mt-11 flex flex-wrap items-center justify-center gap-x-9 gap-y-5 [animation-delay:320ms]">
            <ButtonLink href="/contact">Talk to our team</ButtonLink>
            <ButtonLink href="#capabilities" variant="text">
              Explore our capabilities
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
