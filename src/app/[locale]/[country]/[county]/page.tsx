import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/i18n";
import type { Official } from "@/lib/types";
import { getCountry } from "@/content/countries";
import { getOfficial } from "@/content/officials";
import { promises } from "@/content/promises";
import { counties, getCounty } from "@/content/site";
import { total } from "@/content/ratings";
import { countyDict, listDict } from "@/i18n/lists";
import { fill } from "@/i18n/util";
import { toRowData } from "@/lib/rows";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/Text";
import { CountyHero } from "@/components/county/CountyHero";
import { PortraitCard } from "@/components/official/PortraitCard";
import { PromiseTable } from "@/components/promise/PromiseTable";

type Params = { locale: string; country: string; county: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => counties.map((c) => ({ locale, country: c.country, county: c.slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { country, county } = await params;
  return { title: getCounty(country, county)?.name };
}

export default async function CountyPage({ params }: { params: Promise<Params> }) {
  const { locale, country: code, county: slug } = await params;
  const country = getCountry(code);
  const county = getCounty(code, slug);
  if (!isLocale(locale) || !country || !county) notFound();
  const t = countyDict[locale];
  const people = county.officialSlugs.map(getOfficial).filter((o): o is Official => Boolean(o));
  const rows = promises.filter((p) => county.officialSlugs.includes(p.official) && p.country === code).map((p) => toRowData(p, locale));

  return (
    <PageShell locale={locale} active={country.code}>
      <CountyHero county={county} country={country} locale={locale} />

      <section>
        <Container className="pt-7 pb-8">
          <SectionLabel>{t.represents}</SectionLabel>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,210px),1fr))] gap-4">
            {people.map((o) => (
              <PortraitCard key={o.slug} official={o} locale={locale} />
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="pt-7 pb-8">
          <div className="mb-[18px] flex flex-wrap items-baseline justify-between gap-4 border-t border-line pt-4">
            <SectionLabel className="mb-0">{t.promisesFor}</SectionLabel>
            <span className="text-[12.5px] font-medium tracking-[.03em] text-muted">{fill(t.allN, { n: total(county.counts) })}</span>
          </div>
          <PromiseTable rows={rows} labels={listDict[locale]} />
        </Container>
      </section>
    </PageShell>
  );
}
