# PromiseTracker — Vite + React + TanStack Router

A working export of the PromiseTracker design prototype as a real front-end app.

Live at **<https://codeforafrica.github.io/promisetracker_redesign/>**.

```bash
pnpm install
pnpm dev      # http://localhost:5173/promisetracker_redesign/
pnpm build    # -> dist/
pnpm preview  # serve dist/ locally
pnpm deploy   # build + publish to the gh-pages branch
```

The dev server runs under the same `/promisetracker_redesign/` base path as the
deployed site, so a broken asset URL shows up locally rather than in production.

`_preview.html` runs the same `src/` files with an in-browser transpiler and a
minimal router shim, so the port can be reviewed without installing anything —
serve the repo root over HTTP (`python3 -m http.server`) and open it, since it
fetches the sources. It is a development harness, not part of the build.

## Routes

| Path | Screen | Notes |
| --- | --- | --- |
| `/` | `screens/Landing` | Hero, worked example, country select |
| `/kenya` | `screens/Officials` | Tracked officials, status distribution |
| `/kenya/officials/$polId` | `screens/Profile` | One official's record |
| `/kenya/officials/$polId/promises` | `screens/Promises` | Filterable promise database |
| `/kenya/promises/$promiseId` | `screens/PromiseDetail` | Rating, timeline, long-form analysis, citations |
| `/act` | `screens/ActNow` | Petitions hub (not linked in the nav yet) |
| `/methodology` | `screens/Methodology` | Six statuses and how ratings are made |
| `/about` | `screens/About` | Project, team, partners |

The route tree is code-based, in `src/router.jsx`. `routes/RootLayout.jsx` is the
root route: header, `<Outlet />`, subscribe strip, footer, and the three global
overlays (status tooltip, image lightbox, update/follow/share modals).

Country is a literal `/kenya` segment because Kenya is the only launched tracker.
When the others go live, change it to `/$countryId` and read the param in
`ValsProvider`.

## How the port is organised

```
src/
  main.jsx              mounts RouterProvider
  router.jsx            route tree
  config.js             statusPalette / sparseData / showComingSoon switches
  routes/RootLayout.jsx root layout + overlays
  screens/*.jsx         one component per route
  components/*.jsx      header, footer, subscribe, tooltip, lightbox, modals
  lib/model.js          data (officials, promises, petitions) + pure helpers
  lib/vals.jsx          ValsProvider, useVals(), and the ported view logic
  lib/sx.js             CSS declaration string -> React style object
  lib/asset.js          public/ URLs prefixed with the deployment base path
  lib/useMediaQuery.js  the CSS breakpoints, readable from JS
  styles/base.css       resets, font stack, responsive custom properties
  styles/hover.css      generated hover rules
public/assets/          logos, partner marks, official photographs
```

**`lib/model.js`** holds the content and every pure helper: date parsing (`P`,
`X`, `short`), status counting (`counts`, `segsFor`), the palettes, category
colours, source URLs, and search. No React.

**`lib/vals.jsx`** is the one stateful piece. `ValsProvider` owns the UI state the
prototype kept in `this.state` (filters, sort, search, follow/share, modal stage,
lightbox, hero index), keeps `polId` / `promiseId` in step with the URL so deep
links work, and computes the flat bag of values and handlers each screen reads
through `useVals()`.

**`lib/sx.js`** exists because the design is authored with inline CSS declaration
strings. `sx('display:flex;gap:14px')` returns the style object React wants, so
the markup keeps the original values verbatim rather than being re-typed by hand.
Results are memoised per string.

**`styles/hover.css`** carries the hover states. Base styles are inline, so hover
rules are generated classes (`hv0`…`hv31`) with `!important` to win over the
inline declarations. Elements that need one carry the class.

## Responsive layout

Because the markup is styled inline, media queries cannot reach it directly.
`styles/base.css` declares the layout numbers as custom properties on `:root` and
redefines them at three breakpoints — 1024px, 900px, 760px — so the JSX carries
`gap:var(--gap)` or `min-width:var(--heromin)` and the breakpoint decides the
value. Adding a responsive rule usually means adding a variable, not a class.

A few places have to change *shape* rather than size — the header nav becomes a
drawer, the officials filter tabs become a dropdown, the profile chart moves its
labels below the bar. Those read the same 760px breakpoint from JS via
`useIsMobile()` in `lib/useMediaQuery.js`, and branch on it.

## Deployment

The site is published to GitHub Pages from the `gh-pages` branch, by hand:

```bash
pnpm deploy
```

That runs `vite build` and pushes `dist/` to `gh-pages` with the `gh-pages`
package. Nothing deploys on push to `main` — publishing is an explicit step.

Three details make a Vite SPA work on Pages, all already set up:

- **Base path.** Pages serves the app from a repo subdirectory, so
  `vite.config.js` sets `base: '/promisetracker_redesign/'`. Vite rewrites asset
  URLs in HTML and CSS, but not ones built as strings in JS — those go through
  `asset()` in `lib/asset.js`. The router reads the same value as its `basepath`.
  Moving to a custom domain at the root means changing `base` to `'/'`; the rest
  follows from it.
- **SPA fallback.** Pages has no rewrite rule, so a deep link like
  `/kenya/officials/ruto` is a genuine 404. A plugin in `vite.config.js` copies
  `index.html` to `404.html` at build time; Pages serves that document, the
  address bar is left intact, and the router picks the URL up. Deep links do
  return a 404 *status* — that is normal for this pattern and does not affect
  rendering.
- **`.nojekyll`.** Branch-served Pages runs Jekyll, which drops files it treats
  as private. The same plugin writes the marker file that turns it off.

The one-time repo setting is Settings → Pages → Source: *Deploy from a branch*,
branch `gh-pages`, folder `/ (root)`.

## What is deliberately still open

- **One shared vals bag.** Every screen calls `useVals()`, which computes values
  for the whole app. That mirrors the prototype exactly; splitting it per route
  (or into route loaders) is the first refactor worth doing.
- **Filter state is not in the URL.** Status/category/sort/search and the
  officials tab live in React state. TanStack Router's `validateSearch` is the
  right home for them, and would make filtered views shareable.
- **The About tabs are component state**, not routes.
- **Forms are UI only.** Update, follow, share, subscribe and petition signing
  validate and show confirmation states; nothing is posted anywhere.
- **Data is a static module.** `lib/model.js` should become an API call behind a
  route loader.
- **Photography is stand-in.** Hero and analysis images are Unsplash
  placeholders, labelled as such in the lightbox.
- **JavaScript, not TypeScript.** The port is mechanical; types can be layered on
  `model.js` first, where the shapes are stable.
