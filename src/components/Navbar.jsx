import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Logo from "./Logo";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const navRef = useRef(null);
  const navItemsRef = useRef([]);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved ? saved === "dark" : true;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  useGSAP(() => {
    if (!mobileMenuRef.current) return;

    if (menuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        {
          height: 0,
          opacity: 0,
        },
        {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
        },
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power3.inOut",
      });
    }
  }, [menuOpen]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className="
        absolute top-0 left-0 right-0 z-30
        backdrop-blur-sm bg-bg/40
        px-6 md:px-12
        py-5
      "
    >
      <div className="flex items-center justify-between">
        <Logo />

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          <a
            ref={(el) => (navItemsRef.current[0] = el)}
            href="#work"
            className="nav-link text-sm text-muted hover:text-ink transition-colors"
          >
            Work
          </a>

          <a
            ref={(el) => (navItemsRef.current[1] = el)}
            href="#about"
            className="nav-link text-sm text-muted hover:text-ink transition-colors"
          >
            About
          </a>

          <a
            ref={(el) => (navItemsRef.current[2] = el)}
            href="#certifications"
            className="nav-link text-sm text-muted hover:text-ink transition-colors"
          >
            Certifications
          </a>

          <a
            ref={(el) => (navItemsRef.current[3] = el)}
            href="#contact"
            className="nav-link text-sm text-muted hover:text-ink transition-colors"
          >
            Contact
          </a>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-12 h-7 rounded-full border border-line relative"
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-ink text-[10px] flex items-center justify-center transition-transform duration-300 ${
                dark ? "translate-x-0" : "translate-x-5"
              }`}
            >
              {dark ? "🌙" : "☀️"}
            </span>
          </button>
        </div>

        {/* MOBILE CONTROLS */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-12 h-7 rounded-full border border-line relative"
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-ink text-[10px] flex items-center justify-center transition-transform duration-300 ${
                dark ? "translate-x-0" : "translate-x-5"
              }`}
            >
              {dark ? "🌙" : "☀️"}
            </span>
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="relative flex h-8 w-8 flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`h-px w-6 bg-ink transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />

            <span className={`h-px w-6 bg-ink transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />

            <span
              className={`h-px w-6 bg-ink transition-all duration-300 ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        ref={mobileMenuRef}
        className="
          md:hidden
          overflow-hidden
          h-0
          opacity-0
        "
      >
        <div className="flex flex-col items-end gap-5 pt-8 pb-4">
          <a href="#work" onClick={closeMenu} className="nav-link text-sm text-muted hover:text-ink transition-colors">
            Work
          </a>

          <a href="#about" onClick={closeMenu} className="nav-link text-sm text-muted hover:text-ink transition-colors">
            About
          </a>

          <a
            href="#certifications"
            onClick={closeMenu}
            className="nav-link text-sm text-muted hover:text-ink transition-colors"
          >
            Certifications
          </a>

          <a
            href="#contact"
            onClick={closeMenu}
            className="nav-link text-sm text-muted hover:text-ink transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
