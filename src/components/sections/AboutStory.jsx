import { useLayoutEffect, useRef } from "react";
import { aboutStory } from "../../data/about";
import { gsap } from "../../lib/gsap";
import ImageSize from "../ui/ImageSize";

// a colour block that stands in for a photo, "reveal" is the side the image wipes in from
function StoryImage({ tone, reveal, className = "", drift, sizes, image, mobileImage }) {
  return (
    <div
      aria-hidden="true"
      data-story-image
      data-reveal={reveal}
      data-drift={drift}
      className={`overflow-hidden rounded-box ${className}`}
    >
      <div data-story-image-inner className={`relative h-full w-full ${tone}`}>
        {image ? (
          <picture>
            {/* mobile & tablet use their own crop when one is given */}
            {mobileImage && <source media="(max-width: 1023px)" srcSet={mobileImage} />}
            <img src={image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </picture>
        ) : (
          <ImageSize sizes={sizes} />
        )}
      </div>
    </div>
  );
}

const cardClass = "rounded-box bg-white p-7 md:p-10 lg:absolute lg:z-20 lg:p-8 xl:p-10";

function AboutStory() {
  const sectionRef = useRef(null);
  const { title, paragraphs, images } = aboutStory;

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(sectionRef.current);

    mm.add({ desktop: "(min-width: 1024px)", mobile: "(max-width: 1023px)", reduce: "(prefers-reduced-motion: reduce)" }, (context) => {
      const { desktop, reduce } = context.conditions;
      if (reduce) return;

      const once = (trigger) => ({ trigger, start: "top 85%", once: true });

      gsap.utils.toArray("[data-story-card]").forEach((card) => {
        const side = card.dataset.storyCard;
        const fromX = side === "left" ? -50 : side === "right" ? 50 : 0;
        gsap.from(card, { x: desktop ? fromX : 0, y: 50, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: once(card) });
      });

      // each image wipes in from one side while the colour inside settles from a slight zoom
      const wipes = {
        left: "inset(0 100% 0 0)",
        right: "inset(0 0 0 100%)",
        up: "inset(100% 0 0 0)",
      };
      gsap.utils.toArray("[data-story-image]").forEach((image) => {
        gsap.from(image, { clipPath: wipes[image.dataset.reveal] || wipes.up, duration: 1.3, ease: "power3.inOut", scrollTrigger: once(image) });
        gsap.from(image.querySelector("[data-story-image-inner]"), { scale: 1.3, duration: 1.8, ease: "power3.out", scrollTrigger: once(image) });
      });

      // the small images move at a different speed from the large ones
      if (desktop) {
        gsap.utils.toArray("[data-drift]").forEach((image) => {
          gsap.to(image, {
            y: Number(image.dataset.drift),
            ease: "none",
            scrollTrigger: { trigger: image, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
      }

      // the doodle starts drawing only after the first image has appeared
      gsap.utils.toArray("[data-doodle]").forEach((path) => {
        gsap.fromTo(
          path,
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: { trigger: "[data-story-rows]", start: "top 40%", end: "bottom 75%", scrub: 0.6 },
          },
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="story-heading" className="section-space overflow-hidden">
      <h2 id="story-heading" data-story-card="up" className="page-width-small mb-10 text-center lg:mb-14">
        {title}
      </h2>
      <div data-story-rows className="relative mx-auto max-w-[1920px]">
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 1920"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block"
        >
          <path
            data-doodle
            pathLength="1"
            style={{ strokeDasharray: 1, strokeDashoffset: 0 }}
            fill="none"
            stroke="#b09f89"
            strokeWidth="3"
            strokeLinecap="round"
            d="M1250 20 C1130 120 1070 260 1030 400 C1000 500 1100 540 1110 470 C1120 400 1010 420 940 520 C860 590 720 600 640 640 C560 720 520 800 470 880 C330 1000 60 1000 70 1140 C80 1220 380 1170 640 1100 C800 1040 880 1150 900 1260 C915 1350 1030 1300 1000 1240 C975 1190 890 1260 960 1380 C1030 1500 1250 1480 1350 1560 C1430 1620 1300 1720 1180 1700 C1060 1680 1150 1800 1150 1920"
          />
        </svg>
        <svg
          aria-hidden="true"
          viewBox="0 0 400 1800"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full lg:hidden"
        >
          <path
            data-doodle
            pathLength="1"
            style={{ strokeDasharray: 1, strokeDashoffset: 0 }}
            fill="none"
            stroke="#b09f89"
            strokeWidth="3"
            strokeLinecap="round"
            d="M200 0 C60 150 340 300 200 450 S60 750 200 900 S340 1200 200 1350 S200 1650 200 1800"
          />
        </svg>

        <div className="relative z-10 flex flex-col gap-14 lg:gap-20">
          {/* row 1: text card on the left, image bleeding off the right edge */}
          <div className="grid lg:grid-cols-12">
            <div
              data-story-card="left"
              className="bg-cream px-5 py-12 md:px-10 lg:col-span-6 lg:flex lg:flex-col lg:justify-center lg:py-16 lg:pl-16 lg:pr-12 xl:pl-24"
            >
              <p className="max-w-[34rem]">{paragraphs[0]}</p>
            </div>
            <StoryImage
              reveal="right"
              tone="bg-tan text-white/80"
              image={images.story1}
              mobileImage={images.story1Mobile}
              sizes={[{ device: "Mobile & tablet", size: "1600 × 1200 px" }, { device: "Desktop", size: "1600 × 900 px" }]}
              className="mt-4 aspect-[4/3] rounded-none md:mt-6 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:aspect-auto lg:min-h-[24rem]"
            />
          </div>

          {/* row 2: large image with a small one on top of its corner and the text card across its edge */}
          <div className="flex flex-col gap-4 px-5 md:px-10 lg:relative lg:block lg:aspect-[1440/640] lg:px-0">
            <StoryImage reveal="left" tone="bg-[#8d7d68] text-white/80" image={images.story2} mobileImage={images.story2Mobile} sizes={[{ device: "Mobile & tablet", size: "1400 × 1050 px" }, { device: "Desktop", size: "1300 × 1530 px" }]} className="aspect-[4/3] lg:absolute lg:left-[24%] lg:top-0 lg:z-10 lg:aspect-auto lg:h-[90%] lg:w-[34%]" />
            <div className="grid grid-cols-2 gap-4 lg:contents">
              <StoryImage reveal="up" drift="-40" tone="bg-cream text-tan" image={images.story3} mobileImage={images.story3Mobile} sizes={[{ device: "Mobile & tablet", size: "680 × 510 px" }, { device: "Desktop", size: "770 × 940 px" }]} className="aspect-[4/3] lg:absolute lg:bottom-0 lg:left-[12%] lg:z-20 lg:aspect-auto lg:h-[55%] lg:w-[20%]" />
            </div>
            <p data-story-card="right" className={`${cardClass} border border-tan lg:left-[55%] lg:top-[16%] lg:w-[33%]`}>
              {paragraphs[1]}
            </p>
          </div>

          {/* row 3: text card on the left, large image with two small ones along its bottom */}
          <div className="flex flex-col gap-4 px-5 md:px-10 lg:relative lg:block lg:aspect-[1440/700] lg:px-0">
            <StoryImage reveal="right" tone="bg-[#231e1b] text-white/70" image={images.story4} mobileImage={images.story5Mobile} sizes={[{ device: "Mobile & tablet", size: "1400 × 1050 px" }, { device: "Desktop", size: "1380 × 1460 px" }]} className="aspect-[4/3] lg:absolute lg:left-[38%] lg:top-0 lg:z-10 lg:aspect-auto lg:h-[78%] lg:w-[36%]" />
            <div className="grid grid-cols-2 gap-4 lg:contents">
              <StoryImage reveal="up" drift="-50" tone="bg-tan text-white/80" image={images.storySmall2} sizes={[{ device: "All devices", size: "860 × 645 px" }]} className="aspect-[4/3] lg:absolute lg:bottom-0 lg:left-[44%] lg:z-20 lg:aspect-auto lg:h-[34%] lg:w-[22%]" />
              <StoryImage reveal="up" drift="-30" tone="bg-cream text-tan" image={images.storySmall3} sizes={[{ device: "All devices", size: "860 × 645 px" }]} className="aspect-[4/3] lg:absolute lg:bottom-0 lg:left-[70%] lg:z-20 lg:aspect-auto lg:h-[34%] lg:w-[20%]" />
            </div>
            <p data-story-card="left" className={`${cardClass} border border-tan lg:left-[8%] lg:top-[38%] lg:w-[34%]`}>
              {paragraphs[2]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutStory;
