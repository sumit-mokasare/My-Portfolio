import { useEffect, useRef } from "react";
import gsap from "gsap";

function CustomCursor() {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const isInsideRef = useRef(true); // track whether pointer is over the document

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const text = textRef.current;

    gsap.set(cursor, { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    const moveCursor = (e) => {
      if (!isInsideRef.current) return;
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.45, ease: "power3.out" });
    };

    const handleMouseLeaveDoc = () => {
      isInsideRef.current = false;
      gsap.killTweensOf(cursor, "autoAlpha");
      gsap.to(cursor, { autoAlpha: 0, duration: 0.2, ease: "power2.out" });
    };

    const handleMouseEnterDoc = (e) => {
      isInsideRef.current = true;
      gsap.set(cursor, { x: e.clientX, y: e.clientY });
      gsap.killTweensOf(cursor, "autoAlpha");
      gsap.to(cursor, { autoAlpha: 1, duration: 0.2 });
    };

    // --- Event delegation: sirf ek listener, dynamic elements bhi cover honge ---
    const handleOver = (e) => {
      const target = e.target.closest("a, button, [data-cursor]");
      if (!target) return;

      const type = target.dataset.cursor;

      if (type === "view") {
        gsap.to(cursor, {
          width: 90,
          height: 90,
          backgroundColor: "var(--color-accent)",
          borderColor: "var(--color-accent)",
          duration: 0.3,
          ease: "power3.out",
        });
        gsap.to(text, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" });
      } else {
        gsap.to(cursor, { width: 55, height: 55, duration: 0.3, ease: "power3.out" });
      }
    };

    const handleOut = (e) => {
      const target = e.target.closest("a, button, [data-cursor]");
      if (!target) return;

      // agar naya target bhi interactive hai (nested elements), to skip
      if (e.relatedTarget && e.relatedTarget.closest("a, button, [data-cursor]") === target) return;

      gsap.to(cursor, {
        width: 32,
        height: 32,
        backgroundColor: "transparent",
        borderColor: "var(--color-accent)",
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(text, { opacity: 0, scale: 0.5, duration: 0.2 });
    };

    window.addEventListener("mousemove", moveCursor);
    document.documentElement.addEventListener("mouseleave", handleMouseLeaveDoc);
    document.documentElement.addEventListener("mouseenter", handleMouseEnterDoc);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeaveDoc);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnterDoc);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-50 flex h-8 w-8 items-center justify-center rounded-full border border-accent"
    >
      <span ref={textRef} className="scale-50 text-[9px] font-medium uppercase tracking-wider text-white opacity-0">
        View
      </span>
    </div>
  );
}

export default CustomCursor;
