import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Replace `image` with your real certificate screenshot/image path
// (e.g. put files in /public/certificates/ and use "/certificates/cert-1.jpg")
// issuer slugs use Simple Icons (e.g. "udemy", "coursera", "freecodecamp")
const certifications = [
  {
    id: "01",
    title: "Full-Stack Web Development",
    issuer: "Udemy",
    issuerSlug: "udemy",
    year: "2025",
    link: "#",
    image: "https://picsum.photos/seed/cert-01/700/500",
    description:
      "A complete path through modern web development — building, testing and deploying full-stack applications end to end.",
  },
  {
    id: "02",
    title: "Generative AI for Developers",
    issuer: "Coursera",
    issuerSlug: "coursera",
    year: "2025",
    link: "#",
    image: "https://picsum.photos/seed/cert-02/700/500",
    description:
      "Covers LLM fundamentals, prompt design, retrieval-augmented generation and shipping AI features inside real products.",
  },
  {
    id: "03",
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    issuerSlug: "freecodecamp",
    year: "2024",
    link: "#",
    image: "https://picsum.photos/seed/cert-03/700/500",
    description:
      "Core computer-science fundamentals in JavaScript — algorithms, data structures and problem solving from first principles.",
  },
  {
    id: "04",
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    issuerSlug: "freecodecamp",
    year: "2024",
    link: "#",
    image: "https://picsum.photos/seed/cert-04/700/500",
    description:
      "Modern layout systems, accessibility basics and responsive design patterns for building interfaces that work everywhere.",
  },
];

const n = certifications.length;

// fanned-hand layout: each card gets its own tilt AND its own horizontal offset,
// so cards are no longer perfectly stacked — each has real, hoverable surface area
const baseRotations = certifications.map((_, i) => (i % 2 === 0 ? -1 : 1) * (5 + (i % 3) * 3));
const fanOffsetX = certifications.map((_, i) => (i - (n - 1) / 2) * 72);

export default function Certifications() {
  const sectionRef = useRef(null);
  const stackRef = useRef(null);
  const cardsRef = useRef([]);
  const overlayRef = useRef(null);
  const overlayCardRef = useRef(null);
  const activeIndexRef = useRef(null); // which card (if any) is currently lifted to the top

  const [activeCert, setActiveCert] = useState(null);

  useGSAP(
    () => {
      // ---- initial state: every card starts off-screen below, exaggerated tilt ----
      cardsRef.current.forEach((card, i) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          x: fanOffsetX[i],
          y: "70vh",
          opacity: 0,
          rotate: baseRotations[i] * 3,
          zIndex: i + 1,
        });
      });

      // ---- pinned scroll: cards deal in one by one and settle into the fanned hand ----
      const masterTl = gsap.timeline();

      cardsRef.current.forEach((card, i) => {
        masterTl.to(
          card,
          {
            y: 0,
            opacity: 1,
            rotate: baseRotations[i],
            duration: 1,
            ease: "power2.out",
          },
          i * 0.7,
        );
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${n * window.innerHeight * 0.7}`,
        pin: true,
        scrub: 1,
        animation: masterTl,
      });
    },
    { scope: sectionRef },
  );

  // ---- hover: purely cosmetic (scale + shadow only) — never touches y, rotate or zIndex,
  // so it can never fight with a neighbouring card's layering. This is what removes the glitch. ----
  const handleEnter = (i) => {
    gsap.to(cardsRef.current[i], {
      scale: 1.03,
      boxShadow: "0 20px 45px rgba(0,0,0,0.4)",
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleLeave = (i) => {
    // don't fight the "lifted to top" state if this card is the active one
    if (activeIndexRef.current === i) return;

    gsap.to(cardsRef.current[i], {
      scale: 1,
      boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  // ---- click: smoothly bring THIS card to the top, settle the previous one back down,
  // then open the detail overlay. State-driven, so there's no mouse-position race. ----
  const bringToTop = (i) => {
    const prev = activeIndexRef.current;

    if (prev !== null && prev !== i) {
      gsap.to(cardsRef.current[prev], {
        y: 0,
        rotate: baseRotations[prev],
        scale: 1,
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        duration: 0.5,
        ease: "power3.inOut",
        overwrite: "auto",
        onComplete: () => gsap.set(cardsRef.current[prev], { zIndex: prev + 1 }),
      });
    }

    activeIndexRef.current = i;
    gsap.set(cardsRef.current[i], { zIndex: 200 });
    gsap.to(cardsRef.current[i], {
      y: -40,
      rotate: 0,
      scale: 1.08,
      boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handleCardClick = (cert, index) => {
    bringToTop(index);
    setActiveCert(cert);
  };

  // ---- detail overlay: animates in whenever a cert is selected; settles the lifted card
  // back into the stack once the overlay is closed ----
  useEffect(() => {
    if (!activeCert) return;

    document.body.style.overflow = "hidden";

    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
    gsap.fromTo(
      overlayCardRef.current,
      { opacity: 0, y: 40, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.6)", delay: 0.05 },
    );

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeCert]);

  const closeOverlay = () => {
    setActiveCert(null);

    const i = activeIndexRef.current;
    if (i === null) return;

    gsap.to(cardsRef.current[i], {
      y: 0,
      rotate: baseRotations[i],
      scale: 1,
      boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
      duration: 0.5,
      ease: "power3.inOut",
      overwrite: "auto",
      onComplete: () => gsap.set(cardsRef.current[i], { zIndex: i + 1 }),
    });
    activeIndexRef.current = null;
  };

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-bg px-4 text-ink md:px-6"
    >
      {/* BIG BACKGROUND NUMBER */}
      <div
        className="pointer-events-none absolute -top-6 left-1/2 z-0 -translate-x-1/2 select-none font-bold text-ink"
        style={{ fontSize: "min(38vw, 300px)", opacity: 0.05, lineHeight: 1, letterSpacing: "-0.05em" }}
      >
        05
      </div>

      {/* soft radial glow behind the stack, adds depth instead of flat empty black */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-accent2) 12%, transparent) 0%, transparent 70%)",
        }}
      />

      {/* HEADER */}
      <div className="absolute top-10 left-4 z-10 flex items-center gap-3 font-mono text-[10px] tracking-widest text-muted md:left-6 md:text-[11px]">
        <span className="text-xs">( 05 )</span>
        <span className="h-px w-10 bg-line" />
        <span className="text-xs">CERTIFICATIONS</span>
      </div>

      {/* top-right counter */}
      <div className="absolute top-10 right-4 z-10 text-right font-mono text-[10px] tracking-widest text-muted md:right-6 md:text-[11px]">
        <span className="text-ink">{String(n).padStart(2, "0")}</span> credentials earned
      </div>

      {/* short supporting line */}
      <p className="absolute top-24 left-4 z-10 max-w-xs font-display text-lg font-bold leading-snug tracking-tight text-ink/90 md:left-6 md:top-28 md:max-w-sm md:text-2xl">
        Courses and credentials that shaped how I build.
      </p>

      {/* CARD FAN */}
      <div
        ref={stackRef}
        className="relative z-10 mx-auto mt-16 md:mt-0"
        style={{ width: "min(96vw, 900px)", height: "min(70vh, 560px)" }}
      >
        {certifications.map((cert, index) => (
          <div
            key={cert.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            onMouseEnter={() => handleEnter(index)}
            onMouseLeave={() => handleLeave(index)}
            onClick={() => handleCardClick(cert, index)}
            className="absolute left-1/2 top-1/2 flex w-72 cursor-pointer flex-col overflow-hidden rounded-2xl border border-line sm:w-72 md:w-72"
            style={{
              backgroundColor: "var(--color-surface)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              willChange: "transform",
            }}
          >
            <div className="relative h-44 w-full overflow-hidden sm:h-48 md:h-56">
              <img src={cert.image} alt={cert.title} className="h-full w-full object-cover" draggable="false" />
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(180deg, transparent 35%, var(--color-surface) 100%)" }}
              />
              <img
                src={"https://cdn.simpleicons.org/" + cert.issuerSlug}
                alt={cert.issuer}
                className="absolute right-3 top-3 h-7 w-7 rounded-full bg-bg/80 p-1.5 object-contain"
              />
              <span className="absolute left-3 top-3 rounded-full bg-bg/80 px-2.5 py-1 font-mono text-[10px] tracking-widest text-muted">
                {cert.id}
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
              <h3 className="font-display text-xl font-bold leading-tight tracking-tight md:text-2xl">{cert.title}</h3>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-accent2">
                {cert.issuer} — {cert.year}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-muted">
        click a card for details
      </p>

      {/* DETAIL OVERLAY */}
      {activeCert && (
        <div
          ref={overlayRef}
          onClick={closeOverlay}
          className="fixed inset-0 z-40 flex items-center justify-center bg-bg/80 px-4 backdrop-blur-md"
        >
          <div
            ref={overlayCardRef}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-line"
            style={{ backgroundColor: "var(--color-surface)" }}
          >
            <div className="relative h-52 w-full md:h-64">
              <img
                src={activeCert.image}
                alt={activeCert.title}
                className="h-full w-full object-cover"
                draggable="false"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(180deg, transparent 50%, var(--color-surface) 100%)" }}
              />
              <button
                onClick={closeOverlay}
                className="absolute right-4 top-4 rounded-full bg-bg/80 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:bg-bg"
              >
                Close ✕
              </button>
            </div>

            <div className="p-8 md:p-10">
              <div className="flex items-center gap-3">
                <img
                  src={"https://cdn.simpleicons.org/" + activeCert.issuerSlug}
                  alt={activeCert.issuer}
                  className="h-8 w-8 object-contain"
                />
                <span className="font-mono text-xs uppercase tracking-widest text-accent2">
                  {activeCert.issuer} — {activeCert.year}
                </span>
              </div>

              <h3 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                {activeCert.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-muted">{activeCert.description}</p>

              <a
                href={activeCert.link}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-block rounded-full border border-accent2/50 px-5 py-2 font-mono text-xs uppercase tracking-widest text-accent2 transition-colors hover:bg-accent2 hover:text-bg"
              >
                View credential →
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
