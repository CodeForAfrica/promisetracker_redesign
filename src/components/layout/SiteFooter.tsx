import Image from "next/image";
import Link from "next/link";
import { lp, type Locale } from "@/lib/i18n";
import { partners } from "@/content/site";
import { common } from "@/i18n/common";
import { withBase } from "@/lib/base";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { SubscribeForm } from "./SubscribeForm";
import { SocialIcons } from "./SocialIcons";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = common[locale];
  const links: Array<{ label: string; href?: string }> = [
    { label: t.aboutUs },
    { label: t.project },
    { label: t.team },
    { label: t.partnersLink },
    { label: t.methodology, href: lp(locale, "/methodology") },
    { label: t.contact },
  ];
  return (
    <footer className="mt-auto">
      <Container className="pt-9 pb-5">
        <div className="mb-1 text-[12px] leading-[1.4] font-medium text-muted">{t.partners}</div>
        <ul className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
          {partners.map((p) => (
            <li key={p.name} className="w-[150px] min-w-24 flex-[0_1_150px]">
              <Image
                src={withBase(p.src)}
                alt={p.name}
                width={412}
                height={190}
                className={cn("block aspect-[412/190] h-auto w-full object-contain", p.muted && "opacity-70 grayscale")}
              />
            </li>
          ))}
        </ul>
      </Container>

      <div className="border-y border-line">
        <Container className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6 py-10">
          <div>
            <div className="text-[32px] leading-[1.1] font-bold tracking-[-.025em] text-ink">{t.subscribe}</div>
            <div className="mt-2 text-[15px] leading-normal text-ink-2">{t.subscribeLine}</div>
          </div>
          <SubscribeForm labels={{ subscribe: t.subscribe, email: t.subscribeEmail, invalid: t.subscribeInvalid, done: t.subscribeDone }} />
        </Container>
      </div>

      <Container className="pt-8 pb-6">
        <div className="flex flex-wrap items-start justify-between gap-x-12 gap-y-6">
          <div className="max-w-[660px] flex-[1_1_460px]">
            <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2.5">
              <Image src={withBase("/images/promisetracker-logo.png")} alt="PromiseTracker" width={570} height={75} style={{ height: 28, width: "auto" }} />
              <span className="text-[12.5px] leading-none text-ink-2">{t.initiative}</span>
              <span className="text-[15px] leading-none font-bold tracking-[-.015em] text-ink">
                Code for <span className="text-link">Africa</span>
              </span>
            </div>
            <p className="mt-4 text-[14px] leading-[1.7] text-ink-2">{t.about}</p>
          </div>
          <div className="flex size-[100px] flex-none items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#6E7278,#3A3D42)] text-center text-[9px] leading-[1.4] font-bold tracking-[.05em] text-white shadow-[inset_0_0_0_3px_rgba(255,255,255,.14)]">
            IFCN
            <br />
            SIGNATORY
            <br />
            PesaCheck ✓
          </div>
        </div>

        <nav aria-label="Footer" className="mt-9 flex flex-wrap gap-x-[30px] gap-y-2.5 border-y border-line-soft py-[22px] text-[15px] leading-[1.3]">
          {links.map((l) =>
            l.href ? (
              <Link key={l.label} href={l.href} className="text-ink-2 hover:text-ink">
                {l.label}
              </Link>
            ) : (
              <span key={l.label} className="text-ink-2">
                {l.label}
              </span>
            ),
          )}
        </nav>

        <div className="mt-[22px] flex flex-wrap items-center justify-between gap-x-7 gap-y-3.5 text-[13.5px] leading-[1.4] text-muted">
          <div className="flex flex-wrap items-center gap-x-[18px] gap-y-2.5">
            <span>{t.follow}</span>
            <SocialIcons />
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-2">
            <span>{t.copyright}</span>
            <span>{t.imprint}</span>
            <span>{t.privacy}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
