import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { FilterState, Property } from '../types';
import { SearchFilters } from '../components/SearchFilters';
import { PropertyGrid } from '../components/PropertyGrid';
import { MapPlaceholder } from '../components/MapPlaceholder';
import { Modal } from '../components/Modal';
import { 
  LayoutGrid, 
  List, 
  Map as MapIcon, 
  SlidersHorizontal, 
  X,
  ArrowUpDown,
  Search
} from 'lucide-react';

interface SearchPageProps {
  initialFilters?: Partial<FilterState>;
}

export const SearchPage: React.FC<SearchPageProps> = ({ initialFilters }) => {
  const { properties, currentRoute } = useApp();

  // Search keyword state
  const [keyword, setKeyword] = useState('');

  // Main filters state
  const defaultFilters: FilterState = {
    listingType: 'all',
    city: '',
    propertyType: 'all',
    minPrice: 0,
    maxPrice: 3000000,
    bedrooms: 'any',
    bathrooms: 'any',
    minArea: 0,
    parking: false,
    furnished: false,
    sortBy: 'newest'
  };

  const [filters, setFilters] = useState<FilterState>(() => {
    const routeFilters = (currentRoute as any).initialFilters || {};
    return {
      ...defaultFilters,
      ...initialFilters,
      ...routeFilters
    };
  });

  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [showMap, setShowMap] = useState<boolean>(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 6;

  const handleFilterChange = (updated: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
    setKeyword('');
    setCurrentPage(1);
  };

  // Filter and Sort properties
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // 1. Keyword search (title, address, district, city)
      if (keyword.trim()) {
        const query = keyword.toLowerCase();
        const matches = 
          p.title.toLowerCase().includes(query) ||
          p.address.toLowerCase().includes(query) ||
          p.district.toLowerCase().includes(query) ||
          p.city.toLowerCase().includes(query);
        if (!matches) return false;
      }

      // 2. Listing type
      if (filters.listingType !== 'all' && p.listingType !== filters.listingType) {
        return false;
      }

      // 3. City
      if (filters.city && p.city.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }

      // 4. Property type
      if (filters.propertyType !== 'all' && p.propertyType !== filters.propertyType) {
        return false;
      }

      // 5. Price
      if (filters.minPrice > 0 && p.price < filters.minPrice) return false;
      if (filters.maxPrice < 3000000 && p.price > filters.maxPrice) return false;

      // 6. Bedrooms
      if (filters.bedrooms !== 'any' && p.bedrooms < Number(filters.bedrooms)) return false;

      // 7. Bathrooms
      if (filters.bathrooms !== 'any' && p.bathrooms < Number(filters.bathrooms)) return false;

      // 8. Min Area
      if (filters.minArea > 0 && p.area < filters.minArea) return false;

      // 9. Parking
      if (filters.parking && !p.parking) return false;

      // 10. Furnished
      if (filters.furnished && !p.furnished) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'area-desc') return b.area - a.area;
      // Default: newest
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [properties, filters, keyword]);

  // Paginate
  const totalPages = Math.ceil(filteredProperties.length / pageSize) || 1;
  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProperties.slice(start, start + pageSize);
  }, [filteredProperties, currentPage, pageSize]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Breadcrumb & Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-bold font-serif text-slate-900 tracking-tight">
            {filters.city ? `${filters.city} Properties` : 'Prime European Residences'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse through {filteredProperties.length} verified apartments, penthouses, and villas.
          </p>
        </div>

        {/* Quick Search bar in header */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search city, district, or address..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-8 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-xs"
          />
          {keyword && (
            <button
              onClick={() => setKeyword('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Control Bar: Layout toggle, Map toggle, Sorting, Mobile filter button */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Active count and Mobile Filter Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter</span>
          </button>

          <span className="text-xs text-slate-600 font-medium">
            Found <strong className="text-slate-900">{filteredProperties.length}</strong> properties
          </span>
        </div>

        {/* Right Controls: Sort, Map Toggle, Grid / List */}
        <div className="flex items-center gap-2.5 ml-auto flex-wrap">
          
          {/* Sorting Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange({ sortBy: e.target.value as any })}
              className="bg-transparent text-slate-800 font-medium focus:outline-none cursor-pointer"
            >
              <option value="newest">Sort: Newest Listed</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="area-desc">Area: Largest First</option>
            </select>
          </div>

          {/* Map View Toggle */}
          <button
            onClick={() => setShowMap(!showMap)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              showMap
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>{showMap ? 'Hide Map' : 'Show Map'}</span>
          </button>

          {/* Grid vs List view */}
          <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setLayout('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                layout === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayout('list')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                layout === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-28">
            <SearchFilters
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleResetFilters}
              totalResults={filteredProperties.length}
            />
          </div>
        </div>

        {/* Listings and Map Area */}
        <div className="lg:col-span-3 space-y-8">
          {/* Interactive Map Visualizer */}
          {showMap && (
            <div className="transition-all animate-in fade-in duration-300">
              <MapPlaceholder
                properties={filteredProperties}
                heightClass="h-72 sm:h-80"
              />
            </div>
          )}

          {/* Property Cards Grid */}
          <PropertyGrid
            properties={paginatedProperties}
            layout={layout}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(p) => {
              setCurrentPage(p);
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
            onResetFilters={handleResetFilters}
          />
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <Modal
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        title="Filter Listings"
        subtitle="Narrow down according to your exact living requirements"
        maxWidth="lg"
      >
        <SearchFilters
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
          totalResults={filteredProperties.length}
        />
        <div className="pt-4 mt-4 border-t border-slate-100">
          <button
            onClick={() => setMobileFilterOpen(false)}
            className="w-full py-3 bg-slate-900 text-white font-bold text-sm rounded-xl hover:bg-amber-600 transition-colors"
          >
            Show {filteredProperties.length} Residences
          </button>
        </div>
      </Modal>

    </div>
  );
};
