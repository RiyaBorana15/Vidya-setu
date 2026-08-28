import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Monitor, 
  Hand, 
  MessageSquare, 
  Users, 
  Sparkles, 
  Volume2, 
  Eye, 
  CheckCircle2, 
  Send,
  HelpCircle,
  Maximize2,
  Smile,
  Heart
} from 'lucide-react';
import LiveCaptions from './LiveCaptions';
import { soundEffects } from '../../utils/soundEffects';

const MOCK_TRANSCRIPT_STREAM = [
  "Welcome everyone to today's inclusive science lecture on Plant Biology and Photosynthesis.",
  "Notice on your screens how chlorophyll absorbs red and blue light wavelengths.",
  "Water is pulled all the way from root hairs upward through xylem vessels.",
  "Let's look at the chemical equation: Carbon Dioxide plus Water yields Glucose and Oxygen.",
  "Students with visual adjustments, remember you can toggle the high-contrast captions anytime.",
  "Riya, our Sign Language Interpreter is pinning the gesture for 'Transpiration Pull' now.",
  "Let's launch a quick 30-second concept poll to check our understanding!"
];

export default function VideoRoom({ dyslexicFont, setDyslexicFont, onOpenFlashcards }) {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [showSignPIP, setShowSignPIP] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [currentCaptionIdx, setCurrentCaptionIdx] = useState(0);
  const [activePoll, setActivePoll] = useState(null);
  const [selectedPollOption, setSelectedPollOption] = useState(null);
  const [floatingReaction, setFloatingReaction] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Dr. Ananya Sen (Teacher)', text: 'Welcome students! Pre-lecture flashcards have been loaded in your dashboard.', isTeacher: true },
    { sender: 'Riya Mukherjee (Sign Student)', text: 'Interpreter PIP is clear and subtitles are working nicely!', isTeacher: false },
    { sender: 'Aarav Patel (You)', text: 'Enabled OpenDyslexic font mode for the slide captions.', isTeacher: false }
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Cycle real-time live captions
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCaptionIdx((prev) => (prev + 1) % MOCK_TRANSCRIPT_STREAM.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleToggleHandRaise = () => {
    soundEffects.playClick();
    setIsHandRaised(!isHandRaised);
    if (!isHandRaised) {
      soundEffects.playSuccess();
    }
  };

  const handleTriggerReaction = (emoji) => {
    soundEffects.playClick();
    setFloatingReaction(emoji);
    setTimeout(() => setFloatingReaction(null), 2000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    soundEffects.playClick();
    setChatMessages([
      ...chatMessages,
      { sender: 'Aarav Patel (You)', text: newMessage, isTeacher: false }
    ]);
    setNewMessage('');
  };

  const handleLaunchPoll = () => {
    soundEffects.playClick();
    setActivePoll({
      question: 'Which gas is released into the air as a byproduct of water splitting in photosynthesis?',
      options: ['Oxygen (O₂)', 'Carbon Dioxide (CO₂)', 'Nitrogen (N₂)', 'Methane (CH₄)'],
      correctIdx: 0
    });
    setSelectedPollOption(null);
  };

  const handleAnswerPoll = (idx) => {
    soundEffects.playClick();
    setSelectedPollOption(idx);
    if (idx === activePoll.correctIdx) {
      soundEffects.playCorrect();
    } else {
      soundEffects.playWrong();
    }
  };

  return (
    <div className="space-y-4">
      {/* Video Stream Main Frame */}
      <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-slate-950 border-2 border-indigo-500/40 shadow-2xl flex flex-col justify-between p-4 sm:p-6 group">
        {/* Presenter Feed / Slide Presentation */}
        <div className="absolute inset-0 z-0">
          {!isScreenSharing ? (
            <div className="w-full h-full relative">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200"
                alt="Teacher Dr. Ananya Sen"
                className="w-full h-full object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/50"></div>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <span className="badge-pro bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-xs">
                Presenting Live Slides
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-['Outfit']">
                🌱 Photosynthesis & Cellular Energy Transfer
              </h2>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-lg font-mono text-cyan-300 text-sm shadow-xl">
                6CO₂ + 6H₂O + Sunlight ➔ C₆H₁₂O₆ (Glucose) + 6O₂ (Oxygen)
              </div>
            </div>
          )}
        </div>

        {/* Top Floating Info Ribbon */}
        <div className="relative z-10 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 bg-black/70 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/15 text-xs shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
            <span className="font-black text-white">LIVE CLASS</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-200 font-bold">Science 9-A: Plant Biology</span>
            <span className="badge-pro bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[9px]">
              Dr. Ananya Sen
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isHandRaised && (
              <div className="flex items-center gap-1.5 bg-amber-400 text-black px-3.5 py-1 rounded-full text-xs font-black animate-bounce shadow-xl">
                <Hand size={14} /> Hand Raised (#1)
              </div>
            )}
            <button
              onClick={() => setShowSignPIP(!showSignPIP)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black border transition-all cursor-pointer shadow-md ${
                showSignPIP ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300' : 'bg-black/70 border-white/10 text-slate-400'
              }`}
            >
              🤟 Sign PIP: {showSignPIP ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Floating Emoji Reactions Layer */}
        {floatingReaction && (
          <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center animate-bounce text-6xl">
            {floatingReaction}
          </div>
        )}

        {/* Sign Language PIP Interpreter Window */}
        {showSignPIP && (
          <div className="absolute top-16 right-4 sm:right-6 z-20 w-36 sm:w-52 aspect-video rounded-2xl overflow-hidden bg-slate-900 border-2 border-cyan-400 shadow-2xl flex flex-col justify-between p-2 animate-fade-in group">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
              alt="ISL Interpreter"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-10 flex items-center justify-between">
              <span className="badge-pro bg-cyan-500/25 text-cyan-300 border border-cyan-400/40 text-[8px]">
                ISL Interpreter
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <div className="relative z-10 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[9px] text-white font-bold truncate">
              Rajesh Varma (ISL Specialist)
            </div>
          </div>
        )}

        {/* Live Subtitles Caption Bar */}
        <LiveCaptions
          captionText={MOCK_TRANSCRIPT_STREAM[currentCaptionIdx]}
          isDyslexicFont={dyslexicFont}
          toggleDyslexicFont={() => setDyslexicFont(!dyslexicFont)}
        />

        {/* Bottom Student Thumbnail Grid & Controls */}
        <div className="relative z-10 flex items-end justify-between gap-4">
          {/* Peer Student Video Tiles */}
          <div className="hidden sm:flex items-center gap-2">
            {[
              { name: 'Riya (Deaf/ISL)', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150' },
              { name: 'Kabir (ADHD)', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150' },
              { name: 'Aarav (You)', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150' }
            ].map((peer, idx) => (
              <div key={idx} className="w-20 h-16 rounded-2xl overflow-hidden relative border border-white/20 bg-slate-900 shadow-lg">
                <img src={peer.img} alt={peer.name} className="w-full h-full object-cover" />
                <span className="absolute bottom-0 inset-x-0 bg-black/75 text-[8px] text-white text-center truncate px-1 font-bold">
                  {peer.name}
                </span>
              </div>
            ))}
          </div>

          {/* Emoji Reactions Bar */}
          <div className="hidden md:flex items-center gap-1.5 bg-black/60 backdrop-blur-xl px-3 py-1.5 rounded-2xl border border-white/10">
            {['👏', '💡', '❤️', '🔥', '🙋'].map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleTriggerReaction(emoji)}
                className="hover:scale-125 transition-transform text-sm cursor-pointer p-1"
                title={`Send ${emoji} reaction`}
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Master Toolbar */}
          <div className="flex items-center gap-2 bg-slate-900/95 backdrop-blur-2xl px-4 py-2.5 rounded-2xl border border-white/15 shadow-2xl mx-auto sm:mx-0">
            <button
              onClick={() => {
                soundEffects.playClick();
                setIsMicOn(!isMicOn);
              }}
              className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                isMicOn ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
              }`}
              title="Toggle Mic"
            >
              {isMicOn ? <Mic size={16} /> : <MicOff size={16} />}
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                setIsVideoOn(!isVideoOn);
              }}
              className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                isVideoOn ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
              }`}
              title="Toggle Video"
            >
              {isVideoOn ? <Video size={16} /> : <VideoOff size={16} />}
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                setIsScreenSharing(!isScreenSharing);
              }}
              className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                isScreenSharing ? 'bg-cyan-500 text-black font-black shadow-lg shadow-cyan-500/30' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              title="Toggle Screen Share"
            >
              <Monitor size={16} />
            </button>

            <button
              onClick={handleToggleHandRaise}
              className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                isHandRaised ? 'bg-amber-400 text-black font-black shadow-lg shadow-amber-500/30' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              title="Raise / Lower Hand"
            >
              <Hand size={16} />
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                setShowChat(!showChat);
              }}
              className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                showChat ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              title="Classroom Chat"
            >
              <MessageSquare size={16} />
            </button>

            <button
              onClick={handleLaunchPoll}
              className="p-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 cursor-pointer shadow-md"
              title="Launch In-Class Concept Poll"
            >
              <HelpCircle size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* In-Lecture Concept Poll Box */}
      {activePoll && (
        <div className="pro-card p-6 border-2 border-amber-400/60 space-y-4 bg-slate-900/95 animate-fade-in shadow-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="badge-pro bg-amber-500/20 text-amber-300 border border-amber-400/50 text-xs font-black">
              ⚡ Live Concept Check Poll
            </span>
            <button
              onClick={() => setActivePoll(null)}
              className="text-xs text-slate-400 hover:text-white cursor-pointer font-extrabold"
            >
              ✕ Dismiss
            </button>
          </div>
          <h4 className="text-base sm:text-lg font-black text-white font-['Outfit']">{activePoll.question}</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activePoll.options.map((opt, i) => {
              const isSelected = selectedPollOption === i;
              const isCorrect = i === activePoll.correctIdx;
              return (
                <button
                  key={i}
                  onClick={() => handleAnswerPoll(i)}
                  className={`p-4 rounded-2xl border text-left text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? isCorrect
                        ? 'bg-emerald-500/25 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-500/20'
                        : 'bg-rose-500/25 border-rose-400 text-rose-300'
                      : 'bg-white/[0.04] border-white/10 text-slate-200 hover:bg-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt}</span>
                    {isSelected && isCorrect && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
                  </div>
                  {isSelected && (
                    <span className="block text-[10px] mt-1 font-semibold">
                      {isCorrect ? '✨ Correct answer confirmed by Instructor' : '❌ Re-check formula'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* In-Meeting Chat Drawer */}
      {showChat && (
        <div className="pro-card p-5 space-y-4 border border-indigo-500/40 bg-slate-900/95 animate-fade-in shadow-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare size={14} className="text-cyan-400" /> Inclusive Classroom Chat
            </h4>
            <button onClick={() => setShowChat(false)} className="text-slate-400 hover:text-white text-xs cursor-pointer font-bold">
              ✕
            </button>
          </div>

          <div className="max-h-52 overflow-y-auto space-y-2.5 text-xs pr-1">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`p-3 rounded-2xl border ${msg.isTeacher ? 'bg-indigo-950/50 border-indigo-500/40' : 'bg-white/[0.04] border-white/5'}`}>
                <div className="font-extrabold text-cyan-300 mb-0.5">{msg.sender}</div>
                <div className="text-slate-200 leading-relaxed">{msg.text}</div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ask teacher or classmate..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/15 text-xs text-white focus:border-cyan-400 focus:outline-none"
            />
            <button type="submit" className="btn-pro btn-gradient-indigo text-xs px-5 py-2.5 cursor-pointer">
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
