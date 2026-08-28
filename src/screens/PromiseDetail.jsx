import React from 'react';
import { sx } from '../lib/sx';
import { useVals } from '../lib/vals';

export default function PromiseDetail() {
  const { D_actsStyled, D_backGo, D_body, D_cat, D_catBg, D_catC, D_catGo, D_chg, D_citeCount, D_citeMt, D_cites, D_color, D_dlL, D_dlT, D_dlX, D_dlY, D_ex, D_fillW, D_fillX, D_hasBody, D_hasDl, D_hasRel, D_hasWhy, D_imgAlt, D_imgCap, D_imgCss, D_imgGo, D_madeL, D_madeX, D_meta, D_more, D_moreAllGo, D_noRel, D_polGo, D_polName, D_polPhotoCss, D_polRole, D_rel, D_srcDate, D_srcLinked, D_srcName, D_srcUnlinked, D_srcUrl, D_status, D_term, D_tipEnter, D_tipLeave, D_title, D_tlEnd, D_tlStart, D_todayX, D_why } = useVals();

  return (
    <>
<div style={sx("max-width:1280px;margin:0 auto;padding:0 var(--gut);animation:ptFade 0.35s ease both")}>
  <div style={sx("padding:44px 0 0")}>
    <button className="hv8" onClick={D_backGo} style={sx("font-size:12px;font-weight:600;letter-spacing:0.06em;color:#8b9099;text-transform:uppercase")}>← All promises</button>
    <div style={sx("display:flex;align-items:center;gap:16px;margin-top:26px;flex-wrap:wrap")}>
      <span onMouseEnter={D_tipEnter} onMouseLeave={D_tipLeave} style={sx(`display:inline-flex;align-items:center;gap:9px;font-size:13px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:${D_color};cursor:pointer`)}><span style={sx(`width:12px;height:12px;background:${D_color};display:inline-block`)}></span>{D_status}</span>
      <span style={sx("font-size:12.5px;color:#8b9099;font-feature-settings:'tnum' 1")}>Status last changed {D_chg}</span>
    </div>
    <h1 style={sx("margin:20px 0 0;font-size:clamp(26px,5.2vw,44px);font-weight:800;letter-spacing:-0.03em;line-height:1.08;max-width:900px")}>{D_title}</h1>
    <div style={sx("display:flex;align-items:center;gap:11px;flex-wrap:wrap;margin-top:18px")}>
      <button className="hv17" onClick={D_catGo} style={sx(`display:inline-flex;align-items:center;gap:7px;background:${D_catBg};color:${D_catC};border-radius:999px;padding:5px 13px 5px 11px;font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;transition:opacity 0.15s ease`)}>
        <span style={sx(`display:block;flex:none;width:7px;height:7px;border-radius:50%;background:${D_catC}`)}></span>{D_cat}
      </button>
      <p style={sx("margin:0;font-size:13.5px;color:#6b7078;font-feature-settings:'tnum' 1")}>{D_meta}</p>
    </div>
  </div><div style={sx("border-top:1px solid #e4e5e8;border-bottom:1px solid #e4e5e8;margin-top:32px;padding:26px 0 18px")}>
    <div style={sx("position:relative;height:74px")}>
      <span style={sx("position:absolute;left:0;top:0;font-size:11px;font-weight:700;color:#8b9099;font-feature-settings:'tnum' 1")}>{D_tlStart}</span>
      <span style={sx("position:absolute;right:0;top:0;font-size:11px;font-weight:700;color:#8b9099;font-feature-settings:'tnum' 1")}>{D_tlEnd}</span>
      <div style={sx("position:absolute;left:0;right:0;top:38px;height:2px;background:#e4e5e8")}></div>
      <div style={sx(`position:absolute;top:38px;height:2px;left:${D_fillX};width:${D_fillW};background:${D_color}`)}></div>
      <div style={sx(`position:absolute;top:33px;left:${D_madeX}`)}>
        <span style={sx("display:block;width:12px;height:12px;background:#121212;border-radius:50%;margin-left:-6px")}></span>
        <span style={sx("display:block;margin-top:8px;font-size:10px;font-weight:700;letter-spacing:0.08em;color:#8b9099;white-space:nowrap;transform:translateX(-6px)")}>MADE {D_madeL}</span>
      </div>
      {(D_hasDl) ? (<>
        <div style={sx(`position:absolute;top:33px;left:${D_dlX}`)}>
          <span style={sx(`display:block;width:12px;height:12px;background:${D_color};border-radius:50%;margin-left:-6px`)}></span>
          <span style={sx(`display:block;position:absolute;top:${D_dlY};font-size:10px;font-weight:700;letter-spacing:0.08em;color:${D_color};white-space:nowrap;transform:${D_dlT}`)}>DEADLINE {D_dlL}</span>
        </div>
      </>) : null}
      <div style={sx(`position:absolute;top:28px;left:${D_todayX}`)}>
        <span style={sx("display:block;width:2px;height:22px;background:#121212;margin-left:-1px")}></span>
        <span style={sx("display:block;position:absolute;bottom:26px;left:0;font-size:10px;font-weight:800;letter-spacing:0.1em;color:#121212;white-space:nowrap;transform:translateX(-50%)")}>TODAY</span>
      </div>
    </div>
    <p style={sx("margin:4px 0 0;font-size:11.5px;color:#8b9099")}>Promise window shown within the {D_term} term of office.</p>
  </div>

  
  <div style={sx("display:flex;gap:var(--gapmid);align-items:flex-start;flex-wrap:var(--wrap);margin-top:34px")}>
    <figure style={sx("margin:0;flex:1.35;min-width:var(--pdfig)")}>
      <button className="hv18" onClick={D_imgGo} aria-label={D_imgAlt} style={sx(`display:block;width:100%;aspect-ratio:16/9;border-radius:12px;background-color:#eceef1;background-image:${D_imgCss};background-size:cover;background-position:center;transition:opacity 0.18s ease`)}></button>
      <figcaption style={sx("display:flex;justify-content:space-between;gap:16px;margin-top:10px;font-size:11.5px;line-height:1.5;color:#8b9099")}>
        <span>{D_imgCap}</span>
        <span style={sx("flex:none")}>Photo: Unsplash</span>
      </figcaption>
    </figure>
    <div style={sx("flex:1;min-width:0;padding-top:2px")}>
      <p style={sx("margin:0;font-size:11px;font-weight:500;color:#8b9099;border-top:1px solid #e4e5e8;padding-top:16px")}>What was promised</p>
      <p style={sx("margin:14px 0 0;font-size:18px;line-height:1.6;color:#26292e;text-wrap:pretty")}>{D_ex}</p>
      {(D_hasWhy) ? (<>
        <p style={sx("margin:16px 0 0;font-size:14.5px;line-height:1.65;color:#6b7078;text-wrap:pretty")}>{D_why}</p>
      </>) : null}
      <div style={sx("display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;margin-top:20px;padding-top:15px;border-top:1px solid #ededf0")}>
        <span style={sx("font-size:10px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#8b9099;flex:none")}>Source</span>
        {(D_srcLinked) ? (<>
          <a className="hv19" href={D_srcUrl} target="_blank" rel="noopener noreferrer" style={sx("display:inline-flex;align-items:center;gap:6px;font-size:13.5px;font-weight:650;color:#121212;text-decoration:none;border-bottom:1px solid #c9ccd2;transition:border-color 0.15s ease")}>
            {D_srcName}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={sx("flex:none")}><path d="M14 5h5v5"></path><path d="M19 5L10 14"></path></svg>
          </a>
        </>) : null}
        {(D_srcUnlinked) ? (<>
          <span style={sx("font-size:13.5px;font-weight:650;color:#121212")}>{D_srcName}</span>
        </>) : null}
        <span style={sx("font-size:12.5px;color:#8b9099;white-space:nowrap;font-feature-settings:'tnum' 1")}>Cited {D_srcDate}</span>
      </div>
      <button className="hv3" onClick={D_polGo} style={sx("display:flex;align-items:center;gap:14px;margin-top:26px;padding:12px;border-radius:12px;width:100%;text-align:left;transition:background 0.18s ease")}>
        <span role="img" aria-label={D_polName} style={sx(`display:block;flex:none;width:46px;height:46px;border-radius:50%;background-color:#eceef1;background-image:${D_polPhotoCss};background-size:cover;background-position:center top`)}></span>
        <span style={sx("display:flex;flex-direction:column;gap:3px;min-width:0")}>
          <span style={sx("font-size:10px;font-weight:700;letter-spacing:0.09em;text-transform:uppercase;color:#8b9099")}>Promise by</span>
          <span style={sx("font-size:15px;font-weight:700;letter-spacing:-0.01em;color:#121212")}>{D_polName}</span>
          <span style={sx("display:flex;align-items:center;gap:7px;flex-wrap:wrap;font-size:12px;color:#6b7078")}>
            {D_polRole}
            <span style={sx("display:block;flex:none;width:1px;height:9px;background:#d5d7dc")}></span>
            <span style={sx("display:inline-flex;align-items:center;gap:5px")}>
              <span role="img" aria-label="Kenya flag" style={sx("display:block;flex:none;width:14px;height:14px;border-radius:50%;background-image:url('https://flagcdn.com/w80/ke.png');background-size:cover;background-position:center;box-shadow:0 0 0 1px rgba(9,9,10,0.1) inset")}></span>
              Kenya
            </span>
          </span>
        </span>
      </button>
    </div>
  </div>

  
  <div style={sx("border-top:1px solid #e4e5e8;margin-top:8px;padding:18px 0 0;display:flex;align-items:center;gap:20px;flex-wrap:wrap")}>
    <p style={sx("margin:0;font-size:14px;font-weight:750;letter-spacing:-0.01em;color:#121212;flex:none")}>Act on this promise</p>
    <div style={sx("display:flex;gap:10px;flex-wrap:wrap")}>
      {(D_actsStyled || []).map((a, $index) => (<React.Fragment key={$index}>
        <button className="hv20" onClick={a.go} title={a.d} style={sx(`--ahbg:${a.hbg};--ahbd:${a.hbd};display:inline-flex;align-items:center;gap:8px;background:${a.bg};color:${a.c};border:1px solid ${a.bd};border-radius:999px;padding:13px 20px 13px 17px;font-size:14.5px;font-weight:650;transition:border-color 0.15s ease,background 0.15s ease`)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={sx(`flex:none;color:${a.iconC}`)}><path d={a.icon}></path></svg>
          {a.w}
        </button>
      </React.Fragment>))}
    </div>
  </div>

  
  

  <div style={sx("display:flex;gap:var(--gap);align-items:flex-start;flex-wrap:var(--wrap);padding:clamp(26px,3.6vw,44px) 0 56px")}>
    <div style={sx("flex:1;min-width:0;max-width:730px")}>
      
      {(D_hasBody) ? (<>
      <div style={sx("border-top:1px solid #e4e5e8;margin-top:0;padding-top:0")}>
        {(D_body || []).map((s, $index) => (<React.Fragment key={$index}>
          <section id={s.id} style={sx("scroll-margin-top:100px;padding-top:36px")}>
            <div style={sx("display:flex;align-items:baseline;gap:13px")}>
              <span style={sx("flex:none;font-size:11px;font-weight:700;color:#b4b8bf;font-feature-settings:'tnum' 1;padding-top:5px")}>{s.n}</span>
              <h4 style={sx("margin:0;font-size:20px;font-weight:800;letter-spacing:-0.022em;line-height:1.26;color:#121212;text-wrap:pretty")}>{s.h}</h4>
            </div>
            <div style={sx("display:flex;flex-direction:column;gap:15px;margin-top:15px;padding-left:24px")}>
              {(s.blocks || []).map((b, $index) => (<React.Fragment key={$index}>
                <div>
                  {(b.isP) ? (<>
                    <p style={sx("margin:0;font-size:15px;line-height:1.72;color:#3b3f45;text-wrap:pretty")}>{b.t}</p>
                  </>) : null}
                  {(b.isQ) ? (<>
                    <blockquote style={sx("margin:4px 0;border-left:2px solid #121212;padding:2px 0 2px 19px")}>
                      <p style={sx("margin:0;font-size:18.5px;line-height:1.5;font-weight:650;letter-spacing:-0.015em;color:#121212;text-wrap:pretty")}>{b.t}</p>
                    </blockquote>
                  </>) : null}
                  {(b.isSh) ? (<>
                    <p style={sx("margin:10px 0 0;font-size:11px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#8b9099")}>{b.t}</p>
                  </>) : null}
                  {(b.isUl) ? (<>
                    <ul style={sx("list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:11px")}>
                      {(b.items || []).map((i, $index) => (<React.Fragment key={$index}>
                        <li style={sx("display:grid;grid-template-columns:13px minmax(0,1fr);gap:11px;font-size:14.5px;line-height:1.66;color:#3b3f45")}>
                          <span style={sx("color:#b4b8bf")}>—</span>
                          <span style={sx("text-wrap:pretty")}>{i.t}</span>
                        </li>
                      </React.Fragment>))}
                    </ul>
                  </>) : null}
                  {(b.isDl) ? (<>
                    <div style={sx("display:flex;flex-direction:column;border-bottom:1px solid #ededf0")}>
                      {(b.items || []).map((i, $index) => (<React.Fragment key={$index}>
                        <div style={sx("display:grid;grid-template-columns:var(--dlcols);gap:5px 16px;padding:13px 0;border-top:1px solid #ededf0")}>
                          <span style={sx("font-size:10px;font-weight:800;letter-spacing:0.09em;text-transform:uppercase;color:#8b9099;padding-top:4px")}>{i.k}</span>
                          <span style={sx("font-size:14.5px;line-height:1.66;color:#3b3f45;text-wrap:pretty")}>{i.v}</span>
                        </div>
                      </React.Fragment>))}
                    </div>
                  </>) : null}
                  {(b.isFy) ? (<>
                    <div style={sx("border:1px solid #e4e5e8;border-radius:12px;overflow:hidden")}>
                      <div style={sx("display:grid;grid-template-columns:var(--fycols);gap:12px;padding:10px 15px;background:#f6f7f9")}>
                        <span style={sx("font-size:9.5px;font-weight:800;letter-spacing:0.09em;text-transform:uppercase;color:#8b9099")}>Year</span>
                        <span style={sx("font-size:9.5px;font-weight:800;letter-spacing:0.09em;text-transform:uppercase;color:#8b9099")}>Allocation</span>
                        <span style={sx("grid-column:var(--fyspan);font-size:9.5px;font-weight:800;letter-spacing:0.09em;text-transform:uppercase;color:#8b9099")}>Target on record</span>
                      </div>
                      {(b.rows || []).map((r, $index) => (<React.Fragment key={$index}>
                        <div style={sx("display:grid;grid-template-columns:var(--fycols);gap:5px 12px;padding:13px 15px;border-top:1px solid #ededf0")}>
                          <span style={sx("font-size:13.5px;font-weight:700;color:#121212;font-feature-settings:'tnum' 1")}>{r.fy}</span>
                          <span style={sx("font-size:13.5px;font-weight:700;color:#121212;font-feature-settings:'tnum' 1")}>{r.alloc}</span>
                          <span style={sx("grid-column:var(--fyspan);font-size:13px;line-height:1.6;color:#6b7078;text-wrap:pretty")}>{r.target}</span>
                        </div>
                      </React.Fragment>))}
                    </div>
                  </>) : null}
                  {(b.isNames) ? (<>
                    <div>
                      <p style={sx("margin:0;font-size:10px;font-weight:800;letter-spacing:0.09em;text-transform:uppercase;color:#8b9099")}>{b.label}</p>
                      <p style={sx("margin:9px 0 0;font-size:15px;line-height:1.72;color:#3b3f45;text-wrap:pretty")}>{b.namesText}</p>
                    </div>
                  </>) : null}
                  {(b.isImgs) ? (<>
                    <div>
                      <p style={sx("margin:0;font-size:10px;font-weight:800;letter-spacing:0.09em;text-transform:uppercase;color:#8b9099")}>{b.label}</p>
                      <div style={sx(`display:grid;grid-template-columns:${b.imgCols};gap:16px;margin-top:12px`)}>
                        {(b.imgItems || []).map((i, $index) => (<React.Fragment key={$index}>
                          <figure style={sx("margin:0")}>
                            <button className="hv18" onClick={i.go} aria-label={i.cap} style={sx(`display:block;position:relative;width:100%;aspect-ratio:16/10;border-radius:10px;overflow:hidden;background-color:#eceef1;background-image:${i.css};background-size:cover;background-position:center;transition:opacity 0.18s ease`)}>
                              <span style={sx("position:absolute;right:9px;bottom:9px;display:flex;align-items:center;gap:6px;background:rgba(9,9,10,0.62);color:#FFFFFF;border-radius:999px;padding:5px 10px;font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase")}>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 3h6v6"></path><path d="M9 21H3v-6"></path><path d="M21 3l-7 7"></path><path d="M3 21l7-7"></path></svg>
                                Stand-in
                              </span>
                            </button>
                            <figcaption style={sx("margin-top:9px;font-size:11.5px;line-height:1.5;color:#8b9099;text-wrap:pretty")}>{i.cap}</figcaption>
                          </figure>
                        </React.Fragment>))}
                      </div>
                    </div>
                  </>) : null}
                  {(b.isLinks) ? (<>
                    <div style={sx("display:flex;flex-direction:column;align-items:flex-start;gap:10px")}>
                      {(b.items || []).map((i, $index) => (<React.Fragment key={$index}>
                        <a className="hv19" href={i.u} target="_blank" rel="noopener noreferrer" style={sx("display:inline-flex;align-items:center;gap:7px;font-size:14px;font-weight:650;color:#121212;text-decoration:none;border-bottom:1px solid #c9ccd2;transition:border-color 0.15s ease")}>
                          {i.t}
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={sx("flex:none")}><path d="M14 5h5v5"></path><path d="M19 5L10 14"></path></svg>
                        </a>
                      </React.Fragment>))}
                    </div>
                  </>) : null}
                  {(b.isTally) ? (<>
                    <div>
                      <p style={sx("margin:0;font-size:10px;font-weight:800;letter-spacing:0.09em;text-transform:uppercase;color:#8b9099")}>{b.label}</p>
                      <p style={sx("margin:9px 0 0;font-size:15px;line-height:1.72;color:#3b3f45;text-wrap:pretty")}>{b.tallyText}</p>
                    </div>
                  </>) : null}
                  {(b.isSrc) ? (<>
                    <div style={sx("display:flex;align-items:baseline;gap:9px;flex-wrap:wrap")}>
                      <span style={sx("flex:none;font-size:9.5px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#b4b8bf")}>Source</span>
                      {(b.srcLinked) ? (<>
                        <a className="hv21" href={b.srcUrl} target="_blank" rel="noopener noreferrer" style={sx("display:inline;font-size:12.5px;line-height:1.6;font-weight:600;color:#6b7078;text-decoration:underline;text-decoration-color:#dcdde1;text-underline-offset:3px;transition:color 0.15s ease,text-decoration-color 0.15s ease")}>
                          {b.tHead}<span style={sx("white-space:nowrap")}>{b.tTail}<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={sx("display:inline;vertical-align:baseline;margin-left:4px")}><path d="M14 5h5v5"></path><path d="M19 5L10 14"></path></svg></span>
                        </a>
                      </>) : null}
                      {(b.srcPlain) ? (<>
                        <span style={sx("font-size:12.5px;line-height:1.55;font-weight:600;color:#6b7078")}>{b.t}</span>
                      </>) : null}
                    </div>
                  </>) : null}
                </div>
              </React.Fragment>))}
            </div>
          </section>
        </React.Fragment>))}
      </div>
      </>) : null}

      <div style={sx(`border-top:1px solid #e4e5e8;margin-top:${D_citeMt};padding-top:22px`)}>
        <div style={sx("display:flex;justify-content:space-between;align-items:baseline;gap:20px;flex-wrap:wrap")}>
          <h3 style={sx("margin:0;font-size:19px;font-weight:800;letter-spacing:-0.02em;color:#121212")}>Documents cited</h3>
          <p style={sx("margin:0;font-size:12px;color:#8b9099;font-feature-settings:'tnum' 1")}>{D_citeCount}</p>
        </div>
        <ol style={sx("list-style:none;margin:16px 0 0;padding:0")}>
          {(D_cites || []).map((c, $index) => (<React.Fragment key={$index}>
            <li style={sx("display:grid;grid-template-columns:26px 1fr;gap:14px;padding:15px 0;border-top:1px solid #ededf0")}>
              <span style={sx("font-size:11px;font-weight:700;color:#b4b8bf;font-feature-settings:'tnum' 1;padding-top:3px")}>{c.n}</span>
              <span style={sx("display:flex;flex-direction:column;gap:9px;min-width:0")}>
                <span style={sx("display:flex;align-items:center;gap:9px;flex-wrap:wrap;line-height:1.4")}>
                  {(c.linked) ? (<>
                    <a className="hv22" href={c.url} target="_blank" rel="noopener noreferrer" style={sx("display:inline;font-size:14px;font-weight:700;letter-spacing:-0.01em;color:#121212;text-decoration:underline;text-decoration-color:#c9ccd2;text-underline-offset:3px;transition:text-decoration-color 0.15s ease")}>
                      {c.nameHead}<span style={sx("white-space:nowrap")}>{c.nameTail}<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={sx("display:inline;vertical-align:baseline;margin-left:4px")}><path d="M14 5h5v5"></path><path d="M19 5L10 14"></path></svg></span>
                    </a>
                  </>) : null}
                  {(c.plain) ? (<>
                    <span style={sx("font-size:14px;font-weight:700;letter-spacing:-0.01em;color:#121212")}>{c.name}</span>
                  </>) : null}
                  <span style={sx("display:block;flex:none;width:1px;height:9px;background:#d5d7dc")}></span>
                  <span style={sx("font-size:10px;font-weight:800;letter-spacing:0.09em;text-transform:uppercase;color:#8b9099")}>{c.type}</span>
                  <span style={sx("font-size:12px;color:#8b9099;font-feature-settings:'tnum' 1")}>{c.date}</span>
                </span>
                <span style={sx("font-size:13.5px;line-height:1.6;color:#6b7078;text-wrap:pretty")}>{c.desc}</span>
              </span>
            </li>
          </React.Fragment>))}
        </ol>
      </div>

      <div style={sx("border-top:1px solid #e4e5e8;margin-top:48px;padding-top:22px")}>
        <div style={sx("display:flex;justify-content:space-between;align-items:baseline;gap:24px;flex-wrap:wrap")}>
          <h3 style={sx("margin:0;font-size:19px;font-weight:800;letter-spacing:-0.02em;color:#121212")}>More in <span style={sx(`color:${D_catC}`)}>{D_cat}</span></h3>
          <button className="hv23" onClick={D_moreAllGo} style={sx("font-size:13px;font-weight:600;color:#6b7078")}>All {D_cat} promises by {D_polName} →</button>
        </div>
        <div style={sx("display:grid;grid-template-columns:var(--c2);gap:14px;margin-top:20px;align-items:stretch")}>
          {(D_more || []).map((p, $index) => (<React.Fragment key={$index}>
            <button className="hv14" onClick={p.go} style={sx(`--stc:${p.chipC};border:1px solid #ededf0;border-radius:14px;padding:13px;display:flex;gap:13px;align-items:flex-start;height:100%;background:#FFFFFF;text-align:left;transition:transform 0.18s ease,background 0.18s ease,border-color 0.18s ease`)}>
              <span role="img" aria-label={p.title} style={sx(`display:block;flex:none;width:62px;height:62px;border-radius:9px;background-color:#eceef1;background-image:${p.imgCss};background-size:cover;background-position:center`)}></span>
              <span style={sx("display:flex;flex-direction:column;flex:1;min-width:0")}>
                <span style={sx(`display:inline-flex;align-items:center;font-size:9.5px;font-weight:800;letter-spacing:0.09em;text-transform:uppercase;white-space:nowrap;color:${p.chipC}`)}>{p.chipL}</span>
                <span style={sx("margin-top:7px;font-size:14px;font-weight:700;line-height:1.34;letter-spacing:-0.015em;color:#121212;text-wrap:pretty")}>{p.title}</span>
                <span style={sx("display:flex;align-items:center;gap:7px;margin-top:auto;padding-top:11px;min-width:0")}>
                  <span role="img" aria-label={p.polName} style={sx(`display:block;flex:none;width:18px;height:18px;border-radius:50%;background-color:#e4e5e8;background-image:${p.polPhotoCss};background-size:cover;background-position:center`)}></span>
                  <span style={sx("font-size:11.5px;font-weight:600;color:#3b3f45;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>{p.polName}</span>
                  <span style={sx("display:block;flex:none;width:1px;height:9px;background:#d5d7dc")}></span>
                  <span style={sx("flex:none;font-size:11px;color:#8b9099;font-feature-settings:'tnum' 1")}>{p.rev}</span>
                </span>
              </span>
            </button>
          </React.Fragment>))}
        </div>
      </div>
    </div>

    <aside style={sx("width:var(--rail2);flex:none;position:var(--stick);top:88px")}>
      
      <div>
        <p style={sx("margin:0;font-size:11px;font-weight:500;letter-spacing:0.01em;text-transform:none;color:#8b9099;border-top:1px solid #e4e5e8;padding-top:14px")}>Related analysis</p>
        {(D_hasRel) ? (<>
          {(D_rel || []).map((r, $index) => (<React.Fragment key={$index}>
            <div style={sx("padding:14px 0;border-bottom:1px solid #ededf0")}>
              <p style={sx("margin:0;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#8b9099")}>{r.s} · {r.d}</p>
              <p className="hv24" style={sx("margin:6px 0 0;font-size:14px;font-weight:650;line-height:1.4;cursor:pointer")}>{r.t}</p>
            </div>
          </React.Fragment>))}
        </>) : null}
        {(D_noRel) ? (<>
          <p style={sx("margin:14px 0 0;font-size:13px;color:#8b9099")}>No analysis linked to this promise yet.</p>
        </>) : null}
      </div>
    </aside>
  </div>
</div>
    </>
  );
}
