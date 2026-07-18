import React, { useState, useEffect } from "react";
import { 
  Search, BookOpen, CheckCircle, Award, Compass, 
  Code, Sparkles, Star, ChevronRight, Copy, Check, 
  HelpCircle, RefreshCw, Layers, Layout, Grid, Sliders, Type, Zap
} from "lucide-react";
import { QUESTIONS } from "./data/questions";
import Playground from "./components/Playground";
import { Question, Category } from "./types";

export default function App() {
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">("All");
  const [masteredIds, setMasteredIds] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"theory" | "sandbox">("theory");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [filterMastered, setFilterMastered] = useState<"all" | "unmastered" | "mastered">("all");

  // Load mastered list from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("css_mastered_ids");
    if (saved) {
      try {
        setMasteredIds(JSON.parse(saved));
      } catch (e) {
        console.error("Error reading storage", e);
      }
    }
  }, []);

  // Save mastered list to localStorage
  const toggleMastered = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // Avoid triggering card click
    let updated;
    if (masteredIds.includes(id)) {
      updated = masteredIds.filter(x => x !== id);
    } else {
      updated = [...masteredIds, id];
    }
    setMasteredIds(updated);
    localStorage.setItem("css_mastered_ids", JSON.stringify(updated));
  };

  // Find active question object
  const activeQuestion = QUESTIONS.find(q => q.id === selectedQuestionId) || QUESTIONS[0];

  // Filter lists
  const filteredQuestions = QUESTIONS.filter(q => {
    const matchesSearch = 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.shortAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.deepDive.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategory === "All" || q.category === selectedCategory;
    
    const matchesMastered = 
      filterMastered === "all" || 
      (filterMastered === "mastered" && masteredIds.includes(q.id)) ||
      (filterMastered === "unmastered" && !masteredIds.includes(q.id));

    return matchesSearch && matchesCategory && matchesMastered;
  });

  const totalMasteredCount = masteredIds.length;
  const masteryPercentage = Math.round((totalMasteredCount / QUESTIONS.length) * 100);

  // Copy code example helper
  const handleCopyCode = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const categories: (Category | "All")[] = [
    "All",
    "Box Model & Core",
    "Selectors & Specificity",
    "Positioning & Stacking",
    "Flexbox & Grid",
    "Sizing & Responsive",
    "Transitions & Animations",
    "Architecture & Modern"
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans" id="css-mastery-root">
      {/* Upper Navigation / Decorative Banner */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur sticky top-0 z-50 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4" id="app-header">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sky-500/10 text-sky-400 rounded-xl border border-sky-500/20 shadow-inner">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              CSS 100 Interview Q&A
              <span className="text-[10px] font-mono py-0.5 px-2 bg-sky-500/10 text-sky-400 rounded-full border border-sky-500/20">
                Study Companion
              </span>
            </h1>
            <p className="text-xs text-slate-400">Master cascading sheets with live interactive visual sandboxes</p>
          </div>
        </div>

        {/* Progress Tracker Widget */}
        <div className="flex items-center gap-4 bg-slate-900/60 border border-slate-850 px-4 py-2.5 rounded-xl w-full md:w-auto" id="progress-tracker">
          <div className="flex flex-col flex-1 md:flex-initial">
            <div className="flex justify-between md:justify-start items-center gap-2 text-xs font-semibold mb-1">
              <span className="text-slate-400">Total Mastered</span>
              <span className="text-emerald-400 font-mono text-sm">{totalMasteredCount}/100</span>
            </div>
            {/* Dynamic visual bar */}
            <div className="h-1.5 w-full md:w-36 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${masteryPercentage}%` }}
              />
            </div>
          </div>
          <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 p-2 rounded-lg text-center font-mono font-bold text-xs" id="mastery-percent-display">
            {masteryPercentage}%
          </div>
        </div>
      </header>

      {/* Main Study Arena */}
      <main className="flex-1 max-w-[1500px] w-full mx-auto px-6 py-6 grid grid-cols-1 xl:grid-cols-12 gap-6 items-start" id="study-arena">
        
        {/* Left column: Study Deck List (xl:col-span-4) */}
        <div className="xl:col-span-4 flex flex-col gap-4 self-stretch xl:max-h-[calc(100vh-140px)] overflow-hidden" id="deck-column">
          
          {/* Deck Filters Panel */}
          <div className="bg-slate-900 border border-slate-850 rounded-2xl p-4 space-y-3 shrink-0" id="deck-filters">
            <span className="text-[10px] font-bold font-mono tracking-widest text-slate-500 uppercase block">Study Deck Controls</span>
            
            {/* Search Box */}
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500">
                <Search size={14} />
              </span>
              <input 
                type="text"
                placeholder="Search keywords or concepts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 font-mono"
              />
            </div>

            {/* Study filter tabs */}
            <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-850" id="mastery-toggles">
              {[
                { label: "All Qs", key: "all" },
                { label: "Studying", key: "unmastered" },
                { label: "Mastered", key: "mastered" }
              ].map((tab) => (
                <button 
                  key={tab.key}
                  onClick={() => setFilterMastered(tab.key as any)}
                  className={`text-[10px] py-1.5 rounded font-medium transition-all ${filterMastered === tab.key ? "bg-slate-900 text-slate-200 font-bold" : "text-slate-500 hover:text-slate-350"}`}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Categories scroll area */}
            <div className="space-y-1.5" id="category-scroller">
              <label className="text-[9px] font-bold font-mono text-slate-500 uppercase">Categories</label>
              <div className="flex flex-wrap gap-1" id="category-capsules">
                {categories.map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-[9px] font-medium px-2.5 py-1 rounded-full border transition-all ${selectedCategory === cat ? "bg-sky-500/15 text-sky-400 border-sky-500/40 font-semibold" : "bg-slate-950 text-slate-400 border-slate-850 hover:bg-slate-900"}`}>
                    {cat === "All" ? "All categories" : cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cards List Scroller */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 custom-scrollbar xl:max-h-[calc(100vh-380px)]" id="deck-scroller">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-12 bg-slate-900/30 border border-slate-850 rounded-2xl p-6" id="empty-state">
                <p className="text-sm text-slate-500">No questions found matching the selected filters.</p>
                <button 
                  onClick={() => { setSelectedCategory("All"); setSearchQuery(""); setFilterMastered("all"); }}
                  className="mt-3 text-xs text-sky-400 hover:underline font-mono">
                  Reset Deck Filters
                </button>
              </div>
            ) : (
              filteredQuestions.map((q) => {
                const isSelected = q.id === selectedQuestionId;
                const isMastered = masteredIds.includes(q.id);
                return (
                  <div 
                    key={q.id}
                    onClick={() => { setSelectedQuestionId(q.id); setActiveTab("theory"); }}
                    className={`group relative border rounded-xl p-3.5 transition-all cursor-pointer text-left select-none ${isSelected ? "bg-slate-900 border-sky-500/40 ring-1 ring-sky-500/20" : "bg-slate-900/55 border-slate-850 hover:bg-slate-900 hover:border-slate-800"}`}
                    id={`q-card-${q.id}`}>
                    
                    <div className="flex items-start justify-between gap-3">
                      {/* Badge / Index */}
                      <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 shrink-0">
                        Q{q.id}
                      </span>
                      
                      {/* Mastery Marker Button */}
                      <button 
                        onClick={(e) => toggleMastered(q.id, e)}
                        className={`p-1 rounded-lg border transition-all shrink-0 ${isMastered ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400" : "border-slate-800 text-slate-600 hover:text-slate-400 hover:bg-slate-950"}`}
                        title={isMastered ? "Mark as studying" : "Mark as mastered"}>
                        <CheckCircle size={14} className={isMastered ? "fill-emerald-400/20" : ""} />
                      </button>
                    </div>

                    <h3 className={`text-xs font-bold mt-2 leading-relaxed transition-colors ${isSelected ? "text-sky-400" : "text-slate-200 group-hover:text-slate-100"}`}>
                      {q.question}
                    </h3>
                    
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1.5 leading-relaxed font-normal">
                      {q.shortAnswer}
                    </p>

                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-950/60 text-[9px] text-slate-500 font-mono">
                      <span>{q.category}</span>
                      <span className="flex items-center gap-1 text-slate-400 font-semibold group-hover:text-sky-400 transition-all">
                        Study <ChevronRight size={10} />
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right column: Active Study Desk & Interactive Sandbox (xl:col-span-8) */}
        <div className="xl:col-span-8 space-y-6" id="desk-column">
          
          {/* Main Active Question Card */}
          <div className="bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden shadow-xl" id="active-study-desk">
            
            {/* Question Title Bar */}
            <div className="p-6 border-b border-slate-850 bg-slate-950/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-3" id="active-title-bar">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold bg-sky-500/15 text-sky-400 px-2.5 py-1 rounded border border-sky-500/20 uppercase tracking-widest inline-block">
                  {activeQuestion.category}
                </span>
                <h2 className="text-lg font-extrabold text-slate-100 leading-snug">
                  Q{activeQuestion.id}: {activeQuestion.question}
                </h2>
              </div>
              
              {/* Mastery checkbox large */}
              <button 
                onClick={() => toggleMastered(activeQuestion.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all ${masteredIds.includes(activeQuestion.id) ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-slate-950 text-slate-400 border-slate-850 hover:bg-slate-900"}`}>
                <CheckCircle size={14} className={masteredIds.includes(activeQuestion.id) ? "fill-emerald-400/25" : ""} />
                {masteredIds.includes(activeQuestion.id) ? "MASTERED" : "STUDYING"}
              </button>
            </div>

            {/* Desktop Tabs selection */}
            <div className="flex border-b border-slate-850 bg-slate-900" id="study-tabs">
              <button 
                onClick={() => setActiveTab("theory")}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 py-3 px-6 text-xs font-bold tracking-wider transition-all border-b-2 uppercase ${activeTab === "theory" ? "border-sky-400 text-sky-400 bg-slate-950/30 font-extrabold" : "border-transparent text-slate-400 hover:text-slate-200"}`}>
                <BookOpen size={14} />
                Theory & Code
              </button>
              <button 
                onClick={() => setActiveTab("sandbox")}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 py-3 px-6 text-xs font-bold tracking-wider transition-all border-b-2 uppercase ${activeTab === "sandbox" ? "border-sky-400 text-sky-400 bg-slate-950/30 font-extrabold" : "border-transparent text-slate-400 hover:text-slate-200"}`}>
                <Code size={14} />
                Live Playground
              </button>
            </div>

            {/* Tab view containers */}
            <div className="p-6" id="desk-tab-content">
              {activeTab === "theory" ? (
                <div className="space-y-6 text-left" id="theory-layout">
                  
                  {/* Short Answer block */}
                  <div className="bg-sky-500/5 border-l-4 border-sky-400 p-4 rounded-r-xl" id="short-answer-block">
                    <h4 className="text-[11px] font-bold font-mono tracking-wider text-sky-400 uppercase mb-1">Quick Answer</h4>
                    <p className="text-sm text-slate-200 font-semibold leading-relaxed">
                      {activeQuestion.shortAnswer}
                    </p>
                  </div>

                  {/* Deep Dive description */}
                  <div className="space-y-2" id="deep-dive-block">
                    <h4 className="text-[11px] font-bold font-mono tracking-wider text-slate-400 uppercase">Detailed Analysis & Interview Insight</h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal whitespace-pre-wrap">
                      {activeQuestion.deepDive}
                    </p>
                  </div>

                  {/* Code example card */}
                  <div className="space-y-2" id="code-block-container">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[11px] font-bold font-mono tracking-wider text-slate-400 uppercase">Syntax & Examples</h4>
                      
                      {/* Copy utility */}
                      <button 
                        onClick={() => handleCopyCode(activeQuestion.codeExample, activeQuestion.id)}
                        className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 hover:text-slate-300 transition-all">
                        {copiedId === activeQuestion.id ? (
                          <>
                            <Check size={12} className="text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>Copy Snippet</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="bg-slate-950 border border-slate-850 rounded-xl p-4 overflow-x-auto relative shadow-inner" id="code-block-box">
                      <pre className="text-xs font-mono text-slate-300 leading-relaxed text-left">
                        <code>{activeQuestion.codeExample}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              ) : (
                /* Interactive Sandbox module */
                <div className="space-y-4" id="sandbox-tab-view">
                  <Playground type={activeQuestion.sandboxType} config={activeQuestion.sandboxConfig} />
                </div>
              )}
            </div>
          </div>

          {/* study hints / footer card */}
          <div className="p-4 bg-slate-900/40 border border-slate-850 rounded-2xl flex items-center justify-between text-left" id="footer-hint">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/10">
                <Award size={14} />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                <strong>Study Tip:</strong> Use the <strong>Live Playground</strong> tab to tweak box calculations, specificities, and layout margins in real-time. It completely visualizes the math behind these concepts.
              </p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
