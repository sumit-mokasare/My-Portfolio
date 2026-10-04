import Hero from "./pages/Hero";
import About from "./pages/About";
import Projects from "./pages/Projects";
import { SmoothScroll } from "./components/SmoothScroll";
import Skills from "./pages/Skills";
import Certifications from "./pages/Certifications";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
import { useState } from "react";
import PageLoader from "./components/PageLoader";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  const [loading, setLoading] = useState(true);
  return (
    <SmoothScroll>
      <CustomCursor />
      {loading && <PageLoader onDone={() => setLoading(false)} />}
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
