import { useState, useEffect, useCallback} from "react";

export default function useWindowSize() {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
    innerWidth: 0,
    outerWidth: 0,
  });
  const updateSize = useCallback(() => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
      innerWidth: window.innerWidth,
      outerWidth: window.outerWidth,
    });
  }, []);
  useEffect(() => {
    window.addEventListener("resize", updateSize);
    window.addEventListener("onload", updateSize);
    updateSize();
    return () => {
      window.removeEventListener("onload", updateSize);
      window.removeEventListener("resize", updateSize);
    };
  }, [updateSize]);
  return size;
}