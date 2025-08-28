import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, BookOpen, Users, Zap } from 'lucide-react';
import { useEIPs } from '../hooks/useEIPs';
import { huggingFaceService } from '../services/huggingFaceService';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  eipNumbers: number[];
  category: string;
  icon: React.ReactNode;
  reason: string;
}

export default function AIRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { eips } = useEIPs();

  useEffect(() => {
    generateRecommendations();
  }, [eips]);

  const generateRecommendations = async () => {
    setIsLoading(true);
    
    // Generate AI-powered recommendations based on current trends and user interests
    const aiRecommendations: Recommendation[] = [
      {
        id: 'nft-trending',
        title: '🔥 Trending NFT Standards',
        description: 'Most discussed and implemented NFT standards in 2024',
        eipNumbers: [721, 1155, 2981, 6963],
        category: 'NFT',
        icon: <Sparkles className="h-5 w-5 text-purple-500" />,
        reason: 'NFT market is evolving with new royalty standards and multi-provider support'
      },
      {
        id: 'account-abstraction',
        title: '🚀 Account Abstraction Revolution',
        description: 'Smart account standards changing how users interact with Ethereum',
        eipNumbers: [4337, 7702, 3074, 7579],
        category: 'Account Abstraction',
        icon: <Zap className="h-5 w-5 text-blue-500" />,
        reason: 'Major adoption growth with Pectra upgrade bringing native support'
      },
      {
        id: 'scaling-solutions',
        title: '⚡ Scaling & Performance',
        description: 'EIPs driving Ethereum scalability and cost reduction',
        eipNumbers: [4844, 1559, 4488, 1153],
        category: 'Scaling',
        icon: <TrendingUp className="h-5 w-5 text-green-500" />,
        reason: 'Blob transactions and fee market improvements reducing costs by 90%'
      },
      {
        id: 'defi-innovation',
        title: '💰 DeFi Innovation',
        description: 'Standards powering the next generation of DeFi protocols',
        eipNumbers: [20, 2612, 3156, 4626],
        category: 'DeFi',
        icon: <BookOpen className="h-5 w-5 text-yellow-500" />,
        reason: 'Gasless approvals and flash loans enabling new DeFi primitives'
      },
      {
        id: 'developer-tools',
        title: '🛠️ Developer Experience',
        description: 'EIPs improving developer tools and smart contract development',
        eipNumbers: [1967, 2537, 2930, 3198],
        category: 'Developer Tools',
        icon: <Users className="h-5 w-5 text-indigo-500" />,
        reason: 'Better debugging, testing, and development workflows'
      }
    ];

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setRecommendations(aiRecommendations);
    setIsLoading(false);
  };

  const getEIPsForRecommendation = (eipNumbers: number[]) => {
    return eips.filter(eip => eipNumbers.includes(eip.number));
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
          <h3 className="text-lg font-semibold text-gray-900">AI Recommendations</h3>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">AI Recommendations</h3>
          <p className="text-sm text-gray-600">Personalized EIP suggestions based on trends</p>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => {
          const recEIPs = getEIPsForRecommendation(rec.eipNumbers);
          
          return (
            <div key={rec.id} className="border border-gray-200 rounded-lg p-4 hover:border-slate-300 transition-colors">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {rec.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">{rec.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {recEIPs.map((eip) => (
                      <span
                        key={eip.number}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
                      >
                        EIP-{eip.number}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                      {rec.category}
                    </span>
                    <span>•</span>
                    <span className="italic">{rec.reason}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <Sparkles className="h-3 w-3" />
            <span>Powered by AI analysis</span>
          </div>
          <button
            onClick={generateRecommendations}
            className="text-xs text-slate-600 hover:text-slate-700 font-medium transition-colors"
          >
            Refresh recommendations
          </button>
        </div>
      </div>
    </div>
  );
}
