import { useState } from 'react';
import { Play, X, Camera } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import studentPhoto1 from 'figma:asset/0f8cad6d745da7ebcd4af02866a7e546a8d0fa34.png';
import studentPhoto2 from 'figma:asset/23ede886d79819a7330c9da22a52d6a724305991.png';
import studentPhoto3 from 'figma:asset/d3e0da2cba3be06479716422bf23beb871551e7f.png';
import lessonPhoto from 'figma:asset/e9a908edd9e62597a9a3a942f4e9aad61985d37a.png';

export function Gallery() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<{ url: string; alt: string } | null>(null);

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
    },
    {
      url: lessonPhoto,
      alt: 'Урок игры на барабанов'
    },
    {
      url: 'https://images.unsplash.com/photo-1701590223282-f137316edea0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcnVtJTIwbGVzc29uJTIwc3R1ZGVudHxlbnwxfHx8fDE3NjczMTU0MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Занятие в студии'
    }
  ];

  const videos = [
    {
      id: 'dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1701590223282-f137316edea0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcnVtJTIwbGVzc29uJTIwc3R1ZGVudHxlbnwxfHx8fDE3NjY0OTkyMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Урок для начинающих'
    },
    {
      id: 'dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1758336717046-c475fc6f45ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkcnVtJTIwa2l0JTIwc3R1ZGlvfGVufDF8fHx8MTc2NjQ5OTIwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Демонстрация техники'
    },
    {
      id: 'dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1571974599782-87624638275e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcnVtbWVyJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzY3MjgwMTcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Выступление ученика'
    }
  ];

  return (
    <section id="gallery" className="py-24 relative overflow-hidden">
      {/* Smooth dynamic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-stone-950/60 via-transparent to-stone-900/40"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-stone-800/10 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
      
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
            <span className="text-stone-400 text-sm">Наша студия</span>
          </div>
          <h2 className="text-stone-100 mb-4">
            Фото и видео с <span className="gradient-text">уроков</span>
          </h2>
          <p className="text-stone-400">
            Посмотрите, как проходят занятия и какое оборудование мы используем
          </p>
        </div>

        {/* Photos */}
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {photos.map((photo, index) => (
            <div 
              key={index} 
              className="relative group overflow-hidden rounded-2xl aspect-square border border-stone-800/30 interactive-card cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <ImageWithFallback
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-stone-200 font-medium">
                  {photo.alt}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Videos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <div 
              key={index}
              onClick={() => {
                setSelectedVideo(video.id);
              }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-video border border-stone-800/30 interactive-card"
            >
              <ImageWithFallback
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-stone-950/40 group-hover:bg-stone-950/60 transition-colors flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-stone-600 to-stone-700 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform shadow-2xl shadow-stone-900/50">
                  <Play className="w-10 h-10 text-stone-100 ml-2" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 text-stone-200 font-semibold">
                {video.title}
              </div>
            </div>
          ))}
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
            <div className="w-full max-w-4xl aspect-video" onClick={(e) => e.stopPropagation()}>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-2xl"
              ></iframe>
            </div>
          </div>
        )}

        {/* Photo Modal */}
        {selectedPhoto && (
          <div 
            className="fixed inset-0 bg-stone-950/98 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <button 
              className="absolute top-4 right-4 w-12 h-12 bg-stone-800/30 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-100 hover:bg-stone-700/50 hover:scale-110 transition-all border border-stone-700/30 z-10"
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <div className="max-w-7xl max-h-[90vh] w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <ImageWithFallback
                src={selectedPhoto.url}
                alt={selectedPhoto.alt}
                className="max-w-full max-h-[90vh] object-contain rounded-2xl"
              />
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-stone-900/80 backdrop-blur-md px-6 py-3 rounded-full border border-stone-700/50">
              <p className="text-stone-200 text-center">{selectedPhoto.alt}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}