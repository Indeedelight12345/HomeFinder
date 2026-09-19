import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { POPULAR_LOCATIONS } from '../data/mockData';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyType } from '../types';
import { 
  Search, 
  MapPin, 
  Building, 
  Euro, 
  Bed, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Scale, 
  KeyRound, 
  Users, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { properties, navigate } = useApp();

  // Hero Search Bar State
  const [transactionType, setTransactionType] = useState<'sale' | 'rent'>('sale');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | PropertyType>('all');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(3000000);
  const [bedrooms, setBedrooms] = useState<number | 'any'>('any');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      name: 'search',
      initialFilters: {
        listingType: transactionType,
        city: selectedCity,
        propertyType: selectedType,
        minPrice,
        maxPrice,
        bedrooms
      }
    });
  };

  const featuredProperties = properties.filter((p) => p.featured).slice(0, 3);
  const recentProperties = [...properties]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[620px] flex items-center justify-center bg-slate-950 text-white overflow-hidden py-16 sm:py-24">
        {/* Background Architectural Photography */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="European prime architectural residence"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Premier Central European Real Estate Network</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none mb-6">
            Find Your Next Sanctuary Across Europe’s Historic Capitals
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Exclusive residences, Danube penthouses, and heritage townhouses in Budapest, Vienna, Amsterdam, Prague, and Warsaw.
          </p>

          {/* SEARCH BAR CONTAINER */}
          <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/20 text-slate-900 text-left">
            {/* Buy / Rent Switch */}
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
              <button
                type="button"
                onClick={() => setTransactionType('sale')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                  transactionType === 'sale'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Buy Properties
              </button>
              <button
                type="button"
                onClick={() => setTransactionType('rent')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                  transactionType === 'rent'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Rent Luxury
              </button>
            </div>

            {/* Inputs Grid */}
            <form onSubmit={handleHeroSearch} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Location */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>Location</span>
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-500"
                  >
                    <option value="">All European Capitals</option>
                    <option value="Budapest">Budapest, Hungary</option>
                    <option value="Vienna">Vienna, Austria</option>
                    <option value="Amsterdam">Amsterdam, Netherlands</option>
                    <option value="Prague">Prague, Czechia</option>
                    <option value="Warsaw">Warsaw, Poland</option>
                  </select>
                </div>

                {/* Property Type */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-amber-600" />
                    <span>Property Type</span>
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-500"
                  >
                    <option value="all">Any Property Type</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House & Townhouse</option>
                    <option value="villa">Luxury Villa</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="loft">Urban Loft</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1 flex items-center gap-1">
                    <Euro className="w-3.5 h-3.5 text-amber-600" />
                    <span>Max Budget</span>
                  </label>
                  <select
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-500"
                  >
                    <option value={3000000}>No Maximum Limit</option>
                    <option value={500000}>Up to €500,000</option>
                    <option value={1000000}>Up to €1,000,000</option>
                    <option value={1500000}>Up to €1,500,000</option>
                    <option value={2000000}>Up to €2,000,000</option>
                    <option value={2500000}>Up to €2,500,000</option>
                  </select>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1 flex items-center gap-1">
                    <Bed className="w-3.5 h-3.5 text-amber-600" />
                    <span>Bedrooms</span>
                  </label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value === 'any' ? 'any' : Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-500"
                  >
                    <option value="any">Any Bedrooms</option>
                    <option value="1">1+ Bedrooms</option>
                    <option value="2">2+ Bedrooms</option>
                    <option value="3">3+ Bedrooms</option>
                    <option value="4">4+ Bedrooms</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>Popular: Budapest V., Vienna 1st, Amsterdam Jordaan</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-slate-900 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Properties</span>
                </button>
              </div>
            </form>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12 pt-8 border-t border-white/10 text-white">
            <div>
              <span className="text-2xl sm:text-3xl font-bold font-serif text-amber-400">€420M+</span>
              <span className="block text-xs text-slate-400 mt-1">Portfolio Under Advisory</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-bold font-serif text-amber-400">5</span>
              <span className="block text-xs text-slate-400 mt-1">Capital Market Hubs</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-bold font-serif text-amber-400">98.4%</span>
              <span className="block text-xs text-slate-400 mt-1">Customer Satisfaction</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-bold font-serif text-amber-400">100%</span>
              <span className="block text-xs text-slate-400 mt-1">Verified Legal Titles</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED PROPERTIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Curated Selection</span>
            </div>
            <h2 className="text-3xl font-bold font-serif text-slate-900 tracking-tight">
              Featured Residences
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Handpicked trophy assets meeting stringent architectural and heritage standards.
            </p>
          </div>

          <button
            onClick={() => navigate({ name: 'search' })}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors cursor-pointer"
          >
            <span>View All Listings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} layout="grid" />
          ))}
        </div>
      </section>

      {/* 3. POPULAR LOCATIONS */}
      <section className="bg-slate-100/60 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
              Geographic Focus
            </span>
            <h2 className="text-3xl font-bold font-serif text-slate-900 tracking-tight">
              Explore by European Capital
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Select a city to discover premier neoclassical apartments, waterfront canals, and prime residential developments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {POPULAR_LOCATIONS.map((loc) => (
              <div
                key={loc.city}
                onClick={() => navigate({ name: 'search', initialFilters: { city: loc.city } })}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <img
                  src={loc.image}
                  alt={loc.city}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-semibold text-amber-300 block uppercase tracking-wider">
                    {loc.country}
                  </span>
                  <h3 className="text-2xl font-bold font-serif text-white">
                    {loc.city}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                    {loc.tagline}
                  </p>
                  <div className="mt-3 pt-2 border-t border-white/20 flex items-center justify-between text-xs text-slate-300 group-hover:text-amber-300 transition-colors">
                    <span>{loc.activeCount} Properties</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. RECENTLY ADDED PROPERTIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
              Market Fresh
            </span>
            <h2 className="text-3xl font-bold font-serif text-slate-900 tracking-tight">
              Recently Added Properties
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              The newest listings introduced to our platform this week.
            </p>
          </div>

          <button
            onClick={() => navigate({ name: 'search', initialFilters: { sortBy: 'newest' } })}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors cursor-pointer"
          >
            <span>Explore All Recent</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} layout="grid" />
          ))}
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">
              The HomeFinder Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight">
              Why Discerning Clients Entrust Us with Prime European Real Estate
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-3 font-light leading-relaxed">
              We transcend generic property advertising by delivering full-spectrum advisory, legal diligence, and private off-market discretion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-serif mb-2">
                Rigorous Legal & Title Audit
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every listing undergoes notary verification, land registry confirmation, and environmental rating checks before public presentation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-serif mb-2">
                Certified Capital Brokers
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Work directly with localized experts fluent in English, German, Hungarian, Dutch, and Polish, equipped with local regulatory acumen.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-serif mb-2">
                Concierge Private Viewings
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enjoy hassle-free scheduling, private driver arrangements, and bespoke architectural architectural consultations for historic restorations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION FOR OWNERS & AGENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 text-white px-3 py-1 rounded-full inline-block">
              For Property Owners & Certified Brokers
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight">
              Looking to Market an Exceptional European Property?
            </h2>
            <p className="text-sm text-amber-100 leading-relaxed">
              Showcase your residence directly to qualified international investors, embassies, and verified high-income tenants across our network.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => navigate({ name: 'list-property' })}
              className="w-full sm:w-auto px-7 py-3.5 bg-white text-slate-900 font-bold text-sm rounded-xl shadow-lg hover:bg-slate-100 transition-colors text-center cursor-pointer"
            >
              List Your Property
            </button>
            <button
              onClick={() => navigate({ name: 'agents' })}
              className="w-full sm:w-auto px-7 py-3.5 bg-amber-900/40 border border-white/30 text-white font-bold text-sm rounded-xl hover:bg-amber-900/60 transition-colors text-center cursor-pointer"
            >
              Connect with an Agent
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
