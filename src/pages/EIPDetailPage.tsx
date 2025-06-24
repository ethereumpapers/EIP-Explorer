import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, ExternalLink, Tag, Users, Clock } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import LiveDataCard from '../components/LiveDataCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import AIAssistant from '../components/AIAssistant';
import { useEIP } from '../hooks/useEIPs';
import { useEIPMetrics } from '../hooks/useLiveData';
import { useProjectsByEIP } from '../hooks/useProjects';
import { formatDistanceToNow } from 'date-fns';

export default function EIPDetailPage() {
  const { number } = useParams();
  const eipNumber = parseInt(number || '0');
  
  const { eip, loading: eipLoading, error: eipError } = useEIP(eipNumber);
  const { metrics, loading: metricsLoading } = useEIPMetrics(eipNumber);
  const { projects, loading: projectsLoading } = useProjectsByEIP(eipNumber);

  if (eipLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingSpinner size="lg" text="Loading EIP details..." className="py-20" />
        </div>
      </div>
    );
  }

  if (eipError || !eip) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/eips"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to EIPs</span>
          </Link>
          <ErrorMessage 
            message={eipError || "EIP not found"} 
            className="max-w-2xl mx-auto mt-20"
          />
        </div>
      </div>
    );
  }

  const statusColors = {
    'Draft': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Review': 'bg-blue-100 text-blue-800 border-blue-200',
    'Last Call': 'bg-orange-100 text-orange-800 border-orange-200',
    'Final': 'bg-green-100 text-green-800 border-green-200',
    'Stagnant': 'bg-gray-100 text-gray-800 border-gray-200',
    'Withdrawn': 'bg-red-100 text-red-800 border-red-200',
    'Living': 'bg-purple-100 text-purple-800 border-purple-200'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <Link
          to="/eips"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to EIPs</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <h1 className="text-3xl font-bold text-blue-600">EIP-{eip.number}</h1>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full border ${statusColors[eip.status]}`}>
                      {eip.status}
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">{eip.title}</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">{eip.description}</p>
                </div>
                {eip.discussions && (
                  <a
                    href={eip.discussions}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Discussion</span>
                  </a>
                )}
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">Authors</div>
                    <div className="font-medium text-gray-900">
                      {eip.author.slice(0, 2).join(', ')}
                      {eip.author.length > 2 && ` +${eip.author.length - 2}`}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">Created</div>
                    <div className="font-medium text-gray-900">
                      {formatDistanceToNow(new Date(eip.created), { addSuffix: true })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Tag className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">Type</div>
                    <div className="font-medium text-gray-900">{eip.type}</div>
                  </div>
                </div>
              </div>

              {eip.updated && (
                <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>Last updated {formatDistanceToNow(new Date(eip.updated), { addSuffix: true })}</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Specification</h3>
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-lg overflow-x-auto">
                  {eip.content}
                </pre>
              </div>
            </div>

            {/* Implementation Projects */}
            {projects.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <div className="flex items-center space-x-2 mb-6">
                  <Users className="h-5 w-5 text-gray-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Implementation Projects</h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                    {projects.length}
                  </span>
                </div>
                {projectsLoading ? (
                  <LoadingSpinner text="Loading projects..." />
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {projects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Data */}
            {metrics && (
              <LiveDataCard data={metrics} loading={metricsLoading} />
            )}

            {/* Quick Stats */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Implementation Projects</span>
                  <span className="font-semibold text-gray-900">{projects.length}</span>
                </div>
                {eip.category && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category</span>
                    <span className="font-semibold text-gray-900">{eip.category}</span>
                  </div>
                )}
                {eip.requires && eip.requires.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Requires</span>
                    <div className="flex flex-wrap gap-1">
                      {eip.requires.map(req => (
                        <Link
                          key={req}
                          to={`/eip/${req}`}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          EIP-{req}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {metrics && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Adoption Rate</span>
                    <span className="font-semibold text-green-600">{metrics.adoptionRate}%</span>
                  </div>
                )}
              </div>
            </div>

            {/* Data Attribution */}
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Data Sources</h4>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• EIP content from ethereum/EIPs repository</li>
                {metrics && <li>• Live metrics from Dune Analytics</li>}
                <li>• Project data from verified sources</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Assistant with current EIP context */}
      <AIAssistant currentEIP={eipNumber} />
    </div>
  );
}