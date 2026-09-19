import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Award, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, addToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      addToast('Invalid Email', 'Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    addToast('Subscribed!', 'You will now receive weekly prime real-estate briefings.', 'success');
  };

  const handleCityClick = (city: string) => {
    navigate({ name: 'search', initialFilters: { city } });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold font-serif text-white tracking-tight">
                HomeFinder
              </span>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Connecting international buyers, discerning tenants, and high-net-worth investors with the finest historical and contemporary residences across Central Europe’s capital cities.
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Verified Legal Title</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Licensed EU Realtors</span>
              </div>
            </div>

            <div className="space-y-2 text-sm text-slate-400 pt-2">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400/80 shrink-0" />
                <span>Váci utca 36, 1052 Budapest, Hungary</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400/80 shrink-0" />
                <span>+43 1 718 4000 (Central Europe HQ)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400/80 shrink-0" />
                <span>concierge@homefinder.eu</span>
              </div>
            </div>
          </div>

          {/* Capital Cities */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Prime Markets
            </h4>
            <ul className="space-y-2.5 text-sm">
              {['Budapest', 'Vienna', 'Amsterdam', 'Prague', 'Warsaw'].map((city) => (
                <li key={city}>
                  <button
                    onClick={() => handleCityClick(city)}
                    className="text-slate-400 hover:text-amber-400 transition-colors text-left cursor-pointer"
                  >
                    {city} Properties
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigate({ name: 'search', initialFilters: { listingType: 'sale' } })}
                  className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Properties for Sale
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate({ name: 'search', initialFilters: { listingType: 'rent' } })}
                  className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Luxury Rentals
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate({ name: 'list-property' })}
                  className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  List Your Property
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate({ name: 'agents' })}
                  className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Certified Agents
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate({ name: 'favorites' })}
                  className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Saved Shortlist
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate({ name: 'admin-dashboard' })}
                  className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Admin Management
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">
              Market Intelligence
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to off-market listing alerts, European mortgage updates, and prime yield analyses.
            </p>

            {subscribed ? (
              <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you. You are subscribed to market alerts.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Subscribe to Intelligence</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} HomeFinder Real Estate Group B.V. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">GDPR Compliance</span>
            <span className="hover:text-slate-400 cursor-pointer">Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
