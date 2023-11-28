import { useState, useEffect } from "react";

function useIntersectionObserver() {
  const [target, setTarget] = useState<Element | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsVisible(entry.isIntersecting);
    });

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [target]);

  return { setTarget, isVisible };
}

export default useIntersectionObserver;
