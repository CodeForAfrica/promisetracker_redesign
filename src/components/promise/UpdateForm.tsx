"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/cn";

type Kind = "evidence" | "correction" | "changed";
type Context = { promise: string; official: string; where: string; rating: string };

export type UpdateLabels = Record<
  | "whatSending"
  | "kindEvidence"
  | "kindCorrection"
  | "kindChanged"
  | "kindEvidenceHint"
  | "kindCorrectionHint"
  | "kindChangedHint"
  | "attached"
  | "promise"
  | "official"
  | "where"
  | "currentRating"
  | "attachedNote"
  | "addFile"
  | "addAnother"
  | "upTo"
  | "remove"
  | "tooBig"
  | "whatSaw"
  | "whatSawPlaceholder"
  | "whatSawRequired"
  | "whereSpecific"
  | "prefilled"
  | "reach"
  | "reachPlaceholder"
  | "reachNote"
  | "send"
  | "sending"
  | "noAccount"
  | "received"
  | "thanks"
  | "thanksBody"
  | "reference"
  | "sent"
  | "noEta"
  | "back"
  | "seen"
  | "updateLede",
  string
>;

const MAX = 50 * 1024 * 1024;

function size(bytes: number): string {
  return bytes > 1024 * 1024 ? (bytes / 1024 / 1024).toFixed(1) + " MB" : Math.max(1, Math.round(bytes / 1024)) + " KB";
}

const label = "mb-2.5 block text-[10px] leading-none font-semibold tracking-[.14em] text-muted uppercase";
const field = "w-full rounded-lg border border-line bg-white px-[15px] py-[13px] text-[13.5px] leading-normal text-ink outline-none placeholder:text-subtle focus:border-ink";

export function UpdateForm({
  labels: t,
  context,
  initialWhere,
  countryCode,
  promiseHref,
  officialHref,
  sentDate,
}: {
  labels: UpdateLabels;
  context: Context;
  initialWhere: string;
  countryCode: string;
  promiseHref: string;
  officialHref?: string;
  sentDate: string;
}) {
  /* ?kind= preselects the radio. On a static export the query string only
     arrives with the first render in the browser. */
  const params = useSearchParams();
  const [kind, setKind] = useState<Kind>(() => {
    const k = params.get("kind");
    return k === "correction" || k === "changed" ? k : "evidence";
  });

  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [descError, setDescError] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [reference, setReference] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();

  const kinds: Array<{ k: Kind; name: string; hint: string }> = [
    { k: "evidence", name: t.kindEvidence, hint: t.kindEvidenceHint },
    { k: "correction", name: t.kindCorrection, hint: t.kindCorrectionHint },
    { k: "changed", name: t.kindChanged, hint: t.kindChangedHint },
  ];

  function addFiles(list: FileList | null) {
    if (!list) return;
    const ok: File[] = [];
    const big: string[] = [];
    Array.from(list).forEach((f) => (f.size > MAX ? big.push(f.name) : ok.push(f)));
    setFiles((prev) => [...prev, ...ok]);
    setFileError(big.length ? t.tooBig.replace("{name}", big.join(", ")) : "");
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const desc = String(new FormData(e.currentTarget).get("description") || "").trim();
    if (!desc) {
      setDescError(true);
      document.getElementById(id + "-desc")?.focus();
      return;
    }
    setStatus("sending");
    // TODO: post the FormData (kind, description, where, contact, files) to the submissions API.
    await new Promise((r) => setTimeout(r, 600));
    setReference(countryCode.toUpperCase() + "-" + sentDate.slice(0, 4) + "-" + String(Math.floor(10000 + Math.random() * 89999)).padStart(5, "0"));
    setStatus("sent");
    window.scrollTo({ top: 0 });
  }

  if (status === "sent") {
    return (
      <div className="grid max-w-[640px] gap-[22px]">
        <div role="status" className="rounded-lg bg-verified-bg px-6 py-[26px]">
          <div className="mb-3.5 flex items-center gap-2.5">
            <i aria-hidden="true" className="block size-[9px] rounded-full bg-verified" />
            <span className="text-[10px] leading-none font-medium tracking-[.14em] text-verified-ink uppercase">{t.received}</span>
          </div>
          <h1 className="mb-3 max-w-[26ch] text-[24px] leading-[1.25] font-semibold tracking-[-.02em]">{t.thanks}</h1>
          <p className="mb-4 max-w-[48ch] text-[14px] leading-[1.65] text-ink-2">{t.thanksBody}</p>
          <dl className="grid gap-[9px] border-t border-[#C9DDD2] pt-4 text-[12.5px] leading-normal">
            <div className="flex justify-between gap-3">
              <dt className="text-ink-2">{t.reference}</dt>
              <dd className="font-medium">{reference}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-ink-2">{t.sent}</dt>
              <dd className="font-medium">{sentDate}</dd>
            </div>
          </dl>
          <p className="mt-4 text-[12px] leading-[1.6] text-ink-2">{t.noEta}</p>
        </div>
        <div>
          <Link href={promiseHref} className="inline-block rounded-lg bg-ink px-6 py-4 text-[12px] leading-none font-medium tracking-[.06em] text-white uppercase hover:text-white hover:opacity-85">
            {t.back}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid items-start gap-[52px] md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <div>
        <h1 className="mb-3.5 max-w-[24ch] text-[28px] leading-[1.12] font-semibold tracking-[-.014em] sm:text-[34px]">{t.seen}</h1>
        <p className="mb-[22px] max-w-[52ch] text-[15px] leading-[1.65] text-ink-2">{t.updateLede}</p>
        <fieldset className="mb-[26px]">
          <legend className={label}>{t.whatSending}</legend>
          <div className="grid gap-2">
            {kinds.map(({ k, name, hint }) => (
              <label
                key={k}
                className={cn(
                  "cursor-pointer rounded-lg border px-4 py-3.5 text-[12.5px] leading-[1.4] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-verified/40",
                  kind === k ? "border-verified bg-verified-bg font-medium text-verified-ink" : "border-line bg-white text-ink-2",
                )}
              >
                <input type="radio" name="kind" value={k} checked={kind === k} onChange={() => setKind(k)} className="sr-only" />
                {name}
                {"\u00a0 "}
                <span className="font-normal text-muted">{hint}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="rounded-lg bg-surface px-5 py-[18px]">
          <div className={label}>{t.attached}</div>
          <dl className="grid gap-[9px] text-[12.5px] leading-normal text-ink-2">
            {[
              [t.promise, context.promise],
              [t.official, context.official],
              [t.where, context.where],
              [t.currentRating, context.rating],
            ].map(([k, v], i) => (
              <div key={k} className="flex justify-between gap-3">
                <dt className="text-muted">{k}</dt>
                <dd className="text-right font-medium">
                  {i === 1 && officialHref ? (
                    <Link href={officialHref} className="text-ink-2 hover:text-ink">
                      {v}
                    </Link>
                  ) : (
                    v
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3.5 text-[12px] leading-[1.6] text-ink-2">{t.attachedNote}</p>
        </div>
      </div>

      <div>
        {files.length > 0 && (
          <ul className="mb-4 grid gap-2">
            {files.map((f, i) => (
              <li key={f.name + i} className="flex items-center gap-3.5 rounded-lg border border-verified bg-verified-bg px-[18px] py-4">
                <span className="relative h-12 w-16 flex-none overflow-hidden rounded-lg bg-tile">
                  {f.type.startsWith("image/") && <Image src={URL.createObjectURL(f)} alt="" fill unoptimized className="object-cover" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] leading-[1.4] font-medium">{f.name}</span>
                  <span className="text-[11px] leading-normal text-ink-2 uppercase">{size(f.size)}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                  aria-label={t.remove.replace("{name}", f.name)}
                  className="cursor-pointer text-[13px] leading-none text-muted hover:text-ink"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
        <label
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            addFiles(e.dataTransfer.files);
          }}
          className="mb-5 block cursor-pointer rounded-lg border border-dashed border-verified bg-white px-[18px] py-4 text-center hover:bg-verified-bg has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-verified/40"
        >
          <input ref={inputRef} type="file" name="files" multiple accept="image/*,application/pdf" className="sr-only" onChange={(e) => addFiles(e.target.files)} />
          <span className="block text-[13px] leading-normal font-medium text-verified-ink">{files.length ? t.addAnother : t.addFile}</span>
          <span className="mt-[3px] block text-[11px] leading-[1.6] text-ink-2 uppercase">{t.upTo}</span>
        </label>
        {fileError && <p className="-mt-3 mb-5 text-[12.5px] text-r-stalled">{fileError}</p>}

        <label htmlFor={id + "-desc"} className={label}>
          {t.whatSaw}
        </label>
        <textarea
          id={id + "-desc"}
          name="description"
          rows={4}
          placeholder={t.whatSawPlaceholder}
          aria-invalid={descError}
          aria-describedby={descError ? id + "-desc-err" : undefined}
          onChange={() => descError && setDescError(false)}
          className={cn(field, "mb-1 resize-y text-[14px] leading-[1.6]", descError ? "border-r-stalled" : "border-ink")}
        />
        <p id={id + "-desc-err"} className={cn("mb-5 min-h-4 text-[12.5px] text-r-stalled", !descError && "invisible")}>
          {t.whatSawRequired}
        </p>

        <label htmlFor={id + "-where"} className={label}>
          {t.whereSpecific}
        </label>
        <input id={id + "-where"} name="where" defaultValue={initialWhere} aria-describedby={id + "-where-note"} className={cn(field, "mb-1")} />
        <p id={id + "-where-note"} className="mb-5 text-[12px] text-muted">
          {t.prefilled}
        </p>

        <label htmlFor={id + "-contact"} className={label}>
          {t.reach}
        </label>
        <input id={id + "-contact"} name="contact" autoComplete="email" placeholder={t.reachPlaceholder} className={cn(field, "mb-2.5")} />
        <p className="mb-[22px] text-[12px] leading-[1.6] text-ink-2">{t.reachNote}</p>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="cursor-pointer rounded-lg bg-verified px-6 py-4 text-[12px] leading-none font-medium tracking-[.06em] text-white uppercase hover:opacity-85 disabled:cursor-wait disabled:opacity-60"
          >
            {status === "sending" ? t.sending : t.send}
          </button>
          <span className="text-[11px] leading-[1.6] tracking-[.05em] text-muted uppercase">{t.noAccount}</span>
        </div>
      </div>
    </form>
  );
}
