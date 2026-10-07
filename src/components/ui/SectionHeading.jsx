import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";

// label, large heading and optional lead text, animated in one smooth sequence
function SectionHeading({ id, label, text, textWidth = "max-w-[56rem]", className = "", children }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(rootRef.current);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: "top 80%", once: true },
      });

      timeline
        .from("[data-sh='label']", { y: 20, opacity: 0, duration: 0.7, ease: "power3.out" })
        .from("[data-sh='title']", { yPercent: 110, duration: 1, ease: "power4.out" }, "-=0.4");

      if (rootRef.current.querySelector("[data-sh='text']")) {
        timeline.from(
          "[data-sh='text']",
          { y: 24, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        );
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={rootRef} className={className}>
      <p data-sh="label" className="label">
        {label}
      </p>

      {/* the wrapper hides the heading until it slides up into place */}
      <div className="-mb-[0.15em] mt-6 overflow-hidden pb-[0.15em] xl:mt-[3.75rem]">
        <h2 id={id} data-sh="title">
          {children}
        </h2>
      </div>

      {text && (
        <p data-sh="text" className={`text-lead mt-6 xl:mt-[2.25rem] ${textWidth}`}>
          {text}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
