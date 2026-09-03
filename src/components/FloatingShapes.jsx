import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const shapeTypes = ["circle", "ring", "square", "triangle", "cross", "diamond"];

function FloatingShapes() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".floating-shape");

      elements.forEach((el, index) => {
        // Random values for each shape
        const startX = gsap.utils.random(0, window.innerWidth);
        const startY = gsap.utils.random(0, window.innerHeight);

        const moveX = gsap.utils.random(-80, 80);
        const moveY = gsap.utils.random(-60, 60);

        const rotation = gsap.utils.random(-180, 180);
        const duration = gsap.utils.random(8, 18);
        const scale = gsap.utils.random(0.6, 1.5);
        const opacity = gsap.utils.random(0.3, 0.65);

        // Starting state
        gsap.set(el, {
          x: startX,
          y: startY,
          rotation,
          scale,
          opacity,
        });

        // Main floating animation
        gsap.to(el, {
          x: `+=${moveX}`,
          y: `+=${moveY}`,
          rotation: `+=${gsap.utils.random(-90, 90)}`,
          duration,
          delay: gsap.utils.random(0, 5),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        // Very subtle scale breathing
        gsap.to(el, {
          scale: scale * gsap.utils.random(0.85, 1.15),
          duration: gsap.utils.random(4, 8),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: gsap.utils.random(0, 3),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-5 overflow-hidden">
      {Array.from({ length: 20 }).map((_, index) => {
        const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];

        const isAccent2 = index % 6 === 0;

        const size = Math.floor(Math.random() * 70) + 15;

        return (
          <div
            key={index}
            className={`floating-shape absolute ${isAccent2 ? "text-accent2" : "text-accent"}`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              filter: "drop-shadow(0 0 6px currentColor)",
            }}
          >
            <Shape type={type} />
          </div>
        );
      })}
    </div>
  );
}

function Shape({ type }) {
  switch (type) {
    case "circle":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
          <circle cx="50" cy="50" r="34" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeWidth="2" />
        </svg>
      );

    case "ring":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
          <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="2" />

          <circle cx="50" cy="50" r="24" stroke="currentColor" strokeWidth="1.5" />

          <circle cx="50" cy="50" r="5" fill="currentColor" />
        </svg>
      );

    case "square":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
          <rect
            x="18"
            y="18"
            width="64"
            height="64"
            rx="6"
            fill="currentColor"
            fillOpacity="0.05"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );

    case "triangle":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
          <path
            d="M50 12 L88 82 L12 82 Z"
            fill="currentColor"
            fillOpacity="0.04"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );

    case "cross":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
          <path d="M50 10V90M10 50H90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case "diamond":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
          <path
            d="M50 10 L90 50 L50 90 L10 50 Z"
            fill="currentColor"
            fillOpacity="0.05"
            stroke="currentColor"
            strokeWidth="2"
          />

          <circle cx="50" cy="50" r="5" fill="currentColor" />
        </svg>
      );

    default:
      return null;
  }
}

export default FloatingShapes;
