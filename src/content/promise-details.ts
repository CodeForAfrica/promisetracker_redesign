import type { L10n } from "@/lib/i18n";
import type { Article, Rating } from "@/lib/types";

export type TimelineStep =
  | { kind: "made"; date: string; note: L10n }
  | { kind: "rating"; rating: Rating; date: string; note: L10n; current?: boolean }
  | { kind: "deadline"; date: string; note: L10n };

export type HistoryEntry = {
  date: string;
  from: Rating | "correction" | "first";
  to: Rating;
  why: L10n;
  source: { label: string; href?: string };
};

export type PromiseDetail = {
  said: L10n;
  saidDate: string;
  byWhen: L10n;
  byWhenNote: L10n;
  body: L10n;
  firstPublished: string;
  /** How far along the timeline the present sits, 0–100. */
  now: number;
  timeline: TimelineStep[];
  analysis?: Article;
  history: HistoryEntry[];
};

const details: Record<string, PromiseDetail> = {
  "kibra-housing": {
    said: { en: "Manifesto launch, Kasarani", fr: "Lancement du manifeste, Kasarani" },
    saidDate: "2022-08-09",
    byWhen: { en: "August 2027", fr: "Août 2027" },
    byWhenNote: { en: "End of term", fr: "Fin du mandat" },
    body: {
      en: "Ground was broken on the Kibra site in March 2023 and a contractor was named. No construction has been recorded since the second tranche of county funding was withheld in March 2024, pending an audit that has not been published.",
      fr: "Les travaux ont commencé sur le site de Kibra en mars 2023 et un entrepreneur a été désigné. Aucune construction n'a été constatée depuis la suspension de la deuxième tranche de financement du comté en mars 2024, dans l'attente d'un audit non publié.",
    },
    firstPublished: "2022-10-12",
    now: 61.5,
    timeline: [
      { kind: "made", date: "2022-08", note: { en: "Manifesto launch, Kasarani", fr: "Lancement du manifeste, Kasarani" } },
      { kind: "rating", rating: "unstarted", date: "2022-10", note: { en: "First published. Every promise begins here", fr: "Première publication. Toute promesse commence ici" } },
      { kind: "rating", rating: "in-progress", date: "2023-03", note: { en: "Ground broken; contractor named", fr: "Travaux lancés ; entrepreneur désigné" } },
      { kind: "rating", rating: "stalled", date: "2024-03", current: true, note: { en: "Second tranche withheld pending an unpublished audit", fr: "Deuxième tranche suspendue dans l'attente d'un audit non publié" } },
      { kind: "deadline", date: "2027-08", note: { en: "End of term. 11 months left", fr: "Fin du mandat. Onze mois restants" } },
    ],
    analysis: {
      title: "Why the housing money stopped",
      dek: "The second tranche was withheld pending an audit of the first. Four years on, the audit has not been published and the county has not said when it will be. Both the contractor and the county say they are waiting for the other.",
      date: "2026-09-02",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1280&h=720&fit=crop&auto=format&q=70",
    },
    history: [
      {
        date: "2026-09-04",
        from: "in-progress",
        to: "stalled",
        why: {
          en: "Thirty months with no recorded construction and no disbursement. The county has not said when the audit will be published.",
          fr: "Trente mois sans construction constatée ni versement. Le comté n'a pas dit quand l'audit sera publié.",
        },
        source: { label: "Budget Implementation Review, Q2 2026", href: "https://sourceafrica.net" },
      },
      {
        date: "2025-03-18",
        from: "correction",
        to: "in-progress",
        why: {
          en: "The unit figure was published as 1,000 and is 1,200. The manifesto text was misread. The rating did not change; the promise did.",
          fr: "Le nombre de logements avait été publié à 1 000 ; il est de 1 200. Le texte du manifeste avait été mal lu. L'évaluation n'a pas changé ; la promesse, si.",
        },
        source: { label: "Corrections policy" },
      },
      {
        date: "2023-03-02",
        from: "unstarted",
        to: "in-progress",
        why: {
          en: "Ground broken on the Kibra site and a contractor named in the county tender award notice.",
          fr: "Travaux lancés sur le site de Kibra et entrepreneur désigné dans l'avis d'attribution du comté.",
        },
        source: { label: "County tender award, Feb 2023" },
      },
      {
        date: "2022-10-12",
        from: "first",
        to: "unstarted",
        why: {
          en: "Published from the manifesto. Every promise begins at Unstarted and stays there until there is evidence either way.",
          fr: "Publiée à partir du manifeste. Toute promesse commence à Non commencé et y reste jusqu'à ce qu'une preuve apparaisse.",
        },
        source: { label: "The original commitment, as posted", href: "https://web.archive.org" },
      },
    ],
  },
};

export function detailFor(slug: string): PromiseDetail | undefined {
  return details[slug];
}
