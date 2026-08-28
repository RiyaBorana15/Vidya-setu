import React, { useState } from 'react';
import { 
  Video, 
  PenTool, 
  Layers, 
  Sparkles, 
  BookOpen, 
  HelpCircle 
} from 'lucide-react';
import VideoRoom from './VideoRoom';
import InteractiveWhiteboard from './InteractiveWhiteboard';
import { soundEffects } from '../../utils/soundEffects';

export default function LiveClassroomHub({ dyslexicFont, setDyslexicFont, onOpenFlashcards }) {
  const [viewMode, setViewMode] = useState('video'); // 'video' or 'whiteboard'

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25">
            <Video size={22} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white font-['Outfit'] flex items-center gap-2">
              Virtual Inclusive Classroom & Smart Whiteboard
              <span className="badge badge-cyan text-[10px]">Real-Time STT + PIP Sign</span>
            </h2>
            <p className="text-xs text-slate-400">
              Live multi-sensory teaching environment with auto-captions, sign interpreter window, and collaborative canvas
            </p>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-white/10 text-xs">
            <button
              onClick={() => {
                soundEffects.playClick();
                setViewMode('video');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                viewMode === 'video' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Video size={14} />
              <span>Live Video & PIP</span>
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                setViewMode('whiteboard');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                viewMode === 'whiteboard' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <PenTool size={14} />
              <span>Smart Whiteboard</span>
            </button>
          </div>

          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenFlashcards();
            }}
            className="btn btn-amber text-xs px-3.5 py-2 cursor-pointer flex items-center gap-1.5 shadow-md"
            title="Open Pre/Post Flashcards Deck"
          >
            <Layers size={14} />
            <span className="hidden sm:inline">Review Flashcards</span>
          </button>
        </div>
      </div>

      {/* Main Content Component */}
      {viewMode === 'video' ? (
        <VideoRoom
          dyslexicFont={dyslexicFont}
          setDyslexicFont={setDyslexicFont}
          onOpenFlashcards={onOpenFlashcards}
        />
      ) : (
        <InteractiveWhiteboard />
      )}
    </div>
  );
}
