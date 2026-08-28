import React, { useState } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  Lock, 
  Mail, 
  User, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Mic, 
  Sliders,
  Zap,
  Globe
} from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

export default function LoginPage({ onLogin, dyslexicFont, setDyslexicFont }) {
  const [selectedRole, setSelectedRole] = useState('student'); // 'student', 'teacher', 'admin', 'judge'
  const [email, setEmail] = useState('aarav.patel@smartedu.aicte.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const DEMO_PERSONAS = [
    {
      id: 'p-aarav',
      role: 'Student',
      name: 'Aarav Patel (Student)',
      tag: 'Dyslexia Profile',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150',
      badge: 'LexiRead AI Enabled',
      email: 'aarav.patel@smartedu.aicte.gov.in',
      tab: 'dyslexia',
      font: true,
      theme: 'warm-peach'
    },
    {
      id: 'p-riya',
      role: 'DeafStudent',
      name: 'Riya Mukherjee (Student)',
      tag: 'Deaf / ISL Sign Student',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
      badge: 'SignVerse AI PIP Active',
      email: 'riya.m@smartedu.aicte.gov.in',
      tab: 'sign',
      font: false,
      theme: 'default'
    },
    {
      id: 'p-ananya',
      role: 'Teacher',
      name: 'Dr. Ananya Sen (Special Educator)',
      tag: 'Dyslexia & Phonics Specialist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
      badge: 'Verified Mentor',
      email: 'ananya.sen@aicte.gov.in',
      tab: 'booking',
      font: false,
      theme: 'default'
    },
    {
      id: 'p-judge',
      role: 'Evaluator',
      name: 'SIH 2026 Official Evaluator',
      tag: 'Master Evaluation Mode',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      badge: 'SIH Jury Access',
      email: 'jury.evaluator@sih2026.aicte.gov.in',
      tab: 'dyslexia',
      font: false,
      theme: 'default'
    }
  ];

  const handleStandardSubmit = (e) => {
    e.preventDefault();
    soundEffects.playSuccess();
    onLogin({
      userRole: selectedRole === 'teacher' ? 'Teacher' : selectedRole === 'judge' ? 'Evaluator' : 'Student',
      userName: selectedRole === 'teacher' ? 'Dr. Ananya Sen' : selectedRole === 'judge' ? 'SIH 2026 Evaluator' : 'Aarav Patel',
      initialTab: 'dyslexia'
    });
  };

  const handlePersonaSelect = (persona) => {
    soundEffects.playSuccess();
    if (persona.font !== undefined) {
      setDyslexicFont(persona.font);
    }
    onLogin({
      userRole: persona.role,
      userName: persona.name,
      initialTab: persona.tab,
      theme: persona.theme
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#070b14]">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-8 z-10">
        {/* Left Pitch & Branding Column */}
        <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-indigo-500/20 px-3 py-1.5 rounded-full border border-amber-400/40 text-xs">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span className="font-extrabold text-amber-300 uppercase tracking-wider text-[11px]">
              SIH 2026 • Problem Statement 26205
            </span>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-3.5">
            <div className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-indigo-600 via-cyan-500 to-emerald-400 p-[2px] shadow-2xl shadow-indigo-500/40">
              <div className="w-full h-full bg-[#070b14] rounded-3xl flex items-center justify-center">
                <GraduationCap className="text-cyan-300" size={32} />
              </div>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-['Outfit']">
                DIVYA<span className="text-cyan-400">-SmartEdu</span>
              </h1>
              <p className="text-xs text-indigo-300 font-bold uppercase tracking-wider">
                AICTE Inclusive Education 3.0
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed max-w-md mx-auto lg:mx-0">
            A comprehensive, neuro-adaptive virtual campus bridging accessibility barriers for <strong>Dyslexic</strong>, <strong>Deaf & Hard-of-Hearing</strong>, and <strong>ADHD</strong> learners with live AI sign vision and interactive classrooms.
          </p>

          {/* Quick Feature Pillars */}
          <div className="space-y-2.5 pt-2 text-xs text-slate-300 text-left hidden sm:block">
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.03] border border-white/5">
              <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
              <span><strong>LexiRead Dyslexia Suite:</strong> Bionic fixation & TTS Karaoke word tracker</span>
            </div>
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.03] border border-white/5">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span><strong>SignVerse AI:</strong> Real-time webcam sign-to-speech translation</span>
            </div>
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.03] border border-white/5">
              <CheckCircle2 size={16} className="text-purple-400 shrink-0" />
              <span><strong>Live Virtual Classroom:</strong> PIP Sign interpreter & smart whiteboard</span>
            </div>
          </div>
        </div>

        {/* Right Authentication Card */}
        <div className="lg:col-span-7">
          <div className="pro-card p-6 sm:p-8 border-2 border-indigo-500/40 bg-slate-900/95 shadow-2xl rounded-3xl space-y-6">
            {/* Header & Quick Font Switch */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-xl font-black text-white font-['Outfit']">Access Portal</h3>
                <p className="text-xs text-slate-400">Choose your persona or sign in below</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  setDyslexicFont(!dyslexicFont);
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  dyslexicFont 
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400/60' 
                    : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                }`}
              >
                <Eye size={13} />
                <span className="text-[11px]">Dyslexia Font: {dyslexicFont ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            {/* 1-Click Fast Track Persona Logins */}
            <div className="space-y-2.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                <Zap size={14} className="fill-current text-amber-400" /> Instant 1-Click Demo Personas:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {DEMO_PERSONAS.map((persona) => (
                  <button
                    key={persona.id}
                    type="button"
                    onClick={() => handlePersonaSelect(persona)}
                    className="p-3 rounded-2xl bg-white/[0.04] hover:bg-gradient-to-r hover:from-indigo-600/30 hover:to-cyan-600/30 border border-white/10 hover:border-cyan-400/60 text-left transition-all group cursor-pointer flex items-center gap-3 shadow-md"
                  >
                    <img
                      src={persona.avatar}
                      alt={persona.name}
                      className="w-11 h-11 rounded-xl object-cover border border-white/20 group-hover:scale-105 transition-transform shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="font-extrabold text-white text-xs truncate group-hover:text-cyan-300">
                        {persona.name.split(' (')[0]}
                      </div>
                      <div className="text-[10px] text-cyan-300 font-semibold truncate">{persona.tag}</div>
                      <div className="text-[9px] text-slate-400 font-mono mt-0.5">{persona.badge}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink mx-4 text-[11px] text-slate-500 font-bold uppercase tracking-wider">Or Standard Credentials</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            {/* Standard Login Form */}
            <form onSubmit={handleStandardSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-extrabold text-slate-300 uppercase tracking-wider mb-1 block">
                  Institutional Email ID
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/15 text-white font-medium focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-extrabold text-slate-300 uppercase tracking-wider mb-1 block">
                  Secure Password
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950/80 border border-white/15 text-white font-medium focus:border-cyan-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-semibold">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded accent-cyan-400 cursor-pointer"
                  />
                  <span>Remember Session</span>
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Demo password reset link dispatched to verified email.'); }} className="text-cyan-400 hover:underline font-bold">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="btn-pro btn-gradient-indigo w-full py-3 text-xs font-black cursor-pointer shadow-xl shadow-indigo-500/30 flex items-center justify-center gap-2"
              >
                <span>Enter DIVYA-SmartEdu Platform</span>
                <ArrowRight size={15} />
              </button>
            </form>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck size={14} className="text-emerald-400" /> 256-bit Encrypted Portal
              </span>
              <span>AICTE & SIH 2026 Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
