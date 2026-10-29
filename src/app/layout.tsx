import type { ReactNode } from "react";

// The real root layout is app/[locale]/layout.tsx. This file only exists so app/not-found.tsx has a parent.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
