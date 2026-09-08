import { useGSAP } from "@gsap/react";
import AvatarCanvas from "../components/AvatarCanvas";
import Button from "../components/Button";
import FloatingShapes from "../components/FloatingShapes";
import Navbar from "../components/Navbar";
import { SplitText, ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useState, useRef } from "react";
gsap.registerPlugin(SplitText, ScrollTrigger);

function Hero() {
  const [avatarLoading, setAvatarLoading] = useState(true);
  const heroRef = useRef();
  useGSAP(
    () => {
      const gradientCSS =
        "linear-gradient(90deg, var(--color-ink) 0%, var(--color-accent2) 50%, var(--color-ink) 100%)";

      const titleSplite = SplitText.create(".title-heading", {
        type: "chars",
        onSplit: (self) => {
          self.chars.forEach((char) => {
            const parentLine = char.closest("h1") || char.parentElement;
            const lineWidth = parentLine.offsetWidth;

            char.style.backgroundImage = gradientCSS;
            char.style.WebkitBackgroundClip = "text";
            char.style.backgroundClip = "text";
            char.style.color = "transparent";
            char.style.backgroundSize = `${lineWidth}px 100%`;
            char.style.backgroundPosition = `-${char.offsetLeft}px 0`;
          });
        },
      });

      const tl = gsap.timeline({
        delay: 1,
      });

      tl.to(".hero-content", {
        y: -20,
        duration: 0.7,
        opacity: 1,
        ease: "power1.inOut",
      })
        .from(".navbar", {
          y: -30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        })

        .from(
          titleSplite.chars,
          {
            yPercent: 200,
            opacity: 0,
            stagger: 0.02,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          ".floating-shapes",
          {
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.2",
        )
        // Subtitle
        .from(
          ".hero-subtitle",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.35",
        )
        // Description
        .from(
          ".hero-description",
          {
            y: 15,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3",
        )
        // Buttons
        .from(
          ".hero-buttons",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.25",
        )
        // Open to work
        .from(
          ".open-to-work",
          {
            y: -15,
            opacity: 0,
            scale: 0.95,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.45",
        );

      // ---- Scroll Parallax ----
      const parallaxTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      parallaxTl
        .to(
          ".title-heading",
          {
            yPercent: -40,
            opacity: 0.15,
            ease: "none",
          },
          0,
        )
        .to(
          ".hero-avatar-layer",
          {
            yPercent: 15,
            ease: "none",
          },
          0,
        )
        .to(
          ".floating-shapes",
          {
            yPercent: 30,
            ease: "none",
          },
          0,
        )
        .to(
          ".hero-content",
          {
            yPercent: 20,
            opacity: 0,
            ease: "none",
          },
          0,
        );
    },
    { scope: heroRef },
  );
  return (
    <div
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-bg text-ink font-display pointer-events-none "
    >
      <div className="floating-shapes absolute inset-0 z-10 pointer-events-none">
        <FloatingShapes />
      </div>
      {/* Heading — top par, wide, avatar ke peeche (z-0), jaisa screenshot me hai */}
      <div className="absolute inset-x-0 top-16 md:top-20 z-0 px-4 md:px-10 pointer-events-none overflow-hidden">
        <h1 className="title-heading font-extrabold leading-[0.85] tracking-tight text-[15vw] sm:text-[12vw] md:text-[8vw] text-center">
          HI, I'M SUMIT
        </h1>
      </div>

      {/* Avatar — full-bleed background layer, still interactive (orbit drag) */}
      <div className="absolute inset-0 z-10">
        <AvatarCanvas onLoaded={() => setAvatarLoading(false)} />
        {avatarLoading && (
          <div className="absolute inset-0 flex items-center justify-center ">
            <div className="flex items-center gap-3">
              {/* Loading dots */}
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent2 [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent2 [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent2" />
              </div>

              <span className="text-xs uppercase tracking-[0.2em] text-muted">Loading avatar</span>
            </div>
          </div>
        )}
      </div>

      {/* Navbar */}
      <div className="navbar z-20 fixed top-0 left-0 right-0 w-full pointer-events-auto ">
        <Navbar />
      </div>

      {/* OPEN TO WORK */}

      <div className="open-to-work absolute right-6 top-20 z-10 md:right-12 pointer-events-none">
        <div className="group flex items-center gap-3 rounded-full border border-line bg-surface/60 px-4 py-2 backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent2 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent2" />
          </span>

          <span className="text-xs font-medium uppercase tracking-[0.15em] text-ink">Open to work</span>
        </div>
      </div>

      {/* Bottom content — subtitle/description left, buttons right, jaisa screenshot me hai */}
      <div className="hero-content absolute top-1/2 inset-0 z-10 flex flex-col justify-center pb-20 md:pb-28 px-6 md:px-12 pointer-events-none">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md">
            <p className="hero-subtitle pointer-events-none font-voice font-bold text-accent2 text-lg md:text-2xl">
              Fullstack developer building for the web
            </p>

            <p className="hero-description pointer-events-none font-voice  text-muted text-sm md:text-sm mt-2">
              Building modern web applications with React, Node.js and Generative AI.
            </p>
          </div>

          <div className="hero-buttons pointer-events-auto flex gap-4">
            <Button data-cursor="view" variant="primary" href="#work">
              View work
            </Button>
            <Button variant="secondary" href="#contact">
              Say hello
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 md:left-12 right-6 md:right-12 z-10 flex justify-between text-xs text-muted pointer-events-none">
        <span>based in nagpur, india</span>
        <span>scroll to explore ↓</span>
      </div>
    </div>
  );
}
export default Hero;
