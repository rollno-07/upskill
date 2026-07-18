import React, { useState, useEffect, useMemo } from 'react';
import { 
  questionsData, 
  Question, 
  CATEGORIES 
} from './data/questions';
import Playground from './components/Playground';
import { 
  Search, 
  Bookmark, 
  CheckCircle2, 
  BookOpen, 
  Award, 
  Terminal, 
  Copy, 
  Check, 
  ExternalLink, 
  ChevronRight, 
  Filter, 
  Sparkles, 
  Info, 
  X, 
  RotateCcw,
  Zap,
  BookmarkCheck,
  AlertCircle
} from 'lucide-react';

export default function App() {
  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [filterBookmarkedOnly, setFilterBookmarkedOnly] = useState(false);
  const [filterUnreadOnly, setFilterUnreadOnly] = useState(false);

  // User Progress States (Persisted in localStorage)
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('devops_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [readIds, setReadIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('devops_read');
    return saved ? JSON.parse(saved) : [];
  });

  // Active question being inspected
  const [activeQuestionId, setActiveQuestionId] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('devops_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  useEffect(() => {
    localStorage.setItem('devops_read', JSON.stringify(readIds));
  }, [readIds]);

  // Find active question object
  const activeQuestion = useMemo(() => {
    return questionsData.find(q => q.id === activeQuestionId) || questionsData[0];
  }, [activeQuestionId]);

  // Handle Bookmarks Toggle
  const toggleBookmark = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
    );
  };

  // Handle Read Status Toggle
  const toggleReadStatus = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setReadIds(prev => 
      prev.includes(id) ? prev.filter(rId => rId !== id) : [...prev, id]
    );
  };

  // Handle Copy Code Example
  const copyExample = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Reset progress helper
  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset your study progress, bookmarks, and read logs?')) {
      setBookmarkedIds([]);
      setReadIds([]);
      setActiveQuestionId(1);
    }
  };

  // Filtered List Computation
  const filteredQuestions = useMemo(() => {
    return questionsData.filter(q => {
      const matchesSearch = 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.explanation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.id.toString() === searchTerm;

      const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
      const matchesBookmark = !filterBookmarkedOnly || bookmarkedIds.includes(q.id);
      const matchesUnread = !filterUnreadOnly || !readIds.includes(q.id);

      return matchesSearch && matchesCategory && matchesDifficulty && matchesBookmark && matchesUnread;
    });
  }, [searchTerm, selectedCategory, selectedDifficulty, filterBookmarkedOnly, filterUnreadOnly, bookmarkedIds, readIds]);

  // Progress metrics calculation
  const totalCount = questionsData.length;
  const readCount = readIds.length;
  const progressPercent = Math.round((readCount / totalCount) * 100);
  const bookmarkCount = bookmarkedIds.length;

  const categoryMetrics = useMemo(() => {
    return CATEGORIES.map(cat => {
      const catQuestions = questionsData.filter(q => q.category === cat);
      const readCatCount = catQuestions.filter(q => readIds.includes(q.id)).length;
      return {
        name: cat,
        total: catQuestions.length,
        completed: readCatCount,
        percent: catQuestions.length > 0 ? Math.round((readCatCount / catQuestions.length) * 100) : 0
      };
    });
  }, [readIds]);

  const getCategoryTip = (category: string) => {
    switch (category) {
      case 'Introduction & Culture':
        return {
          title: "DevOps Culture Tip",
          tip: "DevOps is not a role, it's a shared responsibility. Emphasize empathy, blameless post-mortems, and breaking down silos between developers and operations team members."
        };
      case 'CI/CD & Release Strategies':
        return {
          title: "Deployment Strategy Tip",
          tip: "Deploying is a technical act; releasing is a business decision. Decouple deployments from releases using feature flags and progressive delivery (canary, blue-green)."
        };
      case 'Infrastructure as Code (IaC)':
        return {
          title: "IaC Best Practice",
          tip: "Treat infrastructure exactly like application code: store configuration declaratively in Git, run validation tests, and apply state tracking using locking backends."
        };
      case 'Containers & Orchestration':
      case 'Docker & Containers':
      case 'Kubernetes Orchestration':
        return {
          title: "Orchestration Golden Rule",
          tip: "Ensure your containers are completely stateless and disposable. Implement comprehensive liveness and readiness probes to let Kubernetes automate self-healing safely."
        };
      case 'Observability & SRE':
        return {
          title: "Reliability Engineering Tip",
          tip: "Focus metrics around the Three Pillars: Metrics, Traces, and Logs. Define realistic SLOs aligned with Error Budgets to balance product feature velocity and system reliability."
        };
      default:
        return {
          title: "SRE Interview Insight",
          tip: "Always tie technical metrics back to actual user experience. If users aren't complaining, but CPU is high, understand why before blocking deployment pipelines."
        };
    }
  };

  return (
    <div className="h-screen bg-[#0f172a] text-slate-200 flex flex-col overflow-hidden font-sans selection:bg-indigo-500 selection:text-white" id="main-container">
      {/* Top Header Navigation */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-slate-800 bg-[#1e293b] shrink-0" id="header-bar">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center font-bold text-white shadow-md shadow-indigo-900/30">
            D
          </div>
          <h1 className="text-sm sm:text-base font-semibold tracking-tight text-white flex items-center gap-1.5">
            <span>DevOps Masterclass</span>
            <span className="text-slate-500 font-normal">/ concept_{activeQuestion.id.toString().padStart(2, '0')}.md</span>
          </h1>
        </div>

        {/* Global Study Progress Dashboard */}
        <div className="flex items-center gap-4" id="top-progress-dashboard">
          <div className="px-3 py-1 bg-slate-700/60 rounded-full text-[11px] sm:text-xs flex items-center gap-2 border border-slate-600/50">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-slate-300 font-medium">
              <span className="font-bold text-white">{progressPercent}%</span> Mastered ({readCount}/{totalCount})
            </span>
          </div>

          <button 
            onClick={resetProgress}
            title="Reset All Study Data"
            className="w-8 h-8 rounded-full bg-slate-700/40 border border-slate-600/50 hover:border-rose-500 hover:text-rose-400 flex items-center justify-center text-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Grid Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden" id="main-grid-layout">
        
        {/* Left Side Question & Filter Navigation (Bento Sidebar) */}
        <aside className="w-full lg:w-80 bg-[#0f172a] lg:border-r border-slate-800 p-4 flex flex-col gap-3 overflow-y-auto shrink-0" id="left-filter-sidebar">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Search & Scan Filters</div>
          
          {/* Live search input */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search concepts, questions..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1e293b] border border-slate-800 rounded-lg py-1.5 pl-8.5 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
            />
            <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500" />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-2.5 top-2.5 text-slate-500 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filters Grid */}
          <div className="space-y-2">
            <div className="flex gap-1.5 flex-wrap">
              <button 
                onClick={() => setFilterBookmarkedOnly(!filterBookmarkedOnly)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold border transition-all ${
                  filterBookmarkedOnly 
                    ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30' 
                    : 'bg-[#1e293b] text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <Bookmark className="w-3 h-3 fill-current" />
                <span>Bookmarked ({bookmarkCount})</span>
              </button>

              <button 
                onClick={() => setFilterUnreadOnly(!filterUnreadOnly)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold border transition-all ${
                  filterUnreadOnly 
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' 
                    : 'bg-[#1e293b] text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-3 h-3" />
                <span>Not Mastered</span>
              </button>
            </div>

            {/* Category Dropdown */}
            <div className="relative">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#1e293b] border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="All">All Categories ({totalCount})</option>
                {categoryMetrics.map(cat => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name} ({cat.completed}/{cat.total})
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty selector */}
            <div className="grid grid-cols-4 gap-1">
              {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`py-1 rounded text-[10px] font-bold border text-center transition-all ${
                    selectedDifficulty === diff 
                      ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300 font-extrabold' 
                      : 'bg-[#1e293b] border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">Scanned Concepts ({filteredQuestions.length})</div>
          
          {/* Scrollable Questions list matching Scanned Concepts sidebar theme */}
          <div className="flex-1 space-y-2 overflow-y-auto pr-1 scrollbar-thin" id="question-list-container">
            {filteredQuestions.map((q) => {
              const isActive = q.id === activeQuestionId;
              const isBookmarked = bookmarkedIds.includes(q.id);
              const isRead = readIds.includes(q.id);

              return (
                <div
                  key={q.id}
                  id={`q-card-${q.id}`}
                  onClick={() => setActiveQuestionId(q.id)}
                  className={`p-3 cursor-pointer rounded-lg border transition-all relative flex flex-col gap-1.5 ${
                    isActive 
                      ? 'bg-indigo-500/10 border-indigo-500/30' 
                      : 'hover:bg-slate-800/50 border-transparent'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className={`text-xs font-medium leading-snug ${isActive ? 'text-indigo-300' : 'text-slate-300'}`}>
                      {q.id.toString().padStart(2, '0')}. {q.question}
                    </span>
                    
                    {/* Mastery and bookmark quick toggles */}
                    <div className="flex items-center gap-1 shrink-0 mt-0.5">
                      <button 
                        onClick={(e) => toggleReadStatus(q.id, e)}
                        title={isRead ? "Mark Not Mastered" : "Mark Mastered"}
                        className="p-0.5 rounded hover:bg-slate-800/80 text-slate-600 hover:text-emerald-400 transition-colors"
                      >
                        <CheckCircle2 className={`w-3.5 h-3.5 ${isRead ? 'text-emerald-500 fill-emerald-500/10' : 'text-slate-600'}`} />
                      </button>
                      <button 
                        onClick={(e) => toggleBookmark(q.id, e)}
                        title="Bookmark Concept"
                        className="p-0.5 rounded hover:bg-slate-800/80 text-slate-600 hover:text-indigo-400 transition-colors"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current text-indigo-500' : 'text-slate-600'}`} />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[9px] uppercase tracking-wider font-mono text-slate-500">
                    <span className="truncate max-w-[150px]">{q.category}</span>
                    <span className={
                      q.difficulty === 'Easy' ? 'text-emerald-500' :
                      q.difficulty === 'Medium' ? 'text-amber-500' : 'text-rose-500'
                    }>{q.difficulty}</span>
                  </div>
                </div>
              );
            })}
            
            {filteredQuestions.length === 0 && (
              <div className="text-center py-8 text-xs text-slate-500 italic">
                No matching scanned concepts.
              </div>
            )}
          </div>

          <div className="mt-auto p-3 bg-slate-900/60 rounded-xl border border-slate-800 shrink-0">
            <div className="text-[10px] text-slate-400 italic leading-snug">
              "MD-Scan completed scanning 100 core concepts. Ready for review."
            </div>
          </div>
        </aside>

        {/* Right Area: Main Bento Content Grid */}
        <main className="flex-1 p-6 grid grid-cols-1 xl:grid-cols-3 xl:grid-rows-6 gap-4 overflow-y-auto scrollbar-thin bg-[#0f172a]" id="right-playground-view">
          
          {/* 1. Detailed Answer Card (col-span-2 row-span-3) */}
          <section className="col-span-1 xl:col-span-2 xl:row-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-lg shadow-slate-950/20" id="question-inspector-card">
            <div className="flex items-center justify-between gap-2 mb-4 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-indigo-400 text-xs font-mono font-bold tracking-widest">
                  [CONCEPT_{activeQuestion.id.toString().padStart(2, '0')}]
                </span>
                <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border ${
                  activeQuestion.difficulty === 'Easy' ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/50' :
                  activeQuestion.difficulty === 'Medium' ? 'bg-amber-950/40 text-amber-400 border-amber-900/50' :
                  'bg-rose-950/40 text-rose-400 border-rose-900/50'
                }`}>
                  {activeQuestion.difficulty}
                </span>
                <span className="text-slate-500 text-xs hidden sm:inline">•</span>
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider hidden sm:inline">
                  {activeQuestion.category}
                </span>
              </div>

              {/* Status selectors */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => toggleReadStatus(activeQuestion.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                    readIds.includes(activeQuestion.id)
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{readIds.includes(activeQuestion.id) ? 'Mastered' : 'Mark Mastered'}</span>
                </button>

                <button 
                  onClick={() => toggleBookmark(activeQuestion.id)}
                  className="p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-white transition-all"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${bookmarkedIds.includes(activeQuestion.id) ? 'fill-indigo-500 text-indigo-400' : 'text-slate-400'}`} />
                </button>
              </div>
            </div>

            <div className="space-y-4 my-2">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                {activeQuestion.question}
              </h2>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">Standard Answer Summary</span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {activeQuestion.answer}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Detailed Architectural Context</span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeQuestion.explanation}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500">
              <span>Source: index_registry.md • Line {activeQuestion.id * 14 + 12}</span>
              <span>DevOps Interview Deck</span>
            </div>
          </section>

          {/* 2. Live Interactive Simulator Card (col-span-1 row-span-4) */}
          <section className="col-span-1 xl:col-span-1 xl:row-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col h-full overflow-hidden shadow-lg shadow-slate-950/20">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2.5 shrink-0">
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Interactive Topology</div>
                <div className="text-xs font-semibold text-slate-300">Live Simulator Engine</div>
              </div>
              <span className="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/30 rounded text-[9px] text-indigo-400 font-mono font-bold animate-pulse">
                CONNECTED
              </span>
            </div>
            
            {/* Embedded Playground */}
            <div className="flex-1 min-h-0">
              <Playground initialType={activeQuestion.diagramType} />
            </div>

            <div className="mt-3 text-[10px] text-center text-slate-500 italic uppercase tracking-tighter shrink-0">
              Interactive environment linked to active scenario
            </div>
          </section>

          {/* 3. Example Snippet Card (col-span-1 row-span-3) */}
          <section className="col-span-1 xl:col-span-1 xl:row-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-lg shadow-slate-950/20">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" /> Scenario Code Spec
              </span>
              <button 
                onClick={() => copyExample(activeQuestion.example, activeQuestion.id)}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
              >
                {copiedId === activeQuestion.id ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="flex-1 bg-slate-950 p-4 rounded-xl font-mono text-[11px] leading-relaxed border border-slate-800 overflow-y-auto scrollbar-thin max-h-48 xl:max-h-none">
              <div className="text-slate-500 mb-1">// Spec config syntax</div>
              <pre className="text-emerald-400 whitespace-pre-wrap">{activeQuestion.example || `// Practice command:\nkubectl describe pod -l app=${activeQuestion.diagramType}`}</pre>
            </div>
            
            <div className="mt-3 text-[10px] text-slate-500 uppercase tracking-tighter">
              Verify this layout inside the live topology view
            </div>
          </section>

          {/* 4. Mastery Status & Quick Metrics Card (col-span-1 row-span-2) */}
          <section className="col-span-1 xl:col-span-1 xl:row-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-lg shadow-slate-950/20">
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Category Metrics & Insights</div>
              
              {/* Dynamic progress rendering */}
              {(() => {
                const currentCatMetrics = categoryMetrics.find(c => c.name === activeQuestion.category) || { completed: 0, total: 1, percent: 0 };
                return (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs p-2 bg-[#1e293b]/40 border border-slate-800/80 rounded">
                      <span className="text-indigo-300 font-medium">Topic Mastery</span>
                      <span className="text-slate-400 font-semibold font-mono">{currentCatMetrics.completed} / {currentCatMetrics.total} ({currentCatMetrics.percent}%)</span>
                    </div>
                    
                    {/* Progress visual bar */}
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800/30">
                      <div className="bg-indigo-500 h-full transition-all duration-500" style={{ width: `${currentCatMetrics.percent}%` }} />
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Dynamic SRE Category Tip */}
            {(() => {
              const tipInfo = getCategoryTip(activeQuestion.category);
              return (
                <div className="mt-3 p-3 bg-indigo-500/5 rounded-lg border border-indigo-500/10 flex gap-2">
                  <Zap className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold text-indigo-300 block uppercase tracking-wider">{tipInfo.title}</span>
                    <p className="text-[10px] text-slate-400 leading-normal mt-0.5">{tipInfo.tip}</p>
                  </div>
                </div>
              );
            })()}
          </section>

          {/* 5. Action Quick Bar (col-span-1 row-span-1) */}
          <section className="col-span-1 xl:col-span-1 xl:row-span-1 flex gap-4">
            <button 
              onClick={() => {
                const prevId = activeQuestion.id <= 1 ? 100 : activeQuestion.id - 1;
                setActiveQuestionId(prevId);
              }}
              className="flex-1 bg-slate-800 text-slate-300 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-slate-700 hover:text-white border border-slate-700/80 transition-all text-xs font-bold uppercase tracking-widest gap-1 active:scale-95"
            >
              <span>← Prev Concept</span>
            </button>
            
            <button 
              onClick={() => {
                const nextId = activeQuestion.id >= 100 ? 1 : activeQuestion.id + 1;
                setActiveQuestionId(nextId);
              }}
              className="flex-1 bg-indigo-600 text-white rounded-2xl flex items-center justify-center cursor-pointer hover:bg-indigo-500 transition-all text-xs font-bold uppercase tracking-widest gap-1 shadow-lg shadow-indigo-950/40 active:scale-95"
            >
              <span>Next Concept →</span>
            </button>
          </section>

        </main>
      </div>
    </div>
  );
}

