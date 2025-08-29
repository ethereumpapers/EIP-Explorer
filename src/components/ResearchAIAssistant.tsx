import React, { useState, useRef, useEffect } from 'react';
import { Brain, Send, X, Minimize2, Maximize2, Sparkles, BookOpen, Search, TrendingUp, Users, Zap, MessageCircle } from 'lucide-react';
import { useEIPs } from '../hooks/useEIPs';
import { claudeService, testClaudeService } from '../services/claudeService';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface ResearchAIAssistantProps {
  currentEIP?: number;
}

export default function ResearchAIAssistant({ currentEIP }: ResearchAIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { eips } = useEIPs();

  const quickSuggestions = [
    "What's your name?",
    "How are you today?",
    "Explain EIP-4337 in simple terms",
    "What are the most important EIPs?",
    "How do smart contracts work?",
    "What's new in Ethereum?",
    "Tell me about account abstraction",
    "What's the difference between EIP-1559 and EIP-4844?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setShowSuggestions(true);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = async () => {
    console.log('🚀 handleSendMessage called with:', inputValue);
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setShowSuggestions(false);

    try {
      console.log('🤖 Calling Claude service with message:', userMessage.content);
      
      const requestBody = {
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1000,
        messages: [{ role: 'user', content: userMessage.content }]
      };
      
      console.log('📤 Request body:', requestBody);
      console.log('📤 Request URL:', '/api/anthropic/v1/messages');
      
      // Simple direct API call for testing
      const response = await fetch('/api/anthropic/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ HTTP error response body:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const responseData = await response.json();
      console.log('📡 Full response data:', responseData);
      console.log('📡 Response data type:', typeof responseData);
      console.log('📡 Response data keys:', Object.keys(responseData));
      
      if (!responseData.content || !responseData.content[0]) {
        console.error('❌ Invalid response format - missing content:', responseData);
        throw new Error('Invalid response format: missing content');
      }
      
      console.log('📡 Content array:', responseData.content);
      console.log('📡 First content item:', responseData.content[0]);
      
      const aiResponse = responseData.content[0].text;
      console.log('✅ Claude response received:', aiResponse.substring(0, 100) + '...');
      
      // Add a typing effect
      setIsLoading(false);
      setIsTyping(true);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: '',
        timestamp: new Date(),
        isTyping: true
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Simulate typing effect
      let currentText = '';
      const words = aiResponse.split(' ');
      
      for (let i = 0; i < words.length; i++) {
        currentText += (i > 0 ? ' ' : '') + words[i];
        
        setMessages(prev => prev.map(msg => 
          msg.id === assistantMessage.id 
            ? { ...msg, content: currentText }
            : msg
        ));
        
        // Random typing speed between 50-150ms per word
        await new Promise(resolve => setTimeout(resolve, Math.random() * 100 + 50));
      }
      
      // Mark as finished typing
      setMessages(prev => prev.map(msg => 
        msg.id === assistantMessage.id 
          ? { ...msg, isTyping: false }
          : msg
      ));
      
      setIsTyping(false);
    } catch (error) {
      console.error('❌ Error in handleSendMessage:', error);
      console.error('❌ Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      console.error('❌ Full error object:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I'm experiencing some technical difficulties. Please try again in a moment. In the meantime, you can browse the EIP documentation or ask me something else.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-300">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-slate-300">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-blue-900/50 text-blue-300 px-1 py-0.5 rounded text-sm border border-blue-700/50">$1</code>')
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-blue-400 mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-blue-300 mt-6 mb-3">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-blue-200 mt-8 mb-4">$1</h1>')
      .replace(/^- (.*$)/gim, '<li class="ml-4 text-slate-300">• $1</li>')
      .replace(/\n\n/g, '</p><p class="mb-3 text-slate-200">')
      .replace(/\n/g, '<br>');
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-blue-500/25"
        >
          <Brain className="h-6 w-6" />
          
          {/* Animated pulse ring */}
          <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Research AI Assistant
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600/20 to-blue-700/20 border-b border-slate-700/50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Brain className="h-6 w-6 text-blue-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-white font-semibold">Research AI</h3>
                <p className="text-slate-400 text-xs">EIP Analysis & Insights</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={async () => {
                  console.log('🧪 Testing Claude service directly...');
                  try {
                    const response = await fetch('/api/anthropic/v1/messages', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        model: 'claude-3-5-sonnet-20241022',
                        max_tokens: 100,
                        messages: [{ role: 'user', content: 'Hello test' }]
                      })
                    });
                    console.log('🧪 Direct fetch response status:', response.status);
                    console.log('🧪 Direct fetch response ok:', response.ok);
                    
                    if (!response.ok) {
                      const errorText = await response.text();
                      console.error('🧪 HTTP error:', errorText);
                      return;
                    }
                    
                    const data = await response.json();
                    console.log('🧪 Direct fetch response data:', data);
                    
                    if (data.content && data.content[0]) {
                      console.log('🧪 AI response text:', data.content[0].text);
                    } else {
                      console.error('🧪 Invalid response format:', data);
                    }
                  } catch (error) {
                    console.error('🧪 Direct fetch error:', error);
                  }
                }}
                className="p-1.5 hover:bg-slate-700/50 rounded-lg transition-colors text-xs"
                title="Test Claude Service"
              >
                🧪
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4 text-slate-400" /> : <Minimize2 className="h-4 w-4 text-slate-400" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                <X className="h-4 w-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[400px]">
              {messages.length === 0 && showSuggestions && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-2">
                    {quickSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-left p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-lg transition-all duration-200 hover:border-blue-500/50 group"
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:bg-blue-300 transition-colors"></div>
                          <span className="text-slate-300 text-sm group-hover:text-white transition-colors">{suggestion}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                        : 'bg-slate-800/50 text-slate-200 border border-slate-700/50'
                    }`}
                  >
                    <div
                      className="prose prose-invert prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                    />
                    {message.isTyping && (
                      <span className="inline-block w-2 h-4 bg-blue-400 ml-1 animate-pulse"></span>
                    )}
                    <div className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-slate-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-2xl max-w-[80%]">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Brain className="h-5 w-5 text-blue-400 animate-pulse" />
                        <div className="absolute -inset-1 bg-blue-400/20 rounded-full animate-ping"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-blue-400 text-sm font-medium">AI is thinking...</span>
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                        <div className="mt-2 text-xs text-slate-500">
                          Processing your message and generating response...
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-700/50">
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Chat with me about anything - EIPs, blockchain, or just say hi!"
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                    disabled={isLoading}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-600 text-white p-3 rounded-xl transition-all duration-200 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
