import { useState, useEffect } from 'react';
import { 
  Search, BookOpen, CheckCircle, HelpCircle, Copy, Check, Sparkles, 
  ChevronLeft, ChevronRight, Shuffle, Award, Code, Play, Star,
  BookMarked, Lightbulb, Grid, Clock, ChevronDown, ListFilter,
  FileCode, AlertTriangle
} from 'lucide-react';
import { questions, Question } from './questionsData';
import InteractiveDiagram from './components/InteractiveDiagram';

export default function App() {
  // Navigation & filtering states
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'explanation' | 'diagram' | 'code' | 'quiz'>('explanation');

  // Study tracker state (stored in localStorage)
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
  const [quizResults, setQuizResults] = useState<Record<number, { selectedIndex: number; isCorrect: boolean }>>({});
  const [copied, setCopied] = useState<boolean>(false);

  // Initialize progress from localStorage
  useEffect(() => {
    const savedCompleted = localStorage.getItem('next_guide_completed');
    if (savedCompleted) {
      try {
        setCompletedIds(JSON.parse(savedCompleted));
      } catch (e) {
        console.error("Failed to load progress", e);
      }
    }
    const savedBookmarks = localStorage.getItem('next_guide_bookmarks');
    if (savedBookmarks) {
      try {
        setBookmarkedIds(JSON.parse(savedBookmarks));
      } catch (e) {
        console.error("Failed to load bookmarks", e);
      }
    }
    const savedQuizResults = localStorage.getItem('next_guide_quizzes');
    if (savedQuizResults) {
      try {
        setQuizResults(JSON.parse(savedQuizResults));
      } catch (e) {
        console.error("Failed to load quiz results", e);
      }
    }
  }, []);

  // Sync states to localStorage
  const toggleCompleted = (id: number) => {
    setCompletedIds(prev => {
      const updated = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem('next_guide_completed', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleBookmark = (id: number) => {
    setBookmarkedIds(prev => {
      const updated = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem('next_guide_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  const saveQuizAnswer = (id: number, optionIdx: number, correctIdx: number) => {
    setQuizResults(prev => {
      const updated = {
        ...prev,
        [id]: {
          selectedIndex: optionIdx,
          isCorrect: optionIdx === correctIdx
        }
      };
      localStorage.setItem('next_guide_quizzes', JSON.stringify(updated));
      return updated;
    });
  };

  // Filter questions based on criteria
  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          q.id.toString() === searchTerm.trim() ||
                          q.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const activeQuestion = questions.find(q => q.id === selectedQuestionId) || questions[0];

  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setSelectedQuestionId(questions[randomIndex].id);
    setActiveTab('explanation');
  };

  const categories = ['All', 'Fundamentals', 'Routing', 'Rendering', 'RSC & Streaming', 'Server & API', 'Performance'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const completionPercentage = Math.round((completedIds.length / questions.length) * 100);

  // Keyboard navigation helper or next/prev triggers
  const navigateToQuestion = (direction: 'prev' | 'next') => {
    const currentIndex = questions.findIndex(q => q.id === selectedQuestionId);
    if (direction === 'prev' && currentIndex > 0) {
      setSelectedQuestionId(questions[currentIndex - 1].id);
      setActiveTab('explanation');
    } else if (direction === 'next' && currentIndex < questions.length - 1) {
      setSelectedQuestionId(questions[currentIndex + 1].id);
      setActiveTab('explanation');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans flex flex-col antialiased selection:bg-cyan-600/30 selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full bg-slate-900/60 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-500/20">
              <Sparkles className="w-5 h-5 text-cyan-300 animate-pulse" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                Next.js Study Companion
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-600/10 border border-cyan-500/30 text-cyan-300 font-semibold uppercase tracking-wider">
                  Pages & App Router
                </span>
              </h1>
              <p className="text-[11px] text-slate-500">
                Interactive Visual Learning Engine • np421402@gmail.com
              </p>
            </div>
          </div>

          {/* Quick Header Progress Ticker */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="hidden sm:block text-right">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Award className="w-3.5 h-3.5 text-cyan-500" />
                <span>Overall Mastery: {completedIds.length} / {questions.length} Concepts</span>
              </div>
            </div>
            <button 
              onClick={selectRandomQuestion}
              className="p-2 border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              title="Practice random Next.js concept"
            >
              <Shuffle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Shuffle Concept</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
        
        {/* Left Side: Navigation pane (4 columns wide) */}
        <div id="navigator-panel" className="lg:col-span-4 flex flex-col gap-4 h-[calc(100vh-140px)] min-h-[450px]">
          
          {/* Filters Bar Card (Bento Rounded) */}
          <div className="bg-slate-900/50 p-4 rounded-3xl border border-slate-800/80 flex flex-col gap-3 shadow-md">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search 40 questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-slate-800 rounded-xl text-xs bg-slate-950 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 transition-all"
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="text-[10px] font-bold tracking-wider text-slate-500 block mb-1.5">FILTER CATEGORY:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2.5 border border-slate-800 rounded-xl text-xs bg-slate-950 text-slate-300 focus:outline-none focus:border-cyan-500 transition-all cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-slate-950">{cat === 'All' ? 'All Categories' : cat}</option>
                ))}
              </select>
            </div>

            {/* Difficulty Pills */}
            <div>
              <label className="text-[10px] font-bold tracking-wider text-slate-500 block mb-1.5">FILTER DIFFICULTY:</label>
              <div className="flex gap-1.5">
                {difficulties.map(diff => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all border cursor-pointer ${
                      selectedDifficulty === diff 
                        ? 'bg-cyan-600 border-cyan-500 text-white shadow-md' 
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Directory Questions List (Bento Floating Container) */}
          <div className="flex-1 bg-slate-900/50 rounded-3xl border border-slate-800/80 flex flex-col overflow-hidden shadow-lg">
            <div className="px-4 py-3 border-b border-slate-800/80 bg-slate-950/40 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Syllabus Topics ({filteredQuestions.length})
              </span>
              {completedIds.length > 0 && (
                <span className="text-[10px] font-semibold text-emerald-400">
                  {completedIds.length} Studied
                </span>
              )}
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-800/40">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((q) => {
                  const isCompleted = completedIds.includes(q.id);
                  const isBookmarked = bookmarkedIds.includes(q.id);
                  const isActive = q.id === selectedQuestionId;
                  const difficultyColor = 
                    q.difficulty === 'Easy' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' :
                    q.difficulty === 'Medium' ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400' :
                    'bg-rose-500/10 border border-rose-500/20 text-rose-400';

                  return (
                    <div
                      key={q.id}
                      id={`q-card-${q.id}`}
                      onClick={() => { setSelectedQuestionId(q.id); setActiveTab('explanation'); }}
                      className={`p-3.5 text-left transition-all relative cursor-pointer group ${
                        isActive 
                          ? 'bg-cyan-600/10 border-l-4 border-cyan-500' 
                          : 'hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2 mb-1.5">
                        <span className="font-mono text-[10px] font-bold text-slate-500">
                          CON_#{q.id.toString().padStart(2, '0')}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {isCompleted && (
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-500/10" />
                          )}
                          {isBookmarked && (
                            <BookMarked className="w-3.5 h-3.5 text-cyan-400" />
                          )}
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${difficultyColor}`}>
                            {q.difficulty}
                          </span>
                        </div>
                      </div>

                      <h3 className={`text-xs font-semibold leading-normal transition-colors ${
                        isActive ? 'text-cyan-400 font-bold' : 'text-slate-300 group-hover:text-white'
                      }`}>
                        {q.question}
                      </h3>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[9px] font-semibold text-slate-500">
                          {q.category}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center text-slate-500 space-y-2">
                  <BookOpen className="w-8 h-8 mx-auto text-slate-700" />
                  <p className="text-xs">No matching Next.js questions located.</p>
                </div>
              )}
            </div>
          </div>

          {/* Premium Mastery Analytics Bento Card */}
          <div className="bg-gradient-to-br from-cyan-900 to-slate-900 rounded-3xl p-5 text-white flex flex-col justify-between shadow-lg shadow-cyan-950/20 border border-cyan-500/20">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-cyan-300 mb-1">Overall Mastery</div>
              <div className="text-3xl font-black italic text-white flex items-baseline gap-2">
                {completionPercentage}%
                <span className="text-xs font-mono font-normal tracking-normal not-italic text-cyan-300">
                  ({completedIds.length} / {questions.length} Concepts)
                </span>
              </div>
            </div>
            <div className="space-y-3 mt-4">
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-cyan-400 rounded-full transition-all duration-500" 
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <button 
                onClick={selectRandomQuestion}
                className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-[10px] uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Shuffle className="w-3 h-3" />
                Practice Random Concept
              </button>
            </div>
          </div>
          
        </div>

        {/* Right Side: Interactive Study Console (8 columns wide) */}
        <div id="study-panel" className="lg:col-span-8 flex flex-col gap-4 h-[calc(100vh-140px)] min-h-[450px]">
          
          {/* Active Question Title Card (Bento Style) */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col gap-4 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-slate-500">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>CONCEPT #{activeQuestion.id} OF {questions.length}</span>
                <span className="text-slate-800">|</span>
                <span className="text-cyan-400">{activeQuestion.category}</span>
              </div>

              {/* Progress and Bookmarks togglers */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(activeQuestion.id)}
                  className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                    bookmarkedIds.includes(activeQuestion.id)
                      ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                  title="Bookmark for review"
                >
                  <BookMarked className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Bookmark</span>
                </button>

                <button
                  onClick={() => toggleCompleted(activeQuestion.id)}
                  className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                    completedIds.includes(activeQuestion.id)
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-cyan-600 hover:bg-cyan-500 border border-cyan-500 text-white'
                  }`}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{completedIds.includes(activeQuestion.id) ? 'Mastered!' : 'Mark Mastered'}</span>
                </button>
              </div>
            </div>

            {/* Dynamic Title */}
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                <span className="text-cyan-500 mr-2">Q.</span> {activeQuestion.question}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  activeQuestion.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                  activeQuestion.difficulty === 'Medium' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                  'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}>
                  {activeQuestion.difficulty} Level
                </span>
                <span className="text-slate-800">•</span>
                <span className="text-xs text-slate-400">
                  Target: {activeQuestion.category} Architecture
                </span>
              </div>
            </div>
          </div>

          {/* Study Tabs Navigation (Sleek Rounded Bar) */}
          <div className="flex bg-slate-950 p-1.5 rounded-2xl w-full border border-slate-800/80">
            <button
              onClick={() => setActiveTab('explanation')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'explanation' 
                  ? 'bg-slate-900 border border-slate-800 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/30'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('diagram')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'diagram' 
                  ? 'bg-slate-900 border border-slate-800 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/30'
              }`}
            >
              <Play className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
              Concept Sandbox
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'code' 
                  ? 'bg-slate-900 border border-slate-800 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/30'
              }`}
            >
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              Code Sample
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'quiz' 
                  ? 'bg-slate-900 border border-slate-800 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/30'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              Flash Quiz
            </button>
          </div>

          {/* Dynamic Content View Area (Beautiful Bento Sub-card) */}
          <div className="flex-1 bg-slate-900/50 border border-slate-800 p-6 rounded-3xl flex flex-col overflow-y-auto shadow-inner">
            
            {/* TAB 1: Core Explanation */}
            {activeTab === 'explanation' && (
              <div className="space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-6 bg-emerald-500 rounded-full"></div>
                    <h3 className="font-bold text-slate-100 text-sm tracking-wide uppercase">Detailed Answer</h3>
                  </div>
                  <p className="text-sm text-slate-200 font-medium bg-cyan-600/10 border border-cyan-500/20 border-l-4 border-cyan-500 p-4 rounded-r-2xl leading-relaxed">
                    {activeQuestion.answer}
                  </p>
                </div>

                <div className="pt-2">
                  <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">
                    DEEP DIVE EXPLANATION:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed whitespace-pre-line space-y-2">
                    {activeQuestion.detailedExplanation}
                  </p>
                </div>

                {/* Micro Concept Tip (Bento styled) */}
                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl flex gap-3 mt-4">
                  <Lightbulb className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-[11px] font-bold text-cyan-400 uppercase">
                      Pro Interview Tip:
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      If asked about this in an interview, be sure to highlight how it saves user rendering power by offloading computations to servers, thereby keeping initial bundle sizes as small as possible.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Custom Interactive Diagram / Simulator */}
            {activeTab === 'diagram' && (
              <InteractiveDiagram questionId={activeQuestion.id} />
            )}

            {/* TAB 3: Code Example Workspace */}
            {activeTab === 'code' && (
              <div className="space-y-4 flex flex-col h-full">
                {activeQuestion.codeSnippet ? (
                  <>
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
                        <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{activeQuestion.codeSnippet.filename}</span>
                      </div>
                      <button
                        onClick={() => handleCopyCode(activeQuestion.codeSnippet?.code || '')}
                        className="px-3 py-1.5 text-[10px] font-bold border border-slate-800 rounded-xl hover:bg-slate-800 flex items-center gap-1.5 bg-slate-950 text-slate-300 cursor-pointer shadow-xs transition-colors"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex-1 rounded-2xl overflow-hidden border border-slate-800">
                      <pre className="p-4 bg-slate-950 text-slate-200 font-mono text-xs overflow-auto h-[320px] leading-relaxed select-all">
                        <code>{activeQuestion.codeSnippet.code}</code>
                      </pre>
                    </div>
                  </>
                ) : (
                  <div className="p-12 text-center text-slate-500 space-y-2">
                    <Code className="w-8 h-8 mx-auto text-slate-700" />
                    <p className="text-xs">This concept focuses primarily on architectural configurations. Check the Overview or Flash Quiz tabs to study further!</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: Self Quiz Card */}
            {activeTab === 'quiz' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <HelpCircle className="w-5 h-5 text-cyan-400" />
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    RECALL & REINFORCE PRACTICE:
                  </span>
                </div>

                <div className="p-4 border border-slate-800 bg-slate-950 rounded-2xl">
                  <h4 className="text-sm font-semibold text-slate-200 leading-relaxed">
                    {activeQuestion.quiz.question}
                  </h4>
                </div>

                <div className="space-y-2 pt-2">
                  {activeQuestion.quiz.options.map((opt, idx) => {
                    const savedAns = quizResults[activeQuestion.id];
                    const isSelected = savedAns?.selectedIndex === idx;
                    const isCorrect = idx === activeQuestion.quiz.correctIndex;
                    const showFeedback = savedAns !== undefined;

                    let optionStyle = "border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300";
                    if (showFeedback) {
                      if (isCorrect) {
                        optionStyle = "border-emerald-500/50 bg-emerald-950/40 text-emerald-400";
                      } else if (isSelected) {
                        optionStyle = "border-rose-500/50 bg-rose-950/40 text-rose-400";
                      } else {
                        optionStyle = "border-slate-800/40 opacity-40";
                      }
                    } else if (isSelected) {
                      optionStyle = "border-cyan-500 bg-cyan-950/30 text-white";
                    }

                    return (
                      <button
                        key={idx}
                        disabled={showFeedback}
                        onClick={() => saveQuizAnswer(activeQuestion.id, idx, activeQuestion.quiz.correctIndex)}
                        className={`w-full p-3.5 text-left rounded-xl border text-xs font-medium transition-all flex items-center justify-between gap-3 ${optionStyle} ${
                          !showFeedback ? 'cursor-pointer' : 'cursor-default'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-slate-400 uppercase bg-slate-950 border border-slate-800 px-1.5 py-0.5 rounded font-bold">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {showFeedback && isCorrect && (
                          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        )}
                        {showFeedback && isSelected && !isCorrect && (
                          <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Saved Explanation Feedback */}
                {quizResults[activeQuestion.id] && (
                  <div className="p-4 rounded-2xl border border-cyan-500/20 bg-cyan-950/20 mt-4">
                    <h5 className="text-[11px] font-bold text-cyan-400 uppercase mb-1">
                      Concept Quiz Explanation:
                    </h5>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {activeQuestion.quiz.explanation}
                    </p>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Pagination Footer Controls */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl shadow-md flex items-center justify-between">
            <button
              onClick={() => navigateToQuestion('prev')}
              disabled={selectedQuestionId === 1}
              className="px-3.5 py-2 border border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Previous Concept
            </button>

            <span className="text-[11px] font-mono text-slate-500">
              Concept {activeQuestion.id} / {questions.length}
            </span>

            <button
              onClick={() => navigateToQuestion('next')}
              disabled={selectedQuestionId === questions.length}
              className="px-3.5 py-2 border border-cyan-500 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next Concept
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </main>
    </div>
  );
}
