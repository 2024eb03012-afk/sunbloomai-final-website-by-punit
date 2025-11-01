"use client";

import Image from "next/image";

interface Logo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const logos: Logo[] = [
  { src: "/Gemini New 2025.svg", alt: "Gemini", width: 85, height: 32 },
  { src: "/n8n.io.svg", alt: "n8n", width: 75, height: 32 },
  { src: "/OpenAI.svg", alt: "OpenAI", width: 80, height: 32 },
  { src: "/retelllogo.png", alt: "Retell AI", width: 85, height: 32 },
  { src: "/vapi logo.jpeg", alt: "VAPI", width: 60, height: 32 },
  { src: "/heyreach logo.svg", alt: "HeyReach", width: 85, height: 32 },
  { src: "/vercel.svg", alt: "Vercel", width: 50, height: 32 },
];

export default function LogoMarquee() {
  return (
    <section className="py-8 md:py-10 border-b border-[var(--border)] bg-muted/30">
      <div className="mx-auto max-w-[1200px] px-5">
        <p className="text-center text-sm text-muted-foreground mb-6">
          Powered by leading AI platforms
        </p>
        
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee gap-5 md:gap-6">
            {/* First set of logos */}
            {logos.map((logo, idx) => (
              <div
                key={`logo-1-${idx}`}
                className="flex items-center justify-center flex-shrink-0 h-12"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className={`object-contain transition-all duration-300 ${
                    ["Gemini", "OpenAI", "Retell AI"].includes(logo.alt)
                      ? "brightness-0 invert hover:brightness-0 hover:invert"
                      : "grayscale hover:grayscale-0"
                  }`}
                />
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {logos.map((logo, idx) => (
              <div
                key={`logo-2-${idx}`}
                className="flex items-center justify-center flex-shrink-0 h-12"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className={`object-contain transition-all duration-300 ${
                    ["Gemini", "OpenAI", "Retell AI"].includes(logo.alt)
                      ? "brightness-0 invert hover:brightness-0 hover:invert"
                      : "grayscale hover:grayscale-0"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-muted/30 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-muted/30 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
