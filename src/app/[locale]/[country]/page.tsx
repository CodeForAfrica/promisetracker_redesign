import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, lp, locales } from "@/lib/i18n";
import type { Official, PromiseItem } from "@/lib/types";
import { countries, getCountry } from "@/content/countries";
import { getOfficial } from "@/content/officials";
import { getPromise, promisesBy } from "@/content/promises";
import { PROPORTION_MIN } from "@/content/ratings";
import { countryDict } from "@/i18n/country";
import { fill } from "@/i18n/util";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { ArrowLink, SectionLabel } from "@/components/ui/Text";
import { CountryHero } from "@/components/country/CountryHero";
import { Snapshot } from "@/components/country/Snapshot";
import { PromiseRow } from "@/components/promise/PromiseRow";
import { OfficialRow, PartyRow, PastRow } from "@/components/official/OfficialRow";
import { OfficialFeature } from "@/components/official/OfficialFeature";

type Params = { locale: string; country: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => countries.map((c) => ({ locale, country: c.code })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, country } = await params;
  const c = getCountry(country);
  return { title: c && isLocale(locale) ? c.name[locale] : undefined };
}

const isOfficial = (o: Official | undefined): o is Official => Boolean(o);
const isPromise = (p: PromiseItem | undefined): p is PromiseItem => Boolean(p);

export default async function CountryPage({ params }: { params: Promise<Params> }) {
  const { locale, country: code } = await params;
  const country = getCountry(code);
  if (!isLocale(locale) || !country) notFound();
  const t = countryDict[locale];
  const thin = country.promises < PROPORTION_MIN;
  const people = country.officialSlugs.map(getOfficial).filter(isOfficial);

  return (
    <PageShell locale={locale} active={country.code}>
      <CountryHero country={country} locale={locale} />

      {thin ? (
        <section>
          <Container className="pt-7 pb-8">
            <SectionLabel>{people.length === 1 ? t.trackingOne : t.trackingMany}</SectionLabel>
            <div className="grid gap-16">
              {people.map((o) => (
                <OfficialFeature key={o.slug} official={o} promises={promisesBy(o.slug)} locale={locale} />
              ))}
            </div>
          </Container>
        </section>
      ) : (
        <section>
          <Container className="pt-9 pb-[60px]">
            <SectionLabel className="mb-4">{t.inFocus}</SectionLabel>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] gap-x-14 gap-y-10">
              {country.inFocus.map(getPromise).filter(isPromise).map((p) => (
                <PromiseRow key={p.slug} promise={p} locale={locale} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className={thin ? "" : "bg-surface"}>
        <Container className="pt-7 pb-8">
          <Snapshot counts={country.counts} locale={locale} title={t.snapshot} />
        </Container>
      </section>

      {!thin && (
        <section>
          <Container className="pt-7 pb-8">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
              <SectionLabel className="mb-0">{t.whoDelivering}</SectionLabel>
              <ArrowLink href={lp(locale, "/" + country.code + "/officials")}>{fill(t.allOfficials, { n: country.officials })}</ArrowLink>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] gap-x-14 gap-y-10">
              {people.map((o) => (
                <OfficialRow key={o.slug} official={o} locale={locale} />
              ))}
              {country.parties.map((p) => (
                <PartyRow key={p.name} party={p} country={country.name[locale]} locale={locale} />
              ))}
              {country.pastSlugs.map(getOfficial).filter(isOfficial).map((o) => (
                <PastRow key={o.slug} official={o} locale={locale} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </PageShell>
  );
}
