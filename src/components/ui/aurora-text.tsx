"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

type AuroraTextProps = {
  words: string[]
  intervalMs?: number
  className?: string
}

export function AuroraText({
  words,
  intervalMs = 3200,
  className,
}: AuroraTextProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (words.length <= 1) return
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [intervalMs, words.length])

  return (
    <span
      className={cn(
        "aurora-text-gradient inline-flex items-center bg-[linear-gradient(120deg,#60a5fa,#a855f7,#f472b6,#f97316,#60a5fa)] bg-clip-text text-transparent",
        className
      )}
    >
      {words[index] ?? ""}
    </span>
  )
}

