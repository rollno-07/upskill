import { useState, useEffect, useMemo, useRef } from 'react';
import { 
  questions, 
  QuestionData 
} from './data/questions';
import { DiagramContainer } from './components/Diagrams';
import { 
  Search, 
  BookMarked, 
  Award, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Layers, 
  Code, 
  Terminal, 
  Layout, 
  Copy, 
  Check, 
  RotateCcw, 
  Filter,
  CheckCircle2,
  Bookmark,
  Info,
  Sliders,
  Database,
  Shuffle,
  Shield,
  HelpCircle,
  TrendingUp,
  Cpu,
  Tv
} from 'lucide-react';

export default function App() {
  // Persistence state
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('zustand_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [masteredIds, setMasteredIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('zustand_mastered');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // active state
  const [activeId, setActiveId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filterMode, setFilterMode] = useState<'all' | 'bookmarks' | 'mastered' | 'diagrams'>('all');
  
  // Custom interactive scanner HUD state
  const [scannerActive, setScannerActive] = useState(false);
  const [scanningKeyword, setScanningKeyword] = useState<string | null>(null);
  const [scannedResults, setScannedResults] = useState<QuestionData[]>([]);
  const [scanPulse, setScanPulse] = useState(false);

  // Study Flashcard / Practice mode state
  const [studyMode, setStudyMode] = useState(false);
  const [studyPool, setStudyPool] = useState<number[]>([]);
  const [studyIndex, setStudyIndex] = useState(0);
  const [revealAnswer, setRevealAnswer] = useState(false);

  // Copy code feedback
  const [copiedCode, setCopiedCode] = useState(false);

  // Auto-scrolling the question details to top on changes
  const detailContainerRef = useRef<HTMLDivElement>(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('zustand_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  useEffect(() => {
    localStorage.setItem('zustand_mastered', JSON.stringify(masteredIds));
  }, [masteredIds]);

  // Find active question object
  const activeQuestion = useMemo(() => {
    return questions.find(q => q.id === activeId) || questions[0];
  }, [activeId]);

  // Scroll to top on change
  useEffect(() => {
    if (detailContainerRef.current) {
      detailContainerRef.current.scrollTop = 0;
    }
    setRevealAnswer(false);
  }, [activeId]);

  // Category unique list
  const categories = useMemo(() => {
    const list = new Set(questions.map(q => q.category));
    return ['All', ...Array.from(list)];
  }, []);

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      // search query matches question, short answer, detailed answer, code or category
      const matchesSearch = 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.shortAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.detailedAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.id.toString() === searchQuery.trim();

      const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;

      const matchesFilterMode = 
        filterMode === 'all' ? true :
        filterMode === 'bookmarks' ? bookmarkedIds.includes(q.id) :
        filterMode === 'mastered' ? masteredIds.includes(q.id) :
        !!q.diagramId; // has diagram

      return matchesSearch && matchesCategory && matchesFilterMode;
    });
  }, [searchQuery, selectedCategory, filterMode, bookmarkedIds, masteredIds]);

  // Bookmark toggler
  const toggleBookmark = (id: number) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Mastery toggler
  const toggleMastered = (id: number) => {
    setMasteredIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Study Practice Session trigger
  const startStudySession = (randomize: boolean) => {
    const ids = filteredQuestions.map(q => q.id);
    if (ids.length === 0) return;
    
    let pool = [...ids];
    if (randomize) {
      // Fisher-Yates shuffle
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
    }
    setStudyPool(pool);
    setStudyIndex(0);
    setActiveId(pool[0]);
    setStudyMode(true);
    setRevealAnswer(false);
  };

  const nextStudyQuestion = () => {
    if (studyIndex < studyPool.length - 1) {
      const nextIdx = studyIndex + 1;
      setStudyIndex(nextIdx);
      setActiveId(studyPool[nextIdx]);
      setRevealAnswer(false);
    }
  };

  const prevStudyQuestion = () => {
    if (studyIndex > 0) {
      const prevIdx = studyIndex - 1;
      setStudyIndex(prevIdx);
      setActiveId(studyPool[prevIdx]);
      setRevealAnswer(false);
    }
  };

  // Interactive concept scanner simulator
  const runKeywordScan = (keyword: string) => {
    setScanningKeyword(keyword);
    setScanPulse(true);
    setScannerActive(true);
    
    // Filter questions mapped to keyword
    setTimeout(() => {
      const hits = questions.filter(q => 
        q.question.toLowerCase().includes(keyword.toLowerCase()) ||
        q.detailedAnswer.toLowerCase().includes(keyword.toLowerCase()) ||
        (q.codeExample && q.codeExample.toLowerCase().includes(keyword.toLowerCase()))
      );
      setScannedResults(hits);
      setScanPulse(false);
    }, 600);
  };

  // Copy Code handler
  const handleCopyCode = (text?: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#070708] text-white flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* 1. MASTER HEADER CONTROL PANEL */}
      <header className="border-b border-white/5 bg-[#0a0a0c]/90 backdrop-blur-md sticky top-0 z-40 px-4 md:px-6 py-3.5 flex flex-wrap gap-4 items-center justify-between">
        
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-cyan-500 to-cyan-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.15)] border border-cyan-400/20">
            <Cpu className="w-5 h-5 text-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-black uppercase tracking-wider font-display">Zustand Masterclass</h1>
              <span className="text-[9px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-900/30 px-1.5 py-0.5 rounded uppercase">v4.x Console</span>
            </div>
            <p className="text-[11px] text-white/40">Interactive 60 Q&A concept scanner & core flow architecture</p>
          </div>
        </div>

        {/* HUD Telemetry indicators */}
        <div className="hidden lg:flex items-center gap-4 text-[10px] font-mono border-l border-white/5 pl-5">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-white/30">ENGINE:</span>
            <span className="text-white/70">PROD</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-white/30">RE-RENDER CAP:</span>
            <span className="text-cyan-400">0% PROV-FREE</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-white/30">SUBSCRIBERS:</span>
            <span className="text-cyan-400 font-bold">SELECTIVE</span>
          </div>
        </div>

        {/* Global Progress Metrics card */}
        <div className="flex items-center gap-3">
          <div className="bg-white/5 border border-white/5 rounded-lg px-2.5 py-1 flex items-center gap-1.5 text-xs">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <div className="font-mono">
              <span className="text-white/40">Mastered:</span> <span className="text-cyan-300 font-bold">{masteredIds.length}</span><span className="text-white/20">/60</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-lg px-2.5 py-1 flex items-center gap-1.5 text-xs">
            <Bookmark className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/10" />
            <div className="font-mono">
              <span className="text-white/40">Saved:</span> <span className="text-cyan-300 font-bold">{bookmarkedIds.length}</span>
            </div>
          </div>

          <button 
            onClick={() => {
              setBookmarkedIds([]);
              setMasteredIds([]);
              localStorage.removeItem('zustand_bookmarks');
              localStorage.removeItem('zustand_mastered');
            }}
            title="Reset progress"
            className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-white/50 hover:text-white transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-0 overflow-hidden">
        
        {/* 2. LEFT PANEL: SEARCH, STUDY, LIST (xl:col-span-4) */}
        <div className="xl:col-span-4 border-r border-white/5 bg-[#08080a] flex flex-col h-[calc(100vh-69px)] overflow-y-auto">
          
          {/* SEARCH & FILTERS SECTION */}
          <div className="p-4 border-b border-white/5 bg-[#0c0c0f]/90 space-y-3 sticky top-0 z-10">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-white/30 absolute left-3 top-2.5" />
              <input 
                type="text"
                placeholder="Search 60 masterclass topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#121216] border border-white/5 hover:border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-cyan-500 transition-all font-mono"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2 text-[10px] text-white/40 hover:text-white font-mono bg-white/5 px-1 rounded"
                >
                  clear
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="grid grid-cols-1 gap-1.5">
              <div className="text-[10px] uppercase font-bold text-white/40 tracking-wider font-mono flex items-center justify-between">
                <span>Select Category</span>
                <span className="text-[9px] font-normal text-white/30">Total: {filteredQuestions.length} matched</span>
              </div>
              <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-thin">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 text-[11px] rounded-full border whitespace-nowrap transition-all ${
                      selectedCategory === cat 
                        ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 font-medium' 
                        : 'bg-[#121216] border-white/5 text-white/40 hover:border-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Mode Switchers */}
            <div className="grid grid-cols-4 gap-1 bg-[#121216] p-1 rounded-lg border border-white/5">
              {[
                { mode: 'all', label: 'All 60' },
                { mode: 'bookmarks', label: 'Saved' },
                { mode: 'mastered', label: 'Mastered' },
                { mode: 'diagrams', label: 'Flows' },
              ].map(f => (
                <button
                  key={f.mode}
                  onClick={() => setFilterMode(f.mode as any)}
                  className={`py-1 text-[10px] font-mono uppercase rounded transition-all ${
                    filterMode === f.mode 
                      ? 'bg-cyan-600 text-black font-bold' 
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* CONCEPT QUICK-SCANNER HUB */}
          <div className="px-4 py-3 border-b border-white/5 bg-[#09090c] space-y-2">
            <div className="text-[10px] uppercase font-bold text-white/30 tracking-widest font-mono flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> State Engine Quick Scan
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Selector', 
                'Shallow', 
                'Immer', 
                'Persist', 
                'Async', 
                'Slice', 
                'Subscribe',
                'Zundo'
              ].map(word => (
                <button 
                  key={word}
                  onClick={() => runKeywordScan(word)}
                  className={`px-2 py-0.5 text-[10px] rounded font-mono border transition-all ${
                    scanningKeyword === word && scannerActive
                      ? 'bg-yellow-500/10 border-yellow-500 text-yellow-400 font-bold'
                      : 'bg-white/5 border-white/5 text-white/50 hover:bg-white/10 hover:border-white/10'
                  }`}
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          {/* QUICK-SCANNER HUD DISPLAY */}
          {scannerActive && (
            <div className="mx-4 mt-3 p-3 bg-[#131209]/40 border border-yellow-500/20 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-yellow-400">
                <span className="flex items-center gap-1"><Terminal className="w-3 h-3 animate-pulse" /> SCANNER ANALYZING: "{scanningKeyword}"</span>
                <button onClick={() => { setScannerActive(false); setScanningKeyword(null); }} className="text-white/30 hover:text-white">✕</button>
              </div>
              <div className="text-[10px] text-white/50 leading-relaxed font-mono">
                Found <span className="text-yellow-400 font-bold">{scannedResults.length}</span> question associations. Click below to inspect:
              </div>
              <div className="space-y-1 max-h-24 overflow-y-auto">
                {scannedResults.map(q => (
                  <button 
                    key={q.id}
                    onClick={() => {
                      setActiveId(q.id);
                      setStudyMode(false);
                    }}
                    className="w-full text-left p-1 rounded hover:bg-white/5 text-[10px] font-mono text-cyan-300 flex items-center gap-1 truncate"
                  >
                    <span className="text-white/40">Q{q.id}:</span> {q.question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STUDY / FLASHCARD CONTROL BANNER */}
          <div className="m-4 p-3.5 bg-gradient-to-br from-cyan-950/40 to-[#0e0c1a] border border-cyan-500/15 rounded-xl space-y-2.5">
            <div className="flex justify-between items-center">
              <div className="text-xs font-bold text-white font-display flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-cyan-400" /> Practice Session Mode
              </div>
              <span className="text-[9px] font-mono text-white/30">Auto scoring active</span>
            </div>
            
            <p className="text-[11px] text-white/60 leading-normal">
              Go through a randomized stream of your active question selection. Test your recall.
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => startStudySession(true)}
                className="py-1.5 bg-cyan-600 hover:bg-cyan-500 text-black font-bold rounded text-[10px] uppercase tracking-wider font-display flex items-center justify-center gap-1 transition-all"
              >
                <Shuffle className="w-3 h-3" /> Shuffle Practice
              </button>
              <button 
                onClick={() => startStudySession(false)}
                className="py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded text-[10px] uppercase tracking-wider font-display flex items-center justify-center gap-1 transition-all"
              >
                <Layers className="w-3 h-3" /> Linear Study
              </button>
            </div>
          </div>

          {/* THE QUESTIONS LIST */}
          <div className="flex-1">
            <div className="px-4 py-2 text-[10px] font-bold text-white/30 uppercase tracking-widest font-mono border-b border-white/5 flex justify-between">
              <span>Matched Questions List</span>
              <span>{filteredQuestions.length} Questions</span>
            </div>

            {filteredQuestions.length === 0 ? (
              <div className="p-8 text-center text-white/30 space-y-2">
                <HelpCircle className="w-8 h-8 mx-auto text-white/10" />
                <p className="text-xs">No questions matched search criteria.</p>
                <button 
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setFilterMode('all'); }} 
                  className="text-xs text-cyan-400 hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {filteredQuestions.map(q => {
                  const isActive = q.id === activeId && !studyMode;
                  const isSaved = bookmarkedIds.includes(q.id);
                  const isDone = masteredIds.includes(q.id);

                  return (
                    <div 
                      key={q.id}
                      onClick={() => {
                        setActiveId(q.id);
                        setStudyMode(false);
                      }}
                      className={`p-3.5 text-left transition-all cursor-pointer flex gap-3 relative ${
                        isActive 
                          ? 'bg-gradient-to-r from-cyan-950/20 to-black border-l-4 border-cyan-500' 
                          : 'hover:bg-white/5 border-l-4 border-transparent'
                      }`}
                    >
                      {/* Left Badge */}
                      <div className="flex flex-col items-center">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-[11px] font-bold ${
                          isActive 
                            ? 'bg-cyan-500 text-black' 
                            : 'bg-white/5 text-white/60'
                        }`}>
                          {q.id}
                        </div>
                      </div>

                      {/* Content block */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono text-white/40 truncate max-w-[150px]">{q.category}</span>
                          <div className="flex items-center gap-1 shrink-0">
                            {q.diagramId && (
                              <span className="text-[8px] font-mono bg-cyan-950/60 text-cyan-400 border border-cyan-900/30 px-1 rounded uppercase font-bold">Flow</span>
                            )}
                            {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
                            {isSaved && <Bookmark className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />}
                          </div>
                        </div>

                        <h3 className={`text-xs font-semibold leading-relaxed truncate ${isActive ? 'text-cyan-300' : 'text-white/80'}`}>
                          {q.question}
                        </h3>

                        <p className="text-[10px] text-white/40 line-clamp-1 leading-snug font-mono">
                          {q.shortAnswer}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* 3. RIGHT PANEL: CORE STUDY WORKSPACE (xl:col-span-8) */}
        <div ref={detailContainerRef} className="xl:col-span-8 bg-[#040405] overflow-y-auto h-[calc(100vh-69px)] flex flex-col">
          
          {/* FLASHCARD PRACTICE MODE INTERFACE */}
          {studyMode && (
            <div className="bg-gradient-to-b from-[#09090d] to-black border-b border-cyan-500/10 p-5 md:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></span> 
                  Active Study Streak: {studyIndex + 1} of {studyPool.length}
                </div>
                <button 
                  onClick={() => setStudyMode(false)}
                  className="text-xs bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded text-white/60 transition-all font-mono"
                >
                  Exit Practice
                </button>
              </div>

              {/* Question card */}
              <div className="bg-[#0f0f13] border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-2 right-3 font-mono text-[9px] text-white/20">Zustand Session Pool</div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase">{activeQuestion.category}</span>
                <h2 className="text-base md:text-lg font-bold text-white mt-1 font-display">
                  {activeQuestion.question}
                </h2>

                {/* Show Answer Trigger */}
                <div className="mt-5 pt-4 border-t border-white/5 flex flex-col items-center">
                  {!revealAnswer ? (
                    <button 
                      onClick={() => setRevealAnswer(true)}
                      className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-cyan-500 text-black font-bold text-xs uppercase tracking-widest rounded-full font-display shadow-lg hover:shadow-cyan-500/10 transition-all animate-pulse"
                    >
                      Reveal Masterclass Answer
                    </button>
                  ) : (
                    <div className="w-full space-y-3 text-left animate-fade-in">
                      <div className="bg-cyan-950/30 p-4 rounded-xl border border-cyan-500/20">
                        <span className="text-[9px] font-mono text-cyan-400 uppercase block font-bold mb-1">Standard Short Answer</span>
                        <p className="text-xs leading-relaxed text-cyan-100 font-mono">{activeQuestion.shortAnswer}</p>
                      </div>

                      <div className="text-xs text-white/70 leading-relaxed">
                        <span className="text-[9px] font-mono text-white/40 uppercase block font-bold mb-1">Detailed Explanation</span>
                        {activeQuestion.detailedAnswer}
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button 
                          onClick={() => toggleMastered(activeQuestion.id)}
                          className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all flex items-center justify-center gap-1.5 ${
                            masteredIds.includes(activeQuestion.id)
                              ? 'bg-green-950/60 border-green-500 text-green-300'
                              : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" /> 
                          {masteredIds.includes(activeQuestion.id) ? 'Mastered!' : 'Mark as Mastered'}
                        </button>

                        <button 
                          onClick={() => toggleBookmark(activeQuestion.id)}
                          className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                            bookmarkedIds.includes(activeQuestion.id)
                              ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300'
                              : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                          }`}
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation arrows */}
              <div className="flex justify-between items-center">
                <button 
                  onClick={prevStudyQuestion}
                  disabled={studyIndex === 0}
                  className="px-4 py-2 bg-[#0c0c10] border border-white/5 rounded-lg text-xs font-mono disabled:opacity-30 text-white flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Prev
                </button>
                <div className="text-xs font-mono text-white/40">
                  {studyIndex + 1} / {studyPool.length} completed
                </div>
                <button 
                  onClick={nextStudyQuestion}
                  disabled={studyIndex === studyPool.length - 1}
                  className="px-4 py-2 bg-[#0c0c10] border border-white/5 rounded-lg text-xs font-mono disabled:opacity-30 text-white flex items-center gap-1"
                >
                  Next <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* ACTIVE QUESTION BANNER */}
          <div className="p-5 md:p-7 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#050507]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-900/30 uppercase font-bold">
                  Q&A Topic #{activeQuestion.id}
                </span>
                <span className="text-xs font-semibold text-white/50">{activeQuestion.category}</span>
              </div>
              <h2 className="text-lg md:text-xl font-black text-white font-display tracking-tight leading-tight">
                {activeQuestion.question}
              </h2>
            </div>

            {/* Quick Bookmark / Mark Mastered selectors */}
            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={() => toggleBookmark(activeQuestion.id)}
                className={`p-2 rounded-xl border transition-all ${
                  bookmarkedIds.includes(activeQuestion.id)
                    ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300'
                    : 'bg-white/5 border-white/5 text-white/40 hover:border-white/10 hover:text-white'
                }`}
                title="Bookmark for review"
              >
                <Bookmark className={`w-4 h-4 ${bookmarkedIds.includes(activeQuestion.id) ? 'fill-cyan-400/20' : ''}`} />
              </button>

              <button 
                onClick={() => toggleMastered(activeQuestion.id)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold font-display transition-all flex items-center gap-1.5 ${
                  masteredIds.includes(activeQuestion.id)
                    ? 'bg-green-950/60 border-green-500 text-green-300'
                    : 'bg-white/5 border-white/5 text-white/60 hover:border-white/10 hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                {masteredIds.includes(activeQuestion.id) ? 'Mastered!' : 'Mark Mastered'}
              </button>
            </div>
          </div>

          {/* SPLIT SECTION: DETAILED EXPLANATION & SCHEMAS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
            
            {/* Left side: Answer, code example (col-span-7) */}
            <div className="lg:col-span-7 p-5 md:p-6 space-y-5">
              
              {/* Short Answer Block */}
              <div className="bg-gradient-to-r from-cyan-950/15 via-[#0e0c14] to-black p-4 rounded-xl border border-cyan-500/10 space-y-1.5">
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-widest flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" /> Conceptual Summary
                </span>
                <p className="text-xs text-white/90 leading-relaxed font-mono">
                  {activeQuestion.shortAnswer}
                </p>
              </div>

              {/* Detailed Explanation */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest block font-bold">Comprehensive Analysis</span>
                <p className="text-xs text-white/70 leading-relaxed whitespace-pre-line">
                  {activeQuestion.detailedAnswer}
                </p>
              </div>

              {/* Code Example Stage */}
              {activeQuestion.codeExample && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono text-white/30">
                    <span className="uppercase font-bold tracking-wider flex items-center gap-1"><Code className="w-3.5 h-3.5 text-cyan-400" /> code-blueprint.ts</span>
                    <button 
                      onClick={() => handleCopyCode(activeQuestion.codeExample)}
                      className="flex items-center gap-1 px-2 py-0.5 hover:bg-white/5 rounded text-[10px] border border-white/5 text-white/50 hover:text-white transition-all"
                    >
                      {copiedCode ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                      {copiedCode ? 'Copied' : 'Copy code'}
                    </button>
                  </div>

                  <div className="bg-black/80 rounded-xl overflow-hidden border border-white/5 font-mono text-[11px] leading-relaxed p-4 text-cyan-100 relative group max-h-[350px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap">{activeQuestion.codeExample}</pre>
                  </div>
                </div>
              )}
            </div>

            {/* Right side: Interactive diagram container (col-span-5) */}
            <div className="lg:col-span-5 p-5 md:p-6 bg-[#040405] space-y-4 flex flex-col justify-between">
              
              <div className="space-y-4 flex-1">
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest font-bold flex items-center justify-between border-b border-white/5 pb-1.5">
                  <span className="flex items-center gap-1"><Layers className="w-3.5 h-3.5 text-cyan-400" /> Real-time architecture flow</span>
                  <span className="text-[9px] font-normal text-cyan-400 font-mono uppercase bg-cyan-950/30 px-1.5 rounded">interactive</span>
                </div>

                <div className="bg-[#09090c] border border-white/5 rounded-2xl p-4 min-h-[320px] flex-1 flex flex-col justify-between shadow-inner relative overflow-hidden">
                  <div className="absolute top-2 right-2 flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  </div>
                  
                  <DiagramContainer id={activeQuestion.diagramId} />
                </div>
              </div>

              {/* Small educational note at the bottom */}
              <div className="bg-[#121216]/50 rounded-xl p-3 border border-white/5 text-[10px] text-white/40 leading-normal font-mono flex items-start gap-2">
                <Shield className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                <span>
                  This sandbox simulates how Zustand maintains store closure. Mutating variables outside React notifications instantly fires selective hooks without full reconciliation lag.
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-[#050506] px-4 py-2 flex justify-between items-center text-[10px] font-mono text-white/30">
        <div>ZUSTAND INTERACTIVE MASTERCLASS CONSOLE © 2026</div>
        <div>60 QUESTIONS COMPLETE • HIGHLY VISUAL SCANNERS</div>
      </footer>
    </div>
  );
}
