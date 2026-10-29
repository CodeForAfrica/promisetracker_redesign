import { isLocale, locales } from "@/lib/i18n";
import { ogContentType, ogSize, shareCard } from "@/lib/og";
import { siteStats } from "@/content/site";
import { TIERS, tierCount, tierMeta } from "@/content/ratings";
import { num } from "@/lib/format";

/* Static export writes these cards out at build time, one per route. */
export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "PromiseTracker: the overall figures";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "en";
  const c = siteStats.counts;
  return shareCard({
    eyebrow: locale === "fr" ? "Les chiffres" : "The overall figures",
    title: locale === "fr" ? "promesses suivies dans 4 pays" : "promises tracked across 4 countries",
    figure: num(siteStats.promises, locale),
    meta: TIERS.map((t) => tierMeta[t].short[locale] + " " + tierCount(c, t)).join("  ·  "),
    counts: c,
  });
}
