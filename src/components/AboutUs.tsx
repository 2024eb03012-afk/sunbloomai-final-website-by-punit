"use client"

import Image from "next/image"

interface Founder {
  name: string;
  title: string;
  description: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  imageUrl?: string;
}

const founders: Founder[] = [
  {
    name: "Anmol Malik",
    title: "Co-Founder",
    description: "Hi, I'm Anmol Malik, pursuing a BS in Computer Science with a specialization in AI/ML. I'm an AI agent developer passionate about building smart solutions using tools like n8n, Vapi, and custom Python-coded agents. With a strong foundation in tech and a creative mindset, I'm actively exploring the startup world. I enjoy content creation on LinkedIn, Medium, and Instagram - sharing insights on AI, entrepreneurship, and personal growth. My interests also include the stock market, science, and philosophy. I'm focused on launching impactful startups, expanding my network, and continuously learning new skills in AI and digital innovation. Let's connect and build something great!",
    linkedinUrl: "https://www.linkedin.com/in/anmolzenquill",
    instagramUrl: "https://www.instagram.com/ai_aur_anmol",
    imageUrl: "/anmol.jpeg",
  },
  {
    name: "Punit Gupta",
    title: "Co-Founder",
    description: "Hi, I'm Punit Gupta - I'm pursuing a B.S. in Computer Science with a specialization in AI/ML from BITS Pilani, and I build powerful AI agents that help businesses automate tasks, save time, and grow faster. I specialize in voice AI agents, WhatsApp bots, email automation, and workflow automation using tools like n8n, OpenAI, Retell AI, and APIs. I share practical tutorials and demos on LinkedIn and Instagram, aiming to help 100+ startups automate their operations by year-end.",
    linkedinUrl: "https://www.linkedin.com/in/punit-kumar-402252287",
    instagramUrl: "https://www.instagram.com/aspirenest0b9",
    imageUrl: "/punit.png",
  },
];

export function AboutUs() {
  return (
    <section id="about-us" className="py-12 md:py-16 relative overflow-hidden" style={{ backgroundColor: '#FFF3E0' }}>
      <div className="mx-auto max-w-[1200px] px-5">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-wide mb-4 text-center text-gray-900">
          About Us
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Meet the team behind Sunbloom AI, dedicated to transforming businesses with intelligent automation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {founders.map((founder, idx) => (
            <div
              key={founder.name}
              className="founder-card reveal relative rounded-2xl bg-white p-8 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)] overflow-hidden"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {/* Photo */}
              <div className="relative z-0 w-24 h-24 rounded-full mx-auto mb-6 overflow-hidden ring-2 ring-[#FF9A76]/20">
                {founder.imageUrl ? (
                  <Image
                    src={founder.imageUrl}
                    alt={founder.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#FF9A76] to-[#FFB6A3] flex items-center justify-center text-white text-2xl font-bold">
                    {founder.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
              </div>
              
              {/* Name and Title */}
              <div className="relative z-0 text-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{founder.name}</h3>
                <p className="text-sm text-muted-foreground">{founder.title}</p>
              </div>
              
              {/* Description */}
              <p className="relative z-0 text-sm text-gray-700 leading-relaxed mb-6 text-center">
                {founder.description}
              </p>
              
              {/* Social Links */}
              <div className="relative z-0 flex items-center justify-center gap-3 pt-4 border-t border-gray-100">
                {founder.linkedinUrl && (
                  <a
                    href={founder.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${founder.name} LinkedIn`}
                    className="social-link group inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-white hover:bg-[#FF9A76] transition-all duration-200 hover:border-[#FF9A76] hover:scale-110"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors"
                    >
                      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4zM8 8h3.8v2.2h.05c.53-1 1.85-2.2 3.8-2.2 4.06 0 4.8 2.67 4.8 6.14V24h-4v-7.06c0-1.68-.03-3.85-2.35-3.85-2.35 0-2.71 1.83-2.71 3.72V24H8z" />
                    </svg>
                  </a>
                )}
                {founder.instagramUrl && (
                  <a
                    href={founder.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${founder.name} Instagram`}
                    className="social-link group inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-white hover:bg-[#FF9A76] transition-all duration-200 hover:border-[#FF9A76] hover:scale-110"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

