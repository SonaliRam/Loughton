import { additionalServices, moreServices } from "../../data/services";
import SectionHeading from "../ui/SectionHeading";
import ServiceBar from "../ui/ServiceBar";
import ServiceGrid from "./ServiceGrid";

function MoreServices() {
  return (
    <section
      aria-labelledby="more-services-heading"
      className="page-width-small pb-12 md:pt-4 xl:pb-[3.75rem] xl:pt-[7.5rem]"
    >
      <SectionHeading id="more-services-heading" label="More care, same unhurried approach">
        Services designed around
        <br className="hidden md:inline" /> real life, not rushed appointments.
      </SectionHeading>

      <ServiceGrid items={moreServices} className="mt-10 xl:mt-[6rem]" />

      <div className="mt-6 xl:mt-11">
        <ServiceBar {...additionalServices} />
      </div>
    </section>
  );
}

export default MoreServices;
