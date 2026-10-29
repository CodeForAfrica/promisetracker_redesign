import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Official } from "@/lib/types";
import { PROPORTION_MIN, TIERS, keptCount, ratingMeta, tierCount, tierMeta, total } from "@/content/ratings";
import { getPromise, promisesBy } from "@/content/promises";
import { getTopic } from "@/content/site";
import { common } from "@/i18n/common";
import { officialDict } from "@/i18n/official";
import { fill, words } from "@/i18n/util";
import { longDate, monthYear, pct, shortDate } from "@/lib/format";
import { cn } from "@/lib/cn";
import { Photo } from "@/components/ui/Photo";
import { RatingChip } from "@/components/ui/RatingChip";
import { RatingLegend } from "@/components/ui/RatingLegend";
import { TierBar } from "@/components/ui/TierBar";
import { Dots, Kicker, SectionLabel, Tag } from "@/components/ui/Text";
import { promiseHref } from "@/components/promise/PromiseCard";
import { listDict } from "@/i18n/lists";

export function KeyPromise({ official, locale }: { official: Official; locale: Locale }) {
  const t = officialDict[locale];
  const kp = official.keyPromise;
  // Without an editor's pick, fall back to the first promise on the record.
  const p = kp ? getPromise(kp.slug) : promisesBy(official.slug)[0];
  if (!p) return null;
  const note = kp?.note[locale] ?? p.summary?.[locale];
  const href = promiseHref(locale, p);
  const n = total(official.counts);
  const alert = p.timing.tone === "alert";
  const due = fill(alert ? listDict[locale].overdue : listDict[locale].due, { date: monthYear(p.due, locale) });
  return (
    <>
      <SectionLabel rule>{t.keyPromise}</SectionLabel>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start gap-x-12 gap-y-7">
        <Link href={href} aria-label={p.title}>
          <Photo src={p.image} alt="" sizes="(min-width: 1024px) 500px, 100vw" className="aspect-[4/3] rounded-[10px]" />
        </Link>
        <div className="grid content-start gap-[22px]">
          <div>
            <div className="mb-3.5 flex flex-wrap items-center gap-[9px]">
              <RatingChip rating={p.rating} locale={locale} />
              <Tag>
                <Dots parts={[getTopic(p.topic)?.name[locale] ?? "", p.place[locale].split(",")[0], due]} />
              </Tag>
            </div>
            <h3 className="mb-3.5 max-w-[30ch] text-[26px] leading-[1.12] font-semibold tracking-[-.02em] sm:text-[30px]">
              <Link href={href} className="text-ink hover:text-ink hover:opacity-70">
                {p.title}
              </Link>
            </h3>
            {note && <p className="mb-5 max-w-[58ch] text-[15px] leading-[1.65] text-ink-2">{note}</p>}
            <Link href={href} className="inline-block rounded-lg bg-ink px-5 py-3.5 text-[12px] leading-none font-medium tracking-[.06em] text-white uppercase hover:text-white hover:opacity-70">
              {t.openPromise}
            </Link>
          </div>
          <div className="rounded-lg bg-surface px-[22px] py-5">
            <Kicker>{t.whyThis}</Kicker>
            <p className="text-[13.5px] leading-[1.65] text-ink-2">{n < PROPORTION_MIN || !kp ? fill(t.whyThin, { n: words(n, locale) }) : kp.why[locale]}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export function TierLabels({ official, locale }: { official: Official; locale: Locale }) {
  return (
    <div className="flex gap-1 text-[9.5px] leading-[1.4] font-medium tracking-[.09em] text-muted uppercase">
      {TIERS.map((tier) => {
        const v = tierCount(official.counts, tier);
        return (
          <span key={tier} style={{ flex: v + " 1 0%" }}>
            {tierMeta[tier].short[locale]}
            {"\u00a0\u00a0"}
            {v}
          </span>
        );
      })}
    </div>
  );
}

export function RecordSoFar({ official, locale }: { official: Official; locale: Locale }) {
  const t = officialDict[locale];
  const n = total(official.counts);
  const k = keptCount(official.counts);
  if (n < PROPORTION_MIN) {
    return (
      <>
        <SectionLabel rule>{t.record}</SectionLabel>
        <div className="grid items-start gap-[52px] md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
          <div>
            <RatingLegend counts={official.counts} locale={locale} hideEmpty leader />
            <div className="mt-1.5 text-[11px] leading-[1.6] tracking-[.05em] text-muted uppercase">
              n={n}
              {"\u00a0\u00a0·\u00a0\u00a0"}
              {common[locale].tooFew}
            </div>
          </div>
          <p className="max-w-[46ch] text-[13px] leading-[1.6] text-ink-2">
            {fill(t.thinRecordNote, { k: words(k, locale, true), n: words(n, locale), p: pct(k, n) })}
          </p>
        </div>
      </>
    );
  }
  return (
    <>
      <SectionLabel rule>{t.record}</SectionLabel>
      <div className="grid items-start gap-[52px] md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
        <div>
          <TierBar counts={official.counts} className="mb-2.5 h-[30px] gap-1 rounded-lg" groupClassName="rounded-lg" />
          <div className="mb-[22px]">
            <TierLabels official={official} locale={locale} />
          </div>
          {official.changedLastYear !== undefined && (
            <p className="max-w-[44ch] text-[13px] leading-[1.6] text-ink-2">{fill(t.changedNote, { n: words(official.changedLastYear, locale, true) })}</p>
          )}
        </div>
        <div>
          <RatingLegend counts={official.counts} locale={locale} leader />
          <div className="mt-1.5 text-[11px] leading-[1.6] tracking-[.05em] text-muted uppercase">
            n={n}
            {"\u00a0\u00a0·\u00a0\u00a0"}
            {fill(t.lastReviewed, { date: longDate(latestReview(official.slug) ?? official.term.from, locale) })}
          </div>
        </div>
      </div>
    </>
  );
}

function latestReview(slug: string): string | undefined {
  return promisesBy(slug)
    .map((p) => p.reviewed)
    .sort()
    .pop();
}

const BORDER: Record<string, string> = {
  completed: "border-r-completed",
  "in-progress": "border-r-progress",
  unstarted: "border-r-unstarted-ring",
  inconclusive: "border-r-inconclusive",
  "behind-schedule": "border-r-behind",
  stalled: "border-r-stalled",
};

export function RecentChanges({ official, locale }: { official: Official; locale: Locale }) {
  const t = officialDict[locale];
  const items = (official.changes ?? []).map((c) => ({ ...c, p: getPromise(c.slug) })).filter((c) => c.p);
  if (items.length === 0) return null;
  return (
    <>
      <SectionLabel rule>{t.latest}</SectionLabel>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,255px),1fr))] gap-[26px]">
        {items.map(({ p, was, date }) =>
          p ? (
            <article key={p.slug}>
              <Photo src={p.image} alt="" sizes="(min-width: 1120px) 330px, 100vw" className="mb-3.5 aspect-[3/2] rounded-lg" />
              <div className={cn("border-t-2 pt-3.5", BORDER[p.rating])}>
                <div className="mb-[11px] flex items-center gap-[9px]">
                  <RatingChip rating={p.rating} locale={locale} />
                  <Tag>{fill(t.was, { rating: ratingMeta[was].label[locale] })}</Tag>
                </div>
                <h3 className="mb-2 text-[17px] leading-[1.3] font-semibold">
                  <Link href={promiseHref(locale, p)} className="text-ink hover:text-ink hover:opacity-70">
                    {p.title}
                  </Link>
                </h3>
                <Tag>{fill(t.changed, { date: shortDate(date, locale) })}</Tag>
              </div>
            </article>
          ) : null,
        )}
      </div>
    </>
  );
}

export function LatestAnalysis({ official, locale }: { official: Official; locale: Locale }) {
  const t = officialDict[locale];
  const items = official.analysis ?? [];
  if (items.length === 0) return null;
  return (
    <>
      <SectionLabel rule>{t.analysis}</SectionLabel>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] gap-x-12 gap-y-8">
        {items.map((a) => (
          <article key={a.title} className="grid items-start gap-6 sm:grid-cols-[200px_minmax(0,1fr)]">
            <Photo src={a.image} alt="" sizes="200px" className="aspect-[3/2] rounded-lg" />
            <div>
              <h3 className="mb-2 text-[19px] leading-[1.3] font-semibold tracking-[-.01em]">{a.title}</h3>
              <p className="mb-3 text-[14px] leading-[1.6] text-ink-2">{a.dek}</p>
              <Tag>
                <Dots parts={a.byline ? [longDate(a.date, locale), a.byline] : [longDate(a.date, locale)]} />
              </Tag>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
