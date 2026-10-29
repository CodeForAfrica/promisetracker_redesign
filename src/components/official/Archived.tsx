import Link from "next/link";
import { lp, type Locale } from "@/lib/i18n";
import type { Official } from "@/lib/types";
import { keptCount, total } from "@/content/ratings";
import { getOfficial } from "@/content/officials";
import { promisesBy } from "@/content/promises";
import { getTopic } from "@/content/site";
import { common } from "@/i18n/common";
import { officialDict } from "@/i18n/official";
import { fill } from "@/i18n/util";
import { longDate, monthYear, pct } from "@/lib/format";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { Pill } from "@/components/ui/Disclosure";
import { RatingChip } from "@/components/ui/RatingChip";
import { TierBar } from "@/components/ui/TierBar";
import { ArrowLink, Kicker, SectionLabel } from "@/components/ui/Text";
import { promiseHref } from "@/components/promise/PromiseCard";
import { TierLabels } from "./OfficialSections";
import { officialHref } from "./OfficialCard";

export function ArchivedBanner({ official, locale }: { official: Official; locale: Locale }) {
  const t = officialDict[locale];
  const next = official.closing?.successor ? getOfficial(official.closing.successor) : undefined;
  return (
    <div className="border-b border-line-soft bg-surface">
      <Container className="flex flex-wrap items-center gap-3.5 py-3.5">
        <span className="text-[9.5px] leading-none font-semibold tracking-[.14em] text-ink-2 uppercase">{t.archivedRecord}</span>
        {official.closing && <span className="text-[13px] leading-normal text-ink-2">{fill(t.archivedLine, { date: longDate(official.closing.ended, locale) })}</span>}
        <span className="flex-1" />
        {next && <ArrowLink href={officialHref(locale, next)}>{t.successor}</ArrowLink>}
      </Container>
    </div>
  );
}

export function ArchivedIntro({ official, locale }: { official: Official; locale: Locale }) {
  const t = officialDict[locale];
  const c = common[locale];
  const n = total(official.counts);
  const k = keptCount(official.counts);
  return (
    <>
      <SectionLabel>{t.whoThis}</SectionLabel>
      <div className="flex flex-wrap items-start gap-8">
        <span className="relative size-32 flex-none overflow-hidden rounded-full border-[3px] border-r-unstarted">
          <Photo src={official.portrait} alt={official.name} sizes="128px" className="size-full" imgClassName="grayscale" />
        </span>
        <div className="min-w-[min(100%,300px)] flex-1">
          <div className="mb-3.5 flex flex-wrap gap-2">
            <Pill tone="past">{t.past}</Pill>
            <Pill tone="muted">{official.title[locale]}</Pill>
            {official.county ? (
              <Link href={lp(locale, "/" + official.country + "/" + official.county)} className="hover:opacity-70">
                <Pill tone="muted">{official.place[locale]}</Pill>
              </Link>
            ) : (
              <Pill tone="muted">{official.place[locale]}</Pill>
            )}
            <Pill tone="muted">{fill(c.term, { from: monthYear(official.term.from, locale), to: monthYear(official.term.to, locale) })}</Pill>
          </div>
          <h1 className="mb-3.5 text-[38px] leading-[1.02] font-semibold tracking-[-.02em] sm:text-[48px]">{official.name}</h1>
          {official.bio && <p className="max-w-[62ch] text-[15.5px] leading-[1.65] text-ink-2">{official.bio[locale]}</p>}
        </div>
        <div className="flex-none sm:min-w-[150px] sm:text-right">
          <div className="text-[46px] leading-none font-semibold tracking-[-.02em]">{pct(k, n)}%</div>
          <div className="mt-1.5 text-[10.5px] leading-[1.6] tracking-[.05em] text-muted uppercase">
            {officialDict[locale].keptLine}
            <br />
            {fill(officialDict[locale].keptOf, { k, n })}
            {"\u00a0\u00a0·\u00a0\u00a0"}
            {t.final}
          </div>
        </div>
      </div>
    </>
  );
}

export function ClosingSummary({ official, locale }: { official: Official; locale: Locale }) {
  const t = officialDict[locale];
  if (!official.closing) return null;
  return (
    <>
      <SectionLabel rule>{t.closing}</SectionLabel>
      <div className="grid items-start gap-12 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div>
          <h2 className="mb-4 max-w-[32ch] text-[24px] leading-[1.12] font-semibold tracking-[-.02em] sm:text-[28px]">{official.closing.headline[locale]}</h2>
          {official.closing.body.map((p, i) => (
            <p key={i} className="mb-3.5 max-w-[60ch] text-[15px] leading-[1.65] text-ink-2 last:mb-0">
              {p[locale]}
            </p>
          ))}
        </div>
        <div className="pt-1.5">
          <TierBar counts={official.counts} className="mb-2.5 h-7 gap-1 rounded-lg" groupClassName="rounded-lg" />
          <div className="mb-5">
            <TierLabels official={official} locale={locale} />
          </div>
          <Kicker>{t.whySummary}</Kicker>
          <p className="text-[13px] leading-[1.6] text-ink-2">{t.whySummaryBody}</p>
        </div>
      </div>
    </>
  );
}

export function FinalList({ official, locale }: { official: Official; locale: Locale }) {
  const t = officialDict[locale];
  const items = promisesBy(official.slug);
  return (
    <>
      <div className="mb-[18px] flex flex-wrap items-baseline justify-between gap-4 border-t border-line pt-4">
        <SectionLabel className="mb-0">{t.finalList}</SectionLabel>
        <span className="text-[20px] leading-[1.2] font-medium">{total(official.counts)}</span>
      </div>
      <ul className="grid gap-px overflow-hidden rounded-lg bg-tile">
        {items.map((p) => (
          <li key={p.slug} className="grid items-center gap-x-5 gap-y-2 bg-white px-[18px] py-[15px] md:grid-cols-[150px_minmax(0,1fr)_120px_150px]">
            <RatingChip rating={p.rating} locale={locale} className="justify-self-start" />
            <Link href={promiseHref(locale, p)} className="text-[14.5px] leading-[1.4] font-medium text-ink hover:text-ink hover:opacity-70">
              {p.title}
            </Link>
            <span className="text-[10px] leading-[1.3] font-medium tracking-[.1em] text-muted uppercase">{getTopic(p.topic)?.name[locale]}</span>
            <span className="text-[11px] leading-normal tracking-[.04em] text-muted uppercase">{fill(t.finalDate, { date: monthYear(p.reviewed, locale) })}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
