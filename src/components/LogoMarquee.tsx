"use client";

import Image from "next/image";

interface Logo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const logos: Logo[] = [
  { src: "/Gemini New 2025.svg", alt: "Gemini", width: 110, height: 40 },
  { src: "/n8n.io.svg", alt: "n8n", width: 95, height: 40 },
  { src: "/OpenAI.svg", alt: "OpenAI", width: 105, height: 40 },
  { src: "/retelllogo.png", alt: "Retell AI", width: 110, height: 40 },
  { src: "/vapi logo.jpeg", alt: "VAPI", width: 75, height: 40 },
  { src: "/heyreach logo.svg", alt: "HeyReach", width: 110, height: 40 },
];

export default function LogoMarquee() {
  return (
    <section className="pt-16 md:pt-20 pb-12 md:pb-16 border-b border-[var(--border)] bg-muted/30">
      <div className="mx-auto max-w-[1400px] px-5">
        <p className="text-center text-sm text-muted-foreground mb-8 font-medium">
          Powered by leading AI platforms
        </p>
        
        <div className="relative overflow-hidden pb-4 mx-auto" style={{ maxWidth: '850px' }}>
          <div className="flex animate-marquee gap-8 md:gap-10">
            {/* First set of logos */}
            {logos.map((logo, idx) => (
              <div
                key={`logo-1-${idx}`}
                className="flex items-center justify-center flex-shrink-0 h-16 px-4"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className={`object-contain transition-all duration-300 opacity-70 hover:opacity-100 ${
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
                className="flex items-center justify-center flex-shrink-0 h-16 px-4"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className={`object-contain transition-all duration-300 opacity-70 hover:opacity-100 ${
                    ["Gemini", "OpenAI", "Retell AI"].includes(logo.alt)
                      ? "brightness-0 invert hover:brightness-0 hover:invert"
                      : "grayscale hover:grayscale-0"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-muted/30 via-muted/30 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-muted/30 via-muted/30 to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
}


