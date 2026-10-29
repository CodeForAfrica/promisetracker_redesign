"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Condensed bar that slides in once the element with `watchId` (the hero search) has scrolled out of view.
 */
export function StickyBar({ watchId, children }: { watchId: string; children: ReactNode }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = document.getElementById(watchId);
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setShown(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, [watchId]);

  return (
    <div
      aria-hidden={!shown}
      inert={!shown}
      className={cn(
        "fixed top-0 left-1/2 z-40 h-16 w-[min(1366px,100%)] -translate-x-1/2 border-b border-line-soft bg-white/95 shadow-[0_8px_20px_-14px_rgba(0,0,0,.25)] backdrop-blur-md backdrop-saturate-[1.3] transition-[transform,opacity] duration-300 ease-out-soft",
        shown ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3.5 opacity-0",
      )}
    >
      {children}
    </div>
  );
}
