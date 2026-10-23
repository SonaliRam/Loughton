import { Fragment, useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import Button from "../ui/Button";
import { serviceCta } from "../../data/servicePage";
import { siteInfo } from "../../data/site";
import ImageSize from "../ui/ImageSize";

const rowClass = "grid grid-cols-[4.5rem_1fr] items-baseline gap-4";

// closing section: text on the left, a GIF on the right
function ServiceCta() {
  const { eyebrow, title, text, button, visit, media } = serviceCta;
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(sectionRef.current);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-cta='word']", {
        yPercent: 115,
        duration: 1,
        ease: "power4.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: "[data-cta='title']",
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from("[data-cta='media']", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="book"
      aria-labelledby="service-cta-heading"
      className="overflow-clip bg-tan py-20 xl:py-32"
    >
      <div className="page-width-small grid items-center gap-12 md:grid-cols-2 md:gap-16 xl:gap-24">
        <div>
          <p className="label !text-white/85">{eyebrow}</p>

          <h2 id="service-cta-heading" data-cta="title" className="mt-4 max-w-[40rem] !text-white">
            {title.split(" ").map((word, index) => (
              <Fragment key={`${word}-${index}`}>
                <span className="inline-block overflow-hidden align-bottom">
                  <span data-cta="word" className="inline-block">
                    {word}
                  </span>
                </span>
                {" "}
              </Fragment>
            ))}
          </h2>

          <p className="mb-8 mt-5 max-w-[34rem] !text-white">{text}</p>

          <Button to="/booking" variant="light" size="lg">
            {button}
          </Button>

          <dl className="mt-12 grid max-w-[34rem] gap-4 border-t border-white/30 pt-8">
            <div className={rowClass}>
              <dt className="label !text-white/85">Call</dt>
              <dd>
                <a href={siteInfo.phoneLink} className="!text-white underline-offset-4 hover:underline">
                  {siteInfo.phone}
                </a>
              </dd>
            </div>
            <div className={rowClass}>
              <dt className="label !text-white/85">Email</dt>
              <dd className="break-words">
                <a href={`mailto:${siteInfo.email}`} className="!text-white underline-offset-4 hover:underline">
                  {siteInfo.email}
                </a>
              </dd>
            </div>
            <div className={rowClass}>
              <dt className="label !text-white/85">Visit</dt>
              <dd className="!text-white">{visit}</dd>
            </div>
          </dl>
        </div>

        <div data-cta="media" className="service-image gif lg:max-w-[640px] lg:aspect-square">
          {media && media.endsWith(".mp4") ? (
            // looping muted video behaves like a GIF but is much lighter
            <video
              src={media}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-contain"
            />
          ) : media ? (
            <img src={media} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <ImageSize sizes={[{ device: "All devices (GIF)", size: "920 × 1150 px" }]} />
          )}
        </div>
      </div>
    </section>
  );
}

export default ServiceCta;
