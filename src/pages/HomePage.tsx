import React from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Book, Users, ArrowRight, Star, Activity } from 'lucide-react';
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <Book className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Ethereum Standards Explorer
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Explore Ethereum Improvement Proposals with live data, project tracking, and AI assistance
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                to="/eips"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 flex items-center justify-center gap-3 text-lg shadow-lg"
              >
                <Book className="h-6 w-6" />
                <span>Browse All EIPs</span>
              </Link>
              <Link
                to="/analytics"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 flex items-center justify-center gap-3 text-lg"
              >
                <TrendingUp className="h-6 w-6" />
                <span>View Analytics</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-50 border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          {eipsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="text-center bg-white rounded-xl p-8 shadow-sm">
                  <LoadingSpinner size="md" />
                </div>
              ))}
            </div>
          ) : eipsError ? (
            <div className="text-center">
              <p className="text-red-600 text-lg">Unable to load statistics</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-blue-600 mb-3">
                  {stats.total.toLocaleString()}
                </div>
                <div className="text-gray-600 text-lg">Total EIPs</div>
              </div>
              <div className="text-center bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-green-600 mb-3">
                  {stats.byStatus['Final'] || 0}
                </div>
                <div className="text-gray-600 text-lg">Final Standards</div>
              </div>
              <div className="text-center bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-blue-600 mb-3">
                  {projectStats.total.toLocaleString()}
                </div>
                <div className="text-gray-600 text-lg">Active Projects</div>
              </div>
              <div className="text-center bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-orange-600 mb-3">
                  {stats.recentlyUpdated}
                </div>
                <div className="text-gray-600 text-lg">Recently Updated</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Featured EIPs */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured EIPs</h2>
            <p className="text-xl text-gray-600">Most impactful and widely adopted standards</p>
          </div>
          
          {eipsLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
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
                  <div className="absolute -top-3 -right-3 z-10">
                    <div className="bg-yellow-400 text-yellow-900 p-2 rounded-full shadow-lg">
                      <Star className="h-5 w-5" />
                    </div>
                  </div>
                  <EIPCard eip={eip} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live Data */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Live Adoption Metrics</h2>
            <p className="text-xl text-gray-600">Real-time data showing EIP implementation and usage</p>
          </div>
          
          {metricsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map(i => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
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
                  <div key={data.eipNumber} className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-6">
                      <Link
                        to={`/eip/${data.eipNumber}`}
                        className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        EIP-{data.eipNumber}
                      </Link>
                      <div className="flex items-center gap-2 text-green-600">
                        <Activity className="h-5 w-5" />
                        <span className="text-sm font-medium">Live</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">{eip?.title}</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600">{data.adoptionRate}%</div>
                        <div className="text-gray-600">Adoption</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-3xl font-bold text-green-600">{data.activeProjects.toLocaleString()}</div>
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
            className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-100 p-4 rounded-lg">
                <Book className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Draft EIPs</h3>
            </div>
            <p className="text-gray-600 mb-6 text-lg">Explore proposed standards currently under development</p>
            <div className="flex items-center text-blue-600 group-hover:text-blue-800 font-medium">
              <span>View Drafts</span>
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/projects"
            className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-green-100 p-4 rounded-lg">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Implementation Projects</h3>
            </div>
            <p className="text-gray-600 mb-6 text-lg">Discover projects actively implementing EIP standards</p>
            <div className="flex items-center text-blue-600 group-hover:text-blue-800 font-medium">
              <span>Browse Projects</span>
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/analytics"
            className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-purple-100 p-4 rounded-lg">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Analytics Dashboard</h3>
            </div>
            <p className="text-gray-600 mb-6 text-lg">View comprehensive metrics and adoption trends</p>
            <div className="flex items-center text-blue-600 group-hover:text-blue-800 font-medium">
              <span>View Analytics</span>
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Powered by Section */}
        <div className="bg-blue-50 rounded-2xl border border-blue-200 p-12 text-center">
          <div className="flex items-center justify-center gap-6 mb-6">
            <img 
              src="/ERP Pic .png" 
              alt="Ethereum Research Papers Logo" 
              className="h-20 w-20 object-contain"
            />
            <div className="text-left">
              <h3 className="text-3xl font-bold text-gray-900">Powered by</h3>
              <p className="text-2xl text-blue-600 font-semibold">Ethereum Research Papers</p>
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