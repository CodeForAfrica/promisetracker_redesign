import { isLocale, locales } from "@/lib/i18n";
import { ogContentType, ogSize, shareCard } from "@/lib/og";
import { countries, getCountry } from "@/content/countries";
import { PROPORTION_MIN, keptCount, total } from "@/content/ratings";
import { pct, shortDate } from "@/lib/format";

/* Static export writes these cards out at build time, one per route. */
export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.flatMap((locale) => countries.map((c) => ({ locale, country: c.code })));
}

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "PromiseTracker country figures";

export default async function Image({ params }: { params: Promise<{ locale: string; country: string }> }) {
  const { locale: raw, country: code } = await params;
  const locale = isLocale(raw) ? raw : "en";
  const c = getCountry(code);
  if (!c) return shareCard({ eyebrow: "PromiseTracker", title: "PromiseTracker", meta: "promisetracker.org" });
  const n = total(c.counts);
  const k = keptCount(c.counts);
  const fr = locale === "fr";
  const enough = n >= PROPORTION_MIN;
  return shareCard({
    eyebrow: fr ? "Pays" : "Country",
    title: c.name[locale],
    figure: enough ? pct(k, n) + "%" : String(k),
    figureNote: enough ? (fr ? "des " + n + " promesses tenues" : "of " + n + " promises kept, in whole or in part") : fr ? "tenue(s) sur " + n : "kept of " + n,
    meta: (fr ? c.officials + " élus" : c.officials + " officials") + "  ·  " + (fr ? "Dernier examen " : "Last reviewed ") + shortDate(c.reviewed, locale),
    counts: enough ? c.counts : undefined,
  });
}
