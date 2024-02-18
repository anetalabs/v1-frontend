import { useEffect, useRef, useState } from "react";

export default function useVisible(initialVisibility: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(initialVisibility);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !(ref.current as any).contains(event.target)) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  return { ref, visible, setVisible };
}
