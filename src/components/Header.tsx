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
      <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img 
                  src="/logo_eip_explorer.png" 
                  alt="EIP Explorer Logo" 
                  className="h-16 w-16 object-contain group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                  EIP Explorer
                </h1>
                <p className="text-sm text-slate-400 flex items-center gap-1 -mt-1">
                  <Sparkles className="h-3 w-3 animate-pulse" />
                  Ethereum Standards Hub
                </p>
              </div>
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-12">
              <div className="relative w-full group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search EIPs, authors, or content..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-600 text-white placeholder-slate-400 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-all duration-300 hover:shadow-md"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-focus-within:opacity-10 transition-opacity pointer-events-none"></div>
              </div>
            </form>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/eips" className="group flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-all duration-300 font-medium text-lg relative">
                <Book className="h-5 w-5 group-hover:animate-bounce" />
                <span>Explore EIPs</span>
              </Link>
              <Link to="/analytics" className="group flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-all duration-300 font-medium text-lg relative">
                <TrendingUp className="h-5 w-5 group-hover:animate-pulse" />
                <span>Analytics</span>
              </Link>
              <Link to="/projects" className="group flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-all duration-300 font-medium text-lg relative">
                <Users className="h-5 w-5 group-hover:animate-bounce" />
                <span>Projects</span>
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="md:hidden pb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search EIPs..."
                className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-600 text-white placeholder-slate-400 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </form>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-6 border-t border-slate-700 pt-6 animate-fade-in-up">
              <nav className="flex flex-col gap-4">
                <Link
                  to="/eips"
                  className="flex items-center gap-3 text-slate-300 hover:text-blue-400 transition-colors text-lg py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Book className="h-6 w-6" />
                  <span>Explore EIPs</span>
                </Link>
                <Link
                  to="/analytics"
                  className="flex items-center gap-3 text-slate-300 hover:text-blue-400 transition-colors text-lg py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <TrendingUp className="h-6 w-6" />
                  <span>Analytics</span>
                </Link>
                <Link
                  to="/projects"
                  className="flex items-center gap-3 text-slate-300 hover:text-blue-400 transition-colors text-lg py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Users className="h-6 w-6" />
                  <span>Projects</span>
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>
  );
}