import type { NextConfig } from "next";

/* GitHub Pages serves the site from a repo subdirectory, so every built URL has
   to be prefixed. The workflow sets NEXT_PUBLIC_BASE_PATH; local dev leaves it
   empty and runs at the root. If the site moves to a custom domain, drop it. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  /* Pages is a static file host: no Node server, so the whole site is exported
     as HTML at build time. */
  output: "export",
  basePath,
  /* Directory-style URLs (/en/kenya/) map onto Pages' index.html lookup. */
  trailingSlash: true,
  images: {
    /* The optimizer needs a running server; export ships the originals as-is. */
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/**" }],
  },
};

export default nextConfig;
