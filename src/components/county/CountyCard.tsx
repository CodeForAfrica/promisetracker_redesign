import Link from "next/link";
import { lp, type Locale } from "@/lib/i18n";
import type { County } from "@/lib/types";
import { getCountry } from "@/content/countries";
import { keptCount, total } from "@/content/ratings";
import { homeDict } from "@/i18n/home";
import { fill } from "@/i18n/util";
import { pct } from "@/lib/format";
import { TierBar } from "@/components/ui/TierBar";
import { Dots, Tag } from "@/components/ui/Text";

export function countyHref(locale: Locale, c: County): string {
  return lp(locale, "/" + c.country + "/" + c.slug);
}

export function CountyCard({ county, locale }: { county: County; locale: Locale }) {
  const t = homeDict[locale];
  const n = total(county.counts);
  const country = getCountry(county.country);
  return (
    <Link href={countyHref(locale, county)} className="flex flex-col rounded-lg border border-line-2 bg-white p-[18px] text-ink hover:text-ink hover:opacity-85">
      <Tag>
        <Dots parts={[t.county, country?.name[locale] ?? ""]} />
      </Tag>
      <div className="mt-1.5 mb-4 text-[20px] leading-[1.2] font-semibold">{county.name}</div>
      <div className="mb-3 flex items-baseline gap-2.5">
        <span className="text-[40px] leading-none font-semibold tracking-[-.02em]">{pct(keptCount(county.counts), n)}%</span>
        <span className="max-w-[20ch] text-[12.5px] leading-[1.45] text-ink-2">{fill(t.countyKept, { n })}</span>
      </div>
      <TierBar counts={county.counts} className="h-2.5 gap-[3px] rounded-md" />
      <div className="mt-auto border-t border-line-2 pt-3 text-[12.5px] leading-normal text-ink-2">
        {fill(t.answerFor, { n: county.officialSlugs.length })}
      </div>
    </Link>
  );
}
