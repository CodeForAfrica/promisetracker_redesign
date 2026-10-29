import Link from "next/link";
import { lp, type Locale } from "@/lib/i18n";
import type { PromiseItem } from "@/lib/types";
import { RatingChip } from "@/components/ui/RatingChip";
import { Photo } from "@/components/ui/Photo";
import { Tag } from "@/components/ui/Text";

export function promiseHref(locale: Locale, p: PromiseItem): string {
  return lp(locale, "/" + p.country + "/p/" + p.slug);
}

/** Image-led card: photo, rating, title, place. */
export function PromiseCard({ promise, locale }: { promise: PromiseItem; locale: Locale }) {
  return (
    <article className="group">
      <Photo src={promise.image} alt="" sizes="(min-width: 1120px) 250px, (min-width: 720px) 25vw, 50vw" className="mb-3.5 aspect-[3/2] rounded-lg" />
      <RatingChip rating={promise.rating} locale={locale} />
      <h4 className="mt-[11px] mb-1.5 text-[17px] leading-[1.3] font-semibold tracking-[-.01em]">
        <Link href={promiseHref(locale, promise)} className="text-ink hover:text-ink hover:opacity-70">
          {promise.title}
        </Link>
      </h4>
      <Tag>{promise.place[locale]}</Tag>
    </article>
  );
}
