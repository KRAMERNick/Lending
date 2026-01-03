import { useState, useEffect } from 'react';
import { Logo } from './Logo';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-stone-950/95 backdrop-blur-md shadow-2xl border-b border-stone-800/30' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Logo />
          
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('hero')} className="text-stone-400 hover:text-stone-300 transition-colors">
              Главная
            </button>
            <button onClick={() => scrollToSection('about')} className="text-stone-400 hover:text-stone-300 transition-colors">
              О мне
            </button>
            <button onClick={() => scrollToSection('gallery')} className="text-stone-400 hover:text-stone-300 transition-colors">
              Галерея
            </button>
            <button onClick={() => scrollToSection('studio')} className="text-stone-400 hover:text-stone-300 transition-colors">
              Студия
            </button>
            <button onClick={() => scrollToSection('pricing')} className="text-stone-400 hover:text-stone-300 transition-colors">
              Цены
            </button>
            <button onClick={() => scrollToSection('game')} className="text-stone-400 hover:text-stone-300 transition-colors">
              Игра
            </button>
            <button onClick={() => scrollToSection('contact')} className="px-6 py-2 bg-gradient-to-r from-stone-600 to-stone-700 text-stone-100 rounded-full hover:shadow-lg hover:shadow-stone-900/50 transition-all">
              Контакты
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}