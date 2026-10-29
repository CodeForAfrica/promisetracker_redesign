import Link from "next/link";
import { lp, type Locale } from "@/lib/i18n";
import { countries } from "@/content/countries";
import { getOfficial } from "@/content/officials";
import { PROPORTION_MIN } from "@/content/ratings";
import { homeDict } from "@/i18n/home";
import { Container } from "@/components/ui/Container";
import { Flag } from "@/components/ui/Flag";
import { Dots, SectionLabel } from "@/components/ui/Text";
import { common } from "@/i18n/common";
import type { Country } from "@/lib/types";

/** Each country's line is written in that country's own language. */
function tallyLine(c: Country): string[] {
  const l = c.lang;
  const promises = l === "fr" ? (c.promises === 1 ? "1 promesse" : c.promises + " promesses") : c.promises === 1 ? "1 promise" : c.promises + " promises";
  let officials: string;
  if (l === "fr") {
    const allF = c.officialSlugs.every((s) => getOfficial(s)?.gender === "f");
    officials = c.officials + " " + (c.officials === 1 ? (allF ? "élue" : "élu") : allF ? "élues" : "élus");
  } else {
    officials = c.officials + " " + (c.officials === 1 ? "official" : "officials");
  }
  return [promises, officials];
}

export function CountryPicker({ locale }: { locale: Locale }) {
  const t = homeDict[locale];
  return (
    <section>
      <Container className="pt-7 pb-8">
        <SectionLabel>{t.chooseCountry}</SectionLabel>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] sm:-mx-[22px] gap-px overflow-hidden rounded-lg bg-tile">
          {countries.map((c) => (
            <li key={c.code} className="bg-white px-[22px] py-5">
              <Link href={lp(locale, "/" + c.code)} className="mb-2 flex items-center gap-[9px] text-ink hover:text-ink hover:opacity-70">
                <Flag code={c.code} />
                <span className="text-[20px] leading-[1.2] font-semibold">{c.name[locale]}</span>
              </Link>
              <div className="text-[12px] leading-normal text-muted">
                <Dots parts={tallyLine(c)} />
              </div>
              {c.promises < PROPORTION_MIN && <div className="mt-3.5 text-[11px] leading-normal text-subtle">{common[c.lang].tooFew}</div>}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
