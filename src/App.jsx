import Hero from "./pages/Hero";
import CustomCursor from "./components/CustomCursor";
import { useState } from "react";
import PageLoader from "./components/PageLoader";
import About from "./pages/About";
import Projects from "./pages/Projects";
import SmoothScroll from "./components/SmoothScroll";

export default function App() {
  const [loading, setLoading] = useState(true);
  const noSelectStyle = {
    WebkitUserSelect: "none" /* Safari */,
    MozUserSelect: "none" /* Old versions of Firefox */,
    msUserSelect: "none" /* Internet Explorer/Edge */,
    userSelect: "none" /* Non-prefixed version, currently supported by most browsers */,
  };
  return (
    <SmoothScroll>
      {/* {loading && <PageLoader onComplete={() => setLoading(false)} />} */}
      <div style={noSelectStyle}>
        <CustomCursor />
        {loading && (
          <div>
            <Hero />
            <About />
            <Projects />
          </div>
        )}
      </div>
    </SmoothScroll>
  );
}
