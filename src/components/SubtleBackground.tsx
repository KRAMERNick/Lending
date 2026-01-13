export function SubtleBackground({ variant = 1 }: { variant?: number }) {
  // Определяем очень тонкие вариации фона для разных секций
  const backgrounds = [
    'from-stone-950 via-stone-900 to-stone-950', // variant 1
    'from-stone-900 via-stone-950 to-stone-900', // variant 2
    'from-stone-950 via-stone-900 to-stone-900', // variant 3
    'from-stone-900 via-stone-950 to-stone-950', // variant 4
    'from-stone-950 via-stone-950 to-stone-900', // variant 5
    'from-stone-900 via-stone-900 to-stone-950', // variant 6
  ];

  const bgIndex = (variant - 1) % backgrounds.length;

  return (
    <>
      {/* Base gradient - статичный, без анимации */}
      <div className={`absolute inset-0 bg-gradient-to-br ${backgrounds[bgIndex]}`}></div>
      
      {/* Очень тонкий статичный оверлей для плавности */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(87, 83, 78, 0.05) 0%, transparent 50%)`
        }}
      ></div>
    </>
  );
}