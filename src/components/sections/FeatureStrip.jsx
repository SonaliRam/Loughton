import { useRef } from "react";
import { featureStrip } from "../../data/home";
import useReveal from "../../hooks/useReveal";

function FeatureStrip() {
  const sectionRef = useRef(null);
  useReveal(sectionRef, "[data-reveal]", { y: 30, stagger: 0.12 });

  return (
    <section
      ref={sectionRef}
      aria-label="Key benefits"
      className="page-width-whole bg-tan py-8 md:py-10 xl:py-[2.3125rem]"
    >
      <div className="page-width-small">
        <ul className="grid grid-cols-2 gap-px bg-cream lg:grid-cols-4">
          {featureStrip.map(({ icon: Icon, label }) => (
            <li key={label} className="group bg-tan px-3 py-7 md:py-8 xl:py-[2.25rem]">
              <div data-reveal className="flex flex-col items-center text-center">
                <Icon className="h-12 w-12 text-white transition-transform duration-300 group-hover:-translate-y-1.5 md:h-14 md:w-14" />
                <span className="text-lead mt-4 max-w-[11rem] text-balance leading-tight text-white md:mt-5">
                  {label}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default FeatureStrip;
