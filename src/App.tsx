import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Services from "./components/Services";
import Projects from "./components/Projects";
import TopGames from "./components/TopGames";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import { Cursor, Intro, Navbar } from "./components/Chrome";
import { LazyMotion, MotionConfig } from "motion/react";
import ErrorBoundary from "./components/ErrorBoundary";
import Payment from "./components/Payment";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const loadFeatures = () =>
  import("./lib/motion-features").then((module) => module.default);
function App() {
  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <LazyMotion features={loadFeatures} strict>
          <Navbar />
          <Intro />
          <Cursor />
          <main id="main">
            <Hero />
            <Stats />
            <TopGames />
            <Projects />
            <Services />
            <Process />
            <Payment />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </LazyMotion>
      </MotionConfig>
    </ErrorBoundary>
  );
}

export default App;
