import React from 'react';
import { Agent } from '../types';
import { useApp } from '../context/AppContext';
import { 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Building2, 
  CheckCircle, 
  Globe, 
  MessageSquare 
} from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
  onContactClick?: (agent: Agent) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onContactClick }) => {
  const { navigate } = useApp();

  return (
    <div 
      id={`agent-card-${agent.id}`}
      className="bg-white rounded-2xl border border-slate-200/90 hover:border-amber-500/40 p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative shrink-0">
            <img
              src={agent.avatar}
              alt={agent.name}
              className="w-18 h-18 rounded-2xl object-cover border-2 border-slate-100 shadow-md"
            />
            <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white p-1 rounded-full shadow-xs" title="Certified EU Broker">
              <CheckCircle className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-slate-900 font-serif leading-tight">
              {agent.name}
            </h3>
            <p className="text-xs text-amber-700 font-medium mt-0.5">
              {agent.title}
            </p>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>{agent.city} Office</span>
            </div>
          </div>
        </div>

        {/* Rating and Listings stats */}
        <div className="grid grid-cols-2 gap-2 py-3 px-3.5 bg-slate-50 rounded-xl mb-4 border border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block leading-tight">{agent.rating}</span>
              <span className="text-[10px] text-slate-600">{agent.reviewsCount} reviews</span>
            </div>
          </div>

          <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
            <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4 text-slate-700" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block leading-tight">{agent.listingsCount}</span>
              <span className="text-[10px] text-slate-600">Active Listings</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
          {agent.bio}
        </p>

        {/* Languages */}
        <div className="flex items-center gap-1.5 flex-wrap mb-5 text-[11px] text-slate-600">
          <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {agent.languages.map((lang) => (
            <span key={lang} className="bg-slate-100 px-2 py-0.5 rounded-md font-medium">
              {lang}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => navigate({ name: 'agents', agentId: agent.id })}
          className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer text-center"
        >
          View Listings
        </button>

        <button
          type="button"
          onClick={() => onContactClick ? onContactClick(agent) : navigate({ name: 'agents', agentId: agent.id })}
          className="px-3 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-amber-600 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Inquire</span>
        </button>
      </div>
    </div>
  );
};
