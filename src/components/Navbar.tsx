import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Heart, 
  PlusCircle, 
  Menu, 
  X, 
  UserCheck, 
  LayoutDashboard,
  Search
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentRoute, navigate, favorites } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (name: string, filterType?: string) => {
    if (currentRoute.name === name) {
      if (name === 'search' && filterType) {
        return (currentRoute as any).initialFilters?.listingType === filterType;
      }
      return true;
    }
    return false;
  };

  const handleNav = (route: any) => {
    navigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-shadow duration-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNav({ name: 'home' })}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-md group-hover:bg-amber-600 transition-colors">
              <Building2 className="w-6 h-6 text-amber-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <span className="text-2xl font-bold font-serif tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
                HomeFinder
              </span>
              <span className="block text-[10px] font-semibold tracking-widest uppercase text-slate-600 -mt-1">
                Central Europe Estates
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => handleNav({ name: 'home' })}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                isActive('home') 
                  ? 'text-amber-600 bg-amber-50/80 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav({ name: 'search', initialFilters: { listingType: 'sale' } })}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                isActive('search', 'sale') 
                  ? 'text-amber-600 bg-amber-50/80 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => handleNav({ name: 'search', initialFilters: { listingType: 'rent' } })}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                isActive('search', 'rent') 
                  ? 'text-amber-600 bg-amber-50/80 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              Rent
            </button>
            <button
              onClick={() => handleNav({ name: 'search' })}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                isActive('search') && !isActive('search', 'sale') && !isActive('search', 'rent')
                  ? 'text-amber-600 bg-amber-50/80 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              Explore All
            </button>
            <button
              onClick={() => handleNav({ name: 'agents' })}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                isActive('agents') 
                  ? 'text-amber-600 bg-amber-50/80 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              Agents
            </button>
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Favorites Icon Button */}
            <button
              id="navbar-favorites-btn"
              onClick={() => handleNav({ name: 'favorites' })}
              className={`relative p-2.5 rounded-xl border transition-all cursor-pointer ${
                isActive('favorites')
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50/50'
              }`}
              title="Saved Properties"
              aria-label="View favorites"
            >
              <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-rose-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* User Dashboard */}
            <button
              id="navbar-user-dashboard-btn"
              onClick={() => handleNav({ name: 'user-dashboard' })}
              className={`px-3 py-2 text-sm font-medium rounded-xl border transition-all cursor-pointer flex items-center gap-2 ${
                isActive('user-dashboard')
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
              title="My Account & Dashboard"
            >
              <UserCheck className="w-4 h-4 text-amber-500" />
              <span>My Portal</span>
            </button>

            {/* List Your Property CTA */}
            <button
              id="navbar-list-property-btn"
              onClick={() => handleNav({ name: 'list-property' })}
              className="px-4 py-2.5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 active:bg-amber-800 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Property</span>
            </button>

            {/* Admin portal shortcut */}
            <button
              id="navbar-admin-btn"
              onClick={() => handleNav({ name: 'admin-dashboard' })}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isActive('admin-dashboard')
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'border-slate-200 text-slate-400 hover:text-slate-800 hover:bg-slate-100'
              }`}
              title="Admin Portal Management"
            >
              <LayoutDashboard className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleNav({ name: 'favorites' })}
              className="p-2 relative text-slate-600"
              aria-label="Favorites"
            >
              <Heart className={`w-6 h-6 ${favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2">
          <button
            onClick={() => handleNav({ name: 'home' })}
            className="w-full text-left px-3 py-2.5 rounded-lg text-slate-800 font-medium hover:bg-slate-50"
          >
            Home
          </button>
          <button
            onClick={() => handleNav({ name: 'search', initialFilters: { listingType: 'sale' } })}
            className="w-full text-left px-3 py-2.5 rounded-lg text-slate-800 font-medium hover:bg-slate-50"
          >
            Properties for Sale (Buy)
          </button>
          <button
            onClick={() => handleNav({ name: 'search', initialFilters: { listingType: 'rent' } })}
            className="w-full text-left px-3 py-2.5 rounded-lg text-slate-800 font-medium hover:bg-slate-50"
          >
            Properties for Rent
          </button>
          <button
            onClick={() => handleNav({ name: 'search' })}
            className="w-full text-left px-3 py-2.5 rounded-lg text-slate-800 font-medium hover:bg-slate-50"
          >
            Explore All Listings
          </button>
          <button
            onClick={() => handleNav({ name: 'agents' })}
            className="w-full text-left px-3 py-2.5 rounded-lg text-slate-800 font-medium hover:bg-slate-50"
          >
            Agents Directory
          </button>
          <button
            onClick={() => handleNav({ name: 'favorites' })}
            className="w-full text-left px-3 py-2.5 rounded-lg text-slate-800 font-medium hover:bg-slate-50 flex items-center justify-between"
          >
            <span>Favorites</span>
            <span className="text-xs bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-bold">
              {favorites.length}
            </span>
          </button>
          <button
            onClick={() => handleNav({ name: 'user-dashboard' })}
            className="w-full text-left px-3 py-2.5 rounded-lg text-slate-800 font-medium hover:bg-slate-50"
          >
            User Dashboard & Inquiries
          </button>
          <button
            onClick={() => handleNav({ name: 'admin-dashboard' })}
            className="w-full text-left px-3 py-2.5 rounded-lg text-slate-600 font-medium hover:bg-slate-50"
          >
            Admin Management Console
          </button>
          <div className="pt-2">
            <button
              onClick={() => handleNav({ name: 'list-property' })}
              className="w-full py-3 text-center font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-5 h-5" />
              <span>List Your Property</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
