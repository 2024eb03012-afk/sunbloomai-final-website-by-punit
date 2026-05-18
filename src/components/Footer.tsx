"use client";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto max-w-[1200px] px-5 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} Sunbloom AI</div>
            <div className="text-sm text-muted-foreground">Built for reliability and ROI.</div>
            <div className="text-sm text-muted-foreground">
              Email us: {" "}
              <a href="mailto:sunbloomai@gmail.com" className="font-medium text-foreground hover:underline">
                sunbloomai@gmail.com
              </a>
            </div>
          </div>
          <div className="flex md:justify-end items-center gap-4">
            <a
              href="https://www.linkedin.com/company/sunbloom-ai/"
              aria-label="Sunbloom AI LinkedIn Company"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border)] bg-muted hover:bg-muted/80 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4zM8 8h3.8v2.2h.05c.53-1 1.85-2.2 3.8-2.2 4.06 0 4.8 2.67 4.8 6.14V24h-4v-7.06c0-1.68-.03-3.85-2.35-3.85-2.35 0-2.71 1.83-2.71 3.72V24H8z" />
              </svg>
            </a>
            <a
              href="https://twitter.com/quillzen"
              aria-label="X (Twitter)"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border)] bg-muted hover:bg-muted/80 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.957l-5.443-6.402L4.01 22H.75l8.063-9.204L1 2h7.043l4.93 5.79L18.244 2zm-1.22 18h2.12L7.08 4h-2.2l12.144 16z" />
              </svg>
            </a>
          </div>
        </div>


      </div>
    </footer>
  );
}

