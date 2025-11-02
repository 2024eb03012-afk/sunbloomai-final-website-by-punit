"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

type AuroraTextWord = string | { text: string; bold?: boolean }

type AuroraTextProps = {
  words: AuroraTextWord[]
  intervalMs?: number
  className?: string
  bold?: boolean
}

export function AuroraText({
  words,
  intervalMs = 3200,
  className,
  bold = false,
}: AuroraTextProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (words.length <= 1) return
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [intervalMs, words.length])

  const currentWord = words[index]
  const wordText = typeof currentWord === 'string' ? currentWord : currentWord.text
  const wordBold = typeof currentWord === 'object' ? currentWord.bold : undefined
  const isBold = wordBold !== undefined ? wordBold : bold

  return (
    <span
      className={cn(
        "aurora-text-gradient inline-flex items-center bg-[linear-gradient(120deg,#FF9A76,#FFB6A3,#FF9A76,#FFB6A3,#FF9A76)] bg-clip-text text-transparent",
        isBold && "font-bold",
        className
      )}
    >
      {wordText}
    </span>
  )
}

