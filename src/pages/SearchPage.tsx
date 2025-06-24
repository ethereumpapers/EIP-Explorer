import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import EIPCard from '../components/EIPCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useEIPs } from '../hooks/useEIPs';
import { eipService } from '../services/eipService';

export default function SearchPage() {
  const { eips, loading: eipsLoading, error: eipsError } = useEIPs();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState(eips);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const searchQuery = searchParams.get('q') || '';
    setQuery(searchQuery);
    
    const performSearch = async () => {
      if (searchQuery.trim() && eips.length > 0) {
        setSearching(true);
        try {
          const searchResults = await eipService.searchEIPs(searchQuery, eips);
          setResults(searchResults);
        } catch (error) {
          console.error('Search error:', error);
          setResults([]);
        } finally {
          setSearching(false);
        }
      } else {
        setResults(eips);
      }
    };

    performSearch();
  }, [searchParams, eips]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  if (eipsLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingSpinner size="lg" text="Loading EIPs..." className="py-20" />
        </div>
      </div>
    );
  }

  if (eipsError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorMessage message={eipsError} className="max-w-2xl mx-auto mt-20" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Search EIPs</h1>
          
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, author, content, or EIP number..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
              <button
                type="submit"
                disabled={searching}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {searching ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>

        {/* Search Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            {query ? (
              <>
                Showing {results.length} results for "<span className="font-medium">{query}</span>"
                {searching && <span className="ml-2 text-blue-600">• Searching...</span>}
              </>
            ) : (
              <>Showing all {results.length} EIPs</>
            )}
          </p>
        </div>

        {/* Loading State */}
        {searching && (
          <div className="flex justify-center py-8">
            <LoadingSpinner text="Searching EIPs..." />
          </div>
        )}

        {/* Results Grid */}
        {!searching && (
          <div className="grid grid-cols-1 gap-6">
            {results.map((eip) => (
              <EIPCard key={eip.number} eip={eip} />
            ))}
          </div>
        )}

        {/* No Results */}
        {!searching && results.length === 0 && query && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-500">
              No EIPs match your search for "<span className="font-medium">{query}</span>".
            </p>
            <p className="text-gray-500 mt-2">
              Try different keywords or browse all EIPs.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}