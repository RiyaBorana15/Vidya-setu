import React, { useState } from 'react';
import { 
  Search, 
  Hand, 
  Sparkles, 
  BookOpen, 
  Tag, 
  Volume2, 
  CheckCircle2,
  Filter
} from 'lucide-react';
import { SIGN_ALPHABET, COMMON_SIGNS } from '../../data/signData';
import { soundEffects } from '../../utils/soundEffects';

export default function SignDictionary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalSign, setActiveModalSign] = useState(null);

  const categories = ['All', 'Alphabet', 'Greetings', 'Classroom', 'Study', 'Polite', 'Responses'];

  const allItems = [
    ...SIGN_ALPHABET.map(a => ({ ...a, type: 'alphabet', title: a.name })),
    ...COMMON_SIGNS.map(s => ({ ...s, type: 'phrase' }))
  ];

  const filteredItems = allItems.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.meaning && item.meaning.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = 
      selectedCategory === 'All' || 
      item.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search & Category Filter Bar */}
      <div className="glass-panel p-5 space-y-4 border border-white/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search sign (e.g. Teacher, Hello, Letter V)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="text-xs text-slate-400 font-semibold">
            Showing <strong className="text-cyan-300">{filteredItems.length}</strong> Signs in Dictionary
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundEffects.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 border-cyan-400 text-white shadow-md'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Sign Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => {
              soundEffects.playClick();
              setActiveModalSign(item);
            }}
            className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="badge badge-indigo text-[10px]">{item.category}</span>
                {item.difficulty && (
                  <span className="text-[10px] text-emerald-400 font-bold">{item.difficulty}</span>
                )}
              </div>

              {/* Icon / Character Box */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-900 to-indigo-950 border border-white/10 group-hover:border-cyan-400 flex items-center justify-center text-3xl mx-auto shadow-inner transition-colors">
                {item.type === 'alphabet' ? (
                  <span className="font-black text-cyan-300 font-['Outfit']">{item.char}</span>
                ) : (
                  <span>🤟</span>
                )}
              </div>

              <h4 className="text-base font-extrabold text-white text-center mt-3 group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-slate-400 text-center mt-1 line-clamp-2 leading-relaxed">
                {item.meaning || item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
              <span className="text-cyan-400 font-semibold group-hover:underline">View Step Guide</span>
              <span>ISL Standard</span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {activeModalSign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-panel p-6 sm:p-8 max-w-lg w-full space-y-5 border border-cyan-400/50 bg-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="badge badge-cyan">{activeModalSign.category}</span>
              <button
                onClick={() => setActiveModalSign(null)}
                className="text-slate-400 hover:text-white text-xs font-bold cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="text-center space-y-2">
              <div className="w-20 h-20 rounded-3xl bg-slate-950 border-2 border-cyan-400 flex items-center justify-center text-4xl mx-auto shadow-xl">
                {activeModalSign.type === 'alphabet' ? activeModalSign.char : '🤟'}
              </div>
              <h3 className="text-2xl font-black text-white font-['Outfit']">{activeModalSign.title}</h3>
              {activeModalSign.meaning && (
                <p className="text-xs text-cyan-300 font-semibold">{activeModalSign.meaning}</p>
              )}
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs text-slate-300">
              <h5 className="font-bold text-white uppercase tracking-wider">Step-by-step Execution:</h5>
              <p className="leading-relaxed">{activeModalSign.actionGuide || activeModalSign.instructions}</p>
            </div>

            {activeModalSign.funFact && (
              <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-xs text-indigo-300">
                💡 <strong>Tip:</strong> {activeModalSign.funFact}
              </div>
            )}

            <button
              onClick={() => setActiveModalSign(null)}
              className="btn btn-primary w-full py-2.5 text-xs font-bold cursor-pointer"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
