import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "../../lib/gsap";
import { footerLinks, siteInfo, socialLinks } from "../../data/site";
import Logo from "../ui/Logo";

const linkClass = "text-body transition-colors hover:text-ink";
const currentYear = new Date().getFullYear();

function Footer() {
  const footerRef = useRef(null);

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
          start: "top 90%",
          once: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <footer ref={footerRef} className="border-t border-cream bg-white">
      <div className="page-width-small grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-2 md:gap-x-10 xl:grid-cols-[1.9fr_1fr_1fr_1fr] xl:gap-x-8 xl:py-14">
        <div data-footer-col className="col-span-2 md:col-span-1">
          <Logo />
          <address className="text-small mt-6 max-w-[26.25rem] not-italic">
            {siteInfo.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>

        <div data-footer-col>
          <h2 className="label font-body">Quick Links</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div data-footer-col>
          <h2 className="label font-body">Contact</h2>
          <ul className="mt-4 flex flex-col gap-3">
            <li>
              <a href={siteInfo.phoneLink} className={`${linkClass} text-small md:text-[length:var(--fs-body)]`}>
                {siteInfo.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteInfo.email}`} className={`${linkClass} text-small break-words md:text-[length:var(--fs-body)]`}>
                {siteInfo.email}
              </a>
            </li>
          </ul>
        </div>

        <div data-footer-col className="col-span-2 md:col-span-1">
          <h2 className="label font-body">Follow</h2>
          <ul className="mt-4 flex flex-row flex-wrap gap-x-6 gap-y-3 md:flex-col">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream">
        <div className="page-width-small flex flex-col gap-3 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-small">
            © {currentYear} Loughton Private GP. All rights reserved.
          </p>
          <ul className="text-small flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link to="/privacy-policy" className={linkClass}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-and-conditions" className={linkClass}>
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
