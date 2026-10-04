import { useCallback, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import ResumeDialog from "../components/ResumeDialog";
import PhotoCard from "../components/PhotoCard";

export default function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const resumeButtonRef = useRef(null);
  const closeResume = useCallback(() => setResumeOpen(false), []);

  return (
    <section
      id="hero"
      className="hero-section relative flex min-h-[100svh] flex-col overflow-hidden px-6 pb-5 pt-24 text-ink md:px-12"
    >
      <div className="z-50">
        <Navbar />
      </div>
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 content-center gap-9 py-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-14 lg:py-4">
        <div className="pointer-events-auto">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-xs font-medium text-muted shadow-sm">
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping! rounded-full bg-accent2 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-accent2"></span>
            </span>
            Looking for internship opportunities
          </div>

          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            Full Stack Developer <span className="px-1 text-muted">·</span> AI Enthusiast
          </p>
          <h1 className="max-w-3xl font-display text-5xl font-bold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-[clamp(3.5rem,6.4vw,5.25rem)]">
            Sumit
            <span className="block text-accent">Mokasare.</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
            I build modern web applications with React, Node.js, Express, MongoDB, PostgreSQL, and Docker, while
            exploring Generative AI to create intelligent, scalable software. I enjoy solving real-world problems
            through clean code, thoughtful design, and continuous learning.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a className="button-primary" href="#work">
              Explore projects <span aria-hidden="true">↗</span>
            </a>
            <button
              ref={resumeButtonRef}
              type="button"
              className="button-secondary"
              onClick={() => setResumeOpen(true)}
              aria-haspopup="dialog"
            >
              View resume <span aria-hidden="true">↗</span>
            </button>
            <a className="button-tertiary" href="#contact">
              Let&apos;s connect
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-4 text-xs text-muted">
            <span className="flex items-center gap-2">
              <span className="text-accent">✳</span> BCA student
            </span>
            <span className="flex items-center gap-2">
              <span className="text-accent">✳</span> Internship-ready
            </span>
          </div>
        </div>

        {/* Photo card: grayscale by default, full colour on hover */}
        <div className="pointer-events-auto flex justify-center lg:justify-end">
          <PhotoCard src="/sumit.jpg" alt="Portrait of Sumit Mokasare" className="max-w-[20rem] sm:max-w-sm" />
        </div>
      </div>

      <a
        href="#about"
        className="relative z-10 mx-auto mt-1 inline-flex items-center gap-2 text-[11px] text-muted transition-colors hover:text-ink"
      >
        Scroll to explore <span aria-hidden="true">↓</span>
      </a>

      {resumeOpen && <ResumeDialog onClose={closeResume} returnFocusRef={resumeButtonRef} />}
    </section>
  );
}
