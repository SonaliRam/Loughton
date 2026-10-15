import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "../../lib/gsap";
import { footerLinks, siteInfo, socialLinks } from "../../data/site";
import { mainServices, moreServices } from "../../data/services";
import Logo from "../ui/Logo";
import { ChevronDownIcon, FacebookIcon, InstagramIcon, LinkedInIcon } from "../ui/Icons";

const linkClass = "block py-2.5 text-body transition-colors hover:text-ink md:py-0";
const currentYear = new Date().getFullYear();
const footerServices = [...mainServices, ...moreServices];
const socialIcons = { Instagram: InstagramIcon, LinkedIn: LinkedInIcon, Facebook: FacebookIcon };

// on mobile the heading is a button that opens and closes the list, from tablet up the list is always shown
function FooterColumn({ id, title, open, onToggle, className = "", children }) {
  const listId = `footer-${id}`;

  return (
    <div data-footer-col className={`border-b border-cream md:border-0 ${className}`}>
      <h2 className="md:hidden">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={listId}
          onClick={onToggle}
          className="label font-body flex min-h-14 w-full items-center justify-between text-left"
        >
          {title}
          <ChevronDownIcon
            className={`h-4 w-4 transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
          />
        </button>
      </h2>
      <h2 className="label font-body hidden md:block">{title}</h2>
      <ul id={listId} className={`${open ? "flex" : "hidden"} flex-col pb-4 md:mt-4 md:flex md:gap-3 md:pb-0`}>
        {children}
      </ul>
    </div>
  );
}

function Footer() {
  const footerRef = useRef(null);
  const [openColumn, setOpenColumn] = useState(null);

  // only one list is open at a time, tapping the open one closes it
  const toggle = (id) => setOpenColumn((current) => (current === id ? null : id));

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(footerRef.current);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-footer-col]", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          once: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <footer ref={footerRef} className="border-t border-cream bg-white">
      <div className="page-width-small grid grid-cols-1 py-12 md:grid-cols-3 md:gap-x-10 md:gap-y-8 xl:grid-cols-[1.6fr_1fr_1fr_1.3fr] xl:grid-rows-[auto_1fr] xl:gap-x-8 xl:gap-y-6 xl:py-14">
        <div data-footer-col className="mb-8 md:col-span-3 md:mb-0 xl:col-span-1 xl:col-start-1 xl:row-start-1">
          <Logo />
          <address className="text-small mt-6 max-w-[26.25rem] not-italic">
            {siteInfo.address.join(" ")}
          </address>
        </div>

        <FooterColumn
          id="links"
          title="Quick Links"
          open={openColumn === "links"}
          onToggle={() => toggle("links")}
          className="border-t md:border-t-0 xl:col-start-2 xl:row-span-2 xl:row-start-1"
        >
          {footerLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className={linkClass}>
                {link.label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn
          id="contact"
          title="Contact"
          open={openColumn === "contact"}
          onToggle={() => toggle("contact")}
          className="xl:col-start-3 xl:row-span-2 xl:row-start-1"
        >
          <li>
            <a href={siteInfo.phoneLink} className={linkClass}>
              {siteInfo.phone}
            </a>
          </li>
          <li>
            <a href={`mailto:${siteInfo.email}`} className={`${linkClass} break-words`}>
              {siteInfo.email}
            </a>
          </li>
        </FooterColumn>

        <FooterColumn
          id="services"
          title="Services"
          open={openColumn === "services"}
          onToggle={() => toggle("services")}
          className="xl:col-start-4 xl:row-span-2 xl:row-start-1"
        >
          {footerServices.map((service) => (
            <li key={service.to}>
              <Link to={service.to} className={linkClass}>
                {service.title}
              </Link>
            </li>
          ))}
        </FooterColumn>

        {/* last on mobile, under the address from tablet up */}
        <ul
          data-footer-col
          aria-label="Follow us"
          className="order-last mt-8 flex gap-3 md:order-none md:col-span-3 md:row-start-2 md:mt-0 xl:col-span-1 xl:col-start-1 xl:row-start-2"
        >
          {socialLinks.map((link) => {
            const Icon = socialIcons[link.label];

            return (
              <li key={link.label}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="grid h-[44px] w-[44px] place-items-center rounded-full border border-tan text-tan transition-colors duration-300 hover:bg-tan hover:text-white focus-visible:bg-tan focus-visible:text-white"
                >
                  <Icon className="h-[1.125rem] w-[1.125rem]" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border-t border-cream">
        <div className="page-width-small flex flex-col gap-3 py-6 md:flex-row-reverse md:items-center md:justify-between">
          <ul className="text-small flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link to="/privacy-policy" className="text-body transition-colors hover:text-ink">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/complaints-procedure" className="text-body transition-colors hover:text-ink">
                Complaints Procedure
              </Link>
            </li>
          </ul>
          <p className="text-small">
            © {currentYear} Loughton Private GP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
