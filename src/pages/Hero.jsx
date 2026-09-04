import { useGSAP } from "@gsap/react";
import AvatarCanvas from "../components/AvatarCanvas";
import Button from "../components/Button";
import FloatingShapes from "../components/FloatingShapes";
import Navbar from "../components/Navbar";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useState } from "react";
gsap.registerPlugin(SplitText);

function Hero() {
  const [avatarLoading, setAvatarLoading] = useState(true);

  useGSAP(() => {
    const titleSplite = SplitText.create(".title-heading", {
      type: "chars",
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
  });
  return (
    <div className="relative h-screen w-full overflow-hidden bg-bg text-ink font-display pointer-events-none ">
      <div className="floating-shapes inset-0 z-0 pointer-events-none">
        <FloatingShapes />
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

      {/* Text overlay */}
      <div className="hero-content absolute inset-0 z-10 flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-12 pointer-events-none">
        <div className="overflow-hidden">
          <h1 className="title-heading font-bold leading-[0.92] tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ink">
            Full-Stack
            <br />
            Developer
          </h1>
        </div>

        <p className="hero-subtitle pointer-events-none font-voice italic text-accent2 text-lg md:text-2xl mt-5">
          Fullstack developer building for the web
        </p>

        <p className="hero-description pointer-events-none font-voice  text-muted text-sm md:text-sm mt-2">
          Building modern web applications with React, Node.js and Generative AI.
        </p>

        <div className="hero-buttons pointer-events-auto flex gap-4 mt-8">
          <Button data-cursor="view" variant="primary" href="#work">
            View work
          </Button>
          <Button variant="secondary" href="#contact">
            Say hello
          </Button>
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
