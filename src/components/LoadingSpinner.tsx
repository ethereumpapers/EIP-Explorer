import React from 'react';
import { Loader2 } from 'lucide-react';

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
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <div className="relative">
        <Loader2 className={`animate-spin text-blue-600 ${sizeClasses[size]}`} />
        <div className={`absolute inset-0 ${sizeClasses[size]} border-2 border-purple-200 rounded-full animate-pulse`}></div>
      </div>
      {text && (
        <div className="text-center">
          <p className="text-gray-600 font-medium">{text}</p>
          <div className="flex items-center justify-center space-x-1 mt-1">
            <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-1 h-1 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      )}
    </div>
  );
}