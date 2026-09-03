import Button from "../components/Button";
import FloatingShapes from "../components/FloatingShapes";
import Navbar from "../components/Navbar";

function Hero({ avatarSlot }) {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-bg text-ink font-display ">
      <div className="inset-0 z-0">
        <FloatingShapes />
      </div>

      {/* Avatar — full-bleed background layer, still interactive (orbit drag) */}
      <div className="absolute inset-0 z-10">
        {avatarSlot ? (
          avatarSlot
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-sm">
            your 3D avatar canvas goes here
          </div>
        )}
      </div>

      {/* Navbar */}
      <Navbar />

      {/* OPEN TO WORK */}

      <div className="absolute right-6 top-24 z-40  md:right-12 pointer-events-auto ">
        <div className="group flex items-center gap-3 rounded-full border border-line bg-surface/60 px-4 py-2 backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent2 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent2" />
          </span>

          <span className="text-xs font-medium uppercase tracking-[0.15em] text-ink">Open to work</span>
        </div>
      </div>

      {/* Text overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-12 pointer-events-none">
        <h1 className="pointer-events-auto font-bold leading-[0.92] tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ink">
          Full-Stack
          <br />
          Developer
        </h1>

        <p className="pointer-events-auto font-voice italic text-accent2 text-lg md:text-2xl mt-5">
          Fullstack developer building for the web
        </p>

        <p className="pointer-events-auto font-voice  text-muted text-sm md:text-sm mt-2">
          Building modern web applications with React, Node.js and Generative AI.
        </p>

        <div className="pointer-events-auto flex gap-4 mt-8">
          <Button variant="primary" href="#work">
            View work
          </Button>
          <Button variant="secondary" href="#contact">
            Say hello
          </Button>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 md:left-12 right-6 md:right-12 z-10 flex justify-between text-xs text-muted pointer-events-none">
        <span>based in nagpur, india</span>
        <span>scroll to explore ↓</span>
      </div>
    </div>
  );
}
export default Hero;
