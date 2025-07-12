import React from 'react';
import { TrendingUp, Activity, Users, Zap, Clock } from 'lucide-react';
import { LiveMetrics } from '../services/duneService';
import { formatDistanceToNow } from 'date-fns';

interface LiveDataCardProps {
  data: LiveMetrics;
  loading?: boolean;
}

export default function LiveDataCard({ data, loading = false }: LiveDataCardProps) {
  if (loading) {
    return (
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 bg-slate-700 rounded w-32"></div>
          <div className="h-4 bg-slate-700 rounded w-16"></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="p-4 bg-slate-700 rounded-lg">
              <div className="h-8 bg-slate-600 rounded w-8 mx-auto mb-2"></div>
              <div className="h-6 bg-slate-600 rounded w-16 mx-auto mb-1"></div>
              <div className="h-4 bg-slate-600 rounded w-20 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getMetricIcon = (index: number) => {
    const icons = [TrendingUp, Activity, Zap, Users];
    const Icon = icons[index % icons.length];
    return Icon;
  };

  const getMetricColor = (index: number) => {
    const colors = ['blue', 'green', 'purple', 'orange'];
    return colors[index % colors.length];
  };

  const metrics = [
    { label: 'Adoption Rate', value: `${data.adoptionRate}%` },
    { label: 'Daily Volume', value: data.transactionVolume },
    { label: 'Gas Usage', value: data.gasUsage },
    { label: 'Active Projects', value: data.activeProjects.toLocaleString() }
  ];

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-100">Live Metrics</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-green-400">
            <Activity className="h-4 w-4" />
            <span className="text-sm">Live</span>
          </div>
          <div className="flex items-center space-x-1 text-slate-400 text-xs">
            <Clock className="h-3 w-3" />
            <span>{formatDistanceToNow(new Date(data.lastUpdated), { addSuffix: true })}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {metrics.map((metric, index) => {
          const Icon = getMetricIcon(index);
          const color = getMetricColor(index);
          const colorMap: Record<string, string> = {
            blue: 'from-blue-400 to-blue-300',
            green: 'from-green-400 to-green-300',
            purple: 'from-purple-400 to-purple-300',
            orange: 'from-orange-400 to-orange-300',
          };
          return (
            <div key={metric.label} className={`text-center p-4 bg-slate-700 rounded-lg`}>
              <Icon className={`h-8 w-8 text-${color}-400 mx-auto mb-2`} />
              <div className={`text-2xl font-bold bg-gradient-to-r ${colorMap[color]} bg-clip-text text-transparent`}>{metric.value}</div>
              <div className="text-sm text-slate-300">{metric.label}</div>
            </div>
          );
        })}
      </div>

      {/* Additional metrics if available */}
      {data.additionalMetrics && Object.keys(data.additionalMetrics).length > 0 && (
        <div className="border-t border-slate-700 pt-4">
          <h4 className="text-sm font-medium text-slate-100 mb-3">Additional Metrics</h4>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(data.additionalMetrics).map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-slate-300 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="font-medium text-slate-100">
                  {typeof value === 'number' ? value.toLocaleString() : value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 text-xs text-slate-400 text-center">
        Data sourced from Dune Analytics and on-chain metrics
      </div>
    </div>
  );
}