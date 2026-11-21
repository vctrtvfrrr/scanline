import * as React from "react";

function readHash() {
  return window.location.hash.replace(/^#\/?/, "") || "";
}

export function useHashRoute() {
  const route = React.useSyncExternalStore(
    (onChange) => {
      window.addEventListener("hashchange", onChange);
      return () => window.removeEventListener("hashchange", onChange);
    },
    readHash,
  );
  const navigate = React.useCallback((slug: string) => {
    window.location.hash = `/${slug}`;
  }, []);
  return [route, navigate] as const;
}
