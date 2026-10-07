import { useLayoutEffect } from "react";
import { gsap } from "../lib/gsap";

// on mobile the list slides right to left in an endless loop, and pauses while touched
function useMarquee(trackRef, count) {
  useLayoutEffect(() => {
    const track = trackRef.current;
    const mm = gsap.matchMedia(track);

    mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
      let tween;

      const build = () => {
        if (tween) tween.kill();
        gsap.set(track, { x: 0 });
        // the first clone sits exactly one full set away, so the loop has no jump
        const distance = track.children[count].offsetLeft;
        tween = gsap.to(track, {
          x: -distance,
          duration: distance / 45,
          ease: "none",
          repeat: -1,
        });
      };

      const pause = () => tween && tween.pause();
      const play = () => tween && tween.play();

      build();
      track.addEventListener("pointerdown", pause);
      track.addEventListener("pointerup", play);
      track.addEventListener("pointercancel", play);
      window.addEventListener("resize", build);

      return () => {
        if (tween) tween.kill();
        track.removeEventListener("pointerdown", pause);
        track.removeEventListener("pointerup", play);
        track.removeEventListener("pointercancel", play);
        window.removeEventListener("resize", build);
      };
    });

    return () => mm.revert();
    // the list never changes, so this runs once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useMarquee;
