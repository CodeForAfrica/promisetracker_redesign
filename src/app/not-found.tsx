import Link from "next/link";
import { lp } from "@/lib/i18n";
import "./globals.css";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="grid min-h-dvh place-items-center p-10 font-sans">
        <div className="max-w-md">
          <h1 className="text-[32px] leading-tight font-semibold tracking-[-.02em]">This page is not on the record</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
            <Link href={lp("en", "/")}>Back to the homepage</Link>
          </p>
        </div>
      </body>
    </html>
  );
}
