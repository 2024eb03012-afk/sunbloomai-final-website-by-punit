"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["700", "800"], display: "swap" });

type CalendlyWindow = Window & {
  Calendly?: { initPopupWidget: (opts: { url: string }) => void };
};

export function openCalendlyPopup(e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
  e.preventDefault();
  const url = "https://cal.com/punit-gupta-grdgmd/30min";
  const w = window as unknown as CalendlyWindow;
  if (w.Calendly && typeof w.Calendly.initPopupWidget === "function") {
    w.Calendly.initPopupWidget({ url });
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

export function Header() {
  const [atTop, setAtTop] = useState(true);
  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`sticky top-0 z-50 transition-all ${atTop ? "bg-gradient-to-r from-white/90 to-white/80 backdrop-blur-2xl backdrop-saturate-150 rounded-full mx-6 mt-6" : "bg-gradient-to-r from-white/90 to-white/80 backdrop-blur-2xl backdrop-saturate-150 rounded-full mx-6 mt-6"
        }`}
      style={{
        boxShadow: atTop
          ? '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          : '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="mx-auto max-w-[880px] px-6 py-3 flex items-center justify-between">
        <Link href="/" aria-label="Sun Bloom AI" className="flex items-center gap-2">
          <Image src="/sunbloom-logo.png" alt="Sun Bloom AI logo" width={28} height={28} priority />
          <span className={`${poppins.className} text-lg font-bold tracking-tight text-foreground`}>SunbloomAI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-5 text-sm font-bold text-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <Link href="/#use-cases" className="hover:text-foreground">Service</Link>
          <Link href="/#outcomes" className="hover:text-foreground">Testimonial</Link>
          <Link href="/#resources" className="hover:text-foreground">Resources</Link>
          <a
            href="https://cal.com/punit-gupta-grdgmd/30min"
            className="btn btn-primary"
            onClick={openCalendlyPopup}
            onMouseMove={(e) => {
              const r = (e.currentTarget as HTMLAnchorElement).getBoundingClientRect();
              const x = ((e.clientX - r.left) / r.width) * 100;
              const y = ((e.clientY - r.top) / r.height) * 100;
              (e.currentTarget as HTMLElement).style.setProperty("--x", `${x}%`);
              (e.currentTarget as HTMLElement).style.setProperty("--y", `${y}%`);
            }}
            rel="noopener noreferrer"
          >
            Talk with us
          </a>
        </nav>
      </div>
    </header>
  );
}
