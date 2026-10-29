"use client";

import { useEffect, useState } from "react";

/** A live-ticking integer. `rate` is the average increase per second. */
export function LiveCounter({ start, rate }: { start: number; rate: number }) {
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let acc = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const dt = 0.5 + Math.random() * 1.4;
      timer = setTimeout(() => {
        acc += Math.random() * rate * dt * 2;
        if (acc >= 1) {
          const add = Math.floor(acc);
          acc %= 1;
          setValue((v) => v + add);
        }
        tick();
      }, dt * 1000);
    };
    tick();
    return () => clearTimeout(timer);
  }, [rate]);

  return <span className="tabular-nums">{value.toLocaleString("en-US")}</span>;
}
