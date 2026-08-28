import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  Eye, 
  Sparkles, 
  FileText, 
  BookOpen, 
  Copy, 
  Check, 
  Type, 
  Zap,
  Activity,
  Sliders
} from 'lucide-react';
import { parseBionicText } from '../../utils/bionicParser';
import { soundEffects } from '../../utils/soundEffects';

const SAMPLE_LESSONS = [
  {
    id: 'lesson-1',
    title: 'The Miracle of Photosynthesis',
    category: 'Class 9 Science',
    content: `Photosynthesis is the wondrous biological process through which green plants transform sunlight into vital chemical energy. Inside every leaf cell, microscopic organelles called chloroplasts house chlorophyll, a specialized pigment that absorbs red and blue light wavelengths while reflecting lush green light.

Using water drawn from deep roots and carbon dioxide absorbed from the air through microscopic stomata pores, the plant manufactures glucose sugars. This glucose fuels cellular growth, while pure oxygen is released back into our atmosphere, sustaining all animal life on Earth.`
  },
  {
    id: 'lesson-2',
    title: 'How Black Holes Warp Space & Time',
    category: 'Class 10 Physics',
    content: `A black hole is a cosmic region where gravity is so overwhelmingly intense that nothing, not even light, can escape its gravitational grip. According to Albert Einstein's General Theory of Relativity, an extremely dense concentration of mass curves the very fabric of spacetime around it.

The boundary marking the point of no return is known as the Event Horizon. Once an object crosses this invisible perimeter, the escape velocity exceeds the speed of light, pulling matter inevitably toward the central singularity.`
  },
  {
    id: 'lesson-3',
    title: 'The Indus Valley Civilization & Smart Cities',
    category: 'Social Studies',
    content: `More than four thousand years ago, the ancient Indus Valley Civilization flourished along the fertile banks of the Indus and Ghaggar-Hakra rivers. Cities like Harappa and Mohenjo-daro featured remarkably sophisticated urban planning, grid-based street layouts, and world-class underground drainage systems.

Their standard kiln-baked brick ratios, public granaries, and the Great Bath demonstrate an advanced understanding of civic hygiene and architectural symmetry long before modern metropolises.`
  }
];

export default function BionicReader({ speechRate, setSpeechRate, dyslexicFont, setDyslexicFont }) {
  const [selectedLesson, setSelectedLesson] = useState(SAMPLE_LESSONS[0]);
  const [customText, setCustomText] = useState(SAMPLE_LESSONS[0].content);
  const [isBionicActive, setIsBionicActive] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [copied, setCopied] = useState(false);
  const [inspectedWord, setInspectedWord] = useState(null);

  const utteranceRef = useRef(null);
  const parsedParagraphs = parseBionicText(customText);

  // Stop speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleLessonSelect = (lesson) => {
    soundEffects.playClick();
    stopSpeech();
    setSelectedLesson(lesson);
    setCustomText(lesson.content);
    setInspectedWord(null);
  };

  const startSpeech = () => {
    soundEffects.playClick();
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(customText);
    utterance.rate = speechRate || 1.0;
    utterance.pitch = 1.0;

    let wordCounter = 0;
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        setCurrentWordIndex(wordCounter);
        wordCounter++;
      }
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentWordIndex(-1);
      soundEffects.playSuccess();
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentWordIndex(-1);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const pauseSpeech = () => {
    soundEffects.playClick();
    if (window.speechSynthesis) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const stopSpeech = () => {
    soundEffects.playClick();
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentWordIndex(-1);
  };

  const handleWordClick = (word) => {
    soundEffects.playClick();
    const clean = word.replace(/[^\w]/g, '');
    if (!clean) return;
    setInspectedWord(clean);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(clean);
      u.rate = 0.8;
      window.speechSynthesis.speak(u);
    }
  };

  const handleCopy = () => {
    soundEffects.playClick();
    navigator.clipboard.writeText(customText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="pro-card p-6 flex flex-wrap items-center justify-between gap-4 border border-cyan-500/20 bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-xl shadow-indigo-500/30">
            <BookOpen size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
                Bionic Reader & Spoken Word Karaoke
              </h2>
              <span className="badge-pro bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[10px]">
                Saccadic AI
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Empowering dyslexic & ADHD readers with syllable fixation guidance and real-time audio word tracking
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center flex-wrap gap-2.5">
          <button
            onClick={() => {
              soundEffects.playClick();
              setIsBionicActive(!isBionicActive);
            }}
            className={`btn-pro text-xs px-4 py-2 cursor-pointer transition-all ${
              isBionicActive
                ? 'bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-black shadow-lg shadow-cyan-500/30'
                : 'btn-glass text-slate-300'
            }`}
          >
            <Zap size={14} className={isBionicActive ? 'fill-current' : ''} />
            <span>Bionic Mode: {isBionicActive ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setDyslexicFont(!dyslexicFont);
            }}
            className={`btn-pro text-xs px-4 py-2 cursor-pointer transition-all ${
              dyslexicFont
                ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-black shadow-lg shadow-amber-500/30'
                : 'btn-glass text-slate-300'
            }`}
          >
            <Eye size={14} />
            <span>OpenDyslexic: {dyslexicFont ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="btn-pro btn-glass text-xs px-3.5 py-2 cursor-pointer"
            title="Copy text"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Lesson Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0">
          <FileText size={14} className="text-indigo-400" /> Curriculum Lessons:
        </span>
        {SAMPLE_LESSONS.map((lesson) => (
          <button
            key={lesson.id}
            onClick={() => handleLessonSelect(lesson)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
              selectedLesson.id === lesson.id
                ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 border-cyan-400 text-white shadow-md shadow-indigo-500/25'
                : 'bg-white/[0.04] border-white/10 text-slate-400 hover:bg-white/[0.08] hover:text-white'
            }`}
          >
            {lesson.title} ({lesson.category})
          </button>
        ))}
      </div>

      {/* Main Interactive Reader Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Formatted Bionic Canvas */}
        <div className="lg:col-span-8 space-y-4">
          <div className="pro-card p-6 sm:p-8 min-h-[440px] border border-cyan-500/30 bg-slate-900/90 relative">
            {/* Audio Playback Controls & Wave Indicator */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 flex-wrap gap-3">
              <div className="flex items-center gap-2.5">
                {!isPlaying ? (
                  <button
                    onClick={startSpeech}
                    className="btn-pro btn-gradient-emerald text-xs px-5 py-2.5 cursor-pointer shadow-lg shadow-emerald-500/30"
                  >
                    <Play size={14} className="fill-current" />
                    <span>{isPaused ? 'Resume Karaoke' : 'Listen with Word Karaoke'}</span>
                  </button>
                ) : (
                  <button
                    onClick={pauseSpeech}
                    className="btn-pro bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs px-4 py-2.5 cursor-pointer shadow-lg"
                  >
                    <Pause size={14} className="fill-current" />
                    <span>Pause</span>
                  </button>
                )}

                {(isPlaying || isPaused) && (
                  <button
                    onClick={stopSpeech}
                    className="btn-pro btn-glass text-xs px-3.5 py-2 text-rose-400 border-rose-500/40 cursor-pointer"
                  >
                    <RotateCcw size={14} />
                    <span>Stop</span>
                  </button>
                )}
              </div>

              {/* Speech Wave Animation & Speed Pill */}
              <div className="flex items-center gap-3">
                {isPlaying && (
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold animate-pulse">
                    <Activity size={13} className="animate-spin" />
                    <span>Audio Sync Active</span>
                  </div>
                )}

                <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-white/[0.05] px-3 py-1.5 rounded-xl border border-white/10">
                  <Volume2 size={13} className="text-cyan-400" />
                  <span>Speed: <strong className="text-cyan-300">{speechRate}x</strong></span>
                </div>
              </div>
            </div>

            {/* Reading Content */}
            <div className="space-y-5 leading-relaxed text-slate-200">
              {parsedParagraphs.map((para, pIndex) => {
                let globalWordCounter = 0;
                for (let i = 0; i < pIndex; i++) {
                  globalWordCounter += parsedParagraphs[i].words.filter(w => w.type === 'word').length;
                }

                return (
                  <p key={para.pIdx} className="text-base sm:text-lg">
                    {para.words.map((chunk) => {
                      if (chunk.type === 'space') {
                        return chunk.value;
                      }

                      const thisWordIndex = globalWordCounter;
                      globalWordCounter++;
                      const isCurrentKaraoke = isPlaying && currentWordIndex === thisWordIndex;

                      return (
                        <span
                          key={chunk.key}
                          onClick={() => handleWordClick(chunk.raw)}
                          title="Click to hear slow phonetic pronunciation"
                          className={`inline-block mx-[1px] cursor-pointer hover:underline rounded ${
                            isCurrentKaraoke ? 'karaoke-active-word' : ''
                          }`}
                        >
                          {isBionicActive ? (
                            <>
                              <span className="font-extrabold text-cyan-300">{chunk.lead}</span>
                              <span className="font-normal text-slate-100">{chunk.rest}</span>
                            </>
                          ) : (
                            <span>{chunk.raw}</span>
                          )}
                        </span>
                      );
                    })}
                  </p>
                );
              })}
            </div>

            {/* Bottom Status Bar */}
            <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Sparkles size={13} /> Saccadic Guidance Active • Click any word for pronunciation
              </span>
              <span className="font-mono font-bold text-slate-300">{customText.split(/\s+/).filter(Boolean).length} Words</span>
            </div>
          </div>
        </div>

        {/* Right Column: Custom Material & Word Inspector */}
        <div className="lg:col-span-4 space-y-4">
          {/* Word Inspector Card */}
          {inspectedWord && (
            <div className="pro-card p-4 border border-amber-400/40 bg-slate-900/95 space-y-2 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="badge-pro bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[9px]">
                  Phonetic Breakdown
                </span>
                <button onClick={() => setInspectedWord(null)} className="text-slate-400 hover:text-white text-xs cursor-pointer font-bold">✕</button>
              </div>
              <h4 className="text-lg font-black text-white">{inspectedWord}</h4>
              <p className="text-xs text-slate-300">
                Syllables: <strong className="text-amber-300">{inspectedWord.match(/.{1,3}/g)?.join(' · ')}</strong>
              </p>
              <button
                onClick={() => handleWordClick(inspectedWord)}
                className="btn-pro btn-gradient-indigo text-xs w-full py-1.5 cursor-pointer mt-1"
              >
                <Volume2 size={13} /> Speak Slowly
              </button>
            </div>
          )}

          {/* Custom Material Input */}
          <div className="pro-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Type size={16} className="text-indigo-400" />
                Custom Textbook Input
              </h3>
              <span className="text-[11px] text-slate-400">Paste material</span>
            </div>

            <textarea
              rows={7}
              value={customText}
              onChange={(e) => {
                stopSpeech();
                setCustomText(e.target.value);
              }}
              placeholder="Paste any textbook excerpt, homework question, or lecture note here..."
              className="w-full p-3.5 rounded-2xl bg-slate-950/80 border border-white/10 text-slate-200 text-xs sm:text-sm focus:border-cyan-400 focus:outline-none resize-y"
            />

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  stopSpeech();
                  setCustomText(
                    `In quantum physics, light behaves both as a wave and as discrete packets of energy known as photons. This dual nature is proven through the famous double-slit experiment.`
                  );
                }}
                className="btn-pro btn-glass text-xs w-full py-2 cursor-pointer"
              >
                Load Physics Sample
              </button>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  stopSpeech();
                  setCustomText('');
                }}
                className="btn-pro btn-glass text-xs px-3.5 py-2 text-rose-400 border-rose-500/30 cursor-pointer"
                title="Clear Text"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Dyslexia Strategy Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-purple-950/50 border border-indigo-500/30 text-xs space-y-2">
            <h4 className="font-extrabold text-indigo-300 flex items-center gap-1.5">
              💡 Neurodivergent Reading Pro-Tip
            </h4>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              1. Keep <strong>Bionic Mode ON</strong> to eliminate reading regressions.<br/>
              2. Use <strong>Audio Karaoke</strong> for multi-sensory reinforcement.<br/>
              3. Open <strong>Tools</strong> to apply <strong>Warm Peach</strong> or <strong>Cool Aqua</strong> filters for visual scotopic relief.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
