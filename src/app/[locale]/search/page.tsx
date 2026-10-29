import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { SearchResults } from "./SearchResults";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <Suspense>
      <SearchResults locale={locale} />
    </Suspense>
  );
}
