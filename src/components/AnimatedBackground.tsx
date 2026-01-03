import { useEffect, useRef, useState } from 'react';

interface FloatingElement {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  type: 'circle' | 'square' | 'line';
  opacity: number;
}

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [elements] = useState<FloatingElement[]>(() => {
    const items: FloatingElement[] = [];
    const types: Array<'circle' | 'square' | 'line'> = ['circle', 'square', 'line'];
    
    // Много маленьких еле заметных элементов
    for (let i = 0; i < 40; i++) {
      items.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10, // Маленькие 10-30px
        speedX: (Math.random() - 0.5) * 0.08, // Медленнее
        speedY: (Math.random() - 0.5) * 0.08,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.15, // Совсем медленно
        type: types[Math.floor(Math.random() * types.length)],
        opacity: Math.random() * 0.04 + 0.01, // Очень прозрачные 0.01-0.05
      });
    }
    return items;
  });

  const animationRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      elements.forEach(el => {
        el.x += el.speedX;
        el.y += el.speedY;
        el.rotation += el.rotationSpeed;

        // Wrap around screen
        if (el.x < -5) el.x = 105;
        if (el.x > 105) el.x = -5;
        if (el.y < -5) el.y = 105;
        if (el.y > 105) el.y = -5;
      });

      if (containerRef.current) {
        containerRef.current.querySelectorAll('.floating-element').forEach((elem, i) => {
          const el = elements[i];
          const htmlElem = elem as HTMLElement;
          htmlElem.style.left = `${el.x}%`;
          htmlElem.style.top = `${el.y}%`;
          htmlElem.style.transform = `rotate(${el.rotation}deg)`;
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [elements]);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Маленькие еле заметные элементы */}
      {elements.map((el, i) => (
        <div
          key={i}
          className="floating-element absolute transition-all duration-300 ease-out"
          style={{
            opacity: el.opacity,
          }}
        >
          {el.type === 'circle' && (
            <svg width={el.size} height={el.size} viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="45" stroke="#78716c" strokeWidth="3" fill="none" />
            </svg>
          )}

          {el.type === 'square' && (
            <svg width={el.size} height={el.size} viewBox="0 0 100 100" fill="none">
              <rect x="10" y="10" width="80" height="80" stroke="#78716c" strokeWidth="3" fill="none" />
            </svg>
          )}

          {el.type === 'line' && (
            <svg width={el.size * 2} height={el.size / 3} viewBox="0 0 100 30" fill="none">
              <line x1="0" y1="15" x2="100" y2="15" stroke="#78716c" strokeWidth="2" />
            </svg>
          )}
        </div>
      ))}

      {/* Пульсирующие круги - еле заметные */}
      <div className="absolute top-1/4 left-1/4 animate-float">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-stone-700/8"
            style={{
              width: `${120 + i * 70}px`,
              height: `${120 + i * 70}px`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animation: `pulse-wave ${3 + i * 0.5}s ease-out infinite`,
              animationDelay: `${i * 0.25}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute top-2/3 right-1/4 animate-float-slow" style={{ animationDelay: '2s' }}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-stone-600/6"
            style={{
              width: `${100 + i * 60}px`,
              height: `${100 + i * 60}px`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animation: `pulse-wave ${4 + i * 0.6}s ease-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Диагональные линии - еле заметные */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div 
          className="absolute w-[200%] h-px bg-gradient-to-r from-transparent via-stone-700/30 to-transparent"
          style={{
            top: '20%',
            left: '-50%',
            animation: 'slide-right 20s linear infinite'
          }}
        ></div>
        <div 
          className="absolute w-[200%] h-px bg-gradient-to-r from-transparent via-stone-600/30 to-transparent"
          style={{
            top: '60%',
            left: '-50%',
            animation: 'slide-left 25s linear infinite'
          }}
        ></div>
      </div>

      {/* Светящиеся орбы - еле заметные */}
      <div 
        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-stone-600/8 to-transparent blur-3xl"
        style={{
          animation: 'pulse-glow 8s ease-in-out infinite, float 10s ease-in-out infinite'
        }}
      />
      <div 
        className="absolute bottom-1/4 left-1/3 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-stone-700/6 to-transparent blur-3xl"
        style={{
          animation: 'pulse-glow 9s ease-in-out infinite 2s, float-slow 12s ease-in-out infinite'
        }}
      />
    </div>
  );
}
