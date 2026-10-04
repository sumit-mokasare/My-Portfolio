import { useEffect, useState } from "react";
const RING_RADIUS = 54;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;
const SESSION_KEY = "portfolio-loader-seen";

const STATUS = [
  { at: 0, text: "Initializing" },
  { at: 30, text: "Loading assets" },
  { at: 65, text: "Preparing interface" },
  { at: 90, text: "Almost ready" },
  { at: 100, text: "Welcome" },
];

export default function PageLoader({ onDone, minDuration = 2200 }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [skip] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (skip) {
      onDone?.();
      return undefined;
    }

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? 4000 : minDuration;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Waits at 92% until the page has really finished loading
    let loaded = document.readyState === "complete";
    const onLoad = () => {
      loaded = true;
    };
    window.addEventListener("load", onLoad);

    let raf;
    let exitTimer;
    let doneTimer;
    const start = performance.now();

    const finish = () => {
      document.body.style.overflow = previousOverflow;
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      onDone?.();
    };

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.min(eased * 100, loaded ? 100 : 92);
      setProgress(value);

      if (value >= 100) {
        exitTimer = setTimeout(() => setExiting(true), 350);
        doneTimer = setTimeout(finish, 350 + 1300);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      window.removeEventListener("load", onLoad);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (skip) return null;

  const status = [...STATUS].reverse().find((item) => progress >= item.at) ?? STATUS[0];

  return (
    <div className={`pl-root ${exiting ? "is-exiting" : ""}`} aria-busy={!exiting} aria-label="Loading portfolio">
      <div className="pl-panel pl-panel--top" />
      <div className="pl-panel pl-panel--bottom" />

      <div className="pl-center pl-fade">
        <div className="pl-ring">
          <svg viewBox="0 0 120 120" className="pl-ring-svg" aria-hidden="true">
            <defs>
              <linearGradient id="pl-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="var(--accent2)" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r={RING_RADIUS} className="pl-ring-track" />
            <circle
              cx="60"
              cy="60"
              r={RING_RADIUS}
              className="pl-ring-progress"
              strokeDasharray={RING_LENGTH}
              strokeDashoffset={RING_LENGTH * (1 - progress / 100)}
            />
          </svg>
          <span className="pl-monogram">SM</span>
        </div>

        <p className="pl-status" role="status">
          <span key={status.text} className="pl-status-text">
            {status.text}
          </span>
        </p>
      </div>
    </div>
  );
}
