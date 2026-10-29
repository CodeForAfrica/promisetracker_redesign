import Link from "next/link";
import { lp } from "@/lib/i18n";
import { common } from "@/i18n/common";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SearchPill } from "@/components/layout/SiteHeader";

// not-found receives no params, so the frame is rendered in English.
export default function LocaleNotFound() {
  const t = common.en;
  return (
    <PageShell locale="en">
      <Container className="py-24">
        <h1 className="mb-3 max-w-[24ch] text-[36px] leading-[1.1] font-semibold tracking-[-.02em]">{t.notFoundTitle}</h1>
        <p className="mb-7 max-w-[56ch] text-[15px] leading-[1.65] text-ink-2">{t.notFoundBody}</p>
        <div className="flex flex-wrap items-center gap-5">
          <SearchPill locale="en" />
          <Link href={lp("en", "/")} className="text-[12.5px] font-medium tracking-[.03em]">
            {t.backHome}
          </Link>
        </div>
      </Container>
    </PageShell>
  );
}
