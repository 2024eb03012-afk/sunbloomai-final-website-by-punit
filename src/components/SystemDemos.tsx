"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface VideoDemo {
  title: string
  description: string
  videoUrl?: string
  thumbnail?: string
}

const demos: VideoDemo[] = [
  {
    title: "Fashion Ads Generator Agent",
    description: "AI-powered fashion advertisement creation",
    videoUrl: "https://youtu.be/9ssgEMQ8ing",
  },
  {
    title: "Recruitment Candidate Screening Agent",
    description: "Intelligent candidate evaluation and screening",
    videoUrl: "https://youtu.be/LKn2eBfdnvc",
  },
  {
    title: "Appointment Reminder Voice Agent",
    description: "Automated voice reminders and scheduling",
    videoUrl: "https://www.youtube.com/watch?v=zeauVZL00H8",
  },
]

const getEmbedUrl = (url?: string) => {
  if (!url) return null
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace("www.", "")
    if (host === "youtu.be") {
      const id = parsed.pathname.replace("/", "")
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : null
    }
    if (host.includes("youtube.com")) {
      const id = parsed.searchParams.get("v")
      if (id) {
        return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
      }
    }
  } catch (error) {
    return url
  }
  return url
}

const getVideoId = (url?: string) => {
  if (!url) return null
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace("www.", "")
    if (host === "youtu.be") {
      const id = parsed.pathname.replace("/", "")
      return id
    }
    if (host.includes("youtube.com")) {
      const id = parsed.searchParams.get("v")
      return id
    }
  } catch (error) {
    return null
  }
  return null
}

const getThumbnailUrl = (videoId: string) => {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}

export function SystemDemos() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeDemoIndex, setActiveDemoIndex] = useState<number | null>(null)
  const activeDemo = activeDemoIndex !== null ? demos[activeDemoIndex] : null
  const embedUrl = activeDemo?.videoUrl ? getEmbedUrl(activeDemo.videoUrl) : null

  useEffect(() => {
    if (!activeDemo) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [activeDemo])

  return (
    <section className="py-12 md:py-16" style={{ backgroundColor: '#FFF3E0' }}>
      <div className="mx-auto max-w-[1200px] px-5">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-wide mb-10 text-center">
          See our systems in{" "}
          <span className="bg-[linear-gradient(120deg,#FF6B35,#E65100,#FF6B35)] bg-clip-text text-transparent bg-[length:200%_200%] animate-[aurora-shift_7s_ease-in-out_infinite] font-bold">
            ACTION
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <div
                  className="relative aspect-video overflow-hidden cursor-pointer"
                  onClick={() => demo.videoUrl && setActiveDemoIndex(index)}
                >
                  {/* YouTube thumbnail */}
                  {(() => {
                    const videoId = getVideoId(demo.videoUrl)
                    const thumbnailUrl = videoId ? getThumbnailUrl(videoId) : null

                    return thumbnailUrl ? (
                      <img
                        src={thumbnailUrl}
                        alt={`${demo.title} thumbnail`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      // Fallback to grey background if no thumbnail available
                      <div className="w-full h-full bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200" />
                    )
                  })()}

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center transform transition-transform duration-500 group-hover:scale-110">
                      <div className={cn(
                        "w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#FF9A76]/20 to-[#FFB6A3]/20 flex items-center justify-center transition-all duration-500",
                        hoveredIndex === index && "bg-gradient-to-br from-[#FF9A76]/30 to-[#FFB6A3]/30 scale-110 shadow-lg shadow-[#FF9A76]/20"
                      )}>
                        <svg
                          className={cn(
                            "w-8 h-8 text-[#FF9A76] transition-transform duration-500",
                            hoveredIndex === index && "scale-110"
                          )}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p className="text-xs text-muted-foreground font-medium">Watch Demo</p>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500",
                      hoveredIndex === index && "opacity-100"
                    )}
                  />

                  {/* Click hint */}
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                      Click to watch
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-semibold text-foreground mb-1.5">
                    {demo.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
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
      {activeDemo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-10"
          onClick={() => setActiveDemoIndex(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-[0_20px_60px_rgba(0,0,0,0.35)] aspect-video"
            onClick={(event) => event.stopPropagation()}
          >
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={activeDemo.title}
                className="h-full w-full aspect-video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-white text-sm">
                Unable to load this video.
              </div>
            )}
            <button
              type="button"
              onClick={() => setActiveDemoIndex(null)}
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow-md transition hover:bg-white"
              aria-label="Close video"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

