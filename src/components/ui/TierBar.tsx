import type { RatingCounts } from "@/lib/types";
import { TIERS, ratingMeta, tierCount, tierMeta } from "@/content/ratings";
import { cn } from "@/lib/cn";

type TierBarProps = {
  counts: RatingCounts;
  /** Height, gaps and rounding as Tailwind classes. */
  className?: string;
  groupClassName?: string;
  segmentClassName?: string;
  label?: string;
};

/**
 * The three-tier bar: one group per tier sized by its share, each split into its two ratings.
 * Flex values are data, so they are set inline.
 */
export function TierBar({ counts, className, groupClassName, segmentClassName, label }: TierBarProps) {
  return (
    <div role="img" aria-label={label} className={cn("flex overflow-hidden", className)}>
      {TIERS.map((tier) => {
        const n = tierCount(counts, tier);
        if (n === 0) return null;
        return (
          <span key={tier} className={cn("flex min-w-0 overflow-hidden", groupClassName)} style={{ flex: n + " 1 0%" }}>
            {tierMeta[tier].ratings.map((r) =>
              counts[r] === 0 ? null : (
                <i key={r} className={cn("block min-w-0", ratingMeta[r].swatch, segmentClassName)} style={{ flex: counts[r] + " 1 0%" }} />
              ),
            )}
          </span>
        );
      })}
    </div>
  );
}
