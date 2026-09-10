import { useRef } from "react";
import { gsap } from "gsap";

function Logo({ full = true, className = "" }) {
  const sweepRef = useRef(null);

  const handleEnter = () => {
    gsap.to(sweepRef.current, { width: "100%", duration: 0.55, ease: "power3.out" });
  };

  const handleLeave = () => {
    gsap.to(sweepRef.current, { width: "0%", duration: 0.4, ease: "power2.in" });
  };

  return (
    <a
      href="#hero"
      className={`group inline-flex items-center gap-3 ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Mark — tight monogram, colour sweeps in on hover, no box/border */}
      <span className="relative inline-block font-display text-2xl font-black leading-none tracking-[-0.06em] text-ink md:text-3xl">
        SM
        <span
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden whitespace-nowrap font-display text-2xl font-black leading-none tracking-[-0.06em] text-accent2 md:text-3xl"
          style={{ width: "0%" }}
          ref={sweepRef}
        >
          SM
        </span>
      </span>

      {/* Wordmark — quiet, with a subtle ambient cursor blink as the only idle detail */}
      {full && (
        <span className="hidden items-baseline font-display text-base font-medium tracking-tight text-muted transition-colors duration-300 sm:inline-flex group-hover:text-ink md:text-lg">
          Sumit Mokasare
          <span
            className="ml-1 inline-block h-[0.9em] w-px translate-y-2 bg-accent2/70"
            style={{ animation: "logo-cursor-blink 1.4s steps(1) infinite" }}
          />
        </span>
      )}
    </a>
  );
}

export default Logo;
