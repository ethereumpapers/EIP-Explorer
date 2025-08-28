import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Book, TrendingUp, Users, Sparkles } from 'lucide-react';

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
      <header className="bg-white/5 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src="/logo_eip_explorer.png" 
                alt="EIP Explorer Logo" 
                className="h-10 w-10 object-contain"
              />
              <div>
                <h1 className="text-xl font-semibold text-white">
                  EIP Explorer
                </h1>
                <p className="text-xs text-slate-400">
                  Ethereum Standards Hub
                </p>
              </div>
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search EIPs..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200"
                />
              </div>
            </form>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/eips" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-200 text-sm font-medium">
                <Book className="h-4 w-4" />
                <span>EIPs</span>
              </Link>
              <Link to="/analytics" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-200 text-sm font-medium">
                <TrendingUp className="h-4 w-4" />
                <span>Analytics</span>
              </Link>
              <Link to="/projects" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-200 text-sm font-medium">
                <Users className="h-4 w-4" />
                <span>Projects</span>
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search EIPs..."
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </form>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 border-t border-slate-800 pt-4">
              <nav className="flex flex-col gap-3">
                <Link
                  to="/eips"
                  className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors text-sm py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Book className="h-4 w-4" />
                  <span>EIPs</span>
                </Link>
                <Link
                  to="/analytics"
                  className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors text-sm py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Analytics</span>
                </Link>
                <Link
                  to="/projects"
                  className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors text-sm py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Users className="h-4 w-4" />
                  <span>Projects</span>
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>
  );
}