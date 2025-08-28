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
    <div className="group bg-slate-800 rounded-lg border border-slate-700 p-6 hover-lift">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Link
            to={`/eip/${eip.number}`}
            className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors"
          >
            EIP-{eip.number}
          </Link>
          <div className="flex gap-2">
            <span className={`px-2 py-1 text-xs font-medium rounded border ${statusColors[eip.status]}`}>
              {eip.status}
            </span>
            {eip.category && (
              <span className={`px-2 py-1 text-xs font-medium rounded border ${categoryColors[eip.category]}`}>
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
            className="text-slate-400 hover:text-blue-400 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>

      <Link to={`/eip/${eip.number}`}>
        <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors leading-tight">
          {eip.title}
        </h3>
      </Link>

      {showDescription && (
        <p className="text-slate-400 mb-4 line-clamp-3 text-sm leading-relaxed">
          {eip.description}
        </p>
      )}

      <div className="flex items-center justify-between text-slate-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span className="text-xs">{eip.author[0]}{eip.author.length > 1 ? ` +${eip.author.length - 1}` : ''}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span className="text-xs">{formatDistanceToNow(new Date(eip.created), { addSuffix: true })}</span>
          </div>
        </div>
        <span className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300">
          {eip.type}
        </span>
      </div>
    </div>
  );
}