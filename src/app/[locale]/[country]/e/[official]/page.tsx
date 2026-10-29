import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/i18n";
import { getOfficial, officials } from "@/content/officials";
import { promisesBy } from "@/content/promises";
import { total } from "@/content/ratings";
import { officialDict } from "@/i18n/official";
import { listDict } from "@/i18n/lists";
import { toRowData } from "@/lib/rows";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { Disclosure } from "@/components/ui/Disclosure";
import { SectionLabel } from "@/components/ui/Text";
import { PromiseTable } from "@/components/promise/PromiseTable";
import { OfficialHero } from "@/components/official/OfficialHero";
import { KeyPromise, LatestAnalysis, RecentChanges, RecordSoFar } from "@/components/official/OfficialSections";
import { ArchivedBanner, ArchivedIntro, ClosingSummary, FinalList } from "@/components/official/Archived";

type Params = { locale: string; country: string; official: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => officials.map((o) => ({ locale, country: o.country, official: o.slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { official } = await params;
  return { title: getOfficial(official)?.name };
}

export default async function OfficialPage({ params }: { params: Promise<Params> }) {
  const { locale, country, official: slug } = await params;
  const official = getOfficial(slug);
  if (!isLocale(locale) || !official || official.country !== country) notFound();
  const t = officialDict[locale];

  if (official.status === "archived") {
    return (
      <PageShell locale={locale} active={official.country}>
        <ArchivedBanner official={official} locale={locale} />
        <Container className="pt-7 pb-8">
          <ArchivedIntro official={official} locale={locale} />
        </Container>
        <Container className="pt-7 pb-8">
          <ClosingSummary official={official} locale={locale} />
        </Container>
        <Container className="pt-7 pb-8">
          <FinalList official={official} locale={locale} />
        </Container>
      </PageShell>
    );
  }

  const rows = promisesBy(official.slug).map((p) => toRowData(p, locale));

  return (
    <PageShell locale={locale} active={official.country}>
      <OfficialHero official={official} locale={locale} />
      <Container className="pt-6">
        <Disclosure summary={t.whatIsPromise}>{t.whatIsPromiseBody}</Disclosure>
      </Container>
      <Container className="pt-7 pb-5">
        <KeyPromise official={official} locale={locale} />
      </Container>
      <Container className="pt-7 pb-8">
        <RecordSoFar official={official} locale={locale} />
      </Container>
      <Container className="pt-7 pb-8">
        <div className="mb-[18px] flex flex-wrap items-center gap-2.5 border-t border-line pt-4">
          <SectionLabel className="mb-0">{t.promiseList}</SectionLabel>
          <span className="rounded-full bg-surface px-[9px] py-[5px] text-[11px] leading-none font-semibold tracking-[.04em]">{total(official.counts)}</span>
        </div>
        <PromiseTable rows={rows} labels={listDict[locale]} column="topic" />
      </Container>
      {official.changes && (
        <Container className="pt-7 pb-8">
          <RecentChanges official={official} locale={locale} />
        </Container>
      )}
      {official.analysis && (
        <Container className="pt-7 pb-8">
          <LatestAnalysis official={official} locale={locale} />
        </Container>
      )}
    </PageShell>
  );
}
