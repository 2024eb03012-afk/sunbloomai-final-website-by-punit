"use client";

import { useEffect, useMemo, useRef, useState, useId } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import Link from "next/link";
// Logo will be referenced directly from public directory
import { Open_Sans, Poppins } from "next/font/google";
import LogoMarquee from "../components/LogoMarquee";
import { RetroGrid } from "@/components/ui/retro-grid";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import { AuroraText } from "@/components/ui/aurora-text";

const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "600"], display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["700", "800"], display: "swap" });

type CalendlyWindow = Window & {
  Calendly?: { initPopupWidget: (opts: { url: string }) => void };
};

function openCalendlyPopup(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  const url = "https://calendly.com/anmol-sunbloomai/30min";
  const w = window as unknown as CalendlyWindow;
  if (w.Calendly && typeof w.Calendly.initPopupWidget === "function") {
    w.Calendly.initPopupWidget({ url });
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

function Header() {
  const [atTop, setAtTop] = useState(true);
  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        atTop ? "bg-gradient-to-r from-white/90 to-white/80 backdrop-blur-2xl backdrop-saturate-150 rounded-full mx-6 mt-6 shadow-2xl border border-black/10" : "bg-gradient-to-r from-white/90 to-white/80 backdrop-blur-2xl backdrop-saturate-150 rounded-full mx-6 mt-6 shadow-2xl border border-black/10"
      }`}
    >
      <div className="mx-auto max-w-[650px] px-5 py-3 flex items-center justify-between">
        <Link href="#" aria-label="Sun Bloom AI" className="flex items-center gap-2">
          <Image src="/sunbloom-ai.png" alt="Sun Bloom AI logo" width={28} height={28} priority />
          <span className={`${poppins.className} text-lg font-bold tracking-tight lowercase text-foreground`}>SunbloomAI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-foreground">
          <a href="#" className="hover:text-foreground">Home</a>
          <a href="#use-cases" className="hover:text-foreground">Service</a>
          <a href="#outcomes" className="hover:text-foreground">Testimonial</a>
          <a href="#process" className="hover:text-foreground">About us</a>
          <a
            href="https://calendly.com/anmol-sunbloomai/30min"
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

function Hero() {
  const outcomes = [
    "-40% ticket backlog",
    "+28% inbound conversion",
    "+42% lead response rate",
  ];
  const [idx, setIdx] = useState(0);
  const [spot, setSpot] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const reduceMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
  const glitterRef = useRef<HTMLAnchorElement | null>(null);
  useEffect(() => {
    if (reduceMotion) return;
    const el = glitterRef.current;
    if (!el) return;

    let rafId = 0;
    let lastSpawn = 0;
    const spawnEveryMs = 140;

    const spawn = () => {
      const rect = el.getBoundingClientRect();
      const baseDistance = Math.max(rect.width, rect.height) * 0.9;
      const particle = document.createElement("span");
      particle.className = "glitter-particle";
      const angle = Math.random() * Math.PI * 2;
      const distance = baseDistance * (0.6 + Math.random() * 0.9);
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      const durationMs = 900 + Math.random() * 700;
      particle.style.setProperty("--tx", `${tx.toFixed(2)}px`);
      particle.style.setProperty("--ty", `${ty.toFixed(2)}px`);
      particle.style.setProperty("--d", `${durationMs.toFixed(0)}ms`);
      el.appendChild(particle);
      const cleanup = () => particle.remove();
      particle.addEventListener("animationend", cleanup, { once: true });
      window.setTimeout(cleanup, durationMs + 60);
    };

    const loop = (now: number) => {
      if (!glitterRef.current) return;
      if (now - lastSpawn > spawnEveryMs) {
        spawn();
        lastSpawn = now;
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [reduceMotion]);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % outcomes.length), 4000);
    return () => clearInterval(id);
  }, [outcomes.length]);
  return (
    <section
      className="relative -mt-16 pt-6 border-b border-[var(--border)] overflow-hidden"
      onMouseMove={(e) => {
        if (reduceMotion) return;
        const r = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        setSpot({ x, y });
      }}
      style={{
        background: `radial-gradient(600px circle at ${spot.x}% ${spot.y}%, rgba(245,192,68,.08), transparent 45%)`,
      }}
    >
      <RetroGrid className="opacity-30" />
      <div className="mx-auto max-w-[1200px] px-5 py-24 md:py-28 lg:py-32 relative z-10">
        <div className="flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-8 max-w-4xl text-center reveal">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              Bespoke AI agents as a service
            </div>
            <LineShadowText
              as="h1"
              className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight whitespace-nowrap"
            >
              You still don't have AI Agents
            </LineShadowText>
            <div className="flex items-center justify-center gap-3 text-balance">
              <AuroraText
                className="text-[2.25rem] leading-tight md:text-[3.25rem] lg:text-[4rem]"
                words={[
                  "Bulk calling your List",
                  "Screening your Candidates",
                  "Doing Personalised Lead Generation",
                  "Doing Cold Calls",
                  "Doing Appointment Bookings",
                ]}
              />
              <span className="text-[2.25rem] font-bold leading-tight md:text-[3.25rem] lg:text-[4rem]">?</span>
            </div>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              We build Premium AI agents that work the way your team does and drives revenue for your business. Solving Real Business Problems. With Real AI Employees.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-center gap-3 w-full sm:w-auto">
              <a
                href="#use-cases"
                className="btn btn-glitter"
                ref={glitterRef}
                onMouseMove={(e) => {
                  const r = (e.currentTarget as HTMLAnchorElement).getBoundingClientRect();
                  const x = ((e.clientX - r.left) / r.width) * 100;
                  const y = ((e.clientY - r.top) / r.height) * 100;
                  (e.currentTarget as HTMLElement).style.setProperty("--x", `${x}%`);
                  (e.currentTarget as HTMLElement).style.setProperty("--y", `${y}%`);
                }}
              >
                Try it now →
              </a>
              <a
                href="https://calendly.com/anmol-sunbloomai/30min"
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
                Book a strategy call
              </a>
            </div>
            <div className="text-sm text-muted-foreground text-center">
              <span className="font-medium text-foreground">Outcomes: </span>
              {outcomes[idx]}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CountUp({ end, suffix = "", showPlus = false, durationMs = 1200 }: { end: number; suffix?: string; showPlus?: boolean; durationMs?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            setStarted(true);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [started]);
  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const from = 0;
    const to = end;
    const animate = (t: number) => {
      const p = Math.min(1, (t - start) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = from + (to - from) * eased;
      setVal(current);
      if (p < 1) requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [started, end, durationMs]);
  const display = `${showPlus && end > 0 ? "+" : ""}${val.toFixed(0)}${suffix}`;
  return (
    <div ref={ref} aria-label={`${end}${suffix}`}>
      {display}
    </div>
  );
}

function Outcomes() {
  const items: { label: string; end: number; showPlus?: boolean }[] = [
    { label: "Ticket backlog", end: -40 },
    { label: "Inbound conversion", end: 28, showPlus: true },
    { label: "Lead response rate", end: 42, showPlus: true },
  ];
  return (
    <section id="outcomes" className="bg-muted border-y border-[var(--border)]">
      <div className="mx-auto max-w-[1200px] px-5 pt-12 md:pt-16 pb-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {items.map((m, i) => (
          <div
            key={m.label}
            className="rounded-xl bg-muted p-6 border border-[var(--border)] reveal"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="text-3xl md:text-4xl font-semibold">
              <CountUp end={m.end} suffix="%" showPlus={m.showPlus ?? false} />
            </div>
            <div className="text-sm text-muted-foreground mt-1">{m.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function UseCases() {
  const services = [
    {
      title: "Custom AI Voice Calling Agent",
      desc: "Design a voice agent that mirrors your brand tone, handles objections, and stays compliant on every outbound call.",
      details: "Deploy bespoke playbooks that adapt in-call, sync notes to your CRM, and surface conversations analytics in real time.",
      tag: "Voice AI",
      highlights: [
        "Dynamic intent detection that adapts the script in milliseconds",
        "Real-time CRM logging with call scoring and follow-up nudges",
        "Compliance-aware guardrails tailored to your industry",
      ],
    },
    {
      title: "Appointment Booking Voice Agent",
      desc: "Automate scheduling workflows by letting the agent negotiate slots, handle reschedules, and send confirmations instantly.",
      details: "Integrates with your calendar stack, validates availability, and keeps humans looped in with smart summaries.",
      tag: "Scheduling",
      highlights: [
        "Two-way sync with Google, Outlook, and HubSpot calendars",
        "Automatic reminders via SMS, email, and voice callbacks",
        "Escalation rules that hand off edge cases to live teams",
      ],
    },
    {
      title: "WhatsApp Chatbots",
      desc: "Craft conversational flows that blend transactional updates, support, and upsells across multilingual WhatsApp journeys.",
      details: "Ship secure flows with human handoff, campaign analytics, and rapid iteration powered by retrieval-augmented responses.",
      tag: "Messaging",
      highlights: [
        "Broadcast and 1:1 flows with templated or generative replies",
        "Multilingual understanding covering 40+ languages",
        "Seamless live-agent takeover inside WhatsApp Business API",
      ],
    },
    {
      title: "Recruitment Screening Voice Agent",
      desc: "Pre-screen candidates with adaptive interviews, capture structured notes, and shortlist talent based on your criteria.",
      details: "Evaluates for skills and culture fit, syncs evaluations to ATS, and flags edge cases for recruiter review.",
      tag: "Talent AI",
      highlights: [
        "Structured scorecards exported directly into your ATS",
        "Adaptive questioning that follows up based on candidate replies",
        "Bias-aware analyser with recruiter override controls",
      ],
    },
    {
      title: "Lead Generation AI Agents",
      desc: "Warm up inbound and outbound leads with contextual outreach that personalises messaging to segment and intent.",
      details: "Enriches leads automatically, prioritises hot prospects, and keeps revenue teams aligned with pipeline reporting.",
      tag: "Revenue",
      highlights: [
        "Intent classification that scores leads mid-conversation",
        "Personalised scripts sourced from connected knowledge bases",
        "Pipeline dashboards that update in real time",
      ],
    },
    {
      title: "Real Estate Bulk Calling AI Agents",
      desc: "Scale property campaigns with agents that qualify buyers, schedule showings, and update listings data around the clock.",
      details: "Understands geo-specific compliance, logs call outcomes to your CRM, and coordinates follow-ups with live reps.",
      tag: "Real Estate",
      highlights: [
        "Geo-fenced compliance and DNC list adherence built-in",
        "Instant showing confirmations synced with your calendars",
        "Inventory updates pushed back into your MLS or CRM",
      ],
    },
  ];
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const activeService = activeIdx !== null ? services[activeIdx] : null;
  const modalRef = useRef<HTMLDivElement | null>(null);
  const id = useId();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIdx(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const { style } = document.body;
    if (activeService) {
      const original = style.overflow;
      style.overflow = "hidden";
      return () => {
        style.overflow = original;
      };
    }
    return () => {
      style.overflow = "";
    };
  }, [activeService]);

  return (
    <section id="use-cases">
      <div className="mx-auto max-w-[1200px] px-5 pt-8 pb-24">
        <div className="flex items-end justify-between gap-6 mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Our Services</h2>
          <a
            href="https://calendly.com/anmol-sunbloomai/30min"
            className="text-sm text-muted-foreground hover:text-foreground"
            onClick={openCalendlyPopup}
            rel="noopener noreferrer"
          >
            Get a proposal →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const isActive = activeIdx === idx;
            const buttonLabel = "Look more";
            return (
              <motion.div
                key={service.title}
                layoutId={`service-card-${idx}-${id}`}
                className={`service-card reveal ${isActive ? "service-card--expanded" : ""}`}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{ 
                  opacity: isActive ? 0 : 1,
                  pointerEvents: isActive ? "none" : "auto"
                }}
                onMouseMove={(e) => {
                  if (isActive) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const offsetX = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
                  const offsetY = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
                  e.currentTarget.style.setProperty("--service-tilt-x", `${(-offsetY).toFixed(2)}deg`);
                  e.currentTarget.style.setProperty("--service-tilt-y", `${offsetX.toFixed(2)}deg`);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.removeProperty("--service-tilt-x");
                  e.currentTarget.style.removeProperty("--service-tilt-y");
                }}
                onClick={() => setActiveIdx(idx)}
              >
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.14em]">
                    <motion.span 
                      layoutId={`service-tag-${idx}-${id}`} 
                      className="text-muted-foreground"
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      {service.tag}
                    </motion.span>
                    <motion.span 
                      layoutId={`service-index-${idx}-${id}`} 
                      className="text-muted-foreground/60"
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      0{idx + 1}
                    </motion.span>
                  </div>
                  <motion.h3 
                    layoutId={`service-title-${idx}-${id}`} 
                    className="mt-4 text-lg font-medium text-foreground"
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {service.title}
                  </motion.h3>
                  <motion.p 
                    layoutId={`service-desc-${idx}-${id}`} 
                    className="mt-3 text-sm leading-relaxed text-muted-foreground"
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {service.desc}
                  </motion.p>
                  <div className="mt-auto pt-6 flex flex-col gap-4">
                    <div>
                      <button
                        type="button"
                        className="service-chip service-chip-secondary service-chip-toggle"
                        onClick={(event) => {
                          event.stopPropagation();
                          setActiveIdx(idx);
                        }}
                        aria-expanded={isActive}
                      >
                        {buttonLabel}
                        <span className="service-chip-icon">+</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <AnimatePresence>
          {activeService && activeIdx !== null && (
            <>
              <motion.div
                key="service-backdrop"
                className="service-modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                onClick={() => setActiveIdx(null)}
              />
              <motion.div
                key={`service-modal-${activeIdx}`}
                layoutId={`service-card-${activeIdx}-${id}`}
                ref={modalRef}
                className="service-modal"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 280, damping: 24, duration: 0.3 }}
                onClick={(event) => event.stopPropagation()}
              >
                <button className="service-modal-close" type="button" onClick={() => setActiveIdx(null)} aria-label="Close details">
                  ✕
                </button>
                <div className="service-modal-header">
                  <motion.span 
                    layoutId={`service-tag-${activeIdx}-${id}`} 
                    className="service-modal-tag"
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {activeService.tag}
                  </motion.span>
                  <motion.span 
                    layoutId={`service-index-${activeIdx}-${id}`} 
                    className="service-modal-index"
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    0{activeIdx + 1}
                  </motion.span>
                </div>
                <motion.h3 
                  layoutId={`service-title-${activeIdx}-${id}`} 
                  className="service-modal-title"
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {activeService.title}
                </motion.h3>
                <motion.p 
                  layoutId={`service-desc-${activeIdx}-${id}`} 
                  className="service-modal-intro"
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {activeService.details}
                </motion.p>
                <div className="service-modal-body">
                  <ul className="service-modal-list">
                    {activeService.highlights.map((item) => (
                      <li key={item}>
                        <span className="service-modal-bullet" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="service-modal-actions">
                  <a
                    href="https://calendly.com/anmol-sunbloomai/30min"
                    className="btn btn-primary"
                    onClick={(linkEvent) => {
                      setActiveIdx(null);
                      openCalendlyPopup(linkEvent);
                    }}
                    rel="noopener noreferrer"
                  >
                    Book a build sprint
                  </a>
                  <button
                    type="button"
                    className="service-modal-outline"
                    onClick={() => setActiveIdx(null)}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
        <div className="mt-8">
          <a
            href="https://calendly.com/anmol-sunbloomai/30min"
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
            Try now
          </a>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { title: "Assess", desc: "Map goals, guardrails, and success metrics." },
    { title: "Prototype", desc: "Ship a working agent in days, not weeks." },
    { title: "Deploy & Operate", desc: "Train, monitor, and iterate with SLAs." },
  ];
  return (
    <section id="process" className="border-y border-[var(--border)]">
      <div className="mx-auto max-w-[1200px] px-5 py-24">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-10">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="p-6 rounded-xl border border-[var(--border)] bg-muted reveal"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="text-xs text-muted-foreground">Step {i + 1}</div>
              <div className="mt-2 text-lg font-medium">{s.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <a
            href="https://calendly.com/anmol-sunbloomai/30min"
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
            Book a strategy call
          </a>
        </div>
      </div>
    </section>
  );
}

function LogoCloud() {
  const logos = ["Acme", "Northstar", "Helio", "Strata", "Nimbus"];
  return (
    <section className="bg-muted border-b border-[var(--border)]">
      <div className="mx-auto max-w-[1200px] px-5 py-12">
        <div className="text-sm text-muted-foreground mb-6">Trusted by teams who value reliability</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center">
          {logos.map((name) => (
            <div key={name} className="h-10 rounded-md border border-[var(--border)] bg-muted flex items-center justify-center text-xs text-muted-foreground logo-shimmer">
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact section was removed to avoid duplicating the footer content

function FAQ() {
  const faqs = [
    {
      q: "How do you ensure brand voice?",
      a: "We build evaluators and style checks into the pipeline and train on your materials.",
    },
    {
      q: "How fast can we launch?",
      a: "Typical pilot in 1–2 weeks, production in 3–4 depending on integrations.",
    },
    {
      q: "What about security?",
      a: "We scope data access, apply guardrails, and log activities with auditability.",
    },
    {
      q: "Do you maintain agents?",
      a: "Yes. We operate, monitor, and iterate with clear SLAs.",
    },
  ];
  return (
    <section id="faq" className="border-t border-[var(--border)]">
      <div className="mx-auto max-w-[900px] px-5 py-24">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8">FAQ</h2>
        <div className="divide-y divide-[var(--border)]">
          {faqs.map((f) => (
            <details key={f.q} className="py-4 reveal" style={{ transitionDelay: "60ms" }}>
              <summary className="cursor-pointer list-none flex items-center justify-between">
                <span className="text-base font-medium">{f.q}</span>
                <span className="text-muted-foreground faq-indicator">+</span>
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}


export default function Landing() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div>
      <Header />
      <main>
        <Hero />
        <LogoMarquee />
        <Outcomes />
        <UseCases />
        {/* Contact removed */}
        <Process />
        <LogoCloud />
        <FAQ />
      </main>
      {/* Footer rendered globally in RootLayout */}
    </div>
  );
}

