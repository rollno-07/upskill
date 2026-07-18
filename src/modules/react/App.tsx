import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, BookOpen, Bookmark, Award, HelpCircle, 
  Code, Play, Sparkles, CheckSquare, 
  Square, RefreshCw, ChevronRight, ChevronLeft, 
  Copy, Check, Info, Flame, AlertCircle, Menu, 
  X, Compass, BookOpenCheck, BrainCircuit, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Category, Question } from './types';
import { questions } from './data/questions';
import Visualizer from './components/Visualizers';

// Stable Difficulty determination based on question index / content
enum Difficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard"
}

function getDifficulty(id: number): Difficulty {
  if (id <= 15) {
    if (id % 3 === 0) return Difficulty.Medium;
    return Difficulty.Easy;
  }
  if (id <= 50) {
    if (id % 5 === 0) return Difficulty.Hard;
    if (id % 5 === 3) return Difficulty.Easy;
    return Difficulty.Medium;
  }
  if (id <= 80) {
    if (id % 4 === 0) return Difficulty.Medium;
    return Difficulty.Hard;
  }
  if (id % 3 === 0) return Difficulty.Medium;
  return Difficulty.Hard;
}

function getDifficultyStyles(difficulty: Difficulty) {
  switch (difficulty) {
    case Difficulty.Easy:
      return {
        badge: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
        text: "text-emerald-400",
        bg: "bg-emerald-500",
        border: "border-emerald-500/20"
      };
    case Difficulty.Medium:
      return {
        badge: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
        text: "text-cyan-400",
        bg: "bg-cyan-500",
        border: "border-cyan-500/20"
      };
    case Difficulty.Hard:
      return {
        badge: "bg-rose-500/10 border-rose-500/30 text-rose-400",
        text: "text-rose-400",
        bg: "bg-rose-500",
        border: "border-rose-500/20"
      };
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'board' | 'flashcards' | 'analytics'>('board');
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Completed' | 'Bookmarked' | 'Pending'>('All');
  
  // Mobile drawer state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Persistent user lists
  const [completedList, setCompletedList] = useState<number[]>([]);
  const [bookmarkedList, setBookmarkedList] = useState<number[]>([]);
  const [confidenceMap, setConfidenceMap] = useState<Record<number, 'easy' | 'medium' | 'hard'>>({});
  const [studyStreak, setStudyStreak] = useState(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load persistence on mount
  useEffect(() => {
    try {
      const storedCompleted = localStorage.getItem('react_interview_completed');
      if (storedCompleted) setCompletedList(JSON.parse(storedCompleted));
      
      const storedBookmarked = localStorage.getItem('react_interview_bookmarked');
      if (storedBookmarked) setBookmarkedList(JSON.parse(storedBookmarked));

      const storedConfidence = localStorage.getItem('react_interview_confidence');
      if (storedConfidence) setConfidenceMap(JSON.parse(storedConfidence));

      const storedStreak = localStorage.getItem('react_interview_streak');
      const lastStudyDate = localStorage.getItem('react_interview_last_date');
      const todayStr = new Date().toDateString();
      
      if (storedStreak) {
        const streakVal = parseInt(storedStreak, 10);
        if (lastStudyDate) {
          const lastDate = new Date(lastStudyDate);
          const today = new Date(todayStr);
          const diffTime = Math.abs(today.getTime() - lastDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          if (diffDays === 1) {
            setStudyStreak(streakVal + 1);
            localStorage.setItem('react_interview_streak', (streakVal + 1).toString());
          } else if (diffDays > 1) {
            setStudyStreak(1);
            localStorage.setItem('react_interview_streak', '1');
          } else {
            setStudyStreak(streakVal);
          }
        } else {
          setStudyStreak(1);
        }
      } else {
        setStudyStreak(1);
        localStorage.setItem('react_interview_streak', '1');
      }
      localStorage.setItem('react_interview_last_date', todayStr);
    } catch (e) {
      console.error("Failed to load local storage state:", e);
    }
  }, []);

  const toggleCompleted = (id: number) => {
    setCompletedList(prev => {
      const newList = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('react_interview_completed', JSON.stringify(newList));
      return newList;
    });
  };

  const toggleBookmarked = (id: number) => {
    setBookmarkedList(prev => {
      const newList = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('react_interview_bookmarked', JSON.stringify(newList));
      return newList;
    });
  };

  const updateConfidence = (id: number, rating: 'easy' | 'medium' | 'hard') => {
    setConfidenceMap(prev => {
      const newMap = { ...prev, [id]: rating };
      localStorage.setItem('react_interview_confidence', JSON.stringify(newMap));
      return newMap;
    });
  };

  // Filtered lists of questions
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchesSearch = 
        q.id.toString() === searchQuery.trim() ||
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.shortAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.detailedAnswer.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
      const difficulty = getDifficulty(q.id);
      const matchesDifficulty = selectedDifficulty === 'All' || difficulty === selectedDifficulty;
      
      const isCompleted = completedList.includes(q.id);
      const isBookmarked = bookmarkedList.includes(q.id);
      
      const matchesStatus = 
        statusFilter === 'All' ||
        (statusFilter === 'Completed' && isCompleted) ||
        (statusFilter === 'Bookmarked' && isBookmarked) ||
        (statusFilter === 'Pending' && !isCompleted);
        
      return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, statusFilter, completedList, bookmarkedList]);

  // Active highlighted question
  const activeQuestion = useMemo(() => {
    return questions.find(q => q.id === selectedQuestionId) || questions[0];
  }, [selectedQuestionId]);

  // Sub-tab selection: 'details' | 'code' | 'simulator'
  const [detailSubTab, setDetailSubTab] = useState<'details' | 'simulator'>('details');

  // Flashcards mode states
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [flashcardDeckFilter, setFlashcardDeckFilter] = useState<'all' | 'bookmarked' | 'category'>('all');
  const [flashcardCategory, setFlashcardCategory] = useState<Category>(Category.CoreConcepts);

  const flashcardDeck = useMemo(() => {
    let list = questions;
    if (flashcardDeckFilter === 'bookmarked') {
      list = questions.filter(q => bookmarkedList.includes(q.id));
    } else if (flashcardDeckFilter === 'category') {
      list = questions.filter(q => q.category === flashcardCategory);
    }
    return list.length > 0 ? list : questions;
  }, [flashcardDeckFilter, flashcardCategory, bookmarkedList]);

  useEffect(() => {
    setFlashcardIndex(0);
    setFlashcardFlipped(false);
  }, [flashcardDeckFilter, flashcardCategory]);

  const nextFlashcard = () => {
    if (flashcardIndex < flashcardDeck.length - 1) {
      setFlashcardIndex(prev => prev + 1);
      setFlashcardFlipped(false);
    }
  };

  const prevFlashcard = () => {
    if (flashcardIndex > 0) {
      setFlashcardIndex(prev => prev - 1);
      setFlashcardFlipped(false);
    }
  };

  const handleCopyCode = (codeText: string, key: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedId(key);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Analytics calculations
  const categoryStats = useMemo(() => {
    return Object.values(Category).map(cat => {
      const catQuestions = questions.filter(q => q.category === cat);
      const catCompleted = catQuestions.filter(q => completedList.includes(q.id));
      const percentage = catQuestions.length > 0 ? Math.round((catCompleted.length / catQuestions.length) * 100) : 0;
      return {
        category: cat,
        total: catQuestions.length,
        completed: catCompleted.length,
        percentage
      };
    });
  }, [completedList]);

  const totalCompletedCount = completedList.length;
  const overallPercentage = Math.round((totalCompletedCount / questions.length) * 100);

  const selectRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setSelectedQuestionId(questions[randomIndex].id);
    setDetailSubTab('details');
  };

  return (
    <div className="min-h-screen bg-[#070913] text-zinc-100 font-sans antialiased flex flex-col">
      
      {/* 1. Global Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0B0E1E]/90 backdrop-blur-md border-b border-zinc-800/80 px-4 py-3 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Compass className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-sm font-bold font-display tracking-tight text-white flex items-center gap-1.5">
                ReactJS Interview Q&A
                <span className="px-1.5 py-0.5 text-[9px] font-mono tracking-wider bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded">
                  100 EXPERT Qs
                </span>
              </h1>
              <p className="text-[10px] text-zinc-400 hidden sm:block">Interactive React concept playground & study sandbox</p>
            </div>
          </div>
        </div>

        {/* Global Progress Dashboard Summary */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden lg:flex items-center gap-2.5 bg-zinc-900/60 px-3 py-1.5 rounded-xl border border-zinc-800">
            <Flame className="w-4 h-4 text-cyan-500 animate-bounce" />
            <div className="text-left leading-none">
              <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Streak</p>
              <p className="text-xs font-bold text-white mt-0.5">{studyStreak} Days</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right leading-none">
              <div className="flex items-center gap-1.5 justify-end">
                <span className="text-[10px] text-zinc-400">Total Progress</span>
                <span className="text-xs font-bold text-white">{totalCompletedCount}/100</span>
              </div>
              <div className="w-24 sm:w-32 bg-zinc-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-cyan-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${overallPercentage}%` }}
                />
              </div>
            </div>
            <span className="text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-1 rounded-lg">
              {overallPercentage}%
            </span>
          </div>
        </div>
      </header>

      {/* 2. Sub-Header Selector Tabs */}
      <div className="bg-[#090C1A] border-b border-zinc-800/40 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 overflow-x-auto">
        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => setActiveTab('board')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'board' 
                ? 'bg-zinc-800 text-white border border-zinc-700/60 shadow-sm' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Study Board
          </button>
          <button 
            onClick={() => setActiveTab('flashcards')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'flashcards' 
                ? 'bg-zinc-800 text-white border border-zinc-700/60 shadow-sm' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            Recall Flashcards
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'analytics' 
                ? 'bg-zinc-800 text-white border border-zinc-700/60 shadow-sm' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            My Progress Dashboard
          </button>
        </div>

        <button 
          onClick={selectRandomQuestion}
          className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-cyan-500/10 hover:text-cyan-400 rounded-lg text-[11px] font-semibold text-zinc-300 border border-zinc-800 transition-all cursor-pointer whitespace-nowrap"
        >
          <Sparkles className="w-3 h-3 text-cyan-400" />
          Surprise Me
        </button>
      </div>

      {/* 3. Main Workspace Area */}
      <main className="flex-1 flex overflow-hidden relative">

        {/* A. Left Sidebar Catalog Panel */}
        <AnimatePresence>
          {(sidebarOpen || activeTab === 'board') && (
            <motion.aside 
              className={`
                absolute md:static top-0 left-0 bottom-0 z-30
                w-80 md:w-85 bg-[#090C1A] border-r border-zinc-800/80 flex flex-col h-full
                ${sidebarOpen ? 'block' : 'hidden md:flex'}
              `}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {/* Sidebar Title */}
              <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpenCheck className="w-4 h-4 text-cyan-500" />
                  <span className="text-xs font-bold text-zinc-200 tracking-wide uppercase font-display">Questions Catalog</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold font-mono bg-zinc-800 px-2 py-0.5 rounded text-zinc-400">
                    {filteredQuestions.length} Found
                  </span>
                  {sidebarOpen && (
                    <button 
                      onClick={() => setSidebarOpen(false)}
                      className="md:hidden p-1 bg-zinc-900 hover:bg-zinc-800 rounded text-zinc-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Advanced Interactive Search and Filters */}
              <div className="p-4 border-b border-zinc-800/50 space-y-3 bg-[#070914]">
                
                {/* Search Box */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search titles, answers or ID..." 
                    className="w-full bg-zinc-950/60 border border-zinc-800 focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-zinc-500 outline-none transition-all"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Dropdowns */}
                <div className="grid grid-cols-2 gap-2">
                  
                  <div className="space-y-1 text-left">
                    <label className="text-[9px] font-semibold text-zinc-500 uppercase tracking-wider block">Category</label>
                    <select 
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value as any)}
                      className="w-full bg-zinc-950/60 border border-zinc-800 text-[10px] text-zinc-300 rounded-lg p-1.5 focus:border-cyan-500/50 outline-none"
                    >
                      <option value="All">All Categories</option>
                      {Object.values(Category).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[9px] font-semibold text-zinc-500 uppercase tracking-wider block">Difficulty</label>
                    <select 
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value as any)}
                      className="w-full bg-zinc-950/60 border border-zinc-800 text-[10px] text-zinc-300 rounded-lg p-1.5 focus:border-cyan-500/50 outline-none"
                    >
                      <option value="All">All Levels</option>
                      <option value={Difficulty.Easy}>Easy</option>
                      <option value={Difficulty.Medium}>Medium</option>
                      <option value={Difficulty.Hard}>Hard</option>
                    </select>
                  </div>

                </div>

                {/* Quick Toggle Status scroll */}
                <div className="flex gap-1 overflow-x-auto pb-1 pt-1 border-t border-zinc-800/30 scrollbar-none">
                  {(['All', 'Completed', 'Bookmarked', 'Pending'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setStatusFilter(tab)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-medium whitespace-nowrap border transition-all cursor-pointer ${
                        statusFilter === tab 
                          ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30' 
                          : 'bg-zinc-950/40 text-zinc-400 border-transparent hover:border-zinc-800 hover:text-zinc-200'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

              </div>

              {/* Scrollable Questions List */}
              <div className="flex-1 overflow-y-auto p-2 space-y-1.5 bg-[#060812]">
                {filteredQuestions.length === 0 ? (
                  <div className="text-center py-10 px-4 text-zinc-500">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2 text-zinc-600 animate-pulse" />
                    <p className="text-xs font-semibold">No questions match filters</p>
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('All');
                        setSelectedDifficulty('All');
                        setStatusFilter('All');
                      }}
                      className="mt-3 text-[10px] text-cyan-400 underline hover:text-cyan-300"
                    >
                      Clear search & filters
                    </button>
                  </div>
                ) : (
                  filteredQuestions.map((q) => {
                    const diff = getDifficulty(q.id);
                    const isSelected = q.id === selectedQuestionId;
                    const isCompleted = completedList.includes(q.id);
                    const isBookmarked = bookmarkedList.includes(q.id);
                    const diffStyles = getDifficultyStyles(diff);
                    
                    return (
                      <div 
                        key={q.id}
                        onClick={() => {
                          setSelectedQuestionId(q.id);
                          setSidebarOpen(false);
                        }}
                        className={`
                          group relative p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex gap-2.5 items-start
                          ${isSelected 
                            ? 'bg-zinc-800/80 border-zinc-700 text-white shadow-md shadow-zinc-950/30' 
                            : 'bg-zinc-900/30 border-zinc-800/70 hover:bg-zinc-800/30 hover:border-zinc-700/60'
                          }
                        `}
                      >
                        <div className={`absolute left-0 top-3 bottom-3 w-1 rounded-r ${diffStyles.bg}`} />

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCompleted(q.id);
                          }}
                          className="mt-0.5 p-0.5 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                        >
                          {isCompleted ? (
                            <CheckSquare className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Square className="w-4 h-4 text-zinc-600 hover:text-zinc-400 group-hover:border-zinc-500" />
                          )}
                        </button>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-mono text-zinc-500">ID #{q.id}</span>
                            <div className="flex items-center gap-1.5">
                              {isBookmarked && <Bookmark className="w-3 h-3 text-cyan-400 fill-cyan-400" />}
                              <span className={`px-1.5 py-0.5 rounded text-[8px] font-semibold border ${diffStyles.badge}`}>
                                {diff}
                              </span>
                            </div>
                          </div>
                          
                          <p className={`text-[11.5px] font-medium leading-snug mt-1 transition-colors ${
                            isSelected ? 'text-white' : 'text-zinc-300 group-hover:text-white'
                          }`}>
                            {q.question}
                          </p>

                          <p className="text-[10px] text-zinc-500 mt-1 truncate font-display font-medium">
                            {q.category}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* B. Core Display Panel Content Area */}
        <section className="flex-1 flex flex-col bg-[#05070F] h-full overflow-hidden">
          
          {/* STUDY BOARD TAB */}
          {activeTab === 'board' && (
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              
              {/* Left Column: Detailed QA contents */}
              <div className="flex-1 flex flex-col h-full overflow-y-auto p-4 sm:p-6 space-y-5 lg:border-r lg:border-zinc-800/50">
                
                {/* 1. Question Title & Badge Block */}
                <div className="bg-zinc-900/30 p-5 rounded-2xl border border-zinc-800/60 text-left space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono bg-zinc-800 text-zinc-400 border border-zinc-700/60 px-2.5 py-1 rounded-lg">
                        QUESTION #{activeQuestion.id}
                      </span>
                      <span className="text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2.5 py-1 rounded-lg">
                        {activeQuestion.category}
                      </span>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${getDifficultyStyles(getDifficulty(activeQuestion.id)).badge}`}>
                        {getDifficulty(activeQuestion.id)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => toggleCompleted(activeQuestion.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          completedList.includes(activeQuestion.id)
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700/50'
                        }`}
                      >
                        <CheckSquare className="w-3.5 h-3.5" />
                        {completedList.includes(activeQuestion.id) ? 'Completed' : 'Mark Complete'}
                      </button>

                      <button 
                        onClick={() => toggleBookmarked(activeQuestion.id)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                          bookmarkedList.includes(activeQuestion.id)
                            ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20'
                            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400 border-zinc-700/50'
                        }`}
                        title="Bookmark question"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${bookmarkedList.includes(activeQuestion.id) ? 'fill-cyan-400' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <h2 className="text-base sm:text-lg md:text-xl font-bold font-display tracking-tight text-white mt-1 leading-snug">
                    {activeQuestion.question}
                  </h2>
                </div>

                {/* 2. Short Recall (Cheat Sheet) */}
                <div className="bg-gradient-to-r from-cyan-500/5 to-cyan-500/5 border-l-4 border-cyan-500 p-5 rounded-r-2xl rounded-l-md text-left">
                  <div className="flex items-center gap-2 text-cyan-400 mb-1.5">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-wider font-display">Cheat Sheet Summary</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-zinc-200 leading-relaxed">
                    {activeQuestion.shortAnswer}
                  </p>
                </div>

                {/* 3. Technical Deep Dive */}
                <div className="text-left space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-zinc-800/40">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-xs font-bold uppercase tracking-wider font-display text-zinc-300">Technical Explanation</h3>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-300 whitespace-pre-wrap">
                    {activeQuestion.detailedAnswer}
                  </p>
                </div>

                {/* 4. Analogy Explanation */}
                <div className="bg-[#101222] p-5 rounded-2xl border border-zinc-800/80 text-left space-y-3">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Info className="w-4 h-4" />
                    <h4 className="text-[10px] font-bold uppercase tracking-wider font-display">Intuitive Analogy</h4>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed italic">
                    "{activeQuestion.visualExplanation}"
                  </p>
                </div>

                {/* 5. Confidence Assessment */}
                <div className="bg-zinc-900/20 p-4 rounded-xl border border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                  <div>
                    <h5 className="text-xs font-bold text-white">Rate your mastery on this question:</h5>
                    <p className="text-[10px] text-zinc-400 mt-0.5">Helps dynamically compile your analytics scorecard</p>
                  </div>
                  <div className="flex gap-2">
                    {(['easy', 'medium', 'hard'] as const).map(level => {
                      const isActive = confidenceMap[activeQuestion.id] === level;
                      const colors = {
                        easy: 'hover:bg-emerald-500/10 hover:text-emerald-400 border-emerald-500/20',
                        medium: 'hover:bg-cyan-500/10 hover:text-cyan-400 border-cyan-500/20',
                        hard: 'hover:bg-rose-500/10 hover:text-rose-400 border-rose-500/20'
                      };
                      const activeColors = {
                        easy: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40',
                        medium: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/40',
                        hard: 'bg-rose-500/15 text-rose-400 border-rose-500/40'
                      };
                      return (
                        <button
                          key={level}
                          onClick={() => updateConfidence(activeQuestion.id, level)}
                          className={`px-3 py-1 rounded-lg text-[10px] font-semibold border capitalize transition-all cursor-pointer ${
                            isActive ? activeColors[level] : `bg-zinc-950/40 text-zinc-400 ${colors[level]}`
                          }`}
                        >
                          {level}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Column: Code Snippets & Concepts Sandbox Simulator */}
              <div className="lg:w-[480px] xl:w-[540px] flex flex-col h-full bg-[#080A15] border-t lg:border-t-0 border-zinc-800/80">
                
                {/* Switcher Tab Headers */}
                <div className="flex border-b border-zinc-800">
                  <button 
                    onClick={() => setDetailSubTab('details')}
                    className={`flex-1 py-3 text-xs font-medium border-b-2 transition-all ${
                      detailSubTab === 'details' 
                        ? 'text-cyan-400 border-cyan-500 bg-cyan-500/5' 
                        : 'text-zinc-500 border-transparent hover:text-zinc-300 hover:bg-zinc-900/25'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Code className="w-3.5 h-3.5" />
                      Code Example
                    </div>
                  </button>
                  <button 
                    onClick={() => setDetailSubTab('simulator')}
                    className={`flex-1 py-3 text-xs font-medium border-b-2 transition-all ${
                      detailSubTab === 'simulator' 
                        ? 'text-cyan-400 border-cyan-500 bg-cyan-500/5' 
                        : 'text-zinc-500 border-transparent hover:text-zinc-300 hover:bg-zinc-900/25'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Play className="w-3.5 h-3.5" />
                      Concept Sandbox
                    </div>
                  </button>
                </div>

                {/* Sub-panel Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5">
                  {detailSubTab === 'details' ? (
                    <div className="space-y-4 text-left">
                      <div className="flex items-center justify-between pb-1 border-b border-zinc-800">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">React Syntax Sandbox</span>
                        <span className="text-[10px] text-zinc-500 font-mono">Modern ES Modules</span>
                      </div>

                      {activeQuestion.examples && activeQuestion.examples.map((example, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-semibold text-white">{example.title}</h4>
                            <button 
                              onClick={() => handleCopyCode(example.code, `code_${activeQuestion.id}_${i}`)}
                              className="text-[10px] text-zinc-400 hover:text-zinc-200 flex items-center gap-1 border border-zinc-800 px-2.5 py-1 rounded bg-zinc-950/40 hover:bg-zinc-900 cursor-pointer"
                            >
                              {copiedId === `code_${activeQuestion.id}_${i}` ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-500" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3 text-zinc-400" />
                                  Copy Code
                                </>
                              )}
                            </button>
                          </div>

                          <div className="bg-zinc-950/90 rounded-xl p-3 border border-zinc-850 overflow-x-auto font-mono text-[11px] leading-relaxed text-sky-300 select-all">
                            <pre className="whitespace-pre-wrap">{example.code}</pre>
                          </div>

                          <div className="bg-zinc-900/20 p-2.5 rounded-lg border border-zinc-800/40 flex gap-2 items-start text-left">
                            <Info className="w-3.5 h-3.5 text-zinc-400 mt-0.5 shrink-0" />
                            <p className="text-[10px] leading-normal text-zinc-400">{example.explanation}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col space-y-4 text-left">
                      <div className="bg-[#0F1226] border border-cyan-500/20 rounded-xl p-3 flex gap-3 items-start">
                        <Play className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5 animate-pulse" />
                        <div>
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Interactive Concept Sandbox</h4>
                          <p className="text-[10px] leading-normal text-zinc-400 mt-0.5">
                            Play with this simulation of <strong>{activeQuestion.question}</strong> to observe component triggers, render pipelines, or closures interactively!
                          </p>
                        </div>
                      </div>

                      <div className="flex-1 min-h-[350px] relative">
                        <Visualizer type={activeQuestion.visualizerType} />
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* FLASHCARD RECALL MODE */}
          {activeTab === 'flashcards' && (
            <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto max-w-4xl mx-auto w-full">
              
              <div className="w-full max-w-lg mb-4 flex flex-col sm:flex-row gap-3 items-center justify-between border-b border-zinc-850 pb-4 text-left">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5 font-display">
                    <BrainCircuit className="w-4 h-4 text-cyan-400" />
                    Recall Practice
                  </h3>
                  <p className="text-[10px] text-zinc-500 mt-0.5">Test your quick-retrieval performance of standard questions</p>
                </div>

                <div className="flex gap-2">
                  <select 
                    value={flashcardDeckFilter}
                    onChange={(e) => setFlashcardDeckFilter(e.target.value as any)}
                    className="bg-zinc-950/60 border border-zinc-800 text-[10px] text-zinc-300 rounded-lg p-1.5 outline-none focus:border-cyan-500/50"
                  >
                    <option value="all">All 100 Questions</option>
                    <option value="bookmarked">Bookmarked Only ({bookmarkedList.length})</option>
                    <option value="category">Category-specific Deck</option>
                  </select>

                  {flashcardDeckFilter === 'category' && (
                    <select 
                      value={flashcardCategory}
                      onChange={(e) => setFlashcardCategory(e.target.value as any)}
                      className="bg-zinc-950/60 border border-zinc-800 text-[10px] text-zinc-300 rounded-lg p-1.5 outline-none focus:border-cyan-500/50"
                    >
                      {Object.values(Category).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              {/* Deck Progress */}
              <div className="w-full max-w-lg mb-3 flex items-center justify-between text-zinc-400 text-[11px] font-mono">
                <span>Card {flashcardIndex + 1} of {flashcardDeck.length}</span>
                <span>{Math.round(((flashcardIndex + 1) / flashcardDeck.length) * 100)}% Complete</span>
              </div>
              <div className="w-full max-w-lg bg-zinc-800/80 h-1 rounded-full mb-6 overflow-hidden">
                <div 
                  className="bg-cyan-500 h-full transition-all duration-300"
                  style={{ width: `${((flashcardIndex + 1) / flashcardDeck.length) * 100}%` }}
                />
              </div>

              {/* The Actual Flashcard container */}
              <div 
                onClick={() => setFlashcardFlipped(!flashcardFlipped)}
                className="w-full max-w-lg h-[280px] sm:h-[320px] cursor-pointer group select-none relative"
                style={{ perspective: '1000px' }}
              >
                <div className={`
                  w-full h-full duration-500 relative transition-transform rounded-2xl border
                  ${flashcardFlipped ? 'border-cyan-500/40 shadow-lg shadow-cyan-500/10' : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/40'}
                `}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flashcardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}>
                  
                  {/* Front Side */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between text-left" style={{ backfaceVisibility: 'hidden' }}>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-zinc-500">ID #{flashcardDeck[flashcardIndex]?.id}</span>
                      <span className="text-[10px] font-semibold bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">
                        {flashcardDeck[flashcardIndex]?.category}
                      </span>
                    </div>

                    <div className="flex-1 flex items-center justify-center">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold font-display text-center leading-relaxed text-white">
                        {flashcardDeck[flashcardIndex]?.question}
                      </h3>
                    </div>

                    <div className="text-center pt-3 border-t border-zinc-800/60 flex items-center justify-center gap-1.5 text-zinc-400 text-[11px]">
                      <RefreshCw className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                      <span>Click to flip and reveal answer card</span>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between text-left bg-[#0A0B16] rounded-2xl" 
                       style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">Cheat Sheet Key</span>
                      <span className="text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded">
                        {getDifficulty(flashcardDeck[flashcardIndex]?.id)}
                      </span>
                    </div>

                    <div className="flex-1 flex flex-col justify-center space-y-3 pt-2">
                      <p className="text-xs sm:text-sm font-bold text-white border-l-2 border-cyan-500 pl-3 leading-relaxed">
                        {flashcardDeck[flashcardIndex]?.shortAnswer}
                      </p>
                      <p className="text-[11px] text-zinc-400 leading-relaxed overflow-y-auto max-h-[100px] pr-1">
                        {flashcardDeck[flashcardIndex]?.detailedAnswer}
                      </p>
                    </div>

                    <div className="text-center pt-3 border-t border-zinc-900 flex items-center justify-center gap-2">
                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mr-2">Study Rating:</span>
                      {(['easy', 'medium', 'hard'] as const).map(lvl => (
                        <button
                          key={lvl}
                          onClick={(e) => {
                            e.stopPropagation();
                            updateConfidence(flashcardDeck[flashcardIndex].id, lvl);
                            nextFlashcard();
                          }}
                          className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 hover:border-cyan-500/40 text-[9px] font-semibold text-zinc-300 hover:text-white capitalize cursor-pointer"
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Cards Navigation */}
              <div className="flex items-center gap-4 mt-6">
                <button 
                  onClick={prevFlashcard}
                  disabled={flashcardIndex === 0}
                  className="p-2.5 bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 disabled:opacity-30 rounded-xl transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-semibold text-zinc-400">
                  {flashcardIndex + 1} / {flashcardDeck.length}
                </span>
                <button 
                  onClick={nextFlashcard}
                  disabled={flashcardIndex === flashcardDeck.length - 1}
                  className="p-2.5 bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 disabled:opacity-30 rounded-xl transition-all cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>
          )}

          {/* MY PROGRESS DASHBOARD TAB */}
          {activeTab === 'analytics' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 max-w-4xl mx-auto w-full">
              
              {/* Core metrics bento boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                <div className="bg-gradient-to-br from-[#0F132E] to-[#080B1B] p-5 rounded-2xl border border-cyan-500/20 text-left space-y-2 relative overflow-hidden">
                  <div className="absolute right-3 top-3 w-10 h-10 rounded-full bg-cyan-500/5 flex items-center justify-center">
                    <Award className="w-5 h-5 text-cyan-400" />
                  </div>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Overall Readiness</p>
                  <h4 className="text-3xl font-bold text-white tracking-tight font-display">{overallPercentage}%</h4>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-2">
                    <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${overallPercentage}%` }} />
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-1">{totalCompletedCount} out of 100 questions completed</p>
                </div>

                <div className="bg-gradient-to-br from-[#1C122C] to-[#0D091B] p-5 rounded-2xl border border-cyan-500/20 text-left space-y-2 relative overflow-hidden">
                  <div className="absolute right-3 top-3 w-10 h-10 rounded-full bg-cyan-500/5 flex items-center justify-center">
                    <Flame className="w-5 h-5 text-cyan-400 animate-pulse" />
                  </div>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Daily Study Streak</p>
                  <h4 className="text-3xl font-bold text-white tracking-tight font-display">{studyStreak} Days</h4>
                  <p className="text-[10px] text-zinc-500 mt-1">Keep revising concepts regularly to build muscle memory.</p>
                </div>

                <div className="bg-gradient-to-br from-[#121E19] to-[#080E0C] p-5 rounded-2xl border border-emerald-500/20 text-left space-y-2 relative overflow-hidden">
                  <div className="absolute right-3 top-3 w-10 h-10 rounded-full bg-emerald-500/5 flex items-center justify-center">
                    <BookOpenCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Bookmarked Topics</p>
                  <h4 className="text-3xl font-bold text-white tracking-tight font-display">{bookmarkedList.length}</h4>
                  <p className="text-[10px] text-zinc-500 mt-1">Questions saved for final interview day revision.</p>
                </div>

              </div>

              {/* Category Breakdown list */}
              <div className="bg-zinc-900/25 border border-zinc-800 p-5 rounded-2xl text-left space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white font-display">Category Mastery Breakdown</h3>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Syllabus completion percentage per core React 19 topic</p>
                </div>

                <div className="space-y-3.5">
                  {categoryStats.map((stat, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-medium">
                        <span className="text-zinc-300 font-display">{stat.category}</span>
                        <span className="text-zinc-400 font-mono text-[11px]">
                          {stat.completed} / {stat.total} ({stat.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-zinc-950/80 h-2 rounded-full overflow-hidden border border-zinc-850/60">
                        <div 
                          className="bg-gradient-to-r from-cyan-500 to-cyan-500 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${stat.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info panel */}
              <div className="bg-[#111326] border border-cyan-500/10 p-5 rounded-2xl text-left flex gap-3.5 items-start">
                <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Mastery Calibration Insights</h4>
                  <p className="text-[11px] leading-relaxed text-zinc-400 mt-1">
                    Your readiness score reflects both your marked completions and active self-assessments. Rate any answered card on the Board or Flashcards menu to adjust your study path. It is recommended to keep daily streaks going for at least 7 consecutive days prior to technical mock rounds.
                  </p>
                </div>
              </div>

            </div>
          )}

        </section>

      </main>

    </div>
  );
}
