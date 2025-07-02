import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export default function LoadingSpinner({ size = 'md', text, className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <div className="relative">
        {/* Main spinner */}
        <Loader2 className={`animate-spin text-blue-600 ${sizeClasses[size]}`} />
        
        {/* Outer ring */}
        <div className={`absolute inset-0 ${sizeClasses[size]} border-2 border-purple-200 rounded-full animate-pulse`}></div>
        
        {/* Sparkle effect */}
        <div className="absolute -top-1 -right-1">
          <Sparkles className="h-3 w-3 text-yellow-400 animate-ping" />
        </div>
      </div>
      
      {text && (
        <div className="text-center">
          <p className="text-gray-600 font-medium animate-pulse">{text}</p>
          <div className="flex items-center justify-center space-x-1 mt-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      )}
    </div>
  );
}