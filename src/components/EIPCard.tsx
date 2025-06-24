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
  'Draft': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Review': 'bg-blue-100 text-blue-800 border-blue-200',
  'Last Call': 'bg-orange-100 text-orange-800 border-orange-200',
  'Final': 'bg-green-100 text-green-800 border-green-200',
  'Stagnant': 'bg-gray-100 text-gray-800 border-gray-200',
  'Withdrawn': 'bg-red-100 text-red-800 border-red-200',
  'Living': 'bg-purple-100 text-purple-800 border-purple-200'
};

const categoryColors = {
  'Core': 'bg-red-50 text-red-700 border-red-200',
  'Networking': 'bg-blue-50 text-blue-700 border-blue-200',
  'Interface': 'bg-green-50 text-green-700 border-green-200',
  'ERC': 'bg-purple-50 text-purple-700 border-purple-200'
};

export default function EIPCard({ eip, showDescription = true }: EIPCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:border-gray-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Link
            to={`/eip/${eip.number}`}
            className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
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
            className="text-gray-400 hover:text-blue-600 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>

      <Link to={`/eip/${eip.number}`}>
        <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
          {eip.title}
        </h3>
      </Link>

      {showDescription && (
        <p className="text-gray-600 mb-4 line-clamp-3">
          {eip.description}
        </p>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500">
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
        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
          {eip.type}
        </span>
      </div>
    </div>
  );
}