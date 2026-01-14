import { Hero } from './components/Hero';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { Studio } from './components/Studio';
import { Pricing } from './components/Pricing';
import { DrumGame } from './components/DrumGame';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';
import { AnimatedBackground } from './components/AnimatedBackground';
import { SectionTransition } from './components/SectionTransition';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    document.title = 'Обучение игре на барабанах';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-blue-50/30 to-amber-50/30 relative">
      <AnimatedBackground />
      <Navigation />
      <Hero />
      <About />
      <SectionTransition />
      <Gallery />
      <SectionTransition />
      <Studio />
      <SectionTransition />
      <Pricing />
      <SectionTransition />
      <DrumGame />
      <Contact />
    </div>
  );
}
