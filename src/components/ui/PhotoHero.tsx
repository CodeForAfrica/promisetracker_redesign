import type { ReactNode } from "react";
import { Photo } from "./Photo";
import { Container } from "./Container";

/** The dark photo band used at the top of country, county, topic and search pages. */
export function PhotoHero({ image, children, aside, minH = "min-h-[460px]" }: { image: string; children: ReactNode; aside?: ReactNode; minH?: string }) {
  return (
    <section className={"relative isolate flex items-end overflow-hidden bg-ink text-white " + minH}>
      <Photo src={image} alt="" priority sizes="100vw" className="absolute! inset-0 -z-20" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(12,14,18,.2)_0%,rgba(12,14,18,.38)_42%,rgba(12,14,18,.9)_100%)]" />
      <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-16 gap-y-7 pt-16 pb-10">
        <div className="min-w-0">{children}</div>
        {aside && <div className="min-w-0">{aside}</div>}
      </Container>
    </section>
  );
}

export function HeroStats({ stats }: { stats: Array<{ value: string; label: string }> }) {
  return (
    <dl className="grid min-w-0 grid-cols-3 gap-3 border-t sm:gap-5 border-white/35 pt-[18px]">
      {stats.map((s) => (
        <div key={s.label} className="flex min-w-0 flex-col-reverse">
          <dt className="mt-2 text-[10.5px] leading-[1.4] font-medium tracking-[.1em] text-line-2 uppercase [overflow-wrap:anywhere]">{s.label}</dt>
          <dd className="text-[30px] leading-none min-[400px]:text-[36px] font-semibold tracking-[-.025em] sm:text-[44px]">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function HeroKicker({ children }: { children: ReactNode }) {
  return <div className="mb-3 text-[11px] leading-[1.6] font-medium tracking-[.12em] text-white uppercase">{children}</div>;
}

export function HeroTitle({ children }: { children: ReactNode }) {
  return <h1 className="text-[44px] leading-[1.02] font-semibold tracking-[-.028em] text-balance text-white sm:text-[64px]">{children}</h1>;
}

export function HeroLede({ children }: { children: ReactNode }) {
  return <p className="mt-3.5 max-w-[54ch] text-[16px] leading-[1.6] text-line-2">{children}</p>;
}
