import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { aboutValues } from "../../data/about";
import { gsap } from "../../lib/gsap";
import ImageSize from "../ui/ImageSize";

// colour blocks stand in for the photos until the real images arrive
const tones = ["bg-tan text-white/80", "bg-[#8d7d68] text-white/80", "bg-[#cfc3b3] text-[#6b5d4b]"];

const arrowClass =
  "grid h-14 w-14 place-items-center rounded-full border-2 border-ink text-ink transition-colors duration-300 hover:bg-ink hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

function Arrow({ direction }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={direction === "prev" ? "M15 5 8 12l7 7" : "m9 5 7 7-7 7"} />
    </svg>
  );
}

// how long the cards rest before each move, in milliseconds, the two values take turns
const AUTO_DELAYS = [2000, 3000];

function AboutValues() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [visible, setVisible] = useState(false);
  const { label, title, text, items } = aboutValues;

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(sectionRef.current);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
      });

      tl.from("[data-values-panel]", { y: 60, opacity: 0, duration: 1 })
        .from("[data-values-text]", { y: 30, opacity: 0, duration: 0.8, stagger: 0.12 }, "-=0.6")
        .from("[data-values-card]", { x: 80, opacity: 0, duration: 0.9, stagger: 0.1 }, "-=0.7");
    });

    return () => mm.revert();
  }, []);

  // the width of one card plus the gap, used by the arrows and the dots
  const getStep = () => {
    const track = trackRef.current;
    const cards = track.querySelectorAll("[data-values-card]");
    return cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth;
  };

  const handleScroll = () => {
    const track = trackRef.current;
    setActive(Math.min(items.length - 1, Math.round(track.scrollLeft / getStep())));
  };

  // only run the auto scroll while the section is on screen
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // the row rests, moves one card, rests again, and goes back to the first card after the last one
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (held || !visible || reduced) return undefined;

    let turn = 0;
    let timer;

    const tick = () => {
      timer = setTimeout(() => {
        const track = trackRef.current;
        const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
        if (atEnd) track.scrollTo({ left: 0, behavior: "smooth" });
        else track.scrollBy({ left: getStep(), behavior: "smooth" });
        turn += 1;
        tick();
      }, AUTO_DELAYS[turn % AUTO_DELAYS.length]);
    };

    tick();
    return () => clearTimeout(timer);
  }, [held, visible]);

  const move = (direction) => {
    trackRef.current.scrollBy({ left: direction * getStep(), behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} aria-labelledby="values-heading" className="section-space overflow-hidden">
      <div className="page-width-small">
        <div className="relative lg:h-[43rem]">
          <div
            data-values-panel
            className="rounded-[1.5rem] bg-[#231e1b] px-6 pb-44 pt-12 md:px-12 md:pt-16 lg:absolute lg:inset-y-0 lg:left-0 lg:w-[57%] lg:rounded-[2rem] lg:p-0"
          >
            <div className="lg:flex lg:h-full lg:max-w-[70%] xl:max-w-[80%] lg:flex-col lg:justify-center lg:pl-[8%] lg:pr-0">
              <p data-values-text className="label !text-cream">
                {label}
              </p>
              <h2 id="values-heading" data-values-text className="mt-4 text-white">
                {title}
              </h2>
              <p data-values-text className="text-lead mt-6 !text-white/70">
                {text}
              </p>
            </div>
          </div>

          <div className="-mt-32 lg:absolute lg:left-[46%] lg:right-0 lg:top-[11%] lg:mt-0">
            <ul
              ref={trackRef}
              onScroll={handleScroll}
              onMouseEnter={() => setHeld(true)}
              onMouseLeave={() => setHeld(false)}
              onFocus={() => setHeld(true)}
              onBlur={() => setHeld(false)}
              onTouchStart={() => setHeld(true)}
              onTouchEnd={() => setHeld(false)}
              tabIndex={0}
              aria-label="Our values"
              className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:px-10 lg:gap-9 lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
            >
              {items.map((item, index) => (
                <li
                  key={item.title}
                  data-values-card
                  className="flex w-[78%] shrink-0 snap-start flex-col overflow-hidden rounded-[1.25rem] bg-cream sm:w-[20rem] lg:h-[29rem] lg:w-[20.8rem]"
                >
                  <div
                    aria-hidden="true"
                    className={`relative h-44 shrink-0 lg:h-[13rem] ${tones[index % tones.length]}`}
                  >
                    <ImageSize sizes={[{ device: "All devices", size: "700 × 440 px" }]} />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6 lg:p-7">
                    <h3 className="text-ink">{item.title}</h3>
                    <p className="text-small">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 flex items-center justify-center gap-4 lg:hidden">
            <div className="flex gap-2" aria-hidden="true">
              {items.map((item, index) => (
                <span key={item.title} className={`h-2 w-2 rounded-full transition-colors duration-300 ${index === active ? "bg-ink" : "bg-tan/40"}`} />
              ))}
            </div>
          
          </div>

          <div className="absolute bottom-0 right-[8%] hidden gap-4 lg:flex">
            <button type="button" aria-label="Previous value" onClick={() => move(-1)} className={arrowClass}>
              <Arrow direction="prev" />
            </button>
            <button type="button" aria-label="Next value" onClick={() => move(1)} className={arrowClass}>
              <Arrow direction="next" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutValues;
