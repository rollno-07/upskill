import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Filter, BookOpen, Layers, Cpu, Database, 
  Terminal, Sparkles, Award, Sliders, ChevronDown, 
  ChevronRight, Code, Check, ExternalLink, HelpCircle, 
  BookOpenCheck, Sigma, AlertCircle, Info, Bookmark, BookmarkCheck 
} from 'lucide-react';
import { questions, Question } from './data/questions';
import MathFormula from './components/MathFormula';
import ConceptDiagram from './components/ConceptDiagram';
import PracticeQuiz from './components/PracticeQuiz';
import Cheatsheet from './components/Cheatsheet';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'syllabus' | 'sandbox' | 'quiz' | 'cheatsheet'>('syllabus');
  const [savedQuestionIds, setSavedQuestionIds] = useState<number[]>([]);
  const [currentConceptSandbox, setCurrentConceptSandbox] = useState<'redux-flow' | 'immer' | 'selectors' | 'normalization' | 'thunk-saga' | 'optimistic' | 'middleware-chain' | 'rtkq' | 'render-profiler' | 'boilerplate'>('redux-flow');

  // Categories & difficulties metadata
  const categories = ['All', 'Fundamentals', 'Redux Toolkit', 'Async & Middleware', 'Performance & State', 'React Integration', 'Testing & Debugging'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Toggle bookmark / saved questions
  const toggleBookmark = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedQuestionIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Filter & Search Logic
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchesSearch = 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        q.answer.toLowerCase().includes(searchQuery.toLowerCase()) || 
        q.example.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'All' || 
        q.category === selectedCategory;

      const matchesDifficulty = 
        selectedDifficulty === 'All' || 
        q.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-300 font-sans selection:bg-cyan-100 selection:text-cyan-900 leading-normal">
      {/* 1. Header Banner */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-900/60 px-4 py-4 md:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-cyan-600/15">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                Redux Visual Manual <span className="text-xs font-mono px-2 py-0.5 bg-zinc-900 text-zinc-500 rounded-full font-semibold">RTK 2.0</span>
              </h1>
              <p className="text-xs text-zinc-500">All 60 Redux and Toolkit Core Architectures visualised with interactive proof mechanics.</p>
            </div>
          </div>

          {/* Navigation Bar */}
          <nav className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-xl self-stretch md:self-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab('syllabus')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${activeTab === 'syllabus' ? 'bg-zinc-900/50 text-cyan-400 shadow-xs' : 'text-zinc-400 hover:text-white'}`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Interactive Syllabus
            </button>
            <button
              onClick={() => setActiveTab('sandbox')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${activeTab === 'sandbox' ? 'bg-zinc-900/50 text-cyan-400 shadow-xs' : 'text-zinc-400 hover:text-white'}`}
            >
              <Sliders className="w-3.5 h-3.5" /> Sandbox Lab
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${activeTab === 'quiz' ? 'bg-zinc-900/50 text-cyan-400 shadow-xs' : 'text-zinc-400 hover:text-white'}`}
            >
              <Award className="w-3.5 h-3.5" /> Practice Quiz
            </button>
            <button
              onClick={() => setActiveTab('cheatsheet')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${activeTab === 'cheatsheet' ? 'bg-zinc-900/50 text-cyan-400 shadow-xs' : 'text-zinc-400 hover:text-white'}`}
            >
              <Terminal className="w-3.5 h-3.5" /> Cheatsheet
            </button>
          </nav>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 py-6 md:px-8 md:py-8">
        
        {/* TAB 1: SYLLABUS & QUESTION LISTS */}
        {activeTab === 'syllabus' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Left Filter Column (Static Desktop Panel) */}
            <aside className="lg:col-span-1 space-y-4">
              <div className="bg-zinc-900/50 border border-zinc-800/80 p-4 rounded-2xl shadow-xs space-y-4 sticky top-24">
                <div className="flex items-center gap-1.5 pb-2 border-b border-slate-50">
                  <Filter className="w-4 h-4 text-zinc-500" />
                  <h3 className="font-bold text-white text-xs uppercase tracking-wider">Refine Syllabus</h3>
                </div>

                {/* Categories */}
                <div className="space-y-1">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide block mb-1">Architecture Category</span>
                  <div className="flex flex-col gap-1">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${selectedCategory === cat ? 'bg-cyan-950/20 text-cyan-400 font-bold border-l-2 border-cyan-600 pl-2.5' : 'text-zinc-400 hover:bg-zinc-950'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Levels */}
                <div className="space-y-1 pt-2">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide block mb-1">Difficulty Depth</span>
                  <div className="flex flex-col gap-1">
                    {difficulties.map(diff => (
                      <button
                        key={diff}
                        onClick={() => setSelectedDifficulty(diff)}
                        className={`text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${selectedDifficulty === diff ? 'bg-cyan-950/20 text-cyan-400 font-bold border-l-2 border-cyan-600 pl-2.5' : 'text-zinc-400 hover:bg-zinc-950'}`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Manual Summary Stats */}
                <div className="pt-4 border-t border-zinc-800/80 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500 font-medium">Decks Total:</span>
                    <strong className="text-white font-mono font-semibold">{questions.length} Concepts</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500 font-medium">Active Search:</span>
                    <strong className="text-white font-mono font-semibold">{filteredQuestions.length} Found</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500 font-medium">Saved Guides:</span>
                    <strong className="text-cyan-400 font-mono font-semibold">{savedQuestionIds.length} Saved</strong>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Question Container */}
            <div className="lg:col-span-3 space-y-4">
              
              {/* Search Header Bar */}
              <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center gap-3">
                <div className="relative w-full flex-1">
                  <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-zinc-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search queries, concept tags, reducer parameters, code components..."
                    className="w-full bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-300 outline-none focus:bg-zinc-900/50 focus:border-cyan-500/80 transition-all font-sans font-medium"
                  />
                </div>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-zinc-500 hover:text-cyan-400 font-semibold"
                  >
                    Clear Search
                  </button>
                )}
              </div>

              {/* Dynamic Questions List */}
              {filteredQuestions.length === 0 ? (
                <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-8 text-center space-y-3">
                  <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
                  <h3 className="font-bold text-zinc-300 text-sm">No conceptual guides match your filters</h3>
                  <p className="text-xs text-zinc-500 max-w-sm mx-auto">Try lowering the study difficulty or widening the query keywords.</p>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {filteredQuestions.map(q => {
                    const isExpanded = expandedId === q.id;
                    const isBookmarked = savedQuestionIds.includes(q.id);

                    return (
                      <div
                        key={q.id}
                        id={`question-card-${q.id}`}
                        onClick={() => setExpandedId(isExpanded ? null : q.id)}
                        className={`bg-zinc-900/50 border rounded-2xl hover:border-zinc-800 cursor-pointer shadow-xs transition-all overflow-hidden ${isExpanded ? 'border-cyan-500/30 ring-1 ring-cyan-500/5' : 'border-zinc-800/80'}`}
                      >
                        {/* Summary Header */}
                        <div className="p-4 md:p-5 flex items-start gap-4 justify-between">
                          <div className="space-y-1.5 flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="px-2 py-0.5 bg-zinc-900 border border-slate-150 text-[9px] font-mono rounded-md text-zinc-500 select-none">
                                Q#{q.id}
                              </span>
                              <span className="px-2.5 py-0.5 bg-cyan-950/20 text-cyan-400 text-[9px] font-bold rounded-full select-none">
                                {q.category}
                              </span>
                              <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full select-none ${
                                q.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-600' :
                                q.difficulty === 'Intermediate' ? 'bg-cyan-950/20 text-cyan-400' :
                                'bg-red-50 text-red-600'
                              }`}>
                                {q.difficulty}
                              </span>
                            </div>
                            <h3 className="text-sm md:text-base font-bold text-white tracking-tight pr-4">
                              {q.question}
                            </h3>
                          </div>

                          <div className="flex items-center gap-1 self-start md:self-center">
                            {/* Bookmark trigger */}
                            <button
                              onClick={(e) => toggleBookmark(q.id, e)}
                              className="p-1.5 hover:bg-zinc-950 rounded-lg text-zinc-500 hover:text-zinc-200"
                              title={isBookmarked ? 'Remove Bookmark' : 'Save Guide'}
                            >
                              {isBookmarked ? (
                                <BookmarkCheck className="w-4.5 h-4.5 text-cyan-400" />
                              ) : (
                                <Bookmark className="w-4.5 h-4.5" />
                              )}
                            </button>
                            <div className="p-1 text-zinc-500">
                              {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                            </div>
                          </div>
                        </div>

                        {/* Expandable Details Canvas */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="border-t border-zinc-900/60 bg-zinc-950/20"
                              onClick={e => e.stopPropagation()}
                            >
                              <div className="p-5 md:p-6 space-y-5">
                                
                                {/* Core Answer Text */}
                                <div className="space-y-1.5">
                                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 select-none flex items-center gap-1">
                                    <BookOpenCheck className="w-3.5 h-3.5 text-cyan-500" /> Comprehensive Explanation
                                  </h4>
                                  <p className="text-xs md:text-sm text-zinc-200 leading-relaxed font-sans font-medium">
                                    {q.answer.split('\\n').map((para, index) => (
                                      <span key={index} className="block mt-1.5 first:mt-0">{para}</span>
                                    ))}
                                  </p>
                                </div>

                                {/* Math Expression display */}
                                {q.latex && (
                                  <div className="space-y-1.5">
                                    <MathFormula latex={q.latex} />
                                  </div>
                                )}

                                {/* Interactive Concept Diagram Visualizer */}
                                {q.conceptKey && (
                                  <div className="space-y-1.5">
                                    <div className="text-[10px] uppercase font-bold text-zinc-500 select-none flex items-center gap-1.5">
                                      <Sparkles className="w-3.5 h-3.5 text-cyan-500" /> Embedded Proof Playground
                                    </div>
                                    <ConceptDiagram conceptKey={q.conceptKey} />
                                  </div>
                                )}

                                {/* Code Example Snippet Tab */}
                                {q.example && (
                                  <div className="space-y-1.5">
                                    <h4 className="text-[10px] uppercase font-bold text-zinc-500 select-none flex items-center gap-1.5">
                                      <Code className="w-3.5 h-3.5 text-zinc-500" /> Concrete Code Implementation
                                    </h4>
                                    <div className="relative group rounded-xl overflow-hidden border border-zinc-700/60 shadow-inner bg-slate-950">
                                      <pre className="p-4 overflow-x-auto text-[11px] font-mono text-slate-300 leading-relaxed max-h-56">
                                        <code>{q.example}</code>
                                      </pre>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: SPECIALIZED SANDBOX LABS */}
        {activeTab === 'sandbox' && (
          <div className="space-y-5">
            <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-cyan-400" /> Interactive Redux Sandbox Lab
                </h2>
                <p className="text-xs text-zinc-500 mt-1">Play and inspect standard Redux architectures in real-time, isolated simulations.</p>
              </div>

              {/* Selector */}
              <div className="flex flex-wrap gap-1 bg-zinc-900 p-1 rounded-xl">
                <button
                  onClick={() => setCurrentConceptSandbox('redux-flow')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer ${currentConceptSandbox === 'redux-flow' ? 'bg-zinc-900/50 text-cyan-400 shadow-xs' : 'text-zinc-400 hover:text-white'}`}
                >
                  Unidirectional Flow
                </button>
                <button
                  onClick={() => setCurrentConceptSandbox('immer')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer ${currentConceptSandbox === 'immer' ? 'bg-zinc-900/50 text-cyan-400 shadow-xs' : 'text-zinc-400 hover:text-white'}`}
                >
                  Immer Proxies
                </button>
                <button
                  onClick={() => setCurrentConceptSandbox('selectors')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer ${currentConceptSandbox === 'selectors' ? 'bg-zinc-900/50 text-cyan-400 shadow-xs' : 'text-zinc-400 hover:text-white'}`}
                >
                  Memoization Cache
                </button>
                <button
                  onClick={() => setCurrentConceptSandbox('optimistic')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer ${currentConceptSandbox === 'optimistic' ? 'bg-zinc-900/50 text-cyan-400 shadow-xs' : 'text-zinc-400 hover:text-white'}`}
                >
                  Optimistic Rollbacks
                </button>
                <button
                  onClick={() => setCurrentConceptSandbox('rtkq')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer ${currentConceptSandbox === 'rtkq' ? 'bg-zinc-900/50 text-cyan-400 shadow-xs' : 'text-zinc-400 hover:text-white'}`}
                >
                  RTKQ Invalidation
                </button>
              </div>
            </div>

            {/* Display active standalone sandbox */}
            <ConceptDiagram conceptKey={currentConceptSandbox} />
          </div>
        )}

        {/* TAB 3: PRACTICE QUIZ / SELF STUDY */}
        {activeTab === 'quiz' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            <PracticeQuiz />
          </div>
        )}

        {/* TAB 4: RAPID REFERENCE CHEATSHEET */}
        {activeTab === 'cheatsheet' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            <Cheatsheet />
          </div>
        )}
      </main>

      {/* Footer copyright */}
      <footer className="border-t border-zinc-800/80 bg-zinc-900/50 py-6 mt-12 text-center text-xs text-zinc-500">
        <p className="font-sans">© 2026 Redux Visual Manual. Crafted for the absolute masterclass study experience.</p>
      </footer>
    </div>
  );
}
