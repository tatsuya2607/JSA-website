import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router keeps the previous scroll position across route changes, so
// navigating (e.g. Home → Events) could land mid-page. Reset to the top on
// path change, but leave hash links alone so anchor scrolling still works.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
