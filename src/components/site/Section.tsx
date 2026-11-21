import { cn } from "@/lib/utils";

type Tone = "ink" | "coal" | "graphite";

const toneClass: Record<Tone, string> = {
  ink: "bg-ink",
  coal: "bg-coal",
  graphite: "bg-graphite",
};

/** Solid-background content section with a hairline top border. */
export function Section({
  id,
  tone = "ink",
  className,
  innerClassName,
  children,
  bordered = true,
  labelledBy,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  bordered?: boolean;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(toneClass[tone], bordered && "border-t border-line", className)}
    >
      <div className={cn("shell py-24 md:py-32 lg:py-36", innerClassName)}>{children}</div>
    </section>
  );
}

/** "— OUR CAPABILITIES" style label. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-4", className)}>
      <span aria-hidden="true" className="h-px w-5 bg-current opacity-80" />
      {children}
    </p>
  );
}

/** Small tabular index number, e.g. 01. */
export function Index({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("font-sans text-xs font-medium tabular-nums tracking-[0.12em] text-mute", className)}>
      {children}
    </span>
  );
}
