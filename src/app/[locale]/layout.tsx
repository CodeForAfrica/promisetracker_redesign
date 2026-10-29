import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { isLocale, locales } from "@/lib/i18n";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://promisetracker.org"),
  title: { default: "PromiseTracker", template: "%s · PromiseTracker" },
  description: "A record of what those elected to office promised, and what they actually delivered.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} className={inter.variable}>
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
