import React from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Eye, 
  BookOpen, 
  Hand, 
  Calendar, 
  Video, 
  Database, 
  Layers, 
  Award, 
  Sliders, 
  UserCheck, 
  Zap, 
  Activity,
  LogOut,
  User
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  currentTheme, 
  setTheme, 
  dyslexicFont, 
  setDyslexicFont, 
  isMuted, 
  setIsMuted,
  currentUser,
  userRole,
  setUserRole,
  onLogout,
  openPitchModal,
  toggleAccessibilityBar
}) {
  const tabs = [
    { id: 'dyslexia', label: 'LexiRead Dyslexia', icon: BookOpen, badge: 'Phonics AI' },
    { id: 'sign', label: 'SignVerse AI', icon: Hand, badge: 'Cam Translator' },
    { id: 'booking', label: 'Mentor Booking', icon: Calendar, badge: 'Live Slots' },
    { id: 'live', label: 'Live Classroom', icon: Video, badge: 'PIP Sign' },
    { id: 'database', label: 'Students & IEP DB', icon: Database, badge: 'Registry' },
    { id: 'flashcards-quiz', label: 'Flashcards & Quiz', icon: Layers, badge: 'Pre/Post' }
  ];

  const handleTabChange = (tabId) => {
    soundEffects.playClick();
    setActiveTab(tabId);
  };

  const handleSoundToggle = () => {
    const muted = soundEffects.toggleMute();
    setIsMuted(muted);
    if (!muted) soundEffects.playClick();
  };

  return (
    <header className="sticky top-0 z-50 bg-[#070b14]/85 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl">
      {/* Top AICTE SIH 2026 Problem Statement Ribbon */}
      <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900/90 to-cyan-950/80 border-b border-indigo-500/20 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="bg-amber-400/15 text-amber-300 font-extrabold px-2.5 py-0.5 rounded-full border border-amber-400/40 text-[10px] tracking-wider uppercase flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
              SIH 2026 • PS 26205
            </span>
            <span className="text-slate-300 font-medium hidden md:inline text-[11px]">
              AICTE Student Innovation • Smart Education
            </span>
            <span className="text-cyan-300 font-bold flex items-center gap-1 text-[11px] hidden sm:inline">
              <Sparkles size={12} className="text-cyan-400" /> DIVYA-SmartEdu Platform
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Role Switcher */}
            <div className="flex items-center gap-1.5 bg-white/[0.06] hover:bg-white/[0.1] px-3 py-1 rounded-full border border-white/10 text-[11px] transition-colors">
              <UserCheck size={13} className="text-cyan-400 shrink-0" />
              <span className="text-slate-400 hidden sm:inline">Role:</span>
              <select 
                value={userRole} 
                onChange={(e) => {
                  soundEffects.playClick();
                  setUserRole(e.target.value);
                }}
                className="bg-transparent text-cyan-300 font-bold outline-none cursor-pointer text-[11px] pr-1"
              >
                <option value="Student" className="bg-slate-900 text-white">Student (Aarav - Dyslexia)</option>
                <option value="DeafStudent" className="bg-slate-900 text-white">Student (Riya - Deaf/Sign)</option>
                <option value="Teacher" className="bg-slate-900 text-white">Special Educator (Dr. Ananya)</option>
                <option value="Admin" className="bg-slate-900 text-white">Institution Admin</option>
                <option value="Evaluator" className="bg-slate-900 text-white">SIH 2026 Judge / Evaluator</option>
              </select>
            </div>

            {/* Logged in User Badge & Logout Switcher */}
            <button
              onClick={() => {
                soundEffects.playClick();
                onLogout();
              }}
              title="Switch user or return to login screen"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-white/10 text-[11px] font-bold cursor-pointer transition-colors"
            >
              <LogOut size={12} className="text-rose-400" />
              <span className="hidden sm:inline">Switch User</span>
            </button>

            {/* Pitch Modal Button */}
            <button 
              onClick={openPitchModal}
              className="bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 hover:from-amber-400 hover:to-pink-400 text-white px-3 py-1 rounded-full text-[11px] font-extrabold shadow-md shadow-rose-500/25 flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <Award size={13} />
              <span>SIH Pitch & Arch</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => handleTabChange('dyslexia')}
          className="flex items-center gap-3.5 cursor-pointer group select-none shrink-0"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-cyan-500 to-emerald-400 p-[1.5px] shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-all">
            <div className="w-full h-full bg-[#070b14] rounded-2xl flex items-center justify-center">
              <GraduationCap className="text-cyan-300 group-hover:rotate-6 transition-transform" size={24} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent font-['Outfit']">
                DIVYA<span className="text-cyan-400">-SmartEdu</span>
              </span>
              <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/40">
                Inclusive AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Smart Education & Accessibility Platform</p>
          </div>
        </div>

        {/* Center Tab Buttons */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-white/[0.08] shadow-inner">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer relative ${
                  isActive 
                    ? 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-600 text-white shadow-lg shadow-indigo-500/35 scale-[1.02]' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-cyan-200' : 'text-slate-400'} />
                <span>{tab.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 absolute -bottom-1 left-1/2 -translate-x-1/2 shadow-glow"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Accessibility Quick Controls */}
        <div className="flex items-center gap-2">
          {/* Dyslexia Font Master Toggle */}
          <button
            onClick={() => {
              soundEffects.playClick();
              setDyslexicFont(!dyslexicFont);
            }}
            title="Toggle OpenDyslexic Font globally"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              dyslexicFont 
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/60 shadow-md shadow-amber-500/30' 
                : 'bg-white/[0.05] text-slate-300 border-white/10 hover:bg-white/[0.08]'
            }`}
          >
            <Eye size={14} className={dyslexicFont ? 'text-amber-400' : 'text-slate-400'} />
            <span className="hidden sm:inline">Dyslexia Font</span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded font-black ${dyslexicFont ? 'bg-amber-400 text-black' : 'bg-slate-800 text-slate-400'}`}>
              {dyslexicFont ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={handleSoundToggle}
            title={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
            className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 border border-white/10 transition-all cursor-pointer"
          >
            {isMuted ? <VolumeX size={16} className="text-rose-400" /> : <Volume2 size={16} className="text-emerald-400" />}
          </button>

          {/* Open Accessibility Tool Panel */}
          <button
            onClick={() => {
              soundEffects.playClick();
              toggleAccessibilityBar();
            }}
            title="Open Accessibility Studio (Color Tints, Rulers, Sliders)"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600/25 hover:bg-indigo-600/40 text-indigo-200 border border-indigo-500/50 text-xs font-extrabold cursor-pointer transition-all shadow-md shadow-indigo-500/20"
          >
            <Sliders size={14} className="text-indigo-400" />
            <span className="hidden md:inline">Tools</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Scrollable Row */}
      <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto px-4 py-2 border-t border-white/[0.06] bg-slate-950/90 no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-white/[0.05] text-slate-400 hover:text-white'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
