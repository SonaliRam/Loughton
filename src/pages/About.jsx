import AboutBanner from "../components/sections/AboutBanner";
import AboutCta from "../components/sections/AboutCta";
import AboutStatement from "../components/sections/AboutStatement";
import AboutStory from "../components/sections/AboutStory";
import AboutValues from "../components/sections/AboutValues";
import { aboutMission, aboutVision } from "../data/about";

function About() {
  return (
    <>
      <AboutBanner />
      <AboutStory />
      <AboutStatement
        id="vision-heading"
        content={aboutVision}
        flip
        tones={{ big: "bg-tan text-white/80", small: "bg-cream text-tan" }}
      />
      <AboutStatement
        id="mission-heading"
        content={aboutMission}
        tones={{
          big: "bg-[#8d7d68] text-white/80",
          small: "bg-[#231e1b] text-white/70",
        }}
      />
      <AboutValues />
      <AboutCta />
    </>
  );
}

export default About;
