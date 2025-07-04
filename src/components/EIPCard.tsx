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
  'ERC': 'bg-purple-50 text-purple-700 border-purple-200',
  'Meta': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  'Informational': 'bg-gray-50 text-gray-700 border-gray-200'
};

export default function EIPCard({ eip, showDescription = true }: EIPCardProps) {
  return (
    <div className="group bg-white rounded-xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 hover:border-blue-300 transform hover:scale-105 relative overflow-hidden">
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link
              to={`/eip/${eip.number}`}
              className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-300 group-hover:animate-pulse"
            >
              EIP-{eip.number}
            </Link>
            <div className="flex gap-2">
              <span className={`px-3 py-1 text-sm font-medium rounded-full border transition-all duration-300 group-hover:scale-105 ${statusColors[eip.status]}`}>
                {eip.status}
              </span>
              {eip.category && (
                <span className={`px-3 py-1 text-sm font-medium rounded-full border transition-all duration-300 group-hover:scale-105 ${categoryColors[eip.category]}`}>
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
              className="text-gray-400 hover:text-blue-600 transition-colors group-hover:animate-bounce"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
        </div>

        <Link to={`/eip/${eip.number}`}>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
            {eip.title}
          </h3>
        </Link>

        {showDescription && (
          <p className="text-gray-600 mb-6 line-clamp-3 text-lg leading-relaxed group-hover:text-gray-700 transition-colors">
            {eip.description}
          </p>
        )}

        <div className="flex items-center justify-between text-gray-500">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 group-hover:text-blue-600 transition-colors">
              <User className="h-5 w-5" />
              <span className="text-sm">{eip.author[0]}{eip.author.length > 1 ? ` +${eip.author.length - 1}` : ''}</span>
            </div>
            <div className="flex items-center gap-2 group-hover:text-purple-600 transition-colors">
              <Calendar className="h-5 w-5" />
              <span className="text-sm">{formatDistanceToNow(new Date(eip.created), { addSuffix: true })}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm bg-gradient-to-r from-gray-100 to-gray-200 px-3 py-1 rounded-full group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-300">
              {eip.type}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}