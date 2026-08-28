import React from 'react';
import { sx } from '../lib/sx';
import { useVals } from '../lib/vals';

export default function Subscribe() {
  const { setSub, subDone, subGo, subOpen, subVal } = useVals();

  return (
    <>
<section style={sx("background:#f6f7f9;border-top:1px solid #e4e5e8;margin-top:50px")}>
  <div style={sx("max-width:1280px;margin:0 auto;padding:clamp(30px,4vw,46px) var(--gut);display:flex;justify-content:space-between;align-items:center;gap:36px;flex-wrap:wrap")}>
    <div>
      <h3 style={sx("margin:0;font-size:28px;font-weight:800;letter-spacing:-0.025em")}>Subscribe</h3>
      <p style={sx("margin:8px 0 0;font-size:15px;line-height:1.5;color:#6b7078")}>To get all latest news and updates</p>
    </div>
    {(subDone) ? (<>
      <p style={sx("margin:0;font-size:14.5px;font-weight:700")}>✓ Subscribed. Confirm via your inbox.</p>
    </>) : null}
    {(subOpen) ? (<>
      <div style={sx("display:flex;align-items:center;gap:8px;flex:none;background:#FFFFFF;border:1px solid #e4e5e8;border-radius:999px;padding:5px 5px 5px 6px")}>
        <input value={subVal} onChange={setSub} placeholder="you@example.org" style={sx("width:100%;max-width:258px;min-width:0;border:none;background:transparent;padding:9px 12px;font-size:14px;color:#121212")} />
        <button className="hv0" onClick={subGo} style={sx("background:#000000;color:#FFFFFF;border-radius:999px;padding:11px 22px;font-size:15px;font-weight:600;flex:none")}>Subscribe</button>
      </div>
    </>) : null}
  </div>
</section>
    </>
  );
}
