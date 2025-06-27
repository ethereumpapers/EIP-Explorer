import React from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Book, Users, ArrowRight, Star, Activity, AlertCircle } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <Book className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Ethereum Standards Explorer
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Comprehensive platform for EIPs with live data, project tracking, and AI-powered research assistance
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/eips"
                className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Book className="h-5 w-5" />
                <span>Browse All EIPs</span>
              </Link>
              <Link
                to="/analytics"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-200 flex items-center justify-center space-x-2 backdrop-blur-sm"
              >
                <TrendingUp className="h-5 w-5" />
                <span>View Analytics</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {eipsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="text-center bg-white rounded-xl p-6 shadow-sm">
                  <LoadingSpinner size="md" />
                </div>
              ))}
            </div>
          ) : eipsError ? (
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600">Unable to load EIP statistics</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center group hover:scale-105 transition-transform duration-200 bg-white rounded-xl p-6 shadow-sm hover:shadow-md">
                <div className="text-3xl font-bold text-indigo-600 mb-2 group-hover:text-indigo-700">
                  {stats.total.toLocaleString()}
                </div>
                <div className="text-gray-600">Total EIPs</div>
                <div className="w-12 h-1 bg-indigo-600 mx-auto mt-2 rounded-full"></div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-200 bg-white rounded-xl p-6 shadow-sm hover:shadow-md">
                <div className="text-3xl font-bold text-green-600 mb-2 group-hover:text-green-700">
                  {stats.byStatus['Final'] || 0}
                </div>
                <div className="text-gray-600">Final Standards</div>
                <div className="w-12 h-1 bg-green-600 mx-auto mt-2 rounded-full"></div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-200 bg-white rounded-xl p-6 shadow-sm hover:shadow-md">
                <div className="text-3xl font-bold text-purple-600 mb-2 group-hover:text-purple-700">
                  {projectStats.total.toLocaleString()}
                </div>
                <div className="text-gray-600">Active Projects</div>
                <div className="w-12 h-1 bg-purple-600 mx-auto mt-2 rounded-full"></div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-200 bg-white rounded-xl p-6 shadow-sm hover:shadow-md">
                <div className="text-3xl font-bold text-orange-600 mb-2 group-hover:text-orange-700">
                  {stats.recentlyUpdated}
                </div>
                <div className="text-gray-600">Recently Updated</div>
                <div className="w-12 h-1 bg-orange-600 mx-auto mt-2 rounded-full"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured EIPs */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured EIPs</h2>
              <p className="text-gray-600">Most impactful and widely adopted standards</p>
            </div>
            <Link
              to="/eips"
              className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          {eipsLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <LoadingSpinner text="Loading featured EIPs..." />
                </div>
              ))}
            </div>
          ) : eipsError ? (
            <ErrorMessage message="Failed to load featured EIPs" />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredEIPs.map((eip) => (
                <div key={eip.number} className="relative">
                  <div className="absolute -top-2 -right-2 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 p-2 rounded-full shadow-lg">
                      <Star className="h-4 w-4" />
                    </div>
                  </div>
                  <EIPCard eip={eip} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live Data Highlights */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Live Adoption Metrics</h2>
              <p className="text-gray-600">Real-time data showing EIP implementation and usage</p>
            </div>
          </div>
          
          {metricsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map(i => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <LoadingSpinner text="Loading live metrics..." />
                </div>
              ))}
            </div>
          ) : metricsError ? (
            <ErrorMessage message="Failed to load live metrics" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {metrics.slice(0, 2).map((data) => {
                const eip = eips.find(e => e.number === data.eipNumber);
                return (
                  <div key={data.eipNumber} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <Link
                        to={`/eip/${data.eipNumber}`}
                        className="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                      >
                        EIP-{data.eipNumber}
                      </Link>
                      <div className="flex items-center space-x-1 text-green-600">
                        <Activity className="h-4 w-4" />
                        <span className="text-sm">Live</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{eip?.title}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-indigo-600">{data.adoptionRate}%</div>
                        <div className="text-sm text-gray-600">Adoption</div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{data.activeProjects.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Projects</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent EIPs */}
        {recentEIPs.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Recently Updated</h2>
                <p className="text-gray-600">Latest changes and new proposals</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {recentEIPs.map((eip) => (
                <EIPCard key={eip.number} eip={eip} showDescription={false} />
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Link
            to="/eips?status=Draft"
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 group shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-3 rounded-lg">
                <Book className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Draft EIPs</h3>
            </div>
            <p className="text-gray-600 mb-4">Explore proposed standards currently under development</p>
            <div className="flex items-center text-indigo-600 group-hover:text-indigo-800">
              <span className="font-medium">View Drafts</span>
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/projects"
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 group shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Implementation Projects</h3>
            </div>
            <p className="text-gray-600 mb-4">Discover projects actively implementing EIP standards</p>
            <div className="flex items-center text-indigo-600 group-hover:text-indigo-800">
              <span className="font-medium">Browse Projects</span>
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/analytics"
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 group shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Analytics Dashboard</h3>
            </div>
            <p className="text-gray-600 mb-4">View comprehensive metrics and adoption trends</p>
            <div className="flex items-center text-indigo-600 group-hover:text-indigo-800">
              <span className="font-medium">View Analytics</span>
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Powered by Ethereum Research Papers */}
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl border border-indigo-200 p-8 text-center shadow-sm">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <img 
              src="/ERP Pic .png" 
              alt="Ethereum Research Papers Logo" 
              className="h-16 w-16 object-contain"
            />
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-900">Powered by</h3>
              <p className="text-xl text-indigo-600 font-semibold">Ethereum Research Papers</p>
            </div>
          </div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Advancing Ethereum research through comprehensive documentation, analysis, and community collaboration. 
            Explore cutting-edge research and contribute to the future of decentralized technology.
          </p>
        </div>
      </div>
    </div>
  );
}