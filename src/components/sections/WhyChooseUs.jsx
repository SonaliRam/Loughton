import { useRef } from "react";
import { whyChooseUs } from "../../data/home";
import useReveal from "../../hooks/useReveal";
import InfoCard from "../ui/InfoCard";

function WhyChooseUs() {
  const sectionRef = useRef(null);
  useReveal(sectionRef, "[data-reveal]", { y: 36, stagger: 0.12 });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="why-heading"
      className="page-width-small pb-14 md:pb-20 xl:pb-[6.25rem]"
    >
      <h2 id="why-heading" data-reveal>
        Why choose us
      </h2>

      <ul className="mt-8 grid gap-4 md:grid-cols-2 md:gap-6 xl:mt-[2.875rem] xl:grid-cols-4 xl:gap-10">
        {whyChooseUs.map((item) => (
          <li key={item.title} data-reveal>
            <InfoCard {...item} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default WhyChooseUs;
