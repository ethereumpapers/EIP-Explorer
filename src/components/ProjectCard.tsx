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
  'Active': 'text-green-300 bg-green-900/30',
  'Beta': 'text-blue-300 bg-blue-900/30',
  'Deprecated': 'text-red-300 bg-red-900/30'
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const StatusIcon = statusIcons[project.status];

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 hover:shadow-xl transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {project.logo && (
            <img
              src={project.logo}
              alt={`${project.name} logo`}
              className="w-10 h-10 rounded-lg object-cover border border-slate-700 bg-slate-900"
            />
          )}
          <div>
            <h3 className="text-lg font-semibold text-slate-100">{project.name}</h3>
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
            className="text-slate-400 hover:text-blue-400 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      <p className="text-slate-300 mb-4">
        {project.description}
      </p>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-slate-100 mb-2">Implementation Details</h4>
        <p className="text-sm text-slate-300">{project.implementationDetails}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.eipNumbers.map((eipNumber) => (
          <span
            key={eipNumber}
            className="px-2 py-1 bg-blue-900/40 text-blue-300 text-xs rounded-full font-medium"
          >
            EIP-{eipNumber}
          </span>
        ))}
      </div>
    </div>
  );
}