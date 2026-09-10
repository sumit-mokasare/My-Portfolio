import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../components/Button";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function About() {
  const sectionRef = useRef(null);
  const numeralRef = useRef(null);
  const textColRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const btnRef = useRef(null);
  const photoRef = useRef(null);
  const shape1Ref = useRef(null);
  const shape2Ref = useRef(null);
  const shape3Ref = useRef(null);

  useGSAP(() => {
    const headlineSplit = SplitText.create(headingRef.current, {
      type: "words",
    });
    const paraSplit = SplitText.create(paraRef.current, {
      type: "words , lines",
    });

    const ctx = gsap.context(() => {
      // ---- entrance: fade/rise-in for the text column (fires once) ----
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
      });

      tl.from(headingRef.current, { y: 40, opacity: 0, duration: 0.9, ease: "power3.out" })
        .from(paraRef.current, { y: 24, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .from(btnRef.current, { y: 29, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");

      gsap.from(photoRef.current, {
        scrollTrigger: { trigger: photoRef.current, start: "top 75%", once: true },
        x: 60,
        opacity: 0,
        scale: 0.94,
        duration: 1,
        ease: "power3.out",
      });

      // ---- continuous scroll parallax (scrubbed, whole time section is in view) ----
      const parallaxScroll = { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 };

      gsap.to(numeralRef.current, { yPercent: -30, rotate: 10, ease: "none", scrollTrigger: parallaxScroll });
      gsap.to(photoRef.current, { yPercent: -18, ease: "none", scrollTrigger: parallaxScroll });
      gsap.to(textColRef.current, { yPercent: -20, ease: "none", scrollTrigger: parallaxScroll });

      gsap.to(shape1Ref.current, { yPercent: -40, ease: "none", scrollTrigger: parallaxScroll });
      gsap.to(shape2Ref.current, { yPercent: 50, ease: "none", scrollTrigger: parallaxScroll });
      gsap.to(shape3Ref.current, { yPercent: -25, ease: "none", scrollTrigger: parallaxScroll });

      // ---- scroll-scrubbed color fade: muted -> original ink color ----

      gsap.to(headlineSplit.words, {
        color: "var(--color-accent2)",
        stagger: 1,
        ease: "power1.out",
        scrollTrigger: { trigger: sectionRef.current, start: "40% 90%", end: "40% 75%", scrub: true },
      });

      gsap.from(paraSplit.words, {
        y: "60%",
        opacity: 0,
        rotateX: 20,
        transformOrigin: "50% 100%",
        duration: 1.1,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          // markers: true,
          start: "40% 70%",
          end: "50% center",
          scrub: 1.2,
        },
      });

      // ---- button "pop" once paragraph reveal finishes — separate, reliable trigger ----
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "50% center",
        onEnter: () => {
          gsap.fromTo(
            btnRef.current,
            { scale: 0.9, opacity: 0.6 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "back.out(2.5)",
            },
          );
        },
        onLeaveBack: () => {
          gsap.to(btnRef.current, {
            scale: 0.9,
            opacity: 0.6,
            duration: 0.3,
            ease: "power2.out",
          });
        },
      });

      // ---- interactive: photo panel tilts toward the cursor ----
      const photoEl = photoRef.current;
      const handleMove = (e) => {
        const rect = photoEl.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(photoEl, {
          rotateY: px * 10,
          rotateX: -py * 10,
          duration: 0.5,
          ease: "power2.out",
          transformPerspective: 800,
        });
      };
      const handleLeave = () => {
        gsap.to(photoEl, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power3.out" });
      };
      photoEl.addEventListener("mousemove", handleMove);
      photoEl.addEventListener("mouseleave", handleLeave);

      return () => {
        photoEl.removeEventListener("mousemove", handleMove);
        photoEl.removeEventListener("mouseleave", handleLeave);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen bg-bg text-ink pt-28 md:pt-36 pb-0 px-6 md:px-12 overflow-hidden"
    >
      {/* giant faint section numeral */}
      <div
        ref={numeralRef}
        className="absolute -top-10 left-1/2 -translate-x-1/2 font-bold text-ink pointer-events-none select-none"
        style={{ fontSize: "min(34vw, 340px)", opacity: 0.035, lineHeight: 1, letterSpacing: "-0.05em" }}
      >
        02
      </div>

      {/* decorative outline shapes */}
      <svg
        ref={shape1Ref}
        className="absolute bottom-21 right-[2%] w-16 h-16 text-accent/40 pointer-events-none"
        viewBox="0 0 64 64"
        fill="none"
      >
        <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <svg
        ref={shape2Ref}
        className="absolute top-80 right-[6%] w-10 h-10 text-accent2/50 pointer-events-none rotate-12"
        viewBox="0 0 40 40"
        fill="none"
      >
        <rect x="2" y="2" width="36" height="36" rx="6" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <svg
        ref={shape3Ref}
        className="absolute top-80 left-[3%] w-7 h-7 text-muted/40 pointer-events-none"
        viewBox="0 0 32 32"
        fill="none"
      >
        <path d="M16 2 L30 28 H2 Z" stroke="currentColor" strokeWidth="1.2" />
      </svg>

      <div className="absolute top-10 flex items-center gap-3 ">
        <span className="text-xs tracking-widest text-muted">( 02 )</span>
        <span className="h-px w-10 bg-line"></span>
        <span className="text-xs tracking-widest text-muted">ABOUT</span>
      </div>

      <div className="max-w-6xl font-mono mx-auto my-10 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-start ">
          {/* left: statement + stats */}
          <div ref={textColRef}>
            <h2
              ref={headingRef}
              className="font-bold font-display text-muted  leading-[1.05] tracking-tight text-3xl sm:text-4xl md:text-5xl"
              style={{ color: "var(--color-muted)" }}
            >
              A developer who loves turning ideas into working products.
            </h2>

            <p ref={paraRef} className="text-muted font-display font mt-6  max-w-2xl leading-relaxed text-[15px]">
              I’m Sumit, a BCA student and Full-Stack Developer in the making. My journey into development started with
              the web fundamentals and has grown into building full-stack applications using React, Node.js, Express,
              MongoDB, PostgreSQL, and Prisma. I learn best by turning concepts into projects, breaking things, fixing
              them, and understanding what happens behind the code.
              <br />
              These days, I’m going beyond traditional web development and exploring Generative AI, RAG, Three.js, and
              interactive experiences. My goal is simple: keep learning, build better projects, and grow into a
              developer who can take an idea from concept to a working product.
            </p>

            <div ref={btnRef} className="mt-11 ">
              <Button variant="primary" href="#contact">
                Let's work together →
              </Button>
            </div>
          </div>

          {/* right: ambient-gradient photo panel — swap the inner div for a real <img> */}
          <div
            ref={photoRef}
            className="relative aspect-square rounded-[22px] overflow-hidden border border-line"
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, color-mix(in oklab, var(--color-accent) 55%, transparent), transparent 55%), radial-gradient(circle at 75% 75%, color-mix(in oklab, var(--color-accent2) 45%, transparent), transparent 55%), linear-gradient(160deg, var(--color-surface) 0%, var(--color-bg) 100%)",
              }}
            />
            {/* replace the block above with: */}
            {/* // <img src="./m y-photo.png" className="absolute inset-0 w-full h-full object-cover" /> */}
            <span
              className="absolute top-3.5 right-3.5 font-mono text-[11px] text-ink/55 tracking-widest"
              style={{ writingMode: "vertical-rl" }}
            >
              PORTRAIT / 01
            </span>
            <span className="absolute bottom-5 left-5 text-xs text-ink bg-bg/40 backdrop-blur-md border border-ink/15 px-4 py-2 rounded-full">
              {/* <img src="./my-photo.png" className="absolute inset-0 w-full h-full object-cover" /> */}
            </span>
            <span className="absolute top-3.5 left-3.5 size-4 border-t border-l border-ink/35"></span>
            <span className="absolute top-3.5 right-3.5 size-4 border-t border-r border-ink/35"></span>
            <span className="absolute bottom-3.5 left-3.5 size-4 border-b border-l border-ink/35"></span>
            <span className="absolute bottom-3.5 right-3.5 size-4 border-b border-r border-ink/35"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
