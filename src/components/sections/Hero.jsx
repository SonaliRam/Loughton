import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import Button from "../ui/Button";
import heroImage from "../../assets/images/homepage-desktop-banner.webp";

function Hero() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(sectionRef.current);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("[data-hero='bg']", { scale: 1.08, duration: 1.8, ease: "power2.out" }, 0)
        .from("[data-hero='heading']", { y: 40, opacity: 0, duration: 0.9 }, 0.15)
        .from("[data-hero='text']", { y: 24, opacity: 0, duration: 0.8 }, 0.45)
        .from("[data-hero='cta']", { y: 20, opacity: 0, duration: 0.7, stagger: 0.12 }, 0.7);
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[560px] items-center overflow-hidden md:min-h-[540px] lg:min-h-[620px] xl:min-h-[42.5625rem]"
    >
      <img
        data-hero="bg"
        src={heroImage}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full max-md:object-cover lg:object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-white via-white/70 to-transparent md:from-white/90 md:via-white/40"
      />

      <div className="page-width-small py-14 md:py-20 md:max-lg:m-0 md:max-lg:w-[66%] lg:m-0 lg:w-[55%]">
        <h1 id="hero-heading" data-hero="heading" className="max-w-[40rem]">
          Healthcare <br className="hidden md:inline" />
          that finally has <br className="hidden md:inline" />
          time for you.
        </h1>

        <p data-hero="text" className="text-lead mt-5 text-body xl:max-w-[55rem] min-[1920px]:max-w-[45rem] md:mt-6">
          Premium, unhurried general practice in the heart of Loughton. Rapid access
          appointments. 30-minute new GP consultations. Doctors who truly listen.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap md:mt-10 md:gap-6">
          <Button
            to="/services"
            size="lg"
            className="w-full sm:w-auto"
            data-hero="cta"
          >
            Explore Our Services
          </Button>
          <Button
            to="/booking"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
            data-hero="cta"
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
