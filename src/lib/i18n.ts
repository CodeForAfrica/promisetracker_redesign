export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

/** A string carried in both launch languages. */
export type L10n = { en: string; fr: string };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Prefix an app path for the given locale.
 *  Both locales carry a prefix: the static export has no proxy to rewrite a
 *  bare "/" onto English, so every page has to live at a real path. */
export function lp(locale: Locale, path: string): string {
  return path === "/" ? "/" + locale : "/" + locale + path;
}

/** Strip a locale prefix from a pathname, giving the locale-free app path. */
export function stripLocale(pathname: string): string {
  for (const locale of locales) {
    if (pathname === "/" + locale) return "/";
    if (pathname.startsWith("/" + locale + "/")) return pathname.slice(locale.length + 1);
  }
  return pathname === "" ? "/" : pathname;
}

export function tr(value: L10n, locale: Locale): string {
  return value[locale];
}
