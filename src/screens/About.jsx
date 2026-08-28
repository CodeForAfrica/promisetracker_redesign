import React from 'react';
import { sx } from '../lib/sx';
import { useVals } from '../lib/vals';

export default function About() {
  const { U_isPartners, U_isProject, U_isTeam, U_nav, U_partners } = useVals();

  return (
    <>
<div style={sx("max-width:1280px;margin:0 auto;padding:0 var(--gut);animation:ptFade 0.35s ease both")}>
  <div style={sx("margin-left:calc(50% - 50vw);width:100vw;background:linear-gradient(150deg,rgba(0,0,0,0.9) 0%,rgba(14,14,16,0.84) 55%,rgba(14,14,16,0.66) 100%),url('https://images.unsplash.com/photo-1543929620-723d509c23bc?w=2400') center 50%/cover no-repeat;background-color:#0e0e10")}>
   <div style={sx("max-width:1280px;margin:0 auto;padding:clamp(44px,7vw,84px) var(--gut) clamp(38px,5.2vw,64px)")}>
    <div style={sx("width:104px;height:3px;background:rgba(255,255,255,0.92);margin-bottom:26px")}></div>
    <h1 style={sx("margin:0;font-size:clamp(31px,7vw,56px);font-weight:800;letter-spacing:-0.03em;line-height:1.04;max-width:820px;color:#FFFFFF")}>About Us</h1>
    <p style={sx("margin:20px 0 0;font-size:19px;line-height:1.6;color:rgba(255,255,255,0.92);max-width:760px")}>The promise tracker is a platform-based promise tracker where citizens can track various promises and services promised by governors, institutions, political parties in their manifestos during the campaigns leading up to the elections and in the post election period.</p>
   </div>
  </div>

  <div style={sx("display:grid;grid-template-columns:var(--fsplit);gap:clamp(28px,4vw,72px);margin-top:56px;align-items:start;padding-bottom:80px")}>
    <nav style={sx("position:sticky;top:96px;display:flex;flex-direction:column;border-top:1px solid #121212")}>
      {(U_nav || []).map((t, $index) => (<React.Fragment key={$index}>
        <button className="hv28" onClick={t.go} style={sx(`text-align:left;padding:15px 2px;border-bottom:1px solid #ededf0;font-size:13px;font-weight:${t.wt};letter-spacing:0.07em;text-transform:uppercase;color:${t.c}`)}>{t.label}</button>
      </React.Fragment>))}
    </nav>

    <div>
      {(U_isProject) ? (<>
        <div style={sx("animation:ptFade 0.3s ease both")}>
          <h2 style={sx("margin:0;font-size:clamp(23px,4vw,34px);font-weight:800;letter-spacing:-0.025em;color:#121212")}>The Project</h2>
          <p style={sx("margin:24px 0 0;font-size:17px;line-height:1.75;color:#3b3f45;max-width:720px;text-wrap:pretty")}>Engaging with governments needs data, to this end, this project not only develops a promise tracker but also showcases this information on an easy-to-understand platform, making the PromiseTracker a contributor to public discourse around service delivery by elected officials. This leads to a more robust dialogue and positive engagement with the elected officials or government bodies around this subject.</p>
          <p style={sx("margin:20px 0 0;font-size:17px;line-height:1.75;color:#3b3f45;max-width:720px;text-wrap:pretty")}>The PromiseTracker initial focus will be on Nairobi tracking progress on Governor Mike Sonko’s seven-point plan to improve the city in the first 100 days of his term and 5 year plan. The tracker will also focus on other county governors whose plans are elaborated in their manifestos, such as Makueni, Mombasa, Kisumu, Nakuru, Kitui and Nandi. While the promises made by the national government have been covered extensively, promises made by the governors have received less coverage, resulting in limited analysis around whether they are actually viable.</p>
          <div style={sx("margin:44px 0 0;padding-top:32px;border-top:1px solid #ededf0;max-width:720px")}>
            <p style={sx("margin:0;font-size:15px;line-height:1.75;color:#6b7078;text-wrap:pretty")}>This site is an openAFRICA project of Code for Africa. All content is released under a Creative Commons 4 Attribution Licence. Reuse it to help empower your own community. The code is available on GitHub and data is available on openAFRICA.</p>
          </div>
        </div>
      </>) : null}

      {(U_isTeam) ? (<>
        <div style={sx("animation:ptFade 0.3s ease both")}>
          <h2 style={sx("margin:0;font-size:clamp(23px,4vw,34px);font-weight:800;letter-spacing:-0.025em;color:#121212")}>The Team</h2>
          <p style={sx("margin:24px 0 0;font-size:17px;line-height:1.75;color:#3b3f45;max-width:720px;text-wrap:pretty")}>Engaging with governments needs data, to this end, this project not only develops a promise tracker but also showcases this information on an easy-to-understand platform, making the PromiseTracker a contributor to public discourse around service delivery by elected officials. This leads to a more robust dialogue and positive engagement with the elected officials or government bodies around this subject.</p>
          <p style={sx("margin:20px 0 0;font-size:17px;line-height:1.75;color:#3b3f45;max-width:720px;text-wrap:pretty")}>The PromiseTracker initial focus will be on Nairobi tracking progress on Governor Mike Sonko’s seven-point plan to improve the city in the first 100 days of his term and 5 year plan. The tracker will also focus on other county governors whose plans are elaborated in their manifestos, such as Makueni, Mombasa, Kisumu, Nakuru, Kitui and Nandi. While the promises made by the national government have been covered extensively, promises made by the governors have received less coverage, resulting in limited analysis around whether they are actually viable.</p>
        </div>
      </>) : null}

      {(U_isPartners) ? (<>
        <div style={sx("animation:ptFade 0.3s ease both")}>
          <h2 style={sx("margin:0;font-size:clamp(23px,4vw,34px);font-weight:800;letter-spacing:-0.025em;color:#121212")}>The Partners</h2>
          <p style={sx("margin:24px 0 0;font-size:17px;line-height:1.75;color:#3b3f45;max-width:720px;text-wrap:pretty")}>The promise tracker is a platform-based promise tracker where citizens can track various promises and services promised by governors, institutions, political parties in their manifestos during the campaigns leading up to the elections and in the post election period.</p>
          <div style={sx("display:grid;grid-template-columns:var(--c3);gap:2px;margin-top:40px")}>
            {(U_partners || []).map((p, $index) => (<React.Fragment key={$index}>
              <a className="hv19" href={p.url} target="_blank" rel="noopener" style={sx("display:flex;flex-direction:column;justify-content:space-between;gap:22px;border:1px solid #e4e5e8;padding:26px;min-height:170px;background:#FFFFFF;text-decoration:none")}>
                <span role="img" aria-label={p.n} style={sx(`width:100%;height:52px;background-image:${p.img};background-size:contain;background-position:left center;background-repeat:no-repeat;filter:grayscale(1);opacity:0.78;transition:opacity .15s ease`)}></span>
                <span style={sx("font-size:13px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#121212")}>{p.n}</span>
              </a>
            </React.Fragment>))}
          </div>
        </div>
      </>) : null}
    </div>
  </div>
</div>
    </>
  );
}
