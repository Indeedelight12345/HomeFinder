import React, { useState } from 'react';
import { Property, Agent } from '../types';
import { useApp } from '../context/AppContext';
import { Modal } from './Modal';
import { Calendar, Clock, CheckCircle2, User, Phone, Mail } from 'lucide-react';

interface ScheduleViewingModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
  agent?: Agent;
}

export const ScheduleViewingModal: React.FC<ScheduleViewingModalProps> = ({
  isOpen,
  onClose,
  property,
  agent
}) => {
  const { scheduleViewing, userProfile } = useApp();

  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('14:00 - 15:00');
  const [name, setName] = useState(userProfile.name || '');
  const [email, setEmail] = useState(userProfile.email || '');
  const [phone, setPhone] = useState(userProfile.phone || '');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const availableSlots = [
    '10:00 - 11:00',
    '11:30 - 12:30',
    '14:00 - 15:00',
    '15:30 - 16:30',
    '17:00 - 18:00'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !date) return;

    scheduleViewing({
      propertyId: property.id,
      propertyTitle: property.title,
      propertyAddress: `${property.address}, ${property.city}`,
      propertyImage: property.images[0],
      agentName: agent?.name || 'Assigned HomeFinder Broker',
      date,
      timeSlot,
      userName: name,
      userEmail: email,
      userPhone: phone,
      notes
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Schedule Private Viewing"
      subtitle={`Exclusive in-person or virtual tour for ${property.title}`}
      maxWidth="lg"
    >
      {submitted ? (
        <div className="text-center py-8 space-y-3 animate-in zoom-in-95">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-slate-900 font-serif">
            Viewing Appointment Reserved!
          </h4>
          <p className="text-sm text-slate-600">
            A confirmation calendar invitation has been sent to <strong>{email}</strong> for {date} at {timeSlot}.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Property snippet */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-14 h-14 rounded-lg object-cover"
            />
            <div className="min-w-0">
              <h5 className="text-xs font-bold text-slate-900 truncate">{property.title}</h5>
              <p className="text-[11px] text-slate-500 truncate">{property.address}, {property.city}</p>
              <p className="text-xs font-semibold text-amber-600 mt-0.5">
                €{new Intl.NumberFormat('de-DE').format(property.price)}
              </p>
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              <span>Select Date</span>
            </label>
            <input
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-amber-500 cursor-pointer"
            />
          </div>

          {/* Time Slot Picker */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Preferred Time Slot</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableSlots.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setTimeSlot(slot)}
                  className={`py-2 px-2.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                    timeSlot === slot
                      ? 'bg-amber-600 border-amber-600 text-white shadow-xs'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                Contact Phone
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+43 / +36 / +48 ..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
              Email for Confirmation
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
              Special Requests or Questions (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Would like to discuss financing options and parking spaces."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm py-3 rounded-xl transition-all shadow-md cursor-pointer"
            >
              Confirm Viewing Appointment
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
