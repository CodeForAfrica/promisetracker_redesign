import Link from "next/link";
import { lp, type Locale } from "@/lib/i18n";
import type { Official, PromiseItem } from "@/lib/types";
import { keptCount, total } from "@/content/ratings";
import { common } from "@/i18n/common";
import { countryDict } from "@/i18n/country";
import { fill, words } from "@/i18n/util";
import { monthYear } from "@/lib/format";
import { Photo } from "@/components/ui/Photo";
import { ArrowLink, Dots, Kicker, Tag } from "@/components/ui/Text";
import { PromiseMini } from "@/components/promise/PromiseRow";
import { officialHref } from "./OfficialCard";

/** One official, given the whole width, for a country whose record is still thin. */
export function OfficialFeature({ official, promises, locale }: { official: Official; promises: PromiseItem[]; locale: Locale }) {
  const t = countryDict[locale];
  const c = common[locale];
  const href = officialHref(locale, official);
  const n = total(official.counts);
  const placeNode = official.county ? (
    <Link href={lp(locale, "/" + official.country + "/" + official.county)} className="text-muted underline decoration-on-dark underline-offset-[3px] hover:text-muted hover:opacity-70">
      {official.place[locale]}
    </Link>
  ) : (
    official.place[locale]
  );
  return (
    <div className="grid items-start gap-x-14 gap-y-8 md:grid-cols-[minmax(220px,300px)_minmax(0,1fr)]">
      <Link href={href} className="group block" aria-label={official.name}>
        <Photo src={official.portrait} alt="" sizes="300px" portrait className="aspect-[4/5] rounded-[10px]" />
      </Link>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
          <span className="rounded-lg bg-ink px-[9px] py-1.5 text-[9.5px] leading-none font-medium tracking-[.1em] text-white uppercase">{c.inOffice}</span>
          <Tag>
            <Dots parts={[official.title[locale], placeNode, fill(c.term, { from: monthYear(official.term.from, locale), to: monthYear(official.term.to, locale) })]} />
          </Tag>
        </div>
        <h3 className="mt-4 mb-3.5 text-[36px] leading-[1.05] font-semibold tracking-[-.02em] sm:text-[44px]">
          <Link href={href} className="text-ink hover:text-ink hover:opacity-70">
            {official.name}
          </Link>
        </h3>
        <p className="mb-8 max-w-[58ch] text-[15px] leading-[1.65] text-ink-2">
          {fill(t.thinSummary, { place: official.place[locale], n: words(n, locale, true), k: words(keptCount(official.counts), locale, true) })}
        </p>
        <Kicker>{official.gender === "f" ? t.herPromises : t.hisPromises}</Kicker>
        <div className="mt-3.5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,160px),1fr))] gap-5">
          {promises.map((p) => (
            <PromiseMini key={p.slug} promise={p} locale={locale} />
          ))}
        </div>
        <div className="mt-[18px]">
          <ArrowLink href={href}>{fill(t.fullRecordFor, { name: official.name })}</ArrowLink>
        </div>
      </div>
    </div>
  );
}
