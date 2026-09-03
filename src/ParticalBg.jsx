import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useMemo } from "react";

const initParticles = async (engine) => {
  await loadSlim(engine);
};

const colors = ["#ff0000", "#00ff00", "#0088ff", "#ffff00", "#ff00ff", "#00ffff", "#ff8800", "#9900ff", "#ffffff"];

export default function ParticleBackground() {
  // mouse partcal connect to the mouse
  //   const options = useMemo(
  //     () => ({
  //       fullScreen: { enable: true, zIndex: 0 },
  //       background: { color: "transparent" },

  //       // 👇 mouse interactivity
  //       interactivity: {
  //         detectsOn: "window", // detects mouse across whole window, not just canvas element
  //         events: {
  //           onHover: {
  //             enable: true,
  //             mode: "grab", // try: "grab", "attract", "bubble", "repulse", "connect"
  //           },
  //           resize: true,
  //         },
  //         modes: {
  //           grab: {
  //             distance: 200,
  //             links: {
  //               opacity: 0.5,
  //             },
  //           },
  //           attract: {
  //             distance: 200,
  //             duration: 0.4,
  //             factor: 5,
  //           },
  //           repulse: {
  //             distance: 150,
  //             duration: 0.4,
  //           },
  //           bubble: {
  //             distance: 200,
  //             size: 6,
  //             duration: 0.4,
  //           },
  //         },
  //       },

  //       particles: {
  //         number: {
  //           value: 100,
  //           density: {
  //             enable: true, // keeps particle count stable relative to screen size
  //           },
  //         },
  //         color: {
  //           value: colors,
  //         },
  //         shape: { type: "circle" },
  //         opacity: { value: 0.7 },
  //         size: { value: { min: 1, max: 3 } },
  //         move: {
  //           enable: true,
  //           speed: 1,
  //           outModes: {
  //             default: "out", // particle wraps/respawns instead of vanishing permanently
  //           },
  //         },
  //         // ensures particles are never destroyed, just repositioned
  //         life: {
  //           duration: {
  //             sync: false,
  //             value: 0, // 0 = infinite life, never dies
  //           },
  //           count: 0, // 0 = infinite respawns
  //         },
  //       },
  //     }),
  //     [],
  //   );

  // mouse se dur bhagate hee

  const options = useMemo(
    () => ({
      fullScreen: { enable: false, zIndex: 0 },
      background: { color: "transparent" },

      // 👇 mouse move par particles door bhagenge
      interactivity: {
        detectsOn: "canvas",
        events: {
          onHover: {
            enable: true,
            mode: "repulse", // yeh hi wo effect hai jo aap chahte hain
          },
          resize: true,
        },
        modes: {
          repulse: {
            distance: 100, // kitni door tak cursor ka asar hoga
            duration: 0, // kitni jaldi particles wapas normal position par aayenge
            factor: 10, // repulse ki strength (zyada = zyada door bhagenge)
            speed: 1, // repulse hone ki speed
          },
        },
      },

      particles: {
        number: {
          value: 200,
          density: {
            enable: true,
          },
        },
        color: {
          value: ["#ff0000", "#00ff00", "#0088ff", "#ffff00", "#ff00ff", "#00ffff", "#ff8800", "#9900ff", "#ffffff"],
        },
        shape: { type: "circle" },
        opacity: { value: 0.7 },
        size: { value: { min: 1, max: 3 } },
        move: {
          enable: true,
          speed: 2,
          outModes: {
            default: "out",
          },
        },
        life: {
          duration: {
            sync: false,
            value: 0,
          },
          count: 0,
        },
      },
    }),
    [],
  );

  return (
    <ParticlesProvider init={initParticles}>
      <Particles id="tsparticles" options={options} style={{ width: "100%", height: "100%" }} />
    </ParticlesProvider>
  );
}
