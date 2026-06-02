"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";
import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  FolderArchive,
  Sparkles,
  Terminal,
} from "lucide-react";

type ResourceFile = {
  _id?: string;
  label: string;
  description: string;
  filename?: string;
  url?: string | null;
};

type LeadMagnet = {
  _id?: string;
  slug: string;
  headline: string;
  tagText: string;
  subtext: string;
  bodyText: string;
  iconKey: string;
  heroImageUrl?: string | null;
  displayOnTop?: boolean;
  displayOnSunbloomWebsite?: boolean;
  files: ResourceFile[];
};

const CONVEX_URL =
  process.env.NEXT_PUBLIC_CONVEX_URL ?? "https://rare-loris-465.convex.cloud";
const FREE_RESOURCE_BASE_URL =
  process.env.NEXT_PUBLIC_FREE_RESOURCE_BASE_URL ?? "https://luke.sunbloomai.com/free-resource";

const iconMap = {
  folder: FolderArchive,
  terminal: Terminal,
  file: FileText,
  sparkles: Sparkles,
  book: BookOpen,
  download: Download,
};

function queryRef(name: string) {
  return makeFunctionReference<"query">(name);
}

function ResourceIcon({ iconKey, className = "h-5 w-5" }: { iconKey: string; className?: string }) {
  const Icon = iconMap[iconKey as keyof typeof iconMap] ?? FileText;
  return <Icon className={className} strokeWidth={2.2} />;
}

function resourceChips(resource: LeadMagnet) {
  const fileCount = resource.files.length;
  const chips = [
    `${fileCount} file${fileCount === 1 ? "" : "s"}`,
    "Uses AI",
    ...resource.files.map((file) => file.label).filter(Boolean),
  ];
  const unique = Array.from(new Set(chips));
  return unique.slice(0, 3);
}

export function Resources() {
  const [resources, setResources] = useState<LeadMagnet[]>([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadResources() {
      try {
        const client = new ConvexHttpClient(CONVEX_URL);
        const list = await client.query(queryRef("leadMagnets:listSunbloomResources"), {});

        if (cancelled) return;

        const merged = Array.isArray(list) ? (list.filter(Boolean) as LeadMagnet[]) : [];

        setResources(merged);
      } catch (error) {
        console.error("Failed to load lead magnets", error);
        if (!cancelled) setResources([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadResources();

    return () => {
      cancelled = true;
    };
  }, []);

  const showArrowNav = resources.length > 4;

  const updateScrollState = () => {
    const rail = railRef.current;
    if (!rail) return;

    const maxScrollLeft = rail.scrollWidth - rail.clientWidth - 4;
    setCanScrollLeft(rail.scrollLeft > 8);
    setCanScrollRight(rail.scrollLeft < maxScrollLeft);
  };

  useEffect(() => {
    updateScrollState();
    const rail = railRef.current;
    if (!rail) return;

    rail.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      rail.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [resources.length]);

  const scrollByCard = (direction: "left" | "right") => {
    const rail = railRef.current;
    if (!rail) return;

    const card = rail.querySelector<HTMLElement>("[data-resource-card='true']");
    const amount = card ? card.offsetWidth + 24 : rail.clientWidth * 0.85;
    rail.scrollBy({ left: direction === "right" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <section id="resources" className="relative scroll-mt-28 overflow-hidden bg-white py-14 md:py-16">
      <div className="mx-auto max-w-[1180px] px-5">
        <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#FF6B1A]">
              Free resources
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-gray-950 md:text-3xl">
              Practical AI guides from Sunbloom.
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Short, useful downloads for setup, systems, and agent workflows.
            </p>
          </div>

          <Link
            href={FREE_RESOURCE_BASE_URL}
            className="inline-flex h-10 items-center gap-2 self-start rounded-lg border border-[#FFB6A3]/70 bg-white px-3.5 text-sm font-semibold text-gray-950 transition hover:-translate-y-0.5 hover:border-[#FF9A76] hover:bg-[#FFF3E0]/60"
          >
            View all resources
            <ArrowRight className="h-4 w-4" strokeWidth={2.3} />
          </Link>
        </div>

        <div className="relative">
          {showArrowNav ? (
            <>
              <button
                type="button"
                aria-label="Previous resources"
                onClick={() => scrollByCard("left")}
                disabled={!canScrollLeft}
                className="absolute left-0 top-1/2 z-10 hidden h-9 w-9 -translate-x-3 -translate-y-1/2 items-center justify-center rounded-full border border-[#FFB6A3]/50 bg-white text-gray-900 shadow-sm transition disabled:cursor-not-allowed disabled:opacity-35 lg:flex"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next resources"
                onClick={() => scrollByCard("right")}
                disabled={!canScrollRight}
                className="absolute right-0 top-1/2 z-10 hidden h-9 w-9 translate-x-3 -translate-y-1/2 items-center justify-center rounded-full border border-[#FFB6A3]/50 bg-white text-gray-900 shadow-sm transition disabled:cursor-not-allowed disabled:opacity-35 lg:flex"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          ) : null}

          <div
            ref={railRef}
            className="flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={`resource-skeleton-${index}`}
                    className="min-w-[82%] snap-start overflow-hidden rounded-xl border border-[#FFB6A3]/20 bg-white shadow-[0_10px_28px_rgba(28,28,28,0.04)] sm:min-w-[320px] lg:min-w-[280px] xl:min-w-[260px]"
                  >
                    <div className="h-24 animate-pulse bg-[#FFF3E0]" />
                    <div className="space-y-3 p-4">
                      <div className="h-3 w-20 rounded-full bg-gray-100" />
                      <div className="h-4 w-4/5 rounded-full bg-gray-100" />
                      <div className="flex gap-2">
                        <div className="h-7 w-20 rounded-full bg-gray-100" />
                        <div className="h-7 w-24 rounded-full bg-gray-100" />
                      </div>
                    </div>
                  </div>
                ))
              : resources.map((resource, index) => {
              const resourceHref = `${FREE_RESOURCE_BASE_URL}/${resource.slug}`;
              const chips = resourceChips(resource);

              return (
                <motion.article
                  data-resource-card="true"
                  key={resource.slug}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.06, duration: 0.35 }}
                  className="group min-w-[82%] snap-start sm:min-w-[320px] lg:min-w-[280px] xl:min-w-[260px]"
                >
                  <Link
                    href={resourceHref}
                    className="flex h-[344px] flex-col overflow-hidden rounded-xl border border-[#FFB6A3]/30 bg-white shadow-[0_10px_28px_rgba(28,28,28,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-[#FFB6A3] hover:shadow-[0_16px_34px_rgba(255,154,118,0.12)]"
                  >
                    <div className="relative h-[104px] shrink-0 overflow-hidden bg-linear-to-br from-[#FFF3E0] via-white to-[#FFE4D8]">
                      {resource.heroImageUrl ? (
                        <Image
                          src={resource.heroImageUrl}
                          alt={resource.headline}
                          fill
                          sizes="(max-width: 640px) 82vw, 320px"
                          className="object-contain p-2 transition duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[#bf623f]">
                          <ResourceIcon iconKey={resource.iconKey} className="h-6 w-6" />
                        </div>
                      )}
                      <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-800 backdrop-blur">
                        <ResourceIcon iconKey={resource.iconKey} className="h-3.5 w-3.5" />
                        {resource.displayOnTop ? "Featured" : "Resource"}
                      </div>
                    </div>

                    <div className="flex min-h-0 flex-1 flex-col p-4">
                      <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6B1A]">
                        {resource.tagText}
                      </div>
                      <h3 className="line-clamp-3 min-h-[78px] text-lg font-bold leading-snug text-gray-950">
                        {resource.headline}
                      </h3>

                      <div className="mt-3 flex min-h-[58px] flex-wrap content-start gap-2">
                        {chips.map((chip) => (
                          <span key={chip} className="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-medium text-gray-700">
                            {chip}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-4">
                        <span className="text-sm font-semibold text-gray-950 transition group-hover:text-[#FF6B1A]">
                          Download or read
                        </span>
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFF3E0] text-[#FF6B1A] transition group-hover:bg-[#FF9A76] group-hover:text-white">
                          <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>

        {!loading && resources.length === 0 ? <p className="mt-4 text-sm text-muted-foreground">No resources are enabled for this section yet.</p> : null}
      </div>
    </section>
  );
}
