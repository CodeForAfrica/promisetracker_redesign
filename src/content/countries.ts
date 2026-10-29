import type { Country, CountryCode } from "@/lib/types";
import { counts } from "./ratings";

const u = (id: string, w: number, h: number) =>
  "https://images.unsplash.com/" + id + "?w=" + w + "&h=" + h + "&fit=crop&auto=format&q=70";

export const countries: Country[] = [
  {
    code: "ke",
    name: { en: "Kenya", fr: "Kenya" },
    lang: "en",
    hero: u("photo-1693902997450-7e912c0d3554", 1800, 900),
    heroCredit: "Photo by Kenny Murgor on Unsplash",
    intro: {
      en: "Promises made by the president, the governor, senators and members of parliament who answer for Kenyans.",
      fr: "Les promesses du président, de la gouverneure, des sénateurs et des députés qui répondent devant les Kényans.",
    },
    reviewed: "2026-09-04",
    promises: 142,
    officials: 4,
    counts: counts([38, 44, 12, 8, 21, 19]),
    inFocus: ["kibra-housing", "tvet-centres", "health-financing-bill", "kibra-roads"],
    officialSlugs: ["achieng-wekesa", "daniel-ochieng", "boniface-kimathi", "njeri-mwathi"],
    parties: [
      {
        name: "Kenya National Alliance",
        kept: 4,
        total: 9,
        note: { en: "Manifesto pledges made by the party rather than one candidate.", fr: "Engagements du manifeste pris par le parti plutôt que par un candidat." },
      },
    ],
    pastSlugs: ["mutiso-kilonzo"],
  },
  {
    code: "sn",
    name: { en: "Sénégal", fr: "Sénégal" },
    lang: "fr",
    hero: u("photo-1581092160562-40aa08e78837", 1800, 900),
    heroCredit: "Sample photograph, Unsplash",
    intro: {
      en: "Promises made by the mayor of Dakar.",
      fr: "Les promesses de la maire de Dakar.",
    },
    reviewed: "2026-08-28",
    promises: 3,
    officials: 1,
    counts: counts([0, 1, 1, 0, 1, 0]),
    inFocus: ["assainissement-dakar"],
    officialSlugs: ["aissata-diallo"],
    parties: [],
    pastSlugs: [],
  },
  {
    code: "ng",
    name: { en: "Nigeria", fr: "Nigeria" },
    lang: "en",
    hero: u("photo-1547471080-7cc2caa01a7e", 1800, 900),
    heroCredit: "Sample photograph, Unsplash",
    intro: {
      en: "Promises made by the governor and a senator who answer for Kano State.",
      fr: "Les promesses du gouverneur et d'une sénatrice qui répondent pour l'État de Kano.",
    },
    reviewed: "2026-08-21",
    promises: 11,
    officials: 2,
    counts: counts([1, 4, 3, 0, 2, 1]),
    inFocus: ["kano-boreholes"],
    officialSlugs: ["abdullahi-musa", "hauwa-bello"],
    parties: [],
    pastSlugs: [],
  },
  {
    code: "ci",
    name: { en: "Côte d'Ivoire", fr: "Côte d'Ivoire" },
    lang: "fr",
    hero: u("photo-1523362628745-0c100150b504", 1800, 900),
    heroCredit: "Sample photograph, Unsplash",
    intro: {
      en: "Promises made by the mayor of Abidjan.",
      fr: "Les promesses du maire d'Abidjan.",
    },
    reviewed: "2026-08-30",
    promises: 4,
    officials: 1,
    counts: counts([0, 1, 2, 1, 0, 0]),
    inFocus: ["eau-potable-rurale"],
    officialSlugs: ["yao-konan"],
    parties: [],
    pastSlugs: [],
  },
];

export function getCountry(code: string): Country | undefined {
  return countries.find((c) => c.code === code);
}

export const countryCodes: CountryCode[] = countries.map((c) => c.code);
