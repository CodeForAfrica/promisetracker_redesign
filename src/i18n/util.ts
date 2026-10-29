import type { Locale } from "@/lib/i18n";

/** Replace {name} placeholders. */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => (k in vars ? String(vars[k]) : "{" + k + "}"));
}

const WORDS: Record<Locale, string[]> = {
  en: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"],
  fr: ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze"],
};

/** Small numbers as words, as the editorial style requires in running text. */
export function words(n: number, locale: Locale, capital = false): string {
  const w = n >= 0 && n < WORDS[locale].length ? WORDS[locale][n] : String(n);
  return capital ? w.charAt(0).toUpperCase() + w.slice(1) : w;
}

/** "142 promises", "1 promesse". */
export function plural(n: number, one: string, many: string): string {
  return n + " " + (n === 1 ? one : many);
}

export function defineDict<T extends Record<string, string>>(d: { en: T; fr: { [K in keyof T]: string } }) {
  return d;
}
