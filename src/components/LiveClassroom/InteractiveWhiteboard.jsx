import React, { useRef, useState, useEffect } from 'react';
import { 
  PenTool, 
  Eraser, 
  Highlighter, 
  Square, 
  Circle as CircleIcon, 
  Minus, 
  RotateCcw, 
  Download, 
  Grid, 
  StickyNote, 
  Sparkles,
  Type
} from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

const COLORS = [
  { name: 'White', hex: '#ffffff' },
  { name: 'Cyan', hex: '#38bdf8' },
  { name: 'Yellow', hex: '#facc15' },
  { name: 'Emerald', hex: '#4ade80' },
  { name: 'Rose', hex: '#f43f5e' },
  { name: 'Purple', hex: '#c084fc' }
];

export default function InteractiveWhiteboard() {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState('pen'); // 'pen', 'highlighter', 'eraser', 'rect', 'circle', 'line'
  const [color, setColor] = useState('#38bdf8');
  const [lineWidth, setLineWidth] = useState(4);
  const [isDrawing, setIsDrawing] = useState(false);
  const [gridType, setGridType] = useState('dots'); // 'none', 'dots', 'lines'
  const [notes, setNotes] = useState([
    { id: 1, text: '💡 Photosynthesis: 6CO₂ + 6H₂O ➔ C₆H₁₂O₆ + 6O₂', x: 40, y: 50, color: '#fef08a' }
  ]);

  const startPosRef = useRef({ x: 0, y: 0 });
  const snapshotRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set actual canvas resolution
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    const coords = getCoordinates(e);
    setIsDrawing(true);
    startPosRef.current = coords;

    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);

    // Save snapshot for geometric preview
    snapshotRef.current = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const coords = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');

    if (tool === 'pen' || tool === 'eraser' || tool === 'highlighter') {
      ctx.lineWidth = tool === 'highlighter' ? lineWidth * 3 : lineWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (tool === 'eraser') {
        ctx.strokeStyle = '#0f172a';
      } else if (tool === 'highlighter') {
        ctx.strokeStyle = color + '55'; // semi-transparent
      } else {
        ctx.strokeStyle = color;
      }

      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    } else {
      // Shape tools: restore previous snapshot then draw live preview
      if (snapshotRef.current) {
        ctx.putImageData(snapshotRef.current, 0, 0);
      }

      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = color;
      ctx.fillStyle = 'transparent';

      if (tool === 'rect') {
        const w = coords.x - startPosRef.current.x;
        const h = coords.y - startPosRef.current.y;
        ctx.strokeRect(startPosRef.current.x, startPosRef.current.y, w, h);
      } else if (tool === 'circle') {
        const radius = Math.hypot(coords.x - startPosRef.current.x, coords.y - startPosRef.current.y);
        ctx.beginPath();
        ctx.arc(startPosRef.current.x, startPosRef.current.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      } else if (tool === 'line') {
        ctx.beginPath();
        ctx.moveTo(startPosRef.current.x, startPosRef.current.y);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const ctx = canvasRef.current.getContext('2d');
      ctx.closePath();
    }
  };

  const clearCanvas = () => {
    soundEffects.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const exportImage = () => {
    soundEffects.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `whiteboard-${new Date().toISOString().slice(0, 10)}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const addStickyNote = () => {
    soundEffects.playClick();
    const newNote = {
      id: Date.now(),
      text: 'New IEP Lecture Note...',
      x: 100 + Math.random() * 200,
      y: 100 + Math.random() * 150,
      color: '#fef08a'
    };
    setNotes([...notes, newNote]);
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="glass-panel p-4 flex flex-wrap items-center justify-between gap-3 border border-white/10">
        {/* Tool Selector */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-white/10">
          {[
            { id: 'pen', label: 'Pen', icon: PenTool },
            { id: 'highlighter', label: 'Highlight', icon: Highlighter },
            { id: 'eraser', label: 'Eraser', icon: Eraser },
            { id: 'rect', label: 'Box', icon: Square },
            { id: 'circle', label: 'Circle', icon: CircleIcon },
            { id: 'line', label: 'Line', icon: Minus }
          ].map((t) => {
            const Icon = t.icon;
            const isActive = tool === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  soundEffects.playClick();
                  setTool(t.id);
                }}
                className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
                title={t.label}
              >
                <Icon size={14} />
                <span className="hidden sm:inline text-[11px]">{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Color Palette */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-white/10">
          {COLORS.map((c) => (
            <button
              key={c.name}
              onClick={() => {
                soundEffects.playClick();
                setColor(c.hex);
              }}
              style={{ backgroundColor: c.hex }}
              className={`w-6 h-6 rounded-full cursor-pointer transition-transform ${
                color === c.hex ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-900' : 'opacity-80 hover:opacity-100'
              }`}
              title={c.name}
            />
          ))}
        </div>

        {/* Brush Size */}
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="text-[11px] text-slate-400">Size:</span>
          <input
            type="range"
            min="2"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="w-20 accent-cyan-400 cursor-pointer"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={addStickyNote}
            className="btn btn-secondary text-xs px-3 py-1.5 cursor-pointer text-amber-300 border-amber-500/30"
            title="Add Dyslexia Sticky Note"
          >
            <StickyNote size={14} />
            <span className="hidden md:inline">Sticky Note</span>
          </button>

          <button
            onClick={exportImage}
            className="btn btn-secondary text-xs px-3 py-1.5 cursor-pointer"
            title="Download PNG"
          >
            <Download size={14} />
            <span className="hidden md:inline">Save</span>
          </button>

          <button
            onClick={clearCanvas}
            className="btn btn-secondary text-xs px-3 py-1.5 text-rose-400 border-rose-500/30 cursor-pointer"
            title="Clear Board"
          >
            <RotateCcw size={14} />
            <span className="hidden md:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="relative w-full h-[520px] rounded-3xl overflow-hidden bg-slate-900 border-2 border-indigo-500/30 shadow-2xl">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-full cursor-crosshair touch-none"
        />

        {/* Sticky Notes Floating Layer */}
        {notes.map((note) => (
          <div
            key={note.id}
            style={{ left: `${note.x}px`, top: `${note.y}px`, backgroundColor: note.color }}
            className="absolute p-3 rounded-xl shadow-xl w-60 text-slate-900 text-xs font-bold border border-yellow-500/30 select-none cursor-move animate-fade-in"
          >
            <div className="flex items-center justify-between pb-1 border-b border-black/10 mb-1">
              <span className="text-[10px] uppercase tracking-wider text-slate-700">Lecture Note</span>
              <button
                onClick={() => setNotes(notes.filter(n => n.id !== note.id))}
                className="text-slate-600 hover:text-black text-xs cursor-pointer font-extrabold"
              >
                ✕
              </button>
            </div>
            <textarea
              defaultValue={note.text}
              className="w-full bg-transparent resize-none outline-none text-slate-900 text-xs font-semibold"
              rows={2}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
