import React, { useState, useMemo } from "react";
import { 
  Search, Cpu, Activity, FileCode, Server, GitFork, ShieldAlert, Sparkles, 
  BookOpen, Terminal, ArrowRight, Check, X, HelpCircle, Code, Award, Lightbulb, Copy
} from "lucide-react";
import { QUESTIONS, CATEGORIES } from "./data";
import InteractiveDiagram from "./components/InteractiveDiagram";

export default function App() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [activeQuestionId, setActiveQuestionId] = useState<number>(1);
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  
  // Quiz status
  const [quizAnswerSelected, setQuizAnswerSelected] = useState<number | null>(null);
  const [quizIsCorrect, setQuizIsCorrect] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);

  // Filter questions based on category, difficulty, and search term
  const filteredQuestions = useMemo(() => {
    return QUESTIONS.filter((q) => {
      const matchesSearch = 
        q.question.toLowerCase().includes(search.toLowerCase()) ||
        q.answer.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === "all" || q.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === "all" || q.difficulty === selectedDifficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [search, selectedCategory, selectedDifficulty]);

  // Find currently active question
  const activeQuestion = useMemo(() => {
    return QUESTIONS.find((q) => q.id === activeQuestionId) || QUESTIONS[0];
  }, [activeQuestionId]);

  // Handle Mark as Mastered
  const toggleComplete = (id: number) => {
    setCompletedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Quick category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    QUESTIONS.forEach((q) => {
      counts[q.category] = (counts[q.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Copy code utility
  const handleCopyCode = (codeText?: string) => {
    if (!codeText) return;
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate dynamic quiz choices depending on the question context
  const getQuizForQuestion = (qId: number) => {
    switch (qId) {
      case 1:
        return {
          question: "Which engine powers the parsing of JavaScript in Node.js?",
          choices: ["Gecko Engine", "V8 Engine", "SpiderMonkey", "Chakra Engine"],
          correct: 1,
          explanation: "Node.js compiles JavaScript directly into native machine code using Google's open-source V8 Engine."
        };
      case 2:
        return {
          question: "Where are file-system or cryptography operations offloaded in Node?",
          choices: ["Directly on the main single thread", "The Libuv Thread Pool", "The browser DOM worker arrays", "V8 execution stacks"],
          correct: 1,
          explanation: "Blocking tasks like crypto, compression, and file-system I/O are offloaded to Libuv's thread pool."
        };
      case 3:
        return {
          question: "When are event loop callback queues checked and executed?",
          choices: ["When the main execution stack is empty", "Every 1 millisecond precisely", "Simultaneously on background processes", "Whenever thread pool restarts"],
          correct: 0,
          explanation: "The event loop continuously polls callback queues, but can only push them to the call stack once it's entirely empty."
        };
      case 4:
        return {
          question: "Which phase of the event loop executes setImmediate() callbacks?",
          choices: ["Timers Phase", "Poll Phase", "Check Phase", "Close Phase"],
          correct: 2,
          explanation: "setImmediate() executes in the Check Phase, immediately following the Poll Phase."
        };
      case 5:
        return {
          question: "What runs first: process.nextTick() or setImmediate()?",
          choices: ["setImmediate()", "process.nextTick()", "They run concurrently", "Depends on file reading timings"],
          correct: 1,
          explanation: "process.nextTick() executes immediately after the current operation finishes, bypassing event loop phases."
        };
      case 6:
        return {
          question: "Which async pattern allows write/read code that mimics synchronous code layout?",
          choices: ["Nested Callbacks", "Promise Chaining", "Async/Await", "Event Emitter listeners"],
          correct: 2,
          explanation: "Async/await acts as clean syntactic sugar over Promises, flattening nested operations into clear vertical paths."
        };
      case 7:
        return {
          question: "What is the primary visual disadvantage of callback hell?",
          choices: ["CPU cycles exhaustion", "Pyramid nesting structure causing low readability", "Database connection blocks", "Immediate memory heap leaks"],
          correct: 1,
          explanation: "Callback hell produces a deeply nested triangle/pyramid layout, making readability and exception handling extremely difficult."
        };
      case 8:
        return {
          question: "Which module format supports build-time Tree-Shaking optimization?",
          choices: ["CommonJS (require)", "ES Modules (import)", "AMD (requireJS)", "SystemJS standard"],
          correct: 1,
          explanation: "ES Modules can be statically analyzed at build-time, enabling bundlers to prune unused segments of code."
        };
      case 9:
        return {
          question: "What command lets you run a package binary once without installing it locally?",
          choices: ["npm run", "npx", "npm i --global", "npm ci"],
          correct: 1,
          explanation: "npx temporarily downloads, executes, and purges binary utility helper scopes directly."
        };
      case 10:
        return {
          question: "Under which package.json section do you list libraries needed only for local builds?",
          choices: ["dependencies", "scripts", "devDependencies", "peerDependencies"],
          correct: 2,
          explanation: "devDependencies lists dependencies required solely for local code compilation, testing, and formatting."
        };
      case 11:
        return {
          question: "What is the main role of package-lock.json?",
          choices: ["Compresses file assets sizes", "Locks exact versions of nested dependencies for deterministic environments", "Provides user credentials storage", "Spawns clustering master configurations"],
          correct: 1,
          explanation: "By locking exact versions down, package-lock.json guarantees that everyone on the team installs the identical tree structure."
        };
      case 12:
        return {
          question: "Why are streams preferred over buffers for sending giant files?",
          choices: ["Streams compress data automatically", "Streams process chunks incrementally, saving RAM heap limits", "Streams bypass routers", "Streams disable the event loop"],
          correct: 1,
          explanation: "Streams process data chunk-by-chunk without loading the entire asset block into memory, preventing memory depletion crashes."
        };
      case 13:
        return {
          question: "Which type of stream modifies or converts chunk contents as they flow?",
          choices: ["Readable", "Writable", "Duplex", "Transform"],
          correct: 3,
          explanation: "Transform streams are Duplex streams that mutate data chunks (e.g. gzip compression) as they are piped."
        };
      case 14:
        return {
          question: "Where does a Node.js Buffer allocate its memory layout?",
          choices: ["Inside the main JS V8 heap", "Outside the V8 heap in raw system memory allocation", "Inside browser localStorage keys", "In temporary cloud servers"],
          correct: 1,
          explanation: "Buffers represent raw physical memory allocations managed outside the V8 heap engine limits."
        };
      case 15:
        return {
          question: "Which built-in Node.js module does Express wrap and expand?",
          choices: ["fs (file system)", "http", "crypto", "net"],
          correct: 1,
          explanation: "Express sits as a clean abstraction directly on top of Node's core built-in http server module."
        };
      case 16:
        return {
          question: "In Express, what does middleware gain access to?",
          choices: ["Only the database clients pool", "req, res, and the next() callback function", "Only the package.json scripts", "V8 execution stack registers"],
          correct: 1,
          explanation: "Express middleware can access and modify the incoming request object (req), response (res), and invoke the next() controller hook."
        };
      case 17:
        return {
          question: "What happens if a middleware does not call next() or send a response?",
          choices: ["The database crashes instantly", "The client request hangs indefinitely", "The event loop exits with code 1", "Nothing, it progresses automatically"],
          correct: 1,
          explanation: "If next() is omitted and the response is not closed, the connection remains open, stalling the client."
        };
      case 18:
        return {
          question: "What does calling next(err) with an argument trigger?",
          choices: ["Restarts the cluster node", "Passes control directly to Express's central error handling middleware", "Wipes the local cache storage", "Invokes the next normal route handler"],
          correct: 1,
          explanation: "Any argument passed to next() instructs Express to bypass remaining normal controllers and jump directly to error-handling blocks."
        };
      case 19:
        return {
          question: "How does Express recognize an error-handling middleware?",
          choices: ["By its folder path in routes/", "By having exactly 4 declared parameters (err, req, res, next)", "By returning a Promise", "By importing the helmet package"],
          correct: 1,
          explanation: "Express inspects function.length using reflection to detect the exact 4-argument signature of error middleware."
        };
      case 20:
        return {
          question: "In the URL /users/42?tab=activity, what represents a query parameter?",
          choices: ["42", "users", "tab", "activity"],
          correct: 2,
          explanation: "Query parameters appear after the '?' mark, while route parameters are part of the path structure itself."
        };
      default:
        return {
          question: "What is a major advantage of the concepts covered in this track?",
          choices: ["It enables scalable, secure full-stack performance", "It reduces coding syntax completely", "It replaces the need for javascript", "It makes servers client-only"],
          correct: 0,
          explanation: "Understanding these foundational principles enables engineers to construct ultra-efficient, highly responsive web systems."
        };
    }
  };

  const activeQuiz = useMemo(() => {
    return getQuizForQuestion(activeQuestionId);
  }, [activeQuestionId]);

  const handleQuizChoice = (idx: number) => {
    setQuizAnswerSelected(idx);
    setQuizIsCorrect(idx === activeQuiz.correct);
  };

  const resetQuiz = () => {
    setQuizAnswerSelected(null);
    setQuizIsCorrect(null);
  };

  const activeCategoryDetail = useMemo(() => {
    return CATEGORIES.find((c) => c.id === activeQuestion.category);
  }, [activeQuestion]);

  // Master progress calculation
  const totalQuestions = QUESTIONS.length;
  const masteredCount = completedIds.length;
  const readinessPercent = Math.round((masteredCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col antialiased selection:bg-[#f4f4f5] selection:text-[#09090b] font-sans">
      
      {/* HEADER BAR */}
      <header className="border-b border-[#27272a] bg-[#09090b]/90 backdrop-blur sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 bg-[#f4f4f5] text-[#09090b] rounded">
                <Cpu size={16} />
              </span>
              <h1 className="text-lg font-serif italic tracking-tight text-[#f4f4f5] font-normal">
                Node.js & Express <span className="font-sans font-bold not-italic text-sm tracking-widest uppercase ml-1.5 text-[#71717a]">Study Guide</span>
              </h1>
            </div>
            <p className="text-xs text-[#a1a1aa] font-serif italic mt-1">
              An interactive visual encyclopedia of server architecture, state lifecycles, and core backend mechanics.
            </p>
          </div>

          {/* PROGRESS METRICS PANEL */}
          <div className="flex items-center gap-4 bg-[#18181b] border border-[#27272a] p-2.5 px-4 rounded text-xs w-full md:w-auto shadow-xs">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 rounded-full border border-[#f4f4f5] flex items-center justify-center bg-zinc-950">
                <span className="text-[11px] font-mono font-bold text-[#f4f4f5]">{readinessPercent}%</span>
              </div>
              <div>
                <span className="text-[9px] text-[#71717a] block uppercase font-mono tracking-widest leading-3 font-semibold font-sans">Course Progress</span>
                <span className="text-xs font-serif italic text-[#f4f4f5]">
                  {masteredCount} of {totalQuestions} Concepts Mastered
                </span>
              </div>
            </div>
            <div className="h-6 w-px bg-[#27272a] hidden sm:block"></div>
            <div className="text-right hidden sm:block">
              <span className="text-[9px] text-[#71717a] block uppercase font-mono tracking-widest leading-3 font-semibold font-sans">Curriculum Tracks</span>
              <span className="text-xs font-mono font-bold text-[#f4f4f5]">6 Active Modules</span>
            </div>
          </div>
        </div>
      </header>

      {/* WORKSPACE CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 lg:h-[calc(100vh-80px)] overflow-y-auto lg:overflow-hidden">
        
        {/* LEFT COLUMN: NAVIGATION & FILTER PANEL (4 COLS) */}
        <section className="lg:col-span-4 flex flex-col gap-4 max-h-[400px] lg:max-h-none lg:h-full overflow-y-auto lg:overflow-hidden">
          
          {/* SEARCH & FILTER CONTROLS */}
          <div className="bg-[#18181b] p-4 rounded border border-[#27272a] space-y-3 shadow-xs">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-[#A6A29F]" size={14} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search concepts, code elements, tags..."
                className="w-full bg-zinc-950 border border-[#27272a] rounded pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#f4f4f5] text-[#f4f4f5] transition-colors placeholder:text-zinc-600 font-sans"
              />
            </div>

            {/* DIFFICULTY TOGGLE */}
            <div className="flex gap-1 bg-zinc-950 p-1 rounded border border-[#27272a]/80">
              {["all", "Easy", "Medium", "Hard"].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`flex-1 text-[10px] py-1 px-1.5 rounded transition-all font-sans font-semibold uppercase tracking-wider ${
                    selectedDifficulty === diff 
                      ? "bg-[#f4f4f5] text-[#09090b]" 
                      : "text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#18181b]"
                  }`}
                >
                  {diff === "all" ? "All" : diff}
                </button>
              ))}
            </div>
          </div>

          {/* LEARNING TRACK MODULES */}
          <div className="flex gap-1.5 overflow-x-auto pb-1.5 shrink-0 scrollbar-thin">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-all border ${
                selectedCategory === "all"
                  ? "bg-[#f4f4f5] text-[#09090b] border-[#f4f4f5]"
                  : "bg-zinc-950 border-[#27272a] text-[#a1a1aa] hover:bg-[#18181b] hover:text-[#f4f4f5]"
              }`}
            >
              All Modules
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? "bg-[#f4f4f5] text-[#09090b] border-[#f4f4f5]"
                    : "bg-zinc-950 border-[#27272a] text-[#a1a1aa] hover:bg-[#18181b] hover:text-[#f4f4f5]"
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[9px] px-1.5 rounded-full font-mono ${
                  selectedCategory === cat.id ? "bg-zinc-950/20 text-white" : "bg-[#18181b] text-[#71717a]"
                }`}>
                  {categoryCounts[cat.id] || 0}
                </span>
              </button>
            ))}
          </div>

          {/* SCROLLABLE QUESTION LIST */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 scrollbar-thin">
            {filteredQuestions.map((q) => {
              const isActive = q.id === activeQuestionId;
              const isMastered = completedIds.includes(q.id);
              
              return (
                <div
                  key={q.id}
                  id={`q-item-${q.id}`}
                  onClick={() => {
                    setActiveQuestionId(q.id);
                    resetQuiz();
                  }}
                  className={`p-4 rounded border text-left cursor-pointer transition-all relative ${
                    isActive 
                      ? "bg-zinc-950 border-[#f4f4f5] shadow-sm pl-6" 
                      : "bg-zinc-950/60 border-[#27272a]/80 hover:border-[#27272a] hover:bg-zinc-950/90"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#f4f4f5] rounded-l"></span>
                  )}
                  
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[9px] font-mono font-semibold tracking-wider text-[#A6A29F]">
                      CONCEPT {String(q.id).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                        q.difficulty === "Easy" ? "bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]" : 
                        q.difficulty === "Medium" ? "bg-[#FFF3E0] text-[#EF6C00] border border-[#FFE0B2]" : 
                        "bg-[#FFEBEE] text-[#C62828] border border-[#FFCDD2]"
                      }`}>
                        {q.difficulty}
                      </span>
                      {isMastered && (
                        <span className="bg-[#E8F5E9] text-[#2E7D32] text-[8px] font-bold px-1.5 py-0.5 rounded border border-[#C8E6C9] tracking-wider uppercase">
                          ✓ MASTERED
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className={`text-xs font-serif leading-relaxed ${isActive ? "text-[#f4f4f5] font-bold italic" : "text-[#a1a1aa] font-normal"}`}>
                    {q.question}
                  </h3>
                </div>
              );
            })}
            
            {filteredQuestions.length === 0 && (
              <div className="text-center py-12 bg-zinc-950/40 rounded border border-[#27272a] border-dashed">
                <HelpCircle className="mx-auto text-[#A6A29F] mb-3" size={24} />
                <p className="text-xs font-serif italic text-[#a1a1aa]">No matching study concepts were found.</p>
              </div>
            )}
          </div>
        </section>

        {/* RIGHT COLUMN: CORE WORKSPACE DETAILS & INTERACTIVE SIMULATOR (8 COLS) */}
        <section className="lg:col-span-8 flex flex-col h-full overflow-y-auto pr-1 space-y-5 scrollbar-thin">
          
          {/* ACTIVE CONCEPT DETAIL PANEL */}
          <div className="bg-zinc-950 p-6 rounded border border-[#27272a] space-y-5 shadow-xs">
            
            {/* META HEADER CARD */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#27272a] pb-4">
              <div className="space-y-1.5 max-w-[70%]">
                <div className="flex items-center gap-2.5">
                  <span className="text-[9px] font-mono font-bold text-[#71717a] bg-[#18181b] border border-[#27272a] px-2 py-0.5 rounded uppercase tracking-widest">
                    MODULE: {activeCategoryDetail?.name || "Architectural Core"}
                  </span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                    activeQuestion.difficulty === "Easy" ? "bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]" :
                    activeQuestion.difficulty === "Medium" ? "bg-[#FFF3E0] text-[#EF6C00] border-[#FFE0B2]" :
                    "bg-[#FFEBEE] text-[#C62828] border-[#FFCDD2]"
                  }`}>
                    {activeQuestion.difficulty} LEVEL
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-serif text-[#f4f4f5] leading-tight font-normal italic">
                  {activeQuestion.question}
                </h2>
              </div>

              {/* ACTION TOGGLE */}
              <button
                onClick={() => toggleComplete(activeQuestion.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium uppercase tracking-wider transition-all border ${
                  completedIds.includes(activeQuestion.id)
                    ? "bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]"
                    : "bg-zinc-950 text-[#f4f4f5] border-[#f4f4f5] hover:bg-[#18181b]"
                }`}
              >
                <Check size={13} />
                {completedIds.includes(activeQuestion.id) ? "Mastered" : "Mark as Mastered"}
              </button>
            </div>

            {/* DETAILED EXPERT ANSWER */}
            <div className="space-y-2">
              <h4 className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#71717a]">
                Core Academic Answer
              </h4>
              <p className="text-sm font-serif text-[#d4d4d8] leading-relaxed bg-[#18181b] p-4 rounded border border-[#27272a]">
                {activeQuestion.answer}
              </p>
            </div>

            {/* KEY TAKEAWAYS BULLET CHIPS */}
            <div className="space-y-2">
              <h4 className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#71717a]">
                Key Scholarly Takeaways
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {activeQuestion.keyTakeaways.map((takeaway, idx) => (
                  <div key={idx} className="bg-zinc-950 p-3.5 rounded border border-[#27272a] flex gap-2.5 hover:border-[#f4f4f5]/30 transition-all duration-300 shadow-2xs">
                    <span className="text-[#f4f4f5] shrink-0 mt-0.5">
                      <Lightbulb size={13} />
                    </span>
                    <p className="text-[11px] text-[#a1a1aa] leading-relaxed">
                      {takeaway}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MOUNT CUSTOM INTERACTIVE CONCEPT DIAGRAM / STATE SIMULATOR */}
          <div className="bg-zinc-950 p-6 rounded border border-[#27272a] shadow-xs">
            <InteractiveDiagram 
              questionId={activeQuestion.id} 
              visualLabel={activeQuestion.visualLabel} 
            />
          </div>

          {/* CODE PLAYGROUND BLOCK */}
          {activeQuestion.codeExample && (
            <div className="bg-[#f4f4f5] rounded overflow-hidden border border-[#27272a]">
              <div className="bg-[#f4f4f5] px-4 py-2.5 border-b border-[#2D2D2D] flex justify-between items-center">
                <div className="flex items-center gap-1.5 text-[10px] text-[#A6A29F] font-mono uppercase tracking-widest">
                  <Terminal size={11} className="text-[#09090b]" />
                  <span>snippet.js</span>
                </div>
                <button
                  onClick={() => handleCopyCode(activeQuestion.codeExample)}
                  className="text-[10px] text-[#A6A29F] hover:text-[#09090b] transition-colors flex items-center gap-1 uppercase tracking-wider font-mono"
                >
                  <Copy size={11} />
                  {copied ? "Copied!" : "Copy code"}
                </button>
              </div>
              <div className="p-5 bg-[#f4f4f5] text-xs font-mono text-[#18181b] overflow-x-auto leading-6 max-h-[300px] overflow-y-auto">
                <pre>{activeQuestion.codeExample}</pre>
              </div>
            </div>
          )}

          {/* DYNAMIC FLASHCARD MULTIPLE-CHOICE QUIZ */}
          <div className="bg-[#18181b] p-6 rounded border border-[#27272a] space-y-4 shadow-xs">
            <div className="flex items-center gap-2 border-b border-[#27272a] pb-2">
              <HelpCircle className="text-[#f4f4f5]" size={15} />
              <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#71717a]">
                Track Knowledge Verification Quiz
              </h3>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-serif italic text-[#f4f4f5] leading-relaxed">
                {activeQuiz.question}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {activeQuiz.choices.map((choice, idx) => {
                  const isSelected = quizAnswerSelected === idx;
                  const isCorrectChoice = idx === activeQuiz.correct;
                  
                  let btnStyle = "bg-zinc-950 hover:bg-[#09090b] border-[#27272a] text-[#f4f4f5] hover:border-[#f4f4f5]";
                  if (quizAnswerSelected !== null) {
                    if (isCorrectChoice) {
                      btnStyle = "bg-[#E8F5E9] border-[#2E7D32] text-[#2E7D32] font-semibold";
                    } else if (isSelected) {
                      btnStyle = "bg-[#FFEBEE] border-[#C62828] text-[#C62828] font-semibold";
                    } else {
                      btnStyle = "bg-[#18181b]/60 border-[#27272a]/50 text-[#71717a] opacity-50 cursor-not-allowed";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={quizAnswerSelected !== null}
                      onClick={() => handleQuizChoice(idx)}
                      className={`p-3 rounded border text-left text-xs font-medium transition-all ${btnStyle}`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="font-mono text-[10px] text-[#71717a] mt-0.5">
                          [{String.fromCharCode(65 + idx)}]
                        </span>
                        <span>{choice}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {quizIsCorrect !== null && (
                <div className={`p-4 rounded border text-xs leading-relaxed ${
                  quizIsCorrect 
                    ? "bg-[#E8F5E9] border-[#C8E6C9] text-[#2E7D32] font-serif" 
                    : "bg-[#FFEBEE] border-[#FFCDD2] text-[#C62828] font-serif"
                } animate-fade-in`}>
                  <div className="font-semibold flex items-center gap-1.5 mb-1.5 font-sans uppercase tracking-wider text-[10px]">
                    {quizIsCorrect ? (
                      <>
                        <Check size={14} className="text-[#2E7D32]" />
                        <span>Correct Answer Verified</span>
                      </>
                    ) : (
                      <>
                        <X size={14} className="text-[#C62828]" />
                        <span>Incorrect Choice</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed">
                    {activeQuiz.explanation}
                  </p>
                </div>
              )}
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}
