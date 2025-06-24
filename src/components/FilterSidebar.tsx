import React from 'react';
import { Filter, X } from 'lucide-react';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    status: string[];
    category: string[];
    type: string[];
  };
  onFilterChange: (filterType: string, value: string) => void;
}

const statusOptions = ['Draft', 'Review', 'Last Call', 'Final', 'Stagnant', 'Withdrawn', 'Living'];
const categoryOptions = ['Core', 'Networking', 'Interface', 'ERC'];
const typeOptions = ['Standards Track', 'Meta', 'Informational'];

export default function FilterSidebar({ isOpen, onClose, filters, onFilterChange }: FilterSidebarProps) {
  const FilterSection = ({ title, options, filterType, selectedValues }: {
    title: string;
    options: string[];
    filterType: string;
    selectedValues: string[];
  }) => (
    <div className="mb-6">
      <h3 className="font-semibold text-gray-900 mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedValues.includes(option)}
              onChange={() => onFilterChange(filterType, option)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 w-80 transform transition-transform duration-300 ease-in-out
        lg:relative lg:transform-none lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="overflow-y-auto">
            <FilterSection
              title="Status"
              options={statusOptions}
              filterType="status"
              selectedValues={filters.status}
            />
            <FilterSection
              title="Category"
              options={categoryOptions}
              filterType="category"
              selectedValues={filters.category}
            />
            <FilterSection
              title="Type"
              options={typeOptions}
              filterType="type"
              selectedValues={filters.type}
            />
          </div>
        </div>
      </div>
    </>
  );
}