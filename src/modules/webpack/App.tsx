/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { 
  Search, 
  BookOpen, 
  Sparkles, 
  Cpu, 
  Layers, 
  Hammer, 
  Zap, 
  MonitorPlay, 
  CheckCircle2, 
  ChevronRight, 
  Code2, 
  Terminal, 
  SlidersHorizontal,
  Info,
  Layers2
} from "lucide-react";
import { QUESTIONS } from "./data";
import { WebpackCategory, Question } from "./types";
import { GraphSimulator } from "./components/GraphSimulator";
import { LoaderPipeline } from "./components/LoaderPipeline";
import { PluginLifecycle } from "./components/PluginLifecycle";
import { OptimizationSandbox } from "./components/OptimizationSandbox";
import { DevServerConsole } from "./components/DevServerConsole";

export default function App() {
  const [activeTab, setActiveTab] = useState<"classroom" | "labs">("classroom");
  
  // Searching & Filtering states
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<WebpackCategory | "All">("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<"All" | "Basic" | "Intermediate" | "Advanced">("All");
  
  // Selected question inside classroom
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(1);
  const [classroomSubTab, setClassroomSubTab] = useState<"theory" | "visualizer">("theory");

  // Selected lab inside Labs view
  const [selectedLabId, setSelectedLabId] = useState<string>("graph");

  // Filtered questions memo
  const filteredQuestions = useMemo(() => {
    return QUESTIONS.filter(q => {
      const matchesSearch = 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.detailedAnswer.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "All" || q.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === "All" || q.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  // Find currently active question
  const activeQuestion = useMemo(() => {
    return QUESTIONS.find(q => q.id === selectedQuestionId) || QUESTIONS[0];
  }, [selectedQuestionId]);

  // Helper to highlight simple code keywords visually inside our custom container
  const highlightCode = (code: string) => {
    const keywords = [
      "module.exports", "entry", "output", "plugins", "rules", "test", "use",
      "resolve", "extensions", "alias", "optimization", "splitChunks", "mode",
      "const", "let", "var", "import", "export", "from", "require", "new", "true", "false"
    ];
    
    return code.split("\n").map((line, idx) => {
      let lineHtml = line;
      // Simple escape
      lineHtml = lineHtml
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      // Replace comments
      lineHtml = lineHtml.replace(/(\/\/.*)/g, '<span class="text-zinc-500 font-normal">$1</span>');

      return (
        <div key={idx} className="flex hover:bg-zinc-900/60 py-0.5 rounded px-2 transition">
          <span className="text-zinc-600 select-none w-6 text-right mr-4 text-[10px] font-mono leading-relaxed">{idx + 1}</span>
          <span className="text-zinc-300 font-mono text-xs leading-relaxed flex-1 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: lineHtml }} />
        </div>
      );
    });
  };

  // Maps diagram types to active simulator rendering
  const renderVisualizer = (type: string) => {
    switch (type) {
      case "graph":
        return <GraphSimulator />;
      case "loader":
        return <LoaderPipeline />;
      case "plugin":
        return <PluginLifecycle />;
      case "optimization":
        return <OptimizationSandbox />;
      case "devexp":
        return <DevServerConsole />;
      default:
        return <GraphSimulator />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-cyan-500/30 selection:text-white overflow-x-hidden antialiased relative" style={{ background: "radial-gradient(circle at 0% 0%, #312e81 0%, transparent 50%), radial-gradient(circle at 100% 100%, #4c1d95 0%, transparent 50%), #020617" }}>
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* 1. Global Navigation Top Bar */}
      <header className="bg-white/5 backdrop-blur-xl border border-white/10 sticky top-0 z-40 px-6 py-4 shadow-2xl rounded-2xl m-4 md:m-6 md:mb-2 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
              <Layers2 className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-white flex items-center gap-2 leading-none">
                Webpack Interview Visualizer
              </h1>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase tracking-wider">
                  40 core concepts • 5 interactive modules • full-stack curriculum
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Environment Selectors */}
          <div className="flex bg-white/5 backdrop-blur-md p-1 rounded-2xl border border-white/10 w-full md:w-auto">
            <button
              id="classroom-tab-btn"
              onClick={() => setActiveTab("classroom")}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition duration-200 ${
                activeTab === "classroom"
                  ? "bg-white/10 text-white shadow-lg shadow-black/20 border border-white/10"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Q&A Classroom
            </button>
            <button
              id="labs-tab-btn"
              onClick={() => setActiveTab("labs")}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition duration-200 ${
                activeTab === "labs"
                  ? "bg-white/10 text-white shadow-lg shadow-black/20 border border-white/10"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Interactive Lab
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Workspace */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 flex flex-col gap-6">
        {/* Environment 1: Q&A Classroom */}
        {activeTab === "classroom" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT RAIL: Filters and list of 40 questions */}
            <div className="lg:col-span-4 flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-2xl gap-4 max-h-[85vh] lg:sticky lg:top-24">
              <div className="space-y-1.5 border-b border-white/10 pb-3 text-left">
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <SlidersHorizontal className="w-4 h-4 text-slate-400" /> Question Directory
                </h3>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Filter or search through {filteredQuestions.length} matched questions.
                </p>
              </div>

              {/* Live search input */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search questions or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 focus:border-cyan-500 rounded-xl text-xs outline-hidden transition placeholder:text-slate-500 text-white"
                />
              </div>

              {/* Categories Accordion/Tabs */}
              <div className="space-y-2 text-left">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Filter Category</span>
                <select
                  id="category-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as any)}
                  className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-200 outline-hidden focus:border-cyan-500 transition"
                >
                  <option value="All">All Categories (Entire Core)</option>
                  {Object.values(WebpackCategory).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty filter buttons */}
              <div className="space-y-2 text-left">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Filter Difficulty</span>
                <div className="flex flex-wrap gap-1">
                  {(["All", "Basic", "Intermediate", "Advanced"] as const).map(diff => (
                    <button
                      key={diff}
                      id={`diff-filter-${diff}`}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition ${
                        selectedDifficulty === diff
                          ? "bg-cyan-600 text-white shadow-lg border border-cyan-500/30"
                          : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* List of matched questions */}
              <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 max-h-[40vh] lg:max-h-[50vh] scrollbar-thin scrollbar-thumb-white/10">
                {filteredQuestions.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-xs italic">
                    No questions found matching current parameters.
                  </div>
                ) : (
                  filteredQuestions.map((q, index) => {
                    const isSelected = selectedQuestionId === q.id;
                    return (
                      <button
                        key={q.id}
                        id={`q-item-${q.id}`}
                        onClick={() => {
                          setSelectedQuestionId(q.id);
                          setClassroomSubTab("theory"); // Reset sub-tab
                        }}
                        className={`w-full text-left p-3 rounded-xl border transition flex items-start gap-2.5 group ${
                          isSelected
                            ? "bg-white/10 border-cyan-500/50 ring-1 ring-cyan-500/20 shadow-lg"
                            : "bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/10"
                        }`}
                      >
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded h-5 flex items-center justify-center ${
                          isSelected
                            ? "bg-cyan-600 text-white"
                            : "bg-white/10 text-slate-300 group-hover:bg-white/20"
                        }`}>
                          Q{q.id < 10 ? `0${q.id}` : q.id}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-xs font-semibold leading-relaxed truncate ${
                            isSelected ? "text-white font-bold" : "text-slate-300"
                          }`}>
                            {q.question}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[9px] font-mono font-semibold text-slate-400">{q.category}</span>
                            <span className="text-[9px] font-sans font-medium text-slate-500">•</span>
                            <span className={`text-[9px] font-semibold ${
                              q.difficulty === "Basic" ? "text-emerald-400" :
                              q.difficulty === "Intermediate" ? "text-cyan-400" : "text-rose-400"
                            }`}>{q.difficulty}</span>
                          </div>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 text-slate-400 mt-0.5 transition ${
                          isSelected ? "translate-x-0.5 text-cyan-400" : "opacity-0 group-hover:opacity-100"
                        }`} />
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* RIGHT PANEL: Focused Q&A and active simulator */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Question Header Card */}
              <div id="classroom-question-header" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 text-left">
                <div className="flex flex-wrap justify-between items-center gap-2 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 px-2.5 py-1 rounded border border-cyan-500/30">
                      QUESTION {activeQuestion.id}
                    </span>
                    <span className="text-xs font-mono font-semibold text-slate-400">
                      {activeQuestion.category}
                    </span>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    activeQuestion.difficulty === "Basic" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" :
                    activeQuestion.difficulty === "Intermediate" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30" :
                    "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                  }`}>
                    {activeQuestion.difficulty}
                  </span>
                </div>

                <h2 className="text-lg md:text-xl font-extrabold tracking-tight text-white">
                  {activeQuestion.question}
                </h2>

                <div className="bg-cyan-950/40 p-4 rounded-xl border border-cyan-500/20">
                  <h4 className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Concise Interview Answer:
                  </h4>
                  <p className="text-sm text-slate-250 leading-relaxed font-medium">
                    {activeQuestion.answer}
                  </p>
                </div>

                {/* Sub Tab selection between Theory / Live visualizer */}
                <div className="flex border-t border-white/10 pt-3 gap-3">
                  <button
                    id="sub-tab-theory-btn"
                    onClick={() => setClassroomSubTab("theory")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      classroomSubTab === "theory"
                        ? "bg-cyan-600 text-white hover:bg-cyan-500 shadow-lg shadow-cyan-600/20 border border-cyan-500/30"
                        : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Deep-Dive & Code
                  </button>
                  <button
                    id="sub-tab-visualizer-btn"
                    onClick={() => setClassroomSubTab("visualizer")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      classroomSubTab === "visualizer"
                        ? "bg-cyan-600 text-white hover:bg-cyan-500 shadow-lg shadow-cyan-600/20 border border-cyan-500/30"
                        : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Interactive Sandbox visualizer
                  </button>
                </div>
              </div>

              {/* Dynamic Content render based on Sub Tab */}
              {classroomSubTab === "theory" ? (
                <div className="grid grid-cols-1 gap-6 text-left">
                  {/* Expanded deep-dive classroom text */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                    <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5 border-b border-white/10 pb-2">
                      <Terminal className="w-4 h-4 text-slate-400" /> Conceptual Deep-Dive Classroom
                    </h4>
                    <div className="text-slate-300 text-xs md:text-sm leading-relaxed space-y-3 whitespace-pre-wrap">
                      {activeQuestion.detailedAnswer}
                    </div>
                  </div>

                  {/* Built-in syntax highlighted Code editor frame */}
                  {activeQuestion.codeExample && (
                    <div className="bg-slate-900/40 rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
                      <div className="bg-white/5 border-b border-white/10 px-4 py-2.5 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Code2 className="w-4 h-4 text-cyan-400" />
                          <span className="text-xs font-mono font-bold text-slate-300">IDE Editor Code Blueprint</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                          webpack.config.js
                        </span>
                      </div>
                      <div className="p-4 font-mono overflow-x-auto text-left max-h-[350px] scrollbar-thin scrollbar-thumb-white/10">
                        {highlightCode(activeQuestion.codeExample)}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Interactive Sandbox visualizer */
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {renderVisualizer(activeQuestion.diagramType)}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Environment 2: Interactive Labs */}
        {activeTab === "labs" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Labs left picker rail */}
            <div className="lg:col-span-3 flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl gap-3 lg:sticky lg:top-24">
              <div className="space-y-1.5 border-b border-white/10 pb-3 text-left">
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" /> Sandbox Lab Suite
                </h3>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Toggle directly between Webpack's core mechanical engines to play with real compiles.
                </p>
              </div>

              {/* Lab tabs */}
              <div className="space-y-1 text-left">
                {[
                  { id: "graph", name: "Dependency Graph Map", icon: Cpu, desc: "BFS traversal visual compiler builder" },
                  { id: "loader", name: "Loader pipeline transform", icon: Layers, desc: "Step-by-step TS and CSS preprocessors" },
                  { id: "plugin", name: "Compiler Lifecycle Hooks", icon: Hammer, desc: "Plugin tap compiler lifecycle hook triggers" },
                  { id: "optimization", name: "Optimizations & Chunks", icon: Zap, desc: "Tree Shaking & caching contenthash sandbox" },
                  { id: "devexp", name: "HMR & API proxy server", icon: MonitorPlay, desc: "Local state preservation & CORS bypass" }
                ].map(lab => (
                  <button
                    key={lab.id}
                    id={`lab-btn-${lab.id}`}
                    onClick={() => setSelectedLabId(lab.id)}
                    className={`w-full p-2.5 rounded-xl border text-left transition flex items-start gap-2.5 group ${
                      selectedLabId === lab.id
                        ? "bg-white/10 border-cyan-500/50 text-white shadow-xl"
                        : "bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/10 text-slate-350"
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg border transition ${selectedLabId === lab.id ? "bg-cyan-600 border-cyan-500 text-white shadow-lg" : "bg-white/5 text-slate-400 border-white/10"}`}>
                      <lab.icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className={`text-xs font-bold leading-none ${selectedLabId === lab.id ? "text-cyan-300" : "text-slate-300"}`}>{lab.name}</div>
                      <div className="text-[9.5px] text-slate-400 mt-1.5 truncate">{lab.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Labs right visualizer viewport */}
            <div className="lg:col-span-9 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {renderVisualizer(selectedLabId)}
            </div>
          </div>
        )}
      </main>

      {/* 3. Global Footer */}
      <footer className="bg-white/5 backdrop-blur-md border-t border-white/10 mt-12 py-6 text-center text-xs text-slate-400 font-sans relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            <span>Powered by Antigravity Agent Engine</span>
            <span>•</span>
            <span>React 19 & Tailwind 4</span>
          </div>
          <p className="text-slate-500 text-[11px] font-sans">
            Crafted for engineers preparing for frontend interviews. Practice, inspect, and master Webpack 5.
          </p>
        </div>
      </footer>
    </div>
  );
}
