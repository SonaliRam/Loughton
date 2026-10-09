import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { teleconsultations } from "../../data/servicePage";

// service 08: dark section, text on the left and a rectangle image that rises and straightens
function ServiceTeleconsultations() {
  const { id, number, title, pill, paragraphs, chips } = teleconsultations;
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

        gsap.from("[data-tele='word']", {
          yPercent: 115,
          duration: 1,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: "[data-tele='title']",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from("[data-tele='text']", {
          autoAlpha: 0,
          y: 30,
          ease: "none",
          stagger: 0.2,
          scrollTrigger: { trigger: "[data-tele='body']", start: "top 92%", end: "top 55%", scrub: true },
        });

        gsap.fromTo(
          "[data-tele='image']",
          { y: desktop ? 200 : 120, rotate: 8, scale: 0.84 },
          {
            y: 0,
            rotate: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-tele='image']", start: "top 95%", end: "top 40%", scrub: true },
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
      className="scroll-mt-24 overflow-clip bg-[#231e1b] service-section xl:scroll-mt-32"
    >
      <div className="page-width-small grid items-center gap-12 md:grid-cols-2 md:gap-16 xl:gap-20">
        <div>
          <p className="label mb-5">{number} / Service</p>

          <h2 id={`${id}-heading`} data-tele="title" className="!text-white">
            {title.split(" ").map((word, index) => (
              <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
                <span data-tele="word" className="inline-block">
                  {word}
                  {" "}
                </span>
              </span>
            ))}
          </h2>

          <p className="mt-4">
            <span className="inline-block rounded-box bg-tan px-4 py-1 text-small text-white">
              {pill}
            </span>
          </p>

          <div data-tele="body" className="mt-7 space-y-4">
            {paragraphs.map((text) => (
              <p key={text.slice(0, 24)} data-tele="text" className="!text-[#c9bdad]">
                {text}
              </p>
            ))}
          </div>

          <ul className="mt-7 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <li
                key={chip}
                className="rounded-box border border-tan/50 px-3.5 py-1 text-small !text-[#d8cbb9]"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>

        <div
          data-tele="image"
          className="service-image"
        >
          <span aria-hidden="true" className="label absolute inset-0 grid place-items-center text-tan/70">
            Image
          </span>
        </div>
      </div>
    </section>
  );
}

export default ServiceTeleconsultations;
