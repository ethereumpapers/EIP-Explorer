import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Minimize2, Maximize2, Sparkles, BookOpen, Search, TrendingUp, Users } from 'lucide-react';
import { useEIPs } from '../hooks/useEIPs';
import { huggingFaceService } from '../services/huggingFaceService';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface AIAssistantProps {
  currentEIP?: number;
}

export default function AIAssistant({ currentEIP }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { eips } = useEIPs();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        type: 'assistant',
        content: currentEIP 
          ? `👋 Hello! I'm your EIP assistant. I'm here to help you understand **EIP-${currentEIP}** in detail.\n\n🔍 **I can help you with:**\n• Detailed technical explanations\n• Implementation examples and code\n• Real-world use cases and projects\n• Security considerations and best practices\n• Related EIPs and dependencies\n• Current adoption metrics and trends\n\n💡 **Try asking:** "Give me a comprehensive analysis of this EIP" or "What are the security implications?" or "Show me implementation examples"`
          : "👋 Welcome! I'm your EIP research assistant.\n\n🚀 **I'm here to help you:**\n• **Discover EIPs** - Find standards by topic or use case\n• **Deep Analysis** - Get detailed technical breakdowns\n• **Implementation Guidance** - Learn how to use EIPs in projects\n• **Market Insights** - Understand adoption and impact\n• **Security Reviews** - Learn about risks and best practices\n• **Code Examples** - Get practical implementation samples\n\n💬 **Ask me anything like:**\n• \"Find all scaling-related EIPs\"\n• \"Explain gas optimization techniques\"\n• \"What's the difference between EIP-721 and EIP-1155?\"\n• \"Show me the most adopted standards\"\n• \"How do I implement account abstraction?\"",
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, currentEIP]);

  const quickSuggestions = currentEIP ? [
    `Analyze EIP-${currentEIP} in detail`,
    "What are the security considerations?",
    "Show implementation examples",
    "Compare with similar standards"
  ] : [
    "Find NFT-related standards",
    "Explain account abstraction",
    "What's new in Ethereum standards?",
    "Show me DeFi-related EIPs"
  ];

  const handleSendMessage = async () => {
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
      const eipContext = currentEIP ? eips.find(eip => eip.number === currentEIP) : null;
      
      const conversationHistory = messages.map(msg => ({
        role: msg.type === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.content
      }));
      
      conversationHistory.push({
        role: 'user' as const,
        content: userMessage.content
      });

      const response = await huggingFaceService.generateResponse(conversationHistory, eipContext);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I apologize, but I'm experiencing some technical difficulties. Please try again in a moment. In the meantime, you can browse the EIP documentation directly or try a different question.",
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
    return content
      .replace(/^# (.*$)/gm, '<h1 class="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-lg font-semibold text-gray-800 mb-2 mt-4">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-md font-medium text-gray-700 mb-2 mt-3">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800">$1</code>')
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto my-3 text-sm"><code>$2</code></pre>')
      .replace(/^- (.*$)/gm, '<li class="ml-4 mb-1">• $1</li>')
      .replace(/^✅ (.*$)/gm, '<div class="flex items-start space-x-2 mb-2"><span class="text-green-600 mt-0.5">✅</span><span>$1</span></div>')
      .replace(/^❌ (.*$)/gm, '<div class="flex items-start space-x-2 mb-2"><span class="text-red-600 mt-0.5">❌</span><span>$1</span></div>')
      .replace(/^⚠️ (.*$)/gm, '<div class="flex items-start space-x-2 mb-2"><span class="text-yellow-600 mt-0.5">⚠️</span><span>$1</span></div>')
      .replace(/^🔍 (.*$)/gm, '<div class="flex items-start space-x-2 mb-2"><span class="text-blue-600 mt-0.5">🔍</span><span>$1</span></div>')
      .split('\n')
      .map((line, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: line || '<br>' }} />
      ));
  };

  return (
    <>
      {/* Floating AI Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group"
        >
          <div className="relative">
            <Bot className="h-8 w-8" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div className="absolute -top-16 right-0 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-lg">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span>Ask about EIPs</span>
            </div>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </button>
      )}

      {/* AI Chat Interface */}
      {isOpen && (
        <div className={`fixed bottom-8 right-8 z-50 bg-white rounded-2xl shadow-xl border border-gray-200 transition-all duration-300 ${
          isMinimized ? 'w-80 h-16' : 'w-[420px] h-[650px]'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600 text-white rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bot className="h-6 w-6" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="font-semibold text-lg">EIP Research AI</span>
                <div className="flex items-center space-x-1 text-xs text-blue-100">
                  <Sparkles className="h-3 w-3" />
                  <span>AI Assistant</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[500px] bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-4 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-900 border border-gray-200 shadow-sm'
                      }`}
                    >
                      <div className="text-sm leading-relaxed">
                        {message.type === 'assistant' ? formatMessage(message.content) : message.content}
                      </div>
                      <div className={`text-xs mt-2 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Loading Animation */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm text-gray-600">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Suggestions */}
                {showSuggestions && messages.length <= 1 && (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 font-medium">💡 Try these suggestions:</p>
                    <div className="grid grid-cols-1 gap-2">
                      {quickSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-left p-3 bg-white hover:bg-blue-50 rounded-lg text-sm text-gray-700 border border-gray-200 hover:border-blue-300 transition-all duration-200"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about EIPs..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center min-w-[48px]"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                
                {/* Footer */}
                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-3 w-3" />
                      <span>EIP Database</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>Live Data</span>
                    </div>
                  </div>
                </div>
                
                {/* Powered by Section */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <a
                    href="https://www.ethereumpapers.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 text-xs text-gray-600 hover:text-blue-600 transition-colors group"
                    title="Check out ERP articles"
                  >
                    <img 
                      src="/ERP Pic .png" 
                      alt="ERP Logo" 
                      className="h-4 w-4 object-contain group-hover:scale-110 transition-transform"
                    />
                    <span>Powered by</span>
                    <span className="font-semibold text-gray-800 group-hover:underline">Ethereum Research Papers</span>
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}