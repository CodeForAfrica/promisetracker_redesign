import type { Locale } from "@/lib/i18n";
import type { PromiseItem } from "@/lib/types";
import { getOfficial } from "@/content/officials";
import { getCountry } from "@/content/countries";
import { ratingMeta } from "@/content/ratings";
import { getTopic } from "@/content/site";
import { listDict } from "@/i18n/lists";
import { fill } from "@/i18n/util";
import { monthYear } from "@/lib/format";
import { promiseHref } from "@/components/promise/PromiseCard";
import { officialHref } from "@/components/official/OfficialCard";

/** A serialisable, pre-translated promise row for client-side lists. */
export type PromiseRowData = {
  slug: string;
  href: string;
  image: string;
  title: string;
  rating: string;
  ratingLabel: string;
  chip: string;
  topic: string;
  topicName: string;
  official: string;
  officialName: string;
  country: string;
  countryName: string;
  placeName: string;
  officialHref?: string;
  dueLabel: string;
  dueAlert: boolean;
  dueSort: string;
  reviewed: string;
};

export function toRowData(p: PromiseItem, locale: Locale): PromiseRowData {
  const t = listDict[locale];
  const o = getOfficial(p.official);
  const due = monthYear(p.due, locale);
  const alert = p.timing.tone === "alert";
  return {
    slug: p.slug,
    href: promiseHref(locale, p),
    image: p.image,
    title: p.title,
    rating: p.rating,
    ratingLabel: ratingMeta[p.rating].label[locale],
    chip: ratingMeta[p.rating].chip,
    topic: p.topic,
    topicName: getTopic(p.topic)?.name[locale] ?? p.topic,
    official: p.official,
    officialName: o?.name ?? "",
    country: p.country,
    countryName: getCountry(p.country)?.name[locale] ?? p.country,
    placeName: p.place[locale],
    officialHref: o ? officialHref(locale, o) : undefined,
    dueLabel: fill(p.rating === "completed" ? t.met : alert ? t.overdue : t.due, { date: due }),
    dueAlert: alert,
    dueSort: p.due,
    reviewed: p.reviewed,
  };
}
