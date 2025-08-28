import React, { useEffect, useState } from 'react';
import React from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState('Loading EIP Explorer...');

  const loadingTexts = [
    'Loading EIP Explorer...',
    'Connecting to network...',
    'Loading EIP database...',
    'Syncing data...',
    'Almost ready...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 20 + 10;
        
        // Update text based on progress
        const textIndex = Math.floor((newProgress / 100) * loadingTexts.length);
        if (textIndex < loadingTexts.length) {
          setCurrentText(loadingTexts[textIndex]);
        }
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLoadingComplete();
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className="loading-screen">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <img 
            src="/logo_eip_explorer.png" 
            alt="EIP Explorer Logo" 
            className="mx-auto h-16 w-16 object-contain mb-4"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-2">
          EIP Explorer
        </h1>

        {/* Subtitle */}
        <p className="text-slate-400 mb-8">
          Ethereum Standards Hub
        </p>

        {/* Progress Bar */}
        <div className="w-64 mx-auto mb-6">
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>Loading...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-slate-400 text-sm">
          {currentText}
        </p>
      </div>

      {/* Bottom Text */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-slate-500 text-xs">
          Powered by <span className="text-blue-400 font-medium">Ethereum Research Papers</span>
        </p>
      </div>
    </div>
  );
}