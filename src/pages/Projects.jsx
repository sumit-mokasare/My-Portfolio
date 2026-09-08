import { useRef, useState } from "react";
import { gsap } from "gsap";
import ProjectDetail from "../components/ProjectDetail";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "../utils/data";

gsap.registerPlugin(ScrollTrigger);
// Usage in App.jsx:
// import Projects from "./components/Projects";
// <Projects />

export default function Projects() {
  const [activeId, setActiveId] = useState(null);
  const [selected, setSelected] = useState(null);
  const folderRefs = useRef([]);
  const imageRefs = useRef({});

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(folderRefs.current, {
        opacity: 0,
        y: 60,
      });

      // Load animation
      gsap.to(folderRefs.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
      });

      // 03 load
      gsap.from(".work-number", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",
      });

      // Folder scroll parallax
      folderRefs.current.forEach((folder) => {
        gsap.to(folder, {
          y: -60,
          stagger: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: folder,
            start: "top 90%",
            end: "bottom 30%",
            scrub: 1,
          },
        });
      });

      // 03 parallax
      gsap.to(".work-number", {
        yPercent: 30,
        rotate: 15,
        ease: "none",
        scrollTrigger: {
          trigger: "#work",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const handleEnter = (id) => {
    setActiveId(id);

    const imgs = imageRefs.current[id];

    if (!imgs) return;

    gsap.to(imgs, {
      opacity: 1,
      y: (i, el) => el.dataset.finalY,
      scale: 1,
      duration: 0.55,
      delay: 0.3,
      ease: "back.out(1.4)",
      stagger: 0.07,
      overwrite: true,
    });
  };

  const handleLeave = (id) => {
    setActiveId((curr) => (curr === id ? null : curr));

    const imgs = imageRefs.current[id];

    if (!imgs) return;

    // First remove images
    gsap.to(imgs, {
      opacity: 0,
      y: 80,
      scale: 0.4,
      duration: 0.2,
      ease: "power3.in",
      stagger: 0.5,
      overwrite: true,

      // After images are gone
      onComplete: () => {
        setActiveId((curr) => (curr === id ? null : curr));
      },
    });
  };

  return (
    <section id="work" className="relative bg-bg text-ink h-screen min-h-screen px-4">
      {/* ================= HEADER ================= */}
      <div
        className="work-number absolute  -top-50 left-1/2 -translate-x-1/2 font-bold text-ink pointer-events-none select-none"
        style={{ fontSize: "min(34vw, 340px)", opacity: 0.035, lineHeight: 1, letterSpacing: "-0.05em" }}
      >
        03
      </div>
      <div className="flex items-center justify-between  font-mono text-[10px] md:text-[11px] tracking-widest text-muted">
        <div className=" flex items-center gap-3 ">
          <span className="text-xs tracking-widest text-muted">( 03 )</span>
          <span className="h-px w-10 bg-line"></span>
          <span className="text-xs tracking-widest text-muted">WORK'S</span>
        </div>
      </div>

      {/* ================= PROJECT GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 h-full items-end ">
        {projects.map((p, index) => {
          const isActive = activeId === p.id;
          const rowIndex = Math.floor(index / 2); // 0, 1, 2 for a 2-col grid
          const isFirstRow = rowIndex === 0;

          return (
            <div
              key={p.id}
              ref={(el) => {
                folderRefs.current[index] = el;
              }}
              onMouseEnter={() => handleEnter(p.id)}
              onMouseLeave={() => handleLeave(p.id)}
              onClick={() => setSelected(p)}
              className={`
                relative min-h-50 md:min-h-70 cursor-pointer
                transition-transform duration-500
                ${p.id === "02" ? "-mt-15 md:mt-0" : ""}
                ${!isFirstRow ? "-mt-10 md:-mt-50" : ""}
                ${isActive ? "-translate-y-5 md:-translate-y-4" : ""}
              `}
            >
              {/* ================= FOLDER (stacked layers) ================= */}
              {/* several folder-shaped outlines behind the main one, each
                  offset a little further down — gives the "stack of
                  folders overlapping" depth seen in the reference diagram */}
              <div className="absolute inset-0">
                {[12, 8, 4].map((offset, layerIdx) => (
                  <div
                    key={layerIdx}
                    className="absolute inset-0 border border-line bg-bg "
                    style={{
                      clipPath: "polygon(0 0, 24% 0, 28% 10%, 100% 10%, 100% 100%, 0 100%)",
                      transform: `translateY(${offset}px)`,
                      opacity: isActive ? 0 : 0.6 - layerIdx * 0.15,
                    }}
                  />
                ))}

                <div
                  className={`absolute inset-0  transition-all duration-500    ${isActive ? "bg-accent2 border-accent2" : "bg-bg "}`}
                  style={{
                    clipPath: "polygon(0 0, 24% 0, 28% 10%, 100% 10%, 100% 100%, 0 100%)",
                  }}
                />
              </div>

              {/* ================= FOLDER TOP LABEL ================= */}
              <div
                className={`
                  absolute top-0 left-0 
                  px-4 md:px-6
                  pt-2 
                  font-mono text-[10px]
                  tracking-widest
                  transition-colors duration-500
                  
                  ${isActive ? "text-bg/70" : "text-muted"}
                `}
              >
                {p.id}
              </div>

              {/* ================= PROJECT CONTENT ================= */}
              <div className="relative h-full px-6 md:px-10 pt-20 pb-10">
                <h3
                  className={`
                    font-display
                    font-bold
                    text-4xl
                    md:text-3xlxl
                    lg:text-4xl
                    lowercase
                    tracking-tight
                    leading-none
                    transition-colors
                    duration-500
                    ${isActive ? "text-bg" : "text-ink"}
                  `}
                >
                  {p.title}
                </h3>
              </div>

              {/* ================= FANNED IMAGES ================= */}

              <div
                className="
                   sm:block
                   -z-20
                  pointer-events-none
                  absolute
                  left-[58%]
                  -top-10
                  -translate-x-1/2 -translate-y-15
                  w-10 md:w-40
                "
              >
                {p.images.map((img, i) => (
                  <div
                    key={i}
                    ref={(el) => {
                      if (!imageRefs.current[p.id]) {
                        imageRefs.current[p.id] = [];
                      }

                      imageRefs.current[p.id][i] = el;
                      if (el) {
                        gsap.set(el, {
                          opacity: 0,
                          y: 80, // 👈 niche se start
                          scale: 0.4, // 👈 small start
                          xPercent: -50,
                        });
                      }
                    }}
                    data-final-y={img.y}
                    className="
                      absolute
                      left-15
                      -top-10
                      opacity-0
                    "
                    style={{
                      marginLeft: `${img.x * 0.35}px`,
                    }}
                  >
                    <div className="relative w-50 md:w-50 ">
                      <img
                        src={img.url}
                        alt=""
                        className="
                          w-40 h-40
                          md:w-40 md:h-48
                          object-cover
                          rounded-sm
                          border
                          border-white/20
                          shadow-2xl
                        "
                        style={{
                          transform: `rotate(${img.rotate}deg)`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* ================= BOTTOM META ================= */}
              <div className="absolute flex gap-2 top-10 right-2">
                <div
                  className={`
                  font-mono
                  text-[9px]
                  tracking-widest
                  uppercase
                  transition-colors
                  duration-500
                  ${isActive ? "text-bg/60" : "text-muted"}
                `}
                >
                  {p.category}
                </div>

                <div
                  className={`
                  font-mono
                  text-[9px]
                  tracking-widest
                  transition-colors
                  duration-500
                  ${isActive ? "text-bg/60" : "text-muted"}
                `}
                >
                  {p.year}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= PROJECT DETAIL ================= */}
      {selected && <ProjectDetail project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
