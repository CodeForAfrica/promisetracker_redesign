import React from 'react';
import { sx } from '../lib/sx';
import { useVals } from '../lib/vals';
import { useIsMobile } from '../lib/useMediaQuery';

const SOCIALS = [
  { label: 'facebook', path: 'M14 8h2.5V5H14c-2 0-3.2 1.2-3.2 3.2V10H8.5v3h2.3v8h3v-8h2.2l.5-3h-2.7V8.4c0-.3.2-.4.7-.4z', filled: true },
  { label: 'whatsapp', node: (<><path d="M3 21l1.6-4A8.5 8.5 0 1 1 8 19.4z"></path><path d="M9 9.2c.2 2.6 1.9 4.6 4.5 4.8.6.05 1-.4 1-1l-1.4-1-1.3.7c-.8-.3-1.4-1-1.6-1.8l.7-1.1-1-1.4c-.6 0-1.05.4-1 1z" fill="currentColor" stroke="none"></path></>) },
  { label: 'twitter', path: 'M4 4l7 9-7 7h2.4l5.6-5.6L16 20h4l-7.3-9.3L19.4 4H17l-5 5-3.8-5z', filled: true },
  { label: 'instagram', node: (<><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"></circle></>) },
  { label: 'linkedin', node: (<><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 17v-7"></path></>) }
];

const Social = ({ s, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {s.node || <path d={s.path} fill={s.filled ? 'currentColor' : 'none'} stroke="none"></path>}
  </svg>
);

const BLURB = "PromiseTracker is a project of Code for Africa, the continent's largest network of civic technology and data journalism labs. Every rating is backed by dated, public evidence and verified with PesaCheck. All content is released under a Creative Commons Attribution Licence. Reuse it to hold leaders in your own community to account.";

export default function SiteFooter() {
  const { goAbout, goAboutPartners, goAboutProject, goAboutTeam, goMeth } = useVals();
  const isMobile = useIsMobile();

  const links = [
    { label: 'About Us', go: goAbout },
    { label: 'The Project', go: goAboutProject },
    { label: 'The Team', go: goAboutTeam },
    { label: 'The Partners', go: goAboutPartners },
    { label: 'Methodology', go: goMeth },
    { label: 'Contact Us', go: undefined }
  ];

  const badge = (size) => (
    <div aria-label="IFCN verified signatory" style={sx(`width:${size}px;height:${size}px;border-radius:50%;flex:none;background:radial-gradient(circle at 50% 36%,#7a8088,#3b424b);border:3px solid #5a616b;color:#FFFFFF;display:flex;align-items:center;justify-content:center;text-align:center;font-size:${size < 90 ? '7.5' : '8.5'}px;font-weight:700;line-height:1.35;padding:8px`)}>
      <div>IFCN<br />SIGNATORY<br /><span style={sx("opacity:0.85")}>PesaCheck ✓</span></div>
    </div>
  );

  /* Below the tab breakpoint the three-column masthead squeezes the blurb into a
     ~220px gutter beside a 96px badge, so the phone layout stacks it instead and
     gives the link list and legal row full-width rows with real tap targets. */
  if (isMobile) {
    return (
      <footer style={sx("background:#FFFFFF;padding:40px 0 32px")}>
        <div style={sx("max-width:1280px;margin:0 auto;padding:0 var(--gut)")}>
          <div style={sx("display:flex;align-items:center;justify-content:space-between;gap:16px")}>
            <img src="/assets/logo.png" alt="PromiseTracker" style={sx("height:26px;display:block")} />
            {badge(76)}
          </div>
          <div style={sx("display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin-top:20px")}>
            <span style={sx("font-size:12px;color:#6b7078")}>An initiative of:</span>
            <img src="/assets/code-for-africa.svg" alt="Code for Africa" style={sx("height:24px;max-width:100%;display:block")} />
          </div>
          <p style={sx("margin:16px 0 0;font-size:13px;line-height:1.65;color:#6b7078;text-wrap:pretty")}>{BLURB}</p>

          <nav style={sx("display:grid;grid-template-columns:1fr 1fr;column-gap:16px;margin-top:26px;border-top:1px solid #ededf0")}>
            {links.map((l) => (
              <button key={l.label} className="hv8" onClick={l.go} style={sx("padding:13px 0;font-size:14.5px;font-weight:500;color:#5c5c5c;border-bottom:1px solid #ededf0;text-align:left")}>{l.label}</button>
            ))}
          </nav>

          <div style={sx("margin-top:24px")}>
            <p style={sx("margin:0;font-size:11px;font-weight:700;letter-spacing:0.09em;text-transform:uppercase;color:#8b9099")}>Follow PromiseTracker</p>
            <div style={sx("display:flex;align-items:center;gap:6px;margin:8px 0 0 -9px")}>
              {SOCIALS.map((s) => (
                <button key={s.label} className="hv8" aria-label={s.label} style={sx("display:grid;place-items:center;width:38px;height:38px;color:#3f3f3f")}>
                  <Social s={s} size={19} />
                </button>
              ))}
            </div>
          </div>

          <div style={sx("display:flex;flex-direction:column;gap:12px;margin-top:20px;padding-top:18px;border-top:1px solid #ededf0")}>
            <div style={sx("display:flex;flex-wrap:wrap;gap:22px;font-size:13px;color:#6b7078")}>
              <button className="hv8">Imprint</button>
              <button className="hv8">Privacy policy</button>
            </div>
            <span style={sx("font-size:12.5px;color:#8b9099")}>Copyright 2026 Code for Africa</span>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <>
<footer style={sx("background:#FFFFFF;padding:48px 0 36px")}>
  <div style={sx("max-width:1280px;margin:0 auto;padding:0 var(--gut)")}>
    <div style={sx("display:flex;justify-content:space-between;flex-wrap:var(--wrap);gap:clamp(24px,3vw,40px);align-items:flex-start;padding-bottom:34px")}>
      <div style={sx("min-width:0;flex:1")}>
        <div style={sx("display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:16px")}>
          <img src="/assets/logo.png" alt="PromiseTracker" style={sx("height:24px;max-width:100%;display:block")} />
          <span style={sx("font-size:12px;color:#6b7078")}>An initiative of:</span>
          <img src="/assets/code-for-africa.svg" alt="Code for Africa" style={sx("height:26px;max-width:100%;display:block")} />
        </div>
        <p style={sx("margin:0;max-width:620px;font-size:13px;line-height:1.6;color:#6b7078")}>{BLURB}</p>
      </div>
      {badge(96)}
    </div>
    <nav style={sx("display:flex;flex-wrap:wrap;gap:10px 28px;padding:26px 0;border-top:1px solid #ededf0")}>
      {links.map((l) => (
        <button key={l.label} className="hv8" onClick={l.go} style={sx("font-size:14px;font-weight:500;color:#5c5c5c")}>{l.label}</button>
      ))}
    </nav>
    <div style={sx("display:flex;justify-content:space-between;align-items:center;gap:20px;padding-top:24px;border-top:1px solid #ededf0;flex-wrap:wrap")}>
      <div style={sx("display:flex;align-items:center;gap:14px")}>
        <span style={sx("font-size:13px;color:#6b7078")}>Follow PromiseTracker on:</span>
        {SOCIALS.map((s) => (
          <button key={s.label} className="hv8" aria-label={s.label} style={sx("color:#3f3f3f;display:inline-flex")}><Social s={s} size={17} /></button>
        ))}
      </div>
      <div style={sx("display:flex;gap:24px;font-size:13px;color:#6b7078")}>
        <span>Copyright 2026 Code for Africa</span>
        <button className="hv8">Imprint</button>
        <button className="hv8">Privacy policy</button>
      </div>
    </div>
  </div>
</footer>
    </>
  );
}
