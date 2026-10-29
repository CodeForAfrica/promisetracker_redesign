import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { PromiseItem } from "@/lib/types";
import { getOfficial } from "@/content/officials";
import { ratingMeta } from "@/content/ratings";
import { common } from "@/i18n/common";
import { fill } from "@/i18n/util";
import { monthYear, shortDate } from "@/lib/format";
import { cn } from "@/lib/cn";
import { Photo } from "@/components/ui/Photo";
import { RatingChip } from "@/components/ui/RatingChip";
import { promiseHref } from "./PromiseCard";

const TONE = { neutral: "text-ink-2", alert: "text-r-stalled", good: "text-r-completed" } as const;

/** Thumbnail row with the promise window drawn as a thin progress line. */
export function PromiseRow({ promise, locale }: { promise: PromiseItem; locale: Locale }) {
  const c = common[locale];
  const who = getOfficial(promise.official);
  return (
    <Link
      href={promiseHref(locale, promise)}
      className="grid min-w-0 grid-cols-[96px_minmax(0,1fr)] items-stretch gap-5 text-ink hover:text-ink hover:opacity-80 sm:grid-cols-[132px_minmax(0,1fr)]"
    >
      <Photo src={promise.image} alt="" sizes="132px" className="h-full min-h-24 rounded-lg sm:min-h-[132px]" />
      <div className="grid min-w-0 content-center gap-2">
        <div className="flex min-w-0 items-center justify-between gap-3">
          <RatingChip rating={promise.rating} locale={locale} className="flex-none" />
          {who && (
            <span className="min-w-0 truncate text-[12.5px] leading-[1.4] text-ink-2 max-sm:hidden">
              {who.name} <span className="text-faint">·</span> {who.titleShort[locale]}
            </span>
          )}
        </div>
        <div className="text-[16px] leading-[1.3] font-semibold tracking-[-.012em] sm:text-[18px]">{promise.title}</div>
        <div className="mt-1 grid gap-1.5">
          <div className="flex justify-between gap-3 text-[10px] leading-[1.2] font-medium tracking-[.08em] text-muted uppercase">
            <span>{monthYear(promise.made, locale)}</span>
            <span>{fill(c.due, { date: monthYear(promise.due, locale) })}</span>
          </div>
          <div className="flex h-1 overflow-hidden rounded-[2px] bg-line-2">
            <i className={cn("block", ratingMeta[promise.rating].swatch)} style={{ width: promise.elapsed + "%" }} />
          </div>
          <div className="flex flex-wrap justify-between gap-x-3 gap-y-1 text-[12px] leading-[1.4] text-muted">
            <span className={cn("font-medium", TONE[promise.timing.tone])}>{promise.timing.text[locale]}</span>
            <span>
              {fill(c.reviewed, { date: shortDate(promise.reviewed, locale) })} · {promise.sources === 1 ? c.source : fill(c.sources, { n: promise.sources })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/** Small stacked card used where a record is thin. */
export function PromiseMini({ promise, locale }: { promise: PromiseItem; locale: Locale }) {
  return (
    <Link href={promiseHref(locale, promise)} className="flex min-w-0 flex-col gap-3 text-ink hover:text-ink hover:opacity-70">
      <Photo src={promise.image} alt="" sizes="240px" className="aspect-[3/2] rounded-lg" />
      <span className="flex">
        <RatingChip rating={promise.rating} locale={locale} />
      </span>
      <span className="text-[15px] leading-[1.4] font-medium">{promise.title}</span>
    </Link>
  );
}
