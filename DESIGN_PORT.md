# Design port

Source: `09 Hi-Fi Prototype.dc.html` (dc-project: `.dc.html` + `support.js`), with `pt-gradient.js` and `pt-counter.js`.
Process documents (00–07) and `08 Hi-Fi Screens` were not ported; they are design material, not app screens.

## Routes

Both languages carry a prefix: English under `/en`, French under `/fr` (e.g. `/fr/sn`), and `/` redirects to `/en`. The site is a static export for GitHub Pages, which has no server to rewrite an unprefixed path onto `/en`, so every page lives at a real path.

| Route | Source screen | Notes |
|---|---|---|
| `/` | 01 Homepage | Ribbon gradient (WebGL), live reader counter, sticky condensed bar after the hero search scrolls away |
| `/[country]` | 02 Country page | `ke` renders full; `sn`, `ng`, `ci` render the thin (day-one) layout because they have fewer than 20 promises |
| `/[country]/[county]` | 03 County page | Only `ke/nairobi-county` exists in content |
| `/[country]/e/[official]` | 04 Official in office, 05 Official archived | Archived layout when `status: "archived"` |
| `/[country]/p/[promise]` | 06 Promise page | |
| `/[country]/p/[promise]/history` | 07 Rating history | |
| `/[country]/p/[promise]/update` | 12 Submit an update + Update received | The received state replaces the form after a valid submit; `?kind=correction|changed` preselects the type |
| `/topics/[topic]` | 08b Topic page | |
| `/search?q=` | 08 Search | Static search over bundled content |
| `/[country]/officials?title=&sort=` | 09 Officials index | Client-side filters, sort and filter chips |
| `/methodology` | 10 Methodology | |
| `opengraph-image` on `/`, `/[country]`, `/[country]/e/[official]`, `/[country]/p/[promise]` | 11 Share previews | Generated with `next/og` |

## Components

| Component | File | Server/Client | From |
|---|---|---|---|
| SiteHeader, Logo, NavLinks, SearchPill | components/layout/SiteHeader.tsx | Server | `.sh` masthead |
| LangToggle | components/layout/LangToggle.tsx | Client | EN / FR pill |
| StickyBar | components/layout/StickyBar.tsx | Client | fixed bar driven by `data-hero-search` |
| SiteFooter, SubscribeForm, SocialIcons | components/layout/ | Server / Client / Server | partners, subscribe, footer |
| PageShell | components/layout/PageShell.tsx | Server | header + main + footer |
| HomeHero, FeaturedPromise, InFocus, RatingsExplainer, CountryPicker | components/home/ | Server | homepage sections |
| RibbonGradient | components/home/RibbonGradient.tsx | Client | `pt-gradient.js` ribbon mode |
| LiveCounter | components/home/LiveCounter.tsx | Client | `pt-counter.js` |
| CountryHero, Snapshot | components/country/ | Server | country hero, snapshot (full + thin) |
| CountyHero, CountyCard | components/county/ | Server | county hero, homepage county card |
| OfficialCard, OfficialRow, PartyRow, PastRow, PortraitCard, OfficialFeature | components/official/ | Server | the four person-card treatments |
| OfficialHero, KeyPromise, RecordSoFar, RecentChanges, LatestAnalysis | components/official/ | Server | official page |
| ArchivedBanner, ArchivedIntro, ClosingSummary, FinalList | components/official/Archived.tsx | Server | archived official |
| OfficialsIndex | components/official/OfficialsIndex.tsx | Client | officials index table |
| PromiseCard, PromiseRow, PromiseMini | components/promise/ | Server | promise cards |
| PromiseTable | components/promise/PromiseTable.tsx | Client | filterable promise lists (county, official, topic, search) |
| PromiseHero, PromiseFacts, RatingTimeline, EvidenceList, PromiseAnalysis, UpdateTeaser, PromiseContextBar | components/promise/PromiseSections.tsx | Server | promise page |
| CopyCitation | components/promise/CopyCitation.tsx | Client | "Copy citation" |
| UpdateForm | components/promise/UpdateForm.tsx | Client | submit update + received |
| RatingChip, RatingDot, RatingLegend, TierBar, Flag, Photo, PhotoHero, Disclosure, Pill, Text helpers | components/ui/ | Server | shared atoms |

## Tokens

All from the prototype's inline styles (`<helmet><style>` classes `.sn .k .tg .ch .lk .sf .bd`) and repeated literals:
ink `#16181C`, ink-2 `#464A50`, muted `#63666D`, faint `#8E939C`, lines `#D6DAE0 / #E4E7EB / #EAECEF`, surface `#F4F5F7`, rose `#FBEDEB`,
link `#1B4FD8` / hover `#17694E`, verified greens, and the six rating colours. Content column 1040px with a 40px gutter
(`max(40px, calc((100% - 1040px)/2))`) became `Container` (max-w 1120px, px-5 → px-10). Type is Inter via `next/font`.

## Data

`src/content/*` holds typed static data: countries, officials, promises, counties, topics, evidence, promise details (timeline,
history, analysis), methodology copy, homepage picks. UI strings are in `src/i18n/*` as EN/FR dictionaries.
The day-one state is not a toggle: any record with fewer than `PROPORTION_MIN` (20) promises withholds percentages and bars,
lists only non-empty ratings, and uses the single-official feature layout.

## Deviations

- **Prototype controls** (screen picker, Full / Day one, Desktop / Mobile, EN / FR toggles, back button) are presentation and were dropped.
- **Mobile frames** became responsive breakpoints on the same pages rather than separate routes.
- **Thin countries:** the prototype's day-one state shows Kenya with 3 promises. Here Kenya is full and Sénégal, Nigeria and Côte d'Ivoire are thin.
  Nigeria (Abdullahi Musa, Hauwa Bello) and Côte d'Ivoire (Yao Konan) officials and some of their promises are placeholder content;
  Sénégal follows the French mobile screens (Aïssata Diallo).
- **Counts** are stored per rating so bars, percentages and legends are computed. The homepage card for Njeri Mwathi showed "12 kept";
  it now shows "39% kept" like the country page.
- **"What is a promise on this site?"** had no drawn answer; the expanded text is new copy.
- **French copy** for pages the prototype drew only in English is a working translation and needs an editor's review.
  The French footer keeps the shorter "about" text from the French screens.
- **Search** is a simple substring search over bundled content, not a search service.
- **Forms** (subscribe, submit an update) validate and show their success states but do not post anywhere yet (`TODO` in each).
- **Images** are the prototype's Unsplash sample photographs, loaded through `next/image`. Replace with real photography.
- **Footer links** other than Methodology have no pages yet and render as text.
- **Share previews** use the default `next/og` font rather than Inter.
- The scaffold was written by hand (no `pnpm create next-app` in the authoring environment) following the generator's current defaults.

## Country nav

On a country page (and its county, official and promise pages) the desktop nav shows only the current country and Methodology.
Hovering or focusing the current country opens a dropdown of the other countries (CSS `group-hover` / `group-focus-within`, no client JS).
Home, Methodology and Search still list every country. The mobile menu is unchanged.

## Mobile pass

- Below 1152px (`nav:` breakpoint in `globals.css`, CfA's desktop width) the country nav moves into a full-screen menu (`MobileMenu.tsx`) instead of a scrolling strip.
- Header, sticky bar and hero search controls are at least 44px tall on phones; the hero search input is 16px so iOS does not zoom.
- Fixed: the country picker bled 2px past the phone gutter; auto-fit grids with 230–255px minimums now cap at `min(100%, …)`; hero stat numbers step down to 30px under 400px; filter selects can no longer grow past the screen; search place cards show a full-width photo on phones.
