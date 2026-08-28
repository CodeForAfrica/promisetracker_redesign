import React from 'react';
import { sx } from '../lib/sx';
import { useVals } from '../lib/vals';

export default function Methodology() {
  const { L_partners, M_defs, M_steps, goPromNav } = useVals();

  return (
    <>
<div style={sx("max-width:1280px;margin:0 auto;padding:0 var(--gut);animation:ptFade 0.35s ease both")}>
  <div style={sx("margin-left:calc(50% - 50vw);width:100vw;background:linear-gradient(150deg,rgba(0,0,0,0.9) 0%,rgba(14,14,16,0.84) 55%,rgba(14,14,16,0.66) 100%),url('https://images.unsplash.com/photo-1708347456819-00ff1a70cdce?w=2400') center 50%/cover no-repeat;background-color:#0e0e10")}>
   <div style={sx("max-width:1280px;margin:0 auto;padding:clamp(44px,7vw,84px) var(--gut) clamp(38px,5.2vw,64px)")}>
    <div style={sx("width:104px;height:3px;background:rgba(255,255,255,0.92);margin-bottom:26px")}></div>
    <h1 style={sx("margin:0;font-size:clamp(31px,7vw,56px);font-weight:800;letter-spacing:-0.03em;line-height:1.04;max-width:820px;color:#FFFFFF")}>How we rate promises.</h1>
    <p style={sx("margin:20px 0 0;font-size:20px;line-height:1.6;color:rgba(255,255,255,0.92);max-width:680px")}>Every rating on PromiseTracker is an editorial judgement anchored to public, dated evidence, never a poll, never an opinion. This is the process behind every badge you see on the site.</p>
   </div>
  </div>
  <div style={sx("display:grid;grid-template-columns:var(--c4);gap:40px;margin-top:40px")}>
    {(M_steps || []).map((s, $index) => (<React.Fragment key={$index}>
      <div style={sx("padding:0")}>
        <p style={sx("margin:0;font-size:12px;font-weight:800;color:#8b9099;font-feature-settings:'tnum' 1")}>{s.n}</p>
        <p style={sx("margin:10px 0 0;font-size:17px;font-weight:800")}>{s.t}</p>
        <p style={sx("margin:9px 0 0;font-size:13px;line-height:1.6;color:#6b7078")}>{s.d}</p>
      </div>
    </React.Fragment>))}
  </div>
  <section style={sx("background:#f6f7f9;box-shadow:0 0 0 100vmax #f6f7f9;clip-path:inset(0 -100vmax);margin:60px 0 0;padding:60px 0 64px")}>
    <div style={sx("display:flex;align-items:center;gap:14px")}><span style={sx("width:5px;height:28px;background:#121212;border-radius:1px")}></span><h2 style={sx("margin:0;font-size:28px;font-weight:800;letter-spacing:-0.02em;color:#121212")}>The six statuses</h2></div>
    <p style={sx("margin:12px 0 0;font-size:14px;color:#6b7078;max-width:560px;line-height:1.6")}>Every promise starts as Inconclusive and moves only when evidence is published. The same colors follow each status across the whole site.</p>
    <div style={sx("display:grid;grid-template-columns:var(--c3);gap:36px 40px;margin-top:28px")}>
      {(M_defs || []).map((d, $index) => (<React.Fragment key={$index}>
        <div style={sx("padding:2px 0")}>
          <div style={sx("display:flex;justify-content:space-between;align-items:center;gap:10px")}>
            <span style={sx(`display:inline-flex;align-items:center;gap:11px;font-size:12.5px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:${d.color}`)}><span style={sx(`width:2px;height:15px;background:${d.color};display:inline-block;border-radius:1px`)}></span>{d.label}</span>
            {(d.tag) ? (<>
              <span style={sx("font-size:11px;font-weight:600;color:#8b9099;border:1px solid #e4e5e8;border-radius:999px;padding:3px 9px;flex:none")}>{d.tag}</span>
            </>) : null}
          </div>
          <p style={sx("margin:14px 0 0 13px;font-size:14px;line-height:1.65;color:#3b3f45")}>{d.def}</p>
        </div>
      </React.Fragment>))}
    </div>
  </section>
  <section style={sx("margin:56px 0 0;background:#f6f7f9;border:1px solid #e4e5e8;border-radius:12px;padding:clamp(26px,3.6vw,38px) var(--gut);display:flex;justify-content:space-between;align-items:center;gap:28px;flex-wrap:wrap")}>
    <div>
      <p style={sx("margin:0 0 10px;font-size:12px;font-weight:500;color:#8b9099")}>See it applied</p>
      <h3 style={sx("margin:0;font-size:26px;font-weight:800;letter-spacing:-0.02em;color:#121212")}>Browse the promises this system rates.</h3>
    </div>
    <button className="hv0" onClick={goPromNav} style={sx("display:inline-flex;align-items:center;gap:8px;background:#000000;color:#FFFFFF;border-radius:999px;padding:14px 24px;font-size:15px;font-weight:600;flex:none")}>Go to promises →</button>
  </section>
  <section style={sx("margin:0;padding:44px 0 72px")}>
    <p style={sx("margin:0 0 18px;font-size:11px;font-weight:600;letter-spacing:0.01em;text-transform:none;color:#8b9099")}>Verification partners</p>
    <div style={sx("display:flex;flex-wrap:wrap;align-items:center;gap:2px")}>
      {(L_partners || []).map((p, $index) => (<React.Fragment key={$index}>
        <span className="hv5" role="img" aria-label={p.n} style={sx(`width:132px;height:56px;background-image:${p.img};background-size:contain;background-position:left center;background-repeat:no-repeat;opacity:0.72;filter:grayscale(1);transition:opacity .15s ease`)}></span>
      </React.Fragment>))}
    </div>
  </section>
</div>
    </>
  );
}
