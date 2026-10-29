import type { Locale } from "@/lib/i18n";
import { RATINGS, type RatingCounts } from "@/lib/types";
import { PROPORTION_MIN, TIERS, keptCount, tierCount, tierMeta, total } from "@/content/ratings";
import { countryDict } from "@/i18n/country";
import { fill, words } from "@/i18n/util";
import { pct } from "@/lib/format";
import { RatingLegend } from "@/components/ui/RatingLegend";
import { TierBar } from "@/components/ui/TierBar";
import { SectionLabel } from "@/components/ui/Text";

/**
 * Distribution of ratings. With fewer than PROPORTION_MIN promises the percentage and the bar are withheld,
 * and empty ratings are left out rather than listed at zero.
 */
export function Snapshot({ counts, locale, title }: { counts: RatingCounts; locale: Locale; title: string }) {
  const t = countryDict[locale];
  const n = total(counts);
  const kept = keptCount(counts);

  if (n < PROPORTION_MIN) {
    const empty = RATINGS.filter((r) => counts[r] === 0).length;
    return (
      <>
        <SectionLabel>{title}</SectionLabel>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] items-start gap-x-14 gap-y-8">
          <div className="flex items-baseline gap-3">
            <span className="text-[52px] leading-none font-semibold tracking-[-.02em]">{kept}</span>
            <span className="max-w-[14ch] text-[14px] leading-normal text-ink-2">{fill(t.thinKept, { n })}</span>
          </div>
          <RatingLegend counts={counts} locale={locale} hideEmpty leader className="min-w-0 sm:min-w-[230px]" />
          <p className="max-w-[46ch] text-[13px] leading-[1.6] text-ink-2">
            {kept === 0 ? t.thinNoteZero : fill(t.thinNote, { empty: words(empty, locale, true), n: words(n, locale) })}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <SectionLabel>{title}</SectionLabel>
      <div className="grid items-start gap-[52px] md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
        <div>
          <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-[52px] leading-none font-semibold tracking-[-.02em] sm:text-[62px]">{pct(kept, n)}%</span>
            <span className="min-w-0 text-[14px] leading-normal text-ink-2">{fill(t.keptWhole, { n })}</span>
          </div>
          <TierBar counts={counts} className="mb-2.5 h-[30px] gap-1 rounded-lg" groupClassName="rounded-lg" />
          <div className="flex gap-1 text-[9.5px] leading-[1.4] font-medium tracking-[.09em] text-muted uppercase">
            {TIERS.map((tier) => {
              const v = tierCount(counts, tier);
              return (
                <span key={tier} style={{ flex: v + " 1 0%" }}>
                  {tierMeta[tier].short[locale]}
                  {"\u00a0\u00a0"}
                  {v}
                </span>
              );
            })}
          </div>
        </div>
        <div className="pt-1.5">
          <RatingLegend counts={counts} locale={locale} />
          <div className="mt-1.5 text-[11px] leading-[1.6] tracking-[.05em] text-muted">
            n={n}
            {"\u00a0\u00a0·\u00a0\u00a0"}
            <span className="font-medium text-link uppercase">{t.tableView}</span>
          </div>
        </div>
      </div>
    </>
  );
}
