import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, lp, locales } from "@/lib/i18n";
import { getCountry } from "@/content/countries";
import { getOfficial } from "@/content/officials";
import { getPromise, promises } from "@/content/promises";
import { detailFor, type HistoryEntry } from "@/content/promise-details";
import { promiseDict } from "@/i18n/promise";
import { shortDate } from "@/lib/format";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { RatingChip } from "@/components/ui/RatingChip";
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
  return { title: p ? "Rating history · " + p.title : undefined };
}

const crumbLink = "text-muted hover:text-ink";

export default async function HistoryPage({ params }: { params: Promise<Params> }) {
  const { locale, country, promise: slug } = await params;
  const promise = getPromise(slug);
  if (!isLocale(locale) || !promise || promise.country !== country) notFound();
  const t = promiseDict[locale];
  const official = getOfficial(promise.official);
  const c = getCountry(country);
  const history: HistoryEntry[] = detailFor(slug)?.history ?? [
    { date: promise.reviewed, from: "first", to: promise.rating, why: promise.summary ?? { en: "", fr: "" }, source: { label: "" } },
  ];
  const cols = "md:grid-cols-[120px_150px_150px_minmax(0,1.6fr)]";

  return (
    <PageShell locale={locale} active={promise.country}>
      <Container className="pt-7 pb-8">
        <nav aria-label="Breadcrumb" className="mb-2.5 text-[11px] leading-[1.6] tracking-[.08em] text-muted uppercase">
          {c && (
            <Link href={lp(locale, "/" + c.code)} className={crumbLink}>
              {c.name[locale]}
            </Link>
          )}
          {official && (
            <>
              {"\u00a0\u00a0›\u00a0\u00a0"}
              <Link href={officialHref(locale, official)} className={crumbLink}>
                {official.name}
              </Link>
            </>
          )}
          {"\u00a0\u00a0›\u00a0\u00a0"}
          <Link href={promiseHref(locale, promise)} className={crumbLink}>
            {promise.title}
          </Link>
          {"\u00a0\u00a0›\u00a0\u00a0"}
          <span aria-current="page">{t.ratingHistory}</span>
        </nav>
        <h1 className="mb-2.5 max-w-[30ch] text-[30px] leading-[1.12] font-semibold tracking-[-.016em] sm:text-[36px]">{t.historyTitle}</h1>
        <p className="mb-1 max-w-[64ch] text-[15px] leading-[1.65] text-ink-2">{t.historyLede}</p>
      </Container>

      <Container className="pt-1 pb-8">
        <div role="table" className="grid gap-px overflow-hidden rounded-lg bg-tile">
          <div role="row" className={"hidden gap-5 bg-surface px-[18px] py-[11px] text-[9.5px] leading-none font-semibold tracking-[.14em] text-muted uppercase md:grid " + cols}>
            <span role="columnheader">{t.date}</span>
            <span role="columnheader">{t.from}</span>
            <span role="columnheader">{t.to}</span>
            <span role="columnheader">{t.whyChanged}</span>
          </div>
          {history.map((h) => (
            <div role="row" key={h.date + h.from} className={"grid items-baseline gap-x-5 gap-y-2 bg-white px-[18px] py-[15px] grid-cols-[auto_auto_1fr] " + cols}>
              <span role="cell" className="text-[12.5px] leading-normal font-medium max-md:col-span-3">
                {shortDate(h.date, locale)}
              </span>
              <span role="cell" className="justify-self-start">
                {h.from === "correction" || h.from === "first" ? (
                  <span className="text-[11px] leading-normal tracking-[.06em] text-muted uppercase">{h.from === "correction" ? t.correction : t.first}</span>
                ) : (
                  <RatingChip rating={h.from} locale={locale} />
                )}
              </span>
              <span role="cell" className="justify-self-start">
                <RatingChip rating={h.to} locale={locale} />
              </span>
              <span role="cell" className="max-md:col-span-3">
                <span className="mb-[5px] block text-[13px] leading-[1.6] text-ink-2">{h.why[locale]}</span>
                {h.source.label &&
                  (h.source.href ? (
                    <a href={h.source.href} target="_blank" rel="noopener noreferrer" className="text-[12.5px] leading-normal font-medium tracking-[.03em]">
                      {h.source.label} →
                    </a>
                  ) : (
                    <span className="text-[12.5px] leading-normal font-medium tracking-[.03em] text-link">{h.source.label} →</span>
                  ))}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-[26px] bg-surface px-6 py-[22px]">
          {[
            [t.note1Title, t.note1],
            [t.note2Title, t.note2],
            [t.note3Title, t.note3],
          ].map(([title, body]) => (
            <div key={title}>
              <div className="mb-1.5 text-[14px] leading-[1.4] font-medium">{title}</div>
              <p className="text-[13px] leading-[1.6] text-ink-2">{body}</p>
            </div>
          ))}
        </div>
      </Container>
    </PageShell>
  );
}
