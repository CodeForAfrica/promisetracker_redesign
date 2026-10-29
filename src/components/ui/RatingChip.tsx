import type { Locale } from "@/lib/i18n";
import type { Rating } from "@/lib/types";
import { ratingMeta } from "@/content/ratings";
import { cn } from "@/lib/cn";

export function RatingChip({ rating, locale, className }: { rating: Rating; locale: Locale; className?: string }) {
  const m = ratingMeta[rating];
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2.5 py-1.5 text-[10px] leading-none font-semibold tracking-[.1em] uppercase whitespace-nowrap",
        m.chip,
        className,
      )}
    >
      {m.label[locale]}
    </span>
  );
}

export function RatingDot({ rating, className }: { rating: Rating; className?: string }) {
  return <i aria-hidden="true" className={cn("block size-3 flex-none rounded-full", ratingMeta[rating].swatch, className)} />;
}
