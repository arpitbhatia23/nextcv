import { useRef, useEffect } from "react";

export const useAutoScroll = (dependency) => {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [dependency]);
  return ref;
};
