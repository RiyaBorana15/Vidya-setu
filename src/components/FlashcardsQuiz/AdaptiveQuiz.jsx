import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Volume2, 
  Timer, 
  Flame, 
  Sparkles, 
  ArrowRight,
  Eye,
  Zap
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/flashcardsQuizData';
import { soundEffects } from '../../utils/soundEffects';

export default function AdaptiveQuiz({ dyslexicFont, onQuizComplete }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimedMode, setIsTimedMode] = useState(true);
  const [showHint, setShowHint] = useState(false);

  const question = QUIZ_QUESTIONS[currentIdx];

  // Timer logic
  useEffect(() => {
    if (!isTimedMode || hasAnswered) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeOut();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIdx, isTimedMode, hasAnswered]);

  const handleTimeOut = () => {
    soundEffects.playWrong();
    setHasAnswered(true);
    setStreak(0);
    setUserAnswers((prev) => ({
      ...prev,
      [question.id]: { isCorrect: false, text: 'Timed Out', explanation: 'Time expired for this question.' }
    }));
  };

  const handleSelectOption = (option) => {
    if (hasAnswered) return;

    soundEffects.playClick();
    setSelectedOption(option);
    setHasAnswered(true);

    const isCorrect = option.isCorrect;
    if (isCorrect) {
      soundEffects.playCorrect();
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      soundEffects.playWrong();
      setStreak(0);
    }

    setUserAnswers((prev) => ({
      ...prev,
      [question.id]: option
    }));
  };

  const handleNext = () => {
    soundEffects.playClick();
    setShowHint(false);
    setSelectedOption(null);
    setHasAnswered(false);
    setTimeLeft(30);

    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      const finalScore = score + (selectedOption && selectedOption.isCorrect ? 0 : 0);
      const xpEarned = score * 100 + streak * 30 + 150;
      onQuizComplete({
        score,
        totalQuestions: QUIZ_QUESTIONS.length,
        xpEarned,
        userAnswers,
        questions: QUIZ_QUESTIONS
      });
    }
  };

  const readQuestionAloud = () => {
    soundEffects.playClick();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = `${question.question}. Options are: ${question.options.map(o => o.text).join(', ')}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      {/* Quiz Header Bar */}
      <div className="glass-panel p-5 flex flex-wrap items-center justify-between gap-4 border border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-slate-950 font-bold shadow-md">
            Q{currentIdx + 1}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-indigo text-[10px]">{question.subject}</span>
              <span className="text-xs text-slate-400 font-semibold">Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}</span>
            </div>
            <h4 className="text-xs text-slate-300 font-medium">Dyslexia-Friendly Adaptive Evaluation</h4>
          </div>
        </div>

        {/* HUD: Timer, Streak, Audio & Timed Toggle */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={readQuestionAloud}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-300 border border-white/10 transition-all cursor-pointer"
            title="Read question aloud"
          >
            <Volume2 size={16} />
          </button>

          {/* Streak Counter */}
          <div className="flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/30 text-xs font-bold text-amber-400">
            <Flame size={14} className="fill-current" />
            <span>{streak}x Streak</span>
          </div>

          {/* Timer */}
          {isTimedMode && (
            <div className={`flex items-center gap-1 px-3 py-1 rounded-xl border text-xs font-bold ${
              timeLeft <= 5 ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse' : 'bg-white/5 border-white/10 text-slate-300'
            }`}>
              <Timer size={14} className="text-cyan-400" />
              <span>{timeLeft}s</span>
            </div>
          )}

          {/* Timed Mode Switch */}
          <button
            onClick={() => {
              soundEffects.playClick();
              setIsTimedMode(!isTimedMode);
            }}
            className="text-[11px] text-slate-400 hover:text-white underline cursor-pointer"
          >
            {isTimedMode ? 'Untimed Mode' : 'Timed Mode'}
          </button>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="glass-panel p-6 sm:p-8 max-w-3xl mx-auto space-y-6 border border-cyan-500/30 bg-slate-900/90 rounded-3xl shadow-2xl">
        {/* Question Text */}
        <div className="space-y-3">
          <h3 className="text-lg sm:text-xl font-extrabold text-white font-['Outfit'] leading-relaxed">
            {question.question}
          </h3>

          {/* Dyslexia Memory Tip Accordion */}
          {question.dyslexiaTip && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-semibold">
                💡 <strong>Dyslexia Focus Tip:</strong> {question.dyslexiaTip}
              </span>
            </div>
          )}
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {question.options.map((opt) => {
            const isSelected = selectedOption && selectedOption.id === opt.id;
            let btnStyle = 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-400/40 text-slate-200';

            if (hasAnswered) {
              if (opt.isCorrect) {
                btnStyle = 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold shadow-lg shadow-emerald-500/20';
              } else if (isSelected && !opt.isCorrect) {
                btnStyle = 'bg-rose-500/20 border-rose-400 text-rose-300 font-bold';
              } else {
                btnStyle = 'bg-slate-950/40 border-white/5 text-slate-600';
              }
            }

            return (
              <button
                key={opt.id}
                disabled={hasAnswered}
                onClick={() => handleSelectOption(opt)}
                className={`p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between gap-3 ${btnStyle}`}
              >
                <span>{opt.text}</span>
                {hasAnswered && opt.isCorrect && (
                  <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                )}
                {hasAnswered && isSelected && !opt.isCorrect && (
                  <XCircle size={18} className="text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Explanation Feedback Box */}
        {hasAnswered && selectedOption && (
          <div className={`p-4 rounded-2xl border text-xs space-y-1.5 animate-fade-in ${
            selectedOption.isCorrect
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
          }`}>
            <div className="font-bold flex items-center gap-1.5 text-sm">
              {selectedOption.isCorrect ? '✨ Outstanding! Correct Solution' : '💡 Explanation & Concept Breakdown'}
            </div>
            <p className="leading-relaxed text-slate-200">{selectedOption.explanation}</p>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-cyan-400 hover:underline cursor-pointer flex items-center gap-1"
          >
            <HelpCircle size={14} />
            <span>{showHint ? `Hint: ${question.hint}` : 'Need a Hint?'}</span>
          </button>

          {hasAnswered && (
            <button
              onClick={handleNext}
              className="btn btn-primary text-xs px-6 py-2.5 font-bold cursor-pointer flex items-center gap-2 shadow-lg shadow-indigo-500/30"
            >
              <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Quiz Summary'}</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
