import React from 'react';
import { sx } from '../lib/sx';
import { useVals } from '../lib/vals';

export default function Landing() {
  const { L_countries, L_exAnat, L_exCat, L_exChipC, L_exChipL, L_exDots, L_exGo, L_exImgCss, L_exPolName, L_exPolPhotoCss, L_exPolRole, L_exTitle, L_legend, L_partners, goMeth, scrollToCountries } = useVals();

  return (
    <>
<div style={sx("animation:ptFade 0.35s ease both")}>
  <section style={sx("background:linear-gradient(rgba(9,9,10,0.62),rgba(9,9,10,0.62)),url('https://images.unsplash.com/photo-1604212561903-5ca7f041c58b?w=2400') center 62%/cover no-repeat;background-color:#0e0e10")}>
   <div style={sx("max-width:1280px;margin:0 auto;padding:0 var(--gut)")}>
    <div style={sx("min-height:var(--herominh);display:flex;gap:var(--herogap);align-items:var(--heroal);justify-content:space-between;padding:var(--heropad);flex-wrap:wrap")}>
    <div style={sx("flex:1;min-width:var(--heromin);max-width:100%;display:flex;flex-direction:column")}>
     <div style={sx("width:104px;height:3px;background:rgba(255,255,255,0.92);margin-bottom:var(--heroeyb)")}></div>
     <p style={sx("margin:0 0 12px;font-size:15px;line-height:1.5;color:rgba(255,255,255,0.85)")}>A Code for Africa project</p>
     <h1 style={sx("margin:0;font-size:clamp(31px,7vw,56px);line-height:1.02;font-weight:800;letter-spacing:-0.03em;color:#FFFFFF;max-width:680px")}>Promises are public&nbsp;record.</h1>
     <p style={sx("margin:16px 0 0;font-size:var(--herosub);line-height:1.5;color:rgba(255,255,255,0.92);max-width:560px;text-wrap:pretty")}>PromiseTracker follows what elected leaders pledged, and shows you the evidence of what they have actually delivered.</p>
     <div style={sx("display:flex;flex-wrap:wrap;gap:14px;margin-top:32px;align-items:center")}>
       <button className="hv0" onClick={scrollToCountries} style={sx("display:inline-flex;align-items:center;gap:8px;background:#000000;color:#FFFFFF;border-radius:999px;padding:13px 22px;font-size:15px;font-weight:600")}>See tracked promises →</button>
       <button className="hv1" onClick={goMeth} style={sx("display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.1);color:#FFFFFF;border:1px solid rgba(255,255,255,0.35);border-radius:999px;padding:13px 22px;font-size:15px;font-weight:600")}>Methodology</button>
     </div>
     <div style={sx("display:flex;flex-wrap:wrap;gap:10px 24px;margin-top:34px;align-items:center")}>
      {(L_legend || []).map((lg, $index) => (<React.Fragment key={$index}>
        <span onMouseEnter={lg.tipEnter} onMouseLeave={lg.tipLeave} style={sx("display:inline-flex;align-items:center;gap:7px;font-size:12px;font-weight:500;color:rgba(255,255,255,0.82);cursor:pointer")}><span style={sx(`width:9px;height:9px;background:${lg.color};display:inline-block;border-radius:2px`)}></span>{lg.label}</span>
      </React.Fragment>))}
     </div>
    </div>

    
    <div style={sx("flex:none;width:440px;max-width:100%")}>
      <div style={sx("display:flex;align-items:center;justify-content:space-between;gap:16px;margin:0 0 12px")}>
        <p style={sx("margin:0;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.72)")}>What a tracked promise looks like</p>
        <div style={sx("display:flex;align-items:center;gap:8px;flex:none")}>
          
          
        </div>
      </div>
      <div style={sx("background:#FFFFFF;border-radius:14px;padding:18px;box-shadow:0 28px 60px -22px rgba(0,0,0,0.6)")}>
        <div style={sx("display:flex;gap:14px;align-items:flex-start")}>
          <span role="img" aria-label={L_exTitle} style={sx(`display:block;flex:none;width:78px;height:78px;border-radius:10px;background-color:#eceef1;background-image:${L_exImgCss};background-size:cover;background-position:center`)}></span>
          <div style={sx("flex:1;min-width:0")}>
            <p style={sx("margin:0;font-size:15.5px;font-weight:700;line-height:1.32;letter-spacing:-0.02em;color:#121212;text-wrap:pretty")}>{L_exTitle}</p>
            <div style={sx("display:flex;align-items:center;gap:8px;row-gap:5px;flex-wrap:wrap;margin-top:10px")}>
              <span style={sx(`font-size:9.5px;font-weight:800;letter-spacing:0.09em;text-transform:uppercase;white-space:nowrap;color:${L_exChipC}`)}>{L_exChipL}</span>
              <span style={sx("display:block;flex:none;width:1px;height:10px;background:#d5d7dc")}></span>
              <span style={sx("font-size:9.5px;font-weight:700;letter-spacing:0.09em;text-transform:uppercase;white-space:nowrap;color:#8b9099")}>{L_exCat}</span>
            </div>
          </div>
        </div>
        <div style={sx("display:flex;flex-direction:column;gap:0;margin-top:16px;border-top:1px solid #ededf0")}>
          {(L_exAnat || []).map((a, $index) => (<React.Fragment key={$index}>
            <div style={sx("display:flex;align-items:baseline;gap:var(--anatgap);padding:11px 0;border-bottom:1px solid #ededf0")}>
              <span style={sx("flex:none;width:var(--anatw);font-size:9.5px;font-weight:700;letter-spacing:0.09em;text-transform:uppercase;color:#8b9099")}>{a.k}</span>
              <span style={sx("flex:1;font-size:13px;line-height:1.5;color:#26292e;text-wrap:pretty")}>{a.v}</span>
            </div>
          </React.Fragment>))}
        </div>
        <button className="hv2" onClick={L_exGo} style={sx("display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:var(--exwrap);width:100%;margin-top:14px;padding:11px 14px;border-radius:10px;background:#f6f7f9;text-align:left;transition:background 0.15s ease")}>
          <span style={sx("display:flex;align-items:center;gap:10px;min-width:0")}>
            <span role="img" aria-label={L_exPolName} style={sx(`display:block;flex:none;width:30px;height:30px;border-radius:50%;background-color:#e4e5e8;background-image:${L_exPolPhotoCss};background-size:cover;background-position:center top`)}></span>
            <span style={sx("display:flex;flex-direction:column;gap:1px;min-width:0;text-align:left")}>
              <span style={sx("font-size:12.5px;font-weight:600;color:#121212")}>{L_exPolName}</span>
              <span style={sx("font-size:11px;color:#6b7078")}>{L_exPolRole}</span>
            </span>
          </span>
          <span style={sx("flex:var(--exflex);font-size:12px;font-weight:600;color:#1a51c5;white-space:nowrap")}>See the evidence →</span>
        </button>
        <div style={sx("display:flex;align-items:center;gap:0;margin-top:12px")}>
          {(L_exDots || []).map((d, $index) => (<React.Fragment key={$index}>
            <button onClick={d.go} aria-label={d.label} style={sx("display:flex;align-items:center;justify-content:center;width:10px;height:18px;background:none")}>
              <span style={sx(`display:block;width:7px;height:7px;border-radius:50%;background:${d.bg};transition:background 0.2s ease`)}></span>
            </button>
          </React.Fragment>))}
        </div>
      </div>
    </div>
    </div>
   </div>
  </section>

  <section id="pt-select-country" style={sx("max-width:1280px;margin:0 auto;padding:clamp(34px,5vw,60px) var(--gut) clamp(28px,3.6vw,40px)")}>
    <div style={sx("display:flex;align-items:center;gap:14px")}><span style={sx("width:5px;height:28px;background:#121212;border-radius:1px")}></span><h2 style={sx("margin:0;font-size:28px;font-weight:800;letter-spacing:-0.02em;color:#121212")}>Select a country</h2></div>
    <div style={sx("height:1px;background:#e4e5e8;margin:18px 0 0")}></div>
    <div>
      {(L_countries || []).map((c, $index) => (<React.Fragment key={$index}>
        <button className="hv3" onClick={c.go} style={sx(`display:flex;align-items:center;flex-wrap:var(--wrap);gap:var(--cgap);width:100%;padding:var(--cpad);border-bottom:1px solid #e4e5e8;cursor:${c.cursor}`)}>
          <span role="img" aria-label={`${c.name} flag`} style={sx(`width:60px;height:60px;flex:none;border-radius:50%;background-image:${c.flag};background-size:cover;background-position:center;box-shadow:inset 0 0 0 1px rgba(0,0,0,0.12);opacity:${c.flagO}`)}></span>
          <span style={sx(`flex:1;font-size:clamp(27px,5.6vw,46px);font-weight:800;letter-spacing:-0.035em;line-height:1;color:${c.nameC}`)}>{c.name}</span>
          {(c.active) ? (<>
            <span style={sx("display:flex;flex-direction:column;gap:8px;align-items:var(--statal);width:var(--statw);max-width:100%")}>
              <span style={sx("display:flex;height:8px;width:var(--statw);max-width:100%")}>
                {(c.segs || []).map((s, $index) => (<React.Fragment key={$index}>
                  <span style={sx(`width:${s.w};height:100%;background:${s.color};margin-right:1px`)}></span>
                </React.Fragment>))}
              </span>
              <span style={sx("font-size:12px;color:#8b9099;font-feature-settings:'tnum' 1")}>{c.meta}</span>
            </span>
          </>) : null}
          {(c.soon) ? (<>
            <span style={sx("font-size:11px;font-weight:600;letter-spacing:0.02em;color:#8b9099;border:1px solid #e4e5e8;border-radius:999px;padding:5px 11px")}>Coming soon</span>
          </>) : null}
        </button>
      </React.Fragment>))}
    </div>
    <div style={sx("display:flex;justify-content:space-between;align-items:center;margin-top:26px")}>
      <button className="hv4" onClick={goMeth} style={sx("font-size:14px;font-weight:600;color:#000000")}>Methodology →</button>
      <span style={sx("font-size:12px;color:#8b9099")}>Every rating is evidence-linked and dated.</span>
    </div>
  </section>

  <section style={sx("max-width:1280px;margin:44px auto 0;padding:clamp(28px,4vw,44px) var(--gut) clamp(46px,6vw,80px);border-top:1px solid #e4e5e8")}>
    <p style={sx("margin:0 0 18px;font-size:11px;font-weight:600;letter-spacing:0.01em;text-transform:none;color:#8b9099")}>In partnership with</p>
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
