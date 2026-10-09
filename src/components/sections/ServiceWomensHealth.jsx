import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { womensHealth } from "../../data/servicePage";

// service 04: image in the middle, text on either side
function ServiceWomensHealth() {
  const { id, number, title, pill, left, right, chips } = womensHealth;
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(sectionRef.current);

    mm.add(
      {
        desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { desktop } = context.conditions;

        gsap.from("[data-womens='word']", {
          yPercent: 115,
          duration: 1,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: "[data-womens='title']",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from("[data-womens='intro']", {
          autoAlpha: 0,
          y: 20,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-womens='intro']",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        // the image wipes open from the bottom
        gsap.fromTo(
          "[data-womens='image']",
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%", end: "top 5%", scrub: true },
          }
        );

        // text arrives from both sides on desktop, and rises on smaller screens
        [
          ["[data-womens='left']", -90],
          ["[data-womens='right']", 90],
        ].forEach(([selector, x]) => {
          gsap.from(selector, {
            x: desktop ? x : 0,
            y: desktop ? 0 : 40,
            autoAlpha: 0,
            ease: "none",
            scrollTrigger: { trigger: selector, start: "top 92%", end: "top 55%", scrub: true },
          });
        });

        gsap.from("[data-womens='chip']", {
          autoAlpha: 0,
          y: 16,
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-womens='chips']",
            start: "top 94%",
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
      className="scroll-mt-24 overflow-x-clip bg-white service-section xl:scroll-mt-32"
    >
      <div className="page-width-small">
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <p data-womens="intro" className="label mb-5">
            {number} / Service
          </p>

          <h2 id={`${id}-heading`} data-womens="title">
            {title.split(" ").map((word, index) => (
              <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
                <span data-womens="word" className="inline-block">
                  {word}
                  {" "}
                </span>
              </span>
            ))}
          </h2>

          <p data-womens="intro" className="mt-5">
            <span className="inline-block rounded-box bg-tan px-4 py-1 text-small text-white">
              {pill}
            </span>
          </p>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[1fr_380px_1fr] lg:gap-16">
          <div data-womens="left" className="order-2 space-y-4 lg:order-1">
            {left.map((text) => (
              <p key={text.slice(0, 24)} className="text-muted">
                {text}
              </p>
            ))}
          </div>

          <div className="order-1 mx-auto w-full max-w-[380px] lg:order-2 lg:max-w-none">
            <div
              data-womens="image"
              className="relative aspect-[3/4] w-full overflow-hidden rounded-box border border-tan bg-cream"
            >
              <span aria-hidden="true" className="label absolute inset-0 grid place-items-center text-tan/70">
                Image
              </span>
            </div>
          </div>

          <div data-womens="right" className="order-3 space-y-4">
            {right.map((text) => (
              <p key={text.slice(0, 24)} className="text-muted">
                {text}
              </p>
            ))}
          </div>
        </div>

        <ul data-womens="chips" className="mt-10 flex flex-wrap justify-center gap-2">
          {chips.map((chip) => (
            <li
              key={chip}
              data-womens="chip"
              className="rounded-box border border-tan/60 px-3.5 py-1 text-small text-muted"
            >
              {chip}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ServiceWomensHealth;
