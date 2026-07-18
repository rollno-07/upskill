import React, { useState, useEffect } from "react";
import { QUESTIONS_DATA } from "./data";
import { SimulatorsHub } from "./components/Simulators";
import { QuestionItem } from "./types";
import { 
  BookOpen, Search, CheckCircle2, ChevronRight, Copy, Check, 
  Database, Cpu, ShieldCheck, Zap, Menu, X, Layers, Sparkles
} from "lucide-react";

export default function App() {
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionItem>(QUESTIONS_DATA[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [masteredList, setMasteredList] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load mastered state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("system_design_mastered");
    if (saved) {
      try {
        setMasteredList(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse mastered state", e);
      }
    }
  }, []);

  const toggleMastered = (id: number) => {
    let updated: number[];
    if (masteredList.includes(id)) {
      updated = masteredList.filter(item => item !== id);
    } else {
      updated = [...masteredList, id];
    }
    setMasteredList(updated);
    localStorage.setItem("system_design_mastered", JSON.stringify(updated));
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Navigate concepts
  const handlePrevConcept = () => {
    const idx = QUESTIONS_DATA.findIndex(q => q.id === selectedQuestion.id);
    if (idx > 0) {
      setSelectedQuestion(QUESTIONS_DATA[idx - 1]);
    }
  };

  const handleNextConcept = () => {
    const idx = QUESTIONS_DATA.findIndex(q => q.id === selectedQuestion.id);
    if (idx < QUESTIONS_DATA.length - 1) {
      setSelectedQuestion(QUESTIONS_DATA[idx + 1]);
    }
  };

  // Filter questions based on category + search
  const filteredQuestions = QUESTIONS_DATA.filter(q => {
    const matchesCategory = activeCategory === "All" || q.category === activeCategory;
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          q.practicalExample.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ["All", "Architecture & Frameworks", "Database & Storage", "Performance & Caching", "Real-time & Security", "Frontend & Rollouts"];

  // Helper to match category with nice color/icon
  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case "Architecture & Frameworks":
        return { color: "text-cyan-600 bg-cyan-50 border-cyan-100", icon: <Layers className="w-3.5 h-3.5 text-cyan-600" /> };
      case "Database & Storage":
        return { color: "text-cyan-600 bg-cyan-50 border-cyan-100", icon: <Database className="w-3.5 h-3.5 text-cyan-600" /> };
      case "Performance & Caching":
        return { color: "text-cyan-600 bg-cyan-50 border-cyan-100", icon: <Zap className="w-3.5 h-3.5 text-cyan-600" /> };
      case "Real-time & Security":
        return { color: "text-cyan-600 bg-cyan-50 border-cyan-100", icon: <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" /> };
      case "Frontend & Rollouts":
        return { color: "text-emerald-600 bg-emerald-50 border-emerald-100", icon: <Cpu className="w-3.5 h-3.5 text-emerald-600" /> };
      default:
        return { color: "text-slate-600 bg-slate-50 border-slate-100", icon: <BookOpen className="w-3.5 h-3.5 text-slate-600" /> };
    }
  };

  const progressPercentage = Math.round((masteredList.length / QUESTIONS_DATA.length) * 100);

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-800 flex flex-col font-sans">
      {/* HEADER NAVIGATION */}
      <header className="bg-white/80 backdrop-blur border-b border-slate-200/80 sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-100">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">System Design Q&A Explorer</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Interactive Interview Handbook & Simulators</p>
            </div>
          </div>
        </div>

        {/* TOP STATUS PILL */}
        <div className="flex items-center gap-4">
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 flex items-center gap-2.5 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="hidden sm:inline">Handbook Mastered:</span>
            <span className="text-slate-900 font-bold">{masteredList.length} / {QUESTIONS_DATA.length} Concepts ({progressPercentage}%)</span>
          </div>

          <div className="hidden lg:block w-24 bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full transition-all duration-500" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </header>

      {/* BODY WORKSPACE */}
      <div className="flex-1 flex overflow-hidden relative max-w-7xl mx-auto w-full p-4 md:p-6 lg:p-8 gap-6">
        {/* SIDEBAR */}
        <aside className={`
          fixed md:relative inset-y-0 start-0 z-40 w-80 bg-white border border-slate-200 rounded-3xl p-5 flex flex-col gap-4 shadow-sm transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          md:translate-x-0 md:h-auto pt-20 md:pt-5
        `}>
          {/* SEARCH BOX */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search concepts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border-none rounded-xl py-2 px-9 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* CATEGORY FILTERS */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Categories</span>
            <div className="flex flex-wrap gap-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setSidebarOpen(false); }}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition cursor-pointer ${
                    activeCategory === cat 
                      ? "bg-cyan-600 text-white shadow-md shadow-cyan-500/10" 
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  {cat === "All" ? "All" : cat.split(" & ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* QUESTIONS LIST */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-1">Concept Index</span>
            {filteredQuestions.map((q) => {
              const isMastered = masteredList.includes(q.id);
              const isSelected = selectedQuestion.id === q.id;

              return (
                <button
                  key={q.id}
                  onClick={() => { setSelectedQuestion(q); setSidebarOpen(false); }}
                  className={`w-full text-left p-3 rounded-2xl flex gap-3 border transition cursor-pointer ${
                    isSelected 
                      ? "bg-cyan-50 border-cyan-100 text-slate-950 shadow-sm" 
                      : "bg-transparent border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                  }`}
                >
                  {/* Mastered tick box */}
                  <div className="mt-0.5 shrink-0" onClick={(e) => { e.stopPropagation(); toggleMastered(q.id); }}>
                    <CheckCircle2 className={`w-4 h-4 transition-colors ${isMastered ? "text-emerald-500 fill-emerald-500/15" : "text-slate-300 hover:text-emerald-500"}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-mono font-bold text-slate-400 flex items-center gap-1.5 mb-0.5">
                      <span className={isSelected ? "text-cyan-600" : "text-slate-400"}>Q{q.id}</span>
                      <span>•</span>
                      <span className="truncate">{q.category.split(" & ")[0]}</span>
                    </div>
                    <div className={`text-xs font-semibold leading-snug break-words ${isSelected ? "text-slate-900" : "text-slate-700"}`}>
                      {q.question}
                    </div>
                  </div>
                </button>
              );
            })}
            {filteredQuestions.length === 0 && (
              <div className="text-center p-6 text-xs text-slate-400 italic">
                No matching results found.
              </div>
            )}
          </div>

          {/* SIDEBAR FOOTER */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold">v3.5.0</span>
            <div className="flex -space-x-1">
              <div className="w-5 h-5 rounded-full bg-cyan-500 border border-white flex items-center justify-center text-[8px] text-white font-bold">SD</div>
              <div className="w-5 h-5 rounded-full bg-emerald-500 border border-white flex items-center justify-center text-[8px] text-white font-bold">✓</div>
            </div>
          </div>
        </aside>

        {/* DETAILED WORKING SCREEN (BENTO GRID CONTAINER) */}
        <main className="flex-1 overflow-y-auto space-y-6 pr-1">
          <div className="grid grid-cols-12 gap-6">
            
            {/* HERO CARD (Col 4-9, Row 1-2 equivalent) */}
            <section className="col-span-12 lg:col-span-8 bg-cyan-600 rounded-3xl p-8 flex flex-col justify-center text-white relative overflow-hidden shadow-lg shadow-cyan-100">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <BookOpen className="w-32 h-32 text-white" />
              </div>
              <span className="inline-block px-3 py-1 bg-cyan-500/50 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 w-fit">
                Question {selectedQuestion.id} / {QUESTIONS_DATA.length}
              </span>
              <h2 className="text-xl md:text-2xl font-bold leading-tight font-display text-white">
                {selectedQuestion.question}
              </h2>
            </section>

            {/* LEARNING PROGRESS / MASTERY BUTTON (Col 10-12, Row 1-2 equivalent) */}
            <section className="col-span-12 lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Concept Mastery</h3>
              
              <div className="flex-grow flex flex-col justify-center items-center py-4 text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2.5 ${
                  masteredList.includes(selectedQuestion.id) 
                    ? "bg-emerald-100 text-emerald-600" 
                    : "bg-slate-100 text-slate-400"
                }`}>
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <p className="text-xs font-semibold text-slate-800 mb-1">
                  {masteredList.includes(selectedQuestion.id) ? "You have mastered this concept!" : "Mark this concept as mastered?"}
                </p>
                <p className="text-[11px] text-slate-400 max-w-xs leading-normal">
                  Toggle mastery to build your real-time interview dashboard stats.
                </p>
              </div>

              <div className="space-y-2 mt-2">
                <button
                  onClick={() => toggleMastered(selectedQuestion.id)}
                  className={`w-full py-3 rounded-2xl text-xs font-bold cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 ${
                    masteredList.includes(selectedQuestion.id)
                      ? "bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {masteredList.includes(selectedQuestion.id) ? "Concept Mastered" : "Mark as Mastered"}
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={handlePrevConcept}
                    disabled={selectedQuestion.id === 1}
                    className="py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-xl text-[11px] font-bold text-slate-600 transition cursor-pointer"
                  >
                    ← Prev Concept
                  </button>
                  <button 
                    onClick={handleNextConcept}
                    disabled={selectedQuestion.id === QUESTIONS_DATA.length}
                    className="py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-xl text-[11px] font-bold text-slate-600 transition cursor-pointer"
                  >
                    Next Concept →
                  </button>
                </div>
              </div>
            </section>

            {/* DETAILED CORE ANSWER (Col 4-9, Row 3-4 equivalent) */}
            <section className="col-span-12 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span> The Core Explanation
              </h3>
              <div className="text-slate-700 leading-relaxed text-sm md:text-base font-medium">
                {selectedQuestion.answer}
              </div>
            </section>

            {/* INTERACTIVE PLAYGROUND / SIMULATOR (Bento Cell) */}
            <section className="col-span-12 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Concept Interactive Simulator
                </h3>
              </div>
              <SimulatorsHub questionId={selectedQuestion.id} />
            </section>

            {/* UNDER THE HOOD MECHANICS (Col 4-7 equivalent) */}
            <section className="col-span-12 lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col gap-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                ⚙️ Under-The-Hood Mechanics
              </h3>
              <div className="space-y-4">
                {selectedQuestion.conceptBreakdown.map((item, idx) => (
                  <div key={idx} className="flex gap-4 text-xs leading-relaxed">
                    <div className="w-6 h-6 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-600 flex items-center justify-center shrink-0 font-bold font-mono">
                      {idx + 1}
                    </div>
                    <div>
                      <strong className="text-slate-900 block mb-0.5 font-semibold text-sm">{item.title}</strong>
                      <span className="text-slate-500 leading-relaxed">{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* PRODUCTION USE CASE & TRADEOFFS (Col 8-12 equivalent) */}
            <section className="col-span-12 lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col gap-5 justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Production Context</h3>
                
                <div className="space-y-4">
                  {/* Practical use case */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <h4 className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                      🏭 Production Use Case
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed italic">
                      "{selectedQuestion.practicalExample}"
                    </p>
                  </div>

                  {/* Tradeoffs */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                      ⚖️ Architectural Considerations & Pro/Con Trades
                    </h4>
                    {selectedQuestion.prosCons.map((pc, idx) => (
                      <div key={idx} className="space-y-1.5 text-[11px]">
                        <div className="font-semibold text-slate-800">{pc.title}:</div>
                        <ul className="list-disc pl-4 space-y-1 text-slate-500 leading-normal">
                          {pc.list.slice(0, 2).map((item, lIdx) => (
                            <li key={lIdx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* CODE IMPLEMENTATION CORNER (Col 4-12) */}
            <section className="col-span-12 bg-slate-900 rounded-3xl p-6 text-slate-300 font-mono text-xs overflow-hidden border border-slate-800 shadow-md">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-slate-500 font-sans font-bold text-[10px] tracking-widest uppercase">Code Snippet Framework</span>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <button 
                  onClick={() => handleCopyCode(selectedQuestion.codeExample)}
                  className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800 hover:bg-slate-700 transition px-2.5 py-1 rounded-lg cursor-pointer font-sans"
                >
                  {copied ? <Check className="w-3 text-emerald-400" /> : <Copy className="w-3" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-[11px] font-mono leading-relaxed text-slate-300 bg-slate-950/40 rounded-xl select-all border border-slate-800/40 max-h-[350px] overflow-y-auto scrollbar">
                <code>{selectedQuestion.codeExample}</code>
              </pre>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}
