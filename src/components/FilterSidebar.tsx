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
    <div className="mb-8">
      <h3 className="font-semibold text-slate-100 mb-4 text-lg">{title}</h3>
      <div className="space-y-3">
        {options.map((option) => (
          <label key={option} className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selectedValues.includes(option)}
              onChange={() => onFilterChange(filterType, option)}
              className="rounded border-slate-600 bg-slate-900 text-blue-400 focus:ring-blue-500 w-5 h-5"
            />
            <span className="ml-3 text-slate-300">{option}</span>
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
        fixed top-0 left-0 h-full z-50 w-80 transform transition-transform duration-300 ease-in-out
        lg:relative lg:transform-none lg:translate-x-0 lg:w-64
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        filter-sidebar-dark
      `} style={{ backgroundColor: '#1e293b', borderRight: '1px solid #334155' }}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Filter className="h-6 w-6 text-slate-400" />
              <h2 className="text-xl font-semibold text-slate-100">Filters</h2>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 text-slate-400 hover:text-slate-200"
            >
              <X className="h-6 w-6" />
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