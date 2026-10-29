import type { Locale } from "./i18n";

const MONTHS_SHORT: Record<Locale, string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  fr: ["jan", "fév", "mars", "avr", "mai", "juin", "juil", "août", "sept", "oct", "nov", "déc"],
};
const MONTHS_LONG: Record<Locale, string[]> = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  fr: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
};

function parts(iso: string): { y: number; m: number; d: number } {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m: (m || 1) - 1, d: d || 1 };
}

/** "Aug 2022" / "août 2022" */
export function monthYear(iso: string, locale: Locale): string {
  const { y, m } = parts(iso);
  return MONTHS_SHORT[locale][m] + " " + y;
}

/** "4 Sep 2026" */
export function shortDate(iso: string, locale: Locale): string {
  const { y, m, d } = parts(iso);
  return d + " " + MONTHS_SHORT[locale][m] + " " + y;
}

/** "4 September 2026" */
export function longDate(iso: string, locale: Locale): string {
  const { y, m, d } = parts(iso);
  return d + " " + MONTHS_LONG[locale][m] + " " + y;
}

/** 1,204 in English; 1 204 (narrow no-break space) in French. */
export function num(value: number, locale: Locale): string {
  const s = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, locale === "fr" ? "\u202f" : ",");
  return s;
}

export function pct(part: number, whole: number): number {
  return whole === 0 ? 0 : Math.round((part / whole) * 100);
}
