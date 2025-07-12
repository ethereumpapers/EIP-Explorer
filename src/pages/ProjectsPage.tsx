import React, { useState } from 'react';
import { Users, Plus } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useProjects } from '../hooks/useProjects';

export default function ProjectsPage() {
  const { projects, loading, error, stats, refetch } = useProjects();
  const [filter, setFilter] = useState<'all' | 'active' | 'beta' | 'deprecated'>('all');

  const filteredProjects = projects.filter(project => 
    filter === 'all' || project.status.toLowerCase() === filter
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingSpinner size="lg" text="Loading projects..." className="py-20" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorMessage 
            message={error} 
            onRetry={refetch}
            className="max-w-2xl mx-auto mt-20"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Implementation Projects</h1>
            <p className="text-slate-300">
              Discover verified projects actively implementing EIP standards
            </p>
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Submit Project</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex space-x-2 mb-8">
          {[
            { key: 'all', label: 'All Projects' },
            { key: 'active', label: 'Active' },
            { key: 'beta', label: 'Beta' },
            { key: 'deprecated', label: 'Deprecated' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 border border-slate-600 hover:bg-slate-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 rounded-lg border border-blue-900/40 p-6 text-center">
            <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-300">{stats.total}</div>
            <div className="text-sm text-slate-400">Total Projects</div>
          </div>
          <div className="bg-slate-800 rounded-lg border border-green-900/40 p-6 text-center">
            <div className="w-8 h-8 bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <div className="text-2xl font-bold text-green-400">{stats.active}</div>
            <div className="text-sm text-slate-400">Active</div>
          </div>
          <div className="bg-slate-800 rounded-lg border border-blue-900/40 p-6 text-center">
            <div className="w-8 h-8 bg-blue-900/40 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            </div>
            <div className="text-2xl font-bold text-blue-400">{stats.beta}</div>
            <div className="text-sm text-slate-400">Beta</div>
          </div>
          <div className="bg-slate-800 rounded-lg border border-purple-900/40 p-6 text-center">
            <div className="w-8 h-8 bg-purple-900/40 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="w-3 h-3 bg-purple-300 rounded-full"></div>
            </div>
            <div className="text-2xl font-bold text-purple-300">
              {Object.keys(stats.topEIPs).length}
            </div>
            <div className="text-sm text-slate-400">EIPs Implemented</div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-600 text-6xl mb-4">🚀</div>
            <h3 className="text-lg font-medium text-white mb-2">No projects found</h3>
            <p className="text-slate-400">
              No projects match the selected filter.
            </p>
          </div>
        )}

        {/* Data Attribution */}
        <div className="mt-12 bg-slate-800 rounded-lg border border-blue-900/40 p-6">
          <h3 className="text-sm font-medium text-blue-300 mb-2">Data Sources & Verification</h3>
          <p className="text-sm text-blue-200">
            Projects are verified through multiple sources including GitHub repositories, 
            official websites, and community validation. All implementation details are 
            reviewed for accuracy and current status.
          </p>
        </div>
      </div>
    </div>
  );
}