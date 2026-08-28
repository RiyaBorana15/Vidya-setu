import React, { useState } from 'react';
import {
  ArrowRightLeft,
  Camera,
  Type,
  Trophy,
  BookOpen,
  Sparkles,
  Hand,
  Activity
} from 'lucide-react';
import LiveCameraTranslator from './LiveCameraTranslator';
import SignCameraDetector from './SignCameraDetector';
import TextToSignConverter from './TextToSignConverter';
import SignPracticeGame from './SignPracticeGame';
import SignDictionary from './SignDictionary';
import { soundEffects } from '../../utils/soundEffects';

const TABS = [
  {
    id: 'translator',
    label: 'Real-Time Translator',
    shortLabel: 'Translator',
    icon: ArrowRightLeft,
    tag: 'Live AI',
    tagColor: 'cyan',
    desc: 'Webcam → MediaPipe Hands → Letter & word detection → Text & speech output',
    emoji: '🤟',
    isNew: true,
  },
  {
    id: 'camera',
    label: 'Landmark Detector',
    shortLabel: 'Detector',
    icon: Camera,
    tag: '21 Points',
    tagColor: 'teal',
    desc: 'See all 21 hand landmark points tracked in real time by MediaPipe',
    emoji: '📡',
  },
  {
    id: 'converter',
    label: 'Text → Sign',
    shortLabel: 'Text→Sign',
    icon: Type,
    tag: 'Spelling',
    tagColor: 'indigo',
    desc: 'Type any word and see the corresponding ISL / ASL finger spellings',
    emoji: '🔤',
  },
  {
    id: 'practice',
    label: 'Practice Arena',
    shortLabel: 'Practice',
    icon: Trophy,
    tag: 'Gamified',
    tagColor: 'amber',
    desc: 'Speed rounds — race against the clock to recognize and sign each letter',
    emoji: '🏆',
  },
  {
    id: 'dictionary',
    label: 'Sign Dictionary',
    shortLabel: 'Dictionary',
    icon: BookOpen,
    tag: 'ISL / ASL',
    tagColor: 'purple',
    desc: 'Browse the full ISL/ASL alphabet and common word signs with illustrations',
    emoji: '📖',
  },
];

const TAG_STYLES = {
  cyan:   'bg-cyan-500/15 text-cyan-300 border-cyan-500/25',
  teal:   'bg-teal-500/15 text-teal-300 border-teal-500/25',
  indigo: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25',
  amber:  'bg-amber-500/15 text-amber-300 border-amber-500/25',
  purple: 'bg-purple-500/15 text-purple-300 border-purple-500/25',
};

const ACTIVE_STYLES = {
  cyan:   'from-cyan-600 via-teal-600 to-indigo-600 shadow-cyan-500/25',
  teal:   'from-teal-600 via-cyan-600 to-indigo-600 shadow-teal-500/25',
  indigo: 'from-indigo-600 via-violet-600 to-purple-600 shadow-indigo-500/25',
  amber:  'from-amber-600 via-orange-600 to-rose-600 shadow-amber-500/25',
  purple: 'from-purple-600 via-violet-600 to-indigo-600 shadow-purple-500/25',
};

export default function SignLanguageHub() {
  const [subTab, setSubTab] = useState('translator');

  const activeTabData = TABS.find(t => t.id === subTab);

  return (
    <div className="space-y-6">

      {/* ── Hero Banner ──────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-slate-900 via-cyan-950/20 to-indigo-950/30 p-6">
        {/* Background orbs */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-cyan-500/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-indigo-500/8 blur-3xl pointer-events-none" />
        {/* Dot grid texture */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-indigo-500 flex items-center justify-center text-3xl shadow-2xl shadow-cyan-500/30">
                🤟
              </div>
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-400 border-2 border-slate-900 flex items-center justify-center">
                <Activity size={10} className="text-black animate-pulse" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] tracking-tight">
                  Sign Language AI Suite
                </h1>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/25">
                  ISL Standard
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-1 max-w-xl leading-relaxed">
                Real-time hand sign recognition powered by <strong className="text-cyan-400">MediaPipe Hands</strong> — 
                translating Indian Sign Language to text &amp; speech for inclusive deaf education
              </p>
              {/* Stats row */}
              <div className="flex items-center gap-4 mt-3 text-[11px]">
                {[
                  { label: '21 Landmarks', color: 'text-cyan-400' },
                  { label: '18+ ISL Signs', color: 'text-emerald-400' },
                  { label: 'Real-Time AI', color: 'text-indigo-400' },
                  { label: 'Text-to-Speech', color: 'text-purple-400' },
                ].map(stat => (
                  <span key={stat.label} className={`font-black ${stat.color} flex items-center gap-1`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {stat.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="px-3 py-1.5 rounded-xl text-xs font-black bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 flex items-center gap-1.5">
              <Sparkles size={12} />
              DIVYA-SmartEdu
            </span>
            <span className="text-[10px] text-slate-500">SDG 4 · Inclusive Education</span>
          </div>
        </div>
      </div>

      {/* ── Tab Navigation ───────────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = subTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundEffects.playClick?.();
                  setSubTab(tab.id);
                }}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? `bg-gradient-to-r ${ACTIVE_STYLES[tab.tagColor]} text-white shadow-lg scale-[1.02]`
                    : 'bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-white border border-white/[0.06] hover:border-white/15'
                }`}
              >
                <Icon size={15} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-black border ${
                  isActive ? 'bg-black/25 text-white/80 border-white/20' : `${TAG_STYLES[tab.tagColor]} border-current`
                }`}>
                  {tab.tag}
                </span>
                {tab.isNew && (
                  <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full text-[8px] font-black bg-rose-500 text-white shadow-lg shadow-rose-500/40 animate-pulse">
                    NEW
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active tab description breadcrumb */}
        {activeTabData && (
          <div className="flex items-center gap-2 text-xs text-slate-500 px-1">
            <span className="text-base">{activeTabData.emoji}</span>
            <span className="text-slate-400 font-semibold">{activeTabData.label}</span>
            <span>·</span>
            <span className="text-slate-500">{activeTabData.desc}</span>
          </div>
        )}
      </div>

      {/* ── Active Sub-tab Content ────────────────────────────────────────── */}
      <div className="animate-fade-in">
        {subTab === 'translator' && <LiveCameraTranslator />}
        {subTab === 'camera'     && <SignCameraDetector />}
        {subTab === 'converter'  && <TextToSignConverter />}
        {subTab === 'practice'   && <SignPracticeGame />}
        {subTab === 'dictionary' && <SignDictionary />}
      </div>
    </div>
  );
}
