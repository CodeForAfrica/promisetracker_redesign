import type { L10n } from "@/lib/i18n";
import { RATINGS, type Rating, type RatingCounts, type Tier } from "@/lib/types";

type RatingMeta = {
  tier: Tier;
  label: L10n;
  description: L10n;
  /** Tailwind classes for the filled chip. */
  chip: string;
  /** Tailwind class for a swatch or bar segment. */
  swatch: string;
  /** Text colour used when the rating colour is applied to type. */
  text: string;
};

export const ratingMeta: Record<Rating, RatingMeta> = {
  completed: {
    tier: "kept",
    label: { en: "Completed", fr: "Réalisée" },
    description: { en: "The promise is mostly or completely fulfilled.", fr: "La promesse est tenue en grande partie ou en totalité." },
    chip: "bg-r-completed text-white",
    swatch: "bg-r-completed",
    text: "text-r-completed",
  },
  "in-progress": {
    tier: "kept",
    label: { en: "In Progress", fr: "En cours" },
    description: { en: "The promise is in the works or being considered.", fr: "La promesse est en chantier ou à l'étude." },
    chip: "bg-r-progress text-r-progress-ink",
    swatch: "bg-r-progress",
    text: "text-r-progress-ink",
  },
  unstarted: {
    tier: "uncertain",
    label: { en: "Unstarted", fr: "Non commencé" },
    description: {
      en: "Every promise begins here and stays here until there is evidence of progress or proof it has been shelved.",
      fr: "Chaque promesse commence ici et y reste jusqu'à ce qu'une preuve de progrès ou d'abandon apparaisse.",
    },
    chip: "bg-r-unstarted text-r-unstarted-ink",
    swatch: "bg-r-unstarted shadow-[inset_0_0_0_1px_var(--color-on-dark)]",
    text: "text-ink-2",
  },
  inconclusive: {
    tier: "uncertain",
    label: { en: "Inconclusive", fr: "Non concluant" },
    description: {
      en: "The promise is accomplished only in part, but has succeeded at least in part consistently with its goal.",
      fr: "La promesse n'est accomplie qu'en partie, mais a réussi au moins en partie conformément à son objectif.",
    },
    chip: "bg-r-inconclusive text-white",
    swatch: "bg-r-inconclusive",
    text: "text-r-inconclusive",
  },
  "behind-schedule": {
    tier: "not-kept",
    label: { en: "Behind Schedule", fr: "Retard sur le calendrier" },
    description: {
      en: "No progress, perhaps due to financial limits, opposition from lawmakers or a change in priorities.",
      fr: "Aucun progrès, peut-être faute de moyens, à cause de l'opposition des élus ou d'un changement de priorités.",
    },
    chip: "bg-r-behind text-r-behind-ink",
    swatch: "bg-r-behind",
    text: "text-r-behind-ink",
  },
  stalled: {
    tier: "not-kept",
    label: { en: "Stalled", fr: "Bloquée" },
    description: {
      en: "Inaction by the administration, or lack of support from the legislature.",
      fr: "Inaction de l'administration, ou absence de soutien du corps législatif.",
    },
    chip: "bg-r-stalled text-white",
    swatch: "bg-r-stalled",
    text: "text-r-stalled",
  },
};

export const TIERS: Tier[] = ["kept", "uncertain", "not-kept"];

export const tierMeta: Record<Tier, { label: L10n; short: L10n; ratings: [Rating, Rating] }> = {
  kept: { label: { en: "Promise kept", fr: "Promesse tenue" }, short: { en: "Promise kept", fr: "Tenue" }, ratings: ["completed", "in-progress"] },
  uncertain: { label: { en: "Uncertain", fr: "Incertain" }, short: { en: "Uncertain", fr: "Incertain" }, ratings: ["unstarted", "inconclusive"] },
  "not-kept": { label: { en: "Promise not kept", fr: "Promesse non tenue" }, short: { en: "Not kept", fr: "Non tenue" }, ratings: ["behind-schedule", "stalled"] },
};

/** Below this many promises a percentage is withheld: "too few for a proportion". */
export const PROPORTION_MIN = 20;

export function total(c: RatingCounts): number {
  return RATINGS.reduce((s, r) => s + c[r], 0);
}

export function tierCount(c: RatingCounts, tier: Tier): number {
  const [a, b] = tierMeta[tier].ratings;
  return c[a] + c[b];
}

export function keptCount(c: RatingCounts): number {
  return tierCount(c, "kept");
}

/** The rating with the most promises; used for portrait rings. */
export function dominant(c: RatingCounts): Rating {
  return RATINGS.reduce((best, r) => (c[r] > c[best] ? r : best), RATINGS[0]);
}

export function counts(values: [number, number, number, number, number, number]): RatingCounts {
  const [completed, progress, unstarted, inconclusive, behind, stalled] = values;
  return { completed, "in-progress": progress, unstarted, inconclusive, "behind-schedule": behind, stalled };
}
