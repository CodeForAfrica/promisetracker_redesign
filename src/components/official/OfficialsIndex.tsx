"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { RatingCounts } from "@/lib/types";
import { cn } from "@/lib/cn";
import { TierBar } from "@/components/ui/TierBar";

export type OfficialRowData = {
  slug: string;
  href: string;
  name: string;
  party: string;
  portrait: string;
  ring: string;
  title: string;
  titlePlural: string;
  place: string;
  placeHref?: string;
  counts: RatingCounts;
  total: number;
  keptPct: number | null;
  keptLabel: string;
};

type Labels = {
  filter: string;
  title: string;
  where: string;
  party: string;
  sort: string;
  mostKept: string;
  mostKeptFirst: string;
  mostPromises: string;
  name: string;
  clearAll: string;
  tracked: string;
  trackedAll: string;
  official: string;
  answersFor: string;
  record: string;
  kept: string;
  showRemaining: string;
  noneMatch: string;
  remove: string;
};

type Sort = "kept" | "promises" | "name";
type Key = "title" | "place" | "party";

const SHOW = 4;

function Select({ label, value, options, onChange, on }: { label: string; value: string; options: string[]; onChange: (v: string) => void; on: boolean }) {
  return (
    <label className={cn("relative inline-flex max-w-full min-w-0 items-center rounded-lg border text-[12px] leading-none", on ? "border-ink font-medium" : "border-line")}>
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="max-w-full min-w-0 cursor-pointer appearance-none truncate bg-transparent py-3 pr-8 pl-[13px] text-[16px] text-ink outline-none sm:py-2.5 sm:text-[12px]">
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {label}: {o}
          </option>
        ))}
      </select>
      <span aria-hidden="true" className="pointer-events-none absolute right-[13px] text-[10px]">
        ▾
      </span>
    </label>
  );
}

export function OfficialsIndex({ rows, labels: t }: { rows: OfficialRowData[]; labels: Labels }) {
  /* ?title= and ?sort= preselect the controls. The site is a static export, so
     the query string only arrives with the first render in the browser. */
  const params = useSearchParams();
  const [filters, setFilters] = useState<Partial<Record<Key, string>>>(() => {
    const title = params.get("title");
    const match = title ? rows.find((r) => r.title.toLowerCase() === title.toLowerCase())?.title : undefined;
    return match ? { title: match } : {};
  });
  const [sort, setSort] = useState<Sort | "">(() => {
    const s = params.get("sort");
    return s === "kept" || s === "promises" || s === "name" ? s : "";
  });
  const [all, setAll] = useState(false);

  const opts = (k: Key) => [...new Set(rows.map((r) => r[k]).filter(Boolean))];

  const shown = useMemo(() => {
    const list = rows.filter((r) => (Object.keys(filters) as Key[]).every((k) => !filters[k] || r[k] === filters[k]));
    const s = sort || "kept";
    return [...list].sort((a, b) =>
      s === "name" ? a.name.localeCompare(b.name) : s === "promises" ? b.total - a.total : (b.keptPct ?? -1) - (a.keptPct ?? -1),
    );
  }, [rows, filters, sort]);

  const sortLabel: Record<Sort, string> = { kept: t.mostKeptFirst, promises: t.mostPromises, name: t.name };
  const chips: Array<{ key: string; label: string; clear: () => void }> = [
    ...(Object.keys(filters) as Key[])
      .filter((k) => filters[k])
      .map((k) => ({ key: k, label: filters[k] as string, clear: () => setFilters((f) => ({ ...f, [k]: "" })) })),
    ...(sort ? [{ key: "sort", label: sortLabel[sort], clear: () => setSort("") }] : []),
  ];
  const titleRow = filters.title ? rows.find((r) => r.title === filters.title) : undefined;
  const visible = all ? shown : shown.slice(0, SHOW);
  const cols = "md:grid-cols-[minmax(0,2fr)_160px_minmax(0,2.2fr)_90px]";

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-2.5">
        <span className="mr-1 text-[9.5px] leading-none font-semibold tracking-[.14em] text-muted uppercase">{t.filter}</span>
        <Select label={t.title} value={filters.title ?? ""} options={opts("title")} on={Boolean(filters.title)} onChange={(v) => setFilters((f) => ({ ...f, title: v }))} />
        <Select label={t.where} value={filters.place ?? ""} options={opts("place")} on={Boolean(filters.place)} onChange={(v) => setFilters((f) => ({ ...f, place: v }))} />
        <Select label={t.party} value={filters.party ?? ""} options={opts("party")} on={Boolean(filters.party)} onChange={(v) => setFilters((f) => ({ ...f, party: v }))} />
        <span className="flex-1" />
        <label className={cn("relative inline-flex max-w-full min-w-0 items-center rounded-lg border text-[12px] leading-none", sort ? "border-ink font-medium" : "border-line")}>
          <span className="sr-only">{t.sort}</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort | "")} className="max-w-full min-w-0 cursor-pointer appearance-none truncate bg-transparent py-3 pr-8 pl-[13px] text-[16px] text-ink outline-none sm:py-2.5 sm:text-[12px]">
            <option value="">{t.sort}</option>
            <option value="kept">
              {t.sort}: {t.mostKept.toLowerCase()}
            </option>
            <option value="promises">
              {t.sort}: {t.mostPromises.toLowerCase()}
            </option>
            <option value="name">
              {t.sort}: {t.name.toLowerCase()}
            </option>
          </select>
          <span aria-hidden="true" className="pointer-events-none absolute right-[13px] text-[10px]">
            ▾
          </span>
        </label>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-5 border-b border-line-soft pb-5">
        <div className="flex flex-wrap items-center gap-2">
          {chips.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={c.clear}
              aria-label={t.remove.replace("{name}", c.label)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-surface px-[11px] py-[9px] text-[11.5px] leading-none hover:bg-line-2"
            >
              {c.label}
              <span aria-hidden="true" className="text-muted">
                ✕
              </span>
            </button>
          ))}
          {chips.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setFilters({});
                setSort("");
              }}
              className="cursor-pointer text-[11.5px] leading-none text-link hover:text-link-hover"
            >
              {t.clearAll}
            </button>
          )}
        </div>
        <div className="text-right">
          <div className="text-[40px] leading-none font-semibold tracking-[-.02em]">{shown.length}</div>
          <div className="mt-[3px] text-[10.5px] leading-normal tracking-[.05em] text-muted uppercase">
            {titleRow ? t.tracked.replace("{title}", titleRow.titlePlural) : t.trackedAll}
          </div>
        </div>
      </div>

      <div className="mt-1 grid gap-px overflow-hidden rounded-lg bg-tile" role="table">
        <div role="row" className={"hidden gap-5 bg-surface px-[18px] py-[11px] text-[9.5px] leading-none font-semibold tracking-[.14em] text-muted uppercase md:grid " + cols}>
          <span role="columnheader">{t.official}</span>
          <span role="columnheader">{t.answersFor}</span>
          <span role="columnheader">{t.record}</span>
          <span role="columnheader" className="text-right">
            {t.kept}
          </span>
        </div>
        {visible.length === 0 && <p className="bg-white p-6 text-[14px] text-ink-2">{t.noneMatch}</p>}
        {visible.map((r) => (
          <div role="row" key={r.slug} className={"grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-5 gap-y-2.5 bg-white px-[18px] py-[15px] " + cols}>
            <div role="cell" className="flex items-center gap-3">
              <span className={cn("relative size-[34px] flex-none overflow-hidden rounded-full border-2", r.ring)}>
                <Image src={r.portrait} alt="" fill sizes="34px" className="object-cover grayscale" />
              </span>
              <span className="min-w-0">
                <Link href={r.href} className="block text-[14.5px] leading-[1.3] font-medium text-ink hover:text-ink hover:opacity-70">
                  {r.name}
                </Link>
                <span className="text-[10px] leading-[1.3] font-medium tracking-[.1em] text-muted uppercase">{r.party}</span>
              </span>
            </div>
            <span role="cell" className="text-[12.5px] leading-[1.4] text-ink-2 max-md:col-start-1">
              {r.placeHref ? (
                <Link href={r.placeHref} className="text-ink-2 hover:text-ink">
                  {r.place}
                </Link>
              ) : (
                r.place
              )}
            </span>
            <span role="cell" className="max-md:col-span-2">
              {r.keptPct === null ? (
                <span className="text-[12px] leading-normal text-muted">{r.keptLabel}</span>
              ) : (
                <TierBar counts={r.counts} className="h-4 gap-[3px] rounded-lg" />
              )}
            </span>
            <span role="cell" className={cn("text-right text-[14px] leading-none max-md:col-start-2 max-md:row-start-1", r.keptPct === null ? "text-[12px] text-muted" : "font-medium")}>
              {r.keptPct === null ? "—" : r.keptPct + "%"}
            </span>
          </div>
        ))}
      </div>
      {!all && shown.length > SHOW && (
        <button type="button" onClick={() => setAll(true)} className="mt-[18px] cursor-pointer text-[12.5px] font-medium tracking-[.03em] text-link hover:text-link-hover">
          {t.showRemaining.replace("{n}", String(shown.length - SHOW))}
        </button>
      )}
    </>
  );
}
