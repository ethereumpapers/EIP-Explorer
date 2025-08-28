import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Book, Users, ArrowRight, Activity } from 'lucide-react';
import EIPCard from '../components/EIPCard';

import ErrorMessage from '../components/ErrorMessage';
import { useEIPs } from '../hooks/useEIPs';
import { useLiveData } from '../hooks/useLiveData';
import { useProjects } from '../hooks/useProjects';

export default function HomePage() {
  const { eips, loading: eipsLoading, error: eipsError, stats } = useEIPs();
  const { metrics, loading: metricsLoading, error: metricsError } = useLiveData();
  const { stats: projectStats } = useProjects();
  const [typedText, setTypedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const words = ['EIP Explorer', 'Standards Hub', 'Research Center', 'Innovation Lab'];
  const featuredEIPs = eips.filter(eip => [7702, 4844, 7212, 7579, 1559, 721].includes(eip.number)).slice(0, 6);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let charIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (charIndex <= currentWord.length) {
        setTypedText(currentWord.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 2000);
      }
    }, 150);

    return () => clearInterval(typeInterval);
  }, [currentWordIndex]);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <div className="relative bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            {/* Logo */}
            <div className="mb-8">
              <img 
                src="/logo_eip_explorer.png" 
                alt="EIP Explorer Logo" 
                className="mx-auto h-20 w-20 object-contain mb-6"
              />
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="gradient-text">EIP Explorer</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Discover and explore Ethereum Improvement Proposals with live data, project tracking, and comprehensive analytics.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <Link
                to="/eips"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                <Book className="h-5 w-5" />
                <span>Explore EIPs</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              
              <Link
                to="/analytics"
                className="inline-flex items-center gap-2 border border-slate-600 hover:border-slate-500 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                <TrendingUp className="h-5 w-5" />
                <span>View Analytics</span>
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl p-6 border border-slate-700/50 hover:border-accent-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-500/10">
                <div className="text-4xl font-bold bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent mb-2 tracking-tight">
                  {stats.total || '---'}
                </div>
                <div className="text-slate-300 text-sm font-medium">Total EIPs</div>
              </div>
              
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl p-6 border border-slate-700/50 hover:border-green-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/10">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-2 tracking-tight">
                  {stats.byStatus?.['Final'] || '---'}
                </div>
                <div className="text-slate-300 text-sm font-medium">Final Standards</div>
              </div>
              
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-2 tracking-tight">
                  {projectStats.total || '---'}
                </div>
                <div className="text-slate-300 text-sm font-medium">Active Projects</div>
              </div>
              
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl p-6 border border-slate-700/50 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/10">
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-2 tracking-tight">
                  {stats.recentlyUpdated || '---'}
                </div>
                <div className="text-slate-300 text-sm font-medium">Recent Updates</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Featured EIPs */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Featured EIPs
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Most impactful and widely adopted standards including Pectra upgrade features
            </p>
          </div>
          
          {eipsLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                  <div className="h-4 bg-slate-700 rounded mb-3"></div>
                  <div className="h-6 bg-slate-700 rounded mb-2"></div>
                  <div className="h-4 bg-slate-700 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : eipsError ? (
            <ErrorMessage message="Failed to load featured EIPs" />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredEIPs.map((eip) => (
                <EIPCard key={eip.number} eip={eip} />
              ))}
            </div>
          )}
        </div>

        {/* Live Data */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Live Adoption Metrics
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Real-time data showing EIP implementation and usage across the ecosystem
            </p>
          </div>
          
          {metricsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map(i => (
                <div key={i} className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                  <div className="h-32 bg-slate-700 rounded"></div>
                </div>
              ))}
            </div>
          ) : metricsError ? (
            <ErrorMessage message="Failed to load live metrics" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {metrics.slice(0, 4).map((data) => {
                const eip = eips.find(e => e.number === data.eipNumber);
                return (
                  <div key={data.eipNumber} className="bg-slate-800 rounded-lg border border-slate-700 p-6 hover-lift">
                    <div className="flex items-center justify-between mb-4">
                      <Link
                        to={`/eip/${data.eipNumber}`}
                        className="text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        EIP-{data.eipNumber}
                      </Link>
                      <div className="flex items-center gap-2 text-green-400">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <Activity className="h-4 w-4" />
                        <span className="text-xs font-medium">Live</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-4">{eip?.title}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-400">
                          {data.adoptionRate}%
                        </div>
                        <div className="text-slate-400 text-sm">Adoption</div>
                      </div>
                      <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">
                          {data.activeProjects.toLocaleString()}
                        </div>
                        <div className="text-slate-400 text-sm">Projects</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <Link
            to="/eips?status=Draft"
            className="group bg-slate-800 rounded-lg border border-slate-700 p-6 hover-lift"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Book className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Draft EIPs</h3>
            </div>
            <p className="text-slate-400 mb-4">Explore proposed standards currently under development including Pectra upgrade features</p>
            <div className="flex items-center text-blue-400 font-medium">
              <span>View Drafts</span>
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/projects"
            className="group bg-slate-800 rounded-lg border border-slate-700 p-6 hover-lift"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-600 p-3 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Implementation Projects</h3>
            </div>
            <p className="text-slate-400 mb-4">Discover projects actively implementing EIP standards across DeFi, NFTs, and infrastructure</p>
            <div className="flex items-center text-green-400 font-medium">
              <span>Browse Projects</span>
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/analytics"
            className="group bg-slate-800 rounded-lg border border-slate-700 p-6 hover-lift"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-600 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Analytics Dashboard</h3>
            </div>
            <p className="text-slate-400 mb-4">View comprehensive metrics, adoption trends, and ecosystem impact analysis</p>
            <div className="flex items-center text-purple-400 font-medium">
              <span>View Analytics</span>
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>



        {/* Powered by Section */}
        <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img 
              src="/ERP Pic .png" 
              alt="Ethereum Research Papers Logo" 
              className="h-12 w-12 object-contain"
            />
            <div className="text-left">
              <h3 className="text-xl font-bold text-white">
                Powered by
              </h3>
              <p className="text-lg text-blue-400 font-medium">
                Ethereum Research Papers
              </p>
            </div>
          </div>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Advancing Ethereum research through comprehensive documentation, analysis, and community collaboration.
          </p>
        </div>
      </div>
    </div>
  );
}