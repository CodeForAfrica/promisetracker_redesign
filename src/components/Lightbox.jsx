import React from 'react';
import { sx } from '../lib/sx';
import { useVals } from '../lib/vals';

export default function Lightbox() {
  const { LB_cap, LB_close, LB_img, LB_kicker, LB_open, LB_stop } = useVals();

  return (
    <>
{(LB_open) ? (<>
<div onClick={LB_close} style={sx("position:fixed;inset:0;z-index:220;background:rgba(9,9,10,0.92);display:flex;align-items:center;justify-content:center;padding:clamp(18px,4vw,56px);overflow:auto;animation:ptFade 0.2s ease both")}>
  <div onClick={LB_stop} style={sx("max-width:1100px;width:100%;max-height:100%;display:flex;flex-direction:column;gap:15px")}>
    <div role="img" aria-label={LB_cap} style={sx(`flex:0 1 auto;width:100%;aspect-ratio:16/10;max-height:calc(100vh - 210px);min-height:0;border-radius:12px;background-color:#1c1c1f;background-image:${LB_img};background-size:contain;background-position:center;background-repeat:no-repeat`)}></div>
    <div style={sx("flex:none;display:flex;justify-content:space-between;align-items:flex-start;gap:24px;flex-wrap:wrap")}>
      <div style={sx("flex:1;min-width:240px")}>
        <p style={sx("margin:0;font-size:10px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.5)")}>{LB_kicker}</p>
        <p style={sx("margin:8px 0 0;font-size:13.5px;line-height:1.6;color:rgba(255,255,255,0.84);max-width:720px;text-wrap:pretty")}>{LB_cap}</p>
      </div>
      <button className="hv29" onClick={LB_close} style={sx("flex:none;border:1px solid rgba(255,255,255,0.3);border-radius:999px;padding:9px 17px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.8);transition:border-color 0.15s ease,color 0.15s ease")}>Close</button>
    </div>
  </div>
</div>
</>) : null}
    </>
  );
}
