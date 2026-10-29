# PromiseTracker

Next.js 16 (App Router), strict TypeScript, Tailwind CSS v4.

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # static export into out/
```

- Both languages carry a prefix: English at `/en`, French at `/fr`. `/` redirects to `/en`.
- Content lives in `src/content`, interface strings in `src/i18n`.
- See `DESIGN_PORT.md` for the route map, component inventory and what still needs real data.

## Deployment

The site is a static export (`output: "export"` in `next.config.ts`) served by GitHub
Pages at <https://codeforafrica.github.io/promisetracker_redesign/>. Pushing to `main`
runs `.github/workflows/deploy.yml`, which builds with
`NEXT_PUBLIC_BASE_PATH=/promisetracker_redesign` and publishes `out/`.

Enable it once under **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Because there is no server at runtime:

- URLs that depend on a query string (`/search?q=`, the officials filters, the update
  form's `?kind=`) read it in the browser rather than on the server.
- Images are unoptimized, so `next/image` ships the originals.
- `basePath` comes from `NEXT_PUBLIC_BASE_PATH`; local dev leaves it empty and runs at
  the root. A move to a custom domain means dropping it from the workflow.
- Social card URLs resolve against `metadataBase` (promisetracker.org), not the Pages
  host, so they only point at real images once the site lives on that domain.
