import { isLocale, locales } from "@/lib/i18n";
import { ogContentType, ogSize, shareCard } from "@/lib/og";
import { getOfficial, officials } from "@/content/officials";
import { PROPORTION_MIN, keptCount, total } from "@/content/ratings";
import { monthYear, pct } from "@/lib/format";

/* Static export writes these cards out at build time, one per route. */
export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.flatMap((locale) => officials.map((o) => ({ locale, country: o.country, official: o.slug })));
}

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "PromiseTracker record for an elected official";

export default async function Image({ params }: { params: Promise<{ locale: string; official: string }> }) {
  const { locale: raw, official: slug } = await params;
  const locale = isLocale(raw) ? raw : "en";
  const o = getOfficial(slug);
  if (!o) return shareCard({ eyebrow: "PromiseTracker", title: "PromiseTracker", meta: "promisetracker.org" });
  const n = total(o.counts);
  const k = keptCount(o.counts);
  const fr = locale === "fr";
  const enough = n >= PROPORTION_MIN;
  return shareCard({
    eyebrow: o.title[locale] + "  ·  " + o.place[locale],
    title: o.name,
    figure: enough ? pct(k, n) + "%" : String(k),
    figureNote: fr ? "des " + n + " promesses tenues" : "of " + n + " promises kept",
    meta: (fr ? "Mandat " : "Term ") + monthYear(o.term.from, locale) + " – " + monthYear(o.term.to, locale) + "  ·  PromiseTracker",
    counts: enough ? o.counts : undefined,
  });
}
