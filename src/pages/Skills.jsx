import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Reveal from "../components/Reveal";
import { skills } from "../utils/data";
import { ICONS, TECH_STYLES } from "../utils/icon";

/* ───────── Big icon in the card corner (unchanged) ───────── */
function SkillMark({ type }) {
  if (type === "react") {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="24" cy="24" r="3" fill="currentColor" />
        <ellipse cx="24" cy="24" rx="20" ry="8" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(60 24 24)" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(120 24 24)" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  if (type === "node") {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="m24 4 17 10v20L24 44 7 34V14L24 4Z" stroke="currentColor" strokeWidth="2" />
        <path
          d="m17 30 7-14 7 14m-11-5h8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "ai") {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path
          d="M24 4 27.5 19.5 43 24l-15.5 4.5L24 44l-4.5-15.5L4 24l15.5-4.5L24 4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="37" cy="10" r="2" fill="currentColor" />
      </svg>
    );
  }

  if (type === "three") {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M24 5 43 39H5L24 5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M24 5v34m-19 0 19-11 19 11" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="m24 4 20 20-20 20L4 24 24 4Z" stroke="currentColor" strokeWidth="2" />
      <path
        d="M15 17h10a5 5 0 0 1 0 10h-3m11 4-6-6m6 0-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ───────── Small icons for the tech chips (24px, stroke style) ───────── */

/* [match, icon, colour]: first match wins; unknown tech falls back to a code icon */

function getTechStyle(name) {
  const match = TECH_STYLES.find(([pattern]) => pattern.test(name));
  return match ? { icon: match[1], color: match[2] } : { icon: "code", color: "#94a3b8" };
}

function TechChip({ name }) {
  const { icon, color } = getTechStyle(name);

  return (
    <li className="tech-chip rounded-xl border border-line bg-bg font-medium text-ink" style={{ "--c": color }}>
      <svg
        viewBox="0 0 24 24"
        className="tech-chip__icon"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {ICONS[icon]}
      </svg>
      <span>{name}</span>
    </li>
  );
}

function SkillCard({ skill, index, width }) {
  return (
    <div className="flex shrink-0 px-1.5 sm:px-2" style={{ width }}>
      <article
        className={`skill-panel skill-tone-${index % 5} group relative flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-4 sm:p-6`}
      >
        <div className="flex items-start justify-between">
          <span className="font-mono text-[11px] tracking-wider text-accent">0{index + 1}</span>
          <div className="skill-mark">
            <SkillMark type={skill.icon} />
          </div>
        </div>
        <p className="mt-4 font-display text-xl font-semibold tracking-tight">{skill.title}</p>
        <p className="mt-1 text-xs font-medium text-accent">{skill.short}</p>

        <ul className="tech-list mt-6 flex-1" aria-label={`${skill.title} technologies`}>
          {skill.tech.map((tech) => (
            <TechChip key={tech} name={tech} />
          ))}
        </ul>
      </article>
    </div>
  );
}

export default function Skills() {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const [visible, setVisible] = useState(3); // cards on screen: 3 desktop, 2 tablet, 1.15 phone (next card peeks in)

  useEffect(() => {
    const update = () => setVisible(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1.15);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Auto scroll: slide the track left by one full copy, then repeat forever
  useEffect(() => {
    const tween = gsap.to(trackRef.current, { xPercent: -50, duration: skills.length * 5, ease: "none", repeat: -1 });
    tweenRef.current = tween;
    return () => tween.kill();
  }, []);

  const copies = 2;
  const cardWidth = `${100 / skills.length}%`;

  return (
    <section id="skills" className="section-shell bg-bg px-6 py-24 text-ink md:px-12 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="section-kicker">
            <span>03</span>
            <i /> SKILLS & TOOLKIT
          </div>
          <div className="mb-12 mt-6 flex flex-col justify-between gap-5 md:mb-14 md:flex-row md:items-end">
            <h2 className="section-heading max-w-2xl">The tools I use to make things work.</h2>
            <p className="max-w-sm text-sm leading-6 text-muted">
              A practical mix of frontend, backend, and emerging technologies that I keep developing through projects.
            </p>
          </div>
        </Reveal>

        {/* Centered window showing 3 cards; hover stops the scroll */}
        <Reveal>
          <div
            onPointerEnter={(e) => e.pointerType === "mouse" && tweenRef.current?.pause()}
            onPointerLeave={(e) => e.pointerType === "mouse" && tweenRef.current?.play()}
            onTouchStart={() => tweenRef.current?.pause()}
            onTouchEnd={() => tweenRef.current?.play()}
            onTouchCancel={() => tweenRef.current?.play()}
            className="overflow-hidden py-4 [-webkit-mask-image:linear-gradient(to_right,transparent,#000_3%,#000_97%,transparent)] sm:[-webkit-mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)] [mask-image:linear-gradient(to_right,transparent,#000_3%,#000_97%,transparent)] sm:[mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)]"
          >
            <div
              ref={trackRef}
              className="flex will-change-transform"
              style={{ width: `${((copies * skills.length) / visible) * 100}%` }}
            >
              {Array.from({ length: copies }).map((_, copy) => (
                <div
                  key={copy}
                  className="flex shrink-0"
                  style={{ width: `${100 / copies}%` }}
                  aria-hidden={copy > 0 || undefined}
                >
                  {skills.map((skill, index) => (
                    <SkillCard key={skill.id} skill={skill} index={index} width={cardWidth} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
