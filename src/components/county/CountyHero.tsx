import Link from "next/link";
import { lp, type Locale } from "@/lib/i18n";
import type { County, Country } from "@/lib/types";
import { PROPORTION_MIN, keptCount, total } from "@/content/ratings";
import { countyDict } from "@/i18n/lists";
import { fill, words } from "@/i18n/util";
import { pct } from "@/lib/format";
import { Photo } from "@/components/ui/Photo";
import { Container } from "@/components/ui/Container";
import { TierBar } from "@/components/ui/TierBar";

export function CountyHero({ county, country, locale }: { county: County; country: Country; locale: Locale }) {
  const t = countyDict[locale];
  const n = total(county.counts);
  const thin = county.officialSlugs.length < 2 || n < PROPORTION_MIN;
  return (
    <section className="relative isolate flex min-h-[460px] items-end overflow-hidden bg-ink text-white">
      <Photo src={county.hero} alt="" priority sizes="100vw" className="absolute! inset-0 -z-20" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(12,14,18,.2)_0%,rgba(12,14,18,.38)_42%,rgba(12,14,18,.9)_100%)]" />
      <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-16 gap-y-7 pt-16 pb-10">
        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="mb-3 text-[11px] leading-[1.6] font-medium tracking-[.12em] uppercase">
            <Link href={lp(locale, "/" + country.code)} className="text-white hover:text-white hover:opacity-80">
              {country.name[locale]}
            </Link>
            {"\u00a0\u00a0›\u00a0\u00a0"}
            <span aria-current="page">{county.name}</span>
          </nav>
          <h1 className="text-[44px] leading-[1.02] font-semibold tracking-[-.028em] text-balance text-white sm:text-[64px]">{county.name}</h1>
          <p className="mt-3.5 max-w-[54ch] text-[16px] leading-[1.6] text-line-2">{thin ? t.onePerson : county.intro[locale]}</p>
        </div>
        {!thin && (
          <div className="min-w-0">
            <div className="mb-3 text-[10.5px] leading-[1.4] font-medium tracking-[.12em] uppercase">{t.countySnapshot}</div>
            <div className="mb-3.5 flex items-baseline gap-3">
              <span className="text-[48px] leading-none font-semibold tracking-[-.025em] sm:text-[56px]">{pct(keptCount(county.counts), n)}%</span>
              <span className="max-w-[20ch] text-[14px] leading-normal text-line-2">{fill(t.keptAcross, { n, k: words(county.officialSlugs.length, locale) })}</span>
            </div>
            <TierBar counts={county.counts} className="h-3.5 gap-[3px] rounded-[4px]" segmentClassName="shadow-none!" />
            <p className="mt-3 max-w-[60ch] text-[12.5px] leading-[1.55] text-line-2">{county.note[locale]}</p>
          </div>
        )}
      </Container>
    </section>
  );
}
