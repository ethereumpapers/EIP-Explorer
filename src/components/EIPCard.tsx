import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ExternalLink } from 'lucide-react';
import { EIP } from '../types/eip';
import { formatDistanceToNow } from 'date-fns';

interface EIPCardProps {
  eip: EIP;
  showDescription?: boolean;
}

const statusColors = {
  'Draft': 'bg-warning-100 text-warning-800 border-warning-200',
  'Review': 'bg-primary-100 text-primary-800 border-primary-200',
  'Last Call': 'bg-warning-100 text-warning-800 border-warning-200',
  'Final': 'bg-success-100 text-success-800 border-success-200',
  'Stagnant': 'bg-secondary-100 text-secondary-800 border-secondary-200',
  'Withdrawn': 'bg-error-100 text-error-800 border-error-200',
  'Living': 'bg-accent-100 text-accent-800 border-accent-200'
};

const categoryColors = {
  'Core': 'bg-error-50 text-error-700 border-error-200',
  'Networking': 'bg-primary-50 text-primary-700 border-primary-200',
  'Interface': 'bg-success-50 text-success-700 border-success-200',
  'ERC': 'bg-accent-50 text-accent-700 border-accent-200'
};

export default function EIPCard({ eip, showDescription = true }: EIPCardProps) {
  return (
    <div className="bg-white rounded-lg border border-secondary-200 p-6 hover:shadow-medium transition-all duration-200 hover:border-secondary-300 shadow-soft">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Link
            to={`/eip/${eip.number}`}
            className="text-2xl font-bold text-primary-600 hover:text-primary-800 transition-colors"
          >
            EIP-{eip.number}
          </Link>
          <div className="flex space-x-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusColors[eip.status]}`}>
              {eip.status}
            </span>
            {eip.category && (
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${categoryColors[eip.category]}`}>
                {eip.category}
              </span>
            )}
          </div>
        </div>
        {eip.discussions && (
          <a
            href={eip.discussions}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary-400 hover:text-primary-600 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>

      <Link to={`/eip/${eip.number}`}>
        <h3 className="text-xl font-semibold text-secondary-900 mb-3 hover:text-primary-600 transition-colors">
          {eip.title}
        </h3>
      </Link>

      {showDescription && (
        <p className="text-secondary-600 mb-4 line-clamp-3">
          {eip.description}
        </p>
      )}

      <div className="flex items-center justify-between text-sm text-secondary-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>{eip.author[0]}{eip.author.length > 1 ? ` +${eip.author.length - 1}` : ''}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDistanceToNow(new Date(eip.created), { addSuffix: true })}</span>
          </div>
        </div>
        <span className="text-xs bg-secondary-100 px-2 py-1 rounded">
          {eip.type}
        </span>
      </div>
    </div>
  );
}