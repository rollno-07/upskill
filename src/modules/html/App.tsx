/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Terminal, Layout, Link as LinkIcon, Code, CheckSquare, Image as ImageIcon, 
  Shield, Eye, BookOpen, Award, Activity, Search, Star, Check, Copy, 
  ChevronRight, ChevronLeft, Play, Sparkles, RotateCcw, Info, ExternalLink, 
  X, CheckCircle2, ThumbsUp, Filter, Clock, Heart, List, HelpCircle, ArrowRight
} from 'lucide-react';
import { ALL_QUESTIONS } from './data/allQuestions';
import { CATEGORIES } from './data/categories';
import { Question, UserProgress } from './types';
import Visualizer from './components/Visualizer';

export default function App() {
  // State for layout & active views
  const [activeTab, setActiveTab] = useState<'explore' | 'quiz' | 'audit'>('explore');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(1);
  const [starredOnly, setStarredOnly] = useState(false);
  const [unlearnedOnly, setUnlearnedOnly] = useState(false);

  // Search Results & copy notification
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // User persistence state
  const [progress, setProgress] = useState<UserProgress>({
    viewedQuestionIds: [],
    starredQuestionIds: [],
    completedQuizIds: [],
    scores: {}
  });

  // Code Playground dynamic content state
  const [sandboxCode, setSandboxCode] = useState('');

  // ------------------------------------
  // LocalStorage Synchronization
  // ------------------------------------
  useEffect(() => {
    const saved = localStorage.getItem('html_qa_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProgress(parsed);
      } catch (e) {
        console.error("Failed to load user progress history:", e);
      }
    }
  }, []);

  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('html_qa_progress', JSON.stringify(newProgress));
  };

  // ------------------------------------
  // Dynamic Active Question Data Logic
  // ------------------------------------
  const activeQuestion = useMemo(() => {
    return ALL_QUESTIONS.find(q => q.id === selectedQuestionId) || ALL_QUESTIONS[0];
  }, [selectedQuestionId]);

  // Sync Sandbox editor to the active question's code example
  useEffect(() => {
    if (activeQuestion) {
      setSandboxCode(activeQuestion.codeExample);
    }
  }, [activeQuestion]);

  // Handle Mark Learned toggle
  const toggleLearned = (id: number) => {
    const list = [...progress.viewedQuestionIds];
    const idx = list.indexOf(id);
    if (idx > -1) {
      list.splice(idx, 1);
    } else {
      list.push(id);
    }
    saveProgress({ ...progress, viewedQuestionIds: list });
  };

  // Handle Star toggle
  const toggleStar = (id: number) => {
    const list = [...progress.starredQuestionIds];
    const idx = list.indexOf(id);
    if (idx > -1) {
      list.splice(idx, 1);
    } else {
      list.push(id);
    }
    saveProgress({ ...progress, starredQuestionIds: list });
  };

  // Copy code utility
  const handleCopyCode = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  // ------------------------------------
  // Filtering & Query compilation
  // ------------------------------------
  const filteredQuestions = useMemo(() => {
    return ALL_QUESTIONS.filter(q => {
      const matchCategory = activeCategory === 'all' || q.category === activeCategory;
      const matchSearch = searchQuery.trim() === '' || 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.explanation.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStarred = !starredOnly || progress.starredQuestionIds.includes(q.id);
      const matchUnlearned = !unlearnedOnly || !progress.viewedQuestionIds.includes(q.id);

      return matchCategory && matchSearch && matchStarred && matchUnlearned;
    });
  }, [activeCategory, searchQuery, starredOnly, unlearnedOnly, progress]);

  // Auto-select first matching element when filter shifts
  useEffect(() => {
    if (filteredQuestions.length > 0) {
      const exists = filteredQuestions.some(q => q.id === selectedQuestionId);
      if (!exists) {
        setSelectedQuestionId(filteredQuestions[0].id);
      }
    }
  }, [filteredQuestions, selectedQuestionId]);

  // ------------------------------------
  // Category Icons Lookup
  // ------------------------------------
  const getCategoryIcon = (key: string) => {
    switch (key) {
      case 'basics': return <Terminal className="w-4 h-4 text-amber-400" />;
      case 'structure': return <Layout className="w-4 h-4 text-blue-400" />;
      case 'attributes': return <LinkIcon className="w-4 h-4 text-teal-400" />;
      case 'metadata': return <Code className="w-4 h-4 text-purple-400" />;
      case 'forms': return <CheckSquare className="w-4 h-4 text-pink-400" />;
      case 'media': return <ImageIcon className="w-4 h-4 text-cyan-400" />;
      case 'dom': return <Shield className="w-4 h-4 text-emerald-400" />;
      case 'seo_a11y': return <Eye className="w-4 h-4 text-red-400" />;
      default: return <BookOpen className="w-4 h-4 text-white" />;
    }
  };

  // ------------------------------------
  // Quiz Sandbox States & Mechanisms
  // ------------------------------------
  const [quizSize, setQuizSize] = useState<5 | 10 | 20>(10);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [quizTimer, setQuizTimer] = useState(0);
  const [quizHighscore, setQuizHighscore] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load highscore
  useEffect(() => {
    const savedHigh = localStorage.getItem('html_quiz_highscore');
    if (savedHigh) {
      setQuizHighscore(parseInt(savedHigh));
    }
  }, []);

  const startNewQuiz = () => {
    // Collect random subset from database
    const shuffled = [...ALL_QUESTIONS].sort(() => 0.5 - Math.random());
    const subset = shuffled.slice(0, quizSize);

    setQuizQuestions(subset);
    setCurrentQuizIdx(0);
    setSelectedOption(null);
    setAnswered(false);
    setScore(0);
    setQuizTimer(0);
    setQuizStarted(true);

    // Initial Options Shuffle
    generateQuizOptions(subset[0]);

    // Setup Timer
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setQuizTimer(prev => prev + 1);
    }, 1000);
  };

  const generateQuizOptions = (question: Question) => {
    // 3 distractors from random answers in our 100 pool
    const otherAnswers = ALL_QUESTIONS
      .filter(q => q.id !== question.id)
      .map(q => q.answer)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    // Merge correct answer and shuffle
    const combined = [question.answer, ...otherAnswers].sort(() => 0.5 - Math.random());
    setShuffledOptions(combined);
  };

  const handleSelectOption = (opt: string) => {
    if (answered) return;
    setSelectedOption(opt);
  };

  const handleConfirmAnswer = () => {
    if (!selectedOption || answered) return;
    
    const correct = quizQuestions[currentQuizIdx].answer;
    if (selectedOption === correct) {
      setScore(prev => prev + 1);
    }
    setAnswered(true);
  };

  const handleNextQuizQuestion = () => {
    const nextIdx = currentQuizIdx + 1;
    if (nextIdx < quizQuestions.length) {
      setCurrentQuizIdx(nextIdx);
      setSelectedOption(null);
      setAnswered(false);
      generateQuizOptions(quizQuestions[nextIdx]);
    } else {
      // Quiz complete! Stop Timer
      if (timerRef.current) clearInterval(timerRef.current);
      
      // Update local storage highscore
      const currentHS = Math.max(quizHighscore, score);
      setQuizHighscore(currentHS);
      localStorage.setItem('html_quiz_highscore', currentHS.toString());

      // Save complete metrics
      const updatedScores = { ...progress.scores };
      const quizId = `quiz_${Date.now()}`;
      updatedScores[quizId] = score;
      
      saveProgress({
        ...progress,
        completedQuizIds: [...progress.completedQuizIds, quizQuestions.length],
        scores: updatedScores
      });

      setAnswered(true); // Flag to show end state screen
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // ------------------------------------
  // Dynamic Audit computations
  // ------------------------------------
  const categoryPercentages = useMemo(() => {
    return CATEGORIES.map(cat => {
      const totalInCat = ALL_QUESTIONS.filter(q => q.category === cat.key).length;
      const learnedInCat = ALL_QUESTIONS.filter(q => q.category === cat.key && progress.viewedQuestionIds.includes(q.id)).length;
      const pct = totalInCat > 0 ? Math.round((learnedInCat / totalInCat) * 100) : 0;
      return { ...cat, total: totalInCat, learned: learnedInCat, pct };
    });
  }, [progress]);

  const auditLevel = useMemo(() => {
    const totalLearned = progress.viewedQuestionIds.length;
    if (totalLearned >= 90) return { title: 'Full-Stack Authority', desc: 'Supreme master of modern semantic outline topologies, client security protocols, and visual loading performance metrics.' };
    if (totalLearned >= 60) return { title: 'Semantics Architect', desc: 'Proficient visual strategist comfortable deploying responsive content anchors, advanced dynamic HTML5 inputs, and robust accessibility pipelines.' };
    if (totalLearned >= 30) return { title: 'Layout Practitioner', desc: 'Capable development engineer fluent in document flows, core tag configurations, and DOM attribute specifications.' };
    return { title: 'HTML Novice', desc: 'Initiate web candidate building basic tags and structural foundations. Progress further to unlock professional competencies!' };
  }, [progress]);

  return (
    <div className="h-[calc(100vh-37px)] bg-[#050505] text-[#f5f5f5] flex flex-col font-sans overflow-hidden select-none">
      
      {/* ======================================================== */}
      {/* 1. MAIN GLOBAL HEADER (Artistic Flair Layout Grid) */}
      {/* ======================================================== */}
      <header className="h-20 border-b border-white/10 px-6 flex items-center justify-between shrink-0 bg-[#0a0a0a] relative z-20">
        {/* Left branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#E0FF4F]">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif italic font-bold text-lg md:text-xl text-white leading-none">
              HTML 100 <span className="text-[#E0FF4F] not-italic font-sans text-xs font-semibold uppercase tracking-wider pl-1">Mastery</span>
            </h1>
            <p className="text-[9px] font-mono uppercase tracking-widest text-white/40 mt-0.5">SPECIFICATIONS WALKTHROUGH</p>
          </div>
        </div>

        {/* Middle Tab Selectors */}
        <div className="hidden md:flex bg-white/5 border border-white/10 p-1 rounded-full overflow-hidden text-xs font-mono">
          <button 
            onClick={() => { setActiveTab('explore'); setQuizStarted(false); }}
            className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${activeTab === 'explore' ? 'bg-[#E0FF4F] text-black font-bold shadow-lg' : 'opacity-60 hover:opacity-100 text-white'}`}
          >
            <Activity className="w-3.5 h-3.5" />
            Exploration Board
          </button>
          <button 
            onClick={() => { setActiveTab('quiz'); }}
            className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${activeTab === 'quiz' ? 'bg-[#E0FF4F] text-black font-bold shadow-lg' : 'opacity-60 hover:opacity-100 text-white'}`}
          >
            <Award className="w-3.5 h-3.5" />
            Interactive Quiz
          </button>
          <button 
            onClick={() => { setActiveTab('audit'); setQuizStarted(false); }}
            className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${activeTab === 'audit' ? 'bg-[#E0FF4F] text-black font-bold shadow-lg' : 'opacity-60 hover:opacity-100 text-white'}`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Progress Audit
          </button>
        </div>

        {/* Right metrics indicator */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block">Learn Progress</span>
            <span className="font-mono text-xs font-bold text-white">
              <span className="text-[#E0FF4F]">{progress.viewedQuestionIds.length}</span> / 100 Learned
            </span>
          </div>
          <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden hidden sm:block">
            <div className="h-full bg-[#E0FF4F]" style={{ width: `${progress.viewedQuestionIds.length}%` }}></div>
          </div>
        </div>
      </header>

      {/* Mobile navigation tabs bar */}
      <div className="md:hidden flex bg-[#0c0c0c] border-b border-white/5 p-1 text-[11px] font-mono justify-around shrink-0">
        <button 
          onClick={() => { setActiveTab('explore'); setQuizStarted(false); }}
          className={`py-2 px-2 flex-1 text-center transition ${activeTab === 'explore' ? 'text-[#E0FF4F] font-bold border-b-2 border-[#E0FF4F]' : 'opacity-60'}`}
        >
          Exploration
        </button>
        <button 
          onClick={() => setActiveTab('quiz')}
          className={`py-2 px-2 flex-1 text-center transition ${activeTab === 'quiz' ? 'text-[#E0FF4F] font-bold border-b-2 border-[#E0FF4F]' : 'opacity-60'}`}
        >
          Interactive Quiz
        </button>
        <button 
          onClick={() => { setActiveTab('audit'); setQuizStarted(false); }}
          className={`py-2 px-2 flex-1 text-center transition ${activeTab === 'audit' ? 'text-[#E0FF4F] font-bold border-b-2 border-[#E0FF4F]' : 'opacity-60'}`}
        >
          Progress Audit
        </button>
      </div>

      {/* ======================================================== */}
      {/* 2. BODY CONTENT ROUTER */}
      {/* ======================================================== */}
      <main className="flex-1 flex overflow-hidden relative">

        {/* -------------------------------------------------------- */}
        {/* A. TAB: EXPLORATION BOARD */}
        {/* -------------------------------------------------------- */}
        {activeTab === 'explore' && (
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden w-full h-full">
            
            {/* Sidebar question catalog listing */}
            <aside className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col bg-[#080808] shrink-0 max-h-[320px] lg:max-h-none lg:h-full overflow-hidden">
              {/* Sidebar Filters Header */}
              <div className="p-4 border-b border-white/15 bg-black/40 space-y-3">
                {/* Search query box */}
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-white/30" />
                  <input 
                    type="text" 
                    placeholder="Search all 100 Q&As..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#E0FF4F] font-mono transition"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2.5 text-white/40 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Categories filtering carousel dropdown */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-mono text-white/40">
                    <span className="flex items-center gap-1 uppercase tracking-wider"><Filter className="w-3 h-3" /> Category</span>
                    <span>{filteredQuestions.length} Match</span>
                  </div>
                  <select 
                    value={activeCategory} 
                    onChange={(e) => setActiveCategory(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-md px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#E0FF4F] font-mono"
                  >
                    <option value="all" className="bg-[#050505]">All Concepts (100 Q&A)</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat.key} value={cat.key} className="bg-[#050505]">
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sub-Filters Starred & Unlearned Checkboxes */}
                <div className="flex items-center justify-between text-[10px] font-mono text-white/50 pt-1">
                  <button 
                    onClick={() => setStarredOnly(!starredOnly)}
                    className={`flex items-center gap-1 px-2 py-1 rounded transition ${starredOnly ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30' : 'hover:bg-white/5 border border-transparent'}`}
                  >
                    <Star className="w-3 h-3 fill-current" />
                    Starred ({progress.starredQuestionIds.length})
                  </button>
                  <button 
                    onClick={() => setUnlearnedOnly(!unlearnedOnly)}
                    className={`flex items-center gap-1 px-2 py-1 rounded transition ${unlearnedOnly ? 'bg-[#E0FF4F]/10 text-[#E0FF4F] border border-[#E0FF4F]/30' : 'hover:bg-white/5 border border-transparent'}`}
                  >
                    <Check className="w-3 h-3" />
                    Unlearned
                  </button>
                </div>
              </div>

              {/* Infinite scrolling Questions list */}
              <div className="flex-1 overflow-y-auto p-2 space-y-1 bg-black/20">
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map(q => {
                    const isSelected = q.id === selectedQuestionId;
                    const isStarred = progress.starredQuestionIds.includes(q.id);
                    const isLearned = progress.viewedQuestionIds.includes(q.id);
                    const indexStr = q.id < 10 ? `0${q.id}` : `${q.id}`;

                    return (
                      <div 
                        key={q.id}
                        onClick={() => setSelectedQuestionId(q.id)}
                        className={`group p-3 rounded-lg border cursor-pointer transition flex items-start gap-2.5 relative overflow-hidden ${isSelected ? 'bg-[#E0FF4F]/5 border-[#E0FF4F]/40 shadow-[0_0_15px_rgba(224,255,79,0.03)]' : 'bg-white/2 border-white/5 hover:border-white/15'}`}
                      >
                        {/* Selected Indicator left accent border */}
                        {isSelected && (
                          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#E0FF4F]"></div>
                        )}

                        {/* Question Index Prefix */}
                        <span className={`font-mono text-xs font-bold leading-none mt-0.5 shrink-0 ${isSelected ? 'text-[#E0FF4F]' : 'opacity-40 group-hover:opacity-100 text-white'}`}>
                          {indexStr}
                        </span>

                        {/* Title text */}
                        <div className="flex-1 min-w-0">
                          <p className={`text-[12px] font-sans leading-snug break-words font-medium transition ${isSelected ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                            {q.question}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[8px] font-mono uppercase opacity-40">
                              {q.category}
                            </span>
                          </div>
                        </div>

                        {/* Status Check and Stars togglers inside item */}
                        <div className="flex flex-col gap-1 items-center justify-center shrink-0">
                          <button 
                            onClick={(e) => { e.stopPropagation(); toggleLearned(q.id); }}
                            className={`p-1 rounded-md transition hover:bg-white/10 ${isLearned ? 'text-green-400' : 'text-white/20'}`}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); toggleStar(q.id); }}
                            className={`p-1 rounded-md transition hover:bg-white/10 ${isStarred ? 'text-yellow-400' : 'text-white/20'}`}
                          >
                            <Star className={`w-3.5 h-3.5 ${isStarred ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center text-xs text-white/30 font-mono">
                    <HelpCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    No matching concepts found.
                  </div>
                )}
              </div>
            </aside>

            {/* Split Main workspace container */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0 h-full">
              
              {/* LEFT COLUMN: EXPLANATION BLOCK AND LIVE PLAYGROUND */}
              <div className="flex-1 flex flex-col p-6 overflow-y-auto space-y-6 border-b md:border-b-0 md:border-r border-white/10 bg-[#0a0a0a]">
                
                {/* Meta details banner */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded bg-white/5 border border-white/10">
                      {getCategoryIcon(activeQuestion.category)}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">
                        Category: {activeQuestion.category.replace('_', ' ')}
                      </span>
                      <span className="text-xs font-mono text-[#E0FF4F] font-bold">
                        Concept {activeQuestion.id} of 100
                      </span>
                    </div>
                  </div>

                  {/* Actions Bar (Mark Learned / Star) */}
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <button 
                      onClick={() => toggleStar(activeQuestion.id)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full border transition ${progress.starredQuestionIds.includes(activeQuestion.id) ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' : 'bg-white/5 border-white/10 hover:border-white/30'}`}
                    >
                      <Star className={`w-3.5 h-3.5 ${progress.starredQuestionIds.includes(activeQuestion.id) ? 'fill-current' : ''}`} />
                      Favorite
                    </button>
                    <button 
                      onClick={() => toggleLearned(activeQuestion.id)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full border transition ${progress.viewedQuestionIds.includes(activeQuestion.id) ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'bg-[#E0FF4F] text-black border-[#E0FF4F] hover:bg-white hover:text-black font-semibold'}`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      {progress.viewedQuestionIds.includes(activeQuestion.id) ? 'Learned' : 'Mark Learned'}
                    </button>
                  </div>
                </div>

                {/* Majestic Serif question header */}
                <h2 className="font-serif italic font-bold text-2xl lg:text-3xl text-white leading-tight tracking-tight pt-2">
                  {activeQuestion.question}
                </h2>

                {/* 1. Quick Summary block */}
                <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#E0FF4F] shrink-0 mt-0.5 animate-pulse" />
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider block font-bold">Quick Technical Answer</span>
                    <p className="text-sm text-white font-medium leading-relaxed font-sans">{activeQuestion.answer}</p>
                  </div>
                </div>

                {/* 2. Comprehensive explanation block */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-[#E0FF4F] uppercase tracking-[0.2em] block font-bold">Deep Walkthrough</span>
                  <div className="text-white/80 text-xs leading-relaxed space-y-3 font-sans max-w-none border-l border-white/10 pl-4 py-1">
                    {activeQuestion.explanation.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* 3. Code Sandbox & Blueprint playground */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#E0FF4F] uppercase tracking-[0.2em] block font-bold flex items-center gap-1">
                      <Code className="w-3.5 h-3.5" /> Code Blueprint Sandbox
                    </span>
                    <button 
                      onClick={() => handleCopyCode(sandboxCode, activeQuestion.id)}
                      className="text-[10px] font-mono text-white/50 hover:text-[#E0FF4F] flex items-center gap-1 transition"
                    >
                      {copiedId === activeQuestion.id ? (
                        <>
                          <Check className="w-3 h-3 text-green-400" />
                          <span className="text-green-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Sandbox code editor box */}
                  <div className="border border-white/10 rounded-lg overflow-hidden bg-[#0c0c0c]">
                    <div className="px-3 py-1 bg-white/5 border-b border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
                      <span>Interactive Sandbox Editor</span>
                      <span className="uppercase text-purple-400 text-[8px] font-bold">{activeQuestion.codeLanguage}</span>
                    </div>
                    <textarea 
                      value={sandboxCode}
                      onChange={(e) => setSandboxCode(e.target.value)}
                      rows={6}
                      className="w-full p-4 font-mono text-[11px] bg-black text-white/90 outline-none resize-y border-0 leading-relaxed scrollbar-thin"
                    />
                    
                    {/* Sandbox rendered Live Preview panel */}
                    <div className="bg-neutral-950 border-t border-white/5">
                      <div className="px-3 py-1.5 bg-black/40 flex items-center justify-between text-[8px] font-mono uppercase tracking-wider text-white/30">
                        <span>LIVE RENDER PREVIEW (Real-time compiling)</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                      </div>
                      <div className="p-4 bg-white/2 text-xs min-h-[50px] relative text-left">
                        {/* Safe simulated renderer sandbox */}
                        <div 
                          className="prose prose-invert prose-xs max-w-none"
                          dangerouslySetInnerHTML={{ __html: sandboxCode || '<span class="text-white/30 italic">No layout code entered...</span>' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Previous/Next quick footer navigation buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-white/5 text-xs font-mono">
                  <button 
                    disabled={selectedQuestionId <= 1}
                    onClick={() => setSelectedQuestionId(prev => Math.max(1, prev - 1))}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/10 hover:border-white/30 hover:bg-white/5 transition disabled:opacity-20 disabled:pointer-events-none"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous Concept
                  </button>
                  <button 
                    disabled={selectedQuestionId >= 100}
                    onClick={() => setSelectedQuestionId(prev => Math.min(100, prev + 1))}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/10 hover:border-white/30 hover:bg-white/5 transition disabled:opacity-20 disabled:pointer-events-none text-[#E0FF4F]"
                  >
                    Next Concept
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN: INTERACTIVE CONCEPT DIAGRAMS VISUALIZER */}
              <div className="flex-1 p-6 flex flex-col justify-center bg-[#070707] h-full overflow-y-auto">
                <Visualizer 
                  visualId={activeQuestion.visualId}
                  visualDescription={activeQuestion.visualDescription}
                  questionId={activeQuestion.id}
                />
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* B. TAB: INTERACTIVE QUIZ SANDBOX */}
        {/* -------------------------------------------------------- */}
        {activeTab === 'quiz' && (
          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center max-w-3xl mx-auto w-full">
            {!quizStarted ? (
              /* Quiz Configuration / Intro Screen */
              <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-xl p-8 text-center space-y-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-yellow-500 via-[#E0FF4F] to-emerald-500"></div>
                
                <div className="w-16 h-16 rounded-full bg-[#E0FF4F]/10 border border-[#E0FF4F]/20 flex items-center justify-center text-[#E0FF4F] mx-auto animate-pulse">
                  <Award className="w-8 h-8" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-serif italic font-bold text-2xl text-white">Knowledge Sandbox Assessment</h3>
                  <p className="text-xs text-white/50 leading-relaxed font-sans max-w-sm mx-auto">
                    Evaluate your semantic HTML specifications fluency. Correct options are dynamically generated from actual interview datasets.
                  </p>
                </div>

                {/* Highscore details */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-white/60">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Session Personal Highscore: <strong className="text-white">{quizHighscore}</strong> Answers Correct</span>
                </div>

                {/* Sizes parameters selection */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block font-bold">Select Assessment Scale</span>
                  <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                    {([5, 10, 20] as const).map(size => (
                      <button 
                        key={size}
                        onClick={() => setQuizSize(size)}
                        className={`py-2 rounded-lg border transition ${quizSize === size ? 'bg-[#E0FF4F] text-black border-[#E0FF4F] font-bold' : 'bg-white/2 border-white/5 hover:border-white/10 text-white'}`}
                      >
                        {size === 5 ? 'Quick (5)' : size === 10 ? 'Core (10)' : 'Master (20)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Launch Button */}
                <button 
                  onClick={startNewQuiz}
                  className="w-full py-3 bg-[#E0FF4F] hover:bg-white text-black font-bold rounded-lg font-sans text-xs uppercase tracking-widest transition flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Launch Assessment Grid
                </button>
              </div>
            ) : (
              /* Active Quiz Question Screen */
              <div className="w-full max-w-xl bg-[#0a0a0a] border border-white/10 rounded-xl p-6 lg:p-8 space-y-6">
                
                {/* Active question header metrics */}
                <div className="flex justify-between items-center border-b border-white/5 pb-4 font-mono text-[10px] text-white/40">
                  <span className="uppercase tracking-widest">Question {currentQuizIdx + 1} of {quizQuestions.length}</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Timer: {Math.floor(quizTimer / 60)}:{(quizTimer % 60).toString().padStart(2, '0')}</span>
                  </div>
                </div>

                {/* Overall horizontal progress bar */}
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-500 to-[#E0FF4F] transition-all duration-300" style={{ width: `${((currentQuizIdx) / quizQuestions.length) * 100}%` }}></div>
                </div>

                {/* Real-time score ticker */}
                <div className="flex justify-between items-center py-2 px-3 bg-white/2 border border-white/5 rounded-md font-mono text-[10px]">
                  <span>Current Accuracy Correct:</span>
                  <span className="text-[#E0FF4F] font-bold">{score} Answers</span>
                </div>

                {/* Question title styled with majestic serif italic */}
                <h3 className="font-serif italic font-bold text-xl md:text-2xl text-white leading-snug">
                  {quizQuestions[currentQuizIdx]?.question}
                </h3>

                {/* Shuffled options select blocks */}
                <div className="space-y-2.5">
                  {shuffledOptions.map((opt, idx) => {
                    const isSelected = selectedOption === opt;
                    const isCorrectOption = opt === quizQuestions[currentQuizIdx]?.answer;
                    
                    let btnCls = "bg-white/2 border-white/5 hover:border-white/15 text-white/80";
                    if (isSelected) {
                      btnCls = "bg-[#E0FF4F]/10 border-[#E0FF4F] text-[#E0FF4F]";
                    }
                    if (answered) {
                      if (isCorrectOption) {
                        btnCls = "bg-green-500/10 border-green-500 text-green-400 font-medium";
                      } else if (isSelected) {
                        btnCls = "bg-red-500/10 border-red-500 text-red-400";
                      } else {
                        btnCls = "opacity-30 border-white/5 text-white/40";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={answered}
                        onClick={() => handleSelectOption(opt)}
                        className={`w-full p-4 rounded-lg border text-left text-xs leading-relaxed transition flex items-center justify-between gap-3 ${btnCls}`}
                      >
                        <span>{opt}</span>
                        {answered && isCorrectOption && <Check className="w-4 h-4 text-green-400 shrink-0" />}
                        {answered && isSelected && !isCorrectOption && <X className="w-4 h-4 text-red-500 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Confirm actions buttons footer / Explanation disclosure */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  {!answered ? (
                    <button
                      disabled={!selectedOption}
                      onClick={handleConfirmAnswer}
                      className="w-full py-3 bg-[#E0FF4F] disabled:opacity-20 disabled:pointer-events-none text-black font-bold uppercase tracking-widest text-[11px] font-mono rounded-lg transition"
                    >
                      Lock Answer Choice
                    </button>
                  ) : (
                    <div className="space-y-4">
                      {/* Explanatory disclosure */}
                      <div className="p-4 bg-white/2 rounded-lg border border-white/5 text-left text-xs leading-relaxed space-y-1">
                        <span className="text-[9px] font-mono text-[#E0FF4F] uppercase tracking-wider block font-bold">Specifications Explanation</span>
                        <p className="text-white/80 leading-relaxed font-sans">{quizQuestions[currentQuizIdx]?.explanation}</p>
                      </div>

                      {/* Progression trigger button */}
                      <button
                        onClick={() => {
                          if (currentQuizIdx + 1 < quizQuestions.length) {
                            handleNextQuizQuestion();
                          } else {
                            // Trigger end-state screen
                            setQuizStarted(false);
                            setQuizQuestions([]);
                          }
                        }}
                        className="w-full py-3 bg-[#E0FF4F] hover:bg-white text-black font-bold uppercase tracking-widest text-[11px] font-mono rounded-lg transition flex items-center justify-center gap-2"
                      >
                        {currentQuizIdx + 1 < quizQuestions.length ? (
                          <>
                            <span>Continue to Next Question</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        ) : (
                          <span>Finish & Check Results Report</span>
                        )}
                      </button>
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* C. TAB: PROGRESS AUDIT SUMMARY */}
        {/* -------------------------------------------------------- */}
        {activeTab === 'audit' && (
          <div className="flex-1 overflow-y-auto p-6 max-w-4xl mx-auto w-full space-y-8">
            
            {/* Header branding */}
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono text-[#E0FF4F] uppercase tracking-[0.25em] block font-bold">Spec Verification Report</span>
              <h3 className="font-serif italic font-bold text-3xl text-white">Developer Assessment Audit</h3>
              <p className="text-xs text-white/50 font-sans max-w-sm mx-auto">
                Comprehensive layout analytics compiled from active tracking indexes.
              </p>
            </div>

            {/* Core Statistics grid blocks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Box 1: Overall completion */}
              <div className="p-5 rounded-xl bg-[#0a0a0a] border border-white/10 space-y-3">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block">1. Total Learned Scope</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-serif text-white font-bold">{progress.viewedQuestionIds.length}</span>
                  <span className="text-xs text-white/40">/ 100 concepts</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-[#E0FF4F]" style={{ width: `${progress.viewedQuestionIds.length}%` }}></div>
                </div>
                <p className="text-[10px] text-white/40 leading-normal">
                  Toggle question checkpoints inside lists to advance your mastery progress.
                </p>
              </div>

              {/* Box 2: Favorites star tracking */}
              <div className="p-5 rounded-xl bg-[#0a0a0a] border border-white/10 space-y-3">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block">2. Saved References</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-serif text-[#E0FF4F] font-bold">{progress.starredQuestionIds.length}</span>
                  <span className="text-xs text-white/40">starred files</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-white/50">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                  <span>Bookmarks pinned for priority study reviews.</span>
                </div>
              </div>

              {/* Box 3: Audit Level Assessment card */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-neutral-900 to-black border border-[#E0FF4F]/20 space-y-3 relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-[#E0FF4F]/5 border border-[#E0FF4F]/10 flex items-center justify-center">
                  <Award className="w-8 h-8 text-[#E0FF4F]/10" />
                </div>
                <span className="text-[10px] font-mono text-[#E0FF4F] uppercase tracking-wider block font-bold">3. Interview Competency Rank</span>
                <div className="text-lg font-bold text-white font-serif italic">
                  {auditLevel.title}
                </div>
                <p className="text-[10px] text-white/60 leading-relaxed font-sans pr-4">
                  {auditLevel.desc}
                </p>
              </div>

            </div>

            {/* Category breakdown bar lines */}
            <div className="p-6 rounded-xl bg-[#0a0a0a] border border-white/10 space-y-4">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] block font-bold">Category Specifications Audit</span>
              
              <div className="space-y-4">
                {categoryPercentages.map(cat => (
                  <div key={cat.key} className="space-y-1.5 text-xs">
                    <div className="flex justify-between items-center font-mono">
                      <span className="text-white font-medium flex items-center gap-1.5">
                        {getCategoryIcon(cat.key)}
                        {cat.name}
                      </span>
                      <span className="text-white/60 text-[11px]">
                        {cat.learned} / {cat.total} Completed ({cat.pct}%)
                      </span>
                    </div>
                    {/* Progress bar line */}
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-[#E0FF4F]" style={{ width: `${cat.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assessment recommendations disclosure card */}
            <div className="p-6 rounded-xl bg-white/2 border border-white/5 flex items-start gap-4">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-yellow-400 shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">Specifications recommendations guidelines</h4>
                <p className="text-[11px] text-white/50 leading-relaxed">
                  To achieve total "Full-Stack Authority" status, focus on polishing modules like client-side security standards (XSS, SRI, CSP), visual render performance timelines, and responsive media constraints (srcset size matrices). Toggle checklists inside exploration boards as you resolve concepts.
                </p>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* ======================================================== */}
      {/* 3. CORE GLOBAL FOOTER */}
      {/* ======================================================== */}
      <footer className="h-10 border-t border-white/10 px-6 flex items-center justify-between text-[10px] font-mono text-white/40 bg-[#080808] shrink-0">
        <div>
          STATUS: <span className="text-[#E0FF4F]">COMPILATION ONLINE</span>
        </div>
        <div className="hidden sm:block">
          SPECIFICATION VERSION: HTML5 (W3C / WHATWG)
        </div>
        <div>
          DEVELOPER TRACKER ACTIVE
        </div>
      </footer>

    </div>
  );
}
