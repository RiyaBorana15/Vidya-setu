import React from 'react';
import { 
  Star, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Globe, 
  Award, 
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

export default function TeacherCard({ teacher, onBookSlot }) {
  return (
    <div className="pro-card p-6 flex flex-col justify-between border border-white/10 hover:border-indigo-500/60 transition-all rounded-3xl space-y-5 group">
      <div>
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={teacher.avatar}
                alt={teacher.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-400/80 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform"
              />
              <span className="w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-900 absolute -bottom-1 -right-1 shadow-sm"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base sm:text-lg font-black text-white font-['Outfit']">{teacher.name}</h3>
                <ShieldCheck size={16} className="text-cyan-400 shrink-0" title="Govt & RCI Certified Specialist" />
              </div>
              <p className="text-xs text-indigo-300 font-semibold">{teacher.title}</p>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-amber-400 font-black">
                  <Star size={12} className="fill-current" /> {teacher.rating}
                </span>
                <span>•</span>
                <span>{teacher.reviewsCount} reviews</span>
                <span>•</span>
                <span className="text-slate-300 font-semibold">{teacher.experience} exp</span>
              </div>
            </div>
          </div>

          <span className="badge-pro bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 text-[9px] whitespace-nowrap">
            {teacher.badge}
          </span>
        </div>

        {/* Qualification & Bio */}
        <div className="mt-3.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-slate-300">
          <strong className="text-cyan-300 font-bold">Credential:</strong> {teacher.qualification}
        </div>

        <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed">
          {teacher.bio}
        </p>

        {/* Specialties Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3.5">
          {teacher.specialties.map((spec, i) => (
            <span
              key={i}
              className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300 group-hover:border-white/20 transition-colors"
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Languages */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-3">
          <Globe size={13} className="text-cyan-400" />
          <span>Languages: <strong className="text-slate-200">{teacher.languages.join(', ')}</strong></span>
        </div>
      </div>

      {/* Available Slots & Booking Trigger */}
      <div className="pt-4 border-t border-white/10 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Available Slots Today:</span>
          <span className="text-emerald-400 font-black flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            {teacher.availableSlots.filter(s => !s.isBooked).length} Open
          </span>
        </div>

        {/* Quick Slot Buttons */}
        <div className="grid grid-cols-2 gap-2">
          {teacher.availableSlots.slice(0, 2).map((slot) => (
            <button
              key={slot.id}
              disabled={slot.isBooked}
              onClick={() => {
                soundEffects.playClick();
                onBookSlot(teacher, slot);
              }}
              className={`p-2.5 rounded-xl text-[11px] font-bold border transition-all text-center cursor-pointer ${
                slot.isBooked
                  ? 'bg-slate-900/50 border-white/5 text-slate-600 cursor-not-allowed'
                  : 'bg-indigo-600/20 border-indigo-500/40 text-indigo-200 hover:bg-indigo-600 hover:text-white'
              }`}
            >
              <div className="truncate font-black">{slot.time.split(' - ')[0]}</div>
              <div className="text-[9px] text-slate-400 truncate">{slot.type}</div>
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            soundEffects.playClick();
            onBookSlot(teacher, teacher.availableSlots[0]);
          }}
          className="btn-pro btn-gradient-indigo w-full py-3 text-xs font-black cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
        >
          <Calendar size={14} />
          <span>Book 1-on-1 Inclusive Slot</span>
        </button>
      </div>
    </div>
  );
}
