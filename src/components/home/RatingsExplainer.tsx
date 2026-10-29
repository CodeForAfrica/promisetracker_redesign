import type { Locale } from "@/lib/i18n";
import { TIERS, ratingMeta, tierCount, tierMeta, total } from "@/content/ratings";
import { siteStats } from "@/content/site";
import { lp } from "@/lib/i18n";
import { homeDict } from "@/i18n/home";
import { num, pct } from "@/lib/format";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { ArrowLink, SectionLabel } from "@/components/ui/Text";
import { TierBar } from "@/components/ui/TierBar";

/** Dark band: the six ratings, their tiers and the site-wide distribution. */
export function RatingsExplainer({ locale }: { locale: Locale }) {
  const t = homeDict[locale];
  const c = siteStats.counts;
  const n = total(c);
  return (
    <section className="bg-ink text-white">
      <Container className="pt-9 pb-10">
        <SectionLabel className="text-white">{t.howDecided}</SectionLabel>
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-9">
          <div className="max-w-[560px] flex-[1_1_380px]">
            <h3 className="mb-3.5 text-[30px] leading-[1.12] font-semibold tracking-[-.02em] sm:text-[36px]">{t.sixRatings}</h3>
            <p className="mb-[18px] text-[15px] leading-[1.65] text-on-dark">{t.howBody}</p>
            <ArrowLink href={lp(locale, "/methodology")} className="text-white underline underline-offset-[3px] hover:text-white">
              {t.readMethod}
            </ArrowLink>
          </div>
          <div className="flex-none">
            <div className="flex items-baseline gap-3.5">
              <span className="text-[64px] leading-[.9] font-semibold tracking-[-.035em] sm:text-[88px]">{num(siteStats.promises, locale)}</span>
              <span className="text-[11.5px] leading-normal tracking-[.06em] text-on-dark uppercase">{t.promisesCap}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[13px] leading-normal text-on-dark">
              <span>
                <b className="font-semibold text-white">{siteStats.entities}</b> {t.entities}
              </span>
              <span>
                <b className="font-semibold text-white">{siteStats.countries}</b> {t.countries}
              </span>
              <span>
                <b className="font-semibold text-white">{num(siteStats.sources, locale)}</b> {t.citedSources}
              </span>
            </div>
          </div>
        </div>

        <TierBar counts={c} className="mt-11 h-10 gap-2" groupClassName="gap-[3px]" segmentClassName="rounded-md shadow-none!" />

        <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-x-8 gap-y-7">
          {TIERS.map((tier) => {
            const tc = tierCount(c, tier);
            return (
              <div key={tier}>
                <div className="flex items-baseline justify-between gap-3 border-b border-on-dark pb-3.5 text-[17px] leading-[1.3] font-semibold">
                  <span>
                    {tierMeta[tier].label[locale]}
                    <span className="ml-2 font-normal text-faint">{pct(tc, n)}%</span>
                  </span>
                  <span>{tc}</span>
                </div>
                {tierMeta[tier].ratings.map((r, i) => (
                  <div key={r} className={cn("py-4", i === 0 ? "border-b border-dark-line" : "pb-0")}>
                    <div className="flex items-center gap-2.5 text-[14px] leading-[1.3] font-medium">
                      <i aria-hidden="true" className={cn("block size-2.5 flex-none rounded-[3px]", ratingMeta[r].swatch, "shadow-none!")} />
                      <span className="min-w-0 flex-1">{ratingMeta[r].label[locale]}</span>
                      <span>{c[r]}</span>
                    </div>
                    <p className="mt-2 ml-5 text-[13px] leading-[1.6] text-on-dark">{ratingMeta[r].description[locale]}</p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
