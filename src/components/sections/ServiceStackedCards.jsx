import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { chronicDisease } from "../../data/servicePage";
import ImageSize from "../ui/ImageSize";

// service 07: cards stack on top of each other on the left, the text stays pinned on the right
function ServiceStackedCards() {
  const { id, number, title, pill, lead, cards, chips } = chronicDisease;
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(sectionRef.current);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-stack='word']", {
        yPercent: 115,
        duration: 1,
        ease: "power4.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: "[data-stack='title']",
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from("[data-stack='lead']", {
        autoAlpha: 0,
        y: 30,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-stack='lead']",
          start: "top 92%",
          end: "top 70%",
          scrub: true,
        },
      });

    });

    // card stacking only on desktop; mobile & tablet use a horizontal swipe row
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const items = gsap.utils.toArray("[data-stack='card']");

      items.forEach((card, index) => {
        // each card rises in with a slight tilt
        gsap.from(card, {
          y: 120,
          autoAlpha: 0,
          rotate: index % 2 ? 2 : -2,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 98%",
            end: "top 70%",
            scrub: true,
          },
        });

        // when the next card arrives, this one shrinks back and its image zooms
        const next = items[index + 1];
        if (next) {
          const settle = {
            trigger: next,
            start: "top 80%",
            end: "top 25%",
            scrub: true,
          };

          gsap.to(card, {
            scale: 0.92 - (items.length - index) * 0.005,
            yPercent: -2,
            ease: "none",
            scrollTrigger: settle,
          });
          gsap.to(card.querySelector("[data-stack='zoom']"), {
            scale: 1.2,
            ease: "none",
            scrollTrigger: settle,
          });
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-24 overflow-x-clip bg-white service-section xl:scroll-mt-32"
    >
      <div className="page-width-small grid gap-10 lg:grid-cols-[6fr_5fr] lg:items-start lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:order-2">
          <p className="label mb-5">{number} / Service</p>

          <h2 id={`${id}-heading`} data-stack="title">
            {title.split(" ").map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="inline-block overflow-hidden align-bottom"
              >
                <span data-stack="word" className="inline-block">
                  {word}
                  {" "}
                </span>
              </span>
            ))}
          </h2>

          <p className="mt-4">
            <span className="inline-block rounded-box bg-tan px-4 py-1 text-small text-white">
              {pill}
            </span>
          </p>

          <p data-stack="lead" className="text-lead mt-6">
            {lead}
          </p>

          <ul className="mt-7 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <li
                key={chip}
                className="rounded-box border border-tan/60 px-3.5 py-1 text-small text-muted"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:-mx-10 md:px-10 lg:mx-0 lg:block lg:overflow-visible lg:px-0 lg:pb-0 lg:order-1">
          {cards.map((card, index) => (
            <article
              key={card.number}
              data-stack="card"
              style={{ "--i": index }}
              className="grid w-[85%] shrink-0 snap-start origin-top content-start gap-5 rounded-box border border-tan/50 bg-white p-6 shadow-[0_12px_32px_rgba(42,37,34,0.08)] md:w-[80%] md:grid-cols-[310px_1fr] md:items-center lg:sticky lg:top-[calc(100px+var(--i)*22px)] lg:mb-[4vh] lg:w-auto lg:grid-cols-[1fr_1.1fr] lg:p-7 lg:shadow-[0_24px_56px_rgba(42,37,34,0.1)] lg:last:mb-0"
            >
              <div className="relative mx-auto aspect-square w-full max-w-[310px] overflow-hidden rounded-box border border-tan bg-cream">
                <div data-stack="zoom" className="absolute inset-0">
                  {card.image ? (
                    <img
                      src={card.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover object-center"
                    />
                  ) : (
                    <ImageSize
                      sizes={[
                        { device: "All devices", size: "310 × 310 px" },
                      ]}
                    />
                  )}
                </div>
              </div>

              <div>
                <span className="font-heading text-tan">{card.number}</span>
                <h3 className="mb-2 mt-1 text-2xl xl:text-3xl">{card.title}</h3>
                <p className="text-muted">{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServiceStackedCards;
