import { useEffect } from "react";
import SectionHeading from "../ui/SectionHeading";

// Doctify review widget from the client, the id must match in the iframe and the script
const widgetId = "08hmjcs7";
const widgetSrc = `https://www.doctify.com/wv2/average-carousel-rating-widget?containerId=${widgetId}&widgetName=average-carousel-rating-widget&tenantId=athena-uk&language=en&profileType=specialist&theme=darkNavy&slugs=mansimran-cheema&dotsArrowsColor=4C5870`;
const resizeScript = `https://www.doctify.com/wv2/doctify-widget-autoresize-plugin.js?tenantId=athena-uk&widgetName=average-carousel-rating-widget&containerId=${widgetId}`;

function Reviews() {
  // React does not run script tags written in JSX, so the resize script is added here once
  useEffect(() => {
    if (document.querySelector(`script[src="${resizeScript}"]`)) return;
    const script = document.createElement("script");
    script.src = resizeScript;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section aria-labelledby="reviews-heading" className="page-width-small section-space">
      <SectionHeading
        id="reviews-heading"
        label="Patient experiences"
        textWidth="max-w-[70rem]"
        text="Real experiences from patients who value personal care, clear communication and time with their doctor."
      >
        What our patients say
      </SectionHeading>

      <div className="mt-10 xl:mt-[4.5rem]">
        <iframe
          id={widgetId}
          className="doctify-widget block min-h-[22rem] w-full border-0"
          src={widgetSrc}
          title="Patient reviews on Doctify"
          name="average-carousel-rating-widget"
          scrolling="no"
          loading="lazy"
        />
      </div>
    </section>
  );
}

export default Reviews;
