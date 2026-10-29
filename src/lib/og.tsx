import { ImageResponse } from "next/og";
import type { RatingCounts } from "./types";
import { TIERS, tierCount, tierMeta } from "@/content/ratings";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Satori needs literal colours; these mirror the @theme tokens in globals.css.
const C = {
  ink: "#16181C",
  ink2: "#464A50",
  muted: "#63666D",
  line: "#D6DAE0",
  verified: "#17694E",
  completed: "#1B4FD8",
  progress: "#7FC4E8",
  unstarted: "#E4E5E8",
  inconclusive: "#6B5B95",
  behind: "#F5D33A",
  stalled: "#C93B2C",
};
const SWATCH = [C.completed, C.progress, C.unstarted, C.inconclusive, C.behind, C.stalled];
const CHIP: Record<string, { bg: string; fg: string }> = {
  completed: { bg: C.completed, fg: "#fff" },
  "in-progress": { bg: C.progress, fg: "#122031" },
  unstarted: { bg: C.unstarted, fg: "#2A2C26" },
  inconclusive: { bg: C.inconclusive, fg: "#fff" },
  "behind-schedule": { bg: C.behind, fg: "#241F00" },
  stalled: { bg: C.stalled, fg: "#fff" },
};

type Card = {
  eyebrow: string;
  title: string;
  figure?: string;
  figureNote?: string;
  meta: string;
  counts?: RatingCounts;
  chip?: { rating: string; label: string };
};

/**
 * Share card. Carries the three tiers rather than six ratings, because these are read at thumbnail size;
 * every string is rendered text so French cards and rating changes need no redrawn asset.
 */
export function shareCard(card: Card) {
  const bar = card.counts
    ? TIERS.map((tier, ti) => {
        const [a, b] = tierMeta[tier].ratings;
        const counts = card.counts as RatingCounts;
        return { n: tierCount(counts, tier), parts: [counts[a], counts[b]], colors: [SWATCH[ti * 2], SWATCH[ti * 2 + 1]] };
      })
    : null;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#fff", padding: 64, color: C.ink, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, letterSpacing: -1 }}>
            Promise<span style={{ color: C.verified }}>Tracker</span>
          </div>
          <div style={{ display: "flex", fontSize: 18, letterSpacing: 2, color: C.muted, textTransform: "uppercase" }}>{card.eyebrow}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
          {card.chip && (
            <div style={{ display: "flex", marginBottom: 24 }}>
              <div
                style={{
                  display: "flex",
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  padding: "10px 18px",
                  borderRadius: 999,
                  background: CHIP[card.chip.rating]?.bg ?? C.unstarted,
                  color: CHIP[card.chip.rating]?.fg ?? C.ink,
                }}
              >
                {card.chip.label}
              </div>
            </div>
          )}
          <div style={{ display: "flex", fontSize: card.figure ? 44 : 60, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 1000 }}>{card.title}</div>
          {card.figure && (
            <div style={{ display: "flex", alignItems: "baseline", marginTop: 28 }}>
              <span style={{ fontSize: 120, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{card.figure}</span>
              {card.figureNote && <span style={{ fontSize: 26, color: C.ink2, marginLeft: 20 }}>{card.figureNote}</span>}
            </div>
          )}
        </div>

        {bar && (
          <div style={{ display: "flex", gap: 8, height: 26, marginBottom: 24 }}>
            {bar.map((g, i) =>
              g.n === 0 ? null : (
                <div key={i} style={{ display: "flex", flexGrow: g.n, gap: 3 }}>
                  {g.parts.map((p, j) => (p === 0 ? null : <div key={j} style={{ display: "flex", flexGrow: p, background: g.colors[j], borderRadius: 6 }} />))}
                </div>
              ),
            )}
          </div>
        )}
        <div style={{ display: "flex", paddingTop: 20, borderTop: "2px solid " + C.line, fontSize: 20, letterSpacing: 1.5, color: C.muted, textTransform: "uppercase" }}>{card.meta}</div>
      </div>
    ),
    ogSize,
  );
}
