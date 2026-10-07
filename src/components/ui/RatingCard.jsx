import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { ArrowRightIcon, StarIcon } from "./Icons";

// one wave shape that repeats seamlessly, so sliding it sideways looks endless
function Wave({ className, wave }) {
  return (
    <svg
      data-wave={wave}
      viewBox="0 0 1200 40"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`absolute left-0 h-4 w-[200%] fill-tan ${className}`}
    >
      <path d="M0 20 Q150 0 300 20 T600 20 T900 20 T1200 20 V40 H0 Z" />
    </svg>
  );
}

function RatingCard({ score, count, prompt, url }) {
  const cardRef = useRef(null);
  const numberRef = useRef(null);

  // the card fills with colour like water rising in a glass, and each part appears as the water reaches it
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(cardRef.current);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const card = cardRef.current;
      const items = gsap.utils.toArray("[data-rating-item]", card);
      const stars = gsap.utils.toArray("[data-star]", card);
      const counter = { value: 0 };
      const progress = { value: 0 };
      const shown = new Set();

      numberRef.current.textContent = "0.0";
      gsap.set("[data-water]", { yPercent: 100 });
      gsap.set(items, { opacity: 0, y: 16 });
      gsap.set(stars, { scale: 0, rotate: -40 });

      // the water is deep enough once its surface passes the middle of each item
      const height = card.offsetHeight;
      const marks = items.map((item) => ({
        item,
        at: 1 - (item.offsetTop + item.offsetHeight / 2) / height,
      }));

      const reveal = (item) => {
        gsap.to(item, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" });

        if (item.dataset.ratingItem === "number") {
          gsap.to(counter, {
            value: score,
            duration: 2.6,
            ease: "power2.out",
            onUpdate: () => {
              numberRef.current.textContent = counter.value.toFixed(1);
            },
          });
        }

        if (item.dataset.ratingItem === "stars") {
          gsap.to(stars, {
            scale: 1,
            rotate: 0,
            duration: 0.9,
            ease: "back.out(2.5)",
            stagger: 0.18,
          });
        }
      };

      // the waves keep rippling while the water rises
      const ripples = [
        gsap.to("[data-wave='front']", {
          xPercent: -50,
          duration: 3.6,
          ease: "none",
          repeat: -1,
        }),
        gsap.to("[data-wave='back']", {
          xPercent: 0,
          duration: 4.8,
          ease: "none",
          repeat: -1,
        }),
      ];
      gsap.set("[data-wave='back']", { xPercent: -50 });

      gsap.to(progress, {
        value: 1,
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: { trigger: card, start: "top 85%", once: true },
        onUpdate: () => {
          gsap.set("[data-water]", { yPercent: (1 - progress.value) * 100 });

          marks.forEach(({ item, at }) => {
            if (!shown.has(item) && progress.value >= at) {
              shown.add(item);
              reveal(item);
            }
          });
        },
        onComplete: () => ripples.forEach((ripple) => ripple.kill()),
      });
    });

    return () => mm.revert();
  }, [score]);

  return (
    <div
      ref={cardRef}
      className="relative flex h-full flex-col overflow-hidden rounded-lg border border-tan/40 bg-white p-6 text-white md:p-10 xl:px-[3.125rem] xl:py-[3.125rem]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px overflow-hidden rounded-lg"
      >
        <div data-water className="absolute inset-0 bg-tan">
          <Wave wave="back" className="-top-4 opacity-50" />
          <Wave wave="front" className="-top-[0.9rem]" />
        </div>
      </div>

      <p data-rating-item="label" className="label relative text-white">
        Patient rating
      </p>

      <p
        data-rating-item="number"
        ref={numberRef}
        className="relative mt-6 text-[5rem] font-semibold leading-none text-white md:text-[6rem] xl:mt-[2.5rem] xl:text-[8.5rem]"
      >
        {score.toFixed(1)}
      </p>

      <div
        data-rating-item="stars"
        role="img"
        aria-label={`${score} out of 5 stars`}
        className="relative mt-6 flex gap-2 xl:mt-[2.25rem] xl:gap-3"
      >
        {[0, 1, 2, 3, 4].map((star) => (
          <span key={star} data-star className="inline-flex">
            <StarIcon className="h-6 w-6 text-white" />
          </span>
        ))}
      </div>

      <p data-rating-item="text" className="text-lead relative mt-5 text-white">
        Based on {count} patient reviews
      </p>

      <div
        data-rating-item="link"
        className="relative mt-auto pt-8 xl:pt-[2.5rem]"
      >
        <div className="border-t border-white/50 pt-6 xl:pt-[1.5rem]">
          <a
            href={url}
            className="text-lead group/link inline-flex items-center gap-2 text-white"
          >
            <span className="underline-offset-4 group-hover/link:underline">
              {prompt}
            </span>
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default RatingCard;
