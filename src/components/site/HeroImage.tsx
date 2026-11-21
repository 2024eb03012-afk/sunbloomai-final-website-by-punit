import { cn } from "@/lib/utils";

/**
 * Responsive, pre-optimised hero photograph. Serves a 1200px WebP to small
 * screens and a 2400px WebP elsewhere (next/image optimisation is disabled
 * in next.config, so variants are generated ahead of time in /public/images).
 */
export function HeroImage({
  name,
  alt = "",
  position = "center",
  className,
  priority = true,
}: {
  name: string;
  alt?: string;
  position?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={`/images/${name}-sm.webp`} type="image/webp" />
      <img
        src={`/images/${name}.webp`}
        alt={alt}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className={cn("h-full w-full object-cover", className)}
        style={{ objectPosition: position }}
      />
    </picture>
  );
}
