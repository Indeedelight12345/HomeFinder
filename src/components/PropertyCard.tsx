import React from 'react';
import { Property } from '../types';
import { useApp } from '../context/AppContext';
import { 
  Bed, 
  Bath, 
  Maximize2, 
  MapPin, 
  Heart, 
  ArrowUpRight, 
  Sparkles,
  Check
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  layout?: 'grid' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  layout = 'grid' 
}) => {
  const { 
    isFavorite, 
    toggleFavorite, 
    navigate, 
    recordView,
    compareIds,
    addToCompare,
    removeFromCompare
  } = useApp();

  const favorite = isFavorite(property.id);
  const inCompare = compareIds.includes(property.id);

  const handleCardClick = () => {
    recordView(property.id);
    navigate({ name: 'details', propertyId: property.id });
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(property.id);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(property.id);
    } else {
      addToCompare(property.id);
    }
  };

  const formattedPrice = new Intl.NumberFormat('de-DE').format(property.price);

  if (layout === 'list') {
    return (
      <div 
        id={`property-card-${property.id}`}
        onClick={handleCardClick}
        className="group bg-white rounded-2xl border border-slate-200/90 hover:border-amber-500/40 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col md:flex-row cursor-pointer"
      >
        {/* Image */}
        <div className="relative md:w-80 h-56 md:h-auto shrink-0 overflow-hidden bg-slate-100">
          <img
            src={property.images[0]}
            alt={property.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent md:hidden" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
              property.listingType === 'sale'
                ? 'bg-amber-600 text-white'
                : 'bg-emerald-600 text-white'
            }`}>
              {property.listingType === 'sale' ? 'For Sale' : 'For Rent'}
            </span>
            {property.featured && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-900/80 backdrop-blur-md text-amber-300 flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3 h-3" />
                Featured
              </span>
            )}
          </div>

          {/* Favorite button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-rose-600 shadow-md flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-4 h-4 transition-colors ${favorite ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-baseline justify-between gap-4 mb-2">
              <span className="text-2xl font-bold text-slate-900 font-serif">
                €{formattedPrice}
                {property.listingType === 'rent' && (
                  <span className="text-xs font-normal text-slate-500 font-sans ml-1">/month</span>
                )}
              </span>
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-md">
                {property.propertyType}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1 mb-1.5">
              {property.title}
            </h3>

            <p className="text-sm text-slate-500 flex items-center gap-1.5 mb-3">
              <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="line-clamp-1">{property.address}, {property.district}, {property.city}</span>
            </p>

            <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
              {property.description}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-1.5" title={`${property.bedrooms} Bedrooms`}>
                <Bed className="w-4 h-4 text-slate-400" />
                <span>{property.bedrooms} Beds</span>
              </div>
              <div className="flex items-center gap-1.5" title={`${property.bathrooms} Bathrooms`}>
                <Bath className="w-4 h-4 text-slate-400" />
                <span>{property.bathrooms} Baths</span>
              </div>
              <div className="flex items-center gap-1.5" title={`${property.area} Square Meters`}>
                <Maximize2 className="w-4 h-4 text-slate-400" />
                <span>{property.area} m²</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCompareClick}
                className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                  inCompare
                    ? 'border-amber-500 bg-amber-50 text-amber-800'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
                title="Add to comparison table"
              >
                {inCompare ? <Check className="w-3 h-3 text-amber-600" /> : null}
                <span>{inCompare ? 'Comparing' : 'Compare'}</span>
              </button>

              <button
                onClick={handleCardClick}
                className="px-3.5 py-1.5 bg-slate-900 group-hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid Layout
  return (
    <div 
      id={`property-card-${property.id}`}
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-amber-500/40 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
    >
      {/* Photo Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={property.images[0]}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm ${
            property.listingType === 'sale'
              ? 'bg-amber-600 text-white'
              : 'bg-emerald-600 text-white'
          }`}>
            {property.listingType === 'sale' ? 'For Sale' : 'For Rent'}
          </span>
          {property.featured && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-900/80 backdrop-blur-md text-amber-300 flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          )}
        </div>

        {/* Action icons top right */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <button
            onClick={handleFavoriteClick}
            className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-rose-600 shadow-md flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-4 h-4 transition-colors ${favorite ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Price tag on image bottom left */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <div>
            <span className="text-xs font-medium text-slate-200 block uppercase tracking-wider">
              {property.city}
            </span>
            <span className="text-xl sm:text-2xl font-bold font-serif text-white tracking-tight drop-shadow-sm">
              €{formattedPrice}
              {property.listingType === 'rent' && (
                <span className="text-xs font-normal text-slate-200 font-sans ml-1">/mo</span>
              )}
            </span>
          </div>
          <span className="text-[11px] font-medium bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md text-white capitalize">
            {property.propertyType}
          </span>
        </div>
      </div>

      {/* Details Box */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1 mb-1">
            {property.title}
          </h3>

          <p className="text-xs text-slate-500 flex items-center gap-1.5 mb-3">
            <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="line-clamp-1">{property.address}, {property.district}</span>
          </p>
        </div>

        <div>
          {/* Key Specs */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-600">
            <div className="flex items-center gap-1" title={`${property.bedrooms} Bedrooms`}>
              <Bed className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1" title={`${property.bathrooms} Bathrooms`}>
              <Bath className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1" title={`${property.area} Square Meters`}>
              <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.area} m²</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={handleCompareClick}
              className={`text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                inCompare ? 'text-amber-600 font-bold' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              {inCompare ? <Check className="w-3 h-3 text-amber-600" /> : '+'}
              <span>{inCompare ? 'Comparing' : 'Compare'}</span>
            </button>

            <span className="text-xs font-semibold text-slate-800 group-hover:text-amber-600 transition-colors flex items-center gap-1">
              <span>View Property</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
