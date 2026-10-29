import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import type { CountryCode } from "@/lib/types";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

/** Standard page frame: masthead, main content, footer. */
export function PageShell({
  locale,
  active,
  search = true,
  children,
}: {
  locale: Locale;
  active?: CountryCode | "methodology";
  search?: boolean;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader locale={locale} active={active} search={search} />
      <main id="main">{children}</main>
      <SiteFooter locale={locale} />
    </>
  );
}
