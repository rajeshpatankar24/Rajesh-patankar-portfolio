import './index.css';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoHighlights from './components/BentoHighlights';
import StoryJourney from './components/StoryJourney';
import Projects from './components/Projects';
import Experience from './components/Experience';
import GitHubStats from './components/GitHubStats';
import Education from './components/Education';
import InteractiveTerminalCard from './components/InteractiveTerminalCard';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll globally
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <Navbar />
      <main style={{ background: '#0a0a0f' }}>
        <Hero />
        {/* <BentoHighlights /> */}
        {/* <StoryJourney /> */}
        <Projects />
        <Experience />
        <GitHubStats />
        <Education />
        {/* <InteractiveTerminalCard /> */}
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

