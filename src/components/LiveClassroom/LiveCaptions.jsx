import React from 'react';
import { Sparkles, Eye, Volume2 } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

export default function LiveCaptions({ captionText, isDyslexicFont, toggleDyslexicFont }) {
  if (!captionText) return null;

  return (
    <div className="absolute bottom-16 inset-x-4 z-30 flex justify-center pointer-events-auto">
      <div className="bg-black/90 backdrop-blur-md border border-amber-400/60 rounded-2xl px-5 py-3 shadow-2xl max-w-2xl text-center space-y-1.5 animate-fade-in">
        <div className="flex items-center justify-between gap-4 text-[10px] text-amber-300 font-bold uppercase tracking-wider pb-1 border-b border-white/10">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Live AI Speech-to-Text Subtitles
          </span>

          <button
            onClick={() => {
              soundEffects.playClick();
              toggleDyslexicFont();
            }}
            className="hover:text-white underline cursor-pointer flex items-center gap-1"
          >
            <Eye size={11} />
            <span>Font: {isDyslexicFont ? 'OpenDyslexic' : 'Standard'}</span>
          </button>
        </div>

        <p className={`text-sm sm:text-base font-extrabold text-yellow-300 leading-snug tracking-wide ${
          isDyslexicFont ? 'font-[\'OpenDyslexic\',sans-serif]' : ''
        }`}>
          "{captionText}"
        </p>
      </div>
    </div>
  );
}
