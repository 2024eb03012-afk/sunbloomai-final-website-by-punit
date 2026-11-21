import Link from "next/link";
import { cn } from "@/lib/utils";

/** Monochrome bloom mark: sixteen radiating petals around an open centre. */
export function BloomMark({ className }: { className?: string }) {
  const petals = Array.from({ length: 16 }, (_, i) => i * 22.5);
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn("h-8 w-8", className)} fill="currentColor">
      {petals.map((deg, i) => (
        <rect
          key={deg}
          x="18.6"
          y={i % 2 === 0 ? 2.2 : 4.6}
          width="2.8"
          height={i % 2 === 0 ? 12.2 : 9.8}
          rx="1.4"
          transform={`rotate(${deg} 20 20)`}
        />
      ))}
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Sunbloom AI — home"
      className={cn("group inline-flex items-center gap-2.5 text-white", className)}
    >
      <BloomMark className="h-[30px] w-[30px] transition-transform duration-700 ease-out group-hover:rotate-[22.5deg]" />
      <span className="whitespace-nowrap text-[1.3rem] font-semibold tracking-[-0.02em]">Sunbloom AI</span>
    </Link>
  );
}
