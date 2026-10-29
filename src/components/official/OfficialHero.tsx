import Link from "next/link";
import { lp, type Locale } from "@/lib/i18n";
import type { Official } from "@/lib/types";
import { PROPORTION_MIN, keptCount, total } from "@/content/ratings";
import { common } from "@/i18n/common";
import { officialDict } from "@/i18n/official";
import { fill } from "@/i18n/util";
import { monthYear, pct } from "@/lib/format";
import { Photo } from "@/components/ui/Photo";
import { Container } from "@/components/ui/Container";
import { TierBar } from "@/components/ui/TierBar";
import { Pill } from "@/components/ui/Disclosure";

export function OfficialHero({ official, locale }: { official: Official; locale: Locale }) {
  const c = common[locale];
  const t = officialDict[locale];
  const n = total(official.counts);
  const k = keptCount(official.counts);
  const term = fill(c.term, { from: monthYear(official.term.from, locale), to: monthYear(official.term.to, locale) });
  return (
    <section className="relative isolate flex min-h-[520px] items-end overflow-hidden bg-ink text-white">
      <Photo src={official.portrait.replace("w=600&h=600", "w=1800&h=900")} alt="" priority sizes="100vw" className="absolute! inset-0 -z-20" imgClassName="grayscale" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(12,14,18,.2)_0%,rgba(12,14,18,.38)_42%,rgba(12,14,18,.9)_100%)]" />
      <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-16 gap-y-7 pt-16 pb-10">
        <div className="min-w-0">
          <div className="mb-3.5 flex flex-wrap gap-2">
            <Pill tone="solid">{c.inOffice}</Pill>
            <Pill>{official.title[locale]}</Pill>
            {official.county ? (
              <Link href={lp(locale, "/" + official.country + "/" + official.county)} className="hover:opacity-70">
                <Pill>{official.place[locale]}</Pill>
              </Link>
            ) : (
              <Pill>{official.place[locale]}</Pill>
            )}
            <Pill>{term}</Pill>
            {official.party && <Pill>{official.party}</Pill>}
          </div>
          <h1 className="text-[44px] leading-[1.02] font-semibold tracking-[-.028em] text-balance text-white sm:text-[64px]">{official.name}</h1>
          {official.bio && <p className="mt-3.5 max-w-[54ch] text-[16px] leading-[1.6] text-line-2">{official.bio[locale]}</p>}
        </div>
        {n >= PROPORTION_MIN ? (
          <div className="min-w-0">
            <div className="mb-3.5 flex items-baseline gap-3.5">
              <span className="text-[52px] leading-none font-semibold tracking-[-.03em] sm:text-[64px]">{pct(k, n)}%</span>
              <span className="text-[10.5px] leading-[1.6] font-medium tracking-[.1em] text-line-2 uppercase">
                {t.keptLine}
                <br />
                {fill(t.keptOf, { k, n })}
              </span>
            </div>
            <TierBar counts={official.counts} className="h-3.5 gap-[3px] rounded-[4px]" segmentClassName="shadow-none!" />
          </div>
        ) : (
          <div className="min-w-0">
            <div className="flex items-baseline gap-3.5">
              <span className="text-[52px] leading-none font-semibold tracking-[-.03em] sm:text-[64px]">{k}</span>
              <span className="text-[10.5px] leading-[1.6] font-medium tracking-[.1em] text-line-2 uppercase">{fill(t.ofPromisesKept, { n })}</span>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
