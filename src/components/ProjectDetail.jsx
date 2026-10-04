import { useEffect, useRef, useState } from "react";

export default function ProjectDetail({ project, onClose, returnFocusRef }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const returnFocusElement = returnFocusRef.current;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "Tab") {
        // Keep focus inside the dialog; cycle through the close button and project links
        const focusable = dialogRef.current?.querySelectorAll("a[href], button:not([disabled])");
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        } else if (!dialogRef.current.contains(document.activeElement)) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      returnFocusElement?.focus();
    };
  }, [onClose, returnFocusRef]);

  return (
    <div
      className="dialog-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
        ref={dialogRef}
        className="project-dialog"
      >
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
              Project focus <span className="px-1 text-muted">·</span> {project.category}
            </p>
            <h3
              id="project-detail-title"
              className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl"
            >
              {project.title}
            </h3>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-muted hover:text-ink"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        {/* Real project screenshot (replaces ProjectVisual) */}
        <div className="mt-6 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line bg-bg">
          {project.image && !imageFailed ? (
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              Project image coming soon
            </div>
          )}
        </div>

        <p className="mt-6 text-sm leading-6 text-muted">{project.description}</p>

        <div className="mt-7 grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-muted">Areas of focus</h4>
            <ul className="mt-3 space-y-2.5">
              {project.details.map((detail) => (
                <li key={detail} className="flex gap-2 text-sm text-ink">
                  <span className="text-accent" aria-hidden="true">
                    ↗
                  </span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-muted">Related technologies</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-line bg-bg px-3 py-1.5 text-xs text-muted">
                  {tag}
                </span>
              ))}
            </div>
            {project.liveUrl || project.githubUrl ? (
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {project.liveUrl && (
                  <a className="button-primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    Live demo <span aria-hidden="true">↗</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a className="button-secondary" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    GitHub <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            ) : (
              <p className="mt-4 text-xs leading-5 text-muted">
                Add a project link or live demo when one is available.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
