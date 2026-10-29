import Image from "next/image";
import type { CountryCode } from "@/lib/types";
import { withBase } from "@/lib/base";
import { cn } from "@/lib/cn";

const STRIPES: Record<Exclude<CountryCode, "ke">, string[]> = {
  sn: ["bg-[#0F7B3D]", "bg-r-behind", "bg-r-stalled"],
  ng: ["bg-[#0F7B3D]", "bg-white", "bg-[#0F7B3D]"],
  ci: ["bg-[#E8721C]", "bg-white", "bg-[#0F7B3D]"],
};

/** Round country flag. Kenya uses the supplied SVG; the others are drawn as vertical tricolours. */
export function Flag({ code, size = 17, ring = "dark", className }: { code: CountryCode; size?: number; ring?: "dark" | "light"; className?: string }) {
  const ringClass = ring === "light" ? "shadow-[0_0_0_2px_rgba(255,255,255,.6)]" : "shadow-[0_0_0_1px_rgba(22,24,28,.12)]";
  if (code === "ke") {
    return (
      <Image
        src={withBase("/images/flag-ke.svg")}
        alt=""
        width={size}
        height={size}
        className={cn("flex-none rounded-full object-cover", ringClass, className)}
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={cn("relative inline-flex flex-none overflow-hidden rounded-full", ringClass, className)}
      style={{ width: size, height: size }}
    >
      {STRIPES[code].map((c, i) => (
        <i key={i} className={cn("min-w-0 flex-1", c)} />
      ))}
      {code === "sn" && (
        <i className="absolute inset-0 flex items-center justify-center leading-none text-[#0F7B3D] not-italic" style={{ fontSize: size * 0.65 }}>
          ★
        </i>
      )}
    </span>
  );
}
