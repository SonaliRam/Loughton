import { useRef } from "react";
import useBatchReveal from "../../hooks/useBatchReveal";
import useCarousel from "../../hooks/useCarousel";
import ServiceCard from "../ui/ServiceCard";

// mobile: one card at a time with auto slide, swipe and dots, tablet and up: a normal grid
function ServiceGrid({ items, className = "" }) {
  const trackRef = useRef(null);
  useBatchReveal(trackRef);
  const { active, goTo, stop } = useCarousel(trackRef, items.length);

  return (
    <div className={className}>
      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] md:grid md:snap-none md:grid-cols-2 md:gap-6 md:overflow-visible xl:grid-cols-4 xl:gap-10 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <li key={item.title} className="w-full shrink-0 snap-center md:w-auto">
            <ServiceCard {...item} />
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-center gap-1 md:hidden" role="group" aria-label="Choose a service">
        {items.map((item, index) => (
          <button
            key={item.title}
            type="button"
            aria-label={`Show ${item.title}`}
            aria-current={index === active}
            onClick={() => {
              stop();
              goTo(index);
            }}
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
    </div>
  );
}

export default ServiceGrid;
