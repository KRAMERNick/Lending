import { Music4, Award, Users, TrendingUp, Gift, Triangle } from 'lucide-react';
import imgHero from 'figma:asset/70cc53eaa605efc47b6e45338b031b360fb81a62.png';
import { SubtleBackground } from './SubtleBackground';

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20" itemScope itemType="https://schema.org/WebPageElement">
      {/* Subtle background */}
      <SubtleBackground variant={1} />
      
      {/* Floating shapes */}
      <div className="absolute top-32 left-20 w-24 h-24 border border-stone-600/10 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-24 w-32 h-32 border border-stone-500/12 rotate-45 animate-float-slow"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-stone-600/8 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Right side - Hero image - Clean and minimal - FIRST on mobile */}
          <div className="relative animate-fade-in-scale md:order-2">
            <img
              src={imgHero}
              alt="Николай Бокарев - преподаватель барабанов"
              className="relative rounded-2xl shadow-xl w-full h-auto object-cover border border-stone-800/20"
            />
          </div>
          
          {/* Left side - Text content - SECOND on mobile */}
          <div className="text-left space-y-8 md:order-1">
            {/* Badge - animated */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-800/40 backdrop-blur-xl rounded-full border border-stone-700/40 animate-fade-in shadow-lg">
              <Music4 className="w-4 h-4 text-stone-400" />
              <span className="text-stone-400 text-sm font-medium tracking-wide">Профессиональное обучение</span>
            </div>
            
            {/* Main heading - with gradient on НИКОЛАЙ */}
            <div className="space-y-3 animate-slide-up">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none">
                <span className="gradient-text">
                  НИКОЛАЙ
                </span>
                <br />
                <span className="text-stone-200">БОКАРЕВ</span>
              </h1>
              
              {/* Subtitle badges - cleaner design without lines */}
              <div className="flex flex-col gap-3 mt-8">
                <div className="inline-flex items-center animate-slide-right">
                  <div className="text-2xl md:text-3xl font-semibold text-stone-300 tracking-[0.3em] uppercase">
                    Преподаватель
                  </div>
                </div>
                <div className="inline-flex items-center animate-slide-right" style={{ animationDelay: '0.1s' }}>
                  <div className="text-2xl md:text-3xl font-semibold text-stone-300 tracking-[0.3em] uppercase">
                    Барабанов
                  </div>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-stone-400 text-lg leading-relaxed max-w-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Помогаю раскрыть <span className="text-stone-200 font-semibold">музыкальный потенциал</span> через <strong>уроки барабанов</strong>. От базовых навыков до продвинутых техник — <strong>индивидуальное обучение игре на барабанах</strong> для детей и взрослых в Москве.
            </p>
            
            {/* Stats - horizontal badges */}
            <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-800/30 backdrop-blur-sm rounded-full border border-stone-700/40 hover:bg-stone-800/40 transition-all">
                <Award className="w-4 h-4 text-stone-400" />
                <span className="text-stone-300 text-sm font-medium">5+ лет опыта</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-800/30 backdrop-blur-sm rounded-full border border-stone-700/40 hover:bg-stone-800/40 transition-all">
                <TrendingUp className="w-4 h-4 text-stone-400" />
                <span className="text-stone-300 text-sm font-medium">100+ выступлений</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-800/30 backdrop-blur-sm rounded-full border border-stone-700/40 hover:bg-stone-800/40 transition-all">
                <Users className="w-4 h-4 text-stone-400" />
                <span className="text-stone-300 text-sm font-medium">Индивидуальный подход</span>
              </div>
            </div>
            
            {/* CTA Buttons - BIGGER and with COOL animations */}
            <div className="flex flex-col sm:flex-row gap-5 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <a 
                href="#contact" 
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-stone-700 via-stone-600 to-stone-700 bg-[length:200%_auto] text-stone-50 rounded-full hover:shadow-2xl hover:shadow-stone-700/60 transition-all duration-300 font-bold text-lg overflow-hidden hover:scale-105"
              >
                <span className="relative z-10">Записаться на урок</span>
                <Triangle className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform duration-300 fill-stone-50" style={{ transform: 'rotate(90deg)' }} />
                <div className="absolute inset-0 bg-gradient-to-r from-stone-600 via-stone-500 to-stone-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {/* Shine effect */}
                <div className="absolute inset-0 -left-full group-hover:left-full transition-all duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
              </a>
              <a 
                href="#game" 
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-stone-900/50 backdrop-blur-xl text-stone-100 rounded-full hover:bg-stone-800/70 transition-all duration-300 font-bold text-lg border-2 border-stone-700/60 hover:border-stone-600 overflow-hidden hover:scale-105"
              >
                <Gift className="w-6 h-6 relative z-10 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
                <span className="relative z-10">Получить скидку 50%</span>
                <div className="absolute inset-0 bg-gradient-to-r from-stone-700/40 to-stone-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {/* Shine effect */}
                <div className="absolute inset-0 -left-full group-hover:left-full transition-all duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}