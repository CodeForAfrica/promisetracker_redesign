"use client";

import { useState, type FormEvent } from "react";

type Labels = { subscribe: string; email: string; invalid: string; done: string };

export function SubscribeForm({ labels }: { labels: Labels }) {
  const [status, setStatus] = useState<"idle" | "invalid" | "done">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = String(new FormData(e.currentTarget).get("email") || "").trim();
    // TODO: post to the newsletter provider.
    setStatus(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "done" : "invalid");
  }

  if (status === "done") {
    return (
      <p role="status" className="text-[14px] leading-normal text-verified-ink">
        {labels.done}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid w-full max-w-[340px] gap-2">
      <div className="flex items-center gap-2 rounded-full border border-line-2 bg-surface py-1 pr-1 pl-5 focus-within:border-ink">
        <label htmlFor="subscribe-email" className="sr-only">
          {labels.email}
        </label>
        <input
          id="subscribe-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.org"
          aria-invalid={status === "invalid"}
          aria-describedby={status === "invalid" ? "subscribe-error" : undefined}
          onChange={() => status === "invalid" && setStatus("idle")}
          className="min-w-0 flex-1 bg-transparent text-[14px] leading-none text-ink outline-none placeholder:text-faint"
        />
        <button type="submit" className="flex-none cursor-pointer rounded-full bg-ink px-[22px] py-[13px] text-[14px] leading-none font-semibold text-white hover:opacity-85">
          {labels.subscribe}
        </button>
      </div>
      {status === "invalid" && (
        <p id="subscribe-error" className="pl-5 text-[12.5px] leading-snug text-r-stalled">
          {labels.invalid}
        </p>
      )}
    </form>
  );
}
