import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Award, BookOpen, Star, CheckSquare, Square, Check, 
  Copy, Sparkles, RefreshCw, ChevronRight, HelpCircle, Send, 
  ThumbsUp, MessageSquare, Plus, Edit3, Bookmark, Filter, X, 
  BookMarked, Info, ExternalLink, Activity
} from 'lucide-react';

import { awsQuestions, CATEGORIES } from './data/awsQuestions';
import { AWSQuestion, Difficulty, UserProgress, ScoreResponse } from './types';
import InteractiveDiagrams from './components/InteractiveDiagrams';

export default function App() {
  const [questions, setQuestions] = useState<AWSQuestion[]>(awsQuestions);
  const [selectedId, setSelectedId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All Concepts');
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'All'>('All');
  const [filterStarredOnly, setFilterStarredOnly] = useState<boolean>(false);
  
  // Tab within details panel: 'answer' | 'eli5' | 'deep' | 'interview'
  const [activeTab, setActiveTab] = useState<'answer' | 'eli5' | 'deep' | 'interview'>('answer');
  const [aiExplanation, setAiExplanation] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState<boolean>(false);

  // Copy code indicator
  const [copied, setCopied] = useState<boolean>(false);

  // User notes & progress state
  const [progress, setProgress] = useState<UserProgress>({
    completedIds: [],
    starredIds: [],
    notes: {}
  });

  // Mock interview state
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [scoringResult, setScoringResult] = useState<ScoreResponse | null>(null);
  const [scoringLoading, setScoringLoading] = useState<boolean>(false);

  // Custom study note state
  const [currentNote, setCurrentNote] = useState<string>('');

  // Load progress from localStorage on start
  useEffect(() => {
    const saved = localStorage.getItem('aws_interview_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProgress(parsed);
      } catch (e) {
        console.error('Failed to parse progress', e);
      }
    }
  }, []);

  // Sync progress back to localStorage
  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('aws_interview_progress', JSON.stringify(newProgress));
  };

  const selectedQuestion = questions.find((q) => q.id === selectedId) || questions[0];

  // Load active custom note when question changes
  useEffect(() => {
    setCurrentNote(progress.notes[selectedId] || '');
    setActiveTab('answer');
    setAiExplanation('');
    setScoringResult(null);
    setUserAnswer('');
  }, [selectedId, progress.notes]);

  // Handle Copy code click
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Toggle completed / mastered status
  const toggleCompleted = (id: number) => {
    const completed = [...progress.completedIds];
    const idx = completed.indexOf(id);
    if (idx > -1) {
      completed.splice(idx, 1);
    } else {
      completed.push(id);
    }
    saveProgress({ ...progress, completedIds: completed });
  };

  // Toggle Star / favorite status
  const toggleStarred = (id: number) => {
    const starred = [...progress.starredIds];
    const idx = starred.indexOf(id);
    if (idx > -1) {
      starred.splice(idx, 1);
    } else {
      starred.push(id);
    }
    saveProgress({ ...progress, starredIds: starred });
  };

  // Save custom personal note
  const handleSaveNote = () => {
    const updatedNotes = { ...progress.notes, [selectedId]: currentNote };
    saveProgress({ ...progress, notes: updatedNotes });
  };

  // Fetch server-side explanation using Gemini
  const fetchAiExplanation = async (mode: 'eli5' | 'deep' | 'interview') => {
    setLoadingAi(true);
    setActiveTab(mode);
    setAiExplanation('');
    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: selectedId, mode })
      });
      const data = await response.json();
      if (data.success) {
        setAiExplanation(data.explanation);
      } else {
        setAiExplanation('Error generating explanation. Ensure you have an active internet connection.');
      }
    } catch (e) {
      setAiExplanation('Network failure connecting to backend service.');
    } finally {
      setLoadingAi(false);
    }
  };

  // Grade user's response inside the interview playground
  const handleGradeAnswer = async () => {
    if (!userAnswer.trim()) return;
    setScoringLoading(true);
    setScoringResult(null);
    try {
      const response = await fetch('/api/score-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: selectedId, userAnswer })
      });
      const data = await response.json();
      if (data.success) {
        setScoringResult({
          success: true,
          score: data.score,
          feedback: data.feedback,
          strengths: data.strengths || [],
          improvements: data.improvements || []
        });
      } else {
        setScoringResult({
          success: false,
          score: 0,
          feedback: 'Fail to grade answer. Check backend connection.',
          strengths: [],
          improvements: []
        });
      }
    } catch (e) {
      setScoringResult({
        success: false,
        score: 0,
        feedback: 'Failed to communicate with AI Evaluator server.',
        strengths: [],
        improvements: []
      });
    } finally {
      setScoringLoading(false);
    }
  };

  // Filter computation
  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.id.toString() === searchQuery.trim();
    
    const matchesCategory = activeCategory === 'All Concepts' || q.category === activeCategory;
    const matchesDifficulty = difficultyFilter === 'All' || q.difficulty === difficultyFilter;
    const matchesStarred = !filterStarredOnly || progress.starredIds.includes(q.id);

    return matchesSearch && matchesCategory && matchesDifficulty && matchesStarred;
  });

  const completionPercent = Math.round((progress.completedIds.length / questions.length) * 100);

  const handleNextQuestion = () => {
    const listToUse = filteredQuestions.length > 0 ? filteredQuestions : questions;
    const currentIndex = listToUse.findIndex((q) => q.id === selectedId);
    if (currentIndex > -1) {
      const nextIndex = (currentIndex + 1) % listToUse.length;
      setSelectedId(listToUse[nextIndex].id);
    } else {
      setSelectedId(listToUse[0]?.id || 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* 1. TOP HEADER / PROGRESS BAR */}
      <header className="max-w-7xl w-full mx-auto px-4 pt-4 sticky top-0 z-40">
        <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-2xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl relative overflow-hidden">
          {/* Subtle green ambient light */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />
          
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl shadow-inner shadow-emerald-500/10">
              <BookMarked className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm md:text-base font-bold font-display text-white tracking-tight flex items-center gap-2">
                aws_solutions_architect_100.md
                <span className="text-[10px] bg-slate-800 text-emerald-400 font-mono font-bold px-2 py-0.5 rounded border border-slate-700">WORKFLOW ACTIVE</span>
              </h1>
              <p className="text-xs text-slate-400 font-sans mt-0.5">Parsed 100 questions • 9 AWS Architectural domains</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            {/* Progress Tracker Ring / Bar */}
            <div className="flex items-center gap-3 bg-slate-950/40 px-3 py-1.5 rounded-xl border border-slate-800/60">
              <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                <svg className="w-8 h-8 transform -rotate-90">
                  <circle cx="16" cy="16" r="13" className="stroke-slate-800 fill-none" strokeWidth="2.5" />
                  <circle 
                    cx="16" 
                    cy="16" 
                    r="13" 
                    className="stroke-emerald-500 fill-none transition-all duration-500" 
                    strokeWidth="2.5" 
                    strokeDasharray={`${2 * Math.PI * 13}`}
                    strokeDashoffset={`${2 * Math.PI * 13 * (1 - completionPercent / 100)}`}
                  />
                </svg>
                <span className="absolute text-[8px] font-mono font-bold text-slate-200">{completionPercent}%</span>
              </div>
              <div className="min-w-0">
                <div className="text-[9px] font-mono text-slate-500 font-semibold uppercase tracking-wider">Mastery</div>
                <div className="text-xs font-bold text-slate-200 font-mono flex items-center gap-1">
                  <span>{progress.completedIds.length}/100</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-amber-400 flex items-center gap-0.5"><Star className="w-3 h-3 fill-current" /> {progress.starredIds.length}</span>
                </div>
              </div>
            </div>

            <div className="h-8 w-[1px] bg-slate-850 hidden sm:block"></div>

            <button 
              onClick={handleNextQuestion}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all duration-200 shadow-md shadow-emerald-950/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              Next Question
            </button>
          </div>
        </div>
      </header>


      {/* 2. MAIN HUB CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: FILTERS & CARD LIST (4 Cols) */}
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-[88px] h-auto lg:max-h-[calc(100vh-120px)] flex flex-col">
          
          {/* Search and Advanced filter panel */}
          <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-5 space-y-3.5 shadow-xl relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input 
                type="text" 
                placeholder="Search index, keywords, service..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Difficulty Pill Selector */}
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Difficulty:</span>
              <div className="flex gap-1.5">
                {(['All', 'Foundational', 'Associate', 'Professional'] as const).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setDifficultyFilter(diff)}
                    className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                      difficultyFilter === diff 
                        ? 'bg-emerald-600/25 border border-emerald-500 text-emerald-300' 
                        : 'bg-slate-950 border border-slate-850 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {diff === 'All' ? 'All' : diff.substring(0, 5)}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Toggle: Starred / Favorites Only */}
            <button
              onClick={() => setFilterStarredOnly(!filterStarredOnly)}
              className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-between transition-all border ${
                filterStarredOnly 
                  ? 'bg-amber-950/35 border-amber-500 text-amber-300 shadow-md shadow-amber-950/20' 
                  : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Star className={`w-3.5 h-3.5 ${filterStarredOnly ? 'fill-current' : ''}`} />
                Show Bookmarked Cards Only
              </span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 bg-slate-900 border border-slate-800 rounded">
                {progress.starredIds.length}
              </span>
            </button>
          </div>

          {/* Core Mastery Bento Widget */}
          <div className="bg-emerald-600 rounded-3xl p-5 text-white flex flex-col justify-between shadow-xl shadow-emerald-950/20 relative overflow-hidden">
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-white/20 rounded-xl">
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              </div>
              <span className="text-[10px] font-mono font-black uppercase tracking-wider opacity-80">AWS Study Mastery</span>
            </div>
            <div>
              <div className="text-3xl font-bold font-display mb-1">{completionPercent}% Complete</div>
              <div className="w-full bg-black/20 h-1.5 rounded-full mb-2">
                <div 
                  className="bg-white h-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-500" 
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
            </div>
            <p className="text-[10px] font-medium opacity-90 leading-relaxed font-sans">
              You've mastered {progress.completedIds.length} of {questions.length} critical Solutions Architect concepts.
            </p>
          </div>

          {/* Categories Horizontal Scrolling Filter */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); }}
                className={`whitespace-nowrap px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition-all border ${
                  activeCategory === cat 
                    ? 'bg-slate-100 text-slate-900 border-white' 
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* List Of Filtered Questions */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-2 h-[420px] lg:h-[calc(100vh-420px)] scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider px-1">
              Matching Cards ({filteredQuestions.length})
            </div>

            {filteredQuestions.length === 0 ? (
              <div className="bg-slate-900/40 border border-dashed border-slate-800 rounded-3xl p-8 text-center space-y-2">
                <HelpCircle className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400 font-sans">No cards match active search query or filter tags.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveCategory('All Concepts'); setDifficultyFilter('All'); setFilterStarredOnly(false); }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-[10px] font-mono uppercase font-bold"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              filteredQuestions.map((q) => {
                const isSelected = q.id === selectedId;
                const isMastered = progress.completedIds.includes(q.id);
                const isStarred = progress.starredIds.includes(q.id);

                return (
                  <div
                    key={q.id}
                    onClick={() => setSelectedId(q.id)}
                    className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all flex gap-3 relative ${
                      isSelected 
                        ? 'bg-slate-900 border-emerald-500/80 shadow-md shadow-emerald-950/10' 
                        : 'bg-slate-900/60 border-slate-850 hover:bg-slate-900 hover:border-slate-800'
                    }`}
                  >
                    {/* Mastery Checkbox click area */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleCompleted(q.id); }}
                      className="mt-0.5 text-slate-500 hover:text-emerald-400 focus:outline-none"
                    >
                      {isMastered ? (
                        <CheckSquare className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-700" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span className="text-[10px] font-mono font-bold text-slate-450">Q-{q.id}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold font-mono uppercase tracking-wide border ${
                          q.difficulty === 'Professional' 
                            ? 'bg-rose-950/30 text-rose-400 border-rose-900/60' 
                            : q.difficulty === 'Associate' 
                            ? 'bg-amber-950/30 text-amber-400 border-amber-900/60' 
                            : 'bg-emerald-950/30 text-emerald-400 border-emerald-900/60'
                        }`}>
                          {q.difficulty}
                        </span>
                        <span className="text-[9px] font-mono text-slate-500">{q.service}</span>
                      </div>
                      <h4 className={`text-xs font-semibold leading-snug truncate ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {q.question}
                      </h4>
                    </div>

                    {/* Bookmark Indicator click area */}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleStarred(q.id); }}
                      className="mt-0.5 text-slate-500 hover:text-amber-400 focus:outline-none"
                    >
                      <Star className={`w-3.5 h-3.5 ${isStarred ? 'text-amber-400 fill-current' : 'text-slate-700'}`} />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: DETAILED WORKSPACE (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Question core answer card */}
          <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            {/* Ambient service glow block */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />

            <div className="flex justify-between items-start mb-4 gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-400 bg-slate-950 border border-slate-850 px-2.5 py-1 rounded-lg">
                  AWS Concept #{selectedQuestion.id}
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/45 border border-emerald-900/60 px-2.5 py-1 rounded-lg">
                  {selectedQuestion.service}
                </span>
                <span className={`text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${
                  selectedQuestion.difficulty === 'Professional' 
                    ? 'bg-rose-950/30 text-rose-400 border-rose-900/60' 
                    : selectedQuestion.difficulty === 'Associate' 
                    ? 'bg-amber-950/30 text-amber-400 border-amber-900/60' 
                    : 'bg-emerald-950/30 text-emerald-400 border-emerald-900/60'
                }`}>
                  {selectedQuestion.difficulty} Level
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleStarred(selectedQuestion.id)}
                  className={`p-2 rounded-xl border transition-all ${
                    progress.starredIds.includes(selectedQuestion.id)
                      ? 'bg-amber-950/40 border-amber-700 text-amber-300'
                      : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200'
                  }`}
                  title="Bookmark Card"
                >
                  <Star className={`w-4 h-4 ${progress.starredIds.includes(selectedQuestion.id) ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={() => toggleCompleted(selectedQuestion.id)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    progress.completedIds.includes(selectedQuestion.id)
                      ? 'bg-emerald-950/50 border-emerald-750 text-emerald-350'
                      : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Check className={`w-4 h-4 ${progress.completedIds.includes(selectedQuestion.id) ? 'text-emerald-400' : 'text-slate-600'}`} />
                  {progress.completedIds.includes(selectedQuestion.id) ? 'Mastered' : 'Mark Mastered'}
                </button>
              </div>
            </div>

            <h2 className="text-xl md:text-2xl font-bold font-display tracking-tight text-white mb-4 leading-tight">
              {selectedQuestion.question}
            </h2>

            {/* AI EXPANSION TAB SWITCHES */}
            <div className="flex gap-1.5 border-b border-slate-800/80 pb-3 mb-5 overflow-x-auto">
              <button
                onClick={() => setActiveTab('answer')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all font-mono uppercase tracking-wider flex items-center gap-1.5 ${
                  activeTab === 'answer'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" /> Core Answer
              </button>

              <button
                onClick={() => fetchAiExplanation('eli5')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all font-mono uppercase tracking-wider flex items-center gap-1.5 ${
                  activeTab === 'eli5'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> Explain (ELI5)
              </button>

              <button
                onClick={() => fetchAiExplanation('deep')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all font-mono uppercase tracking-wider flex items-center gap-1.5 ${
                  activeTab === 'deep'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Activity className="w-3.5 h-3.5 text-sky-400" /> Architect Deep-Dive
              </button>

              <button
                onClick={() => fetchAiExplanation('interview')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all font-mono uppercase tracking-wider flex items-center gap-1.5 ${
                  activeTab === 'interview'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" /> Elevator Pitch
              </button>
            </div>

            {/* TAB CONTENT PANEL */}
            <div className="bg-slate-950/60 border border-slate-850 rounded-2xl p-5 min-h-[120px] leading-relaxed text-slate-300">
              <AnimatePresence mode="wait">
                {activeTab === 'answer' ? (
                  <motion.div
                    key="answer"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xs md:text-sm space-y-3"
                  >
                    <p className="whitespace-pre-line text-slate-200 font-medium leading-relaxed">
                      {selectedQuestion.answer}
                    </p>
                  </motion.div>
                ) : loadingAi ? (
                  <motion.div 
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-8 space-y-3"
                  >
                    <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                    <span className="text-xs font-mono text-slate-400 animate-pulse">Consulting server-side Gemini Architect...</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="ai-expl"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs md:text-sm whitespace-pre-wrap font-sans text-slate-200 space-y-2 leading-relaxed"
                  >
                    {aiExplanation}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Real World Business Scenario Block */}
            <div className="mt-5 border-t border-slate-800/80 pt-4">
              <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Real-World Business Scenario</span>
              <div className="bg-slate-950/30 border border-slate-850 rounded-2xl p-4 flex gap-3">
                <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{selectedQuestion.example}"
                </p>
              </div>
            </div>
          </div>

          {/* INTERACTIVE SIMULATOR DIAGRAM CANVAS */}
          <InteractiveDiagrams 
            category={selectedQuestion.category} 
            questionId={selectedQuestion.id} 
          />

          {/* CODE / CONFIG SNIPPET (IF EXIST) */}
          {selectedQuestion.snippet && (
            <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-5 shadow-xl">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Hands-on Configuration Code / CLI</span>
                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/40 border border-indigo-900/50 px-2 py-0.5 rounded uppercase font-bold">
                  {selectedQuestion.snippet.language}
                </span>
              </div>

              <div className="bg-slate-950 rounded-lg p-4 border border-slate-850/80 relative group">
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleCopy(selectedQuestion.snippet!.code)}
                    className="px-2.5 py-1 bg-slate-800/90 border border-slate-700 rounded text-[10px] font-bold text-slate-300 flex items-center gap-1.5 hover:bg-slate-700 transition-all shadow-md active:scale-95"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>

                <div className="text-[10px] text-slate-500 font-mono font-bold mb-2 uppercase border-b border-slate-900 pb-1">
                  {selectedQuestion.snippet.title}
                </div>

                <pre className="font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre leading-relaxed select-all">
                  <code>{selectedQuestion.snippet.code}</code>
                </pre>
              </div>
            </div>
          )}

          {/* MOCK INTERVIEW EVALUATOR ARENA */}
          <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-emerald-950/45 border border-emerald-900/60 px-3 py-1 rounded-full text-[9px] font-bold font-mono text-emerald-300 uppercase tracking-wider">
              AI Assessment Sandbox
            </div>

            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="w-5 h-5 text-emerald-400 animate-pulse" />
              <h3 className="text-sm font-semibold text-slate-200 font-mono">Mock Interview Arena</h3>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Practice saying or writing your answer below. Our server-side Gemini model acts as a lead interviewer, scoring your technical accuracy, terminology, and giving professional recruiter feedback.
            </p>

            <div className="space-y-4">
              <textarea 
                placeholder="Type your explanation here... (e.g. EC2 is virtual computing, security groups act as stateful firewalls, etc.)"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs md:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-sans transition-all leading-relaxed"
              />

              <div className="flex justify-end">
                <button
                  onClick={handleGradeAnswer}
                  disabled={!userAnswer.trim() || scoringLoading}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold uppercase flex items-center gap-2 transition-all shadow-md shadow-emerald-600/10 active:scale-95 disabled:opacity-40"
                >
                  {scoringLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Grading Answer...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" /> Submit to AI Recruiter
                    </>
                  )}
                </button>
              </div>

              {/* Assessment evaluation result card */}
              <AnimatePresence>
                {scoringResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-slate-900 pb-3 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-emerald-400" />
                        <span className="text-xs font-mono font-bold text-slate-300">Technical Score Report</span>
                      </div>

                      {/* Animated circular/oval scoring tag */}
                      <div className={`px-4 py-1.5 rounded-full text-xs font-mono font-black ${
                        scoringResult.score > 80 
                          ? 'bg-emerald-950/60 border border-emerald-500 text-emerald-400' 
                          : scoringResult.score > 50 
                          ? 'bg-amber-950/60 border border-amber-500 text-amber-400' 
                          : 'bg-rose-950/60 border border-rose-500 text-rose-400'
                      }`}>
                        Interview Grade: {scoringResult.score}%
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      <strong className="text-slate-400 font-mono">Feedback:</strong> "{scoringResult.feedback}"
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {/* Strengths bullet lists */}
                      <div className="bg-emerald-950/10 border border-emerald-900/40 p-3 rounded-xl space-y-1.5">
                        <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">Strengths Detected</span>
                        {scoringResult.strengths.length === 0 ? (
                          <div className="text-[11px] text-slate-500 font-mono">None identified. Speak about specific architectures or key terms.</div>
                        ) : (
                          <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                            {scoringResult.strengths.map((str, idx) => <li key={idx}>{str}</li>)}
                          </ul>
                        )}
                      </div>

                      {/* Improvements list */}
                      <div className="bg-amber-950/10 border border-amber-900/40 p-3 rounded-xl space-y-1.5">
                        <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">Suggested Improvements</span>
                        {scoringResult.improvements.length === 0 ? (
                          <div className="text-[11px] text-slate-500 font-mono">No improvements suggested! Flawless explanation.</div>
                        ) : (
                          <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                            {scoringResult.improvements.map((imp, idx) => <li key={idx}>{imp}</li>)}
                          </ul>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* PERSONAL STUDY NOTES AREA */}
          <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-5 shadow-xl relative overflow-hidden">
            <span className="text-[10px] font-mono text-slate-500 uppercase block mb-2">Interactive Sticky Study Notes</span>
            <div className="flex gap-2">
              <textarea
                placeholder="Jot down quick reminders for yourself... (e.g. 'Standard is cheaper standard standard IA requires 30 days retention!')"
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                rows={2}
                className="flex-1 bg-slate-950 border border-slate-850 rounded-xl p-3 text-xs text-slate-300 placeholder-slate-600 font-sans focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleSaveNote}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold font-mono uppercase tracking-wider shrink-0 transition-all flex items-center justify-center shadow-md shadow-emerald-950/10 active:scale-95"
              >
                Save Card Note
              </button>
            </div>
            {progress.notes[selectedId] && (
              <div className="mt-2 text-[10px] font-mono text-emerald-450 flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Study note saved securely in browser storage.
              </div>
            )}
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900 mt-12 py-8 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 AWS 100 Interview Prep. Built for Solutions Architects & DevOps Engineers.</p>
          <div className="flex gap-4">
            <a href="https://aws.amazon.com/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
              Official AWS docs <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
