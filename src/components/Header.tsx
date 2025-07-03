import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Book, TrendingUp, Users, MessageSquare, LogIn, LogOut, User, Sparkles } from 'lucide-react';
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
            <Link to="/" className="flex items-center gap-4 group">
              <div className="relative">
                <img 
                  src="/logo_eip_explorer2.png" 
                  alt="EIP Explorer Logo" 
                  className="h-28 w-28 object-contain group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  EIP Explorer
                </h1>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Sparkles className="h-3 w-3 animate-pulse" />
                  Ethereum Standards Hub
                </p>
              </div>
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-12">
              <div className="relative w-full group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search EIPs, authors, or content..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all duration-300 hover:shadow-md"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-focus-within:opacity-10 transition-opacity pointer-events-none"></div>
              </div>
            </form>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/eips" className="group flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium text-lg relative">
                <Book className="h-5 w-5 group-hover:animate-bounce" />
                <span>Explore EIPs</span>
              </Link>
              <Link to="/analytics" className="group flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium text-lg relative">
                <TrendingUp className="h-5 w-5 group-hover:animate-pulse" />
                <span>Analytics</span>
              </Link>
              <Link to="/projects" className="group flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium text-lg relative">
                <Users className="h-5 w-5 group-hover:animate-bounce" />
                <span>Projects</span>
              </Link>
              <Link to="/discussions" className="group flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium text-lg relative">
                <MessageSquare className="h-5 w-5 group-hover:animate-pulse" />
                <span>Discussions</span>
              </Link>
              
              {/* Auth Section */}
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 group">
                    {user?.avatar && (
                      <Link to="/profile">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-200 group-hover:ring-blue-400 transition-all duration-300 cursor-pointer hover:scale-105"
                          title="View Profile"
                        />
                      </Link>
                    )}
                    <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">{user?.name}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors group"
                  >
                    <LogOut className="h-5 w-5 group-hover:animate-bounce" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleAuthClick('signin')}
                    className="group flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  >
                    <LogIn className="h-5 w-5 group-hover:animate-bounce" />
                    <span>Sign In</span>
                  </button>
                </div>
              )}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
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
            <div className="md:hidden pb-6 border-t border-gray-200 pt-6 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-4">
                <img src="/logo_eip_explorer2.png" alt="EIP Explorer Logo" className="h-24 w-24 object-contain" />
                <span className="text-xl font-bold text-gray-900">EIP Explorer</span>
              </div>
              <nav className="flex flex-col gap-4">
                <Link
                  to="/eips"
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors text-lg py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Book className="h-6 w-6" />
                  <span>Explore EIPs</span>
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
                        <Link to="/profile">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        </Link>
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
        initialMode="signin"
      />
    </>
  );
}