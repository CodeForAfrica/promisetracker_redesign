import React from 'react';
import { sx } from '../lib/sx';
import { useVals } from '../lib/vals';

export default function SiteFooter() {
  const { goAbout, goAboutPartners, goAboutProject, goAboutTeam, goMeth } = useVals();

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
        <p style={sx("margin:0;max-width:620px;font-size:13px;line-height:1.6;color:#6b7078")}>PromiseTracker is a project of Code for Africa, the continent's largest network of civic technology and data journalism labs. Every rating is backed by dated, public evidence and verified with PesaCheck. All content is released under a Creative Commons Attribution Licence. Reuse it to hold leaders in your own community to account.</p>
      </div>
      <div aria-label="IFCN verified signatory" style={sx("width:96px;height:96px;border-radius:50%;flex:none;background:radial-gradient(circle at 50% 36%,#7a8088,#3b424b);border:3px solid #5a616b;color:#FFFFFF;display:flex;align-items:center;justify-content:center;text-align:center;font-size:8.5px;font-weight:700;line-height:1.35;padding:8px")}>
        <div>IFCN<br />SIGNATORY<br /><span style={sx("opacity:0.85")}>PesaCheck ✓</span></div>
      </div>
    </div>
    <nav style={sx("display:flex;flex-wrap:wrap;gap:10px 28px;padding:26px 0;border-top:1px solid #ededf0")}>
      <button className="hv8" onClick={goAbout} style={sx("font-size:14px;font-weight:500;color:#5c5c5c")}>About Us</button>
      <button className="hv8" onClick={goAboutProject} style={sx("font-size:14px;font-weight:500;color:#5c5c5c")}>The Project</button>
      <button className="hv8" onClick={goAboutTeam} style={sx("font-size:14px;font-weight:500;color:#5c5c5c")}>The Team</button>
      <button className="hv8" onClick={goAboutPartners} style={sx("font-size:14px;font-weight:500;color:#5c5c5c")}>The Partners</button>
      <button className="hv8" onClick={goMeth} style={sx("font-size:14px;font-weight:500;color:#5c5c5c")}>Methodology</button>
      
      <button className="hv8" style={sx("font-size:14px;font-weight:500;color:#5c5c5c")}>Contact Us</button>
    </nav>
    <div style={sx("display:flex;justify-content:space-between;align-items:center;gap:20px;padding-top:24px;border-top:1px solid #ededf0;flex-wrap:wrap")}>
      <div style={sx("display:flex;align-items:center;gap:14px")}>
        <span style={sx("font-size:13px;color:#6b7078")}>Follow PromiseTracker on:</span>
        <button className="hv8" aria-label="facebook" style={sx("color:#3f3f3f;display:inline-flex")}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 8h2.5V5H14c-2 0-3.2 1.2-3.2 3.2V10H8.5v3h2.3v8h3v-8h2.2l.5-3h-2.7V8.4c0-.3.2-.4.7-.4z" fill="currentColor" stroke="none"></path></svg></button>
        <button className="hv8" aria-label="whatsapp" style={sx("color:#3f3f3f;display:inline-flex")}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.6-4A8.5 8.5 0 1 1 8 19.4z"></path><path d="M9 9.2c.2 2.6 1.9 4.6 4.5 4.8.6.05 1-.4 1-1l-1.4-1-1.3.7c-.8-.3-1.4-1-1.6-1.8l.7-1.1-1-1.4c-.6 0-1.05.4-1 1z" fill="currentColor" stroke="none"></path></svg></button>
        <button className="hv8" aria-label="twitter" style={sx("color:#3f3f3f;display:inline-flex")}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l7 9-7 7h2.4l5.6-5.6L16 20h4l-7.3-9.3L19.4 4H17l-5 5-3.8-5z" fill="currentColor" stroke="none"></path></svg></button>
        <button className="hv8" aria-label="instagram" style={sx("color:#3f3f3f;display:inline-flex")}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"></circle></svg></button>
        <button className="hv8" aria-label="linkedin" style={sx("color:#3f3f3f;display:inline-flex")}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 17v-7"></path></svg></button>
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
