"use client"

import React, { forwardRef, useRef } from "react"
import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/ui/animated-beam"

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; title: string; description?: string }
>(({ className, children, title, description }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex flex-col items-center justify-center",
        className
      )}
    >
      <div className="flex size-16 items-center justify-center rounded-full border-2 border-[#FF9A76]/30 bg-white p-3 shadow-[0_4px_20px_rgba(255,154,118,0.15)] mb-3 transition-all hover:shadow-[0_6px_24px_rgba(255,154,118,0.25)] hover:border-[#FF9A76]/50">
        <div className="text-[#FF9A76]">
          {children}
        </div>
      </div>
      <div className="text-center">
        <div className="text-base font-semibold text-foreground">{title}</div>
        {description && (
          <div className="text-xs text-muted-foreground mt-2 max-w-[140px] leading-tight">{description}</div>
        )}
      </div>
    </div>
  )
})

Circle.displayName = "Circle"

export function ProcessBeam() {
  const containerRef = useRef<HTMLDivElement>(null)
  const auditRef = useRef<HTMLDivElement>(null)
  const prototypeRef = useRef<HTMLDivElement>(null)
  const deploymentRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="relative flex w-full items-center justify-center overflow-hidden py-6"
      ref={containerRef}
    >
      <div className="flex w-full max-w-5xl flex-row items-center justify-between gap-12 md:gap-16">
        <Circle ref={auditRef} title="AI Audit" description="We audit your business to map out the highest ROI AI implementations">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </Circle>

        <Circle ref={prototypeRef} title="Prototype" description="We prototype your AI system before the project and define the scope">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </Circle>

        <Circle ref={deploymentRef} title="Deployment" description="We deploy our AI system and test it rigorously on real world benchmarks">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="M22 4L12 14.01l-3-3" />
          </svg>
        </Circle>
      </div>

      <AnimatedBeam
        duration={3}
        delay={0}
        containerRef={containerRef}
        fromRef={auditRef}
        toRef={prototypeRef}
        curvature={-50}
        pathColor="#FF9A76"
        pathWidth={2}
        pathOpacity={0.2}
        gradientStartColor="#FF9A76"
        gradientStopColor="#FFB6A3"
      />
      <AnimatedBeam
        duration={3}
        delay={1.5}
        containerRef={containerRef}
        fromRef={prototypeRef}
        toRef={deploymentRef}
        curvature={-50}
        pathColor="#FF9A76"
        pathWidth={2}
        pathOpacity={0.2}
        gradientStartColor="#FF9A76"
        gradientStopColor="#FFB6A3"
      />
    </div>
  )
}

