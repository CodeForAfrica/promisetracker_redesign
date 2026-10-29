import type { Country, County, Official, PromiseItem } from "./types";
import { countries } from "@/content/countries";
import { officials } from "@/content/officials";
import { promises } from "@/content/promises";
import { counties, topics } from "@/content/site";

export type SearchResults = {
  q: string;
  county?: County;
  country?: Country;
  people: Official[];
  promises: PromiseItem[];
};

const fold = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .toLowerCase();

/**
 * Static search over the bundled content. A place match brings in the people who answer for it,
 * because a place is usually what a visitor means.
 */
export function search(raw: string): SearchResults {
  const q = raw.trim();
  const f = fold(q);
  if (!f) return { q, people: [], promises: [] };
  const has = (s: string) => fold(s).includes(f);

  const county = counties.find((c) => has(c.name));
  const country = county ? undefined : countries.find((c) => has(c.name.en) || has(c.name.fr));
  const topicSlugs = topics.filter((t) => has(t.name.en) || has(t.name.fr)).map((t) => t.slug);

  const byPlace = county
    ? officials.filter((o) => county.officialSlugs.includes(o.slug))
    : country
      ? officials.filter((o) => country.officialSlugs.includes(o.slug))
      : [];
  const byName = officials.filter((o) => o.status === "in-office" && (has(o.name) || has(o.place.en)) && !byPlace.includes(o));

  const matched = promises.filter(
    (p) =>
      has(p.title) ||
      has(p.place.en) ||
      has(p.place.fr) ||
      topicSlugs.includes(p.topic) ||
      byName.some((o) => o.slug === p.official),
  );

  return { q, county, country, people: [...byPlace, ...byName], promises: matched };
}
