import React, { useState } from 'react';
import { 
  RotateCw, 
  Volume2, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  BookOpen, 
  Shuffle, 
  Zap, 
  CheckCircle2, 
  HelpCircle,
  Eye,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEffects } from '../../utils/soundEffects';
import { parseBionicText } from '../../utils/bionicParser';

export default function FlashcardDeck({ deck, deckType, dyslexicFont, onCompleteDeck }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isBionicOn, setIsBionicOn] = useState(true);
  const [masteredCards, setMasteredCards] = useState([]);
  const [spacedInterval, setSpacedInterval] = useState(null);

  if (!deck || !deck.cards || deck.cards.length === 0) return null;

  const card = deck.cards[currentIndex];
  const isCurrentMastered = masteredCards.includes(card.id);

  const handleFlip = () => {
    soundEffects.playFlip();
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    soundEffects.playClick();
    setIsFlipped(false);
    setSpacedInterval(null);
    if (currentIndex < deck.cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    soundEffects.playClick();
    setIsFlipped(false);
    setSpacedInterval(null);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(deck.cards.length - 1);
    }
  };

  const handlePlayAudio = (e) => {
    e.stopPropagation();
    soundEffects.playClick();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = card.audioText || `${card.frontWord}. ${card.backDefinition}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleRateSpaced = (intervalName, e) => {
    e.stopPropagation();
    soundEffects.playSuccess();
    setSpacedInterval(intervalName);
    if (!masteredCards.includes(card.id)) {
      const updated = [...masteredCards, card.id];
      setMasteredCards(updated);
      if (updated.length === deck.cards.length) {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      }
    }
    setTimeout(() => {
      handleNext();
    }, 600);
  };

  const renderBionic = (text) => {
    if (!isBionicOn) return text;
    const parsed = parseBionicText(text);
    return parsed.map((para) => (
      <span key={para.pIdx} className="block">
        {para.words.map((chunk) => {
          if (chunk.type === 'space') return chunk.value;
          return (
            <span key={chunk.key} className="inline-block mx-[0.5px]">
              <strong className="font-black text-cyan-300">{chunk.lead}</strong>
              <span>{chunk.rest}</span>
            </span>
          );
        })}
      </span>
    ));
  };

  return (
    <div className="space-y-6">
      {/* Deck Header Bar */}
      <div className="pro-card p-6 flex flex-wrap items-center justify-between gap-4 border border-white/10 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className={`badge-pro text-[10px] ${deckType === 'pre' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-400/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'}`}>
              {deckType === 'pre' ? '⚡ Pre-Lecture Primer Deck' : '🧠 Post-Lecture Spaced Review'}
            </span>
            <span className="text-xs text-slate-400 font-bold">{deck.subject} • {deck.targetClass}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">{deck.title}</h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{deck.description}</p>
        </div>

        {/* Progress & Tools */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundEffects.playClick();
              setIsBionicOn(!isBionicOn);
            }}
            className={`btn-pro text-xs px-3.5 py-2 cursor-pointer ${
              isBionicOn ? 'bg-cyan-500 text-black font-black shadow-md shadow-cyan-500/30' : 'btn-glass text-slate-300'
            }`}
          >
            <Zap size={13} />
            <span>Bionic: {isBionicOn ? 'ON' : 'OFF'}</span>
          </button>

          <div className="text-xs text-slate-200 bg-white/[0.06] px-4 py-2 rounded-2xl border border-white/15 font-black">
            Card {currentIndex + 1} of {deck.cards.length}
          </div>
        </div>
      </div>

      {/* 3D Flashcard Presentation Area */}
      <div className="max-w-2xl mx-auto perspective-1000">
        <div
          onClick={handleFlip}
          className={`relative w-full min-h-[360px] sm:min-h-[400px] rounded-3xl p-6 sm:p-8 cursor-pointer transition-transform duration-500 transform-style-preserve-3d shadow-2xl border ${
            isFlipped
              ? 'bg-slate-900 border-emerald-500/50 rotate-y-180'
              : 'bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-950 border-cyan-500/40'
          }`}
        >
          {/* Card Top Right Audio & Mastered Pill */}
          <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
            <button
              onClick={handlePlayAudio}
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-cyan-300 border border-white/15 transition-all cursor-pointer shadow-md"
              title="Listen to pronunciation"
            >
              <Volume2 size={16} />
            </button>
            <div
              className={`p-2.5 rounded-2xl border transition-all ${
                isCurrentMastered
                  ? 'bg-emerald-500 text-black border-emerald-400 font-black shadow-lg shadow-emerald-500/30'
                  : 'bg-white/10 text-slate-400 border-white/10'
              }`}
              title={isCurrentMastered ? 'Mastered!' : 'Not yet mastered'}
            >
              <CheckCircle2 size={16} />
            </div>
          </div>

          {/* FRONT OF CARD */}
          <div className={`space-y-4 flex flex-col justify-between h-full ${isFlipped ? 'hidden' : 'block'}`}>
            <div>
              <span className="badge-pro bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[9px] uppercase">
                Concept Word
              </span>
              <div className="text-6xl sm:text-7xl text-center my-4 animate-bounce">
                {card.frontImage}
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white text-center font-['Outfit']">
                {card.frontWord}
              </h2>
              {card.frontPhonetic && (
                <div className="text-center font-mono text-xs text-indigo-300 font-semibold mt-1">
                  {card.frontPhonetic}
                </div>
              )}
            </div>

            <div className="text-center space-y-3">
              {card.frontHint && (
                <div className="inline-block p-3 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-amber-300 font-semibold">
                  💡 Hint: {card.frontHint}
                </div>
              )}
              <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5 font-bold uppercase tracking-wider">
                <RotateCw size={12} className="text-cyan-400" /> Tap card to flip & view definition
              </div>
            </div>
          </div>

          {/* BACK OF CARD (Flipped) */}
          <div className={`space-y-4 flex flex-col justify-between h-full rotate-y-180 ${isFlipped ? 'block' : 'hidden'}`}>
            <div className="space-y-3">
              <span className="badge-pro bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[9px] uppercase">
                Definition & Key Takeaway
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">{card.frontWord}</h3>

              <div className="text-sm sm:text-base text-slate-200 leading-relaxed">
                {renderBionic(card.backDefinition)}
              </div>

              {card.backKeyFormula && (
                <div className="p-3 rounded-2xl bg-slate-950/90 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold shadow-inner">
                  ⚡ {card.backKeyFormula}
                </div>
              )}
            </div>

            {/* Spaced Repetition Buttons */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              {card.backDyslexiaMnemonic && (
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
                  🧠 <strong>Memory Anchor:</strong> {card.backDyslexiaMnemonic}
                </div>
              )}

              <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                <button
                  onClick={(e) => handleRateSpaced('Again', e)}
                  className="p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-bold"
                >
                  Again (1m)
                </button>
                <button
                  onClick={(e) => handleRateSpaced('Hard', e)}
                  className="p-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold"
                >
                  Hard (10m)
                </button>
                <button
                  onClick={(e) => handleRateSpaced('Good', e)}
                  className="p-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-bold"
                >
                  Good (1d)
                </button>
                <button
                  onClick={(e) => handleRateSpaced('Easy', e)}
                  className="p-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-bold"
                >
                  Easy (4d)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Navigation Controls */}
      <div className="flex items-center justify-center gap-4 pt-2">
        <button
          onClick={handlePrev}
          className="btn-pro btn-glass text-xs px-5 py-2.5 cursor-pointer flex items-center gap-1.5"
        >
          <ChevronLeft size={16} /> Previous
        </button>

        <button
          onClick={handleFlip}
          className="btn-pro btn-gradient-indigo text-xs px-7 py-2.5 cursor-pointer flex items-center gap-2 shadow-xl shadow-indigo-500/30 font-black"
        >
          <RotateCw size={14} /> Flip Card
        </button>

        <button
          onClick={handleNext}
          className="btn-pro btn-glass text-xs px-5 py-2.5 cursor-pointer flex items-center gap-1.5"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>

      {/* Deck Completion Banner */}
      {masteredCards.length === deck.cards.length && (
        <div className="p-5 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 text-center text-xs sm:text-sm text-emerald-300 font-black flex items-center justify-center gap-2 shadow-xl animate-fade-in">
          <Sparkles size={18} /> All {deck.cards.length} flashcards in this deck mastered! Spaced review memory active!
        </div>
      )}
    </div>
  );
}
