import React, { useState, useEffect } from 'react';
import { 
  Type, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Hand, 
  ChevronLeft, 
  ChevronRight,
  Info
} from 'lucide-react';
import { SIGN_ALPHABET, COMMON_SIGNS } from '../../data/signData';
import { soundEffects } from '../../utils/soundEffects';

export default function TextToSignConverter() {
  const [inputText, setInputText] = useState('LEARN');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000); // ms per letter

  // Split input into clean signable tokens
  const cleanTokens = inputText
    .toUpperCase()
    .split('')
    .filter(char => /[A-Z0-9]/.test(char));

  useEffect(() => {
    let timer = null;
    if (isPlaying && cleanTokens.length > 0) {
      timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= cleanTokens.length - 1) {
            setIsPlaying(false);
            soundEffects.playSuccess();
            return 0;
          }
          soundEffects.playFlip();
          return prev + 1;
        });
      }, speed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, cleanTokens.length, speed]);

  const activeChar = cleanTokens[currentIndex] || 'L';
  const signInfo = SIGN_ALPHABET.find(s => s.char === activeChar) || {
    char: activeChar,
    name: `Letter ${activeChar}`,
    description: `Standard finger-spelling formation for ${activeChar}`,
    instructions: `Position hand in standard orientation for ${activeChar}`,
    funFact: 'Part of foundational sign alphabet'
  };

  const handleNext = () => {
    soundEffects.playClick();
    if (currentIndex < cleanTokens.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    soundEffects.playClick();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(cleanTokens.length - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/25">
            <Type size={22} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white font-['Outfit'] flex items-center gap-2">
              Text-to-Sign Language Visual Engine
              <span className="badge badge-indigo text-[10px]">Animated Converter</span>
            </h2>
            <p className="text-xs text-slate-400">
              Type any word or phrase to visualize seamless step-by-step Indian & American Sign Language finger-spelling
            </p>
          </div>
        </div>
      </div>

      {/* Input Control Box */}
      <div className="glass-panel p-5 sm:p-6 space-y-4 border border-indigo-500/20">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full">
            <input
              type="text"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setCurrentIndex(0);
                setIsPlaying(false);
              }}
              placeholder="Type a word (e.g. SMART, DIVYA, SCIENCE)..."
              maxLength={20}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-white/15 text-white text-base font-bold uppercase tracking-wider focus:border-indigo-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <button
              onClick={() => {
                soundEffects.playClick();
                setIsPlaying(!isPlaying);
              }}
              disabled={cleanTokens.length === 0}
              className="btn btn-primary text-xs px-5 py-3 w-full sm:w-auto font-bold cursor-pointer"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              <span>{isPlaying ? 'Pause Animation' : 'Auto Play Sign Sequence'}</span>
            </button>
          </div>
        </div>

        {/* Quick Sample Words */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 font-bold shrink-0">Quick Prompts:</span>
          {['LEARN', 'SMART', 'INCLUSIVE', 'GURU', 'FRIEND', 'AICTE'].map((word) => (
            <button
              key={word}
              onClick={() => {
                soundEffects.playClick();
                setInputText(word);
                setCurrentIndex(0);
                setIsPlaying(false);
              }}
              className={`px-3 py-1 rounded-lg border font-bold transition-all cursor-pointer ${
                inputText === word
                  ? 'bg-indigo-600 border-indigo-400 text-white'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
              }`}
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {/* Main Display: Interactive Sign Card & Token Bar */}
      {cleanTokens.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Active Big Sign Card */}
          <div className="lg:col-span-8 space-y-4">
            <div className="glass-panel p-8 text-center space-y-6 border border-cyan-500/30 bg-slate-900/90 relative overflow-hidden">
              {/* Token sequence progress indicator */}
              <div className="flex items-center justify-center gap-2 flex-wrap pb-2 border-b border-white/10">
                {cleanTokens.map((token, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      soundEffects.playClick();
                      setCurrentIndex(idx);
                      setIsPlaying(false);
                    }}
                    className={`w-10 h-10 rounded-xl font-black text-sm transition-all cursor-pointer flex items-center justify-center ${
                      idx === currentIndex
                        ? 'bg-gradient-to-tr from-indigo-500 to-cyan-400 text-white scale-110 shadow-lg shadow-cyan-500/30'
                        : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5'
                    }`}
                  >
                    {token}
                  </button>
                ))}
              </div>

              {/* Hand Graphics Visual Representation */}
              <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-3xl bg-slate-950/80 border-2 border-indigo-500/40 p-6 flex flex-col items-center justify-center shadow-2xl relative group">
                <div className="text-6xl sm:text-7xl mb-2 group-hover:scale-110 transition-transform">
                  🤟
                </div>
                <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300 font-['Outfit']">
                  {signInfo.char}
                </div>
                <span className="text-[11px] text-slate-400 font-semibold mt-1">ISL / ASL Standard</span>
              </div>

              {/* Sign Details */}
              <div className="max-w-md mx-auto space-y-2">
                <h3 className="text-xl font-extrabold text-white">{signInfo.name}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {signInfo.instructions || signInfo.description}
                </p>
              </div>

              {/* Step Navigation Controls */}
              <div className="flex items-center justify-center gap-4 pt-4">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all cursor-pointer"
                  title="Previous Letter"
                >
                  <ChevronLeft size={20} />
                </button>

                <span className="text-xs font-bold text-slate-400">
                  {currentIndex + 1} of {cleanTokens.length}
                </span>

                <button
                  onClick={handleNext}
                  className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all cursor-pointer"
                  title="Next Letter"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Speed Control & Fun Facts */}
          <div className="lg:col-span-4 space-y-4">
            <div className="glass-panel p-5 space-y-4 border border-white/10">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles size={16} className="text-amber-400" />
                Playback Speed
              </h3>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Speed</span>
                  <span className="text-cyan-400 font-bold">{(1000 / speed).toFixed(1)}x ({speed}ms)</span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="2000"
                  step="100"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                  <span>Fast (400ms)</span>
                  <span>Normal (1000ms)</span>
                  <span>Slow (2000ms)</span>
                </div>
              </div>
            </div>

            {/* Fun Fact Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-indigo-500/30 text-xs space-y-2">
              <h4 className="font-bold text-indigo-300 flex items-center gap-1.5">
                <Info size={14} className="text-cyan-400" /> Sign Tip for "{signInfo.char}"
              </h4>
              <p className="text-slate-300 leading-relaxed">
                {signInfo.funFact || 'Consistent wrist angle and distinct finger spacing are essential for high visual clarity.'}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-panel p-12 text-center text-slate-400">
          Please enter at least one alphanumeric character in the box above.
        </div>
      )}
    </div>
  );
}
