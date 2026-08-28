import React from 'react';
import { 
  Sliders, 
  X, 
  Type, 
  Palette, 
  Maximize2, 
  RotateCcw, 
  Volume2, 
  Sparkles,
  MoveHorizontal,
  Compass
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export const COLOR_TINTS = [
  { id: 'none', label: 'None (Default Dark)', color: 'transparent', border: 'border-white/20' },
  { id: 'tint-peach', label: 'Warm Peach (Scotopic Relief)', color: '#fb923c', border: 'border-orange-400' },
  { id: 'tint-yellow', label: 'High-Contrast Yellow', color: '#facc15', border: 'border-yellow-400' },
  { id: 'tint-aqua', label: 'Cool Aqua (Eye Fatigue)', color: '#38bdf8', border: 'border-cyan-400' },
  { id: 'tint-mint', label: 'Calm Mint Green', color: '#4ade80', border: 'border-emerald-400' },
  { id: 'tint-rose', label: 'Soothing Rose', color: '#f43f5e', border: 'border-rose-400' },
  { id: 'tint-lavender', label: 'Soft Lavender', color: '#c084fc', border: 'border-purple-400' }
];

export const THEMES = [
  { id: 'default', label: 'Futuristic Dark', bg: '#0a0f1d' },
  { id: 'warm-peach', label: 'Warm Dyslexia Mode', bg: '#fff7ed' },
  { id: 'high-contrast', label: 'High Contrast (Yellow/Black)', bg: '#000000' },
  { id: 'cool-aqua', label: 'Aqua Blue Shield', bg: '#082f49' },
  { id: 'light-clean', label: 'Clean Light', bg: '#f8fafc' }
];

export default function AccessibilityBar({
  isOpen,
  onClose,
  fontSize,
  setFontSize,
  letterSpacing,
  setLetterSpacing,
  lineHeight,
  setLineHeight,
  dyslexicFont,
  setDyslexicFont,
  activeTint,
  setActiveTint,
  readingRulerActive,
  setReadingRulerActive,
  speechRate,
  setSpeechRate,
  currentTheme,
  setTheme,
  onReset
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-slate-900/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Sliders size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Accessibility Studio</h3>
              <p className="text-xs text-slate-400">Neurodivergent & Low-Vision Comfort</p>
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

        {/* 1. Theme Presets */}
        <div className="mb-6">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Palette size={14} className="text-indigo-400" /> Color Contrast & Theme
          </label>
          <div className="grid grid-cols-2 gap-2">
            {THEMES.map((th) => (
              <button
                key={th.id}
                onClick={() => {
                  soundEffects.playClick();
                  setTheme(th.id);
                }}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                  currentTheme === th.id
                    ? 'border-indigo-500 bg-indigo-500/20 text-white shadow-sm shadow-indigo-500/20'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full border border-white/30" style={{ backgroundColor: th.bg }}></span>
                <span className="truncate">{th.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Dyslexia Font Toggle */}
        <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Type size={16} className="text-amber-400" />
              <div>
                <div className="text-xs font-bold text-white">OpenDyslexic Font</div>
                <div className="text-[11px] text-slate-400">Heavier weighted bottom letters to avoid flipping</div>
              </div>
            </div>
            <button
              onClick={() => {
                soundEffects.playClick();
                setDyslexicFont(!dyslexicFont);
              }}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                dyslexicFont ? 'bg-amber-500 justify-end' : 'bg-slate-700 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
            </button>
          </div>
        </div>

        {/* 3. Typography & Spacing Sliders */}
        <div className="mb-6 space-y-4">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Maximize2 size={14} className="text-cyan-400" /> Font Size ({fontSize}px)
          </label>
          <input
            type="range"
            min="14"
            max="26"
            step="1"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />

          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <MoveHorizontal size={14} className="text-emerald-400" /> Letter Spacing
            </span>
            <span className="text-xs text-slate-400">{letterSpacing}em</span>
          </label>
          <input
            type="range"
            min="0.01"
            max="0.12"
            step="0.01"
            value={letterSpacing}
            onChange={(e) => setLetterSpacing(Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer"
          />

          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Type size={14} className="text-purple-400" /> Line Spacing
            </span>
            <span className="text-xs text-slate-400">{lineHeight}</span>
          </label>
          <input
            type="range"
            min="1.4"
            max="2.4"
            step="0.1"
            value={lineHeight}
            onChange={(e) => setLineHeight(Number(e.target.value))}
            className="w-full accent-purple-400 cursor-pointer"
          />
        </div>

        {/* 4. Reading Ruler Mask */}
        <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass size={16} className="text-yellow-400" />
              <div>
                <div className="text-xs font-bold text-white">Reading Focus Ruler</div>
                <div className="text-[11px] text-slate-400">Mouse-following highlight guide to isolate lines</div>
              </div>
            </div>
            <button
              onClick={() => {
                soundEffects.playClick();
                setReadingRulerActive(!readingRulerActive);
              }}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                readingRulerActive ? 'bg-yellow-500 justify-end' : 'bg-slate-700 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
            </button>
          </div>
        </div>

        {/* 5. Scotopic Tint Filters */}
        <div className="mb-6">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Sparkles size={14} className="text-pink-400" /> Visual Stress Tint Filters
          </label>
          <div className="flex flex-wrap gap-2">
            {COLOR_TINTS.map((tint) => (
              <button
                key={tint.id}
                onClick={() => {
                  soundEffects.playClick();
                  setActiveTint(tint.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-all ${
                  activeTint === tint.id
                    ? 'border-white bg-white/20 text-white font-bold'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full border border-white/40"
                  style={{ backgroundColor: tint.color === 'transparent' ? '#1e293b' : tint.color }}
                ></span>
                <span>{tint.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 6. TTS Speed Slider */}
        <div className="mb-6">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between mb-2">
            <span className="flex items-center gap-1.5">
              <Volume2 size={14} className="text-emerald-400" /> Voice Readout Speed
            </span>
            <span className="text-xs text-slate-400">{speechRate}x</span>
          </label>
          <input
            type="range"
            min="0.6"
            max="1.5"
            step="0.1"
            value={speechRate}
            onChange={(e) => setSpeechRate(Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer"
          />
        </div>
      </div>

      {/* Footer Reset */}
      <div className="pt-4 border-t border-white/10">
        <button
          onClick={() => {
            soundEffects.playClick();
            onReset();
          }}
          className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <RotateCcw size={14} /> Reset Accessibility to Defaults
        </button>
      </div>
    </div>
  );
}
