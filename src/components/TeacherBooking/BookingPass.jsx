import React from 'react';
import { 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Video, 
  Download, 
  QrCode, 
  ShieldCheck, 
  Sparkles,
  Share2,
  Ticket
} from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

export default function BookingPass({ booking, onJoinClassroom }) {
  if (!booking) return null;

  const downloadCalendarFile = () => {
    soundEffects.playClick();
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//DIVYA-SmartEdu//Inclusive Education Session//EN
BEGIN:VEVENT
UID:${booking.id}@divya-smartedu.aicte.gov.in
DTSTAMP:20260827T190000Z
DTSTART:20260828T090000Z
DTEND:20260828T094500Z
SUMMARY:1-on-1 Inclusive Session with ${booking.teacherName}
DESCRIPTION:Session Type: ${booking.sessionType}\\nAccommodations: ${booking.accommodations}\\nClassroom Link: ${booking.meetingLink}
LOCATION:DIVYA-SmartEdu Virtual Classroom
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${booking.id}-session.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pro-card p-6 sm:p-8 max-w-2xl mx-auto border-2 border-emerald-500/50 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden">
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="badge-pro bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 text-[10px]">
            Session Confirmed • Ready to Join
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono font-black text-cyan-300 text-xs bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/30">
          <Ticket size={13} />
          <span>PASS #{booking.id}</span>
        </div>
      </div>

      {/* Main Ticket Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
        {/* Left Info Column */}
        <div className="sm:col-span-8 space-y-4">
          <div className="flex items-center gap-3.5">
            <img
              src={booking.teacherAvatar}
              alt={booking.teacherName}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400 shadow-lg shadow-emerald-500/20"
            />
            <div>
              <h3 className="text-lg font-black text-white font-['Outfit']">{booking.teacherName}</h3>
              <p className="text-xs text-indigo-300 font-semibold">{booking.teacherTitle}</p>
              <span className="text-[11px] text-emerald-400 font-bold">1-on-1 Inclusive Specialist</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs">
              <div className="text-slate-400 flex items-center gap-1 mb-1">
                <Calendar size={13} className="text-cyan-400" /> Session Date
              </div>
              <div className="font-black text-white">{booking.date}</div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs">
              <div className="text-slate-400 flex items-center gap-1 mb-1">
                <Clock size={13} className="text-amber-400" /> Time Slot
              </div>
              <div className="font-black text-white truncate">{booking.time}</div>
            </div>
          </div>

          {booking.accommodations && (
            <div className="p-3 rounded-xl bg-indigo-950/50 border border-indigo-500/30 text-xs text-slate-200">
              <strong className="text-cyan-300">IEP Accommodations:</strong> {booking.accommodations}
            </div>
          )}
        </div>

        {/* Right QR & Scanner Box */}
        <div className="sm:col-span-4 flex flex-col items-center justify-center p-4 rounded-2xl bg-white text-slate-900 shadow-2xl text-center space-y-2">
          <div className="w-24 h-24 bg-slate-900 p-2 rounded-xl flex items-center justify-center text-white shadow-inner">
            <QrCode size={76} className="text-cyan-400" />
          </div>
          <div className="text-[10px] font-mono font-black tracking-widest text-slate-700 uppercase">
            {booking.id}
          </div>
          <div className="text-[9px] text-slate-500 font-bold">
            Scan to sync with Mobile
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={downloadCalendarFile}
          className="btn-pro btn-glass text-xs px-4 py-2.5 cursor-pointer flex items-center gap-1.5"
        >
          <Download size={14} />
          <span>Add to Calendar (.ics)</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playClick();
            onJoinClassroom(booking);
          }}
          className="btn-pro btn-gradient-emerald text-xs px-6 py-2.5 font-black cursor-pointer flex items-center gap-2 shadow-xl shadow-emerald-500/30"
        >
          <Video size={16} />
          <span>Launch Live Classroom Now</span>
        </button>
      </div>
    </div>
  );
}
