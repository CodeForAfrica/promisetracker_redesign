import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Official } from "@/lib/types";
import { Photo } from "@/components/ui/Photo";
import { TierBar } from "@/components/ui/TierBar";
import { Dots, Tag } from "@/components/ui/Text";
import { officialHref, officialTally } from "./OfficialCard";

/** Square portrait card with the tier bar beneath. */
export function PortraitCard({ official, locale }: { official: Official; locale: Locale }) {
  const tally = officialTally(official, locale);
  return (
    <Link href={officialHref(locale, official)} className="group flex flex-col text-ink hover:text-ink">
      <Photo src={official.portrait} alt="" sizes="(min-width: 1120px) 250px, 50vw" portrait className="aspect-square rounded-[10px]" />
      <div className="grid gap-2 pt-4">
        <Tag>
          <Dots parts={[official.title[locale], official.place[locale]]} />
        </Tag>
        <div className="text-[19px] leading-[1.25] font-semibold tracking-[-.01em] decoration-[1.5px] underline-offset-4 group-hover:underline">{official.name}</div>
        <TierBar counts={official.counts} className="mt-1.5 h-2 gap-[3px] rounded-[4px]" />
        <div className="flex justify-between gap-2 text-[12.5px] leading-[1.4] text-ink-2">
          <span>{tally.promises}</span>
          <span className="font-semibold text-ink">{tally.kept}</span>
        </div>
      </div>
    </Link>
  );
}
