import React from 'react';
import { MessageSquare } from 'lucide-react';
import DiscussionSection from '../components/DiscussionSection';
import { mockDiscussions, mockEIPs } from '../data/mockData';

export default function DiscussionsPage() {
  const discussionsByEIP = mockDiscussions.reduce((acc, discussion) => {
    if (!acc[discussion.eipNumber]) {
      acc[discussion.eipNumber] = [];
    }
    acc[discussion.eipNumber].push(discussion);
    return acc;
  }, {} as Record<number, typeof mockDiscussions>);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Discussions</h1>
          <p className="text-gray-600">
            Join the conversation about EIP development and implementation
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{mockDiscussions.length}</div>
            <div className="text-sm text-gray-600">Total Discussions</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {Object.keys(discussionsByEIP).length}
            </div>
            <div className="text-sm text-gray-600">EIPs with Discussions</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {mockDiscussions.reduce((sum, d) => sum + d.replies.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Replies</div>
          </div>
        </div>

        {/* Discussions by EIP */}
        <div className="space-y-12">
          {Object.entries(discussionsByEIP).map(([eipNumber, discussions]) => {
            const eip = mockEIPs.find(e => e.number === parseInt(eipNumber));
            return (
              <div key={eipNumber} className="bg-white rounded-lg border border-gray-200 p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-blue-600 mb-2">
                    EIP-{eipNumber}: {eip?.title}
                  </h2>
                  <p className="text-gray-600">{eip?.description}</p>
                </div>
                <DiscussionSection discussions={discussions} eipNumber={parseInt(eipNumber)} />
              </div>
            );
          })}
        </div>

        {Object.keys(discussionsByEIP).length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">💬</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No discussions yet</h3>
            <p className="text-gray-500">
              Be the first to start a discussion about an EIP!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}