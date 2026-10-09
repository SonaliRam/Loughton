import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { serviceTicker } from "../../data/servicePage";

// service names loop sideways; scrolling speeds the strip up and flips its direction
function ServiceTicker() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(sectionRef.current);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const loop = gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });

      let settle;

      const trigger = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const speed = 1 + Math.min(Math.abs(self.getVelocity()) / 250, 8);
          gsap.to(loop, { timeScale: self.direction * speed, duration: 0.25, overwrite: true });
          clearTimeout(settle);
          settle = setTimeout(() => {
            gsap.to(loop, { timeScale: self.direction, duration: 1, overwrite: true });
          }, 150);
        },
      });

      return () => {
        clearTimeout(settle);
        trigger.kill();
        loop.kill();
      };
    });

    return () => mm.revert();
  }, []);

  // the list is repeated twice so the loop has no jump
  const items = [...serviceTicker, ...serviceTicker];

  return (
    <div ref={sectionRef} aria-hidden="true" className="overflow-hidden bg-ink py-4 text-cream">
      <div ref={trackRef} className="flex w-max will-change-transform">
        {items.map((name, index) => (
          <span
            key={`${name}-${index}`}
            className="font-heading whitespace-nowrap pr-9 text-xl after:ml-9 after:text-[0.8em] after:text-tan after:content-['✦'] md:text-2xl"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ServiceTicker;
