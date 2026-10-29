"use client";

import { useEffect, useRef } from "react";
import { RIBBON_FRAGMENT, RIBBON_VERTEX, hexToRgb } from "@/lib/ribbon-shader";

const COLORS = ["#7FC4E8", "#1B4FD8", "#6B5B95", "#C93B2C", "#F5D33A"];

/**
 * Animated WebGL ribbon behind the homepage hero. Renders at half resolution, pauses off-screen,
 * holds a still frame for reduced motion, and leaves the CSS gradient beneath it visible if WebGL is unavailable.
 */
export function RibbonGradient() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const gl = cv.getContext("webgl", { antialias: false, alpha: false, preserveDrawingBuffer: true });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const vs = compile(gl.VERTEX_SHADER, RIBBON_VERTEX);
    const fs = compile(gl.FRAGMENT_SHADER, RIBBON_FRAGMENT);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (k: string) => gl.getUniformLocation(prog, k);
    COLORS.forEach((c, i) => gl.uniform3fv(u("c" + i), hexToRgb(c)));
    const uR = u("r");
    const uT = u("t");
    const uPx = u("px");

    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t0 = performance.now();
    let raf = 0;
    let visible = true;
    cv.style.opacity = "1";

    const draw = () => {
      const t = still ? 18 : (performance.now() - t0) / 1000;
      gl.uniform2f(uR, cv.width, cv.height);
      gl.uniform1f(uT, t);
      gl.uniform1f(uPx, cv.width / Math.max(1, cv.clientWidth));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const frame = () => {
      raf = 0;
      if (!visible) return;
      draw();
      if (!still) raf = requestAnimationFrame(frame);
    };
    const resize = () => {
      const w = Math.max(2, Math.round(cv.clientWidth * 0.5));
      const h = Math.max(2, Math.round(cv.clientHeight * 0.5));
      if (cv.width !== w || cv.height !== h) {
        cv.width = w;
        cv.height = h;
        gl.viewport(0, 0, w, h);
      }
      draw();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf && !still) raf = requestAnimationFrame(frame);
    });
    io.observe(cv);
    resize();

    return () => {
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 -z-10 block size-full opacity-0 transition-opacity duration-500" />;
}
