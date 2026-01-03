import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  type: 'drumstick' | 'note' | 'wave' | 'cymbal';
  rotation: number;
  rotationSpeed: number;
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Mouse tracking for parallax
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const types: Array<'drumstick' | 'note' | 'wave' | 'cymbal'> = ['drumstick', 'note', 'wave', 'cymbal'];
      
      for (let i = 0; i < 25; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 30 + 20,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.15 + 0.05,
          type: types[Math.floor(Math.random() * types.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
        });
      }
    };
    initParticles();

    // Draw drumstick
    const drawDrumstick = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      
      // Stick
      ctx.fillStyle = '#78716c';
      ctx.fillRect(-size * 0.4, -size * 0.05, size * 0.8, size * 0.1);
      
      // Tip
      ctx.beginPath();
      ctx.arc(size * 0.4, 0, size * 0.15, 0, Math.PI * 2);
      ctx.fillStyle = '#a8a29e';
      ctx.fill();
      
      ctx.restore();
    };

    // Draw musical note
    const drawNote = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = '#78716c';
      
      // Note head
      ctx.beginPath();
      ctx.ellipse(0, size * 0.3, size * 0.2, size * 0.15, -0.3, 0, Math.PI * 2);
      ctx.fill();
      
      // Stem
      ctx.fillRect(size * 0.15, -size * 0.3, size * 0.05, size * 0.6);
      
      ctx.restore();
    };

    // Draw wave (vibration)
    const drawWave = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = opacity;
      
      ctx.strokeStyle = '#78716c';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      for (let i = 0; i < Math.PI * 2; i += 0.1) {
        const r = size + Math.sin(i * 3 + rotation) * (size * 0.2);
        const px = Math.cos(i) * r;
        const py = Math.sin(i) * r;
        
        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.closePath();
      ctx.stroke();
      
      ctx.restore();
    };

    // Draw cymbal
    const drawCymbal = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      
      // Outer circle
      ctx.strokeStyle = '#78716c';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.stroke();
      
      // Inner circle
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
      ctx.stroke();
      
      // Lines
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 / 6) * i;
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * size * 0.3, Math.sin(angle) * size * 0.3);
        ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
        ctx.stroke();
      }
      
      ctx.restore();
    };

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Update position with parallax
        particle.x += particle.speedX + mouseRef.current.x * 0.5;
        particle.y += particle.speedY + mouseRef.current.y * 0.5;
        particle.rotation += particle.rotationSpeed;

        // Wrap around screen
        if (particle.x < -100) particle.x = canvas.width + 100;
        if (particle.x > canvas.width + 100) particle.x = -100;
        if (particle.y < -100) particle.y = canvas.height + 100;
        if (particle.y > canvas.height + 100) particle.y = -100;

        // Draw particle
        switch (particle.type) {
          case 'drumstick':
            drawDrumstick(ctx, particle.x, particle.y, particle.size, particle.rotation, particle.opacity);
            break;
          case 'note':
            drawNote(ctx, particle.x, particle.y, particle.size, particle.rotation, particle.opacity);
            break;
          case 'wave':
            drawWave(ctx, particle.x, particle.y, particle.size, particle.rotation, particle.opacity);
            break;
          case 'cymbal':
            drawCymbal(ctx, particle.x, particle.y, particle.size, particle.rotation, particle.opacity);
            break;
        }
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
}
