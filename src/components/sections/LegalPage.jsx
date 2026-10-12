import { Fragment, useRef } from "react";
import useReveal from "../../hooks/useReveal";

// shows any [PLACEHOLDER: ...] text highlighted so it is easy to find and replace later
function Paragraph({ text }) {
  const parts = text.split(/(\[PLACEHOLDER[^\]]*\])/);

  return (
    <p className="mt-4">
      {parts.map((part, index) =>
        part.startsWith("[PLACEHOLDER") ? (
          <mark key={index} className="rounded-box bg-cream px-1.5 py-0.5 text-ink">
            {part}
          </mark>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </p>
  );
}

function LegalPage({ content }) {
  const sectionRef = useRef(null);
  useReveal(sectionRef, "[data-reveal]", { y: 30, stagger: 0.06 });
  const { label, title, subtitle, intro, sections } = content;

  return (
    <section ref={sectionRef} aria-labelledby="legal-heading" className="page-width-small section-space lg:px-[80px]">
      <div>
        <div className="text-center">
          <p data-reveal className="label">
            {label}
          </p>
          <h1 id="legal-heading" data-reveal className="mt-4 md:whitespace-nowrap">
            {title}
          </h1>
          <p data-reveal className="text-lead mt-5 text-ink">
            {subtitle}
          </p>
        </div>

        <p data-reveal className="mt-8">
          {intro}
        </p>

        <div className="mt-10 xl:mt-14">
          {sections.map((section) => (
            <div key={section.title} data-reveal className="border-t border-tan/50 py-8 last:border-b">
              <h2 className="text-2xl">{section.title}</h2>
              {section.paragraphs.map((text) => (
                <Paragraph key={text} text={text} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LegalPage;
