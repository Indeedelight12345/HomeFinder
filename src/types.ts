export type ListingType = 'sale' | 'rent';

export type PropertyType = 'apartment' | 'house' | 'villa' | 'penthouse' | 'loft' | 'commercial';

export interface Property {
  id: string;
  title: string;
  listingType: ListingType;
  propertyType: PropertyType;
  price: number;
  currency: string;
  address: string;
  city: 'Budapest' | 'Vienna' | 'Amsterdam' | 'Prague' | 'Warsaw';
  district: string;
  zipCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  bedrooms: number;
  bathrooms: number;
  area: number; // in sq meters
  yearBuilt: number;
  energyRating: 'A+' | 'A' | 'B' | 'C' | 'D';
  parking: boolean;
  furnished: boolean;
  images: string[];
  description: string;
  amenities: string[];
  floorPlanUrl?: string;
  agentId: string;
  featured: boolean;
  createdAt: string;
  status: 'active' | 'pending' | 'sold';
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  agency: string;
  avatar: string;
  phone: string;
  email: string;
  languages: string[];
  city: string;
  rating: number;
  reviewsCount: number;
  listingsCount: number;
  bio: string;
}

export interface FilterState {
  listingType: 'all' | ListingType;
  city: string;
  propertyType: 'all' | PropertyType;
  minPrice: number;
  maxPrice: number;
  bedrooms: number | 'any';
  bathrooms: number | 'any';
  minArea: number;
  parking: boolean;
  furnished: boolean;
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'area-desc';
}

export interface PropertyInquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  agentId: string;
  agentName: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  message: string;
  createdAt: string;
  status: 'Pending' | 'Replied' | 'Viewing Booked';
}

export interface ScheduledViewing {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyAddress: string;
  propertyImage: string;
  agentName: string;
  date: string;
  timeSlot: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  notes?: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'info' | 'error';
}

export type PageRoute = 
  | { name: 'home' }
  | { name: 'search'; initialFilters?: Partial<FilterState> }
  | { name: 'details'; propertyId: string }
  | { name: 'favorites' }
  | { name: 'agents'; agentId?: string }
  | { name: 'list-property' }
  | { name: 'user-dashboard'; tab?: 'saved' | 'viewed' | 'inquiries' | 'viewings' | 'settings' }
  | { name: 'admin-dashboard'; tab?: 'overview' | 'listings' | 'inquiries' };
