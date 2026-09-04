import Hero from "./pages/Hero";
import AvatarCanvas from "./components/AvatarCanvas";
import CustomCursor from "./components/CustomCursor";
import { useState } from "react";
import PageLoader from "./components/PageLoader";
import { About } from "./pages/About";

export default function App() {
  const [loading, setLoading] = useState(true);
  const noSelectStyle = {
    WebkitUserSelect: "none" /* Safari */,
    MozUserSelect: "none" /* Old versions of Firefox */,
    msUserSelect: "none" /* Internet Explorer/Edge */,
    userSelect: "none" /* Non-prefixed version, currently supported by most browsers */,
  };
  return (
    <>
      {loading && <PageLoader onComplete={() => setLoading(false)} />}
      <div style={noSelectStyle}>
        <CustomCursor />
        {!loading && <Hero />}
        <About />
      </div>
    </>
  );
}
