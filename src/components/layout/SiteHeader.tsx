import Image from "next/image";
import Link from "next/link";
import { lp, type Locale } from "@/lib/i18n";
import type { CountryCode } from "@/lib/types";
import { countries } from "@/content/countries";
import { common } from "@/i18n/common";
import { withBase } from "@/lib/base";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Flag } from "@/components/ui/Flag";
import { SearchIcon } from "@/components/ui/SearchIcon";
import { LangToggle } from "./LangToggle";
import { MobileMenu } from "./MobileMenu";

type Active = CountryCode | "methodology" | undefined;

export function Logo({ locale, height = 22 }: { locale: Locale; height?: number }) {
  return (
    <Link href={lp(locale, "/")} className="block hover:opacity-70" aria-label={common[locale].home}>
      <Image src={withBase("/images/promisetracker-logo.png")} alt="PromiseTracker" width={570} height={75} priority style={{ height, width: "auto" }} />
    </Link>
  );
}

export function NavLinks({ locale, active, compact = false }: { locale: Locale; active?: Active; compact?: boolean }) {
  const t = common[locale];
  const item = (on: boolean) =>
    cn(
      "-mb-px flex items-center gap-2 border-b-2 whitespace-nowrap hover:opacity-70",
      compact ? "py-0 border-transparent" : "pt-[30px] pb-[28px]",
      on ? "border-ink font-semibold text-ink hover:text-ink" : "border-transparent font-medium text-ink-2 hover:text-ink-2",
    );
  const methodology = (
    <Link href={lp(locale, "/methodology")} className={item(active === "methodology")}>
      {t.methodology}
    </Link>
  );
  const current = countries.find((c) => c.code === active);

  // On a country page: the current country (others on hover/focus) and Methodology.
  if (current && !compact) {
    const others = countries.filter((c) => c.code !== current.code);
    return (
      <>
        <div className="group relative flex items-stretch">
          <Link href={lp(locale, "/" + current.code)} className={item(true)} aria-current="page" aria-haspopup="true">
            <Flag code={current.code} size={14} />
            {current.name[locale]}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </Link>
          <div className="invisible absolute top-full left-0 z-30 min-w-[230px] -translate-y-1 opacity-0 transition-[opacity,transform,visibility] duration-200 ease-out-soft group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
            <div className="grid rounded-b-[8px] border border-t-0 border-line bg-white py-2 shadow-[0_12px_24px_-12px_rgba(0,0,0,.2)]">
              <span className="px-4 pt-1 pb-2 text-[10px] leading-none font-medium tracking-[.1em] text-muted uppercase">{t.otherCountries}</span>
              {others.map((c) => (
                <Link
                  key={c.code}
                  href={lp(locale, "/" + c.code)}
                  className="flex min-h-10 items-center gap-2.5 px-4 text-[13px] leading-none font-medium tracking-normal text-ink normal-case hover:bg-surface hover:text-ink"
                >
                  <Flag code={c.code} size={16} />
                  {c.name[locale]}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <span aria-hidden="true" className="h-3.5 w-px flex-none self-center bg-line" />
        {methodology}
      </>
    );
  }

  return (
    <>
      {countries.map((c) => (
        <Link key={c.code} href={lp(locale, "/" + c.code)} className={item(active === c.code)} aria-current={active === c.code ? "page" : undefined}>
          {active === c.code && !compact && <Flag code={c.code} size={14} />}
          {c.name[locale]}
        </Link>
      ))}
      <span aria-hidden="true" className="h-3.5 w-px flex-none self-center bg-line" />
      {methodology}
    </>
  );
}

/** Full-size rows for the mobile menu overlay. */
export function MenuLinks({ locale, active }: { locale: Locale; active?: Active }) {
  const row = (on: boolean) =>
    cn("flex min-h-14 items-center gap-3 border-b border-line-soft py-3 text-[20px] leading-[1.2] text-ink hover:text-ink hover:opacity-70", on ? "font-semibold" : "font-medium");
  return (
    <>
      {countries.map((c) => (
        <Link key={c.code} href={lp(locale, "/" + c.code)} className={row(active === c.code)} aria-current={active === c.code ? "page" : undefined}>
          <Flag code={c.code} size={20} />
          {c.name[locale]}
        </Link>
      ))}
      <Link href={lp(locale, "/methodology")} className={row(active === "methodology")} aria-current={active === "methodology" ? "page" : undefined}>
        {common[locale].methodology}
      </Link>
    </>
  );
}

/** Menu button plus overlay; hidden from the `nav` breakpoint up. */
export function SiteMenu({ locale, active }: { locale: Locale; active?: Active }) {
  const t = common[locale];
  return (
    <MobileMenu
      labels={{ open: t.menu, close: t.closeMenu }}
      logo={<Logo locale={locale} />}
      footer={
        <>
          <Link
            href={lp(locale, "/search")}
            className="flex min-h-11 min-w-0 flex-1 items-center gap-[9px] rounded-full border border-ink px-4 text-[13px] leading-none text-muted hover:text-muted hover:opacity-70"
          >
            <SearchIcon size={14} className="flex-none text-ink" />
            <span className="truncate">{t.searchPlaceholder}</span>
          </Link>
          <LangToggle locale={locale} />
        </>
      }
    >
      <MenuLinks locale={locale} active={active} />
    </MobileMenu>
  );
}

export function SearchPill({ locale, className }: { locale: Locale; className?: string }) {
  return (
    <Link
      href={lp(locale, "/search")}
      className={cn(
        "inline-flex min-h-11 max-w-[270px] min-w-11 flex-[0_1_270px] items-center gap-[9px] overflow-hidden rounded-full border border-ink px-4 py-2.5 max-sm:flex-none max-sm:justify-center max-sm:px-0 nav:min-h-0 text-[12px] leading-none whitespace-nowrap text-muted hover:text-muted hover:opacity-70",
        className,
      )}
    >
      <SearchIcon size={14} className="text-ink" />
      <span className="truncate max-sm:sr-only">{common[locale].searchPlaceholder}</span>
    </Link>
  );
}

/** Masthead: logo and verification line, country nav, search and language. */
export function SiteHeader({
  locale,
  active,
  search = true,
  overlay = false,
}: {
  locale: Locale;
  active?: Active;
  search?: boolean;
  overlay?: boolean;
}) {
  const t = common[locale];
  return (
    <header className={cn("relative z-10 border-b", overlay ? "border-ink/10" : "border-line")}>
      <Container className="flex items-center gap-x-7">
        <div className="grid flex-none gap-[7px] py-4">
          <Logo locale={locale} />
          <span className="inline-flex items-center gap-1.5 text-[9.5px] leading-none font-medium tracking-[.1em] text-muted uppercase">
            <i aria-hidden="true" className="block size-[5px] rounded-full bg-verified" />
            {t.verified}
          </span>
        </div>
        <nav
          aria-label="Countries"
          className="hidden min-w-0 flex-1 items-stretch gap-x-[26px] text-[11.5px] leading-none tracking-[.13em] uppercase nav:flex"
        >
          <NavLinks locale={locale} active={active} />
        </nav>
        <div className="ml-auto flex min-w-0 items-center gap-2 sm:gap-3 nav:ml-0">
          {search && <SearchPill locale={locale} />}
          <LangToggle locale={locale} />
          <SiteMenu locale={locale} active={active} />
        </div>
      </Container>
    </header>
  );
}
