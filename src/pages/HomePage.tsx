import React from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Book, Users, ArrowRight, Star, Activity, Sparkles, Zap } from 'lucide-react';
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

  const featuredEIPs = eips.filter(eip => [1559, 721, 4337].includes(eip.number)).slice(0, 3);
  const recentEIPs = eips
    .filter(eip => !featuredEIPs.some(f => f.number === eip.number))
    .sort((a, b) => new Date(b.updated || b.created).getTime() - new Date(a.updated || a.created).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-100 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-cyan-100 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-40 w-28 h-28 bg-indigo-100 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '3s' }}></div>
        
        {/* Floating Icons */}
        <div className="absolute top-32 left-1/4 animate-float">
          <Sparkles className="h-8 w-8 text-blue-300 opacity-40" />
        </div>
        <div className="absolute top-60 right-1/3 animate-float" style={{ animationDelay: '2s' }}>
          <Zap className="h-6 w-6 text-purple-300 opacity-50" />
        </div>
        <div className="absolute bottom-60 left-1/3 animate-float" style={{ animationDelay: '4s' }}>
          <Activity className="h-7 w-7 text-cyan-300 opacity-45" />
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl animate-pulse-slow">
                <Book className="h-16 w-16 text-white animate-bounce-slow" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                EIP Explorer
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              Discover Ethereum Improvement Proposals with live data, project tracking, and AI assistance
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Link
                to="/eips"
                className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Book className="h-6 w-6 group-hover:animate-bounce" />
                <span>Browse All EIPs</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/analytics"
                className="group border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center gap-3 text-lg hover:shadow-xl transform hover:scale-105"
              >
                <TrendingUp className="h-6 w-6 group-hover:animate-pulse" />
                <span>View Analytics</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Animated Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg className="relative block w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                  className="fill-blue-50 animate-wave"></path>
          </svg>
        </div>
      </div>

      {/* Live Stats Section */}
      <div className="bg-gradient-to-r from-blue-50 via-white to-purple-50 border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          {eipsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="text-center bg-white rounded-xl p-8 shadow-sm animate-pulse">
                  <div className="h-12 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : eipsError ? (
            <div className="text-center">
              <p className="text-red-600 text-lg">Unable to load statistics</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="group text-center bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up">
                <div className="text-4xl font-bold text-blue-600 mb-3 group-hover:animate-pulse">
                  {stats.total.toLocaleString()}
                </div>
                <div className="text-gray-600 text-lg">Total EIPs</div>
                <div className="mt-2 flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                  <span className="ml-2 text-xs text-blue-600">Live</span>
                </div>
              </div>
              <div className="group text-center bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="text-4xl font-bold text-green-600 mb-3 group-hover:animate-pulse">
                  {stats.byStatus['Final'] || 0}
                </div>
                <div className="text-gray-600 text-lg">Final Standards</div>
                <div className="mt-2 flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                  <span className="ml-2 text-xs text-green-600">Active</span>
                </div>
              </div>
              <div className="group text-center bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="text-4xl font-bold text-purple-600 mb-3 group-hover:animate-pulse">
                  {projectStats.total.toLocaleString()}
                </div>
                <div className="text-gray-600 text-lg">Active Projects</div>
                <div className="mt-2 flex items-center justify-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                  <span className="ml-2 text-xs text-purple-600">Growing</span>
                </div>
              </div>
              <div className="group text-center bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="text-4xl font-bold text-orange-600 mb-3 group-hover:animate-pulse">
                  {stats.recentlyUpdated}
                </div>
                <div className="text-gray-600 text-lg">Recently Updated</div>
                <div className="mt-2 flex items-center justify-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
                  <span className="ml-2 text-xs text-orange-600">Fresh</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Featured EIPs */}
        <div className="mb-20">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Featured EIPs
            </h2>
            <p className="text-xl text-gray-600">Most impactful and widely adopted standards</p>
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
                  <div className="absolute -top-3 -right-3 z-10 animate-bounce">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-2 rounded-full shadow-lg">
                      <Star className="h-5 w-5" />
                    </div>
                  </div>
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
            <p className="text-xl text-gray-600">Real-time data showing EIP implementation and usage</p>
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
              {metrics.slice(0, 2).map((data, index) => {
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
            <p className="text-gray-600 mb-6 text-lg">Explore proposed standards currently under development</p>
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
            <p className="text-gray-600 mb-6 text-lg">Discover projects actively implementing EIP standards</p>
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
            <p className="text-gray-600 mb-6 text-lg">View comprehensive metrics and adoption trends</p>
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