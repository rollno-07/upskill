import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Cpu, 
  Sparkles, 
  Code, 
  Sliders, 
  FileCode2, 
  Info,
  ChevronRight,
  HelpCircle
} from "lucide-react";
import { questionsData, CATEGORIES } from "./data/questions";
import { QuestionData } from "./types";

// Import custom interactive visualizations
import PipelineSimulator from "./components/PipelineSimulator";
import DeploymentVisualizer from "./components/DeploymentVisualizer";
import DockerLayerCaching from "./components/DockerLayerCaching";
import DbMigrationVisualizer from "./components/DbMigrationVisualizer";
import GitBranchingSimulator from "./components/GitBranchingSimulator";
import DynamicExplainerPanel from "./components/DynamicExplainerPanel";

export default function App() {
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionData>(questionsData[0]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  // Right-hand tab state: "visualizer" | "explainer" | "blueprint"
  const [activeTab, setActiveTab] = useState<"visualizer" | "explainer" | "blueprint">("visualizer");

  // Filtered list of questions based on search and category
  const filteredQuestions = useMemo(() => {
    return questionsData.filter(q => {
      const matchesSearch = 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.concept.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === "All" || q.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleSelectQuestion = (q: QuestionData) => {
    setSelectedQuestion(q);
  };

  // Helper to render the correct custom visual diagram component based on metadata
  const renderVisualizer = (type: string) => {
    switch (type) {
      case "pipeline":
        return <PipelineSimulator />;
      case "deployment":
        return <DeploymentVisualizer />;
      case "docker":
        return <DockerLayerCaching />;
      case "db-migration":
        return <DbMigrationVisualizer />;
      case "git-flow":
        return <GitBranchingSimulator />;
      default:
        return <PipelineSimulator />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased">
      
      {/* Top Navigation Bar */}
      <nav className="h-16 border-b border-slate-800 flex items-center justify-between px-6 md:px-8 bg-slate-950/50 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-white font-sans text-sm shadow-[0_0_12px_rgba(99,102,241,0.3)]">
            CI
          </div>
          <span className="text-lg md:text-xl font-semibold tracking-tight text-white flex items-center gap-2">
            ReleaseScan <span className="text-indigo-400 font-mono text-xs px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full">v1.2</span>
          </span>
        </div>
        
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden sm:flex gap-1.5 items-center">
            <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs text-slate-400 font-mono">interview_q100.json</span>
            <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-xs text-green-400 uppercase tracking-widest font-bold text-[10px]">100% Verified</span>
          </div>
          
          <div className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center relative">
            <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </nav>

      {/* Main Container Bento Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 overflow-hidden">
        
        {/* Left Side: Captured Questions Sidebar List */}
        <aside className="w-full lg:w-80 flex flex-col gap-4 shrink-0 lg:max-h-[calc(100vh-120px)]">
          
          {/* Bento Box: Filter Category Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 font-mono block">
                Filter Catalog
              </span>
              <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 border border-indigo-500/20 rounded">
                {filteredQuestions.length} Found
              </span>
            </div>

            {/* Custom search inside filter panel */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-3.5 h-3.5" />
              <input
                type="text"
                placeholder="Search QA or concepts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all font-sans"
              />
            </div>

            {/* Categories list tag carousel */}
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-2.5 py-1 text-[9px] font-bold uppercase rounded-md transition-all ${
                  selectedCategory === "All" 
                    ? "bg-indigo-500 text-white font-semibold shadow-[0_0_8px_rgba(99,102,241,0.4)]" 
                    : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800/80"
                }`}
              >
                All
              </button>
              {Object.entries(CATEGORIES).map(([key, name]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(name)}
                  className={`px-2.5 py-1 text-[9px] font-bold uppercase rounded-md transition-all ${
                    selectedCategory === name 
                      ? "bg-indigo-500 text-white font-semibold shadow-[0_0_8px_rgba(99,102,241,0.4)]" 
                      : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800/80"
                  }`}
                >
                  {name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Bento Box: Questions Directory list scroll area */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl flex-1 flex flex-col overflow-hidden min-h-[350px]">
            <div className="border-b border-slate-800/80 px-4 py-3 bg-slate-900/40 flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono block">
                Captured Questions
              </span>
            </div>

            {/* List scrollbox */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((q) => {
                  const isSelected = q.id === selectedQuestion.id;
                  
                  return (
                    <button
                      key={q.id}
                      onClick={() => handleSelectQuestion(q)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex gap-3 items-start cursor-pointer ${
                        isSelected 
                          ? "bg-indigo-500/10 border border-indigo-500/30 text-white shadow-inner" 
                          : "bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60 text-slate-300 opacity-70 hover:opacity-100"
                      }`}
                    >
                      {/* Left Badge ID */}
                      <span className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-all ${
                        isSelected ? "bg-indigo-500 text-white" : "bg-slate-950 text-slate-500 border border-slate-800"
                      }`}>
                        {String(q.id).padStart(2, '0')}
                      </span>

                      {/* Middle Question Text */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap mb-1">
                          <span className={`text-[9px] font-mono tracking-widest uppercase font-bold ${
                            isSelected ? "text-indigo-400" : "text-slate-500"
                          }`}>
                            {q.concept}
                          </span>
                        </div>
                        <p className={`text-xs leading-normal font-sans line-clamp-2 ${
                          isSelected ? "text-slate-100 font-medium" : "text-slate-400"
                        }`}>
                          {q.question}
                        </p>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="py-12 text-center">
                  <p className="text-xs text-slate-500 font-mono">No matching interview questions found.</p>
                  <button 
                    onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                    className="mt-3 text-xs text-indigo-400 border border-indigo-500/20 px-3 py-1.5 rounded-xl hover:bg-indigo-500/10 transition-all font-mono"
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </div>
          </div>

        </aside>

        {/* Right Side: Bento Grid Core Content Workspace */}
        <main className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4 overflow-y-auto pr-1">
          
          {/* Card 1: Question Header Block */}
          <div className="col-span-1 md:col-span-6 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-indigo-400 text-xs font-mono mb-1 block uppercase tracking-widest font-bold">
                {selectedQuestion.category}
              </span>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-white leading-tight font-sans">
                {selectedQuestion.question}
              </h1>
            </div>
            
            <div className="flex gap-4 items-center shrink-0 self-stretch md:self-auto justify-end border-t border-slate-800/80 md:border-t-0 pt-4 md:pt-0">
               <div className="text-right">
                 <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">Complexity</div>
                 <div className="text-sm font-bold text-orange-400">Intermediate</div>
               </div>
               <div className="h-8 w-px bg-slate-800"></div>
               <div className="text-right">
                 <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">Concept ID</div>
                 <div className="text-sm font-bold text-white font-mono">#{String(selectedQuestion.id).padStart(2, '0')}</div>
               </div>
            </div>
          </div>

          {/* Card 2: Detailed Answer / Deep Dive Card */}
          <div className="col-span-1 md:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
            <h2 className="text-lg font-bold text-indigo-300 font-sans tracking-tight">
              Detailed Explanation
            </h2>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-sans whitespace-pre-line">
              {selectedQuestion.answer}
            </p>
            
            <div className="mt-auto pt-4 border-t border-slate-800/60">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 font-mono block mb-1.5">
                Key Takeaway
              </span>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 italic text-slate-400 text-xs leading-relaxed font-sans">
                "{selectedQuestion.keyTakeaway}"
              </div>
            </div>
          </div>

          {/* Card 3: Interactive Visual Diagram Card */}
          <div className="col-span-1 md:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-3 shadow-md relative overflow-hidden group min-h-[420px]">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-3 mb-1.5">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-indigo-400 animate-pulse" />
                  <span>Interactive Diagram</span>
                </h2>
                <p className="text-[10px] text-indigo-300/60 font-mono uppercase tracking-wider">{selectedQuestion.visualType.toUpperCase()} SIMULATOR</p>
              </div>
              <span className="px-2.5 py-0.5 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-[9px] text-indigo-300 font-mono font-bold tracking-wider uppercase">
                Active Stage
              </span>
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-between">
              {renderVisualizer(selectedQuestion.visualType)}
            </div>
          </div>

          {/* Bottom row Bento Grid: AI Explainer and YAML/Blueprint */}
          <div className="col-span-1 md:col-span-6 grid grid-cols-1 md:grid-cols-6 gap-4 mt-2">
            
            {/* AI Explainer Bento Block */}
            <div className={`${selectedQuestion.codeExample ? "md:col-span-3" : "md:col-span-6"}`}>
              <DynamicExplainerPanel question={selectedQuestion} />
            </div>

            {/* Code Blueprint Bento Block */}
            {selectedQuestion.codeExample && (
              <div className="md:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
                <div className="flex flex-col h-full font-mono">
                  <div className="flex justify-between items-center border-b border-slate-800/80 pb-3 mb-4">
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase">Practical Implementation</h3>
                      <p className="text-[9px] text-slate-500 font-mono mt-0.5">DECLARATIVE CONFIGURATION SPEC</p>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/30"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/30"></div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 overflow-auto max-h-[300px] text-indigo-300 text-xs leading-relaxed">
                    <pre className="whitespace-pre select-all">{selectedQuestion.codeExample}</pre>
                  </div>
                </div>
              </div>
            )}

          </div>

        </main>
      </div>

      {/* Bottom Status Bar */}
      <footer className="h-10 bg-slate-900 border-t border-slate-800 flex items-center px-6 md:px-8 justify-between text-[10px] text-slate-500 uppercase tracking-widest font-mono">
        <div className="flex gap-4">
          <span>Source: internal_devops_vault.json</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">Parser: gemini-3.5-flash</span>
        </div>
        <div className="flex gap-2 items-center">
          <span>Press [Click] to scan any Question</span>
        </div>
      </footer>

    </div>
  );
}
