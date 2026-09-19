import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ListingType, PropertyType } from '../types';
import { AMENITIES_LIST } from '../data/mockData';
import { 
  Building2, 
  MapPin, 
  Euro, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Image as ImageIcon, 
  UploadCloud, 
  CheckCircle2, 
  Eye, 
  Plus, 
  Trash2,
  Bed,
  Bath,
  Maximize2
} from 'lucide-react';

export const ListPropertyPage: React.FC = () => {
  const { addProperty, navigate, userProfile, addToast } = useApp();

  const [step, setStep] = useState<number>(1);
  const totalSteps = 5;

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    listingType: 'sale' as ListingType,
    propertyType: 'apartment' as PropertyType,
    price: 650000,
    address: '',
    city: 'Budapest' as 'Budapest' | 'Vienna' | 'Amsterdam' | 'Prague' | 'Warsaw',
    district: '',
    zipCode: '',
    bedrooms: 2,
    bathrooms: 2,
    area: 95,
    yearBuilt: 2022,
    energyRating: 'A' as 'A+' | 'A' | 'B' | 'C' | 'D',
    parking: true,
    furnished: true,
    description: '',
    amenities: ['Air Conditioning', 'Elevator', 'Balcony'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80'
    ],
    contactName: userProfile.name || '',
    contactEmail: userProfile.email || '',
    contactPhone: userProfile.phone || ''
  });

  const [newImageUrl, setNewImageUrl] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const samplePresets = [
    { label: 'Modern Living Room', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Architectural Terrace', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Master Suite', url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Marble Kitchen', url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80' }
  ];

  const validateStep = (currentStep: number) => {
    const err: Record<string, string> = {};
    if (currentStep === 1) {
      if (!formData.title.trim() || formData.title.length < 5) {
        err.title = 'Title must be at least 5 characters long';
      }
    } else if (currentStep === 2) {
      if (!formData.address.trim()) err.address = 'Street address is required';
      if (!formData.district.trim()) err.district = 'District or neighborhood is required';
      if (formData.price <= 0) err.price = 'Please specify a realistic price';
    } else if (currentStep === 3) {
      if (formData.area <= 10) err.area = 'Minimum area is 10 m²';
    } else if (currentStep === 4) {
      if (!formData.description.trim() || formData.description.length < 20) {
        err.description = 'Please write at least 20 characters describing the property';
      }
    } else if (currentStep === 5) {
      if (formData.images.length === 0) {
        err.images = 'Please upload or select at least 1 photo';
      }
      if (!formData.contactEmail.includes('@')) {
        err.contactEmail = 'Valid contact email is required';
      }
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, totalSteps + 1)); // step 6 is live preview
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const toggleAmenity = (item: string) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(item);
      if (exists) {
        return { ...prev, amenities: prev.amenities.filter((a) => a !== item) };
      } else {
        return { ...prev, amenities: [...prev.amenities, item] };
      }
    });
  };

  const addImage = () => {
    if (newImageUrl.trim()) {
      setFormData((prev) => ({ ...prev, images: [...prev.images, newImageUrl.trim()] }));
      setNewImageUrl('');
      addToast('Image Added', 'New photograph included in listing gallery.', 'info');
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    const newId = addProperty({
      title: formData.title,
      listingType: formData.listingType,
      propertyType: formData.propertyType,
      price: Number(formData.price),
      currency: '€',
      address: formData.address,
      city: formData.city,
      district: formData.district,
      zipCode: formData.zipCode || '1000',
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      area: Number(formData.area),
      yearBuilt: Number(formData.yearBuilt),
      energyRating: formData.energyRating,
      parking: formData.parking,
      furnished: formData.furnished,
      description: formData.description,
      amenities: formData.amenities,
      images: formData.images,
      agentId: 'agent-1'
    });

    navigate({ name: 'details', propertyId: newId });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block">
          Owner & Broker Portal
        </span>
        <h1 className="text-3xl font-bold font-serif text-slate-900 tracking-tight">
          List Your Property on HomeFinder
        </h1>
        <p className="text-sm text-slate-500">
          Reach thousands of qualified international buyers and certified European real estate brokers.
        </p>
      </div>

      {/* Progress Step Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
          <span>Step {Math.min(step, totalSteps)} of {totalSteps}: {
            step === 1 ? 'Basic Info' :
            step === 2 ? 'Location & Price' :
            step === 3 ? 'Specifications' :
            step === 4 ? 'Description & Amenities' :
            step === 5 ? 'Photos & Contact' : 'Live Preview'
          }</span>
          <span className="text-amber-600">
            {Math.round((Math.min(step, totalSteps) / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-amber-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${(Math.min(step, totalSteps) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Multi-Step Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
        
        {/* STEP 1: Title, Listing Type & Property Type */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-xl font-bold font-serif text-slate-900 mb-1">
                Property Basics & Headline
              </h2>
              <p className="text-xs text-slate-500">
                Craft an engaging headline and choose transaction category.
              </p>
            </div>

            {/* Listing Type Toggle */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                Listing Type
              </label>
              <div className="grid grid-cols-2 gap-3 max-w-sm">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, listingType: 'sale' })}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    formData.listingType === 'sale'
                      ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  For Sale
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, listingType: 'rent' })}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    formData.listingType === 'rent'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  For Rent
                </button>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                Listing Headline / Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Grand Belle Époque Apartment with Panoramic Danube Views"
                className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none ${
                  errors.title ? 'border-rose-400 bg-rose-50/40' : 'border-slate-200 focus:border-amber-500'
                }`}
              />
              {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title}</p>}
            </div>

            {/* Property Type Grid */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                Property Architecture Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { value: 'apartment', label: 'Apartment' },
                  { value: 'house', label: 'House / Townhome' },
                  { value: 'villa', label: 'Luxury Villa' },
                  { value: 'penthouse', label: 'Penthouse' },
                  { value: 'loft', label: 'Urban Loft' },
                  { value: 'commercial', label: 'Commercial Space' }
                ].map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, propertyType: t.value as any })}
                    className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                      formData.propertyType === t.value
                        ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Location & Price */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-xl font-bold font-serif text-slate-900 mb-1">
                Location & Pricing
              </h2>
              <p className="text-xs text-slate-500">
                Specify European city, neighborhood address, and asking price in Euros.
              </p>
            </div>

            {/* City Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                City / Metropolitan Hub
              </label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value as any })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-amber-500"
              >
                <option value="Budapest">Budapest, Hungary</option>
                <option value="Vienna">Vienna, Austria</option>
                <option value="Amsterdam">Amsterdam, Netherlands</option>
                <option value="Prague">Prague, Czechia</option>
                <option value="Warsaw">Warsaw, Poland</option>
              </select>
            </div>

            {/* Street Address & District */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  Street & Building Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. Herrengasse 14"
                  className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none ${
                    errors.address ? 'border-rose-400 bg-rose-50/40' : 'border-slate-200 focus:border-amber-500'
                  }`}
                />
                {errors.address && <p className="text-xs text-rose-500 mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  District / Neighborhood <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  placeholder="e.g. 1st District - Innere Stadt"
                  className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none ${
                    errors.district ? 'border-rose-400 bg-rose-50/40' : 'border-slate-200 focus:border-amber-500'
                  }`}
                />
                {errors.district && <p className="text-xs text-rose-500 mt-1">{errors.district}</p>}
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                Asking Price (€ EUR) {formData.listingType === 'rent' ? '/ Month' : ''} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Euro className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  min="100"
                  step="1000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-amber-500 font-semibold"
                />
              </div>
              {errors.price && <p className="text-xs text-rose-500 mt-1">{errors.price}</p>}
            </div>
          </div>
        )}

        {/* STEP 3: Specifications */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-xl font-bold font-serif text-slate-900 mb-1">
                Physical Specifications
              </h2>
              <p className="text-xs text-slate-500">
                Detailed room count, area dimensions, energy certification, and parking.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  Bedrooms
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  Bathrooms
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  Floor Area (m²) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min="15"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-amber-500"
                />
                {errors.area && <p className="text-xs text-rose-500 mt-1">{errors.area}</p>}
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  Year Built
                </label>
                <input
                  type="number"
                  min="1600"
                  max="2027"
                  value={formData.yearBuilt}
                  onChange={(e) => setFormData({ ...formData, yearBuilt: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  Energy Rating
                </label>
                <select
                  value={formData.energyRating}
                  onChange={(e) => setFormData({ ...formData, energyRating: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-amber-500"
                >
                  <option value="A+">A+ (Ultra Low Carbon)</option>
                  <option value="A">A (High Efficiency)</option>
                  <option value="B">B (Good)</option>
                  <option value="C">C (Standard)</option>
                  <option value="D">D (Historic/Vintage)</option>
                </select>
              </div>
            </div>

            {/* Checkboxes: Parking & Furnished */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-6">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.parking}
                  onChange={(e) => setFormData({ ...formData, parking: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-600 accent-amber-600"
                />
                <span>Includes Garage or Dedicated Parking</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.furnished}
                  onChange={(e) => setFormData({ ...formData, furnished: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-600 accent-amber-600"
                />
                <span>Furnished / Ready for Move-In</span>
              </label>
            </div>
          </div>
        )}

        {/* STEP 4: Description & Amenities */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-xl font-bold font-serif text-slate-900 mb-1">
                Description & Amenities
              </h2>
              <p className="text-xs text-slate-500">
                Detail the luxury aspects, natural lighting, views, and select all featured amenities.
              </p>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                Property Narrative Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe architectural history, views, materials (e.g. herringbone parquet, marble baths), terrace exposure, and proximity to cultural landmarks..."
                className={`w-full bg-slate-50 border rounded-xl p-4 text-sm text-slate-800 focus:outline-none ${
                  errors.description ? 'border-rose-400 bg-rose-50/40' : 'border-slate-200 focus:border-amber-500'
                }`}
              />
              {errors.description && <p className="text-xs text-rose-500 mt-1">{errors.description}</p>}
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                Select Amenities & Features ({formData.amenities.length} selected)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {AMENITIES_LIST.map((item) => {
                  const selected = formData.amenities.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleAmenity(item)}
                      className={`p-2.5 rounded-xl border text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                        selected
                          ? 'bg-amber-50 border-amber-600 text-amber-900 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span>{item}</span>
                      {selected && <Check className="w-3.5 h-3.5 text-amber-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Photos & Contact */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-xl font-bold font-serif text-slate-900 mb-1">
                Photography & Contact Details
              </h2>
              <p className="text-xs text-slate-500">
                Upload image URLs or select high-resolution presets, and provide broker contact info.
              </p>
            </div>

            {/* Custom image URL input */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                Add Photo by URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={addImage}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-amber-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Photo</span>
                </button>
              </div>
            </div>

            {/* Quick Presets */}
            <div>
              <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
                Or Add Curated Architectural Presets:
              </span>
              <div className="flex flex-wrap gap-2">
                {samplePresets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      if (!formData.images.includes(preset.url)) {
                        setFormData((p) => ({ ...p, images: [...p.images, preset.url] }));
                      }
                    }}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-lg font-medium cursor-pointer"
                  >
                    + {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Preview Grid */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                Current Gallery ({formData.images.length} photos)
              </label>
              {formData.images.length === 0 ? (
                <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center text-xs text-slate-400">
                  No images added yet. Please add at least 1 photo.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative aspect-[16/10] rounded-xl overflow-hidden group">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1.5 right-1.5 p-1 bg-white/90 hover:bg-white text-rose-600 rounded-full shadow-xs cursor-pointer opacity-90 hover:opacity-100"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {errors.images && <p className="text-xs text-rose-500 mt-1">{errors.images}</p>}
            </div>

            {/* Contact details */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  Contact Person
                </label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder="Full Name"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  Contact Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder="Email"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                />
                {errors.contactEmail && <p className="text-xs text-rose-500 mt-1">{errors.contactEmail}</p>}
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  placeholder="Phone"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Live Preview Before Publishing */}
        {step === 6 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block">
                  Final Inspection
                </span>
                <h2 className="text-xl font-bold font-serif text-slate-900">
                  Preview Before Publishing
                </h2>
              </div>
              <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-xs font-semibold flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-amber-600" />
                <span>Live Marketplace Card</span>
              </span>
            </div>

            {/* Preview Banner */}
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg">
                <div className="relative aspect-[16/10]">
                  <img
                    src={formData.images[0]}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="px-2.5 py-1 bg-amber-600 text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {formData.listingType === 'sale' ? 'For Sale' : 'For Rent'}
                    </span>
                    <span className="px-2 py-0.5 bg-slate-900/80 backdrop-blur-md text-amber-300 rounded-full text-[10px] font-semibold">
                      New Listing
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-xl font-bold font-serif">
                      €{new Intl.NumberFormat('de-DE').format(formData.price)}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">{formData.title}</h4>
                  <p className="text-xs text-slate-500">
                    {formData.address}, {formData.district}, {formData.city}
                  </p>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
                    <span>{formData.bedrooms} Beds</span>
                    <span>{formData.bathrooms} Baths</span>
                    <span>{formData.area} m²</span>
                    <span>Class {formData.energyRating}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <p><strong>Description:</strong> {formData.description}</p>
              <p><strong>Amenities ({formData.amenities.length}):</strong> {formData.amenities.join(', ')}</p>
            </div>
          </div>
        )}

        {/* Navigation Step Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : <div />}

          {step <= totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 bg-slate-900 hover:bg-amber-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <span>{step === totalSteps ? 'Proceed to Preview' : 'Next Step'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Publish Listing Live</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
