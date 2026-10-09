import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import Button from "../ui/Button";
import { serviceCta } from "../../data/servicePage";
import { siteInfo } from "../../data/site";

// closing section: tan background with a standard button
function ServiceCta() {
  const { eyebrow, title, text, button, visit } = serviceCta;
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(sectionRef.current);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-cta='word']", {
        yPercent: 115,
        duration: 1,
        ease: "power4.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: "[data-cta='title']",
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="book"
      aria-labelledby="service-cta-heading"
      className="overflow-clip bg-tan py-20 text-center xl:py-32"
    >
      <div className="page-width-small">
        <p className="label !text-white/85">{eyebrow}</p>

        <h2
          id="service-cta-heading"
          data-cta="title"
          className="mx-auto mt-4 max-w-[46rem] !text-white"
        >
          {title.split(" ").map((word, index) => (
            <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
              <span data-cta="word" className="inline-block">
                {word}
                {" "}
              </span>
            </span>
          ))}
        </h2>

        <p className="mx-auto mb-8 mt-5 max-w-[34rem] !text-white">{text}</p>

        <Button to="/booking" variant="light" size="lg">
          {button}
        </Button>

        <dl className="mx-auto mt-14 grid max-w-[56rem] gap-8 border-t border-white/30 pt-10 text-center md:grid-cols-3 md:gap-10">
          <div>
            <dt className="label !text-white/85">Call</dt>
            <dd className="mt-2">
              <a href={siteInfo.phoneLink} className="!text-white underline-offset-4 hover:underline">
                {siteInfo.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="label !text-white/85">Email</dt>
            <dd className="mt-2 break-words">
              <a href={`mailto:${siteInfo.email}`} className="!text-white underline-offset-4 hover:underline">
                {siteInfo.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="label !text-white/85">Visit</dt>
            <dd className="mt-2 !text-white">{visit}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

export default ServiceCta;
