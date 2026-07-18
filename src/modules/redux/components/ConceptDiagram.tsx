import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, RotateCcw, ShieldCheck, Database, Layers, 
  Cpu, Zap, Server, Sliders, AlertCircle, Sparkles, RefreshCw 
} from 'lucide-react';

interface ConceptDiagramProps {
  conceptKey: 'redux-flow' | 'immer' | 'selectors' | 'normalization' | 'thunk-saga' | 'optimistic' | 'middleware-chain' | 'rtkq' | 'render-profiler' | 'boilerplate';
}

export default function ConceptDiagram({ conceptKey }: ConceptDiagramProps) {
  // Common interactive state variables
  const [flowStep, setFlowStep] = useState(0);
  const [dispatched, setDispatched] = useState<string | null>(null);
  
  // Immer simulator state
  const [immerBase, setImmerBase] = useState(['Buy Milk', 'Learn Redux']);
  const [immerInput, setImmerInput] = useState('');
  const [immerOps, setImmerOps] = useState<string[]>([]);
  const [immerDraft, setImmerDraft] = useState([...immerBase]);

  // Reselect memoization state
  const [selectedType, setSelectedType] = useState<'regular' | 'memoized'>('memoized');
  const [computations, setComputations] = useState(0);
  const [selectorLog, setSelectorLog] = useState('Select counter initialized and idling.');

  // Normalization toggle state
  const [normalizedView, setNormalizedView] = useState(false);

  // Optimistic UI simulator state
  const [todos, setTodos] = useState([
    { id: 101, text: 'Submit financial report to RTK store', completed: false, status: 'idle' }
  ]);
  const [optLog, setOptLog] = useState('All cloud records synchronized.');

  // RTKQ cache invalidation state
  const [rtkqData, setRtkqData] = useState({ id: 1, title: 'RTK Query Basics', fetchedAt: '12:00:00', source: 'Cache Memory' });
  const [rtkqLogs, setRtkqLogs] = useState('RTK Cache hits verified (2 active subscribers).');

  // Render profiler state
  const [renders, setRenders] = useState(0);
  const [profileLog, setProfileLog] = useState('useSelector state subscription: listening for changes.');

  // Handle step updates for redux flow
  const triggerFlow = (act: string) => {
    setDispatched(act);
    setFlowStep(1);
  };

  useEffect(() => {
    if (flowStep > 0 && flowStep < 5) {
      const timer = setTimeout(() => {
        setFlowStep(prev => prev + 1);
      }, 900);
      return () => clearTimeout(timer);
    } else if (flowStep === 5) {
      const timer = setTimeout(() => {
        setFlowStep(0);
        setDispatched(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [flowStep]);

  // Immer mutator simulation
  const addImmerItem = () => {
    if (!immerInput.trim()) return;
    setImmerDraft(prev => [...prev, immerInput]);
    setImmerOps(prev => [...prev, `draft.push("${immerInput}")`]);
    setImmerBase(prev => {
      // Immer mutates draft proxy while Base State remains locked!
      return [...prev, immerInput];
    });
    setImmerInput('');
  };

  const resetImmer = () => {
    setImmerBase(['Buy Milk', 'Learn Redux']);
    setImmerDraft(['Buy Milk', 'Learn Redux']);
    setImmerOps([]);
    setImmerInput('');
  };

  // Reselect evaluator
  const querySelector = (isNewState: boolean) => {
    if (selectedType === 'regular') {
      setComputations(prev => prev + 1);
      setSelectorLog(`[Regular] Computed output! Scanned all rows. Trigger: ${isNewState ? 'New state object' : 'Repeated query'}.`);
    } else {
      if (isNewState) {
        setComputations(prev => prev + 1);
        setSelectorLog('[Memoized Cache Miss] State reference updated. Recalculated index and populated cache.');
      } else {
        setSelectorLog('[Memoized Cache HIT] Input references are identical (===). Instantly returned cached array pointer.');
      }
    }
  };

  // Optimistic rollback simulator
  const runOptimistic = (shouldSucceed: boolean) => {
    setTodos(prev => prev.map(t => t.id === 101 ? { ...t, completed: !t.completed, status: 'pending' } : t));
    setOptLog('Optimistic update committed: Changed local checkbox instantly. Fetching server...');

    setTimeout(() => {
      if (shouldSucceed) {
        setTodos(prev => prev.map(t => t.id === 101 ? { ...t, status: 'idle' } : t));
        setOptLog('Server Success: Response 200 OK. Local mutation verified.');
      } else {
        setTodos(prev => prev.map(t => t.id === 101 ? { ...t, completed: !t.completed, status: 'failed' } : t));
        setOptLog('Server Timeout! Dispatched revert action. Rolled state back to previous snapshot.');
        setTimeout(() => {
          setTodos(prev => prev.map(t => t.id === 101 ? { ...t, status: 'idle' } : t));
        }, 1500);
      }
    }, 1200);
  };

  // RTKQ cache invalidator
  const updateRtkqCache = () => {
    setRtkqLogs('Dispatching mutation query... invalidating tags: ["Article"]');
    setTimeout(() => {
      setRtkqData({ id: 1, title: 'RTK Query Basics (Updated)', fetchedAt: new Date().toLocaleTimeString(), source: 'Fresh Server Fetch' });
      setRtkqLogs('Cache invalidated successfully! Automatical background query re-fetched newest database table.');
    }, 1000);
  };

  // Render trigger simulation
  const checkRenders = (safe: boolean) => {
    if (safe) {
      setRenders(prev => prev + 1);
      setProfileLog('Safe state reference returned (shallow/destructured copy)! Triggered element re-render.');
    } else {
      setProfileLog('Direct in-place state mutation! Old reference equals New reference (===). React ignored change.');
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-4 md:p-5 shadow-lg my-3 text-slate-300">
      <div className="flex items-center justify-between mb-3 border-b border-slate-800/60 pb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <h4 className="font-semibold text-slate-100 capitalize text-xs md:text-sm">
            Concept Simulator: <span className="text-cyan-400">{conceptKey.replace('-', ' ')}</span>
          </h4>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-800 rounded text-zinc-500 select-none">Live Simulation</span>
      </div>

      {/* 1. REDUX FLOW */}
      {conceptKey === 'redux-flow' && (
        <div className="space-y-3">
          <p className="text-xs text-zinc-500">
            Click an action button below to trace the unidirectional flow from component dispatch, through middlewares, into reducers, updating the store, and notifying viewers.
          </p>
          
          <div className="relative h-44 border border-slate-800 rounded-lg bg-slate-950 flex flex-col justify-between p-3 overflow-hidden">
            <div className="flex justify-between items-center z-10">
              <div className={`px-2 py-1 rounded text-[11px] font-mono border transition-all ${flowStep === 0 ? 'bg-cyan-950/30 border-cyan-500/40 text-cyan-200 font-semibold' : 'bg-slate-900 border-slate-800 text-zinc-500'}`}>
                1. React UI
              </div>
              <div className={`px-2 py-1 rounded text-[11px] font-mono border transition-all ${flowStep === 1 ? 'bg-cyan-950/30 border-cyan-500/40 text-cyan-200 font-semibold' : 'bg-slate-900 border-slate-800 text-zinc-500'}`}>
                2. Dispatch
              </div>
              <div className={`px-2 py-1 rounded text-[11px] font-mono border transition-all ${flowStep === 2 ? 'bg-cyan-950/30 border-cyan-500/40 text-cyan-200 font-semibold' : 'bg-slate-900 border-slate-800 text-zinc-500'}`}>
                3. Middleware
              </div>
            </div>

            <div className="flex justify-around items-center z-10">
              <div className={`px-2 py-1 rounded text-[11px] font-mono border transition-all ${flowStep === 3 ? 'bg-teal-950/30 border-teal-500/40 text-teal-200 font-semibold' : 'bg-slate-900 border-slate-800 text-zinc-500'}`}>
                4. Pure Reducer
              </div>
              <div className={`px-2 py-1 rounded text-[11px] font-mono border transition-all ${flowStep === 4 ? 'bg-sky-950/30 border-sky-500/40 text-sky-200 font-semibold' : 'bg-slate-900 border-slate-800 text-zinc-500'}`}>
                5. Global Store
              </div>
            </div>

            {/* Simulated floating action token */}
            <AnimatePresence>
              {flowStep > 0 && (
                <motion.div
                  className="absolute w-3.5 h-3.5 bg-cyan-950/200 rounded-full flex items-center justify-center text-[8px] text-white font-bold shadow-md shadow-cyan-500/50"
                  initial={{ x: 25, y: 15 }}
                  animate={
                    flowStep === 1 ? { x: 160, y: 15 } :
                    flowStep === 2 ? { x: 280, y: 15 } :
                    flowStep === 3 ? { x: 80, y: 85 } :
                    flowStep === 4 ? { x: 220, y: 85 } :
                    flowStep === 5 ? { x: 25, y: 15, opacity: 0 } : {}
                  }
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  ⚡
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex gap-2">
            <button onClick={() => triggerFlow('counter/increment')} className="px-2.5 py-1 bg-slate-800 hover:bg-cyan-600 text-[11px] rounded font-mono text-slate-200 transition-colors flex items-center gap-1">
              <Play className="w-3 h-3" /> dispatch(increment())
            </button>
            <button onClick={() => triggerFlow('todo/add')} className="px-2.5 py-1 bg-slate-800 hover:bg-cyan-600 text-[11px] rounded font-mono text-slate-200 transition-colors flex items-center gap-1">
              <Play className="w-3 h-3" /> dispatch(addTodo())
            </button>
          </div>

          {dispatched && (
            <div className="text-[10px] font-mono bg-slate-950 p-2 rounded border border-slate-850 flex justify-between text-zinc-500">
              <span>Dispatched Action: <strong className="text-cyan-400">{dispatched}</strong></span>
              <span className="text-cyan-400">Stage {flowStep}/5</span>
            </div>
          )}
        </div>
      )}

      {/* 2. IMMER */}
      {conceptKey === 'immer' && (
        <div className="space-y-3">
          <p className="text-xs text-zinc-500">
            Immer lets you write mutable-style code inside slices. Immer maps these to proxies, keeping the Original reference clean.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="bg-slate-950 p-2.5 rounded border border-slate-850">
              <span className="text-[10px] font-bold text-zinc-500 block mb-1">Base State (Locked)</span>
              <pre className="text-[10px] font-mono text-sky-300 overflow-y-auto max-h-16">
                {JSON.stringify(immerBase, null, 1)}
              </pre>
            </div>
            <div className="bg-slate-950 p-2.5 rounded border border-slate-850">
              <span className="text-[10px] font-bold text-cyan-400 block mb-1">Draft mutations recorded</span>
              <div className="text-[9px] font-mono text-cyan-300 space-y-0.5 overflow-y-auto max-h-16">
                {immerOps.length === 0 ? <span className="text-zinc-500 italic">No mutations queued</span> : immerOps.map((op, i) => <div key={i}>✓ {op}</div>)}
              </div>
            </div>
            <div className="bg-slate-950 p-2.5 rounded border border-slate-850">
              <span className="text-[10px] font-bold text-emerald-400 block mb-1">Final Immutable copy</span>
              <pre className="text-[10px] font-mono text-emerald-300 overflow-y-auto max-h-16">
                {JSON.stringify(immerDraft, null, 1)}
              </pre>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <input 
              type="text" 
              value={immerInput} 
              onChange={e => setImmerInput(e.target.value)} 
              placeholder="Append text..." 
              className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none flex-1 font-mono"
            />
            <button onClick={addImmerItem} className="px-3 py-1 bg-cyan-600 hover:bg-cyan-950/200 text-white text-xs rounded transition-colors">
              Mutate
            </button>
            <button onClick={resetImmer} className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 3. SELECTOR CACHE */}
      {conceptKey === 'selectors' && (
        <div className="space-y-3">
          <p className="text-xs text-zinc-500">
            Test selectors. Regular selectors re-evaluate on every check; Memoized (Reselect) selectors skip work and return cached results.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-slate-950 rounded border border-slate-850 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-zinc-500 block mb-2">Select Engine</span>
                <div className="flex gap-1.5 mb-2">
                  <button onClick={() => { setSelectedType('regular'); setComputations(0); }} className={`px-2 py-1 text-[11px] rounded border flex-1 transition-all ${selectedType === 'regular' ? 'bg-cyan-950/20 border-cyan-500/50 text-cyan-300 font-semibold' : 'bg-slate-900 border-slate-800 text-zinc-500'}`}>
                    Regular (Array Filter)
                  </button>
                  <button onClick={() => { setSelectedType('memoized'); setComputations(0); }} className={`px-2 py-1 text-[11px] rounded border flex-1 transition-all ${selectedType === 'memoized' ? 'bg-cyan-950/20 border-cyan-500/50 text-cyan-300 font-semibold' : 'bg-slate-900 border-slate-800 text-zinc-500'}`}>
                    Memoized
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center bg-slate-900 px-2 py-1 rounded border border-slate-800 text-xs font-mono">
                <span>Computations:</span>
                <span className="font-bold text-cyan-400 text-sm animate-pulse">{computations}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded border border-slate-850 flex flex-col justify-between min-h-[100px]">
              <div>
                <span className="text-[10px] font-bold text-zinc-500 block mb-1">Execution Log</span>
                <p className="text-[11px] font-mono text-cyan-400">{selectorLog}</p>
              </div>
              <div className="flex gap-1.5 mt-2">
                <button onClick={() => querySelector(false)} className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[11px] flex-1 text-slate-200">
                  Query Same State
                </button>
                <button onClick={() => querySelector(true)} className="px-2 py-1 bg-cyan-600 hover:bg-cyan-950/200 rounded text-[11px] flex-1 text-white">
                  Query State Change
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. NORMALIZATION */}
      {conceptKey === 'normalization' && (
        <div className="space-y-3">
          <p className="text-xs text-zinc-500">
            Compare nested trees to relational schemas. Toggle below to visualize how `entities` and `ids` simplify deep updates.
          </p>

          <div className="flex justify-center">
            <div className="inline-flex rounded border border-slate-850 bg-slate-950 p-1">
              <button onClick={() => setNormalizedView(false)} className={`px-2.5 py-1 text-[10px] rounded transition-all ${!normalizedView ? 'bg-cyan-950/200/15 text-cyan-300 font-bold' : 'text-zinc-500'}`}>
                Nested Array (O(N) search)
              </button>
              <button onClick={() => setNormalizedView(true)} className={`px-2.5 py-1 text-[10px] rounded transition-all ${normalizedView ? 'bg-cyan-950/200/15 text-cyan-300 font-bold' : 'text-zinc-500'}`}>
                Normalized Entities (O(1) Lookup)
              </button>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-850 p-2.5 rounded font-mono text-[10px] max-h-36 overflow-y-auto">
            {!normalizedView ? (
              <pre className="text-cyan-200/90">{`// Nesting forces scanning deep array keys for single edit:
[
  {
    "id": "post-2",
    "title": "Normalized Stores",
    "comments": [
      { "id": "c1", "body": "Superb!", "user": { "id": "u4", "name": "Dan" } }
    ]
  }
]`}</pre>
            ) : (
              <pre className="text-cyan-200/90">{`// Relational entities make lookups O(1) by primary key:
{
  "posts": { "ids": ["post-2"], "entities": { "post-2": { "author": "u4", "comments": ["c1"] } } },
  "users": { "entities": { "u4": { "name": "Dan" } } },
  "comments": { "entities": { "c1": { "body": "Superb!" } } }
}`}</pre>
            )}
          </div>
        </div>
      )}

      {/* 5. THUNK */}
      {conceptKey === 'thunk-saga' && (
        <div className="space-y-3">
          <p className="text-xs text-zinc-500">
            Thunk middleware holds your promises. It processes API fetch requests in the background, then emits standard sync actions with payloads to reducers.
          </p>

          <div className="border border-slate-850 rounded-lg p-3 bg-slate-950 flex flex-col justify-around gap-2 h-28 text-center font-mono text-[10px]">
            <div className="flex justify-between items-center bg-slate-900 border border-slate-850 p-2 rounded">
              <span className="text-zinc-500">Thunk Dispatch</span>
              <span className="text-cyan-400 font-semibold font-mono animate-pulse">→ await fetch("/api/users")</span>
              <span className="text-emerald-400">→ dispatch(fulfilled)</span>
            </div>
            <div className="text-[9px] text-zinc-500 leading-tight">
              Reducers remain fully pure functions. Middlewares serve as the secure sandbox for network traffic and side effects.
            </div>
          </div>
        </div>
      )}

      {/* 6. OPTIMISTIC UPDATES */}
      {conceptKey === 'optimistic' && (
        <div className="space-y-3">
          <p className="text-xs text-zinc-500">
            Click to send an action optimistically. The item changes state instantly. On failure, Redux restores the prior database backup snapshot.
          </p>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 space-y-2">
            {todos.map(todo => (
              <div key={todo.id} className="flex justify-between items-center bg-slate-900 p-2 rounded border border-slate-850 text-xs">
                <span className={`font-semibold ${todo.completed ? 'line-through text-zinc-500' : 'text-slate-200'}`}>{todo.text}</span>
                <span className="font-mono text-[10px]">
                  {todo.status === 'pending' && <span className="text-cyan-400 animate-pulse">✓ Pending Server Validation...</span>}
                  {todo.status === 'failed' && <span className="text-red-400">⚠ Server Timeout! Rolling back</span>}
                  {todo.status === 'idle' && <span className="text-zinc-500">In Sync</span>}
                </span>
              </div>
            ))}
            <div className="text-[10px] font-mono text-center text-cyan-400 bg-slate-900 p-1.5 rounded">{optLog}</div>
          </div>

          <div className="flex gap-2">
            <button onClick={() => runOptimistic(true)} className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded text-xs flex-1 transition-colors">
              Simulate API Success
            </button>
            <button onClick={() => runOptimistic(false)} className="px-2.5 py-1 bg-red-700 hover:bg-red-600 text-white rounded text-xs flex-1 transition-colors">
              Simulate API Failure
            </button>
          </div>
        </div>
      )}

      {/* 7. MIDDLEWARE */}
      {conceptKey === 'middleware-chain' && (
        <div className="space-y-3">
          <p className="text-xs text-zinc-500">
            Middlewares curry together in a composite chain. Every middleware decides to call <code className="bg-slate-950 p-0.5 rounded text-cyan-300">next(action)</code> or swallow it entirely.
          </p>

          <div className="bg-slate-950 p-2.5 rounded border border-slate-850 flex justify-around text-center font-mono text-[10px] flex-wrap gap-2">
            <div className="bg-slate-900 border border-slate-850 px-2 py-1 rounded">dispatch(action)</div>
            <div className="text-zinc-500">➔</div>
            <div className="bg-cyan-900/10 border border-cyan-500/20 px-2 py-1 rounded text-cyan-300">Logger Middleware</div>
            <div className="text-zinc-500">➔</div>
            <div className="bg-cyan-900/10 border border-cyan-500/20 px-2 py-1 rounded text-cyan-300">Auth Token Middleware</div>
            <div className="text-zinc-500">➔</div>
            <div className="bg-emerald-900/10 border border-emerald-500/20 px-2 py-1 rounded text-emerald-300">Reducers</div>
          </div>
        </div>
      )}

      {/* 8. RTK QUERY CACHE TAGS */}
      {conceptKey === 'rtkq' && (
        <div className="space-y-3">
          <p className="text-xs text-zinc-500">
            RTK Query manages background state caching using Tags. Mutating database rows invalidates cached tags, which triggers background refetches automatically.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="bg-slate-950 p-2.5 rounded border border-slate-850 space-y-1 text-[11px] font-mono">
              <div className="flex justify-between font-bold text-zinc-500 border-b border-slate-800 pb-1 mb-1">
                <span>Cached Row</span>
                <span className="text-cyan-400">Tag: ["Article"]</span>
              </div>
              <div>Title: {rtkqData.title}</div>
              <div className="text-zinc-500">Timestamp: {rtkqData.fetchedAt}</div>
              <div className="text-emerald-400">Data Source: {rtkqData.source}</div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded border border-slate-850 flex flex-col justify-between">
              <div className="text-[10px] font-mono text-cyan-400 leading-tight mb-2 min-h-[36px]">{rtkqLogs}</div>
              <button onClick={updateRtkqCache} className="px-2.5 py-1 bg-cyan-600 hover:bg-cyan-950/200 text-white rounded text-xs font-semibold transition-all">
                Trigger Mutation (Update rows)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. RENDER PROFILER */}
      {conceptKey === 'render-profiler' && (
        <div className="space-y-3">
          <p className="text-xs text-zinc-500">
            Components re-render only if the values selected from <code className="bg-slate-950 p-0.5 rounded text-cyan-300">useSelector</code> change references (===). Mutating references directly skips updates.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-slate-950 rounded border border-slate-850 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-zinc-500 block mb-2">Subscriber React UI</span>
              <div className="text-2xl font-extrabold text-cyan-400 font-mono text-center bg-slate-900 border border-slate-800 rounded py-2 animate-pulse">
                {renders} Renders
              </div>
              <div className="flex gap-1.5 mt-3">
                <button onClick={() => checkRenders(false)} className="px-2 py-1 bg-slate-850 hover:bg-slate-800 rounded text-[10px] text-slate-300 flex-1">
                  Mutate state in-place
                </button>
                <button onClick={() => checkRenders(true)} className="px-2 py-1 bg-cyan-600 hover:bg-cyan-950/200 rounded text-[10px] text-white flex-1 font-semibold">
                  Safe Copy State
                </button>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded border border-slate-850 flex flex-col justify-between text-xs font-mono min-h-[110px]">
              <div>
                <span className="text-[10px] font-bold text-zinc-500 block mb-1">Profiler Trace</span>
                <p className="text-cyan-400 text-[10px] leading-relaxed">{profileLog}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 10. BOILERPLATE */}
      {conceptKey === 'boilerplate' && (
        <div className="space-y-3">
          <p className="text-xs text-zinc-500">
            Redux Toolkit slice definitions combine actions and reducers in one unified block, cutting classic Redux setups by over 70%.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[9px] font-mono">
            <div className="bg-slate-950 p-2.5 rounded border border-slate-850">
              <div className="text-[10px] text-cyan-400 font-bold border-b border-slate-800 pb-1 mb-1">Classic Redux (3 Files)</div>
              <pre className="text-zinc-500 leading-tight">
{`const INC_ACTION = 'inc';
const increment = () => ({ type: INC_ACTION });
function reducer(state, action) {
  if (action.type === INC_ACTION) {
    return { ...state, val: state.val + 1 };
  }
}`}
              </pre>
            </div>

            <div className="bg-cyan-950/20 border border-cyan-500/20 p-2.5 rounded">
              <div className="text-[10px] text-cyan-400 font-bold border-b border-cyan-500/10 pb-1 mb-1">RTK Slice (1 File)</div>
              <pre className="text-slate-300 leading-tight">
{`const slice = createSlice({
  name: 'counter',
  initialState: { val: 0 },
  reducers: {
    increment: state => { state.val += 1 }
  }
});`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
