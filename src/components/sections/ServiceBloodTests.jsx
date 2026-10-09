import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { bloodTests } from "../../data/servicePage";

const iconProps = {
  viewBox: "0 0 52 52",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  className: "block h-[52px] w-[52px] text-tan",
};

// service 03: light layout with a text row, a wide image and three facts that draw themselves in
function ServiceBloodTests() {
  const { id, number, title, pill, paragraphs, priceFrom, priceTo, priceText, reviewText, diagnosticsText, chips } =
    bloodTests;
  const sectionRef = useRef(null);
  const fromRef = useRef(null);
  const toRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(sectionRef.current);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // title words rise out of a mask
      gsap.from("[data-blood='word']", {
        yPercent: 115,
        duration: 1,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: "[data-blood='title']",
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from("[data-blood='intro']", {
        autoAlpha: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-blood='intro']",
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from("[data-blood='text']", {
        autoAlpha: 0,
        y: 36,
        ease: "none",
        stagger: 0.2,
        scrollTrigger: { trigger: "[data-blood='text']", start: "top 92%", end: "top 60%", scrub: true },
      });

      // the wide image opens from the centre like a curtain
      gsap.fromTo(
        "[data-blood='wide']",
        { clipPath: "inset(0 50% 0 50%)" },
        {
          clipPath: "inset(0 0% 0 0%)",
          ease: "none",
          scrollTrigger: { trigger: "[data-blood='wide']", start: "top 90%", end: "top 35%", scrub: true },
        }
      );

      // each fact: line draws across, icon draws itself, text fades up
      gsap.utils.toArray("[data-blood='stat']").forEach((stat) => {
        const draws = stat.querySelectorAll("[data-draw]");

        gsap.fromTo(
          stat.querySelector("[data-blood='line']"),
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: stat, start: "top 92%", end: "top 62%", scrub: true },
          }
        );

        if (draws.length) {
          gsap.set(draws, { strokeDasharray: 1, strokeDashoffset: 1 });
          gsap.to(draws, {
            strokeDashoffset: 0,
            ease: "none",
            stagger: 0.3,
            scrollTrigger: { trigger: stat, start: "top 90%", end: "top 65%", scrub: true },
          });
        }

        gsap.from(stat.querySelectorAll("[data-blood='fade']"), {
          autoAlpha: 0,
          y: 30,
          ease: "none",
          scrollTrigger: { trigger: stat, start: "top 92%", end: "top 66%", scrub: true },
        });
      });

      // the price counts up while scrolling
      const proxy = { value: 0 };
      gsap.to(proxy, {
        value: 1,
        ease: "none",
        onUpdate: () => {
          fromRef.current.textContent = Math.round(priceFrom * proxy.value);
          toRef.current.textContent = Math.round(priceTo * proxy.value);
        },
        scrollTrigger: { trigger: "[data-blood='stats']", start: "top 92%", end: "top 62%", scrub: true },
      });

      return () => {
        if (fromRef.current) fromRef.current.textContent = priceFrom;
        if (toRef.current) toRef.current.textContent = priceTo;
      };
    });

    return () => mm.revert();
  }, [priceFrom, priceTo]);

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-24 overflow-clip bg-white service-section xl:scroll-mt-32"
    >
      <div className="page-width-small">
        <div className="grid gap-8 md:grid-cols-2 md:items-end md:gap-16 xl:gap-20">
          <div>
            <p data-blood="intro" className="label mb-5">
              {number} / Service
            </p>

            <h2 id={`${id}-heading`} data-blood="title">
              {title.split(" ").map((word, index) => (
                <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
                  <span data-blood="word" className="inline-block">
                    {word}
                    {" "}
                  </span>
                </span>
              ))}
            </h2>

            <p data-blood="intro" className="mt-4">
              <span className="inline-block rounded-box bg-tan px-4 py-1 text-small text-white">
                {pill}
              </span>
            </p>
          </div>

          <div className="space-y-4">
            {paragraphs.map((text) => (
              <p key={text.slice(0, 24)} data-blood="text" className="text-muted">
                {text}
              </p>
            ))}
          </div>
        </div>

        <div
          data-blood="wide"
          className="relative mt-12 aspect-[16/10] w-full overflow-hidden rounded-box border border-tan bg-cream md:aspect-[16/8] xl:max-h-[calc(100svh-7.9375rem)]"
        >
          <span aria-hidden="true" className="label absolute inset-0 grid place-items-center text-tan/70">
            Image
          </span>
        </div>

        <div data-blood="stats" className="mt-12 grid md:grid-cols-3 md:gap-10">
          <div data-blood="stat" className="relative py-7">
            <i
              data-blood="line"
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px origin-left bg-tan"
            />
            <p
              data-blood="fade"
              className="font-heading text-5xl leading-none text-ink xl:text-6xl"
              aria-label={`£${priceFrom} to £${priceTo}`}
            >
              £<span ref={fromRef}>{priceFrom}</span>–<span ref={toRef}>{priceTo}</span>
            </p>
            <p data-blood="fade" className="mt-3 text-muted">
              {priceText}
            </p>
          </div>

          <div data-blood="stat" className="relative py-7">
            <i
              data-blood="line"
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px origin-left bg-tan"
            />
            <svg {...iconProps}>
              <circle cx="26" cy="26" r="23" pathLength="1" data-draw />
              <path d="M16 27l7 7 14-15" pathLength="1" data-draw />
            </svg>
            <p data-blood="fade" className="mt-4 text-muted">
              {reviewText}
            </p>
          </div>

          <div data-blood="stat" className="relative py-7">
            <i
              data-blood="line"
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px origin-left bg-tan"
            />
            <svg {...iconProps}>
              <path d="M3 28h12l5-14 8 26 6-18 3 6h12" pathLength="1" data-draw />
            </svg>
            <p data-blood="fade" className="mt-4 text-muted">
              {diagnosticsText}
            </p>
          </div>
        </div>

        <ul className="mt-8 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <li key={chip} className="rounded-box border border-tan/60 px-3.5 py-1 text-small text-muted">
              {chip}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ServiceBloodTests;
