import type { Locale } from "@/lib/i18n";
import { RATINGS, type RatingCounts } from "@/lib/types";
import { ratingMeta } from "@/content/ratings";
import { cn } from "@/lib/cn";
import { RatingDot } from "./RatingChip";

/** Rating-by-rating counts. With `hideEmpty`, ratings at zero are left out rather than listed. */
export function RatingLegend({
  counts,
  locale,
  hideEmpty = false,
  leader = false,
  className,
}: {
  counts: RatingCounts;
  locale: Locale;
  hideEmpty?: boolean;
  leader?: boolean;
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-2", className)}>
      {RATINGS.filter((r) => !hideEmpty || counts[r] > 0).map((r) => (
        <li key={r} className="flex items-center gap-2.5 text-[13px] leading-[1.3]">
          <RatingDot rating={r} />
          {ratingMeta[r].label[locale]}
          <span className={cn("flex-1", leader && "border-b border-dotted border-line")} />
          <span className="text-ink-2">{counts[r]}</span>
        </li>
      ))}
    </ul>
  );
}
