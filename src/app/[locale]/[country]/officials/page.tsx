import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, lp, locales } from "@/lib/i18n";
import { countries, getCountry } from "@/content/countries";
import { officialsIn } from "@/content/officials";
import { PROPORTION_MIN, dominant, keptCount, total } from "@/content/ratings";
import { browseDict } from "@/i18n/browse";
import { common } from "@/i18n/common";
import { fill } from "@/i18n/util";
import { pct } from "@/lib/format";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { OfficialsIndex, type OfficialRowData } from "@/components/official/OfficialsIndex";
import { officialHref } from "@/components/official/OfficialCard";

type Params = { locale: string; country: string };
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => countries.map((c) => ({ locale, country: c.code })));
}

export const metadata: Metadata = { title: "Officials" };

const RING: Record<string, string> = {
  completed: "border-r-completed",
  "in-progress": "border-r-progress",
  unstarted: "border-r-unstarted",
  inconclusive: "border-r-inconclusive",
  "behind-schedule": "border-r-behind",
  stalled: "border-r-stalled",
};

const PLURAL: Record<string, { en: string; fr: string }> = {
  Governor: { en: "Governors", fr: "Gouverneurs" },
  Senator: { en: "Senators", fr: "Sénateurs" },
  President: { en: "Presidents", fr: "Présidents" },
  Mayor: { en: "Mayors", fr: "Maires" },
  "Member of Parliament": { en: "Members of Parliament", fr: "Députés" },
};

export default async function OfficialsPage({ params }: { params: Promise<Params> }) {
  const { locale, country: code } = await params;
  const country = getCountry(code);
  if (!isLocale(locale) || !country) notFound();
  const t = browseDict[locale];
  const c = common[locale];

  const rows: OfficialRowData[] = officialsIn(code)
    .filter((o) => o.status === "in-office")
    .map((o) => {
      const n = total(o.counts);
      const k = keptCount(o.counts);
      return {
        slug: o.slug,
        href: officialHref(locale, o),
        name: o.name,
        party: o.party ?? "",
        portrait: o.portrait.replace("w=600&h=600", "w=120&h=120"),
        ring: n < PROPORTION_MIN ? "border-r-unstarted" : RING[dominant(o.counts)],
        title: o.title[locale],
        titlePlural: (PLURAL[o.title.en] ?? { en: o.title.en + "s", fr: o.title.fr + "s" })[locale].toLowerCase(),
        place: o.place[locale],
        placeHref: o.county ? lp(locale, "/" + o.country + "/" + o.county) : undefined,
        counts: o.counts,
        total: n,
        keptPct: n >= PROPORTION_MIN ? pct(k, n) : null,
        keptLabel: fill(c.keptOf, { k, n }),
      };
    });

  return (
    <PageShell locale={locale} active={country.code}>
      <Container className="pt-7 pb-8">
        <nav aria-label="Breadcrumb" className="mb-2.5 text-[11px] leading-[1.6] tracking-[.08em] text-muted uppercase">
          <Link href={lp(locale, "/" + country.code)} className="text-muted hover:text-ink">
            {country.name[locale]}
          </Link>
          {"\u00a0\u00a0›\u00a0\u00a0"}
          <span aria-current="page">{t.officials}</span>
        </nav>
        <h1 className="text-[30px] leading-[1.1] font-semibold tracking-[-.016em] sm:text-[36px]">{t.tracking}</h1>
      </Container>
      <Container className="pt-1 pb-8">
        <Suspense>
          <OfficialsIndex rows={rows} labels={t} />
        </Suspense>
      </Container>
    </PageShell>
  );
}
