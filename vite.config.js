import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

/* GitHub Pages serves this project from a repo subdirectory, so every built URL
   has to be prefixed. Dev runs on the same base to keep the two in step — if the
   site ever moves to a custom domain at the root, this becomes '/'. */
const base = '/promisetracker_redesign/';

const ghPagesExtras = () => ({
  name: 'gh-pages-extras',
  closeBundle() {
    const dir = resolve(process.cwd(), 'dist');
    /* Pages has no SPA rewrite: a deep link like /kenya/officials/ruto is a real
       404. Serving the same document as 404.html hands those URLs back to the
       router, with the address bar left intact. */
    copyFileSync(resolve(dir, 'index.html'), resolve(dir, '404.html'));
    /* Branch-served Pages runs Jekyll, which drops files it considers private. */
    writeFileSync(resolve(dir, '.nojekyll'), '');
  }
});

export default defineConfig({
  base,
  plugins: [react(), ghPagesExtras()],
  server: { port: 5173, open: true }
});
