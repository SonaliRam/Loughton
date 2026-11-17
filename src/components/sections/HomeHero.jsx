import ImageSize from "../ui/ImageSize";

// add the photos here when they arrive, e.g. import heroImage from "../../assets/images/home-hero.webp";
const heroImage = "";
const heroMobileImage = "";

const sizes = [
  { device: "Tablet & desktop", size: "2560 × 1000 px" },
  { device: "Mobile", size: "900 × 1200 px" },
];

// image-only banner at the top of the home page, no visible text
function HomeHero() {
  return (
    <section aria-labelledby="home-heading" className="relative w-full overflow-hidden bg-cream aspect-[900/1200] md:aspect-[2560/1000]">
      {/* hidden on screen but read by search engines and screen readers, so the page keeps its main heading */}
      <h1 id="home-heading" className="sr-only">
        Loughton Private GP, premium private GP care in Loughton
      </h1>

      {heroImage ? (
        <picture>
          {heroMobileImage && <source media="(max-width: 767px)" srcSet={heroMobileImage} />}
          <img
            src={heroImage}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>
      ) : (
        <ImageSize sizes={sizes} />
      )}
    </section>
  );
}

export default HomeHero;
