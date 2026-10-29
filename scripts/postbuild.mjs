/* Branch-served Pages runs Jekyll, which drops _next and any other
   underscore-prefixed path. The marker file turns it off. */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const out = resolve(process.cwd(), "out");
mkdirSync(out, { recursive: true });
writeFileSync(resolve(out, ".nojekyll"), "");
