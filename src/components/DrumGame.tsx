import { useState, useRef, useEffect } from 'react';
import { Trophy, RotateCcw, Volume2, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import drumSetImage from 'figma:asset/894d7096c6ee7ab2d6ea0fdb89c2e91b89636037.png';

type DrumPad = 'kick' | 'snare' | 'hihat' | 'tom1' | 'tom2' | 'tom3' | 'crash' | 'ride';

interface HitZone {
  id: DrumPad;
  name: string;
  cx: number; // center x in %
  cy: number; // center y in %
  r: number;  // radius in %
  key: string;
}

export function DrumGame() {
  const [userPattern, setUserPattern] = useState<DrumPad[]>([]);
  const [isWinner, setIsWinner] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [copiedPromo, setCopiedPromo] = useState(false);
  const [activePad, setActivePad] = useState<DrumPad | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Паттерн: Kick-Kick-Snare-Kick-Kick-Snare
  const targetPattern: DrumPad[] = ['kick', 'kick', 'snare', 'kick', 'kick', 'snare'];

  // Круглые зоны для барабанов на новом изображении
  const hitZones: HitZone[] = [
    { id: 'crash', name: 'Crash', cx: 29, cy: 22, r: 8, key: '1' },
    { id: 'ride', name: 'Ride', cx: 75, cy: 24, r: 9, key: '2' },
    { id: 'hihat', name: 'Hi-Hat', cx: 16, cy: 36, r: 7, key: 'Q' },
    { id: 'tom1', name: 'Tom 1', cx: 41, cy: 28, r: 7, key: 'W' },
    { id: 'tom2', name: 'Tom 2', cx: 58, cy: 29, r: 7, key: 'E' },
    { id: 'tom3', name: 'Tom 3', cx: 71, cy: 48, r: 8, key: 'R' },
    { id: 'snare', name: 'Snare', cx: 33, cy: 45, r: 8, key: 'A' },
    { id: 'kick', name: 'Kick', cx: 52, cy: 54, r: 12, key: 'Space' },
  ];

  // Студийные барабанные звуки
  const playStudioDrumSound = (pad: DrumPad) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    const ctx = audioContextRef.current;
    const now = ctx.currentTime;

    if (pad === 'kick') {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      filter.type = 'lowpass';
      filter.frequency.value = 100;
      
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      osc1.frequency.setValueAtTime(120, now);
      osc1.frequency.exponentialRampToValueAtTime(50, now + 0.05);
      osc1.frequency.exponentialRampToValueAtTime(40, now + 0.3);
      
      osc2.frequency.setValueAtTime(180, now);
      osc2.frequency.exponentialRampToValueAtTime(60, now + 0.05);
      
      gain.gain.setValueAtTime(1.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
      
      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.6);
      osc2.stop(now + 0.6);
      
    } else if (pad === 'snare') {
      const osc = ctx.createOscillator();
      const noise = ctx.createBufferSource();
      const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.4, ctx.sampleRate);
      const noiseData = noiseBuffer.getChannelData(0);
      
      for (let i = 0; i < noiseData.length; i++) {
        noiseData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.05));
      }
      noise.buffer = noiseBuffer;
      
      const oscGain = ctx.createGain();
      const noiseGain = ctx.createGain();
      const noiseFilter = ctx.createBiquadFilter();
      
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.value = 2000;
      noiseFilter.Q.value = 1;
      
      osc.connect(oscGain);
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      oscGain.connect(ctx.destination);
      noiseGain.connect(ctx.destination);
      
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.1);
      
      oscGain.gain.setValueAtTime(0.6, now);
      oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      
      noiseGain.gain.setValueAtTime(0.8, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      
      osc.start(now);
      noise.start(now);
      osc.stop(now + 0.15);
      noise.stop(now + 0.2);
      
    } else if (pad === 'hihat') {
      const noise = ctx.createBufferSource();
      const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
      const noiseData = noiseBuffer.getChannelData(0);
      
      for (let i = 0; i < noiseData.length; i++) {
        noiseData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.02));
      }
      noise.buffer = noiseBuffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 8000;
      filter.Q.value = 2;
      
      const gain = ctx.createGain();
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
      
      noise.start(now);
      noise.stop(now + 0.06);
      
    } else if (pad === 'crash' || pad === 'ride') {
      const noise = ctx.createBufferSource();
      const duration = pad === 'crash' ? 3 : 2;
      const noiseBuffer = ctx.createBuffer(2, ctx.sampleRate * duration, ctx.sampleRate);
      
      for (let channel = 0; channel < 2; channel++) {
        const data = noiseBuffer.getChannelData(channel);
        for (let i = 0; i < data.length; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.8));
        }
      }
      noise.buffer = noiseBuffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = pad === 'crash' ? 4000 : 3000;
      filter.Q.value = 0.7;
      
      const gain = ctx.createGain();
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + duration - 0.5);
      
      noise.start(now);
      noise.stop(now + duration);
      
    } else if (pad === 'tom1' || pad === 'tom2' || pad === 'tom3') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      filter.type = 'lowpass';
      filter.frequency.value = 1000;
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      const freq = pad === 'tom1' ? 160 : pad === 'tom2' ? 120 : 100;
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + 0.2);
      
      gain.gain.setValueAtTime(0.9, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      
      osc.start(now);
      osc.stop(now + 0.5);
    }
  };

  const handlePadClick = (pad: DrumPad) => {
    if (isWinner) return;

    playStudioDrumSound(pad);
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

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
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

  return (
    <section id="game" className="py-24 relative overflow-hidden bg-gradient-to-b from-stone-900 to-stone-950">
      {/* Smooth dynamic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-stone-950/60 via-transparent to-stone-900/50"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-stone-800/10 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      
      {/* Floating shapes */}
      <div className="absolute top-16 left-24 w-18 h-18 border border-stone-600/12 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-28 w-22 h-22 border border-stone-500/10 rotate-45 animate-float-slow"></div>
      <div className="absolute top-1/2 left-1/3 w-14 h-14 border border-stone-600/8 animate-float" style={{ animationDelay: '1.2s' }}></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-800/30 backdrop-blur-sm rounded-full mb-4 border border-stone-700/30">
            <Sparkles className="w-4 h-4 text-stone-400" />
            <span className="text-stone-400 text-sm">Интерактивная игра</span>
          </div>
          <h2 className="text-stone-100 mb-4">
            Получите скидку 50%!
          </h2>
          <p className="text-stone-400">
            Сыграйте правильный ритм и получите промокод на скидку первого урока
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-stone-900/60 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-stone-800/20">
            {/* Instructions */}
            {!gameStarted && !isWinner && (
              <div className="mb-8 p-6 bg-gradient-to-r from-stone-800/20 to-stone-900/20 border-2 border-stone-700/30 rounded-2xl">
                <div className="flex items-start gap-3">
                  <Volume2 className="w-6 h-6 text-stone-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-stone-100 mb-2">Задание:</h3>
                    <p className="text-stone-300 mb-3">
                      Сыграйте ритм: <span className="font-semibold text-stone-400">Kick → Kick → Snare → Kick → Kick → Snare</span>
                    </p>
                    <p className="text-stone-400 text-sm">
                      Кликайте на барабаны или используйте клавиши (Space для Kick, A для Snare)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-stone-400 text-sm">Ваш ритм:</span>
              </div>
              <div className="flex justify-center gap-2 flex-wrap">
                {targetPattern.map((_, index) => (
                  <div
                    key={index}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-md border-2 ${
                      userPattern[index]
                        ? userPattern[index] === targetPattern[index]
                          ? 'bg-gradient-to-br from-green-600 to-emerald-700 border-green-500/50 shadow-green-900/50'
                          : 'bg-gradient-to-br from-red-600 to-rose-700 border-red-500/50 shadow-red-900/50'
                        : 'bg-stone-800/60 border-stone-800/30'
                    }`}
                  >
                    {userPattern[index] && (
                      <span className="text-white font-bold text-sm">
                        {index + 1}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Full Drum Set with circular hit zones */}
            <div className="relative mb-8">
              <div className="relative rounded-2xl overflow-hidden border-2 border-stone-800/30">
                <ImageWithFallback
                  src={drumSetImage}
                  alt="Drum Kit"
                  className="w-full h-auto"
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
                <div className="inline-block px-8 py-4 bg-gradient-to-r from-stone-800/30 to-stone-900/30 rounded-xl mb-8 border-2 border-stone-700/50">
                  <p className="text-stone-400 text-sm mb-1">Ваш промокод:</p>
                  <p className="text-stone-100 font-bold text-3xl text-stone-400">RHYTHM50</p>
                </div>
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