"use client";

import { useEffect, useRef, useState, useId } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import Link from "next/link";
// Logo will be referenced directly from public directory
import { Poppins } from "next/font/google";
import LogoMarquee from "../components/LogoMarquee";
import { RetroGrid } from "@/components/ui/retro-grid";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import { AuroraText } from "@/components/ui/aurora-text";
import { ProcessBeam } from "../components/ProcessBeam";
import { SystemDemos } from "../components/SystemDemos";
import { Testimonials } from "../components/Testimonials";
import { AboutUs } from "../components/AboutUs";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { AvatarCircles } from "@/components/ui/avatar-circles";

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
        atTop ? "bg-gradient-to-r from-white/90 to-white/80 backdrop-blur-2xl backdrop-saturate-150 rounded-full mx-6 mt-6" : "bg-gradient-to-r from-white/90 to-white/80 backdrop-blur-2xl backdrop-saturate-150 rounded-full mx-6 mt-6"
      }`}
      style={{
        boxShadow: atTop
          ? '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          : '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
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
  const communityAvatars = [
    { imageUrl: "/randomperson1_icon.png", profileUrl: "" },
    { imageUrl: "/randomperson2_icon.png", profileUrl: "" },
    { imageUrl: "/randomperson3_icon.png", profileUrl: "" },
  ];
  const [idx, setIdx] = useState(0);
  const [spot, setSpot] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const reduceMotion = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % outcomes.length), 4000);
    return () => clearInterval(id);
  }, [outcomes.length]);

  return (
    <section
      className="relative -mt-16 pt-6 overflow-hidden"
      onMouseMove={(e) => {
        if (reduceMotion) return;
        const r = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        setSpot({ x, y });
      }}
      style={{
        background: `radial-gradient(480px circle at ${spot.x}% ${spot.y}%, rgba(255, 154, 118, 0.08), transparent 45%)`,
      }}
    >
      <RetroGrid className="opacity-30" />
      <div className="mx-auto max-w-[1200px] px-5 py-13 md:py-16 lg:py-18 relative z-10">
        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-6 max-w-4xl text-center reveal">
            <div className="inline-flex items-center justify-center gap-3 rounded-full border border-[var(--border)] px-3 py-1 text-xs text-muted-foreground">
              <AvatarCircles avatarUrls={communityAvatars} numPeople="50K" />
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              Trusted by 50K+ AI Learners
            </div>
            <LineShadowText
              as="h1"
              className={`${poppins.className} text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight whitespace-nowrap`}
            >
              You still don&apos;t have AI Agents
            </LineShadowText>
            <div className="flex items-center justify-center gap-3 -mt-2">
              <AuroraText
                className="text-[1.8rem] leading-tight md:text-[2.6rem] lg:text-[3.2rem] whitespace-nowrap"
                bold={true}
                words={[
                  "Bulk calling your List",
                  "Screening your Candidates",
                  "Doing Email Lead Generation",
                  "Doing Cold Calls",
                  "Doing Appointment Bookings",
                ]}
              />
              <span className="text-[1.8rem] font-bold leading-tight md:text-[2.6rem] lg:text-[3.2rem]">?</span>
            </div>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              We build Premium AI agents that work the way your team does and drives revenue for your business. Solving Real Business Problems. With Real AI Employees.
            </p>
            <div className="w-full flex justify-center">
              <RainbowButton
                asChild
                size="lg"
                variant="default"
                className="rainbow-button-solid h-14 px-10 text-lg font-semibold rounded-lg text-white hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <a
                  href="https://calendly.com/anmol-sunbloomai/30min"
                  onClick={openCalendlyPopup}
                  rel="noopener noreferrer"
                >
                  Book a strategy call
                </a>
              </RainbowButton>
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

function UseCases() {
  const services = [
    {
      title: "Custom AI Calling Voice Agents",
      desc: "We build inbound and outbound AI voice agents tailored to your business needs — designed to handle customer conversations just like a real human agent.",
      details: "Our custom voice agents are built specifically for your industry and use case. They handle conversations naturally, adapt to customer responses, and integrate seamlessly with your existing systems.",
      tag: "Voice AI",
      highlights: [
        "Real Estate: Automated lead follow-up system that calls and nurtures potential buyers",
        "Solar Industry: Outbound lead follow-up to increase conversion and engagement",
        "Tailored to your business needs with natural human-like conversations",
        "Handles both inbound and outbound calls with intelligent routing",
      ],
    },
    {
      title: "Appointment Booking Voice Agent",
      desc: "Let your customers book appointments through voice — no manual work required.",
      details: "Our AI agent connects directly with your CRM and calendar, schedules appointments automatically, and sends email confirmations to your customers in real time.",
      tag: "Scheduling",
      highlights: [
        "Direct integration with your CRM and calendar systems",
        "Automatic appointment scheduling without manual intervention",
        "Real-time email confirmations sent to customers instantly",
        "Handles reschedules and cancellations seamlessly",
      ],
    },
    {
      title: "AI Chatbot Solutions",
      desc: "Engage visitors across platforms with smart, conversational AI chatbots.",
      details: "Deploy intelligent chatbots that understand context, answer questions, and handle requests across multiple channels — from your website to WhatsApp.",
      tag: "Messaging",
      highlights: [
        "Website Voicebot: Acts like your 24/7 receptionist — answers questions, shares details, and books appointments",
        "FAQ Chatbot: Handles customer queries instantly with company-trained responses",
        "WhatsApp Chatbot: Trained on your business knowledge base to manage inquiries, appointments, and support requests directly on WhatsApp",
        "Multi-platform deployment with consistent brand voice",
      ],
    },
    {
      title: "Recruitment Screening Voice Agent",
      desc: "Automate your hiring process with an AI agent that makes bulk outbound calls to candidates, asks screening questions, records answers, and automatically updates your CRM or Excel database.",
      details: "Save hours of HR time by automating candidate screening. Our voice agent conducts interviews, evaluates responses, and updates your database automatically — freeing your team to focus on final interviews and hiring decisions.",
      tag: "Talent AI",
      highlights: [
        "Bulk outbound calls to multiple candidates simultaneously",
        "Asks screening questions and records candidate answers",
        "Automatically updates your CRM or Excel database",
        "Saves hours of HR time on manual screening work",
      ],
    },
    {
      title: "Lead Generation & Outreach Automation",
      desc: "Scrape LinkedIn and company info to auto-create hyper-personalized email messages. Send each lead recent company news and unique, context-rich messages automatically.",
      details: "Fully automate your outreach process with AI-powered personalization. Our system researches each lead, creates customized messages based on recent company news, and sends them automatically — boosting responses and lead engagement.",
      tag: "Revenue",
      highlights: [
        "Scrapes LinkedIn and company information automatically",
        "Auto-creates hyper-personalized email messages for each lead",
        "Includes recent company news and context-rich content",
        "Fully automated outreach boosting responses and lead engagement",
      ],
    },
    {
      title: "Fashion & UGC Ads Automation",
      desc: "Turn your raw product images into high-performing ad creatives — instantly. Generate both image and video ads in ready-to-run formats designed for platforms like Meta, Google, and TikTok.",
      details: "Perfect for e-commerce, fashion, and beauty brands. Transform your product photos into professional ad creatives that are optimized for each platform's best practices and ready to launch immediately.",
      tag: "Creative AI",
      highlights: [
        "Instantly converts raw product images into high-performing ad creatives",
        "Generates both image and video ads in ready-to-run formats",
        "Optimized for Meta, Google, and TikTok platforms",
        "Perfect for e-commerce, fashion, and beauty brands",
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
    <section id="use-cases" className="bg-[#F7F5F0]">
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
                    className="mt-4 text-lg font-bold text-foreground"
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <span className="inline-block rounded-lg bg-gradient-to-r from-[#FFE4D1] via-[#FFD8C2] to-[#FFCAB3] px-3 py-1 shadow-sm">
                      {service.title}
                    </span>
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
                  className="service-modal-title font-bold"
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <span className="inline-block rounded-xl bg-gradient-to-r from-[#FFE4D1] via-[#FFD8C2] to-[#FFCAB3] px-4 py-1.5 shadow-sm">
                    {activeService.title}
                  </span>
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
  return (
    <section id="process">
      <div className="mx-auto max-w-[1200px] px-5 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8 text-center">How it works</h2>
        <ProcessBeam />
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
    {
      q: "Can you make HIPAA compliant agents?",
      a: "Yes. We can do support HIPAA compliant voice agents.",
    },
  ];
  return (
    <section id="faq">
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
        <UseCases />
        {/* Contact removed */}
        <Process />
        <SystemDemos />
        <Testimonials />
        <AboutUs />
        <FAQ />
      </main>
      {/* Footer rendered globally in RootLayout */}
    </div>
  );
}

