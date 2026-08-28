import React, { useState } from 'react';
import { 
  BookOpen, 
  Activity, 
  Mic, 
  Sparkles, 
  Eye, 
  Sliders,
  CheckCircle2,
  FileText
} from 'lucide-react';
import BionicReader from './BionicReader';
import DyslexiaScreener from './DyslexiaScreener';
import VoiceTypingPad from './VoiceTypingPad';
import { soundEffects } from '../../utils/soundEffects';

export default function DyslexiaSuite({ speechRate, setSpeechRate, dyslexicFont, setDyslexicFont }) {
  const [subTab, setSubTab] = useState('bionic');

  const tabs = [
    { id: 'bionic', label: 'Bionic Reader & Audio Karaoke', icon: BookOpen, tag: 'High Yield' },
    { id: 'screener', label: '5-Min Diagnostic Screener', icon: Activity, tag: 'Assessment' },
    { id: 'dictation', label: 'Voice Dictation Pad', icon: Mic, tag: 'Dysgraphia' }
  ];

  return (
    <div className="space-y-6">
      {/* Sub Navigation Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-white/10">
        <div className="flex items-center gap-2 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = subTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundEffects.playClick();
                  setSubTab(tab.id);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${isActive ? 'bg-black/30 text-cyan-200' : 'bg-slate-800 text-slate-400'}`}>
                  {tab.tag}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Phonological Multi-Sensory Engine Active</span>
        </div>
      </div>

      {/* Active Sub-tab Content */}
      {subTab === 'bionic' && (
        <BionicReader 
          speechRate={speechRate} 
          setSpeechRate={setSpeechRate} 
          dyslexicFont={dyslexicFont} 
          setDyslexicFont={setDyslexicFont} 
        />
      )}

      {subTab === 'screener' && <DyslexiaScreener />}

      {subTab === 'dictation' && <VoiceTypingPad dyslexicFont={dyslexicFont} />}
    </div>
  );
}
