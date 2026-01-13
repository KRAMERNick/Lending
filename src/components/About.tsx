import { Award, Music, Users, Star, Play, X, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SubtleBackground } from './SubtleBackground';
import { useState, useEffect } from 'react';
import profilePhoto from '/images/profile-photo.png';
import videoCover1 from '/images/video-cover-1.png';
import videoCover2 from '/images/video-cover-2.png';
import videoCover3 from '/images/video-cover-3.png';
import videoCover4 from '/images/video-cover-4.png';
import videoCover5 from '/images/video-cover-5.png';
import videoCover6 from '/images/video-cover-6.png';

export function About() {
  const [selectedVideo, setSelectedVideo] = useState<{ id: string; type: 'youtube' | 'rutube' | 'streamable' | 'kinescope' } | null>(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);

  const videos = [
    { id: 'bbXSk8F62dddS5k6LjEfCk', type: 'kinescope' as const, label: 'Видео 1', hasCover: true, cover: videoCover1, isVertical: true },
    { id: 'nTXoJ9VPyyj9EtgBSrFEMJ', type: 'kinescope' as const, label: 'Видео 2', hasCover: true, cover: videoCover2, isVertical: false },
    { id: '8wNdjhzVsf9bpsDbhBbMzR', type: 'kinescope' as const, label: 'Видео 3', hasCover: true, cover: videoCover3, isVertical: true },
    { id: 'aFz2MmDLCj193ck8QdfKRt', type: 'kinescope' as const, label: 'Видео 4', hasCover: true, cover: videoCover4, isVertical: true },
    { id: 'fNn4FbBTNC3mjj1LVEWJH3', type: 'kinescope' as const, label: 'Видео 5', hasCover: true, cover: videoCover5, isVertical: false },
    { id: 'fTx9q5Jx2yDZTs461YJSsN', type: 'kinescope' as const, label: 'Видео 6', hasCover: true, cover: videoCover6, isVertical: false }
  ];

  // Handle keyboard navigation
  useEffect(() => {
    if (selectedVideoIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        navigateVideo('prev');
      } else if (e.key === 'ArrowRight') {
        navigateVideo('next');
      } else if (e.key === 'Escape') {
        setSelectedVideo(null);
        setSelectedVideoIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedVideoIndex]);

  const navigateVideo = (direction: 'prev' | 'next') => {
    if (selectedVideoIndex === null) return;
    
    const newIndex = direction === 'prev' 
      ? (selectedVideoIndex - 1 + videos.length) % videos.length
      : (selectedVideoIndex + 1) % videos.length;
    
    setSelectedVideoIndex(newIndex);
    setSelectedVideo({ id: videos[newIndex].id, type: videos[newIndex].type });
  };

  const stats = [
    { icon: Award, value: '5+', label: 'лет опыта', color: 'from-stone-700 to-stone-800' },
    { icon: Music, value: '100+', label: 'выступлений', color: 'from-stone-600 to-stone-700' },
    { icon: Star, value: 'Лучшие', label: 'методики', color: 'from-stone-700 to-stone-800' },
    { icon: Users, value: '150+', label: 'учеников', color: 'from-stone-600 to-stone-700' },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Subtle background */}
      <SubtleBackground variant={2} />
      
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
          {/* Image side (5 columns) */}
          <div className="lg:col-span-5 perspective-container">
            <div className="relative">
              {/* Diagonal frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-stone-700/20 to-stone-600/10 transform rotate-3 rounded-3xl blur-xl"></div>
              <div className="absolute -inset-2 border-2 border-stone-700/30 transform -rotate-2 rounded-3xl"></div>
              
              <div className="relative overflow-hidden rounded-3xl">
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
                    className={`p-4 sm:p-6 bg-gradient-to-br ${stat.color} rounded-2xl border border-stone-700/30 creative-card shimmer-card`}
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-stone-900/60 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-stone-300" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-2xl sm:text-3xl font-black text-stone-100 mb-1">{stat.value}</div>
                        <div className="text-stone-400 text-xs sm:text-sm font-medium leading-tight">{stat.label}</div>
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

          {/* 6 videos in grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {videos.map((video, index) => (
              <div 
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-xl lg:rounded-2xl aspect-square border border-stone-800/30 interactive-card"
                onClick={() => {
                  setSelectedVideo({ id: video.id, type: video.type });
                  setSelectedVideoIndex(index);
                }}
              >
                {video.hasCover ? (
                  <>
                    <ImageWithFallback
                      src={video.cover!}
                      alt={video.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-stone-950/40 group-hover:bg-stone-950/60 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-stone-600 to-stone-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl shadow-stone-900/50">
                        <Play className="w-6 h-6 md:w-10 md:h-10 text-stone-100 ml-1" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-stone-800 via-stone-700 to-stone-800 relative overflow-hidden flex items-center justify-center">
                    {/* Diagonal accent */}
                    <div className="absolute -top-2 -right-2 w-24 h-24 bg-gradient-to-br from-stone-700/20 to-transparent transform rotate-45"></div>
                    
                    {/* Unified play button */}
                    <div className="w-20 h-20 bg-gradient-to-br from-stone-600 to-stone-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl shadow-stone-900/50">
                      <Play className="w-10 h-10 text-stone-100 ml-1" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && selectedVideoIndex !== null && (
        <div 
          className="fixed inset-0 bg-stone-950/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
          onClick={() => {
            setSelectedVideo(null);
            setSelectedVideoIndex(null);
          }}
        >
          <button 
            className="absolute top-4 right-4 w-12 h-12 bg-stone-800/60 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-100 hover:bg-stone-700/70 hover:scale-110 transition-all border border-stone-700/50 z-10"
            onClick={() => {
              setSelectedVideo(null);
              setSelectedVideoIndex(null);
            }}
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Navigation arrows */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-stone-800/60 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-100 hover:bg-stone-700/70 hover:scale-110 transition-all border border-stone-700/50 z-10"
            onClick={(e) => {
              e.stopPropagation();
              navigateVideo('prev');
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-stone-800/60 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-100 hover:bg-stone-700/70 hover:scale-110 transition-all border border-stone-700/50 z-10"
            onClick={(e) => {
              e.stopPropagation();
              navigateVideo('next');
            }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div 
            className="w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="relative rounded-2xl overflow-hidden bg-black"
              style={{
                width: videos[selectedVideoIndex].isVertical ? 'min(90vw, calc(85vh * 9 / 16))' : 'min(90vw, 1200px)',
                height: videos[selectedVideoIndex].isVertical ? 'min(85vh, calc(90vw * 16 / 9))' : 'auto',
                aspectRatio: videos[selectedVideoIndex].isVertical ? '9 / 16' : '16 / 9'
              }}
            >
              <iframe
                width="100%"
                height="100%"
                src={
                  selectedVideo.type === 'youtube' 
                    ? `https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1` 
                    : selectedVideo.type === 'streamable'
                    ? `https://streamable.com/e/${selectedVideo.id}?autoplay=1`
                    : selectedVideo.type === 'kinescope'
                    ? `https://kinescope.io/embed/${selectedVideo.id}?autoplay=1&transparent=1`
                    : `https://rutube.ru/play/embed/${selectedVideo.id}?autoplay=1`
                }
                title="Video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ 
                  position: 'absolute',
                  top: videos[selectedVideoIndex].isVertical ? '-10px' : '-2px',
                  left: videos[selectedVideoIndex].isVertical ? '-10px' : '-2px',
                  width: videos[selectedVideoIndex].isVertical ? 'calc(100% + 20px)' : 'calc(100% + 4px)',
                  height: videos[selectedVideoIndex].isVertical ? 'calc(100% + 20px)' : 'calc(100% + 4px)',
                  border: 'none'
                }}
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}