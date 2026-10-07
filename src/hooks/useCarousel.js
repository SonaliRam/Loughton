import { useCallback, useEffect, useRef, useState } from "react";

const mobileQuery = "(max-width: 767px)";

// one card at a time, moves on by itself until the visitor touches it
// mobileOnly keeps the slider for phones, otherwise it runs on every screen
function useCarousel(trackRef, count, { delay = 3000, mobileOnly = true } = {}) {
  const [active, setActive] = useState(0);
  const stopped = useRef(false);

  const getStep = useCallback(() => {
    const items = trackRef.current.children;
    return items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : items[0].offsetWidth;
  }, [trackRef]);

  const goTo = useCallback(
    (index) => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      trackRef.current.scrollTo({
        left: index * getStep(),
        behavior: reduce ? "auto" : "smooth",
      });
    },
    [getStep, trackRef],
  );

  const stop = useCallback(() => {
    stopped.current = true;
  }, []);

  useEffect(() => {
    const track = trackRef.current;

    const onScroll = () => {
      setActive(Math.min(count - 1, Math.max(0, Math.round(track.scrollLeft / getStep()))));
    };

    const timer = setInterval(() => {
      if (stopped.current) return;
      if (mobileOnly && !window.matchMedia(mobileQuery).matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const current = Math.round(track.scrollLeft / getStep());
      goTo(current >= count - 1 ? 0 : current + 1);
    }, delay);

    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("pointerdown", stop);
    track.addEventListener("touchstart", stop, { passive: true });

    return () => {
      clearInterval(timer);
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("pointerdown", stop);
      track.removeEventListener("touchstart", stop);
    };
  }, [count, delay, mobileOnly, getStep, goTo, stop, trackRef]);

  return { active, goTo, stop };
}

export default useCarousel;
