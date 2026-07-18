import React, { useState, useEffect, useMemo } from 'react';
import { 
  Layers, Search, Check, Bookmark, ChevronRight, Play, RefreshCw, 
  BookOpen, Award, Clock, ArrowRight, Lock, Terminal, Sliders, Eye, 
  HelpCircle, Sparkles, CheckCircle2, BookmarkCheck, FileText, 
  ArrowLeft, Share2, Volume2, Database, Cpu, Network, ShieldCheck, 
  Workflow, UserCheck, AlertCircle, Info, Lightbulb, Cloud
} from 'lucide-react';
import { allQuestions, categories } from './data/questions';
import { Question, UserProgress } from './types';
import { GCPDiagram } from './components/GCPDiagram';
import { generateQuizOptions, sandboxScenarios, SandboxScenario } from './utils';

export default function App() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'explorer' | 'quiz' | 'sandbox'>('explorer');

  // User State saved in LocalStorage
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('gcp_100_progress');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Error reading progress", e);
    }
    return { masteredIds: [], bookmarkedIds: [], notes: {} };
  });

  // Save progress automatically
  useEffect(() => {
    localStorage.setItem('gcp_100_progress', JSON.stringify(progress));
  }, [progress]);

  // Explorer Tab state
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(1);
  const [currentExpTab, setCurrentExpTab] = useState<'answer' | 'diagram' | 'code'>('answer');
  const [personalNoteInput, setPersonalNoteInput] = useState<string>('');
  const [showNotification, setShowNotification] = useState<string | null>(null);

  // Quiz Mode state
  const [quizSize, setQuizSize] = useState<number>(10);
  const [quizCategory, setQuizCategory] = useState<string>('all');
  const [quizIsActive, setQuizIsActive] = useState<boolean>(false);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [quizCurrentIndex, setQuizCurrentIndex] = useState<number>(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<string | null>(null);
  const [quizAnswersSubmitted, setQuizAnswersSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizHistory, setQuizHistory] = useState<{ questionId: number; correct: boolean; chosen: string }[]>([]);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Quiz Options Cache (so they don't re-shuffle on every render)
  const [currentQuizOptions, setCurrentQuizOptions] = useState<string[]>([]);

  // Architectural Sandbox state
  const [activeScenarioId, setActiveScenarioId] = useState<string>('serverless-api');
  const [activeScenarioNodeId, setActiveScenarioNodeId] = useState<string>('run');

  // Load selected question
  const currentQuestion = useMemo(() => {
    return allQuestions.find(q => q.id === selectedQuestionId) || allQuestions[0];
  }, [selectedQuestionId]);

  // Update personal note textarea value when selected question changes
  useEffect(() => {
    setPersonalNoteInput(progress.notes[selectedQuestionId] || '');
  }, [selectedQuestionId, progress.notes]);

  // Filtered Questions for Explorer list
  const filteredQuestions = useMemo(() => {
    let list = allQuestions;

    // Filter by Category
    if (selectedCategoryId !== 'all') {
      const category = categories.find(c => c.id === selectedCategoryId);
      if (category) {
        list = list.filter(q => category.questionIds.includes(q.id));
      }
    }

    // Filter by Search Query (ID or text content)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      list = list.filter(q => 
        q.id.toString() === query || 
        q.question.toLowerCase().includes(query) || 
        q.answer.toLowerCase().includes(query) ||
        q.explanation.toLowerCase().includes(query)
      );
    }

    return list;
  }, [selectedCategoryId, searchQuery]);

  // Adjust selection if current choice is filtered out
  useEffect(() => {
    if (filteredQuestions.length > 0) {
      const exists = filteredQuestions.some(q => q.id === selectedQuestionId);
      if (!exists) {
        setSelectedQuestionId(filteredQuestions[0].id);
      }
    }
  }, [filteredQuestions]);

  // Trigger brief alert notification
  const notify = (msg: string) => {
    setShowNotification(msg);
    setTimeout(() => setShowNotification(null), 2500);
  };

  // Mark Mastery toggle
  const toggleMastery = (id: number) => {
    setProgress(prev => {
      const mastered = prev.masteredIds.includes(id)
        ? prev.masteredIds.filter(x => x !== id)
        : [...prev.masteredIds, id];
      return { ...prev, masteredIds: mastered };
    });
    notify(progress.masteredIds.includes(id) ? "Removed from Mastered list" : "Added to Mastered! Keep it up! 🏆");
  };

  // Bookmark toggle
  const toggleBookmark = (id: number) => {
    setProgress(prev => {
      const bookmarked = prev.bookmarkedIds.includes(id)
        ? prev.bookmarkedIds.filter(x => x !== id)
        : [...prev.bookmarkedIds, id];
      return { ...prev, bookmarkedIds: bookmarked };
    });
    notify(progress.bookmarkedIds.includes(id) ? "Bookmark removed" : "Question Bookmarked!");
  };

  // Save current Note
  const saveNote = () => {
    setProgress(prev => ({
      ...prev,
      notes: { ...prev.notes, [selectedQuestionId]: personalNoteInput }
    }));
    notify("Notes saved securely in localStorage!");
  };

  // Reset Progress
  const resetAllProgress = () => {
    if (window.confirm("Are you sure you want to clear your study progress, notes, and mastered items? This cannot be undone.")) {
      setProgress({ masteredIds: [], bookmarkedIds: [], notes: {} });
      notify("Study progress reset successfully.");
    }
  };

  // Start the Quiz
  const startQuiz = () => {
    let pool = allQuestions;
    if (quizCategory !== 'all') {
      const category = categories.find(c => c.id === quizCategory);
      if (category) {
        pool = allQuestions.filter(q => category.questionIds.includes(q.id));
      }
    }

    if (pool.length === 0) {
      notify("Not enough questions in this category to start a quiz.");
      return;
    }

    // Pick random set
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(quizSize, shuffled.length));

    setQuizQuestions(selected);
    setQuizCurrentIndex(0);
    setQuizSelectedOption(null);
    setQuizAnswersSubmitted(false);
    setQuizScore(0);
    setQuizHistory([]);
    setQuizFinished(false);
    setQuizIsActive(true);

    // Initialize first question options
    if (selected.length > 0) {
      setCurrentQuizOptions(generateQuizOptions(selected[0], allQuestions));
    }
  };

  // Handle option selection
  const handleSelectOption = (opt: string) => {
    if (quizAnswersSubmitted) return;
    setQuizSelectedOption(opt);
  };

  // Submit Answer
  const submitQuizAnswer = () => {
    if (!quizSelectedOption || quizAnswersSubmitted) return;

    const currentQ = quizQuestions[quizCurrentIndex];
    const isCorrect = quizSelectedOption === currentQ.answer;

    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }

    setQuizHistory(prev => [
      ...prev,
      { questionId: currentQ.id, correct: isCorrect, chosen: quizSelectedOption }
    ]);

    setQuizAnswersSubmitted(true);
  };

  // Next Question or Finish
  const nextQuizQuestion = () => {
    const nextIndex = quizCurrentIndex + 1;
    if (nextIndex < quizQuestions.length) {
      setQuizCurrentIndex(nextIndex);
      setQuizSelectedOption(null);
      setQuizAnswersSubmitted(false);
      // Load next choices
      setCurrentQuizOptions(generateQuizOptions(quizQuestions[nextIndex], allQuestions));
    } else {
      setQuizFinished(true);
    }
  };

  // Helper to resolve icon elements
  const renderCategoryIcon = (iconName: string, className = "w-4 h-4") => {
    switch (iconName) {
      case 'Layers': return <Layers className={className} />;
      case 'Network': return <Network className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      case 'Database': return <Database className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Workflow': return <Workflow className={className} />;
      case 'UserCheck': return <UserCheck className={className} />;
      default: return <BookOpen className={className} />;
    }
  };

  // Sandbox Scenario selectors
  const currentScenario = useMemo(() => {
    return sandboxScenarios.find(s => s.id === activeScenarioId) || sandboxScenarios[0];
  }, [activeScenarioId]);

  const currentScenarioNode = useMemo(() => {
    return currentScenario.nodes.find(n => n.id === activeScenarioNodeId) || currentScenario.nodes[0];
  }, [currentScenario, activeScenarioNodeId]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-sky-500/30 selection:text-sky-200 font-sans">
      
      {/* GLOBAL TOAST NOTIFICATION */}
      {showNotification && (
        <div className="fixed top-5 right-5 z-50 bg-sky-400 text-zinc-950 font-bold px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce border border-sky-300/20">
          <Sparkles className="w-4 h-4 text-zinc-950" />
          <span className="text-xs font-mono">{showNotification}</span>
        </div>
      )}

      {/* HEADER BAR */}
      <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/10">
              <Cloud className="w-5 h-5 text-zinc-950 font-bold stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2 font-display">
                GCP 100 Interview Prep <span className="text-[10px] bg-sky-500/10 text-sky-400 font-mono px-1.5 py-0.5 rounded-lg border border-sky-500/20">v1.1</span>
              </h1>
              <p className="text-xs text-zinc-400">Interactive study guide, visual sandbox, and mock exams for all 100 Q&As</p>
            </div>
          </div>

          {/* Nav tabs */}
          <nav className="flex items-center bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800 shadow-inner">
            <button
              onClick={() => setActiveTab('explorer')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center gap-2 ${
                activeTab === 'explorer' 
                  ? 'bg-sky-500 text-zinc-950 shadow-md font-bold' 
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Study Cards
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center gap-2 ${
                activeTab === 'quiz' 
                  ? 'bg-sky-500 text-zinc-950 shadow-md font-bold' 
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              <Award className="w-3.5 h-3.5" /> Mock Exam
            </button>
            <button
              onClick={() => setActiveTab('sandbox')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center gap-2 ${
                activeTab === 'sandbox' 
                  ? 'bg-sky-500 text-zinc-950 shadow-md font-bold' 
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" /> Architectural Sandbox
            </button>
          </nav>
        </div>
      </header>

      {/* CORE CONTAINER */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 overflow-hidden">
        
        {/* ======================================= */}
        {/* 1. EXPLORER / FLASHCARD TAB */}
        {/* ======================================= */}
        {activeTab === 'explorer' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-start">
            
            {/* Sidebar list (Column span 4) */}
            <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2">
              
              {/* Progress and resets card */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 space-y-4 shadow-xl">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider font-display">Mastery Progress</span>
                  <button 
                    onClick={resetAllProgress}
                    className="text-[10px] text-zinc-500 hover:text-red-400 font-mono transition-colors cursor-pointer"
                  >
                    Reset Statistics
                  </button>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full border-4 border-zinc-800 flex items-center justify-center font-bold text-sm text-sky-400">
                    <span className="text-xs font-bold font-mono">
                      {Math.round((progress.masteredIds.length / allQuestions.length) * 100)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-zinc-200">
                      {progress.masteredIds.length} / {allQuestions.length} Mastered
                    </span>
                    <p className="text-[10px] text-zinc-500">
                      Mark cards as mastered to lock in your cloud expertise.
                    </p>
                  </div>
                </div>
              </div>

              {/* Filters Box */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 space-y-4 shadow-xl">
                {/* Search query */}
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search by keywords or ID (e.g. 50)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs placeholder-zinc-500 text-zinc-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20"
                  />
                </div>

                {/* Category Picker pills */}
                <div className="flex flex-col gap-1.5 pt-1">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 block">Categories</span>
                  {categories.map(cat => {
                    const isSelected = selectedCategoryId === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategoryId(cat.id)}
                        className={`text-left px-3 py-2.5 rounded-2xl text-xs transition-all flex items-center justify-between cursor-pointer border ${
                          isSelected 
                            ? 'bg-sky-500/10 border-sky-500/30 text-sky-400 font-semibold' 
                            : 'bg-zinc-950/40 border-transparent text-zinc-400 hover:bg-zinc-950 hover:text-zinc-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {renderCategoryIcon(cat.icon, `w-3.5 h-3.5 ${isSelected ? 'text-sky-400' : 'text-zinc-500'}`)}
                          <span className="font-medium">{cat.name}</span>
                        </div>
                        <span className="text-[9px] font-mono text-zinc-500 bg-zinc-950/60 px-1.5 py-0.5 rounded-lg border border-zinc-800/40">
                          {cat.id === 'all' ? allQuestions.length : cat.questionIds.length}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Study Question List */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block px-2">
                  Questions Pool ({filteredQuestions.length})
                </span>
                {filteredQuestions.length === 0 ? (
                  <div className="text-center py-8 text-xs text-zinc-600 bg-zinc-900/30 border border-zinc-900 rounded-3xl">
                    No matching questions found.
                  </div>
                ) : (
                  filteredQuestions.map(q => {
                    const isSelected = selectedQuestionId === q.id;
                    const isMastered = progress.masteredIds.includes(q.id);
                    const isBookmarked = progress.bookmarkedIds.includes(q.id);

                    return (
                      <button
                        key={q.id}
                        onClick={() => setSelectedQuestionId(q.id)}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                          isSelected 
                            ? 'bg-sky-500/10 border-sky-500 text-sky-200 shadow-lg' 
                            : 'bg-zinc-900/60 border-zinc-900/50 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                        }`}
                      >
                        <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded-lg ${
                          isSelected ? 'bg-sky-500/20 text-sky-300' : 'bg-zinc-950 text-zinc-500 border border-zinc-900'
                        }`}>
                          Q{q.id}
                        </span>
                        
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold truncate text-zinc-100">{q.question}</p>
                          <span className="text-[9px] text-zinc-500 block mt-0.5 font-medium">{q.category}</span>
                        </div>

                        {/* Status Checkers */}
                        <div className="flex gap-1.5 items-center self-center">
                          {isBookmarked && <Bookmark className="w-3 h-3 fill-amber-500 text-amber-500" />}
                          {isCorrectBadge(isMastered)}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* main Content display card (Column span 8) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Card Header controls */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
                  <div className="space-y-1">
                    <span className="text-[10px] bg-sky-500/10 text-sky-400 font-mono font-bold px-2.5 py-0.5 rounded-lg border border-sky-500/20">
                      QUESTION {currentQuestion.id} OF 100
                    </span>
                    <h2 className="text-xs font-bold text-zinc-400 mt-2 uppercase tracking-widest font-display">
                      {currentQuestion.category}
                    </h2>
                  </div>

                  {/* Bookmark and Mastered controllers */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleBookmark(currentQuestion.id)}
                      className={`p-2.5 rounded-2xl border text-xs flex items-center gap-1.5 cursor-pointer transition-all ${
                        progress.bookmarkedIds.includes(currentQuestion.id)
                          ? 'bg-amber-500/15 border-amber-500 text-amber-400'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-100'
                      }`}
                      title="Bookmark this Question"
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                      <span className="font-medium">Bookmark</span>
                    </button>

                    <button
                      onClick={() => toggleMastery(currentQuestion.id)}
                      className={`p-2.5 rounded-2xl border text-xs flex items-center gap-1.5 cursor-pointer transition-all ${
                        progress.masteredIds.includes(currentQuestion.id)
                          ? 'bg-emerald-500 text-zinc-950 border-emerald-500 font-bold'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-emerald-500/50 hover:text-zinc-100'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span className="font-medium">{progress.masteredIds.includes(currentQuestion.id) ? 'Mastered!' : 'Mark Mastered'}</span>
                    </button>
                  </div>
                </div>

                {/* Core Question text */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white tracking-tight leading-snug font-display">
                    {currentQuestion.question}
                  </h3>
                </div>

                {/* Main Tabs switcher (Answer / Diagram / Code) */}
                <div className="flex border-b border-zinc-800">
                  <button
                    onClick={() => setCurrentExpTab('answer')}
                    className={`pb-3 px-4 text-xs font-semibold cursor-pointer transition-colors relative ${
                      currentExpTab === 'answer' ? 'text-sky-400 font-bold' : 'text-zinc-400 hover:text-zinc-100'
                    }`}
                  >
                    Direct Answer & Explanation
                    {currentExpTab === 'answer' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400" />}
                  </button>
                  <button
                    onClick={() => setCurrentExpTab('diagram')}
                    className={`pb-3 px-4 text-xs font-semibold cursor-pointer transition-colors relative flex items-center gap-1.5 ${
                      currentExpTab === 'diagram' ? 'text-sky-400 font-bold' : 'text-zinc-400 hover:text-zinc-100'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" /> Interactive Diagram
                    {currentExpTab === 'diagram' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400" />}
                  </button>
                  <button
                    onClick={() => setCurrentExpTab('code')}
                    className={`pb-3 px-4 text-xs font-semibold cursor-pointer transition-colors relative flex items-center gap-1.5 ${
                      currentExpTab === 'code' ? 'text-sky-400 font-bold' : 'text-zinc-400 hover:text-zinc-100'
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5" /> Lab & Code Exercises
                    {currentExpTab === 'code' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400" />}
                  </button>
                </div>

                {/* Tab content renderer */}
                <div className="min-h-[220px]">
                  {/* TAB 1: ANSWER */}
                  {currentExpTab === 'answer' && (
                    <div className="space-y-5 animate-fadeIn">
                      {/* Direct Answer (Bold Highlights) */}
                      <div className="bg-zinc-950/60 p-5 border border-zinc-800 rounded-2xl space-y-1.5">
                        <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider flex items-center gap-1.5 font-display">
                          <Lightbulb className="w-3.5 h-3.5 text-sky-400" /> Executive Answer Summary
                        </span>
                        <p className="text-sm text-zinc-100 leading-relaxed font-medium">
                          {currentQuestion.answer}
                        </p>
                      </div>

                      {/* Detailed Explanation */}
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block font-display">
                          Deep-Dive & Concept Breakdown
                        </span>
                        <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line">
                          {currentQuestion.explanation}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: DIAGRAM */}
                  {currentExpTab === 'diagram' && (
                    <div className="space-y-4 animate-fadeIn">
                      <GCPDiagram type={currentQuestion.diagramType} />
                      <div className="flex items-start gap-2.5 p-4 bg-zinc-950/40 border border-zinc-800 rounded-2xl">
                        <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-bold text-zinc-300">Visual Blueprint Insight:</span>
                          <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">{currentQuestion.visualAid}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: CODE */}
                  {currentExpTab === 'code' && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-sky-400 flex items-center gap-1.5 font-display">
                          <Terminal className="w-3.5 h-3.5" /> {currentQuestion.example.title}
                        </h4>
                        <p className="text-[11px] text-zinc-400">{currentQuestion.example.description}</p>
                      </div>

                      {/* Display CLI commands */}
                      {currentQuestion.example.cli && (
                        <div className="bg-zinc-950/95 border border-zinc-800 rounded-2xl p-5 font-mono text-xs overflow-x-auto relative">
                          <span className="absolute right-4 top-3 text-[8px] bg-zinc-900 border border-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded-md uppercase tracking-wider font-bold">Bash / CLI</span>
                          <pre className="text-emerald-400 whitespace-pre-wrap">{currentQuestion.example.cli}</pre>
                        </div>
                      )}

                      {/* Display Code config */}
                      {currentQuestion.example.code && (
                        <div className="bg-zinc-950/95 border border-zinc-800 rounded-2xl p-5 font-mono text-xs overflow-x-auto relative">
                          <span className="absolute right-4 top-3 text-[8px] bg-zinc-900 border border-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded-md uppercase tracking-wider font-bold">Code / YAML</span>
                          <pre className="text-indigo-400 whitespace-pre">{currentQuestion.example.code}</pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* PERSONAL STUDY NOTES UNIT */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 font-display">
                    <FileText className="w-3.5 h-3.5 text-sky-400" /> Personal Study Notes & Reminders
                  </h4>
                  <span className="text-[10px] text-zinc-500 font-mono">Auto-saved locally</span>
                </div>

                <div className="space-y-3">
                  <textarea
                    value={personalNoteInput}
                    onChange={(e) => setPersonalNoteInput(e.target.value)}
                    placeholder="Type customized study logs, command overrides, or internal hints for this GCP concept..."
                    className="w-full h-24 bg-zinc-950 border border-zinc-800 rounded-2xl p-3.5 text-xs placeholder-zinc-600 focus:outline-none focus:border-sky-500 text-zinc-200 focus:ring-1 focus:ring-sky-500/20 leading-relaxed"
                  />

                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {personalNoteInput.trim().length > 0 ? `${personalNoteInput.length} characters` : 'No active notes saved.'}
                    </span>
                    <button
                      onClick={saveNote}
                      className="bg-zinc-800 hover:bg-zinc-700 text-sky-400 border border-zinc-700 px-4 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                    >
                      Save Active Note
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================= */}
        {/* 2. MOCK EXAM / QUIZ TAB */}
        {/* ======================================= */}
        {activeTab === 'quiz' && (
          <div className="max-w-2xl mx-auto space-y-6">
            
            {/* Setup Mode */}
            {!quizIsActive ? (
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="text-center space-y-2">
                  <Award className="w-12 h-12 text-sky-400 mx-auto" />
                  <h2 className="text-xl font-bold text-white tracking-tight font-display">Interactive GCP Competency Assessment</h2>
                  <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                    Test your cloud engineering maturity. We generate custom multiple-choice distractors dynamically based on the 100 actual interview questions.
                  </p>
                </div>

                <div className="space-y-5 border-t border-zinc-800 pt-5">
                  {/* Select size */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider font-display">Number of Questions</label>
                    <div className="flex gap-2">
                      {[5, 10, 20].map(size => (
                        <button
                          key={size}
                          onClick={() => setQuizSize(size)}
                          className={`flex-1 py-2.5 text-xs font-bold rounded-2xl border transition-all cursor-pointer ${
                            quizSize === size 
                              ? 'bg-sky-500 text-zinc-950 border-sky-500 font-bold' 
                              : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-850'
                          }`}
                        >
                          {size} Questions
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Category */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider font-display">Category Scope</label>
                    <select
                      value={quizCategory}
                      onChange={(e) => setQuizCategory(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20"
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name} ({cat.id === 'all' ? allQuestions.length : cat.questionIds.length} questions)
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={startQuiz}
                    className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-zinc-950 font-bold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-sky-500/10"
                  >
                    Generate Mock Exam <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* Active Quiz presentation */
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                
                {/* Header indicators */}
                <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                  <span className="text-[10px] font-bold font-mono text-sky-400 uppercase tracking-wide">
                    Question {quizCurrentIndex + 1} of {quizQuestions.length}
                  </span>
                  
                  <span className="text-[10px] bg-zinc-950 border border-zinc-800 text-zinc-400 px-2.5 py-1 rounded-lg font-mono">
                    Score: {quizScore} / {quizCurrentIndex + (quizAnswersSubmitted ? 1 : 0)} Correct
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-zinc-950 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-sky-400 h-full transition-all duration-300"
                    style={{ width: `${((quizCurrentIndex) / quizQuestions.length) * 100}%` }}
                  />
                </div>

                {/* Question display */}
                {!quizFinished ? (
                  <div className="space-y-6 animate-fadeIn">
                    <h3 className="text-base font-bold text-white leading-snug font-display">
                      {quizQuestions[quizCurrentIndex]?.question}
                    </h3>

                    {/* Choices list */}
                    <div className="space-y-2">
                      {currentQuizOptions.map((opt, index) => {
                        const isSelected = quizSelectedOption === opt;
                        const isCorrectAnswer = opt === quizQuestions[quizCurrentIndex]?.answer;
                        
                        let optionStyle = "bg-zinc-950/60 border-zinc-850 text-zinc-300 hover:bg-zinc-950 hover:text-zinc-100";
                        if (isSelected && !quizAnswersSubmitted) {
                          optionStyle = "bg-sky-500/10 border-sky-500 text-sky-300 font-semibold";
                        } else if (quizAnswersSubmitted) {
                          if (isCorrectAnswer) {
                            optionStyle = "bg-emerald-950/40 border-emerald-500 text-emerald-400 font-semibold shadow-md shadow-emerald-500/5";
                          } else if (isSelected) {
                            optionStyle = "bg-red-950/40 border-red-500 text-red-400 font-semibold";
                          } else {
                            optionStyle = "bg-zinc-950/20 border-zinc-900 text-zinc-600";
                          }
                        }

                        return (
                          <button
                            key={index}
                            onClick={() => handleSelectOption(opt)}
                            disabled={quizAnswersSubmitted}
                            className={`w-full text-left p-4 rounded-2xl border text-xs transition-all flex items-start gap-3 cursor-pointer ${optionStyle}`}
                          >
                            <span className="font-bold text-zinc-500 font-mono self-center shrink-0">
                              {String.fromCharCode(65 + index)}.
                            </span>
                            <span className="leading-relaxed">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Control panel buttons */}
                    <div className="flex gap-3 pt-4 border-t border-zinc-800">
                      {!quizAnswersSubmitted ? (
                        <button
                          onClick={submitQuizAnswer}
                          disabled={!quizSelectedOption}
                          className={`w-full py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                            quizSelectedOption 
                              ? 'bg-sky-500 text-zinc-950' 
                              : 'bg-zinc-850 text-zinc-500 cursor-not-allowed border border-zinc-800/40'
                          }`}
                        >
                          Submit Answer Selection
                        </button>
                      ) : (
                        <button
                          onClick={nextQuizQuestion}
                          className="w-full bg-sky-500 hover:bg-sky-400 text-zinc-950 font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-1 cursor-pointer transition-all"
                        >
                          {quizCurrentIndex + 1 < quizQuestions.length ? 'Next Question' : 'Finish & Show Results'} 
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Explanatory feedback box */}
                    {quizAnswersSubmitted && (
                      <div className="bg-zinc-950/60 p-4 border border-zinc-800 rounded-2xl space-y-1.5 animate-slideUp">
                        <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5 font-display">
                          <Info className="w-3.5 h-3.5" /> Concept Explanation:
                        </span>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          {quizQuestions[quizCurrentIndex]?.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Exam finished overview */
                  <div className="text-center space-y-6 animate-fadeIn">
                    <div className="w-16 h-16 rounded-full bg-sky-500/10 border-2 border-sky-500/40 flex items-center justify-center text-sky-400 text-2xl font-bold mx-auto font-display">
                      {Math.round((quizScore / quizQuestions.length) * 100)}%
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white font-display">Mock Exam Finalized!</h3>
                      <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                        You correctly answered {quizScore} out of {quizQuestions.length} questions.
                      </p>
                    </div>

                    {/* Quick review links list */}
                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 text-left space-y-3 shadow-inner">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block font-display">Question Summary</span>
                      <div className="space-y-1 max-h-[140px] overflow-y-auto">
                        {quizHistory.map((hist, idx) => {
                          const origQ = allQuestions.find(q => q.id === hist.questionId);
                          return (
                            <div key={idx} className="flex justify-between text-xs py-2 border-b border-zinc-900/60">
                              <span className="text-zinc-400 truncate max-w-xs font-mono">
                                Q{hist.questionId}. {origQ?.question}
                              </span>
                              <span className={hist.correct ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                                {hist.correct ? 'Correct' : 'Incorrect'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setQuizIsActive(false)}
                        className="flex-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 font-semibold py-2.5 rounded-2xl text-xs cursor-pointer transition-colors"
                      >
                        Change Scope / Exit
                      </button>
                      <button
                        onClick={startQuiz}
                        className="flex-1 bg-sky-500 hover:bg-sky-400 text-zinc-950 font-bold py-2.5 rounded-2xl text-xs cursor-pointer transition-colors"
                      >
                        Retry with New Questions
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ======================================= */}
        {/* 3. ARCHITECTURAL PLAYGROUND TAB */}
        {/* ======================================= */}
        {activeTab === 'sandbox' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-start">
            
            {/* Scenarios sidebar left (Column span 4) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 space-y-4 shadow-xl">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-display block">Select Architecture Scenario</span>
                
                <div className="space-y-2">
                  {sandboxScenarios.map(scen => {
                    const isSelected = activeScenarioId === scen.id;
                    return (
                      <button
                        key={scen.id}
                        onClick={() => {
                          setActiveScenarioId(scen.id);
                          // Select its first node automatically
                          if (scen.nodes.length > 0) {
                            setActiveScenarioNodeId(scen.nodes[0].id);
                          }
                        }}
                        className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-sky-500/10 border-sky-500 text-sky-200 shadow-md' 
                            : 'bg-zinc-950/60 border-zinc-900 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                        }`}
                      >
                        <h4 className="text-xs font-bold text-zinc-100 font-display">{scen.title}</h4>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-snug">{scen.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Informative advice */}
              <div className="bg-zinc-900/40 border border-zinc-900 rounded-3xl p-5 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-sky-400 shrink-0 mt-0.5 animate-pulse" />
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  💡 <strong>Sandbox Tip:</strong> Real engineering is visual. Select a node in the diagram map to explore the exact interview cards that test knowledge on that specific system block!
                </p>
              </div>
            </div>

            {/* Scenario interactive graph + theory link right (Column span 8) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Interactive Scenario map */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
                <div className="border-b border-zinc-800 pb-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">{currentScenario.title}</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Click components below to inspect adjacent theoretical questions.</p>
                </div>

                {/* Nodes flow rendering box */}
                <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 min-h-[150px] flex flex-wrap justify-center items-center gap-4 relative">
                  
                  {currentScenario.nodes.map(node => {
                    const isSelected = activeScenarioNodeId === node.id;
                    
                    let nodeColor = "bg-zinc-900 border-zinc-800 text-zinc-400";
                    if (isSelected) {
                      nodeColor = "bg-sky-500/10 border-sky-500 text-sky-300 font-bold scale-105 shadow-lg shadow-sky-500/5";
                    }

                    return (
                      <button
                        key={node.id}
                        onClick={() => setActiveScenarioNodeId(node.id)}
                        className={`px-4 py-2.5 rounded-2xl border text-xs cursor-pointer transition-all flex items-center gap-2 ${nodeColor}`}
                      >
                        {node.type === 'security' && <Lock className="w-3.5 h-3.5" />}
                        {node.type === 'compute' && <Cpu className="w-3.5 h-3.5" />}
                        {node.type === 'storage' && <Database className="w-3.5 h-3.5" />}
                        {node.type === 'network' && <Network className="w-3.5 h-3.5" />}
                        <span>{node.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* theory links container for active node */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-2 block font-display">
                  Theory Cards mapping to '{currentScenarioNode?.label}' ({currentScenarioNode?.questions.length})
                </span>

                <div className="space-y-4">
                  {currentScenarioNode?.questions.map(qId => {
                    const mappedQ = allQuestions.find(q => q.id === qId);
                    if (!mappedQ) return null;

                    return (
                      <div 
                        key={qId}
                        className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 hover:border-zinc-700 transition-all shadow-md"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] bg-sky-500/10 text-sky-400 font-mono font-bold px-2.5 py-0.5 rounded-lg border border-sky-500/20">
                            Q{mappedQ.id}
                          </span>
                          <span className="text-[10px] text-zinc-500 uppercase font-bold font-display tracking-wider">{mappedQ.category}</span>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-sm font-bold text-white font-display leading-snug">{mappedQ.question}</h4>
                          
                          <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-900 space-y-1">
                            <span className="text-[8px] font-bold text-sky-400 uppercase tracking-widest block font-display">Core Response:</span>
                            <p className="text-xs text-zinc-300 leading-relaxed">{mappedQ.answer}</p>
                          </div>
                        </div>

                        {/* Navigation link to see full flashcard */}
                        <div className="flex justify-end">
                          <button
                            onClick={() => {
                              setSelectedQuestionId(mappedQ.id);
                              setCurrentExpTab('answer');
                              setActiveTab('explorer');
                            }}
                            className="text-[11px] text-sky-400 hover:text-sky-300 flex items-center gap-1.5 cursor-pointer transition-colors font-semibold"
                          >
                            Open Detailed Diagrams & Labs <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* FOOTER BAR */}
      <footer className="border-t border-zinc-900 py-5 px-6 mt-6 bg-zinc-950/40 text-center text-zinc-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px]">
          <span>GCP 100 Interview Prep Hub & Playground</span>
          <span>Google AI Studio Build &copy; {new Date().getFullYear()}</span>
        </div>
      </footer>

    </div>
  );
}

// Helpers for checkmarks rendering
function isCorrectBadge(mastered: boolean) {
  if (mastered) {
    return (
      <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
        <CheckCircle2 className="w-3 h-3 text-emerald-400 stroke-[3]" />
      </div>
    );
  }
  return (
    <div className="w-5 h-5 rounded-full border border-zinc-850 flex items-center justify-center text-[10px] text-zinc-700">
      ●
    </div>
  );
}
