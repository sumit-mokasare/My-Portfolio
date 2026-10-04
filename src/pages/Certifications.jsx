import { useEffect, useRef, useState } from "react";
import Reveal from "../components/Reveal";
import { certifications } from "../utils/data";

/**
 * For each certificate you can add:
 *   image:        path to the real certificate image, e.g. "/fullstackCertificate.png"  (file goes in /public)
 *   link:         credential / verification URL
 *   credentialId: optional ID text
 * Leave any of them empty ("") and the UI falls back to the original artwork.
 */

function CertificateArtwork({ cert, large = false }) {
  const [imageFailed, setImageFailed] = useState(false);

  // Real certificate image (when provided and it loads)
  if (cert.image && !imageFailed) {
    const image = (
      <img
        src={cert.image}
        alt={`${cert.title} certificate from ${cert.issuer}, ${cert.year}`}
        loading={large ? "eager" : "lazy"}
        onError={() => setImageFailed(true)}
        style={{
          display: "block",
          width: "100%",
          height: large ? "auto" : "100%",
          objectFit: large ? "contain" : "cover",
          objectPosition: "top",
        }}
      />
    );

    return (
      <div
        className={`certificate-art ${large ? "certificate-art-large" : ""}`}
        style={{
          padding: 0,
          overflow: "hidden",
          ...(large ? { height: "auto", aspectRatio: "auto", background: "#fff" } : {}),
        }}
      >
        {large ? (
          // click the big image to open the original file in a new tab (full resolution, can zoom)
          <a
            href={cert.image}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open the full-size certificate image in a new tab"
            className="block cursor-zoom-in"
          >
            {image}
          </a>
        ) : (
          image
        )}
      </div>
    );
  }

  // Original illustrative artwork (unchanged)
  return (
    <div
      className={`certificate-art ${large ? "certificate-art-large" : ""}`}
      role="img"
      aria-label={`Illustrative course artwork for ${cert.title}, not the original credential`}
    >
      <div className="certificate-art-top">
        <span>{cert.issuer}</span>
        <span>{cert.year}</span>
      </div>
      <div className="certificate-art-seal" aria-hidden="true">
        ✳
      </div>
      <div className="certificate-art-lines" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <span className="certificate-art-caption">COURSE PREVIEW</span>
    </div>
  );
}

export default function Certifications() {
  const [selected, setSelected] = useState(null);
  const closeButtonRef = useRef(null);
  const returnFocusRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!selected) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelected(null);
      } else if (event.key === "Tab") {
        // Keep focus inside the dialog; cycles between the close button and the links
        const focusable = panelRef.current?.querySelectorAll("a[href], button:not([disabled])");
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        } else if (!panelRef.current.contains(document.activeElement)) {
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
      returnFocusRef.current?.focus();
    };
  }, [selected]);

  return (
    <section id="certifications" className="section-shell bg-surface px-6 py-24 text-ink md:px-12 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="section-kicker">
            <span>04</span>
            <i /> CERTIFICATIONS
          </div>
          <div className="mb-11 mt-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="section-heading max-w-2xl">Learning, one step at a time.</h2>
            <p className="max-w-sm text-sm leading-6 text-muted">
              Courses and learning milestones that have helped shape my development journey.
            </p>
          </div>
        </Reveal>

        <div className="certificate-grid grid gap-4 sm:grid-cols-2">
          {certifications.map((cert, index) => (
            <Reveal key={cert.title} delay={index * 70} className="h-full">
              <article className="certificate-card flex h-full flex-col rounded-2xl border border-line bg-bg p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5">
                <CertificateArtwork cert={cert} />
                <div className="min-w-0 flex-1 pt-4 sm:pt-0">
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-muted">{cert.issuer}</p>
                    <span className="font-mono text-[10px] text-muted">{cert.year}</span>
                  </div>
                  <h3 className="mt-2 font-display text-base font-semibold leading-snug">{cert.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-muted">{cert.description}</p>
                  <button
                    type="button"
                    onClick={(event) => {
                      returnFocusRef.current = event.currentTarget;
                      setSelected(cert);
                    }}
                    className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-accent hover:gap-3"
                    aria-haspopup="dialog"
                  >
                    View details <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="dialog-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <section
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-title"
            className="certificate-dialog-panel"
            // wide enough to read the certificate text (the default panel was only 32rem)
            style={{ width: "min(100%, 62rem)" }}
          >
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">Course details</p>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close certificate details"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted hover:text-ink"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <CertificateArtwork cert={selected} large />
            {selected.image ? (
              <a
                href={selected.image}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-accent hover:gap-3"
              >
                Open full-size image <span aria-hidden="true">↗</span>
              </a>
            ) : (
              ""
            )}

            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
              {selected.issuer} <span className="px-1 text-muted">·</span> {selected.year}
            </p>
            <h3
              id="certificate-title"
              className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl"
            >
              {selected.title}
            </h3>
            <p className="mt-4 text-sm leading-6 text-muted">{selected.description}</p>

            <div className="mt-7 border-t border-line pt-5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted">Topics covered</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {selected.focus.map((topic) => (
                  <span key={topic} className="rounded-full border border-line bg-bg px-3 py-1.5 text-xs text-muted">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Credential link / ID, falls back to the original note when neither is added */}
            {selected.link || selected.credentialId ? (
              <div className="mt-7 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-line pt-5">
                {selected.credentialId && (
                  <p className="text-xs leading-5 text-muted">
                    Credential ID: <span className="font-mono text-ink">{selected.credentialId}</span>
                  </p>
                )}
                {selected.link && (
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-accent hover:gap-3"
                  >
                    View credential <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            ) : (
              <p className="mt-7 text-xs leading-5 text-muted">
                Certificate link and credential ID have not been added yet.
              </p>
            )}
          </section>
        </div>
      )}
    </section>
  );
}
