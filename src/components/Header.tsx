import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Book, TrendingUp, Users, MessageSquare } from 'lucide-react';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      onSearch?.(searchQuery.trim());
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Book className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">EIP Explorer</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Ethereum Standards Hub</p>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search EIPs, authors, or content..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </form>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/eips" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <Book className="h-4 w-4" />
              <span>Browse EIPs</span>
            </Link>
            <Link to="/analytics" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <TrendingUp className="h-4 w-4" />
              <span>Analytics</span>
            </Link>
            <Link to="/projects" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <Users className="h-4 w-4" />
              <span>Projects</span>
            </Link>
            <Link to="/discussions" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <MessageSquare className="h-4 w-4" />
              <span>Discussions</span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search EIPs..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </form>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 pt-4">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/eips"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Book className="h-4 w-4" />
                <span>Browse EIPs</span>
              </Link>
              <Link
                to="/analytics"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <TrendingUp className="h-4 w-4" />
                <span>Analytics</span>
              </Link>
              <Link
                to="/projects"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Users className="h-4 w-4" />
                <span>Projects</span>
              </Link>
              <Link
                to="/discussions"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageSquare className="h-4 w-4" />
                <span>Discussions</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}