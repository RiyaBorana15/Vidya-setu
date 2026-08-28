import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AccessibilityBar, { COLOR_TINTS } from './components/AccessibilityBar';
import SIHPitchModal from './components/SIHPitchModal';
import LoginPage from './components/Auth/LoginPage';
import DyslexiaSuite from './components/DyslexiaSuite/DyslexiaSuite';
import ReadingRuler from './components/DyslexiaSuite/ReadingRuler';
import SignLanguageHub from './components/SignLanguage/SignLanguageHub';
import TeacherBookingHub from './components/TeacherBooking/TeacherBookingHub';
import LiveClassroomHub from './components/LiveClassroom/LiveClassroomHub';
import StudentDatabaseHub from './components/StudentDatabase/StudentDatabaseHub';
import FlashcardsQuizHub from './components/FlashcardsQuiz/FlashcardsQuizHub';
import { 
  Sparkles, 
  BookOpen, 
  Hand, 
  Calendar, 
  Video, 
  Database, 
  Layers, 
  Award,
  Zap,
  Sliders,
  CheckCircle2,
  Heart,
  Users,
  TrendingUp,
  Activity,
  ArrowRight,
  LogIn
} from 'lucide-react';
import { soundEffects } from './utils/soundEffects';

export default function App() {
  // Authentication & Role State
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    name: 'Aarav Patel (Class 9-A)',
    role: 'Student',
    tag: 'Dyslexia Profile'
  });
  const [userRole, setUserRole] = useState('Student');

  // Navigation & Modal State
  const [activeTab, setActiveTab] = useState('dyslexia');
  const [isPitchModalOpen, setIsPitchModalOpen] = useState(false);
  const [isAccessibilityBarOpen, setIsAccessibilityBarOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Accessibility & Sensory Settings
  const [currentTheme, setTheme] = useState('default');
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [letterSpacing, setLetterSpacing] = useState(0.02);
  const [lineHeight, setLineHeight] = useState(1.65);
  const [activeTint, setActiveTint] = useState('none');
  const [readingRulerActive, setReadingRulerActive] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.0);

  // Sync Theme & Font classes on Body
  useEffect(() => {
    document.body.setAttribute('data-theme', currentTheme);
    if (dyslexicFont) {
      document.body.classList.add('font-opendyslexic');
    } else {
      document.body.classList.remove('font-opendyslexic');
    }

    document.documentElement.style.setProperty('--letter-spacing-custom', `${letterSpacing}em`);
    document.documentElement.style.setProperty('--line-height-custom', `${lineHeight}`);
  }, [currentTheme, dyslexicFont, letterSpacing, lineHeight]);

  const handleLogin = (authData) => {
    setUserRole(authData.userRole || 'Student');
    setCurrentUser({
      name: authData.userName || 'Learner',
      role: authData.userRole || 'Student',
      tag: authData.userRole === 'Teacher' ? 'Special Educator' : authData.userRole === 'Evaluator' ? 'SIH Jury' : 'Inclusive Learner'
    });
    if (authData.initialTab) {
      setActiveTab(authData.initialTab);
    }
    if (authData.theme) {
      setTheme(authData.theme);
    }
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    soundEffects.playClick();
    setIsLoggedIn(false);
  };

  // Handle Preset Scenarios
  const loadPreset = (presetType) => {
    soundEffects.playSuccess();
    switch (presetType) {
      case 'dyslexia':
        setUserRole('Student');
        setActiveTab('dyslexia');
        setDyslexicFont(true);
        setActiveTint('tint-peach');
        setReadingRulerActive(true);
        break;
      case 'deaf':
        setUserRole('DeafStudent');
        setActiveTab('sign');
        setDyslexicFont(false);
        setActiveTint('none');
        setReadingRulerActive(false);
        break;
      case 'teacher':
        setUserRole('Teacher');
        setActiveTab('booking');
        break;
      case 'live-class':
        setActiveTab('live');
        break;
      case 'flashcards':
        setActiveTab('flashcards-quiz');
        break;
      default:
        break;
    }
  };

  const handleResetAccessibility = () => {
    setTheme('default');
    setDyslexicFont(false);
    setFontSize(16);
    setLetterSpacing(0.01);
    setLineHeight(1.65);
    setActiveTint('none');
    setReadingRulerActive(false);
    setSpeechRate(1.0);
  };

  const handleJoinClassroomFromBooking = (booking) => {
    soundEffects.playSuccess();
    setActiveTab('live');
  };

  // Render Login Portal View if not logged in
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#070b14] text-slate-100 relative">
        <LoginPage
          onLogin={handleLogin}
          dyslexicFont={dyslexicFont}
          setDyslexicFont={setDyslexicFont}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] relative selection:bg-cyan-500 selection:text-black">
      {/* 1. Global Reading Ruler Guide */}
      <ReadingRuler isActive={readingRulerActive} />

      {/* 2. Global Scotopic Color Tint Overlay */}
      {activeTint !== 'none' && (
        <div className={`tint-overlay ${activeTint}`} />
      )}

      {/* 3. Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentTheme={currentTheme}
        setTheme={setTheme}
        dyslexicFont={dyslexicFont}
        setDyslexicFont={setDyslexicFont}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        currentUser={currentUser}
        userRole={userRole}
        setUserRole={setUserRole}
        onLogout={handleLogout}
        openPitchModal={() => {
          soundEffects.playClick();
          setIsPitchModalOpen(true);
        }}
        toggleAccessibilityBar={() => setIsAccessibilityBarOpen(!isAccessibilityBarOpen)}
      />

      {/* 4. Executive SIH 2026 Evaluation Presets Toolbar */}
      <div className="bg-slate-950/70 border-b border-white/[0.06] py-2.5 px-4 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto text-xs">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-cyan-400 font-extrabold uppercase tracking-wider flex items-center gap-1.5 text-[11px] bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
              <Zap size={13} className="fill-current text-amber-400" /> SIH Evaluation Presets:
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            <button
              onClick={() => loadPreset('dyslexia')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 ${
                activeTab === 'dyslexia' 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-400/50 shadow-md shadow-amber-500/20' 
                  : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10'
              }`}
            >
              <span>🧠 1. Dyslexia Mode (Aarav)</span>
            </button>

            <button
              onClick={() => loadPreset('deaf')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 ${
                activeTab === 'sign' 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-md shadow-cyan-500/20' 
                  : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10'
              }`}
            >
              <span>🤟 2. Hand Sign AI (Riya)</span>
            </button>

            <button
              onClick={() => loadPreset('teacher')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 ${
                activeTab === 'booking' 
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-400/50 shadow-md shadow-indigo-500/20' 
                  : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10'
              }`}
            >
              <span>📅 3. Teacher Slot Booking</span>
            </button>

            <button
              onClick={() => loadPreset('live-class')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 ${
                activeTab === 'live' 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 shadow-md shadow-emerald-500/20' 
                  : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10'
              }`}
            >
              <span>🎥 4. Live Classroom & Board</span>
            </button>

            <button
              onClick={() => loadPreset('flashcards')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 ${
                activeTab === 'flashcards-quiz' 
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-400/50 shadow-md shadow-purple-500/20' 
                  : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10'
              }`}
            >
              <span>🗂️ 5. Pre/Post Decks & Quiz</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30"
              title="Open the Dedicated Login Portal"
            >
              <LogIn size={13} />
              <span>🔑 View Login Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. Main Application Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-8">
        {activeTab === 'dyslexia' && (
          <DyslexiaSuite
            speechRate={speechRate}
            setSpeechRate={setSpeechRate}
            dyslexicFont={dyslexicFont}
            setDyslexicFont={setDyslexicFont}
          />
        )}

        {activeTab === 'sign' && <SignLanguageHub />}

        {activeTab === 'booking' && (
          <TeacherBookingHub onJoinClassroom={handleJoinClassroomFromBooking} />
        )}

        {activeTab === 'live' && (
          <LiveClassroomHub
            dyslexicFont={dyslexicFont}
            setDyslexicFont={setDyslexicFont}
            onOpenFlashcards={() => setActiveTab('flashcards-quiz')}
          />
        )}

        {activeTab === 'database' && <StudentDatabaseHub />}

        {activeTab === 'flashcards-quiz' && (
          <FlashcardsQuizHub
            dyslexicFont={dyslexicFont}
            setDyslexicFont={setDyslexicFont}
          />
        )}
      </main>

      {/* 6. Executive Footer */}
      <footer className="border-t border-white/[0.08] bg-slate-950/90 py-6 px-4 text-xs text-slate-400 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-extrabold text-slate-200">
              DIVYA-SmartEdu • Smart India Hackathon 2026
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-cyan-400 font-semibold">Problem Statement ID: 26205 (AICTE Student Innovation)</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5 text-rose-400 font-medium">
              <Heart size={14} className="fill-current" /> Designed for 100% Inclusive Learning
            </span>
            <span>•</span>
            <span className="text-slate-300">SDG 4 & SDG 10 Aligned</span>
          </div>
        </div>
      </footer>

      {/* 7. Floating Slide-out Accessibility Toolbox */}
      <AccessibilityBar
        isOpen={isAccessibilityBarOpen}
        onClose={() => setIsAccessibilityBarOpen(false)}
        fontSize={fontSize}
        setFontSize={setFontSize}
        letterSpacing={letterSpacing}
        setLetterSpacing={setLetterSpacing}
        lineHeight={lineHeight}
        setLineHeight={setLineHeight}
        dyslexicFont={dyslexicFont}
        setDyslexicFont={setDyslexicFont}
        activeTint={activeTint}
        setActiveTint={setActiveTint}
        readingRulerActive={readingRulerActive}
        setReadingRulerActive={setReadingRulerActive}
        speechRate={speechRate}
        setSpeechRate={setSpeechRate}
        currentTheme={currentTheme}
        setTheme={setTheme}
        onReset={handleResetAccessibility}
      />

      {/* 8. Pitch & Architecture Modal for Evaluators */}
      <SIHPitchModal
        isOpen={isPitchModalOpen}
        onClose={() => setIsPitchModalOpen(false)}
      />
    </div>
  );
}
