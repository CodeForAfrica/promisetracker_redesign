"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { PromiseRowData } from "@/lib/rows";
import { cn } from "@/lib/cn";

type Option = { value: string; label: string };
type Labels = {
  country: string;
  rating: string;
  topic: string;
  official: string;
  all: string;
  sort: string;
  soonest: string;
  reviewed: string;
  none: string;
  clear: string;
  more: string;
};

function FilterSelect({ label, value, options, onChange, all }: { label: string; value: string; options: Option[]; onChange: (v: string) => void; all?: string }) {
  return (
    <label className="relative inline-flex max-w-full min-w-0 items-center rounded-lg border border-line text-[12px] leading-none focus-within:border-ink">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="max-w-full min-w-0 cursor-pointer appearance-none truncate bg-transparent py-3 pr-8 pl-[13px] text-[16px] text-ink outline-none sm:py-2.5 sm:text-[12px]"
      >
        {all !== undefined && <option value="">{label}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span aria-hidden="true" className="pointer-events-none absolute right-[13px] text-[10px]">
        ▾
      </span>
    </label>
  );
}

type Filter = "country" | "rating" | "topic" | "official";
const LABEL_KEY = { country: "countryName", rating: "ratingLabel", topic: "topicName", official: "officialName" } as const;

function uniq(rows: PromiseRowData[], key: Filter): Option[] {
  const label = LABEL_KEY[key];
  const seen = new Map<string, string>();
  rows.forEach((r) => seen.set(r[key], r[label]));
  return [...seen].map(([value, l]) => ({ value, label: l }));
}

/** Filterable, sortable list of promises. Filters only offer values present in the list. */
export function PromiseTable({
  rows,
  labels,
  column = "official",
  pageSize = 20,
  filters = ["rating", "topic", "official"],
}: {
  rows: PromiseRowData[];
  labels: Labels;
  /** What the fourth column shows. */
  column?: "official" | "topic" | "place";
  pageSize?: number;
  /** Which filters to offer; an empty list hides the toolbar. */
  filters?: Filter[];
}) {
  const showOfficial = column === "official";
  const [limit, setLimit] = useState(pageSize);
  const [active, setActive] = useState<Partial<Record<Filter, string>>>({});
  const [sort, setSort] = useState<"soonest" | "reviewed">("soonest");

  const shown = useMemo(() => {
    const r = rows.filter((x) => (Object.keys(active) as Filter[]).every((k) => !active[k] || x[k] === active[k]));
    return [...r].sort((a, b) => (sort === "soonest" ? a.dueSort.localeCompare(b.dueSort) : b.reviewed.localeCompare(a.reviewed)));
  }, [rows, active, sort]);

  const filtered = Object.values(active).some(Boolean);

  return (
    <div>
      {filters.length > 0 && <div className="mb-[22px] flex flex-wrap items-center gap-2.5">
        {filters.map((k) => (
          <FilterSelect
            key={k}
            label={labels[k]}
            value={active[k] ?? ""}
            onChange={(v) => setActive((a) => ({ ...a, [k]: v }))}
            options={uniq(rows, k)}
            all={labels.all}
          />
        ))}
        {filtered && (
          <button
            type="button"
            onClick={() => setActive({})}
            className="cursor-pointer text-[12px] text-link hover:text-link-hover"
          >
            {labels.clear}
          </button>
        )}
        <span className="flex-1" />
        <FilterSelect
          label={labels.sort}
          value={sort}
          onChange={(v) => setSort(v === "reviewed" ? "reviewed" : "soonest")}
          options={[
            { value: "soonest", label: labels.sort + ": " + labels.soonest.toLowerCase() },
            { value: "reviewed", label: labels.sort + ": " + labels.reviewed.toLowerCase() },
          ]}
        />
      </div>}

      {shown.length === 0 ? (
        <p className="rounded-lg bg-surface p-6 text-[14px] text-ink-2">{labels.none}</p>
      ) : (
        <ul className="grid gap-px overflow-hidden rounded-lg bg-tile">
          {shown.slice(0, limit).map((r) => (
            <li
              key={r.slug}
              className={cn(
                "grid items-center gap-x-5 gap-y-2 bg-white py-3 pr-[18px] pl-3",
                "grid-cols-[72px_minmax(0,1fr)]",
                column === "official" ? "md:grid-cols-[72px_150px_minmax(0,1fr)_190px_130px]" : column === "place" ? "md:grid-cols-[72px_150px_minmax(0,1fr)_200px_140px]" : "md:grid-cols-[72px_150px_minmax(0,1fr)_120px_140px]",
              )}
            >
              <span className="relative row-span-3 block h-[54px] w-[72px] overflow-hidden rounded-md bg-tile md:row-span-1">
                <Image src={r.image} alt="" fill sizes="72px" className="object-cover" />
              </span>
              <span className={cn("justify-self-start rounded-full px-2.5 py-1.5 text-[10px] leading-none font-semibold tracking-[.1em] whitespace-nowrap uppercase", r.chip)}>
                {r.ratingLabel}
              </span>
              <Link href={r.href} className="text-[14.5px] leading-[1.4] font-medium text-ink hover:text-ink hover:opacity-70">
                {r.title}
              </Link>
              {!showOfficial && (
                <span className="text-[10px] leading-[1.3] font-medium tracking-[.1em] text-muted uppercase max-md:hidden">{column === "place" ? r.placeName : r.topicName}</span>
              )}
              {showOfficial &&
                (r.officialHref ? (
                  <Link href={r.officialHref} className="text-[12px] leading-[1.4] text-muted hover:text-muted hover:opacity-70 max-md:hidden">
                    {r.officialName}
                  </Link>
                ) : (
                  <span className="text-[12px] leading-[1.4] text-muted max-md:hidden">{r.officialName}</span>
                ))}
              <span className={cn("text-[11px] leading-normal tracking-[.04em] uppercase", r.dueAlert ? "text-r-stalled" : "text-muted")}>{r.dueLabel}</span>
            </li>
          ))}
        </ul>
      )}
      {shown.length > limit && (
        <button type="button" onClick={() => setLimit((l) => l + pageSize)} className="mt-[18px] cursor-pointer text-[12.5px] font-medium tracking-[.03em] text-link hover:text-link-hover">
          {labels.more.replace("{n}", String(Math.min(pageSize, shown.length - limit)))}
        </button>
      )}
    </div>
  );
}
