import React, { useState } from 'react';
import { 
  Layers, 
  HelpCircle, 
  Sparkles, 
  RotateCcw, 
  BookOpen, 
  Zap, 
  Award,
  ChevronRight
} from 'lucide-react';
import FlashcardDeck from './FlashcardDeck';
import AdaptiveQuiz from './AdaptiveQuiz';
import QuizResults from './QuizResults';
import { FLASHCARD_DECKS } from '../../data/flashcardsQuizData';
import { soundEffects } from '../../utils/soundEffects';

export default function FlashcardsQuizHub({ dyslexicFont, setDyslexicFont }) {
  const [activeTab, setActiveTab] = useState('pre-deck'); // 'pre-deck', 'quiz', 'post-deck'
  const [selectedPreDeck, setSelectedPreDeck] = useState(FLASHCARD_DECKS.preLecture[0]);
  const [selectedPostDeck, setSelectedPostDeck] = useState(FLASHCARD_DECKS.postLecture[0]);
  const [quizResults, setQuizResults] = useState(null);

  const tabs = [
    { id: 'pre-deck', label: '1. Pre-Lecture Concept Decks', badge: 'Before Class' },
    { id: 'quiz', label: '2. Gamified Adaptive Quiz', badge: 'Evaluation' },
    { id: 'post-deck', label: '3. Post-Lecture Recap Decks', badge: 'Spaced Memory' }
  ];

  const handleTabChange = (tabId) => {
    soundEffects.playClick();
    setActiveTab(tabId);
  };

  const handleQuizComplete = (results) => {
    setQuizResults(results);
  };

  const handleRestartQuiz = () => {
    setQuizResults(null);
    setActiveTab('quiz');
  };

  return (
    <div className="space-y-6">
      {/* Sub Navigation Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-white/10">
        <div className="flex items-center gap-2 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-indigo-600 text-white shadow-md shadow-amber-500/20'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${isActive ? 'bg-black/30 text-amber-200' : 'bg-slate-800 text-slate-400'}`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span>Cognitive Spaced Repetition Active</span>
        </div>
      </div>

      {/* Pre-Lecture Decks View */}
      {activeTab === 'pre-deck' && (
        <div className="space-y-6">
          {/* Deck Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">
              Select Pre-Deck:
            </span>
            {FLASHCARD_DECKS.preLecture.map((deck) => (
              <button
                key={deck.id}
                onClick={() => {
                  soundEffects.playClick();
                  setSelectedPreDeck(deck);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  selectedPreDeck.id === deck.id
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                }`}
              >
                {deck.title}
              </button>
            ))}
          </div>

          <FlashcardDeck
            deck={selectedPreDeck}
            deckType="pre"
            dyslexicFont={dyslexicFont}
            onCompleteDeck={() => {
              handleTabChange('quiz');
            }}
          />
        </div>
      )}

      {/* Adaptive Quiz View */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          {!quizResults ? (
            <AdaptiveQuiz
              dyslexicFont={dyslexicFont}
              onQuizComplete={handleQuizComplete}
            />
          ) : (
            <QuizResults
              results={quizResults}
              onRestartQuiz={handleRestartQuiz}
              onOpenReviewDeck={() => handleTabChange('post-deck')}
            />
          )}
        </div>
      )}

      {/* Post-Lecture Recap Decks View */}
      {activeTab === 'post-deck' && (
        <div className="space-y-6">
          {/* Deck Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">
              Select Post-Deck:
            </span>
            {FLASHCARD_DECKS.postLecture.map((deck) => (
              <button
                key={deck.id}
                onClick={() => {
                  soundEffects.playClick();
                  setSelectedPostDeck(deck);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  selectedPostDeck.id === deck.id
                    ? 'bg-emerald-600 border-emerald-400 text-white shadow-md'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                }`}
              >
                {deck.title}
              </button>
            ))}
          </div>

          <FlashcardDeck
            deck={selectedPostDeck}
            deckType="post"
            dyslexicFont={dyslexicFont}
            onCompleteDeck={() => {
              alert('Outstanding! Post-lecture spaced review complete.');
            }}
          />
        </div>
      )}
    </div>
  );
}
