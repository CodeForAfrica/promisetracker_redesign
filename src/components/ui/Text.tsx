import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small uppercase metadata line: "GOVERNOR · NAIROBI COUNTY". */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("text-[10px] leading-[1.3] font-medium tracking-[.1em] text-muted uppercase", className)}>{children}</div>;
}

/** Joins metadata parts with the prototype's spaced middle dot. */
export function Dots({ parts }: { parts: ReactNode[] }) {
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>
          {i > 0 && <span aria-hidden="true">{"\u00a0\u00a0·\u00a0\u00a0"}</span>}
          {p}
        </span>
      ))}
    </>
  );
}

/** Section label with an optional top rule. */
export function SectionLabel({
  children,
  rule = false,
  className,
  as: As = "h2",
}: {
  children: ReactNode;
  rule?: boolean;
  className?: string;
  as?: "h2" | "h3" | "p";
}) {
  return (
    <As
      className={cn(
        "mb-6 text-[12px] leading-none font-semibold tracking-[.18em] text-ink uppercase",
        rule && "border-t border-line pt-4",
        className,
      )}
    >
      {children}
    </As>
  );
}

export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mb-2.5 text-[10px] leading-none font-semibold tracking-[.14em] text-muted uppercase", className)}>{children}</div>;
}

export function ArrowLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("text-[12.5px] leading-normal font-medium tracking-[.03em] text-link hover:opacity-70", className)}>
      {children}
    </Link>
  );
}
