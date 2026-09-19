import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Agent } from '../types';
import { AgentCard } from '../components/AgentCard';
import { PropertyCard } from '../components/PropertyCard';
import { ContactForm } from '../components/ContactForm';
import { Modal } from '../components/Modal';
import { 
  Users, 
  Search, 
  MapPin, 
  Star, 
  Phone, 
  Mail, 
  Globe, 
  Award, 
  Building2, 
  ArrowLeft,
  MessageSquare
} from 'lucide-react';

interface AgentsPageProps {
  selectedAgentId?: string;
}

export const AgentsPage: React.FC<AgentsPageProps> = ({ selectedAgentId }) => {
  const { agents, properties, currentRoute, navigate } = useApp();

  const routeAgentId = (currentRoute as any).agentId || selectedAgentId;
  const [activeAgentId, setActiveAgentId] = useState<string | null>(routeAgentId || null);
  const [searchCity, setSearchCity] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [contactModalAgent, setContactModalAgent] = useState<Agent | null>(null);

  const filteredAgents = agents.filter((agent) => {
    if (searchCity && agent.city.toLowerCase() !== searchCity.toLowerCase()) {
      return false;
    }
    if (searchKeyword) {
      const q = searchKeyword.toLowerCase();
      const matches = 
        agent.name.toLowerCase().includes(q) ||
        agent.title.toLowerCase().includes(q) ||
        agent.bio.toLowerCase().includes(q) ||
        agent.languages.some((l) => l.toLowerCase().includes(q));
      if (!matches) return false;
    }
    return true;
  });

  const selectedAgent = activeAgentId ? agents.find((a) => a.id === activeAgentId) : null;
  const agentProperties = selectedAgent 
    ? properties.filter((p) => p.agentId === selectedAgent.id)
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* If an Agent Profile is selected */}
      {selectedAgent ? (
        <div className="space-y-8 animate-in fade-in">
          {/* Back button */}
          <button
            onClick={() => setActiveAgentId(null)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Agents</span>
          </button>

          {/* Profile Hero Header */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start gap-8">
            <img
              src={selectedAgent.avatar}
              alt={selectedAgent.name}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl object-cover border-4 border-slate-100 shadow-md shrink-0"
            />

            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block">
                    {selectedAgent.agency}
                  </span>
                  <h1 className="text-3xl font-bold font-serif text-slate-900 tracking-tight">
                    {selectedAgent.name}
                  </h1>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">
                    {selectedAgent.title} • {selectedAgent.city} Hub
                  </p>
                </div>

                <button
                  onClick={() => setContactModalAgent(selectedAgent)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-amber-600 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Direct Message</span>
                </button>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                {selectedAgent.bio}
              </p>

              {/* Contact meta */}
              <div className="flex flex-wrap items-center gap-6 pt-3 text-xs text-slate-600 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-amber-600" />
                  <span className="font-semibold text-slate-800">{selectedAgent.phone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-amber-600" />
                  <span className="font-semibold text-slate-800">{selectedAgent.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="font-bold text-slate-900">{selectedAgent.rating}</span>
                  <span className="text-slate-500">({selectedAgent.reviewsCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <span>Languages: {selectedAgent.languages.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Agent's Active Listings */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-0.5">
                  Portfolio Representation
                </span>
                <h3 className="text-2xl font-bold font-serif text-slate-900">
                  Active Listings by {selectedAgent.name} ({agentProperties.length})
                </h3>
              </div>
            </div>

            {agentProperties.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-sm text-slate-500">
                This agent currently has no public listings available.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agentProperties.map((p) => (
                  <PropertyCard key={p.id} property={p} layout="grid" />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Agent Directory View */
        <div className="space-y-8">
          <div className="pb-6 border-b border-slate-200">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
              <Users className="w-4 h-4" />
              <span>Certified Real Estate Experts</span>
            </div>
            <h1 className="text-3xl font-bold font-serif text-slate-900 tracking-tight">
              Our Prime Brokers & Advisors
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Connect with certified realtors licensed across Budapest, Vienna, Amsterdam, Prague, and Warsaw.
            </p>
          </div>

          {/* Search & City Filter Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Search agent by name, language..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {['', 'Budapest', 'Vienna', 'Amsterdam', 'Prague', 'Warsaw'].map((city) => (
                <button
                  key={city || 'all'}
                  onClick={() => setSearchCity(city)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    searchCity === city
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {city || 'All Cities'}
                </button>
              ))}
            </div>
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onContactClick={(a) => setContactModalAgent(a)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Direct Contact Modal */}
      {contactModalAgent && (
        <Modal
          isOpen={Boolean(contactModalAgent)}
          onClose={() => setContactModalAgent(null)}
          title={`Contact ${contactModalAgent.name}`}
          subtitle={`${contactModalAgent.title} • ${contactModalAgent.city}`}
          maxWidth="md"
        >
          <ContactForm
            agent={contactModalAgent}
            onSuccess={() => {
              setTimeout(() => setContactModalAgent(null), 1500);
            }}
          />
        </Modal>
      )}

    </div>
  );
};
