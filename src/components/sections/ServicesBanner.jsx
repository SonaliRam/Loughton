import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import Button from "../ui/Button";

function ServicesBanner() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(sectionRef.current);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // intro on load
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-banner='heading']", { y: 40, opacity: 0, duration: 0.9 }, 0.15)
        .from("[data-banner='text']", { y: 24, opacity: 0, duration: 0.8 }, 0.4)
        .from("[data-banner='cta']", { y: 20, opacity: 0, duration: 0.7, stagger: 0.12 }, 0.6);

      // parallax: the image block moves slower than the page
      const scroll = {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };

      gsap.fromTo("[data-banner='bg']", { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: scroll });

      // the text lifts away and fades as you scroll
      gsap.to("[data-banner='content']", {
        y: -60,
        opacity: 0,
        ease: "none",
        scrollTrigger: { ...scroll, start: "20% top" },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="services-banner-heading"
      className="relative isolate flex h-[calc(100svh-5rem)] min-h-[32rem] items-center overflow-hidden bg-cream md:h-[calc(100svh-6rem)] xl:h-[calc(100svh-7.9375rem)]"
    >
      {/* placeholder image block, replace with the banner image */}
      <div
        data-banner="bg"
        aria-hidden="true"
        className="absolute inset-x-0 -top-[12%] -z-10 h-[124%] bg-cream will-change-transform"
      />

      <div data-banner="content" className="page-width-small py-14">
        <h1 id="services-banner-heading" data-banner="heading" className="max-w-[44rem]">
          Comprehensive private GP care, all in one place, all on your terms.
        </h1>

        <p data-banner="text" className="text-lead mt-5 max-w-[34rem] text-body md:mt-6">
          Premium, unhurried general practice in the heart of Loughton. Rapid access
          appointments. 30-minute new GP consultations. Doctors who truly listen.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap md:mt-10 md:gap-6">
          <Button to="/booking" size="lg" className="w-full sm:w-auto" data-banner="cta">
            Book a consultation
          </Button>
          <Button
            to="/contact"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
            data-banner="cta"
          >
            Contact the clinic
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ServicesBanner;
