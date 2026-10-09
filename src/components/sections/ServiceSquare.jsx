import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";

// an image that opens from a small rounded shape as it scrolls in. flip puts the image on the left
function ServiceSquare({ service, flip = false }) {
  const { id, number, title, pill, paragraphs, chips } = service;
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
          x: desktop ? (flip ? -60 : 60) : 0,
          y: desktop ? 0 : 30,
          autoAlpha: 0,
          stagger: 0.12,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", end: "top 25%", scrub: true },
        });

        // the image opens from a small rounded shape to the full rectangle
        const open = { trigger: "[data-ear='image']", start: "top 90%", end: "top 30%", scrub: true };

        gsap.fromTo(
          "[data-ear='image']",
          {
            clipPath: desktop
              ? "inset(16% 14% 16% 14% round 220px)"
              : "inset(10% 8% 10% 8% round 90px)",
          },
          { clipPath: "inset(0% 0% 0% 0% round 6px)", ease: "none", scrollTrigger: open }
        );
        gsap.fromTo("[data-ear='inner']", { scale: 1.3 }, { scale: 1, ease: "none", scrollTrigger: open });
      }
    );

    return () => mm.revert();
  }, [flip]);

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-24 overflow-clip bg-white service-section xl:scroll-mt-32"
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
            <span className="inline-block rounded-box bg-tan px-4 py-1 text-small text-white">
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
              <li key={chip} className="rounded-box border border-tan/60 px-3.5 py-1 text-small text-muted">
                {chip}
              </li>
            ))}
          </ul>
        </div>

        <div
          data-ear="image"
          className={`service-image ${flip ? "order-first" : ""}`}
        >
          <div data-ear="inner" className="absolute inset-0 grid place-items-center">
            <span aria-hidden="true" className="label text-tan/70">
              Image
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceSquare;
