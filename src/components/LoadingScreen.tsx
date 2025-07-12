import React, { useEffect, useState } from 'react';
import { Sparkles, Zap, Activity, Code } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState('Initializing EIP Explorer...');

  const loadingTexts = [
    'Initializing EIP Explorer...',
    'Connecting to Ethereum network...',
    'Loading EIP database...',
    'Syncing live data...',
    'Preparing AI assistant...',
    'Almost ready...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 5;
        
        // Update text based on progress
        const textIndex = Math.floor((newProgress / 100) * loadingTexts.length);
        if (textIndex < loadingTexts.length) {
          setCurrentText(loadingTexts[textIndex]);
        }
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLoadingComplete();
          }, 1000);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  // Generate matrix rain characters
  const matrixChars = Array.from({ length: 50 }, (_, i) => (
    <div
      key={i}
      className="matrix-char animate-matrix-rain"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 4}s`,
        animationDuration: `${4 + Math.random() * 2}s`
      }}
    >
      {String.fromCharCode(0x30A0 + Math.random() * 96)}
    </div>
  ));

  return (
    <div className="loading-screen">
      {/* Matrix Background */}
      <div className="matrix-bg">
        {matrixChars}
      </div>

      {/* Circuit Background */}
      <svg className="circuit-svg" viewBox="0 0 1200 800">
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        
        {/* Circuit paths */}
        <path
          d="M100,100 L300,100 L300,200 L500,200 L500,300 L700,300"
          className="circuit-path"
          stroke="url(#circuitGradient)"
          style={{ animationDelay: '0s' }}
        />
        <path
          d="M200,400 L400,400 L400,500 L600,500 L600,600 L800,600"
          className="circuit-path"
          stroke="url(#circuitGradient)"
          style={{ animationDelay: '1s' }}
        />
        <path
          d="M50,250 L250,250 L250,350 L450,350 L450,450 L650,450"
          className="circuit-path"
          stroke="url(#circuitGradient)"
          style={{ animationDelay: '2s' }}
        />
        
        {/* Circuit nodes */}
        <circle cx="300" cy="100" r="4" fill="#3b82f6" className="animate-pulse" />
        <circle cx="500" cy="200" r="4" fill="#8b5cf6" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
        <circle cx="700" cy="300" r="4" fill="#06b6d4" className="animate-pulse" style={{ animationDelay: '1s' }} />
        <circle cx="400" cy="400" r="4" fill="#10b981" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
        <circle cx="600" cy="500" r="4" fill="#f59e0b" className="animate-pulse" style={{ animationDelay: '2s' }} />
      </svg>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 animate-float">
          <Sparkles className="h-8 w-8 text-blue-400 opacity-60" />
        </div>
        <div className="absolute top-40 right-32 animate-float" style={{ animationDelay: '1s' }}>
          <Zap className="h-6 w-6 text-purple-400 opacity-70" />
        </div>
        <div className="absolute bottom-40 left-32 animate-float" style={{ animationDelay: '2s' }}>
          <Activity className="h-7 w-7 text-cyan-400 opacity-65" />
        </div>
        <div className="absolute bottom-20 right-20 animate-float" style={{ animationDelay: '3s' }}>
          <Code className="h-8 w-8 text-green-400 opacity-60" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Logo with Glow Effect */}
        <div className="mb-12">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
            <img 
              src="/logo_eip_explorer.png" 
              alt="EIP Explorer Logo" 
              className="relative z-10 h-32 w-32 md:h-40 md:w-40 object-contain animate-logo-glow"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-8 animate-neon-glow">
          <span className="gradient-text-animated">EIP Explorer</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-slate-300 mb-12 animate-fade-in-scale">
          Ethereum Standards Hub
        </p>

        {/* Progress Bar */}
        <div className="w-80 mx-auto mb-8">
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>Loading...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-slate-400 text-lg animate-pulse">
          {currentText}
        </p>

        {/* Pulse Rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-96 h-96 border border-blue-500/20 rounded-full animate-loading-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-purple-500/20 rounded-full animate-loading-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-cyan-500/20 rounded-full animate-loading-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-slate-500 text-sm">
          Powered by <span className="text-blue-400 font-semibold">Ethereum Research Papers</span>
        </p>
      </div>
    </div>
  );
}