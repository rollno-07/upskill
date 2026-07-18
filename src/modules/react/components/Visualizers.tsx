import React, { useState, useEffect, useRef, useTransition, useDeferredValue } from 'react';
import { 
  Play, RefreshCw, AlertCircle, Plus, Trash2, ArrowRight, Zap, 
  Settings, Layers, Cpu, Database, CpuIcon, CheckCircle2, XCircle, UserCheck
} from 'lucide-react';

interface VisualizerProps {
  type: string;
}

export default function Visualizer({ type }: VisualizerProps) {
  switch (type) {
    case 'vdom':
      return <VDomDiffingSimulator />;
    case 'dataflow':
      return <DataFlowSimulator />;
    case 'lifecycle':
      return <LifecycleTimelineVisualizer />;
    case 'forms':
      return <FormSandbox />;
    case 'debounce':
      return <DebounceClosureVisualizer />;
    case 'concurrent':
      return <ConcurrentRenderSimulator />;
    case 'keys':
      return <KeysListSimulator />;
    case 'ssr':
      return <SSRHydrationTimeline />;
    case 'reducer':
      return <ReducerStateMachineVisualizer />;
    case 'reconciliation':
      return <ReconciliationKeyResetVisualizer />;
    default:
      return (
        <div className="flex flex-col items-center justify-center h-full text-zinc-500">
          <Layers className="w-12 h-12 mb-2 animate-pulse text-zinc-600" />
          <p className="text-xs">Select a concept to load the interactive diagram</p>
        </div>
      );
  }
}

// 1. Virtual DOM Diffing Simulator
function VDomDiffingSimulator() {
  const [nodes, setNodes] = useState([
    { id: '1', label: 'App Container', type: 'div', className: 'border-zinc-800', isChanged: false },
    { id: '2', label: 'Header Card', type: 'header', className: 'border-zinc-800', isChanged: false },
    { id: '3', label: 'Counter Component', type: 'div', className: 'border-cyan-900/30', isChanged: false, value: 'Count: 0' },
    { id: '4', label: 'Dynamic Footer', type: 'footer', className: 'border-zinc-800', isChanged: false }
  ]);
  const [reconciling, setReconciling] = useState(false);
  const [log, setLog] = useState<string[]>(['Virtual DOM aligned with Real DOM. Idle.']);

  const triggerUpdate = (nodeId: string, newValue: string) => {
    if (reconciling) return;
    setReconciling(true);
    setLog(prev => [...prev, `State change triggered: Node ${nodeId} value updated to "${newValue}".`]);

    // 1. Update Virtual node
    setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, value: newValue, isChanged: true } : n));

    setTimeout(() => {
      setLog(prev => [...prev, 'Diffing Virtual Tree... Found 1 modified property.']);
    }, 400);

    setTimeout(() => {
      setLog(prev => [...prev, 'Reconciling updates... Modifying className and child nodes on the Real DOM.']);
    }, 900);

    setTimeout(() => {
      setNodes(prev => prev.map(n => ({ ...n, isChanged: false })));
      setReconciling(false);
      setLog(prev => [...prev, 'Sync complete! Real DOM updated cleanly without tearing down other elements.']);
    }, 1500);
  };

  const swapNodeType = (nodeId: string) => {
    if (reconciling) return;
    setReconciling(true);
    setLog(prev => [...prev, `Structure change triggered: Node ${nodeId} changing type div -> section.`]);

    // Update Virtual node with new type
    setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, type: n.type === 'div' ? 'section' : 'div', isChanged: true } : n));

    setTimeout(() => {
      setLog(prev => [...prev, 'Diffing algorithm detects different node type! Old node MUST be unmounted.']);
    }, 500);

    setTimeout(() => {
      setLog(prev => [...prev, 'Tearing down old node sub-tree. Mounting clean replacement element...']);
    }, 1000);

    setTimeout(() => {
      setNodes(prev => prev.map(n => ({ ...n, isChanged: false })));
      setReconciling(false);
      setLog(prev => [...prev, 'Sub-tree fully rebuilt. Mount complete.']);
    }, 1800);
  };

  return (
    <div className="flex flex-col h-full justify-between p-6 bg-[#0E0E11] rounded-2xl border border-zinc-800">
      <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-500" />
          <h3 className="text-sm font-semibold text-white">Reconciliation & Diffing Engine</h3>
        </div>
        <span className={`px-2 py-0.5 text-[10px] rounded border ${reconciling ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 animate-pulse' : 'bg-zinc-800 border-zinc-700 text-zinc-400'}`}>
          {reconciling ? 'DIFFING STATE' : 'IDLE / DESKTOP'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 my-4 flex-1 overflow-y-auto">
        {/* Virtual Tree Representation */}
        <div className="p-4 bg-[#121216] rounded-xl border border-zinc-800/60 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Memory: Virtual DOM</h4>
            <div className="space-y-2">
              {nodes.map(node => (
                <div 
                  key={node.id} 
                  className={`p-2.5 rounded-lg border text-left transition-all duration-300 ${
                    node.isChanged 
                      ? 'bg-cyan-600/20 border-cyan-500 shadow-[0_0_12px_rgba(59,130,246,0.2)]' 
                      : 'bg-zinc-900/60 border-zinc-800'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-mono text-cyan-400">&lt;{node.type}&gt;</span>
                    <span className="text-[10px] text-zinc-500 font-mono">key={node.id}</span>
                  </div>
                  <p className="text-xs font-semibold text-white mt-1">{node.label}</p>
                  {node.value && <p className="text-[11px] text-zinc-400 mt-1 italic">{node.value}</p>}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-800/40 flex gap-2">
            <button 
              onClick={() => triggerUpdate('3', `Count: ${Math.floor(Math.random() * 100)}`)}
              disabled={reconciling}
              className="flex-1 text-[11px] bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-medium py-1.5 px-2 rounded-lg transition-colors"
            >
              Update State
            </button>
            <button 
              onClick={() => swapNodeType('1')}
              disabled={reconciling}
              className="flex-1 text-[11px] bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-zinc-300 font-medium py-1.5 px-2 rounded-lg transition-colors border border-zinc-700"
            >
              Swap Outer Type
            </button>
          </div>
        </div>

        {/* Real DOM Tree Representation */}
        <div className="p-4 bg-[#121216] rounded-xl border border-zinc-800/60 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Browser: Real DOM</h4>
            <div className="space-y-2">
              {nodes.map(node => (
                <div 
                  key={node.id} 
                  className={`p-2.5 rounded-lg border text-left transition-all duration-300 ${
                    reconciling && node.isChanged 
                      ? 'bg-emerald-600/20 border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.2)] animate-pulse' 
                      : 'bg-zinc-950/40 border-zinc-800/60'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-mono text-emerald-400">div.{node.type}</span>
                  </div>
                  <p className="text-xs font-semibold text-zinc-300 mt-1">{node.label}</p>
                  {node.value && <p className="text-[11px] text-emerald-400 mt-1 italic font-mono">{node.value}</p>}
                </div>
              ))}
            </div>
          </div>
          <div className="text-[10px] text-zinc-500 p-2 text-center bg-zinc-900/40 rounded-lg border border-zinc-800/40">
            Green flashes represent real layout paints committed by ReactDOM.
          </div>
        </div>
      </div>

      {/* Logs */}
      <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800/80 font-mono text-[11px] text-zinc-400 text-left h-24 overflow-y-auto">
        {log.slice(-3).map((item, idx) => (
          <div key={idx} className={idx === 2 ? 'text-cyan-400' : 'opacity-60'}>
            &gt; {item}
          </div>
        ))}
      </div>
    </div>
  );
}

// 2. State vs Props & Prop Drilling vs Context API
function DataFlowSimulator() {
  const [useContextAPI, setUseContextAPI] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [pulseNode, setPulseNode] = useState<string | null>(null);
  const [flashLogs, setFlashLogs] = useState<string[]>(['Ready to demonstrate state distribution paths.']);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    
    if (!useContextAPI) {
      // Prop Drilling Path
      setPulseNode('app');
      setFlashLogs(prev => [...prev, 'Theme toggled in [App] (Source state)']);
      
      setTimeout(() => {
        setPulseNode('header');
        setFlashLogs(prev => [...prev, '[Header] component re-renders and forwards prop (unnecessary render)']);
      }, 300);

      setTimeout(() => {
        setPulseNode('nav');
        setFlashLogs(prev => [...prev, '[Nav] component re-renders and forwards prop (unnecessary render)']);
      }, 600);

      setTimeout(() => {
        setPulseNode('button');
        setFlashLogs(prev => [...prev, '[ThemeButton] receives new theme props and re-renders successfully!']);
      }, 900);

      setTimeout(() => {
        setPulseNode(null);
      }, 1400);
    } else {
      // Context API Direct Teleportation
      setPulseNode('app-ctx');
      setFlashLogs(prev => [...prev, 'Theme toggled in [App] (Context.Provider)']);
      
      setTimeout(() => {
        setPulseNode('button-ctx');
        setFlashLogs(prev => [...prev, '[ThemeButton] intercepts context directly! Zero drill overhead.']);
      }, 400);

      setTimeout(() => {
        setPulseNode(null);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between p-6 bg-[#0E0E11] rounded-2xl border border-zinc-800">
      <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-cyan-500" />
          <h3 className="text-sm font-semibold text-white">Data Propagation Simulator</h3>
        </div>
        <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800">
          <button 
            onClick={() => { setUseContextAPI(false); setFlashLogs(['Switched to Prop Drilling Mode.']); }}
            className={`px-3 py-1 text-[11px] font-medium rounded-md transition-colors ${!useContextAPI ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            Prop Drill
          </button>
          <button 
            onClick={() => { setUseContextAPI(true); setFlashLogs(['Switched to Context API Mode.']); }}
            className={`px-3 py-1 text-[11px] font-medium rounded-md transition-colors ${useContextAPI ? 'bg-cyan-600 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            Context API
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center my-6 items-center">
        {/* Visual Component Tree */}
        <div className="space-y-4 w-full max-w-sm">
          {/* Root App */}
          <div className={`p-3 rounded-lg text-center border font-mono transition-all duration-300 ${
            pulseNode?.includes('app') 
              ? 'bg-cyan-600/30 border-cyan-500 shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white scale-[1.02]' 
              : 'bg-zinc-900 border-zinc-800 text-zinc-300'
          }`}>
            <p className="text-xs font-bold">App Component</p>
            <span className="text-[10px] text-zinc-500">state = {`{ theme: "${theme}" }`}</span>
          </div>

          <div className="flex justify-center">
            <div className="w-0.5 h-6 bg-zinc-800"></div>
          </div>

          {/* Intermediate Component 1: Header */}
          <div className={`p-3 rounded-lg text-center border font-mono transition-all duration-300 ${
            useContextAPI 
              ? 'bg-zinc-950/40 border-zinc-900 text-zinc-600' 
              : pulseNode === 'header' 
                ? 'bg-cyan-600/20 border-cyan-500 text-cyan-400 scale-[1.02]' 
                : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-400'
          }`}>
            <p className="text-xs font-bold">Header Component</p>
            <span className="text-[9px] uppercase tracking-wider">{useContextAPI ? 'Bypassed (Props clean)' : 'forwards: props.theme'}</span>
          </div>

          <div className="flex justify-center">
            <div className="w-0.5 h-6 bg-zinc-800"></div>
          </div>

          {/* Intermediate Component 2: Nav */}
          <div className={`p-3 rounded-lg text-center border font-mono transition-all duration-300 ${
            useContextAPI 
              ? 'bg-zinc-950/40 border-zinc-900 text-zinc-600' 
              : pulseNode === 'nav' 
                ? 'bg-cyan-600/20 border-cyan-500 text-cyan-400 scale-[1.02]' 
                : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-400'
          }`}>
            <p className="text-xs font-bold">Nav Component</p>
            <span className="text-[9px] uppercase tracking-wider">{useContextAPI ? 'Bypassed (Props clean)' : 'forwards: props.theme'}</span>
          </div>

          <div className="flex justify-center">
            <div className="w-0.5 h-6 bg-zinc-800"></div>
          </div>

          {/* Target Component: ThemeButton */}
          <div className={`p-3 rounded-lg text-center border font-mono transition-all duration-300 ${
            pulseNode?.includes('button') 
              ? 'bg-cyan-600/30 border-cyan-500 shadow-[0_0_15px_rgba(168,85,247,0.3)] text-white scale-[1.02]' 
              : 'bg-zinc-900 border-zinc-800 text-zinc-300'
          }`}>
            <p className="text-xs font-bold">ThemeButton Component</p>
            <span className="text-[10px] text-cyan-400 font-bold">
              {useContextAPI ? 'useContext(ThemeContext)' : 'props.theme'} = "{theme}"
            </span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-zinc-800 flex gap-4 items-center">
        <button 
          onClick={toggleTheme}
          className="px-4 py-2 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-white font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Toggle App Theme
        </button>
        <div className="flex-1 text-[11px] text-zinc-500 text-left">
          {useContextAPI 
            ? '🚀 Note how intermediate components (Header, Nav) stay static during context broadcast.' 
            : '⚠️ Prop drilling forces pure courier components to trigger full render updates.'}
        </div>
      </div>

      <div className="mt-4 p-3 bg-zinc-950 rounded-xl border border-zinc-800 font-mono text-[11px] text-zinc-400 text-left max-h-20 overflow-y-auto">
        {flashLogs.slice(-2).map((l, idx) => (
          <div key={idx} className="opacity-80">&gt; {l}</div>
        ))}
      </div>
    </div>
  );
}

// 3. Hook Life Cycle & Dependency Visualizer
function LifecycleTimelineVisualizer() {
  const [mountCount, setMountCount] = useState(1);
  const [val, setVal] = useState(0);
  const [unmounted, setUnmounted] = useState(false);
  const [timeline, setTimeline] = useState<Array<{ id: number, event: string, type: 'mount' | 'render' | 'effect' | 'cleanup' }>>([]);

  const addEvent = (event: string, type: 'mount' | 'render' | 'effect' | 'cleanup') => {
    setTimeline(prev => [...prev, { id: Date.now() + Math.random(), event, type }]);
  };

  const triggerRender = (changeDependency: boolean) => {
    if (unmounted) return;
    addEvent('1. Component Render Loop Initiated', 'render');
    
    if (changeDependency) {
      const nextVal = val + 1;
      setVal(nextVal);
      addEvent(`2. State Changed to: ${nextVal}`, 'render');
      setTimeout(() => {
        addEvent('3. Dependencies altered! Scheduling Effect Cleanup', 'cleanup');
      }, 200);
      setTimeout(() => {
        addEvent('4. Executing Cleanup callback from prior render', 'cleanup');
      }, 400);
      setTimeout(() => {
        addEvent('5. Running Effect Callback with fresh variables', 'effect');
      }, 700);
    } else {
      addEvent('2. No state changes. Memoized content matched.', 'render');
      setTimeout(() => {
        addEvent('3. Dependencies are IDENTICAL. Skipping effect execution!', 'effect');
      }, 400);
    }
  };

  const toggleMount = () => {
    if (unmounted) {
      setUnmounted(false);
      setMountCount(prev => prev + 1);
      setTimeline([]);
      addEvent('Component Mounted successfully', 'mount');
      setTimeout(() => {
        addEvent('Evaluating initial render tree', 'render');
      }, 200);
      setTimeout(() => {
        addEvent('Initial mount: executing Effect Callback', 'effect');
      }, 500);
    } else {
      addEvent('Tearing down component tree', 'cleanup');
      setTimeout(() => {
        addEvent('Executing final Effect Cleanup...', 'cleanup');
        setUnmounted(true);
      }, 300);
    }
  };

  useEffect(() => {
    setTimeline([
      { id: 1, event: 'Component Mounted successfully', type: 'mount' },
      { id: 2, event: 'Evaluating initial render tree', type: 'render' },
      { id: 3, event: 'Initial mount: executing Effect Callback', type: 'effect' }
    ]);
  }, [mountCount]);

  return (
    <div className="flex flex-col h-full justify-between p-6 bg-[#0E0E11] rounded-2xl border border-zinc-800 text-left">
      <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-emerald-500" />
          <h3 className="text-sm font-semibold text-white">Hook Lifecycle Timeline</h3>
        </div>
        <span className={`px-2 py-0.5 text-[10px] rounded border ${unmounted ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
          {unmounted ? 'UNMOUNTED' : 'MOUNTED & READY'}
        </span>
      </div>

      <div className="flex-1 my-4 space-y-2 overflow-y-auto pr-1">
        {timeline.map((item) => (
          <div 
            key={item.id} 
            className={`p-2.5 rounded-lg border text-xs font-mono flex justify-between items-center transition-all ${
              item.type === 'mount' ? 'bg-cyan-600/10 border-cyan-500/30 text-cyan-300' :
              item.type === 'render' ? 'bg-cyan-600/10 border-cyan-500/30 text-cyan-300' :
              item.type === 'cleanup' ? 'bg-cyan-600/10 border-cyan-500/30 text-cyan-300' :
              'bg-emerald-600/10 border-emerald-500/30 text-emerald-300'
            }`}
          >
            <span>{item.event}</span>
            <span className="text-[9px] uppercase tracking-wider bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700">
              {item.type}
            </span>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-zinc-800 grid grid-cols-3 gap-2">
        <button 
          onClick={() => triggerRender(true)}
          disabled={unmounted}
          className="px-2 py-2 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 disabled:opacity-40 text-white font-medium text-xs rounded-lg transition-colors flex flex-col items-center gap-1 text-center"
        >
          <span>Render</span>
          <span className="text-[9px] text-zinc-500">State Change</span>
        </button>
        <button 
          onClick={() => triggerRender(false)}
          disabled={unmounted}
          className="px-2 py-2 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 disabled:opacity-40 text-white font-medium text-xs rounded-lg transition-colors flex flex-col items-center gap-1 text-center"
        >
          <span>Render</span>
          <span className="text-[9px] text-zinc-500">Same State</span>
        </button>
        <button 
          onClick={toggleMount}
          className={`px-2 py-2 border font-medium text-xs rounded-lg transition-colors flex flex-col items-center justify-center text-center ${unmounted ? 'bg-emerald-600 border-emerald-500 text-white hover:bg-emerald-500' : 'bg-red-600/20 border-red-500/30 text-red-300 hover:bg-red-600/40'}`}
        >
          <span>{unmounted ? 'Mount' : 'Unmount'}</span>
          <span className="text-[9px] text-zinc-500">Component</span>
        </button>
      </div>
    </div>
  );
}

// 4. Controlled vs Uncontrolled Forms Sandbox
function FormSandbox() {
  const [controlledVal, setControlledVal] = useState('');
  const uncontrolledInputRef = useRef<HTMLInputElement>(null);
  const [uncontrolledFeedback, setUncontrolledFeedback] = useState('DOM stores value until submitted');

  const triggerSubmitUncontrolled = (e: React.FormEvent) => {
    e.preventDefault();
    const value = uncontrolledInputRef.current?.value || '';
    setUncontrolledFeedback(`Extracted from ref on submit: "${value}"`);
  };

  return (
    <div className="flex flex-col h-full justify-between p-6 bg-[#0E0E11] rounded-2xl border border-zinc-800 text-left">
      <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-zinc-400" />
          <h3 className="text-sm font-semibold text-white">Controlled vs Uncontrolled Forms</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 my-4 flex-1">
        {/* Controlled Input Panel */}
        <div className="p-4 bg-[#121216] rounded-xl border border-zinc-800/60 flex flex-col justify-between">
          <div>
            <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest">Controlled (Puppet)</span>
            <p className="text-xs text-zinc-400 mt-1 mb-4">React state updates characters synchronously on every keypress.</p>
            
            <input 
              type="text" 
              value={controlledVal}
              onChange={(e) => setControlledVal(e.target.value)}
              placeholder="Type characters..."
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-cyan-500 rounded-lg p-2 text-xs text-white placeholder-zinc-600 outline-none transition-colors"
            />
          </div>

          <div className="mt-4 p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 font-mono text-[11px] text-zinc-400">
            <span className="text-zinc-600">// React state bubble:</span>
            <p className="text-cyan-400 font-bold overflow-x-auto">state = "{controlledVal}"</p>
            <p className="text-[10px] text-zinc-500 mt-1 font-sans">Character count: {controlledVal.length}</p>
          </div>
        </div>

        {/* Uncontrolled Input Panel */}
        <form 
          onSubmit={triggerSubmitUncontrolled}
          className="p-4 bg-[#121216] rounded-xl border border-zinc-800/60 flex flex-col justify-between"
        >
          <div>
            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Uncontrolled (Ref)</span>
            <p className="text-xs text-zinc-400 mt-1 mb-4">DOM element holds state. Click submit to pull the value with a ref.</p>
            
            <input 
              type="text" 
              ref={uncontrolledInputRef}
              placeholder="Type characters..."
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-700 rounded-lg p-2 text-xs text-white placeholder-zinc-600 outline-none transition-colors"
            />
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <button 
              type="submit"
              className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-medium text-xs rounded-lg transition-colors"
            >
              Submit & Extract
            </button>
            <div className="p-2 bg-zinc-950 rounded-lg text-[11px] font-mono text-zinc-400 text-center border border-zinc-900 overflow-x-auto">
              {uncontrolledFeedback}
            </div>
          </div>
        </form>
      </div>

      <div className="text-[10px] text-zinc-500 p-2.5 bg-zinc-900/30 rounded-lg border border-zinc-800 text-center">
        Controlled inputs enable real-time validation and dynamic formatting, but trigger re-renders on every single keypress.
      </div>
    </div>
  );
}

// 5. Debounce & Stale Closure Visualizer
function DebounceClosureVisualizer() {
  const [inputText, setInputText] = useState('');
  const [instFetches, setInstFetches] = useState(0);
  const [debVal, setDebVal] = useState('');
  const [debFetches, setDebFetches] = useState(0);
  
  // Stale closure states
  const [count, setCount] = useState(0);
  const [closureSaved, setClosureSaved] = useState<number | null>(null);
  const [staleTriggerLog, setStaleTriggerLog] = useState<string>('Empty log');

  // Debouncing effect simulation
  useEffect(() => {
    if (!inputText) {
      setDebVal('');
      return;
    }
    setInstFetches(prev => prev + 1);
    const handler = setTimeout(() => {
      setDebVal(inputText);
      setDebFetches(prev => prev + 1);
    }, 600);

    return () => clearTimeout(handler);
  }, [inputText]);

  const captureClosure = () => {
    setClosureSaved(count);
    setStaleTriggerLog(`Snapshot saved! Captured count is ${count}`);
  };

  const triggerClosureInterval = () => {
    if (closureSaved === null) {
      setStaleTriggerLog('No snapshot captured yet!');
      return;
    }
    // Simulation of stale capture
    setStaleTriggerLog(`Callback executed! Captured value is ${closureSaved} (even if real count is ${count}!)`);
  };

  return (
    <div className="flex flex-col h-full justify-between p-6 bg-[#0E0E11] rounded-2xl border border-zinc-800 text-left">
      <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-cyan-500" />
          <h3 className="text-sm font-semibold text-white">Debouncing & Stale Closures</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 my-4 flex-1">
        {/* Debouncing panel */}
        <div className="p-4 bg-[#121216] rounded-xl border border-zinc-800/60 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Typewriter Debounce</span>
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type rapid keys..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs text-white placeholder-zinc-600 outline-none mt-2"
            />
          </div>

          <div className="space-y-2 mt-4">
            <div className="p-2.5 bg-zinc-900/60 rounded-lg border border-zinc-800 flex justify-between items-center">
              <span className="text-xs text-zinc-400">Standard hits</span>
              <span className="text-xs font-bold text-red-400 bg-red-400/10 border border-red-500/20 px-2 py-0.5 rounded-full">
                {instFetches} requests
              </span>
            </div>
            <div className="p-2.5 bg-zinc-900/60 rounded-lg border border-zinc-800 flex justify-between items-center">
              <span className="text-xs text-zinc-400">Debounced hits (600ms)</span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                {debFetches} requests
              </span>
            </div>
            {debVal && <p className="text-[11px] font-mono text-zinc-500 text-center">Debounced string: "{debVal}"</p>}
          </div>
        </div>

        {/* Stale closure panel */}
        <div className="p-4 bg-[#121216] rounded-xl border border-zinc-800/60 flex flex-col justify-between text-left">
          <div>
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Stale Closure sandbox</span>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-zinc-400">Real-time count: <strong className="text-white font-mono text-sm">{count}</strong></p>
              <button 
                onClick={() => setCount(prev => prev + 1)}
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-2 py-1 text-xs rounded transition-colors"
              >
                +1
              </button>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <button 
              onClick={captureClosure}
              className="w-full py-1.5 bg-zinc-800 border border-zinc-700 text-white font-medium text-xs rounded-lg transition-colors"
            >
              1. Take Snapshot Closure
            </button>
            <button 
              onClick={triggerClosureInterval}
              className="w-full py-1.5 bg-zinc-800 border border-zinc-700 text-white font-medium text-xs rounded-lg transition-colors"
            >
              2. Invoke Snapshot Callback
            </button>
            <div className="p-2 bg-zinc-950 border border-zinc-900 text-[10px] font-mono text-zinc-400 rounded-lg text-center overflow-x-auto">
              {staleTriggerLog}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 6. useTransition & Concurrent Render Simulator
function ConcurrentRenderSimulator() {
  const [isTransitionActive, setIsTransitionActive] = useState(false);
  const [inputText, setInputText] = useState('');
  const [filterText, setFilterText] = useState('');
  const [isPending, startTransition] = useTransition();

  // Create highly heavy list to simulate rendering load
  const [heavyItemsCount, setHeavyItemsCount] = useState(400);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputText(val);

    if (isTransitionActive) {
      startTransition(() => {
        // Non-urgent, throttled execution
        setFilterText(val);
      });
    } else {
      // Synchronous, blocks main thread!
      setFilterText(val);
    }
  };

  // Generate heavily matching results
  const items = Array.from({ length: heavyItemsCount }, (_, i) => `Simulated Render Row #${i + 1} matching "${filterText}"`);

  return (
    <div className="flex flex-col h-full justify-between p-6 bg-[#0E0E11] rounded-2xl border border-zinc-800 text-left">
      <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <CpuIcon className="w-5 h-5 text-cyan-500" />
          <h3 className="text-sm font-semibold text-white">Concurrent Render & useTransition</h3>
        </div>
        <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800">
          <button 
            onClick={() => setIsTransitionActive(false)}
            className={`px-3 py-1 text-[11px] font-medium rounded-md transition-colors ${!isTransitionActive ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            Sync (Legacy)
          </button>
          <button 
            onClick={() => setIsTransitionActive(true)}
            className={`px-3 py-1 text-[11px] font-medium rounded-md transition-colors ${isTransitionActive ? 'bg-cyan-600 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            useTransition
          </button>
        </div>
      </div>

      <div className="flex-1 my-4 space-y-4 flex flex-col justify-between overflow-hidden">
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Input Field (Type rapid letters)</label>
            <input 
              type="text" 
              value={inputText}
              onChange={handleInput}
              placeholder="Try writing rapidly..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs text-white placeholder-zinc-600 outline-none mt-1"
            />
          </div>
          <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800 text-center font-mono">
            <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Simulated FPS</span>
            <p className={`text-base font-bold ${isPending ? 'text-cyan-400 animate-pulse' : !isTransitionActive && inputText ? 'text-red-400' : 'text-emerald-400'}`}>
              {isPending ? '55 FPS' : !isTransitionActive && inputText ? '12 FPS (Lagging)' : '60 FPS (Fluid)'}
            </p>
          </div>
        </div>

        {/* Heavy list viewport */}
        <div className="flex-1 border border-zinc-800/80 bg-zinc-950/40 rounded-xl p-3 overflow-y-auto max-h-48 relative">
          {isPending && (
            <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center gap-2 text-cyan-400 text-xs font-semibold">
              <RefreshCw className="w-4 h-4 animate-spin" /> Calculating matching trees...
            </div>
          )}
          <div className="space-y-1.5">
            {items.slice(0, 15).map((item, idx) => (
              <div key={idx} className="p-1.5 bg-[#121216] rounded border border-zinc-900 text-[11px] text-zinc-400 text-left font-mono truncate">
                {item}
              </div>
            ))}
            {items.length > 15 && <p className="text-[10px] text-zinc-600 text-center font-mono">+ {items.length - 15} more rows rendering inside layout viewport...</p>}
          </div>
        </div>
      </div>

      <div className="text-[10px] text-zinc-500 p-2 text-center bg-zinc-900/40 rounded-lg border border-zinc-800/40 leading-relaxed">
        {isTransitionActive 
          ? '🚀 useTransition defers list filtering to background rendering, allowing the text box to type instantly at 60fps.' 
          : '⚠️ Synchronous renders force the browser to wait for the whole list recalculation, dropping frame rates.'}
      </div>
    </div>
  );
}

// 7. Keys in Lists Simulator
function KeysListSimulator() {
  const [useUniqueId, setUseUniqueId] = useState(false);
  const [items, setItems] = useState([
    { id: 'uid-1', text: 'Prepare coffee', val: 'Input box A' },
    { id: 'uid-2', text: 'Check Emails', val: 'Input box B' },
    { id: 'uid-3', text: 'Refactor Code', val: 'Input box C' }
  ]);
  const [flashLog, setFlashLog] = useState('Initialize list. Assign inputs.');

  const prependItem = () => {
    const freshId = `uid-${Math.floor(Math.random() * 1000)}`;
    setItems(prev => [
      { id: freshId, text: 'Clean Desk', val: 'Fresh Input content' },
      ...prev
    ]);
    setFlashLog(`Prepend "Clean Desk" with ID: ${freshId}.`);
  };

  const reorderList = () => {
    setItems(prev => [...prev].reverse());
    setFlashLog('Reordered item arrays.');
  };

  const handleInputChange = (idx: number, newVal: string) => {
    setItems(prev => prev.map((item, i) => i === idx ? { ...item, val: newVal } : item));
  };

  return (
    <div className="flex flex-col h-full justify-between p-6 bg-[#0E0E11] rounded-2xl border border-zinc-800 text-left">
      <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-500" />
          <h3 className="text-sm font-semibold text-white">The Danger of Index Keys</h3>
        </div>
        <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800">
          <button 
            onClick={() => { setUseUniqueId(false); setFlashLog('Switched to key = array index.'); }}
            className={`px-3 py-1 text-[11px] font-medium rounded-md transition-colors ${!useUniqueId ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            Index Key
          </button>
          <button 
            onClick={() => { setUseUniqueId(true); setFlashLog('Switched to key = unique ID.'); }}
            className={`px-3 py-1 text-[11px] font-medium rounded-md transition-colors ${useUniqueId ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            Unique ID Key
          </button>
        </div>
      </div>

      <div className="flex-1 my-4 flex flex-col justify-between overflow-hidden">
        <div className="flex gap-2">
          <button 
            onClick={prependItem}
            className="flex-1 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-lg transition-colors border border-zinc-700"
          >
            Prepend Task
          </button>
          <button 
            onClick={reorderList}
            className="flex-1 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-lg transition-colors border border-zinc-700"
          >
            Reverse Array
          </button>
        </div>

        {/* Live List representation */}
        <div className="flex-1 border border-zinc-800 bg-[#121216] p-3 rounded-xl mt-3 space-y-2 overflow-y-auto">
          {items.map((item, idx) => {
            const keyProp = useUniqueId ? item.id : idx;
            return (
              <div 
                key={keyProp}
                className="p-2 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-between gap-3 text-xs font-mono"
              >
                <div className="text-left flex-1 min-w-0">
                  <span className="text-[10px] text-zinc-500 font-bold block truncate">
                    key={keyProp} (id: {item.id})
                  </span>
                  <span className="text-zinc-300 font-bold font-sans">{item.text}</span>
                </div>
                <input 
                  type="text" 
                  value={item.val}
                  onChange={(e) => handleInputChange(idx, e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-[11px] text-zinc-300 w-32 focus:border-zinc-700 outline-none"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-[10px] text-zinc-500 p-2.5 bg-zinc-900/40 rounded-lg border border-zinc-800 text-center">
        {useUniqueId 
          ? '✅ Reordering operates perfectly! Component instances are locked to unique IDs; state moves together with tags.' 
          : '⚠️ Prepend/Reorder elements with Index Keys decouples state. Observe how typing stays in the static inputs.'}
      </div>
    </div>
  );
}

// 8. SSR & Hydration Timeline
function SSRHydrationTimeline() {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [clickCount, setClickCount] = useState(0);
  const [clickLogs, setClickLogs] = useState<string[]>(['Timeline initialized.']);

  const handleTestClick = () => {
    if (activeStep < 3) {
      setClickLogs(prev => [...prev, `❌ CLICK BLOCKED: Event listeners are NOT attached during step ${activeStep}!`]);
    } else {
      const nextClicks = clickCount + 1;
      setClickCount(nextClicks);
      setClickLogs(prev => [...prev, `✅ CLICK WORKED! Counter successfully incremented to ${nextClicks}`]);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between p-6 bg-[#0E0E11] rounded-2xl border border-zinc-800 text-left">
      <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-500" />
          <h3 className="text-sm font-semibold text-white">Server rendering & Hydration</h3>
        </div>
      </div>

      {/* Progress timeline buttons */}
      <div className="grid grid-cols-3 gap-2 my-4">
        <button 
          onClick={() => { setActiveStep(1); setClickLogs(prev => [...prev, 'Returned to Server-Side Rendered phase.']); }}
          className={`p-2 rounded-lg border text-left flex flex-col justify-between ${activeStep === 1 ? 'bg-cyan-600/10 border-cyan-500 text-cyan-300' : 'bg-zinc-900 border-zinc-800 text-zinc-500'}`}
        >
          <span className="text-[9px] font-bold">1. SSR STRING</span>
          <span className="text-[11px] font-semibold mt-1">Plain HTML</span>
        </button>
        <button 
          onClick={() => { setActiveStep(2); setClickLogs(prev => [...prev, 'Switched to Bundle downloading phase.']); }}
          className={`p-2 rounded-lg border text-left flex flex-col justify-between ${activeStep === 2 ? 'bg-cyan-600/10 border-cyan-500 text-cyan-300' : 'bg-zinc-900 border-zinc-800 text-zinc-500'}`}
        >
          <span className="text-[9px] font-bold">2. BUNDLE</span>
          <span className="text-[11px] font-semibold mt-1">JS Loading</span>
        </button>
        <button 
          onClick={() => { setActiveStep(3); setClickLogs(prev => [...prev, 'React Hydrated! Action listeners running.']); }}
          className={`p-2 rounded-lg border text-left flex flex-col justify-between ${activeStep === 3 ? 'bg-emerald-600/10 border-emerald-500 text-emerald-300' : 'bg-zinc-900 border-zinc-800 text-zinc-500'}`}
        >
          <span className="text-[9px] font-bold">3. HYDRATED</span>
          <span className="text-[11px] font-semibold mt-1">Interactive</span>
        </button>
      </div>

      {/* Live Sandbox Card */}
      <div className="flex-1 bg-zinc-950 p-4 rounded-xl border border-zinc-900 flex flex-col justify-between my-2">
        <div className="text-center py-6">
          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Sandbox Interaction Area</span>
          <button 
            onClick={handleTestClick}
            className={`px-4 py-2 text-xs font-bold rounded-full transition-all border ${
              activeStep === 3 
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 cursor-pointer scale-105' 
                : 'bg-zinc-800 text-zinc-400 border-zinc-700 cursor-not-allowed'
            }`}
          >
            Click Me: {clickCount} Clicks
          </button>
        </div>

        <div className="bg-[#121216] p-2.5 rounded border border-zinc-900 font-mono text-[10px] text-zinc-400">
          {activeStep === 1 && <span className="text-cyan-500">// Static HTML displayed instantly. Event handlers are not defined in flat markup.</span>}
          {activeStep === 2 && <span className="text-cyan-500">// Script block downloads, parsed by interpreter. React files loading...</span>}
          {activeStep === 3 && <span className="text-emerald-500">// ReactDOM.hydrateRoot binds state variables and actions. Click registers!</span>}
        </div>
      </div>

      <div className="mt-4 p-2.5 bg-zinc-950 rounded-lg border border-zinc-800 font-mono text-[10px] text-zinc-500 text-left h-16 overflow-y-auto">
        {clickLogs.slice(-2).map((log, idx) => (
          <div key={idx}>&gt; {log}</div>
        ))}
      </div>
    </div>
  );
}

// 9. Custom Hook / Reducer State Machine
function ReducerStateMachineVisualizer() {
  interface State {
    status: 'idle' | 'loading' | 'success' | 'error';
    data: string | null;
    error: string | null;
  }
  
  type Action = 
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS'; payload: string }
    | { type: 'FETCH_ERROR'; payload: string }
    | { type: 'RESET' };

  const initialState: State = { status: 'idle', data: null, error: null };

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'FETCH_START':
        return { status: 'loading', data: null, error: null };
      case 'FETCH_SUCCESS':
        return { status: 'success', data: action.payload, error: null };
      case 'FETCH_ERROR':
        return { status: 'error', data: null, error: action.payload };
      case 'RESET':
        return initialState;
      default:
        return state;
    }
  };

  const [state, dispatch] = useState<State>(initialState);
  const [logs, setLogs] = useState<Array<{ action: string, prev: string, next: string }>>([]);

  const handleDispatch = (action: Action) => {
    const prevState = { ...state };
    const nextState = reducer(state, action);
    dispatch(nextState);
    setLogs(prev => [
      ...prev, 
      { 
        action: action.type, 
        prev: prevState.status.toUpperCase(), 
        next: nextState.status.toUpperCase() 
      }
    ]);
  };

  return (
    <div className="flex flex-col h-full justify-between p-6 bg-[#0E0E11] rounded-2xl border border-zinc-800 text-left">
      <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-500" />
          <h3 className="text-sm font-semibold text-white">Reducer State Machine</h3>
        </div>
      </div>

      <div className="my-4 flex-1 flex flex-col justify-between space-y-4">
        {/* Status Pipeline Diagram */}
        <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
          <div className={`p-2 rounded border transition-colors ${state.status === 'idle' ? 'bg-zinc-800 border-zinc-600 text-white shadow-[0_0_8px_rgba(255,255,255,0.1)]' : 'bg-zinc-950 border-zinc-900 text-zinc-600'}`}>
            IDLE
          </div>
          <div className={`p-2 rounded border transition-colors ${state.status === 'loading' ? 'bg-yellow-500/10 border-yellow-500 text-yellow-300 shadow-[0_0_8px_rgba(234,179,8,0.1)]' : 'bg-zinc-950 border-zinc-900 text-zinc-600'}`}>
            LOADING
          </div>
          <div className={`p-2 rounded border transition-colors ${state.status === 'success' ? 'bg-emerald-600/10 border-emerald-500 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.1)]' : 'bg-zinc-950 border-zinc-900 text-zinc-600'}`}>
            SUCCESS
          </div>
          <div className={`p-2 rounded border transition-colors ${state.status === 'error' ? 'bg-red-600/10 border-red-500 text-red-300 shadow-[0_0_8px_rgba(239,68,68,0.1)]' : 'bg-zinc-950 border-zinc-900 text-zinc-600'}`}>
            ERROR
          </div>
        </div>

        {/* Current State values bubble */}
        <div className="bg-[#121216] p-3.5 rounded-xl border border-zinc-800/80 font-mono text-[11px] text-zinc-300">
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">State Object snapshot</p>
          <pre className="text-cyan-400">
            {JSON.stringify(state, null, 2)}
          </pre>
        </div>

        {/* Actions selection triggers */}
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => handleDispatch({ type: 'FETCH_START' })}
            className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-[11px] font-semibold rounded-lg transition-colors border border-zinc-700 text-center"
          >
            DISPATCH("FETCH_START")
          </button>
          <button 
            onClick={() => handleDispatch({ type: 'FETCH_SUCCESS', payload: 'Config files resolved' })}
            className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-[11px] font-semibold rounded-lg transition-colors border border-zinc-700 text-center"
          >
            DISPATCH("SUCCESS")
          </button>
          <button 
            onClick={() => handleDispatch({ type: 'FETCH_ERROR', payload: 'Auth 403 Failed' })}
            className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-[11px] font-semibold rounded-lg transition-colors border border-zinc-700 text-center"
          >
            DISPATCH("ERROR")
          </button>
          <button 
            onClick={() => handleDispatch({ type: 'RESET' })}
            className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] font-semibold rounded-lg transition-colors border border-zinc-700 text-center"
          >
            DISPATCH("RESET")
          </button>
        </div>
      </div>

      <div className="p-2 bg-zinc-950 border border-zinc-800 font-mono text-[10px] text-zinc-400 text-left h-16 overflow-y-auto">
        {logs.slice(-2).map((item, idx) => (
          <div key={idx} className="opacity-80">
            &gt; Action: <strong className="text-white">{item.action}</strong>: {item.prev} -&gt; <strong className="text-cyan-400">{item.next}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

// 10. Reconciliation & Key Reset Visualizer
function ReconciliationKeyResetVisualizer() {
  const [useDistinctKeys, setUseDistinctKeys] = useState(false);
  const [activeTab, setActiveTab] = useState<'A' | 'B'>('A');
  const [resetLogs, setResetLogs] = useState<string[]>(['Initialization sandbox.']);

  // Local counters mimicking independent widget states
  const [count, setCount] = useState(1);

  const swapTabs = (tab: 'A' | 'B') => {
    setActiveTab(tab);
    setCount(c => c + 1);

    if (useDistinctKeys) {
      setResetLogs(prev => [
        ...prev, 
        `Swapped tab to ${tab}. Explicit keys changed (key="tab-${tab}"). React tore down the old instance and reset states!`
      ]);
    } else {
      setResetLogs(prev => [
        ...prev, 
        `Swapped tab to ${tab}. Same slot type and NO keys mapped. React retains state variables in place!`
      ]);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between p-6 bg-[#0E0E11] rounded-2xl border border-zinc-800 text-left">
      <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-500" />
          <h3 className="text-sm font-semibold text-white">Reconciliation & Key Resets</h3>
        </div>
        <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800">
          <button 
            onClick={() => { setUseDistinctKeys(false); setResetLogs(['Switched to No Key Reset.']); }}
            className={`px-3 py-1 text-[11px] font-medium rounded-md transition-colors ${!useDistinctKeys ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            Same Key (Reuse)
          </button>
          <button 
            onClick={() => { setUseDistinctKeys(true); setResetLogs(['Switched to Explicit Key Reset.']); }}
            className={`px-3 py-1 text-[11px] font-medium rounded-md transition-colors ${useDistinctKeys ? 'bg-cyan-600 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            Unique Key
          </button>
        </div>
      </div>

      <div className="my-4 flex-1 flex flex-col justify-between">
        <div className="flex gap-2 bg-zinc-950 p-1 rounded-lg border border-zinc-900">
          <button 
            onClick={() => swapTabs('A')}
            className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${activeTab === 'A' ? 'bg-zinc-800 text-white' : 'text-zinc-500'}`}
          >
            Render Component A
          </button>
          <button 
            onClick={() => swapTabs('B')}
            className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${activeTab === 'B' ? 'bg-zinc-800 text-white' : 'text-zinc-500'}`}
          >
            Render Component B
          </button>
        </div>

        {/* Live Active slot box */}
        <div className="flex-1 bg-[#121216] border border-zinc-800/60 p-4 rounded-xl my-4 text-center flex flex-col justify-center">
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mb-1">
            Slot viewport ({useDistinctKeys ? `key="tab-${activeTab}"` : 'No key'})
          </p>
          <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-900 w-full max-w-xs mx-auto">
            <h4 className="text-xs text-cyan-400 font-bold font-mono">
              {activeTab === 'A' ? '⚡ Widget Counter A' : '🔥 Widget Counter B'}
            </h4>
            <p className="text-[11px] text-zinc-500 mt-1">Simulated render tick: {count}</p>
          </div>
        </div>
      </div>

      <div className="p-2.5 bg-zinc-950 border border-zinc-800 font-mono text-[10px] text-zinc-400 text-left h-20 overflow-y-auto">
        {resetLogs.slice(-2).map((log, idx) => (
          <div key={idx} className="opacity-80">&gt; {log}</div>
        ))}
      </div>
    </div>
  );
}
