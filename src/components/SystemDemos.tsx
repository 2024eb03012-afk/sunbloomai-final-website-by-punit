"use client"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface VideoDemo {
  title: string
  description: string
  videoUrl?: string
  thumbnail?: string
}

const demos: VideoDemo[] = [
  {
    title: "Voice AI Agent",
    description: "Appointment Booking Demo",
    videoUrl: "#", // Replace with actual video URL
  },
  {
    title: "WhatsApp Automation",
    description: "Automation Flow Demo",
    videoUrl: "#", // Replace with actual video URL
  },
  {
    title: "Email Lead Generation",
    description: "Agent Video Demo",
    videoUrl: "#", // Replace with actual video URL
  },
]

export function SystemDemos() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: '#FFF3E0' }}>
      <div className="mx-auto max-w-[1200px] px-5">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-12 text-center">
          How our systems work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {demos.map((demo, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500",
                  hoveredIndex === index
                    ? "shadow-2xl -translate-y-2 scale-[1.02]"
                    : "shadow-lg"
                )}
                style={{
                  boxShadow: hoveredIndex === index
                    ? "0 20px 60px rgba(255, 154, 118, 0.25), 0 8px 20px rgba(0, 0, 0, 0.1)"
                    : "0 8px 24px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
                }}
              >
                {/* Animated border gradient */}
                {hoveredIndex === index && (
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: "linear-gradient(135deg, #FF9A76, #FFB6A3, #FF9A76)",
                      backgroundSize: "200% 200%",
                      animation: "gradientShift 3s ease-in-out infinite",
                      padding: "2px",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "exclude",
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      zIndex: -1,
                    }}
                  />
                )}

                {/* Video container */}
                <div className="relative aspect-video bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 overflow-hidden">
                  {/* Placeholder or video */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center transform transition-transform duration-500 group-hover:scale-110">
                      <div className={cn(
                        "w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#FF9A76]/20 to-[#FFB6A3]/20 flex items-center justify-center transition-all duration-500",
                        hoveredIndex === index && "bg-gradient-to-br from-[#FF9A76]/30 to-[#FFB6A3]/30 scale-110 shadow-lg shadow-[#FF9A76]/20"
                      )}>
                        <svg
                          className={cn(
                            "w-10 h-10 text-[#FF9A76] transition-transform duration-500",
                            hoveredIndex === index && "scale-110"
                          )}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p className="text-sm text-muted-foreground font-medium">Video Demo</p>
                    </div>
                  </div>

                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: "radial-gradient(circle at 2px 2px, #FF9A76 1px, transparent 0)",
                      backgroundSize: "24px 24px",
                    }} />
                  </div>

                  {/* Hover overlay */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500",
                      hoveredIndex === index && "opacity-100"
                    )}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {demo.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {demo.description}
                  </p>
                </div>

                {/* Shine effect */}
                <div
                  className={cn(
                    "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000",
                    hoveredIndex === index && "translate-x-full"
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

