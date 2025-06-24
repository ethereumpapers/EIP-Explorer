import React from 'react';
import { ExternalLink, Github, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Project } from '../types/eip';

interface ProjectCardProps {
  project: Project;
}

const statusIcons = {
  'Active': CheckCircle,
  'Beta': Clock,
  'Deprecated': AlertCircle
};

const statusColors = {
  'Active': 'text-green-600 bg-green-50',
  'Beta': 'text-blue-600 bg-blue-50',
  'Deprecated': 'text-red-600 bg-red-50'
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const StatusIcon = statusIcons[project.status];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {project.logo && (
            <img
              src={project.logo}
              alt={`${project.name} logo`}
              className="w-10 h-10 rounded-lg object-cover"
            />
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${statusColors[project.status]}`}>
              <StatusIcon className="h-3 w-3" />
              <span>{project.status}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <a
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-600 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      <p className="text-gray-600 mb-4">
        {project.description}
      </p>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Implementation Details</h4>
        <p className="text-sm text-gray-600">{project.implementationDetails}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.eipNumbers.map((eipNumber) => (
          <span
            key={eipNumber}
            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium"
          >
            EIP-{eipNumber}
          </span>
        ))}
      </div>
    </div>
  );
}