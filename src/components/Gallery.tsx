import { Users2, Camera, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import studentPhoto1 from 'figma:asset/0f8cad6d745da7ebcd4af02866a7e546a8d0fa34.png';
import studentPhoto2 from 'figma:asset/23ede886d79819a7330c9da22a52d6a724305991.png';
import studentPhoto3 from 'figma:asset/d3e0da2cba3be06479716422bf23beb871551e7f.png';
import studentVideoCover1 from 'figma:asset/df4d93e24a69f9b17ac385792c2619faa8ec3ec5.png';
import studentVideoCover2 from 'figma:asset/b4b0a563cdc2025c3ebfb5ddd341ea61f54a3e37.png';
import studentVideoCover3 from 'figma:asset/e43b963fa0dff232c4f57d648129675a0b3dac0f.png';
import studentVideoCover4 from 'figma:asset/de7a2495f2f8d2f3ad84203c6a301ac495107d6b.png';
import studentVideoCover5 from 'figma:asset/86e9f701e7365599c56df2949980f86f25ddbf35.png';
import studentVideoCover6 from 'figma:asset/a144ceca796bf8cb0a61a132baee725039946920.png';
import { SubtleBackground } from './SubtleBackground';

export function Gallery() {
  const [selectedMedia, setSelectedMedia] = useState<{ type: 'photo' | 'video'; url?: string; id?: string; videoType?: 'youtube' | 'rutube' | 'streamable' | 'kinescope' } | null>(null);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);

  const studentPhotos = [
    { url: studentPhoto1, alt: 'Ученик на занятии 1' },
    { url: studentPhoto2, alt: 'Ученик на занятии 2' },
    { url: studentPhoto3, alt: 'Ученик на занятии 3' }
  ];

  const studentVideos = [
    { id: '7kHZpnipHJwN4VGYTHxfPm', type: 'kinescope' as const, label: 'Видео ученика 1', hasCover: true, cover: studentVideoCover1, isVertical: true },
    { id: '69xETkNLqv8ZU9vXgUHHHj', type: 'kinescope' as const, label: 'Видео ученика 2', hasCover: true, cover: studentVideoCover2, isVertical: true },
    { id: '3x97NaDumgm4vEE4XuZipB', type: 'kinescope' as const, label: 'Видео ученика 3', hasCover: true, cover: studentVideoCover3, isVertical: true },
    { id: 'kW4yRnGzm8Nc3DuqaHQzZS', type: 'kinescope' as const, label: 'Видео ученика 4', hasCover: true, cover: studentVideoCover4, isVertical: false },
    { id: '3tPL7cMtS42yMKkN1wf75V', type: 'kinescope' as const, label: 'Видео ученика 5', hasCover: true, cover: studentVideoCover5, isVertical: false },
    { id: 'cXCZaQSDaRoKJH4Lnxm9Mk', type: 'kinescope' as const, label: 'Видео ученика 6', hasCover: true, cover: studentVideoCover6, isVertical: false }
  ];

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMedia(null);
        setSelectedMediaIndex(null);
      }

      if (selectedMediaIndex !== null) {
        if (e.key === 'ArrowLeft') {
          navigateMedia('prev');
        } else if (e.key === 'ArrowRight') {
          navigateMedia('next');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMediaIndex]);

  const navigateMedia = (direction: 'prev' | 'next') => {
    if (selectedMediaIndex === null) return;
    
    const newIndex = direction === 'prev' 
      ? (selectedMediaIndex - 1 + studentVideos.length) % studentVideos.length
      : (selectedMediaIndex + 1) % studentVideos.length;
    
    setSelectedMediaIndex(newIndex);
    setSelectedMedia({ type: 'video', id: studentVideos[newIndex].id, videoType: studentVideos[newIndex].type });
  };

  return (
    <section id="gallery" className="py-24 relative overflow-hidden">
      {/* Subtle background */}
      <SubtleBackground variant={3} />
      
      {/* Animated accent lines - very subtle */}
      <div className="absolute top-1/3 left-0 w-1/4 h-px bg-gradient-to-r from-stone-700/15 via-stone-600/25 to-transparent animate-pulse"></div>
      <div className="absolute bottom-1/3 right-0 w-1/3 h-px bg-gradient-to-l from-stone-700/15 via-stone-600/25 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      
      {/* Floating shapes */}
      <div className="absolute top-16 left-20 w-16 h-16 border border-stone-600/12 rounded-full animate-float"></div>
      <div className="absolute bottom-24 right-24 w-20 h-20 border border-stone-500/15 rotate-45 animate-float-slow"></div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-800/30 backdrop-blur-sm rounded-full mb-4 border border-stone-700/30 hover:border-stone-600/50 hover:scale-105 transition-all">
            <Camera className="w-4 h-4 text-stone-400" />
            <span className="text-stone-400 text-sm">Галерея</span>
          </div>
          <h2 className="text-stone-100 mb-4">
            Фото и видео <span className="gradient-text">учеников</span>
          </h2>
          <p className="text-stone-400">
            Посмотрите, как проходят занятия и какое оборудование мы используем
          </p>
        </div>

        {/* Photos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {studentPhotos.map((photo, index) => (
            <div 
              key={index} 
              className="relative group overflow-hidden rounded-2xl aspect-square border border-stone-800/30 interactive-card cursor-pointer"
              onClick={() => {
                setSelectedMedia({ type: 'photo', url: photo.url });
                setSelectedMediaIndex(index);
              }}
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* Videos Section Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-3 bg-stone-800/50 backdrop-blur-xl rounded-full border border-stone-700/50 creative-card">
            <Play className="w-4 h-4 text-stone-400" />
            <span className="text-stone-400 text-sm font-medium">Видео</span>
          </div>
        </div>

        {/* Videos - Compact grid for mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {studentVideos.map((video, index) => (
            <div 
              key={index}
              onClick={() => {
                setSelectedMedia({ type: 'video', id: video.id, videoType: video.type });
                setSelectedMediaIndex(index);
              }}
              className="relative group cursor-pointer overflow-hidden rounded-xl lg:rounded-2xl aspect-square border border-stone-800/30 interactive-card"
            >
              <img
                src={video.cover}
                alt={video.label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-stone-600 to-stone-700 rounded-full flex items-center justify-center shadow-2xl shadow-stone-900/50">
                  <Play className="w-6 h-6 md:w-10 md:h-10 text-stone-100 ml-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedMedia && selectedMedia.type === 'video' && selectedMediaIndex !== null && (
          <div 
            className="fixed inset-0 bg-stone-950/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            onClick={() => {
              setSelectedMedia(null);
              setSelectedMediaIndex(null);
            }}
          >
            <button 
              className="absolute top-4 right-4 w-12 h-12 bg-stone-800/60 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-100 hover:bg-stone-700/70 hover:scale-110 transition-all border border-stone-700/50 z-10"
              onClick={() => {
                setSelectedMedia(null);
                setSelectedMediaIndex(null);
              }}
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Navigation arrows */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-stone-800/60 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-100 hover:bg-stone-700/70 hover:scale-110 transition-all border border-stone-700/50 z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigateMedia('prev');
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-stone-800/60 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-100 hover:bg-stone-700/70 hover:scale-110 transition-all border border-stone-700/50 z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigateMedia('next');
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
                  width: studentVideos[selectedMediaIndex].isVertical ? 'min(90vw, calc(85vh * 9 / 16))' : 'min(90vw, 1200px)',
                  height: studentVideos[selectedMediaIndex].isVertical ? 'min(85vh, calc(90vw * 16 / 9))' : 'auto',
                  aspectRatio: studentVideos[selectedMediaIndex].isVertical ? '9 / 16' : '16 / 9'
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={
                    selectedMedia.videoType === 'youtube' 
                      ? `https://www.youtube.com/embed/${selectedMedia.id}?autoplay=1` 
                      : selectedMedia.videoType === 'streamable'
                      ? `https://streamable.com/e/${selectedMedia.id}?autoplay=1`
                      : selectedMedia.videoType === 'kinescope'
                      ? `https://kinescope.io/embed/${selectedMedia.id}?muted=0&autoplay=0&controls=1&preload=metadata`
                      : `https://rutube.ru/play/embed/${selectedMedia.id}?autoplay=1`
                  }
                  title="Video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ 
                    position: 'absolute',
                    top: selectedMediaIndex === 2 ? '-10px' : (selectedMediaIndex === 5 ? '-10px' : (selectedMediaIndex === 0 || selectedMediaIndex === 1 || selectedMediaIndex === 4 ? '-10px' : '-2px')),
                    left: selectedMediaIndex === 2 ? '-15px' : (selectedMediaIndex === 5 ? '-10px' : (selectedMediaIndex === 0 || selectedMediaIndex === 1 || selectedMediaIndex === 4 ? '-10px' : '-2px')),
                    width: selectedMediaIndex === 2 ? 'calc(100% + 30px)' : (selectedMediaIndex === 5 ? 'calc(100% + 20px)' : (selectedMediaIndex === 0 || selectedMediaIndex === 1 || selectedMediaIndex === 4 ? 'calc(100% + 20px)' : 'calc(100% + 4px)')),
                    height: selectedMediaIndex === 2 ? 'calc(100% + 20px)' : (selectedMediaIndex === 5 ? 'calc(100% + 20px)' : (selectedMediaIndex === 0 || selectedMediaIndex === 1 || selectedMediaIndex === 4 ? 'calc(100% + 20px)' : 'calc(100% + 4px)')),
                    border: 'none',
                    transform: 'none'
                  }}
                ></iframe>
              </div>
            </div>
          </div>
        )}

        {/* Photo Modal */}
        {selectedMedia && selectedMedia.type === 'photo' && selectedMediaIndex !== null && (
          <div 
            className="fixed inset-0 bg-stone-950/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            onClick={() => {
              setSelectedMedia(null);
              setSelectedMediaIndex(null);
            }}
          >
            <button 
              className="absolute top-4 right-4 w-12 h-12 bg-stone-800/60 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-100 hover:bg-stone-700/70 hover:scale-110 transition-all border border-stone-700/50 z-10"
              onClick={() => {
                setSelectedMedia(null);
                setSelectedMediaIndex(null);
              }}
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Navigation arrows for photos */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-stone-800/60 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-100 hover:bg-stone-700/70 hover:scale-110 transition-all border border-stone-700/50 z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigateMedia('prev');
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-stone-800/60 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-100 hover:bg-stone-700/70 hover:scale-110 transition-all border border-stone-700/50 z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigateMedia('next');
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="max-w-7xl max-h-[90vh] w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <img
                src={selectedMedia.url}
                alt={studentPhotos[selectedMediaIndex].alt}
                className="max-w-full max-h-[90vh] object-contain rounded-2xl"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}