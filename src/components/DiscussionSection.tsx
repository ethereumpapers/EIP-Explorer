import React, { useState } from 'react';
import { MessageSquare, Reply, User, Clock, Lock } from 'lucide-react';
import { Discussion } from '../types/eip';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../hooks/useAuth';
import AuthModal from './AuthModal';

interface DiscussionSectionProps {
  discussions: Discussion[];
  eipNumber: number;
}

export default function DiscussionSection({ discussions, eipNumber }: DiscussionSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    
    // Handle comment submission
    console.log('New comment:', newComment);
    setNewComment('');
  };

  const handleReplyClick = (discussionId: string) => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    setReplyTo(replyTo === discussionId ? null : discussionId);
  };

  const DiscussionItem = ({ discussion, isReply = false }: { discussion: Discussion; isReply?: boolean }) => (
    <div className={`${isReply ? 'ml-8 mt-4' : 'mb-6'}`}>
      <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="font-medium text-gray-900">{discussion.author}</span>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                <span>{formatDistanceToNow(new Date(discussion.timestamp), { addSuffix: true })}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => handleReplyClick(discussion.id)}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            <Reply className="h-4 w-4" />
            <span>Reply</span>
          </button>
        </div>
        <p className="text-gray-700 leading-relaxed">{discussion.content}</p>
        
        {replyTo === discussion.id && isAuthenticated && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <form onSubmit={handleSubmitComment}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your reply..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  type="button"
                  onClick={() => setReplyTo(null)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm rounded-lg hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Reply
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      
      {discussion.replies.map((reply) => (
        <DiscussionItem key={reply.id} discussion={reply} isReply={true} />
      ))}
    </div>
  );

  const eipDiscussions = discussions.filter(d => d.eipNumber === eipNumber);

  return (
    <>
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Community Discussion</h3>
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm">
              {eipDiscussions.length}
            </span>
          </div>
        </div>

        {/* New Comment Form */}
        <form onSubmit={handleSubmitComment} className="mb-8">
          {!isAuthenticated && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 flex items-center space-x-3">
              <Lock className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-blue-800 font-medium">Join the discussion</p>
                <p className="text-blue-600 text-sm">Sign in to share your thoughts and engage with the community</p>
              </div>
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
            </div>
          )}
          
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={isAuthenticated ? "Share your thoughts on this EIP..." : "Sign in to join the discussion..."}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
            disabled={!isAuthenticated}
          />
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              disabled={!newComment.trim() || !isAuthenticated}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Post Comment
            </button>
          </div>
        </form>

        {/* Discussions */}
        <div className="space-y-6">
          {eipDiscussions.length > 0 ? (
            eipDiscussions.map((discussion) => (
              <DiscussionItem key={discussion.id} discussion={discussion} />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No discussions yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="signin"
      />
    </>
  );
}