import ServicesBanner from "../components/sections/ServicesBanner";
import ServiceTicker from "../components/sections/ServiceTicker";
import ServiceSplit from "../components/sections/ServiceSplit";
import ServiceBloodTests from "../components/sections/ServiceBloodTests";
import ServiceWomensHealth from "../components/sections/ServiceWomensHealth";
import ServiceSquare from "../components/sections/ServiceSquare";
import ServiceStackedCards from "../components/sections/ServiceStackedCards";
import ServiceTeleconsultations from "../components/sections/ServiceTeleconsultations";
import ServiceCta from "../components/sections/ServiceCta";
import { earWax, serviceSplits } from "../data/servicePage";

// pick a split service by its id, so the page order is clear in one place
const getSplit = (id) => serviceSplits.find((service) => service.id === id);

function Services() {
  return (
    <>
      <ServicesBanner />
      <ServiceTicker />
      <ServiceSplit service={getSplit("gp-consultations")} />
      <ServiceSplit service={getSplit("preventive-health-checks")} />
      <ServiceBloodTests />
      <ServiceWomensHealth />
      <ServiceSplit service={getSplit("weight-management")} />
      <ServiceSquare service={earWax} />
      <ServiceStackedCards />
      <ServiceTeleconsultations />
      <ServiceCta />
    </>
  );
}

export default Services;
