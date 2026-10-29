import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/i18n";
import { getOfficial } from "@/content/officials";
import { getPromise, promises } from "@/content/promises";
import { detailFor } from "@/content/promise-details";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import {
  EvidenceList,
  PromiseAnalysis,
  PromiseFacts,
  PromiseHero,
  RatingTimeline,
  UpdateTeaser,
} from "@/components/promise/PromiseSections";

type Params = { locale: string; country: string; promise: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => promises.map((p) => ({ locale, country: p.country, promise: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { promise } = await params;
  const p = getPromise(promise);
  return { title: p?.title, description: p?.summary?.en };
}

export default async function PromisePage({ params }: { params: Promise<Params> }) {
  const { locale, country, promise: slug } = await params;
  const promise = getPromise(slug);
  if (!isLocale(locale) || !promise || promise.country !== country) notFound();
  const official = getOfficial(promise.official);
  const detail = detailFor(promise.slug);

  return (
    <PageShell locale={locale} active={promise.country}>
      <PromiseHero promise={promise} official={official} locale={locale} />
      <Container className="pt-9 pb-8">
        <PromiseFacts promise={promise} official={official} detail={detail} locale={locale} />
      </Container>
      <Container className="pt-7 pb-8">
        <RatingTimeline promise={promise} detail={detail} locale={locale} />
      </Container>
      <Container className="pt-7 pb-8">
        <EvidenceList promise={promise} locale={locale} />
      </Container>
      {detail?.analysis && (
        <Container className="pt-7 pb-8">
          <PromiseAnalysis detail={detail} locale={locale} />
        </Container>
      )}
      <Container className="pt-7 pb-8">
        <UpdateTeaser promise={promise} locale={locale} />
      </Container>
    </PageShell>
  );
}
