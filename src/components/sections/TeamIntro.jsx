import { useLayoutEffect, useRef } from "react";
import { teamIntro } from "../../data/team";
import { gsap } from "../../lib/gsap";

// a colour block that stands in for a photo until the real photo arrives
function Block({ tone, className, children, ...rest }) {
  return (
    <div className={`absolute overflow-hidden rounded-box ${className}`} {...rest}>
      <div
        data-team-inner
        className={`grid h-full w-full place-items-center text-xs uppercase tracking-[0.22em] ${tone}`}
      >
        {children}
      </div>
    </div>
  );
}

// first section of the Our Team page: text on the left, a layered square image on the right
function TeamIntro() {
  const sectionRef = useRef(null);
  const { label, title, text, doctors, image } = teamIntro;

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(sectionRef.current);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("[data-team-text]", { y: 40, opacity: 0, duration: 1, stagger: 0.12, delay: 0.1 })
        // the large image wipes in from the right and settles from a slight zoom
        .from("[data-team-big]", { clipPath: "inset(0 0 0 100%)", duration: 1.3, ease: "power3.inOut" }, 0.2)
        .from("[data-team-big] [data-team-inner]", { scale: 1.3, duration: 1.8 }, 0.2)
        // the pale block slides out from behind the large image
        .from("[data-team-back]", { x: -60, opacity: 0, duration: 1.1 }, 0.7);

      // the doctor names roll upwards inside the pill, one after the other, and loop
      const names = gsap.utils.toArray("[data-team-name]");
      if (names.length > 1) {
        gsap.set(names, { yPercent: 100, opacity: 1 });
        gsap.set(names[0], { yPercent: 0 });

        const roll = gsap.timeline({ repeat: -1, delay: 1.8 });
        names.forEach((name, index) => {
          const next = names[(index + 1) % names.length];
          roll
            .to(name, { yPercent: -100, duration: 0.7, ease: "power3.inOut" }, "+=2")
            .fromTo(next, { yPercent: 100 }, { yPercent: 0, duration: 0.7, ease: "power3.inOut", immediateRender: false }, "<");
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="team-heading" className="section-space overflow-hidden">
      <div className="page-width-small grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-12 xl:gap-16">
        <div className="lg:py-10">
          <p data-team-text className="label">
            {label}
          </p>
          <h1 id="team-heading" data-team-text className="mt-4 max-w-[44rem]">
            {title}
          </h1>

          <div data-team-text className="mt-6">
            <span className="sr-only">Meet {doctors.join(", ")}</span>
            <span
              aria-hidden="true"
              className="inline-grid overflow-hidden rounded-full bg-[#231e1b] font-heading text-2xl leading-tight text-[#c9bdad] md:text-3xl"
            >
              {doctors.map((name, index) => (
                <span
                  key={name}
                  data-team-name
                  className={`col-start-1 row-start-1 px-8 py-3 text-center md:px-10 md:py-4 ${index === 0 ? "" : "opacity-0"}`}
                >
                  {name}
                </span>
              ))}
            </span>
          </div>

          <p data-team-text className="text-lead mt-6 max-w-[34rem]">
            {text}
          </p>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[40rem] lg:mx-0 lg:justify-self-end">
          <Block data-team-back tone="bg-cream" className="bottom-0 left-0 top-[8%] z-0 w-[92%]" />
          {image ? (
            <img data-team-big src={image} alt="" className="absolute left-[8%] top-0 z-10 h-[92%] w-[92%] rounded-box object-cover" />
          ) : (
            <Block data-team-big tone="bg-tan text-white/80" className="left-[8%] top-0 z-10 h-[92%] w-[92%]">
              Image
            </Block>
          )}
        </div>
      </div>
    </section>
  );
}

export default TeamIntro;
