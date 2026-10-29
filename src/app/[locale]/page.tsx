import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getCounty, getTopic } from "@/content/site";
import { getOfficial } from "@/content/officials";
import { getPromise } from "@/content/promises";
import { home } from "@/content/home";
import type { Official, PromiseItem } from "@/lib/types";
import { HomeHero } from "@/components/home/HomeHero";
import { FeaturedPromise } from "@/components/home/FeaturedPromise";
import { InFocus } from "@/components/home/InFocus";
import { RatingsExplainer } from "@/components/home/RatingsExplainer";
import { CountryPicker } from "@/components/home/CountryPicker";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const featured = getPromise(home.featured);
  const topic = getTopic(home.focusTopic);
  if (!featured || !topic) notFound();
  const focus = home.focusPromises.map(getPromise).filter((p): p is PromiseItem => Boolean(p));
  const people = home.people.map(getOfficial).filter((o): o is Official => Boolean(o));
  const county = getCounty(home.county.country, home.county.slug);

  return (
    <>
      <HomeHero locale={locale} />
      <main id="main">
        <FeaturedPromise promise={featured} locale={locale} />
        <InFocus locale={locale} topic={topic} promises={focus} people={people} county={county} />
        <RatingsExplainer locale={locale} />
        <CountryPicker locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
