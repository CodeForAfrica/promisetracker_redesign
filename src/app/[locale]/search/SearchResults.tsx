"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { withBase } from "@/lib/base";
import { lp, type Locale } from "@/lib/i18n";
import { getCountry } from "@/content/countries";
import { keptCount, total } from "@/content/ratings";
import { browseDict } from "@/i18n/browse";
import { common } from "@/i18n/common";
import { listDict } from "@/i18n/lists";
import { fill } from "@/i18n/util";
import { pct } from "@/lib/format";
import { toRowData } from "@/lib/rows";
import { search } from "@/lib/search";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { HeroKicker, HeroLede, HeroTitle, PhotoHero } from "@/components/ui/PhotoHero";
import { Photo } from "@/components/ui/Photo";
import { SearchIcon } from "@/components/ui/SearchIcon";
import { Dots, SectionLabel } from "@/components/ui/Text";
import { PortraitCard } from "@/components/official/PortraitCard";
import { PromiseTable } from "@/components/promise/PromiseTable";

const HERO = "https://images.unsplash.com/photo-1669127300649-940337f1487e?w=1800&h=900&fit=crop&auto=format&q=70";
const SUGGEST = { en: ["Kibra", "Wekesa", "housing", "Dakar"], fr: ["Dakar", "Diallo", "assainissement", "Kibra"] };

export function SearchResults({ locale }: { locale: Locale }) {
  /* The site is a static export, so ?q= is only known in the browser. */
  const q = useSearchParams().get("q") ?? "";
  const t = browseDict[locale];
  const c = common[locale];
  const r = search(q);
  const places = (r.county ? 1 : 0) + (r.country ? 1 : 0);
  const any = places + r.people.length + r.promises.length > 0;
  const count = (n: number, one: string, many: string) => (n === 1 ? one : fill(many, { n }));

  const lede = !r.q
    ? t.searchIntro
    : any
      ? fill(t.resultsIntro, {
          places: count(places, t.placeOne, t.placeMany),
          people: count(r.people.length, t.personOne, t.personMany),
          promises: count(r.promises.length, t.promiseOne, t.promiseMany),
          q: r.q,
        })
      : fill(t.nothing, { q: r.q });

  const placeCountry = r.county ? getCountry(r.county.country) : r.country;

  return (
    <PageShell locale={locale} search={false}>
      <PhotoHero
        image={r.county?.hero ?? r.country?.hero ?? HERO}
        minH="min-h-[400px]"
        aside={
          <>
            <form role="search" action={withBase(lp(locale, "/search"))} className="flex h-14 items-center gap-2.5 rounded-full bg-white py-1.5 pr-1.5 pl-5">
              <SearchIcon className="text-ink" />
              <label htmlFor="q" className="sr-only">
                {c.searchPlaceholder}
              </label>
              <input
                id="q"
                name="q"
                type="search"
                defaultValue={r.q}
                placeholder={c.searchPlaceholder}
                className="min-w-0 flex-1 bg-transparent text-[16px] leading-none font-medium text-ink outline-none placeholder:font-normal placeholder:text-muted"
              />
              <button type="submit" className="flex h-11 flex-none cursor-pointer items-center rounded-full bg-ink px-5 text-[11px] leading-none font-medium tracking-[.06em] text-white uppercase hover:opacity-85">
                {c.search}
              </button>
            </form>
            {r.county && placeCountry && (
              <div className="mt-3.5 text-[10.5px] leading-[1.6] font-medium tracking-[.1em] text-line-2 uppercase">
                <Dots parts={[fill(t.aPlaceIn, { country: placeCountry.name[locale] }), fill(t.seats, { n: r.county.officialSlugs.length }), fill(c.promises, { n: total(r.county.counts) })]} />
              </div>
            )}
            {!r.q && (
              <div className="mt-3.5 flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-line-2">
                <span>{t.try}</span>
                {SUGGEST[locale].map((s) => (
                  <Link key={s} href={lp(locale, "/search?q=" + encodeURIComponent(s))} className="text-white underline underline-offset-[3px] hover:text-white hover:opacity-80">
                    {s}
                  </Link>
                ))}
              </div>
            )}
          </>
        }
      >
        <HeroKicker>{r.q ? t.results : c.search}</HeroKicker>
        <HeroTitle>{r.q || t.searchTitle}</HeroTitle>
        <HeroLede>{lede}</HeroLede>
      </PhotoHero>

      {(r.county || r.country) && (
        <Container className="pt-7 pb-8">
          <SectionLabel rule>{t.placeItself}</SectionLabel>
          {r.county ? (
            <Link
              href={lp(locale, "/" + r.county.country + "/" + r.county.slug)}
              className="flex flex-wrap items-center gap-x-6 gap-y-5 rounded-[10px] bg-ink py-3.5 pr-[22px] pl-3.5 text-white hover:text-white"
            >
              <Photo src={r.county.hero} alt="" sizes="(min-width: 768px) 200px, 100vw" className="aspect-[5/3] w-full flex-none rounded-lg sm:aspect-auto sm:h-[120px] sm:w-[200px]" />
              <div>
                <div className="text-[22px] leading-[1.2] font-semibold">{r.county.name}</div>
                <div className="mt-1.5 text-[12px] leading-normal text-line-2">
                  <Dots
                    parts={[
                      fill(c.promises, { n: total(r.county.counts) }),
                      fill(c.kept, { n: pct(keptCount(r.county.counts), total(r.county.counts)) }),
                      fill(t.seatsAnswer, { n: r.county.officialSlugs.length - 1 }),
                    ]}
                  />
                </div>
              </div>
              <span className="flex-1" />
              <span className="rounded-lg bg-white px-5 py-3.5 text-[12px] leading-none font-medium tracking-[.06em] text-ink uppercase max-sm:w-full max-sm:text-center">{t.openCounty}</span>
            </Link>
          ) : (
            r.country && (
              <Link
                href={lp(locale, "/" + r.country.code)}
                className="flex flex-wrap items-center gap-x-6 gap-y-5 rounded-[10px] bg-ink py-3.5 pr-[22px] pl-3.5 text-white hover:text-white"
              >
                <Photo src={r.country.hero} alt="" sizes="(min-width: 768px) 200px, 100vw" className="aspect-[5/3] w-full flex-none rounded-lg sm:aspect-auto sm:h-[120px] sm:w-[200px]" />
                <div>
                  <div className="text-[22px] leading-[1.2] font-semibold">{r.country.name[locale]}</div>
                  <div className="mt-1.5 text-[12px] leading-normal text-line-2">{fill(c.promises, { n: r.country.promises })}</div>
                </div>
                <span className="flex-1" />
                <span className="rounded-lg bg-white px-5 py-3.5 text-[12px] leading-none font-medium tracking-[.06em] text-ink uppercase max-sm:w-full max-sm:text-center">{t.openCountry}</span>
              </Link>
            )
          )}
        </Container>
      )}

      {r.people.length > 0 && (
        <Container className="pt-7 pb-8">
          <SectionLabel rule>{places ? t.represent : fill(t.people, { q: r.q })}</SectionLabel>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,210px),1fr))] gap-4">
            {r.people.map((o) => (
              <PortraitCard key={o.slug} official={o} locale={locale} />
            ))}
          </div>
        </Container>
      )}

      {r.promises.length > 0 && (
        <Container className="pt-7 pb-8">
          <SectionLabel rule>{fill(t.mentioning, { q: r.q })}</SectionLabel>
          <PromiseTable rows={r.promises.map((p) => toRowData(p, locale))} labels={listDict[locale]} filters={[]} />
        </Container>
      )}
    </PageShell>
  );
}
