"use client"

import { motion } from "framer-motion"

interface Resource {
  title: string
  category: string
  description: string
  link: string
  icon: string
  color: string
}

const resources: Resource[] = [
  {
    title: "AI Implementation Playbook",
    category: "Guide",
    description: "A step-by-step guide to planning and deploying your first AI voice agent without any technical background.",
    link: "#",
    icon: "📖",
    color: "from-blue-100 to-blue-50"
  },
  {
    title: "ROI Calculator for Voice Bots",
    category: "Tool",
    description: "Calculate exactly how much you can save and the ROI you'll achieve by automating your call center.",
    link: "#",
    icon: "📐",
    color: "from-emerald-100 to-emerald-50"
  },
  {
    title: "Top 5 Automation Case Studies",
    category: "Research",
    description: "See how we scaled agencies and traditional businesses to 100K+ revenue effortlessly using AI systems.",
    link: "#",
    icon: "📈",
    color: "from-purple-100 to-purple-50"
  },
  {
    title: "The Prompt Engineering Guide",
    category: "Cheat Sheet",
    description: "Learn how to write the perfect prompts to get exactly what you need out of large language models.",
    link: "#",
    icon: "✨",
    color: "from-amber-100 to-amber-50"
  }
]

export function Resources() {
  return (
    <section id="resources" className="py-20 relative overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-[#FF9A76]/5 to-transparent rounded-full blur-[100px] -z-10" />
      
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-4"
          >
            Free Resources
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Everything you need to understand, plan, and deploy autonomous AI agents for your business workflows.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((res, idx) => (
            <motion.a 
              href={res.link} 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="group block h-full"
            >
              <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 h-full flex flex-col relative overflow-hidden transition-all duration-300 group-hover:shadow-[0_20px_40px_rgba(255,154,118,0.15)] group-hover:border-[#FF9A76]/30">
                
                {/* Subtle gradient corner */}
                <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full bg-gradient-to-br ${res.color} opacity-50 blur-2xl transition-transform duration-500 group-hover:scale-150`} />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl mb-6 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform duration-300">
                    {res.icon}
                  </div>
                  
                  <div className="text-[10px] uppercase tracking-widest font-bold text-[#FF9A76] mb-3">
                    {res.category}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                    {res.title}
                  </h3>
                  
                  <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-1">
                    {res.description}
                  </p>
                  
                  <div className="mt-auto flex items-center text-sm font-semibold text-gray-900 group-hover:text-[#FF9A76] transition-colors">
                    Download
                    <svg className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
