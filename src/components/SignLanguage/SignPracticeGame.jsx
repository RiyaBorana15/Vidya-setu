import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  Timer, 
  ArrowRight, 
  Hand,
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEffects } from '../../utils/soundEffects';

const CHALLENGES = [
  {
    id: 'c1',
    target: 'V',
    title: 'Peace / Letter V',
    hint: 'Extend index and middle fingers in a spread V, hold other fingers down.',
    emoji: '✌️',
    correctFingers: { thumb: false, index: true, middle: true, ring: false, pinky: false }
  },
  {
    id: 'c2',
    target: 'L',
    title: 'Letter L',
    hint: 'Extend index straight up and thumb horizontally to form a 90° right angle.',
    emoji: '👆',
    correctFingers: { thumb: true, index: true, middle: false, ring: false, pinky: false }
  },
  {
    id: 'c3',
    target: 'Hello',
    title: 'Open Palm / Hello',
    hint: 'Extend all 5 fingers straight and open towards the camera.',
    emoji: '✋',
    correctFingers: { thumb: true, index: true, middle: true, ring: true, pinky: true }
  },
  {
    id: 'c4',
    target: 'Y',
    title: 'Letter Y / Shaka',
    hint: 'Extend thumb and pinky outwards while keeping the middle 3 fingers curled.',
    emoji: '🤙',
    correctFingers: { thumb: true, index: false, middle: false, ring: false, pinky: true }
  },
  {
    id: 'c5',
    target: 'A',
    title: 'Letter A / Fist',
    hint: 'Close all 4 fingers into a fist with thumb straight alongside index.',
    emoji: '✊',
    correctFingers: { thumb: true, index: false, middle: false, ring: false, pinky: false }
  }
];

export default function SignPracticeGame() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  const challenge = CHALLENGES[currentIdx];

  // Timer countdown
  useEffect(() => {
    if (isGameFinished || isSuccess) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNext(false);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIdx, isGameFinished, isSuccess]);

  const handlePerformSign = (isCorrect) => {
    if (isCorrect) {
      soundEffects.playCorrect();
      setIsSuccess(true);
      setScore((prev) => prev + 100 + streak * 20);
      setStreak((prev) => prev + 1);

      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 }
      });

      setTimeout(() => {
        handleNext(true);
      }, 1200);
    } else {
      soundEffects.playWrong();
      setStreak(0);
    }
  };

  const handleNext = (advancedFromSuccess) => {
    setIsSuccess(false);
    setTimeLeft(15);

    if (currentIdx < CHALLENGES.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsGameFinished(true);
      soundEffects.playSuccess();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 }
      });
    }
  };

  const restartGame = () => {
    soundEffects.playClick();
    setCurrentIdx(0);
    setScore(0);
    setStreak(0);
    setIsSuccess(false);
    setIsGameFinished(false);
    setTimeLeft(15);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/25">
            <Trophy size={22} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white font-['Outfit'] flex items-center gap-2">
              Sign Language Speed Practice Arena
              <span className="badge badge-amber text-[10px]">Gamified AI</span>
            </h2>
            <p className="text-xs text-slate-400">
              Test your sign memory and hand reflexes. Match the target sign before the timer runs out!
            </p>
          </div>
        </div>

        {/* Stats HUD */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 text-xs">
            <Flame size={14} className="text-amber-400 fill-current animate-bounce" />
            <span className="text-slate-400">Streak:</span>
            <strong className="text-amber-300 font-extrabold">{streak}x</strong>
          </div>
          <div className="flex items-center gap-1.5 bg-indigo-600/20 px-3.5 py-1.5 rounded-xl border border-indigo-500/40 text-xs">
            <Sparkles size={14} className="text-cyan-400" />
            <span className="text-slate-300">XP Points:</span>
            <strong className="text-cyan-300 font-extrabold">{score}</strong>
          </div>
        </div>
      </div>

      {!isGameFinished ? (
        <div className="glass-panel p-6 sm:p-8 max-w-2xl mx-auto text-center space-y-6 border border-cyan-500/30">
          {/* Progress & Timer */}
          <div className="flex items-center justify-between text-xs pb-3 border-b border-white/10">
            <span className="text-slate-400">Challenge {currentIdx + 1} of {CHALLENGES.length}</span>
            <div className="flex items-center gap-1.5 text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-full">
              <Timer size={14} />
              <span>{timeLeft}s remaining</span>
            </div>
          </div>

          {/* Target Sign Display */}
          <div className="space-y-3">
            <div className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-tr from-slate-900 to-indigo-950 border-2 border-cyan-400 flex items-center justify-center text-6xl shadow-2xl shadow-cyan-500/20">
              {challenge.emoji}
            </div>
            <div>
              <span className="badge badge-indigo text-xs uppercase mb-1">Target Sign</span>
              <h3 className="text-3xl font-black text-white font-['Outfit']">{challenge.title}</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
                {challenge.hint}
              </p>
            </div>
          </div>

          {/* Simulation Action Controls */}
          <div className="pt-4 space-y-3">
            <div className="text-xs text-slate-400 font-semibold">Perform gesture or select match:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => handlePerformSign(true)}
                className={`btn btn-emerald text-xs py-3.5 cursor-pointer flex items-center justify-center gap-2 ${
                  isSuccess ? 'scale-105 shadow-emerald-500/40' : ''
                }`}
              >
                <CheckCircle2 size={16} />
                <span>Perform Gesture (Correct Match)</span>
              </button>

              <button
                onClick={() => handlePerformSign(false)}
                className="btn btn-secondary text-xs py-3.5 text-rose-400 border-rose-500/20 hover:bg-rose-500/10 cursor-pointer"
              >
                <span>Incorrect Handshape</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Game Over Screen */
        <div className="glass-panel p-8 max-w-xl mx-auto text-center space-y-6 border border-amber-400/40 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/30">
            <Award size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-white font-['Outfit']">Practice Arena Mastered!</h3>
            <p className="text-xs text-slate-300 mt-1">
              Outstanding sign recognition accuracy! Your gesture fluency is improving rapidly.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-around">
            <div>
              <div className="text-2xl font-black text-cyan-300">{score}</div>
              <div className="text-xs text-slate-400">Total XP Earned</div>
            </div>
            <div className="h-8 w-px bg-white/10"></div>
            <div>
              <div className="text-2xl font-black text-emerald-400">100%</div>
              <div className="text-xs text-slate-400">Accuracy Rate</div>
            </div>
          </div>

          <button
            onClick={restartGame}
            className="btn btn-primary text-xs px-6 py-3 cursor-pointer inline-flex items-center gap-2"
          >
            <RotateCcw size={14} /> Play Again
          </button>
        </div>
      )}
    </div>
  );
}
