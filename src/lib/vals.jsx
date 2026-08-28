import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { config } from '../config';
import {
  INITIAL_STATE,
  ORDER,
  LAB,
  DEFS,
  POLS,
  PROMS,
  PETS,
  MONTHS,
  SRC_URL,
  CAT_C,
  CAT_IMG,
  statusPalette,
  statusPaletteText,
  statusPaletteDark,
  P,
  X,
  TS,
  TE,
  NOW,
  promsOf,
  srcUrl,
  catC,
  heroSet,
  searchHits,
  clip,
  imgFor,
  counts,
  segsFor,
  short
} from './model';

/* The prototype navigated with a single `route` state key. Those route names map
   one-to-one onto the router's paths, so the `go({ route: 'detail', ... })` calls in
   the ported view logic still work — they now push a real URL. */
const PATH_FOR = {
  landing: () => '/',
  pols: () => '/kenya',
  profile: (s) => `/kenya/officials/${s.polId || 'ruto'}`,
  proms: (s) => `/kenya/officials/${s.polId || 'ruto'}/promises`,
  detail: (s) => `/kenya/promises/${s.promiseId || PROMS[0].id}`,
  act: () => '/act',
  meth: () => '/methodology',
  about: () => '/about'
};

export function routeFromPath(pathname) {
  if (pathname === '/' || pathname === '') return 'landing';
  if (/^\/kenya\/officials\/[^/]+\/promises/.test(pathname)) return 'proms';
  if (/^\/kenya\/officials\/[^/]+/.test(pathname)) return 'profile';
  if (/^\/kenya\/promises\//.test(pathname)) return 'detail';
  if (pathname.startsWith('/kenya')) return 'pols';
  if (pathname.startsWith('/act')) return 'act';
  if (pathname.startsWith('/methodology')) return 'meth';
  if (pathname.startsWith('/about')) return 'about';
  return 'landing';
}

function paramsFromPath(pathname) {
  const pol = pathname.match(/^\/kenya\/officials\/([^/]+)/);
  const prom = pathname.match(/^\/kenya\/promises\/([^/]+)/);
  return { polId: pol ? decodeURIComponent(pol[1]) : null, promiseId: prom ? decodeURIComponent(prom[1]) : null };
}

const ValsContext = createContext(null);

export function ValsProvider({ children }) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [state, setState] = useState(INITIAL_STATE);
  const searchRef = useRef(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  const set = useCallback((patch) => {
    setState((prev) => Object.assign({}, prev, typeof patch === 'function' ? patch(prev) : patch));
  }, []);

  const route = routeFromPath(pathname);

  // keep the ported logic's polId / promiseId in step with the URL, so deep links work
  const { polId, promiseId } = paramsFromPath(pathname);
  useEffect(() => {
    const patch = {};
    if (polId && polId !== stateRef.current.polId) patch.polId = polId;
    if (promiseId && promiseId !== stateRef.current.promiseId) patch.promiseId = promiseId;
    if (Object.keys(patch).length) set(patch);
  }, [polId, promiseId, set]);

  const nav = useCallback((patch) => {
    const { route: to, ...rest } = patch;
    if (Object.keys(rest).length) set(rest);
    const merged = Object.assign({}, stateRef.current, rest);
    const path = (PATH_FOR[to] || PATH_FOR.landing)(merged);
    if (path !== pathname) navigate({ to: path });
    window.scrollTo({ top: 0 });
  }, [navigate, pathname, set]);

  // hero carousel
  useEffect(() => {
    if (route !== 'landing' || !state.heroAuto) return undefined;
    const t = setInterval(() => set((s) => ({ heroIdx: s.heroIdx + 1 })), 7000);
    return () => clearInterval(t);
  }, [route, state.heroAuto, set]);

  // Escape closes the image lightbox
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && stateRef.current.lb) set({ lb: null }); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [set]);

  // focus the search field when the overlay opens
  useEffect(() => {
    if (state.searchOpen && searchRef.current) searchRef.current.focus();
  }, [state.searchOpen]);

  const vals = useMemo(
    () => computeVals(state, set, config, searchRef, nav, route),
    [state, set, nav, route]
  );

  return <ValsContext.Provider value={vals}>{children}</ValsContext.Provider>;
}

export function useVals() {
  const v = useContext(ValsContext);
  if (!v) throw new Error('useVals must be used inside <ValsProvider>');
  return v;
}

/* ---------------------------------------------------------------------------
   View logic ported from the prototype's renderVals(): the flat bag of values,
   handlers and derived strings that the screen components read.
   --------------------------------------------------------------------------- */
function computeVals(S, set, props, searchRef, nav, route) {
    const mode = props.statusPalette;
    const pal = statusPalette(mode), palD = statusPaletteDark(mode), palT = statusPaletteText();
    const sparse = props.sparseData ?? false;

    // status-definition hover tooltip
    const tipOff = () => { if (S.tip) set({ tip: null }); };
    const tipOn = (k, meta) => (e) => {
      const b = e.currentTarget.getBoundingClientRect();
      const above = b.top > 150;
      set({ tip: {
        label: LAB[k], color: pal[k], def: DEFS[k], meta: meta || null,
        x: Math.round(Math.min(Math.max(b.left + b.width / 2, 180), window.innerWidth - 180)),
        y: Math.round(above ? b.top : b.bottom), above
      } });
    };
    const showSoon = props.showComingSoon ?? true;
    const curPolId = S.polId || 'ruto';
    const pol = POLS.find(p => p.id === curPolId) || POLS[0];
    const polProms = promsOf(pol.id);

    const go = (patch) => () => nav(patch);
    const goHome = go({ route: 'landing' });
    const goCountry = go({ route: 'pols' });
    const scrollToCountries = () => {
      const el = document.getElementById('pt-select-country');
      if (!el) return;
      let sc = el.parentElement;
      while (sc && sc !== document.body) {
        const st = getComputedStyle(sc);
        if (/(auto|scroll)/.test(st.overflowY) && sc.scrollHeight > sc.clientHeight + 4) break;
        sc = sc.parentElement;
      }
      const dy = el.getBoundingClientRect().top - 88;
      if (sc && sc !== document.body) sc.scrollTo({ top: sc.scrollTop + dy, behavior: 'smooth' });
      else window.scrollTo({ top: window.scrollY + dy, behavior: 'smooth' });
    };
    const goAct = go({ route: 'act' });
    const goMeth = go({ route: 'meth' });
    const goAbout = go({ route: 'about' });
    const goAboutTab = (tab) => () => { set({ route: 'about', aboutTab: tab }); window.scrollTo(0, 0); };
    const goAboutProject = goAboutTab('project');
    const goAboutTeam = goAboutTab('team');
    const goAboutPartners = goAboutTab('partners');
    const goPromNav = go({ route: 'proms', polId: pol.id });
    const goProfile = go({ route: 'profile', polId: pol.id });
    const goPromise = (id) => go({ route: 'detail', promiseId: id });

    const exSet = heroSet();
    const exI = ((S.heroIdx % exSet.length) + exSet.length) % exSet.length;
    const exP = exSet[exI];
    const exPol = POLS.find(x => x.id === exP.pol);
    const srHits = searchHits(S.sq);
    const r = route;
    const navOn = { proms: r === 'proms' || r === 'detail', act: r === 'act', meth: r === 'meth', about: r === 'about' };

    // ---- landing ----
    const keCounts = counts(PROMS);
    const keKept = Math.round(keCounts.completed / PROMS.length * 100);
    const countries = [
      { name: 'Kenya', iso: 'ke', active: true, soon: false, cursor: 'pointer', nameC: '#121212', go: goCountry, segs: segsFor(PROMS, pal), meta: POLS.length + ' officials · ' + PROMS.length + ' promises · ' + keKept + '% kept' },
      { name: 'Nigeria', iso: 'ng', soon: true }, { name: 'Ethiopia', iso: 'et', soon: true }, { name: 'Senegal', iso: 'sn', soon: true }
    ].filter(c => c.active || showSoon)
     .map(c => c.active ? c : Object.assign({ active: false, cursor: 'default', nameC: '#d5d7dc', go: () => {}, segs: [], meta: '' }, c))
     .map(c => Object.assign({ flag: 'url("https://flagcdn.com/w160/' + c.iso + '.png")', flagO: c.active ? 1 : 0.32 }, c));

    // ---- politicians ----
    const grps = ['All', 'President', 'Governors', 'Senators', 'MPs'];
    const tabs = grps.map(g => {
      const n = g === 'All' ? POLS.length : POLS.filter(p => p.grp === g).length;
      const on = S.grp === g;
      return { label: g, count: n, on, c: on ? '#121212' : '#6b7078', ul: on ? '#121212' : 'transparent', go: () => set({ grp: g }) };
    });
    const P_dist = ORDER.filter(k => keCounts[k] > 0).map(k => ({
      label: LAB[k], color: pal[k], n: keCounts[k],
      tipEnter: tipOn(k, keCounts[k] + ' promises'), tipLeave: tipOff,
      w: (keCounts[k] / PROMS.length * 100).toFixed(2) + '%',
      title: LAB[k] + ' · ' + keCounts[k] + ' of ' + PROMS.length
    }));

    const FEATURED_ID = 'ruto';
    const featPol = POLS.find(p => p.id === FEATURED_ID) || POLS[0];
    const featList = promsOf(featPol.id);
    const featKept = Math.round(counts(featList).completed / (featList.length || 1) * 100);
    const P_feat = {
      kicker: 'Featured official', name: featPol.n, role: featPol.role + ' · ' + featPol.region,
      photoCss: featPol.photo ? 'url("' + featPol.photo + '")' : 'none',
      count: featList.length, kept: featKept + '%', segs: segsFor(featList, pal),
      go: go({ route: 'profile', polId: featPol.id, fStatus: [], fCats: [], q: '' })
    };

    const rows = POLS.filter(p => S.grp === 'All' || p.grp === S.grp).map(p => {
      const list = promsOf(p.id); const c = counts(list);
      const kept = Math.round(c.completed / (list.length || 1) * 100);
      return { init: p.init, photo: p.photo || null, photoCss: p.photo ? 'url("' + p.photo + '")' : 'none', noPhoto: !p.photo, name: p.n, meta: p.role + ' · ' + p.region + ' · ' + p.party, count: list.length,
        kept: kept + '%', keptC: kept > 0 ? pal.completed : '#6b7078', segs: segsFor(list, pal),
        go: go({ route: 'profile', polId: p.id, fStatus: [], fCats: [], q: '' }) };
    });

    // ---- profile ----
    const pc = counts(polProms); const pt = polProms.length || 1;
    const F_segs = ORDER.filter(k => pc[k] > 0).map(k => ({
      w: (pc[k] / pt * 100).toFixed(2) + '%', color: pal[k],
      tipEnter: tipOn(k, pc[k] + ' promises'), tipLeave: tipOff,
      go: go({ route: 'proms', polId: pol.id, fStatus: [k], fCats: [], q: '' })
    }));
    const gDef = [ { label: 'Promise kept', keys: ['completed', 'inprogress'], color: pal.completed }, { label: 'Uncertain', keys: ['inconclusive', 'unstarted'], color: '#7a7d82' }, { label: 'Promise not kept', keys: ['behind', 'stalled'], color: pal.stalled } ];
    const F_groups = gDef.map(g => { const n = g.keys.reduce((a, k) => a + pc[k], 0); return { label: g.label, color: g.color, w: (n / pt * 100).toFixed(2) + '%', pct: Math.round(n / pt * 100) + '%' }; });
    const F_legend = ORDER.map(k => ({ label: LAB[k], color: pal[k], count: pc[k], pct: Math.round(pc[k] / pt * 100) + '%',
      tipEnter: tipOn(k, pc[k] + ' of ' + pt + ' promises'), tipLeave: tipOff,
      go: go({ route: 'proms', polId: pol.id, fStatus: [k], fCats: [], q: '' }) }));
    const key = PROMS.find(p => p.id === pol.key) || polProms[0];
    const cardOf2 = (p) => ({ chipL: LAB[p.st], chipC: palT[p.st], catC: catC(p.cat), catBg: catC(p.cat) + '14', tipEnter: tipOn(p.st), tipLeave: tipOff, title: p.t, ex: p.ex, exShort: clip(p.ex, 96), cat: p.cat, imgCss: 'url("' + imgFor(p) + '")', rev: 'Updated ' + short(p.rev), dl: p.dl ? 'Due ' + p.dl : '', go: go({ route: 'detail', promiseId: p.id }) });
    const latest = polProms.slice().sort((a, b) => P(b.rev) - P(a.rev)).slice(0, 6).map(cardOf2);
    const fKey = 'pol:' + pol.id; const followingPol = !!S.following[fKey];

    // ---- promises db ----
    const allCats = Array.from(new Set(polProms.map(p => p.cat))).sort();
    let results = polProms.filter(p =>
      (S.fStatus.length === 0 || S.fStatus.includes(p.st)) &&
      (S.fCats.length === 0 || S.fCats.includes(p.cat)) &&
      (S.q.trim() === '' || (p.t + ' ' + p.ex + ' ' + p.cat).toLowerCase().includes(S.q.trim().toLowerCase()))
    );
    if (S.sort === 'recent') results = results.slice().sort((a, b) => P(b.rev) - P(a.rev));
    if (S.sort === 'deadline') results = results.slice().sort((a, b) => (a.dl ? P(a.dl) : 9999) - (b.dl ? P(b.dl) : 9999));
    if (S.sort === 'status') results = results.slice().sort((a, b) => ORDER.indexOf(a.st) - ORDER.indexOf(b.st));
    const toggle = (arrKey, v) => () => { const arr = S[arrKey]; set({ [arrKey]: arr.includes(v) ? arr.filter(x => x !== v) : arr.concat(v) }); };
    const R_status = ORDER.map(k => { const on = S.fStatus.includes(k); return {
      label: LAB[k], count: pc[k], go: toggle('fStatus', k), wt: on ? 650 : 450,
      tipEnter: tipOn(k), tipLeave: tipOff,
      boxBg: on ? pal[k] : '#FFFFFF', boxBd: on ? pal[k] : '#121212', check: on ? '✓' : '' }; });
    const R_cats = allCats.map(cat => { const on = S.fCats.includes(cat); const n = polProms.filter(p => p.cat === cat).length; return {
      label: cat, count: n, go: toggle('fCats', cat), wt: on ? 650 : 450,
      boxBg: on ? catC(cat) : '#FFFFFF', boxBd: catC(cat), check: on ? '✓' : '',
      labelC: on ? catC(cat) : '#121212' }; });
    const sorts = [ { k: 'recent', label: 'Most recent' }, { k: 'deadline', label: 'Promise deadline' }, { k: 'status', label: 'Status' } ];
    const R_sorts = sorts.map(s => ({ label: s.label, wt: S.sort === s.k ? 650 : 450, ring: S.sort === s.k ? '5px solid #000000' : '1.5px solid #c4c8ce', go: () => set({ sort: s.k }) }));
    const chips = [];
    S.fStatus.forEach(k => chips.push({ label: LAB[k], x: toggle('fStatus', k) }));
    S.fCats.forEach(c => chips.push({ label: c, x: toggle('fCats', c) }));
    if (S.q.trim()) chips.push({ label: '“' + S.q.trim() + '”', x: () => set({ q: '' }) });
    const R_cards = results.map(cardOf2);

    // ---- detail ----
    const d = PROMS.find(p => p.id === S.promiseId) || PROMS[0];
    const dPol = POLS.find(p => p.id === d.pol) || pol;
    const dList = promsOf(d.pol);
    const dIdx = dList.findIndex(p => p.id === d.id);
    const dMore = PROMS.filter(p => p.cat === d.cat && p.id !== d.id)
      .sort((a, b) => {
        const sameA = a.pol === d.pol ? 0 : 1, sameB = b.pol === d.pol ? 0 : 1;
        return sameA - sameB || P(b.rev) - P(a.rev);
      })
      .slice(0, 6).map(p => {
        const mp = POLS.find(x => x.id === p.pol);
        return Object.assign(cardOf2(p), {
          polName: mp ? mp.n : '',
          polPhotoCss: mp && mp.photo ? 'url("' + mp.photo + '")' : 'none'
        });
      });
    const madeK = P(d.made), dlK = d.dl ? P(d.dl) : null;
    const madeX = X(madeK), todayX = X(NOW);
    const capSrc = dPol.role === 'President' ? 'Manifesto pledge, 2022 campaign'
      : dPol.role.indexOf('Governor') === 0 ? dPol.region + ' County manifesto, 2022'
      : 'Campaign pledge, ' + dPol.region;
    const capEntry = { d: d.made, to: 'inconclusive', s: capSrc,
      t: 'Promise captured verbatim and logged with its date and source. Rated Inconclusive by default until dated, verifiable evidence of action is published.' };
    const dOrigin = (d.ev && d.ev.length) ? d.ev[0] : capEntry;
    const dSrcName = dOrigin.s;
    const dSrcUrl = srcUrl(dSrcName);
    const dFull = !sparse && d.ev && d.ev.length;
    const dEvSrc = dFull ? d.ev : [capEntry];
    const nn = (i) => (i + 1) < 10 ? '0' + (i + 1) : String(i + 1);
    const dEv = dEvSrc.map((e, i) => ({ d: e.d, t: e.t, s: e.s, n: nn(i), chip: e.to ? LAB[e.to] : null, chipC: e.to ? palT[e.to] : '#999999',
      dotBg: e.to ? pal[e.to] : '#FFFFFF', dotBd: e.to ? pal[e.to] : '#6b7078' }));
    const dRel = sparse ? [] : d.rel;
    const cType = (s) => {
      const l = (s || '').toLowerCase();
      if (l.indexOf('manifesto') > -1 || l.indexOf('pledge') > -1 || l.indexOf('address') > -1 || l.indexOf('speech') > -1) return 'Manifesto';
      if (l.indexOf('pesacheck') > -1 || l.indexOf('piga firimbi') > -1) return 'Fact-check';
      if (l.indexOf('gazette') > -1 || l.indexOf('county') > -1 || l.indexOf('treasury') > -1 || l.indexOf('ministry') > -1
        || l.indexOf('auditor') > -1 || l.indexOf('assembly') > -1 || l.indexOf('budget') > -1 || l.indexOf('report') > -1) return 'Official record';
      return 'News report';
    };
    const splitTail = (s) => {
      const i = String(s || '').lastIndexOf(' ');
      return i < 0 ? { head: '', tail: s || '' } : { head: s.slice(0, i + 1), tail: s.slice(i + 1) };
    };
    const dBodyRaw = sparse ? [] : (d.body || []);
    const bodySrc = [];
    const dBody = dBodyRaw.map((s, si) => ({
      id: 'sec' + (si + 1), n: nn(si), h: s.h,
      blocks: (s.blocks || []).map(b => {
        if (b.k === 'src') bodySrc.push(b);
        const isNames = b.k === 'names';
        return {
          isP: b.k === 'p', isQ: b.k === 'q', isSh: b.k === 'sh', isUl: b.k === 'ul',
          isDl: b.k === 'dl', isSrc: b.k === 'src', isFy: b.k === 'fy', isNames,
          isLinks: b.k === 'links', isTally: b.k === 'tally', isImgs: b.k === 'imgs',
          t: b.t || '', label: b.label || '', rows: b.rows || [],
          imgCols: (b.items || []).length > 1 ? 'var(--c2)' : 'minmax(0,1fr)',
          imgItems: b.k === 'imgs' ? (b.items || []).map(i => ({
            cap: i.cap,
            css: 'url("https://images.unsplash.com/' + i.img + '?w=1600&q=80")',
            go: () => set({ lb: { css: 'url("https://images.unsplash.com/' + i.img + '?w=2400&q=85")', cap: i.cap, kicker: 'Stand-in image · to be replaced' } })
          })) : [],
          namesText: isNames ? (b.items || []).map(i => i.t).join(', ') + '.' : '',
          tallyText: b.k === 'tally' ? (b.items || []).map(i => i.n + ' ' + i.l.toLowerCase()).join(', ') + '.' : '',
          items: isNames ? (b.items || []).map(i => ({
            t: i.t,
            bg: i.flag === 'stalled' ? pal.stalled + '18' : '#f6f7f9',
            bd: i.flag === 'stalled' ? pal.stalled + '55' : '#e4e5e8',
            c: i.flag === 'stalled' ? palT.stalled : '#3b3f45'
          })) : (b.items || []),
          srcUrl: b.u || '', srcLinked: b.k === 'src' && !!b.u, srcPlain: b.k === 'src' && !b.u,
          tHead: splitTail(b.t || '').head, tTail: splitTail(b.t || '').tail
        };
      })
    }));

    const seenCite = {};
    const dCites = dEvSrc.map(e => ({ s: e.s, d: e.d, t: clip(e.t, 104), k: 'Evidence' }))
      .concat(bodySrc.map(b => ({ s: b.pub || b.t, d: b.d || '', t: b.t, k: 'Cited in analysis', u: b.u })))
      .concat((dRel || []).map(r => ({ s: r.s, d: r.d, t: r.t, k: 'Analysis' })))
      .filter(c => { const key = c.s + '|' + c.t; if (seenCite[key]) return false; seenCite[key] = 1; return true; })
      .map((c, i) => {
        const u = c.u || srcUrl(c.s);
        const sp = splitTail(c.s);
        return { n: nn(i), name: c.s, nameHead: sp.head, nameTail: sp.tail,
          type: cType(c.s), date: c.d, desc: c.t, cites: c.k,
          url: u || '', linked: !!u, plain: !u };
      });
    const dPet = PETS.find(p => p.pid === d.id && p.open);
    const dFKey = 'prom:' + d.id; const followingD = !!S.following[dFKey];
    const D_acts = [
      { w: 'Update', pri: true, icon: 'M4 20h4L19 9a2.5 2.5 0 00-3.5-3.5L4 16v4z', d: 'Submit new information, a correction or evidence for review.',
        go: () => set({ anModal: 'update', anStage: 'form', anCaptcha: false, anKind: 'New evidence', anText: '', anSrc: '', anFiles: [], anEmail: '' }) },
      { w: followingD ? 'Following' : 'Follow', icon: 'M18 9a6 6 0 10-12 0c0 5-2 6-2 6h16s-2-1-2-6M10 20a2 2 0 004 0', d: 'Get an email when this status changes.',
        go: () => set({ anModal: 'follow', anStage: 'form', anCaptcha: false, anEmail: '' }) },
      { w: 'Share', icon: 'M14 5h5v5m0-5L10 14M18 14v4a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2h4', d: 'Send this rating to your networks.',
        go: () => set({ anModal: 'share', anShared: '' }) }
    ];

    const D_actsStyled = D_acts.map(a => Object.assign({}, a, a.pri
      ? { bg: '#000000', c: '#FFFFFF', bd: '#000000', iconC: '#FFFFFF', hbg: '#2b2b2b', hbd: '#2b2b2b' }
      : { bg: '#FFFFFF', c: '#121212', bd: '#c9ccd2', iconC: '#6b7078', hbg: '#f6f7f9', hbd: '#121212' }));

    // ---- act now: update / follow / share ----
    const anM = S.anModal, anStage = S.anStage;
    const anUrl = 'promisetracker.africa/p/' + d.id;
    const anMsg = 'Promise: ' + d.t + '. Status: ' + LAB[d.st] + '. Track progress and view the evidence here: ' + anUrl;
    const anEmailV = (S.anEmail || '').trim();
    const anList = (S.followers || {})[dFKey] || [];
    const uOk = (S.anText || '').trim().length > 8 && S.anCaptcha;
    const fOk = /.+@.+\..+/.test(anEmailV) && S.anCaptcha;
    const copyTxt = (t) => { try { navigator.clipboard.writeText(t); } catch (err) {} };
    const shareNotes = {
      WhatsApp: 'Message copied. WhatsApp opens with the promise title, status and link ready to send.',
      Facebook: 'Facebook share dialog opens with the promise link; the preview below is what it renders.',
      X: 'Post composer opens pre-filled with the message and link.',
      Instagram: 'Instagram has no share URL, so the message is copied for a story sticker or your bio link.',
      'Copy link': 'Link copied to your clipboard.'
    };
    const shareBtn = (n, i1, i2) => ({ n, i1, i2, on: () => { copyTxt(n === 'Copy link' ? anUrl : anMsg); set({ anShared: n }); },
      bd: S.anShared === n ? '#121212' : '#e4e5e8', bg: S.anShared === n ? '#f6f7f9' : '#FFFFFF' });

    // ---- act now ----
    const pets = (sparse ? [] : PETS).filter(p => S.petFilter === 'all' || (S.petFilter === 'open' ? p.open : !p.open));
    const A_pets = pets.map(p => ({
      tag: p.open ? 'Open' : 'Closed', tagBg: p.open ? '#121212' : '#FFFFFF', tagC: p.open ? '#FFFFFF' : '#6b7078', tagBd: p.open ? '#121212' : '#d5d7dc',
      title: p.t, ex: p.ex, link: p.link, linkGo: go({ route: 'detail', promiseId: p.pid }),
      pw: Math.min(100, Math.round(p.sig / p.goal * 100)) + '%', sig: p.sig.toLocaleString('en-US') + ' of ' + p.goal.toLocaleString('en-US') + ' signatures',
      pct: Math.min(100, Math.round(p.sig / p.goal * 100)) + '%', by: p.by,
      cta: p.open ? 'Sign petition' : 'View outcome', ctaBg: p.open ? '#000000' : '#FFFFFF', ctaC: p.open ? '#FFFFFF' : '#000000', ctaBd: p.open ? '#000000' : '#e4e5e8' }));
    const totSig = PETS.reduce((a, p) => a + p.sig, 0);
    const A_stats = sparse
      ? [ { n: '0', l: 'Registered citizens' }, { n: '0', l: 'Petitions' }, { n: '0', l: 'Signatures' } ]
      : [ { n: '12,847', l: 'Registered citizens' }, { n: String(PETS.length), l: 'Petitions' }, { n: totSig.toLocaleString('en-US'), l: 'Signatures' } ];
    const A_chips = [ { k: 'all', label: 'All' }, { k: 'open', label: 'Open' }, { k: 'closed', label: 'Closed' } ].map(c => ({
      label: c.label, go: () => set({ petFilter: c.k }),
      bg: S.petFilter === c.k ? '#000000' : '#FFFFFF', c: S.petFilter === c.k ? '#FFFFFF' : '#6b7078', bd: S.petFilter === c.k ? '#000000' : '#e4e5e8' }));

    // ---- methodology ----
    const M_defs = ORDER.map(k => ({
      label: LAB[k], color: pal[k], def: DEFS[k],
      tag: k === 'inconclusive' ? 'Default status' : null
    }));

    return {
      // header / nav
      goHome, goCountry, goAct, goMeth, goAbout, goAboutProject, goAboutTeam, goAboutPartners, goPromNav, scrollToCountries,
      SR_isOpen: S.searchOpen, SR_q: S.sq, SR_ref: searchRef,
      SR_open: () => set({ searchOpen: true }),
      SR_close: () => set({ searchOpen: false, sq: '' }),
      SR_type: (e) => set({ sq: e.target.value }),
      SR_key: (e) => {
        if (e.key === 'Escape') set({ searchOpen: false, sq: '' });
        if (e.key === 'Enter') {
          const first = searchHits(S.sq)[0];
          if (first) { set({ searchOpen: false, sq: '' }); nav({ route: 'detail', promiseId: first.id, polId: first.pol }); }
        }
      },
      SR_hits: srHits.slice(0, 6).map(p => {
        const hp = POLS.find(x => x.id === p.pol);
        return { title: p.t, imgCss: 'url("' + imgFor(p) + '")', chipL: LAB[p.st], chipC: palT[p.st],
          who: hp ? hp.n + ' · ' + hp.role : '',
          go: () => { set({ searchOpen: false, sq: '' }); nav({ route: 'detail', promiseId: p.id, polId: p.pol }); } };
      }),
      SR_hasHits: srHits.length > 0,
      SR_noHits: S.sq.trim().length > 0 && srHits.length === 0,
      SR_summary: srHits.length > 6 ? 'Showing 6 of ' + srHits.length + ' matches · press Enter to open the first' : srHits.length + (srHits.length === 1 ? ' match' : ' matches'),
      SR_emptyMsg: 'No promises match “' + S.sq.trim() + '”. Try a sector, an official or a keyword.',
      crumbCountry: r !== 'landing' ? 'Kenya' : null,
      navPc: navOn.proms ? '#000000' : '#5c5c5c', navPb: navOn.proms ? '#000000' : 'transparent',
      navAc: navOn.act ? '#000000' : '#5c5c5c', navAb: navOn.act ? '#000000' : 'transparent',
      navMc: navOn.meth ? '#000000' : '#5c5c5c', navMb: navOn.meth ? '#000000' : 'transparent',
      navUc: navOn.about ? '#000000' : '#5c5c5c', navUb: navOn.about ? '#000000' : 'transparent',
      isLanding: r === 'landing', isPols: r === 'pols', isProfile: r === 'profile', isProms: r === 'proms', isDetail: r === 'detail', isAct: r === 'act', isMeth: r === 'meth', isAbout: r === 'about',
      U_isProject: S.aboutTab === 'project', U_isTeam: S.aboutTab === 'team', U_isPartners: S.aboutTab === 'partners',
      U_nav: [
        { key: 'project', label: 'The Project' },
        { key: 'team', label: 'The Team' },
        { key: 'partners', label: 'The Partners' },
        { key: 'meth', label: 'Methodology' },
      ].map(t => ({
        label: t.label,
        wt: S.aboutTab === t.key ? 700 : 500,
        c: S.aboutTab === t.key ? '#121212' : '#8b9099',
        go: t.key === 'meth' ? goMeth : (() => { set({ aboutTab: t.key }); window.scrollTo(0, 0); })
      })),
      U_partners: [
        { n: 'PesaCheck', img: 'url("assets/partner-pesacheck.png")', url: 'https://pesacheck.org' },
        { n: 'The Star', img: 'url("assets/partner-star.png")', url: 'https://www.the-star.co.ke' },
        { n: 'Piga Firimbi', img: 'url("assets/partner-pigafirimbi.png")', url: 'https://pigafirimbi.africauncensored.online' },
        { n: 'DW Akademie', img: 'url("assets/partner-dwakademie.png")', url: 'https://www.dw.com/en/dw-akademie/s-8120' },
        { n: 'Meedan', img: 'url("assets/partner-meedan.png")', url: 'https://meedan.com' },
        { n: 'AWS', img: 'url("assets/partner-aws.png")', url: 'https://aws.amazon.com' },
      ],

      // landing
      L_exTitle: exP.t, L_exImgCss: 'url("' + imgFor(exP) + '")',
      L_exChipL: LAB[exP.st], L_exChipC: palT[exP.st], L_exCat: exP.cat,
      L_exPolName: exPol ? exPol.n : '', L_exPolRole: exPol ? exPol.role + ' · Kenya' : '',
      L_exPolPhotoCss: exPol && exPol.photo ? 'url("' + exPol.photo + '")' : 'none',
      L_exPrev: () => set({ heroIdx: S.heroIdx - 1 }),
      L_exNext: () => set({ heroIdx: S.heroIdx + 1 }),
      L_exDots: exSet.map((p, i) => ({
        bg: i === exI ? '#121212' : '#d5d7dc',
        label: 'Example ' + (i + 1),
        go: () => set({ heroIdx: i })
      })),
      L_exGo: go({ route: 'detail', promiseId: exP.id, polId: exP.pol }),
      L_exAnat: [
        { k: 'The pledge', v: 'Made ' + exP.made + (exP.dl ? ', due ' + exP.dl : '') },
        { k: 'The rating', v: LAB[exP.st] + ' since ' + exP.chg },
        { k: 'The evidence', v: (sparse || !(exP.ev && exP.ev.length) ? 1 : exP.ev.length) + ' dated source' + (!sparse && exP.ev && exP.ev.length > 1 ? 's' : '') + ', last checked ' + exP.rev }
      ],
      L_countries: countries,
      L_legend: ORDER.map(k => ({ label: LAB[k], color: pal[k], tipEnter: tipOn(k), tipLeave: tipOff })),
      L_partners: [
        { n: 'PesaCheck', img: 'url("assets/partner-pesacheck.png")' },
        { n: 'The Star', img: 'url("assets/partner-star.png")' },
        { n: 'Piga Firimbi', img: 'url("assets/partner-pigafirimbi.png")' },
        { n: 'DW Akademie', img: 'url("assets/partner-dwakademie.png")' },
        { n: 'Meedan', img: 'url("assets/partner-meedan.png")' },
        { n: 'AWS', img: 'url("assets/partner-aws.png")' }
      ],

      // politicians
      P_tabs: tabs, P_rows: rows, P_dist, P_feat,
      P_sub: POLS.length + ' elected officials · ' + PROMS.length + ' promises on the record · Updated Jun 28, 2026',

      // profile
      F_init: pol.init, F_photo: pol.photo || null, F_photoCss: pol.photo ? 'url("' + pol.photo + '")' : 'none', F_noPhoto: !pol.photo, F_name: pol.n,
      F_metaTop: pol.role + ' · ' + pol.region + ' · ' + pol.party,
      F_metaBot: 'In office since ' + pol.since + ' · Term ' + pol.term + ' · Last updated ' + pol.upd,
      F_headline: pt + ' promises at a glance',
      F_segs, F_groups, F_legend,
      F_showData: S.showData, F_hideData: !S.showData, F_dataLabel: S.showData ? 'Hide data' : 'Show data',
      F_dataChev: S.showData ? 'rotate(180deg)' : 'none',
      F_dataToggle: () => set({ showData: !S.showData }),
      F_keyTitle: key ? key.t : '', F_keyWhy: key && key.why ? key.why : (key ? key.ex : ''),
      F_keyImgCss: key ? 'url("' + imgFor(key) + '")' : 'none',
      F_keyStatus: key ? LAB[key.st] : '', F_keyColor: key ? palT[key.st] : '#121212', F_keyTerm: 'Term ' + pol.term,
      F_keyGo: key ? go({ route: 'detail', promiseId: key.id }) : () => {},
      F_latest: latest, F_seeAll: 'See all ' + pt + ' promises →', F_goAll: go({ route: 'proms', polId: pol.id, fStatus: [], fCats: [], q: '' }),
      F_followL: followingPol ? '✓ Following' : 'Follow updates',
      F_followBg: followingPol ? '#2b2b2b' : '#000000', F_followC: '#FFFFFF', F_followBd: followingPol ? '#2b2b2b' : '#000000',
      F_follow: () => set({ following: Object.assign({}, S.following, { [fKey]: !followingPol }) }),
      F_shareL: S.shared ? 'Copied ✓' : 'Share', F_share: () => { try { navigator.clipboard.writeText(window.location.href); } catch (err) {} set({ shared: true }); },

      // promises db
      R_back: '← ' + pol.n, R_backGo: goProfile,
      R_scope: 'Tracking ' + pol.n + ' · ' + pol.role + ' · Term ' + pol.term + ' · Last updated ' + pol.upd,
      R_q: S.q, R_setQ: (e) => set({ q: e.target.value }),
      R_status, R_cats, R_sorts,
      R_chips: chips, R_hasChips: chips.length > 0,
      R_count: 'Showing ' + results.length + ' of ' + polProms.length + ' promises',
      R_cards, R_empty: results.length === 0,
      R_clear: () => set({ fStatus: [], fCats: [], q: '' }),

      // detail
      D_backGo: go({ route: 'proms', polId: d.pol }),
      D_status: LAB[d.st], D_color: palT[d.st], D_chg: d.chg,
      D_tipEnter: tipOn(d.st), D_tipLeave: tipOff,
      tipShow: !!S.tip, tipLabel: S.tip ? S.tip.label : '', tipDef: S.tip ? S.tip.def : '',
      tipColor: S.tip ? S.tip.color : '#121212', tipMeta: S.tip ? S.tip.meta : null,
      tipTx: S.tip ? 'calc(' + S.tip.x + 'px - 50%)' : '-9999px',
      tipTy: S.tip ? (S.tip.above ? 'calc(' + S.tip.y + 'px - 100% - 12px)' : (S.tip.y + 12) + 'px') : '-9999px',
      D_polName: dPol.n, D_polRole: dPol.role + ' · ' + dPol.region,
      D_polPhotoCss: dPol.photo ? 'url("' + dPol.photo + '")' : 'none',
      D_polGo: go({ route: 'profile', polId: dPol.id }),
      D_imgCss: 'url("' + imgFor(d) + '")', D_imgAlt: d.cat + ': ' + d.t,
      D_imgCap: d.cat + ' · ' + dPol.region,
      D_ex: d.ex, D_hasWhy: !!d.why, D_why: d.why || '',
      D_srcName: dSrcName, D_srcDate: dOrigin.d, D_srcUrl: dSrcUrl || '',
      D_srcLinked: !!dSrcUrl, D_srcUnlinked: !dSrcUrl,
      D_title: d.t, D_actsStyled,

      // act now modals
      AN_open: !!anM, AN_close: () => set({ anModal: null }),
      AN_isUpdate: anM === 'update', AN_isFollow: anM === 'follow', AN_isShare: anM === 'share',
      AN_uForm: anM === 'update' && anStage === 'form', AN_uDone: anM === 'update' && anStage === 'done',
      AN_fForm: anM === 'follow' && anStage === 'form', AN_fDone: anM === 'follow' && anStage === 'done',
      AN_fDup: anM === 'follow' && anStage === 'dup',
      AN_pTitle: d.t, AN_status: LAB[d.st], AN_statusC: palT[d.st], AN_cat: d.cat, AN_url: anUrl, AN_msg: anMsg,
      AN_statusDot: pal[d.st], AN_imgCss: 'url("' + imgFor(d) + '")', AN_ogDesc: clip(d.ex, 120),
      AN_kinds: ['New evidence', 'A correction', 'Status change', 'Something else'].map(k => ({ l: k,
        bg: S.anKind === k ? '#121212' : '#FFFFFF', c: S.anKind === k ? '#FFFFFF' : '#3b3f45', bd: S.anKind === k ? '#121212' : '#d5d7dc',
        on: () => set({ anKind: k }) })),
      AN_text: S.anText, AN_setText: (e) => set({ anText: e.target.value }),
      AN_src: S.anSrc, AN_setSrc: (e) => set({ anSrc: e.target.value }),
      AN_email: S.anEmail, AN_setEmail: (e) => set({ anEmail: e.target.value }),
      AN_pick: (e) => set({ anFiles: Array.prototype.slice.call(e.target.files).map(f => ({ n: f.name })) }),
      AN_files: S.anFiles, AN_hasFiles: (S.anFiles || []).length > 0,
      AN_cap: S.anCaptcha, AN_capToggle: () => set({ anCaptcha: !S.anCaptcha }),
      AN_capMark: S.anCaptcha ? '✓' : '', AN_capBg: S.anCaptcha ? '#121212' : '#FFFFFF', AN_capBd: S.anCaptcha ? '#121212' : '#b9bdc4',
      AN_uBtnBg: uOk ? '#000000' : '#eceef1', AN_uBtnC: uOk ? '#FFFFFF' : '#a1a5ad',
      AN_uSubmit: uOk ? () => set({ anStage: 'done' }) : () => {},
      AN_ref: 'PT-' + d.id.toUpperCase() + '-0431',
      AN_fBtnBg: fOk ? '#000000' : '#eceef1', AN_fBtnC: fOk ? '#FFFFFF' : '#a1a5ad',
      AN_fSubmit: fOk ? () => {
        if (anList.indexOf(anEmailV.toLowerCase()) >= 0) { set({ anStage: 'dup' }); return; }
        set({ followers: Object.assign({}, S.followers, { [dFKey]: anList.concat([anEmailV.toLowerCase()]) }),
          following: Object.assign({}, S.following, { [dFKey]: true }), anStage: 'done' });
      } : () => {},
      AN_fEmailShown: anEmailV,
      AN_fRetry: () => set({ anStage: 'form', anEmail: '', anCaptcha: false }),
      AN_targets: [
        shareBtn('WhatsApp', 'M20.5 11.6a8.5 8.5 0 01-12.7 7.4L3.5 20.5l1.6-4.2A8.5 8.5 0 1120.5 11.6z', 'M8.9 10.1c.5 2.4 2.3 4 4.6 4.5'),
        shareBtn('Facebook', 'M15 3h-3a4 4 0 00-4 4v3H5.5v4H8v7h4v-7h3l.8-4H12V7.6c0-.4.3-.6.7-.6H15z', ''),
        shareBtn('X', 'M4.5 4.5l15 15', 'M19.5 4.5l-15 15'),
        shareBtn('Instagram', 'M7.5 3.5h9a4 4 0 014 4v9a4 4 0 01-4 4h-9a4 4 0 01-4-4v-9a4 4 0 014-4z', 'M12 8.6a3.4 3.4 0 100 6.8 3.4 3.4 0 000-6.8M17.1 6.7h.01'),
        shareBtn('Copy link', 'M10 13a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7L12 5.3', 'M14 11a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7L12 18.7')
      ],
      AN_hasNote: !!S.anShared, AN_note: shareNotes[S.anShared] || '', AN_noteName: S.anShared,

      D_meta: 'Promise made ' + d.made + ' · ' + dPol.n + ', ' + dPol.role,
      D_catC: catC(d.cat), D_catBg: catC(d.cat) + '14',
      D_catGo: go({ route: 'proms', polId: d.pol, fStatus: [], fCats: [d.cat], q: '' }),
      D_term: dPol.term.split(' ')[0],
      D_tlStart: '2022', D_tlEnd: '2027',
      D_madeX: madeX + '%', D_madeL: short(d.made).toUpperCase(),
      D_hasDl: !!dlK, D_dlX: (dlK ? X(dlK) : 0) + '%', D_dlL: d.dl ? d.dl.toUpperCase() : '',
      D_dlT: (dlK ? X(dlK) : 0) < 10 ? 'translateX(-6px)' : ((dlK ? X(dlK) : 0) > 88 ? 'translateX(-100%)' : 'translateX(-50%)'),
      D_dlY: (dlK ? X(dlK) : 0) > 88 ? '24px' : '-22px',
      D_todayX: todayX + '%', D_fillX: madeX + '%', D_fillW: Math.max(0, todayX - madeX) + '%',
      D_ev: dEv, D_hasEv: dEv.length > 0, D_noEv: !dFull,
      D_acts, D_rel: dRel, D_hasRel: dRel.length > 0, D_noRel: dRel.length === 0,
      D_cites: dCites, D_citeCount: dCites.length + (dCites.length === 1 ? ' document' : ' documents'),
      D_body: dBody, D_hasBody: dBody.length > 0, D_noBody: dBody.length === 0,
      D_citeMt: dBody.length > 0 ? '48px' : '0px',
      LB_open: !!S.lb, LB_img: S.lb ? S.lb.css : 'none', LB_cap: S.lb ? S.lb.cap : '',
      LB_kicker: S.lb ? S.lb.kicker : '',
      D_imgGo: () => set({ lb: { css: 'url("' + imgFor(d) + '")', cap: d.cat + ' · ' + dPol.region + ' — ' + d.t, kicker: 'Photo: Unsplash' } }),
      LB_close: () => set({ lb: null }), LB_stop: (e) => e.stopPropagation(),
      D_toc: dBody.map(s => ({ n: s.n, h: s.h, href: '#' + s.id })),
      D_bodyMeta: dBody.length + ' sections · reviewed ' + d.rev,
      D_cat: d.cat, D_more: dMore,
      D_moreAllGo: go({ route: 'proms', polId: d.pol, fStatus: [], fCats: [d.cat], q: '' }),

      // act
      A_ways: [
        // Connect + Petition removed for Phase 1 (return with Act Now)
        { w: 'Follow', d: 'Get alerts the moment a status changes.', bd: '1px solid #ededf0' },
        { w: 'Update', d: 'Submit evidence our researchers should see.', bd: '1px solid #ededf0' },
        { w: 'Share', d: 'Put a rating in front of your networks.', bd: 'none' }
      ],
      A_stats, A_chips, A_pets, A_empty: A_pets.length === 0,

      // methodology
      M_steps: [
        { n: '01', t: 'Capture', d: 'Every pledge is sourced verbatim from manifestos, speeches and gazette notices, and logged with its date and context.' },
        { n: '02', t: 'Verify', d: 'Researchers gather budgets, tenders, site records and partner fact-checks as dated, linkable evidence.' },
        { n: '03', t: 'Rate', d: 'An editorial panel weighs the evidence and assigns one of six statuses. No single reporter rates alone.' },
        { n: '04', t: 'Review', d: 'Ratings are living judgements: every change is dated, cited and kept in the public log.' }
      ],
      M_defs,

      // subscribe
      subVal: S.subVal, setSub: (e) => set({ subVal: e.target.value }),
      subGo: () => { if (S.subVal.trim()) set({ subDone: true }); },
      subDone: S.subDone, subOpen: !S.subDone
    };
  }
