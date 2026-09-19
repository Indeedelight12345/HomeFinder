import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Agent, Property } from '../types';
import { Send, CheckCircle2, ShieldCheck, Phone, Mail } from 'lucide-react';

interface ContactFormProps {
  property?: Property;
  agent?: Agent;
  onSuccess?: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ 
  property, 
  agent,
  onSuccess 
}) => {
  const { addInquiry, userProfile, addToast } = useApp();
  
  const [formData, setFormData] = useState({
    name: userProfile.name || '',
    email: userProfile.email || '',
    phone: userProfile.phone || '',
    message: property 
      ? `Hello, I am interested in viewing '${property.title}' at ${property.address}. Please provide further details on acquisition and scheduling.`
      : `Hello ${agent?.name || 'Agent'}, I would like to consult with you regarding property opportunities in Central Europe.`,
    preferredContact: 'email'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email address is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.message.trim() || formData.message.length < 10) newErrors.message = 'Please provide at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setTimeout(() => {
      addInquiry({
        propertyId: property?.id || 'general-inquiry',
        propertyTitle: property?.title || 'General Real Estate Advisory',
        agentId: agent?.id || property?.agentId || 'agent-1',
        agentName: agent?.name || 'Elena Rostova',
        userName: formData.name,
        userEmail: formData.email,
        userPhone: formData.phone,
        message: formData.message
      });

      setSubmitting(false);
      setSubmitted(true);
      if (onSuccess) onSuccess();
    }, 600);
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 text-center animate-in fade-in">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="text-base font-bold text-slate-900 font-serif mb-1">
          Inquiry Successfully Delivered
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          Thank you, {formData.name}. {agent?.name || 'The designated agent'} has received your request and will contact you via {formData.preferredContact} within 4 business hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs font-semibold text-amber-700 hover:text-amber-800 underline cursor-pointer"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Full Name */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
          Your Name <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Baroness Maria von Habsburg"
          className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none transition-colors ${
            errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-amber-500 focus:bg-white'
          }`}
        />
        {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
      </div>

      {/* Email and Phone Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
            Email <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="name@domain.com"
            className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none transition-colors ${
              errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-amber-500 focus:bg-white'
            }`}
          />
          {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
            Phone <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+43 676 ..."
            className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none transition-colors ${
              errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-amber-500 focus:bg-white'
            }`}
          />
          {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
          Message / Specific Questions <span className="text-rose-500">*</span>
        </label>
        <textarea
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none transition-colors ${
            errors.message ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-amber-500 focus:bg-white'
          }`}
        />
        {errors.message && <p className="text-[11px] text-rose-500 mt-1">{errors.message}</p>}
      </div>

      {/* Trust & Guarantee */}
      <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Your data is strictly confidential. No spam or unsolicited third-party marketing.</span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-slate-900 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold text-sm py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
      >
        <Send className="w-4 h-4" />
        <span>{submitting ? 'Transmitting inquiry...' : 'Send Inquiry to Agent'}</span>
      </button>
    </form>
  );
};
