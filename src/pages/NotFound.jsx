import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

function NotFound() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(sectionRef.current);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(
        "[data-nf='number']",
        { yPercent: 30, opacity: 0, duration: 1.1, ease: "power4.out" },
        0,
      )
        .from(
          "[data-nf='fade']",
          { y: 24, opacity: 0, duration: 0.8, stagger: 0.1 },
          0.35,
        );
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      {/* react 19 moves these tags into the page head; noindex keeps this page out of Google */}
      <title>Page Not Found | Loughton Private GP</title>
      <meta name="robots" content="noindex" />

      <section
        ref={sectionRef}
        aria-labelledby="not-found-heading"
        className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden md:min-h-[calc(100svh-6rem)] xl:min-h-[calc(100svh-7.9375rem)]"
      >
        <div className="page-width-small section-space text-center">
          {/* large number, decorative only because the heading below says the same */}
          <p
            data-nf="number"
            aria-hidden="true"
            className="select-none font-heading text-[7.5rem] leading-none text-tan [text-shadow:6px_3px_0px_#60492b] md:text-[11rem] xl:text-[15rem]"
          >
            404
          </p>

          <p data-nf="fade" className="label mt-6 md:mt-8">
            Page not found
          </p>

          <h1
            id="not-found-heading"
            data-nf="fade"
            className="mx-auto mt-4 max-w-[44rem] [text-shadow:1px_0px_0px_#3a3838] text-tan"
          >
            Sorry, we couldn’t find that page.
          </h1>

          <p
            data-nf="fade"
            className=" mx-auto mt-5 md:mt-6"
          >
            The page may have moved, or the link may be out of date. Let us help
            you get where you need to be.
          </p>
        </div>
      </section>
    </>
  );
}

export default NotFound;
