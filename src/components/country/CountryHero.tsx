import type { Locale } from "@/lib/i18n";
import type { Country } from "@/lib/types";
import { PROPORTION_MIN, keptCount, total } from "@/content/ratings";
import { countryDict } from "@/i18n/country";
import { common } from "@/i18n/common";
import { fill } from "@/i18n/util";
import { longDate, pct } from "@/lib/format";
import { Photo } from "@/components/ui/Photo";
import { Flag } from "@/components/ui/Flag";
import { Container } from "@/components/ui/Container";

/** Photo-led hero. A thin record swaps the stat row for a one-line tally. */
export function CountryHero({ country, locale }: { country: Country; locale: Locale }) {
  const t = countryDict[locale];
  const c = common[locale];
  const thin = country.promises < PROPORTION_MIN;
  const reviewed = longDate(country.reviewed, locale);
  const stats = [
    { value: String(country.promises), label: t.promisesCap },
    { value: String(country.officials), label: t.officialsCap },
    { value: pct(keptCount(country.counts), total(country.counts)) + "%", label: t.keptCap },
  ];
  return (
    <section className="relative isolate flex min-h-[460px] items-end overflow-hidden bg-ink text-white">
      <Photo src={country.hero} alt="" priority sizes="100vw" className="absolute! inset-0 -z-20" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(12,14,18,.2)_0%,rgba(12,14,18,.38)_42%,rgba(12,14,18,.9)_100%)]" />
      <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-16 gap-y-7 pt-16 pb-10">
        <div className="min-w-0">
          <div className="flex items-center gap-4">
            <Flag code={country.code} size={40} ring="light" />
            <h1 className="text-[44px] leading-[1.02] font-semibold tracking-[-.028em] text-balance text-white sm:text-[64px]">{country.name[locale]}</h1>
          </div>
          {thin ? (
            <div className="mt-4 text-[10.5px] leading-[1.6] font-medium tracking-[.1em] text-line-2 uppercase">
              {fill(t.thinMeta, {
                p: country.promises === 1 ? c.promise : fill(c.promises, { n: country.promises }),
                o: country.officials === 1 ? t.officialOne : fill(t.officialMany, { n: country.officials }),
                date: reviewed,
              }).replace(/ · /g, "\u00a0\u00a0·\u00a0\u00a0")}
            </div>
          ) : (
            <p className="mt-3.5 max-w-[54ch] text-[16px] leading-[1.6] text-line-2">
              {country.intro[locale]} {fill(t.lastReviewed, { date: reviewed })}
            </p>
          )}
        </div>
        {!thin && (
          <dl className="grid min-w-0 grid-cols-3 gap-3 border-t sm:gap-5 border-white/35 pt-[18px]">
            {stats.map((s) => (
              <div key={s.label} className="flex min-w-0 flex-col-reverse">
                <dt className="mt-2 text-[10.5px] leading-[1.4] font-medium tracking-[.1em] text-line-2 uppercase [overflow-wrap:anywhere]">{s.label}</dt>
                <dd className="text-[30px] leading-none min-[400px]:text-[36px] font-semibold tracking-[-.025em] sm:text-[44px]">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </Container>
    </section>
  );
}
