"use client";

import { useState } from "react";

export function CopyCitation({ text, label, done }: { text: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          setCopied(false);
        }
      }}
      className="cursor-pointer text-[12px] leading-normal font-medium text-verified hover:opacity-70"
    >
      <span aria-live="polite">{copied ? done : label}</span>
    </button>
  );
}
