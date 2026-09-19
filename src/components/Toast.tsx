import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          id={`toast-${toast.id}`}
          className="pointer-events-auto flex items-start gap-3 p-4 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200/80 shadow-xl transition-all duration-300 animate-in slide-in-from-bottom-5"
        >
          {toast.type === 'success' && (
            <div className="p-1 rounded-full bg-emerald-100 text-emerald-600 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          )}
          {toast.type === 'error' && (
            <div className="p-1 rounded-full bg-rose-100 text-rose-600 shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
          )}
          {toast.type === 'info' && (
            <div className="p-1 rounded-full bg-blue-100 text-blue-600 shrink-0">
              <Info className="w-5 h-5" />
            </div>
          )}
          <div className="flex-1 min-w-0 pt-0.5">
            <h4 className="text-sm font-semibold text-slate-900 leading-tight">
              {toast.title}
            </h4>
            {toast.description && (
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {toast.description}
              </p>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
