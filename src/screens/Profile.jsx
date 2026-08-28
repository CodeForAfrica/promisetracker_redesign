import React from 'react';
import { sx } from '../lib/sx';
import { useVals } from '../lib/vals';
import { useIsMobile } from '../lib/useMediaQuery';

export default function Profile() {
  const { F_dataChev, F_dataLabel, F_dataToggle, F_follow, F_followBd, F_followBg, F_followC, F_followL, F_goAll, F_groups, F_headline, F_hideData, F_init, F_keyColor, F_keyGo, F_keyImgCss, F_keyStatus, F_keyTerm, F_keyTitle, F_keyWhy, F_latest, F_legend, F_metaBot, F_metaTop, F_name, F_noPhoto, F_photo, F_photoCss, F_seeAll, F_segs, F_share, F_shareL, F_showData, goCountry } = useVals();
  const isMobile = useIsMobile();

  return (
    <>
<div style={sx("animation:ptFade 0.35s ease both")}>
  <div style={sx("max-width:1280px;margin:0 auto;padding:0 var(--gut)")}>
    <div style={sx("padding:44px 0 0")}>
      <button className="hv8" onClick={goCountry} style={sx("font-size:12px;font-weight:600;letter-spacing:0.06em;color:#8b9099;text-transform:uppercase")}>← All politicians</button>
    </div>
    <div style={sx("display:flex;align-items:flex-end;gap:34px;padding:30px 0 38px;flex-wrap:wrap")}>
      <span style={sx("width:124px;flex:none;display:flex;flex-direction:column")}>
        {(F_photo) ? (<><span role="img" aria-label={F_name} style={sx(`width:124px;height:124px;border-radius:50%;background-image:${F_photoCss};background-size:cover;background-position:center top;background-color:#121212;display:block;flex:none`)}></span></>) : null}
        {(F_noPhoto) ? (<><span style={sx("width:124px;height:124px;border-radius:50%;background:#121212;color:#FFFFFF;display:grid;place-items:center;font-size:clamp(24px,4.6vw,38px);font-weight:800")}>{F_init}</span></>) : null}
        <span style={sx("display:flex;height:8px;margin-top:2px")}>
          {(F_segs || []).map((s, $index) => (<React.Fragment key={$index}>
            <span style={sx(`width:${s.w};height:100%;background:${s.color};margin-right:1px`)}></span>
          </React.Fragment>))}
        </span>
      </span>
      <div style={sx("flex:1;min-width:var(--min320);max-width:100%")}>
        <p style={sx("margin:0 0 10px;font-size:11.5px;font-weight:500;letter-spacing:0.01em;text-transform:none;color:#8b9099")}>{F_metaTop}</p>
        <h1 style={sx("margin:0;font-size:clamp(28px,6vw,48px);font-weight:800;letter-spacing:-0.03em;line-height:1.0")}>{F_name}</h1>
        <p style={sx("margin:14px 0 0;font-size:13.5px;color:#6b7078;font-feature-settings:'tnum' 1")}>{F_metaBot}</p>
      </div>
    </div>

    
    <section style={sx("border-top:1px solid #e4e5e8;padding:34px 0 0")}>
      <div style={sx("display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:10px")}>
        <h2 style={sx("margin:0;font-size:28px;font-weight:800;letter-spacing:-0.02em;color:#121212")}>{F_headline}</h2>
        <button className="hv4" onClick={F_dataToggle} style={sx("display:inline-flex;align-items:center;gap:7px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#000000")}>
          {F_dataLabel}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={sx(`transform:${F_dataChev}`)}><path d="M6 9l6 6 6-6"></path></svg>
        </button>
      </div>
      <div style={sx("display:flex;height:var(--chh);margin-top:26px")}>
        {(F_segs || []).map((s, $index) => (<React.Fragment key={$index}>
          <button className="hv9" onClick={s.go} onMouseEnter={s.tipEnter} onMouseLeave={s.tipLeave} style={sx(`width:${s.w};height:100%;background:${s.color};margin-right:2px;position:relative`)}></button>
        </React.Fragment>))}
      </div>
      {(F_hideData && !isMobile) ? (<>
      <div style={sx("display:flex;margin-top:0")}>
        {(F_groups || []).map((g, $index) => (<React.Fragment key={$index}>
          <span style={sx(`width:${g.w};border-top:2px solid ${g.color};border-left:1px solid #e4e5e8;padding:10px 0 0 10px;margin-right:2px`)}>
            <span style={sx(`display:block;font-size:11px;font-weight:800;letter-spacing:0.09em;text-transform:uppercase;color:${g.color}`)}>{g.label}</span>
            <span style={sx("display:block;font-size:12.5px;color:#8b9099;margin-top:2px;font-feature-settings:'tnum' 1")}>{g.pct}</span>
          </span>
        </React.Fragment>))}
      </div>
      </>) : null}
      {(F_hideData && isMobile) ? (<>
      {/* The proportional captions collide once a band is only a few pixels wide,
          so on phones the same numbers are listed under the bar instead. */}
      <div style={sx("display:flex;flex-direction:column;margin-top:14px")}>
        {(F_groups || []).map((g, $index) => (<React.Fragment key={$index}>
          <span style={sx("display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid #ededf0")}>
            <span style={sx(`display:block;flex:none;width:10px;height:10px;background:${g.color}`)}></span>
            <span style={sx(`flex:1;min-width:0;font-size:11px;font-weight:800;letter-spacing:0.09em;text-transform:uppercase;color:${g.color}`)}>{g.label}</span>
            <span style={sx("flex:none;font-size:13px;font-weight:700;color:#121212;font-feature-settings:'tnum' 1")}>{g.pct}</span>
          </span>
        </React.Fragment>))}
      </div>
      </>) : null}
      {(F_showData) ? (<>
      <div style={sx("display:grid;grid-template-columns:var(--c3);gap:0 44px;margin-top:26px;border-top:1px solid #e4e5e8")}>
        {(F_legend || []).map((l, $index) => (<React.Fragment key={$index}>
          <button className="hv3" onClick={l.go} onMouseEnter={l.tipEnter} onMouseLeave={l.tipLeave} style={sx("display:flex;align-items:center;gap:11px;padding:13px 4px;border-bottom:1px solid #e4e5e8")}>
            <span style={sx(`width:11px;height:11px;background:${l.color};flex:none`)}></span>
            <span style={sx("flex:1;font-size:13.5px;font-weight:600")}>{l.label}</span>
            <span style={sx("font-size:14px;font-weight:800;font-feature-settings:'tnum' 1")}>{l.count}</span>
            <span style={sx("width:44px;text-align:right;font-size:12px;color:#8b9099;font-feature-settings:'tnum' 1")}>{l.pct}</span>
          </button>
        </React.Fragment>))}
      </div>
      </>) : null}
      <div style={sx("display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;padding:26px 0 0")}>
        <p style={sx("margin:0;font-size:13px;color:#6b7078;max-width:420px")}>Get an email the moment any of these ratings changes.</p>
        <div style={sx("display:flex;gap:10px;flex:none")}>
          <button className="hv10" onClick={F_follow} style={sx(`display:inline-flex;align-items:center;gap:9px;border-radius:999px;padding:12px 20px;font-size:14px;font-weight:600;background:${F_followBg};color:${F_followC};border:1px solid ${F_followBd};transition:background .15s ease`)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.7 21a2 2 0 0 1-3.4 0"></path></svg>
            {F_followL}
          </button>
          <button className="hv11" onClick={F_share} style={sx("display:inline-flex;align-items:center;gap:9px;border-radius:999px;padding:12px 20px;font-size:14px;font-weight:600;color:#000000;border:1px solid #e4e5e8;transition:border-color .15s ease")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"></path></svg>
            {F_shareL}
          </button>
        </div>
      </div>
    </section>

    
  </div>

  <section style={sx("background:#f6f7f9;border-top:1px solid #e4e5e8;border-bottom:1px solid #e4e5e8;margin:48px 0 0")}>
    <div style={sx("max-width:1280px;margin:0 auto;padding:44px")}>
      <div style={sx("display:flex;justify-content:space-between;align-items:baseline;gap:24px;flex-wrap:wrap")}>
        <p style={sx("margin:0;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#8b9099")}>Key promise · editor's pick</p>
        <span style={sx("font-size:11px;font-weight:600;letter-spacing:0.1em;color:#8b9099;font-feature-settings:'tnum' 1;text-transform:uppercase")}>{F_keyTerm}</span>
      </div>
      <div style={sx("display:flex;gap:var(--gapmid);align-items:flex-start;margin-top:24px;flex-wrap:wrap")}>
        <div style={sx("flex:1;min-width:var(--min340);max-width:100%")}>
          <span style={sx(`display:inline-flex;align-items:center;font-size:10.5px;font-weight:800;letter-spacing:0.09em;text-transform:uppercase;color:${F_keyColor}`)}>{F_keyStatus}</span>
          <h3 style={sx("margin:12px 0 0;font-size:clamp(23px,4vw,34px);font-weight:800;letter-spacing:-0.03em;line-height:1.14;color:#121212;max-width:640px;text-wrap:pretty")}>{F_keyTitle}</h3>
          <p style={sx("margin:16px 0 0;font-size:15px;line-height:1.65;color:#6b7078;max-width:600px;text-wrap:pretty")}>{F_keyWhy}</p>
          <button className="hv12" onClick={F_keyGo} style={sx("display: inline-flex; align-items: center; gap: 8px; margin-top: 26px; border: 1px solid #121212; border-radius: 48px; padding: 11px 18px; font-size: 14px; font-weight: 600; color: #121212; background: none; transition: background 0.15s ease,color 0.15s ease")}>Read the evidence →</button>
        </div>
        <button className="hv13" onClick={F_keyGo} aria-label={F_keyTitle} style={sx(`flex:none;width:360px;max-width:100%;aspect-ratio:16/10;border-radius:12px;background-color:#eceef1;background-image:${F_keyImgCss};background-size:cover;background-position:center;transition:opacity 0.18s ease`)}></button>
      </div>
    </div>
  </section>

  <div style={sx("max-width:1280px;margin:0 auto;padding:0 var(--gut)")}>
    
    <section style={sx("padding:56px 0 8px")}>
      <div style={sx("display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:12px")}>
        <h2 style={sx("margin:0;font-size:28px;font-weight:800;letter-spacing:-0.02em;color:#121212")}>Latest promises</h2>
        <button className="hv4" onClick={F_goAll} style={sx("font-size:14px;font-weight:600;color:#000000")}>{F_seeAll}</button>
      </div>
      <div style={sx("display:grid;grid-template-columns:var(--c3);gap:16px;margin:26px 0 0;align-items:stretch")}>
        {(F_latest || []).map((p, $index) => (<React.Fragment key={$index}>
          <button className="hv14" onClick={p.go} style={sx(`--stc:${p.chipC};border:1px solid transparent;border-radius:14px;padding:11px;display:flex;gap:14px;align-items:flex-start;height:100%;background:#FFFFFF;text-align:left;transition:transform 0.18s ease,background 0.18s ease,border-color 0.18s ease`)}>
            <span role="img" aria-label={p.title} style={sx(`display:block;flex:none;width:78px;height:78px;border-radius:10px;background-color:#eceef1;background-image:${p.imgCss};background-size:cover;background-position:center`)}></span>
            <span style={sx("display:flex;flex-direction:column;flex:1;min-width:0")}>
              <span style={sx("font-size:15.5px;font-weight:700;line-height:1.32;letter-spacing:-0.02em;color:#121212;text-wrap:pretty")}>{p.title}</span>
              <span style={sx("display:flex;align-items:center;gap:8px;row-gap:5px;flex-wrap:wrap;margin-top:10px")}>
                <span onMouseEnter={p.tipEnter} onMouseLeave={p.tipLeave} style={sx(`display:inline-flex;align-items:center;font-size:9.5px;font-weight:800;letter-spacing:0.09em;text-transform:uppercase;white-space:nowrap;color:${p.chipC}`)}>{p.chipL}</span>
                <span style={sx(`display:inline-flex;align-items:center;background:${p.catBg};color:${p.catC};border-radius:999px;padding:2px 8px;font-size:9.5px;font-weight:800;letter-spacing:0.09em;text-transform:uppercase;white-space:nowrap`)}>{p.cat}</span>
              </span>
              <span style={sx("margin-top:11px;font-size:13px;line-height:1.6;color:#6b7078;text-wrap:pretty")}>{p.exShort}</span>
              <span style={sx("display:flex;gap:14px;margin-top:auto;padding-top:12px;font-size:11px;color:#8b9099;font-feature-settings:'tnum' 1")}>
                <span>{p.rev}</span>
                <span>{p.dl}</span>
              </span>
            </span>
          </button>
        </React.Fragment>))}
      </div>
    </section>

    
  </div>
</div>
    </>
  );
}
