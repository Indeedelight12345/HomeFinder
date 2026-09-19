import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface DashboardTabItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number | string;
}

interface DashboardSidebarProps {
  title: string;
  subtitle?: string;
  tabs: DashboardTabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  title,
  subtitle,
  tabs,
  activeTab,
  onTabChange
}) => {
  return (
    <aside className="w-full lg:w-64 shrink-0 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
      <div className="pb-4 mb-3 border-b border-slate-100 px-2">
        <h2 className="text-base font-bold text-slate-900 font-serif">{title}</h2>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>

      <nav className="space-y-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </div>
              {tab.badge !== undefined && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
