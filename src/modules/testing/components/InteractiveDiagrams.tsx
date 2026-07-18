import React, { useState, useEffect, useRef } from 'react';
import { 
  Layers, Zap, ShieldCheck, DollarSign, RefreshCw, Eye, EyeOff, 
  Terminal, Play, ArrowRight, CheckCircle2, AlertCircle, FileCode, 
  Laptop, Globe, Sparkles, Accessibility, Crosshair, Cpu, Clock, SkipForward
} from 'lucide-react';

interface InteractiveDiagramsProps {
  activeConcept: string;
  onSelectQuestion?: (id: number) => void;
}

export default function InteractiveDiagrams({ activeConcept, onSelectQuestion }: InteractiveDiagramsProps) {
  // Let's decide which diagram to display based on the selected question or concept
  const normalizedConcept = activeConcept.toLowerCase();

  return (
    <div className="w-full">
      {normalizedConcept.includes('pyramid') || normalizedConcept.includes('comparison') ? (
        <TestingPyramidDiagram onSelectQuestion={onSelectQuestion} />
      ) : normalizedConcept.includes('mock') || normalizedConcept.includes('spy') || normalizedConcept.includes('fn') ? (
        <JestMockingSpyVisualizer />
      ) : normalizedConcept.includes('query') || normalizedConcept.includes('rtl') || normalizedConcept.includes('priority') || normalizedConcept.includes('accessibility') || normalizedConcept.includes('present') ? (
        <RtlDomA11yInspector />
      ) : normalizedConcept.includes('timers') || normalizedConcept.includes('async') ? (
        <FakeTimersVisualizer />
      ) : (
        <CypressTimeTravelDebugger />
      )}
    </div>
  );
}

// ==========================================
// 1. TESTING PYRAMID & METRICS DIAGRAM
// ==========================================
function TestingPyramidDiagram({ onSelectQuestion }: { onSelectQuestion?: (id: number) => void }) {
  const [selectedLayer, setSelectedLayer] = useState<'unit' | 'integration' | 'e2e'>('unit');

  const layersInfo = {
    unit: {
      title: 'Unit Tests (Jest)',
      scope: 'Individual functions, utilities, math calculators, pure UI buttons in total isolation.',
      runtime: 'Node.js (very fast simulated DOM via jsdom)',
      speed: 100,
      confidence: 35,
      cost: 15,
      quantity: 70,
      icon: Cpu,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/30',
      shadowColor: 'shadow-emerald-500/10',
      tips: [
        'Run in milliseconds',
        'Mock all external requests and file structures',
        'Check edge cases and mathematical bounds'
      ],
      questions: [1, 2, 5, 10, 13]
    },
    integration: {
      title: 'Integration Tests (RTL)',
      scope: 'Components interacting with data fetching handlers, forms updating local/global stores, hooks binding UI.',
      runtime: 'Node.js (jsdom context + mocked API fetch calls)',
      speed: 65,
      confidence: 70,
      cost: 45,
      quantity: 20,
      icon: Layers,
      color: 'bg-cyan-500',
      textColor: 'text-cyan-400',
      borderColor: 'border-cyan-500/30',
      shadowColor: 'shadow-cyan-500/10',
      tips: [
        'Interact with rendered output like a user',
        'Ensure accessibility attributes guide selectors',
        'Mock network responses using route intercepts'
      ],
      questions: [16, 20, 22, 24, 27]
    },
    e2e: {
      title: 'End-to-End Tests (Cypress)',
      scope: 'Full user journey through actual signup flow, payments, database synchronizations, and page loads.',
      runtime: 'Real Chrome/Firefox browsers with a real running backend',
      speed: 15,
      confidence: 98,
      cost: 95,
      quantity: 10,
      icon: Globe,
      color: 'bg-rose-500',
      textColor: 'text-rose-400',
      borderColor: 'border-rose-500/30',
      shadowColor: 'shadow-rose-500/10',
      tips: [
        'Test critical pathways only',
        'Prone to network latency fluctuations',
        'Avoid hardcoded timers or sleep blocks'
      ],
      questions: [31, 34, 36, 38, 48]
    }
  };

  const current = layersInfo[selectedLayer];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono px-2.5 py-1 bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20">Aesthetic Diagram #1</span>
          <h3 className="text-lg font-bold text-slate-100 mt-2">The Testing Pyramid & Strategy Planner</h3>
          <p className="text-slate-400 text-xs">Analyze tradeoffs between speed, cost, confidence, and quantity across tiers.</p>
        </div>
        <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 mt-4 md:mt-0">
          {(['unit', 'integration', 'e2e'] as const).map((layer) => (
            <button
              key={layer}
              onClick={() => setSelectedLayer(layer)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all capitalize ${
                selectedLayer === layer 
                  ? 'bg-cyan-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {layer}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* PYRAMID VISUAL (5 COLS) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center py-6">
          <div className="w-full max-w-xs flex flex-col gap-2 relative">
            {/* E2E Top Layer */}
            <button
              onClick={() => setSelectedLayer('e2e')}
              className={`w-full group relative transition-all duration-300 transform ${
                selectedLayer === 'e2e' ? 'scale-105 filter brightness-110 z-10' : 'hover:scale-102 opacity-75'
              }`}
            >
              <div className="mx-auto w-1/3 h-14 bg-gradient-to-b from-rose-400 to-rose-600 rounded-t-xl flex flex-col items-center justify-center text-white font-bold text-xs shadow-lg shadow-rose-900/40 border border-rose-300/20">
                <Globe className="w-4 h-4 mb-1" />
                <span>E2E</span>
              </div>
              {/* Dynamic Connecting Line */}
              {selectedLayer === 'e2e' && (
                <div className="absolute top-1/2 left-full w-8 h-px bg-rose-500/50 hidden md:block"></div>
              )}
            </button>

            {/* Integration Mid Layer */}
            <button
              onClick={() => setSelectedLayer('integration')}
              className={`w-full group relative transition-all duration-300 transform ${
                selectedLayer === 'integration' ? 'scale-105 filter brightness-110 z-10' : 'hover:scale-102 opacity-75'
              }`}
            >
              <div className="mx-auto w-2/3 h-14 bg-gradient-to-b from-cyan-400 to-cyan-600 flex flex-col items-center justify-center text-white font-bold text-xs shadow-lg shadow-cyan-900/40 border border-cyan-300/20">
                <Layers className="w-4 h-4 mb-1" />
                <span>Integration</span>
              </div>
              {selectedLayer === 'integration' && (
                <div className="absolute top-1/2 left-full w-12 h-px bg-cyan-500/50 hidden md:block"></div>
              )}
            </button>

            {/* Unit Base Layer */}
            <button
              onClick={() => setSelectedLayer('unit')}
              className={`w-full group relative transition-all duration-300 transform ${
                selectedLayer === 'unit' ? 'scale-105 filter brightness-110 z-10' : 'hover:scale-102 opacity-75'
              }`}
            >
              <div className="mx-auto w-full h-14 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-b-xl flex flex-col items-center justify-center text-white font-bold text-xs shadow-lg shadow-emerald-900/40 border border-emerald-300/20">
                <Cpu className="w-4 h-4 mb-1" />
                <span>Unit Tests</span>
              </div>
              {selectedLayer === 'unit' && (
                <div className="absolute top-1/2 left-full w-16 h-px bg-emerald-500/50 hidden md:block"></div>
              )}
            </button>

            {/* Pyramid Labels */}
            <div className="absolute -left-6 top-0 h-full flex flex-col justify-between text-[10px] font-mono text-slate-500 pointer-events-none">
              <span className="flex items-center gap-1"><DollarSign className="w-3 h-3 text-rose-500" /> High Cost</span>
              <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-emerald-500" /> High Speed</span>
            </div>
          </div>
        </div>

        {/* DETAILS PANEL (7 COLS) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-xl p-5 border border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${current.color} bg-opacity-20 ${current.textColor}`}>
              <current.icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100">{current.title}</h4>
              <p className="text-[11px] text-slate-500 font-mono">Environment: {current.runtime}</p>
            </div>
          </div>

          <p className="text-slate-300 text-xs leading-relaxed mb-5">{current.scope}</p>

          {/* REALTIME GAUGES */}
          <div className="space-y-3 mb-5">
            <div>
              <div className="flex justify-between text-[10px] font-mono mb-1">
                <span className="text-slate-400">Execution Speed</span>
                <span className={current.textColor}>{current.speed}% (Faster is better)</span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${current.color} transition-all duration-500`}
                  style={{ width: `${current.speed}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] font-mono mb-1">
                <span className="text-slate-400">Release Confidence</span>
                <span className={current.textColor}>{current.confidence}% (Realism factor)</span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${current.color} transition-all duration-500`}
                  style={{ width: `${current.confidence}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] font-mono mb-1">
                <span className="text-slate-400">Development / Runtime Cost</span>
                <span className="text-slate-300">{current.cost}%</span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-slate-700 transition-all duration-500`}
                  style={{ width: `${current.cost}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* KEY TIPS */}
          <div className="border-t border-slate-800 pt-4 mt-4">
            <h5 className="text-slate-300 text-[11px] font-bold uppercase tracking-wider mb-2">Golden Advice</h5>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {current.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 mt-0.5 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RELEVANT INTERVIEW QUESTIONS */}
          {onSelectQuestion && (
            <div className="border-t border-slate-800 pt-4 mt-4">
              <span className="text-slate-500 text-[10px] font-mono block mb-2">Related Q&A Numbers:</span>
              <div className="flex flex-wrap gap-1.5">
                {current.questions.map((qId) => (
                  <button
                    key={qId}
                    onClick={() => onSelectQuestion(qId)}
                    className="text-[10px] font-mono bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-cyan-200 px-2 py-1 rounded border border-slate-800 hover:border-slate-700 transition"
                  >
                    Q#{qId}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. JEST MOCKING & SPY VISUALIZER
// ==========================================
interface MockCall {
  args: any[];
  returned: any;
  timestamp: string;
}

function JestMockingSpyVisualizer() {
  const [mockType, setMockType] = useState<'jest.fn()' | 'jest.spyOn()' | 'jest.mock()'>('jest.fn()');
  const [callHistory, setCallHistory] = useState<MockCall[]>([]);
  const [returnVal, setReturnVal] = useState<string>('Success Transaction ID');
  const [triggerName, setTriggerName] = useState<string>('button_click');
  const [customArgs, setCustomArgs] = useState<string>('{"discount": 10}');

  const fireMockCall = () => {
    let parsedArgs: any[] = [triggerName];
    if (mockType === 'jest.fn()') {
      parsedArgs = [Math.floor(100 + Math.random() * 900), 150]; // simulating dynamic id & sum
    } else if (mockType === 'jest.spyOn()') {
      try {
        parsedArgs = [triggerName, JSON.parse(customArgs)];
      } catch (e) {
        parsedArgs = [triggerName, customArgs];
      }
    } else {
      parsedArgs = ['/api/v1/profile', { cache: true }];
    }

    const currentReturn = mockType === 'jest.fn()' 
      ? `TXN-${Math.floor(10000 + Math.random() * 90000)}` 
      : returnVal;

    const newCall: MockCall = {
      args: parsedArgs,
      returned: currentReturn,
      timestamp: new Date().toLocaleTimeString()
    };

    setCallHistory(prev => [newCall, ...prev].slice(0, 5)); // cap at 5
  };

  const clearHistory = () => {
    setCallHistory([]);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">Aesthetic Diagram #2</span>
          <h3 className="text-lg font-bold text-slate-100 mt-2">Jest Mock & Spy Telemetry Dashboard</h3>
          <p className="text-slate-400 text-xs">Simulate test hooks in real-time to watch arguments logging and mocks responding.</p>
        </div>
        <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 mt-4 md:mt-0">
          {(['jest.fn()', 'jest.spyOn()', 'jest.mock()'] as const).map((type) => (
            <button
              key={type}
              onClick={() => { setMockType(type); clearHistory(); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                mockType === type 
                  ? 'bg-emerald-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* INTERACTIVE SETUP PANEL (5 COLS) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Mock Configurator</h4>

            {mockType === 'jest.fn()' && (
              <div className="space-y-2">
                <p className="text-xs text-slate-400">Creates a standalone, isolated callback mock function. It records calls and auto-generates transaction IDs.</p>
                <div className="text-[11px] bg-slate-900 p-2 rounded font-mono text-emerald-400 border border-slate-800">
                  const mockCallback = jest.fn();
                </div>
              </div>
            )}

            {mockType === 'jest.spyOn()' && (
              <div className="space-y-3 text-xs text-slate-400">
                <p>Spies on standard methods. Enter custom arguments and outputs to simulate:</p>
                <div>
                  <label className="block text-[10px] text-slate-500 mb-1">Event Name</label>
                  <input 
                    type="text" 
                    value={triggerName} 
                    onChange={e => setTriggerName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 mb-1">Payload (JSON)</label>
                  <input 
                    type="text" 
                    value={customArgs} 
                    onChange={e => setCustomArgs(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div className="text-[11px] bg-slate-900 p-2 rounded font-mono text-emerald-400 border border-slate-800">
                  jest.spyOn(tracker, 'sendEvent');
                </div>
              </div>
            )}

            {mockType === 'jest.mock()' && (
              <div className="space-y-3 text-xs text-slate-400">
                <p>Mock an entire module (like <code className="text-slate-200">axios</code>) to return dummy values synchronously without making network calls.</p>
                <div>
                  <label className="block text-[10px] text-slate-500 mb-1">Mocked Resolved Value</label>
                  <input 
                    type="text" 
                    value={returnVal} 
                    onChange={e => setReturnVal(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div className="text-[11px] bg-slate-900 p-2 rounded font-mono text-emerald-400 border border-slate-800">
                  jest.mock('axios');<br />
                  axios.get.mockResolvedValue(&#123; data: ... &#125;)
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={fireMockCall}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Simulate Call In Test</span>
              </button>
            </div>
          </div>
        </div>

        {/* METRIC VISUALIZER / TELEMETRY TERMINAL (7 COLS) */}
        <div className="lg:col-span-7 flex flex-col h-[340px]">
          <div className="bg-slate-950 rounded-xl border border-slate-800 flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between bg-slate-900 px-4 py-2 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs font-mono text-slate-300">Mock Call Telemetry Terminal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-mono text-slate-400">spy active</span>
              </div>
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-3 font-mono text-xs">
              <div className="text-slate-500 text-[10px] border-b border-slate-900 pb-2 flex justify-between items-center">
                <span>Total Calls Recorded: {callHistory.length}</span>
                {callHistory.length > 0 && (
                  <button onClick={clearHistory} className="text-emerald-500 hover:text-emerald-400 hover:underline">
                    Clear Logs
                  </button>
                )}
              </div>

              {callHistory.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center py-10 space-y-2">
                  <Cpu className="w-8 h-8 text-slate-700 animate-bounce" />
                  <p>Terminal empty. Click "Simulate Call In Test" to send testing parameters and watch spy tracers inspect the call.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {callHistory.map((call, idx) => (
                    <div key={idx} className="bg-slate-900 p-2.5 rounded border border-emerald-500/20 space-y-1.5 animate-fadeIn">
                      <div className="flex justify-between items-center text-[10px] text-slate-400">
                        <span className="text-emerald-400 font-bold">Call #{callHistory.length - idx}</span>
                        <span>{call.timestamp}</span>
                      </div>
                      <div className="grid grid-cols-12 gap-1 text-[11px]">
                        <div className="col-span-3 text-slate-400">Arguments:</div>
                        <div className="col-span-9 text-slate-100 font-mono">
                          {JSON.stringify(call.args)}
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-1 text-[11px]">
                        <div className="col-span-3 text-slate-400">Returned:</div>
                        <div className="col-span-9 text-emerald-300 font-mono">
                          {typeof call.returned === 'object' ? JSON.stringify(call.returned) : call.returned}
                        </div>
                      </div>
                      {/* ASSERTION TELEMETRY VIEW */}
                      <div className="text-[9px] text-cyan-400 bg-cyan-500/5 px-1.5 py-0.5 rounded border border-cyan-500/10 inline-block">
                        toHaveBeenCalledWith({call.args.map(a => typeof a === 'object' ? 'Object' : `'${a}'`).join(', ')})
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. RTL VIRTUAL DOM & A11Y INSPECTOR
// ==========================================
function RtlDomA11yInspector() {
  const [activeQuery, setActiveQuery] = useState<'getByRole' | 'getByLabelText' | 'getByPlaceholderText' | 'getByTestId' | 'queryByText'>('getByRole');
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  const getExplanation = () => {
    switch (activeQuery) {
      case 'getByRole':
        return {
          header: 'getByRole (Highest Priority)',
          text: 'This query targets elements based on their accessibility (ARIA) role (e.g., button, heading, link). It matches how screen readers interpret layout items, encouraging robust, semantic, and highly accessible HTML markup.',
          selector: "screen.getByRole('button', { name: 'Submit order' })",
          targetId: 'submit-btn',
          badge: 'bg-emerald-500 text-slate-950 font-bold'
        };
      case 'getByLabelText':
        return {
          header: 'getByLabelText (High Priority)',
          text: 'Matches form fields using their associated <label> elements. This ensures that form controls are accessible, as screen readers read label text when a user tab-focuses into inputs.',
          selector: "screen.getByLabelText('Email address')",
          targetId: 'email-input',
          badge: 'bg-emerald-500 text-slate-950 font-bold'
        };
      case 'getByPlaceholderText':
        return {
          header: 'getByPlaceholderText (Medium Priority)',
          text: 'Matches input fields based on their placeholder attribute. Use this if no label exists, though adding a real visible label is generally preferred for accessibility.',
          selector: "screen.getByPlaceholderText('john@doe.com')",
          targetId: 'email-input',
          badge: 'bg-cyan-500 text-slate-950 font-bold'
        };
      case 'getByTestId':
        return {
          header: 'getByTestId (Lowest/Fallback Priority)',
          text: 'Target elements with a dedicated data-testid attribute. This is used as a fallback when elements have no semantic context or visible text. It doesn\'t verify accessibility, so use it sparingly.',
          selector: "screen.getByTestId('error-container')",
          targetId: 'error-box',
          badge: 'bg-rose-500 text-white font-bold'
        };
      case 'queryByText':
        return {
          header: 'queryByText (Absence Check)',
          text: 'Returns null if no element matches, rather than throwing an error. This makes it ideal for asserting that an element (like an error modal) is NOT present on the page.',
          selector: "expect(screen.queryByText('Invalid credentials')).not.toBeInTheDocument()",
          targetId: 'none',
          badge: 'bg-cyan-500 text-white font-bold'
        };
    }
  };

  const currentQuery = getExplanation();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono px-2.5 py-1 bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20">Aesthetic Diagram #3</span>
          <h3 className="text-lg font-bold text-slate-100 mt-2">RTL Virtual DOM & Accessibility Inspector</h3>
          <p className="text-slate-400 text-xs">Hover queries to see which HTML nodes they target in our virtual browser DOM.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* VIRTUAL DOM TREE RENDER (6 COLS) */}
        <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
          <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-4 shrink-0">
              <Accessibility className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Virtual Browser DOM Rendering (jsdom)</h4>
            </div>

            {/* LIVE DOM INTERACTION STAGE */}
            <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 space-y-4 flex-1 flex flex-col justify-center">
              {/* Fake Email Input Row */}
              <div 
                className={`p-3.5 rounded-lg border transition-all duration-300 ${
                  currentQuery.targetId === 'email-input' 
                    ? 'bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-500/5' 
                    : 'bg-slate-950/40 border-slate-800'
                }`}
                onMouseEnter={() => setHoveredElement('email-input')}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <label htmlFor="email-f" className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-2">
                  <span>Email address</span>
                  <span className="text-[9px] font-mono text-slate-500 bg-slate-900 px-1.5 py-0.2 rounded border border-slate-800">HTML Label</span>
                </label>
                <input 
                  type="email" 
                  id="email-f"
                  placeholder="john@doe.com" 
                  disabled
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-400"
                />
              </div>

              {/* Fake Error Container Row */}
              <div 
                className={`p-3.5 rounded-lg border transition-all duration-300 ${
                  currentQuery.targetId === 'error-box' 
                    ? 'bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-500/5' 
                    : 'bg-slate-950/40 border-slate-800'
                }`}
                onMouseEnter={() => setHoveredElement('error-box')}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <div 
                  data-testid="error-container" 
                  className="bg-rose-950/20 border border-rose-900/40 p-2 rounded text-rose-400 text-xs font-semibold flex items-center gap-1.5"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Invalid credentials format</span>
                </div>
              </div>

              {/* Fake Button Row */}
              <div 
                className={`p-3.5 rounded-lg border transition-all duration-300 ${
                  currentQuery.targetId === 'submit-btn' 
                    ? 'bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-500/5' 
                    : 'bg-slate-950/40 border-slate-800'
                }`}
                onMouseEnter={() => setHoveredElement('submit-btn')}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <button 
                  type="submit" 
                  className="w-full bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 py-1.5 px-3 rounded text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <span>Submit order</span>
                </button>
              </div>
            </div>
            
            <div className="mt-3 text-[10px] text-slate-500 text-center font-mono italic">
              *Highlighted boxes show target coverage of active query methods.
            </div>
          </div>
        </div>

        {/* QUERY EXPLANATIONS / INTERACTIVE SELECTORS (6 COLS) */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 flex-1 flex flex-col">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Query Selectors Checklist</h4>
            
            {/* BUTTON CHECKLIST GROUP */}
            <div className="flex flex-col gap-1.5 mb-5">
              {(['getByRole', 'getByLabelText', 'getByPlaceholderText', 'getByTestId', 'queryByText'] as const).map((q) => (
                <button
                  key={q}
                  onClick={() => setActiveQuery(q)}
                  className={`w-full text-left p-2 rounded-lg text-xs font-mono transition flex items-center justify-between border ${
                    activeQuery === q 
                      ? 'bg-cyan-600/10 text-cyan-300 border-cyan-500/30 font-bold' 
                      : 'bg-slate-900 text-slate-400 border-slate-900 hover:bg-slate-850 hover:text-slate-200'
                  }`}
                >
                  <span>{q}()</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                    q === 'getByRole' || q === 'getByLabelText' 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : q === 'getByTestId' 
                        ? 'bg-rose-500/10 text-rose-400' 
                        : 'bg-slate-800 text-slate-400'
                  }`}>
                    {q === 'getByRole' || q === 'getByLabelText' ? 'Accessible' : q === 'getByTestId' ? 'Fragile' : 'Standard'}
                  </span>
                </button>
              ))}
            </div>

            {/* SELECTOR TELEMETRY DATA */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex-1 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${currentQuery.badge}`}>
                    {currentQuery.header}
                  </span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">{currentQuery.text}</p>
              </div>

              {/* CODE BLOCK OUT */}
              <div className="space-y-1 pt-3 border-t border-slate-800">
                <span className="text-[10px] text-slate-500 font-mono">Example query expression:</span>
                <div className="bg-slate-950 p-2.5 rounded font-mono text-[11px] text-cyan-300 border border-slate-800 select-all leading-normal overflow-x-auto">
                  {currentQuery.selector}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. CYPRESS TIME TRAVEL DEBUGGER SIMULATOR
// ==========================================
interface CypressStep {
  id: number;
  command: string;
  arg: string;
  status: 'passed' | 'pending';
  domView: string; // Describes the visual inside the mock screen
  details: string;
}

function CypressTimeTravelDebugger() {
  const [activeStepId, setActiveStepId] = useState<number>(3); // Default on form filled

  const steps: CypressStep[] = [
    { 
      id: 1, 
      command: 'cy.visit', 
      arg: '"/checkout"', 
      status: 'passed',
      domView: 'empty-form',
      details: 'Launches full browser session to loading route. Clears state triggers, mounts dynamic assets.'
    },
    { 
      id: 2, 
      command: 'cy.intercept', 
      arg: '"POST", "/api/pay"', 
      status: 'passed',
      domView: 'empty-form',
      details: 'Establishes proxy intercept stub. Resolves simulated network returns instantly with success code.'
    },
    { 
      id: 3, 
      command: 'cy.get', 
      arg: '"[data-cy=email-input]"', 
      status: 'passed',
      domView: 'filled-form',
      details: 'Queries the DOM tree using highly resilient custom attributes. Fills field with user mock email.'
    },
    { 
      id: 4, 
      command: 'cy.get', 
      arg: '"[data-cy=submit-btn]"', 
      status: 'passed',
      domView: 'submitting',
      details: 'Locates submit element and triggers mouse events sequentially (mousedown, click, mouseup).'
    },
    { 
      id: 5, 
      command: 'cy.wait', 
      arg: '"@apiPayment"', 
      status: 'passed',
      domView: 'success-page',
      details: 'Pauses queue thread until intercepted HTTP resolver returns payload. Continues tests synchronously.'
    }
  ];

  const currentStep = steps.find(s => s.id === activeStepId) || steps[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono px-2.5 py-1 bg-rose-500/10 text-rose-400 rounded-full border border-rose-500/20">Aesthetic Diagram #4</span>
          <h3 className="text-lg font-bold text-slate-100 mt-2">Cypress Time-Travel Debugger</h3>
          <p className="text-slate-400 text-xs">Hover or click commands in the left-hand runner log to travel back in time and inspect the DOM state at that step.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CYPRESS SIDEBAR RUNNER LOGS (5 COLS) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex flex-col">
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 font-mono">Cypress Runner Logs</span>
              <span className="text-[10px] font-mono text-emerald-400">spec.cy.ts</span>
            </div>

            <div className="p-3 space-y-1">
              <div className="text-[10px] font-mono text-slate-500 px-2 py-1 uppercase tracking-wider">
                E2E Checkout Flow
              </div>
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStepId(step.id)}
                  onMouseEnter={() => setActiveStepId(step.id)}
                  className={`w-full text-left p-2.5 rounded-lg text-xs font-mono transition flex items-center justify-between border ${
                    activeStepId === step.id 
                      ? 'bg-rose-500/10 text-rose-300 border-rose-500/30 font-bold' 
                      : 'bg-slate-900/60 text-slate-400 border-slate-900 hover:bg-slate-850 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-rose-400 font-bold">{step.command}</span>
                    <span className="text-slate-500 text-[10px] overflow-hidden truncate max-w-[120px]">{step.arg}</span>
                  </div>
                  <span className="text-[9px] text-slate-500 font-mono">#{step.id}</span>
                </button>
              ))}
            </div>

            {/* TIME TRAVEL LOG METRICS */}
            <div className="bg-slate-900 p-3.5 border-t border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span>Time-Travel Tracing State</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">{currentStep.details}</p>
            </div>
          </div>
        </div>

        {/* TIME-TRAVELLED BROWSER IFRAME SCREEN (7 COLS) */}
        <div className="lg:col-span-7">
          <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex flex-col h-full">
            {/* Mock Chrome Head Bar */}
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center gap-2 shrink-0">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 bg-rose-500 rounded-full"></span>
                <span className="w-2.5 h-2.5 bg-cyan-500 rounded-full"></span>
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
              </div>
              <div className="bg-slate-950 text-slate-400 text-[10px] font-mono px-3 py-1 rounded border border-slate-800 flex-1 flex items-center justify-between">
                <span>https://localhost:3000/checkout</span>
                <span className="text-rose-500 font-bold text-[9px] uppercase px-1 rounded bg-rose-500/10 border border-rose-500/20">
                  Time-Travel: Step #{currentStep.id}
                </span>
              </div>
            </div>

            {/* MOCK APPLICATION PORT */}
            <div className="p-6 bg-slate-900 flex-1 flex flex-col justify-center min-h-[220px]">
              {currentStep.domView === 'empty-form' && (
                <div className="max-w-sm mx-auto w-full space-y-3 animate-fadeIn">
                  <h4 className="text-sm font-bold text-slate-200">Checkout Payment</h4>
                  <div className="space-y-2">
                    <div className="bg-slate-950 p-3 rounded border border-slate-800">
                      <div className="w-20 h-2 bg-slate-800 rounded mb-1.5"></div>
                      <div className="w-full h-8 bg-slate-900 rounded border border-slate-850"></div>
                    </div>
                    <div className="h-8 w-full bg-slate-800 rounded-md"></div>
                  </div>
                </div>
              )}

              {currentStep.domView === 'filled-form' && (
                <div className="max-w-sm mx-auto w-full space-y-3 animate-fadeIn">
                  <h4 className="text-sm font-bold text-slate-200">Checkout Payment</h4>
                  <div className="space-y-2">
                    <div className="bg-slate-950 p-3 rounded border border-rose-500/40">
                      <div className="w-20 h-2 bg-slate-800 rounded mb-1.5"></div>
                      <div className="text-xs text-slate-200 font-mono px-1">pilot@skynet.com</div>
                    </div>
                    <div className="h-8 w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-md flex items-center justify-center">
                      Submit Order
                    </div>
                  </div>
                </div>
              )}

              {currentStep.domView === 'submitting' && (
                <div className="max-w-sm mx-auto w-full space-y-3 animate-fadeIn">
                  <h4 className="text-sm font-bold text-slate-200">Checkout Payment</h4>
                  <div className="space-y-2">
                    <div className="bg-slate-950 p-3 rounded border border-slate-850 opacity-50">
                      <div className="w-20 h-2 bg-slate-800 rounded mb-1.5"></div>
                      <div className="text-xs text-slate-200 font-mono px-1">pilot@skynet.com</div>
                    </div>
                    <div className="h-8 w-full bg-rose-600/20 border border-rose-500/30 text-rose-300 font-bold text-xs rounded-md flex items-center justify-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Processing transaction...</span>
                    </div>
                  </div>
                </div>
              )}

              {currentStep.domView === 'success-page' && (
                <div className="max-w-sm mx-auto w-full text-center space-y-3 animate-fadeIn">
                  <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-200">Payment Completed!</h4>
                  <p className="text-xs text-slate-400">Order reference <span className="font-mono text-emerald-400">#SKN-9021</span> has been successfully written to our database cloud bucket.</p>
                  <div className="text-[10px] font-mono text-slate-500 bg-slate-950 p-1.5 rounded inline-block border border-slate-800">
                    API Response code: 200 SUCCESS
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. FAKE TIMERS & ASYNC DIAGRAM
// ==========================================
function FakeTimersVisualizer() {
  const [useFakeTimers, setUseFakeTimers] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [simulatedTime, setSimulatedTime] = useState<number>(0);
  const [realSeconds, setRealSeconds] = useState<number>(0);
  const [actionDone, setActionDone] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const clockRef = useRef<NodeJS.Timeout | null>(null);

  // Clean timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (clockRef.current) clearInterval(clockRef.current);
    };
  }, []);

  const triggerAction = () => {
    setActionDone(false);
    setIsRunning(true);
    setSimulatedTime(0);
    setRealSeconds(0);

    if (timerRef.current) clearInterval(timerRef.current);
    if (clockRef.current) clearInterval(clockRef.current);

    if (useFakeTimers) {
      // In Fake Timers mode, time is frozen until advanced synchronously!
      // We do not start a real timer. We let user manually fire advance clock.
    } else {
      // Real Timers Mode: Ticks every 100ms
      const startTime = Date.now();
      timerRef.current = setInterval(() => {
        setSimulatedTime(prev => {
          if (prev >= 5000) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            setActionDone(true);
            return 5000;
          }
          return prev + 100;
        });
      }, 100);

      // Count actual real world seconds
      clockRef.current = setInterval(() => {
        setRealSeconds(prev => prev + 1);
      }, 1000);
    }
  };

  const advanceFakeTimers = (ms: number) => {
    if (!isRunning) return;
    setSimulatedTime(prev => {
      const nextTime = prev + ms;
      if (nextTime >= 5000) {
        setIsRunning(false);
        setActionDone(true);
        return 5000;
      }
      return nextTime;
    });
    // In Fake Timers, real-world seconds remain 0 (instant execution)!
  };

  const toggleTimerMode = () => {
    setUseFakeTimers(!useFakeTimers);
    setIsRunning(false);
    setActionDone(false);
    setSimulatedTime(0);
    setRealSeconds(0);
    if (timerRef.current) clearInterval(timerRef.current);
    if (clockRef.current) clearInterval(clockRef.current);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">Aesthetic Diagram #5</span>
          <h3 className="text-lg font-bold text-slate-100 mt-2">Jest Fake Timers (Synchronous Clock Simulator)</h3>
          <p className="text-slate-400 text-xs">Observe how `jest.useFakeTimers()` replaces real browser interval clocks with controllable instant steps.</p>
        </div>
        <button
          onClick={toggleTimerMode}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            useFakeTimers 
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/30' 
              : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          {useFakeTimers ? 'Mode: Fake Timers Active' : 'Mode: Real Timers (Browser)'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* TIME STAGE (6 COLS) */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Simulated Execution Loop</span>
              <span className="text-[10px] text-slate-500 font-mono">5000ms delay target</span>
            </div>

            {/* LIVE SIMULATION VISUAL BOX */}
            <div className="py-8 px-6 bg-slate-900 rounded-lg border border-slate-800 text-center space-y-4">
              <div className="flex items-center justify-center gap-6">
                {/* Simulated test clock */}
                <div className="bg-slate-950 border border-slate-850 p-3 rounded-lg text-center min-w-[100px]">
                  <span className="text-[10px] text-slate-500 font-mono block">Simulated Time</span>
                  <span className="text-xl font-bold font-mono text-cyan-400">
                    {(simulatedTime / 1000).toFixed(1)}s
                  </span>
                </div>

                {/* Real physical world clock */}
                <div className="bg-slate-950 border border-slate-850 p-3 rounded-lg text-center min-w-[100px]">
                  <span className="text-[10px] text-slate-500 font-mono block">Real World Wait</span>
                  <span className="text-xl font-bold font-mono text-cyan-500">
                    {realSeconds}s
                  </span>
                </div>
              </div>

              {/* Progress bar of debounce/interval action */}
              <div className="space-y-1 text-left">
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Debounce Action Loading...</span>
                  <span>{Math.floor((simulatedTime / 5000) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-950 h-3 rounded-full border border-slate-850 overflow-hidden">
                  <div 
                    className="h-full bg-cyan-500 transition-all duration-200"
                    style={{ width: `${(simulatedTime / 5000) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* ACTION DONE STATE */}
              {actionDone ? (
                <div className="text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1.5 bg-emerald-500/10 py-1.5 rounded border border-emerald-500/20 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Callback successfully executed!</span>
                </div>
              ) : isRunning ? (
                <div className="text-cyan-400 text-xs font-mono flex items-center justify-center gap-1.5 bg-cyan-500/10 py-1.5 rounded border border-cyan-500/20">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Clock ticking...</span>
                </div>
              ) : (
                <div className="text-slate-500 text-xs py-1.5">
                  Click "Start Action" to begin.
                </div>
              )}
            </div>

            {/* BUTTON CONTROLS */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={triggerAction}
                className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-2 px-4 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Start 5s Action</span>
              </button>

              {useFakeTimers && isRunning && (
                <button
                  onClick={() => advanceFakeTimers(5000)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-4 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 border border-emerald-500/20 animate-bounce"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                  <span>jest.advanceTimersByTime(5000)</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* EXPLANATORY COMPACT NOTES (6 COLS) */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 flex-1 flex flex-col justify-between">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">How Fake Timers Speed Up Testing</h4>
            <div className="text-xs text-slate-400 space-y-3 flex-1 leading-relaxed">
              <p>
                In a standard browser environment, delaying logic requires real CPU cycles and clock intervals (e.g., <code className="text-slate-200">setTimeout(fn, 5000)</code> makes you wait exactly 5 seconds).
              </p>
              <div className="bg-slate-900 border border-slate-850 p-3 rounded-lg">
                <span className="font-semibold text-slate-200 text-[11px] block mb-1">Tradeoff Checklist:</span>
                <ul className="space-y-1 text-[11px]">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                    <span><strong>Real Timers:</strong> Forces Jest to spin for 5 full seconds. Incredibly slow. Prone to timeouts in CI pipes.</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-emerald-400 rounded-full"></span>
                    <span><strong>Fake Timers:</strong> Overrides date hooks. Fast-forwards standard intervals instantly, synchronous execution.</span>
                  </li>
                </ul>
              </div>
              <p>
                Try clicking <strong>Start 5s Action</strong> on both modes. In Real Timers mode, you have to wait 5 full seconds. In Fake Timers mode, the clock freezes, and the button appears to fast-forward instantly!
              </p>
            </div>

            <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-cyan-300 border border-slate-800 mt-4 overflow-x-auto leading-normal">
              jest.useFakeTimers();<br />
              // ... Trigger actions<br />
              jest.advanceTimersByTime(5000);<br />
              expect(callback).toHaveBeenCalled();
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
