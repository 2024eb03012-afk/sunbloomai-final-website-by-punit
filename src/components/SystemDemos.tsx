"use client"

import { cn } from "@/lib/utils"

interface DemoPost {
  title: string
  iframeSrc: string
  height?: string
}

const posts: DemoPost[] = [
  {
    title: "This AI System Runs Your Meta Ads Agency on Autopilot",
    iframeSrc: "https://www.youtube.com/embed/VGgTURKa8nw?rel=0&showinfo=0",
  },
  {
    title: "Recruitment AI system",
    iframeSrc: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7447308993078722560?compact=1",
    height: "399"
  },
  {
    title: "Recruitment Agency Manual Work on Autopilot",
    iframeSrc: "https://www.youtube.com/embed/kTWFafYt4vk?rel=0&showinfo=0",
  },
  {
    title: "Screening CVs on Autopilot",
    iframeSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:7444647634025406464?collapsed=1",
    height: "670"
  },
  {
    title: "Fashion Ads Generator Agent",
    iframeSrc: "https://www.youtube.com/embed/9ssgEMQ8ing?rel=0&showinfo=0",
  },
  {
    title: "Custom AI powered software solutions",
    iframeSrc: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7439968604646916098?compact=1",
    height: "399"
  },
  {
    title: "Thumbnail maker AI agent",
    iframeSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:7414341132660224001?collapsed=1",
    height: "670"
  },
  {
    title: "Recruitment Candidate Screening Agent",
    iframeSrc: "https://www.youtube.com/embed/LKn2eBfdnvc?rel=0&showinfo=0",
  },
  {
    title: "Hyperpersonalize lead gen + outreach automation",
    iframeSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:7412502398109315072?collapsed=1",
    height: "670"
  },
  {
    title: "Appointment Reminder Voice Agent",
    iframeSrc: "https://www.youtube.com/embed/zeauVZL00H8?rel=0&showinfo=0",
  }
]

export function SystemDemos() {
  return (
    <section className="py-12 md:py-20 relative overflow-hidden" style={{ backgroundColor: '#FFF3E0' }}>
      <div className="mx-auto max-w-[1200px] px-5 relative z-10">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-wide mb-12 text-center text-gray-900">
          See our systems in{" "}
          <span className="bg-[linear-gradient(120deg,#FF6B35,#E65100,#FF6B35)] bg-clip-text text-transparent bg-[length:200%_200%] animate-[aurora-shift_7s_ease-in-out_infinite] font-bold">
            ACTION
          </span>
        </h2>
        
        {/* Masonry Layout for varying height embedded posts */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 w-full">
          {posts.map((post, index) => {
            const isYouTube = post.iframeSrc.includes("youtube.com");
            
            return (
              <div
                key={index}
                className="break-inside-avoid group relative rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden hover:shadow-[0_20px_40px_rgba(255,154,118,0.15)] transition-all duration-300 flex flex-col"
              >
                {/* Title Header */}
                <div className="px-5 py-4 border-b border-gray-50 bg-gradient-to-r from-gray-50 to-white">
                  <h3 className="text-base font-bold text-gray-900 leading-tight">
                    {post.title}
                  </h3>
                </div>
                
                {/* Iframe Container */}
                <div className="w-full bg-white relative flex-1">
                  <iframe
                    src={post.iframeSrc}
                    className={cn("w-full transition-opacity duration-300", isYouTube && "aspect-video")}
                    style={!isYouTube && post.height ? { height: `${post.height}px` } : undefined}
                    frameBorder="0"
                    allowFullScreen
                    title={post.title}
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
