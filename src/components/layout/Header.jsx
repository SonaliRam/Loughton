import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { navLinks } from "../../data/site";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import { CloseIcon, MenuIcon } from "../ui/Icons";

const desktopLinkClass = ({ isActive }) =>
  `whitespace-nowrap border-b pb-1 text-ui transition-colors ${
    isActive
      ? "border-ink font-medium text-ink"
      : "border-transparent text-body hover:text-ink"
  }`;

const mobileLinkClass = ({ isActive }) =>
  `block py-3 text-[1.0625rem] transition-colors ${
    isActive ? "font-medium text-ink" : "text-body hover:text-ink"
  }`;

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const menuOpenRef = useRef(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  // close on Escape, lock page scroll, close if the screen grows to desktop
  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1280) setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  // page load animation and hide on scroll down, show on scroll up
  useLayoutEffect(() => {
    const header = headerRef.current;
    const mm = gsap.matchMedia(header);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-header-item]", {
        y: -16,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
      });

      const hideHeader = gsap.to(header, {
        yPercent: -100,
        duration: 0.35,
        ease: "power2.out",
        paused: true,
      });

      const trigger = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const goingDown = self.direction === 1;
          if (goingDown && self.scroll() > 160 && !menuOpenRef.current) {
            hideHeader.play();
          } else if (!goingDown) {
            hideHeader.reverse();
          }
        },
      });

      const showOnFocus = () => hideHeader.reverse();
      header.addEventListener("focusin", showOnFocus);

      return () => {
        header.removeEventListener("focusin", showOnFocus);
        trigger.kill();
        hideHeader.kill();
      };
    });

    return () => mm.revert();
  }, []);

  // mobile menu open animation
  useLayoutEffect(() => {
    if (!menuOpen) return undefined;

    const mm = gsap.matchMedia(menuRef.current);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(menuRef.current, {
        opacity: 0,
        y: -12,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.from("[data-menu-item]", {
        opacity: 0,
        y: 12,
        duration: 0.4,
        delay: 0.05,
        stagger: 0.05,
        ease: "power2.out",
      });
    });

    return () => mm.revert();
  }, [menuOpen]);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-white">
      <div className="page-width-small flex h-20 items-center justify-between gap-6 md:h-24 xl:h-[7.9375rem]">
        <div data-header-item>
          <Logo />
        </div>

        <nav aria-label="Main" className="hidden xl:block" data-header-item>
          <ul className="flex items-center gap-8 2xl:gap-16">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === "/"} className={desktopLinkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-4">
          <div className="hidden md:block" data-header-item>
            <Button to="/booking">Book An Appointment</Button>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-box text-ink xl:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            data-header-item
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="absolute inset-x-0 top-full h-[calc(100dvh-5rem)] overflow-y-auto border-t border-cream bg-white md:h-[calc(100dvh-6rem)] xl:hidden"
        >
          <nav aria-label="Mobile" className="page-width-small py-4">
            <ul>
              {navLinks.map((link) => (
                <li key={link.to} data-menu-item className="border-b border-cream last:border-b-0">
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={mobileLinkClass}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
