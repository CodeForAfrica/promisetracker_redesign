import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** The 1040px content column with the prototype's 40px desktop gutter. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1120px] px-5 sm:px-10", className)}>{children}</div>;
}
