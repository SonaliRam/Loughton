import { useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

// reveals cards in small groups as they scroll in, with the image settling back to full size
function useBatchReveal(scopeRef) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scopeRef.current);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray("[data-card]", scopeRef.current);
      const images = gsap.utils.toArray("[data-card-image]", scopeRef.current);

      gsap.set(cards, { opacity: 0, y: 60 });
      gsap.set(images, { scale: 1.25 });

      ScrollTrigger.batch(cards, {
        start: "top 88%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
          });
          gsap.to(
            batch.map((card) => card.querySelector("[data-card-image]")),
            { scale: 1, duration: 1.4, ease: "power2.out", stagger: 0.12 },
          );
        },
      });
    });

    return () => mm.revert();
    // the scope never changes, so this runs once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useBatchReveal;
