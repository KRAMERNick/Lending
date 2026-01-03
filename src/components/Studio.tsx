import { MapPin, Car, Clock, X, Building2, Music } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import studioImage1 from 'figma:asset/096d705629012b2f1004a0738c0e87bdcca91bcb.png';
import studioImage2 from 'figma:asset/9d4831b1963db42d157a35e9ab0547b8b4c619f6.png';
import studioImage3 from 'figma:asset/d6c8368137dc006dfeaca8a9aa289c946e8e3b32.png';

export function Studio() {
  const [selectedPhoto, setSelectedPhoto] = useState<{ url: string; alt: string } | null>(null);

  const studioPhotos = [
    { url: studioImage1, alt: 'Chayka Studio - Барабанная установка' },
    { url: studioImage2, alt: 'Chayka Studio - Интерьер' },
    { url: studioImage3, alt: 'Chayka Studio - Оборудование' }
  ];

  return (
    <section id="studio" className="py-24 relative overflow-hidden bg-gradient-to-b from-stone-900 to-stone-950">
      {/* Smooth dynamic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-stone-950/70 via-transparent to-stone-900/50"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-stone-800/8 to-transparent animate-pulse" style={{ animationDelay: '1.2s' }}></div>
      
      {/* Floating shapes */}
      <div className="absolute top-20 right-24 w-16 h-16 border border-stone-600/10 rounded-full animate-float"></div>
      <div className="absolute bottom-28 left-20 w-20 h-20 border border-stone-500/12 rotate-45 animate-float-slow"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-800/30 backdrop-blur-sm rounded-full mb-4 border border-stone-700/30">
            <Building2 className="w-4 h-4 text-stone-400" />
            <span className="text-stone-400 text-sm">Студия</span>
          </div>
          <h2 className="text-stone-100 mb-4">
            Где проходят занятия
          </h2>
          <p className="text-stone-400 max-w-2xl mx-auto">
            Профессионально оборудованная студия с комфортными условиями для обучения
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Studio Images Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="relative group cursor-pointer" onClick={() => setSelectedPhoto(studioPhotos[0])}>
              <div className="absolute inset-0 bg-gradient-to-br from-stone-700/20 to-stone-600/20 rounded-3xl transform rotate-2 group-hover:rotate-3 transition-transform blur-xl"></div>
              <ImageWithFallback
                src={studioImage1}
                alt="Chayka Studio - Барабанная установка"
                className="relative rounded-3xl shadow-2xl w-full h-[300px] object-cover border-2 border-stone-800/30"
              />
            </div>
            <div className="relative group cursor-pointer" onClick={() => setSelectedPhoto(studioPhotos[1])}>
              <div className="absolute inset-0 bg-gradient-to-br from-stone-700/20 to-stone-600/20 rounded-3xl transform -rotate-2 group-hover:-rotate-3 transition-transform blur-xl"></div>
              <ImageWithFallback
                src={studioImage2}
                alt="Chayka Studio - Интерьер"
                className="relative rounded-3xl shadow-2xl w-full h-[300px] object-cover border-2 border-stone-800/30"
              />
            </div>
            <div className="relative group cursor-pointer" onClick={() => setSelectedPhoto(studioPhotos[2])}>
              <div className="absolute inset-0 bg-gradient-to-br from-stone-700/20 to-stone-600/20 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform blur-xl"></div>
              <ImageWithFallback
                src={studioImage3}
                alt="Chayka Studio - Оборудование"
                className="relative rounded-3xl shadow-2xl w-full h-[300px] object-cover border-2 border-stone-800/30"
              />
            </div>
          </div>

          {/* Studio Info */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-stone-900/60 backdrop-blur-sm rounded-2xl p-6 border border-stone-800/20 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-stone-600 to-stone-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-stone-900/50">
                  <Music className="w-6 h-6 text-stone-100" />
                </div>
                <div>
                  <h3 className="text-stone-100 mb-2">Chayka Studio</h3>
                  <p className="text-stone-300 text-sm">
                    Современная музыкальная студия с профессиональным оборудованием и отличной акустикой.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-stone-900/60 backdrop-blur-sm rounded-2xl p-6 border border-stone-800/20 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-stone-600 to-stone-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-stone-900/50">
                  <MapPin className="w-6 h-6 text-stone-100" />
                </div>
                <div>
                  <h4 className="text-stone-100 mb-2">Адрес студии</h4>
                  <p className="text-stone-300 text-sm">
                    Москва, Ленинградский просп., 47, стр. 1
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-stone-800/30 to-stone-900/30 rounded-2xl p-6 border border-stone-700/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-stone-500 to-stone-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-stone-900/50">
                  <Car className="w-6 h-6 text-stone-100" />
                </div>
                <div>
                  <h4 className="text-stone-100 mb-2">Выездные занятия</h4>
                  <p className="text-stone-300 text-sm">
                    Провожу занятия с выездом на другие площадки по всей Москве.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </section>
  );
}