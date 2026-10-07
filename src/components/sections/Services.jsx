import { mainServices } from "../../data/services";
import SectionHeading from "../ui/SectionHeading";
import ServiceGrid from "./ServiceGrid";

function Services() {
  return (
    <section
      aria-labelledby="services-heading"
      className="page-width-small pb-14 pt-10 md:pb-20 md:pt-12 xl:pb-[6.25rem] xl:pt-16"
    >
      <SectionHeading
        id="services-heading"
        label="Our services"
        text="Every GP service is designed to give you unhurried time with your doctor. New face-to-face consultations are 30 minutes, with 20-minute follow-ups and telephone or video appointments. Weekday evening and Saturday clinics are available."
      >
        Comprehensive private GP care,
        <br className="hidden md:inline" /> all in one place, all on your terms.
      </SectionHeading>

      <ServiceGrid items={mainServices} className="mt-10 xl:mt-[5.625rem]" />
    </section>
  );
}

export default Services;
