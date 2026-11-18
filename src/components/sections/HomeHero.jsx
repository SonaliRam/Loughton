import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import heroImage from "../../assets/images/homepage_desktop.webp";
import heroMobileImage from "../../assets/images/homepage_phone.webp";

// image-only banner at the top of the home page, no visible text
function HomeHero() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(sectionRef.current);

    // no movement for people who turned off animations on their device
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const image = "[data-hero='image']";

      // on load the photo settles from a slight zoom, it always fills the banner so no background shows
      gsap.from(image, { scale: 1.25, duration: 1.8, ease: "power3.out" });

      // while scrolling past, the photo zooms in gently, so it never leaves a gap at the edges
      gsap.fromTo(image, { scale: 1 }, {
        scale: 1.1,
        immediateRender: false,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="home-heading"
      className="relative w-full overflow-hidden aspect-[900/1200] md:aspect-[2560/1000]"
    >
      {/* hidden on screen but read by search engines and screen readers, so the page keeps its main heading */}
      <h1 id="home-heading" className="sr-only">
        Loughton Private GP, premium private GP care in Loughton
      </h1>

      <div data-hero="frame" className="absolute inset-0 overflow-hidden">
        <picture>
          <source media="(max-width: 767px)" srcSet={heroMobileImage} />
          <img
            data-hero="image"
            src={heroImage}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full origin-center object-cover will-change-transform"
          />
        </picture>
      </div>
    </section>
  );
}

export default HomeHero;
