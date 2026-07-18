import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, ArrowRight, Layers, HelpCircle, Eye, Cpu, Database, Network } from 'lucide-react';

interface InteractiveDiagramProps {
  category: string;
  questionId: number;
}

export function InteractiveDiagram({ category, questionId }: InteractiveDiagramProps) {
  // Common visual states
  const [activeStep, setActiveStep] = useState(0);

  // 1. Closures & Scope Chain State
  const [closureCounter, setClosureCounter] = useState(0);
  const [heapAddresses, setHeapAddresses] = useState<string[]>([]);
  const [gcState, setGcState] = useState<'normal' | 'retained'>('retained');

  // 2. Event Loop Simulator State
  const [callStack, setCallStack] = useState<string[]>([]);
  const [webApis, setWebApis] = useState<{ id: string; name: string; timer?: number }[]>([]);
  const [microtaskQueue, setMicrotaskQueue] = useState<string[]>([]);
  const [macrotaskQueue, setMacrotaskQueue] = useState<string[]>([]);
  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([]);
  const [isLooping, setIsLooping] = useState(false);
  const loopTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 3. 'this' Binding State
  const [bindingType, setBindingType] = useState<'default' | 'implicit' | 'explicit' | 'new'>('implicit');

  // 4. Prototypes State
  const [activeProtoNode, setActiveProtoNode] = useState<'dog' | 'dogProto' | 'objProto' | 'null'>('dog');

  // 5. Types & Coercion Solver State
  const [coercionExpression, setCoercionExpression] = useState<'bracketPlusObject' | 'bracketEqualsNotBracket' | 'threePlusString' | 'boolPlusBool'>('bracketEqualsNotBracket');

  // 6. Array Methods Pipe State
  const [arrayInput, setArrayInput] = useState<number[]>([1, 2, 3, 4, 5]);
  const [arrayOutputs, setArrayOutputs] = useState<{ value: number; status: 'idle' | 'processing' | 'done' | 'filtered' }[]>([]);
  const [arrayPipelineStep, setArrayPipelineStep] = useState<number>(-1);

  // 7. DOM rendering & Event Bubbling State
  const [activeBubblingPhase, setActiveBubblingPhase] = useState<'idle' | 'capturing' | 'target' | 'bubbling'>('idle');
  const [bubblingActiveElement, setBubblingActiveElement] = useState<string | null>(null);
  const [bubblingLogs, setBubblingLogs] = useState<string[]>([]);

  // Reset states on category change
  useEffect(() => {
    setActiveStep(0);
    // Closures
    setClosureCounter(0);
    setHeapAddresses(['0x7F22A04']);
    setGcState('retained');

    // Event Loop
    stopEventLoopSimulation();
    resetEventLoop();

    // Arrays
    resetArrayPipeline();

    // Bubbling
    setActiveBubblingPhase('idle');
    setBubblingActiveElement(null);
    setBubblingLogs([]);
  }, [category, questionId]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (loopTimerRef.current) clearInterval(loopTimerRef.current);
    };
  }, []);

  // --- EVENT LOOP SIMULATOR FUNCTIONS ---
  const resetEventLoop = () => {
    setCallStack([]);
    setWebApis([]);
    setMicrotaskQueue([]);
    setMacrotaskQueue([]);
    setSimulatedLogs([]);
    setIsLooping(false);
    if (loopTimerRef.current) clearInterval(loopTimerRef.current);
  };

  const addEventLoopTask = (type: 'sync' | 'promise' | 'timeout') => {
    if (type === 'sync') {
      setCallStack(prev => [...prev, 'console.log("Sync Task")']);
      setTimeout(() => {
        setSimulatedLogs(prev => [...prev, 'Sync Task']);
        setCallStack(prev => prev.slice(0, -1));
      }, 600);
    } else if (type === 'promise') {
      setCallStack(prev => [...prev, 'Promise.resolve()']);
      setTimeout(() => {
        setMicrotaskQueue(prev => [...prev, 'Promise.then() callback']);
        setCallStack(prev => prev.slice(0, -1));
      }, 500);
    } else if (type === 'timeout') {
      setCallStack(prev => [...prev, 'setTimeout(callback, 1000)']);
      const timerId = Math.random().toString(36).substr(2, 5);
      setTimeout(() => {
        setCallStack(prev => prev.slice(0, -1));
        setWebApis(prev => [...prev, { id: timerId, name: 'Timer (1000ms)' }]);
        
        // Simulating the timer expiration after 1s
        setTimeout(() => {
          setWebApis(prev => prev.filter(w => w.id !== timerId));
          setMacrotaskQueue(prev => [...prev, 'setTimeout callback']);
        }, 1000);
      }, 500);
    }
  };

  const startEventLoopSimulation = () => {
    if (isLooping) return;
    setIsLooping(true);

    loopTimerRef.current = setInterval(() => {
      // Event loop ticks
      setCallStack(prevStack => {
        if (prevStack.length > 0) {
          // If stack has stuff, let it run first (simulated CPU busy)
          return prevStack;
        }

        // 1. Stack is empty. Event loop checks Microtask Queue first
        let microProcessed = false;
        setMicrotaskQueue(prevMicro => {
          if (prevMicro.length > 0) {
            const nextMicro = prevMicro[0];
            setCallStack(['EXEC: ' + nextMicro]);
            setSimulatedLogs(logs => [...logs, 'Microtask executed: ' + nextMicro]);
            microProcessed = true;
            // Pop item from microtask queue
            setTimeout(() => {
              setCallStack([]);
            }, 600);
            return prevMicro.slice(1);
          }
          return prevMicro;
        });

        if (microProcessed) return prevStack;

        // 2. Microtask queue is empty. Event loop checks Macrotask Queue (Callback Queue)
        setMacrotaskQueue(prevMacro => {
          if (prevMacro.length > 0) {
            const nextMacro = prevMacro[0];
            setCallStack(['EXEC: ' + nextMacro]);
            setSimulatedLogs(logs => [...logs, 'Macrotask executed: ' + nextMacro]);
            // Pop item from callback queue
            setTimeout(() => {
              setCallStack([]);
            }, 600);
            return prevMacro.slice(1);
          }
          return prevMacro;
        });

        return prevStack;
      });
    }, 1200);
  };

  const stopEventLoopSimulation = () => {
    setIsLooping(false);
    if (loopTimerRef.current) {
      clearInterval(loopTimerRef.current);
      loopTimerRef.current = null;
    }
  };

  // Preset Scenario for Event Loop
  const runPresetScenario = () => {
    resetEventLoop();
    // Script start
    setCallStack(['Script Evaluation']);
    setSimulatedLogs(prev => [...prev, 'Script Start']);

    setTimeout(() => {
      // setTimeout scheduled
      setCallStack(prev => [...prev, 'setTimeout(cb, 0)']);
      setWebApis([{ id: 'preset_timer', name: 'Timer (0ms)' }]);
      
      setTimeout(() => {
        setWebApis([]);
        setMacrotaskQueue(prev => [...prev, 'setTimeout cb (0ms)']);
      }, 100);
    }, 400);

    setTimeout(() => {
      // Promise scheduled
      setCallStack(prev => ['Script Evaluation', 'Promise.resolve()']);
      setMicrotaskQueue(prev => [...prev, 'Promise callback']);
    }, 800);

    setTimeout(() => {
      // Script end
      setCallStack([]);
      setSimulatedLogs(prev => [...prev, 'Script End']);
      startEventLoopSimulation();
    }, 1200);
  };


  // --- ARRAY PIPELINE VISUALIZER FUNCTIONS ---
  const resetArrayPipeline = () => {
    setArrayOutputs(arrayInput.map(v => ({ value: v, status: 'idle' })));
    setArrayPipelineStep(-1);
  };

  const animateArrayPipeline = async () => {
    resetArrayPipeline();
    setArrayPipelineStep(0); // Highlighting Map Stage
    
    // Step 1: Map items (x * 2)
    for (let i = 0; i < arrayInput.length; i++) {
      setArrayOutputs(prev => {
        const copy = [...prev];
        copy[i] = { value: copy[i].value, status: 'processing' };
        return copy;
      });
      await new Promise(r => setTimeout(r, 450));
      setArrayOutputs(prev => {
        const copy = [...prev];
        copy[i] = { value: copy[i].value * 2, status: 'done' };
        return copy;
      });
    }

    // Step 2: Filter items (> 4)
    setArrayPipelineStep(1); // Filter Stage
    for (let i = 0; i < arrayInput.length; i++) {
      setArrayOutputs(prev => {
        const copy = [...prev];
        copy[i] = { value: copy[i].value, status: 'processing' };
        return copy;
      });
      await new Promise(r => setTimeout(r, 450));
      setArrayOutputs(prev => {
        const copy = [...prev];
        const val = copy[i].value;
        copy[i] = { value: val, status: val > 4 ? 'done' : 'filtered' };
        return copy;
      });
    }

    // Step 3: Reduce (Sum them)
    setArrayPipelineStep(2); // Reduce Stage
    let acc = 0;
    for (let i = 0; i < arrayInput.length; i++) {
      await new Promise(r => setTimeout(r, 300));
      setArrayOutputs(prev => {
        const copy = [...prev];
        if (copy[i].status === 'done') {
          copy[i] = { value: copy[i].value, status: 'processing' };
          acc += copy[i].value;
        }
        return copy;
      });
    }
    setArrayPipelineStep(3); // Result Stage
  };


  // --- BUBBLING VISUALIZER FUNCTIONS ---
  const triggerBubblingSimulation = async () => {
    setActiveBubblingPhase('idle');
    setBubblingActiveElement(null);
    setBubblingLogs([]);

    const elements = ['window', 'document', 'body', 'div', 'button'];
    
    // CAPTURING PHASE: Flows down (Window -> Document -> Body -> Div -> Button)
    setActiveBubblingPhase('capturing');
    for (const el of elements) {
      setBubblingActiveElement(el);
      setBubblingLogs(prev => [...prev, `[CAPTURING] Event trickled down to <${el.toUpperCase()}>`]);
      await new Promise(r => setTimeout(r, 500));
    }

    // TARGET PHASE
    setActiveBubblingPhase('target');
    setBubblingActiveElement('button');
    setBubblingLogs(prev => [...prev, `[TARGET] Event reached target: <BUTTON>`]);
    await new Promise(r => setTimeout(r, 700));

    // BUBBLING PHASE: Flows up (Button -> Div -> Body -> Document -> Window)
    setActiveBubblingPhase('bubbling');
    const reversedElements = [...elements].reverse();
    for (const el of reversedElements) {
      setBubblingActiveElement(el);
      setBubblingLogs(prev => [...prev, `[BUBBLING] Event bubbled up to <${el.toUpperCase()}>`]);
      await new Promise(r => setTimeout(r, 500));
    }

    setBubblingActiveElement(null);
    setActiveBubblingPhase('idle');
    setBubblingLogs(prev => [...prev, `[COMPLETE] Event propagation finished.`]);
  };


  return (
    <div className="bg-[#0f0f12] rounded-xl border border-zinc-800 p-5 flex flex-col shadow-2xl relative overflow-hidden min-h-[420px] h-full justify-between">
      {/* Decorative background grid */}
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
      </div>

      <div className="flex justify-between items-start border-b border-zinc-800/80 pb-3 mb-4">
        <div>
          <span className="inline-block px-1.5 py-0.5 bg-cyan-500/10 text-cyan-400 text-[9px] font-mono font-bold uppercase tracking-wider rounded border border-cyan-500/20 mb-1">
            Dynamic Simulator
          </span>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            {category === 'scope_closures' && 'Interactive Memory & Scope Visualizer'}
            {category === 'async_event_loop' && 'Event Loop Thread Execution Model'}
            {category === 'this_functions' && 'Call-Site & Context binding Map'}
            {category === 'objects_prototypes' && 'Prototype Chain Inheritance Hierarchy'}
            {category === 'types_coercion' && 'JavaScript Engine Coercion Deconstructor'}
            {category === 'array_methods' && 'Array Pipeline Transformation Flow'}
            {category === 'dom_browser_adv' && 'DOM Capture & Bubbling Propagation Wave'}
          </h3>
        </div>
      </div>

      {/* RENDER DYNAMIC VISUALIZATION PANE ACCORDING TO CATEGORY */}
      <div className="flex-1 flex flex-col justify-center my-4">

        {/* 1. SCOPE AND CLOSURES VISUALIZATION */}
        {category === 'scope_closures' && (
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <div className="flex flex-wrap items-center justify-center gap-6 w-full max-w-2xl">
              {/* Scope Hierarchy Stack */}
              <div className="flex-1 min-w-[240px] flex flex-col gap-3">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">Lexical Execution Context</div>
                
                {/* Global Scope */}
                <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-lg flex flex-col relative">
                  <div className="absolute top-1.5 right-2 font-mono text-[9px] text-zinc-600">Global</div>
                  <code className="text-zinc-400 text-[10px] font-mono">const tracker = createCounter();</code>
                  <code className="text-zinc-500 text-[10px] font-mono italic mt-1">// holds reference to returned function</code>
                </div>

                {/* Outer Scope */}
                <div className="p-3 bg-cyan-950/10 border border-cyan-500/20 rounded-lg flex flex-col relative">
                  <div className="absolute top-1.5 right-2 font-mono text-[9px] text-cyan-400 font-bold">createCounter()</div>
                  <div className="flex justify-between items-center">
                    <code className="text-cyan-200 text-[10px] font-mono">let count = {closureCounter};</code>
                    <span className="text-[9px] text-zinc-500 bg-zinc-950 px-1 py-0.5 rounded font-mono">Lexical Record</span>
                  </div>
                </div>

                {/* Inner Scope / Closure Closure Block */}
                <div className="p-3 bg-cyan-600/10 border-2 border-cyan-500 rounded-xl flex flex-col relative shadow-lg shadow-cyan-500/5">
                  <div className="absolute top-1.5 right-2 font-mono text-[9px] text-cyan-400 font-bold uppercase tracking-wider animate-pulse">Closure</div>
                  <code className="text-white text-[11px] font-bold font-mono">return function() {'{ count++ }'}</code>
                  <code className="text-cyan-300 text-[10px] font-mono mt-1">Ref {'->'} count ({closureCounter})</code>
                </div>
              </div>

              {/* Memory Heap Addresses & Metadata */}
              <div className="w-52 flex flex-col gap-2">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">Heap Allocation</div>
                
                <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg">
                  <span className="text-[9px] text-zinc-500 font-mono block">Memory address</span>
                  <span className="text-xs text-green-400 font-mono font-bold">0x7F22A04</span>
                </div>

                <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg">
                  <span className="text-[9px] text-zinc-500 font-mono block">GC Status</span>
                  <span className={`text-[10px] font-mono uppercase font-bold px-1.5 py-0.5 rounded ${gcState === 'retained' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-red-500/10 text-red-400'}`}>
                    {gcState === 'retained' ? 'Retained (Active)' : 'Garbage Collected'}
                  </span>
                </div>

                <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg">
                  <span className="text-[9px] text-zinc-500 font-mono block">Scope Retainers</span>
                  <span className="text-xs text-zinc-300 font-mono">1 active closure referencer</span>
                </div>
              </div>
            </div>

            <div className="w-full flex gap-3 border-t border-zinc-800 pt-3 mt-2 max-w-2xl">
              <button
                id="closure-simulate-btn"
                onClick={() => {
                  setClosureCounter(c => c + 1);
                  setHeapAddresses(prev => [...prev, '0x' + Math.floor(Math.random() * 16777215).toString(16).toUpperCase()]);
                }}
                className="flex-1 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] font-bold rounded uppercase tracking-wider transition-colors"
              >
                Invoke Returned Function (count++)
              </button>
              <button
                id="closure-gc-btn"
                onClick={() => {
                  if (gcState === 'retained') {
                    setGcState('normal');
                    setClosureCounter(0);
                  } else {
                    setGcState('retained');
                  }
                }}
                className="py-2 px-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[10px] font-bold rounded uppercase tracking-wider border border-zinc-800 transition-colors"
              >
                {gcState === 'retained' ? 'Simulate Nullify (Unbind / GC)' : 'Restore Scope Reference'}
              </button>
            </div>
          </div>
        )}


        {/* 2. EVENT LOOP SIMULATOR */}
        {category === 'async_event_loop' && (
          <div className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-12 gap-3">
              {/* Call Stack */}
              <div className="col-span-3 bg-zinc-950 border border-zinc-800/80 rounded-lg p-2.5 h-[160px] flex flex-col justify-between">
                <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-1 mb-1.5 flex items-center justify-between">
                  <span>Call Stack</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span>
                </div>
                <div className="flex-1 flex flex-col-reverse gap-1.5 overflow-y-auto font-mono text-[9.5px]">
                  {callStack.length === 0 ? (
                    <div className="text-zinc-600 italic text-center text-[9px] my-auto">Stack Empty</div>
                  ) : (
                    callStack.map((item, idx) => (
                      <div key={idx} className="bg-red-500/10 border border-red-500/30 text-red-300 p-1 rounded font-bold text-center border-l-2 border-l-red-500 truncate">
                        {item}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Web APIs */}
              <div className="col-span-3 bg-zinc-950 border border-zinc-800/80 rounded-lg p-2.5 h-[160px] flex flex-col justify-between">
                <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-1 mb-1.5 flex items-center justify-between">
                  <span>Web APIs</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
                </div>
                <div className="flex-1 flex flex-col gap-1.5 overflow-y-auto font-mono text-[9px]">
                  {webApis.length === 0 ? (
                    <div className="text-zinc-600 italic text-center my-auto text-[9px]">Idle</div>
                  ) : (
                    webApis.map((item, idx) => (
                      <div key={idx} className="bg-yellow-500/5 border border-yellow-500/20 text-yellow-300 p-1 rounded text-center truncate animate-pulse">
                        {item.name}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Queues (Split) */}
              <div className="col-span-3 flex flex-col gap-2 h-[160px]">
                {/* Microtask Queue (Promises) */}
                <div className="flex-1 bg-zinc-950 border border-zinc-800/80 rounded-lg p-2 flex flex-col justify-between">
                  <div className="text-[8px] font-bold text-cyan-400 uppercase tracking-widest border-b border-zinc-900 pb-0.5 flex items-center justify-between">
                    <span>Microtasks (Promises)</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-500"></span>
                  </div>
                  <div className="flex-1 flex gap-1 items-center overflow-x-auto font-mono text-[8.5px] mt-1">
                    {microtaskQueue.length === 0 ? (
                      <div className="text-zinc-700 italic text-[8px] mx-auto">Empty</div>
                    ) : (
                      microtaskQueue.map((item, idx) => (
                        <div key={idx} className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-1 py-0.5 rounded text-center shrink-0">
                          {idx === 0 ? '★ then()' : 'then()'}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Macrotask Queue (Callback Queue) */}
                <div className="flex-1 bg-zinc-950 border border-zinc-800/80 rounded-lg p-2 flex flex-col justify-between">
                  <div className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest border-b border-zinc-900 pb-0.5 flex items-center justify-between">
                    <span>Callback Queue</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <div className="flex-1 flex gap-1 items-center overflow-x-auto font-mono text-[8.5px] mt-1">
                    {macrotaskQueue.length === 0 ? (
                      <div className="text-zinc-700 italic text-[8px] mx-auto">Empty</div>
                    ) : (
                      macrotaskQueue.map((item, idx) => (
                        <div key={idx} className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-1 py-0.5 rounded text-center shrink-0">
                          {idx === 0 ? '★ setTimeout' : 'setTimeout'}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Console logs */}
              <div className="col-span-3 bg-zinc-950 border border-zinc-800/80 rounded-lg p-2.5 h-[160px] flex flex-col justify-between">
                <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-1 mb-1.5">
                  Logs
                </div>
                <div className="flex-1 overflow-y-auto font-mono text-[9px] text-green-400 text-left space-y-1">
                  {simulatedLogs.length === 0 ? (
                    <div className="text-zinc-700 italic">// execution logs...</div>
                  ) : (
                    simulatedLogs.map((log, i) => (
                      <div key={i} className="border-l border-zinc-800 pl-1">{log}</div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Simulated Event Loop Wheel and control panel */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-zinc-900/30 border border-zinc-800/60 rounded-xl p-3">
              {/* Animated Spinner Wheel */}
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <div className={`absolute w-full h-full border-2 border-cyan-500/10 border-t-indigo-500 border-r-indigo-500 rounded-full ${isLooping ? 'animate-spin' : ''}`}></div>
                  <div className="text-[8px] font-mono font-bold text-zinc-400">TICK</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-zinc-200">Event Loop Engine</div>
                  <div className="text-[9px] text-zinc-500 font-mono">
                    Status: {isLooping ? <span className="text-cyan-400 font-bold animate-pulse">Running loop (FIFO)</span> : 'Idling'}
                  </div>
                </div>
              </div>

              {/* Event loops trigger controls */}
              <div className="flex flex-wrap gap-2">
                <button
                  id="el-add-sync-btn"
                  onClick={() => addEventLoopTask('sync')}
                  className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-[9px] font-mono text-zinc-300 rounded border border-zinc-700/80"
                >
                  + Push console.log
                </button>
                <button
                  id="el-add-promise-btn"
                  onClick={() => addEventLoopTask('promise')}
                  className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-[9px] font-mono text-cyan-400 rounded border border-cyan-900/30"
                >
                  + Push Promise.then()
                </button>
                <button
                  id="el-add-timeout-btn"
                  onClick={() => addEventLoopTask('timeout')}
                  className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-[9px] font-mono text-yellow-500 rounded border border-yellow-900/30"
                >
                  + Push setTimeout()
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  id="el-preset-btn"
                  onClick={runPresetScenario}
                  className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-[9.5px] font-bold text-white uppercase tracking-wider rounded"
                  title="Runs macro vs microtask sequence"
                >
                  Run Standard Spec Scenario
                </button>
                <button
                  id="el-reset-btn"
                  onClick={resetEventLoop}
                  className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 rounded border border-zinc-700/80"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}


        {/* 3. THIS BINDING MAP */}
        {category === 'this_functions' && (
          <div className="flex flex-col gap-4 w-full items-center">
            {/* Control tab for Binding rules */}
            <div className="flex bg-zinc-950 p-1 border border-zinc-800/80 rounded-lg w-full max-w-xl">
              {(['default', 'implicit', 'explicit', 'new'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setBindingType(type)}
                  className={`flex-1 py-1.5 text-[9.5px] font-mono font-bold uppercase rounded-md tracking-wider transition-all ${
                    bindingType === type
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {type} Binding
                </button>
              ))}
            </div>

            {/* Dynamic Map Visualization */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-xl bg-zinc-950 p-4 border border-zinc-900 rounded-xl">
              
              {/* Code Snippet Trigger */}
              <div className="flex-1 bg-zinc-950 border border-zinc-800/50 rounded p-3 font-mono text-[10px] w-full text-left">
                {bindingType === 'default' && (
                  <div>
                    <code className="text-zinc-600">function foo() {'{'}</code><br />
                    <code className="text-cyan-400 font-bold">  console.log(this);</code><br />
                    <code className="text-zinc-600">{'}'}</code><br />
                    <code className="text-white font-bold">foo(); <span className="text-zinc-500">// standalone invocation</span></code>
                  </div>
                )}
                {bindingType === 'implicit' && (
                  <div>
                    <code className="text-zinc-600">const obj = {'{'}</code><br />
                    <code className="text-zinc-500">  name: 'UserObj',</code><br />
                    <code className="text-zinc-600">  foo() {'{'}</code><br />
                    <code className="text-cyan-400 font-bold">    console.log(this.name);</code><br />
                    <code className="text-zinc-600">  {'}'}</code><br />
                    <code className="text-zinc-600">{'};'}</code><br />
                    <code className="text-white font-bold">obj.foo(); <span className="text-zinc-500">// called with contextual obj prefix</span></code>
                  </div>
                )}
                {bindingType === 'explicit' && (
                  <div>
                    <code className="text-zinc-600">function foo() {'{'}</code><br />
                    <code className="text-cyan-400 font-bold">  console.log(this.name);</code><br />
                    <code className="text-zinc-600">{'}'}</code><br />
                    <code className="text-zinc-500">const targetObj = {'{'} name: 'Target' {'}'};</code><br />
                    <code className="text-white font-bold">foo.call(targetObj); <span className="text-zinc-500">// forcing specific context</span></code>
                  </div>
                )}
                {bindingType === 'new' && (
                  <div>
                    <code className="text-zinc-600">function Foo(name) {'{'}</code><br />
                    <code className="text-cyan-400 font-bold">  this.name = name;</code><br />
                    <code className="text-zinc-600">{'}'}</code><br />
                    <code className="text-white font-bold">const instance = new Foo('Agent');</code><br />
                    <code className="text-zinc-500">// creates a blank object, binds 'this' to it</code>
                  </div>
                )}
              </div>

              {/* Dynamic Arrow Connector */}
              <div className="flex items-center justify-center font-bold text-cyan-400 shrink-0 select-none">
                <ArrowRight className="w-5 h-5 hidden md:block rotate-0" />
                <span className="text-[10px] font-mono uppercase tracking-widest md:hidden">Context Binds To</span>
              </div>

              {/* Resolved Destination object */}
              <div className="w-44 flex flex-col gap-2">
                <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest text-center">Resolved Binding Target</div>
                
                {bindingType === 'default' && (
                  <div className="p-3 bg-red-500/10 border-2 border-red-500/30 rounded-xl text-center">
                    <div className="text-[9px] uppercase font-bold text-red-400">Global Object</div>
                    <code className="text-xs text-white font-mono mt-1 block">window / global</code>
                    <span className="text-[8px] text-zinc-500 block mt-1">(Or undefined in strict mode)</span>
                  </div>
                )}
                {bindingType === 'implicit' && (
                  <div className="p-3 bg-cyan-600/20 border-2 border-cyan-500 rounded-xl text-center">
                    <div className="text-[9px] uppercase font-bold text-cyan-400">The Context Object</div>
                    <code className="text-xs text-white font-mono mt-1 block">obj</code>
                    <span className="text-[8px] text-zinc-400 block mt-1">this.name = "UserObj"</span>
                  </div>
                )}
                {bindingType === 'explicit' && (
                  <div className="p-3 bg-cyan-600/20 border-2 border-cyan-500 rounded-xl text-center">
                    <div className="text-[9px] uppercase font-bold text-cyan-400">Explicit Argument</div>
                    <code className="text-xs text-white font-mono mt-1 block">targetObj</code>
                    <span className="text-[8px] text-zinc-400 block mt-1">this.name = "Target"</span>
                  </div>
                )}
                {bindingType === 'new' && (
                  <div className="p-3 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl text-center">
                    <div className="text-[9px] uppercase font-bold text-emerald-400">Newly Created Object</div>
                    <code className="text-xs text-white font-mono mt-1 block">Instance {"{ name: 'Agent' }"}</code>
                    <span className="text-[8px] text-zinc-400 block mt-1">Returns fresh memory scope</span>
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-[10px] text-zinc-500 italic max-w-xl text-center">
              *Pro Tip: Arrow functions reject these 4 rules. They bind `this` lexically to their surrounding parent scope at declaration time!
            </p>
          </div>
        )}


        {/* 4. PROTOTYPE CHAIN EXPLORER */}
        {category === 'objects_prototypes' && (
          <div className="flex flex-col gap-4 w-full items-center">
            <div className="text-[10px] text-zinc-400 max-w-xl text-center">
              Click elements in the Prototype Chain to see how properties are looked up in Javascript!
            </div>

            <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 w-full max-w-xl">
              {/* Chain Tree Navigation */}
              <div className="flex-1 flex flex-col gap-2.5">
                {/* Instance Node */}
                <button
                  id="proto-node-instance"
                  onClick={() => setActiveProtoNode('dog')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    activeProtoNode === 'dog'
                      ? 'bg-cyan-600/20 border-cyan-500 shadow-lg shadow-cyan-500/10'
                      : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex justify-between">
                    <span className="text-xs font-bold text-white">1. dog (Instance Object)</span>
                    <span className="font-mono text-[9px] text-zinc-500">const dog = new Dog();</span>
                  </div>
                  <code className="text-[10px] font-mono text-zinc-400 block mt-1">Local Properties: {"{ name: 'Rufus' }"}</code>
                </button>

                {/* Constructor Prototype Node */}
                <button
                  id="proto-node-constructor"
                  onClick={() => setActiveProtoNode('dogProto')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    activeProtoNode === 'dogProto'
                      ? 'bg-cyan-600/20 border-cyan-500 shadow-lg shadow-cyan-500/10'
                      : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex justify-between">
                    <span className="text-xs font-bold text-cyan-400">2. dog.__proto__ (Dog.prototype)</span>
                    <span className="font-mono text-[9px] text-zinc-500">Constructor Spec</span>
                  </div>
                  <code className="text-[10px] font-mono text-zinc-400 block mt-1">Shared Methods: {"{ bark() { return 'Woof!' } }"}</code>
                </button>

                {/* Base Object Prototype Node */}
                <button
                  id="proto-node-object"
                  onClick={() => setActiveProtoNode('objProto')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    activeProtoNode === 'objProto'
                      ? 'bg-cyan-600/20 border-cyan-500 shadow-lg shadow-cyan-500/10'
                      : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex justify-between">
                    <span className="text-xs font-bold text-cyan-300">3. dog.__proto__.__proto__ (Object.prototype)</span>
                    <span className="font-mono text-[9px] text-zinc-500">Base Object Class</span>
                  </div>
                  <code className="text-[10px] font-mono text-zinc-400 block mt-1">Methods: {"{ toString(), hasOwnProperty() }"}</code>
                </button>

                {/* Terminal Null Node */}
                <button
                  id="proto-node-null"
                  onClick={() => setActiveProtoNode('null')}
                  className={`p-2.5 rounded-lg border text-left transition-all text-center ${
                    activeProtoNode === 'null'
                      ? 'bg-red-500/10 border-red-500/40 text-red-400'
                      : 'bg-zinc-950 border-zinc-900 hover:bg-zinc-900 text-zinc-500'
                  }`}
                >
                  <span className="text-xs font-mono font-bold">4. null (End of chain)</span>
                </button>
              </div>

              {/* Information Pane on Active Node */}
              <div className="w-56 bg-zinc-950 border border-zinc-800/80 rounded-xl p-3 flex flex-col justify-between text-left">
                <div>
                  <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-1 mb-2">
                    Traversing Engine
                  </div>
                  {activeProtoNode === 'dog' && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-white">Calling dog.name:</p>
                      <p className="text-[10.5px] text-zinc-400 leading-relaxed">
                        The compiler searches local properties of `dog` first. It finds `name` directly on the instance heap block. It returns "Rufus" immediately!
                      </p>
                    </div>
                  )}
                  {activeProtoNode === 'dogProto' && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-cyan-400">Calling dog.bark():</p>
                      <p className="text-[10.5px] text-zinc-400 leading-relaxed">
                        `dog` does not have a local `bark` property. The JS engine follows the internal `[[Prototype]]` link (`__proto__`) to `Dog.prototype`, finds it, and runs it!
                      </p>
                    </div>
                  )}
                  {activeProtoNode === 'objProto' && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-cyan-300">Calling dog.toString():</p>
                      <p className="text-[10.5px] text-zinc-400 leading-relaxed">
                        Searches `dog`, then `Dog.prototype`. Still not found! Engine follows the prototype link again to `Object.prototype`, finding the native `toString` implementation.
                      </p>
                    </div>
                  )}
                  {activeProtoNode === 'null' && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-red-400">Calling dog.xyz:</p>
                      <p className="text-[10.5px] text-zinc-400 leading-relaxed">
                        Searches the entire chain all the way to `null`. Since `null` represents the terminal end, lookups fail here, throwing a <code className="text-red-400 bg-red-950/20 px-1 font-mono">TypeError / undefined</code> response.
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="text-[9px] text-zinc-600 font-mono border-t border-zinc-900 pt-2 mt-2">
                  Link Type: <span className="text-cyan-400 font-bold">[[Prototype]]</span>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* 5. TYPES AND COERCION DECONSTRUCTOR */}
        {category === 'types_coercion' && (
          <div className="flex flex-col gap-4 w-full items-center">
            {/* Horizontal choice of coercion expression */}
            <div className="flex bg-zinc-950 p-1 border border-zinc-800 rounded-lg w-full max-w-xl">
              {(['bracketPlusObject', 'bracketEqualsNotBracket', 'threePlusString', 'boolPlusBool'] as const).map(expr => (
                <button
                  key={expr}
                  onClick={() => setCoercionExpression(expr)}
                  className={`flex-1 py-1 text-[9px] font-mono font-bold uppercase rounded transition-all ${
                    coercionExpression === expr
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {expr === 'bracketPlusObject' && '[] + {}'}
                  {expr === 'bracketEqualsNotBracket' && '[] == ![]'}
                  {expr === 'threePlusString' && '3 + "3"'}
                  {expr === 'boolPlusBool' && 'true + false'}
                </button>
              ))}
            </div>

            {/* Spec deconstruction pipeline */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-4 w-full max-w-xl text-left space-y-3 font-mono text-[11px]">
              {coercionExpression === 'bracketPlusObject' && (
                <>
                  <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5 mb-2">
                    <span className="text-cyan-400 font-bold text-xs font-mono">Expression: [] + {"{}"}</span>
                    <span className="text-[9px] text-zinc-500">Operator: + (Addition)</span>
                  </div>
                  <div className="space-y-2 text-zinc-300">
                    <div className="flex items-start gap-2">
                      <span className="text-cyan-500 font-bold">1. ToPrimitive([]):</span>
                      <span>Empty array turns into primitive string <code className="bg-zinc-900 px-1.5 py-0.5 rounded text-white">""</code>.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-cyan-500 font-bold">2. ToPrimitive({"{}"}):</span>
                      <span>Empty object invokes `.toString()`, converting into primitive string <code className="bg-zinc-900 px-1.5 py-0.5 rounded text-white">"[object Object]"</code>.</span>
                    </div>
                    <div className="flex items-start gap-2 border-t border-zinc-900 pt-2">
                      <span className="text-emerald-400 font-bold">3. Calculation:</span>
                      <span>Concatenation takes priority because of string operands: <code className="bg-zinc-900 px-1.5 py-0.5 rounded text-white">"" + "[object Object]"</code>.</span>
                    </div>
                    <div className="pt-2 text-xs font-bold text-white flex justify-between">
                      <span>FINAL EVALUATED RESULT:</span>
                      <span className="text-green-400">"[object Object]"</span>
                    </div>
                  </div>
                </>
              )}

              {coercionExpression === 'bracketEqualsNotBracket' && (
                <>
                  <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5 mb-2">
                    <span className="text-cyan-400 font-bold text-xs font-mono">Expression: [] == ![]</span>
                    <span className="text-[9px] text-zinc-500">Operator: == (Abstract Equality)</span>
                  </div>
                  <div className="space-y-2 text-zinc-300">
                    <div className="flex items-start gap-2">
                      <span className="text-cyan-500 font-bold">1. RHS Coercion (![]):</span>
                      <span>An array is truthy. Thus, logical NOT <code className="text-orange-400">![]</code> coerces directly into boolean <code className="bg-zinc-900 px-1.5 py-0.5 rounded text-white">false</code>.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-cyan-500 font-bold">2. Spec Rule: Array == Bool:</span>
                      <span>Engine coerces <code className="text-white">false</code> to Number <code className="text-emerald-400">0</code>. Now equation is <code className="text-white">[] == 0</code>.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-cyan-500 font-bold">3. Spec Rule: Object == Number:</span>
                      <span>Coerces <code className="text-white">[]</code> via ToPrimitive, yielding string <code className="bg-zinc-900 px-1.5 py-0.5 rounded text-white">""</code>. Equation is <code className="text-white">"" == 0</code>.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-cyan-500 font-bold">4. Final Coercion: String == Number:</span>
                      <span>Coerces empty string <code className="text-white">""</code> to Number <code className="text-emerald-400">0</code>. Equation is <code className="text-white">0 == 0</code>.</span>
                    </div>
                    <div className="pt-2 text-xs font-bold text-white flex justify-between border-t border-zinc-900">
                      <span>FINAL EVALUATED RESULT:</span>
                      <span className="text-green-400">true</span>
                    </div>
                  </div>
                </>
              )}

              {coercionExpression === 'threePlusString' && (
                <>
                  <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5 mb-2">
                    <span className="text-cyan-400 font-bold text-xs font-mono">Expression: 3 + "3"</span>
                    <span className="text-[9px] text-zinc-500">Operator: + (String Concatenation rule)</span>
                  </div>
                  <div className="space-y-2 text-zinc-300">
                    <div className="flex items-start gap-2">
                      <span className="text-cyan-500 font-bold">1. Operand Check:</span>
                      <span>LHS is number <code className="text-orange-400">3</code>, RHS is string <code className="text-green-400">"3"</code>.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-cyan-500 font-bold">2. String Dominance:</span>
                      <span>If any of the operands of the binary + operator is a String, Javascript converts the other to string and performs string concatenation!</span>
                    </div>
                    <div className="flex items-start gap-2 border-t border-zinc-900 pt-2">
                      <span className="text-emerald-400 font-bold">3. Coercion & Addition:</span>
                      <span>Number <code className="text-orange-400">3</code> becomes String <code className="text-green-400">"3"</code>, yielding <code className="text-white">"3" + "3"</code>.</span>
                    </div>
                    <div className="pt-2 text-xs font-bold text-white flex justify-between">
                      <span>FINAL EVALUATED RESULT:</span>
                      <span className="text-green-400">"33"</span>
                    </div>
                  </div>
                </>
              )}

              {coercionExpression === 'boolPlusBool' && (
                <>
                  <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5 mb-2">
                    <span className="text-cyan-400 font-bold text-xs font-mono">Expression: true + false</span>
                    <span className="text-[9px] text-zinc-500">Operator: + (Numeric Addition rule)</span>
                  </div>
                  <div className="space-y-2 text-zinc-300">
                    <div className="flex items-start gap-2">
                      <span className="text-cyan-500 font-bold">1. No String Present:</span>
                      <span>Both operands are booleans. Since neither is a string, we attempt numeric conversion!</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-cyan-500 font-bold">2. ToNumber(true):</span>
                      <span>Coerces boolean <code className="text-white">true</code> to Number <code className="text-orange-400">1</code>.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-cyan-500 font-bold">3. ToNumber(false):</span>
                      <span>Coerces boolean <code className="text-white">false</code> to Number <code className="text-orange-400">0</code>.</span>
                    </div>
                    <div className="flex items-start gap-2 border-t border-zinc-900 pt-2">
                      <span className="text-emerald-400 font-bold">4. Final Calculation:</span>
                      <span>Equation is evaluated as <code className="text-white">1 + 0</code>.</span>
                    </div>
                    <div className="pt-2 text-xs font-bold text-white flex justify-between">
                      <span>FINAL EVALUATED RESULT:</span>
                      <span className="text-green-400">1</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}


        {/* 6. ARRAY PIPELINE FLOW */}
        {category === 'array_methods' && (
          <div className="flex flex-col gap-4 w-full items-center">
            {/* Pipeline Stage Highlighters */}
            <div className="flex gap-2 w-full max-w-xl">
              <div className={`flex-1 p-2 border rounded-lg text-center font-mono text-[9px] ${arrayPipelineStep === 0 ? 'bg-cyan-600/20 border-cyan-500 text-cyan-300' : 'bg-zinc-950 border-zinc-900 text-zinc-600'}`}>
                <span className="font-bold block text-[10px]">1. MAP</span>
                <span>x * 2</span>
              </div>
              <div className={`flex-1 p-2 border rounded-lg text-center font-mono text-[9px] ${arrayPipelineStep === 1 ? 'bg-cyan-600/20 border-cyan-500 text-cyan-300' : 'bg-zinc-950 border-zinc-900 text-zinc-600'}`}>
                <span className="font-bold block text-[10px]">2. FILTER</span>
                <span>x &gt; 4</span>
              </div>
              <div className={`flex-1 p-2 border rounded-lg text-center font-mono text-[9px] ${arrayPipelineStep === 2 ? 'bg-cyan-600/20 border-cyan-500 text-cyan-300' : 'bg-zinc-950 border-zinc-900 text-zinc-600'}`}>
                <span className="font-bold block text-[10px]">3. REDUCE</span>
                <span>Accumulate</span>
              </div>
            </div>

            {/* Simulated Floating Pipe */}
            <div className="w-full max-w-xl bg-zinc-950 border border-zinc-900 rounded-xl p-4 flex flex-col gap-4 min-h-[140px] items-center justify-center">
              {/* Array items list */}
              <div className="flex gap-3 justify-center items-center flex-wrap">
                {arrayOutputs.map((item, idx) => (
                  <div
                    key={idx}
                    className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center font-mono border-2 transition-all duration-300 ${
                      item.status === 'processing'
                        ? 'bg-yellow-500/20 border-yellow-500 text-yellow-300 animate-bounce'
                        : item.status === 'done'
                        ? 'bg-cyan-600/20 border-cyan-500 text-cyan-200'
                        : item.status === 'filtered'
                        ? 'bg-red-950/20 border-red-900 text-red-700 line-through opacity-40 scale-95'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <span className="text-[9px] text-zinc-600">[{idx}]</span>
                    <span className="text-xs font-bold">{item.value}</span>
                  </div>
                ))}
              </div>

              {arrayPipelineStep === 3 && (
                <div className="p-2 bg-emerald-500/10 border-2 border-emerald-500 text-emerald-400 rounded-lg text-center font-mono text-[11px] animate-pulse">
                  Pipeline Complete! Accumulated Sum: <span className="font-bold">24</span> (6 + 8 + 10)
                </div>
              )}
            </div>

            {/* Run Actions */}
            <div className="flex gap-2 w-full max-w-xl">
              <button
                id="array-pipeline-run-btn"
                onClick={animateArrayPipeline}
                className="flex-1 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] font-bold rounded uppercase tracking-wider transition-colors"
              >
                Animate Array Pipeline Sequence
              </button>
              <button
                id="array-pipeline-reset-btn"
                onClick={resetArrayPipeline}
                className="px-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 rounded border border-zinc-800 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        )}


        {/* 7. DOM PROPAGATION (BUBBLING AND CAPTURING) */}
        {category === 'dom_browser_adv' && (
          <div className="flex flex-col gap-4 w-full items-center">
            <div className="flex flex-col md:flex-row gap-5 w-full max-w-xl items-center justify-center">
              
              {/* Concentric DOM Structure Rings */}
              <div className="flex-1 flex justify-center items-center">
                {/* Window ring */}
                <div
                  className={`w-52 h-52 rounded-full border-2 flex items-center justify-center transition-all ${
                    bubblingActiveElement === 'window'
                      ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20'
                      : 'border-zinc-800 bg-zinc-950'
                  }`}
                  title="Window element"
                >
                  {/* Document ring */}
                  <div
                    className={`w-40 h-40 rounded-full border-2 flex items-center justify-center transition-all ${
                      bubblingActiveElement === 'document'
                        ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20'
                        : 'border-zinc-800/80 bg-zinc-900/30'
                    }`}
                    title="Document element"
                  >
                    {/* Body ring */}
                    <div
                      className={`w-28 h-28 rounded-full border-2 flex items-center justify-center transition-all ${
                        bubblingActiveElement === 'body'
                          ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20'
                          : 'border-zinc-800/60 bg-zinc-900/50'
                      }`}
                      title="Body element"
                    >
                      {/* Div Container */}
                      <div
                        className={`w-18 h-18 rounded-full border-2 flex items-center justify-center transition-all ${
                          bubblingActiveElement === 'div'
                            ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20'
                            : 'border-zinc-800/40 bg-zinc-900/80'
                        }`}
                        title="Div Container"
                      >
                        {/* Target Button */}
                        <button
                          id="bubbling-simulate-button"
                          onClick={triggerBubblingSimulation}
                          className={`w-10 h-10 rounded-full border-2 flex flex-col items-center justify-center transition-all focus:outline-none ${
                            bubblingActiveElement === 'button'
                              ? 'border-cyan-500 bg-cyan-600 text-white shadow-lg'
                              : 'border-cyan-500/50 bg-cyan-950/40 text-cyan-400 hover:bg-cyan-950'
                          }`}
                          title="Click me to trigger propagation"
                        >
                          <span className="text-[7.5px] font-bold font-mono tracking-tighter uppercase leading-none">CLICK</span>
                          <span className="text-[7.5px] font-bold font-mono tracking-tighter uppercase leading-none">ME</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Propagation logs */}
              <div className="w-52 bg-zinc-950 border border-zinc-900 rounded-xl p-3 h-52 flex flex-col justify-between text-left font-mono">
                <div>
                  <div className="text-[9px] text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-1 mb-2">
                    Event Propagation
                  </div>
                  <div className="flex justify-between items-center mb-1 text-[8px] font-bold uppercase">
                    <span>Phase:</span>
                    <span className={`px-1 rounded ${
                      activeBubblingPhase === 'capturing' ? 'bg-cyan-500/10 text-cyan-500' :
                      activeBubblingPhase === 'target' ? 'bg-red-500/10 text-red-500 font-black animate-pulse' :
                      activeBubblingPhase === 'bubbling' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-zinc-800 text-zinc-500'
                    }`}>
                      {activeBubblingPhase || 'IDLE'}
                    </span>
                  </div>
                  <div className="h-32 overflow-y-auto text-[8.5px] text-zinc-400 space-y-1">
                    {bubblingLogs.length === 0 ? (
                      <span className="text-zinc-600 italic">// Click the center target button inside the DOM rings to trace the propagation capture wave...</span>
                    ) : (
                      bubblingLogs.map((log, i) => (
                        <div key={i} className={`border-b border-zinc-900/50 pb-0.5 ${log.includes('[TARGET]') ? 'text-red-400 font-bold' : log.includes('[CAPTURING]') ? 'text-cyan-500' : 'text-cyan-300'}`}>{log}</div>
                      ))
                    )}
                  </div>
                </div>
                <div className="text-[8px] text-zinc-600 border-t border-zinc-900 pt-1.5 uppercase tracking-tighter">
                  Bubbling: <span className="text-emerald-500 font-bold">Enabled</span> (Default)
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* FOOTER ACTION / SUMMARY SECTION */}
      <div className="flex justify-between items-center border-t border-zinc-800/80 pt-3 text-[10px] text-zinc-500 font-mono">
        <span className="uppercase">Platform Environment Engine</span>
        <span className="text-zinc-400 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5" />
          Virtual Runtime Heap V8.19
        </span>
      </div>
    </div>
  );
}
