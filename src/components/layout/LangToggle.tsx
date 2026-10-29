"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { lp, stripLocale, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

/** EN / FR switch that keeps the reader on the same page. */
export function LangToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const base = stripLocale(pathname);
  const hrefs: Record<Locale, string> = { en: lp("en", base), fr: lp("fr", base) };
  return (
    <span className="inline-flex flex-none items-center rounded-full border border-line bg-white px-3 py-2 text-[10.5px] leading-none font-medium tracking-[.1em] text-ink uppercase">
      {(["en", "fr"] as const).map((l, i) => (
        <span key={l} className="inline-flex items-center">
          {i > 0 && <span aria-hidden="true">{"\u00a0/\u00a0"}</span>}
          {l === locale ? (
            <span aria-current="true">{l.toUpperCase()}</span>
          ) : (
            <Link href={hrefs[l]} hrefLang={l} className={cn("text-faint hover:text-faint hover:opacity-70")}>
              {l.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </span>
  );
}
