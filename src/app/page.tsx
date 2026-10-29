import type { Metadata } from "next";
import { withBase } from "@/lib/base";

/* Every page lives under a locale prefix, so the root is a hop to English.
   A static export has no server to redirect with, which is why this is a real
   page carrying its own document rather than a call to redirect(). */
const home = withBase("/en/");

export const metadata: Metadata = {
  title: "PromiseTracker",
  alternates: { canonical: home },
};

export default function RootRedirect() {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content={"0; url=" + home} />
        <script dangerouslySetInnerHTML={{ __html: `location.replace(${JSON.stringify(home)} + location.search + location.hash)` }} />
      </head>
      <body>
        <a href={home}>PromiseTracker</a>
      </body>
    </html>
  );
}
