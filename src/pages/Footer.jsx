const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-line bg-bg px-4 pb-8 pt-16 text-ink md:px-6 md:pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* BRAND */}
          <div className="max-w-xs">
            <h3 className="font-display text-2xl font-bold tracking-tight">Sumit Mokasare</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Fullstack developer building modern web applications with React, Node.js and Generative AI.
            </p>
          </div>

          {/* NAV */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Navigate</p>
            <div className="mt-3 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="w-fit text-sm text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* BACK TO TOP */}
          <button
            onClick={scrollToTop}
            className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line transition-colors hover:border-accent2"
            aria-label="Back to top"
          >
            <span className="font-mono text-sm text-muted transition-colors group-hover:text-accent2">↑</span>
          </button>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[10px] tracking-widest text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} Sumit Mokasare. All rights reserved.</span>
          <span>Designed &amp; built with React, GSAP and Tailwind.</span>
        </div>
      </div>
    </footer>
  );
}
