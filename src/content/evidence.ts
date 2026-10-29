import type { L10n } from "@/lib/i18n";

export type Evidence = {
  title: string;
  /** Short publisher line, used on the homepage. */
  source: L10n;
  kind: "document" | "dataset" | "social" | "article";
  date: string;
  thumb?: string;
  /** Fuller details for the promise page. */
  meta?: L10n;
  link?: { label: L10n; href: string };
  finding?: L10n;
};

const thumb = (id: string) => "https://images.unsplash.com/" + id + "?w=200&h=150&fit=crop&auto=format&q=70";

export const evidenceKind: Record<Evidence["kind"], L10n> = {
  document: { en: "Document", fr: "Document" },
  dataset: { en: "Dataset", fr: "Jeu de données" },
  social: { en: "Social post", fr: "Publication" },
  article: { en: "Article", fr: "Article" },
};

const evidence: Record<string, Evidence[]> = {
  "kibra-housing": [
    {
      title: "Budget Implementation Review, Q2 2026",
      source: { en: "Office of the Controller of Budget", fr: "Bureau du contrôleur du budget" },
      kind: "document",
      date: "2026-07-12",
      thumb: thumb("photo-1450101499163-c8848c66ca85"),
      meta: { en: "Office of the Controller of Budget · Published 12 Jul 2026", fr: "Bureau du contrôleur du budget · Publié le 12 juil 2026" },
      link: { label: { en: "Open in sourceAFRICA →", fr: "Ouvrir dans sourceAFRICA →" }, href: "https://sourceafrica.net" },
      finding: { en: "Shows the tranche was not disbursed", fr: "Montre que la tranche n'a pas été versée" },
    },
    {
      title: "County development expenditure 2022–26",
      source: { en: "open.AFRICA · Dataset", fr: "open.AFRICA · Jeu de données" },
      kind: "dataset",
      date: "2026-09-01",
      thumb: thumb("photo-1551288049-bebda4e38f71"),
      meta: { en: "open.AFRICA · Updated 1 Sep 2026", fr: "open.AFRICA · Mis à jour le 1 sept 2026" },
      link: { label: { en: "Download the data →", fr: "Télécharger les données →" }, href: "https://open.africa" },
      finding: { en: "No housing spend recorded since Q1 2024", fr: "Aucune dépense de logement depuis le T1 2024" },
    },
    {
      title: "The original commitment, as posted",
      source: { en: "9 August 2022 · Social post", fr: "9 août 2022 · Publication" },
      kind: "social",
      date: "2022-08-09",
      thumb: thumb("photo-1611162617213-7d7a39e9b1d7"),
      meta: { en: "9 August 2022 · Archived copy", fr: "9 août 2022 · Copie archivée" },
      link: { label: { en: "View the archived post →", fr: "Voir la publication archivée →" }, href: "https://web.archive.org" },
      finding: { en: "Establishes the 1,200 unit figure", fr: "Établit le chiffre de 1 200 logements" },
    },
  ],
};

export function evidenceFor(slug: string): Evidence[] {
  return evidence[slug] ?? [];
}
