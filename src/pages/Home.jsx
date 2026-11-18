import About from "../components/sections/About";
import FeatureStrip from "../components/sections/FeatureStrip";
import Hero from "../components/sections/Hero";
import MoreServices from "../components/sections/MoreServices";
import Reviews from "../components/sections/Reviews";
import ServiceCta from "../components/sections/ServiceCta";
import Services from "../components/sections/Services";
import WhyChooseUs from "../components/sections/WhyChooseUs";
function Home() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <About />
      <WhyChooseUs />
      <Services />
      <MoreServices />
      <Reviews />
      <ServiceCta />
    </>
  );
}

export default Home;
