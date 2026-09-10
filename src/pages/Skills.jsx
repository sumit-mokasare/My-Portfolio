import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { skills } from "../utils/data";

gsap.registerPlugin(ScrollTrigger);

function SkillIcon({ type }) {
  return (
    <div className="skill-icon-inner">
      {type === "react" && (
        <svg viewBox="0 0 100 100" className="h-20 w-20 md:h-28 md:w-28">
          <circle cx="50" cy="50" r="8" fill="currentColor" />
          <ellipse cx="50" cy="50" rx="40" ry="16" fill="none" stroke="currentColor" strokeWidth="4" />
          <ellipse
            cx="50"
            cy="50"
            rx="40"
            ry="16"
            transform="rotate(60 50 50)"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          />
          <ellipse
            cx="50"
            cy="50"
            rx="40"
            ry="16"
            transform="rotate(120 50 50)"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          />
        </svg>
      )}

      {type === "node" && (
        <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-current md:h-28 md:w-28">
          <span className="font-mono text-2xl font-bold md:text-3xl">JS</span>
        </div>
      )}

      {type === "ai" && (
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-current md:h-28 md:w-28">
          <span className="font-display text-3xl font-bold">AI</span>
          <span className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-accent2" />
          <span className="absolute -bottom-2 -left-2 h-4 w-4 rounded-full bg-accent2" />
        </div>
      )}

      {type === "three" && (
        <svg viewBox="0 0 100 100" className="h-20 w-20 md:h-28 md:w-28">
          <path d="M50 5 L93 82 L7 82 Z" fill="none" stroke="currentColor" strokeWidth="4" />
          <path d="M50 5 L50 82 M7 82 L93 82" stroke="currentColor" strokeWidth="3" />
          <circle cx="50" cy="5" r="5" fill="currentColor" />
          <circle cx="7" cy="82" r="5" fill="currentColor" />
          <circle cx="93" cy="82" r="5" fill="currentColor" />
        </svg>
      )}

      {type === "git" && (
        <div className="flex h-20 w-20 rotate-45 items-center justify-center rounded-xl border-2 border-current md:h-28 md:w-28">
          <span className="-rotate-45 font-mono text-xl font-bold">GIT</span>
        </div>
      )}
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const curtainsRef = useRef([]);
  const contentRef = useRef([]);
  const iconsRef = useRef([]);

  useGSAP(
    () => {
      const cleanupFns = [];

      // ---- unique scroll reveal: an accent-colored curtain wipes off each card, once ----
      cardsRef.current.forEach((card, index) => {
        const curtain = curtainsRef.current[index];
        const content = contentRef.current[index];
        if (!curtain || !content) return;

        gsap.set(curtain, { scaleX: 1, transformOrigin: "left" });
        gsap.set(content, { opacity: 0, y: 16 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 90%", end: "top 65%", scrub: 1 },
        });

        tl.to(curtain, { scaleX: 0, transformOrigin: "right", duration: 0.9, ease: "power4.inOut" }).to(
          content,
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.45",
        );
      });

      // ---- big background numeral parallax ----
      gsap.to(".skills-number", {
        yPercent: 30,
        ease: "none",
        rotate: 15,
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });

      // ---- layered parallax: card, title and tech column drift at slightly different speeds ----
      cardsRef.current.forEach((card, index) => {
        const scrollCfg = { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 };

        gsap.to(card, { yPercent: index % 2 === 0 ? -6 : -10, ease: "none", scrollTrigger: scrollCfg });

        const title = card.querySelector(".skill-title");
        const techCol = card.querySelector(".skill-tech");
        if (title) gsap.to(title, { yPercent: -4, ease: "none", scrollTrigger: scrollCfg });
        if (techCol) gsap.to(techCol, { yPercent: 6, ease: "none", scrollTrigger: scrollCfg });
      });

      // ---- icon follows the cursor inside its own card ----
      cardsRef.current.forEach((card, index) => {
        const icon = iconsRef.current[index];
        if (!icon || !card) return;

        const moveX = gsap.quickTo(icon, "x", { duration: 0.5, ease: "power3.out" });
        const moveY = gsap.quickTo(icon, "y", { duration: 0.5, ease: "power3.out" });
        const rotateX = gsap.quickTo(icon, "rotationX", { duration: 0.5, ease: "power3.out" });
        const rotateY = gsap.quickTo(icon, "rotationY", { duration: 0.5, ease: "power3.out" });

        const handleMove = (e) => {
          const rect = card.getBoundingClientRect();
          const percentX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
          const percentY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

          moveX(percentX * 30);
          moveY(percentY * 25);
          rotateY(percentX * 18);
          rotateX(-percentY * 18);
        };

        const handleLeave = () => {
          moveX(0);
          moveY(0);
          rotateX(0);
          rotateY(0);
        };

        card.addEventListener("mousemove", handleMove);
        card.addEventListener("mouseleave", handleLeave);

        cleanupFns.push(() => {
          card.removeEventListener("mousemove", handleMove);
          card.removeEventListener("mouseleave", handleLeave);
        });
      });

      return () => cleanupFns.forEach((fn) => fn());
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="skills" className="relative min-h-screen overflow-hidden bg-bg px-4 text-ink md:px-6">
      {/* BIG BACKGROUND NUMBER */}
      <div
        className="skills-number pointer-events-none absolute -top-17 left-1/2 z-0 -translate-x-1/2 select-none font-bold text-ink"
        style={{
          fontSize: "min(30vw, 300px)",
          opacity: 0.035,
          lineHeight: 1,
          letterSpacing: "-0.05em",
        }}
      >
        04
      </div>

      {/* HEADER */}
      <div className="relative z-10 -top-15 mt-48 flex items-center gap-3 font-mono text-[10px] tracking-widest text-muted md:text-[11px]">
        <span className="text-xs">( 04 )</span>
        <span className="h-px w-10 bg-line" />
        <span className="text-xs">SKILLS</span>
      </div>

      {/* SKILLS */}
      <div className="relative z-10 mt-24 flex flex-col pb-20">
        {skills.map((skill, index) => (
          <div
            key={skill.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className={`
              skill-card
              group
              relative
              min-h-40
              w-full
              cursor-pointer
              overflow-hidden
              border-y
              border-line
              bg-bg
              transition-colors
              duration-500
              ${index !== 0 ? "-mt-px" : ""}
              hover:bg-surface
              md:min-h-44
              lg:min-h-48
            `}
          >
            {/* CURTAIN — entrance reveal layer */}
            <div
              ref={(el) => {
                curtainsRef.current[index] = el;
              }}
              className="pointer-events-none absolute inset-0 z-10 bg-accent2"
            />

            {/* CARD CONTENT */}
            <div
              ref={(el) => {
                contentRef.current[index] = el;
              }}
              className="relative z-20 grid h-full grid-cols-[40px_1fr] items-start gap-x-5 gap-y-3 px-4 py-6 md:grid-cols-[60px_1fr_1fr_110px] md:items-center md:gap-5 md:px-8"
            >
              <span className="self-start pt-1 font-mono text-[10px] tracking-widest text-muted">{skill.id}</span>

              <div className="skill-title">
                <h3 className="font-display text-3xl font-bold lowercase leading-none tracking-tight transition-all duration-500 group-hover:translate-x-2 group-hover:text-accent2 md:text-4xl lg:text-5xl">
                  {skill.title}
                </h3>
                <p className="mt-2 font-mono text-[9px] uppercase tracking-widest text-accent2 md:text-[10px]">
                  {skill.short}
                </p>
              </div>

              <p className="hidden max-w-sm text-xs leading-tight text-muted transition-transform duration-500 group-hover:translate-x-2 md:block">
                {skill.description}
              </p>

              {/* TECH — wrapped chips on mobile so the stack is visible; right-aligned column on md+ */}
              <div className="skill-tech col-span-2 flex flex-wrap items-center gap-x-1 gap-y-1 pl-[52px] md:col-span-1 md:block md:pl-0 md:text-right">
                {skill.tech.map((tech, i) => (
                  <span
                    key={tech}
                    className={`inline-block font-mono text-[9px] uppercase tracking-widest text-muted transition-all duration-500 group-hover:text-ink md:block ${
                      i !== skill.tech.length - 1
                        ? "after:mx-2 after:text-line after:content-['/'] md:after:hidden"
                        : ""
                    }`}
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* HOVER 3D ICON */}
            <div
              ref={(el) => {
                iconsRef.current[index] = el;
              }}
              className="pointer-events-none absolute  right-[8%] top-1/2 z-20 -translate-y-1/2 opacity-0 text-accent2 transition-opacity duration-500 group-hover:opacity-100"
              style={{ perspective: "800px", transformStyle: "preserve-3d" }}
            >
              <div
                className="flex items-center justify-center rounded-full border border-accent2/40 bg-bg/70 p-4 shadow-2xl backdrop-blur-sm"
                style={{ transformStyle: "preserve-3d" }}
              >
                <SkillIcon type={skill.icon} />
              </div>
            </div>

            {/* HOVER ACCENT LINE */}
            <div className="absolute bottom-0 left-0 h-px w-0 bg-accent2 transition-all duration-700 ease-out group-hover:w-full" />

            {/* CARD PARALLAX DECORATION */}
            <div
              className="pointer-events-none absolute right-0 top-0 h-full w-[25%] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-accent2) 5%, transparent))",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
