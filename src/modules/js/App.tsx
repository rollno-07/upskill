import React, { useState, useEffect } from 'react';
import { Question, Category, Difficulty } from './types';
import { questions as defaultQuestions, categoryLabels } from './data/questions';
import { ConceptSidebar } from './components/ConceptSidebar';
import { InteractiveDiagram } from './components/InteractiveDiagram';
import { CodePlayground } from './components/CodePlayground';
import {
  FileCode,
  Sparkles,
  Terminal,
  Activity,
  ArrowLeft,
  ArrowRight,
  Plus,
  X,
  Upload,
  Cpu,
  Bookmark,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export default function App() {
  // Questions source - defaults to our perfect 100 compiled questions
  const [questions, setQuestions] = useState<Question[]>(defaultQuestions);
  const [selectedQuestion, setSelectedQuestion] = useState<Question>(defaultQuestions[0]);
  const [activeTab, setActiveTab] = useState<'explanation' | 'playground'>('explanation');
  
  // Custom file metadata
  const [fileName, setFileName] = useState('concepts_master_list.md');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadedText, setUploadedText] = useState('');
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Completed questions state tracked by ID with localstorage
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  // Load progress on initial render
  useEffect(() => {
    try {
      const stored = localStorage.getItem('js_scanner_completed');
      if (stored) {
        setCompletedQuestions(JSON.parse(stored));
      }
    } catch (e) {
      console.error('LocalStorage failed:', e);
    }
  }, []);

  // Update localStorage when changed
  const handleToggleComplete = (id: number) => {
    setCompletedQuestions(prev => {
      let updated;
      if (prev.includes(id)) {
        updated = prev.filter(x => x !== id);
      } else {
        updated = [...prev, id];
      }
      localStorage.setItem('js_scanner_completed', JSON.stringify(updated));
      return updated;
    });
  };

  // Safe navigation controls
  const handlePrevQuestion = () => {
    const currentIndex = questions.findIndex(q => q.id === selectedQuestion.id);
    if (currentIndex > 0) {
      setSelectedQuestion(questions[currentIndex - 1]);
      setActiveTab('explanation');
    }
  };

  const handleNextQuestion = () => {
    const currentIndex = questions.findIndex(q => q.id === selectedQuestion.id);
    if (currentIndex < questions.length - 1) {
      setSelectedQuestion(questions[currentIndex + 1]);
      setActiveTab('explanation');
    }
  };

  // Dynamic Markdown parsing engine
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      parseAndLoadMarkdown(text);
    };
    reader.readAsText(file);
  };

  const parseAndLoadMarkdown = (text: string) => {
    try {
      if (!text.trim()) {
        setUploadError('Markdown file is empty.');
        return;
      }

      const parsed = parseMarkdownToQuestions(text);
      if (parsed.length === 0) {
        setUploadError('No valid questions or concepts could be resolved from this markdown structure.');
        return;
      }

      setQuestions(parsed);
      setSelectedQuestion(parsed[0]);
      setIsUploadModalOpen(false);
      setUploadError(null);
    } catch (e: any) {
      setUploadError(`Failed to compile markdown binary records: ${e.message}`);
    }
  };

  const parseMarkdownToQuestions = (text: string): Question[] => {
    const lines = text.split('\n');
    const parsed: Question[] = [];
    let currentQuestion: Partial<Question> = {};
    let currentSection: 'question' | 'answer' | 'code' | 'steps' | null = null;

    for (let line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // Match "### Q1: Name" or "## 1. Name" or "# 1. Name" or "1. Name" or simple "1. Name"
      const questionMatch = 
        trimmed.match(/^(?:###|##|#)?\s*(?:Q\d+[:.]?|\d+[\s.)])\s*(.*)/i) || 
        trimmed.match(/^\*\*(?:\d+[\s.)])\s*(.*)\*\*/);

      if (questionMatch) {
        if (currentQuestion.question) {
          parsed.push(finalizeParsedQuestion(currentQuestion, parsed.length + 1));
        }
        currentQuestion = {
          question: questionMatch[1].trim(),
          explanationSteps: [],
          codeExample: '',
          category: 'scope_closures',
          difficulty: 'Medium'
        };
        currentSection = 'answer';
        continue;
      }

      // Code blocks selector
      if (trimmed.startsWith('```')) {
        if (currentSection === 'code') {
          currentSection = 'answer';
        } else {
          currentSection = 'code';
        }
        continue;
      }

      if (currentSection === 'code') {
        currentQuestion.codeExample = (currentQuestion.codeExample || '') + line + '\n';
        continue;
      }

      // Explanatory steps
      if (trimmed.startsWith('-') || trimmed.startsWith('*') || trimmed.match(/^\d+\./)) {
        currentSection = 'steps';
        const stepText = trimmed.replace(/^[-*\d.]+\s*/, '');
        currentQuestion.explanationSteps = [...(currentQuestion.explanationSteps || []), stepText];
        continue;
      }

      // Default body text falls into Answer
      if (currentQuestion.question) {
        currentQuestion.answer = (currentQuestion.answer || '') + (currentQuestion.answer ? ' ' : '') + trimmed;
      }
    }

    if (currentQuestion.question) {
      parsed.push(finalizeParsedQuestion(currentQuestion, parsed.length + 1));
    }

    return parsed;
  };

  const finalizeParsedQuestion = (q: Partial<Question>, id: number): Question => {
    // Attempt to guess category based on keyword matches
    let category: Category = 'scope_closures';
    const combined = ((q.question || '') + ' ' + (q.answer || '')).toLowerCase();
    
    if (combined.includes('promise') || combined.includes('event loop') || combined.includes('async') || combined.includes('setTimeout') || combined.includes('await')) {
      category = 'async_event_loop';
    } else if (combined.includes('this') || combined.includes('bind') || combined.includes('call') || combined.includes('apply')) {
      category = 'this_functions';
    } else if (combined.includes('prototype') || combined.includes('inherit') || combined.includes('__proto__')) {
      category = 'objects_prototypes';
    } else if (combined.includes('coercion') || combined.includes('==' ) || combined.includes('===') || combined.includes('typeof')) {
      category = 'types_coercion';
    } else if (combined.includes('array') || combined.includes('map') || combined.includes('filter') || combined.includes('reduce') || combined.includes('slice')) {
      category = 'array_methods';
    } else if (combined.includes('dom') || combined.includes('browser') || combined.includes('bubbling') || combined.includes('event')) {
      category = 'dom_browser_adv';
    }

    return {
      id: id,
      question: q.question || 'Concept Node',
      answer: q.answer || 'No conceptual answer parsed.',
      category: category,
      difficulty: q.difficulty || 'Medium',
      codeExample: q.codeExample || `// Custom code example parsed\nconsole.log("Analyzing concept node");`,
      explanationSteps: q.explanationSteps && q.explanationSteps.length > 0
        ? q.explanationSteps
        : ['Analyze execution model.', 'Observe V8 runtime allocation.', 'Confirm expected output.'],
      playgroundCode: q.codeExample || `console.log("Interactive Playground Mode");`
    };
  };

  const resetToDefaultQuestions = () => {
    setQuestions(defaultQuestions);
    setSelectedQuestion(defaultQuestions[0]);
    setFileName('concepts_master_list.md');
    setUploadError(null);
  };

  return (
    <div className="flex flex-col min-h-screen lg:h-screen w-full bg-[#0a0a0b] text-zinc-300 font-sans overflow-y-auto lg:overflow-hidden select-none">
      
      {/* 1. Header Bar */}
      <header className="h-auto py-3 min-h-16 flex flex-wrap items-center justify-between px-4 sm:px-8 bg-[#0f0f12] border-b border-zinc-800 shadow-xl shrink-0 gap-3">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-cyan-600 rounded flex items-center justify-center shadow-lg shadow-cyan-900/30 shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-2 uppercase">
              Lumina Scanner <span className="text-zinc-500 font-medium text-xs">v1.2.4</span>
            </h1>
            <p className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase truncate max-w-[200px] md:max-w-xs">
              File: {fileName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
          <div className="flex gap-2 items-center">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 hidden sm:inline">System Ready</span>
          </div>
          
          <div className="flex items-center gap-2">
            {fileName !== 'concepts_master_list.md' && (
              <button
                id="reset-default-btn"
                onClick={resetToDefaultQuestions}
                className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-[10px] font-bold text-zinc-400 hover:text-zinc-200 rounded border border-zinc-800 uppercase tracking-wider transition-colors"
              >
                Reset Default
              </button>
            )}
            <button
              id="upload-modal-trigger"
              onClick={() => setIsUploadModalOpen(true)}
              className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-white rounded border border-zinc-700 transition-colors uppercase tracking-widest flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              Scan New MD
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Workspace Layout */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-y-auto lg:overflow-hidden">
        
        {/* Concept Listing Sidebar */}
        <ConceptSidebar
          questions={questions}
          selectedQuestion={selectedQuestion}
          onSelectQuestion={(q) => {
            setSelectedQuestion(q);
            setActiveTab('explanation');
          }}
          completedQuestions={completedQuestions}
          onToggleComplete={handleToggleComplete}
        />

        {/* Workspace Display */}
        <main className="flex-1 bg-[#0a0a0b] p-6 overflow-y-auto flex flex-col gap-5 scrollbar-thin scrollbar-thumb-zinc-800 text-left">
          
          {/* Header Description Card */}
          <div className="bg-[#0f0f12] p-5 rounded-xl border border-zinc-800/80 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 blur-xl rounded-full"></div>
            
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 text-[9px] font-bold uppercase tracking-widest rounded border border-cyan-500/20">
                  {categoryLabels[selectedQuestion.category] || 'General Specs'}
                </span>
                <span className="text-zinc-600 font-mono text-[10px]">•</span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                  <Bookmark className="w-3 h-3 text-cyan-400" /> ID: NODE-{String(selectedQuestion.id).padStart(3, '0')}
                </span>
              </div>

              {/* Mastered toggle checkbox */}
              <button
                id="main-complete-toggle"
                onClick={() => handleToggleComplete(selectedQuestion.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded uppercase tracking-wider border transition-colors ${
                  completedQuestions.includes(selectedQuestion.id)
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                {completedQuestions.includes(selectedQuestion.id) ? 'Mastered Node' : 'Mark Mastered'}
              </button>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight">
              {selectedQuestion.question}
            </h2>
            
            <p className="mt-3 text-zinc-400 leading-relaxed text-[12.5px] font-sans antialiased max-w-4xl border-l-2 border-cyan-500/40 pl-3 bg-cyan-950/5 py-1 rounded">
              {selectedQuestion.answer}
            </p>
          </div>

          {/* Core Columns: Left Visual Simulation, Right Code / Editor Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-1">
            
            {/* Visualizer column */}
            <div className="lg:col-span-6 xl:col-span-7 flex flex-col">
              <InteractiveDiagram
                category={selectedQuestion.category}
                questionId={selectedQuestion.id}
              />
            </div>

            {/* Code / Tab Panel Column */}
            <div className="lg:col-span-6 xl:col-span-5 flex flex-col gap-4">
              
              {/* Tab Selector Header */}
              <div className="bg-zinc-950 p-1 border border-zinc-800 rounded-lg flex shrink-0">
                <button
                  id="tab-explanation-btn"
                  onClick={() => setActiveTab('explanation')}
                  className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-md tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'explanation'
                      ? 'bg-zinc-800 text-white shadow'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  Visual Steps & Specifications
                </button>
                <button
                  id="tab-playground-btn"
                  onClick={() => setActiveTab('playground')}
                  className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-md tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'playground'
                      ? 'bg-zinc-800 text-white shadow'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  Live Code Sandbox
                </button>
              </div>

              {/* Tab Workspace Pane */}
              <div className="flex-1 min-h-[340px]">
                {activeTab === 'explanation' ? (
                  <div className="flex flex-col h-full justify-between bg-[#0f0f12] border border-zinc-800 p-5 rounded-xl shadow-2xl">
                    <div className="text-left">
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-1.5 mb-3">
                        Instructional Steps (Compiled)
                      </div>
                      <div className="space-y-3.5">
                        {selectedQuestion.explanationSteps.map((step, idx) => (
                          <div key={idx} className="flex gap-3 items-start group">
                            <span className="w-5 h-5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                              {idx + 1}
                            </span>
                            <p className="text-[11.5px] text-zinc-300 leading-relaxed font-sans group-hover:text-white transition-colors">
                              {step}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* static code display inside Explanation */}
                    <div className="mt-5 border-t border-zinc-900 pt-4 flex flex-col gap-2">
                      <div className="flex justify-between text-[9px] text-zinc-500 uppercase tracking-wider font-mono">
                        <span>Code Reference Snippet</span>
                        <span>read-only</span>
                      </div>
                      <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-900/60 overflow-x-auto text-[10px] font-mono leading-relaxed text-zinc-400 select-all max-h-[160px] text-left">
                        <pre>{selectedQuestion.codeExample}</pre>
                      </div>
                    </div>
                  </div>
                ) : (
                  <CodePlayground
                    initialCode={selectedQuestion.playgroundCode || selectedQuestion.codeExample}
                    expectedOutput={selectedQuestion.expectedOutput}
                  />
                )}
              </div>
            </div>

          </div>

          {/* Quick concept navigation buttons */}
          <div className="flex justify-between items-center bg-zinc-950 border border-zinc-900 rounded-xl p-3 shrink-0">
            <button
              id="prev-question-btn"
              onClick={handlePrevQuestion}
              disabled={questions.findIndex(q => q.id === selectedQuestion.id) === 0}
              className="flex items-center gap-1.5 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-35 disabled:hover:bg-zinc-900 text-xs font-bold text-zinc-300 border border-zinc-800 rounded-lg uppercase tracking-wider transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Prev Concept
            </button>
            <span className="text-xs text-zinc-500 font-mono">
              Index: <span className="text-white font-bold">{questions.findIndex(q => q.id === selectedQuestion.id) + 1}</span> / {questions.length} Concepts
            </span>
            <button
              id="next-question-btn"
              onClick={handleNextQuestion}
              disabled={questions.findIndex(q => q.id === selectedQuestion.id) === questions.length - 1}
              className="flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-35 disabled:hover:bg-cyan-600 text-xs font-bold text-white rounded-lg uppercase tracking-wider transition-colors shadow-md shadow-cyan-950/50"
            >
              Next Concept
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </main>
      </div>

      {/* 3. Footer Bar */}
      <footer className="h-10 bg-[#0f0f12] border-t border-zinc-800 px-8 flex items-center justify-between text-[10px] font-mono shrink-0 select-none">
        <div className="flex items-center gap-6">
          <div className="flex gap-2 items-center">
            <span className="text-zinc-500 uppercase">Page</span>
            <span className="text-white">
              {String(questions.findIndex(q => q.id === selectedQuestion.id) + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-zinc-500 uppercase">Compiled Concepts</span>
            <span className="text-white font-bold">{questions.length} Nodes</span>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <span className="text-zinc-500 uppercase hidden sm:inline">Last Sync: {new Date().toISOString().substring(11, 16)} UTC</span>
          <span className="text-cyan-400 font-bold bg-cyan-950/40 border border-cyan-900/30 px-2 py-0.5 rounded tracking-tighter">
            AES-256 SECURE SESSION
          </span>
        </div>
      </footer>

      {/* 4. Upload Markdown File Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-[#0f0f12] border border-zinc-800 rounded-xl p-6 w-full max-w-lg shadow-2xl text-left">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                Binary Markdown Lexical Scanner
              </h3>
              <button
                id="close-upload-modal"
                onClick={() => {
                  setIsUploadModalOpen(false);
                  setUploadError(null);
                }}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
              Upload or drag any Markdown file containing question items. The scanner will compile, parse questions, structure visual explanations, and map them to our execution diagrams.
            </p>

            <div className="flex flex-col gap-3">
              <div className="border-2 border-dashed border-zinc-800 hover:border-cyan-500/60 transition-colors rounded-lg p-6 text-center cursor-pointer relative bg-[#0a0a0b]/40">
                <input
                  id="markdown-file-input"
                  type="file"
                  accept=".md"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Upload className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                <span className="text-xs text-zinc-400 block font-bold">Select .md file to compile</span>
                <span className="text-[10px] text-zinc-500 block mt-1">Accepts standard headings and code blocks</span>
              </div>

              {/* Paste textarea fallback */}
              <div className="flex flex-col gap-1.5 mt-2">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Or paste raw Markdown directly:</label>
                <textarea
                  id="raw-markdown-textarea"
                  value={uploadedText}
                  onChange={(e) => setUploadedText(e.target.value)}
                  placeholder="# 1. What is hoisting?\nThis is hoisting description...\n```\nconsole.log(hoisted);\n```"
                  className="w-full h-32 bg-zinc-950 border border-zinc-800 text-xs font-mono p-3 rounded-lg text-cyan-300 placeholder-zinc-700 outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              {uploadError && (
                <div className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg font-mono leading-relaxed mt-2">
                  ❌ {uploadError}
                </div>
              )}

              <div className="flex gap-2 justify-end mt-4">
                <button
                  id="cancel-upload-btn"
                  onClick={() => {
                    setIsUploadModalOpen(false);
                    setUploadError(null);
                  }}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 text-xs font-bold rounded uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  id="compile-pasted-btn"
                  onClick={() => parseAndLoadMarkdown(uploadedText)}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded uppercase tracking-wider"
                >
                  Compile & Scan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
