import React from 'react';
import { sx } from '../lib/sx';
import { useVals } from '../lib/vals';

export default function ActionModals() {
  const { AN_capBd, AN_capBg, AN_capMark, AN_capToggle, AN_close, AN_email, AN_fBtnBg, AN_fBtnC, AN_fDone, AN_fDup, AN_fEmailShown, AN_fForm, AN_fRetry, AN_fSubmit, AN_files, AN_hasFiles, AN_hasNote, AN_imgCss, AN_isFollow, AN_isShare, AN_isUpdate, AN_kinds, AN_msg, AN_note, AN_noteName, AN_ogDesc, AN_open, AN_pTitle, AN_pick, AN_ref, AN_setEmail, AN_setSrc, AN_setText, AN_src, AN_status, AN_statusC, AN_statusDot, AN_targets, AN_text, AN_uBtnBg, AN_uBtnC, AN_uDone, AN_uForm, AN_uSubmit } = useVals();

  return (
    <>
{(AN_open) ? (<>
<div style={sx("position:fixed;inset:0;z-index:90;display:flex;align-items:flex-start;justify-content:center;padding:56px 20px;overflow-y:auto;background:rgba(12,12,14,0.58)")}>
  <button onClick={AN_close} aria-label="Close" style={sx("position:absolute;inset:0;cursor:default")}></button>

  {(AN_isUpdate) ? (<>
    <div style={sx("position:relative;width:100%;max-width:640px;background:#FFFFFF;border-radius:14px;box-shadow:0 26px 70px rgba(0,0,0,0.3);animation:ptFade 0.2s ease both")}>
      <div style={sx("display:flex;justify-content:space-between;align-items:flex-start;gap:20px;padding:26px 28px 20px;border-bottom:1px solid #ededf0")}>
        <div style={sx("min-width:0")}>
          <p style={sx("margin:0;font-size:11px;font-weight:700;letter-spacing:0.11em;text-transform:uppercase;color:#8b9099")}>Submit an update</p>
          <h3 style={sx("margin:9px 0 0;font-size:19px;font-weight:800;letter-spacing:-0.02em;line-height:1.32;color:#121212;text-wrap:pretty")}>{AN_pTitle}</h3>
        </div>
        <button className="hv16" onClick={AN_close} aria-label="Close" style={sx("flex:none;width:30px;height:30px;border-radius:50%;border:1px solid #e4e5e8;color:#6b7078;font-size:15px;line-height:1")}>×</button>
      </div>

      {(AN_uForm) ? (<>
        <div style={sx("padding:24px 28px 26px;display:flex;flex-direction:column;gap:20px")}>
          <div style={sx("display:flex;flex-direction:column;gap:10px")}>
            <span style={sx("font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#8b9099")}>What are you submitting?</span>
            <div style={sx("display:flex;flex-wrap:wrap;gap:8px")}>
              {(AN_kinds || []).map((k, $index) => (<React.Fragment key={$index}>
                <button onClick={k.on} style={sx(`border:1px solid ${k.bd};background:${k.bg};color:${k.c};border-radius:999px;padding:8px 15px;font-size:13px;font-weight:600;transition:all 0.15s ease`)}>{k.l}</button>
              </React.Fragment>))}
            </div>
          </div>

          <label style={sx("display:flex;flex-direction:column;gap:8px")}>
            <span style={sx("font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#8b9099")}>Your update</span>
            <textarea className="hv30" value={AN_text} onChange={AN_setText} placeholder="Describe what has changed and what the evidence shows. Include dates, figures and the office or document involved." style={sx("width:100%;min-height:118px;resize:vertical;border:1px solid #d5d7dc;border-radius:10px;padding:13px 14px;font-family:inherit;font-size:14px;line-height:1.6;color:#26292e")}></textarea>
          </label>

          <label style={sx("display:flex;flex-direction:column;gap:8px")}>
            <span style={sx("font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#8b9099")}>Link to the source</span>
            <input className="hv30" type="url" value={AN_src} onChange={AN_setSrc} placeholder="https://" style={sx("width:100%;border:1px solid #d5d7dc;border-radius:10px;padding:12px 14px;font-family:inherit;font-size:14px;color:#26292e")} />
          </label>

          <div style={sx("display:flex;flex-direction:column;gap:8px")}>
            <span style={sx("font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#8b9099")}>Supporting documents</span>
            <label className="hv19" style={sx("display:flex;align-items:center;gap:12px;border:1px dashed #cfd2d8;border-radius:10px;padding:15px 16px;cursor:pointer;transition:border-color 0.15s ease")}>
              <input type="file" multiple={true} onChange={AN_pick} style={sx("display:none")} />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7078" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={sx("flex:none")}><path d="M12 5v14M5 12h14"></path></svg>
              <span style={sx("display:flex;flex-direction:column;gap:2px")}>
                <span style={sx("font-size:13.5px;font-weight:650;color:#121212")}>Attach a document, photo or screenshot</span>
                <span style={sx("font-size:12px;color:#8b9099")}>PDF, DOCX, JPG or PNG · up to 10MB each</span>
              </span>
            </label>
            {(AN_hasFiles) ? (<>
              <div style={sx("display:flex;flex-wrap:wrap;gap:7px")}>
                {(AN_files || []).map((f, $index) => (<React.Fragment key={$index}>
                  <span style={sx("display:inline-flex;align-items:center;gap:7px;background:#f6f7f9;border:1px solid #e4e5e8;border-radius:999px;padding:5px 12px;font-size:12px;color:#3b3f45")}>{f.n}</span>
                </React.Fragment>))}
              </div>
            </>) : null}
          </div>

          <label style={sx("display:flex;flex-direction:column;gap:8px")}>
            <span style={sx("font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#8b9099")}>Your email <span style={sx("font-weight:500;letter-spacing:0;text-transform:none;color:#a1a5ad")}>— optional, so we can verify with you</span></span>
            <input className="hv30" type="email" value={AN_email} onChange={AN_setEmail} placeholder="you@organisation.org" style={sx("width:100%;border:1px solid #d5d7dc;border-radius:10px;padding:12px 14px;font-family:inherit;font-size:14px;color:#26292e")} />
          </label>

          <div style={sx("display:flex;justify-content:space-between;align-items:center;gap:16px;border:1px solid #e4e5e8;border-radius:10px;padding:13px 15px;background:#fbfbfc")}>
            <button onClick={AN_capToggle} style={sx("display:flex;align-items:center;gap:11px")}>
              <span style={sx(`width:20px;height:20px;flex:none;border:1px solid ${AN_capBd};background:${AN_capBg};border-radius:4px;color:#FFFFFF;font-size:12px;line-height:18px;text-align:center`)}>{AN_capMark}</span>
              <span style={sx("font-size:13.5px;font-weight:600;color:#3b3f45")}>I'm not a robot</span>
            </button>
            <span style={sx("font-size:10px;line-height:1.4;text-align:right;color:#a1a5ad")}>reCAPTCHA<br />Privacy · Terms</span>
          </div>

          <div style={sx("display:flex;justify-content:space-between;align-items:center;gap:20px;border-top:1px solid #ededf0;padding-top:20px;flex-wrap:wrap")}>
            <p style={sx("margin:0;font-size:12px;line-height:1.55;color:#6b7078;max-width:330px")}>Submissions go to our research team for review. Nothing is published automatically.</p>
            <button onClick={AN_uSubmit} style={sx(`background:${AN_uBtnBg};color:${AN_uBtnC};border-radius:999px;padding:13px 26px;font-size:14.5px;font-weight:600;transition:background 0.15s ease`)}>Submit for review</button>
          </div>
        </div>
      </>) : null}

      {(AN_uDone) ? (<>
        <div style={sx("padding:34px 28px 30px;text-align:center")}>
          <span style={sx("display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:50%;background:#121212;color:#FFFFFF;font-size:20px")}>✓</span>
          <h4 style={sx("margin:20px 0 0;font-size:21px;font-weight:800;letter-spacing:-0.02em")}>Submission received.</h4>
          <p style={sx("margin:12px auto 0;font-size:14.5px;line-height:1.65;color:#6b7078;max-width:430px;text-wrap:pretty")}>Our researchers check every submission against the public record before it appears on this promise. You will hear from us if we need more detail.</p>
          <p style={sx("margin:18px 0 0;font-size:11.5px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#8b9099")}>Reference {AN_ref}</p>
          <button className="hv0" onClick={AN_close} style={sx("margin-top:24px;background:#000000;color:#FFFFFF;border-radius:999px;padding:12px 28px;font-size:14.5px;font-weight:600")}>Back to the promise</button>
        </div>
      </>) : null}
    </div>
  </>) : null}

  {(AN_isFollow) ? (<>
    <div style={sx("position:relative;width:100%;max-width:520px;background:#FFFFFF;border-radius:14px;box-shadow:0 26px 70px rgba(0,0,0,0.3);animation:ptFade 0.2s ease both")}>
      <div style={sx("display:flex;justify-content:space-between;align-items:flex-start;gap:20px;padding:26px 28px 20px;border-bottom:1px solid #ededf0")}>
        <div style={sx("min-width:0")}>
          <p style={sx("margin:0;font-size:11px;font-weight:700;letter-spacing:0.11em;text-transform:uppercase;color:#8b9099")}>Follow this promise</p>
          <h3 style={sx("margin:9px 0 0;font-size:19px;font-weight:800;letter-spacing:-0.02em;line-height:1.32;color:#121212;text-wrap:pretty")}>{AN_pTitle}</h3>
        </div>
        <button className="hv16" onClick={AN_close} aria-label="Close" style={sx("flex:none;width:30px;height:30px;border-radius:50%;border:1px solid #e4e5e8;color:#6b7078;font-size:15px;line-height:1")}>×</button>
      </div>

      {(AN_fForm) ? (<>
        <div style={sx("padding:24px 28px 26px;display:flex;flex-direction:column;gap:18px")}>
          <p style={sx("margin:0;font-size:15.5px;line-height:1.6;color:#26292e;text-wrap:pretty")}>Be the first to know when the status of this promise changes.</p>
          <div style={sx("display:flex;align-items:center;gap:9px;border:1px solid #e4e5e8;border-radius:10px;padding:11px 14px;background:#fbfbfc")}>
            <span style={sx(`width:9px;height:9px;flex:none;border-radius:50%;background:${AN_statusDot}`)}></span>
            <span style={sx("font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#8b9099")}>Rated now</span>
            <span style={sx(`font-size:13px;font-weight:700;color:${AN_statusC}`)}>{AN_status}</span>
          </div>
          <label style={sx("display:flex;flex-direction:column;gap:8px")}>
            <span style={sx("font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#8b9099")}>Email address</span>
            <input className="hv30" type="email" value={AN_email} onChange={AN_setEmail} placeholder="you@organisation.org" style={sx("width:100%;border:1px solid #d5d7dc;border-radius:10px;padding:12px 14px;font-family:inherit;font-size:14px;color:#26292e")} />
          </label>
          <div style={sx("display:flex;justify-content:space-between;align-items:center;gap:16px;border:1px solid #e4e5e8;border-radius:10px;padding:13px 15px;background:#fbfbfc")}>
            <button onClick={AN_capToggle} style={sx("display:flex;align-items:center;gap:11px")}>
              <span style={sx(`width:20px;height:20px;flex:none;border:1px solid ${AN_capBd};background:${AN_capBg};border-radius:4px;color:#FFFFFF;font-size:12px;line-height:18px;text-align:center`)}>{AN_capMark}</span>
              <span style={sx("font-size:13.5px;font-weight:600;color:#3b3f45")}>I'm not a robot</span>
            </button>
            <span style={sx("font-size:10px;line-height:1.4;text-align:right;color:#a1a5ad")}>reCAPTCHA<br />Privacy · Terms</span>
          </div>
          <button onClick={AN_fSubmit} style={sx(`background:${AN_fBtnBg};color:${AN_fBtnC};border-radius:999px;padding:13px 26px;font-size:14.5px;font-weight:600;transition:background 0.15s ease`)}>Follow this promise</button>
          <p style={sx("margin:0;font-size:12px;line-height:1.55;color:#8b9099")}>No account needed. One email per status change, and every alert carries a one-click unsubscribe link.</p>
        </div>
      </>) : null}

      {(AN_fDone) ? (<>
        <div style={sx("padding:32px 28px 30px;text-align:center")}>
          <span style={sx("display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:50%;background:#121212;color:#FFFFFF;font-size:20px")}>✓</span>
          <h4 style={sx("margin:20px 0 0;font-size:20px;font-weight:800;letter-spacing:-0.02em")}>You have followed this promise.</h4>
          <p style={sx("margin:12px auto 0;font-size:14.5px;line-height:1.65;color:#6b7078;max-width:390px;text-wrap:pretty")}>You will receive an automated email alert when the status changes.</p>
          <p style={sx("margin:16px 0 0;font-size:13px;font-weight:650;color:#121212")}>{AN_fEmailShown}</p>
          <button className="hv0" onClick={AN_close} style={sx("margin-top:24px;background:#000000;color:#FFFFFF;border-radius:999px;padding:12px 28px;font-size:14.5px;font-weight:600")}>Done</button>
        </div>
      </>) : null}

      {(AN_fDup) ? (<>
        <div style={sx("padding:32px 28px 30px;text-align:center")}>
          <span style={sx("display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:50%;border:1px solid #e4e5e8;color:#6b7078;font-size:20px")}>!</span>
          <h4 style={sx("margin:20px 0 0;font-size:20px;font-weight:800;letter-spacing:-0.02em")}>You're already following this promise!</h4>
          <p style={sx("margin:12px auto 0;font-size:14.5px;line-height:1.65;color:#6b7078;max-width:390px;text-wrap:pretty")}>{AN_fEmailShown} is already on the alert list for this promise.</p>
          <div style={sx("display:flex;justify-content:center;gap:10px;margin-top:24px;flex-wrap:wrap")}>
            <button className="hv19" onClick={AN_fRetry} style={sx("border:1px solid #e4e5e8;border-radius:999px;padding:12px 22px;font-size:14.5px;font-weight:600;color:#121212")}>Use another email</button>
            <button className="hv0" onClick={AN_close} style={sx("background:#000000;color:#FFFFFF;border-radius:999px;padding:12px 26px;font-size:14.5px;font-weight:600")}>Close</button>
          </div>
        </div>
      </>) : null}
    </div>
  </>) : null}

  {(AN_isShare) ? (<>
    <div style={sx("position:relative;width:100%;max-width:560px;background:#FFFFFF;border-radius:14px;box-shadow:0 26px 70px rgba(0,0,0,0.3);animation:ptFade 0.2s ease both")}>
      <div style={sx("display:flex;justify-content:space-between;align-items:flex-start;gap:20px;padding:26px 28px 20px;border-bottom:1px solid #ededf0")}>
        <div style={sx("min-width:0")}>
          <p style={sx("margin:0;font-size:11px;font-weight:700;letter-spacing:0.11em;text-transform:uppercase;color:#8b9099")}>Share this promise</p>
          <h3 style={sx("margin:9px 0 0;font-size:19px;font-weight:800;letter-spacing:-0.02em;line-height:1.32;color:#121212;text-wrap:pretty")}>{AN_pTitle}</h3>
        </div>
        <button className="hv16" onClick={AN_close} aria-label="Close" style={sx("flex:none;width:30px;height:30px;border-radius:50%;border:1px solid #e4e5e8;color:#6b7078;font-size:15px;line-height:1")}>×</button>
      </div>
      <div style={sx("padding:24px 28px 26px;display:flex;flex-direction:column;gap:20px")}>
        <div style={sx("display:grid;grid-template-columns:var(--c5);gap:9px")}>
          {(AN_targets || []).map((t, $index) => (<React.Fragment key={$index}>
            <button className="hv19" onClick={t.on} style={sx(`display:flex;flex-direction:column;align-items:center;gap:9px;border:1px solid ${t.bd};background:${t.bg};border-radius:12px;padding:15px 6px 13px;transition:all 0.15s ease`)}>
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={t.i1}></path><path d={t.i2}></path></svg>
              <span style={sx("font-size:11.5px;font-weight:650;color:#3b3f45;text-align:center;line-height:1.25")}>{t.n}</span>
            </button>
          </React.Fragment>))}
        </div>

        {(AN_hasNote) ? (<>
          <p style={sx("margin:0;font-size:12.5px;line-height:1.55;color:#3b3f45;background:#f6f7f9;border-radius:10px;padding:12px 14px")}><span style={sx("font-weight:700")}>{AN_noteName} · </span>{AN_note}</p>
        </>) : null}

        <div style={sx("display:flex;flex-direction:column;gap:9px")}>
          <span style={sx("font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#8b9099")}>The message</span>
          <p style={sx("margin:0;border:1px solid #e4e5e8;border-radius:10px;padding:14px 15px;font-size:13.5px;line-height:1.6;color:#26292e;text-wrap:pretty")}>{AN_msg}</p>
        </div>

        <div style={sx("display:flex;flex-direction:column;gap:9px")}>
          <span style={sx("font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#8b9099")}>Link preview</span>
          <div style={sx("border:1px solid #e4e5e8;border-radius:10px;overflow:hidden")}>
            <div role="img" aria-label={AN_pTitle} style={sx(`width:100%;aspect-ratio:1.91/1;background-color:#eceef1;background-image:${AN_imgCss};background-size:cover;background-position:center`)}></div>
            <div style={sx("padding:12px 14px 14px;border-top:1px solid #ededf0")}>
              <p style={sx("margin:0;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#8b9099")}>promisetracker.africa</p>
              <p style={sx("margin:6px 0 0;font-size:14px;font-weight:750;line-height:1.35;letter-spacing:-0.01em;color:#121212;text-wrap:pretty")}>{AN_pTitle}</p>
              <p style={sx("margin:5px 0 0;font-size:12px;line-height:1.5;color:#6b7078")}>{AN_status} · {AN_ogDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>) : null}
</div>
</>) : null}
    </>
  );
}
