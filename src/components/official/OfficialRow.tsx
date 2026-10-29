import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Official, Party } from "@/lib/types";
import { common } from "@/i18n/common";
import { countryDict } from "@/i18n/country";
import { fill } from "@/i18n/util";
import { Photo } from "@/components/ui/Photo";
import { TierBar } from "@/components/ui/TierBar";
import { Dots, Tag } from "@/components/ui/Text";
import { officialHref, officialTally } from "./OfficialCard";

const ROW = "grid min-w-0 grid-cols-[96px_minmax(0,1fr)] items-stretch gap-5 sm:grid-cols-[132px_minmax(0,1fr)]";

export function OfficialRow({ official, locale }: { official: Official; locale: Locale }) {
  const tally = officialTally(official, locale);
  return (
    <Link href={officialHref(locale, official)} className={"group text-ink hover:text-ink " + ROW}>
      <Photo src={official.portrait} alt="" sizes="132px" portrait className="h-full min-h-24 rounded-lg sm:min-h-[132px]" />
      <div className="grid min-w-0 content-center gap-2">
        <div className="text-[18px] leading-[1.3] font-semibold tracking-[-.012em] decoration-[1.5px] underline-offset-4 transition-colors group-hover:underline">
          {official.name}
        </div>
        <Tag>
          <Dots parts={[official.title[locale], official.place[locale]]} />
        </Tag>
        <div className="mt-1 grid gap-1.5">
          <div className="flex justify-between gap-3 text-[10px] leading-[1.2] font-medium tracking-[.08em] text-muted uppercase">
            <span>{tally.promises}</span>
            <span className="text-ink">{tally.kept}</span>
          </div>
          <TierBar counts={official.counts} className="h-1.5 gap-0.5 rounded-[3px]" />
          <div className="text-[12.5px] leading-normal font-medium tracking-[.03em] text-link">{common[locale].fullRecord}</div>
        </div>
      </div>
    </Link>
  );
}

export function PartyRow({ party, country, locale }: { party: Party; country: string; locale: Locale }) {
  const t = countryDict[locale];
  return (
    <div className={ROW}>
      <div className="flex h-full min-h-24 flex-col items-center justify-center gap-1 rounded-lg bg-surface sm:min-h-[132px]">
        <span className="text-[44px] leading-none font-semibold tracking-[-.03em]">{party.kept}</span>
        <span className="text-[10px] leading-[1.2] font-medium tracking-[.08em] text-muted uppercase">{fill(t.ofKept, { n: party.total })}</span>
      </div>
      <div className="grid min-w-0 content-center gap-2">
        <Tag>
          <Dots parts={[t.party, country]} />
        </Tag>
        <div className="text-[18px] leading-[1.3] font-semibold tracking-[-.01em]">{party.name}</div>
        <p className="text-[12.5px] leading-[1.55] text-ink-2">{party.note[locale]}</p>
      </div>
    </div>
  );
}

export function PastRow({ official, locale }: { official: Official; locale: Locale }) {
  const t = countryDict[locale];
  return (
    <div className={ROW}>
      <div className="flex h-full min-h-24 flex-col items-center justify-center gap-1.5 rounded-lg bg-surface sm:min-h-[132px]">
        <span className="text-[10px] leading-[1.2] font-medium tracking-[.08em] text-muted uppercase">{t.pastTerm}</span>
        <span className="text-[15px] leading-[1.2] font-semibold">
          {official.term.from.slice(0, 4)} – {official.term.to.slice(0, 4)}
        </span>
      </div>
      <div className="grid min-w-0 content-center gap-2">
        <Tag>
          <Dots parts={[t.pastAdmin, official.title[locale], official.place[locale]]} />
        </Tag>
        <Link href={officialHref(locale, official)} className="text-[18px] leading-[1.3] font-semibold tracking-[-.012em] text-ink hover:text-ink hover:opacity-70">
          {official.name}
        </Link>
        {official.summary && <p className="text-[12.5px] leading-[1.6] text-ink-2">{official.summary[locale]}</p>}
      </div>
    </div>
  );
}
