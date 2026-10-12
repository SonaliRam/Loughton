import { useLayoutEffect, useRef } from "react";
import { contactLocation } from "../../data/contact";
import { gsap, ScrollTrigger } from "../../lib/gsap";

function ContactLocation() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(sectionRef.current);

    // the dark background fills from left to right on desktop and from top to bottom on mobile
    mm.add(
      { desktop: "(min-width: 1024px)", mobile: "(max-width: 1023px)", reduce: "(prefers-reduced-motion: reduce)" },
      (context) => {
        const { desktop, reduce } = context.conditions;
        if (reduce) return;

        // the fill plays as the section comes into view while scrolling down and stays filled when scrolling up
        const fill = gsap.fromTo(
          "[data-fill]",
          {
            scaleX: desktop ? 0 : 1,
            scaleY: desktop ? 1 : 0,
            transformOrigin: desktop ? "left center" : "center top",
          },
          { scaleX: 1, scaleY: 1, duration: 1.4, ease: "power3.inOut", paused: true },
        );

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom top",
          onEnter: () => fill.restart(),
          onEnterBack: () => fill.progress(1),
          onLeaveBack: () => fill.progress(0),
        });
      },
    );

    return () => mm.revert();
  }, []);

  const { label, name, address, text, steps, parkingUrl, mapSrc } = contactLocation;

  return (
    <section ref={sectionRef} aria-labelledby="location-heading" className="section-space relative overflow-hidden">
      <div data-fill className="absolute inset-0 bg-[#231e1b]" aria-hidden="true" />
      <div className="page-width-small relative grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="label">
            {label}
          </p>
          <h2 id="location-heading" className="mt-4 text-white">
            {name}
          </h2>
          <address className="text-lead mt-4 not-italic text-white">
            {address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <p className="mt-5 max-w-[34rem] text-white/75">
            {text}
          </p>

          <ol className="mt-7 grid gap-5">
            {steps.map((step, index) => (
              <li key={step} className="grid grid-cols-[2.5rem_1fr] items-start gap-3">
                <span className="font-heading text-2xl leading-none text-tan">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-white/75">{step}</span>
              </li>
            ))}
          </ol>

          {parkingUrl ? (
            <a
             
              href={parkingUrl}
              className="text-ui mt-7 inline-block text-white underline underline-offset-4 hover:text-tan"
            >
              Parking directions
            </a>
          ) : null}
        </div>

        <div
         
          className="relative aspect-[4/3] overflow-hidden rounded-box border border-white/20 bg-white lg:aspect-auto lg:h-[26rem]"
        >
          <iframe
            title="Map showing Loughton Private GP, 110 High Road, Loughton"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>
    </section>
  );
}

export default ContactLocation;
