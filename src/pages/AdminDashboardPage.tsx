import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatsCard } from '../components/StatsCard';
import { DashboardSidebar, DashboardTabItem } from '../components/DashboardSidebar';
import { Modal } from '../components/Modal';
import { Agent, Property } from '../types';
import { 
  BarChart3, 
  Building2, 
  Users, 
  MessageSquare, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  Trash2, 
  Edit, 
  Plus, 
  Check, 
  X, 
  ExternalLink,
  Euro,
  Layers,
  Star,
  CheckCircle,
  Clock
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { 
    properties, 
    agents, 
    inquiries, 
    viewings, 
    deleteProperty, 
    toggleFeatureProperty,
    addToast,
    navigate
  } = useApp();

  const [activeTab, setActiveTab] = useState<string>('overview');

  // New Agent Modal State
  const [isAddAgentOpen, setIsAddAgentOpen] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: '',
    title: 'Senior Property Advisor',
    agency: 'HomeFinder Prime Group',
    email: '',
    phone: '',
    city: 'Budapest',
    bio: '',
    languages: 'English, German'
  });

  // Local inquiries state for status mutation in admin
  const [adminInquiries, setAdminInquiries] = useState(inquiries);

  const updateInquiryStatus = (id: string, newStatus: 'Pending' | 'Replied' | 'Viewing Booked') => {
    setAdminInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    addToast('Status Updated', `Inquiry status changed to "${newStatus}".`, 'info');
  };

  // Mock approval queue
  const [pendingListings, setPendingListings] = useState([
    {
      id: 'pending-1',
      title: 'Art Nouveau Apartment overlooking Szabadság Square',
      city: 'Budapest',
      price: 890000,
      seller: 'László Kovács (Owner)',
      date: '2026-09-18',
      type: 'Sale'
    },
    {
      id: 'pending-2',
      title: 'Canal Residence on Keizersgracht with Private Mooring',
      city: 'Amsterdam',
      price: 2450000,
      seller: 'Van Dijk Real Estate',
      date: '2026-09-19',
      type: 'Sale'
    }
  ]);

  const handleApprove = (id: string) => {
    setPendingListings((prev) => prev.filter((p) => p.id !== id));
    addToast('Listing Approved', 'Property approved and published to public marketplace.', 'success');
  };

  const handleReject = (id: string) => {
    setPendingListings((prev) => prev.filter((p) => p.id !== id));
    addToast('Listing Rejected', 'Property declined and sent back with audit remarks.', 'info');
  };

  // Mock platform users
  const mockUsers = [
    { id: 'usr-1', name: 'Eleanor Vance', email: 'eleanor.vance@example.com', role: 'Buyer', status: 'Active', joined: '2026-01-12' },
    { id: 'usr-2', name: 'Dr. Markus Weber', email: 'markus.weber@wien.at', role: 'Investor', status: 'Active', joined: '2026-02-04' },
    { id: 'usr-3', name: 'Sophie de Jong', email: 'sophie.jong@amsterdam.nl', role: 'Seller', status: 'Active', joined: '2026-03-21' },
    { id: 'usr-4', name: 'Jan Novák', email: 'jan.novak@prague.cz', role: 'Buyer', status: 'Pending Verification', joined: '2026-04-10' },
    { id: 'usr-5', name: 'Aleksandra Kowalska', email: 'a.kowalska@warszawa.pl', role: 'Broker', status: 'Active', joined: '2026-05-18' }
  ];

  // Calculated Stats
  const forSaleCount = properties.filter((p) => p.listingType === 'sale').length;
  const forRentCount = properties.filter((p) => p.listingType === 'rent').length;
  const totalVolume = properties.reduce((acc, p) => acc + p.price, 0);

  const tabs: DashboardTabItem[] = [
    { id: 'overview', label: 'Executive Overview', icon: BarChart3 },
    { id: 'listings', label: 'Manage Listings', icon: Building2, badge: properties.length },
    { id: 'approvals', label: 'Pending Approvals', icon: ShieldCheck, badge: pendingListings.length },
    { id: 'inquiries', label: 'Inquiry Dispatch', icon: MessageSquare, badge: adminInquiries.length },
    { id: 'agents', label: 'Brokers & Agents', icon: Star, badge: agents.length },
    { id: 'users', label: 'Platform Users', icon: Users, badge: mockUsers.length }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Brokerage Management & Administration</span>
          </div>
          <h1 className="text-3xl font-bold font-serif">HomeFinder Operations Console</h1>
          <p className="text-xs text-slate-400 mt-1">
            Platform governance, listing quality control, and regional agent coordination.
          </p>
        </div>

        <button
          onClick={() => navigate({ name: 'list-property' })}
          className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Listing</span>
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar */}
        <DashboardSidebar
          title="Admin Control"
          subtitle="System governance"
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          
          {/* TAB 1: EXECUTIVE OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in">
              {/* Metric Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <StatsCard
                  title="Total Portfolio Value"
                  value={`€${(totalVolume / 1000000).toFixed(1)}M`}
                  change="+14.2% MoM"
                  trend="up"
                  icon={Euro}
                  subtitle="Across 5 European capitals"
                />
                <StatsCard
                  title="Active Listings"
                  value={properties.length}
                  change={`${forSaleCount} sale • ${forRentCount} rent`}
                  trend="neutral"
                  icon={Building2}
                  subtitle="98.5% occupancy/viewing rate"
                />
                <StatsCard
                  title="Direct Client Inquiries"
                  value={adminInquiries.length + 24}
                  change="+28% this week"
                  trend="up"
                  icon={MessageSquare}
                  subtitle="Avg. response time: 24 mins"
                />
                <StatsCard
                  title="Scheduled Private Viewings"
                  value={viewings.length + 18}
                  change="+6 upcoming today"
                  trend="up"
                  icon={Calendar}
                  subtitle="Escorted by certified brokers"
                />
                <StatsCard
                  title="Accredited Agents"
                  value={agents.length}
                  change="4.9 ★ avg rating"
                  trend="up"
                  icon={Star}
                  subtitle="Budapest, Vienna, Amsterdam, Prague, Warsaw"
                />
                <StatsCard
                  title="Pending Compliance Audits"
                  value={pendingListings.length}
                  change="Awaiting verification"
                  trend="down"
                  icon={ShieldCheck}
                  subtitle="Title & notary inspection"
                />
              </div>

              {/* Quick Action Tables in Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Pending Verification Snippet */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="text-base font-bold font-serif text-slate-900">
                      Pending Title Verifications
                    </h3>
                    <button
                      onClick={() => setActiveTab('approvals')}
                      className="text-xs font-semibold text-amber-700 hover:underline"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-3">
                    {pendingListings.map((p) => (
                      <div key={p.id} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
                        <div>
                          <h4 className="font-bold text-slate-900 line-clamp-1">{p.title}</h4>
                          <span className="text-slate-500">{p.city} • €{p.price.toLocaleString()} • {p.seller}</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => handleApprove(p.id)}
                            className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-xs cursor-pointer"
                            title="Approve"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleReject(p.id)}
                            className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-xs cursor-pointer"
                            title="Reject"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent High-Intent Inquiries */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="text-base font-bold font-serif text-slate-900">
                      Recent Inbound Inquiries
                    </h3>
                    <button
                      onClick={() => setActiveTab('inquiries')}
                      className="text-xs font-semibold text-amber-700 hover:underline"
                    >
                      Dispatch Console
                    </button>
                  </div>

                  <div className="space-y-3">
                    {adminInquiries.slice(0, 3).map((inq) => (
                      <div key={inq.id} className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{inq.userName}</span>
                          <span className="text-[10px] text-slate-400">{inq.createdAt}</span>
                        </div>
                        <p className="text-slate-600 line-clamp-1 italic">&quot;{inq.message}&quot;</p>
                        <div className="text-[11px] text-amber-700 font-medium">
                          Target: {inq.propertyTitle}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: MANAGE LISTINGS */}
          {activeTab === 'listings' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-bold font-serif text-slate-900">
                    Inventory & Property Database ({properties.length})
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Toggle homepage featured status, view metrics, or remove listings.
                  </p>
                </div>
                <button
                  onClick={() => navigate({ name: 'list-property' })}
                  className="px-4 py-2 bg-slate-900 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Property</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="pb-3">Property</th>
                      <th className="pb-3">Type</th>
                      <th className="pb-3">Location</th>
                      <th className="pb-3">Price</th>
                      <th className="pb-3">Featured</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {properties.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/70">
                        <td className="py-3 pr-3">
                          <div className="flex items-center gap-3">
                            <img src={p.images[0]} alt="" className="w-12 h-10 rounded-lg object-cover" />
                            <div>
                              <h4 
                                onClick={() => navigate({ name: 'details', propertyId: p.id })}
                                className="font-bold text-slate-900 hover:text-amber-600 cursor-pointer line-clamp-1 text-xs"
                              >
                                {p.title}
                              </h4>
                              <span className="text-[11px] text-slate-400">Ref: {p.id}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            p.listingType === 'sale' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {p.listingType}
                          </span>
                        </td>

                        <td className="py-3 text-slate-600">
                          {p.city}, {p.district}
                        </td>

                        <td className="py-3 font-bold text-slate-900">
                          €{p.price.toLocaleString()}
                        </td>

                        <td className="py-3">
                          <button
                            onClick={() => toggleFeatureProperty(p.id)}
                            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                              p.featured
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'text-slate-400 hover:text-slate-700'
                            }`}
                            title="Toggle Featured on Homepage"
                          >
                            <Sparkles className={`w-3.5 h-3.5 ${p.featured ? 'fill-amber-500 text-amber-500' : ''}`} />
                            <span>{p.featured ? 'Featured' : 'Standard'}</span>
                          </button>
                        </td>

                        <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => navigate({ name: 'details', propertyId: p.id })}
                              className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100"
                              title="Open public page"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteProperty(p.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 cursor-pointer"
                              title="Delete Listing"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: PENDING APPROVALS */}
          {activeTab === 'approvals' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6 animate-in fade-in">
              <div className="pb-4 border-b border-slate-100">
                <h3 className="text-xl font-bold font-serif text-slate-900">
                  Compliance & Title Verification Queue
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Submissions pending legal notary verification, energy certification, and anti-fraud checks.
                </p>
              </div>

              {pendingListings.length === 0 ? (
                <div className="p-12 text-center text-slate-500">
                  <CheckCircle className="w-12 h-12 mx-auto text-emerald-500 mb-2" />
                  <p className="font-bold text-slate-900">Queue Clear</p>
                  <p className="text-xs text-slate-400">All submitted property titles have been audited.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingListings.map((p) => (
                    <div key={p.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block">
                          Submitted on {p.date} • {p.type}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 font-serif">{p.title}</h4>
                        <p className="text-xs text-slate-600 mt-1">
                          Location: <strong>{p.city}</strong> • Asking: <strong>€{p.price.toLocaleString()}</strong> • Applicant: <strong>{p.seller}</strong>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => handleApprove(p.id)}
                          className="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Check className="w-4 h-4" />
                          <span>Approve & Publish</span>
                        </button>
                        <button
                          onClick={() => handleReject(p.id)}
                          className="flex-1 sm:flex-none px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <X className="w-4 h-4" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: INQUIRIES DISPATCH */}
          {activeTab === 'inquiries' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6 animate-in fade-in">
              <div className="pb-4 border-b border-slate-100">
                <h3 className="text-xl font-bold font-serif text-slate-900">
                  Lead & Inquiry Dispatch
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Monitor buyer communications, re-assign agents, and update inquiry workflow statuses.
                </p>
              </div>

              <div className="space-y-4">
                {adminInquiries.map((inq) => (
                  <div key={inq.id} className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div>
                        <span className="text-xs font-bold text-slate-900">{inq.userName}</span>
                        <span className="text-xs text-slate-500 ml-2">({inq.userEmail} • {inq.userPhone})</span>
                        <p className="text-[11px] text-amber-700 font-semibold mt-0.5">
                          Listing: {inq.propertyTitle} (Agent: {inq.agentName})
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={inq.status}
                          onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                          className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-xs font-semibold text-slate-700 cursor-pointer"
                        >
                          <option value="Pending">Status: Pending</option>
                          <option value="Replied">Status: Replied</option>
                          <option value="Viewing Booked">Status: Viewing Booked</option>
                        </select>
                        <span className="text-[11px] text-slate-400">{inq.createdAt}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl italic">
                      &quot;{inq.message}&quot;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: AGENTS & BROKERS */}
          {activeTab === 'agents' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-bold font-serif text-slate-900">
                    Licensed Regional Brokers ({agents.length})
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Accredited European advisors with client ratings and portfolio counts.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddAgentOpen(true)}
                  className="px-4 py-2 bg-slate-900 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Broker</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {agents.map((agent) => {
                  const agentProps = properties.filter((p) => p.agentId === agent.id);
                  return (
                    <div key={agent.id} className="p-4 rounded-2xl border border-slate-200 flex items-start gap-4">
                      <img src={agent.avatar} alt={agent.name} className="w-14 h-14 rounded-2xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-900 text-sm">{agent.name}</h4>
                          <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            {agent.rating}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">{agent.title} • {agent.city}</p>
                        <p className="text-xs text-slate-700 font-semibold mt-1">
                          {agentProps.length} active listings
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 6: PLATFORM USERS */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6 animate-in fade-in">
              <div className="pb-4 border-b border-slate-100">
                <h3 className="text-xl font-bold font-serif text-slate-900">
                  Registered Clients & Investors
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verified user accounts across European metropolitan jurisdictions.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="pb-3">User</th>
                      <th className="pb-3">Email</th>
                      <th className="pb-3">Role</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {mockUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50">
                        <td className="py-3 font-bold text-slate-900">{u.name}</td>
                        <td className="py-3 text-slate-600">{u.email}</td>
                        <td className="py-3 font-semibold text-slate-800">{u.role}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            u.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="py-3 text-slate-400">{u.joined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Add Agent Modal */}
      <Modal
        isOpen={isAddAgentOpen}
        onClose={() => setIsAddAgentOpen(false)}
        title="Register New Broker"
        subtitle="Add a certified real estate advisor to HomeFinder"
        maxWidth="md"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsAddAgentOpen(false);
            addToast('Broker Registered', `${newAgent.name} added to accredited agent directory.`, 'success');
          }}
          className="space-y-4 text-xs"
        >
          <div>
            <label className="font-bold text-slate-700 block mb-1">Full Name</label>
            <input
              type="text"
              required
              value={newAgent.name}
              onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
              placeholder="e.g. Thomas Bauer"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">City Hub</label>
              <select
                value={newAgent.city}
                onChange={(e) => setNewAgent({ ...newAgent, city: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
              >
                <option value="Budapest">Budapest</option>
                <option value="Vienna">Vienna</option>
                <option value="Amsterdam">Amsterdam</option>
                <option value="Prague">Prague</option>
                <option value="Warsaw">Warsaw</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Title</label>
              <input
                type="text"
                value={newAgent.title}
                onChange={(e) => setNewAgent({ ...newAgent, title: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Email</label>
              <input
                type="email"
                required
                value={newAgent.email}
                onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Phone</label>
              <input
                type="tel"
                required
                value={newAgent.phone}
                onChange={(e) => setNewAgent({ ...newAgent, phone: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddAgentOpen(false)}
              className="px-4 py-2 border border-slate-200 rounded-xl font-semibold text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-amber-600 transition-colors"
            >
              Register Broker
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
