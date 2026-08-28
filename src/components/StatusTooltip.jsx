import React from 'react';
import { sx } from '../lib/sx';
import { useVals } from '../lib/vals';

export default function StatusTooltip() {
  const { tipColor, tipDef, tipLabel, tipMeta, tipShow, tipTx, tipTy } = useVals();

  return (
    <>
{(tipShow) ? (<>
  <div style={sx(`position:fixed;left:0;top:0;z-index:400;pointer-events:none;width:296px;transform:translate(${tipTx},${tipTy})`)}>
    <div style={sx("background:#FFFFFF;border:1px solid #e4e5e8;border-radius:10px;padding:14px 16px;box-shadow:0 12px 34px rgba(9,9,10,0.22);animation:ptTipIn 0.5s cubic-bezier(0.33,0,0.15,1) 0.1s both;will-change:opacity,transform")}>
      <span style={sx("display:flex;align-items:center;gap:9px")}>
        <span style={sx(`width:9px;height:9px;border-radius:2px;flex:none;background:${tipColor};display:inline-block`)}></span>
        <span style={sx(`font-size:11px;font-weight:800;letter-spacing:0.09em;text-transform:uppercase;color:${tipColor}`)}>{tipLabel}</span>
        {(tipMeta) ? (<>
          <span style={sx("margin-left:auto;font-size:11px;font-weight:600;color:#8b9099;font-feature-settings:'tnum' 1")}>{tipMeta}</span>
        </>) : null}
      </span>
      <p style={sx("margin:9px 0 0;font-size:12.5px;line-height:1.55;color:#4a4f57;text-wrap:pretty")}>{tipDef}</p>
    </div>
  </div>
</>) : null}
    </>
  );
}
