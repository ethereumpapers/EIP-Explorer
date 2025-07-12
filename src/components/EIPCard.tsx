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
  'Draft': 'bg-yellow-900/30 text-yellow-300 border-yellow-500/50',
  'Review': 'bg-blue-900/30 text-blue-300 border-blue-500/50',
  'Last Call': 'bg-orange-900/30 text-orange-300 border-orange-500/50',
  'Final': 'bg-green-900/30 text-green-300 border-green-500/50',
  'Stagnant': 'bg-gray-900/30 text-gray-300 border-gray-500/50',
  'Withdrawn': 'bg-red-900/30 text-red-300 border-red-500/50',
  'Living': 'bg-purple-900/30 text-purple-300 border-purple-500/50'
};

const categoryColors = {
  'Core': 'bg-red-900/30 text-red-300 border-red-500/50',
  'Networking': 'bg-blue-900/30 text-blue-300 border-blue-500/50',
  'Interface': 'bg-green-900/30 text-green-300 border-green-500/50',
  'ERC': 'bg-purple-900/30 text-purple-300 border-purple-500/50',
  'Meta': 'bg-yellow-900/30 text-yellow-300 border-yellow-500/50',
  'Informational': 'bg-gray-900/30 text-gray-300 border-gray-500/50'
};

export default function EIPCard({ eip, showDescription = true }: EIPCardProps) {
  return (
    <div className="group bg-slate-800 rounded-xl border border-slate-700 p-8 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 hover:border-blue-500/50 transform hover:scale-105 relative overflow-hidden">
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link
              to={`/eip/${eip.number}`}
              className="text-3xl font-bold gradient-text hover:animate-pulse transition-all duration-300"
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
              className="text-slate-400 hover:text-blue-400 transition-colors group-hover:animate-bounce"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
        </div>

        <Link to={`/eip/${eip.number}`}>
          <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-blue-400 transition-colors leading-tight">
            {eip.title}
          </h3>
        </Link>

        {showDescription && (
          <p className="text-slate-400 mb-6 line-clamp-3 text-lg leading-relaxed group-hover:text-slate-300 transition-colors">
            {eip.description}
          </p>
        )}

        <div className="flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 group-hover:text-blue-400 transition-colors">
              <User className="h-5 w-5" />
              <span className="text-sm">{eip.author[0]}{eip.author.length > 1 ? ` +${eip.author.length - 1}` : ''}</span>
            </div>
            <div className="flex items-center gap-2 group-hover:text-purple-400 transition-colors">
              <Calendar className="h-5 w-5" />
              <span className="text-sm">{formatDistanceToNow(new Date(eip.created), { addSuffix: true })}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm bg-gradient-to-r from-slate-700 to-slate-600 px-3 py-1 rounded-full group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300 text-slate-300">
              {eip.type}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}