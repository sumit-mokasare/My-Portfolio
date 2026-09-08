import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

// Rendered by Projects.jsx when a project is clicked:
//   {selected && <ProjectDetail project={selected} onClose={...} />}
//
// Full-screen overlay, not a real route — swap for React Router /
// Next.js dynamic route later if you want a real URL per project
// (the `slug` field on each project object is there for exactly that).

export default function ProjectDetail({ project, onClose }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const imgRefs = useRef([]);

  useLayoutEffect(() => {
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" })
      .fromTo(
        panelRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        "-=0.15",
      )
      .fromTo(
        imgRefs.current,
        { opacity: 0, y: 24, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        "-=0.25",
      );

    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  const handleClose = () => {
    gsap.to(panelRef.current, { y: 30, opacity: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
      delay: 0.05,
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-bg/95 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => e.target === overlayRef.current && handleClose()}
    >
      <div ref={panelRef} className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-24">
        {/* close */}
        <button
          onClick={handleClose}
          className="fixed top-6 right-6 md:top-10 md:right-10 w-11 h-11 rounded-full border border-line bg-bg text-ink flex items-center justify-center z-10 hover:border-accent hover:text-accent transition-colors"
          aria-label="Close project detail"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>

        {/* meta row */}
        <div className="flex items-center gap-3 mb-6 font-mono text-xs tracking-widest text-muted">
          <span>( {project.id} )</span>
          <span className="h-px w-10 bg-line"></span>
          <span>{project.category.toUpperCase()}</span>
        </div>

        {/* title */}
        <h2 className="font-display font-bold text-5xl md:text-7xl lowercase tracking-tight text-ink">
          {project.title}
        </h2>

        {/* tags + year */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          {project.tags.map((t) => (
            <span key={t} className="font-mono text-xs px-3 py-1.5 rounded-full border border-line text-muted">
              {t}
            </span>
          ))}
          <span className="font-mono text-xs text-muted ml-auto">{project.year}</span>
        </div>

        {/* description */}
        <p className="text-muted max-w-2xl mt-8 leading-relaxed text-[15px]">{project.description}</p>

        {project.link && project.link !== "#" && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 rounded-full bg-ink text-bg text-sm font-medium hover:bg-accent transition-colors"
          >
            Visit project →
          </a>
        )}

        {/* image gallery — reuses each image's own rotate value from the data */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14">
          {project.images.map((img, i) => (
            <div
              key={i}
              ref={(el) => (imgRefs.current[i] = el)}
              className="rounded-xl overflow-hidden border border-line"
              style={{ transform: `rotate(${img.rotate / 4}deg)` }}
            >
              <img src={img.url} alt="" className="w-full h-full object-cover aspect-square" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
