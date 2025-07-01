import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Book, TrendingUp, Users, MessageSquare, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import AuthModal from './AuthModal';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const navigate = useNavigate();
  const { user, isAuthenticated, signOut } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      onSearch?.(searchQuery.trim());
    }
  };

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-4">
              <div className="bg-blue-600 p-3 rounded-xl">
                <Book className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">EIP Explorer</h1>
                <p className="text-sm text-gray-500">Ethereum Standards Hub</p>
              </div>
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-12">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search EIPs, authors, or content..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
            </form>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/eips" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-medium text-lg">
                <Book className="h-5 w-5" />
                <span>Browse EIPs</span>
              </Link>
              <Link to="/analytics" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-medium text-lg">
                <TrendingUp className="h-5 w-5" />
                <span>Analytics</span>
              </Link>
              <Link to="/projects" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-medium text-lg">
                <Users className="h-5 w-5" />
                <span>Projects</span>
              </Link>
              <Link to="/discussions" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-medium text-lg">
                <MessageSquare className="h-5 w-5" />
                <span>Discussions</span>
              </Link>
              
              {/* Auth Section */}
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    {user?.avatar && (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <span className="font-medium text-gray-700">{user?.name}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleAuthClick('signin')}
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  >
                    <LogIn className="h-5 w-5" />
                    <span>Sign In</span>
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="md:hidden pb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search EIPs..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </form>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-6 border-t border-gray-200 pt-6">
              <nav className="flex flex-col gap-4">
                <Link
                  to="/eips"
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors text-lg py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Book className="h-6 w-6" />
                  <span>Browse EIPs</span>
                </Link>
                <Link
                  to="/analytics"
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors text-lg py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <TrendingUp className="h-6 w-6" />
                  <span>Analytics</span>
                </Link>
                <Link
                  to="/projects"
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors text-lg py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Users className="h-6 w-6" />
                  <span>Projects</span>
                </Link>
                <Link
                  to="/discussions"
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors text-lg py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MessageSquare className="h-6 w-6" />
                  <span>Discussions</span>
                </Link>
                
                {/* Mobile Auth */}
                {isAuthenticated ? (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      {user?.avatar && (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                      <span className="font-medium text-gray-700">{user?.name}</span>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 text-gray-700 hover:text-red-600 transition-colors text-lg py-2"
                    >
                      <LogOut className="h-6 w-6" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <button
                      onClick={() => handleAuthClick('signin')}
                      className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors w-full text-lg py-2"
                    >
                      <LogIn className="h-6 w-6" />
                      <span>Sign In</span>
                    </button>
                    <button
                      onClick={() => handleAuthClick('signup')}
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 w-full font-medium"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
}