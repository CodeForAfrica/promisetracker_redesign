import Link from "next/link";
import Image from "next/image";
import { lp, type Locale } from "@/lib/i18n";
import type { Official, PromiseItem } from "@/lib/types";
import type { PromiseDetail, TimelineStep } from "@/content/promise-details";
import { evidenceFor, evidenceKind } from "@/content/evidence";
import { getCountry } from "@/content/countries";
import { ratingMeta, tierMeta } from "@/content/ratings";
import { getTopic } from "@/content/site";
import { promiseDict } from "@/i18n/promise";
import { officialDict } from "@/i18n/official";
import { fill } from "@/i18n/util";
import { longDate, monthYear } from "@/lib/format";
import { cn } from "@/lib/cn";
import { Photo } from "@/components/ui/Photo";
import { RatingChip } from "@/components/ui/RatingChip";
import { Disclosure } from "@/components/ui/Disclosure";
import { ArrowLink, Dots, Kicker, SectionLabel, Tag } from "@/components/ui/Text";
import { Container } from "@/components/ui/Container";
import { officialHref } from "@/components/official/OfficialCard";
import { CopyCitation } from "./CopyCitation";
import { promiseHref } from "./PromiseCard";

const crumb = "text-white hover:text-white hover:opacity-80";

export function PromiseHero({ promise, official, locale }: { promise: PromiseItem; official?: Official; locale: Locale }) {
  const country = getCountry(promise.country);
  const topic = getTopic(promise.topic);
  const tier = ratingMeta[promise.rating].tier;
  return (
    <section className="relative isolate flex min-h-[520px] items-end overflow-hidden bg-ink text-white">
      <Photo src={promise.image.replace(/w=\d+&h=\d+/, "w=1800&h=900")} alt="" priority sizes="100vw" className="absolute! inset-0 -z-20" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(12,14,18,.2)_0%,rgba(12,14,18,.38)_42%,rgba(12,14,18,.9)_100%)]" />
      <Container className="pt-16 pb-10">
        <nav aria-label="Breadcrumb" className="mb-3 text-[11px] leading-[1.6] font-medium tracking-[.12em] uppercase">
          {country && (
            <Link href={lp(locale, "/" + country.code)} className={crumb}>
              {country.name[locale]}
            </Link>
          )}
          {official?.county && (
            <>
              {"\u00a0\u00a0›\u00a0\u00a0"}
              <Link href={lp(locale, "/" + promise.country + "/" + official.county)} className={crumb}>
                {official.place[locale]}
              </Link>
            </>
          )}
          {topic && (
            <>
              {"\u00a0\u00a0›\u00a0\u00a0"}
              <Link href={lp(locale, "/topics/" + topic.slug)} className={crumb}>
                {topic.name[locale]}
              </Link>
            </>
          )}
        </nav>
        <div className="mb-4 flex flex-wrap items-center gap-[9px]">
          <RatingChip rating={promise.rating} locale={locale} />
          <span className="rounded-lg bg-surface px-2.5 py-1.5 text-[9.5px] leading-none font-medium tracking-[.09em] text-ink uppercase">{tierMeta[tier].label[locale]}</span>
          <Tag className="text-line-2">
            <Dots parts={[topic?.name[locale] ?? "", promise.place[locale].replace(", " + (country?.name[locale] ?? ""), "")]} />
          </Tag>
        </div>
        <h1 className="max-w-[24ch] text-[34px] leading-[1.06] font-semibold tracking-[-.025em] text-balance text-white sm:text-[52px]">{promise.title}</h1>
      </Container>
    </section>
  );
}

function Fact({ label, value, note, href }: { label: string; value: string; note: string; href?: string }) {
  return (
    <div>
      <Kicker>{label}</Kicker>
      <div className="text-[14.5px] leading-[1.4] font-medium">
        {href ? (
          <Link href={href} className="text-ink hover:text-ink hover:opacity-70">
            {value}
          </Link>
        ) : (
          value
        )}
      </div>
      <Tag className="mt-[3px]">{note}</Tag>
    </div>
  );
}

export function PromiseFacts({ promise, official, detail, locale }: { promise: PromiseItem; official?: Official; detail?: PromiseDetail; locale: Locale }) {
  const t = promiseDict[locale];
  const o = officialDict[locale];
  const m = ratingMeta[promise.rating];
  const changes = detail ? detail.history.filter((h) => h.from !== "correction" && h.from !== "first").length : 0;
  const body = detail?.body[locale] ?? promise.summary?.[locale];
  return (
    <div className="grid items-start gap-[52px] lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
      <div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,160px),1fr))] gap-[22px] border-y border-line-soft py-5">
          {official && (
            <Fact
              label={t.promisedBy}
              value={official.name}
              href={officialHref(locale, official)}
              note={official.title[locale] + ", " + official.place[locale]}
            />
          )}
          <Fact label={t.whereSaid} value={detail?.said[locale] ?? "—"} note={longDate(detail?.saidDate ?? promise.made, locale)} />
          <Fact label={t.byWhen} value={detail?.byWhen[locale] ?? monthYear(promise.due, locale)} note={detail?.byWhenNote[locale] ?? promise.timing.text[locale]} />
        </div>
        {body && <p className="mt-5 max-w-[62ch] text-[16px] leading-[1.65] text-ink-2">{body}</p>}
        <Disclosure summary={o.whatIsPromise} className="mt-6 border-t border-line-soft">
          {o.whatIsPromiseBody}
        </Disclosure>
      </div>
      <aside className="rounded-lg bg-surface px-6 py-[22px] lg:sticky lg:top-[72px]">
        <Kicker>{t.ratingAndDate}</Kicker>
        <div className="mb-1.5 text-[19px] leading-[1.3] font-medium">{m.label[locale]}</div>
        <p className="mb-[18px] text-[13.5px] leading-[1.65] text-ink-2">{m.description[locale]}</p>
        <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,110px),1fr))] gap-x-5 gap-y-4 border-t border-line-2 pt-4">
          {[
            { k: t.lastReviewed, v: longDate(promise.reviewed, locale) },
            { k: t.firstPublished, v: longDate(detail?.firstPublished ?? promise.made, locale) },
            { k: t.changes, v: String(changes) },
          ].map((d) => (
            <div key={d.k} className="flex flex-col-reverse gap-[5px]">
              <dd className="text-[14px] leading-[1.35] font-medium text-ink">{d.v}</dd>
              <dt className="text-[10.5px] leading-[1.3] tracking-[.06em] text-muted uppercase">{d.k}</dt>
            </div>
          ))}
        </dl>
        <div className="mt-[18px] border-t border-line-2 pt-4">
          <ArrowLink href={lp(locale, "/methodology")}>{t.howDecided}</ArrowLink>
        </div>
      </aside>
    </div>
  );
}

function defaultTimeline(p: PromiseItem): TimelineStep[] {
  return [
    { kind: "made", date: p.made, note: { en: "", fr: "" } },
    { kind: "rating", rating: p.rating, date: p.reviewed, current: true, note: p.summary ?? { en: "", fr: "" } },
    { kind: "deadline", date: p.due, note: p.timing.text },
  ];
}

export function RatingTimeline({ promise, detail, locale }: { promise: PromiseItem; detail?: PromiseDetail; locale: Locale }) {
  const t = promiseDict[locale];
  const steps = detail?.timeline ?? defaultTimeline(promise);
  const now = detail?.now ?? 50;
  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-line pt-4">
        <SectionLabel className="mb-0">{t.howChanged}</SectionLabel>
        <ArrowLink href={promiseHref(locale, promise) + "/history"}>{t.fullHistory}</ArrowLink>
      </div>
      <div className="relative pt-[30px] pb-2.5">
        <div aria-hidden="true" className="absolute inset-x-0 top-[69px] hidden h-0.5 bg-line-soft md:block" />
        <div aria-hidden="true" className="absolute top-[69px] left-0 hidden h-0.5 bg-ink md:block" style={{ width: now + "%" }} />
        <ol className="relative grid gap-6 border-l-2 border-line-soft pl-5 md:flex md:justify-between md:gap-3 md:border-l-0 md:pl-0">
          {steps.map((s, i) => {
            const label =
              s.kind === "rating" ? (
                <RatingChip rating={s.rating} locale={locale} />
              ) : (
                <span className="text-[10.5px] leading-normal tracking-[.06em] text-ink uppercase">{s.kind === "made" ? t.promiseMade : t.deadline}</span>
              );
            const current = s.kind === "rating" && s.current;
            const dot =
              s.kind === "made"
                ? "size-3 bg-ink"
                : s.kind === "deadline"
                  ? "size-3 border-2 border-ink bg-white"
                  : cn(ratingMeta[s.rating].swatch, "shadow-none!", current ? "size-4 border-[3px] border-ink" : "size-3 border-2 border-ink");
            const date = monthYear(s.date, locale);
            return (
              <li key={i} className="md:w-[19%]" aria-current={current ? "step" : undefined}>
                <div className="mb-2.5 flex h-[22px] items-end">{label}</div>
                <div className="mb-3 flex h-4 items-center max-md:hidden">
                  <i className={cn("block rounded-full", dot)} />
                </div>
                <div className="text-[12.5px] leading-[1.4] font-medium">{current ? fill(t.toNow, { date }) : date}</div>
                {s.note[locale] && <div className="mt-[3px] text-[11.5px] leading-[1.55] text-ink-2">{s.note[locale]}</div>}
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}

export function EvidenceList({ promise, locale }: { promise: PromiseItem; locale: Locale }) {
  const t = promiseDict[locale];
  const items = evidenceFor(promise.slug);
  const url = "promisetracker.org" + promiseHref("en", promise);
  const citation = fill(t.citation, {
    title: promise.title,
    rating: ratingMeta[promise.rating].label[locale],
    date: longDate(promise.reviewed, locale),
    url,
  });
  return (
    <>
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-4 border-t border-line pt-4">
        <SectionLabel className="mb-0">{t.evidence}</SectionLabel>
        <span className="text-[11px] leading-normal tracking-[.05em] text-muted uppercase">
          {promise.sources === 1 ? t.oneCited : fill(t.allCited, { n: promise.sources })}
        </span>
      </div>
      {items.length === 0 ? (
        <p className="rounded-lg bg-surface p-6 text-[14px] leading-[1.6] text-ink-2">{t.noEvidence}</p>
      ) : (
        <ul className="grid gap-px overflow-hidden rounded-lg bg-tile">
          {items.map((e) => (
            <li key={e.title}>
              <a
                href={e.link?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="grid items-center gap-x-[22px] gap-y-2 bg-white py-3.5 pr-5 pl-3.5 text-ink hover:bg-surface hover:text-ink sm:grid-cols-[96px_110px_minmax(0,1fr)] lg:grid-cols-[96px_110px_minmax(0,1fr)_180px]"
              >
                <span className="relative hidden h-[72px] w-24 overflow-hidden rounded-md bg-tile shadow-[inset_0_0_0_1px_var(--color-line-2)] sm:block">
                  {e.thumb && <Image src={e.thumb} alt="" fill sizes="96px" className="object-cover" />}
                </span>
                <Tag>{evidenceKind[e.kind][locale]}</Tag>
                <span>
                  <span className="mb-1 block text-[15px] leading-[1.45] font-medium">{e.title}</span>
                  <span className="text-[11.5px] leading-normal tracking-[.04em] text-muted uppercase">{(e.meta ?? e.source)[locale]}</span>
                  {e.link && <span className="block text-[12.5px] leading-normal font-medium tracking-[.03em] text-link">{e.link.label[locale]}</span>}
                </span>
                {e.finding && <span className="text-[11px] leading-normal tracking-[.04em] text-muted uppercase">{e.finding[locale]}</span>}
              </a>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-[26px] border-l-2 border-verified bg-surface px-[22px] py-5">
        <Kicker className="text-verified-ink">{t.cite}</Kicker>
        <p className="mb-2.5 max-w-[86ch] text-[13px] leading-[1.75] text-ink">{citation}</p>
        <CopyCitation text={citation} label={t.copy} done={t.copied} />
      </div>
    </>
  );
}

export function PromiseAnalysis({ detail, locale }: { detail?: PromiseDetail; locale: Locale }) {
  const t = promiseDict[locale];
  const a = detail?.analysis;
  if (!a) return null;
  return (
    <>
      <SectionLabel rule>{t.analysis}</SectionLabel>
      <div className="grid items-center gap-12 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <Photo src={a.image} alt="" sizes="(min-width: 768px) 560px, 100vw" className="aspect-video rounded-[10px]" />
        <div>
          <h3 className="mb-3 max-w-[30ch] text-[24px] leading-[1.25] font-semibold tracking-[-.02em] sm:text-[26px]">{a.title}</h3>
          <p className="mb-4 max-w-[60ch] text-[15px] leading-[1.65] text-ink-2">{a.dek}</p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[12.5px] leading-normal font-medium tracking-[.03em] text-link">{t.readArticle}</span>
            <Tag>{longDate(a.date, locale)}</Tag>
          </div>
        </div>
      </div>
    </>
  );
}

export function UpdateTeaser({ promise, locale }: { promise: PromiseItem; locale: Locale }) {
  const t = promiseDict[locale];
  const base = promiseHref(locale, promise) + "/update";
  const kinds = [
    { key: "evidence", label: t.kindEvidence },
    { key: "correction", label: t.kindCorrection },
    { key: "changed", label: t.kindChanged },
  ];
  return (
    <>
      <SectionLabel rule>{t.submit}</SectionLabel>
      <div className="grid items-start gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div>
          <h3 className="mb-2.5 text-[24px] leading-[1.25] font-semibold tracking-[-.02em]">{t.seen}</h3>
          <p className="mb-5 max-w-[52ch] text-[14.5px] leading-[1.65] text-ink-2">{t.seenBody}</p>
        </div>
        <div>
          <div className="mb-5 flex flex-wrap gap-2">
            {kinds.map((k, i) => (
              <Link
                key={k.key}
                href={base + "?kind=" + k.key}
                className={cn(
                  "rounded-lg border px-[15px] py-[13px] text-[11.5px] leading-none font-medium",
                  i === 0 ? "border-verified bg-white text-verified hover:text-verified" : "border-line text-ink-2 hover:border-ink hover:text-ink",
                )}
              >
                {k.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3.5">
            <Link href={base} className="rounded-lg bg-verified px-[22px] py-[15px] text-[12px] leading-none font-medium tracking-[.06em] text-white uppercase hover:text-white hover:opacity-85">
              {t.submit}
            </Link>
            <span className="text-[11px] leading-[1.6] tracking-[.05em] text-muted uppercase">{t.noAccount}</span>
          </div>
        </div>
      </div>
    </>
  );
}

/** Slim context bar shown above the update form and its confirmation. */
export function PromiseContextBar({ promise, official, locale }: { promise: PromiseItem; official?: Official; locale: Locale }) {
  return (
    <div className="border-b border-line-soft bg-surface">
      <Container className="flex flex-wrap items-center gap-3.5 py-4">
        <RatingChip rating={promise.rating} locale={locale} />
        <Link href={promiseHref(locale, promise)} className="text-[14px] leading-[1.4] font-medium text-ink hover:text-ink hover:opacity-70">
          {promise.title}
        </Link>
        <span className="flex-1" />
        {official && (
          <Tag>
            <Dots parts={[official.name, official.place[locale]]} />
          </Tag>
        )}
      </Container>
    </div>
  );
}
