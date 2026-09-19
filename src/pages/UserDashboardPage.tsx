import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DashboardSidebar, DashboardTabItem } from '../components/DashboardSidebar';
import { PropertyCard } from '../components/PropertyCard';
import { 
  Heart, 
  Eye, 
  MessageSquare, 
  Calendar, 
  Settings, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Trash2, 
  CheckCircle2, 
  XCircle,
  ExternalLink
} from 'lucide-react';

export const UserDashboardPage: React.FC = () => {
  const { 
    properties, 
    favorites, 
    recentViews, 
    inquiries, 
    viewings, 
    cancelViewing,
    userProfile, 
    updateUserProfile,
    navigate 
  } = useApp();

  const [activeTab, setActiveTab] = useState<string>('saved');

  // Profile form state
  const [profileForm, setProfileForm] = useState(userProfile);

  const savedProperties = properties.filter((p) => favorites.includes(p.id));
  const viewedProperties = recentViews
    .map((id) => properties.find((p) => p.id === id))
    .filter((p): p is typeof properties[0] => Boolean(p));

  const tabs: DashboardTabItem[] = [
    { id: 'saved', label: 'Saved Properties', icon: Heart, badge: savedProperties.length },
    { id: 'viewed', label: 'Recently Viewed', icon: Eye, badge: viewedProperties.length },
    { id: 'inquiries', label: 'My Inquiries', icon: MessageSquare, badge: inquiries.length },
    { id: 'viewings', label: 'Scheduled Viewings', icon: Calendar, badge: viewings.filter(v => v.status === 'Confirmed').length },
    { id: 'settings', label: 'Account Settings', icon: Settings }
  ];

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(profileForm);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center font-serif text-2xl font-bold">
            {userProfile.name ? userProfile.name[0] : 'U'}
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
              Personal Portal
            </span>
            <h1 className="text-2xl font-bold font-serif">{userProfile.name || 'Member Dashboard'}</h1>
            <p className="text-xs text-slate-400 mt-0.5">{userProfile.email} • Preferred Market: {userProfile.preferredCity}</p>
          </div>
        </div>

        <button
          onClick={() => navigate({ name: 'search' })}
          className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
        >
          Browse New Listings
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar */}
        <DashboardSidebar
          title="User Navigation"
          subtitle="Shortlists, bookings & settings"
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          
          {/* TAB 1: SAVED PROPERTIES */}
          {activeTab === 'saved' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <h3 className="text-xl font-bold font-serif text-slate-900">
                  Saved Shortlist ({savedProperties.length})
                </h3>
              </div>

              {savedProperties.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-500">
                  <Heart className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                  <p className="text-sm">You have not saved any properties yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedProperties.map((p) => (
                    <PropertyCard key={p.id} property={p} layout="grid" />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: RECENTLY VIEWED */}
          {activeTab === 'viewed' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <h3 className="text-xl font-bold font-serif text-slate-900">
                  Recently Viewed ({viewedProperties.length})
                </h3>
              </div>

              {viewedProperties.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-500">
                  <Eye className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                  <p className="text-sm">No recently viewed listings recorded.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {viewedProperties.map((p) => (
                    <PropertyCard key={p.id} property={p} layout="grid" />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROPERTY INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-200">
                <h3 className="text-xl font-bold font-serif text-slate-900">
                  Broker Inquiries & Correspondence
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Track the status of your direct property questions and requests.
                </p>
              </div>

              {inquiries.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-500">
                  <MessageSquare className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                  <p className="text-sm">You haven’t submitted any inquiries yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                        <div>
                          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                            Assigned Broker: {inq.agentName}
                          </span>
                          <h4 
                            onClick={() => inq.propertyId !== 'general-inquiry' && navigate({ name: 'details', propertyId: inq.propertyId })}
                            className="text-sm font-bold text-slate-900 hover:text-amber-600 cursor-pointer"
                          >
                            {inq.propertyTitle}
                          </h4>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            inq.status === 'Replied'
                              ? 'bg-emerald-100 text-emerald-800'
                              : inq.status === 'Viewing Booked'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {inq.status}
                          </span>
                          <span className="text-[11px] text-slate-400">{inq.createdAt}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl leading-relaxed">
                        &quot;{inq.message}&quot;
                      </p>

                      <div className="text-[11px] text-slate-500 flex items-center justify-between">
                        <span>Submitted from {inq.userEmail} ({inq.userPhone})</span>
                        {inq.propertyId !== 'general-inquiry' && (
                          <button
                            onClick={() => navigate({ name: 'details', propertyId: inq.propertyId })}
                            className="text-amber-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>Open Property</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SCHEDULED VIEWINGS */}
          {activeTab === 'viewings' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-200">
                <h3 className="text-xl font-bold font-serif text-slate-900">
                  Scheduled Private Viewings
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Your upcoming escorted appointments with certified brokers.
                </p>
              </div>

              {viewings.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-500">
                  <Calendar className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                  <p className="text-sm">No viewing appointments booked yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {viewings.map((view) => (
                    <div
                      key={view.id}
                      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={view.propertyImage}
                          alt={view.propertyTitle}
                          className="w-20 h-20 rounded-xl object-cover shrink-0"
                        />
                        <div className="space-y-1">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase inline-block ${
                            view.status === 'Confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {view.status}
                          </span>
                          <h4 
                            onClick={() => navigate({ name: 'details', propertyId: view.propertyId })}
                            className="text-sm font-bold text-slate-900 hover:text-amber-600 cursor-pointer line-clamp-1"
                          >
                            {view.propertyTitle}
                          </h4>
                          <p className="text-xs text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-amber-600" />
                            <span>{view.propertyAddress}</span>
                          </p>
                          <div className="flex items-center gap-3 text-xs text-slate-600 pt-1">
                            <span className="font-semibold text-slate-900 flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              {view.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              {view.timeSlot}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-end gap-2 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        {view.status === 'Confirmed' && (
                          <button
                            onClick={() => cancelViewing(view.id)}
                            className="text-xs text-rose-600 hover:text-rose-700 font-semibold px-3 py-1.5 border border-rose-200 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                          >
                            Cancel Appointment
                          </button>
                        )}
                        <button
                          onClick={() => navigate({ name: 'details', propertyId: view.propertyId })}
                          className="text-xs text-slate-900 hover:text-amber-600 font-semibold px-3 py-1.5 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                        >
                          Listing Page
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: ACCOUNT SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <h3 className="text-xl font-bold font-serif text-slate-900">
                  Profile & Contact Preferences
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update your personal details used for viewing requests and agent correspondence.
                </p>
              </div>

              <form onSubmit={handleProfileSave} className="space-y-4 max-w-lg">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                    Primary Email
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                    Mobile Phone
                  </label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                    Primary Search Hub
                  </label>
                  <select
                    value={profileForm.preferredCity}
                    onChange={(e) => setProfileForm({ ...profileForm, preferredCity: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Budapest">Budapest</option>
                    <option value="Vienna">Vienna</option>
                    <option value="Amsterdam">Amsterdam</option>
                    <option value="Prague">Prague</option>
                    <option value="Warsaw">Warsaw</option>
                  </select>
                </div>

                <div className="pt-2 space-y-2 border-t border-slate-100">
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileForm.notificationEmail}
                      onChange={(e) => setProfileForm({ ...profileForm, notificationEmail: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-600 accent-amber-600"
                    />
                    <span>Receive new off-market listings via email</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileForm.notificationSms}
                      onChange={(e) => setProfileForm({ ...profileForm, notificationSms: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-600 accent-amber-600"
                    />
                    <span>Receive viewing SMS reminders</span>
                  </label>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-slate-900 hover:bg-amber-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Save Preferences
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
