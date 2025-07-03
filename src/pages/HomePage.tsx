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
  const featuredEIPs = eips.filter(eip => [1559, 721, 4337, 7702, 4844].includes(eip.number)).slice(0, 5);

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
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Advanced Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 text-white overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-morph-blob"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-25 animate-morph-blob" style={{ animationDelay: '5s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-15 animate-morph-blob" style={{ animationDelay: '10s' }}></div>
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
            <Sparkles className="h-8 w-8 text-yellow-300 opacity-60" />
          </div>
          <div className="absolute top-60 right-1/3 animate-sparkle-trail" style={{ animationDelay: '2s' }}>
            <Zap className="h-6 w-6 text-purple-300 opacity-70" />
          </div>
          <div className="absolute bottom-60 left-1/3 animate-sparkle-trail" style={{ animationDelay: '4s' }}>
            <Activity className="h-7 w-7 text-cyan-300 opacity-65" />
          </div>
          <div className="absolute top-40 right-1/4 animate-sparkle-trail" style={{ animationDelay: '6s' }}>
            <Rocket className="h-8 w-8 text-pink-300 opacity-60" />
          </div>
          <div className="absolute bottom-40 right-1/2 animate-sparkle-trail" style={{ animationDelay: '8s' }}>
            <Code className="h-6 w-6 text-green-300 opacity-70" />
          </div>
          <div className="absolute top-1/2 left-20 animate-sparkle-trail" style={{ animationDelay: '10s' }}>
            <Globe className="h-7 w-7 text-blue-300 opacity-65" />
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="max-w-6xl mx-auto px-6 text-center">
            {/* Big Logo in the Middle */}
            <div className="mb-12 flex justify-center">
              <div className="relative">
                {/* Logo glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse"></div>
                
                {/* Big Logo */}
                <div className="relative z-10 transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src="/logo_eip_explorer2.png" 
                    alt="EIP Explorer Logo" 
                    className="h-48 w-48 object-contain drop-shadow-2xl filter brightness-150"
                  />
                </div>
                
                {/* EIP Explorer Text */}
                <div className="mt-6 text-center">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent animate-text-glow drop-shadow-lg">
                    EIP Explorer
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 mx-auto rounded-full mt-3 animate-gradient-shift shadow-md"></div>
                </div>
                
                {/* Floating sparkles around logo */}
                <div className="absolute top-8 left-8 w-2 h-2 bg-yellow-300 rounded-full animate-bounce opacity-80"></div>
                <div className="absolute top-12 right-12 w-1.5 h-1.5 bg-purple-300 rounded-full animate-bounce opacity-70" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-12 left-12 w-1 h-1 bg-cyan-300 rounded-full animate-bounce opacity-90" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-8 right-8 w-1.5 h-1.5 bg-pink-300 rounded-full animate-bounce opacity-80" style={{ animationDelay: '1.5s' }}></div>
              </div>
            </div>

            {/* Animated Title */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent animate-text-glow">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </span>
              </h1>
              <div className="h-2 w-32 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 mx-auto rounded-full animate-gradient-shift"></div>
            </div>

            {/* Subtitle with typewriter effect */}
            <p className="text-2xl md:text-3xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '1s' }}>
              Discover Ethereum Improvement Proposals with 
              <span className="text-yellow-300 font-semibold"> live data</span>, 
              <span className="text-pink-300 font-semibold"> project tracking</span>, and 
              <span className="text-cyan-300 font-semibold"> AI assistance</span>
            </p>

            {/* Animated Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-8 mb-16 animate-fade-in-up" style={{ animationDelay: '1.5s' }}>
              <Link
                to="/eips"
                className="group relative bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold hover:bg-blue-50 transition-all duration-500 flex items-center justify-center gap-4 text-xl shadow-2xl hover:shadow-3xl transform hover:scale-110 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <Book className="h-7 w-7 group-hover:animate-bounce" />
                <span className="relative z-10">Explore EIPs</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              
              <Link
                to="/analytics"
                className="group relative border-3 border-white text-white px-10 py-5 rounded-2xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-500 flex items-center justify-center gap-4 text-xl hover:shadow-2xl transform hover:scale-110 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <TrendingUp className="h-7 w-7 group-hover:animate-pulse relative z-10" />
                <span className="relative z-10">Live Analytics</span>
              </Link>
            </div>

            {/* Live Stats Preview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '2s' }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-3xl font-bold text-white mb-2 animate-pulse">
                  {stats.total || '---'}
                </div>
                <div className="text-blue-100 text-sm">Total EIPs</div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping mt-2"></div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-3xl font-bold text-white mb-2 animate-pulse" style={{ animationDelay: '0.5s' }}>
                  {stats.byStatus?.['Final'] || '---'}
                </div>
                <div className="text-green-100 text-sm">Final Standards</div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-ping mt-2" style={{ animationDelay: '0.5s' }}></div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-3xl font-bold text-white mb-2 animate-pulse" style={{ animationDelay: '1s' }}>
                  {projectStats.total || '---'}
                </div>
                <div className="text-purple-100 text-sm">Active Projects</div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping mt-2" style={{ animationDelay: '1s' }}></div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-3xl font-bold text-white mb-2 animate-pulse" style={{ animationDelay: '1.5s' }}>
                  {stats.recentlyUpdated || '---'}
                </div>
                <div className="text-orange-100 text-sm">Recent Updates</div>
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-ping mt-2" style={{ animationDelay: '1.5s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the content with enhanced animations */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Featured EIPs */}
        <div className="mb-20">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Featured EIPs
            </h2>
            <p className="text-xl text-gray-600">Most impactful and widely adopted standards including Pectra upgrade features</p>
          </div>
          
          {eipsLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm animate-pulse">
                  <div className="h-32 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
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
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Live Adoption Metrics
            </h2>
            <p className="text-xl text-gray-600">Real-time data showing EIP implementation and usage across the ecosystem</p>
          </div>
          
          {metricsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map(i => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm animate-pulse">
                  <div className="h-40 bg-gray-200 rounded"></div>
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
                  <div key={data.eipNumber} className="group bg-white rounded-xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{ animationDelay: `${index * 0.3}s` }}>
                    <div className="flex items-center justify-between mb-6">
                      <Link
                        to={`/eip/${data.eipNumber}`}
                        className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                      >
                        EIP-{data.eipNumber}
                      </Link>
                      <div className="flex items-center gap-2 text-green-600">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                        <Activity className="h-5 w-5 animate-pulse" />
                        <span className="text-sm font-medium">Live</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 group-hover:text-blue-600 transition-colors">{eip?.title}</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg transform hover:scale-105 transition-all duration-300">
                        <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                          {data.adoptionRate}%
                        </div>
                        <div className="text-gray-600">Adoption</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-green-50 to-cyan-50 rounded-lg transform hover:scale-105 transition-all duration-300">
                        <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent animate-pulse" style={{ animationDelay: '0.5s' }}>
                          {data.activeProjects.toLocaleString()}
                        </div>
                        <div className="text-gray-600">Projects</div>
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
            className="group bg-gradient-to-br from-white to-blue-50 rounded-xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-lg group-hover:animate-pulse">
                <Book className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Draft EIPs</h3>
            </div>
            <p className="text-gray-600 mb-6 text-lg">Explore proposed standards currently under development including Pectra upgrade features</p>
            <div className="flex items-center text-blue-600 group-hover:text-purple-600 font-medium transition-colors">
              <span>View Drafts</span>
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>

          <Link
            to="/projects"
            className="group bg-gradient-to-br from-white to-green-50 rounded-xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.1s' }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-r from-green-500 to-cyan-500 p-4 rounded-lg group-hover:animate-pulse">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors">Implementation Projects</h3>
            </div>
            <p className="text-gray-600 mb-6 text-lg">Discover projects actively implementing EIP standards across DeFi, NFTs, and infrastructure</p>
            <div className="flex items-center text-blue-600 group-hover:text-green-600 font-medium transition-colors">
              <span>Browse Projects</span>
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>

          <Link
            to="/analytics"
            className="group bg-gradient-to-br from-white to-purple-50 rounded-xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.2s' }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-lg group-hover:animate-pulse">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">Analytics Dashboard</h3>
            </div>
            <p className="text-gray-600 mb-6 text-lg">View comprehensive metrics, adoption trends, and ecosystem impact analysis</p>
            <div className="flex items-center text-blue-600 group-hover:text-purple-600 font-medium transition-colors">
              <span>View Analytics</span>
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Powered by Section */}
        <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 rounded-2xl border border-blue-200 p-12 text-center animate-fade-in-up">
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="animate-bounce-slow">
              <img 
                src="/ERP Pic .png" 
                alt="Ethereum Research Papers Logo" 
                className="h-20 w-20 object-contain"
              />
            </div>
            <div className="text-left">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Powered by
              </h3>
              <p className="text-2xl text-blue-600 font-semibold animate-pulse">
                Ethereum Research Papers
              </p>
            </div>
          </div>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
            Advancing Ethereum research through comprehensive documentation, analysis, and community collaboration. 
            Explore cutting-edge research and contribute to the future of decentralized technology.
          </p>
        </div>
      </div>
    </div>
  );
}