import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { aboutBanner } from "../../data/about";
import { gsap } from "../../lib/gsap";

function AboutBanner() {
  const sectionRef = useRef(null);
  const { label, title, video: videoDesktop, videoMobile, poster } = aboutBanner;

  // only the video for the current screen is loaded, phones get the vertical one
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia("(min-width: 768px)").matches);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const video = isDesktop ? videoDesktop : videoMobile || videoDesktop;

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(sectionRef.current);

    mm.add(
      { desktop: "(min-width: 768px)", mobile: "(max-width: 767px)", reduce: "(prefers-reduced-motion: reduce)" },
      (context) => {
        const { desktop, reduce } = context.conditions;
        if (reduce) return;

        // the text rises into view when the page loads
        gsap.from("[data-banner-text]", { y: 40, opacity: 0, duration: 1, delay: 0.2, stagger: 0.12, ease: "power3.out" });

        const scroll = {
          trigger: sectionRef.current,
          // the effect runs over the first 450px of scrolling, measured from the top of the page
          start: 0,
          end: "+=450",
          scrub: true,
        };

        // the video scrolls much slower than the page, so it looks far behind the text
        // (skipped for the video, which is shown in full and stays in place)
        if (!video) gsap.to("[data-banner-media]", { yPercent: desktop ? 33.3 : 26, ease: "none", scrollTrigger: scroll });

        // the text moves faster than the page and fades out
        gsap.to("[data-banner-content]", { y: desktop ? -200 : -120, opacity: 0, ease: "none", scrollTrigger: scroll });
      },
    );

    return () => mm.revert();
  }, [video]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-heading"
      // the bottom padding is twice the sticky header height, so the text sits in the middle of the screen
      className={`relative isolate flex min-h-[26rem] items-center justify-center overflow-hidden bg-[#231e1b] pb-40 md:pb-48 xl:pb-[15.875rem] ${
        // the banner takes the shape of the video (16:9 on desktop, 9:16 on phones) so nothing is cropped
        video ? `w-full ${isDesktop || !videoMobile ? "aspect-video" : "aspect-[9/16]"}` : "h-[100svh]"
      }`}
    >
      <div data-banner-media aria-hidden="true" className={`absolute inset-x-0 -z-20 will-change-transform ${video ? "inset-y-0" : "-top-1/2 h-[150%]"}`}>
        {video ? (
          <video
            key={video}
            className="h-full w-full object-contain"
            src={video}
            poster={poster || undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : poster ? (
          // the photo fills the lower three quarters of the moving layer, so the doctors' faces stay in view
          <img className="absolute inset-x-0 bottom-0 h-3/4 w-full object-cover object-[30%_50%]" src={poster} alt="" fetchPriority="high" decoding="async" />
        ) : (
          // placeholder until the real video is added, the stripes and glows make the parallax easy to see
          <div className="h-full w-full bg-[radial-gradient(circle_at_20%_30%,rgba(176,159,137,0.9),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(176,159,137,0.7),transparent_45%),repeating-linear-gradient(135deg,rgba(255,255,255,0.12)_0_2px,transparent_2px_90px),linear-gradient(160deg,#4a3f36,#231e1b)]" />
        )}
      </div>

      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/10" />

      <div data-banner-content className="page-width-small text-center">
        <p data-banner-text className="label !text-white/80">
          {label}
        </p>
        <h1 id="about-heading" data-banner-text className="mx-auto mt-5 max-w-[20rem] text-[28px] leading-[1.25] !text-white min-[480px]:max-w-[26rem] md:max-w-[52rem] md:text-[40px] xl:max-w-[64rem] xl:text-[46px] min-[1700px]:max-w-none min-[1700px]:whitespace-nowrap">
          {title}
        </h1>
      </div>
    </section>
  );
}

export default AboutBanner;
