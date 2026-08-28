import React, { useEffect } from 'react';
import { 
  Trophy, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Layers, 
  ArrowRight,
  Zap,
  Target
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEffects } from '../../utils/soundEffects';

export default function QuizResults({ results, onRestartQuiz, onOpenReviewDeck }) {
  useEffect(() => {
    soundEffects.playSuccess();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });
  }, []);

  const { score, totalQuestions, xpEarned, userAnswers, questions } = results;
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="glass-panel p-6 sm:p-8 max-w-3xl mx-auto space-y-6 border border-emerald-500/40 bg-slate-900/90 rounded-3xl shadow-2xl animate-fade-in">
      {/* Top Banner */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center text-slate-950 mx-auto shadow-xl shadow-amber-500/30">
          <Trophy size={34} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
          Quiz Completed with Distinction!
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
          Multi-sensory retention analysis complete. Your knowledge score and XP rewards have been saved to your student database.
        </p>
      </div>

      {/* Highlights Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
          <div className="text-3xl font-black text-emerald-400">{score} / {totalQuestions}</div>
          <div className="text-xs text-slate-400 mt-1 font-semibold">Correct Answers ({percentage}%)</div>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
          <div className="text-3xl font-black text-cyan-300">+{xpEarned}</div>
          <div className="text-xs text-slate-400 mt-1 font-semibold">XP Points Earned</div>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
          <div className="text-3xl font-black text-amber-400">Level 4</div>
          <div className="text-xs text-slate-400 mt-1 font-semibold">Mastery Rank</div>
        </div>
      </div>

      {/* Questions Breakdown Review */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <Target size={14} className="text-indigo-400" /> Answer Review & Explanations:
        </h4>

        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
          {questions.map((q, idx) => {
            const userChoice = userAnswers[q.id];
            const isCorrect = userChoice && userChoice.isCorrect;
            const correctOpt = q.options.find(o => o.isCorrect);

            return (
              <div
                key={q.id}
                className={`p-4 rounded-2xl border text-xs space-y-2 ${
                  isCorrect
                    ? 'bg-emerald-950/20 border-emerald-500/30'
                    : 'bg-rose-950/20 border-rose-500/30'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-white">Q{idx + 1}: {q.question}</span>
                  {isCorrect ? (
                    <span className="badge badge-emerald text-[9px] shrink-0">Correct (+100 XP)</span>
                  ) : (
                    <span className="badge badge-rose text-[9px] shrink-0">Incorrect</span>
                  )}
                </div>

                <div className="text-slate-300">
                  Your Answer: <strong className={isCorrect ? 'text-emerald-300' : 'text-rose-300'}>{userChoice ? userChoice.text : 'Not Answered'}</strong>
                </div>

                {!isCorrect && (
                  <div className="text-slate-300">
                    Correct Solution: <strong className="text-emerald-400">{correctOpt ? correctOpt.text : ''}</strong>
                  </div>
                )}

                <div className="p-2 rounded-xl bg-black/40 text-slate-400 text-[11px] leading-relaxed">
                  💡 {userChoice ? userChoice.explanation : correctOpt.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended Post-Lecture Flashcards Callout */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center shrink-0">
            <Layers size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Post-Lecture Spaced Repetition Ready</h4>
            <p className="text-xs text-slate-300">
              Reinforce high-yield formulas and concepts with the post-lecture deck to secure 100% long-term recall.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            soundEffects.playClick();
            onOpenReviewDeck();
          }}
          className="btn btn-emerald text-xs px-4 py-2 whitespace-nowrap cursor-pointer flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
        >
          <span>Open Post-Deck</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-white/10">
        <button
          onClick={() => {
            soundEffects.playClick();
            onRestartQuiz();
          }}
          className="btn btn-secondary text-xs px-4 py-2 cursor-pointer flex items-center gap-1.5"
        >
          <RotateCcw size={14} /> Retake Quiz
        </button>

        <span className="text-xs text-slate-400 font-semibold">
          Saved to Unified Students Database
        </span>
      </div>
    </div>
  );
}
