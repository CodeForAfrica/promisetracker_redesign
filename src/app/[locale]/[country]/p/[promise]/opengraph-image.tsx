import { isLocale, locales } from "@/lib/i18n";
import { ogContentType, ogSize, shareCard } from "@/lib/og";
import { getOfficial } from "@/content/officials";
import { getPromise, promises } from "@/content/promises";
import { ratingMeta } from "@/content/ratings";
import { monthYear, shortDate } from "@/lib/format";

/* Static export writes these cards out at build time, one per route. */
export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.flatMap((locale) => promises.map((p) => ({ locale, country: p.country, promise: p.slug })));
}

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "A promise and its PromiseTracker rating";

export default async function Image({ params }: { params: Promise<{ locale: string; promise: string }> }) {
  const { locale: raw, promise: slug } = await params;
  const locale = isLocale(raw) ? raw : "en";
  const p = getPromise(slug);
  if (!p) return shareCard({ eyebrow: "PromiseTracker", title: "PromiseTracker", meta: "promisetracker.org" });
  const o = getOfficial(p.official);
  const fr = locale === "fr";
  return shareCard({
    eyebrow: (o ? o.name + ", " + o.title[locale] : "") + "  ·  " + (fr ? "Échéance " : "Due ") + monthYear(p.due, locale),
    title: p.title,
    chip: { rating: p.rating, label: ratingMeta[p.rating].label[locale] },
    meta: p.sources + " sources  ·  " + (fr ? "Examiné le " : "Reviewed ") + shortDate(p.reviewed, locale),
  });
}
