import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyGallery } from '../components/PropertyGallery';
import { ContactForm } from '../components/ContactForm';
import { ScheduleViewingModal } from '../components/ScheduleViewingModal';
import { PropertyCard } from '../components/PropertyCard';
import { MapPlaceholder } from '../components/MapPlaceholder';
import { 
  Bed, 
  Bath, 
  Maximize2, 
  MapPin, 
  Heart, 
  Calendar, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  Share2, 
  ArrowLeft,
  Zap,
  Clock,
  Car,
  CheckCircle2,
  Train,
  GraduationCap,
  ShoppingBag,
  Layers
} from 'lucide-react';

interface PropertyDetailsPageProps {
  propertyId: string;
}

export const PropertyDetailsPage: React.FC<PropertyDetailsPageProps> = ({ propertyId }) => {
  const { 
    properties, 
    agents, 
    isFavorite, 
    toggleFavorite, 
    navigate,
    compareIds,
    addToCompare,
    removeFromCompare,
    addToast
  } = useApp();

  const [viewingModalOpen, setViewingModalOpen] = useState(false);
  const [activeFloorTab, setActiveFloorTab] = useState<'level1' | 'level2'>('level1');

  const property = properties.find((p) => p.id === propertyId);

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold font-serif text-slate-900 mb-2">
          Property Not Found
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          The requested listing may have been sold, archived, or the link is expired.
        </p>
        <button
          onClick={() => navigate({ name: 'search' })}
          className="px-5 py-2.5 bg-slate-900 text-white font-semibold text-sm rounded-xl hover:bg-amber-600 transition-colors"
        >
          Return to All Listings
        </button>
      </div>
    );
  }

  const agent = agents.find((a) => a.id === property.agentId) || agents[0];
  const favorite = isFavorite(property.id);
  const inCompare = compareIds.includes(property.id);

  // Similar properties in same city or same type
  const similarProperties = properties
    .filter((p) => p.id !== property.id && (p.city === property.city || p.propertyType === property.propertyType))
    .slice(0, 3);

  const formattedPrice = new Intl.NumberFormat('de-DE').format(property.price);
  const pricePerSqm = Math.round(property.price / property.area);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast('Link Copied', 'Property link has been copied to your clipboard.', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top Navigation Bar & Action Buttons */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => navigate({ name: 'search' })}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Listings</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            title="Share Property Link"
            aria-label="Share property link"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Compare Button */}
          <button
            onClick={() => inCompare ? removeFromCompare(property.id) : addToCompare(property.id)}
            className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              inCompare
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {inCompare && <Check className="w-3.5 h-3.5 text-amber-600" />}
            <span>{inCompare ? 'In Comparison' : 'Add to Compare'}</span>
          </button>

          {/* Favorite Button */}
          <button
            onClick={() => toggleFavorite(property.id)}
            className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
              favorite
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50/50'
            }`}
            title="Save Property"
            aria-label="Save to favorites"
          >
            <Heart className={`w-4 h-4 ${favorite ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Title, Badges & Price Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              property.listingType === 'sale'
                ? 'bg-amber-600 text-white'
                : 'bg-emerald-600 text-white'
            }`}>
              {property.listingType === 'sale' ? 'For Sale' : 'For Rent'}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 capitalize">
              {property.propertyType}
            </span>
            {property.featured && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Featured Listing
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif text-slate-900 tracking-tight leading-tight">
            {property.title}
          </h1>

          <p className="text-sm text-slate-500 flex items-center gap-1.5 pt-1">
            <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{property.address}, {property.district}, {property.zipCode} {property.city}</span>
          </p>
        </div>

        {/* Pricing Block */}
        <div className="lg:text-right shrink-0">
          <span className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 tracking-tight block">
            €{formattedPrice}
            {property.listingType === 'rent' && (
              <span className="text-sm font-normal text-slate-500 font-sans ml-1">/ month</span>
            )}
          </span>
          <span className="text-xs text-slate-500 block mt-1">
            Approx. €{pricePerSqm.toLocaleString()} / m² • Reference: HF-{property.id.replace('prop-', '')}
          </span>
        </div>
      </div>

      {/* 1. LARGE IMAGE GALLERY */}
      <PropertyGallery images={property.images} title={property.title} />

      {/* 2. MAIN DETAILS GRID (2 COLS: Specs + Sidebar Contact) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left 2 Cols: Key Specs, Description, Amenities, Floor Plan, Location */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Key Metric Highlights Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <Bed className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider block">Bedrooms</span>
                <span className="text-base font-bold text-slate-900">{property.bedrooms} Beds</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <Bath className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider block">Bathrooms</span>
                <span className="text-base font-bold text-slate-900">{property.bathrooms} Baths</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <Maximize2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider block">Floor Area</span>
                <span className="text-base font-bold text-slate-900">{property.area} m²</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider block">Energy Class</span>
                <span className="text-base font-bold text-emerald-600">{property.energyRating}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
            <h3 className="text-xl font-bold font-serif text-slate-900">
              About This Residence
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-light whitespace-pre-line">
              {property.description}
            </p>

            {/* Quick architectural metadata table */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 text-xs">
              <div>
                <span className="text-slate-500 block">Year of Construction:</span>
                <span className="font-semibold text-slate-900">{property.yearBuilt}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Parking Accommodations:</span>
                <span className="font-semibold text-slate-900">
                  {property.parking ? 'Dedicated Private Garage' : 'Street Zone Permit'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Furnishing Status:</span>
                <span className="font-semibold text-slate-900">
                  {property.furnished ? 'Fully Furnished Designer Decor' : 'Unfurnished / Bare Shell'}
                </span>
              </div>
            </div>
          </div>

          {/* Amenities & Features */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h3 className="text-xl font-bold font-serif text-slate-900 mb-5">
              Amenities & Specifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-medium text-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. FLOOR PLAN SECTION */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold font-serif text-slate-900">
                  Architectural Floor Plan
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Detailed architectural blueprint and room dimensional breakdown.
                </p>
              </div>

              <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs">
                <button
                  type="button"
                  onClick={() => setActiveFloorTab('level1')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                    activeFloorTab === 'level1' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Main Level
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFloorTab('level2')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                    activeFloorTab === 'level2' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Terrace / Upper
                </button>
              </div>
            </div>

            {/* Visual Floor Plan Representation */}
            <div className="relative aspect-[16/9] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-6 text-center text-white">
              <img
                src={property.floorPlanUrl || 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80'}
                alt="Floor plan schematic"
                className="w-full h-full object-contain opacity-80 filter invert contrast-125"
              />
              <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-xs font-semibold text-amber-300 border border-white/10">
                {activeFloorTab === 'level1' ? 'Level 1: Living Suite, Master Bedroom & Kitchen' : 'Level 2: Solarium Terrace & En-Suite Guest Studio'}
              </div>
            </div>
          </div>

          {/* 4. LOCATION / MAP SECTION */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h3 className="text-xl font-bold font-serif text-slate-900">
                Neighborhood & Surroundings
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {property.address}, {property.district} • High walkable score and transport connections.
              </p>
            </div>

            <MapPlaceholder
              properties={[property]}
              selectedProperty={property}
              heightClass="h-72"
            />

            {/* Nearby Neighborhood Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                <Train className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Public Transit</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">Metro & Tram line within 250m walking distance.</p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Schools & Academies</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">Bilingual international school 5 mins by vehicle.</p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                <ShoppingBag className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Fine Dining & Retail</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">Organic markets, artisan bakeries, and Michelin spots.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right 1 Col: Agent Info Card, Schedule Viewing, Contact Form */}
        <div className="space-y-6">
          <div className="sticky top-28 space-y-6">
            
            {/* Schedule Viewing CTA Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 shadow-xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>Private Consultation</span>
              </div>
              <h3 className="text-xl font-bold font-serif">
                Experience This Residence in Person
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Schedule a discreet viewing escorted by {agent.name}.
              </p>
              <button
                type="button"
                onClick={() => setViewingModalOpen(true)}
                className="w-full py-3.5 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Private Viewing</span>
              </button>
            </div>

            {/* Agent Contact Card & Form */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100 shadow-sm"
                />
                <div className="min-w-0">
                  <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">
                    Listing Broker
                  </span>
                  <h4 className="text-base font-bold text-slate-900 font-serif truncate">
                    {agent.name}
                  </h4>
                  <p className="text-xs text-slate-500 truncate">{agent.agency}</p>
                  <p className="text-xs font-semibold text-slate-700 mt-1">{agent.phone}</p>
                </div>
              </div>

              {/* Inquiry Form */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                  Direct Agent Inquiry
                </h5>
                <ContactForm property={property} agent={agent} />
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* 5. SIMILAR PROPERTIES */}
      {similarProperties.length > 0 && (
        <div className="pt-12 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
                You May Also Consider
              </span>
              <h3 className="text-2xl font-bold font-serif text-slate-900">
                Similar Prime Residences
              </h3>
            </div>
            <button
              onClick={() => navigate({ name: 'search', initialFilters: { city: property.city } })}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors cursor-pointer"
            >
              Browse more in {property.city}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((p) => (
              <PropertyCard key={p.id} property={p} layout="grid" />
            ))}
          </div>
        </div>
      )}

      {/* Viewing Modal */}
      <ScheduleViewingModal
        isOpen={viewingModalOpen}
        onClose={() => setViewingModalOpen(false)}
        property={property}
        agent={agent}
      />

    </div>
  );
};
