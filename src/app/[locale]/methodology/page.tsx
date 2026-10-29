import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, lp } from "@/lib/i18n";
import { methodology as m } from "@/content/methodology";
import { TIERS, ratingMeta, tierMeta } from "@/content/ratings";
import { cn } from "@/lib/cn";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { HeroKicker, HeroLede, HeroTitle, PhotoHero } from "@/components/ui/PhotoHero";
import { RatingChip } from "@/components/ui/RatingChip";
import { Kicker, SectionLabel } from "@/components/ui/Text";

export const metadata: Metadata = { title: "Methodology" };

const linkClass = "inline-flex items-center gap-[9px] justify-self-start text-[12.5px] leading-normal font-medium tracking-[.03em] whitespace-nowrap text-link hover:text-link-hover";

function Arrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default async function MethodologyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <PageShell locale={locale} active="methodology" search={false}>
      <PhotoHero image={m.hero} minH="min-h-[480px]">
        <HeroKicker>{m.kicker[locale]}</HeroKicker>
        <HeroTitle>{m.title[locale]}</HeroTitle>
        <HeroLede>{m.lede[locale]}</HeroLede>
      </PhotoHero>

      <Container className="pt-9 pb-8">
        <div className="grid items-start gap-[52px] md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <p className="max-w-[28ch] text-[28px] leading-[1.18] font-semibold tracking-[-.022em] text-balance sm:text-[34px]">{m.pullQuote[locale]}</p>
          <div className="rounded-lg bg-surface px-6 py-[22px]">
            <Kicker>{m.inShort[locale]}</Kicker>
            <ol className="grid gap-3.5">
              {m.steps.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-none text-[12px] leading-normal font-medium text-faint">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[13.5px] leading-[1.6] text-ink-2">{s[locale]}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>

      <Container className="pt-7 pb-8">
        <SectionLabel rule>{m.sixTitle[locale]}</SectionLabel>
        <div className="grid gap-[26px]">
          {TIERS.map((tier) => (
            <div key={tier}>
              <div className="mb-3 flex flex-wrap items-baseline gap-3">
                <h3 className="text-[18px] leading-[1.25] font-semibold">{tierMeta[tier].label[locale]}</h3>
                <span className="text-[11.5px] leading-normal text-muted">{m.tierNote[tier][locale]}</span>
              </div>
              <ul className="grid gap-px overflow-hidden rounded-lg bg-tile">
                {tierMeta[tier].ratings.map((r) => (
                  <li key={r} className="grid items-baseline gap-x-[22px] gap-y-2 bg-white px-[18px] py-[15px] md:grid-cols-[170px_minmax(0,1fr)_190px]">
                    <RatingChip rating={r} locale={locale} className="justify-self-start" />
                    <span className="text-[13.5px] leading-[1.6] text-ink-2">{ratingMeta[r].description[locale]}</span>
                    <span className={cn("text-[11px] leading-normal tracking-[.04em] uppercase", tier === "not-kept" ? "text-ink" : "text-muted")}>{m.requires[r][locale]}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <Container className="pt-7 pb-8">
        <SectionLabel rule>{m.willTitle[locale]}</SectionLabel>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-8">
          {m.will.map((w) => (
            <div key={w.title.en}>
              <h3 className="mb-2 text-[15.5px] leading-[1.35] font-medium">{w.title[locale]}</h3>
              <p className="text-[13px] leading-[1.6] text-ink-2">{w.body[locale]}</p>
            </div>
          ))}
        </div>
      </Container>

      <Container className="pt-7 pb-8">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-10">
          {m.links.map((g) => (
            <div key={g.title.en}>
              <SectionLabel rule as="h3">
                {g.title[locale]}
              </SectionLabel>
              <ul className="grid gap-2.5">
                {g.items.map((it) => (
                  <li key={it.label.en}>
                    {it.href ? (
                      <Link href={lp(locale, it.href)} className={linkClass}>
                        <Arrow />
                        {it.label[locale]}
                      </Link>
                    ) : it.external ? (
                      <a href={it.external} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        <Arrow />
                        {it.label[locale]}
                      </a>
                    ) : (
                      <span className={cn(linkClass, "text-muted hover:text-muted")}>
                        <Arrow />
                        {it.label[locale]}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </PageShell>
  );
}
