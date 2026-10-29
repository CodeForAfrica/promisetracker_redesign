import Link from "next/link";
import { lp, type Locale } from "@/lib/i18n";
import type { Official } from "@/lib/types";
import { PROPORTION_MIN, dominant, keptCount, ratingMeta, total } from "@/content/ratings";
import { common } from "@/i18n/common";
import { fill } from "@/i18n/util";
import { pct } from "@/lib/format";
import { cn } from "@/lib/cn";
import { Photo } from "@/components/ui/Photo";
import { Dots, Tag } from "@/components/ui/Text";

export function officialHref(locale: Locale, o: Official): string {
  return lp(locale, "/" + o.country + "/e/" + o.slug);
}

/** "142 promises · 58% kept", or a kept count when the record is too thin for a percentage. */
export function officialTally(o: Official, locale: Locale): { promises: string; kept: string } {
  const t = common[locale];
  const n = total(o.counts);
  const k = keptCount(o.counts);
  return {
    promises: n === 1 ? t.promise : fill(t.promises, { n }),
    kept: n >= PROPORTION_MIN ? fill(t.kept, { n: pct(k, n) }) : fill(t.keptOf, { k, n }),
  };
}

const RING: Record<string, string> = {
  completed: "border-r-completed",
  "in-progress": "border-r-progress",
  unstarted: "border-r-unstarted-ring",
  inconclusive: "border-r-inconclusive",
  "behind-schedule": "border-r-behind",
  stalled: "border-r-stalled",
};

/** Compact person card with a portrait ringed in the colour of their most common rating. */
export function OfficialCard({ official, locale }: { official: Official; locale: Locale }) {
  const tally = officialTally(official, locale);
  const ring = dominant(official.counts);
  return (
    <Link
      href={officialHref(locale, official)}
      className="group flex flex-col justify-between gap-3.5 rounded-lg border border-line-2 bg-white p-[18px] text-ink hover:text-ink hover:opacity-85"
      aria-label={official.name + ", " + ratingMeta[ring].label[locale]}
    >
      <div className="flex items-center gap-3">
        <span className={cn("relative size-[52px] flex-none overflow-hidden rounded-full border-2", RING[ring])}>
          <Photo src={official.portrait} alt="" sizes="52px" portrait className="size-full" />
        </span>
        <div className="min-w-0">
          <div className="text-[16px] leading-[1.25] font-semibold">{official.name}</div>
          <Tag className="mt-[5px]">
            <Dots parts={[official.title[locale], official.place[locale]]} />
          </Tag>
        </div>
      </div>
      <div className="border-t border-line-2 pt-3 text-[12.5px] leading-normal text-ink-2">
        <Dots parts={[tally.promises, tally.kept]} />
      </div>
    </Link>
  );
}
