import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

// fonts change the page height after the first paint, so the scroll positions are measured again once they load
if (typeof document !== "undefined" && document.fonts) {
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}
