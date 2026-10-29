import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Native disclosure row: "What is a promise on this site?  +" */
export function Disclosure({ summary, children, className }: { summary: string; children: ReactNode; className?: string }) {
  return (
    <details className={cn("group", className)}>
      <summary className="flex cursor-pointer list-none items-center gap-2.5 py-[13px] text-[13px] leading-[1.4] font-medium [&::-webkit-details-marker]:hidden">
        <span>{summary}</span>
        <span className="flex-1" />
        <span aria-hidden="true" className="text-[15px] leading-none text-muted transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="max-w-[70ch] pb-4 text-[14px] leading-[1.65] text-ink-2">{children}</div>
    </details>
  );
}

/** Small rounded label used in hero rows: "In office", "Governor". */
export function Pill({ children, tone = "glass", className }: { children: ReactNode; tone?: "solid" | "glass" | "muted" | "past"; className?: string }) {
  const tones = {
    solid: "bg-ink text-white font-medium",
    glass: "bg-white/16 text-white",
    muted: "bg-surface text-ink",
    past: "bg-muted text-white font-medium",
  };
  return <span className={cn("rounded-lg px-[9px] py-1.5 text-[9.5px] leading-none tracking-[.1em] uppercase", tones[tone], className)}>{children}</span>;
}
