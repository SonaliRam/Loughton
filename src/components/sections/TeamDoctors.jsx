import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { teamDoctors } from "../../data/team";
import { gsap } from "../../lib/gsap";

// where each portrait sits in the stack: 0 is the front one, 1 and 2 peek out from behind it
const slots = [
  { xPercent: 0, scale: 1, veil: 0, zIndex: 3 },
  { xPercent: 52, scale: 0.85, veil: 0.25, zIndex: 2 },
  { xPercent: 91, scale: 0.71, veil: 0.55, zIndex: 1 },
];

const arrowClass =
  "grid h-12 w-12 place-items-center rounded-full border-2 border-ink text-ink transition-colors duration-300 hover:bg-ink hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:h-14 md:w-14";

const pillClass = "text-ui rounded-full border border-tan px-4 py-1 text-muted";

function Arrow({ direction }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={direction === "prev" ? "M15 5 8 12l7 7" : "m9 5 7 7-7 7"} />
    </svg>
  );
}

// splits "Dr Gursharan K Rai" into "Dr Gursharan" and "K Rai"
function splitName(name) {
  const [title, first, ...rest] = name.split(" ");
  return { first: `${title} ${first}`, rest: rest.join(" ") };
}

// the doctors section: a stack of portraits that opens into a large profile, same flow as the reference design
function TeamDoctors() {
  const sectionRef = useRef(null);
  const stackRef = useRef(null);
  const profileRef = useRef(null);
  const firstRender = useRef(true);
  const lastActive = useRef(0);
  const [active, setActive] = useState(0);
  const [view, setView] = useState("slider");
  const { items } = teamDoctors;
  const total = items.length;
  const doctor = items[active];

  const slotOf = (index, current) => (index - current + total) % total;
  const go = (step) => setActive((current) => (current + step + total) % total);
  const openProfile = () => setView("profile");
  const closeProfile = () => setView("slider");

  // entrance animation of the slider when the section scrolls into view
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(sectionRef.current);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const trigger = { trigger: sectionRef.current, start: "top 75%", once: true };

      gsap.from("[data-doc-intro]", { y: 40, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.12, scrollTrigger: trigger });
      gsap.from(stackRef.current, { x: 60, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: trigger });
    });

    return () => mm.revert();
  }, []);

  // place the portraits, and animate the move when the doctor changes
  useLayoutEffect(() => {
    if (view !== "slider") return;

    const cards = gsap.utils.toArray("[data-doc-card]", stackRef.current);
    const animate = !firstRender.current && lastActive.current !== active && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    cards.forEach((card, index) => {
      const { veil: veilOpacity, ...position } = slots[slotOf(index, active)];
      const veil = card.querySelector("[data-doc-veil]");
      gsap.set(card, { zIndex: position.zIndex, transformOrigin: "left center" });

      if (animate) {
        gsap.to(card, { ...position, duration: 0.9, ease: "power3.inOut", overwrite: true });
        gsap.to(veil, { opacity: veilOpacity, duration: 0.9, ease: "power3.inOut", overwrite: true });
      } else {
        gsap.set(card, position);
        gsap.set(veil, { opacity: veilOpacity });
      }
    });

    if (animate) {
      gsap.fromTo("[data-doc-swap]", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.25, stagger: 0.06 });
    }

    lastActive.current = active;
    firstRender.current = false;
  }, [active, view]);

  // the profile opens with a rise, focus moves to its heading, Escape closes it
  useLayoutEffect(() => {
    if (view !== "profile") return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      gsap.from("[data-profile-item]", { y: 40, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 });
      gsap.from("[data-profile-photo]", { clipPath: "inset(0 100% 0 0)", duration: 1.1, ease: "power3.inOut" });
    }
    profileRef.current?.focus({ preventScroll: true });
    sectionRef.current?.scrollIntoView({ block: "start", behavior: reduced ? "auto" : "smooth" });

    const onKey = (event) => {
      if (event.key === "Escape") closeProfile();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [view]);

  // the stack fades in again when the profile is closed
  useEffect(() => {
    if (view === "slider" && !firstRender.current) {
      gsap.from(stackRef.current, { opacity: 0, y: 20, duration: 0.7, ease: "power3.out" });
    }
  }, [view]);

  const { first, rest } = splitName(doctor.name);

  return (
    <section ref={sectionRef} aria-labelledby="doctors-heading" className="section-space overflow-hidden bg-white">
      <div className="page-width-small">
        {view === "slider" ? (
          <div className="grid gap-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-8 lg:gap-y-10">
            <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
              <h2 id="doctors-heading" data-doc-intro className="font-heading text-5xl uppercase leading-[1.1] text-ink sm:text-6xl md:text-7xl xl:text-8xl">
                <span className="block">Meet</span>
                <span className="block italic text-tan">our</span>
                <span className="block">Doctors</span>
              </h2>
              <p data-doc-intro className="text-small mt-6 max-w-[18rem] italic">
                Select a doctor's portrait to read their full profile.
              </p>
            </div>

            <div ref={stackRef} className="relative aspect-[100/82] w-full md:aspect-[100/70] lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:aspect-[100/68]">
              {items.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  data-doc-card
                  onClick={() => (index === active ? openProfile() : setActive(index))}
                  aria-label={index === active ? `Open the profile of ${item.name}` : `Show ${item.name}`}
                  className="absolute left-0 top-0 h-full w-[62%] cursor-pointer overflow-hidden rounded-box focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink lg:left-[2%] lg:w-[58%]"
                >
                  <span className={`grid h-full w-full place-items-center text-xs uppercase tracking-[0.22em] ${item.tone}`}>Image</span>
                  {/* a white layer that fades the portraits waiting behind the front one */}
                  <span data-doc-veil className="absolute inset-0 bg-white opacity-0" />
                </button>
              ))}
            </div>

            <div className="text-center lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:self-end lg:text-left">
              <div data-doc-swap>
                <p className="font-heading text-2xl leading-tight text-ink md:text-3xl">{doctor.name}</p>
                <ul className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
                  {doctor.tags.map((tag) => (
                    <li key={tag} className={pillClass}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-col items-center gap-6 lg:flex-row lg:gap-8">
                <div className="flex items-center gap-4">
                  <button type="button" aria-label="Previous doctor" onClick={() => go(-1)} className={arrowClass}>
                    <Arrow direction="prev" />
                  </button>
                  <button type="button" aria-label="Next doctor" onClick={() => go(1)} className={arrowClass}>
                    <Arrow direction="next" />
                  </button>
                </div>
                <p className="font-heading text-4xl leading-none text-ink" aria-live="polite">
                  {active + 1}
                  <span className="text-lg text-tan"> / {total}</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>

            <div className="text-center">
              <ul data-profile-item className="flex flex-wrap justify-center gap-2">
                {[doctor.role, ...doctor.tags].map((tag) => (
                  <li key={tag} className={pillClass}>
                    {tag}
                  </li>
                ))}
              </ul>
              <h2 id="doctors-heading" ref={profileRef} tabIndex={-1} data-profile-item className="mt-5 font-heading text-4xl leading-tight text-ink outline-none md:text-6xl xl:text-7xl">
                <span className="italic text-tan">{first}</span> {rest}
              </h2>
            </div>

            <button
              type="button"
              data-profile-item
              onClick={closeProfile}
              className="text-ui mt-10 inline-flex items-center gap-2 rounded-full border border-ink px-5 py-2 text-ink transition-colors duration-300 hover:bg-ink hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <span aria-hidden="true">←</span> All doctors
            </button>

            <div className="mt-5 grid overflow-hidden rounded-box lg:grid-cols-[0.8fr_1.2fr]">
              <div data-profile-photo className={`grid min-h-[22rem] place-items-center text-xs uppercase tracking-[0.22em] lg:min-h-[26rem] ${doctor.tone}`}>
                Image
              </div>

              <div data-profile-item className="bg-[#d9cfc2] p-6 md:p-10 xl:p-14">
                <div className="flex flex-col gap-4 ">
                  {doctor.credentials ? (
                    <div className="rounded-box bg-white px-5 py-4">
                      <p className="label">Qualifications</p>
                      <p className="mt-1 font-heading text-lg leading-snug text-ink">{doctor.credentials}</p>
                    </div>
                  ) : null}
                  {doctor.bio.map((paragraph) => (
                    <p key={paragraph} className="!text-ink">
                      {paragraph}
                    </p>
                  ))}
                  {doctor.interests ? (
                    <div className="rounded-box bg-[#231e1b] px-5 py-4">
                      <p className="label !text-cream">Special interests</p>
                      <p className="mt-1 !text-white">{doctor.interests}</p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default TeamDoctors;
