import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import Button from "./Button";

// tan bar that wipes in from the left, with the text following
function ServiceBar({ title, list }) {
  const barRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(barRef.current);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: barRef.current, start: "top 90%", once: true },
      });

      timeline
        .from(barRef.current, {
          clipPath: "inset(0% 100% 0% 0%)",
          duration: 1,
          ease: "power3.inOut",
        })
        .from(
          "[data-bar]",
          { y: 18, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.1 },
          "-=0.5",
        );
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={barRef}
      className="flex flex-col gap-5 rounded-box bg-tan px-6 py-6 md:flex-row md:items-center md:justify-between md:gap-8 xl:px-7 xl:py-6"
    >
      <div>
        <p data-bar className="text-ui font-medium text-white">
          {title}
        </p>
        <p data-bar className="text-ui mt-2 text-white">
          {list}
        </p>
      </div>

      <div data-bar className="shrink-0">
        <Button to="/booking" variant="light">
          Book a consultation
        </Button>
      </div>
    </div>
  );
}

export default ServiceBar;
