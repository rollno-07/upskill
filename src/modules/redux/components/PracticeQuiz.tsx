import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { questions, Question } from '../data/questions';
import { 
  CheckCircle, HelpCircle, RefreshCw, ChevronRight, 
  Award, BookOpen, Star, AlertCircle, Sparkles 
} from 'lucide-react';

export default function PracticeQuiz() {
  const [deck, setDeck] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [scoreStats, setScoreStats] = useState({ perfect: 0, partial: 0, missed: 0 });
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [history, setHistory] = useState<{ id: number; question: string; grade: 'perfect' | 'partial' | 'missed' }[]>([]);

  // Unique categories & difficulties
  const categories = ['All', 'Fundamentals', 'Redux Toolkit', 'Async & Middleware', 'Performance & State', 'React Integration', 'Testing & Debugging'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Build deck on selection change
  useEffect(() => {
    let filtered = [...questions];
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }
    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
    }
    
    // Shuffle the array
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    setDeck(shuffled);
    setCurrentIndex(0);
    setRevealed(false);
  }, [selectedCategory, selectedDifficulty]);

  const handleGrade = (grade: 'perfect' | 'partial' | 'missed') => {
    if (deck.length === 0) return;
    
    const currentQuestion = deck[currentIndex];
    
    setScoreStats(prev => ({
      ...prev,
      [grade]: prev[grade] + 1
    }));

    setHistory(prev => [
      ...prev,
      { id: currentQuestion.id, question: currentQuestion.question, grade }
    ]);

    setRevealed(false);
    if (currentIndex < deck.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed current cycle
      setCurrentIndex(deck.length); // triggers final score view
    }
  };

  const restartQuiz = () => {
    // Shuffle same deck
    const shuffled = [...deck].sort(() => 0.5 - Math.random());
    setDeck(shuffled);
    setCurrentIndex(0);
    setRevealed(false);
    setScoreStats({ perfect: 0, partial: 0, missed: 0 });
    setHistory([]);
  };

  const activeQuestion = deck[currentIndex];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl my-4 text-slate-300">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-4 border-b border-slate-800 pb-3">
        <div>
          <h4 className="font-semibold text-slate-100 text-sm md:text-base flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-400" /> Study Deck & Self-Grading Engine
          </h4>
          <p className="text-xs text-zinc-500 mt-1">Grade yourself on conceptual recall to boost long-term retention.</p>
        </div>
        
        {/* Dynamic deck progress */}
        {deck.length > 0 && currentIndex < deck.length && (
          <span className="text-xs font-mono px-2 py-1 bg-slate-950 rounded border border-slate-800 text-cyan-400 font-semibold select-none">
            Question {currentIndex + 1} / {deck.length}
          </span>
        )}
      </div>

      {/* Filter panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-[10px] text-zinc-500 font-bold uppercase block mb-1">Filter Deck Topic</label>
          <select 
            value={selectedCategory} 
            onChange={e => setSelectedCategory(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-medium text-slate-200 outline-none focus:border-cyan-500"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[10px] text-zinc-500 font-bold uppercase block mb-1">Filter Deck Complexity</label>
          <select 
            value={selectedDifficulty} 
            onChange={e => setSelectedDifficulty(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-medium text-slate-200 outline-none focus:border-cyan-500"
          >
            {difficulties.map(diff => <option key={diff} value={diff}>{diff}</option>)}
          </select>
        </div>
      </div>

      {/* DECK VIEWER */}
      {deck.length === 0 ? (
        <div className="text-center py-8 bg-slate-950 border border-slate-850/85 rounded-xl space-y-2">
          <HelpCircle className="w-8 h-8 text-zinc-400 mx-auto animate-bounce" />
          <p className="text-xs text-zinc-500">No questions match your chosen filters.</p>
          <button 
            onClick={() => { setSelectedCategory('All'); setSelectedDifficulty('All'); }}
            className="text-xs text-cyan-400 underline hover:text-cyan-300 font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : currentIndex < deck.length ? (
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeQuestion.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-slate-950 border border-slate-850 rounded-xl p-5 shadow-inner min-h-[160px] flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-[9px] font-mono rounded text-zinc-500">
                    ID #{activeQuestion.id}
                  </span>
                  <span className="px-2 py-0.5 bg-cyan-950/200/10 text-cyan-400 text-[9px] font-bold rounded">
                    {activeQuestion.category}
                  </span>
                  <span className={`px-2 py-0.5 text-[9px] font-bold rounded ${
                    activeQuestion.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400' :
                    activeQuestion.difficulty === 'Intermediate' ? 'bg-cyan-950/200/10 text-cyan-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {activeQuestion.difficulty}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-100 text-sm md:text-base leading-relaxed">
                  {activeQuestion.question}
                </h3>
              </div>

              {!revealed ? (
                <div className="pt-4 flex justify-center">
                  <button 
                    onClick={() => setRevealed(true)}
                    className="px-5 py-2 bg-cyan-600 hover:bg-cyan-950/200 text-white rounded-lg text-xs font-semibold shadow-md transition-colors flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" /> Reveal Study Answer
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-slate-900 mt-4 space-y-3">
                  <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 border border-slate-850 p-3 rounded-lg font-sans">
                    {activeQuestion.answer}
                  </div>
                  
                  {/* Grading panel */}
                  <div className="pt-3">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase block text-center mb-2">Rate your recall accuracy:</span>
                    <div className="grid grid-cols-3 gap-2">
                      <button 
                        onClick={() => handleGrade('missed')}
                        className="px-3 py-1.5 bg-red-950/20 hover:bg-red-950/40 border border-red-500/20 hover:border-red-500/50 text-red-400 text-[11px] font-bold rounded-lg transition-colors flex flex-col items-center gap-0.5"
                      >
                        <AlertCircle className="w-3.5 h-3.5" /> Missed
                      </button>
                      <button 
                        onClick={() => handleGrade('partial')}
                        className="px-3 py-1.5 bg-cyan-950/20 hover:bg-cyan-950/40 border border-cyan-500/20 hover:border-cyan-500/50 text-cyan-400 text-[11px] font-bold rounded-lg transition-colors flex flex-col items-center gap-0.5"
                      >
                        <Star className="w-3.5 h-3.5" /> Partially
                      </button>
                      <button 
                        onClick={() => handleGrade('perfect')}
                        className="px-3 py-1.5 bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-500/20 hover:border-emerald-500/50 text-emerald-400 text-[11px] font-bold rounded-lg transition-colors flex flex-col items-center gap-0.5"
                      >
                        <CheckCircle className="w-3.5 h-3.5" /> Got It!
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* QUIZ SUMMARY VIEW */
        <div className="space-y-4">
          <div className="bg-slate-950 border border-slate-850 rounded-xl p-5 text-center space-y-3">
            <Award className="w-10 h-10 text-cyan-400 mx-auto animate-bounce" />
            <h3 className="font-bold text-slate-100 text-base">Study Deck Completed!</h3>
            <p className="text-xs text-zinc-500">Excellent progress. You reviewed {deck.length} flashcards in this deck.</p>

            {/* Performance stats bar */}
            <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto pt-2">
              <div className="bg-slate-900 border border-slate-850 p-2.5 rounded-lg text-center">
                <div className="text-emerald-400 font-mono text-sm font-bold">{scoreStats.perfect}</div>
                <div className="text-[9px] text-zinc-500 uppercase font-mono">Mastered</div>
              </div>
              <div className="bg-slate-900 border border-slate-850 p-2.5 rounded-lg text-center">
                <div className="text-cyan-400 font-mono text-sm font-bold">{scoreStats.partial}</div>
                <div className="text-[9px] text-zinc-500 uppercase font-mono">Reviewed</div>
              </div>
              <div className="bg-slate-900 border border-slate-850 p-2.5 rounded-lg text-center">
                <div className="text-red-400 font-mono text-sm font-bold">{scoreStats.missed}</div>
                <div className="text-[9px] text-zinc-500 uppercase font-mono">Missed</div>
              </div>
            </div>

            <button 
              onClick={restartQuiz}
              className="mt-4 px-4 py-1.5 bg-cyan-600 hover:bg-cyan-950/200 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 mx-auto transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Study Deck Again
            </button>
          </div>

          {/* List of graded cards */}
          {history.length > 0 && (
            <div className="space-y-1.5 max-h-48 overflow-y-auto bg-slate-950 p-2.5 rounded-xl border border-slate-850">
              <span className="text-[9px] text-zinc-500 uppercase font-bold block mb-1">Response Logs:</span>
              {history.map((h, i) => (
                <div key={i} className="flex justify-between items-center text-xs bg-slate-900 p-2 rounded border border-slate-850">
                  <span className="truncate text-slate-300 max-w-[70%]">{h.question}</span>
                  <span className={`text-[10px] font-bold uppercase font-mono ${
                    h.grade === 'perfect' ? 'text-emerald-400' :
                    h.grade === 'partial' ? 'text-cyan-400' : 'text-red-400'
                  }`}>
                    {h.grade}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
