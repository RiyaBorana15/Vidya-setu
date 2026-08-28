import React, { useState } from 'react';
import { 
  Calendar, 
  Search, 
  Filter, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  Video,
  Award
} from 'lucide-react';
import TeacherCard from './TeacherCard';
import BookingModal from './BookingModal';
import BookingPass from './BookingPass';
import { TEACHERS_DATA, INITIAL_BOOKINGS } from '../../data/teachersData';
import { soundEffects } from '../../utils/soundEffects';

export default function TeacherBookingHub({ onJoinClassroom }) {
  const [teachers, setTeachers] = useState(TEACHERS_DATA);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [activeTab, setActiveTab] = useState('directory'); // 'directory' or 'my-bookings'
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeacherForBooking, setSelectedTeacherForBooking] = useState(null);
  const [initialSlotForBooking, setInitialSlotForBooking] = useState(null);
  const [latestConfirmedBooking, setLatestConfirmedBooking] = useState(null);

  const specialties = ['All', 'Dyslexia Remediation', 'Indian Sign Language (ISL)', 'Visual Math', 'Speech Clarity'];

  const filteredTeachers = teachers.filter(t => {
    const matchesSearch = 
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSpecialty = 
      selectedSpecialty === 'All' || 
      t.specialties.some(s => s.toLowerCase().includes(selectedSpecialty.toLowerCase()));

    return matchesSearch && matchesSpecialty;
  });

  const handleOpenBooking = (teacher, slot) => {
    soundEffects.playClick();
    setSelectedTeacherForBooking(teacher);
    setInitialSlotForBooking(slot);
  };

  const handleConfirmBooking = (newBooking) => {
    soundEffects.playSuccess();
    setBookings([newBooking, ...bookings]);
    setSelectedTeacherForBooking(null);
    setLatestConfirmedBooking(newBooking);
    setActiveTab('my-bookings');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
            <Calendar size={22} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white font-['Outfit'] flex items-center gap-2">
              Special Educator & Sign Mentor Slot Booking
              <span className="badge badge-emerald text-[10px]">AICTE Subsidized</span>
            </h2>
            <p className="text-xs text-slate-400">
              Schedule 1-on-1 remedial phonics, live sign language interpretation, and visual STEM tutoring sessions
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-white/10 text-xs">
          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('directory');
            }}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'directory'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Find Mentors ({teachers.length})
          </button>
          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('my-bookings');
            }}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer relative ${
              activeTab === 'my-bookings'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            My Bookings ({bookings.length})
            {bookings.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 animate-ping"></span>
            )}
          </button>
        </div>
      </div>

      {activeTab === 'directory' ? (
        /* Mentor Directory Tab */
        <div className="space-y-6">
          {/* Filter & Search Bar */}
          <div className="glass-panel p-5 space-y-4 border border-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-96">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by mentor name, subject, or disability specialization..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-indigo-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>100% Verified RCI & NAD Certified Instructors</span>
              </div>
            </div>

            {/* Specialty Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {specialties.map((spec) => (
                <button
                  key={spec}
                  onClick={() => {
                    soundEffects.playClick();
                    setSelectedSpecialty(spec);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                    selectedSpecialty === spec
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 border-cyan-400 text-white shadow-md'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          {/* Educators Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTeachers.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
                onBookSlot={handleOpenBooking}
              />
            ))}
          </div>
        </div>
      ) : (
        /* My Bookings Tab */
        <div className="space-y-6">
          {latestConfirmedBooking && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Sparkles size={16} className="text-emerald-400" /> Latest Confirmed Pass:
              </h3>
              <BookingPass
                booking={latestConfirmedBooking}
                onJoinClassroom={onJoinClassroom}
              />
            </div>
          )}

          {/* Full List of Bookings */}
          <div className="space-y-3 pt-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Calendar size={16} className="text-cyan-400" /> Scheduled Sessions History ({bookings.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookings.map((bk) => (
                <div
                  key={bk.id}
                  className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={bk.teacherAvatar}
                        alt={bk.teacherName}
                        className="w-12 h-12 rounded-xl object-cover border border-indigo-400"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white">{bk.teacherName}</h4>
                        <p className="text-xs text-indigo-300">{bk.sessionType}</p>
                      </div>
                    </div>
                    <span className="badge badge-emerald text-[10px]">{bk.status}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 text-xs space-y-1">
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Date & Time:</span>
                      <strong className="text-white">{bk.date} • {bk.time}</strong>
                    </div>
                    {bk.accommodations && (
                      <div className="text-[11px] text-slate-400">
                        IEP: {bk.accommodations}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      onJoinClassroom(bk);
                    }}
                    className="btn btn-emerald text-xs w-full py-2 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Video size={14} />
                    <span>Enter Live Virtual Classroom</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {selectedTeacherForBooking && (
        <BookingModal
          teacher={selectedTeacherForBooking}
          initialSlot={initialSlotForBooking}
          onClose={() => setSelectedTeacherForBooking(null)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}
    </div>
  );
}
