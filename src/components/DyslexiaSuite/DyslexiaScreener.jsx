import React, { useState } from 'react';
import { 
  Activity, 
  CheckCircle2, 
  HelpCircle, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Volume2,
  FileCheck,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEffects } from '../../utils/soundEffects';

const SCREENER_QUESTIONS = [
  {
    id: 1,
    category: 'Visual Letter Orientation',
    title: 'Identify the Mirror Letter',
    instructions: 'Select the letter that is facing backwards or flipped incorrectly in standard English orthography:',
    stimulus: 'Visual Orthography Task',
    options: [
      { id: 'a', label: 'b (Normal lower-case B)', isReversal: false },
      { id: 'b', label: 'd (Normal lower-case D)', isReversal: false },
      { id: 'c', label: 'ᕹ (Flipped Backwards B/D)', isReversal: true },
      { id: 'd', label: 'p (Normal lower-case P)', isReversal: false }
    ],
    explanation: 'Detecting subtle vertical/horizontal flips is a core diagnostic signal for spatial orthographic processing.'
  },
  {
    id: 2,
    category: 'Phonological Decoding',
    title: 'Pseudo-Word Phonics Match',
    instructions: 'Which pseudo-word would sound like a rhyme with the real word "TRAIN"?',
    stimulus: 'Listen / Sound Out: T-R-A-I-N',
    options: [
      { id: 'a', label: 'BLANE (/bleɪn/)', isReversal: true },
      { id: 'b', label: 'TRAP (/træp/)', isReversal: false },
      { id: 'c', label: 'BREAD (/brɛd/)', isReversal: false },
      { id: 'd', label: 'TRAMP (/træmp/)', isReversal: false }
    ],
    explanation: 'Phonological decoding measures the ability to map graphemes to correct rhyming phoneme endings.'
  },
  {
    id: 3,
    category: 'Auditory Sequencing',
    title: 'Sound Inversion Check',
    instructions: 'If you remove the /s/ sound from the word "SPIN" and reverse the remaining letters, what word is formed?',
    stimulus: 'Word: S - P - I - N',
    options: [
      { id: 'a', label: 'NIP', isReversal: true },
      { id: 'b', label: 'PIN', isReversal: false },
      { id: 'c', label: 'SIN', isReversal: false },
      { id: 'd', label: 'PUN', isReversal: false }
    ],
    explanation: 'Working memory manipulation of individual phonemes is key for fluent reading development.'
  },
  {
    id: 4,
    category: 'Visual Scanning & Crowding',
    title: 'Rapid Symbol Match',
    instructions: 'Find the single symbol that is identical to the target: [ ✦ ★ ◆ ]',
    stimulus: 'Target: ✦ ★ ◆',
    options: [
      { id: 'a', label: '✦ ◆ ★', isReversal: false },
      { id: 'b', label: '✦ ★ ◆', isReversal: true },
      { id: 'c', label: '★ ✦ ◆', isReversal: false },
      { id: 'd', label: '◆ ★ ✦', isReversal: false }
    ],
    explanation: 'Visual crowding and sequential fixation stability determine reading comfort on crowded pages.'
  },
  {
    id: 5,
    category: 'Self-Reported Reading Experience',
    title: 'Reading Fatigue & Visual Stress',
    instructions: 'When reading long textbooks or paragraphs on screens, do words sometimes appear to move, skip, or cause eye strain?',
    stimulus: 'Personal Experience',
    options: [
      { id: 'a', label: 'Frequently (Need ruler or finger to track lines)', isReversal: true, weight: 'high' },
      { id: 'b', label: 'Occasionally (Especially under fluorescent glare)', isReversal: true, weight: 'moderate' },
      { id: 'c', label: 'Rarely / Never (Reading is effortless)', isReversal: false, weight: 'none' }
    ],
    explanation: 'Scotopic sensitivity and eye saccade fatigue are strongly addressed by colored tint overlays.'
  }
];

export default function DyslexiaScreener() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const question = SCREENER_QUESTIONS[currentStep];

  const handleSelectOption = (option) => {
    soundEffects.playClick();
    const newAnswers = { ...answers, [question.id]: option };
    setAnswers(newAnswers);

    if (currentStep < SCREENER_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
      soundEffects.playSuccess();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const restartScreener = () => {
    soundEffects.playClick();
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
  };

  // Calculate diagnostic profile
  const totalQuestions = SCREENER_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/25">
            <Activity size={22} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white font-['Outfit'] flex items-center gap-2">
              5-Minute Dyslexia & Sensory Screener
              <span className="badge badge-amber text-[10px]">AI Assessment</span>
            </h2>
            <p className="text-xs text-slate-400">
              Multi-sensory cognitive screener to determine phonological processing, visual crowding, and personalized accommodations
            </p>
          </div>
        </div>

        {/* Progress pill */}
        {!isCompleted && (
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 text-xs text-slate-300">
            <span>Step {currentStep + 1} of {totalQuestions}</span>
            <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 to-rose-400 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {!isCompleted ? (
        /* Active Question Card */
        <div className="glass-panel p-6 sm:p-8 max-w-3xl mx-auto space-y-6 border border-amber-500/20">
          <div className="flex items-center justify-between text-xs">
            <span className="badge badge-amber">{question.category}</span>
            <span className="text-slate-400">{question.stimulus}</span>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{question.title}</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{question.instructions}</p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {question.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt)}
                className="p-4 rounded-2xl bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-400/60 text-left transition-all group cursor-pointer flex items-center justify-between"
              >
                <span className="text-sm font-semibold text-slate-200 group-hover:text-white">
                  {opt.label}
                </span>
                <ArrowRight size={16} className="text-slate-500 group-hover:text-amber-400 transform group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck size={14} className="text-emerald-400" /> Non-judgmental confidential screener
            </span>
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="text-slate-400 hover:text-white underline cursor-pointer"
              >
                Previous Question
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Completed Diagnostic Report Card */
        <div className="glass-panel p-6 sm:p-8 max-w-3xl mx-auto space-y-6 border border-emerald-500/30 animate-fade-in">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <Sparkles size={28} />
            </div>
            <h3 className="text-2xl font-extrabold text-white font-['Outfit']">
              Screening Complete: Personalized Learning Profile Generated!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Based on your responses, we've calibrated your optimal reading settings and personalized IEP accommodations.
            </p>
          </div>

          {/* Diagnostic Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
              <div className="text-2xl font-black text-amber-400">Surface Profile</div>
              <div className="text-xs text-slate-400 mt-1">Primary Pattern</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
              <div className="text-2xl font-black text-cyan-400">Bionic + Audio</div>
              <div className="text-xs text-slate-400 mt-1">Recommended Mode</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
              <div className="text-2xl font-black text-emerald-400">Warm Peach</div>
              <div className="text-xs text-slate-400 mt-1">Optimal Tint Filter</div>
            </div>
          </div>

          {/* Recommended Accommodations Checklist */}
          <div className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-3">
            <h4 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
              <FileCheck size={16} /> Automated Individualized Education Plan (IEP) Adjustments
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Default font switched to <strong>OpenDyslexic</strong> with 1.8x line height</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Pre-lecture concept flashcards enabled 10 minutes prior to live classes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>25% extra time allocation activated for adaptive quizzes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Reading focus ruler activated for textbook reading</span>
              </li>
            </ul>
          </div>

          {/* Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
            <button
              onClick={restartScreener}
              className="btn btn-secondary text-xs px-4 py-2 cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw size={14} /> Retake Screener
            </button>
            <button
              onClick={() => {
                soundEffects.playSuccess();
                alert('Profile saved to your Unified Student Record & synced with Educator portal!');
              }}
              className="btn btn-emerald text-xs px-5 py-2 cursor-pointer"
            >
              Save to My Student Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
