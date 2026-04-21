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
  { src: "/claude.webp", alt: "Claude", width: 105, height: 40 },
  { src: "/n8n.io.svg", alt: "n8n", width: 95, height: 40 },
  { src: "/OpenAI.svg", alt: "OpenAI", width: 105, height: 40 },
  { src: "/retelllogo.png", alt: "Retell AI", width: 110, height: 40 },
  { src: "/vapi logo.jpeg", alt: "VAPI", width: 75, height: 40 },
  { src: "/heyreach logo.svg", alt: "HeyReach", width: 110, height: 40 },
];

export default function LogoMarquee() {
  return (
    <section className="pt-6 md:pt-8 pb-6 md:pb-8" style={{ backgroundColor: '#FFF3E0' }}>
      <div className="mx-auto max-w-[1400px] px-5">
        <p className="text-center text-sm text-muted-foreground mb-4 font-medium">
          Powered by leading AI platforms
        </p>
        
        <div className="relative overflow-hidden mx-auto rounded-lg py-2" style={{ maxWidth: '600px', backgroundColor: '#FFF3E0' }}>
          <div className="flex animate-marquee gap-6 md:gap-8">
            {/* First set of logos */}
            {logos.map((logo, idx) => (
              <div
                key={`logo-1-${idx}`}
                className="flex items-center justify-center flex-shrink-0 h-6 px-3"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className={`object-contain transition-all duration-300 opacity-70 hover:opacity-100 ${
                    logo.alt === "VAPI" || logo.alt === "Claude"
                      ? "grayscale hover:grayscale-0"
                      : "brightness-0"
                  }`}
                />
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {logos.map((logo, idx) => (
              <div
                key={`logo-2-${idx}`}
                className="flex items-center justify-center flex-shrink-0 h-6 px-3"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className={`object-contain transition-all duration-300 opacity-70 hover:opacity-100 ${
                    logo.alt === "VAPI" || logo.alt === "Claude"
                      ? "grayscale hover:grayscale-0"
                      : "brightness-0"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute inset-y-0 left-0 w-12 md:w-16 bg-gradient-to-r from-[#FFF3E0] via-[#FFF3E0] to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-12 md:w-16 bg-gradient-to-l from-[#FFF3E0] via-[#FFF3E0] to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
}


