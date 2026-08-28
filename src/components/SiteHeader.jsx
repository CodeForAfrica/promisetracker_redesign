import React from 'react';
import { sx } from '../lib/sx';
import { useVals } from '../lib/vals';
import { useIsMobile } from '../lib/useMediaQuery';

const LANGS = [
  { label: 'English', on: true },
  { label: 'Amharic · አማርኛ', on: false },
  { label: 'Français', on: false },
  { label: 'العربية', on: false }
];

export default function SiteHeader() {
  const { SR_close, SR_emptyMsg, SR_hasHits, SR_hits, SR_isOpen, SR_key, SR_noHits, SR_open, SR_q, SR_ref, SR_summary, SR_type, crumbCountry, goAbout, goCountry, goHome, goMeth, goPromNav, navMb, navMc, navPb, navPc, navUb, navUc } = useVals();
  const isMobile = useIsMobile();
  const [drawer, setDrawer] = React.useState(false);

  /* The drawer is a mobile-only shell: leaving it mounted on a resize to desktop
     would strand the scroll lock, so it closes with the breakpoint. */
  React.useEffect(() => { if (!isMobile) setDrawer(false); }, [isMobile]);
  React.useEffect(() => {
    if (!drawer) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [drawer]);

  const close = () => setDrawer(false);
  const nav = (go) => () => { close(); go(); };

  const links = [
    { label: 'Promises', go: goPromNav, c: navPc, b: navPb },
    { label: 'Methodology', go: goMeth, c: navMc, b: navMb },
    { label: 'About Us', go: goAbout, c: navUc, b: navUb }
  ];

  const langMenu = (
    <details style={sx("position:relative")}>
      <summary className="hv8" style={sx("cursor:pointer;font-size:12px;font-weight:600;letter-spacing:0.08em;color:#6b7078;padding:6px 0;display:flex;align-items:center;gap:5px")}>EN <span style={sx("font-size:9px")}>▾</span></summary>
      <div style={sx("position:absolute;right:0;top:34px;background:#FFFFFF;border:1px solid #e4e5e8;border-radius:10px;min-width:170px;z-index:80;box-shadow:0 18px 36px -10px rgba(0,0,0,0.2);overflow:hidden")}>
        {LANGS.map((l) => (
          <button key={l.label} className="hv3" style={sx(`display:block;width:100%;padding:10px 14px;font-size:13px;${l.on ? 'font-weight:600' : 'color:#6b7078'}`)}>{l.label}</button>
        ))}
      </div>
    </details>
  );

  return (
    <>
<header style={sx("position:sticky;top:0;z-index:60;background:#FFFFFF;border-bottom:1px solid #ededf0")}>
  <div style={sx("max-width:1280px;margin:0 auto;padding:var(--hpad) var(--gut);min-height:64px;height:var(--hh);display:flex;align-items:center;flex-wrap:var(--hwrap);gap:clamp(14px,2vw,28px)")}>
    <div style={sx("display:flex;align-items:center;gap:14px;flex:1;min-width:0")}>
      <button onClick={goHome} style={sx("display:flex;align-items:center;flex:none")}><img src="/assets/logo.png" alt="PromiseTracker" style={sx("height:19px;display:block")} /></button>
      {(crumbCountry) ? (<>
        <span style={sx("color:#D0D0D0;font-size:14px")}>/</span>
        <button className="hv24" onClick={goCountry} style={sx("font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#121212;white-space:nowrap")}>{crumbCountry}</button>
      </>) : null}
    </div>

    {(!isMobile) ? (<>
      <nav style={sx("display:flex;align-items:center;gap:clamp(15px,2.4vw,26px);height:var(--navh);width:var(--navw);order:var(--navord);overflow-x:auto")}>
        {links.map((l) => (
          <button key={l.label} className="hv8" onClick={l.go} style={sx(`flex:none;height:var(--navh);padding-top:2px;font-size:15px;font-weight:500;color:${l.c};border-bottom:2px solid ${l.b}`)}>{l.label}</button>
        ))}
      </nav>
      <button className="hv16" onClick={SR_open} aria-label="Search promises" style={sx("display:flex;align-items:center;gap:9px;border:1px solid #e4e5e8;border-radius:999px;padding:7px 14px 7px 12px;color:#6b7078;transition:border-color 0.15s ease,color 0.15s ease")}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="7"></circle><line x1="15.8" y1="15.8" x2="21" y2="21"></line></svg>
        <span style={sx("font-size:13px;font-weight:500")}>Search</span>
      </button>
      {langMenu}
    </>) : (<>
      {langMenu}
      <button onClick={() => setDrawer(true)} aria-label="Open menu" aria-expanded={drawer} style={sx("flex:none;display:grid;place-items:center;width:38px;height:38px;margin-right:-8px;color:#121212")}>
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="3.5" y1="7" x2="20.5" y2="7"></line><line x1="3.5" y1="12" x2="20.5" y2="12"></line><line x1="3.5" y1="17" x2="20.5" y2="17"></line></svg>
      </button>
    </>)}
  </div>
  {(SR_isOpen) ? (<>
    <div onClick={SR_close} style={sx("position:fixed;left:0;right:0;top:64px;bottom:0;background:rgba(9,9,10,0.32)")}></div>
    <div style={sx("position:absolute;left:0;right:0;top:64px;background:#FFFFFF;border-bottom:1px solid #e4e5e8;box-shadow:0 24px 48px -18px rgba(9,9,10,0.28);animation:ptFade 0.18s ease both")}>
      <div style={sx("max-width:1280px;margin:0 auto;padding:22px var(--gut) 26px")}>
        <div style={sx("display:flex;align-items:center;gap:14px;border-bottom:1px solid #e4e5e8;padding-bottom:14px")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b9099" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true" style={sx("flex:none")}><circle cx="10.5" cy="10.5" r="7"></circle><line x1="15.8" y1="15.8" x2="21" y2="21"></line></svg>
          <input value={SR_q} onChange={SR_type} onKeyDown={SR_key} ref={SR_ref} placeholder="Search promises, officials or sectors" style={sx("flex:1;min-width:0;border:none;background:none;font-size:var(--srfs);font-weight:600;letter-spacing:-0.02em;color:#121212;padding:0")} />
          <button className="hv31" onClick={SR_close} style={sx("flex:none;font-size:11px;font-weight:700;letter-spacing:0.09em;text-transform:uppercase;color:#8b9099;border:1px solid #e4e5e8;border-radius:8px;padding:6px 10px")}>Esc</button>
        </div>
        {(SR_hasHits) ? (<>
          <div style={sx("display:flex;flex-direction:column;margin-top:10px;max-height:56vh;overflow:auto")}>
            {(SR_hits || []).map((h, $index) => (<React.Fragment key={$index}>
              <button className="hv3" onClick={h.go} style={sx("display:flex;align-items:center;gap:14px;padding:11px 10px;border-radius:10px;text-align:left")}>
                <span role="img" aria-label={h.title} style={sx(`display:block;flex:none;width:48px;height:48px;border-radius:8px;background-color:#eceef1;background-image:${h.imgCss};background-size:cover;background-position:center`)}></span>
                <span style={sx("display:flex;flex-direction:column;gap:5px;min-width:0;flex:1")}>
                  <span style={sx("font-size:14.5px;font-weight:650;line-height:1.35;letter-spacing:-0.015em;color:#121212")}>{h.title}</span>
                  <span style={sx("display:flex;align-items:center;gap:8px;flex-wrap:wrap")}>
                    <span style={sx(`font-size:9.5px;font-weight:800;letter-spacing:0.09em;text-transform:uppercase;color:${h.chipC}`)}>{h.chipL}</span>
                    <span style={sx("display:block;width:1px;height:10px;background:#d5d7dc")}></span>
                    <span style={sx("font-size:11.5px;color:#8b9099")}>{h.who}</span>
                  </span>
                </span>
              </button>
            </React.Fragment>))}
          </div>
          <p style={sx("margin:12px 0 0;font-size:11.5px;color:#8b9099")}>{SR_summary}</p>
        </>) : null}
        {(SR_noHits) ? (<>
          <p style={sx("margin:20px 0 4px;font-size:14.5px;color:#6b7078")}>{SR_emptyMsg}</p>
        </>) : null}
      </div>
    </div>
  </>) : null}
</header>

{(drawer) ? (<>
  <div onClick={close} style={sx("position:fixed;inset:0;z-index:90;background:rgba(9,9,10,0.42);animation:ptFade 0.18s ease both")}></div>
  <div role="dialog" aria-label="Menu" style={sx("position:fixed;top:0;right:0;bottom:0;z-index:91;width:min(84vw,320px);background:#FFFFFF;display:flex;flex-direction:column;box-shadow:-24px 0 48px -24px rgba(9,9,10,0.4);animation:ptDrawerIn 0.22s ease both")}>
    <div style={sx("display:flex;align-items:center;justify-content:space-between;gap:12px;padding:0 var(--gut);min-height:64px;border-bottom:1px solid #ededf0")}>
      <span style={sx("font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#8b9099")}>Menu</span>
      <button className="hv8" onClick={close} aria-label="Close menu" style={sx("display:grid;place-items:center;width:38px;height:38px;margin-right:-8px;color:#6b7078")}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18"></line><line x1="18" y1="6" x2="6" y2="18"></line></svg>
      </button>
    </div>
    <div style={sx("flex:1;overflow-y:auto;padding:18px var(--gut) 28px")}>
      <button className="hv16" onClick={nav(SR_open)} style={sx("display:flex;align-items:center;gap:9px;width:100%;border:1px solid #e4e5e8;border-radius:999px;padding:11px 16px;color:#6b7078;transition:border-color 0.15s ease,color 0.15s ease")}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true" style={sx("flex:none")}><circle cx="10.5" cy="10.5" r="7"></circle><line x1="15.8" y1="15.8" x2="21" y2="21"></line></svg>
        <span style={sx("font-size:14px;font-weight:500")}>Search</span>
      </button>
      <nav style={sx("display:flex;flex-direction:column;margin-top:20px;border-top:1px solid #ededf0")}>
        {links.map((l) => (
          <button key={l.label} className="hv3" onClick={nav(l.go)} style={sx(`display:flex;align-items:center;justify-content:space-between;gap:12px;padding:15px 2px;font-size:17px;font-weight:600;letter-spacing:-0.015em;color:${l.c};border-bottom:1px solid #ededf0`)}>
            {l.label}
            {(l.b !== 'transparent') ? (<span style={sx("display:block;flex:none;width:6px;height:6px;border-radius:50%;background:#121212")}></span>) : null}
          </button>
        ))}
      </nav>
      {(crumbCountry) ? (<>
        <button className="hv3" onClick={nav(goCountry)} style={sx("display:flex;align-items:center;gap:10px;width:100%;margin-top:22px;padding:12px 2px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6b7078")}>
          <span role="img" aria-label={crumbCountry} style={sx("display:block;flex:none;width:20px;height:20px;border-radius:50%;background-image:url('https://flagcdn.com/w80/ke.png');background-size:cover;background-position:center")}></span>
          {crumbCountry}
        </button>
      </>) : null}
    </div>
  </div>
</>) : null}
    </>
  );
}
