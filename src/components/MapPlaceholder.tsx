import React, { useState } from 'react';
import { Property } from '../types';
import { useApp } from '../context/AppContext';
import { MapPin, Navigation, ZoomIn, ZoomOut, Layers, ExternalLink, X } from 'lucide-react';

interface MapPlaceholderProps {
  properties: Property[];
  selectedProperty?: Property;
  onSelectProperty?: (property: Property) => void;
  heightClass?: string;
}

export const MapPlaceholder: React.FC<MapPlaceholderProps> = ({
  properties,
  selectedProperty,
  onSelectProperty,
  heightClass = 'h-[600px]'
}) => {
  const { navigate } = useApp();
  const [activeProperty, setActiveProperty] = useState<Property | null>(selectedProperty || null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mapStyle, setMapStyle] = useState<'light' | 'terrain' | 'satellite'>('light');

  const handlePinClick = (prop: Property) => {
    setActiveProperty(prop);
    if (onSelectProperty) onSelectProperty(prop);
  };

  return (
    <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100 select-none`}>
      {/* Interactive Canvas Background representing high-end cartography */}
      <div 
        className={`absolute inset-0 transition-all duration-300 ${
          mapStyle === 'satellite' 
            ? 'bg-slate-900' 
            : mapStyle === 'terrain'
            ? 'bg-stone-100'
            : 'bg-slate-100'
        }`}
        style={{
          backgroundImage: mapStyle === 'satellite'
            ? 'radial-gradient(#334155 1px, transparent 1px)'
            : 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'center center'
        }}
      >
        {/* Simulated vector roads and waterways for European metropolitan vibe */}
        <svg className="w-full h-full opacity-35" viewBox="0 0 800 600" preserveAspectRatio="none">
          <path d="M-50,150 Q200,220 400,180 T850,230" fill="none" stroke="#93c5fd" strokeWidth="18" strokeLinecap="round" />
          <path d="M-50,320 Q250,280 450,380 T850,320" fill="none" stroke="#93c5fd" strokeWidth="12" strokeLinecap="round" />
          <path d="M120,-50 Q180,250 260,650" fill="none" stroke="#e2e8f0" strokeWidth="10" />
          <path d="M480,-50 Q420,280 520,650" fill="none" stroke="#e2e8f0" strokeWidth="8" />
          <path d="M-50,450 L850,120" fill="none" stroke="#e2e8f0" strokeWidth="6" />
        </svg>

        {/* Property Pins */}
        <div className="absolute inset-0 p-8 flex items-center justify-center">
          <div className="relative w-full h-full max-w-2xl max-h-96">
            {properties.slice(0, 10).map((prop, idx) => {
              // Distribute pseudo pins across the canvas based on index / coordinates
              const positions = [
                { top: '25%', left: '30%' },
                { top: '45%', left: '42%' },
                { top: '35%', left: '65%' },
                { top: '65%', left: '32%' },
                { top: '55%', left: '75%' },
                { top: '20%', left: '55%' },
                { top: '75%', left: '58%' },
                { top: '40%', left: '20%' },
                { top: '60%', left: '15%' },
                { top: '30%', left: '80%' }
              ];
              const pos = positions[idx % positions.length];
              const isSelected = activeProperty?.id === prop.id;

              return (
                <div
                  key={prop.id}
                  style={{ top: pos.top, left: pos.left }}
                  onClick={() => handlePinClick(prop)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group/pin cursor-pointer z-10 transition-transform duration-200 hover:scale-110"
                >
                  <div className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white ring-4 ring-amber-500/40 scale-110'
                      : 'bg-white text-slate-900 border border-slate-200 hover:border-amber-500 hover:bg-amber-50'
                  }`}>
                    <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-amber-600'}`} />
                    <span>€{new Intl.NumberFormat('de-DE').format(prop.price)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Map Controls */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="bg-white/90 backdrop-blur-md rounded-xl p-1 shadow-md border border-slate-200 flex items-center gap-1 text-xs">
          <button
            onClick={() => setMapStyle('light')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
              mapStyle === 'light' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Streets
          </button>
          <button
            onClick={() => setMapStyle('terrain')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
              mapStyle === 'terrain' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Terrain
          </button>
          <button
            onClick={() => setMapStyle('satellite')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
              mapStyle === 'satellite' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Satellite
          </button>
        </div>
      </div>

      {/* Right Zoom & Location Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col">
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 1.4))}
            className="p-2.5 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border-b border-slate-100 cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.85))}
            className="p-2.5 text-slate-700 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={() => setZoomLevel(1)}
          className="p-2.5 bg-white/95 backdrop-blur-md text-slate-700 hover:text-slate-900 rounded-xl shadow-md border border-slate-200 hover:bg-slate-100 cursor-pointer"
          title="Recenter Map"
        >
          <Navigation className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Active Property Card Preview Popup */}
      {activeProperty && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm z-30 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3.5 animate-in slide-in-from-bottom-2">
          <button
            onClick={() => setActiveProperty(null)}
            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
            aria-label="Close preview"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex gap-3">
            <img
              src={activeProperty.images[0]}
              alt={activeProperty.title}
              className="w-24 h-24 object-cover rounded-xl shrink-0"
            />
            <div className="flex-1 min-w-0 pr-4">
              <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">
                {activeProperty.city} • {activeProperty.listingType === 'sale' ? 'For Sale' : 'Rent'}
              </span>
              <h4 className="text-sm font-bold text-slate-900 truncate">
                {activeProperty.title}
              </h4>
              <p className="text-xs text-slate-500 truncate mt-0.5">
                {activeProperty.address}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-base font-bold text-slate-900 font-serif">
                  €{new Intl.NumberFormat('de-DE').format(activeProperty.price)}
                </span>
                <button
                  onClick={() => navigate({ name: 'details', propertyId: activeProperty.id })}
                  className="px-2.5 py-1 bg-slate-900 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>View</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Map Attribution Footer */}
      <div className="absolute bottom-2 right-3 z-10 text-[10px] text-slate-400 bg-white/70 px-2 py-0.5 rounded backdrop-blur-xs">
        HomeFinder Interactive Geographic Visualizer • European Capitals
      </div>
    </div>
  );
};
