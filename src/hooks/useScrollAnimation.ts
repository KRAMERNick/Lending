import { useEffect, useRef } from 'react';

export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      },
      { threshold, rootMargin: '50px' }
    );

    // Initial state
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
