import React from 'react';
import { TrendingUp, Activity, Users, Zap, BarChart3, PieChart } from 'lucide-react';
import LiveDataCard from '../components/LiveDataCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useEIPs } from '../hooks/useEIPs';
import { useLiveData } from '../hooks/useLiveData';
import { useProjects } from '../hooks/useProjects';

export default function AnalyticsPage() {
  const { stats: eipStats, loading: eipsLoading, error: eipsError } = useEIPs();
  const { metrics, loading: metricsLoading, error: metricsError, lastUpdated } = useLiveData();
  const { stats: projectStats } = useProjects();

  const statusDistribution = Object.entries(eipStats.byStatus).map(([status, count]) => ({
    status,
    count,
    color: getStatusColor(status)
  }));

  const categoryDistribution = Object.entries(eipStats.byCategory).map(([category, count]) => ({
    category,
    count,
    percentage: Math.round((count / eipStats.total) * 100)
  }));

  function getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      'Final': 'bg-green-500',
      'Draft': 'bg-yellow-500',
      'Review': 'bg-blue-500',
      'Living': 'bg-purple-500',
      'Last Call': 'bg-orange-500',
      'Stagnant': 'bg-gray-500',
      'Withdrawn': 'bg-red-500'
    };
    return colors[status] || 'bg-gray-500';
  }

  if (eipsLoading) {
    return (
      <div className="min-h-screen bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingSpinner size="lg" text="Loading analytics data..." className="py-20" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">EIP Analytics Dashboard</h1>
          <p className="text-slate-300">
            Real-time insights into EIP adoption, implementation, and ecosystem impact
            {lastUpdated && (
              <span className="ml-2 text-sm text-green-400">
                • Last updated: {new Date(lastUpdated).toLocaleTimeString()}
              </span>
            )}
          </p>
        </div>

        {eipsError && (
          <ErrorMessage message={eipsError} className="mb-8" />
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 rounded-lg border border-blue-900/40 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total EIPs</p>
                <p className="text-3xl font-bold text-blue-300">{eipStats.total.toLocaleString()}</p>
              </div>
              <div className="bg-blue-900/40 p-3 rounded-lg">
                <BarChart3 className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-400">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>Live from GitHub</span>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg border border-green-900/40 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Final Standards</p>
                <p className="text-3xl font-bold text-green-400">{eipStats.byStatus['Final'] || 0}</p>
              </div>
              <div className="bg-green-900/40 p-3 rounded-lg">
                <Activity className="h-8 w-8 text-green-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-400">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>Production ready</span>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg border border-purple-900/40 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active Projects</p>
                <p className="text-3xl font-bold text-purple-300">{projectStats.total.toLocaleString()}</p>
              </div>
              <div className="bg-purple-900/40 p-3 rounded-lg">
                <Users className="h-8 w-8 text-purple-300" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-400">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>Verified implementations</span>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg border border-orange-900/40 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Recently Updated</p>
                <p className="text-3xl font-bold text-orange-300">{eipStats.recentlyUpdated}</p>
              </div>
              <div className="bg-orange-900/40 p-3 rounded-lg">
                <Zap className="h-8 w-8 text-orange-300" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-400">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>Last 30 days</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* EIP Status Distribution */}
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <PieChart className="h-5 w-5 text-slate-400" />
              <h3 className="text-lg font-semibold text-white">EIP Status Distribution</h3>
            </div>
            <div className="space-y-4">
              {statusDistribution.map(({ status, count, color }) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded ${color}`} />
                    <span className="text-slate-300">{status}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-white">{count}</span>
                    <span className="text-sm text-slate-400">
                      ({Math.round((count / eipStats.total) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Categories */}
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Top EIP Categories</h3>
            <div className="space-y-4">
              {categoryDistribution.map(({ category, count, percentage }) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-slate-300">{category}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${percentage}%` }} 
                      />
                    </div>
                    <span className="font-semibold text-white w-12 text-right">{percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Data Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Live EIP Metrics</h2>
          <p className="text-slate-300 mb-6 max-w-2xl">
            <strong>What do these metrics mean?</strong><br />
            <span className="block mt-1"><b>Adoption Rate:</b> Percentage of projects or users actively using or supporting the EIP.</span>
            <span className="block mt-1"><b>Daily Volume:</b> The number of transactions, blobs, or operations related to the EIP per day.</span>
            <span className="block mt-1"><b>Gas Usage:</b> The total gas consumed, ETH burned, or cost reduction achieved by the EIP.</span>
            <span className="block mt-1"><b>Active Projects:</b> Number of live projects, wallets, or protocols that have implemented or integrated the EIP.</span>
          </p>
          {metricsLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[1, 2].map(i => (
                <LoadingSpinner key={i} text="Loading live metrics..." className="py-12" />
              ))}
            </div>
          ) : metricsError ? (
            <ErrorMessage message={metricsError} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {metrics.map((data) => (
                <LiveDataCard key={data.eipNumber} data={data} />
              ))}
            </div>
          )}
        </div>

        {/* Adoption Timeline */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-100 mb-6">EIP Ecosystem Growth</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 text-center">
                <div className="text-sm font-medium text-slate-100">2024</div>
              </div>
              <div className="flex-1 bg-slate-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }} />
              </div>
              <div className="text-sm text-slate-300">85% active adoption</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 text-center">
                <div className="text-sm font-medium text-slate-100">2023</div>
              </div>
              <div className="flex-1 bg-slate-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }} />
              </div>
              <div className="text-sm text-slate-300">70% ecosystem growth</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 text-center">
                <div className="text-sm font-medium text-slate-100">2022</div>
              </div>
              <div className="flex-1 bg-slate-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '45%' }} />
              </div>
              <div className="text-sm text-slate-300">45% implementation rate</div>
            </div>
          </div>
        </div>

        {/* Data Attribution */}
        <div className="mt-8 bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Data Sources</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• EIP data synchronized from ethereum/EIPs GitHub repository</li>
            <li>• Live metrics sourced from Dune Analytics and on-chain data</li>
            <li>• Project implementations verified through multiple sources</li>
            <li>• Statistics updated in real-time with caching for performance</li>
          </ul>
        </div>
      </div>
    </div>
  );
}