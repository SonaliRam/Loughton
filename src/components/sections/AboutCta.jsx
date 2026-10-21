import { Fragment, useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import Button from "../ui/Button";
import { aboutCta } from "../../data/about";
import ImageSize from "../ui/ImageSize";

// closing section of the About page, same look as the services closing section: text on the left, an image on the right
function AboutCta() {
  const { eyebrow, title, text, button, media } = aboutCta;
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

      gsap.from("[data-cta='fade']", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from("[data-cta='media']", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="about-cta-heading" className="overflow-clip bg-tan py-20 xl:py-32">
      <div className="page-width-small grid items-center gap-12 md:grid-cols-2 md:gap-16 xl:gap-24">
        <div>
          <p data-cta="fade" className="label !text-white/85">
            {eyebrow}
          </p>

          <h2 id="about-cta-heading" data-cta="title" className="mt-4 max-w-[40rem] !text-white">
            {title.split(" ").map((word, index) => (
              <Fragment key={`${word}-${index}`}>
                <span className="inline-block overflow-hidden align-bottom">
                  <span data-cta="word" className="inline-block">
                    {word}
                  </span>
                </span>{" "}
              </Fragment>
            ))}
          </h2>

          <p data-cta="fade" className="mb-8 mt-5 max-w-[34rem] !text-white">
            {text}
          </p>

          <div data-cta="fade">
            <Button to="/booking" variant="light" size="lg">
              {button}
            </Button>
          </div>
        </div>

        <div data-cta="media" className="service-image">
          {media ? (
            <img src={media} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <ImageSize sizes={[{ device: "All devices", size: "920 × 1150 px" }]} />
          )}
        </div>
      </div>
    </section>
  );
}

export default AboutCta;
