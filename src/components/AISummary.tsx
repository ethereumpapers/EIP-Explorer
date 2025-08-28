import React, { useState } from 'react';
import { Sparkles, Copy, Check, RefreshCw } from 'lucide-react';
import { claudeService } from '../services/claudeService';

interface EIP {
  number: number;
  title: string;
  status: string;
  category: string;
  description: string;
  authors: string[];
  created: string;
  type: string;
}

interface AISummaryProps {
  eip: EIP;
}

export default function AISummary({ eip }: AISummaryProps) {
  const [summary, setSummary] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateSummary = async () => {
    setIsGenerating(true);
    try {
      const response = await claudeService.generateEIPSummary(eip);
      setSummary(response);
    } catch (error) {
      setSummary('Unable to generate summary at this time. Please try again later.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AI Summary</h3>
            <p className="text-sm text-gray-600">Intelligent analysis of EIP-{eip.number}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {summary && (
            <button
              onClick={copyToClipboard}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Copy summary"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </button>
          )}
          <button
            onClick={generateSummary}
            disabled={isGenerating}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Generate Summary</span>
              </>
            )}
          </button>
        </div>
      </div>

      {summary ? (
        <div className="prose prose-sm max-w-none">
          <div 
            className="text-gray-700 leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ 
              __html: summary
                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                .replace(/\*(.*?)\*/g, '<em class="italic text-gray-600">$1</em>')
                .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800">$1</code>')
                .replace(/^# (.*$)/gm, '<h1 class="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">$1</h1>')
                .replace(/^## (.*$)/gm, '<h2 class="text-lg font-semibold text-gray-800 mb-2 mt-4">$1</h2>')
                .replace(/^### (.*$)/gm, '<h3 class="text-md font-medium text-gray-700 mb-2 mt-3">$1</h3>')
                .replace(/^- (.*$)/gm, '<li class="ml-4 mb-1">• $1</li>')
                .replace(/^✅ (.*$)/gm, '<div class="flex items-start space-x-2 mb-2"><span class="text-green-600 mt-0.5">✅</span><span>$1</span></div>')
                .replace(/^❌ (.*$)/gm, '<div class="flex items-start space-x-2 mb-2"><span class="text-red-600 mt-0.5">❌</span><span>$1</span></div>')
                .replace(/^⚠️ (.*$)/gm, '<div class="flex items-start space-x-2 mb-2"><span class="text-yellow-600 mt-0.5">⚠️</span><span>$1</span></div>')
                .replace(/^🔍 (.*$)/gm, '<div class="flex items-start space-x-2 mb-2"><span class="text-blue-600 mt-0.5">🔍</span><span>$1</span></div>')
                .split('\n')
                .map((line, index) => line || '<br>')
                .join('')
            }}
          />
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Get AI-Powered Insights</h4>
          <p className="text-gray-600 mb-4">
            Generate a comprehensive, easy-to-understand summary of this EIP with technical analysis, use cases, and implementation guidance.
          </p>
          <button
            onClick={generateSummary}
            disabled={isGenerating}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-5 w-5 animate-spin" />
                <span>Generating Summary...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                <span>Generate AI Summary</span>
              </>
            )}
          </button>
        </div>
      )}

      {summary && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-3 w-3" />
              <span>Generated by AI</span>
            </div>
            <button
              onClick={generateSummary}
              className="text-slate-600 hover:text-slate-700 font-medium transition-colors"
            >
              Regenerate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
