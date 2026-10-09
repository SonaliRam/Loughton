import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "../../lib/gsap";

// on every page change: go to the top, or smooth scroll to the section named in the url (#id)
function ScrollManager() {
  const { hash, key } = useLocation();

  useEffect(() => {
    // start from the top so the scroll always travels the same way
    window.scrollTo({ top: 0, behavior: "instant" });

    if (!hash) return undefined;

    const id = decodeURIComponent(hash.slice(1));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let attempts = 0;
    let timer;

    // the page may not have rendered yet, so look for the section a few times
    const scrollToSection = () => {
      const section = document.getElementById(id);

      if (section) {
        ScrollTrigger.refresh();
        section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        return;
      }

      attempts += 1;
      if (attempts < 20) timer = setTimeout(scrollToSection, 50);
    };

    timer = setTimeout(scrollToSection, 150);

    return () => clearTimeout(timer);
  }, [hash, key]);

  return null;
}

export default ScrollManager;
