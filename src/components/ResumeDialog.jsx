import { useEffect, useRef } from "react";

const resumePath = "/Sumit-Mokasare-Resume.html";

export default function ResumeDialog({ onClose, returnFocusRef }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const returnFocusElement = returnFocusRef.current;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll("a[href], button:not([disabled])");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector("button")?.focus();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      returnFocusElement?.focus();
    };
  }, [onClose, returnFocusRef]);

  return (
    <div
      className="dialog-overlay resume-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="resume-title" className="resume-dialog">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent">Resume preview</p>
            <h2 id="resume-title" className="mt-1 font-display text-lg font-semibold">Sumit Mokasare</h2>
          </div>
          <div className="flex items-center gap-2">
            <a className="resume-download-button" href={resumePath} download="Sumit-Mokasare-Resume.html">
              Download <span aria-hidden="true">↓</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume preview"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted hover:text-ink"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
        <iframe
          title="Sumit Mokasare resume preview"
          src={resumePath}
          className="resume-preview-frame"
        />
        <p className="pt-3 text-center text-[11px] text-muted">
          Download the resume file to print or save it as a PDF.
        </p>
      </section>
    </div>
  );
}
