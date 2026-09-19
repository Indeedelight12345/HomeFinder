import React from 'react';
import { FilterState, PropertyType } from '../types';
import { 
  RotateCcw, 
  MapPin, 
  Building, 
  SlidersHorizontal,
  Euro,
  Bed,
  Bath,
  Maximize2
} from 'lucide-react';

interface SearchFiltersProps {
  filters: FilterState;
  onChange: (updated: Partial<FilterState>) => void;
  onReset: () => void;
  totalResults?: number;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onChange,
  onReset,
  totalResults
}) => {
  const cities = ['All Cities', 'Budapest', 'Vienna', 'Amsterdam', 'Prague', 'Warsaw'];
  const propertyTypes: { label: string; value: 'all' | PropertyType }[] = [
    { label: 'All Property Types', value: 'all' },
    { label: 'Apartments', value: 'apartment' },
    { label: 'Houses & Mansions', value: 'house' },
    { label: 'Villas', value: 'villa' },
    { label: 'Penthouses', value: 'penthouse' },
    { label: 'Lofts & Studios', value: 'loft' }
  ];

  const bedroomOptions = ['any', 1, 2, 3, 4];
  const bathroomOptions = ['any', 1, 2, 3];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 lg:p-6 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-slate-900 font-serif text-lg">Filters</h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-slate-500 hover:text-amber-600 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Listing Type: Buy vs Rent */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
          Transaction Type
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => onChange({ listingType: 'all' })}
            className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              filters.listingType === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => onChange({ listingType: 'sale' })}
            className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              filters.listingType === 'sale'
                ? 'bg-white text-amber-600 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Buy
          </button>
          <button
            type="button"
            onClick={() => onChange({ listingType: 'rent' })}
            className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              filters.listingType === 'rent'
                ? 'bg-white text-emerald-600 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Rent
          </button>
        </div>
      </div>

      {/* Location (City) */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-amber-600" />
          <span>Market / City</span>
        </label>
        <select
          value={filters.city}
          onChange={(e) => onChange({ city: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer"
        >
          {cities.map((c) => (
            <option key={c} value={c === 'All Cities' ? '' : c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Property Type */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2 flex items-center gap-1.5">
          <Building className="w-3.5 h-3.5 text-amber-600" />
          <span>Property Type</span>
        </label>
        <select
          value={filters.propertyType}
          onChange={(e) => onChange({ propertyType: e.target.value as any })}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer"
        >
          {propertyTypes.map((pt) => (
            <option key={pt.value} value={pt.value}>
              {pt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
            <Euro className="w-3.5 h-3.5 text-amber-600" />
            <span>Price Range</span>
          </label>
          <span className="text-xs font-semibold text-slate-700">
            {filters.minPrice > 0 ? `€${filters.minPrice.toLocaleString()}` : '€0'} – {filters.maxPrice < 3000000 ? `€${filters.maxPrice.toLocaleString()}` : 'Any'}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[11px] text-slate-600 block mb-1">Min (€)</span>
            <input
              type="number"
              min="0"
              step="50000"
              value={filters.minPrice || ''}
              onChange={(e) => onChange({ minPrice: Number(e.target.value) || 0 })}
              placeholder="Min"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <span className="text-[11px] text-slate-600 block mb-1">Max (€)</span>
            <input
              type="number"
              min="0"
              step="50000"
              value={filters.maxPrice >= 3000000 ? '' : filters.maxPrice}
              onChange={(e) => onChange({ maxPrice: Number(e.target.value) || 3000000 })}
              placeholder="No Max"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2 flex items-center gap-1.5">
          <Bed className="w-3.5 h-3.5 text-amber-600" />
          <span>Bedrooms</span>
        </label>
        <div className="grid grid-cols-5 gap-1">
          {bedroomOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange({ bedrooms: opt as any })}
              className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                filters.bedrooms === opt
                  ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {opt === 'any' ? 'Any' : `${opt}+`}
            </button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2 flex items-center gap-1.5">
          <Bath className="w-3.5 h-3.5 text-amber-600" />
          <span>Bathrooms</span>
        </label>
        <div className="grid grid-cols-4 gap-1">
          {bathroomOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange({ bathrooms: opt as any })}
              className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                filters.bathrooms === opt
                  ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {opt === 'any' ? 'Any' : `${opt}+`}
            </button>
          ))}
        </div>
      </div>

      {/* Minimum Area */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Min. Floor Area</span>
          </label>
          <span className="text-xs font-semibold text-slate-700">
            {filters.minArea > 0 ? `${filters.minArea} m²` : 'Any'}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="350"
          step="10"
          value={filters.minArea}
          onChange={(e) => onChange({ minArea: Number(e.target.value) })}
          className="w-full accent-amber-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-600 mt-1">
          <span>0 m²</span>
          <span>150 m²</span>
          <span>350+ m²</span>
        </div>
      </div>

      {/* Features: Parking & Furnished */}
      <div className="pt-2 border-t border-slate-100 space-y-2.5">
        <label className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.parking}
            onChange={(e) => onChange({ parking: e.target.checked })}
            className="w-4 h-4 rounded text-amber-600 accent-amber-600 border-slate-300 focus:ring-amber-500"
          />
          <span>Garage / Dedicated Parking</span>
        </label>

        <label className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.furnished}
            onChange={(e) => onChange({ furnished: e.target.checked })}
            className="w-4 h-4 rounded text-amber-600 accent-amber-600 border-slate-300 focus:ring-amber-500"
          />
          <span>Furnished / Ready to Move</span>
        </label>
      </div>

      {totalResults !== undefined && (
        <div className="pt-2 border-t border-slate-100 text-center">
          <span className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-900">{totalResults}</strong> matching residences
          </span>
        </div>
      )}
    </div>
  );
};
