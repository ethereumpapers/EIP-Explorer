import React, { useEffect, useRef } from 'react';

interface ResearchAnimationsProps {
  className?: string;
}

export default function ResearchAnimations({ className = '' }: ResearchAnimationsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      color: ['#3b82f6', '#1d4ed8', '#1e40af'][Math.floor(Math.random() * 3)]
    });

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 30; i++) {
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
        particle.opacity += (Math.random() - 0.5) * 0.01;
        particle.opacity = Math.max(0.1, Math.min(0.5, particle.opacity));
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

          if (distance < 80) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.05 * (1 - distance / 80)})`;
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
        className="w-full h-full opacity-20"
        style={{ background: 'transparent' }}
      />
      
      {/* Research-themed floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating research symbols */}
        <div className="absolute top-1/4 left-1/6 w-16 h-16 opacity-20 animate-float">
          <svg viewBox="0 0 100 100" className="w-full h-full text-blue-400">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" className="animate-pulse" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '1s' }} />
            <circle cx="50" cy="50" r="10" fill="currentColor" className="animate-pulse" style={{ animationDelay: '2s' }} />
          </svg>
        </div>

        <div className="absolute top-3/4 right-1/6 w-12 h-12 opacity-20 animate-float" style={{ animationDelay: '3s' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full text-blue-400">
            <path d="M20,20 L80,20 L80,80 L20,80 Z M30,30 L70,30 L70,70 L30,70 Z" fill="none" stroke="currentColor" strokeWidth="1" className="animate-pulse" />
            <circle cx="30" cy="30" r="3" fill="currentColor" />
            <circle cx="70" cy="30" r="3" fill="currentColor" />
            <circle cx="30" cy="70" r="3" fill="currentColor" />
            <circle cx="70" cy="70" r="3" fill="currentColor" />
          </svg>
        </div>

        <div className="absolute top-1/2 left-1/3 w-20 h-20 opacity-20 animate-float" style={{ animationDelay: '4s' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full text-blue-400">
            <path d="M10,50 L90,50 M50,10 L50,90 M25,25 L75,75 M75,25 L25,75" stroke="currentColor" strokeWidth="1" className="animate-pulse" />
            <circle cx="50" cy="50" r="5" fill="currentColor" />
          </svg>
        </div>

        {/* Floating data points */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}

        {/* Research grid lines */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-pulse"></div>
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-pulse" style={{ animationDelay: '3s' }}></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-pulse" style={{ animationDelay: '4s' }}></div>
          
          <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-pulse"></div>
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-pulse" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Floating research text */}
        <div className="absolute top-1/6 right-1/4 opacity-5">
          <div className="text-blue-400 text-xs font-mono animate-pulse" style={{ animationDelay: '2s' }}>
            EIP-4337
          </div>
        </div>
        <div className="absolute top-2/3 left-1/4 opacity-5">
          <div className="text-blue-400 text-xs font-mono animate-pulse" style={{ animationDelay: '4s' }}>
            ERC-721
          </div>
        </div>
        <div className="absolute bottom-1/4 right-1/3 opacity-5">
          <div className="text-blue-400 text-xs font-mono animate-pulse" style={{ animationDelay: '6s' }}>
            EIP-4844
          </div>
        </div>
      </div>
    </div>
  );
}
