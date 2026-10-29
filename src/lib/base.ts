/** The deployment prefix, mirrored from next.config.ts.
 *  Link and Image add it on their own; raw <form action> and <a href> do not. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBase(path: string): string {
  return basePath + path;
}
