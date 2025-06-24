import React from 'react';
import { ExternalLink, Calendar, Globe } from 'lucide-react';
import { NewsItem } from '../types/eip';
import { formatDistanceToNow } from 'date-fns';

interface NewsSectionProps {
  news: NewsItem[];
  eipNumber: number;
}

export default function NewsSection({ news, eipNumber }: NewsSectionProps) {
  const eipNews = news.filter(item => item.eipNumbers.includes(eipNumber));

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Globe className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Recent News & Updates</h3>
      </div>

      <div className="space-y-4">
        {eipNews.length > 0 ? (
          eipNews.map((item) => (
            <div key={item.id} className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors flex items-center space-x-1"
                  >
                    <span>{item.title}</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <p className="text-gray-600 mt-1">{item.summary}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span className="font-medium">{item.source}</span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true })}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Globe className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No recent news found for this EIP.</p>
          </div>
        )}
      </div>
    </div>
  );
}