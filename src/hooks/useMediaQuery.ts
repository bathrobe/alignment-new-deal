import { useState, useEffect } from "react";

/**
 * Simple media query hook for responsive inline styles.
 * Returns true if the query matches.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

/** Convenience: returns true on mobile-sized screens (< 640px) */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 639px)");
}
