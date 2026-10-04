import { useEffect, useRef } from "react";
import gsap from "gsap";

const INTERACTIVE = "a, button, [role='button'], [data-cursor]";

/**
 * Custom cursor: a gliding ring with a sharp dot at its centre.
 *  - dot  → locked to the pointer (zero lag)
 *  - ring → eased toward the pointer every frame, and smoothly scales up over links / buttons
 *
 * Add data-cursor="view" to any element for the big filled "View" ring.
 * All hover animation is done with GSAP (not CSS transitions), so no global CSS rule can break it.
 */
function CustomCursor({ hideNativeCursor = true }) {
  const ringWrapRef = useRef(null);
  const circleRef = useRef(null);
  const fillRef = useRef(null);
  const labelRef = useRef(null);
  const dotWrapRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;

    const ringWrap = ringWrapRef.current;
    const dotWrap = dotWrapRef.current;
    const circle = circleRef.current;
    const fill = fillRef.current;
    const label = labelRef.current;
    const dot = dotRef.current;

    gsap.set([ringWrap, dotWrap], { autoAlpha: 0 });
    gsap.set(label, { autoAlpha: 0, scale: 0.7 });

    /* ───────── Smooth position tracking ───────── */
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let visible = false;

    const FOLLOW = 0.16; // lower = lazier / floatier ring (0.1 – 0.25)

    const tick = (_time, deltaTime) => {
      const frames = Math.min(deltaTime, 50) / 16.667; // same feel on 60Hz and 144Hz screens
      const k = 1 - Math.pow(1 - FOLLOW, frames);

      ringX += (mouseX - ringX) * k;
      ringY += (mouseY - ringY) * k;

      ringWrap.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      dotWrap.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };
    gsap.ticker.add(tick);

    /* ───────── Smooth hover scaling ───────── */
    let state = "idle"; // idle | link | view
    let pressed = false;

    const SCALE = { idle: 1, link: 1.6, view: 2.8 };

    const render = () => {
      const isView = state === "view";

      // ring grows smoothly (scale only → GPU friendly)
      gsap.to(circle, { scale: SCALE[state], duration: 0.55, ease: "power3.out", overwrite: "auto" });
      gsap.to(fill, {
        opacity: isView ? 1 : state === "link" ? 0.12 : 0,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(label, {
        autoAlpha: isView ? 1 : 0,
        scale: isView ? 1 : 0.7,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });

      // dot reacts too
      const dotScale = pressed ? 1.7 : isView ? 0 : state === "link" ? 1.3 : 1;
      gsap.to(dot, { scale: dotScale, duration: 0.3, ease: "power3.out", overwrite: "auto" });
    };

    const setState = (next) => {
      if (state === next) return;
      state = next;
      render();
    };

    /* ───────── Events ───────── */
    const show = (x, y) => {
      mouseX = ringX = x; // start exactly under the pointer, never flying in from a corner
      mouseY = ringY = y;
      gsap.to([ringWrap, dotWrap], { autoAlpha: 1, duration: 0.25, overwrite: "auto" });
      visible = true;
    };

    const hide = () => {
      visible = false;
      gsap.to([ringWrap, dotWrap], { autoAlpha: 0, duration: 0.2, ease: "power2.out", overwrite: "auto" });
    };

    const handleMove = (e) => {
      if (!visible) show(e.clientX, e.clientY);
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleOver = (e) => {
      // the cursor can't track over an iframe (e.g. the resume preview), so hide it there
      if (e.target.tagName === "IFRAME") {
        hide();
        return;
      }
      const target = e.target.closest?.(INTERACTIVE);
      if (!target) return;
      setState(target.dataset.cursor === "view" ? "view" : "link");
    };

    const handleOut = (e) => {
      const target = e.target.closest?.(INTERACTIVE);
      if (!target) return;
      if (e.relatedTarget && target.contains(e.relatedTarget)) return;
      setState("idle");
    };

    const handleDown = () => {
      pressed = true;
      render();
    };
    const handleUp = () => {
      pressed = false;
      render();
    };

    // hide the system arrow so only ring + dot show (text fields keep their normal text cursor)
    let styleEl;
    if (hideNativeCursor) {
      styleEl = document.createElement("style");
      styleEl.textContent =
        "html, body, a, button, [role='button'], [data-cursor], label, summary { cursor: none !important; }";
      document.head.appendChild(styleEl);
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.documentElement.addEventListener("mouseleave", hide);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      gsap.ticker.remove(tick);
      gsap.killTweensOf([ringWrap, dotWrap, circle, fill, label, dot]);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.documentElement.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      styleEl?.remove();
    };
  }, [hideNativeCursor]);

  return (
    <>
      {/* RING */}
      <div
        ref={ringWrapRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[150] h-0 w-0 will-change-transform"
      >
        <span
          ref={circleRef}
          className="absolute -left-[18px] -top-[18px] block h-9 w-9 overflow-hidden rounded-full border border-accent/70 shadow-[0_0_24px_-6px_var(--accent)]"
        >
          <span ref={fillRef} className="absolute inset-0 rounded-full bg-accent opacity-0" />
        </span>

        {/* label sits in its own box so it never scales with the circle */}
        <span className="absolute -left-10 -top-10 flex h-20 w-20 items-center justify-center">
          <span ref={labelRef} className="text-[10px] font-medium uppercase tracking-widest text-bg">
            View
          </span>
        </span>
      </div>

      {/* DOT */}
      <div
        ref={dotWrapRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[151] h-0 w-0 will-change-transform"
      >
        <span
          ref={dotRef}
          className="absolute -left-[3px] -top-[3px] block h-1.5 w-1.5 rounded-full bg-accent2 shadow-[0_0_10px_var(--accent2)]"
        />
      </div>
    </>
  );
}

export default CustomCursor;
