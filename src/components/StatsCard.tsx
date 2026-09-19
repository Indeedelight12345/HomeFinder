import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  subtitle?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  trend = 'up',
  icon: Icon,
  subtitle
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            {title}
          </span>
          <span className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 tracking-tight">
            {value}
          </span>
        </div>
        <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-amber-600" />
        </div>
      </div>

      {(change || subtitle) && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          {change && (
            <div className={`flex items-center gap-1 font-semibold ${
              trend === 'up' 
                ? 'text-emerald-600' 
                : trend === 'down' 
                ? 'text-rose-600' 
                : 'text-slate-500'
            }`}>
              {trend === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
              {trend === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
              <span>{change}</span>
            </div>
          )}
          {subtitle && (
            <span className="text-slate-500 text-[11px] truncate">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
