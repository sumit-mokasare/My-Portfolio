import { useState } from "react";

/**
 * Portrait card: grayscale + muted border by default,
 * full colour + accent border + glow when hovered, focused or tapped.
 *
 * Usage:  <PhotoCard src="/sumit.jpg" alt="Sumit Mokasare" className="max-w-sm" />
 */

export default function PhotoCard({ src = "/sumit.jpg", alt = "Portrait of Sumit Mokasare", className = "max-w-sm" }) {
  const [failed, setFailed] = useState(false);

  // Touch devices have no hover, so start in colour there.
  const [active, setActive] = useState(
    () => typeof window !== "undefined" && window.matchMedia?.("(hover: none)").matches,
  );

  return (
    <figure
      tabIndex={0}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className={`relative z-20 mx-auto w-full cursor-pointer overflow-hidden rounded-3xl border-4 bg-bg shadow-lg
        outline-none transition-all duration-300 ease-out motion-reduce:transition-none ${className}
        ${active ? "border-accent shadow-accent/30" : "border-line shadow-transparent"}`}
    >
      {/* Photo */}
      <div className="aspect-[4/6] w-full overflow-hidden">
        {failed ? (
          <div className="flex h-full w-full items-center justify-center bg-surface font-display text-6xl font-bold text-accent">
            SM
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            onError={() => setFailed(true)}
            style={{ filter: active ? "grayscale(0)" : "grayscale(1)" }}
            className={`h-full w-full transform-gpu object-cover object-top transition-all duration-300 ease-in
              motion-reduce:transition-none ${active ? "scale-[1.03]" : "scale-100"}`}
          />
        )}
      </div>
    </figure>
  );
}
