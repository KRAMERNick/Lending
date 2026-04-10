import { Gamepad2, Trophy, RotateCcw, Volume2, VolumeX, Info, X, CheckCircle, Sparkles, Copy } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import drumSetImage from 'figma:asset/f9c5a1903cc2c16dbc6fd4c231a7d0c613aca842.png';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SubtleBackground } from './SubtleBackground';

type DrumPad = 'kick' | 'snare' | 'hihat' | 'tom1' | 'tom2' | 'tom3' | 'crash' | 'ride';

interface HitZone {
  id: DrumPad;
  name: string;
  cx: number; // center x in %
  cy: number; // center y in %
  r: number;  // radius in %
  key: string;
}

// Ссылки на аудиофайлы
const drumSounds: Record<DrumPad, string> = {
  kick: 'https://raw.githubusercontent.com/KRAMERNick/Drum-sounds/main/Kick.mp3',
  snare: 'https://raw.githubusercontent.com/KRAMERNick/Drum-sounds/main/Snare.mp3',
  hihat: 'https://raw.githubusercontent.com/KRAMERNick/Drum-sounds/main/Hi-Hat.mp3',
  tom1: 'https://raw.githubusercontent.com/KRAMERNick/Drum-sounds/main/Tom%201.mp3',
  tom2: 'https://raw.githubusercontent.com/KRAMERNick/Drum-sounds/main/Tom%202.mp3',
  tom3: 'https://raw.githubusercontent.com/KRAMERNick/Drum-sounds/main/Tom%203.mp3',
  crash: 'https://raw.githubusercontent.com/KRAMERNick/Drum-sounds/main/Crash.mp3',
  ride: 'https://raw.githubusercontent.com/KRAMERNick/Drum-sounds/main/Ride.mp3'
};

export function DrumGame() {
  const [userPattern, setUserPattern] = useState<DrumPad[]>([]);
  const [isWinner, setIsWinner] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [copiedPromo, setCopiedPromo] = useState(false);
  const [activePad, setActivePad] = useState<DrumPad | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBuffersRef = useRef<Record<string, AudioBuffer>>({});

  // Паттерн: Kick-Snare-Kick-Kick-Snare-Crash
  const targetPattern: DrumPad[] = ['kick', 'snare', 'kick', 'kick', 'snare', 'crash'];

  // Круглые зоны для барабанов на новом изображении
  const hitZones: HitZone[] = [
    { id: 'crash', name: 'Crash', cx: 29, cy: 18, r: 8, key: '1' },
    { id: 'ride', name: 'Ride', cx: 75, cy: 24, r: 9, key: '2' },
    { id: 'hihat', name: 'Hi-Hat', cx: 16, cy: 36, r: 7, key: 'Q' },
    { id: 'tom1', name: 'Tom 1', cx: 40, cy: 28, r: 7, key: 'W' },
    { id: 'tom2', name: 'Tom 2', cx: 55, cy: 28, r: 7, key: 'E' },
    { id: 'tom3', name: 'Tom 3', cx: 71, cy: 44, r: 8, key: 'R' },
    { id: 'snare', name: 'Snare', cx: 35, cy: 42, r: 8, key: 'A' },
    { id: 'kick', name: 'Kick', cx: 50, cy: 54, r: 12, key: 'Space' },
  ];

  // Загрузка аудиофайлов
  const loadAudio = async (url: string) => {
    try {
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      const audioContext = audioContextRef.current || new AudioContext();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      return audioBuffer;
    } catch (error) {
      console.error(`Error loading audio from ${url}:`, error);
      return null;
    }
  };

  // Проигрывание аудио
  const playDrumSound = (pad: DrumPad) => {
    const audioContext = audioContextRef.current || new AudioContext();
    audioContextRef.current = audioContext;
    const audioBuffer = audioBuffersRef.current[pad];
    
    if (audioBuffer) {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
    } else {
      // Fallback: используем HTML5 Audio API
      const audio = new Audio(drumSounds[pad]);
      audio.volume = 0.7;
      audio.play().catch(err => console.error('Error playing audio:', err));
    }
  };

  const handlePadClick = (pad: DrumPad) => {
    if (isWinner) return;

    playDrumSound(pad);
    setActivePad(pad);
    setTimeout(() => setActivePad(null), 150);

    const newPattern = [...userPattern, pad];
    setUserPattern(newPattern);

    if (newPattern.length === targetPattern.length) {
      const isCorrect = newPattern.every((p, i) => p === targetPattern[i]);
      if (isCorrect) {
        setIsWinner(true);
        setShowHint(false);
      } else {
        setTimeout(() => {
          setUserPattern([]);
        }, 600);
      }
    }
  };

  const resetGame = () => {
    setUserPattern([]);
    setIsWinner(false);
    setShowHint(false);
    setGameStarted(false);
    setActiveKeys(new Set());
    setCopiedPromo(false);
  };

  const copyPromoCode = async () => {
    try {
      // Пробуем современный Clipboard API
      await navigator.clipboard.writeText('РИТМ50');
      setCopiedPromo(true);
      setTimeout(() => setCopiedPromo(false), 2000);
    } catch (err) {
      // Fallback для старых браузеров или когда Clipboard API заблокирован
      try {
        const textArea = document.createElement('textarea');
        textArea.value = 'РИТМ50';
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
        setCopiedPromo(true);
        setTimeout(() => setCopiedPromo(false), 2000);
      } catch (fallbackErr) {
        console.error('Failed to copy:', fallbackErr);
        // Показываем сообщение об ошибке пользователю
        alert('Не удалось скопировать. Промокод: РИТМ50');
      }
    }
  };

  // Убираем функционал клавиатуры - комментируем useEffect
  /*
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore keyboard events when user is typing in an input field
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      const zone = hitZones.find(z => 
        z.key === e.key.toUpperCase() || (e.key === ' ' && z.key === 'Space')
      );
      if (zone) {
        e.preventDefault();
        handlePadClick(zone.id);
        setActiveKeys(prev => new Set([...prev, zone.key]));
      }
    };

    const handleKeyRelease = (e: KeyboardEvent) => {
      // Ignore keyboard events when user is typing in an input field
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      const zone = hitZones.find(z => 
        z.key === e.key.toUpperCase() || (e.key === ' ' && z.key === 'Space')
      );
      if (zone) {
        e.preventDefault();
        setActiveKeys(prev => {
          const newSet = new Set(prev);
          newSet.delete(zone.key);
          return newSet;
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyRelease);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', handleKeyRelease);
    };
  }, [userPattern, isWinner]);
  */

  useEffect(() => {
    const loadAllSounds = async () => {
      const buffers: Record<string, AudioBuffer> = {};
      for (const [pad, url] of Object.entries(drumSounds)) {
        if (url) {
          buffers[pad] = await loadAudio(url);
        }
      }
      audioBuffersRef.current = buffers;
    };

    loadAllSounds();
  }, []);

  return (
    <section id="game" className="py-24 relative overflow-hidden">
      {/* Subtle background */}
      <SubtleBackground variant={6} />
      
      <div className="container mx-auto px-2 sm:px-4 relative">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-800/30 backdrop-blur-sm rounded-full mb-4 border border-stone-700/30">
            <Sparkles className="w-4 h-4 text-stone-400" />
            <span className="text-stone-400 text-sm">Интерактивная игра</span>
          </div>
          <h2 className="text-stone-100 mb-4">
            Получите скидку 50%!
          </h2>
          <p className="text-stone-400 px-4">
            Сыграйте правильный ритм и получите промокод на скидку первого урока
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-stone-900/60 backdrop-blur-sm rounded-3xl p-3 sm:p-8 shadow-2xl border border-stone-800/20">
            {/* Instructions */}
            {!gameStarted && !isWinner && (
              <div className="mb-6 sm:mb-8 p-4 sm:p-6 md:p-8 bg-gradient-to-br from-stone-800/30 to-stone-900/30 border-2 border-stone-700/40 rounded-2xl shadow-xl">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-stone-600 to-stone-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-stone-100" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-stone-100 text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-stone-400" />
                      Задание для получения скидки:
                    </h3>
                    <div className="bg-stone-950/50 p-3 sm:p-4 rounded-xl border border-stone-700/30 mb-2 sm:mb-3">
                      <p className="text-stone-200 text-sm sm:text-base md:text-lg font-semibold mb-2">
                        Сыграйте ритм:
                      </p>
                      <p className="text-stone-300 text-base sm:text-lg md:text-2xl font-black tracking-wide">
                        Kick → Snare → Kick → Kick → Snare → Crash
                      </p>
                    </div>
                    <p className="text-stone-400 text-xs sm:text-sm md:text-base">
                      💡 <span className="font-semibold">Подсказка:</span> Кликайте на барабаны на изображении ниже
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Progress */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-stone-400 text-xs sm:text-sm">Ваш ритм:</span>
              </div>
              <div className="flex justify-center gap-1.5 sm:gap-2 flex-wrap">
                {targetPattern.map((_, index) => (
                  <div
                    key={index}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all shadow-md border-2 ${
                      userPattern[index]
                        ? userPattern[index] === targetPattern[index]
                          ? 'bg-gradient-to-br from-green-600 to-emerald-700 border-green-500/50 shadow-green-900/50'
                          : 'bg-gradient-to-br from-red-600 to-rose-700 border-red-500/50 shadow-red-900/50'
                        : 'bg-stone-800/60 border-stone-800/30'
                    }`}
                  >
                    {userPattern[index] && (
                      <span className="text-white font-bold text-xs sm:text-sm">
                        {index + 1}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Full Drum Set with circular hit zones */}
            <div className="relative mb-6 sm:mb-8">
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border-2 border-stone-800/30 mx-auto max-w-full">
                <ImageWithFallback
                  src={drumSetImage}
                  alt="Drum Kit"
                  className="w-full h-auto min-h-[300px] sm:min-h-0"
                />
                
                {/* SVG overlay for circular zones */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {hitZones.map((zone) => (
                    <g key={zone.id}>
                      <circle
                        cx={zone.cx}
                        cy={zone.cy}
                        r={zone.r}
                        className={`cursor-pointer pointer-events-auto transition-all ${
                          activePad === zone.id 
                            ? 'fill-stone-400/40 stroke-stone-300' 
                            : 'fill-transparent stroke-transparent hover:fill-stone-500/10'
                        }`}
                        strokeWidth="0.5"
                        onClick={() => handlePadClick(zone.id)}
                      />
                    </g>
                  ))}
                </svg>

                {/* Labels */}
                {hitZones.map((zone) => (
                  <div
                    key={`label-${zone.id}`}
                    className="absolute pointer-events-none"
                    style={{
                      left: `${zone.cx}%`,
                      top: `${zone.cy}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div className="bg-stone-900/90 backdrop-blur-sm px-2 py-1 rounded-lg border border-stone-700/40 shadow-lg">
                      <div className="text-stone-100 font-semibold text-xs whitespace-nowrap text-center">{zone.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Winner Message */}
            {isWinner && (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-stone-600 to-stone-700 rounded-full mb-6 animate-bounce shadow-2xl shadow-stone-900/50">
                  <Trophy className="w-10 h-10 text-stone-100" />
                </div>
                <h3 className="text-stone-100 mb-4">
                  Поздравляем! 🎉
                </h3>
                <p className="text-stone-300 mb-6">
                  Вы правильно сыграли ритм! Получите <span className="font-bold text-stone-400">скидку 50%</span> на первый урок!
                </p>
                <div className="inline-block px-8 py-4 bg-gradient-to-r from-stone-800/30 to-stone-900/30 rounded-xl mb-2 border-2 border-stone-700/50">
                  <p className="text-stone-400 text-sm mb-1">Ваш промокод:</p>
                  <button
                    onClick={copyPromoCode}
                    className="group flex items-center gap-2 mx-auto transition-all hover:scale-105"
                  >
                    <p className="text-stone-100 font-bold text-3xl">РИТМ50</p>
                    {copiedPromo ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <Copy className="w-6 h-6 text-stone-400 group-hover:text-stone-300 transition-colors" />
                    )}
                  </button>
                </div>
                <p className="text-stone-500 text-sm mb-6 italic">
                  {copiedPromo ? '✓ Скопировано!' : 'Нажмите чтобы скопировать'}
                </p>
                <p className="text-stone-400 mb-8">
                  Свяжитесь через мессенджеры ниже и укажите этот код при записи!
                </p>
                <button
                  onClick={resetGame}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-stone-600 to-stone-700 text-stone-100 rounded-full hover:shadow-lg hover:shadow-stone-900/50 transition-all"
                >
                  <RotateCcw className="w-5 h-5" />
                  Попробовать еще раз
                </button>
              </div>
            )}

            {/* Reset Button */}
            {!isWinner && userPattern.length > 0 && (
              <div className="text-center">
                <button
                  onClick={resetGame}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-stone-800/60 backdrop-blur-sm border-2 border-stone-700/30 text-stone-300 rounded-full hover:bg-stone-800 transition-all"
                >
                  <RotateCcw className="w-5 h-5" />
                  Начать сначала
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}