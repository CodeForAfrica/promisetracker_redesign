import type { County, Topic } from "@/lib/types";
import { counts } from "./ratings";

const wide = (id: string) => "https://images.unsplash.com/" + id + "?w=1800&h=900&fit=crop&auto=format&q=70";
const card = (id: string) => "https://images.unsplash.com/" + id + "?w=720&h=480&fit=crop&auto=format&q=70";

export const counties: County[] = [
  {
    slug: "nairobi-county",
    country: "ke",
    name: "Nairobi County",
    hero: "https://images.unsplash.com/photo-1664181220731-06219378d8c7?w=1800&h=900&fit=crop&auto=format&q=70",
    heroCredit: "Photo by Michael Njoroge on Unsplash",
    intro: {
      en: "Three people answer for this county, and a fourth answers for the country it sits in.",
      fr: "Trois personnes répondent pour ce comté, et une quatrième pour le pays où il se trouve.",
    },
    note: {
      en: "This figure adds up promises from four different officeholders. Open any of the four below for that person's own record.",
      fr: "Ce chiffre additionne les promesses de quatre élus différents. Ouvrez l'un des quatre ci-dessous pour voir son propre bilan.",
    },
    counts: counts([46, 58, 20, 12, 32, 32]),
    officialSlugs: ["achieng-wekesa", "boniface-kimathi", "njeri-mwathi", "daniel-ochieng"],
  },
];

export function getCounty(country: string, slug: string): County | undefined {
  return counties.find((c) => c.country === country && c.slug === slug);
}

export const topics: Topic[] = [
  {
    slug: "water-and-sanitation",
    name: { en: "Water and sanitation", fr: "Eau et assainissement" },
    total: 61,
    countries: 4,
    intro: {
      en: "Piped water, boreholes and sewerage, as promised by the officials we track in four countries.",
      fr: "Eau courante, forages et assainissement, tels que promis par les élus que nous suivons dans quatre pays.",
    },
    hero: wide("photo-1548839140-29a749e1cf4d"),
    byCountry: [
      { country: "ke", counts: counts([7, 6, 2, 1, 4, 4]), image: card("photo-1548839140-29a749e1cf4d") },
      { country: "sn", counts: counts([2, 3, 2, 1, 3, 3]), image: card("photo-1581092160562-40aa08e78837") },
      { country: "ng", counts: counts([3, 3, 2, 1, 4, 2]), image: card("photo-1547471080-7cc2caa01a7e") },
      { country: "ci", counts: counts([2, 2, 1, 1, 1, 1]), image: card("photo-1523362628745-0c100150b504") },
    ],
  },
  { slug: "housing", name: { en: "Housing", fr: "Logement" }, total: 48, countries: 3 },
  { slug: "education", name: { en: "Education", fr: "Éducation" }, total: 112, countries: 4 },
  { slug: "health", name: { en: "Health", fr: "Santé" }, total: 96, countries: 4 },
  { slug: "roads", name: { en: "Roads", fr: "Routes" }, total: 74, countries: 3 },
  { slug: "jobs-and-training", name: { en: "Jobs and training", fr: "Emploi et formation" }, total: 39, countries: 3 },
  { slug: "commerce", name: { en: "Commerce", fr: "Commerce" }, total: 22, countries: 2 },
  { slug: "governance", name: { en: "Governance", fr: "Gouvernance" }, total: 57, countries: 3 },
  { slug: "transport", name: { en: "Transport", fr: "Transports" }, total: 28, countries: 2 },
  { slug: "public-services", name: { en: "Public services", fr: "Services publics" }, total: 31, countries: 2 },
];

export function getTopic(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}

/** Site-wide totals shown on the homepage. */
export const siteStats = {
  readersThisYear: 1284507,
  promises: 1204,
  entities: 31,
  countries: 4,
  sources: 3880,
  counts: counts([275, 351, 119, 86, 201, 172]),
};

export const partners = [
  { name: "PesaCheck", src: "/images/partners/pesacheck.png", muted: true },
  { name: "The Star", src: "/images/partners/the-star.png", muted: false },
  { name: "Piga Firimbi", src: "/images/partners/piga-firimbi.png", muted: false },
  { name: "DW Akademie", src: "/images/partners/dw-akademie.png", muted: false },
  { name: "Meedan", src: "/images/partners/meedan.png", muted: false },
  { name: "AWS", src: "/images/partners/aws.png", muted: false },
];
