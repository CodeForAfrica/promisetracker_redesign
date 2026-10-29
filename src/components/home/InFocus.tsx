import Link from "next/link";
import { lp, type Locale } from "@/lib/i18n";
import type { County, Official, PromiseItem, Topic } from "@/lib/types";
import { homeDict } from "@/i18n/home";
import { fill, words } from "@/i18n/util";
import { Container } from "@/components/ui/Container";
import { ArrowLink, SectionLabel } from "@/components/ui/Text";
import { PromiseCard } from "@/components/promise/PromiseCard";
import { OfficialCard } from "@/components/official/OfficialCard";
import { CountyCard } from "@/components/county/CountyCard";

type InFocusProps = { locale: Locale; topic: Topic; promises: PromiseItem[]; people: Official[]; county?: County };

export function InFocus({ locale, topic, promises, people, county }: InFocusProps) {
  const t = homeDict[locale];
  const topicHref = lp(locale, "/topics/" + topic.slug);
  return (
    <section>
      <Container className="pt-9 pb-10">
        <div className="mb-9 flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <h2 className="text-[32px] leading-[1.1] font-semibold tracking-[-.025em] sm:text-[40px]">{t.inFocus}</h2>
          <span className="text-[14px] leading-normal text-muted">{t.chosen}</span>
        </div>

        <SectionLabel as="h3">{t.topic}</SectionLabel>
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
          <h3 className="text-[24px] leading-[1.25] font-semibold tracking-[-.015em]">
            <Link href={topicHref} className="text-ink hover:text-ink hover:opacity-70">
              {fill(t.acrossCountries, { topic: topic.name[locale], n: words(topic.countries, locale) })}
            </Link>
          </h3>
          <ArrowLink href={topicHref}>{fill(t.allOnTopic, { n: topic.total })}</ArrowLink>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {promises.map((p) => (
            <PromiseCard key={p.slug} promise={p} locale={locale} />
          ))}
        </div>

        <div className="mt-[52px]">
          <SectionLabel as="h3">{t.people}</SectionLabel>
          <div className="grid items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {people.map((o) => (
              <OfficialCard key={o.slug} official={o} locale={locale} />
            ))}
            {county && <CountyCard county={county} locale={locale} />}
          </div>
        </div>
      </Container>
    </section>
  );
}
