import { useRef, useState } from "react";
import { faqCategories, faqs } from "../../data/faqs";
import useReveal from "../../hooks/useReveal";

function FaqItem({ item, id }) {
  const [open, setOpen] = useState(false);

  return (
    <article>
      <h3 className="font-body">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-answer`}
          onClick={() => setOpen((value) => !value)}
          className="group flex w-full items-center justify-between gap-5 py-6 text-left"
        >
          <span className="font-heading text-[length:var(--fs-lead)] leading-snug text-ink transition-transform duration-300 group-hover:translate-x-1.5">
            {item.question}
          </span>
          <span
            aria-hidden="true"
            className={`relative h-9 w-9 shrink-0 rounded-full border border-tan transition-all duration-300 ${
              open ? "rotate-180 bg-tan" : ""
            }`}
          >
            <span
              className={`absolute left-1/2 top-1/2 h-[1.5px] w-3 -translate-x-1/2 -translate-y-1/2 transition-colors duration-300 ${
                open ? "bg-white" : "bg-tan"
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 h-[1.5px] w-3 -translate-x-1/2 -translate-y-1/2 rotate-90 transition-all duration-300 ${
                open ? "bg-white opacity-0" : "bg-tan"
              }`}
            />
          </span>
        </button>
      </h3>

      <div
        id={`${id}-answer`}
        role="region"
        aria-label={item.question}
        className={`grid transition-[grid-template-rows] duration-500 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-6 pr-14 text-muted">{item.answer}</p>
        </div>
      </div>
    </article>
  );
}

function FaqList() {
  const sectionRef = useRef(null);
  const [category, setCategory] = useState("all");
  useReveal(sectionRef, "[data-reveal]", { y: 30, stagger: 0.08 });

  const visible = category === "all" ? faqs : faqs.filter((item) => item.category === category);
  const tabs = [{ id: "all", label: "All" }, ...faqCategories];

  return (
    <section ref={sectionRef} aria-labelledby="faq-heading" className="page-width-small section-space">
      <div className="text-center">
        <p data-reveal className="label">
          FAQs
        </p>
        <h1 id="faq-heading" data-reveal className="mt-4">
          Frequently Asked Questions
        </h1>

        <div
          data-reveal
          role="group"
          aria-label="Question categories"
          className="mt-8 flex flex-wrap justify-center gap-2.5"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              aria-pressed={category === tab.id}
              onClick={() => setCategory(tab.id)}
              className={`text-ui rounded-box border border-tan px-5 py-2 transition-colors duration-300 ${
                category === tab.id ? "bg-tan !text-white" : "text-muted hover:bg-cream"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-[52rem] xl:mt-14">
        {visible.map((item) => (
          <div key={item.question} data-reveal className="border-t border-tan/50 last:border-b">
            <FaqItem item={item} id={`faq-${faqs.indexOf(item)}`} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default FaqList;
