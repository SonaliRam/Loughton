import { useRef } from "react";
import useCarousel from "../../hooks/useCarousel";
import { ArrowRightIcon } from "./Icons";
import ReviewCard from "./ReviewCard";

const arrowButton =
  "flex h-11 w-11 items-center justify-center rounded-full border border-tan/60 text-ink transition-colors duration-300 hover:border-tan hover:bg-tan focus-visible:bg-tan";

// the quote cards slide from right to left, swipe on touch, and also move on their own
function ReviewSlider({ items }) {
  const trackRef = useRef(null);
  const { active, goTo, stop } = useCarousel(trackRef, items.length, {
    delay: 6000,
    mobileOnly: false,
  });

  const move = (index) => {
    stop();
    goTo((index + items.length) % items.length);
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Patient reviews" className="min-w-0">
      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] md:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => (
          <li
            key={item.name}
            aria-label={`${index + 1} of ${items.length}`}
            className="flex w-full shrink-0 snap-center"
          >
            <ReviewCard {...item} />
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between xl:mt-8">
        <div className="flex gap-1" role="group" aria-label="Choose a review">
          {items.map((item, index) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Show review from ${item.name}`}
              aria-current={index === active}
              onClick={() => move(index)}
              className="group flex h-6 w-6 items-center justify-center"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  index === active ? "w-6 bg-ink" : "w-2 bg-tan group-hover:bg-ink"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button type="button" aria-label="Previous review" onClick={() => move(active - 1)} className={arrowButton}>
            <ArrowRightIcon className="h-4 w-4 rotate-180" />
          </button>
          <button type="button" aria-label="Next review" onClick={() => move(active + 1)} className={arrowButton}>
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewSlider;
