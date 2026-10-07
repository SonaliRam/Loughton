import { useLayoutEffect } from "react";
import { gsap } from "../lib/gsap";

// fades and lifts the matching items in when the section scrolls into view
function useReveal(scopeRef, selector, vars = {}) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scopeRef.current);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(selector, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        ...vars,
        scrollTrigger: {
          trigger: scopeRef.current,
          start: "top 80%",
          once: true,
        },
      });
    });

    return () => mm.revert();
    // the selector and options never change, so this runs once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useReveal;
