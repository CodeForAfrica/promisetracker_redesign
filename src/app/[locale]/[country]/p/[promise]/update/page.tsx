import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/i18n";
import { getOfficial } from "@/content/officials";
import { getPromise, promises } from "@/content/promises";
import { ratingMeta } from "@/content/ratings";
import { promiseDict } from "@/i18n/promise";
import { longDate } from "@/lib/format";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { PromiseContextBar } from "@/components/promise/PromiseSections";
import { UpdateForm } from "@/components/promise/UpdateForm";
import { officialHref } from "@/components/official/OfficialCard";
import { promiseHref } from "@/components/promise/PromiseCard";

type Params = { locale: string; country: string; promise: string };
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => promises.map((p) => ({ locale, country: p.country, promise: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { promise } = await params;
  const p = getPromise(promise);
  return { title: p ? "Submit an update · " + p.title : undefined };
}

export default async function UpdatePage({ params }: { params: Promise<Params> }) {
  const { locale, country, promise: slug } = await params;
  const promise = getPromise(slug);
  if (!isLocale(locale) || !promise || promise.country !== country) notFound();
  const official = getOfficial(promise.official);
  const where = promise.place[locale].split(",")[0];

  return (
    <PageShell locale={locale} active={promise.country}>
      <PromiseContextBar promise={promise} official={official} locale={locale} />
      <Container className="pt-7 pb-10">
        <Suspense>
          <UpdateForm
            labels={promiseDict[locale]}
            initialWhere={where}
            countryCode={promise.country}
            promiseHref={promiseHref(locale, promise)}
            officialHref={official ? officialHref(locale, official) : undefined}
            sentDate={longDate(new Date().toISOString().slice(0, 10), locale)}
            context={{
              promise: promise.title,
              official: official?.name ?? "",
              where: promise.place[locale],
              rating: ratingMeta[promise.rating].label[locale],
            }}
          />
        </Suspense>
      </Container>
    </PageShell>
  );
}
