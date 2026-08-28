import React from 'react';
import { sx } from '../lib/sx';
import { useVals } from '../lib/vals';

export default function ActNow() {
  const { A_chips, A_empty, A_pets, A_stats, A_ways } = useVals();

  return (
    <>
<div style={sx("max-width:1280px;margin:0 auto;padding:0 var(--gut);animation:ptFade 0.35s ease both")}>
  <div style={sx("margin-left:calc(50% - 50vw);width:100vw;background:linear-gradient(150deg,rgba(0,0,0,0.9) 0%,rgba(14,14,16,0.84) 55%,rgba(14,14,16,0.66) 100%),url('https://images.unsplash.com/photo-1633116938154-de2b8637ba21?w=2400') center 50%/cover no-repeat;background-color:#0e0e10")}>
   <div style={sx("max-width:1280px;margin:0 auto;padding:clamp(44px,7vw,84px) var(--gut) clamp(38px,5.2vw,64px)")}>
    <div style={sx("width:104px;height:3px;background:rgba(255,255,255,0.92);margin-bottom:26px")}></div>
    <h1 style={sx("margin:0;font-size:clamp(32px,7.4vw,60px);font-weight:800;letter-spacing:-0.03em;line-height:1.02;color:#FFFFFF")}>Act now.</h1>
    <p style={sx("margin:18px 0 0;font-size:20px;line-height:1.5;color:rgba(255,255,255,0.92);max-width:620px")}>A rating is only the beginning. PromiseTracker gives you five ways to move a promise, from a signature to a submission of evidence.</p>
   </div>
  </div>
  <div style={sx("display:grid;grid-template-columns:var(--c5);column-gap:26px;margin-top:36px")}>
    {(A_ways || []).map((w, $index) => (<React.Fragment key={$index}>
      <div style={sx(`padding:28px 26px 30px 0;border-right:${w.bd}`)}>
        <p style={sx("margin:0;font-size:15px;font-weight:800")}>{w.w}</p>
        <p style={sx("margin:7px 0 0;font-size:12.5px;line-height:1.55;color:#6b7078")}>{w.d}</p>
      </div>
    </React.Fragment>))}
  </div>
  <div style={sx("display:flex;gap:72px;padding:46px 0 8px;flex-wrap:wrap")}>
    {(A_stats || []).map((s, $index) => (<React.Fragment key={$index}>
      <div>
        <p style={sx("margin:0;font-size:clamp(30px,6.8vw,54px);font-weight:800;letter-spacing:-0.04em;font-feature-settings:'tnum' 1")}>{s.n}</p>
        <p style={sx("margin:6px 0 0;font-size:11px;font-weight:500;letter-spacing:0.01em;text-transform:none;color:#8b9099")}>{s.l}</p>
      </div>
    </React.Fragment>))}
  </div>
  <section style={sx("padding:40px 0 0")}>
    <div style={sx("display:flex;justify-content:space-between;align-items:center;gap:18px;flex-wrap:wrap")}>
      <div style={sx("display:flex;align-items:baseline;gap:22px;flex-wrap:wrap")}>
        <h2 style={sx("margin:0;font-size:28px;font-weight:800;letter-spacing:-0.02em;color:#121212")}>Petitions</h2>
        <div style={sx("display:flex;gap:8px")}>
          {(A_chips || []).map((c, $index) => (<React.Fragment key={$index}>
            <button className="hv19" onClick={c.go} style={sx(`border:1px solid ${c.bd};border-radius:999px;background:${c.bg};color:${c.c};padding:7px 14px;font-size:13px;font-weight:600`)}>{c.label}</button>
          </React.Fragment>))}
        </div>
      </div>
      <button className="hv0" style={sx("background:#000000;color:#FFFFFF;border-radius:999px;padding:12px 20px;font-size:15px;font-weight:600")}>Suggest a promise</button>
    </div>
    {(A_empty) ? (<>
      <div style={sx("border:1px dashed #d5d7dc;padding:76px 40px;margin-top:28px;text-align:center")}>
        <p style={sx("margin:0;font-size:24px;font-weight:800;letter-spacing:-0.02em")}>No petitions here yet.</p>
        <p style={sx("margin:12px auto 0;font-size:14.5px;color:#6b7078;max-width:420px;line-height:1.65")}>Be the first to rally your community around a promise. Start a petition and we will put it in front of the office responsible.</p>
        <button className="hv0" style={sx("margin-top:24px;background:#000000;color:#FFFFFF;border-radius:999px;padding:13px 22px;font-size:15px;font-weight:600")}>Start a petition</button>
      </div>
    </>) : null}
    <div style={sx("display:grid;grid-template-columns:var(--c2);gap:24px;margin:28px 0 0")}>
      {(A_pets || []).map((p, $index) => (<React.Fragment key={$index}>
        <div style={sx("border:1px solid #e4e5e8;border-radius:12px;padding:26px;display:flex;flex-direction:column;gap:14px")}>
          <div style={sx("display:flex;justify-content:space-between;align-items:center;gap:12px")}>
            <span style={sx(`font-size:10.5px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;padding:4px 10px;border-radius:999px;background:${p.tagBg};color:${p.tagC};border:1px solid ${p.tagBd}`)}>{p.tag}</span>
            <button className="hv25" onClick={p.linkGo} style={sx("font-size:11px;color:#8b9099;font-weight:600")}>Linked: {p.link}</button>
          </div>
          <p style={sx("margin:0;font-size:19px;font-weight:700;letter-spacing:-0.02em;line-height:1.3")}>{p.title}</p>
          <p style={sx("margin:0;font-size:13.5px;line-height:1.6;color:#6b7078")}>{p.ex}</p>
          <div style={sx("margin-top:auto")}>
            <div style={sx("height:6px;background:#e4e5e8;width:100%")}><div style={sx(`height:6px;background:#121212;width:${p.pw}`)}></div></div>
            <div style={sx("display:flex;justify-content:space-between;margin-top:8px")}>
              <span style={sx("font-size:12.5px;font-weight:700;font-feature-settings:'tnum' 1")}>{p.sig}</span>
              <span style={sx("font-size:12px;color:#8b9099;font-feature-settings:'tnum' 1")}>{p.pct}</span>
            </div>
          </div>
          <div style={sx("display:flex;justify-content:space-between;align-items:center;gap:12px")}>
            <button className="hv26" style={sx(`background:${p.ctaBg};color:${p.ctaC};border:1px solid ${p.ctaBd};border-radius:999px;padding:11px 18px;font-size:14px;font-weight:600`)}>{p.cta}</button>
            <span style={sx("font-size:11px;color:#8b9099")}>{p.by}</span>
          </div>
        </div>
      </React.Fragment>))}
    </div>
  </section>
  <section style={sx("border-top:1px solid #e4e5e8;margin-top:56px;padding:40px 0 72px;display:grid;grid-template-columns:var(--half);gap:var(--gaphalf)")}>
    <div>
      <p style={sx("margin:0 0 8px;font-size:11px;font-weight:500;letter-spacing:0.01em;text-transform:none;color:#8b9099")}>New here</p>
      <h3 style={sx("margin:0;font-size:24px;font-weight:800;letter-spacing:-0.025em")}>Register to petition, follow and submit evidence.</h3>
      <div style={sx("display:flex;gap:10px;margin-top:22px;flex-wrap:wrap")}>
        <button className="hv0" style={sx("background:#000000;color:#FFFFFF;border-radius:999px;padding:13px 22px;font-size:15px;font-weight:600")}>Create account</button>
        <button className="hv27" style={sx("border:1px solid #000000;border-radius:999px;padding:13px 22px;font-size:15px;font-weight:600")}>Continue with Google</button>
      </div>
    </div>
    <div>
      <p style={sx("margin:0 0 8px;font-size:11px;font-weight:500;letter-spacing:0.01em;text-transform:none;color:#8b9099")}>Already registered</p>
      <h3 style={sx("margin:0;font-size:24px;font-weight:800;letter-spacing:-0.025em")}>Welcome back.</h3>
      <div style={sx("margin-top:22px")}>
        <button className="hv0" style={sx("background:#000000;color:#FFFFFF;border-radius:999px;padding:13px 22px;font-size:15px;font-weight:600")}>Sign in</button>
      </div>
    </div>
  </section>
</div>
    </>
  );
}
