import React from 'react';
import { Property } from '../types';
import { PropertyCard } from './PropertyCard';
import { Home, SearchX, ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyGridProps {
  properties: Property[];
  layout?: 'grid' | 'list';
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onResetFilters?: () => void;
  isLoading?: boolean;
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  layout = 'grid',
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onResetFilters,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden h-96">
            <div className="bg-slate-200 h-48 w-full" />
            <div className="p-5 space-y-3">
              <div className="h-6 bg-slate-200 rounded w-1/3" />
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-200 rounded w-1/2" />
              <div className="pt-4 border-t border-slate-100 flex gap-4">
                <div className="h-4 bg-slate-200 rounded w-1/4" />
                <div className="h-4 bg-slate-200 rounded w-1/4" />
                <div className="h-4 bg-slate-200 rounded w-1/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto my-8 shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-600 flex items-center justify-center mx-auto mb-4">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 font-serif mb-2">
          No matching properties found
        </h3>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          We couldn’t find any residences matching your current criteria. Try widening your price range, choosing another city, or resetting filters.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {layout === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} layout="grid" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} layout="list" />
          ))}
        </div>
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && onPageChange && (
        <div className="flex items-center justify-between pt-6 border-t border-slate-200">
          <button
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-9 h-9 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  currentPage === page
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
