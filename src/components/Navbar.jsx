import { useEffect, useState } from "react";

const Navbar = () => {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved ? saved === "dark" : true;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-12 py-5 border-b border-line backdrop-blur-sm bg-bg/40 ">
      <span className="font-bold text-lg text-ink">Sumit Mokasare</span>

      <div className="flex items-center gap-8">
        <a href="#work" className="nav-link text-sm text-muted hover:text-ink transition-colors">
          Work
        </a>
        <a href="#about" className="nav-link text-sm text-muted hover:text-ink transition-colors">
          About
        </a>
        <a href="#contact" className="nav-link text-sm text-muted hover:text-ink transition-colors">
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
    </nav>
  );
};

export default Navbar;
