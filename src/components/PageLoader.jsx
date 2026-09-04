import { useEffect, useRef } from "react";
import gsap from "gsap";

function PageLoader({ onComplete }) {
  const loaderRef = useRef(null);
  const titleRef = useRef(null);
  const barRef = useRef(null);
  const counterRef = useRef(null);
  useEffect(() => {
    const counterObj = { value: 100 };

    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    // Title
    tl.fromTo(
      titleRef.current,
      {
        y: -30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      },
    )

      // Counter
      .to(counterObj, {
        value: 0,
        duration: 2.2,
        ease: "power1.inOut",

        onUpdate: () => {
          const value = Math.ceil(counterObj.value);

          if (counterRef.current) {
            counterRef.current.textContent = value;
          }

          if (barRef.current) {
            gsap.set(barRef.current, {
              scaleX: 1 - value / 100,
            });
          }
        },
      })

      // Small pause
      .to({}, { duration: 0.25 })

      // Loader slides up
      .to(loaderRef.current, {
        yPercent: -100,
        duration: 1.3,
        ease: "power4.inOut",
        force3D: true,
        onComplete: () => {
          onComplete?.();
        },
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="
        fixed inset-0 z-50
        flex flex-col items-center justify-center
        gap-8
        bg-bg text-ink
         transform-gpu
    will-change-transform"
    >
      {/* TITLE */}

      <h1
        ref={titleRef}
        className="
          text-center
          text-4xl
          font-bold
          tracking-tight
          sm:text-6xl
          md:text-7xl
        "
      >
        Full Stack <span className="text-accent">Developer</span>
      </h1>

      {/* LOADING */}

      <div className="flex w-56 flex-col items-center gap-3 sm:w-72">
        {/* BAR */}

        <div className="h-3 w-full overflow-hidden bg-line">
          <div
            ref={barRef}
            className="
              h-full
              w-full
              origin-left
              scale-x-0
              bg-accent
            "
          />
        </div>

        {/* COUNTER */}

        <div className="flex w-full justify-between">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted">Loading</span>

          <span ref={counterRef} className="text-xs font-medium tabular-nums text-ink">
            100
          </span>
        </div>
      </div>

      {/* BOTTOM TEXT */}

      <div className="absolute bottom-6 left-6 right-6 flex justify-between text-[10px] uppercase tracking-[0.2em] text-muted md:left-12 md:right-12">
        <span>Sumit mokasare</span>

        <span>2026</span>
      </div>
    </div>
  );
}

export default PageLoader;
