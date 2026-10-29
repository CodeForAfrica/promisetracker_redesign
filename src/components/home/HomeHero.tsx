import Link from "next/link";
import { withBase } from "@/lib/base";
import { lp, type Locale } from "@/lib/i18n";
import { siteStats } from "@/content/site";
import { common } from "@/i18n/common";
import { homeDict } from "@/i18n/home";
import { Container } from "@/components/ui/Container";
import { SearchIcon } from "@/components/ui/SearchIcon";
import { NavLinks, Logo, SearchPill, SiteHeader, SiteMenu } from "@/components/layout/SiteHeader";
import { LangToggle } from "@/components/layout/LangToggle";
import { StickyBar } from "@/components/layout/StickyBar";
import { LiveCounter } from "./LiveCounter";
import { RibbonGradient } from "./RibbonGradient";

export function HomeHero({ locale }: { locale: Locale }) {
  const t = homeDict[locale];
  const c = common[locale];
  return (
    <div className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(61deg,rgba(255,255,255,0)_60%,rgba(127,196,232,.55)_70%,rgba(27,79,216,.45)_77%,rgba(107,91,149,.45)_83%,rgba(201,59,44,.4)_89%,rgba(245,211,58,.15)_95%,rgba(255,255,255,0)_100%)]"
      />
      <RibbonGradient />
      <SiteHeader locale={locale} search={false} overlay />

      <StickyBar watchId="hero-search">
        <Container className="flex h-full items-center gap-4 sm:gap-7">
          <div className="flex-none">
            <Logo locale={locale} height={24} />
          </div>
          <nav aria-label="Countries" className="hidden min-w-0 flex-1 gap-5 overflow-hidden text-[11px] leading-none tracking-[.13em] whitespace-nowrap uppercase nav:flex">
            <NavLinks locale={locale} compact />
          </nav>
          <div className="ml-auto flex min-w-0 items-center gap-2 sm:gap-3">
            <SearchPill locale={locale} />
            <LangToggle locale={locale} />
            <SiteMenu locale={locale} />
          </div>
        </Container>
      </StickyBar>

      <Container className="relative pt-8 pb-10">
        <div className="mb-5 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[15px] leading-[1.4] font-medium">
          {t.readers}
          <span className="font-normal text-muted">
            <LiveCounter start={siteStats.readersThisYear} rate={1.4} />
          </span>
        </div>
        <h1 className="mb-[26px] max-w-[26ch] text-[40px] leading-[1.06] font-semibold tracking-[-.03em] text-balance sm:text-[52px] lg:text-[64px]">
          {t.headline} <span className="text-slate">{t.headlineTail}</span>
        </h1>
        <p className="max-w-[58ch] text-[16px] leading-[1.6] text-ink-2 sm:text-[18px]">{t.lede}</p>

        <form id="hero-search" role="search" action={withBase(lp(locale, "/search"))} className="mt-7 flex max-w-[560px] items-stretch gap-2.5">
          <label className="flex min-w-0 flex-1 items-center gap-[11px] rounded-full border border-ink bg-white py-3.5 pr-4 pl-5 focus-within:ring-2 focus-within:ring-ink/20">
            <SearchIcon className="text-ink" />
            <span className="sr-only">{c.searchPlaceholder}</span>
            <input
              name="q"
              type="search"
              placeholder={c.searchPlaceholder}
              className="min-w-0 flex-1 bg-transparent text-[16px] leading-[1.3] text-ink outline-none placeholder:text-muted"
            />
          </label>
          <button type="submit" className="flex min-h-11 flex-none cursor-pointer items-center rounded-full bg-ink px-5 text-[12px] sm:px-7 leading-none font-medium tracking-[.06em] text-white uppercase hover:opacity-85">
            {c.search}
          </button>
        </form>
        <div className="mt-2.5 text-[12px] leading-[1.6] text-muted">
          <Link href={lp(locale, "/search?q=" + (locale === "fr" ? "Dakar" : "Kibra"))} className="text-muted hover:text-ink">
            {t.try}
          </Link>
        </div>
      </Container>
    </div>
  );
}
