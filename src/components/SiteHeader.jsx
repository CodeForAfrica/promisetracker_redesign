import React from 'react';
import { sx } from '../lib/sx';
import { useVals } from '../lib/vals';

export default function SiteHeader() {
  const { SR_close, SR_emptyMsg, SR_hasHits, SR_hits, SR_isOpen, SR_key, SR_noHits, SR_open, SR_q, SR_ref, SR_summary, SR_type, crumbCountry, goAbout, goCountry, goHome, goMeth, goPromNav, navMb, navMc, navPb, navPc, navUb, navUc } = useVals();

  return (
    <>
<header style={sx("position:sticky;top:0;z-index:60;background:#FFFFFF;border-bottom:1px solid #ededf0")}>
  <div style={sx("max-width:1280px;margin:0 auto;padding:var(--hpad) var(--gut);min-height:64px;height:var(--hh);display:flex;align-items:center;flex-wrap:var(--hwrap);gap:clamp(14px,2vw,28px)")}>
    <div style={sx("display:flex;align-items:center;gap:14px;flex:1")}>
      <button onClick={goHome} style={sx("display:flex;align-items:center")}><img src="/assets/logo.png" alt="PromiseTracker" style={sx("height:19px;display:block")} /></button>
      {(crumbCountry) ? (<>
        <span style={sx("color:#D0D0D0;font-size:14px")}>/</span>
        <button className="hv24" onClick={goCountry} style={sx("font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#121212")}>{crumbCountry}</button>
      </>) : null}
    </div>
    <nav style={sx("display:flex;align-items:center;gap:clamp(15px,2.4vw,26px);height:var(--navh);width:var(--navw);order:var(--navord);overflow-x:auto")}>
      <button className="hv8" onClick={goPromNav} style={sx(`flex:none;height:var(--navh);padding-top:2px;font-size:15px;font-weight:500;color:${navPc};border-bottom:2px solid ${navPb}`)}>Promises</button>
      
      <button className="hv8" onClick={goMeth} style={sx(`flex:none;height:var(--navh);padding-top:2px;font-size:15px;font-weight:500;color:${navMc};border-bottom:2px solid ${navMb}`)}>Methodology</button>
      <button className="hv8" onClick={goAbout} style={sx(`flex:none;height:var(--navh);padding-top:2px;font-size:15px;font-weight:500;color:${navUc};border-bottom:2px solid ${navUb}`)}>About Us</button>
    </nav>
    <button className="hv16" onClick={SR_open} aria-label="Search promises" style={sx("display:flex;align-items:center;gap:9px;border:1px solid #e4e5e8;border-radius:999px;padding:7px 14px 7px 12px;color:#6b7078;transition:border-color 0.15s ease,color 0.15s ease")}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="7"></circle><line x1="15.8" y1="15.8" x2="21" y2="21"></line></svg>
      <span style={sx("font-size:13px;font-weight:500")}>Search</span>
    </button>
    <details style={sx("position:relative")}>
      <summary className="hv8" style={sx("cursor:pointer;font-size:12px;font-weight:600;letter-spacing:0.08em;color:#6b7078;padding:6px 0;display:flex;align-items:center;gap:5px")}>EN <span style={sx("font-size:9px")}>▾</span></summary>
      <div style={sx("position:absolute;right:0;top:34px;background:#FFFFFF;border:1px solid #e4e5e8;border-radius:10px;min-width:170px;z-index:80;box-shadow:0 18px 36px -10px rgba(0,0,0,0.2);overflow:hidden")}>
        <button className="hv3" style={sx("display:block;width:100%;padding:10px 14px;font-size:13px;font-weight:600")}>English</button>
        <button className="hv3" style={sx("display:block;width:100%;padding:10px 14px;font-size:13px;color:#6b7078")}>Amharic · አማርኛ</button>
        <button className="hv3" style={sx("display:block;width:100%;padding:10px 14px;font-size:13px;color:#6b7078")}>Français</button>
        <button className="hv3" style={sx("display:block;width:100%;padding:10px 14px;font-size:13px;color:#6b7078")}>العربية</button>
      </div>
    </details>
  </div>
  {(SR_isOpen) ? (<>
    <div onClick={SR_close} style={sx("position:fixed;left:0;right:0;top:64px;bottom:0;background:rgba(9,9,10,0.32)")}></div>
    <div style={sx("position:absolute;left:0;right:0;top:64px;background:#FFFFFF;border-bottom:1px solid #e4e5e8;box-shadow:0 24px 48px -18px rgba(9,9,10,0.28);animation:ptFade 0.18s ease both")}>
      <div style={sx("max-width:1280px;margin:0 auto;padding:22px var(--gut) 26px")}>
        <div style={sx("display:flex;align-items:center;gap:14px;border-bottom:1px solid #e4e5e8;padding-bottom:14px")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b9099" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="7"></circle><line x1="15.8" y1="15.8" x2="21" y2="21"></line></svg>
          <input value={SR_q} onChange={SR_type} onKeyDown={SR_key} ref={SR_ref} placeholder="Search promises, officials or sectors" style={sx("flex:1;border:none;background:none;font-size:22px;font-weight:600;letter-spacing:-0.02em;color:#121212;padding:0")} />
          <button className="hv31" onClick={SR_close} style={sx("font-size:11px;font-weight:700;letter-spacing:0.09em;text-transform:uppercase;color:#8b9099;border:1px solid #e4e5e8;border-radius:8px;padding:6px 10px")}>Esc</button>
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
    </>
  );
}
