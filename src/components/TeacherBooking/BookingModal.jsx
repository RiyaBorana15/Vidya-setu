import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

export default function BookingModal({ teacher, initialSlot, onClose, onConfirmBooking }) {
  const [selectedDate, setSelectedDate] = useState('2026-08-28');
  const [selectedSlot, setSelectedSlot] = useState(initialSlot || (teacher ? teacher.availableSlots[0] : null));
  const [sessionType, setSessionType] = useState('1-on-1 Remedial Class');
  const [studentName, setStudentName] = useState('Aarav Patel (Class 9-A)');
  const [accommodations, setAccommodations] = useState([
    'OpenDyslexic Live Captions',
    'Pre-Lecture Flashcard Review'
  ]);
  const [notes, setNotes] = useState('Need help with photosynthesis terminology and visual mnemonics.');

  if (!teacher) return null;

  const toggleAccommodation = (acc) => {
    soundEffects.playClick();
    if (accommodations.includes(acc)) {
      setAccommodations(accommodations.filter(a => a !== acc));
    } else {
      setAccommodations([...accommodations, acc]);
    }
  };

  const handleConfirm = () => {
    soundEffects.playClick();
    const newBooking = {
      id: `BK-${Math.floor(10000 + Math.random() * 90000)}`,
      teacherId: teacher.id,
      teacherName: teacher.name,
      teacherTitle: teacher.title,
      teacherAvatar: teacher.avatar,
      studentName,
      date: selectedDate,
      time: selectedSlot ? selectedSlot.time : '10:00 AM - 10:45 AM',
      sessionType,
      meetingLink: `https://divya-smartedu.aicte.gov.in/live/room-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'Confirmed',
      accommodations: accommodations.join(', '),
      notes
    };

    onConfirmBooking(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-indigo-500/40 rounded-3xl shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-950 to-slate-900 p-6 border-b border-indigo-500/20 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <img
              src={teacher.avatar}
              alt={teacher.name}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-indigo-400"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-extrabold text-white font-['Outfit']">{teacher.name}</h3>
                <ShieldCheck size={14} className="text-cyan-400" />
              </div>
              <p className="text-xs text-indigo-300">{teacher.title}</p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto text-xs">
          {/* Date Picker */}
          <div>
            <label className="font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Calendar size={14} className="text-indigo-400" /> Select Session Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950/80 border border-white/15 text-white font-semibold focus:border-indigo-400 focus:outline-none"
            />
          </div>

          {/* Time Slot Selector */}
          <div>
            <label className="font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Clock size={14} className="text-cyan-400" /> Available Live Slots
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {teacher.availableSlots.map((slot) => {
                const isSelected = selectedSlot && selectedSlot.id === slot.id;
                return (
                  <button
                    key={slot.id}
                    disabled={slot.isBooked}
                    onClick={() => {
                      soundEffects.playClick();
                      setSelectedSlot(slot);
                    }}
                    className={`p-3 rounded-xl border text-left font-bold transition-all cursor-pointer ${
                      slot.isBooked
                        ? 'bg-slate-950/40 border-white/5 text-slate-600 cursor-not-allowed'
                        : isSelected
                        ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{slot.time}</span>
                      {slot.isBooked && <span className="text-[10px] text-rose-400">Booked</span>}
                    </div>
                    <div className="text-[11px] text-slate-400 font-normal mt-0.5">{slot.type}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Student Profile Info */}
          <div>
            <label className="font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <User size={14} className="text-emerald-400" /> Learner Name & Grade
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950/80 border border-white/15 text-white font-semibold focus:border-indigo-400 focus:outline-none"
            />
          </div>

          {/* Accommodations Checklist */}
          <div>
            <label className="font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileCheck size={14} className="text-amber-400" /> Classroom In-Session Accommodations
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                'OpenDyslexic Live Captions',
                'Live Sign Language Interpreter PIP',
                'Pre-Lecture Flashcard Review',
                'Bionic Whiteboard Text',
                '25% Slower Speech Pace'
              ].map((acc) => {
                const checked = accommodations.includes(acc);
                return (
                  <button
                    key={acc}
                    onClick={() => toggleAccommodation(acc)}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                      checked
                        ? 'bg-amber-500/20 border-amber-400/60 text-amber-200'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    <CheckCircle2 size={14} className={checked ? 'text-amber-400' : 'text-slate-600'} />
                    <span className="truncate">{acc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Special Notes */}
          <div>
            <label className="font-bold text-slate-300 uppercase tracking-wider mb-1.5 block">
              Doubt / Goal Notes for Teacher
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What specific topic or doubt do you want to master in this session?"
              className="w-full p-3 rounded-xl bg-slate-950/80 border border-white/15 text-slate-200 focus:border-indigo-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-slate-950 border-t border-white/10 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            Fee: <strong className="text-emerald-400 font-extrabold">₹0 (AICTE Inclusive Subsidy)</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundEffects.playClick();
                onClose();
              }}
              className="btn btn-secondary text-xs px-4 py-2 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="btn btn-primary text-xs px-5 py-2 font-bold cursor-pointer"
            >
              Confirm & Generate Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
