import { ChevronDown, Sparkles, Play, Award, Music, Zap, Gift } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SubtleBackground } from './SubtleBackground';
import heroPhoto from 'figma:asset/70cc53eaa605efc47b6e45338b031b360fb81a62.png';

export function Hero() {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-20 noise-overlay">
      {/* Subtle background */}
      <SubtleBackground variant={1} />

      {/* Asymmetric Content Layout */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left side - Bold Typography (7 columns) */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            {/* Floating badge */}
            <div className="inline-flex items-center gap-2 px-5 py-3 bg-stone-800/50 backdrop-blur-xl rounded-full mb-8 border border-stone-700/50 hover:border-stone-600/70 transition-all hover:scale-105 creative-card shadow-xl shadow-stone-900/30">
              <Sparkles className="w-4 h-4 text-stone-400" />
              <span className="text-stone-300 text-sm font-medium">Профессиональное обучение</span>
            </div>
            
            {/* Oversized bold typography */}
            <h1 className="mb-6 leading-[1.1] tracking-tighter perspective-container pt-2">
              <span className="block gradient-text hover:scale-105 transition-transform inline-block">НИКОЛАЙ</span><br/>
              <span className="block text-stone-200 -mt-2">БОКАРЕВ</span>
            </h1>
            
            {/* Accent text with special styling */}
            <div className="relative inline-block mb-6">
              <div className="absolute -left-4 top-1/2 w-1 h-20 bg-gradient-to-b from-stone-600 to-stone-700 transform -translate-y-1/2"></div>
              <p className="text-stone-300 text-3xl md:text-4xl font-black tracking-tight pl-4">
                ПРЕПОДАВАТЕЛЬ<br/>
                <span className="text-stone-400">БАРАБАНОВ</span>
              </p>
            </div>
            
            <p className="text-stone-400 text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
              Помогаю раскрыть <span className="text-stone-300 font-semibold">музыкальный потенциал</span> через барабаны. 
              От базовых навыков до продвинутых техник — индивидуально для детей и взрослых.
            </p>

            {/* Feature pills with 3D effect */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { icon: Award, text: '5+ лет опыта', color: 'from-stone-700 to-stone-800' },
                { icon: Music, text: '100+ выступлений', color: 'from-stone-600 to-stone-700' },
                { icon: Play, text: 'Индивидуальный подход', color: 'from-stone-700 to-stone-800' },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={index} 
                    className={`flex items-center gap-2 px-5 py-3 bg-gradient-to-br ${feature.color} backdrop-blur-sm rounded-full border border-stone-700/30 creative-card shadow-lg`}
                  >
                    <Icon className="w-4 h-4 text-stone-300" />
                    <span className="text-stone-200 text-sm font-medium">{feature.text}</span>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons with enhanced design */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group glow-button px-10 py-5 bg-gradient-to-r from-stone-600 via-stone-700 to-stone-600 text-stone-100 rounded-full font-bold text-lg shadow-2xl shadow-stone-900/50 hover:shadow-stone-800/60 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2 justify-center">
                  Записаться на урок
                  <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button
                onClick={() => document.getElementById('game')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-stone-900/70 backdrop-blur-sm border-2 border-stone-700/60 text-stone-300 rounded-full hover:bg-stone-800/70 hover:border-stone-600/80 transition-all font-bold text-lg shimmer-card flex items-center justify-center gap-2"
              >
                <Gift className="w-5 h-5 text-stone-400" />
                Получить скидку 50%
              </button>
            </div>
          </div>

          {/* Right side - Image with creative layout (5 columns) */}
          <div className="lg:col-span-5 perspective-container order-1 lg:order-2">
            <div className="relative">
              {/* Main image */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-3xl">
                  <ImageWithFallback
                    src={heroPhoto}
                    alt="Николай Бокарев"
                    className="w-full h-[350px] sm:h-[450px] lg:h-[600px] object-cover"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-stone-950/40 via-transparent to-stone-950/40"></div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-stone-700/40 rounded-tr-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}