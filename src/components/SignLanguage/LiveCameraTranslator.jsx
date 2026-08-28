import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Camera,
  CameraOff,
  Hand,
  Sparkles,
  Volume2,
  RotateCcw,
  Delete,
  ArrowRightLeft,
  Copy,
  Check,
  Zap,
  ShieldAlert,
  Activity,
  ChevronRight,
  Mic,
  BookOpen
} from 'lucide-react';
import { classifyHandGesture } from '../../utils/signClassifier';
import { soundEffects } from '../../utils/soundEffects';

// ─── MediaPipe CDN loader ────────────────────────────────────────────────────
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement('script');
    s.src = src;
    s.crossOrigin = 'anonymous';
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

// ─── ISL Alphabet quick-reference legend ────────────────────────────────────
const ISL_LEGEND = [
  { char: 'A', emoji: '✊', hint: 'Fist, thumb side' },
  { char: 'B', emoji: '🤚', hint: '4 fingers up, thumb in' },
  { char: 'C', emoji: '🤏', hint: 'Curved C shape' },
  { char: 'D', emoji: '☝️', hint: 'Index up, pointing' },
  { char: 'E', emoji: '✊', hint: 'Fist, all curled' },
  { char: 'F', emoji: '👌', hint: 'OK / thumb-index pinch' },
  { char: 'Hello', emoji: '✋', hint: 'Full open palm' },
  { char: 'I', emoji: '🤙', hint: 'Pinky up alone' },
  { char: 'K', emoji: '✌️', hint: 'V + thumb touching middle' },
  { char: 'L', emoji: '👆', hint: 'Index up + thumb out' },
  { char: 'O', emoji: '👌', hint: 'Thumb-index circle' },
  { char: 'R', emoji: '🤞', hint: 'Index + middle close' },
  { char: 'S', emoji: '✊', hint: 'Fist, thumb wrapped' },
  { char: 'U', emoji: '🤞', hint: 'Index + middle together' },
  { char: 'V', emoji: '✌️', hint: 'Peace sign, spread' },
  { char: 'W', emoji: '🖖', hint: '3 fingers up' },
  { char: 'Y', emoji: '🤙', hint: 'Shaka / thumb+pinky' },
  { char: 'YES', emoji: '👍', hint: 'Thumbs up' },
];

// ─── Canvas drawing helpers ──────────────────────────────────────────────────
const LANDMARK_CONNECTIONS = [
  [0,1],[1,2],[2,3],[3,4],       // thumb
  [0,5],[5,6],[6,7],[7,8],       // index
  [0,9],[9,10],[10,11],[11,12],  // middle
  [0,13],[13,14],[14,15],[15,16],// ring
  [0,17],[17,18],[18,19],[19,20],// pinky
  [5,9],[9,13],[13,17]           // palm
];

const FINGER_COLORS = ['#facc15','#38bdf8','#4ade80','#c084fc','#f43f5e'];

function drawLandmarks(ctx, landmarks, w, h) {
  ctx.clearRect(0, 0, w, h);
  if (!landmarks || landmarks.length < 21) return;

  // Convert normalized landmarks to pixel coords
  const pts = landmarks.map(lm => ({ x: (1 - lm.x) * w, y: lm.y * h }));

  // Draw connections
  LANDMARK_CONNECTIONS.forEach(([a, b]) => {
    const fingerIdx = Math.floor(b / 4);
    ctx.beginPath();
    ctx.moveTo(pts[a].x, pts[a].y);
    ctx.lineTo(pts[b].x, pts[b].y);
    ctx.strokeStyle = FINGER_COLORS[Math.min(fingerIdx, 4)] + 'cc';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.stroke();
  });

  // Draw landmark dots
  pts.forEach((pt, i) => {
    const isJoint = i % 4 === 0 || i === 0;
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, isJoint ? 7 : 4.5, 0, Math.PI * 2);
    ctx.fillStyle = i === 0 ? '#06b6d4' : '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });

  // Wrist glow ring
  ctx.beginPath();
  ctx.arc(pts[0].x, pts[0].y, 14, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(6,182,212,0.5)';
  ctx.lineWidth = 2;
  ctx.stroke();
}

// ─── Fallback skeleton (for no-camera / demo mode) ──────────────────────────
function drawFallbackSkeleton(ctx, fingers) {
  const w = ctx.canvas.width, h = ctx.canvas.height;
  ctx.clearRect(0, 0, w, h);
  const wx = w * 0.5, wy = h * 0.82;

  ctx.beginPath();
  ctx.arc(wx, wy - 44, 36, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(6,182,212,0.12)';
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 3;
  ctx.fill(); ctx.stroke();

  const defs = [
    { name: 'thumb',  angle: -0.85, ext: fingers.thumb,  len: 60, color: '#facc15' },
    { name: 'index',  angle: -0.4,  ext: fingers.index,  len: 88, color: '#38bdf8' },
    { name: 'middle', angle:  0.0,  ext: fingers.middle, len: 98, color: '#4ade80' },
    { name: 'ring',   angle:  0.4,  ext: fingers.ring,   len: 84, color: '#c084fc' },
    { name: 'pinky',  angle:  0.8,  ext: fingers.pinky,  len: 68, color: '#f43f5e' },
  ];

  defs.forEach(f => {
    const mx = wx + Math.sin(f.angle) * 40, my = wy - 44 - Math.cos(f.angle) * 30;
    const len = f.ext ? f.len : f.len * 0.38;
    const tx = mx + Math.sin(f.angle) * len, ty = my - Math.cos(f.angle) * len;
    ctx.beginPath(); ctx.moveTo(wx, wy - 44); ctx.lineTo(mx, my); ctx.lineTo(tx, ty);
    ctx.strokeStyle = f.ext ? f.color : '#334155';
    ctx.lineWidth = f.ext ? 5.5 : 3; ctx.lineCap = 'round'; ctx.stroke();
    [{ x: mx, y: my }, { x: tx, y: ty }].forEach(({ x, y }, j) => {
      ctx.beginPath(); ctx.arc(x, y, j === 1 ? (f.ext ? 7 : 4) : 4, 0, Math.PI * 2);
      ctx.fillStyle = f.ext ? '#fff' : '#475569'; ctx.fill();
    });
  });
}

// ════════════════════════════════════════════════════════════════════════════
export default function LiveCameraTranslator() {
  const [isCameraActive, setIsCameraActive]       = useState(false);
  const [cameraError, setCameraError]             = useState(null);
  const [mediapipeReady, setMediapipeReady]        = useState(false);
  const [mediapipeLoading, setMediapipeLoading]    = useState(false);
  const [activeSign, setActiveSign]               = useState(null);
  const [pendingSign, setPendingSign]             = useState(null);   // stability buffer
  const [pendingProgress, setPendingProgress]     = useState(0);      // 0-100%
  const [translatedSentence, setTranslatedSentence] = useState('');
  const [copied, setCopied]                       = useState(false);
  const [confidence, setConfidence]               = useState(0);
  const [fps, setFps]                             = useState(0);
  const [mode, setMode]                           = useState('ISL');
  const [showLegend, setShowLegend]               = useState(false);
  const [isSpeaking, setIsSpeaking]               = useState(false);
  const [detectionFlash, setDetectionFlash]       = useState(false);

  const videoRef      = useRef(null);
  const canvasRef     = useRef(null);
  const handsRef      = useRef(null);
  const animFrameRef  = useRef(null);
  const lastFrameTime = useRef(Date.now());
  const frameCount    = useRef(0);

  // Stability buffer refs
  const pendingSignRef   = useRef(null);
  const pendingTimerRef  = useRef(null);
  const pendingStartRef  = useRef(null);
  const HOLD_MS          = 800; // ms to hold a sign before committing

  // ── Load MediaPipe scripts from CDN ────────────────────────────────────────
  const loadMediaPipe = useCallback(async () => {
    setMediapipeLoading(true);
    try {
      await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js');
      await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js');
      setMediapipeReady(true);
    } catch (e) {
      console.warn('MediaPipe CDN load failed:', e);
      setCameraError('MediaPipe could not load (check network). Demo mode active — use the gesture buttons below!');
    } finally {
      setMediapipeLoading(false);
    }
  }, []);

  useEffect(() => { loadMediaPipe(); }, [loadMediaPipe]);

  // ── Draw initial skeleton on mount ─────────────────────────────────────────
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      drawFallbackSkeleton(ctx, { thumb: true, index: true, middle: true, ring: true, pinky: true });
    }
    return () => {
      stopAllStreams();
      clearPendingTimer();
    };
  }, []);

  // ── Stability buffer: commit sign after holding HOLD_MS ────────────────────
  const clearPendingTimer = () => {
    if (pendingTimerRef.current) clearInterval(pendingTimerRef.current);
    pendingTimerRef.current = null;
    setPendingProgress(0);
  };

  const onSignDetected = useCallback((result) => {
    if (!result.detected) {
      // No sign — reset buffer
      if (pendingSignRef.current) {
        pendingSignRef.current = null;
        setPendingSign(null);
        clearPendingTimer();
      }
      return;
    }

    const charKey = result.detected.char;
    setConfidence(result.confidence);

    if (charKey !== pendingSignRef.current?.char) {
      // New sign detected — start stability timer
      clearPendingTimer();
      pendingSignRef.current = result.detected;
      pendingStartRef.current = Date.now();
      setPendingSign(result.detected);

      pendingTimerRef.current = setInterval(() => {
        const elapsed = Date.now() - pendingStartRef.current;
        const progress = Math.min((elapsed / HOLD_MS) * 100, 100);
        setPendingProgress(progress);

        if (elapsed >= HOLD_MS) {
          // Commit the sign!
          clearPendingTimer();
          const committed = pendingSignRef.current;
          if (!committed) return;
          setActiveSign(committed);
          setDetectionFlash(true);
          setTimeout(() => setDetectionFlash(false), 400);
          soundEffects.playSignDetected?.();
          setTranslatedSentence(prev => {
            if (!prev) return committed.char;
            return `${prev} ${committed.char}`;
          });
          // Update canvas skeleton for active fingers
          if (canvasRef.current && result.activeFingers) {
            const ctx = canvasRef.current.getContext('2d');
            drawFallbackSkeleton(ctx, result.activeFingers);
          }
        }
      }, 50);
    }
  }, []);

  // ── MediaPipe Hands setup ──────────────────────────────────────────────────
  const initMediaPipeHands = useCallback(async (videoEl) => {
    if (!window.Hands) { throw new Error('MediaPipe Hands not loaded'); }

    const hands = new window.Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.6,
    });

    hands.onResults((results) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const w = canvas.width, h = canvas.height;

      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const lms = results.multiHandLandmarks[0];
        drawLandmarks(ctx, lms, w, h);
        const classification = classifyHandGesture(lms);
        onSignDetected(classification);
      } else {
        ctx.clearRect(0, 0, w, h);
        onSignDetected({ detected: null, confidence: 0 });
      }

      // FPS counter
      frameCount.current++;
      const now = Date.now();
      const elapsed = now - lastFrameTime.current;
      if (elapsed >= 1000) {
        setFps(Math.round((frameCount.current * 1000) / elapsed));
        frameCount.current = 0;
        lastFrameTime.current = now;
      }
    });

    // Use Camera utility for continuous frame sending
    if (window.Camera) {
      const camera = new window.Camera(videoEl, {
        onFrame: async () => { await hands.send({ image: videoEl }); },
        width: 640,
        height: 480,
      });
      handsRef.current = { hands, camera };
      camera.start();
    } else {
      // Fallback: manual rAF loop
      handsRef.current = { hands };
      const loop = async () => {
        if (videoEl.readyState >= 2) await hands.send({ image: videoEl });
        animFrameRef.current = requestAnimationFrame(loop);
      };
      loop();
    }
  }, [onSignDetected]);

  // ── Start webcam ───────────────────────────────────────────────────────────
  const startCamera = async () => {
    soundEffects.playClick?.();
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' }
      });
      if (!videoRef.current) return;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setIsCameraActive(true);

      if (mediapipeReady && window.Hands) {
        await initMediaPipeHands(videoRef.current);
      } else {
        // No MediaPipe — just show the video stream, buttons still work
        setCameraError('MediaPipe not ready — gesture buttons still work! Detection will start on next load.');
      }
    } catch (err) {
      console.warn('Webcam error:', err);
      setCameraError('Camera not accessible or permission denied. Use the gesture buttons below to demo!');
      setIsCameraActive(false);
    }
  };

  // ── Stop all streams ───────────────────────────────────────────────────────
  const stopAllStreams = () => {
    if (handsRef.current?.camera) handsRef.current.camera.stop();
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      videoRef.current.srcObject = null;
    }
    handsRef.current = null;
    clearPendingTimer();
  };

  const stopCamera = () => {
    soundEffects.playClick?.();
    stopAllStreams();
    setIsCameraActive(false);
    setFps(0);
    setPendingSign(null);
    // Redraw default skeleton
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      drawFallbackSkeleton(ctx, { thumb: true, index: true, middle: true, ring: true, pinky: true });
    }
  };

  // ── Manual gesture buttons (demo/fallback mode) ───────────────────────────
  const SAMPLE_SIGNS = [
    { char: 'Hello',    emoji: '✋', label: 'Hello / Namaste',    fingers: { thumb: true,  index: true,  middle: true,  ring: true,  pinky: true  } },
    { char: 'YES',      emoji: '👍', label: 'Yes / Agree',        fingers: { thumb: true,  index: false, middle: false, ring: false, pinky: false } },
    { char: 'V',        emoji: '✌️', label: 'Victory / Peace',    fingers: { thumb: false, index: true,  middle: true,  ring: false, pinky: false } },
    { char: 'D',        emoji: '☝️', label: 'D / Point / One',    fingers: { thumb: false, index: true,  middle: false, ring: false, pinky: false } },
    { char: 'L',        emoji: '👆', label: 'L shape',            fingers: { thumb: true,  index: true,  middle: false, ring: false, pinky: false } },
    { char: 'B',        emoji: '🤚', label: 'B / Open 4',         fingers: { thumb: false, index: true,  middle: true,  ring: true,  pinky: true  } },
    { char: 'Y',        emoji: '🤙', label: 'Y / Shaka',          fingers: { thumb: true,  index: false, middle: false, ring: false, pinky: true  } },
    { char: 'F',        emoji: '👌', label: 'F / OK sign',        fingers: { thumb: true,  index: false, middle: true,  ring: true,  pinky: true  } },
    { char: 'LEARN',    emoji: '📖', label: 'Learn',              fingers: { thumb: true,  index: true,  middle: false, ring: false, pinky: false } },
    { char: 'HELP',     emoji: '🆘', label: 'Help',               fingers: { thumb: true,  index: false, middle: false, ring: false, pinky: false } },
    { char: 'TEACHER',  emoji: '👩‍🏫', label: 'Teacher / Guru',   fingers: { thumb: false, index: true,  middle: true,  ring: false, pinky: false } },
    { char: 'GOOD',     emoji: '✨', label: 'Good / Shandar',     fingers: { thumb: true,  index: false, middle: false, ring: false, pinky: true  } },
  ];

  const handleManualSign = (sign) => {
    soundEffects.playSignDetected?.();
    setActiveSign({ char: sign.char, emoji: sign.emoji, name: sign.label });
    setConfidence(0.95 + Math.random() * 0.04);
    setDetectionFlash(true);
    setTimeout(() => setDetectionFlash(false), 400);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      drawFallbackSkeleton(ctx, sign.fingers);
    }
    setTranslatedSentence(prev => (!prev ? sign.char : `${prev} ${sign.char}`));
  };

  // ── TTS ────────────────────────────────────────────────────────────────────
  const handleSpeak = () => {
    soundEffects.playClick?.();
    if (!translatedSentence) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(translatedSentence);
    utt.rate = 0.9;
    utt.pitch = 1.05;
    utt.onstart = () => setIsSpeaking(true);
    utt.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utt);
  };

  const handleClear = () => {
    soundEffects.playClick?.();
    setTranslatedSentence('');
    setActiveSign(null);
    setPendingSign(null);
    clearPendingTimer();
    window.speechSynthesis.cancel();
  };

  const handleBackspace = () => {
    soundEffects.playClick?.();
    const words = translatedSentence.trim().split(' ');
    words.pop();
    setTranslatedSentence(words.join(' '));
  };

  const handleCopy = () => {
    soundEffects.playClick?.();
    navigator.clipboard.writeText(translatedSentence);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = translatedSentence.trim().split(/\s+/).filter(Boolean).length;

  // ════════════════════════════════════════════════════════════════════════════
  return (
    <div className="space-y-5">

      {/* ── Top Banner ───────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/25 bg-gradient-to-br from-slate-900 via-cyan-950/30 to-indigo-950/40 p-6">
        {/* Animated BG orbs */}
        <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-indigo-500/10 blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-indigo-500 flex items-center justify-center shadow-2xl shadow-cyan-500/40 text-2xl">
              🤟
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] tracking-tight">
                  Real-Time Sign Language Translator
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  {isCameraActive ? 'LIVE AI' : 'READY'}
                </span>
                {mediapipeLoading && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/20">
                    ⏳ Loading MediaPipe…
                  </span>
                )}
                {mediapipeReady && !mediapipeLoading && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
                    ✓ MediaPipe Ready
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-lg">
                Show a hand sign to your webcam — AI detects 21 landmarks in real time and converts to text &amp; speech
              </p>
            </div>
          </div>

          {/* Controls row */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* ISL / ASL toggle */}
            <div className="flex items-center gap-1 bg-white/[0.05] p-1 rounded-xl border border-white/10 text-xs font-bold">
              {['ISL', 'ASL'].map(m => (
                <button key={m} onClick={() => { soundEffects.playClick?.(); setMode(m); }}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${mode === m ? 'bg-cyan-500 text-black font-black shadow' : 'text-slate-400 hover:text-white'}`}>
                  {m === 'ISL' ? '🇮🇳 ISL' : '🌍 ASL'}
                </button>
              ))}
            </div>

            {/* Legend toggle */}
            <button onClick={() => setShowLegend(v => !v)}
              className={`btn-pro btn-glass text-xs px-3 py-2 cursor-pointer flex items-center gap-1.5 ${showLegend ? 'text-cyan-300 border-cyan-500/40' : ''}`}>
              <BookOpen size={14} />
              <span>Legend</span>
            </button>

            {/* Camera toggle */}
            {!isCameraActive ? (
              <button onClick={startCamera}
                className="btn-pro btn-gradient-emerald text-xs px-5 py-2.5 cursor-pointer shadow-lg shadow-emerald-500/25 font-black">
                <Camera size={15} />
                <span>Launch Camera AI</span>
              </button>
            ) : (
              <button onClick={stopCamera}
                className="btn-pro btn-glass text-xs px-4 py-2 text-rose-400 border-rose-500/30 cursor-pointer">
                <CameraOff size={15} />
                <span>Stop Camera</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Error / status bar ───────────────────────────────────────────── */}
      {cameraError && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs flex items-start gap-2.5">
          <ShieldAlert size={16} className="shrink-0 mt-0.5" />
          <span>{cameraError}</span>
        </div>
      )}

      {/* ── ISL Legend panel ─────────────────────────────────────────────── */}
      {showLegend && (
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl animate-fade-in">
          <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <BookOpen size={13} className="text-cyan-400" />
            ISL Gesture Reference — hold each sign for ~0.8s to commit
          </h4>
          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-2">
            {ISL_LEGEND.map(item => (
              <div key={item.char} className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 transition-colors group">
                <span className="text-xl">{item.emoji}</span>
                <span className="text-[11px] font-black text-white">{item.char}</span>
                <span className="text-[9px] text-slate-500 text-center leading-tight hidden group-hover:block">{item.hint}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Main Arena ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Left: Camera + gesture buttons */}
        <div className="lg:col-span-7 space-y-4">

          {/* Camera viewport */}
          <div className={`relative aspect-video rounded-3xl overflow-hidden bg-slate-950 border-2 shadow-2xl flex items-center justify-center transition-all duration-300 ${
            detectionFlash ? 'border-emerald-400 shadow-emerald-500/30' : isCameraActive ? 'border-cyan-500/60' : 'border-white/10'
          }`}>
            {/* HUD corners */}
            {['top-3 left-3 border-t-2 border-l-2','top-3 right-3 border-t-2 border-r-2',
              'bottom-3 left-3 border-b-2 border-l-2','bottom-3 right-3 border-b-2 border-r-2'
            ].map((cls, i) => (
              <div key={i} className={`absolute w-6 h-6 ${cls} border-cyan-400 pointer-events-none z-20 transition-all ${isCameraActive ? 'opacity-100' : 'opacity-40'}`} />
            ))}

            {/* Live video */}
            <video ref={videoRef} playsInline muted
              className={`absolute inset-0 w-full h-full object-cover transform -scale-x-100 transition-opacity duration-500 ${isCameraActive ? 'opacity-100' : 'opacity-0'}`} />

            {/* MediaPipe landmark canvas */}
            <canvas ref={canvasRef} width={640} height={360}
              className="absolute inset-0 w-full h-full pointer-events-none z-10" />

            {/* Empty state */}
            {!isCameraActive && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-slate-900/60 via-slate-950/80 to-black z-0">
                <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-4xl mb-4 animate-pulse shadow-xl shadow-cyan-500/20">
                  🤟
                </div>
                <h4 className="text-base font-black text-white mb-2">Camera AI Ready</h4>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                  Click <strong className="text-cyan-300">Launch Camera AI</strong> above for live hand detection.
                  <br />Or use the gesture buttons below to demo without camera.
                </p>
              </div>
            )}

            {/* FPS counter (camera active) */}
            {isCameraActive && (
              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/60 backdrop-blur-lg rounded-full px-3 py-1.5 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[11px] font-bold text-white">LIVE</span>
                <span className="text-[10px] text-slate-400">{fps} fps</span>
                <Activity size={10} className="text-emerald-400" />
              </div>
            )}

            {/* Pending stability progress arc */}
            {pendingSign && pendingProgress < 100 && (
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-slate-900/90 backdrop-blur-xl rounded-2xl px-3 py-2 border border-indigo-500/40 shadow-lg">
                <div className="relative w-8 h-8">
                  <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32">
                    <circle cx="16" cy="16" r="12" fill="none" stroke="#1e293b" strokeWidth="3" />
                    <circle cx="16" cy="16" r="12" fill="none" stroke="#6366f1" strokeWidth="3"
                      strokeDasharray={`${(pendingProgress / 100) * 75.4} 75.4`}
                      strokeLinecap="round" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[8px] font-black text-indigo-300">
                    {pendingSign.emoji || '🤟'}
                  </span>
                </div>
                <div>
                  <div className="text-[10px] font-black text-indigo-300 uppercase tracking-wider">Hold…</div>
                  <div className="text-xs font-black text-white">{pendingSign.char}</div>
                </div>
              </div>
            )}

            {/* Detected sign overlay */}
            {activeSign && (
              <div className={`absolute bottom-4 right-4 z-20 bg-slate-900/95 backdrop-blur-2xl border-2 rounded-2xl p-3 shadow-2xl flex items-center gap-3 transition-all duration-300 ${
                detectionFlash ? 'border-emerald-400 shadow-emerald-500/40 scale-105' : 'border-cyan-400/60'
              }`}>
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-xl shadow-lg">
                  {activeSign.emoji || '🤟'}
                </div>
                <div>
                  <div className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">Detected</div>
                  <div className="text-base font-black text-white leading-tight">{activeSign.char}</div>
                  <div className="text-[10px] text-emerald-400 font-bold">{Math.round(confidence * 100)}% conf.</div>
                </div>
              </div>
            )}
          </div>

          {/* Gesture quick-tap buttons */}
          <div className="rounded-2xl bg-slate-900/60 border border-white/[0.07] p-4 space-y-3 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Zap size={13} className="text-amber-400" />
                Tap to Demo Gestures:
              </span>
              <span className="text-[10px] text-slate-500">No camera needed</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {SAMPLE_SIGNS.map((s) => (
                <button key={s.char} onClick={() => handleManualSign(s)}
                  className="group p-2.5 rounded-xl bg-white/[0.03] hover:bg-cyan-500/15 border border-white/[0.07] hover:border-cyan-400/40 text-left transition-all cursor-pointer flex items-center gap-2 active:scale-95">
                  <span className="text-lg shrink-0">{s.emoji}</span>
                  <div className="min-w-0">
                    <div className="text-[11px] font-black text-slate-200 group-hover:text-white truncate">{s.char}</div>
                    <div className="text-[9px] text-slate-500 truncate">{s.label}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Translation output */}
        <div className="lg:col-span-5 flex flex-col gap-4">

          {/* Output box */}
          <div className="flex-1 rounded-3xl bg-slate-900/80 border border-cyan-500/25 p-5 space-y-4 backdrop-blur-xl flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isCameraActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                <h3 className="text-sm font-black text-white uppercase tracking-wider">Translation Buffer</h3>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-slate-500">{wordCount} word{wordCount !== 1 ? 's' : ''}</span>
                <button onClick={handleCopy}
                  className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer transition-colors"
                  title="Copy">
                  {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                </button>
              </div>
            </div>

            {/* Text display */}
            <div className="flex-1 p-4 rounded-2xl bg-slate-950/80 border border-white/[0.07] min-h-[140px] flex flex-col justify-between shadow-inner">
              {translatedSentence ? (
                <p className="text-lg sm:text-xl font-black text-cyan-200 leading-relaxed font-['Outfit'] break-words">
                  {translatedSentence}
                </p>
              ) : (
                <p className="text-slate-500 italic text-sm font-normal leading-relaxed">
                  {isCameraActive
                    ? 'Show a hand sign to the camera…\nHold it for ~0.8s to commit the letter.'
                    : 'Tap a gesture button or launch the camera to start building sentences…'}
                </p>
              )}
              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-3 border-t border-white/[0.04] mt-3">
                <span>Language: <strong className="text-slate-400">English / {mode} Speech</strong></span>
                {isCameraActive && (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Activity size={10} className="animate-pulse" /> Detecting…
                  </span>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2.5 pt-2 border-t border-white/[0.07]">
              <button onClick={handleSpeak} disabled={!translatedSentence}
                className={`btn-pro w-full py-3.5 text-xs font-black cursor-pointer flex items-center justify-center gap-2 shadow-xl transition-all ${
                  isSpeaking
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-indigo-500/30 scale-[0.99]'
                    : 'btn-gradient-emerald shadow-emerald-500/25'
                } disabled:opacity-40 disabled:cursor-not-allowed`}>
                {isSpeaking ? <Mic size={16} className="animate-pulse" /> : <Volume2 size={16} />}
                <span>{isSpeaking ? 'Speaking…' : 'Speak Aloud (Text-to-Speech)'}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleBackspace} disabled={!translatedSentence}
                  className="btn-pro btn-glass text-xs py-2.5 cursor-pointer flex items-center justify-center gap-1.5 text-amber-300 border-amber-500/25 disabled:opacity-40 disabled:cursor-not-allowed">
                  <Delete size={13} />
                  <span>Undo Word</span>
                </button>
                <button onClick={handleClear} disabled={!translatedSentence}
                  className="btn-pro btn-glass text-xs py-2.5 cursor-pointer flex items-center justify-center gap-1.5 text-rose-400 border-rose-500/25 disabled:opacity-40 disabled:cursor-not-allowed">
                  <RotateCcw size={13} />
                  <span>Clear All</span>
                </button>
              </div>
            </div>
          </div>

          {/* Info card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/50 via-slate-900/80 to-cyan-950/50 border border-indigo-500/20 text-xs space-y-2">
            <h4 className="font-black text-cyan-300 flex items-center gap-1.5 text-[13px]">
              💡 How It Works
            </h4>
            <div className="space-y-1.5 text-slate-300 leading-relaxed text-[11px]">
              <div className="flex items-start gap-2">
                <ChevronRight size={11} className="text-cyan-400 mt-0.5 shrink-0" />
                <span><strong>MediaPipe Hands</strong> tracks 21 hand landmarks per frame at ~25 fps</span>
              </div>
              <div className="flex items-start gap-2">
                <ChevronRight size={11} className="text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>ISL Classifier</strong> maps finger extension patterns to letters &amp; words</span>
              </div>
              <div className="flex items-start gap-2">
                <ChevronRight size={11} className="text-indigo-400 mt-0.5 shrink-0" />
                <span><strong>Hold ~0.8s</strong> — stability buffer prevents jittery false commits</span>
              </div>
              <div className="flex items-start gap-2">
                <ChevronRight size={11} className="text-purple-400 mt-0.5 shrink-0" />
                <span><strong>Web Speech API</strong> reads back the full sentence in natural voice</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
