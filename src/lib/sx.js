/* The design is authored with inline CSS declaration strings. sx() turns one into
   the style object React expects, so the ported markup keeps the original values
   verbatim instead of being hand-translated. Results are memoised by string. */
const cache = new Map();

export function sx(css) {
  if (!css) return undefined;
  if (typeof css === 'object') return css;
  const hit = cache.get(css);
  if (hit) return hit;

  const out = {};
  const decls = [];
  let depth = 0;
  let quote = null;
  let start = 0;

  for (let i = 0; i < css.length; i++) {
    const ch = css[i];
    if (quote) {
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") quote = ch;
    else if (ch === '(') depth++;
    else if (ch === ')') depth--;
    else if (ch === ';' && depth === 0) {
      decls.push(css.slice(start, i));
      start = i + 1;
    }
  }
  decls.push(css.slice(start));

  for (const decl of decls) {
    const t = decl.trim();
    if (!t) continue;
    const c = t.indexOf(':');
    if (c < 1) continue;
    const prop = t.slice(0, c).trim();
    const value = t.slice(c + 1).trim();
    if (!prop || !value) continue;
    out[prop.startsWith('--') ? prop : prop.replace(/-([a-z])/g, (m, l) => l.toUpperCase())] = value;
  }

  if (cache.size < 4000) cache.set(css, out);
  return out;
}
