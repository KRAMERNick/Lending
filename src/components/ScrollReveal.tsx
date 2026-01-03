import { useEffect, useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate';
  delay?: number;
  duration?: number;
  className?: string;
}

export function ScrollReveal({ 
  children, 
  animation = 'fadeIn',
  delay = 0,
  duration = 800,
  className = ''
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            element.classList.add('revealed');
          }, delay);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay]);

  const animationStyles = {
    fadeIn: 'opacity-0 revealed:opacity-100',
    slideUp: 'opacity-0 translate-y-20 revealed:opacity-100 revealed:translate-y-0',
    slideLeft: 'opacity-0 translate-x-20 revealed:opacity-100 revealed:translate-x-0',
    slideRight: 'opacity-0 -translate-x-20 revealed:opacity-100 revealed:translate-x-0',
    scale: 'opacity-0 scale-90 revealed:opacity-100 revealed:scale-100',
    rotate: 'opacity-0 rotate-12 revealed:opacity-100 revealed:rotate-0'
  };

  return (
    <div 
      ref={ref}
      className={`transition-all ${animationStyles[animation]} ${className}`}
      style={{ 
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {children}
    </div>
  );
}
