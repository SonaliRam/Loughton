import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

// fonts change the page height after the first paint, so the scroll positions are measured again once they load
if (typeof document !== "undefined" && document.fonts) {
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}

// the scroll positions are measured again whenever the page height changes, for example when a filter or an accordion opens
if (typeof ResizeObserver !== "undefined" && typeof document !== "undefined") {
  let refreshTimer;
  new ResizeObserver(() => {
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
  }).observe(document.documentElement);
}
