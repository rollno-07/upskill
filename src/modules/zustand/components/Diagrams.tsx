import React, { useState, useEffect } from 'react';
import { 
  GitBranch, 
  RefreshCw, 
  Zap, 
  Layers, 
  Trash2, 
  Database, 
  Undo, 
  Redo, 
  Clock, 
  History, 
  Terminal, 
  MousePointer, 
  Check, 
  Plus, 
  Minus, 
  AlertCircle,
  Play,
  Monitor,
  CheckCircle2,
  Lock,
  Workflow
} from 'lucide-react';

interface DiagramProps {
  id: string;
}

export const DiagramContainer: React.FC<DiagramProps> = ({ id }) => {
  switch (id) {
    case 'redux-vs-zustand':
      return <ReduxVsZustandDiagram />;
    case 're-render':
      return <ReRenderDiagram />;
    case 'set-merger':
      return <SetMergerDiagram />;
    case 'immer-nested':
      return <ImmerNestedDiagram />;
    case 'tab-persist':
      return <TabPersistDiagram />;
    case 'async-loader':
      return <AsyncLoaderDiagram />;
    case 'history-undo':
      return <HistoryUndoDiagram />;
    case 'store-slices':
      return <StoreSlicesDiagram />;
    case 'outside-react':
      return <OutsideReactDiagram />;
    case 'computed-values':
      return <ComputedValuesDiagram />;
    default:
      return (
        <div className="flex flex-col items-center justify-center h-full text-white/40 p-6 text-center">
          <Workflow className="w-8 h-8 text-cyan-500/50 mb-2" />
          <p className="text-xs">Interactive visualization for concept: {id}</p>
        </div>
      );
  }
};

/* ==========================================================
   1. REDUX VS ZUSTAND DIAGRAM
   ========================================================== */
const ReduxVsZustandDiagram: React.FC = () => {
  const [reduxState, setReduxState] = useState({ count: 0, loading: false });
  const [zustandState, setZustandState] = useState({ count: 0 });
  const [reduxStep, setReduxStep] = useState<string | null>(null);
  const [zustandStep, setZustandStep] = useState<string | null>(null);

  const runRedux = () => {
    if (reduxState.loading) return;
    setReduxState(s => ({ ...s, loading: true }));
    
    const steps = ['dispatch', 'middleware', 'reducer', 'store', 'view'];
    steps.forEach((step, index) => {
      setTimeout(() => {
        setReduxStep(step);
        if (step === 'view') {
          setReduxState(s => ({ count: s.count + 1, loading: false }));
        }
      }, (index + 1) * 350);
    });
  };

  const runZustand = () => {
    setZustandStep('set');
    setTimeout(() => {
      setZustandStep('store');
      setZustandState(s => ({ count: s.count + 1 }));
    }, 200);
    setTimeout(() => {
      setZustandStep('view');
    }, 450);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 font-display">
          <GitBranch className="w-3.5 h-3.5 text-cyan-500" /> Architectural Flowcomparison
        </span>
        <div className="text-[10px] text-white/40 font-mono">Click buttons below to trace execution path</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {/* Redux Architecture */}
        <div className="bg-[#121212]/90 rounded-xl p-4 border border-white/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-1.5">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider font-display">Redux Architecture</span>
              <span className="text-[10px] font-mono text-white/30 bg-red-950/40 px-1.5 py-0.5 rounded">Heavy Ceremony</span>
            </div>
            
            <div className="space-y-1.5">
              <div className={`p-2 rounded text-[11px] font-mono transition-all duration-300 border ${reduxStep === 'dispatch' ? 'bg-red-500/10 border-red-500/40 text-white shadow-sm' : 'bg-white/5 border-white/5 text-white/40'}`}>
                1. dispatch({`{ type: 'INC' }`})
              </div>
              
              <div className={`p-2 rounded text-[11px] font-mono transition-all duration-300 border ${reduxStep === 'middleware' ? 'bg-cyan-500/10 border-cyan-500/40 text-white shadow-sm' : 'bg-white/5 border-white/5 text-white/40'}`}>
                2. Middlewares (Logger, Thunk)
              </div>

              <div className={`p-2 rounded text-[11px] font-mono transition-all duration-300 border ${reduxStep === 'reducer' ? 'bg-yellow-500/10 border-yellow-500/40 text-white shadow-sm' : 'bg-white/5 border-white/5 text-white/40'}`}>
                3. Root Reducer (calculates next state)
              </div>

              <div className={`p-2 rounded text-[11px] font-mono transition-all duration-300 border ${reduxStep === 'store' ? 'bg-cyan-500/10 border-cyan-500/40 text-white shadow-sm' : 'bg-white/5 border-white/5 text-white/40'}`}>
                4. Redux Store (triggers subscribers)
              </div>

              <div className={`p-2 rounded text-[11px] font-mono transition-all duration-300 border ${reduxStep === 'view' ? 'bg-green-500/10 border-green-500/40 text-white shadow-sm' : 'bg-white/5 border-white/5 text-white/40'}`}>
                5. React Component (forced re-render)
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
            <div className="text-xs font-mono">
              Redux State: <span className="text-red-400 font-bold">{reduxState.count}</span>
            </div>
            <button 
              onClick={runRedux}
              disabled={reduxState.loading}
              className="px-3 py-1.5 bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-200 rounded text-xs font-medium flex items-center gap-1.5 disabled:opacity-50 font-display transition-all"
            >
              <Play className="w-3 h-3" /> Dispatch Inc
            </button>
          </div>
        </div>

        {/* Zustand Architecture */}
        <div className="bg-[#121212]/90 rounded-xl p-4 border border-white/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-1.5">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-display">Zustand Architecture</span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-1.5 py-0.5 rounded">Direct Hook</span>
            </div>

            <div className="space-y-1.5">
              <div className={`p-2 rounded text-[11px] font-mono transition-all duration-300 border ${zustandStep === 'set' ? 'bg-cyan-500/10 border-cyan-500/40 text-white shadow-sm' : 'bg-white/5 border-white/5 text-white/40'}`}>
                1. countInc() -&gt; set(state =&gt; ...)
              </div>

              <div className={`p-2 rounded text-[11px] font-mono transition-all duration-300 border ${zustandStep === 'store' ? 'bg-cyan-500/10 border-cyan-500/40 text-white shadow-sm' : 'bg-white/5 border-white/5 text-white/40'}`}>
                2. Subscriber Observers Notified
              </div>

              <div className={`p-2 rounded text-[11px] font-mono transition-all duration-300 border ${zustandStep === 'view' ? 'bg-green-500/10 border-green-500/40 text-white shadow-sm' : 'bg-white/5 border-white/5 text-white/40'}`}>
                3. Connected Component Updates Selective
              </div>

              <div className="p-2 border border-dashed border-white/5 rounded text-[11px] font-mono text-white/10 text-center">
                (No Dispatcher wrapper)
              </div>
              <div className="p-2 border border-dashed border-white/5 rounded text-[11px] font-mono text-white/10 text-center">
                (No Context Provider wrapper)
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
            <div className="text-xs font-mono">
              Zustand State: <span className="text-cyan-400 font-bold">{zustandState.count}</span>
            </div>
            <button 
              onClick={runZustand}
              className="px-3 py-1.5 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-200 rounded text-xs font-medium flex items-center gap-1.5 font-display transition-all"
            >
              <Play className="w-3 h-3" /> Invoke inc()
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================
   2. RE-RENDER DIAGRAM (Subscribed slices vs whole store)
   ========================================================== */
const ReRenderDiagram: React.FC = () => {
  const [store, setStore] = useState({ count: 10, noise: 'Bear' });
  const [countComponentRenders, setCountComponentRenders] = useState(1);
  const [noiseComponentRenders, setNoiseComponentRenders] = useState(1);
  const [wholeStoreRenders, setWholeStoreRenders] = useState(1);
  
  const [flashingCount, setFlashingCount] = useState(false);
  const [flashingNoise, setFlashingNoise] = useState(false);
  const [flashingWhole, setFlashingWhole] = useState(false);

  const incrementCount = () => {
    setStore(s => ({ ...s, count: s.count + 1 }));
    setCountComponentRenders(r => r + 1);
    setWholeStoreRenders(r => r + 1);
    
    setFlashingCount(true);
    setFlashingWhole(true);
    setTimeout(() => {
      setFlashingCount(false);
      setFlashingWhole(false);
    }, 450);
  };

  const changeNoise = () => {
    const noises = ['Bear', 'Zebra', 'Salmon', 'Wolf', 'Eagle', 'Octopus'];
    const nextNoise = noises[Math.floor(Math.random() * noises.length)];
    setStore(s => ({ ...s, noise: nextNoise }));

    setNoiseComponentRenders(r => r + 1);
    setWholeStoreRenders(r => r + 1);

    setFlashingNoise(true);
    setFlashingWhole(true);
    setTimeout(() => {
      setFlashingNoise(false);
      setFlashingWhole(false);
    }, 450);
  };

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 font-display">
          <Layers className="w-3.5 h-3.5 text-cyan-500" /> Re-render Simulator
        </span>
        <div className="text-[10px] text-white/40 font-mono">Select values to see how selective updates block unwanted renders</div>
      </div>

      <div className="bg-[#121212]/90 p-3 rounded-lg border border-white/5 flex flex-wrap gap-3 items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <span className="text-white/40">In-Store Keys:</span>
          <div className="font-mono bg-black/40 px-2 py-0.5 rounded border border-white/5 text-[11px]">
            count: <span className="text-cyan-400 font-bold">{store.count}</span>
          </div>
          <div className="font-mono bg-black/40 px-2 py-0.5 rounded border border-white/5 text-[11px]">
            noise: <span className="text-cyan-400 font-bold">{store.noise}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={incrementCount}
            className="px-2.5 py-1 bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-800/40 rounded text-[10px] font-mono transition-all"
          >
            mutate count
          </button>
          <button 
            onClick={changeNoise}
            className="px-2.5 py-1 bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-800/40 rounded text-[10px] font-mono transition-all"
          >
            mutate noise
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
        {/* Component A */}
        <div className={`p-3 rounded-xl border flex flex-col justify-between transition-all duration-300 ${flashingCount ? 'bg-cyan-500/10 border-cyan-500 shadow-md' : 'bg-[#161616]/70 border-white/5'}`}>
          <div>
            <div className="text-xs font-bold text-white font-display mb-1">Component A (Subscribed count)</div>
            <div className="text-[9px] font-mono bg-black/50 text-cyan-300 px-1.5 py-0.5 rounded inline-block mb-2">
              s =&gt; s.count
            </div>
            <p className="text-[11px] text-white/50 leading-tight">
              Only renders when <span className="text-cyan-400 font-mono">count</span> changes. Ignores modifications to noise completely.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-white/5 flex justify-between items-center text-xs">
            <span className="text-white/40">Render Count</span>
            <span className="font-mono font-bold text-cyan-400 bg-black/40 px-2 py-0.5 rounded">{countComponentRenders}</span>
          </div>
        </div>

        {/* Component B */}
        <div className={`p-3 rounded-xl border flex flex-col justify-between transition-all duration-300 ${flashingNoise ? 'bg-cyan-500/10 border-cyan-500 shadow-md' : 'bg-[#161616]/70 border-white/5'}`}>
          <div>
            <div className="text-xs font-bold text-white font-display mb-1">Component B (Subscribed noise)</div>
            <div className="text-[9px] font-mono bg-black/50 text-cyan-300 px-1.5 py-0.5 rounded inline-block mb-2">
              s =&gt; s.noise
            </div>
            <p className="text-[11px] text-white/50 leading-tight">
              Only renders when <span className="text-cyan-400 font-mono">noise</span> changes. Ignores modifications to count completely.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-white/5 flex justify-between items-center text-xs">
            <span className="text-white/40">Render Count</span>
            <span className="font-mono font-bold text-cyan-400 bg-black/40 px-2 py-0.5 rounded">{noiseComponentRenders}</span>
          </div>
        </div>

        {/* Component C */}
        <div className={`p-3 rounded-xl border flex flex-col justify-between transition-all duration-300 ${flashingWhole ? 'bg-red-500/10 border-red-500 shadow-md' : 'bg-[#161616]/70 border-white/5'}`}>
          <div>
            <div className="text-xs font-bold text-white font-display mb-1">Component C (Whole Store)</div>
            <div className="text-[9px] font-mono bg-black/50 text-red-400 px-1.5 py-0.5 rounded inline-block mb-2">
              useStore()
            </div>
            <p className="text-[11px] text-white/50 leading-tight">
              No selector used. Subscribed to <span className="text-red-400 font-mono">all keys</span>. Renders on any update.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-white/5 flex justify-between items-center text-xs">
            <span className="text-white/40">Render Count</span>
            <span className="font-mono font-bold text-red-400 bg-black/40 px-2 py-0.5 rounded">{wholeStoreRenders}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================
   3. SET MERGER DIAGRAM (Shallow merger vs complete overwrite)
   ========================================================== */
const SetMergerDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'merge' | 'replace'>('merge');
  const [outputState, setOutputState] = useState<Record<string, any>>({
    count: 4,
    theme: 'dark',
    active: true
  });
  const [actionApplied, setActionApplied] = useState<string>('initial');

  const handleMerge = () => {
    setOutputState(prev => ({
      ...prev,
      count: prev.count + 1
    }));
    setActionApplied('set({ count: count + 1 })');
  };

  const handleReplace = () => {
    setOutputState({
      count: 100
    });
    setActionApplied('set({ count: 100 }, true)');
  };

  const resetStore = () => {
    setOutputState({
      count: 4,
      theme: 'dark',
      active: true
    });
    setActionApplied('initial');
  };

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 font-display">
          <Trash2 className="w-3.5 h-3.5 text-cyan-500" /> State Merge Sandbox
        </span>
        <button 
          onClick={resetStore}
          className="text-[9px] bg-white/5 hover:bg-white/10 px-2 py-0.5 rounded border border-white/10 font-mono text-white/60 transition-all"
        >
          reset simulation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        <div className="bg-[#121212]/90 rounded-xl p-4 border border-white/5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="text-xs font-bold text-white font-display">Choose Update Path:</div>
            
            <div className="space-y-2">
              <button 
                onClick={() => setActiveTab('merge')}
                className={`w-full text-left p-2.5 rounded-lg border transition-all ${activeTab === 'merge' ? 'bg-cyan-500/5 border-cyan-500/30' : 'bg-transparent border-white/5 hover:bg-white/5'}`}
              >
                <div className="text-xs font-bold text-cyan-400 font-display">Default Merge</div>
                <div className="text-[10px] font-mono text-white/40 mt-0.5">set((s) =&gt; ({`{ count: s.count + 1 }`}))</div>
                <p className="text-[10px] text-white/50 mt-1 leading-relaxed">
                  Zustand merges returned properties at the first layer, keeping existing keys intact.
                </p>
              </button>

              <button 
                onClick={() => setActiveTab('replace')}
                className={`w-full text-left p-2.5 rounded-lg border transition-all ${activeTab === 'replace' ? 'bg-cyan-500/5 border-cyan-500/30' : 'bg-transparent border-white/5 hover:bg-white/5'}`}
              >
                <div className="text-xs font-bold text-cyan-400 font-display">Overwrite Replace (true parameter)</div>
                <div className="text-[10px] font-mono text-white/40 mt-0.5">set({`{ count: 100 }`}, true)</div>
                <p className="text-[10px] text-white/50 mt-1 leading-relaxed">
                  Bypasses merge behavior. Entirely overwrites state root object.
                </p>
              </button>
            </div>
          </div>

          <div className="pt-2">
            {activeTab === 'merge' ? (
              <button 
                onClick={handleMerge}
                className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-black text-xs font-bold rounded uppercase tracking-wider font-display transition-all"
              >
                Execute Merge Action
              </button>
            ) : (
              <button 
                onClick={handleReplace}
                className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-black text-xs font-bold rounded uppercase tracking-wider font-display transition-all"
              >
                Execute Overwrite Action
              </button>
            )}
          </div>
        </div>

        <div className="bg-[#161616]/70 rounded-xl p-4 border border-white/5 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-white font-display mb-2 flex items-center justify-between">
              <span>Memory Heap State</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 bg-black/40 text-cyan-300 rounded uppercase border border-white/5">{actionApplied}</span>
            </div>

            <div className="bg-black/40 rounded-lg p-3 font-mono text-xs space-y-2 h-40 overflow-y-auto border border-white/5">
              <span className="text-white/30">{`{`}</span>
              <div className="pl-4 space-y-1">
                {outputState.hasOwnProperty('count') ? (
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-cyan-400">count:</span>
                    <span className="text-white font-bold">{outputState.count}</span>
                  </div>
                ) : (
                  <div className="text-white/20 italic text-[11px] line-through flex justify-between"><span>count</span> <span className="text-red-500/50">deleted</span></div>
                )}

                {outputState.hasOwnProperty('theme') ? (
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-cyan-400">theme:</span>
                    <span className="text-white font-bold">"{outputState.theme}"</span>
                  </div>
                ) : (
                  <div className="text-white/20 italic text-[11px] line-through flex justify-between"><span>theme</span> <span className="text-red-500/50">deleted</span></div>
                )}

                {outputState.hasOwnProperty('active') ? (
                  <div className="flex justify-between">
                    <span className="text-green-400">active:</span>
                    <span className="text-white font-bold">{String(outputState.active)}</span>
                  </div>
                ) : (
                  <div className="text-white/20 italic text-[11px] line-through flex justify-between"><span>active</span> <span className="text-red-500/50">deleted</span></div>
                )}
              </div>
              <span className="text-white/30">{`}`}</span>
            </div>
          </div>

          <div className="text-[10px] text-white/40 leading-normal border-t border-white/5 pt-2 mt-2">
            {activeTab === 'merge' ? (
              <span>💡 Merges the update. <span className="text-cyan-400 font-semibold">count</span> is updated, other variables remain safe.</span>
            ) : (
              <span>⚠️ <span className="text-cyan-400 font-semibold">theme</span> and <span className="text-green-400 font-semibold">active</span> are deleted because you bypassed merging.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================
   4. IMMER NESTED DIAGRAM (Manual spreads vs Immer mutation)
   ========================================================== */
const ImmerNestedDiagram: React.FC = () => {
  const [age, setAge] = useState(25);
  const [updateMethod, setUpdateMethod] = useState<'manual' | 'immer'>('manual');
  const [log, setLog] = useState<string[]>([]);

  const handleIncrement = () => {
    setAge(a => a + 1);
    if (updateMethod === 'manual') {
      setLog(prev => [
        `Recreated 'info' object memory ref`,
        `Recreated 'profile' object memory ref`,
        `Recreated 'user' object memory ref`,
        `Shallow merged state root object`,
        ...prev
      ].slice(0, 5));
    } else {
      setLog(prev => [
        `Proxy intercepting direct mutation`,
        `Updating: state.user.profile.info.age++`,
        `Immer computed clean next immutable state`,
        ...prev
      ].slice(0, 5));
    }
  };

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 font-display">
          <Zap className="w-3.5 h-3.5 text-cyan-500" /> Deep Immutability Lab
        </span>
        <div className="text-[10px] text-white/40 font-mono">Modifying nested state safely</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        <div className="bg-[#121212]/90 rounded-xl p-4 border border-white/5 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[10px] text-white/40 uppercase font-bold font-display">Object Tree Structure</span>
            
            <div className="font-mono text-xs space-y-1 bg-black/40 p-3 rounded-lg overflow-x-auto border border-white/5">
              <div>state = <span className="text-cyan-400">{`{`}</span></div>
              <div className="pl-3 text-cyan-400">user: {`{`}</div>
              <div className="pl-6 text-cyan-400">profile: {`{`}</div>
              <div className="pl-9 text-cyan-400 font-bold">info: {`{`}</div>
              <div className="pl-12 text-white flex items-center gap-2">
                <span>age:</span> 
                <span className="text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded transition-all">{age}</span>
              </div>
              <div className="pl-9 text-cyan-400">{`}`}</div>
              <div className="pl-6 text-cyan-400">{`}`}</div>
              <div className="pl-3 text-cyan-400">{`}`}</div>
              <div><span className="text-cyan-400">{`}`}</span></div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <button 
              onClick={handleIncrement}
              className="flex-1 py-1.5 bg-green-600 hover:bg-green-500 text-black text-xs font-bold rounded font-display transition-all"
            >
              Increment Age
            </button>
            <button 
              onClick={() => { setAge(25); setLog([]); }}
              className="px-3 py-1.5 border border-white/10 hover:bg-white/5 text-xs text-white/60 rounded transition-all"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="bg-[#161616]/70 rounded-xl p-4 border border-white/5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex border-b border-white/10">
              <button 
                onClick={() => setUpdateMethod('manual')}
                className={`flex-1 pb-1 text-xs font-bold uppercase transition-all border-b-2 font-display ${updateMethod === 'manual' ? 'border-cyan-500 text-white font-semibold' : 'border-transparent text-white/40'}`}
              >
                Manual Spread
              </button>
              <button 
                onClick={() => setUpdateMethod('immer')}
                className={`flex-1 pb-1 text-xs font-bold uppercase transition-all border-b-2 font-display ${updateMethod === 'immer' ? 'border-cyan-500 text-white font-semibold' : 'border-transparent text-white/40'}`}
              >
                Immer Middleware
              </button>
            </div>

            {updateMethod === 'manual' ? (
              <pre className="text-[10px] font-mono text-cyan-300 bg-black/60 p-2 rounded border border-white/5 leading-relaxed overflow-x-auto h-24">
{`set((state) => ({
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      info: {
        ...state.user.profile.info,
        age: state.user.profile.info.age + 1
      }
    }
  }
}))`}
              </pre>
            ) : (
              <pre className="text-[10px] font-mono text-cyan-300 bg-black/60 p-2 rounded border border-white/5 leading-relaxed overflow-x-auto h-24">
{`set((state) => {
  // Directly mutate!
  // Immer converts this to immutable
  state.user.profile.info.age++;
})`}
              </pre>
            )}

            <div className="space-y-1">
              <div className="text-[9px] uppercase font-bold text-white/40">Action Memory Trace</div>
              <div className="bg-black/50 rounded p-2 h-14 overflow-y-auto text-[10px] font-mono text-white/50 space-y-1 border border-white/5">
                {log.length === 0 ? (
                  <span className="text-white/20 italic pl-1 text-[9px]">No mutations executed yet</span>
                ) : (
                  log.map((line, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      <span className="text-cyan-500 font-bold">✓</span> {line}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================
   5. TAB PERSIST DIAGRAM (Cross-tab synchronizer)
   ========================================================== */
const TabPersistDiagram: React.FC = () => {
  const [tabAValue, setTabAValue] = useState<string>('Light');
  const [tabBValue, setTabBValue] = useState<string>('Light');
  const [storageValue, setStorageValue] = useState<string>('Light');
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [lastEvent, setLastEvent] = useState<string>('None');

  const updateTabA = (val: string) => {
    setTabAValue(val);
    setStorageValue(val);
    setLastEvent('Tab A changed state. Serialized & saved to localStorage.');
    
    if (syncEnabled) {
      setTimeout(() => {
        setTabBValue(val);
        setLastEvent('Storage event fired in Tab B! Instantly synchronized state.');
      }, 450);
    }
  };

  const manualSyncTabB = () => {
    setTabBValue(storageValue);
    setLastEvent('Manual .rehydrate() method triggered in Tab B.');
  };

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 font-display">
          <Database className="w-3.5 h-3.5 text-cyan-500" /> Storage Tab Synchronizer
        </span>
        <label className="flex items-center gap-1.5 cursor-pointer text-xs">
          <input 
            type="checkbox" 
            checked={syncEnabled} 
            onChange={(e) => setSyncEnabled(e.target.checked)}
            className="rounded border-white/20 bg-black text-cyan-500 accent-cyan-500 focus:ring-0 w-3.5 h-3.5"
          />
          <span className="text-[10px] text-white/50 uppercase font-mono">Real-time tab binding</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
        {/* Tab A */}
        <div className="bg-[#121212]/90 p-3 rounded-xl border border-white/5 flex flex-col justify-between text-center relative overflow-hidden">
          <div className="absolute top-1 left-2 text-[8px] font-mono text-cyan-400 bg-cyan-950/40 px-1.5 py-0.5 rounded uppercase font-bold">Browser Tab 1</div>
          <div className="space-y-1 mt-4">
            <div className="text-xs font-bold text-white font-display">Tab A Controller</div>
            <p className="text-[10px] text-white/40">Triggers write actions</p>
          </div>
          
          <div className="bg-black/40 py-2.5 rounded border border-white/5 text-xs font-mono my-2">
            theme: <span className="font-bold text-cyan-400">{tabAValue}</span>
          </div>

          <div className="flex justify-center gap-1">
            {['Light', 'Dark', 'Sepia'].map(val => (
              <button 
                key={val}
                onClick={() => updateTabA(val)}
                className={`px-2 py-1 text-[10px] rounded border font-mono transition-all ${tabAValue === val ? 'bg-cyan-600 border-cyan-500 text-black font-bold' : 'border-white/10 text-white/50 hover:bg-white/5'}`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        {/* Local Storage Database */}
        <div className="bg-[#0c0c0c] p-3 rounded-xl border border-dashed border-white/10 flex flex-col justify-center items-center text-center">
          <Database className="w-7 h-7 text-white/20 mb-1.5 animate-pulse-subtle" />
          <div className="text-[11px] font-bold text-white font-display">localStorage</div>
          <div className="bg-black text-green-400 font-mono text-[11px] px-2 py-1 rounded border border-white/5 w-full mt-2 select-all">
            "theme-storage": "{`{theme:"${storageValue}"}`}"
          </div>
        </div>

        {/* Tab B */}
        <div className="bg-[#121212]/90 p-3 rounded-xl border border-white/5 flex flex-col justify-between text-center relative overflow-hidden">
          <div className="absolute top-1 right-2 text-[8px] font-mono text-cyan-400 bg-cyan-950/40 px-1.5 py-0.5 rounded uppercase font-bold">Browser Tab 2</div>
          <div className="space-y-1 mt-4">
            <div className="text-xs font-bold text-white font-display">Tab B Observer</div>
            <p className="text-[10px] text-white/40">Receives background storage sync</p>
          </div>

          <div className="bg-black/40 py-2.5 rounded border border-white/5 text-xs font-mono my-2">
            theme: <span className="font-bold text-cyan-400">{tabBValue}</span>
          </div>

          <div>
            {tabBValue !== storageValue ? (
              <button 
                onClick={manualSyncTabB}
                className="w-full py-1.5 bg-cyan-600 hover:bg-cyan-500 text-black font-bold text-[10px] rounded flex items-center justify-center gap-1 font-display animate-bounce"
              >
                <RefreshCw className="w-3 h-3 animate-spin" /> Sync Storage
              </button>
            ) : (
              <div className="text-[10px] text-white/30 italic py-1">State synchronized in background</div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-black/60 rounded p-2 text-[10px] font-mono text-white/60 flex items-center justify-between border border-white/5">
        <span className="text-white/40">Event Tracker:</span>
        <span className="text-cyan-400">{lastEvent}</span>
      </div>
    </div>
  );
};

/* ==========================================================
   6. ASYNC LOADER DIAGRAM (Async store workflow)
   ========================================================== */
const AsyncLoaderDiagram: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [data, setData] = useState<string[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const simulateFetch = (shouldSucceed: boolean) => {
    setStatus('loading');
    setData(null);
    setErrorMessage(null);

    setTimeout(() => {
      if (shouldSucceed) {
        setStatus('success');
        setData(['Core State (v1)', 'Auth Bundle (v4.1)', 'Telemetry (OK)']);
      } else {
        setStatus('error');
        setErrorMessage('Failed to connect to microservice (status 503)');
      }
    }, 1400);
  };

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 font-display">
          <Clock className="w-3.5 h-3.5 text-cyan-500" /> Async Data Lifecycle
        </span>
        <div className="text-[10px] text-white/40 font-mono">Observe loading, success, and fallback handling</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        <div className="bg-[#121212]/90 rounded-xl p-4 border border-white/5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="text-xs font-bold text-white font-display">Trigger API Simulation</div>
            <p className="text-[11px] text-white/50 leading-relaxed">
              Standard async calls operate within normal actions. There is no need for dispatchers, sagas, or complicated promise configuration.
            </p>

            <div className="flex flex-col gap-2 pt-1.5">
              <button 
                onClick={() => simulateFetch(true)}
                disabled={status === 'loading'}
                className="py-1.5 bg-green-600 hover:bg-green-500 disabled:opacity-40 text-black text-xs font-bold rounded font-display transition-all"
              >
                Fetch User Data (Success)
              </button>
              <button 
                onClick={() => simulateFetch(false)}
                disabled={status === 'loading'}
                className="py-1.5 bg-red-950 hover:bg-red-900 text-red-200 border border-red-500/30 disabled:opacity-40 text-xs font-bold rounded font-display transition-all"
              >
                Fetch User Data (Fail 503)
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-white/5 text-[10px] text-white/40 flex items-center justify-between font-mono">
            <span>Updating phase:</span>
            <span className="text-cyan-400">set({`{ status: 'loading' }`})</span>
          </div>
        </div>

        <div className="bg-[#161616]/70 rounded-xl p-4 border border-white/5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="text-xs font-bold text-white font-display flex justify-between items-center">
              <span>Observable Store State</span>
              <span className={`text-[9px] px-2 py-0.5 rounded font-mono uppercase font-bold border ${
                status === 'idle' ? 'bg-white/5 border-white/5 text-white/40' :
                status === 'loading' ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 animate-pulse' :
                status === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400' :
                'bg-red-500/10 border-red-500/30 text-red-400'
              }`}>{status}</span>
            </div>

            <div className="space-y-1.5 font-mono text-xs bg-black/40 p-3 rounded-lg h-32 flex flex-col justify-center border border-white/5">
              <div className="flex justify-between border-b border-white/5 pb-1 text-[11px]">
                <span className="text-white/40">isLoading:</span>
                <span className={status === 'loading' ? 'text-cyan-400 font-bold' : 'text-white/60'}>
                  {status === 'loading' ? 'true' : 'false'}
                </span>
              </div>
              
              <div className="flex justify-between border-b border-white/5 pb-1 text-[11px]">
                <span className="text-white/40">error:</span>
                <span className={status === 'error' ? 'text-red-400 font-bold truncate max-w-[150px]' : 'text-white/60'}>
                  {status === 'error' ? `"${errorMessage}"` : 'null'}
                </span>
              </div>

              <div className="flex justify-between text-[11px]">
                <span className="text-white/40">data:</span>
                <span className={status === 'success' ? 'text-green-400 font-bold' : 'text-white/60'}>
                  {status === 'success' ? `[${data?.map(d => `"${d}"`).join(', ')}]` : 'null'}
                </span>
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-center pt-2 border-t border-white/5 text-white/30">
            {status === 'loading' ? 'Hydrating store state...' : status === 'success' ? 'Success! Subscribers re-rendered.' : status === 'error' ? 'Exception caught inside actions.' : 'Click a trigger button on the left'}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================
   7. HISTORY UNDO DIAGRAM (Custom undo redo stacks or zundo)
   ========================================================== */
const HistoryUndoDiagram: React.FC = () => {
  const [bears, setBears] = useState<number>(0);
  const [past, setPast] = useState<number[]>([]);
  const [future, setFuture] = useState<number[]>([]);

  const incrementBears = () => {
    setPast(prev => [...prev, bears]);
    setBears(b => b + 1);
    setFuture([]); // clear future
  };

  const decrementBears = () => {
    if (bears <= 0) return;
    setPast(prev => [...prev, bears]);
    setBears(b => b - 1);
    setFuture([]);
  };

  const undo = () => {
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    setPast(prev => prev.slice(0, -1));
    setFuture(prev => [bears, ...prev]);
    setBears(previous);
  };

  const redo = () => {
    if (future.length === 0) return;
    const nextVal = future[0];
    setFuture(prev => prev.slice(1));
    setPast(prev => [...prev, bears]);
    setBears(nextVal);
  };

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 font-display">
          <History className="w-3.5 h-3.5 text-cyan-500" /> State History Timeline
        </span>
        <div className="text-[10px] text-white/40 font-mono">Custom past/present/future stacks</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        <div className="bg-[#121212]/90 rounded-xl p-4 border border-white/5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="text-xs font-bold text-white font-display">Mutator Workspace</div>
            <p className="text-[11px] text-white/50 leading-relaxed">
              Every action appends a backup of the previous snapshot onto the history stack.
            </p>

            <div className="bg-black/30 py-5 rounded-lg flex flex-col items-center justify-center border border-white/5 relative">
              <div className="absolute top-1 left-2 text-[8px] font-mono text-white/30 uppercase">Active State</div>
              <div className="text-2xl font-bold text-white mb-2 font-display">{bears} Items</div>
              
              <div className="flex gap-2">
                <button 
                  onClick={decrementBears}
                  disabled={bears === 0}
                  className="w-8 h-8 rounded-full border border-white/10 hover:bg-white/5 flex items-center justify-center text-white disabled:opacity-30 transition-all"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={incrementBears}
                  className="w-8 h-8 rounded-full bg-cyan-600 hover:bg-cyan-500 text-black flex items-center justify-center font-bold transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button 
              onClick={undo}
              disabled={past.length === 0}
              className="flex-1 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 text-white font-bold rounded text-xs flex items-center justify-center gap-1 font-display transition-all"
            >
              <Undo className="w-3 h-3" /> Undo
            </button>
            <button 
              onClick={redo}
              disabled={future.length === 0}
              className="flex-1 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 text-white font-bold rounded text-xs flex items-center justify-center gap-1 font-display transition-all"
            >
              <Redo className="w-3 h-3" /> Redo
            </button>
          </div>
        </div>

        <div className="bg-[#161616]/70 rounded-xl p-4 border border-white/5 flex flex-col justify-between">
          <div className="space-y-3.5">
            <div>
              <div className="text-[10px] uppercase font-bold text-white/40 mb-1 flex justify-between">
                <span>Past Stack (Undo History)</span>
                <span className="font-mono text-cyan-400">[{past.length}]</span>
              </div>
              <div className="flex gap-1.5 bg-black/40 p-2 rounded-lg h-10 items-center overflow-x-auto border border-white/5">
                {past.length === 0 ? (
                  <span className="text-[9px] text-white/20 italic pl-1">No items</span>
                ) : (
                  past.map((val, idx) => (
                    <div key={idx} className="bg-cyan-950/80 border border-cyan-800/40 text-cyan-400 font-mono text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap">
                      {val} Items
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 justify-center">
              <div className="h-[1px] bg-white/5 flex-1"></div>
              <div className="text-[9px] font-mono uppercase text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">Current: {bears}</div>
              <div className="h-[1px] bg-white/5 flex-1"></div>
            </div>

            <div>
              <div className="text-[10px] uppercase font-bold text-white/40 mb-1 flex justify-between">
                <span>Future Stack (Redo History)</span>
                <span className="font-mono text-cyan-400">[{future.length}]</span>
              </div>
              <div className="flex gap-1.5 bg-black/40 p-2 rounded-lg h-10 items-center overflow-x-auto border border-white/5">
                {future.length === 0 ? (
                  <span className="text-[9px] text-white/20 italic pl-1">No items</span>
                ) : (
                  future.map((val, idx) => (
                    <div key={idx} className="bg-cyan-950/40 border border-cyan-900/40 text-cyan-400 font-mono text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap">
                      {val} Items
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="text-[9px] text-white/30 text-center pt-2 border-t border-white/5">
            Clicking Undo pops from past stack, pushes current value to future, and restores.
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================
   8. STORE SLICES DIAGRAM (Store modular slicing setup)
   ========================================================== */
const StoreSlicesDiagram: React.FC = () => {
  const [user, setUser] = useState({ name: 'Bear', role: 'Developer' });
  const [theme, setTheme] = useState({ mode: 'dark', fontSize: 14 });

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 font-display">
          <Layers className="w-3.5 h-3.5 text-cyan-500" /> Sliced Store Architecture
        </span>
        <div className="text-[10px] text-white/40 font-mono">Composition of separate state slices</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
        {/* User Slice */}
        <div className="bg-[#121212]/90 p-3 rounded-xl border border-white/5 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex justify-between items-center pb-1 border-b border-white/5">
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-1.5 py-0.5 rounded uppercase font-bold">createUserSlice</span>
              <span className="text-[9px] text-white/30 font-mono">userSlice.ts</span>
            </div>
            <p className="text-[10px] text-white/50">Contains authentication, profiles, permissions states.</p>
            
            <div className="space-y-1 pt-1 text-xs">
              <label className="text-[9px] uppercase font-bold text-white/40">Username</label>
              <input 
                type="text" 
                value={user.name} 
                onChange={(e) => setUser(s => ({ ...s, name: e.target.value }))}
                className="w-full bg-black/50 border border-white/10 rounded px-2 py-1 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
              />
              <label className="text-[9px] uppercase font-bold text-white/40 block mt-2">Role</label>
              <select 
                value={user.role} 
                onChange={(e) => setUser(s => ({ ...s, role: e.target.value }))}
                className="w-full bg-black/50 border border-white/10 rounded px-2 py-1 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Developer">Developer</option>
                <option value="Lead Scientist">Lead Scientist</option>
                <option value="Bear Ranger">Bear Ranger</option>
              </select>
            </div>
          </div>
          
          <div className="text-[9px] font-mono text-white/30 border-t border-white/5 pt-1.5 mt-2">
            State subset: <span className="text-cyan-400">{`{ name, role }`}</span>
          </div>
        </div>

        {/* Theme Slice */}
        <div className="bg-[#121212]/90 p-3 rounded-xl border border-white/5 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex justify-between items-center pb-1 border-b border-white/5">
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-1.5 py-0.5 rounded uppercase font-bold">createUIConfigSlice</span>
              <span className="text-[9px] text-white/30 font-mono">uiSlice.ts</span>
            </div>
            <p className="text-[10px] text-white/50">Controls visual states, fonts, modals, layout presets.</p>
            
            <div className="space-y-2 pt-1 text-xs">
              <div>
                <label className="text-[9px] uppercase font-bold text-white/40 block mb-1">UI Mode</label>
                <div className="flex gap-1">
                  {['dark', 'light'].map(m => (
                    <button 
                      key={m}
                      onClick={() => setTheme(s => ({ ...s, mode: m }))}
                      className={`flex-1 py-1 rounded text-[10px] font-mono capitalize border ${theme.mode === m ? 'bg-cyan-950/40 border-cyan-500 text-cyan-300 font-bold' : 'border-white/5 hover:bg-white/5 text-white/50'}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[9px] uppercase font-bold text-white/40 block">Font Size ({theme.fontSize}px)</label>
                <input 
                  type="range" 
                  min="12" 
                  max="20" 
                  value={theme.fontSize}
                  onChange={(e) => setTheme(s => ({ ...s, fontSize: Number(e.target.value) }))}
                  className="w-full accent-pink-500 mt-1"
                />
              </div>
            </div>
          </div>

          <div className="text-[9px] font-mono text-white/30 border-t border-white/5 pt-1.5 mt-2">
            State subset: <span className="text-cyan-400">{`{ mode, fontSize }`}</span>
          </div>
        </div>

        {/* Combined Store */}
        <div className="bg-[#1c1c1c] p-3 rounded-xl border border-cyan-500/20 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex justify-between items-center pb-1 border-b border-white/5">
              <span className="text-[10px] font-mono text-white bg-cyan-600 px-1.5 py-0.5 rounded uppercase font-bold">useBoundStore</span>
              <span className="text-[9px] text-white/40 font-mono">store.ts</span>
            </div>
            <p className="text-[10px] text-white/50">Central entrypoint that spreads both slice creators.</p>

            <div className="bg-black/50 rounded p-2.5 font-mono text-[10px] text-white/60 space-y-1.5 border border-white/5">
              <div>useBoundStore: <span className="text-yellow-400">{`{`}</span></div>
              <div className="pl-3 text-cyan-400">name: <span className="text-white">"{user.name}"</span></div>
              <div className="pl-3 text-cyan-400">role: <span className="text-white">"{user.role}"</span></div>
              <div className="pl-3 text-cyan-400">mode: <span className="text-white">"{theme.mode}"</span></div>
              <div className="pl-3 text-cyan-400">fontSize: <span className="text-white">{theme.fontSize}</span></div>
              <div className="text-yellow-400">{`}`}</div>
            </div>
          </div>

          <div className="text-[9px] text-white/40 leading-snug border-t border-white/5 pt-1.5 mt-2">
            💡 Components use a single hook but import selectors from their respective modular concerns!
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================
   9. OUTSIDE REACT DIAGRAM (Using stores outside components)
   ========================================================== */
const OutsideReactDiagram: React.FC = () => {
  const [storeVal, setStoreVal] = useState(10);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'Module initialized: authStore',
    'useAuthStore.getState() -> current token loaded'
  ]);

  const mutateOutsideReact = (val: number) => {
    // Simulating useStore.setState({ count: val })
    setStoreVal(val);
    setTerminalLogs(prev => [
      `[Terminal Run]: useStore.setState({ value: ${val} })`,
      `[Store Event]: Subscriber listener triggered!`,
      `[Render]: React UI updated automatically.`,
      ...prev
    ].slice(0, 4));
  };

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 font-display">
          <Terminal className="w-3.5 h-3.5 text-cyan-500" /> Non-React Context execution
        </span>
        <div className="text-[10px] text-white/40 font-mono">Manipulate store from plain JS files</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {/* Terminal / Plain JavaScript Environment */}
        <div className="bg-[#121212]/90 rounded-xl p-4 border border-white/5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white font-display flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-cyan-500" /> plain-javascript-util.js
              </span>
              <span className="text-[9px] font-mono text-white/20 bg-white/5 px-2 py-0.5 rounded border border-white/5">NODE / JS MODULE</span>
            </div>
            
            <p className="text-[10px] text-white/50 leading-relaxed">
              No React Hook limits here. You can invoke <span className="font-mono text-cyan-400">getState()</span> or <span className="font-mono text-cyan-400">setState()</span> anywhere in standard files, routers, or animation tickers.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <button 
                onClick={() => mutateOutsideReact(storeVal + 5)}
                className="px-2.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-black rounded text-[11px] font-mono font-bold transition-all"
              >
                setState({`{ value: ${storeVal + 5} }`})
              </button>
              <button 
                onClick={() => mutateOutsideReact(0)}
                className="px-2.5 py-1.5 border border-white/10 hover:bg-white/5 text-white/60 rounded text-[11px] font-mono transition-all"
              >
                setState({`{ value: 0 }`})
              </button>
            </div>
          </div>

          <div className="bg-black/50 p-2 rounded text-[10px] font-mono text-white/40 space-y-1 h-20 overflow-y-auto border border-white/5">
            {terminalLogs.map((log, idx) => (
              <div key={idx} className={idx === 0 ? 'text-cyan-300' : ''}>&gt; {log}</div>
            ))}
          </div>
        </div>

        {/* Active React View */}
        <div className="bg-[#161616]/70 rounded-xl p-4 border border-white/5 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs font-bold text-white font-display flex items-center gap-1.5">
              <Monitor className="w-4 h-4 text-green-500" /> ActiveReactUIComponent.tsx
            </span>

            <div className="bg-black/30 border border-white/5 rounded-lg p-5 text-center">
              <span className="text-[9px] text-white/30 uppercase tracking-wider font-mono">React Hook Subscription</span>
              <div className="text-3xl font-extrabold text-white font-display mt-1">{storeVal}</div>
              <pre className="text-[10px] text-green-400 font-mono mt-2 inline-block bg-green-950/20 border border-green-800/20 px-2 py-0.5 rounded">
                const val = useStore(s =&gt; s.value);
              </pre>
            </div>
          </div>

          <div className="text-[10px] text-white/40 leading-relaxed border-t border-white/5 pt-2 mt-2">
            💡 React UI updates instantly because the external state changes notify the hook subscription in Browser memory.
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================
   10. COMPUTED VALUES DIAGRAM (On-the-fly vs cached getters)
   ========================================================== */
const ComputedValuesDiagram: React.FC = () => {
  const [items, setItems] = useState<{ name: string; price: number }[]>([
    { name: 'Bear Mug', price: 15 },
    { name: 'Zustand Cap', price: 25 },
  ]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState(10);

  const addItem = () => {
    if (!newItemName) return;
    setItems([...items, { name: newItemName, price: newItemPrice }]);
    setNewItemName('');
  };

  const removeItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 font-display">
          <Layers className="w-3.5 h-3.5 text-cyan-500" /> Computed State derivation
        </span>
        <div className="text-[10px] text-white/40 font-mono">Dynamic vs persistent derived selectors</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {/* State / Base values input */}
        <div className="bg-[#121212]/90 rounded-xl p-4 border border-white/5 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs font-bold text-white font-display">Active Store Cart Items</span>
            
            <div className="space-y-1.5 max-h-32 overflow-y-auto">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs bg-black/30 p-1.5 rounded border border-white/5 font-mono">
                  <span>{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-bold">${item.price}</span>
                    <button onClick={() => removeItem(idx)} className="text-red-400 hover:text-red-300 font-bold text-[10px]">Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-1.5 pt-2">
              <input 
                type="text" 
                placeholder="Item name" 
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="bg-black border border-white/10 rounded px-2 py-1 text-xs text-white placeholder-white/30 flex-1 focus:outline-none focus:border-cyan-500 font-mono"
              />
              <input 
                type="number" 
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(Number(e.target.value))}
                className="bg-black border border-white/10 rounded px-2 py-1 text-xs text-white w-14 focus:outline-none focus:border-cyan-500 font-mono"
              />
              <button 
                onClick={addItem}
                className="bg-cyan-600 hover:bg-cyan-500 text-black font-bold text-xs px-3 rounded font-display transition-all"
              >
                Add
              </button>
            </div>
          </div>

          <div className="text-[10px] text-white/40 border-t border-white/5 pt-1.5 mt-2">
            State base contains array: <span className="font-mono text-cyan-400">items: CartItem[]</span>
          </div>
        </div>

        {/* Derived selectors comparison */}
        <div className="bg-[#161616]/70 rounded-xl p-4 border border-white/5 flex flex-col justify-between">
          <div className="space-y-3.5">
            <span className="text-xs font-bold text-white font-display">Derived Output Calculations</span>

            <div className="space-y-2">
              {/* Option 1 */}
              <div className="p-2 bg-black/40 border border-white/5 rounded-lg">
                <span className="text-[9px] uppercase tracking-wider font-bold text-cyan-400 font-mono">1. Read-time Selector (Reactive)</span>
                <div className="text-lg font-bold text-white mt-0.5 font-display">${totalPrice}</div>
                <pre className="text-[9px] font-mono text-white/40 mt-1">
                  useStore(s =&gt; s.items.reduce((a, b) =&gt; a + b.price, 0))
                </pre>
              </div>

              {/* Option 2 */}
              <div className="p-2 bg-black/40 border border-white/5 rounded-lg">
                <span className="text-[9px] uppercase tracking-wider font-bold text-cyan-400 font-mono">2. Store Getter Method (On-Demand)</span>
                <div className="text-lg font-bold text-white mt-0.5 font-display">${totalPrice}</div>
                <pre className="text-[9px] font-mono text-white/40 mt-1">
                  getTotalPrice() =&gt; get().items.reduce(...)
                </pre>
              </div>
            </div>
          </div>

          <div className="text-[9px] text-white/30 leading-normal border-t border-white/5 pt-1.5">
            💡 Selectors run automatically when items update, while getter methods can be evaluated on-demand inside actions asynchronously.
          </div>
        </div>
      </div>
    </div>
  );
};
