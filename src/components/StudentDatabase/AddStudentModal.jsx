import React, { useState } from 'react';
import { 
  X, 
  UserPlus, 
  ShieldCheck, 
  CheckCircle2, 
  Plus 
} from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

export default function AddStudentModal({ onClose, onAddStudent }) {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('Class 9-A');
  const [age, setAge] = useState(14);
  const [gender, setGender] = useState('Male');
  const [disabilityType, setDisabilityType] = useState('Dyslexia (Surface Dyslexia)');
  const [accommodations, setAccommodations] = useState([
    'OpenDyslexic Font default',
    'Text-to-Speech Karaoke Readout'
  ]);
  const [notes, setNotes] = useState('New student enrolled under inclusive education quota.');

  const toggleAccommodation = (acc) => {
    soundEffects.playClick();
    if (accommodations.includes(acc)) {
      setAccommodations(accommodations.filter(a => a !== acc));
    } else {
      setAccommodations([...accommodations, acc]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    soundEffects.playSuccess();
    const newStudent = {
      id: `STU-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      grade,
      age: Number(age),
      gender,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      disabilityType,
      riskLevel: 'Moderate Support',
      iepStatus: 'Active IEP v1.0',
      attendance: '100%',
      quizAverage: 85,
      flashcardMastery: '80%',
      accommodations,
      screeningResults: {
        phonologicalAwareness: 75,
        rapidNaming: 72,
        visualOrientation: 70,
        readingFluencyWPM: 90,
        lastScreened: new Date().toISOString().slice(0, 10)
      },
      notes
    };

    onAddStudent(newStudent);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden my-6">
        <div className="bg-gradient-to-r from-cyan-950 to-slate-900 p-6 border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 flex items-center justify-center">
              <UserPlus size={20} />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white font-['Outfit']">Enroll New Inclusive Learner</h3>
              <p className="text-xs text-slate-400">Generate IEP Profile & Accommodations</p>
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

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs max-h-[70vh] overflow-y-auto">
          <div>
            <label className="font-bold text-slate-300 uppercase tracking-wider mb-1.5 block">Student Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Samarth Sharma"
              className="w-full p-3 rounded-xl bg-slate-950/80 border border-white/15 text-white focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-slate-300 uppercase tracking-wider mb-1.5 block">Class / Grade</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950/80 border border-white/15 text-white focus:border-cyan-400 focus:outline-none cursor-pointer"
              >
                <option>Class 8-A</option>
                <option>Class 9-A</option>
                <option>Class 10-B</option>
                <option>Class 11-Science</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-300 uppercase tracking-wider mb-1.5 block">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950/80 border border-white/15 text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-300 uppercase tracking-wider mb-1.5 block">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950/80 border border-white/15 text-white focus:border-cyan-400 focus:outline-none cursor-pointer"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Non-Binary</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-300 uppercase tracking-wider mb-1.5 block">Disability Classification</label>
            <select
              value={disabilityType}
              onChange={(e) => setDisabilityType(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950/80 border border-white/15 text-white focus:border-cyan-400 focus:outline-none cursor-pointer"
            >
              <option>Dyslexia (Surface Dyslexia)</option>
              <option>Deaf / Hard-of-Hearing (ISL)</option>
              <option>Dyscalculia & ADHD</option>
              <option>Dysgraphia</option>
              <option>Visual Sensitivity (Irlen)</option>
              <option>Neurotypical / Peer Mentor</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-300 uppercase tracking-wider mb-2 block">IEP Accommodations Needed</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                'OpenDyslexic Font default',
                'Text-to-Speech Karaoke Readout',
                'Live Sign Language Interpreter PIP',
                '25% Extra Time on Quizzes',
                'Color Overlay: Warm Peach',
                'Reading Ruler Line Mask'
              ].map((acc) => {
                const checked = accommodations.includes(acc);
                return (
                  <button
                    type="button"
                    key={acc}
                    onClick={() => toggleAccommodation(acc)}
                    className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                      checked
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                        : 'bg-white/5 border-white/10 text-slate-400'
                    }`}
                  >
                    <CheckCircle2 size={14} className={checked ? 'text-cyan-400' : 'text-slate-600'} />
                    <span className="truncate">{acc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-300 uppercase tracking-wider mb-1.5 block">Educator Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950/80 border border-white/15 text-slate-200 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary text-xs px-4 py-2 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-emerald text-xs px-5 py-2 font-bold cursor-pointer"
            >
              Save & Register Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
