import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import ImagePlaceholder from "../ui/ImagePlaceholder";

// one service: an image on one side and the text on the other. flip puts the text first
function ServiceSplit({ service }) {
  const { id, number, title, pill, paragraphs, quote, paragraphsAfter = [], chips, flip, image } = service;
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
        const scrub = { trigger: sectionRef.current, start: "top 80%", end: "top 15%", scrub: true };

        // the image opens up from a small rounded shape to the full rectangle
        gsap.fromTo(
          "[data-split='frame']",
          {
            clipPath: desktop
              ? "inset(16% 14% 16% 14% round 220px)"
              : "inset(10% 8% 10% 8% round 90px)",
          },
          { clipPath: "inset(0% 0% 0% 0% round 6px)", ease: "none", scrollTrigger: scrub }
        );
        gsap.fromTo("[data-split='inner']", { scale: 1.3 }, { scale: 1, ease: "none", scrollTrigger: scrub });

        // the image drifts slowly while the section passes
        gsap.fromTo(
          "[data-split='drift']",
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-split='frame']",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        // title words rise out of a mask
        gsap.from("[data-split='word']", {
          yPercent: 115,
          duration: 1,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: "[data-split='title']",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from("[data-split='intro']", {
          autoAlpha: 0,
          y: 20,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-split='intro']",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        // each block of text fades up on its own while scrolling
        gsap.utils.toArray("[data-split='text']").forEach((block) => {
          gsap.from(block, {
            autoAlpha: 0,
            y: 40,
            ease: "none",
            scrollTrigger: { trigger: block, start: "top 92%", end: "top 68%", scrub: true },
          });
        });

        gsap.from("[data-split='chip']", {
          autoAlpha: 0,
          x: -20,
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-split='chips']",
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        });
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-24 bg-white service-section xl:scroll-mt-32"
    >
      <div
        className={`page-width-small grid gap-8 md:items-start md:gap-16 xl:gap-24 ${
          flip ? "md:grid-cols-2 xl:grid-cols-[7fr_5fr]" : "md:grid-cols-2 xl:grid-cols-[5fr_7fr]"
        }`}
      >
        <div className={`md:sticky md:top-32 ${flip ? "md:order-2" : ""}`}>
          <div
            data-split="frame"
            className="service-image"
          >
            <div data-split="inner" className="absolute inset-0">
              <div data-split="drift" className="absolute -inset-[12%]">
                {image ? <ImagePlaceholder src={image} alt="" /> : null}
              </div>
            </div>
            {image ? null : (
              <span
                aria-hidden="true"
                className="label absolute inset-0 grid place-items-center text-tan/70"
              >
                Image
              </span>
            )}
          </div>
        </div>

        <div className={flip ? "md:order-1" : ""}>
          <p data-split="intro" className="label mb-5">
            {number} / Service
          </p>

          <h2 id={`${id}-heading`} data-split="title">
            {title.split(" ").map((word, index) => (
              <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
                <span data-split="word" className="inline-block">
                  {word}
                  {" "}
                </span>
              </span>
            ))}
          </h2>

          <p data-split="intro" className="mt-4">
            <span className="inline-block rounded-box bg-tan px-4 py-1 text-small text-white">
              {pill}
            </span>
          </p>

          <div className="mt-7 space-y-4">
            {paragraphs.map((text) => (
              <p key={text.slice(0, 24)} data-split="text" className="text-muted">
                {text}
              </p>
            ))}

            {quote ? (
              <blockquote
                data-split="text"
                className="border-l-2 border-tan pl-5 font-heading text-xl leading-snug text-ink"
              >
                {quote}
              </blockquote>
            ) : null}

            {paragraphsAfter.map((text) => (
              <p key={text.slice(0, 24)} data-split="text" className="text-muted">
                {text}
              </p>
            ))}
          </div>

          <ul data-split="chips" className="mt-7 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <li
                key={chip}
                data-split="chip"
                className="rounded-box border border-tan/60 px-3.5 py-1 text-small text-muted"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ServiceSplit;
