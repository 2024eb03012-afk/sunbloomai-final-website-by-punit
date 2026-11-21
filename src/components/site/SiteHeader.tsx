"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { ButtonLink } from "./Button";
import { pillars, primaryNav } from "@/lib/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const solutionsRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Solid background once the page scrolls past the top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
    setSolutionsOpen(false);
  }

  // Lock scroll behind the mobile menu; close it with Escape.
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSolutionsOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (solutionsRef.current && !solutionsRef.current.contains(e.target as Node)) setSolutionsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const openSolutions = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setSolutionsOpen(true);
  };
  const scheduleCloseSolutions = () => {
    closeTimer.current = setTimeout(() => setSolutionsOpen(false), 140);
  };

  const solid = scrolled || menuOpen || solutionsOpen;

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
        solid ? "border-line bg-ink/90 backdrop-blur-md" : "border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-bone focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>

      <div className="shell flex h-[var(--header-h)] items-center justify-between gap-8">
        <Logo />

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-10 text-[0.9375rem] text-white">
            <li
              ref={solutionsRef}
              className="relative"
              onMouseEnter={openSolutions}
              onMouseLeave={scheduleCloseSolutions}
            >
              <button
                type="button"
                aria-expanded={solutionsOpen}
                aria-controls="solutions-menu"
                // Mouse users already opened it on hover, so a click keeps it open;
                // keyboard activation (detail === 0) toggles.
                onClick={(e) => (e.detail === 0 ? setSolutionsOpen((v) => !v) : openSolutions())}
                className="group flex items-center gap-1.5 py-2 text-white/90 transition-colors hover:text-white"
              >
                Solutions
                <ChevronDown
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className={cn("h-3.5 w-3.5 transition-transform duration-300", solutionsOpen && "rotate-180")}
                />
              </button>

              <div
                id="solutions-menu"
                className={cn(
                  "absolute -left-7 top-full w-[min(780px,80vw)] pt-5 transition-[opacity,transform] duration-300",
                  solutionsOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
                )}
              >
                <div className="grid grid-cols-3 border border-line bg-graphite">
                  {pillars.map((p, i) => (
                    <Link
                      key={p.href}
                      href={p.href}
                      className={cn(
                        "group/item flex flex-col gap-3 p-7 transition-colors hover:bg-charcoal",
                        i > 0 && "border-l border-line",
                      )}
                    >
                      <span className="text-xs tabular-nums tracking-[0.12em] text-mute">{p.index}</span>
                      <span className="font-display text-[1.35rem] leading-tight text-white">{p.title}</span>
                      <span className="text-sm leading-relaxed text-mute">{p.summary}</span>
                      <span className="mt-2 inline-flex items-center gap-2 text-[0.8125rem] text-white/80 group-hover/item:text-white">
                        Explore
                        <ArrowRight
                          aria-hidden="true"
                          strokeWidth={1.5}
                          className="h-3.5 w-3.5 transition-transform group-hover/item:translate-x-0.5"
                        />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </li>
            {primaryNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative py-2 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-white after:transition-transform after:duration-500",
                      active
                        ? "text-white after:scale-x-100"
                        : "text-white/90 after:scale-x-0 hover:text-white hover:after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink href="/contact" size="sm" className="hidden md:inline-flex">
            Talk to our team
          </ButtonLink>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative -mr-2 flex h-11 w-11 items-center justify-center xl:hidden"
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute h-px w-6 bg-white transition-transform duration-300",
                menuOpen ? "rotate-45" : "-translate-y-[4px]",
              )}
            />
            <span
              aria-hidden="true"
              className={cn(
                "absolute h-px w-6 bg-white transition-transform duration-300",
                menuOpen ? "-rotate-45" : "translate-y-[4px]",
              )}
            />
          </button>
        </div>
      </div>

    </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto bg-ink transition-[opacity,visibility] duration-300 xl:hidden",
          menuOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="shell flex min-h-full flex-col pb-10 pt-6">
          <p className="eyebrow text-mute">Solutions</p>
          <ul className="mt-4 border-t border-line">
            {pillars.map((p) => (
              <li key={p.href} className="border-b border-line">
                <Link
                  href={p.href}
                  aria-current={isActive(pathname, p.href) ? "page" : undefined}
                  className="flex items-baseline gap-5 py-5"
                >
                  <span className="text-xs tabular-nums tracking-[0.12em] text-mute">{p.index}</span>
                  <span className="font-display text-[1.7rem] leading-tight text-white">{p.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 text-lg">
            {[
              { label: "Research", href: "/research" },
              { label: "Company", href: "/company" },
              { label: "Careers", href: "/careers" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={cn(isActive(pathname, item.href) ? "text-white underline underline-offset-8" : "text-soft")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-12">
            <ButtonLink href="/contact" className="w-full">
              Talk to our team
            </ButtonLink>
          </div>
        </nav>
      </div>
    </>
  );
}
