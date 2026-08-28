import { useEffect, useState } from 'react';

/* The design is authored with inline styles, so the CSS breakpoints in base.css
   cannot reach markup that has to change shape (nav → drawer, bar chart → list).
   This mirrors the 760px breakpoint in JS for those few cases. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatches(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);

  return matches;
}

/* Same breakpoint as the --gut / --c2 mobile block in styles/base.css. */
export const useIsMobile = () => useMediaQuery('(max-width:760px)');
