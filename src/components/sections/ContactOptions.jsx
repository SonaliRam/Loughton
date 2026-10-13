import { useRef } from "react";
import { Link } from "react-router-dom";
import { contactIntro } from "../../data/contact";
import { siteInfo } from "../../data/site";
import useReveal from "../../hooks/useReveal";
import { CalendarIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "../ui/Icons";

const options = [
  {
    title: "Book Online",
    text: "Use our secure Semble online booking portal, available 24/7. Choose your preferred GP, appointment type, and time slot.",
    value: "Book an Appointment",
    to: "/booking",
    icon: CalendarIcon,
  },
  {
    title: "Call Us",
    text: "Speak directly with our team during clinic hours. We are always happy to answer questions before you book.",
    value: siteInfo.phone,
    href: siteInfo.phoneLink,
    icon: PhoneIcon,
  },
  {
    title: "WhatsApp",
    text: "Message us on WhatsApp for a fast, convenient way to book or ask a quick question.",
    value: siteInfo.phone,
    href: siteInfo.whatsappLink,
    icon: WhatsAppIcon,
  },
  {
    title: "Email",
    text: "Send us an email for bookings, enquiries, or any questions. We’ll be happy to help.",
    value: siteInfo.email,
    href: `mailto:${siteInfo.email}`,
    icon: MailIcon,
  },
];

const cardClass =
  "group flex h-full flex-col rounded-box border border-tan/50 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-tan hover:shadow-[0_18px_40px_-22px_rgba(35,30,27,0.35)] md:p-7";

function OptionCard({ title, text, value, icon: Icon }) {
  return (
    <>
      <span className="mb-6 grid h-[3.25rem] w-[3.25rem] place-items-center rounded-full border border-tan text-tan transition-colors duration-300 group-hover:bg-tan group-hover:text-white">
        <Icon className="h-6 w-6" />
      </span>
      <h2 className="text-xl">{title}</h2>
      {text ? <p className="text-small mt-2">{text}</p> : null}
      <strong className="mt-auto break-words pt-5 font-medium text-ink">
        {value}
      </strong>
    </>
  );
}

function ContactOptions() {
  const sectionRef = useRef(null);
  useReveal(sectionRef, "[data-reveal]", { y: 30, stagger: 0.08 });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="contact-heading"
      className="page-width-small section-space"
    >
      <div className="text-center">
        <p data-reveal className="label">
          {contactIntro.label}
        </p>
        <h1 id="contact-heading" data-reveal className="mt-4">
          {contactIntro.title}
        </h1>
        <p data-reveal className="text-lead mx-auto mt-6 max-w-[46rem]">
          {contactIntro.text}
        </p>
      </div>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:mt-14 xl:grid-cols-4 xl:gap-6">
        {options.map((option) => (
          <li key={option.title} data-reveal>
            {option.to ? (
              <Link to={option.to} className={cardClass}>
                <OptionCard {...option} />
              </Link>
            ) : (
              <a href={option.href} className={cardClass}>
                <OptionCard {...option} />
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ContactOptions;
