import { useCallback, useRef, useState } from "react";
import ProjectDetail from "../components/ProjectDetail";
import Reveal from "../components/Reveal";
import { projects } from "../utils/data";

/**
 * Real project screenshot (replaces ProjectVisual).
 * Reads `project.image`, e.g. "/projects/my-app.png" (files live in /public/projects).
 * If the image is missing or fails to load, a quiet placeholder keeps the card layout intact.
 */
function ProjectImage({ project }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line bg-bg">
      {project.image && !failed ? (
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          Project image coming soon
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const returnFocusRef = useRef(null);
  const closeDetails = useCallback(() => setSelected(null), []);

  return (
    <section id="work" className="section-shell bg-bg px-6 py-24 text-ink md:px-12 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="section-kicker">
            <span>02</span>
            <i /> WHAT I BUILD
          </div>
          <div className="mb-12 mt-6 flex flex-col justify-between gap-5 md:mb-16 md:flex-row md:items-end">
            <h2 className="section-heading max-w-2xl">Turning ideas into useful products.</h2>
            <p className="max-w-sm text-sm leading-6 text-muted">
              I enjoy working across the stack—from shaping an interface to connecting the systems behind it.
            </p>
          </div>
        </Reveal>

        <div className="project-grid grid gap-5 md:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 90} className="h-full">
              <article className="capability-card group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface">
                <ProjectImage project={project} />
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-wider text-accent">0{index + 1}</span>
                    <span className="rounded-full bg-bg px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-muted">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="project-card-title font-display text-xl font-semibold tracking-tight">
                    {project.title}
                  </h3>
                  <p className="project-card-description mt-3 text-sm leading-6 text-muted">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-line px-2.5 py-1 text-[10px] text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={(event) => {
                      returnFocusRef.current = event.currentTarget;
                      setSelected(project);
                    }}
                    className="project-details-button mt-auto flex w-full items-center justify-between border-t border-line pt-4 text-left text-sm font-semibold"
                    aria-haspopup="dialog"
                  >
                    View details
                    <span className="project-details-arrow text-accent" aria-hidden="true">
                      ↗
                    </span>
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {selected && <ProjectDetail project={selected} onClose={closeDetails} returnFocusRef={returnFocusRef} />}
    </section>
  );
}
