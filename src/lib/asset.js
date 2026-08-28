/* Files in public/ are served from the deployment's base path, which is a repo
   subdirectory on GitHub Pages ('/promisetracker_redesign/') and '/' elsewhere.
   Vite rewrites asset URLs it can see in HTML and CSS, but not ones built as
   strings in JS, so those go through here. */
const BASE = import.meta.env.BASE_URL;

export const asset = (path) => BASE + String(path).replace(/^\/+/, '');

/* Convenience for the background-image strings the design uses. */
export const assetUrl = (path) => `url("${asset(path)}")`;
