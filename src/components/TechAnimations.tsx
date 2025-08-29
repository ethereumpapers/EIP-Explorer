import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

interface TechAnimationsProps {
  className?: string;
}

export default function TechAnimations({ className = '' }: TechAnimationsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      color: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'][Math.floor(Math.random() * 4)]
    });

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 50; i++) {
        particlesRef.current.push(createParticle());
      }
    };

    const updateParticles = () => {
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Fade in/out
        particle.opacity += (Math.random() - 0.5) * 0.02;
        particle.opacity = Math.max(0.1, Math.min(0.6, particle.opacity));
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      // Draw particles
      particlesRef.current.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();

        // Add glow effect
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 50).toString(16).padStart(2, '0')}`;
        ctx.fill();
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-30"
        style={{ background: 'transparent' }}
      />
      
      {/* Floating tech elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Binary code rain */}
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-green-400/20 text-xs font-mono animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>

        {/* Circuit patterns */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-blue-400">
            <path
              d="M10,10 L90,10 L90,90 L10,90 Z M30,30 L70,30 L70,70 L30,70 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="animate-pulse"
            />
            <circle cx="30" cy="30" r="2" fill="currentColor" />
            <circle cx="70" cy="30" r="2" fill="currentColor" />
            <circle cx="30" cy="70" r="2" fill="currentColor" />
            <circle cx="70" cy="70" r="2" fill="currentColor" />
          </svg>
        </div>

        <div className="absolute top-3/4 right-1/4 w-24 h-24 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-purple-400">
            <path
              d="M20,20 L80,20 L80,80 L20,80 Z M40,40 L60,40 L60,60 L40,60 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="animate-pulse"
              style={{ animationDelay: '1s' }}
            />
            <circle cx="40" cy="40" r="1.5" fill="currentColor" />
            <circle cx="60" cy="40" r="1.5" fill="currentColor" />
            <circle cx="40" cy="60" r="1.5" fill="currentColor" />
            <circle cx="60" cy="60" r="1.5" fill="currentColor" />
          </svg>
        </div>

        {/* Data flow lines */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-pulse"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
}
