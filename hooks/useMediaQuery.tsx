import { useEffect, useMemo, useState } from "react";

const useMediaQuery = (query: string) => {
  const [match, setMatch] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const onChange = () => setMatch(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);

    return () => mediaQuery.removeEventListener("change", onChange);
  }, [query]);

  return match;
};

export default useMediaQuery;
