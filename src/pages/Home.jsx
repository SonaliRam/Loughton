
import FeatureStrip from "../components/sections/FeatureStrip";
import About from "../components/sections/About";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import Services from "../components/sections/Services";
import MoreServices from "../components/sections/MoreServices";
import Reviews from "../components/sections/Reviews";
import ServiceCta from "../components/sections/ServiceCta";
import HomeHero from "../components/sections/HomeHero";
function Home() {
  return (
    <>
      <HomeHero />
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
