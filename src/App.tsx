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
    // Устанавливаем заголовок страницы
    document.title = 'Школа барабанов Николая Бокарева';
    
    // Функция для обновления/создания мета-тегов
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.getElementsByTagName('head')[0].appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };
    
    // SEO мета-теги
    setMetaTag('description', 'Школа барабанов Николая Бокарева. Обучение игре на барабанах для детей и взрослых. Индивидуальные занятия в студии Chayka Studio и выездные уроки по Москве. Первое занятие 1500₽.');
    setMetaTag('keywords', 'школа барабанов, барабаны, обучение барабанам, уроки барабанов, Николай Бокарев, drum school, Москва');
    
    // Open Graph теги (для соцсетей и поисковиков)
    setMetaTag('og:title', 'Школа барабанов Николая Бокарева', true);
    setMetaTag('og:description', 'Обучение игре на барабанах для детей и взрослых. Индивидуальные занятия в студии и выездные уроки по Москве.', true);
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:url', window.location.href, true);
    
    // Twitter Card теги
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', 'Школа барабанов Николая Бокарева');
    setMetaTag('twitter:description', 'Обучение игре на барабанах для детей и взрослых в Москве');
    
    // Favicon
    const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'icon';
    link.href = '/favicon.ico';
    document.getElementsByTagName('head')[0].appendChild(link);
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