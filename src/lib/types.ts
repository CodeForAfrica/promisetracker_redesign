import type { L10n, Locale } from "./i18n";

export const RATINGS = ["completed", "in-progress", "unstarted", "inconclusive", "behind-schedule", "stalled"] as const;
export type Rating = (typeof RATINGS)[number];
export type Tier = "kept" | "uncertain" | "not-kept";
export type RatingCounts = Record<Rating, number>;

export type CountryCode = "ke" | "sn" | "ng" | "ci";

export type Party = { name: string; kept: number; total: number; note: L10n };

export type Country = {
  code: CountryCode;
  name: L10n;
  lang: Locale;
  hero: string;
  heroCredit: string;
  intro: L10n;
  reviewed: string;
  promises: number;
  officials: number;
  counts: RatingCounts;
  /** Editor's picks for the country page. */
  inFocus: string[];
  /** Officials in office, in display order. */
  officialSlugs: string[];
  parties: Party[];
  pastSlugs: string[];
};

export type Official = {
  slug: string;
  country: CountryCode;
  name: string;
  gender: "f" | "m";
  title: L10n;
  titleShort: L10n;
  place: L10n;
  county?: string;
  status: "in-office" | "archived";
  term: { from: string; to: string };
  portrait: string;
  portraitCredit: string;
  counts: RatingCounts;
  summary?: L10n;
  /** Hero paragraph. */
  bio?: L10n;
  party?: string;
  keyPromise?: { slug: string; note: L10n; why: L10n };
  changedLastYear?: number;
  changes?: Array<{ slug: string; was: Rating; date: string }>;
  analysis?: Article[];
  /** Archived records only. */
  closing?: { ended: string; headline: L10n; body: L10n[]; successor?: string };
};

export type Article = { title: string; dek: string; date: string; byline?: string; image: string };

export type Timing = { tone: "neutral" | "alert" | "good"; text: L10n };

export type PromiseItem = {
  slug: string;
  country: CountryCode;
  official: string;
  title: string;
  rating: Rating;
  topic: string;
  place: L10n;
  image: string;
  made: string;
  due: string;
  reviewed: string;
  sources: number;
  /** Share of the promise window already elapsed, 0–100. */
  elapsed: number;
  timing: Timing;
  summary?: L10n;
};

export type County = {
  slug: string;
  country: CountryCode;
  name: string;
  hero: string;
  heroCredit: string;
  intro: L10n;
  note: L10n;
  counts: RatingCounts;
  officialSlugs: string[];
};

export type Topic = {
  slug: string;
  name: L10n;
  total: number;
  countries: number;
  intro?: L10n;
  hero?: string;
  byCountry?: Array<{ country: CountryCode; counts: RatingCounts; image: string }>;
};
