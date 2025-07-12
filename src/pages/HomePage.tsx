import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Book, Users, ArrowRight, Activity, Sparkles, Zap, Rocket, Code, Globe } from 'lucide-react';
import EIPCard from '../components/EIPCard';
import LoadingSpinner from '../components/LoadingSpinner';
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
    <div className="min-h-screen bg-slate-900 overflow-hidden">
      {/* Advanced Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full opacity-40 animate-morph-blob"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 rounded-full opacity-35 animate-morph-blob" style={{ animationDelay: '5s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full opacity-25 animate-morph-blob" style={{ animationDelay: '10s' }}></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`particle particle-${(i % 5) + 1}`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${12 + Math.random() * 8}s`
              }}
            />
          ))}
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 left-1/4 animate-sparkle-trail">
            <Sparkles className="h-8 w-8 text-blue-400 opacity-60" />
          </div>
          <div className="absolute top-60 right-1/3 animate-sparkle-trail" style={{ animationDelay: '2s' }}>
            <Zap className="h-6 w-6 text-purple-400 opacity-70" />
          </div>
          <div className="absolute bottom-60 left-1/3 animate-sparkle-trail" style={{ animationDelay: '4s' }}>
            <Activity className="h-7 w-7 text-cyan-400 opacity-65" />
          </div>
          <div className="absolute top-40 right-1/4 animate-sparkle-trail" style={{ animationDelay: '6s' }}>
            <Rocket className="h-8 w-8 text-green-400 opacity-60" />
          </div>
          <div className="absolute bottom-40 right-1/2 animate-sparkle-trail" style={{ animationDelay: '8s' }}>
            <Code className="h-6 w-6 text-orange-400 opacity-70" />
          </div>
          <div className="absolute top-1/2 left-20 animate-sparkle-trail" style={{ animationDelay: '10s' }}>
            <Globe className="h-7 w-7 text-indigo-400 opacity-65" />
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="max-w-6xl mx-auto px-6 text-center">
            {/* Big Logo in the Middle */}
            <div className="mb-12 flex justify-center">
              <div className="relative">
                {/* Logo glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
                
                {/* Big Logo */}
                <div className="relative z-10 transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src="/logo_eip_explorer.png" 
                    alt="EIP Explorer Logo" 
                    className="mx-auto h-32 w-32 md:h-48 md:w-48 object-contain drop-shadow-xl relative z-10"
                  />
                </div>
                
                {/* EIP Explorer Text */}
                <div className="mt-6 text-center">
                  <h2 className="text-3xl font-bold gradient-text-animated drop-shadow-lg">
                    EIP Explorer
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 mx-auto rounded-full mt-3 animate-gradient-shift shadow-md"></div>
                </div>
                
                {/* Floating sparkles around logo */}
                <div className="absolute top-8 left-8 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-80"></div>
                <div className="absolute top-12 right-12 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce opacity-70" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-12 left-12 w-1 h-1 bg-cyan-400 rounded-full animate-bounce opacity-90" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-8 right-8 w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce opacity-80" style={{ animationDelay: '1.5s' }}></div>
              </div>
            </div>

            {/* Animated Title */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-bold mb-4">
                <span className="gradient-text-animated animate-text-glow">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </span>
              </h1>
              <div className="h-2 w-32 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 mx-auto rounded-full animate-gradient-shift"></div>
            </div>

            {/* Subtitle with enhanced design */}
            <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '1s' }}>
              <div className="bg-gradient-to-r from-slate-800/80 via-slate-700/80 to-slate-800/80 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-8 max-w-5xl mx-auto shadow-2xl">
                <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed text-center">
                  Discover Ethereum Improvement Proposals with{' '}
                  <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent font-bold drop-shadow-lg">live data</span>,{' '}
                  <span className="bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent font-bold drop-shadow-lg">project tracking</span>, and{' '}
                  <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent font-bold drop-shadow-lg">AI assistance</span>
                </p>
                <div className="flex justify-center mt-6 space-x-4">
                  <div className="flex items-center gap-2 text-blue-400">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Real-time Analytics</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-400">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <span className="text-sm font-medium">Project Integration</span>
                  </div>
                  <div className="flex items-center gap-2 text-cyan-400">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <span className="text-sm font-medium">AI-Powered Insights</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-8 mb-16 animate-fade-in-up" style={{ animationDelay: '1.5s' }}>
              <Link
                to="/eips"
                className="group relative bg-slate-800/80 backdrop-blur-sm border border-blue-500/30 text-white px-10 py-5 rounded-2xl font-bold hover:bg-slate-700/80 transition-all duration-500 flex items-center justify-center gap-4 text-xl shadow-2xl hover:shadow-blue-500/20 transform hover:scale-110 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <Book className="h-7 w-7 group-hover:animate-bounce" />
                <span className="relative z-10">Explore EIPs</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              
              <Link
                to="/analytics"
                className="group relative border-2 border-purple-500/50 text-white px-10 py-5 rounded-2xl font-bold hover:bg-purple-500/20 transition-all duration-500 flex items-center justify-center gap-4 text-xl hover:shadow-2xl hover:shadow-purple-500/20 transform hover:scale-110 overflow-hidden"
              >
                <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <TrendingUp className="h-7 w-7 group-hover:animate-pulse relative z-10" />
                <span className="relative z-10">Live Analytics</span>
              </Link>
            </div>

            {/* Live Stats Preview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '2s' }}>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30 hover:bg-slate-700/50 transition-all duration-300 transform hover:scale-105">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent mb-2 animate-pulse">
                  {stats.total || '---'}
                </div>
                <div className="text-slate-300 text-sm">Total EIPs</div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping mt-2"></div>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30 hover:bg-slate-700/50 transition-all duration-300 transform hover:scale-105">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-2 animate-pulse" style={{ animationDelay: '0.5s' }}>
                  {stats.byStatus?.['Final'] || '---'}
                </div>
                <div className="text-slate-300 text-sm">Final Standards</div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-ping mt-2" style={{ animationDelay: '0.5s' }}></div>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 hover:bg-slate-700/50 transition-all duration-300 transform hover:scale-105">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent mb-2 animate-pulse" style={{ animationDelay: '1s' }}>
                  {projectStats.total || '---'}
                </div>
                <div className="text-slate-300 text-sm">Active Projects</div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping mt-2" style={{ animationDelay: '1s' }}></div>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30 hover:bg-slate-700/50 transition-all duration-300 transform hover:scale-105">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent mb-2 animate-pulse" style={{ animationDelay: '1.5s' }}>
                  {stats.recentlyUpdated || '---'}
                </div>
                <div className="text-slate-300 text-sm">Recent Updates</div>
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-ping mt-2" style={{ animationDelay: '1.5s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the content with enhanced animations */}
      <div className="max-w-6xl mx-auto px-6 py-16 bg-slate-900">
        {/* Featured EIPs */}
        <div className="mb-20">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Featured EIPs
            </h2>
            <p className="text-xl text-slate-400">Most impactful and widely adopted standards including Pectra upgrade features</p>
          </div>
          
          {eipsLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-slate-800 rounded-xl border border-slate-700 p-8 shadow-sm animate-pulse">
                  <div className="h-32 bg-slate-700 rounded mb-4"></div>
                  <div className="h-6 bg-slate-700 rounded mb-2"></div>
                  <div className="h-4 bg-slate-700 rounded"></div>
                </div>
              ))}
            </div>
          ) : eipsError ? (
            <ErrorMessage message="Failed to load featured EIPs" />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredEIPs.map((eip, index) => (
                <div key={eip.number} className="relative animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="transform hover:scale-105 transition-all duration-300">
                    <EIPCard eip={eip} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live Data */}
        <div className="mb-20">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Live Adoption Metrics
            </h2>
            <p className="text-xl text-slate-400">Real-time data showing EIP implementation and usage across the ecosystem</p>
          </div>
          
          {metricsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map(i => (
                <div key={i} className="bg-slate-800 rounded-xl border border-slate-700 p-8 shadow-sm animate-pulse">
                  <div className="h-40 bg-slate-700 rounded"></div>
                </div>
              ))}
            </div>
          ) : metricsError ? (
            <ErrorMessage message="Failed to load live metrics" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {metrics.slice(0, 4).map((data, index) => {
                const eip = eips.find(e => e.number === data.eipNumber);
                return (
                  <div key={data.eipNumber} className="group bg-slate-800 rounded-xl border border-slate-700 p-8 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{ animationDelay: `${index * 0.3}s` }}>
                    <div className="flex items-center justify-between mb-6">
                      <Link
                        to={`/eip/${data.eipNumber}`}
                        className="text-2xl font-bold gradient-text hover:animate-pulse transition-all duration-300"
                      >
                        EIP-{data.eipNumber}
                      </Link>
                      <div className="flex items-center gap-2 text-green-400">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                        <Activity className="h-5 w-5 animate-pulse" />
                        <span className="text-sm font-medium">Live</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent mb-6 group-hover:from-blue-400 group-hover:to-blue-300 transition-all duration-300">{eip?.title}</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg transform hover:scale-105 transition-all duration-300 border border-blue-500/20">
                        <div className="text-3xl font-bold gradient-text animate-pulse">
                          {data.adoptionRate}%
                        </div>
                        <div className="text-slate-400">Adoption</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-cyan-500/10 rounded-lg transform hover:scale-105 transition-all duration-300 border border-green-500/20">
                        <div className="text-3xl font-bold gradient-text animate-pulse" style={{ animationDelay: '0.5s' }}>
                          {data.activeProjects.toLocaleString()}
                        </div>
                        <div className="text-slate-400">Projects</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Link
            to="/eips?status=Draft"
            className="group bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-slate-600 p-8 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-lg group-hover:animate-pulse shadow-lg">
                <Book className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-blue-300 transition-all duration-300">Draft EIPs</h3>
            </div>
            <p className="text-slate-400 mb-6 text-lg">Explore proposed standards currently under development including Pectra upgrade features</p>
            <div className="flex items-center text-blue-400 group-hover:text-purple-400 font-medium transition-colors">
              <span>View Drafts</span>
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>

          <Link
            to="/projects"
            className="group bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-slate-600 p-8 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.1s' }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-r from-green-500 to-cyan-500 p-4 rounded-lg group-hover:animate-pulse shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent group-hover:from-green-400 group-hover:to-green-300 transition-all duration-300">Implementation Projects</h3>
            </div>
            <p className="text-slate-400 mb-6 text-lg">Discover projects actively implementing EIP standards across DeFi, NFTs, and infrastructure</p>
            <div className="flex items-center text-blue-400 group-hover:text-green-400 font-medium transition-colors">
              <span>Browse Projects</span>
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>

          <Link
            to="/analytics"
            className="group bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-slate-600 p-8 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.2s' }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-4 rounded-lg group-hover:animate-pulse shadow-lg">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-purple-300 transition-all duration-300">Analytics Dashboard</h3>
            </div>
            <p className="text-slate-400 mb-6 text-lg">View comprehensive metrics, adoption trends, and ecosystem impact analysis</p>
            <div className="flex items-center text-blue-400 group-hover:text-purple-400 font-medium transition-colors">
              <span>View Analytics</span>
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Powered by Section */}
        <div className="bg-gradient-to-br from-slate-800/50 via-slate-700/50 to-slate-600/50 rounded-2xl border border-slate-600 p-12 text-center animate-fade-in-up backdrop-blur-sm">
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="animate-bounce-slow">
              <img 
                src="/ERP Pic .png" 
                alt="Ethereum Research Papers Logo" 
                className="h-20 w-20 object-contain"
              />
            </div>
            <div className="text-left">
              <h3 className="text-3xl font-bold gradient-text">
                Powered by
              </h3>
              <p className="text-2xl text-blue-400 font-semibold animate-pulse">
                Ethereum Research Papers
              </p>
            </div>
          </div>
          <p className="text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed">
            Advancing Ethereum research through comprehensive documentation, analysis, and community collaboration. 
            Explore cutting-edge research and contribute to the future of decentralized technology.
          </p>
        </div>
      </div>
    </div>
  );
}