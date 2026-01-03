import { Award, Music2, Target, TrendingUp, Play, User, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import profilePhoto from 'figma:asset/9a7c84808894f027f24365ed3a4155afc704e9a3.png';

export function About() {
  const [selectedVideo, setSelectedVideo] = useState<{ id: string; type: 'youtube' | 'rutube' } | null>(null);

  const stats = [
    { icon: Award, value: '5+', label: 'лет опыта', color: 'from-stone-700 to-stone-800' },
    { icon: Music2, value: '100+', label: 'выступлений', color: 'from-stone-600 to-stone-700' },
    { icon: Target, value: 'Лучшие', label: 'методики', color: 'from-stone-700 to-stone-800' },
    { icon: TrendingUp, value: '100%', label: 'увлечённости', color: 'from-stone-600 to-stone-700' },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Smooth dynamic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-950 to-stone-900"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-stone-900/50 via-transparent to-stone-950/50"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-stone-800/15 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      
      {/* Animated decorative elements - very subtle */}
      <div className="absolute top-1/4 right-0 w-1/3 h-px bg-gradient-to-l from-stone-700/20 via-stone-600/30 to-transparent animate-pulse"></div>
      <div className="absolute bottom-1/3 left-0 w-2/5 h-px bg-gradient-to-r from-stone-700/20 via-stone-600/30 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Floating shapes */}
      <div className="absolute top-20 right-20 w-24 h-24 border border-stone-600/15 rounded-full animate-float-slow"></div>
      <div className="absolute bottom-32 left-16 w-20 h-20 border border-stone-500/20 rotate-45 animate-float"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 border border-stone-600/10 animate-float" style={{ animationDelay: '1.5s' }}></div>

      <div className="relative container mx-auto px-4">
        {/* Section header */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-3 bg-stone-800/50 backdrop-blur-xl rounded-full mb-6 border border-stone-700/50 creative-card">
            <User className="w-4 h-4 text-stone-400" />
            <span className="text-stone-400 text-sm font-medium">Познакомимся?</span>
          </div>
          
          <h2 className="mb-4">
            О <span className="gradient-text">ПРЕПОДАВАТЕЛЕ</span>
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-stone-600 to-transparent rounded-full"></div>
        </div>

        {/* Asymmetric grid layout */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-24">
          {/* Image side (5 columns) - with diagonal treatment */}
          <div className="lg:col-span-5 perspective-container">
            <div className="relative group">
              {/* Diagonal frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-stone-700/20 to-stone-600/10 transform rotate-3 rounded-3xl blur-xl group-hover:rotate-6 transition-transform duration-700"></div>
              <div className="absolute -inset-2 border-2 border-stone-700/30 transform -rotate-2 rounded-3xl group-hover:-rotate-3 transition-transform duration-700"></div>
              
              <div className="relative overflow-hidden rounded-3xl image-hover-zoom creative-card">
                <ImageWithFallback
                  src={profilePhoto}
                  alt="Николай Бокарев"
                  className="w-full h-[600px] object-cover"
                />
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-stone-950/40 via-transparent to-transparent"></div>
                
                {/* Decorative corner */}
                <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-stone-300/40 rounded-tr-2xl"></div>
              </div>
            </div>
          </div>

          {/* Content side (7 columns) */}
          <div className="lg:col-span-7">
            <div className="space-y-6 text-stone-300 text-lg leading-relaxed">
              <p className="text-xl">
                Привет! Я <span className="text-stone-100 font-bold">Николай Бокарев</span>, и барабаны — это моя <span className="gradient-text font-semibold">страсть и призвание</span>. 
              </p>
              <p>
                Я верю, что каждый человек может научиться играть на барабанах, независимо от возраста 
                и уровня подготовки. Работаю с детьми от 7 лет и взрослыми, которые всегда мечтали попробовать.
              </p>
              <p>
                На моих уроках вы не просто освоите технику — вы научитесь <span className="text-stone-100 font-semibold">чувствовать музыку изнутри</span>, 
                импровизировать и получать удовольствие от каждого удара!
              </p>
              <p>
                Использую современные методики, создаю комфортную атмосферу и подбираю индивидуальную 
                программу для каждого ученика.
              </p>
            </div>

            {/* Stats grid with 3D cards */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={index} 
                    className={`p-6 bg-gradient-to-br ${stat.color} rounded-2xl border border-stone-700/30 creative-card shimmer-card`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-stone-900/60 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Icon className="w-7 h-7 text-stone-300" />
                      </div>
                      <div>
                        <div className="text-3xl font-black text-stone-100 mb-1">{stat.value}</div>
                        <div className="text-stone-400 text-sm font-medium">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Videos Section with creative layout */}
        <div className="mt-32">
          <div className="mb-16 text-center">
            <h3 className="mb-4">
              Мои <span className="gradient-text">Видео</span>
            </h3>
            <div className="w-32 h-1.5 bg-gradient-to-r from-stone-600 to-transparent rounded-full mx-auto"></div>
          </div>

          {/* Video grid with staggered layout */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { id: 'dQw4w9WgXcQ', type: 'youtube' as const, label: 'Репетиция' },
              { id: 'private/9e7cca394184efb69d866adf912c7146/?p=fTFilmghom5nRLqF6PWsoA', type: 'rutube' as const, label: 'Студия' },
              { id: 'dQw4w9WgXcQ', type: 'youtube' as const, label: 'Концерт' }
            ].map((video, index) => (
              <div 
                key={index} 
                className="relative group cursor-pointer"
                style={{ marginTop: index === 2 ? '3rem' : index === 1 ? '1.5rem' : '0' }}
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative overflow-hidden rounded-2xl creative-card shimmer-card">
                  {/* Diagonal accent */}
                  <div className="absolute -top-2 -right-2 w-24 h-24 bg-gradient-to-br from-stone-700/30 to-transparent transform rotate-45"></div>
                  
                  <div className="aspect-video bg-gradient-to-br from-stone-800 via-stone-700 to-stone-800 relative overflow-hidden flex items-center justify-center">
                    {/* Video thumbnail with label */}
                    <div className="text-center">
                      <h3 className="gradient-text mb-6 group-hover:scale-110 transition-transform duration-300">
                        {video.label}
                      </h3>
                      <div className="w-24 h-24 mx-auto bg-gradient-to-br from-stone-600 to-stone-700 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform shadow-2xl shadow-stone-900/50">
                        <Play className="w-12 h-12 text-stone-100 ml-2" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-stone-700/40 rounded-bl-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-stone-950/98 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <button 
            className="absolute top-4 right-4 w-12 h-12 bg-stone-800/30 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-100 hover:bg-stone-700/50 hover:scale-110 transition-all border border-stone-700/30"
            onClick={() => setSelectedVideo(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <div className="w-full max-w-6xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <iframe
              width="100%"
              height="100%"
              src={selectedVideo.type === 'youtube' 
                ? `https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1` 
                : `https://rutube.ru/play/embed/${selectedVideo.id}?autoplay=1`
              }
              title="Video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-2xl w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}