import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { about } from "../../data/home";
import useReveal from "../../hooks/useReveal";
import ImagePlaceholder from "../ui/ImagePlaceholder";

function About() {
  const sectionRef = useRef(null);
  useReveal(sectionRef, "[data-reveal]", { y: 36, stagger: 0.12 });

  // image wipes in from the top while the picture settles back to full size
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(sectionRef.current);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const trigger = { trigger: "[data-about='image']", start: "top 85%", once: true };

      gsap.from("[data-about='image']", {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 1.1,
        ease: "power3.inOut",
        scrollTrigger: trigger,
      });
      gsap.from("[data-about='image'] > *", {
        scale: 1.2,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: trigger,
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="page-width-small section-space"
    >
      <p data-reveal className="label">
        {about.label}
      </p>

      <div className="mt-6 grid items-start gap-10 lg:grid-cols-[1.45fr_1fr] lg:gap-16 xl:mt-[3.75rem]">
        <div>
          <h2 id="about-heading" data-reveal className="max-w-[32rem]">
            {about.heading}
          </h2>
          <div className="mt-6 max-w-[45rem] xl:mt-[3.75rem]">
            {about.paragraphs.map((text, index) => (
              <p
                key={text}
                data-reveal
                className={`text-lead ${index > 0 ? "mt-6 xl:mt-[1.875rem]" : ""}`}
              >
                {text}
              </p>
            ))}
          </div>
        </div>

        <div
          data-about="image"
          className="group aspect-[5/3] overflow-hidden rounded-box"
        >
          <ImagePlaceholder className="transition-transform duration-700 ease-out group-hover:scale-105" />
        </div>
      </div>
    </section>
  );
}

export default About;
