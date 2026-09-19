import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/PropertyCard';
import { 
  Heart, 
  Trash2, 
  Scale, 
  ArrowRight, 
  Check, 
  X, 
  Layers, 
  Sparkles,
  MapPin
} from 'lucide-react';

export const FavoritesPage: React.FC = () => {
  const { 
    properties, 
    favorites, 
    toggleFavorite, 
    navigate,
    compareIds,
    addToCompare,
    removeFromCompare,
    clearCompare
  } = useApp();

  const [activeTab, setActiveTab] = useState<'saved' | 'compare'>('saved');

  const savedProperties = properties.filter((p) => favorites.includes(p.id));
  const comparedProperties = properties.filter((p) => compareIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-rose-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Heart className="w-4 h-4 fill-rose-600" />
            <span>Personal Portfolio</span>
          </div>
          <h1 className="text-3xl font-bold font-serif text-slate-900 tracking-tight">
            Saved Properties & Comparison
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your shortlisted residences and evaluate them side-by-side.
          </p>
        </div>

        {/* Tab switch: Saved vs Compare */}
        <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'saved'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${activeTab === 'saved' ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>Saved List ({savedProperties.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'compare'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-amber-600" />
            <span>Comparison Matrix ({comparedProperties.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: SAVED PROPERTIES */}
      {activeTab === 'saved' && (
        <div className="space-y-6">
          {savedProperties.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-xs">
              <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 text-rose-500 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-serif mb-2">
                No saved properties yet
              </h3>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                Click the heart icon on any residence to bookmark it for future review or side-by-side comparison.
              </p>
              <button
                onClick={() => navigate({ name: 'search' })}
                className="px-6 py-3 bg-slate-900 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                Explore Properties
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Showing {savedProperties.length} bookmarked residences</span>
                {savedProperties.length > 1 && (
                  <button
                    onClick={() => setActiveTab('compare')}
                    className="text-amber-700 font-bold hover:text-amber-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Compare All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProperties.map((prop) => (
                  <div key={prop.id} className="relative group">
                    <PropertyCard property={prop} layout="grid" />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* TAB 2: COMPARE PROPERTIES TABLE */}
      {activeTab === 'compare' && (
        <div className="space-y-6">
          {comparedProperties.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-xs">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-4">
                <Scale className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-serif mb-2">
                Comparison List is Empty
              </h3>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                Add up to 4 properties from your saved list or the search page to compare pricing, floor area, energy ratings, and luxury amenities.
              </p>
              <button
                onClick={() => setActiveTab('saved')}
                className="px-6 py-3 bg-slate-900 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                View Saved Properties
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  Comparing <strong>{comparedProperties.length}</strong> of maximum 4 properties.
                </p>
                <button
                  onClick={clearCompare}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Comparison</span>
                </button>
              </div>

              {/* Side-by-Side Comparison Matrix */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                  <tbody>
                    
                    {/* 1. Header / Photos */}
                    <tr className="border-b border-slate-200 bg-slate-50/70">
                      <td className="p-4 font-bold text-slate-900 w-44 uppercase tracking-wider text-[11px]">
                        Property
                      </td>
                      {comparedProperties.map((p) => (
                        <td key={p.id} className="p-4 w-64 align-top">
                          <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-2.5">
                            <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                            <button
                              onClick={() => removeFromCompare(p.id)}
                              className="absolute top-2 right-2 p-1 bg-white/90 hover:bg-white text-slate-700 hover:text-rose-600 rounded-full shadow-xs cursor-pointer"
                              title="Remove"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <h4 
                            onClick={() => navigate({ name: 'details', propertyId: p.id })}
                            className="font-bold text-slate-900 hover:text-amber-600 cursor-pointer line-clamp-1 text-sm mb-1"
                          >
                            {p.title}
                          </h4>
                          <span className="text-[11px] text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
                            <span>{p.city}, {p.district}</span>
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* 2. Price */}
                    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-4 font-semibold text-slate-500">Price</td>
                      {comparedProperties.map((p) => (
                        <td key={p.id} className="p-4 text-sm font-bold text-slate-900 font-serif">
                          €{new Intl.NumberFormat('de-DE').format(p.price)}
                          {p.listingType === 'rent' && <span className="text-xs font-normal text-slate-500">/mo</span>}
                        </td>
                      ))}
                    </tr>

                    {/* 3. Price per m² */}
                    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-4 font-semibold text-slate-500">Price / m²</td>
                      {comparedProperties.map((p) => (
                        <td key={p.id} className="p-4 font-medium text-slate-700">
                          €{Math.round(p.price / p.area).toLocaleString()} / m²
                        </td>
                      ))}
                    </tr>

                    {/* 4. Transaction Type */}
                    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-4 font-semibold text-slate-500">Type</td>
                      {comparedProperties.map((p) => (
                        <td key={p.id} className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
                            p.listingType === 'sale' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {p.listingType}
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* 5. Bedrooms & Baths */}
                    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-4 font-semibold text-slate-500">Beds / Baths</td>
                      {comparedProperties.map((p) => (
                        <td key={p.id} className="p-4 font-medium text-slate-700">
                          {p.bedrooms} Beds • {p.bathrooms} Baths
                        </td>
                      ))}
                    </tr>

                    {/* 6. Floor Area */}
                    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-4 font-semibold text-slate-500">Floor Area</td>
                      {comparedProperties.map((p) => (
                        <td key={p.id} className="p-4 font-medium text-slate-700">
                          {p.area} m²
                        </td>
                      ))}
                    </tr>

                    {/* 7. Construction Year */}
                    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-4 font-semibold text-slate-500">Year Built</td>
                      {comparedProperties.map((p) => (
                        <td key={p.id} className="p-4 font-medium text-slate-700">
                          {p.yearBuilt}
                        </td>
                      ))}
                    </tr>

                    {/* 8. Energy Efficiency */}
                    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-4 font-semibold text-slate-500">Energy Rating</td>
                      {comparedProperties.map((p) => (
                        <td key={p.id} className="p-4 font-bold text-emerald-600">
                          Class {p.energyRating}
                        </td>
                      ))}
                    </tr>

                    {/* 9. Parking */}
                    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-4 font-semibold text-slate-500">Parking</td>
                      {comparedProperties.map((p) => (
                        <td key={p.id} className="p-4">
                          {p.parking ? (
                            <span className="text-emerald-700 flex items-center gap-1 font-medium">
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Private Garage</span>
                            </span>
                          ) : (
                            <span className="text-slate-400">Street Zone</span>
                          )}
                        </td>
                      ))}
                    </tr>

                    {/* 10. Furnished */}
                    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-4 font-semibold text-slate-500">Furnished</td>
                      {comparedProperties.map((p) => (
                        <td key={p.id} className="p-4">
                          {p.furnished ? (
                            <span className="text-emerald-700 flex items-center gap-1 font-medium">
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Furnished</span>
                            </span>
                          ) : (
                            <span className="text-slate-400">Unfurnished</span>
                          )}
                        </td>
                      ))}
                    </tr>

                    {/* 11. Top Amenities */}
                    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-4 font-semibold text-slate-500">Amenities</td>
                      {comparedProperties.map((p) => (
                        <td key={p.id} className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {p.amenities.slice(0, 4).map((a) => (
                              <span key={a} className="bg-slate-100 px-2 py-0.5 rounded text-[10px] text-slate-700 font-medium">
                                {a}
                              </span>
                            ))}
                            {p.amenities.length > 4 && (
                              <span className="text-[10px] text-slate-500 self-center">
                                +{p.amenities.length - 4} more
                              </span>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* 12. Actions */}
                    <tr className="bg-slate-50/40">
                      <td className="p-4 font-bold text-slate-900">Action</td>
                      {comparedProperties.map((p) => (
                        <td key={p.id} className="p-4">
                          <button
                            onClick={() => navigate({ name: 'details', propertyId: p.id })}
                            className="w-full py-2 bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer text-center"
                          >
                            View Full Details
                          </button>
                        </td>
                      ))}
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
