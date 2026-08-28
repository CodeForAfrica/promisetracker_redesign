import React from 'react';
import { sx } from '../lib/sx';
import { useVals } from '../lib/vals';
import { useIsMobile } from '../lib/useMediaQuery';

export default function Officials() {
  const { P_dist, P_feat, P_rows, P_sub, P_tabs, goHome } = useVals();
  const isMobile = useIsMobile();
  const [filterOpen, setFilterOpen] = React.useState(false);
  const active = (P_tabs || []).find(t => t.on) || (P_tabs || [])[0] || { label: '', count: 0 };

  React.useEffect(() => { if (!isMobile) setFilterOpen(false); }, [isMobile]);

  return (
    <>
<div style={sx("max-width:1280px;margin:0 auto;padding:0 var(--gut);animation:ptFade 0.35s ease both")}>
  <div style={sx("margin-left:calc(50% - 50vw);width:100vw;background:linear-gradient(150deg,rgba(0,0,0,0.86),rgba(14,14,16,0.92)),url('https://images.unsplash.com/photo-1604212562306-c06a83935719?w=2400') center 52%/cover no-repeat")}>
   <div style={sx("max-width:1280px;margin:0 auto;padding:clamp(32px,4.6vw,52px) var(--gut) clamp(30px,4.4vw,48px)")}>
    <button className="hv6" onClick={goHome} style={sx("font-size:13px;font-weight:600;color:rgba(255,255,255,0.8)")}>← Countries</button>
    <div style={sx("display:grid;grid-template-columns:var(--split);gap:56px;align-items:end;margin-top:22px")}>
     <div>
      <div style={sx("width:104px;height:3px;background:rgba(255,255,255,0.92);margin-bottom:20px")}></div>
      <div style={sx("display:flex;align-items:center;gap:16px")}>
       <span role="img" aria-label="Kenya flag" style={sx("width:52px;height:52px;flex:none;border-radius:50%;background-image:url('https://flagcdn.com/w160/ke.png');background-size:cover;background-position:center;box-shadow:0 0 0 2px rgba(255,255,255,0.28)")}></span>
       <h1 style={sx("margin:0;font-size:clamp(27px,5.6vw,46px);font-weight:800;letter-spacing:-0.03em;line-height:1.02;color:#FFFFFF")}>Tracked in Kenya</h1>
      </div>
      <p style={sx("margin:14px 0 0;font-size:15px;color:rgba(255,255,255,0.82);font-feature-settings:'tnum' 1")}>{P_sub}</p>
      <div style={sx("display:flex;height:10px;margin-top:30px;border-radius:2px;overflow:hidden")}>
       {(P_dist || []).map((d, $index) => (<React.Fragment key={$index}>
        <span onMouseEnter={d.tipEnter} onMouseLeave={d.tipLeave} style={sx(`width:${d.w};background:${d.color};cursor:pointer`)}></span>
       </React.Fragment>))}
      </div>
      <div style={sx("display:flex;flex-wrap:wrap;gap:10px 24px;margin-top:16px")}>
       {(P_dist || []).map((d, $index) => (<React.Fragment key={$index}>
        <span onMouseEnter={d.tipEnter} onMouseLeave={d.tipLeave} style={sx("display:inline-flex;align-items:center;gap:7px;font-size:12.5px;color:rgba(255,255,255,0.85);cursor:pointer")}>
         <span style={sx(`width:8px;height:8px;border-radius:50%;background:${d.color};flex:none`)}></span>
         {d.label} <span style={sx("font-weight:700;color:#FFFFFF;font-feature-settings:'tnum' 1")}>{d.n}</span>
        </span>
       </React.Fragment>))}
      </div>
     </div>
     <button className="hv7" onClick={P_feat.go} style={sx("text-align:left;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:16px;padding:20px;transition:background .18s ease")}>
      <span style={sx("display:block;font-size:11px;font-weight:700;letter-spacing:0.09em;text-transform:uppercase;color:rgba(255,255,255,0.7)")}>{P_feat.kicker}</span>
      <span style={sx("display:flex;align-items:center;gap:14px;margin-top:16px")}>
       <span role="img" aria-label={P_feat.name} style={sx(`width:62px;height:62px;flex:none;border-radius:50%;background-image:${P_feat.photoCss};background-size:cover;background-position:center top;background-color:#1a1a1c;box-shadow:0 0 0 2px rgba(255,255,255,0.3)`)}></span>
       <span style={sx("display:flex;flex-direction:column;gap:3px;min-width:0")}>
        <span style={sx("font-size:19px;font-weight:800;letter-spacing:-0.02em;color:#FFFFFF")}>{P_feat.name}</span>
        <span style={sx("font-size:12.5px;color:rgba(255,255,255,0.75)")}>{P_feat.role}</span>
       </span>
      </span>
      <span style={sx("display:flex;height:6px;margin-top:18px")}>
       {(P_feat.segs || []).map((s, $index) => (<React.Fragment key={$index}>
        <span style={sx(`width:${s.w};height:100%;background:${s.color};margin-right:1px`)}></span>
       </React.Fragment>))}
      </span>
      <span style={sx("display:flex;justify-content:space-between;align-items:baseline;gap:12px;margin-top:14px;font-size:12.5px;color:rgba(255,255,255,0.75);font-feature-settings:'tnum' 1")}>
       <span>{P_feat.count} promises tracked</span>
       <span style={sx("font-size:15px;font-weight:800;color:#FFFFFF")}>{P_feat.kept} kept</span>
      </span>
     </button>
    </div>
   </div>
  </div>
  {(!isMobile) ? (<>
  <div style={sx("display:flex;gap:28px;border-bottom:1px solid #e4e5e8;margin-top:36px")}>
    {(P_tabs || []).map((t, $index) => (<React.Fragment key={$index}>
      <button className="hv8" onClick={t.go} style={sx(`padding:13px 2px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${t.c};border-bottom:2px solid ${t.ul};margin-bottom:-1px;white-space:nowrap;flex:none`)}>{t.label} <span style={sx("font-weight:500;color:#8b9099;font-feature-settings:'tnum' 1")}>{t.count}</span></button>
    </React.Fragment>))}
  </div>
  </>) : (<>
  <div style={sx("position:relative;z-index:20;margin-top:26px;padding-bottom:14px;border-bottom:1px solid #e4e5e8")}>
    <button className="hv19" onClick={() => setFilterOpen(v => !v)} aria-expanded={filterOpen} style={sx("display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;border:1px solid #e4e5e8;border-radius:10px;padding:12px 14px;background:#FFFFFF;transition:border-color 0.15s ease")}>
      <span style={sx("display:flex;align-items:baseline;gap:8px;min-width:0")}>
        <span style={sx("font-size:10px;font-weight:700;letter-spacing:0.09em;text-transform:uppercase;color:#8b9099;flex:none")}>Filter</span>
        <span style={sx("font-size:14px;font-weight:700;letter-spacing:-0.01em;color:#121212;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>{active.label}</span>
        <span style={sx("font-size:12px;color:#8b9099;font-feature-settings:'tnum' 1;flex:none")}>{active.count}</span>
      </span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7078" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={sx(`flex:none;transform:rotate(${filterOpen ? '180deg' : '0deg'})`)}><path d="M6 9l6 6 6-6"></path></svg>
    </button>
    {(filterOpen) ? (<>
      <div style={sx("position:absolute;left:0;right:0;top:56px;background:#FFFFFF;border:1px solid #e4e5e8;border-radius:10px;overflow:hidden;box-shadow:0 18px 36px -12px rgba(9,9,10,0.24);animation:ptFade 0.16s ease both")}>
        {(P_tabs || []).map((t, $index) => (<React.Fragment key={$index}>
          <button className="hv3" onClick={() => { setFilterOpen(false); t.go(); }} style={sx(`display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;padding:12px 14px;font-size:14px;font-weight:${t.on ? 700 : 500};color:${t.c};border-top:${$index === 0 ? 'none' : '1px solid #f0f1f3'}`)}>
            {t.label}
            <span style={sx("font-size:12px;color:#8b9099;font-feature-settings:'tnum' 1")}>{t.count}</span>
          </button>
        </React.Fragment>))}
      </div>
    </>) : null}
  </div>
  </>)}
  <div style={sx("padding-bottom:56px")}>
    {(P_rows || []).map((r, $index) => (<React.Fragment key={$index}>
      <button className="hv3" onClick={r.go} style={sx(`display:flex;align-items:${isMobile ? 'flex-start' : 'center'};gap:var(--polgap);width:100%;padding:var(--polpad);border-bottom:1px solid #e4e5e8`)}>
        <span style={sx("width:var(--polav);flex:none;display:flex;flex-direction:column")}>
          {(r.photo) ? (<><span role="img" aria-label={r.name} style={sx(`width:var(--polav);height:var(--polav);border-radius:50%;background-image:${r.photoCss};background-size:cover;background-position:center top;background-color:#121212;display:block;flex:none`)}></span></>) : null}
          {(r.noPhoto) ? (<><span style={sx("width:var(--polav);height:var(--polav);border-radius:50%;background:#121212;color:#FFFFFF;display:grid;place-items:center;font-size:19px;font-weight:800;letter-spacing:-0.01em")}>{r.init}</span></>) : null}
          <span style={sx("display:flex;height:6px;margin-top:2px")}>
            {(r.segs || []).map((s, $index) => (<React.Fragment key={$index}>
              <span style={sx(`width:${s.w};height:100%;background:${s.color};margin-right:1px`)}></span>
            </React.Fragment>))}
          </span>
        </span>
        <span style={sx("flex:1;display:flex;flex-direction:column;gap:5px;min-width:0")}>
          <span style={sx("font-size:var(--polname);font-weight:700;letter-spacing:-0.02em;text-wrap:pretty")}>{r.name}</span>
          <span style={sx("font-size:13px;color:#6b7078;text-wrap:pretty")}>{r.meta}</span>
          {/* Below the tab breakpoint the three trailing columns leave the name a
              single word wide, so the tallies move onto their own line instead. */}
          {(isMobile) ? (<>
            <span style={sx("display:flex;align-items:baseline;gap:8px;margin-top:5px;font-feature-settings:'tnum' 1")}>
              <span style={sx("font-size:13px;font-weight:800;color:#121212")}>{r.count}</span>
              <span style={sx("font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#8b9099")}>promises</span>
              <span style={sx("display:block;flex:none;width:1px;height:10px;background:#d5d7dc")}></span>
              <span style={sx(`font-size:13px;font-weight:700;color:${r.keptC}`)}>{r.kept} kept</span>
            </span>
          </>) : null}
        </span>
        {(!isMobile) ? (<>
          <span style={sx("display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex:none")}>
            <span style={sx("font-size:22px;font-weight:800;font-feature-settings:'tnum' 1;letter-spacing:-0.02em")}>{r.count}</span>
            <span style={sx("font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#8b9099")}>promises</span>
          </span>
          <span style={sx(`width:86px;flex:none;text-align:right;font-size:14px;font-weight:700;color:${r.keptC};font-feature-settings:'tnum' 1`)}>{r.kept} kept</span>
        </>) : null}
      </button>
    </React.Fragment>))}
  </div>
</div>
    </>
  );
}
