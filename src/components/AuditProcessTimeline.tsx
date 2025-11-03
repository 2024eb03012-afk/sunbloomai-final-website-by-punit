"use client";

import { Timeline } from "./ui/timeline";

export function AuditProcessTimeline() {
  const processData = [
    {
      title: "01",
      content: (
        <div className="space-y-4">
          <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-base">
            We start with a discovery call to understand your business needs, current workflows, and success metrics. This helps us scope the AI agent solution that fits your use case.
          </p>
        </div>
      ),
    },
    {
      title: "02",
      content: (
        <div className="space-y-4">
          <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-base">
            Our team designs a custom playbook and conversation flows tailored to your brand voice, compliance requirements, and integration needs. We build prototypes for rapid testing.
          </p>
        </div>
      ),
    },
    {
      title: "03",
      content: (
        <div className="space-y-4">
          <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-base">
            We deploy your AI agent in a controlled pilot environment. Real-time monitoring and analytics help us iterate and optimize performance before full production launch.
          </p>
        </div>
      ),
    },
    {
      title: "04",
      content: (
        <div className="space-y-4">
          <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-base">
            Once validated, we scale to production with full integrations, compliance guardrails, and ongoing monitoring. Continuous improvements ensure your agent stays effective and aligned with your goals.
          </p>
        </div>
      ),
    },
  ];

  return (
    <section id="process" className="border-t border-[var(--border)]">
      <Timeline data={processData} />
    </section>
  );
}






