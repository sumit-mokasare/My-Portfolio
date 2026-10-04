import { useEffect, useState } from "react";
import Logo from "./Logo";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <nav className="site-nav fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-8" aria-label="Main navigation">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-line/80 bg-bg/85 px-4 py-3 shadow-sm backdrop-blur-xl sm:px-6">
        <Logo />

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link text-sm text-muted hover:text-ink">
              {link.label}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
            className="theme-toggle"
            type="button"
          >
            <span aria-hidden="true">{dark ? "☼" : "◐"}</span>
          </button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
            className="theme-toggle"
            type="button"
          >
            <span aria-hidden="true">{dark ? "☼" : "◐"}</span>
          </button>
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-ink"
            type="button"
          >
            <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-navigation" className="mx-4 mt-2 rounded-2xl border border-line bg-bg p-3 shadow-lg md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm text-muted transition-colors hover:bg-surface hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
