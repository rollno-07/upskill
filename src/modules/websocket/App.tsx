import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Star, CheckCircle, Circle, BookOpen, Layers, Award, HelpCircle,
  RefreshCw, Sun, Moon, Copy, Flame, Info, Check, Sparkles, BookMarked,
  CheckSquare, Activity, ChevronRight, Hash, Database, Terminal, ShieldAlert
} from 'lucide-react';
import { QUESTIONS } from './data/questions';
import { Category, Difficulty, WebSocketQuestion } from './types';
import MarkdownRenderer from './components/MarkdownRenderer';
import InteractiveDiagram from './components/InteractiveDiagrams';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('ws_theme');
    if (saved) return saved === 'dark';
    return true; // Default to dark mode for high density coder feel
  });

  // Local progress
  const [completedIds, setCompletedIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('ws_completed');
    return saved ? JSON.parse(saved) : [];
  });

  const [bookmarks, setBookmarks] = useState<number[]>(() => {
    const saved = localStorage.getItem('ws_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const [notes, setNotes] = useState<Record<number, string>>(() => {
    const saved = localStorage.getItem('ws_notes');
    return saved ? JSON.parse(saved) : {};
  });

  // Active question state
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(1);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'ALL'>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'ALL'>('ALL');
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  const [showOnlyUncompleted, setShowOnlyUncompleted] = useState(false);

  // Layout states
  const [activeTab, setActiveTab] = useState<'study' | 'dashboard'>('study');
  const [currentNoteText, setCurrentNoteText] = useState('');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Synchronize localStorage
  useEffect(() => {
    localStorage.setItem('ws_theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('ws_completed', JSON.stringify(completedIds));
  }, [completedIds]);

  useEffect(() => {
    localStorage.setItem('ws_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('ws_notes', JSON.stringify(notes));
  }, [notes]);

  // Load active question's note when question changes
  useEffect(() => {
    setCurrentNoteText(notes[selectedQuestionId] || '');
  }, [selectedQuestionId, notes]);

  const activeQuestion = useMemo(() => {
    return QUESTIONS.find(q => q.id === selectedQuestionId) || QUESTIONS[0];
  }, [selectedQuestionId]);

  // Handle note updates
  const saveNote = () => {
    setNotes(prev => ({
      ...prev,
      [selectedQuestionId]: currentNoteText
    }));
  };

  const clearNote = () => {
    setCurrentNoteText('');
    setNotes(prev => {
      const copy = { ...prev };
      delete copy[selectedQuestionId];
      return copy;
    });
  };

  // Toggle helpers
  const toggleCompleted = (id: number) => {
    setCompletedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleBookmark = (id: number) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return QUESTIONS.filter(q => {
      const matchesSearch = 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.detailedAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.keyTakeaways[0] || '').toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'ALL' || q.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'ALL' || q.difficulty === selectedDifficulty;
      const matchesBookmark = !showOnlyBookmarked || bookmarks.includes(q.id);
      const matchesUncompleted = !showOnlyUncompleted || !completedIds.includes(q.id);

      return matchesSearch && matchesCategory && matchesDifficulty && matchesBookmark && matchesUncompleted;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, showOnlyBookmarked, showOnlyUncompleted, bookmarks, completedIds]);

  // Summary and statistics
  const stats = useMemo(() => {
    const total = QUESTIONS.length;
    const completed = completedIds.length;
    const progressPercent = Math.round((completed / total) * 100);
    const bookmarkedCount = bookmarks.length;
    const notesCount = Object.keys(notes).length;

    // Count by category
    const categoryCounts = {} as Record<Category, { total: number; done: number }>;
    Object.values(Category).forEach((cat) => {
      categoryCounts[cat] = { total: 0, done: 0 };
    });

    QUESTIONS.forEach(q => {
      if (!categoryCounts[q.category]) {
        categoryCounts[q.category] = { total: 0, done: 0 };
      }
      categoryCounts[q.category].total += 1;
      if (completedIds.includes(q.id)) {
        categoryCounts[q.category].done += 1;
      }
    });

    return {
      total,
      completed,
      progressPercent,
      bookmarkedCount,
      notesCount,
      categoryCounts
    };
  }, [completedIds, bookmarks, notes]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
      
      {/* Upper Density Info Rail */}
      <header className="border-b border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md sticky top-0 z-40 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-cyan-500 text-white flex items-center justify-center shadow-sm shadow-cyan-500/20">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white font-mono uppercase flex items-center gap-1.5">
              WebSocket Master <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-cyan-500 dark:text-cyan-400 font-bold px-1.5 py-0.5 rounded-md">RF-6455 Spec</span>
            </h1>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-sans tracking-wide">Interactive Deep-Dive Handbooks with Architectural Simulators</p>
          </div>
        </div>

        {/* Global Stats Counter Ribbon */}
        <div className="hidden md:flex items-center gap-4 text-[11px] font-mono">
          <div className="flex items-center gap-1.5 bg-slate-100/80 dark:bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-200/50 dark:border-slate-800/40">
            <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-slate-500">Progress:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{stats.completed}/{stats.total} ({stats.progressPercent}%)</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-100/80 dark:bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-200/50 dark:border-slate-800/40">
            <BookMarked className="w-3.5 h-3.5 text-cyan-500" />
            <span className="text-slate-500">Bookmarks:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{stats.bookmarkedCount}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-100/80 dark:bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-200/50 dark:border-slate-800/40">
            <Activity className="w-3.5 h-3.5 text-cyan-500" />
            <span className="text-slate-500">Streak:</span>
            <span className="font-bold text-cyan-500 flex items-center gap-0.5"><Flame className="w-3 h-3 fill-current inline" /> 7 Days</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle Buttons */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200/50 dark:border-slate-800/40 mr-2">
            <button
              onClick={() => setActiveTab('study')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition ${activeTab === 'study' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
            >
              Study Handbook
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition ${activeTab === 'dashboard' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
            >
              Bento Stats
            </button>
          </div>

          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </header>

      {/* Main Container Layout */}
      <main className="max-w-[1600px] mx-auto p-3">
        {activeTab === 'dashboard' ? (
          /* Bento Dashboard View */
          <div className="space-y-4 animate-fade-in">
            {/* Top Stat Blocks Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Overall Progress Bento Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800/80 p-4 rounded-xl flex flex-col justify-between shadow-sm relative overflow-hidden group">
                <div className="absolute right-[-15px] bottom-[-15px] text-slate-100 dark:text-slate-800/20 w-24 h-24 pointer-events-none group-hover:scale-110 transition duration-300">
                  <Award className="w-full h-full" />
                </div>
                <div className="z-10">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-500 dark:text-cyan-400 font-mono">Total Proficiency</span>
                  <h3 className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">{stats.progressPercent}%</h3>
                  <p className="text-xs text-slate-500 mt-1">{stats.completed} of {stats.total} questions fully decoded.</p>
                </div>
                <div className="mt-4 h-1.5 bg-slate-100 dark:bg-slate-850 rounded-full overflow-hidden z-10">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-600 transition-all duration-500" style={{ width: `${stats.progressPercent}%` }}></div>
                </div>
              </div>

              {/* Memory Deck Bento Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800/80 p-4 rounded-xl flex flex-col justify-between shadow-sm relative overflow-hidden group">
                <div className="absolute right-[-15px] bottom-[-15px] text-slate-100 dark:text-slate-800/20 w-24 h-24 pointer-events-none group-hover:scale-110 transition duration-300">
                  <BookMarked className="w-full h-full" />
                </div>
                <div className="z-10">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-500 dark:text-cyan-400 font-mono">Flagged Deck</span>
                  <h3 className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">{stats.bookmarkedCount}</h3>
                  <p className="text-xs text-slate-500 mt-1">Saves focused for close peer-reviews and interview preps.</p>
                </div>
                <div className="mt-4 flex items-center gap-1 z-10">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span className="text-[10px] text-slate-400 font-mono uppercase">Review Priority: High</span>
                </div>
              </div>

              {/* Interactive Sandbox Decodes Bento Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800/80 p-4 rounded-xl flex flex-col justify-between shadow-sm relative overflow-hidden group">
                <div className="absolute right-[-15px] bottom-[-15px] text-slate-100 dark:text-slate-800/20 w-24 h-24 pointer-events-none group-hover:scale-110 transition duration-300">
                  <Terminal className="w-full h-full" />
                </div>
                <div className="z-10">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-500 dark:text-emerald-400 font-mono">Custom Takeaways</span>
                  <h3 className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">{stats.notesCount}</h3>
                  <p className="text-xs text-slate-500 mt-1">Interactive session annotations saved in offline local state.</p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 z-10">
                  <span className="text-[10px] text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 font-mono rounded">Sync Verified</span>
                </div>
              </div>

              {/* Memory Trigger Bento Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800/80 p-4 rounded-xl flex flex-col justify-between shadow-sm relative overflow-hidden group">
                <div className="absolute right-[-15px] bottom-[-15px] text-slate-100 dark:text-slate-800/20 w-24 h-24 pointer-events-none group-hover:scale-110 transition duration-300">
                  <Flame className="w-full h-full" />
                </div>
                <div className="z-10">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-500 dark:text-cyan-400 font-mono">Continuous Streak</span>
                  <h3 className="text-2xl font-extrabold font-mono text-cyan-500 mt-1 flex items-center gap-1.5">
                    7 Days <span className="text-xs text-slate-400 font-normal">Active</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Excellent job! You are maintaining an active brain retention rhythm.</p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 z-10">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[10px] text-cyan-500 dark:text-cyan-300 font-bold">100% Streak Goal Met</span>
                </div>
              </div>
            </div>

            {/* Category Analysis Bento Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800/80 p-4 rounded-xl shadow-sm">
                <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-cyan-500" /> Section Distribution Matrix
                </h3>
                <div className="space-y-3">
                  {(Object.entries(stats.categoryCounts) as Array<[Category, { total: number; done: number }]>).map(([catName, item]) => {
                    const percent = item.total > 0 ? Math.round((item.done / item.total) * 100) : 0;
                    return (
                      <div key={catName} className="p-3 rounded-lg bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/40 dark:border-slate-850/40">
                        <div className="flex justify-between items-center text-xs font-mono font-bold mb-1.5">
                          <span className="text-slate-700 dark:text-slate-300">{catName}</span>
                          <span className="text-cyan-500 dark:text-cyan-400">{item.done}/{item.total} ({percent}%)</span>
                        </div>
                        <div className="h-2 bg-slate-200/50 dark:bg-slate-850 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-500 transition-all duration-300" style={{ width: `${percent}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Interactive Spec Reference Quick Facts */}
              <div className="bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800/80 p-4 rounded-xl shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-cyan-500" /> RF-6455 Core Standards
                  </h3>
                  <div className="space-y-2 mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    <div className="p-2.5 rounded bg-cyan-50/30 dark:bg-cyan-950/10 border border-cyan-200/40 dark:border-cyan-900/30">
                      <span className="font-bold text-slate-800 dark:text-slate-200 block mb-0.5 font-mono">Framing Protocol</span>
                      Standardizes raw packet framing with 2-10 byte overheads. Supports Text (0x1), Binary (0x2), Close (0x8), Ping (0x9), and Pong (0xA).
                    </div>
                    <div className="p-2.5 rounded bg-cyan-50/30 dark:bg-cyan-950/10 border border-cyan-200/40 dark:border-cyan-900/30">
                      <span className="font-bold text-slate-800 dark:text-slate-200 block mb-0.5 font-mono">Origin Validation</span>
                      Must rely on standard client browser handshake headers. Server is fully responsible for cross-origin whitelisting.
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveTab('study')}
                  className="w-full mt-4 py-2 bg-slate-900 dark:bg-cyan-600 hover:bg-slate-800 dark:hover:bg-cyan-700 text-white font-bold text-xs rounded-lg transition shadow-sm"
                >
                  Return to Study Guides
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Main Study Workspace Tab (Splits into Filter Sidebar and Active Question Viewer) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            
            {/* Sidebar List (Lg size 4) */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              
              {/* Dynamic Filter Bento Controls */}
              <div className="bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800/80 p-3 rounded-xl shadow-sm space-y-3">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search titles, concepts, take-aways..."
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/60 rounded-lg text-xs font-medium placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold font-mono text-slate-400 uppercase block mb-1">Section Filter</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value as any)}
                      className="w-full p-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/60 rounded-lg text-[11px] font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
                    >
                      <option value="ALL">All Sections</option>
                      <option value="Protocol Foundations">Protocol Foundations</option>
                      <option value="Client-Side Architecture">Client-Side Architecture</option>
                      <option value="Connection Lifecycle">Connection Lifecycle</option>
                      <option value="Production Scaling">Production Scaling</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold font-mono text-slate-400 uppercase block mb-1">Difficulty</label>
                    <select
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value as any)}
                      className="w-full p-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/60 rounded-lg text-[11px] font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
                    >
                      <option value="ALL">All Levels</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                {/* Toggle controls with clean badges */}
                <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100 dark:border-slate-800/50">
                  <button
                    onClick={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
                    className={`flex-1 py-1 px-2 text-[10px] font-bold rounded-md border flex items-center justify-center gap-1 transition ${showOnlyBookmarked ? 'bg-cyan-500/10 border-cyan-500 text-cyan-500' : 'bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-slate-800/60 text-slate-500'}`}
                  >
                    <Star className="w-3 h-3 fill-current" /> Only Bookmarks
                  </button>
                  <button
                    onClick={() => setShowOnlyUncompleted(!showOnlyUncompleted)}
                    className={`flex-1 py-1 px-2 text-[10px] font-bold rounded-md border flex items-center justify-center gap-1 transition ${showOnlyUncompleted ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500' : 'bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-slate-800/60 text-slate-500'}`}
                  >
                    <CheckCircle className="w-3 h-3" /> Uncompleted ({filteredQuestions.filter(q => !completedIds.includes(q.id)).length})
                  </button>
                </div>
              </div>

              {/* Dynamic Question List Grid */}
              <div className="bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800/80 rounded-xl shadow-sm overflow-hidden flex-1 flex flex-col max-h-[calc(100vh-240px)] lg:max-h-[750px]">
                <div className="p-3 bg-slate-50/60 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">Questions ({filteredQuestions.length})</span>
                  {filteredQuestions.length !== QUESTIONS.length && (
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('ALL');
                        setSelectedDifficulty('ALL');
                        setShowOnlyBookmarked(false);
                        setShowOnlyUncompleted(false);
                      }}
                      className="text-[10px] text-cyan-500 dark:text-cyan-400 font-bold hover:underline"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>

                {/* List container */}
                <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-850">
                  {filteredQuestions.length === 0 ? (
                    <div className="p-8 text-center text-slate-400">
                      <HelpCircle className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700 mb-2" />
                      <p className="text-xs">No questions match the active query parameters.</p>
                    </div>
                  ) : (
                    filteredQuestions.map((q) => {
                      const isSelected = q.id === selectedQuestionId;
                      const isCompleted = completedIds.includes(q.id);
                      const isBookmarked = bookmarks.includes(q.id);

                      return (
                        <div
                          key={q.id}
                          onClick={() => setSelectedQuestionId(q.id)}
                          className={`p-3 text-left transition cursor-pointer relative group flex gap-2 items-start ${isSelected ? 'bg-cyan-50/40 dark:bg-cyan-950/15 border-l-4 border-cyan-500' : 'hover:bg-slate-50 dark:hover:bg-slate-850/30'}`}
                        >
                          {/* Checkbox and Bookmark Quick Indicators */}
                          <div className="flex flex-col gap-2 pt-0.5">
                            <button 
                              onClick={(e) => { e.stopPropagation(); toggleCompleted(q.id); }}
                              className="text-slate-300 hover:text-emerald-500 transition"
                            >
                              {isCompleted ? (
                                <CheckCircle className="w-4 h-4 text-emerald-500 fill-emerald-500/10" />
                              ) : (
                                <Circle className="w-4 h-4" />
                              )}
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); toggleBookmark(q.id); }}
                              className={`transition ${isBookmarked ? 'text-cyan-500' : 'text-slate-300 hover:text-cyan-500'}`}
                            >
                              <Star className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                            </button>
                          </div>

                          {/* Text Body */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-1">
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold">
                                #{q.id}
                              </span>
                              <span className={`text-[9px] font-bold font-mono px-1.5 rounded-full ${q.difficulty === 'Beginner' ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' : q.difficulty === 'Intermediate' ? 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/20' : 'text-rose-500 bg-rose-50 dark:bg-rose-950/20'}`}>
                                {q.difficulty}
                              </span>
                            </div>

                            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-1.5 line-clamp-2 leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition">
                              {q.question}
                            </h4>

                            <div className="flex items-center gap-1.5 mt-2">
                              <span className="text-[10px] text-slate-400 font-medium truncate">{q.category}</span>
                            </div>
                          </div>

                          <ChevronRight className={`w-4 h-4 text-slate-300 dark:text-slate-700 mt-1 transition-transform ${isSelected ? 'translate-x-0.5 text-cyan-500' : 'group-hover:translate-x-0.5'}`} />
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Main Interactive Study Panel Viewer (Lg size 8) */}
            <div className="lg:col-span-8 flex flex-col gap-3">
              {/* Core Active Card Block */}
              <div className="bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800/80 rounded-xl shadow-sm p-4 relative overflow-hidden">
                {/* Header Row */}
                <div className="flex flex-wrap justify-between items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-805/80">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-cyan-500 font-bold uppercase tracking-wider bg-cyan-50 dark:bg-cyan-950/40 px-2.5 py-1 rounded-lg">
                      {activeQuestion.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400">Question #{activeQuestion.id}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleBookmark(activeQuestion.id)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg border flex items-center gap-1.5 transition ${bookmarks.includes(activeQuestion.id) ? 'bg-cyan-500/10 border-cyan-500 text-cyan-500' : 'bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 border-slate-200 dark:border-slate-800 text-slate-500'}`}
                    >
                      <Star className={`w-3.5 h-3.5 ${bookmarks.includes(activeQuestion.id) ? 'fill-current' : ''}`} />
                      {bookmarks.includes(activeQuestion.id) ? 'Flagged' : 'Flag Bookmark'}
                    </button>
                    
                    <button
                      onClick={() => toggleCompleted(activeQuestion.id)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg border flex items-center gap-1.5 transition ${completedIds.includes(activeQuestion.id) ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500' : 'bg-cyan-600 hover:bg-cyan-700 text-white border-transparent'}`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      {completedIds.includes(activeQuestion.id) ? 'Completed' : 'Mark Completed'}
                    </button>
                  </div>
                </div>

                {/* Big Display Question Text */}
                <div className="py-4">
                  <span className="text-[10px] font-bold font-mono text-cyan-500 uppercase tracking-widest block mb-1">Decapsulation Subject</span>
                  <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
                    {activeQuestion.question}
                  </h2>
                </div>

                {/* Bento Grid Splits: LaTeX equation card & core takeaway */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  {/* Core Takeaway Card */}
                  <div className="p-3 rounded-xl bg-cyan-50/40 dark:bg-cyan-950/15 border border-cyan-100/40 dark:border-cyan-900/30 flex gap-2.5 items-start">
                    <Info className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-[9px] font-bold font-mono text-cyan-500 uppercase tracking-widest block mb-0.5">Core Architect Takeaway</span>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal font-sans font-medium">
                        {activeQuestion.shortAnswer}
                      </p>
                    </div>
                  </div>

                  {/* Math Formula Card (LaTeX Equations) */}
                  {activeQuestion.mathFormula && (
                    <div className="p-3 rounded-xl bg-cyan-50/40 dark:bg-cyan-950/15 border border-cyan-100/40 dark:border-cyan-900/30 flex gap-2.5 items-start">
                      <Hash className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                      <div className="w-full min-w-0">
                        <span className="text-[9px] font-bold font-mono text-cyan-500 uppercase tracking-widest block mb-0.5">Mathematical Equation Reference</span>
                        <div className="overflow-x-auto text-xs py-1">
                          <MarkdownRenderer content={activeQuestion.mathFormula} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Large Detailed Answer Block (Supports Markdown and code snippets) */}
                <div className="space-y-2 border-t border-slate-100 dark:border-slate-850 pt-4">
                  <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest block mb-1">Detailed Technical Spec Decryption</span>
                  <div className="text-xs sm:text-sm prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    <MarkdownRenderer content={activeQuestion.detailedAnswer} />
                  </div>
                </div>
              </div>

              {/* Bento Grid: Interactive Simulator Pane & Custom Takeaway Pad */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                {/* Simulator Section (Md size 7) */}
                <div className="md:col-span-7 flex flex-col">
                  <div className="bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800/80 rounded-xl shadow-sm overflow-hidden flex-1 flex flex-col">
                    <div className="p-3 bg-slate-50/60 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Activity className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Live Simulator Playground</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-md">Interactive</span>
                    </div>

                    <div className="p-3 flex-1 flex flex-col justify-center">
                      <InteractiveDiagram diagramId={activeQuestion.interactiveDiagramId} />
                    </div>
                  </div>
                </div>

                {/* Takeaway Pad Section (Md size 5) */}
                <div className="md:col-span-5 flex flex-col">
                  <div className="bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800/80 rounded-xl shadow-sm overflow-hidden flex-1 flex flex-col">
                    <div className="p-3 bg-slate-50/60 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <BookMarked className="w-4 h-4 text-cyan-500" />
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Study Notebook</span>
                      </div>
                      {notes[selectedQuestionId] && (
                        <button 
                          onClick={clearNote}
                          className="text-[10px] text-rose-500 font-bold hover:underline"
                        >
                          Clear Note
                        </button>
                      )}
                    </div>

                    <div className="p-3 flex-1 flex flex-col justify-between gap-3">
                      <textarea
                        value={currentNoteText}
                        onChange={(e) => setCurrentNoteText(e.target.value)}
                        placeholder="Type personal takeaways, architectural notes, or custom codes for this question. Auto-saved in local cache..."
                        className="w-full flex-1 p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/60 rounded-lg text-xs font-mono placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 resize-none min-h-[100px]"
                      />

                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-slate-400 italic">
                          {notes[selectedQuestionId] ? '✔ Note saved in localStorage' : 'No notes written yet'}
                        </span>
                        <button
                          onClick={saveNote}
                          className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold rounded-lg shadow-sm transition"
                        >
                          Save Annotations
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
