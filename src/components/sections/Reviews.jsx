import { useRef } from "react";
import { rating, reviews } from "../../data/reviews";
import useReveal from "../../hooks/useReveal";
import RatingCard from "../ui/RatingCard";
import ReviewSlider from "../ui/ReviewSlider";
import SectionHeading from "../ui/SectionHeading";

function Reviews() {
  const gridRef = useRef(null);
  useReveal(gridRef, "[data-reveal]", { y: 50, stagger: 0.15 });

  return (
    <section
      aria-labelledby="reviews-heading"
      className="page-width-small py-14 md:py-20 xl:pb-[3.5rem] xl:pt-[6.5rem]"
    >
      <SectionHeading
        id="reviews-heading"
        label="Patient experiences"
        textWidth="max-w-[70rem]"
        text="Real experiences from patients who value personal care, clear communication and time with their doctor."
      >
        What our patients say
      </SectionHeading>

      <div
        ref={gridRef}
        className="mt-10 grid gap-6 lg:grid-cols-[1.86fr_1fr] xl:mt-[4.5rem] xl:gap-[3.75rem]"
      >
        <div data-reveal className="min-w-0">
          <ReviewSlider items={reviews} />
        </div>
        <div data-reveal>
          <RatingCard {...rating} />
        </div>
      </div>
    </section>
  );
}

export default Reviews;
