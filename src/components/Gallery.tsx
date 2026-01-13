import { useState, useEffect } from 'react';
import { Play, X, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SubtleBackground } from './SubtleBackground';
import studentPhoto1 from 'figma:asset/0f8cad6d745da7ebcd4af02866a7e546a8d0fa34.png';
import studentPhoto2 from 'figma:asset/23ede886d79819a7330c9da22a52d6a724305991.png';
import studentPhoto3 from 'figma:asset/d3e0da2cba3be06479716422bf23beb871551e7f.png';
import lessonPhoto from 'figma:asset/e9a908edd9e62597a9a3a942f4e9aad61985d37a.png';
import studentVideoCover1 from 'figma:asset/df4d93e24a69f9b17ac385792c2619faa8ec3ec5.png';
import studentVideoCover2 from 'figma:asset/b4b0a563cdc2025c3ebfb5ddd341ea61f54a3e37.png';
import studentVideoCover3 from 'figma:asset/e43b963fa0dff232c4f57d648129675a0b3dac0f.png';
import studentVideoCover4 from 'figma:asset/de7a2495f2f8d2f3ad84203c6a301ac495107d6b.png';
import studentVideoCover5 from 'figma:asset/86e9f701e7365599c56df2949980f86f25ddbf35.png';
import studentVideoCover6 from 'figma:asset/a144ceca796bf8cb0a61a132baee725039946920.png';

export function Gallery() {
  const [selectedVideo, setSelectedVideo] = useState<{ id: string; type: 'youtube' | 'rutube' | 'streamable' | 'kinescope' } | null>(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<{ url: string; alt: string } | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const photos = [
    {
      url: studentPhoto1,
      alt: 'Ученик на уроке барабанов'
    },
    {
      url: studentPhoto2,
      alt: 'Ученик за барабанами'
    },
    {
      url: studentPhoto3,
      alt: 'Ученица на уроке'
    }
  ];

  const videos = [
    {
      id: 'bgWWfdAhsdYD8RndehcpHx',
      type: 'kinescope' as const,
      thumbnail: studentVideoCover1,
      title: 'Урок для начинающих',
      isVertical: true
    },
    {
      id: '3wCkwgKyLh89DgLnTqSu8t',
      type: 'kinescope' as const,
      thumbnail: studentVideoCover2,
      title: 'Демонстрация техники',
      isVertical: true
    },
    {
      id: 'vLHkdrtUYLBoHSySsC5m7C',
      type: 'kinescope' as const,
      thumbnail: studentVideoCover3,
      title: 'Выступление ученика',
      isVertical: true
    },
    {
      id: '7MqU3hwf4HeN8eJsF8H8rv',
      type: 'kinescope' as const,
      thumbnail: studentVideoCover4,
      title: 'Урок №4',
      isVertical: false
    },
    {
      id: '0CmeCjnaq4y9Kifjyk3h9k',
      type: 'kinescope' as const,
      thumbnail: studentVideoCover5,
      title: 'Урок №5',
      isVertical: true
    },
    {
      id: 'u6d6TAKCnGhYDzpKDZPWTj',
      type: 'kinescope' as const,
      thumbnail: studentVideoCover6,
      title: 'Урок №6',
      isVertical: true
    }
  ];

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedVideo(null);
        setSelectedVideoIndex(null);
        setSelectedPhoto(null);
        setSelectedPhotoIndex(null);
      }

      if (selectedVideoIndex !== null) {
        if (e.key === 'ArrowLeft') {
          navigateVideo('prev');
        } else if (e.key === 'ArrowRight') {
          navigateVideo('next');
        }
      }

      if (selectedPhotoIndex !== null) {
        if (e.key === 'ArrowLeft') {
          navigatePhoto('prev');
        } else if (e.key === 'ArrowRight') {
          navigatePhoto('next');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedVideoIndex, selectedPhotoIndex]);

  const navigateVideo = (direction: 'prev' | 'next') => {
    if (selectedVideoIndex === null) return;
    
    const newIndex = direction === 'prev' 
      ? (selectedVideoIndex - 1 + videos.length) % videos.length
      : (selectedVideoIndex + 1) % videos.length;
    
    setSelectedVideoIndex(newIndex);
    setSelectedVideo({ id: videos[newIndex].id, type: videos[newIndex].type });
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (selectedPhotoIndex === null) return;
    
    const newIndex = direction === 'prev' 
      ? (selectedPhotoIndex - 1 + photos.length) % photos.length
      : (selectedPhotoIndex + 1) % photos.length;
    
    setSelectedPhotoIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
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
          {photos.map((photo, index) => (
            <div 
              key={index} 
              className="relative group overflow-hidden rounded-2xl aspect-square border border-stone-800/30 interactive-card cursor-pointer"
              onClick={() => {
                setSelectedPhoto(photo);
                setSelectedPhotoIndex(index);
              }}
            >
              <ImageWithFallback
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
          {videos.map((video, index) => (
            <div 
              key={index}
              onClick={() => {
                setSelectedVideo({ id: video.id, type: video.type });
                setSelectedVideoIndex(index);
              }}
              className="relative group cursor-pointer overflow-hidden rounded-xl lg:rounded-2xl aspect-square border border-stone-800/30 interactive-card"
            >
              <ImageWithFallback
                src={video.thumbnail}
                alt={video.title}
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
                    top: selectedVideoIndex === 2 ? '-80px' : (selectedVideoIndex === 5 ? '-10px' : (selectedVideoIndex === 0 || selectedVideoIndex === 1 || selectedVideoIndex === 4 ? '-10px' : '-2px')),
                    left: selectedVideoIndex === 2 ? '-80px' : (selectedVideoIndex === 5 ? '-10px' : (selectedVideoIndex === 0 || selectedVideoIndex === 1 || selectedVideoIndex === 4 ? '-10px' : '-2px')),
                    width: selectedVideoIndex === 2 ? 'calc(100% + 160px)' : (selectedVideoIndex === 5 ? 'calc(100% + 20px)' : (selectedVideoIndex === 0 || selectedVideoIndex === 1 || selectedVideoIndex === 4 ? 'calc(100% + 20px)' : 'calc(100% + 4px)')),
                    height: selectedVideoIndex === 2 ? 'calc(100% + 160px)' : (selectedVideoIndex === 5 ? 'calc(100% + 20px)' : (selectedVideoIndex === 0 || selectedVideoIndex === 1 || selectedVideoIndex === 4 ? 'calc(100% + 20px)' : 'calc(100% + 4px)')),
                    border: 'none',
                    transform: selectedVideoIndex === 2 ? 'scale(1.05)' : 'none'
                  }}
                ></iframe>
              </div>
            </div>
          </div>
        )}

        {/* Photo Modal */}
        {selectedPhoto && selectedPhotoIndex !== null && (
          <div 
            className="fixed inset-0 bg-stone-950/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            onClick={() => {
              setSelectedPhoto(null);
              setSelectedPhotoIndex(null);
            }}
          >
            <button 
              className="absolute top-4 right-4 w-12 h-12 bg-stone-800/60 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-100 hover:bg-stone-700/70 hover:scale-110 transition-all border border-stone-700/50 z-10"
              onClick={() => {
                setSelectedPhoto(null);
                setSelectedPhotoIndex(null);
              }}
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Navigation arrows for photos */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-stone-800/60 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-100 hover:bg-stone-700/70 hover:scale-110 transition-all border border-stone-700/50 z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigatePhoto('prev');
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-stone-800/60 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-100 hover:bg-stone-700/70 hover:scale-110 transition-all border border-stone-700/50 z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigatePhoto('next');
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="max-w-7xl max-h-[90vh] w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <ImageWithFallback
                src={selectedPhoto.url}
                alt={selectedPhoto.alt}
                className="max-w-full max-h-[90vh] object-contain rounded-2xl"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}