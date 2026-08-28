import React from 'react';
import { 
  X, 
  Award, 
  CheckCircle2, 
  Cpu, 
  Globe, 
  Layers, 
  Zap, 
  Target, 
  HeartHandshake,
  BookOpen,
  Hand,
  Video,
  Database
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export default function SIHPitchModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-indigo-500/40 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Banner Header */}
        <div className="relative bg-gradient-to-r from-indigo-900 via-purple-900 to-cyan-900 p-6 md:p-8 border-b border-indigo-500/30">
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-xl bg-black/40 hover:bg-black/60 text-slate-300 hover:text-white border border-white/10 transition-all cursor-pointer"
          >
            <X size={20} />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-amber-400 text-black font-extrabold text-xs px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
              SIH 2026 Submission
            </span>
            <span className="bg-white/10 text-cyan-300 font-semibold text-xs px-2.5 py-1 rounded-full border border-white/10">
              Problem Statement ID: 26205
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 font-semibold text-xs px-2.5 py-1 rounded-full border border-emerald-500/30">
              AICTE Student Innovation
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-['Outfit']">
            DIVYA-SmartEdu: AI-Powered Inclusive Classroom & Virtual Campus
          </h2>
          <p className="text-sm md:text-base text-slate-300 mt-2 max-w-3xl">
            "Smart education, a concept that describes learning in digital age. It enables learners to learn more effectively, efficiently, flexibly and comfortably."
          </p>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Key Deliverables Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0">
                <BookOpen size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">1. Dyslexia Phonics & Bionic Suite</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  OpenDyslexic font engine, Bionic fixation saccade reader, real-time Karaoke word highlighter, reading ruler mask, and 5-min cognitive screening.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-cyan-600/30 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                <Hand size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">2. Real-Time Hand Sign AI Vision</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Live webcam 21-landmark gesture recognition for ISL/ASL alphabet & phrases, text-to-sign visualizer, and gamified practice arena.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <Video size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">3. Live Classroom + Whiteboard + Captions</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Virtual video classroom with real-time Speech-to-Text captions, dedicated PIP Sign Language interpreter window, and collaborative canvas whiteboard.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
                <Layers size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">4. Pre/Post-Lecture Flashcards & Quiz</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Spaced repetition concept cards before class and post-lecture recap cards coupled with gamified adaptive quizzes for retention.
                </p>
              </div>
            </div>
          </div>

          {/* Unified Database & Mentor Booking Callout */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                <Database size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Unified Students & IEP Records + Slot Booking</h4>
                <p className="text-xs text-slate-400">
                  Direct 1-on-1 verified educator booking with instant ticket pass & IEP accommodation tracking.
                </p>
              </div>
            </div>
            <span className="badge badge-emerald whitespace-nowrap">Integrated Platform</span>
          </div>

          {/* SDG Alignment & Tech Stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Target size={14} className="text-rose-400" /> UN Sustainable Development Goals
              </h5>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 rounded bg-rose-900/40 border border-rose-600/40 text-rose-300 font-semibold">
                  SDG 4: Quality & Inclusive Education
                </span>
                <span className="px-2 py-1 rounded bg-indigo-900/40 border border-indigo-600/40 text-indigo-300 font-semibold">
                  SDG 10: Reduced Inequalities
                </span>
                <span className="px-2 py-1 rounded bg-cyan-900/40 border border-cyan-600/40 text-cyan-300 font-semibold">
                  National Education Policy (NEP 2020)
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Cpu size={14} className="text-cyan-400" /> Architecture & Performance
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Client-side zero-latency AI vision landmarking, Web Audio procedural synthesis, Web Speech API integration, and full offline-first LocalStorage caching.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 md:p-6 bg-slate-950 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>Ready for live hackathon evaluation & user trials</span>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="btn btn-primary text-xs px-5 py-2 cursor-pointer"
          >
            Explore Platform
          </button>
        </div>
      </div>
    </div>
  );
}
