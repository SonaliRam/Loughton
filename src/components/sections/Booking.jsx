import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { bookingBenefits } from "../../data/booking";
import { siteInfo } from "../../data/site";
import useReveal from "../../hooks/useReveal";
import BookingForm from "../ui/BookingForm";
import { CheckCircleIcon } from "../ui/Icons";

// dark makes the left panel dark, used on the booking page; the home page keeps the cream panel
function Booking({ dark = false }) {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  useReveal(panelRef, "[data-reveal]", { y: 30, stagger: 0.1 });

  // the cream panel wipes in from the top before its content appears
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(sectionRef.current);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-panel]", {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 1.1,
        ease: "power3.inOut",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="booking"
      aria-labelledby="booking-heading"
      className="page-width-whole"
    >
      <div className="grid lg:grid-cols-[2fr_3fr]">
        <div ref={panelRef} className="relative">
          <div data-panel aria-hidden="true" className={`absolute inset-0 ${dark ? "bg-[#231e1b]" : "bg-cream"}`} />

          <div className="relative flex h-full flex-col px-5 py-12 md:px-10 md:py-16 xl:px-[5.625rem] xl:pb-[8rem] xl:pt-[7rem]">
            <p data-reveal className="label">
              Booking
            </p>

            <h2
              id="booking-heading"
              data-reveal
              className={`mt-6 max-w-[36rem] xl:mt-[3.75rem] ${dark ? "!text-white" : "text-ink"}`}
            >
              Healthcare, delivered
              <br className="hidden min-[1536px]:inline" /> with the time &amp;
              <br className="hidden min-[1536px]:inline" /> attention it deserves.
            </h2>

            <p
              data-reveal
              className={`text-lead mt-6 max-w-[36rem] xl:mt-[2.25rem] ${dark ? "!text-[#c9bdad]" : ""}`}
            >
              We offer flexible booking options to suit your schedule. Whether you prefer to book
              online, call us directly, or reach us via WhatsApp, our team will make the process as
              smooth and straightforward as possible.
            </p>

            <ul className="mt-10 grid gap-6 xl:mt-[4rem] xl:gap-[2.5rem]">
              {bookingBenefits.map((item) => (
                <li key={item.title} data-reveal className="group flex items-center gap-5">
                  <CheckCircleIcon className="h-12 w-12 shrink-0 text-tan transition-transform duration-300 group-hover:scale-110" />
                  <div>
                    <p className={`text-lead ${dark ? "!text-white" : "text-body"}`}>{item.title}</p>
                    <p className={`text-small mt-1 ${dark ? "!text-[#c9bdad]" : ""}`}>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div data-reveal className="mt-10 xl:mt-auto xl:pt-[4rem]">
              <p className="label">Need help booking?</p>
              <p className={`text-lead mt-4 ${dark ? "!text-white" : "text-body"}`}>
                Call:{" "}
                <a href={siteInfo.phoneLink} className="underline-offset-4 hover:underline">
                  {siteInfo.phone}
                </a>
              </p>
              <p className={`text-lead mt-2 ${dark ? "!text-white" : "text-body"}`}>
                Email:{" "}
                <a href={`mailto:${siteInfo.email}`} className="underline-offset-4 hover:underline">
                  {siteInfo.email}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="px-5 py-12 md:px-10 md:py-16 lg:px-12 xl:pb-[4.5rem] xl:pl-[6rem] xl:pr-[10.5rem] xl:pt-[5.5rem]">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}

export default Booking;
