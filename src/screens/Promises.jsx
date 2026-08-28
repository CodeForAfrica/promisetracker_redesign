import React from 'react';
import { sx } from '../lib/sx';
import { useVals } from '../lib/vals';

export default function Promises() {
  const { R_back, R_backGo, R_cards, R_cats, R_chips, R_clear, R_count, R_empty, R_hasChips, R_q, R_scope, R_setQ, R_sorts, R_status } = useVals();

  return (
    <>
<div style={sx("max-width:1280px;margin:0 auto;padding:0 var(--gut);animation:ptFade 0.35s ease both")}>
  <div style={sx("padding:44px 0 36px")}>
    <button className="hv8" onClick={R_backGo} style={sx("font-size:12px;font-weight:600;letter-spacing:0.06em;color:#8b9099;text-transform:uppercase")}>{R_back}</button>
    <h1 style={sx("margin:16px 0 0;font-size:clamp(28px,6vw,48px);font-weight:800;letter-spacing:-0.03em;line-height:1.02")}>Promises</h1>
    <p style={sx("margin:14px 0 0;font-size:14px;color:#6b7078")}>{R_scope}</p>
  </div>
  <div style={sx("display:flex;gap:var(--gapdb);align-items:flex-start;flex-wrap:var(--wrap);padding-bottom:64px")}>
    <aside style={sx("width:var(--rail);flex:none;position:var(--stick);top:88px")}>
      <input className="hv15" value={R_q} onChange={R_setQ} placeholder="Search promises…" style={sx("width:100%;border:1px solid #e4e5e8;border-radius:8px;padding:11px 14px;font-size:14px;background:#FFFFFF")} />
      <div style={sx("border-top:1px solid #e4e5e8;margin-top:22px;padding:16px 0 8px")}>
        <p style={sx("margin:0 0 8px;font-size:11px;font-weight:500;letter-spacing:0.01em;text-transform:none;color:#8b9099")}>Status</p>
        {(R_status || []).map((f, $index) => (<React.Fragment key={$index}>
          <button className="hv3" onClick={f.go} style={sx("display:flex;align-items:center;gap:10px;width:100%;padding:7px 0")}>
            <span style={sx(`width:14px;height:14px;border-radius:3px;border:1.5px solid ${f.boxBd};background:${f.boxBg};display:grid;place-items:center;font-size:9px;color:#FFFFFF;font-weight:800;flex:none`)}>{f.check}</span>
            <span style={sx(`flex:1;font-size:13.5px;font-weight:${f.wt}`)}>{f.label}</span>
            <span style={sx("font-size:12px;color:#8b9099;font-feature-settings:'tnum' 1")}>{f.count}</span>
          </button>
        </React.Fragment>))}
      </div>
      <div style={sx("border-top:1px solid #e4e5e8;padding:16px 0 8px")}>
        <p style={sx("margin:0 0 8px;font-size:11px;font-weight:500;letter-spacing:0.01em;text-transform:none;color:#8b9099")}>Category</p>
        {(R_cats || []).map((f, $index) => (<React.Fragment key={$index}>
          <button className="hv3" onClick={f.go} style={sx("display:flex;align-items:center;gap:10px;width:100%;padding:7px 0")}>
            <span style={sx(`width:14px;height:14px;border-radius:3px;border:1.5px solid ${f.boxBd};background:${f.boxBg};display:grid;place-items:center;font-size:9px;color:#FFFFFF;font-weight:800;flex:none`)}>{f.check}</span>
            <span style={sx(`flex:1;font-size:13.5px;font-weight:${f.wt};color:${f.labelC}`)}>{f.label}</span>
            <span style={sx("font-size:12px;color:#8b9099;font-feature-settings:'tnum' 1")}>{f.count}</span>
          </button>
        </React.Fragment>))}
      </div>
      <div style={sx("border-top:1px solid #e4e5e8;padding:16px 0 20px")}>
        <p style={sx("margin:0 0 8px;font-size:11px;font-weight:500;letter-spacing:0.01em;text-transform:none;color:#8b9099")}>Sort by</p>
        {(R_sorts || []).map((s, $index) => (<React.Fragment key={$index}>
          <button className="hv3" onClick={s.go} style={sx("display:flex;align-items:center;gap:10px;width:100%;padding:7px 0")}>
            <span style={sx(`width:14px;height:14px;border:${s.ring};border-radius:50%;flex:none`)}></span>
            <span style={sx(`font-size:13.5px;font-weight:${s.wt}`)}>{s.label}</span>
          </button>
        </React.Fragment>))}
      </div>
      {(R_hasChips) ? (<>
        <button className="hv4" onClick={R_clear} style={sx("font-size:13px;font-weight:600;color:#000000")}>Clear all filters</button>
      </>) : null}
    </aside>
    <div style={sx("flex:1;min-width:0")}>
      <div style={sx("display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding-bottom:16px;border-bottom:1px solid #e4e5e8")}>
        <span style={sx("font-size:14px;font-weight:700;font-feature-settings:'tnum' 1")}>{R_count}</span>
        {(R_chips || []).map((ch, $index) => (<React.Fragment key={$index}>
          <button className="hv16" onClick={ch.x} style={sx("display:inline-flex;align-items:center;gap:8px;background:#f6f7f9;border:1px solid #e4e5e8;border-radius:999px;padding:6px 12px;font-size:13px;font-weight:500;color:#3b3f45")}>{ch.label} <span style={sx("font-size:14px")}>×</span></button>
        </React.Fragment>))}
      </div>
      {(R_empty) ? (<>
        <div style={sx("border:1px dashed #d5d7dc;padding:72px 40px;margin-top:24px;text-align:center")}>
          <p style={sx("margin:0;font-size:22px;font-weight:800;letter-spacing:-0.02em")}>No promises match.</p>
          <p style={sx("margin:10px auto 0;font-size:14px;color:#6b7078;max-width:380px;line-height:1.6")}>Try removing a filter or broadening your search. Every tracked promise stays on the record.</p>
          <button className="hv0" onClick={R_clear} style={sx("margin-top:22px;background:#000000;color:#FFFFFF;border-radius:999px;padding:12px 20px;font-size:14px;font-weight:600")}>Clear all filters</button>
        </div>
      </>) : null}
      <div style={sx("display:grid;grid-template-columns:var(--c2);gap:16px;margin:24px 0 0;align-items:stretch")}>
        {(R_cards || []).map((p, $index) => (<React.Fragment key={$index}>
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
    </div>
  </div>
</div>
    </>
  );
}
