import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { earWax } from "../../data/servicePage";

// service 06: text on the left, a square image that grows and straightens as it scrolls in
function ServiceEarWax() {
  const { id, number, title, pill, paragraphs, chips } = earWax;
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(sectionRef.current);

    mm.add(
      {
        desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { desktop } = context.conditions;

        gsap.from("[data-ear='word']", {
          yPercent: 115,
          duration: 1,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: "[data-ear='title']",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        // text slides in from the right on desktop, and rises on mobile
        gsap.from("[data-ear='line']", {
          x: desktop ? 60 : 0,
          y: desktop ? 0 : 30,
          autoAlpha: 0,
          stagger: 0.12,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", end: "top 25%", scrub: true },
        });

        gsap.fromTo(
          "[data-ear='image']",
          { scale: 0.7, rotate: -12, autoAlpha: 0.2 },
          {
            scale: 1,
            rotate: 0,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-ear='image']", start: "top 95%", end: "top 55%", scrub: true },
          }
        );
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-24 overflow-clip bg-white py-20 xl:scroll-mt-32 xl:py-32"
    >
      <div className="page-width-small grid items-center gap-10 md:grid-cols-2 md:gap-16 xl:gap-24">
        <div>
          <p data-ear="line" className="label mb-5">
            {number} / Service
          </p>

          <h2 id={`${id}-heading`} data-ear="title">
            {title.split(" ").map((word, index) => (
              <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
                <span data-ear="word" className="inline-block">
                  {word}
                  {" "}
                </span>
              </span>
            ))}
          </h2>

          <p data-ear="line" className="mt-4">
            <span className="inline-block rounded-full bg-tan px-4 py-1 text-small text-white">
              {pill}
            </span>
          </p>

          <div className="mt-7 space-y-4">
            {paragraphs.map((text) => (
              <p key={text.slice(0, 24)} data-ear="line" className="text-muted">
                {text}
              </p>
            ))}
          </div>

          <ul data-ear="line" className="mt-7 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <li key={chip} className="rounded-full border border-tan/60 px-3.5 py-1 text-small text-muted">
                {chip}
              </li>
            ))}
          </ul>
        </div>

        <div
          data-ear="image"
          className="relative mx-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-lg border border-tan bg-cream md:max-w-none"
        >
          <span aria-hidden="true" className="label absolute inset-0 grid place-items-center text-tan/70">
            Image
          </span>
        </div>
      </div>
    </section>
  );
}

export default ServiceEarWax;
