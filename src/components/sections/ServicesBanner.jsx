import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import Button from "../ui/Button";
import bannerImage from "../../assets/images/service-page-banner.webp";
import bannerTablet from "../../assets/images/service-page-banner-tablet.webp";
import bannerMobile from "../../assets/images/service-page-banner-mobile-new.webp";

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

      const scroll = {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };

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
      className="relative isolate flex flex-col overflow-hidden bg-tan md:flex-row md:items-center md:aspect-[2048/1240] md:min-h-[32rem] md:py-0 lg:aspect-[2560/1000]"
    >
      <div
        data-banner="bg"
        aria-hidden="true"
        className="relative aspect-[900/1300] w-full bg-cream md:absolute md:inset-0 md:-z-10 md:aspect-auto"
      >
        <picture className="block h-full w-full">
          {/* mobile image fades into cream at the bottom so the text sits over it; tablet has its own; desktop uses the wide one */}
          <source media="(max-width: 767px)" srcSet={bannerMobile} />
          <source media="(max-width: 1023px)" srcSet={bannerTablet} />
          <img
            src={bannerImage}
            alt=""
            fetchPriority="high"
            className="h-full w-full object-cover object-top md:object-[30%_center] lg:object-[75%_center]"
          />
        </picture>
      </div>

      <div data-banner="content" className="page-width-small relative -mt-[74vw] pb-10 md:mt-0 md:!mx-0 md:py-14 md:max-w-[48%] xl:max-w-[55%]">
        <h1 id="services-banner-heading" data-banner="heading" className="max-w-[44rem] !text-[28px] md:!text-[32px] lg:!text-[40px] xl:!text-[52px]">
          Comprehensive private GP care, all in one place, all on your terms.
        </h1>

        <p data-banner="text" className="text-lead mt-5 max-w-[34rem] text-body md:mt-6">
          Premium, unhurried general practice in the heart of Loughton. Rapid access
          appointments. 30-minute new GP consultations. Doctors who truly listen.
        </p>

        <div className="mt-8 flex flex-col gap-4 md:mt-10 md:items-start md:gap-5 xl:flex-row xl:flex-wrap xl:gap-6">
          {/* on the tan mobile background both buttons use the white "light" style, like the other tan sections */}
          <Button
            to="/booking"
            size="lg"
            className="w-full md:w-auto max-md:border-white max-md:bg-transparent max-md:before:bg-white max-md:hover:text-ink max-md:focus-visible:text-ink"
            data-banner="cta"
          >
            Book a consultation
          </Button>
          <Button
            to="/contact"
            variant="outline"
            size="lg"
            className="w-full md:w-auto max-md:border-white max-md:text-white max-md:before:bg-white max-md:hover:text-ink max-md:focus-visible:text-ink"
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
