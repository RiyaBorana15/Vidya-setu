import React from 'react';
import { 
  X, 
  User, 
  CheckCircle2, 
  Activity, 
  Award, 
  Sparkles, 
  Calendar, 
  FileText, 
  ShieldCheck,
  Zap
} from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

export default function StudentProfileModal({ student, onClose }) {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-indigo-500/40 rounded-3xl shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-cyan-950 p-6 border-b border-indigo-500/20 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-400 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-white font-['Outfit']">{student.name}</h3>
                <span className="badge badge-emerald text-[10px]">{student.iepStatus}</span>
              </div>
              <p className="text-xs text-cyan-300 font-semibold">{student.grade} • Age {student.age} • {student.gender}</p>
              <div className="text-[11px] text-amber-300 font-bold mt-0.5">
                Disability Classification: {student.disabilityType}
              </div>
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

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto text-xs">
          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="text-xl font-black text-emerald-400">{student.attendance}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Attendance Rate</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="text-xl font-black text-cyan-300">{student.quizAverage}%</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Quiz Accuracy</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="text-xl font-black text-amber-400">{student.flashcardMastery}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Flashcard Mastery</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="text-xl font-black text-purple-400">{student.riskLevel}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Support Level</div>
            </div>
          </div>

          {/* Active IEP Accommodations */}
          <div className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-3">
            <h4 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
              <ShieldCheck size={16} /> Individualized Education Program (IEP) Mandatory Accommodations
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {student.accommodations.map((acc, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5 text-slate-200">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                  <span>{acc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cognitive Diagnostic Screener Scores */}
          {student.screeningResults && (
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity size={16} className="text-amber-400" /> Multi-Sensory Cognitive Screening Telemetry
                </h4>
                <span className="text-[11px] text-slate-400">Last Screened: {student.screeningResults.lastScreened}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5">
                  <div className="text-base font-bold text-cyan-300">{student.screeningResults.phonologicalAwareness}/100</div>
                  <div className="text-[10px] text-slate-400">Phonological Decoding</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5">
                  <div className="text-base font-bold text-emerald-400">{student.screeningResults.rapidNaming}/100</div>
                  <div className="text-[10px] text-slate-400">Rapid Naming Speed</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5">
                  <div className="text-base font-bold text-purple-400">{student.screeningResults.visualOrientation}/100</div>
                  <div className="text-[10px] text-slate-400">Visual Spatial Stability</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5">
                  <div className="text-base font-bold text-amber-400">{student.screeningResults.readingFluencyWPM} WPM</div>
                  <div className="text-[10px] text-slate-400">Reading Speed</div>
                </div>
              </div>
            </div>
          )}

          {/* Educator Clinical Notes */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 to-indigo-950/30 border border-white/10 space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <FileText size={14} className="text-indigo-400" /> Special Educator Clinical Observations
            </h4>
            <p className="text-slate-300 leading-relaxed italic">
              "{student.notes}"
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-slate-950 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-slate-400">AICTE National Inclusive Education Registry ID: {student.id}</span>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="btn btn-primary text-xs px-5 py-2 cursor-pointer"
          >
            Close Record
          </button>
        </div>
      </div>
    </div>
  );
}
