import React, { useState, useMemo } from 'react';
import { Filter, SortDesc } from 'lucide-react';
import EIPCard from '../components/EIPCard';
import FilterSidebar from '../components/FilterSidebar';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useEIPs } from '../hooks/useEIPs';

export default function EIPListPage() {
  const { eips, loading, error, refetch } = useEIPs();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('number');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filters, setFilters] = useState({
    status: [] as string[],
    category: [] as string[],
    type: [] as string[]
  });

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType as keyof typeof prev].includes(value)
        ? prev[filterType as keyof typeof prev].filter(item => item !== value)
        : [...prev[filterType as keyof typeof prev], value]
    }));
  };

  const filteredAndSortedEIPs = useMemo(() => {
    let filtered = eips;

    // Apply filters
    if (filters.status.length > 0) {
      filtered = filtered.filter(eip => filters.status.includes(eip.status));
    }
    if (filters.category.length > 0) {
      filtered = filtered.filter(eip => eip.category && filters.category.includes(eip.category));
    }
    if (filters.type.length > 0) {
      filtered = filtered.filter(eip => filters.type.includes(eip.type));
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      let compareValue = 0;
      
      switch (sortBy) {
        case 'number':
          compareValue = a.number - b.number;
          break;
        case 'title':
          compareValue = a.title.localeCompare(b.title);
          break;
        case 'status':
          compareValue = a.status.localeCompare(b.status);
          break;
        case 'created':
          compareValue = new Date(a.created).getTime() - new Date(b.created).getTime();
          break;
        default:
          compareValue = 0;
      }

      return sortOrder === 'desc' ? -compareValue : compareValue;
    });
  }, [eips, filters, sortBy, sortOrder]);

  const activeFiltersCount = Object.values(filters).flat().length;

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="mb-12">
            <div className="h-10 bg-gray-200 rounded w-96 mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>
          <LoadingSpinner size="lg" text="Loading EIPs..." className="py-20" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <ErrorMessage 
            message={error} 
            onRetry={refetch}
            className="max-w-2xl mx-auto mt-20"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Ethereum Improvement Proposals</h1>
          <p className="text-xl text-gray-600">
            Showing {filteredAndSortedEIPs.length} of {eips.length} EIPs
            {eips.length > 0 && (
              <span className="ml-2 text-sm text-green-600">
                • Data synced from ethereum/EIPs repository
              </span>
            )}
          </p>
        </div>

        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center gap-3 px-6 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-5 w-5" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                >
                  <option value="number">EIP Number</option>
                  <option value="title">Title</option>
                  <option value="status">Status</option>
                  <option value="created">Created Date</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <SortDesc className={`h-5 w-5 transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {Object.entries(filters).map(([filterType, values]) =>
                  values.map(value => (
                    <span
                      key={`${filterType}-${value}`}
                      className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full"
                    >
                      {value}
                      <button
                        onClick={() => handleFilterChange(filterType, value)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))
                )}
                <button
                  onClick={() => setFilters({ status: [], category: [], type: [] })}
                  className="text-gray-500 hover:text-gray-700 underline"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* EIP Grid */}
            <div className="grid grid-cols-1 gap-8">
              {filteredAndSortedEIPs.map((eip) => (
                <EIPCard key={eip.number} eip={eip} />
              ))}
            </div>

            {filteredAndSortedEIPs.length === 0 && (
              <div className="text-center py-20">
                <div className="text-gray-400 text-6xl mb-6">📋</div>
                <h3 className="text-2xl font-medium text-gray-900 mb-4">No EIPs found</h3>
                <p className="text-gray-500 text-lg">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}