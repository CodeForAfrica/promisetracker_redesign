import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, lp, locales } from "@/lib/i18n";
import { getCountry } from "@/content/countries";
import { promises } from "@/content/promises";
import { keptCount, total } from "@/content/ratings";
import { getTopic, topics } from "@/content/site";
import { browseDict } from "@/i18n/browse";
import { common } from "@/i18n/common";
import { listDict } from "@/i18n/lists";
import { fill } from "@/i18n/util";
import { pct } from "@/lib/format";
import { toRowData } from "@/lib/rows";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { Flag } from "@/components/ui/Flag";
import { HeroKicker, HeroLede, HeroStats, HeroTitle, PhotoHero } from "@/components/ui/PhotoHero";
import { Photo } from "@/components/ui/Photo";
import { SectionLabel } from "@/components/ui/Text";
import { TierBar } from "@/components/ui/TierBar";
import { PromiseTable } from "@/components/promise/PromiseTable";

type Params = { locale: string; topic: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => topics.map((t) => ({ locale, topic: t.slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, topic } = await params;
  const t = getTopic(topic);
  return { title: t && isLocale(locale) ? t.name[locale] : undefined };
}

export default async function TopicPage({ params }: { params: Promise<Params> }) {
  const { locale, topic: slug } = await params;
  const topic = getTopic(slug);
  if (!isLocale(locale) || !topic) notFound();
  const t = browseDict[locale];
  const c = common[locale];
  const list = promises.filter((p) => p.topic === topic.slug);
  const rows = list.map((p) => toRowData(p, locale));
  const all = topic.byCountry ?? [];
  const n = all.reduce((s, b) => s + total(b.counts), 0);
  const k = all.reduce((s, b) => s + keptCount(b.counts), 0);
  const hero = topic.hero ?? list[0]?.image.replace(/w=\d+&h=\d+/, "w=1800&h=900") ?? "";

  return (
    <PageShell locale={locale}>
      <PhotoHero
        image={hero}
        aside={
          <HeroStats
            stats={[
              { value: String(topic.total), label: t.promisesCap },
              { value: String(topic.countries), label: t.countriesCap },
              { value: n ? pct(k, n) + "%" : "—", label: t.keptCap },
            ]}
          />
        }
      >
        <HeroKicker>{t.topic}</HeroKicker>
        <HeroTitle>{topic.name[locale]}</HeroTitle>
        <HeroLede>{topic.intro?.[locale] ?? fill(t.topicIntro, { topic: topic.name[locale].toLowerCase() })}</HeroLede>
      </PhotoHero>

      {all.length > 0 && (
        <Container className="pt-11 pb-8">
          <SectionLabel>{t.byCountry}</SectionLabel>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,210px),1fr))] gap-4">
            {all.map((b) => {
              const country = getCountry(b.country);
              if (!country) return null;
              const bn = total(b.counts);
              return (
                <Link
                  key={b.country}
                  href={lp(locale, "/" + b.country)}
                  className="flex flex-col overflow-hidden rounded-[10px] border border-line-2 bg-white text-ink hover:text-ink hover:opacity-85"
                >
                  <Photo src={b.image} alt="" sizes="(min-width: 1120px) 250px, 50vw" className="aspect-[3/2]" />
                  <div className="grid gap-2 px-[18px] pt-4 pb-[18px]">
                    <div className="flex items-center gap-2 text-[18px] leading-[1.25] font-semibold">
                      <Flag code={b.country} size={18} />
                      {country.name[locale]}
                    </div>
                    <TierBar counts={b.counts} className="mt-1 h-2 gap-[3px] rounded-[4px]" />
                    <div className="flex justify-between text-[12.5px] leading-[1.4] text-ink-2">
                      <span>{fill(c.promises, { n: bn })}</span>
                      <span className="font-semibold text-ink">{fill(c.kept, { n: pct(keptCount(b.counts), bn) })}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      )}

      <Container className="pt-7 pb-8">
        <div className="mb-[18px] flex flex-wrap items-center gap-2.5 border-t border-line pt-4">
          <SectionLabel className="mb-0">{t.onTopic}</SectionLabel>
          <span className="rounded-full bg-surface px-[9px] py-[5px] text-[11px] leading-none font-semibold tracking-[.04em]">{topic.total}</span>
        </div>
        <PromiseTable rows={rows} labels={listDict[locale]} column="place" filters={["country", "rating"]} />
      </Container>
    </PageShell>
  );
}
