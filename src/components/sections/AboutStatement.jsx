import { Fragment, useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";

// a colour block that stands in for a photo until the real photos arrive
function Block({ tone, className, ...rest }) {
  return (
    <div aria-hidden="true" className={`absolute overflow-hidden rounded-box ${className}`} {...rest}>
      <div
        data-statement-inner
        className={`grid h-full w-full place-items-center text-xs uppercase tracking-[0.22em] ${tone}`}
      >
        Image
      </div>
    </div>
  );
}

// "flip" mirrors the whole layout, so the images sit on the left and the text on the right
function AboutStatement({ id, content, flip = false, tones }) {
  const sectionRef = useRef(null);
  const { title, text } = content;
  const words = text.split(" ");

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(sectionRef.current);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const side = flip ? -1 : 1;
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
      });

      tl.from("[data-statement-title]", { y: 30, opacity: 0, duration: 0.8 })
        .from("[data-statement-word]", { y: 14, opacity: 0, duration: 0.6, stagger: 0.025 }, "-=0.4")
        .from("[data-statement-line]", { scaleX: 0, duration: 1, ease: "power2.inOut" }, "<")
        // the large image wipes in from its own side and settles from a slight zoom
        .from(
          "[data-statement-big]",
          { clipPath: side === 1 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)", duration: 1.3, ease: "power3.inOut" },
          0.1,
        )
        .from("[data-statement-big] [data-statement-inner]", { scale: 1.3, duration: 1.8 }, 0.1)
        // the offset block slides out from behind the large image
        .from("[data-statement-back]", { x: -70 * side, opacity: 0, duration: 1.1 }, 0.6)
        // the small image rises up over the corner
        .from(
          "[data-statement-small]",
          { y: 60, opacity: 0, clipPath: "inset(100% 0 0 0)", duration: 1.1, ease: "power3.inOut" },
          0.8,
        );
    });

    return () => mm.revert();
  }, [flip]);

  return (
    <section ref={sectionRef} aria-labelledby={id} className="section-space overflow-hidden">
      <div className="page-width-small grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className={`relative lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
          <h2 id={id} data-statement-title>
            {title}
          </h2>
          <p className="text-lead mt-5 max-w-[36rem]">
            {words.map((word, index) => (
              <Fragment key={index}>
                <span data-statement-word className="inline-block">
                  {word}
                </span>{" "}
              </Fragment>
            ))}
          </p>
       
        </div>

        <div className={`relative aspect-[7/6] w-full lg:col-span-7 ${flip ? "lg:order-1 lg:col-start-1" : ""}`}>
          <Block
            data-statement-back
            tone="bg-cream"
            className={`top-[9%] z-0 h-[78%] w-[62%] ${flip ? "left-0" : "right-0"}`}
          />
          <Block
            data-statement-big
            tone={tones.big}
            className={`top-0 z-10 h-[78%] w-[62%] ${flip ? "left-[6%]" : "right-[6%]"}`}
          />
          <Block
            data-statement-small
            tone={tones.small}
            className={`bottom-0 z-20 h-[48%] w-[48%] ${flip ? "right-0" : "left-0"}`}
          />
        </div>
      </div>
    </section>
  );
}

export default AboutStatement;
