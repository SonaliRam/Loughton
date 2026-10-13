import Hero from "../components/sections/Hero";
import FeatureStrip from "../components/sections/FeatureStrip";
import About from "../components/sections/About";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import Services from "../components/sections/Services";
import MoreServices from "../components/sections/MoreServices";
import Reviews from "../components/sections/Reviews";

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
    </>
  );
}

export default Home;
