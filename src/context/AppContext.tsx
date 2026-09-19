import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Property, 
  Agent, 
  PageRoute, 
  PropertyInquiry, 
  ScheduledViewing, 
  ToastMessage 
} from '../types';
import { INITIAL_PROPERTIES, INITIAL_AGENTS } from '../data/mockData';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  preferredCity: string;
  notificationEmail: boolean;
  notificationSms: boolean;
}

interface AppContextType {
  properties: Property[];
  agents: Agent[];
  favorites: string[];
  recentViews: string[];
  inquiries: PropertyInquiry[];
  viewings: ScheduledViewing[];
  toasts: ToastMessage[];
  currentRoute: PageRoute;
  compareIds: string[];
  userProfile: UserProfile;
  navigate: (route: PageRoute) => void;
  toggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  addProperty: (property: Partial<Property>) => string;
  updatePropertyStatus: (propertyId: string, status: 'active' | 'pending' | 'sold') => void;
  toggleFeatureProperty: (propertyId: string) => void;
  deleteProperty: (propertyId: string) => void;
  addInquiry: (inquiry: Omit<PropertyInquiry, 'id' | 'createdAt' | 'status'>) => void;
  scheduleViewing: (viewing: Omit<ScheduledViewing, 'id' | 'createdAt' | 'status'>) => void;
  cancelViewing: (viewingId: string) => void;
  addToCompare: (propertyId: string) => void;
  removeFromCompare: (propertyId: string) => void;
  clearCompare: () => void;
  recordView: (propertyId: string) => void;
  addToast: (title: string, description?: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Properties
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem('homefinder_properties');
      return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
    } catch {
      return INITIAL_PROPERTIES;
    }
  });

  // 2. Agents
  const [agents] = useState<Agent[]>(INITIAL_AGENTS);

  // 3. Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('homefinder_favorites');
      return saved ? JSON.parse(saved) : ['prop-1', 'prop-3'];
    } catch {
      return ['prop-1', 'prop-3'];
    }
  });

  // 4. Recently viewed
  const [recentViews, setRecentViews] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('homefinder_recent_views');
      return saved ? JSON.parse(saved) : ['prop-1', 'prop-2', 'prop-4'];
    } catch {
      return ['prop-1', 'prop-2', 'prop-4'];
    }
  });

  // 5. Inquiries
  const [inquiries, setInquiries] = useState<PropertyInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('homefinder_inquiries');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'inq-1',
        propertyId: 'prop-1',
        propertyTitle: 'Palatial Danube View Penthouse with Wrap-Around Terrace',
        agentId: 'agent-1',
        agentName: 'Elena Rostova',
        userName: 'Alexander Wright',
        userEmail: 'alex.wright@example.com',
        userPhone: '+36 20 555 0192',
        message: 'Could you please confirm if private storage unit in the underground garage is included in the purchase price?',
        createdAt: '2026-03-17 14:30',
        status: 'Replied'
      },
      {
        id: 'inq-2',
        propertyId: 'prop-3',
        propertyTitle: 'Grand Monumental Canal House with Private Garden',
        agentId: 'agent-3',
        agentName: 'Saskia van der Meer',
        userName: 'Alexander Wright',
        userEmail: 'alex.wright@example.com',
        userPhone: '+31 6 1234 5678',
        message: 'Interested in structural survey history and municipal foundation permits for the Keizersgracht property.',
        createdAt: '2026-03-18 09:15',
        status: 'Pending'
      }
    ];
  });

  // 6. Viewings
  const [viewings, setViewings] = useState<ScheduledViewing[]>(() => {
    try {
      const saved = localStorage.getItem('homefinder_viewings');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'view-1',
        propertyId: 'prop-2',
        propertyTitle: 'Historic Herrengasse Residence near Hofburg Palace',
        propertyAddress: 'Herrengasse 8, Vienna',
        propertyImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80',
        agentName: 'Maximilian Weiss',
        date: '2026-03-24',
        timeSlot: '14:00 - 15:00',
        userName: 'Alexander Wright',
        userEmail: 'alex.wright@example.com',
        userPhone: '+43 676 1234567',
        notes: 'Would like to inspect original floor joists and courtyard balcony.',
        status: 'Confirmed',
        createdAt: '2026-03-16 11:20'
      }
    ];
  });

  // 7. Compare IDs (up to 4)
  const [compareIds, setCompareIds] = useState<string[]>(['prop-1', 'prop-2']);

  // 8. User profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('homefinder_profile');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      name: 'Alexander Wright',
      email: 'alex.wright@example.com',
      phone: '+44 7700 900142',
      preferredCity: 'Budapest',
      notificationEmail: true,
      notificationSms: false
    };
  });

  // 9. Navigation route
  const [currentRoute, setCurrentRoute] = useState<PageRoute>({ name: 'home' });

  // 10. Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // LocalStorage synchronizations
  useEffect(() => {
    localStorage.setItem('homefinder_properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('homefinder_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('homefinder_recent_views', JSON.stringify(recentViews));
  }, [recentViews]);

  useEffect(() => {
    localStorage.setItem('homefinder_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('homefinder_viewings', JSON.stringify(viewings));
  }, [viewings]);

  useEffect(() => {
    localStorage.setItem('homefinder_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  const addToast = (title: string, description?: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4);
    const newToast: ToastMessage = { id, title, description, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigate = (route: PageRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFavorite = (propertyId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(propertyId);
      if (exists) {
        addToast('Removed from Favorites', 'Property removed from your saved list.', 'info');
        return prev.filter((id) => id !== propertyId);
      } else {
        addToast('Saved to Favorites', 'Property added to your shortlist.', 'success');
        return [...prev, propertyId];
      }
    });
  };

  const isFavorite = (propertyId: string) => favorites.includes(propertyId);

  const recordView = (propertyId: string) => {
    setRecentViews((prev) => {
      const filtered = prev.filter((id) => id !== propertyId);
      return [propertyId, ...filtered].slice(0, 10);
    });
  };

  const addProperty = (newProp: Partial<Property>): string => {
    const id = 'prop-' + Date.now();
    const fullProp: Property = {
      id,
      title: newProp.title || 'Untitled Property',
      listingType: newProp.listingType || 'sale',
      propertyType: newProp.propertyType || 'apartment',
      price: newProp.price || 300000,
      currency: '€',
      address: newProp.address || 'Central Avenue',
      city: (newProp.city as any) || 'Budapest',
      district: newProp.district || 'City Center',
      zipCode: newProp.zipCode || '1000',
      coordinates: newProp.coordinates || { lat: 47.4979, lng: 19.0402 },
      bedrooms: Number(newProp.bedrooms) || 1,
      bathrooms: Number(newProp.bathrooms) || 1,
      area: Number(newProp.area) || 60,
      yearBuilt: Number(newProp.yearBuilt) || 2023,
      energyRating: newProp.energyRating || 'A',
      parking: Boolean(newProp.parking),
      furnished: Boolean(newProp.furnished),
      images: newProp.images && newProp.images.length > 0 ? newProp.images : [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
      ],
      description: newProp.description || 'Spacious modern residence with premium finishes.',
      amenities: newProp.amenities || ['Elevator', 'Balcony'],
      agentId: newProp.agentId || 'agent-1',
      featured: false,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active'
    };

    setProperties((prev) => [fullProp, ...prev]);
    addToast('Listing Published', 'Your property is now live on HomeFinder marketplace.', 'success');
    return id;
  };

  const updatePropertyStatus = (propertyId: string, status: 'active' | 'pending' | 'sold') => {
    setProperties((prev) =>
      prev.map((p) => (p.id === propertyId ? { ...p, status } : p))
    );
    addToast('Status Updated', `Property marked as ${status}.`, 'info');
  };

  const toggleFeatureProperty = (propertyId: string) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === propertyId ? { ...p, featured: !p.featured } : p))
    );
    addToast('Listing Updated', 'Property featured status toggled.', 'success');
  };

  const deleteProperty = (propertyId: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== propertyId));
    setFavorites((prev) => prev.filter((id) => id !== propertyId));
    setCompareIds((prev) => prev.filter((id) => id !== propertyId));
    addToast('Listing Deleted', 'Property removed from directory.', 'info');
  };

  const addInquiry = (inquiry: Omit<PropertyInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: PropertyInquiry = {
      ...inquiry,
      id: 'inq-' + Date.now(),
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Pending'
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    addToast('Inquiry Sent', `The listing agent will contact you shortly at ${inquiry.userEmail}.`, 'success');
  };

  const scheduleViewing = (viewing: Omit<ScheduledViewing, 'id' | 'createdAt' | 'status'>) => {
    const newViewing: ScheduledViewing = {
      ...viewing,
      id: 'view-' + Date.now(),
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Confirmed'
    };
    setViewings((prev) => [newViewing, ...prev]);
    addToast('Viewing Confirmed!', `Appointment scheduled for ${viewing.date} (${viewing.timeSlot}).`, 'success');
  };

  const cancelViewing = (viewingId: string) => {
    setViewings((prev) =>
      prev.map((v) => (v.id === viewingId ? { ...v, status: 'Cancelled' as const } : v))
    );
    addToast('Viewing Cancelled', 'Your viewing appointment has been cancelled.', 'info');
  };

  const addToCompare = (propertyId: string) => {
    if (compareIds.includes(propertyId)) {
      addToast('Already in Comparison', 'This property is already selected for comparison.', 'info');
      return;
    }
    if (compareIds.length >= 4) {
      addToast('Limit Reached', 'You can compare up to 4 properties at once.', 'error');
      return;
    }
    setCompareIds((prev) => [...prev, propertyId]);
    addToast('Added to Compare', 'Added to your property comparison table.', 'success');
  };

  const removeFromCompare = (propertyId: string) => {
    setCompareIds((prev) => prev.filter((id) => id !== propertyId));
  };

  const clearCompare = () => {
    setCompareIds([]);
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...profile }));
    addToast('Profile Updated', 'Your settings and contact preferences were saved.', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        properties,
        agents,
        favorites,
        recentViews,
        inquiries,
        viewings,
        toasts,
        currentRoute,
        compareIds,
        userProfile,
        navigate,
        toggleFavorite,
        isFavorite,
        addProperty,
        updatePropertyStatus,
        toggleFeatureProperty,
        deleteProperty,
        addInquiry,
        scheduleViewing,
        cancelViewing,
        addToCompare,
        removeFromCompare,
        clearCompare,
        recordView,
        addToast,
        removeToast,
        updateUserProfile
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
