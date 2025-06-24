import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorMessage({ message, onRetry, className = '' }: ErrorMessageProps) {
  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-6 ${className}`}>
      <div className="flex items-center space-x-3">
        <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <p className="text-sm text-red-700 mt-1">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center space-x-1 px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Retry</span>
          </button>
        )}
      </div>
    </div>
  );
}