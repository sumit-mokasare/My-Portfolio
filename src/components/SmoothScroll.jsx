import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });
    window.lenis = lenis;
    // Lenis ko GSAP ke render loop (ticker) se sync karo — best performance
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <>{children}</>;
}

export function scrollToSection(id) {
  const target = document.querySelector(id);
  if (!target) return;

  if (window.lenis) {
    window.lenis.scrollTo(target, {
      offset: -80,
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      immediate: false, // yeh line zaroori hai — force karti hai ki jump na ho
    });
  } else {
    // Lenis abhi mount nahi hua to bhi smooth scroll fallback
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
