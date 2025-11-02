"use client"

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"

const testimonials = [
  {
    quote: "Sunbloom AI transformed our customer service operations. The voice agent handles 80% of our calls flawlessly, freeing up our team to focus on complex issues.",
    name: "Sarah Chen",
    title: "VP of Operations, TechCorp",
  },
  {
    quote: "The appointment booking agent is incredible. It's like having a full-time scheduler that never sleeps. Our booking rate increased by 42% in the first month.",
    name: "Michael Rodriguez",
    title: "Founder, HealthPlus",
  },
  {
    quote: "We deployed their WhatsApp chatbot across 5 countries. The multilingual support and seamless handoff to human agents has revolutionized our customer experience.",
    name: "Priya Sharma",
    title: "Head of Customer Success, GlobalRetail",
  },
]

export function Testimonials() {
  return (
    <section className="py-12 md:py-16 bg-[#F7F5F0] relative overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-5">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-wide mb-10 text-center text-gray-900">
          What our clients{" "}
          <span className="bg-[linear-gradient(120deg,#4B5563,#6B7280,#4B5563)] bg-clip-text text-transparent bg-[length:200%_200%] animate-[aurora-shift_7s_ease-in-out_infinite] font-bold">
            SAY
          </span>
        </h2>
        <div className="relative">
          <InfiniteMovingCards
            items={testimonials}
          />
        </div>
      </div>
    </section>
  )
}

