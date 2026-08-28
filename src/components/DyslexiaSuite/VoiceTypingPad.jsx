import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Copy, 
  Check, 
  RotateCcw, 
  Sparkles, 
  Download,
  SpellCheck,
  FileEdit
} from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

export default function VoiceTypingPad({ dyslexicFont }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState(
    `Welcome to the Inclusive Voice Dictation Pad. Students with dysgraphia, motor difficulties, or dyslexia can speak freely into their microphone to convert spoken thoughts directly into clear written text.`
  );
  const [interimText, setInterimText] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-IN'; // Indian English / Global English standard

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        let interim = '';
        let finalStr = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const trans = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalStr += trans + ' ';
          } else {
            interim += trans;
          }
        }

        if (finalStr) {
          setTranscript((prev) => prev + (prev.endsWith(' ') || prev === '' ? '' : ' ') + finalStr);
        }
        setInterimText(interim);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        setInterimText('');
      };

      recognitionRef.current = recognition;
    } else {
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    soundEffects.playClick();
    if (!isSupported) {
      alert('Speech recognition is not supported on this browser (Try Chrome, Edge, or Safari).');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleCopy = () => {
    soundEffects.playClick();
    navigator.clipboard.writeText(transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    soundEffects.playClick();
    const element = document.createElement('a');
    const file = new Blob([transcript], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `voice-notes-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const clearText = () => {
    soundEffects.playClick();
    setTranscript('');
    setInterimText('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25">
            <Mic size={22} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white font-['Outfit'] flex items-center gap-2">
              Voice-to-Text Dictation & Dysgraphia Pad
              <span className="badge badge-cyan text-[10px]">Real-Time STT</span>
            </h2>
            <p className="text-xs text-slate-400">
              Speak answers naturally without writing fatigue. Real-time punctuation and phonetic formatting.
            </p>
          </div>
        </div>

        {/* Master Mic Button */}
        <button
          onClick={toggleListening}
          className={`btn text-xs sm:text-sm px-5 py-2.5 rounded-xl font-extrabold cursor-pointer transition-all ${
            isListening
              ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/40 animate-pulse'
              : 'btn-emerald shadow-lg shadow-emerald-500/30'
          }`}
        >
          {isListening ? <MicOff size={16} /> : <Mic size={16} />}
          <span>{isListening ? 'Stop Recording' : 'Start Voice Typing'}</span>
        </button>
      </div>

      {/* Dictation Box */}
      <div className="glass-panel p-6 sm:p-8 space-y-4 border border-cyan-500/20">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${isListening ? 'bg-rose-500 animate-ping' : 'bg-slate-600'}`}></span>
            <span className="text-xs font-semibold text-slate-300">
              {isListening ? 'Listening to speech... Speak clearly' : 'Microphone Ready'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="btn btn-secondary text-xs px-3 py-1.5 cursor-pointer"
              title="Copy to clipboard"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="btn btn-secondary text-xs px-3 py-1.5 cursor-pointer"
              title="Download text"
            >
              <Download size={14} />
              <span>Save</span>
            </button>
            <button
              onClick={clearText}
              className="btn btn-secondary text-xs px-3 py-1.5 text-rose-400 cursor-pointer"
              title="Clear Pad"
            >
              <RotateCcw size={14} />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Text Area */}
        <div className="min-h-[260px] p-4 rounded-xl bg-slate-950/60 border border-white/10 text-slate-200 text-base leading-relaxed relative focus-within:border-cyan-400">
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Your spoken words will appear here in real-time..."
            className="w-full h-[220px] bg-transparent outline-none resize-y text-slate-200"
          />
          {interimText && (
            <span className="text-cyan-400 italic"> {interimText}...</span>
          )}
        </div>

        {/* Hints */}
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <SpellCheck size={14} className="text-cyan-400" /> Voice Commands Supported: "Period", "Comma", "New Line", "Question Mark"
          </span>
          <span>{transcript.split(/\s+/).filter(Boolean).length} Words</span>
        </div>
      </div>
    </div>
  );
}
