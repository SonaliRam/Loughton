import { useEffect, useState } from "react";
import { aboutBanner } from "../../data/about";

function AboutBanner() {
  const { label, title, video: videoDesktop, videoMobile } = aboutBanner;

  // only the video for the current screen is loaded, phones get the vertical one
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia("(min-width: 768px)").matches);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const video = isDesktop ? videoDesktop : videoMobile || videoDesktop;

  return (
    <section
      aria-labelledby="about-heading"
      // the banner takes the shape of the video (16:9 on desktop, 9:16 on phones) so nothing is cropped
      className={`relative isolate w-full overflow-hidden bg-[#231e1b] ${isDesktop || !videoMobile ? "aspect-video" : "aspect-[9/16]"}`}
    >
      <video
        key={video}
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-contain"
        src={video}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/10" />

      {/* hidden on screen but read by search engines and screen readers, so the page keeps its main heading */}
      <div className="sr-only">
        <p>{label}</p>
        <h1 id="about-heading">{title}</h1>
      </div>
    </section>
  );
}

export default AboutBanner;
