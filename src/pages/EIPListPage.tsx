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
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-96 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>
          <LoadingSpinner size="lg" text="Loading EIPs from GitHub..." className="py-20" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ethereum Improvement Proposals</h1>
          <p className="text-gray-600">
            Showing {filteredAndSortedEIPs.length} of {eips.length} EIPs
            {eips.length > 0 && (
              <span className="ml-2 text-sm text-green-600">
                • Data synced from ethereum/EIPs repository
              </span>
            )}
          </p>
        </div>

        <div className="flex">
          {/* Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          {/* Main Content */}
          <div className="flex-1 lg:ml-8">
            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="number">EIP Number</option>
                  <option value="title">Title</option>
                  <option value="status">Status</option>
                  <option value="created">Created Date</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <SortDesc className={`h-4 w-4 transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {Object.entries(filters).map(([filterType, values]) =>
                  values.map(value => (
                    <span
                      key={`${filterType}-${value}`}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {value}
                      <button
                        onClick={() => handleFilterChange(filterType, value)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))
                )}
                <button
                  onClick={() => setFilters({ status: [], category: [], type: [] })}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* EIP Grid */}
            <div className="grid grid-cols-1 gap-6">
              {filteredAndSortedEIPs.map((eip) => (
                <EIPCard key={eip.number} eip={eip} />
              ))}
            </div>

            {filteredAndSortedEIPs.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📋</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No EIPs found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}