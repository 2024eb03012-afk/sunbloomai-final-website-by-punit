import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "text";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: "md" | "sm";
  className?: string;
  arrow?: boolean;
};

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

/** Single button language for the whole site. Renders <Link> for internal routes. */
export function ButtonLink({ href, children, variant = "primary", size = "md", className, arrow = true }: Props) {
  const classes = cn(
    variant === "text" ? "link-arrow" : ["btn", variant === "primary" ? "btn-primary" : "btn-outline", size === "sm" && "btn-sm"],
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      {arrow ? <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} /> : null}
    </>
  );

  if (isExternal(href)) {
    const newTab = href.startsWith("http");
    return (
      <a href={href} className={classes} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
