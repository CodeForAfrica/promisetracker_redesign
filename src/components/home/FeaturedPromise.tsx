import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { PromiseItem } from "@/lib/types";
import { evidenceFor } from "@/content/evidence";
import { homeDict } from "@/i18n/home";
import { fill } from "@/i18n/util";
import { longDate } from "@/lib/format";
import { getTopic } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { RatingChip } from "@/components/ui/RatingChip";
import { Dots, Kicker, SectionLabel, Tag } from "@/components/ui/Text";
import { promiseHref } from "@/components/promise/PromiseCard";

export function FeaturedPromise({ promise, locale }: { promise: PromiseItem; locale: Locale }) {
  const t = homeDict[locale];
  const href = promiseHref(locale, promise);
  const topic = getTopic(promise.topic);
  return (
    <section className="bg-rose">
      <Container className="pt-7 pb-8">
        <SectionLabel>{t.realPromise}</SectionLabel>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)_minmax(0,.9fr)]">
          <Photo src={promise.image} alt="" priority sizes="(min-width: 1024px) 470px, 100vw" className="aspect-[3/2] rounded-lg" />
          <div>
            <div className="mb-3.5 flex flex-wrap items-center gap-[9px]">
              <RatingChip rating={promise.rating} locale={locale} />
              <Tag>
                <Dots parts={[topic?.name[locale] ?? "", promise.place[locale]]} />
              </Tag>
            </div>
            <h3 className="mb-4 text-[28px] leading-[1.1] font-semibold tracking-[-.025em] sm:text-[32px]">
              <Link href={href} className="text-ink hover:text-ink hover:opacity-70">
                {promise.title}
              </Link>
            </h3>
            {promise.summary && <p className="mb-[22px] text-[15px] leading-[1.65] text-ink-2">{promise.summary[locale]}</p>}
            <div className="flex flex-wrap items-center gap-[22px]">
              <Link href={href} className="rounded-lg bg-ink px-5 py-3.5 text-[12px] leading-none font-medium tracking-[.06em] text-white uppercase hover:text-white hover:opacity-70">
                {t.seeRecord}
              </Link>
              <span className="text-[11px] leading-[1.6] tracking-[.05em] text-muted uppercase">
                {fill(t.lastReviewed, { n: promise.sources, date: longDate(promise.reviewed, locale) })}
              </span>
            </div>
          </div>
          <aside className="flex flex-col self-stretch rounded-lg bg-white/60 p-[22px]">
            <Kicker>{t.evidenceFrom}</Kicker>
            <ul className="mt-1.5 grid gap-4">
              {evidenceFor(promise.slug).map((e) => (
                <li key={e.title}>
                  <div className="text-[13px] leading-[1.45] font-medium">{e.title}</div>
                  <div className="mt-0.5 text-[10.5px] leading-normal tracking-[.04em] text-muted uppercase">{e.source[locale]}</div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Container>
    </section>
  );
}
