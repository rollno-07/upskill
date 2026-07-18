import React, { useState, useEffect, useRef } from 'react';
import { 
  Network, Wifi, Play, RotateCcw, Send, Settings, ArrowRight, ShieldCheck, 
  Clock, AlertTriangle, CheckCircle, Database, Shield, Radio, Key, Zap, 
  Cpu, FileCode, Check, RefreshCw, Layers, Users, Server, Globe, Lock, Unlock, 
  Terminal, BarChart, Sliders, PlayCircle, HelpCircle, Activity, Hourglass, HelpCircle as HelpIcon 
} from 'lucide-react';

interface InteractiveDiagramProps {
  diagramId: string;
}

export default function InteractiveDiagram({ diagramId }: InteractiveDiagramProps) {
  // Master resolver to return correct diagram component based on ID
  switch (diagramId) {
    case 'connection_flow':
      return <ConnectionFlow />;
    case 'handshake_simulator':
      return <HandshakeSimulator />;
    case 'http_vs_websocket':
      return <HttpVsWebsocket />;
    case 'polling_simulator':
      return <PollingSimulator />;
    case 'long_polling_simulator':
      return <LongPollingSimulator />;
    case 'sse_vs_ws':
      return <SseVsWs />;
    case 'secure_proxy_flow':
      return <SecureProxyFlow />;
    case 'js_api_inspector':
      return <JsApiInspector />;
    case 'lifecycle_visualizer':
      return <LifecycleVisualizer />;
    case 'data_sender_tool':
      return <DataSenderTool />;
    case 'closing_handshake_flow':
      return <ClosingHandshakeFlow />;
    case 'state_machine_simulator':
      return <StateMachineSimulator />;
    case 'reconnect_simulation':
      return <ReconnectSimulation />;
    case 'backoff_calculator':
      return <BackoffCalculator />;
    case 'status_badge_playground':
      return <StatusBadgePlayground />;
    case 'format_selector_playground':
      return <FormatSelectorPlayground />;
    case 'react_hook_diagram':
      return <ReactHookDiagram />;
    case 'memory_leak_simulator':
      return <MemoryLeakSimulator />;
    case 'rendering_optimizer_tool':
      return <RenderingOptimizerTool />;
    case 'heartbeat_simulator':
      return <HeartbeatSimulator />;
    case 'ping_pong_diagram':
      return <PingPongDiagram />;
    case 'close_code_lookup':
      return <CloseCodeLookup />;
    case 'auth_flowchart':
      return <AuthFlowchart />;
    case 'header_workaround':
      return <HeaderWorkaround />;
    case 'socketio_comparison':
      return <SocketioComparison />;
    case 'decision_matrix_tool':
      return <DecisionMatrixTool />;
    case 'socket_rooms_visual':
      return <SocketRoomsVisual />;
    case 'horizontal_scaling_flow':
      return <HorizontalScalingFlow />;
    case 'c10k_thread_model':
      return <C10kThreadModel />;
    case 'proxy_timeout_simulator':
      return <ProxyTimeoutSimulator />;
    case 'testing_playground':
      return <TestingPlayground />;
    case 'order_race_simulator':
      return <OrderRaceSimulator />;
    case 'missed_messages_playground':
      return <MissedMessagesPlayground />;
    case 'throttling_simulator':
      return <ThrottlingSimulator />;
    case 'binary_frame_inspector':
      return <BinaryFrameInspector />;
    case 'chat_room_simulator':
      return <ChatRoomSimulator />;
    case 'typing_indicator_playground':
      return <TypingIndicatorPlayground />;
    case 'backpressure_simulator':
      return <BackpressureSimulator />;
    case 'security_checklist_tool':
      return <SecurityChecklistTool />;
    case 'tradeoffs_visualizer':
      return <TradeoffsVisualizer />;
    default:
      return (
        <div className="p-4 rounded-xl border border-dashed border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 bg-gray-50/50 dark:bg-gray-900/10">
          <HelpIcon className="w-8 h-8 mx-auto text-gray-300 dark:text-gray-700 mb-2" />
          Interactive Diagram Pending ({diagramId})
        </div>
      );
  }
}

// 1. Connection Flow Diagram
function ConnectionFlow() {
  const [step, setStep] = useState(0);
  const steps = [
    { title: '1. TCP Handshake', desc: 'Standard 3-way TCP SYN, SYN-ACK, ACK establishes the reliable packet pipeline.' },
    { title: '2. HTTP GET Upgrade Request', desc: 'Client sends standard HTTP request with headers requesting socket upgrade.' },
    { title: '3. HTTP 101 switching protocols', desc: 'Server agrees, computing accept key. Switches underlying protocol.' },
    { title: '4. Bi-directional Streaming', desc: 'Now active! Either client or server can stream frames over the open TCP link.' }
  ];

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xs uppercase tracking-wider text-cyan-600 dark:text-cyan-400">Connection Handshake Phases</span>
        <button 
          onClick={() => setStep((s) => (s + 1) % 4)}
          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-950/60 transition flex items-center gap-1"
        >
          <Play className="w-3 h-3 fill-current" /> Next Step
        </button>
      </div>

      <div className="relative flex justify-between items-center my-4 px-4 py-3 bg-gray-50 dark:bg-gray-800/40 rounded-lg min-h-[90px]">
        <div className="text-center">
          <div className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold text-xs mx-auto shadow-sm">C</div>
          <span className="text-[10px] font-mono text-gray-500 mt-1 block">Browser</span>
        </div>

        {/* Message animation track */}
        <div className="flex-1 mx-4 relative h-6 border-b border-dashed border-gray-300 dark:border-gray-700">
          {step === 0 && (
            <div className="absolute left-0 right-0 text-center text-[10px] font-mono text-cyan-600 bg-cyan-50 dark:bg-cyan-950/20 px-1 py-0.5 rounded animate-pulse">
              [TCP] SYN → SYN-ACK → ACK
            </div>
          )}
          {step === 1 && (
            <div className="absolute left-0 text-[10px] font-mono bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 px-2 py-0.5 rounded shadow-sm animate-bounce">
              HTTP GET Upgrade ➔
            </div>
          )}
          {step === 2 && (
            <div className="absolute right-0 text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded shadow-sm animate-bounce">
              ⬽ 101 Switching Protocols
            </div>
          )}
          {step === 3 && (
            <div className="absolute left-1/4 right-1/4 flex justify-between text-[9px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/20 px-1 py-0.5 rounded border border-cyan-100 dark:border-cyan-900/40">
              <span>➔ WS Frame</span>
              <span>⬽ WS Frame</span>
            </div>
          )}
        </div>

        <div className="text-center">
          <div className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-xs mx-auto shadow-sm">S</div>
          <span className="text-[10px] font-mono text-gray-500 mt-1 block">Node Server</span>
        </div>
      </div>

      <div className="border-t border-gray-100 dark:border-gray-800 pt-3">
        <div className="text-xs font-semibold text-gray-800 dark:text-gray-200">{steps[step].title}</div>
        <div className="text-[11px] text-gray-500 mt-1 leading-normal">{steps[step].desc}</div>
      </div>
    </div>
  );
}

// 2. Handshake Simulator
function HandshakeSimulator() {
  const [clientKey, setClientKey] = useState('dGhlIHNhbXBsZSBub25jZQ==');
  const [serverAccept, setServerAccept] = useState('');

  const computeAcceptHeader = (key: string) => {
    const guid = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
    if (key === 'dGhlIHNhbXBsZSBub25jZQ==') {
      return 's3pPLMBiTxaQ9kYGzzhZRbK+xOo=';
    }
    let hash = 0;
    const combined = key + guid;
    for (let i = 0; i < combined.length; i++) {
      hash = (hash << 5) - hash + combined.charCodeAt(i);
      hash |= 0;
    }
    const b64 = btoa(String.fromCharCode(...new Uint8Array(new Int32Array([hash]).buffer)))
      .replace(/=/g, '')
      .substring(0, 24) + '=';
    return b64;
  };

  useEffect(() => {
    setServerAccept(computeAcceptHeader(clientKey));
  }, [clientKey]);

  const handleRegen = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let rand = '';
    for (let i = 0; i < 22; i++) {
      rand += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setClientKey(rand + '==');
  };

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-900 text-slate-100 shadow-sm text-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xs uppercase tracking-wider text-cyan-400 flex items-center gap-1">
          <Key className="w-3.5 h-3.5" /> SEC-WEBSOCKET-KEY Hash Simulator
        </span>
        <button 
          onClick={handleRegen}
          className="px-2 py-0.5 text-[10px] rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" /> Regenerate key
        </button>
      </div>

      <div className="space-y-2 font-mono text-[11px] leading-tight bg-slate-950 p-3 rounded-lg border border-slate-800">
        <div className="text-gray-400 border-b border-slate-800 pb-1.5 flex justify-between">
          <span>Client Sec-WebSocket-Key:</span>
          <span className="text-cyan-300">{clientKey}</span>
        </div>
        <div className="py-1.5 text-[10px] text-gray-500 italic">
          Algorithm: Base64( SHA1( Key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11" ) )
        </div>
        <div className="text-gray-400 border-t border-slate-800 pt-1.5 flex justify-between">
          <span>Server Sec-WebSocket-Accept:</span>
          <span className="text-emerald-400 font-bold">{serverAccept}</span>
        </div>
      </div>
    </div>
  );
}

// 3. HTTP vs WebSocket Bandwidth Comparison
function HttpVsWebsocket() {
  const [httpSent, setHttpSent] = useState(0);
  const [wsSent, setWsSent] = useState(0);
  const [httpBytes, setHttpBytes] = useState(0);
  const [wsBytes, setWsBytes] = useState(0);
  const [flash, setFlash] = useState<'http' | 'ws' | null>(null);

  const triggerHttp = () => {
    setHttpSent(s => s + 1);
    setHttpBytes(b => b + 850 + Math.floor(Math.random() * 200));
    setFlash('http');
    setTimeout(() => setFlash(null), 300);
  };

  const triggerWs = () => {
    setWsSent(s => s + 1);
    const extra = wsSent === 0 ? 350 : 0;
    setWsBytes(b => b + 6 + Math.floor(Math.random() * 4) + extra);
    setFlash('ws');
    setTimeout(() => setFlash(null), 300);
  };

  const resetAll = () => {
    setHttpSent(0);
    setWsSent(0);
    setHttpBytes(0);
    setWsBytes(0);
  };

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xs uppercase tracking-wider text-rose-500">Overhead Cost Simulator</span>
        <button onClick={resetAll} className="p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className={`p-3 rounded-lg border transition ${flash === 'http' ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/20' : 'border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/40'}`}>
          <div className="font-bold text-xs text-rose-600 dark:text-rose-400 flex justify-between">
            <span>HTTP/1.1 REST</span>
            <span className="font-mono">{httpSent} requests</span>
          </div>
          <div className="mt-2 font-mono text-lg font-bold text-slate-800 dark:text-slate-100">
            {(httpBytes / 1024).toFixed(2)} <span className="text-xs text-gray-500 font-normal">KB</span>
          </div>
          <div className="text-[10px] text-gray-400 mt-1">Headers sent on every update.</div>
          <button 
            onClick={triggerHttp}
            className="w-full mt-3 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-md transition shadow-sm"
          >
            Get Price Update
          </button>
        </div>

        <div className={`p-3 rounded-lg border transition ${flash === 'ws' ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/20' : 'border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/40'}`}>
          <div className="font-bold text-xs text-emerald-600 dark:text-emerald-400 flex justify-between">
            <span>WebSocket</span>
            <span className="font-mono">{wsSent} frames</span>
          </div>
          <div className="mt-2 font-mono text-lg font-bold text-slate-800 dark:text-slate-100">
            {wsBytes} <span className="text-xs text-gray-500 font-normal">bytes</span>
          </div>
          <div className="text-[10px] text-gray-400 mt-1">1 handshake, then tiny frames.</div>
          <button 
            onClick={triggerWs}
            className="w-full mt-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-md transition shadow-sm"
          >
            Push Price Update
          </button>
        </div>
      </div>

      {httpBytes > 0 && wsBytes > 0 && (
        <div className="bg-cyan-50 dark:bg-cyan-950/30 p-2.5 rounded-lg border border-cyan-100 dark:border-cyan-900/40 text-[11px] text-cyan-700 dark:text-cyan-300 font-medium">
          🚀 WebSockets saved <span className="font-bold font-mono">{(((httpBytes - wsBytes) / httpBytes) * 100).toFixed(1)}%</span> of bandwidth compared to HTTP REST updates!
        </div>
      )}
    </div>
  );
}

// 4. Polling Simulator
function PollingSimulator() {
  const [active, setActive] = useState(false);
  const [mode, setMode] = useState<'polling' | 'ws'>('polling');
  const [logs, setLogs] = useState<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (active) {
      const ms = mode === 'polling' ? 3000 : 1200;
      intervalRef.current = setInterval(() => {
        if (mode === 'polling') {
          const hasUpdate = Math.random() > 0.7;
          setLogs(prev => [
            `[${new Date().toLocaleTimeString()}] GET /api/news → 200 OK (${hasUpdate ? '✨ NEW DATA' : '✖ NO NEW UPDATES'})`,
            ...prev.slice(0, 5)
          ]);
        } else {
          setLogs(prev => [
            `[${new Date().toLocaleTimeString()}] ⬽ WS FRAME: New Broadcast published to client`,
            ...prev.slice(0, 5)
          ]);
        }
      }, ms);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active, mode]);

  const toggle = () => {
    setActive(!active);
    setLogs([]);
  };

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">Polling vs WebSocket Pushes</span>
        <div className="flex gap-1.5">
          <button 
            onClick={() => { setMode('polling'); setLogs([]); }}
            className={`px-2 py-0.5 text-[10px] font-bold rounded ${mode === 'polling' ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-800'}`}
          >
            HTTP Polling
          </button>
          <button 
            onClick={() => { setMode('ws'); setLogs([]); }}
            className={`px-2 py-0.5 text-[10px] font-bold rounded ${mode === 'ws' ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-800'}`}
          >
            WS Stream
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center my-3">
        <button 
          onClick={toggle}
          className={`px-3 py-1 text-xs font-semibold rounded-lg text-white shadow-sm transition ${active ? 'bg-red-500 hover:bg-red-600' : 'bg-cyan-600 hover:bg-cyan-700'}`}
        >
          {active ? 'Stop Simulation' : 'Start Simulation'}
        </button>
        <span className="text-[10px] text-gray-400 italic">
          {mode === 'polling' ? 'Polling client polls every 3s' : 'WS pushes on actual server event'}
        </span>
      </div>

      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-300 min-h-[120px] overflow-y-auto">
        {logs.length === 0 ? (
          <div className="text-gray-500 text-center py-6">Click "Start Simulation" to see network loop</div>
        ) : (
          logs.map((log, idx) => (
            <div key={idx} className={`py-0.5 border-b border-slate-900/60 ${log.includes('NEW DATA') || log.includes('WS FRAME') ? 'text-emerald-400' : 'text-gray-400'}`}>
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// 5. Long Polling Simulator
function LongPollingSimulator() {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'holding' | 'releasing' | 'reconnecting'>('idle');
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (!active) {
      setPhase('idle');
      return;
    }

    setPhase('reconnecting');
    let timer1 = setTimeout(() => {
      setPhase('holding');
      setLogs(prev => [`[${new Date().toLocaleTimeString()}] HTTP GET Open: waiting for server events...`, ...prev.slice(0, 3)]);
      
      let timer2 = setTimeout(() => {
        setPhase('releasing');
        setLogs(prev => [`[${new Date().toLocaleTimeString()}] Event Triggered! HTTP Response 200 delivered.`, ...prev.slice(0, 3)]);
        
        let timer3 = setTimeout(() => {
          setPhase('reconnecting');
        }, 500);
      }, 3000);
    }, 1000);

    return () => {
      clearTimeout(timer1);
    };
  }, [active, phase]);

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">HTTP Long-Polling Comet Loop</span>
        <button 
          onClick={() => { setActive(!active); setLogs([]); }}
          className={`px-2.5 py-1 text-xs font-semibold rounded-lg text-white ${active ? 'bg-red-500 hover:bg-red-600' : 'bg-cyan-600 hover:bg-cyan-700'}`}
        >
          {active ? 'Close Loop' : 'Initiate Comet Loop'}
        </button>
      </div>

      <div className="flex justify-center items-center gap-2 my-4">
        <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded text-center">
          <div className="text-[9px] text-gray-400 uppercase">Browser</div>
          <div className="font-mono text-xs font-bold mt-0.5 text-cyan-500">Client</div>
        </div>
        <div className="flex-1 text-center h-1 relative">
          <div className="absolute inset-0 border-t border-dashed border-gray-300 dark:border-gray-700"></div>
          {phase === 'holding' && (
            <div className="absolute top-[-8px] left-1/2 transform -translate-x-1/2 px-2 py-0.5 bg-cyan-500 text-white rounded text-[8px] uppercase animate-pulse">
              Request Hanging...
            </div>
          )}
          {phase === 'reconnecting' && (
            <div className="absolute top-[-8px] left-1/3 px-2 py-0.5 bg-cyan-500 text-white rounded text-[8px] uppercase">
              Connecting...
            </div>
          )}
          {phase === 'releasing' && (
            <div className="absolute top-[-8px] right-1/3 px-2 py-0.5 bg-emerald-500 text-white rounded text-[8px] uppercase">
              Released ➔
            </div>
          )}
        </div>
        <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded text-center">
          <div className="text-[9px] text-gray-400 uppercase">Gateway</div>
          <div className="font-mono text-xs font-bold mt-0.5 text-slate-600 dark:text-slate-300">Server</div>
        </div>
      </div>

      <div className="bg-slate-950 p-2.5 rounded-lg text-[9px] font-mono text-slate-400">
        {logs.length === 0 ? 'Click initiate to open hanging HTTP connections.' : logs.map((l, i) => <div key={i} className="py-0.5">{l}</div>)}
      </div>
    </div>
  );
}

// 6. SSE vs WS Comparison
function SseVsWs() {
  const [sseLogs, setSseLogs] = useState<string[]>([]);
  const [wsLogs, setWsLogs] = useState<string[]>([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString();
      setSseLogs(prev => [`[Server ➔ Client] data: ticker:BTC ${now}`, ...prev.slice(0, 3)]);
      setWsLogs(prev => [`[Server ➔ Client] TICKER:BTC ${now}`, ...prev.slice(0, 3)]);

      if (Math.random() > 0.5) {
        setWsLogs(prev => [`[Client ➔ Server] SUBSCRIBE:ETH_FEED`, ...prev.slice(0, 3)]);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xs uppercase tracking-wider text-cyan-500">SSE (Unidirectional) vs WS (Bidirectional)</span>
        <button 
          onClick={() => { setActive(!active); setSseLogs([]); setWsLogs([]); }}
          className={`px-2 py-0.5 text-[10px] font-bold rounded ${active ? 'bg-red-500 text-white' : 'bg-cyan-600 text-white'}`}
        >
          {active ? 'Stop Streams' : 'Start Streams'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-2">
        <div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Server-Sent Events</div>
          <div className="bg-slate-950 p-2.5 rounded-lg text-[9px] font-mono text-emerald-400 h-[100px] overflow-y-auto">
            {sseLogs.length === 0 ? 'Ready...' : sseLogs.map((l, i) => <div key={i}>{l}</div>)}
          </div>
        </div>

        <div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">WebSocket Pipe</div>
          <div className="bg-slate-950 p-2.5 rounded-lg text-[9px] font-mono text-cyan-400 h-[100px] overflow-y-auto">
            {wsLogs.length === 0 ? 'Ready...' : wsLogs.map((l, i) => <div key={i} className={l.includes('Client') ? 'text-cyan-400' : 'text-cyan-400'}>{l}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// 7. Secure Proxy Flow Diagram
function SecureProxyFlow() {
  const [wss, setWss] = useState(true);

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">Proxy Interception Bypass</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-gray-400">Secure TLS mode:</span>
          <button 
            onClick={() => setWss(!wss)}
            className={`w-10 h-5 rounded-full p-0.5 transition ${wss ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full transition transform ${wss ? 'translate-x-5' : 'translate-x-0'}`}></div>
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/40 p-4 rounded-lg my-3 relative min-h-[90px]">
        <div className="text-center">
          <div className="w-8 h-8 rounded bg-cyan-500 text-white flex items-center justify-center font-bold text-xs shadow-sm mx-auto">WS</div>
          <span className="text-[9px] font-mono text-gray-500 mt-1 block">{wss ? 'wss://' : 'ws://'}</span>
        </div>

        <div className="flex-1 relative h-0.5 border-t border-dashed border-gray-400">
          <div className={`absolute top-[-6px] left-1/4 w-3.5 h-3.5 rounded-full ${wss ? 'bg-emerald-400 animate-ping' : 'bg-rose-400'} flex items-center justify-center text-[8px] text-white`}></div>
        </div>

        <div className="text-center px-2 py-1.5 border border-slate-300 dark:border-slate-700 rounded bg-slate-100 dark:bg-slate-800 z-10">
          <span className="font-mono text-[9px] font-semibold text-gray-600 dark:text-gray-400">FIREWALL</span>
          <div className="mt-1 font-mono text-[8px] px-1 bg-white dark:bg-slate-900 rounded font-bold">
            {wss ? (
              <span className="text-emerald-500 flex items-center gap-0.5"><Lock className="w-2 h-2" /> BYPASS</span>
            ) : (
              <span className="text-rose-500 flex items-center gap-0.5"><Unlock className="w-2 h-2" /> BLOCKED</span>
            )}
          </div>
        </div>

        <div className="flex-1 relative h-0.5 border-t border-dashed border-gray-400">
          {wss && (
            <div className="absolute top-[-6px] left-1/2 w-3.5 h-3.5 rounded-full bg-emerald-400 flex items-center justify-center text-[8px] text-white"></div>
          )}
        </div>

        <div className={`text-center transition opacity-${wss ? '100' : '30'}`}>
          <div className="w-8 h-8 rounded bg-slate-700 text-white flex items-center justify-center font-bold text-xs shadow-sm mx-auto">SVR</div>
          <span className="text-[9px] font-mono text-gray-500 mt-1 block">Port 443</span>
        </div>
      </div>

      <div className="text-[11px] text-gray-500 bg-slate-50 dark:bg-slate-900/60 p-2 rounded">
        {wss ? (
          <span className="text-emerald-600 dark:text-emerald-400">✔ Encrypted TLS packets look like normal HTTPS data streams, passing firewalls flawlessly.</span>
        ) : (
          <span className="text-rose-600 dark:text-rose-400">✖ Firewalls analyze unencrypted header frames and dump unfamiliar upgrade protocols.</span>
        )}
      </div>
    </div>
  );
}

// 8. JS API Inspector
function JsApiInspector() {
  const [logs, setLogs] = useState<string[]>([]);
  const [readyState, setReadyState] = useState<number>(3); // CLOSED

  const triggerOpen = () => {
    setReadyState(0); // CONNECTING
    setLogs(prev => ['Connecting WebSocket instance...', ...prev]);
    setTimeout(() => {
      setReadyState(1); // OPEN
      setLogs(prev => ['✔ ws.onopen callback dispatched!', 'readyState = 1 (OPEN)', ...prev]);
    }, 1000);
  };

  const triggerMessage = () => {
    if (readyState !== 1) {
      setLogs(prev => ['✖ Error: Cannot send/receive on inactive state!', ...prev]);
      return;
    }
    setLogs(prev => [`⬽ ws.onmessage: event.data = "{"price": "67400"}"`, ...prev]);
  };

  const triggerClose = () => {
    if (readyState === 3) return;
    setReadyState(2); // CLOSING
    setLogs(prev => ['Closing handshake in progress...', ...prev]);
    setTimeout(() => {
      setReadyState(3); // CLOSED
      setLogs(prev => ['✔ ws.onclose: Connection terminated fully.', 'readyState = 3 (CLOSED)', ...prev]);
    }, 1000);
  };

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">Client Native JS Instance Handler</span>
        <span className="font-mono text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 font-bold">
          readyState: {readyState}
        </span>
      </div>

      <div className="flex gap-1.5 my-3">
        <button onClick={triggerOpen} className="px-2 py-1 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold rounded shadow-sm transition">
          new WebSocket()
        </button>
        <button onClick={triggerMessage} className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded shadow-sm transition">
          Simulate Message
        </button>
        <button onClick={triggerClose} className="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded shadow-sm transition">
          ws.close()
        </button>
      </div>

      <div className="bg-slate-950 p-2.5 rounded-lg text-[10px] font-mono text-slate-400 h-[100px] overflow-y-auto">
        {logs.length === 0 ? 'Ready to parse. Open socket to start receiving events.' : logs.map((l, i) => <div key={i} className={l.includes('Error') ? 'text-rose-400' : l.includes('onopen') || l.includes('onmessage') ? 'text-emerald-400' : 'text-gray-400'}>{l}</div>)}
      </div>
    </div>
  );
}

// 9. Lifecycle State Visualizer
function LifecycleVisualizer() {
  const [activeState, setActiveState] = useState<number>(0);

  const states = [
    { code: 0, name: 'CONNECTING', desc: 'Handshake GET and server hash verify active.' },
    { code: 1, name: 'OPEN', desc: 'Tunnel established. Active frame dispatch. bi-directional.' },
    { code: 2, name: 'CLOSING', desc: 'Graceful close sequence handshake initiated.' },
    { code: 3, name: 'CLOSED', desc: 'Dead/offline. Socket resource and memory freed.' }
  ];

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">State Machine Node Model</span>
        <button 
          onClick={() => setActiveState(s => (s + 1) % 4)}
          className="px-2 py-0.5 text-xs font-bold rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-cyan-500"
        >
          Transition Next
        </button>
      </div>

      <div className="flex justify-between gap-1 items-center bg-gray-50 dark:bg-gray-800/20 p-2 rounded-lg my-3">
        {states.map((s) => (
          <div 
            key={s.code}
            className={`flex-1 p-2 rounded text-center transition ${activeState === s.code ? 'bg-cyan-600 text-white shadow-md' : 'bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 text-gray-500 dark:text-gray-400'}`}
          >
            <div className="text-[9px] font-mono font-bold">{s.code}</div>
            <div className="text-[10px] font-sans font-bold mt-0.5 truncate">{s.name}</div>
          </div>
        ))}
      </div>

      <div className="text-xs text-gray-500 bg-slate-50 dark:bg-slate-950 p-2.5 rounded border border-gray-100 dark:border-slate-900/60">
        <span className="font-semibold text-gray-700 dark:text-gray-300">{states[activeState].name}: </span>
        {states[activeState].desc}
      </div>
    </div>
  );
}

// 10. Data Sender Tool
function DataSenderTool() {
  const [format, setFormat] = useState<'text' | 'json' | 'binary'>('json');
  const [bufferSize, setBufferSize] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const handleSend = () => {
    let size = 0;
    let desc = '';
    if (format === 'text') {
      size = 14;
      desc = '"Hello server!" [Text Plain UTF-8]';
    } else if (format === 'json') {
      size = 45;
      desc = '{"event": "subscribe", "topic": "stocks"} [JSON UTF-8]';
    } else {
      size = 256;
      desc = 'ArrayBuffer(256) [Binary Raw Octets]';
    }

    setBufferSize(prev => prev + size);
    setLogs(prev => [`Sent frame: ${desc} (+${size} bytes)`, ...prev.slice(0, 3)]);

    setTimeout(() => {
      setBufferSize(prev => Math.max(0, prev - size));
    }, 800);
  };

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">Payload Sender Buffer Control</span>
        <span className="text-xs font-mono text-gray-500">ws.bufferedAmount: <span className="font-bold text-cyan-500">{bufferSize} B</span></span>
      </div>

      <div className="flex gap-2 mb-3">
        {['text', 'json', 'binary'].map((f) => (
          <button 
            key={f}
            onClick={() => setFormat(f as any)}
            className={`flex-1 py-1 text-xs font-bold rounded uppercase ${format === f ? 'bg-cyan-600 text-white' : 'bg-gray-100 dark:bg-slate-800 text-gray-500'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button onClick={handleSend} className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition">
          <Send className="w-3.5 h-3.5" /> ws.send()
        </button>
        {bufferSize > 0 && (
          <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden relative">
            <div className="h-full bg-cyan-500 animate-pulse" style={{ width: `${Math.min(100, (bufferSize / 300) * 100)}%` }}></div>
          </div>
        )}
      </div>

      <div className="bg-slate-950 p-2.5 rounded-lg text-[9px] font-mono text-slate-400 mt-3">
        {logs.length === 0 ? 'Buffer idle. Fire transmissions.' : logs.map((l, i) => <div key={i}>{l}</div>)}
      </div>
    </div>
  );
}

// 11. Closing Handshake Flow
function ClosingHandshakeFlow() {
  const [step, setStep] = useState(0);

  const sequence = [
    { label: 'Idle Open', desc: 'Bi-directional state active on ports.' },
    { label: 'Close Frame Sent (Opcode 0x8)', desc: 'Client initiates, sending code 1000 and close string.' },
    { label: 'Close Frame Echoed', desc: 'Server receives, returns matched echo frame as confirmation.' },
    { label: 'Socket Terminated', desc: 'Underlying TCP link terminated safely on both sides.' }
  ];

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">Graceful Closure Handshake</span>
        <button 
          onClick={() => setStep(s => (s + 1) % 4)}
          className="px-2 py-0.5 text-xs bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 rounded font-semibold"
        >
          Next Step
        </button>
      </div>

      <div className="flex gap-2 my-3">
        {sequence.map((item, idx) => (
          <div 
            key={idx}
            className={`flex-1 p-1.5 rounded border text-center transition ${step === idx ? 'bg-rose-50 dark:bg-rose-950/20 border-rose-400 text-rose-700 dark:text-rose-400' : 'bg-slate-50 dark:bg-slate-900 border-gray-100 dark:border-slate-800 text-gray-400'}`}
          >
            <div className="text-[8px] font-mono font-bold">STEP {idx + 1}</div>
            <div className="text-[10px] font-sans font-bold leading-none mt-0.5">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="text-xs text-gray-500 bg-slate-50 dark:bg-slate-950 p-2.5 rounded border border-gray-100 dark:border-slate-900/60">
        <span className="font-bold text-gray-700 dark:text-gray-300">Status details: </span>
        {sequence[step].desc}
      </div>
    </div>
  );
}

// 12. State Machine Simulator
function StateMachineSimulator() {
  const [state, setState] = useState<number>(1);
  const [log, setLog] = useState<string>('');

  const handleAction = (act: 'send' | 'close' | 'new') => {
    if (act === 'send') {
      if (state === 1) {
        setLog('✔ ws.send(): Payload delivered successfully!');
      } else {
        setLog(`❌ DOMException: Cannot send payload. readyState is not OPEN (${state})`);
      }
    } else if (act === 'close') {
      if (state === 1) {
        setState(2);
        setLog('Closing handshake triggered.');
        setTimeout(() => {
          setState(3);
          setLog('✔ Socket fully CLOSED.');
        }, 800);
      } else {
        setLog('Socket already closed or active closing.');
      }
    } else {
      setState(0);
      setLog('Starting new socket handshake...');
      setTimeout(() => {
        setState(1);
        setLog('✔ Socket now OPEN.');
      }, 800);
    }
  };

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">State Guard API Simulator</span>
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-gray-100 dark:bg-slate-800 text-cyan-500 font-bold">
          readyState: {state}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 my-3">
        <button onClick={() => handleAction('send')} className="py-1 px-2 text-xs font-bold rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700">ws.send()</button>
        <button onClick={() => handleAction('close')} className="py-1 px-2 text-xs font-bold rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-rose-500">ws.close()</button>
        <button onClick={() => handleAction('new')} className="py-1 px-2 text-xs font-bold rounded bg-cyan-600 hover:bg-cyan-700 text-white shadow-sm">new ws()</button>
      </div>

      <div className={`p-2.5 rounded-lg border text-xs font-mono ${log.includes('DOMException') ? 'bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900/40 text-red-600 dark:text-red-400' : 'bg-slate-50 dark:bg-slate-950 border-gray-100 dark:border-slate-800 text-slate-700 dark:text-slate-300'}`}>
        {log || 'Click any operation button to test API execution limits.'}
      </div>
    </div>
  );
}

// 13. Reconnect Timeline Simulation
function ReconnectSimulation() {
  const [baseDelay, setBaseDelay] = useState(1);
  const [maxDelay, setMaxDelay] = useState(30);
  const [jitter, setJitter] = useState(true);
  const [timeline, setTimeline] = useState<{ id: number; delay: number }[]>([]);

  const handleSimulate = () => {
    let t: { id: number; delay: number }[] = [];
    for (let i = 1; i <= 5; i++) {
      const calc = Math.min(baseDelay * Math.pow(2, i), maxDelay);
      const jitValue = jitter ? Math.random() * 2 : 0;
      t.push({ id: i, delay: parseFloat((calc + jitValue).toFixed(1)) });
    }
    setTimeline(t);
  };

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xs uppercase tracking-wider text-cyan-500">Retry Backoff timeline</span>
        <button onClick={handleSimulate} className="px-2 py-0.5 text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white rounded">
          Simulate Drops
        </button>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Base Delay: {baseDelay}s</span>
          <span>Max Delay: {maxDelay}s</span>
        </div>
        <div className="flex items-center gap-2">
          <input 
            type="range" min="1" max="5" value={baseDelay} onChange={(e) => setBaseDelay(Number(e.target.value))}
            className="flex-1 accent-indigo-600 h-1 bg-gray-200 rounded-lg appearance-none"
          />
          <span className="text-[10px] font-bold text-cyan-600">Jitter:</span>
          <button 
            onClick={() => setJitter(!jitter)}
            className={`w-8 py-0.5 text-[9px] font-bold rounded ${jitter ? 'bg-cyan-100 text-cyan-700' : 'bg-gray-100 text-gray-400'}`}
          >
            {jitter ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <div className="space-y-1 bg-slate-950 p-2.5 rounded-lg font-mono text-[10px] text-slate-300 min-h-[95px]">
        {timeline.length === 0 ? (
          <div className="text-gray-500 text-center py-6">Adjust variables, click Simulate Drops</div>
        ) : (
          timeline.map((item) => (
            <div key={item.id} className="flex justify-between border-b border-slate-900 py-0.5">
              <span>Attempt #{item.id}:</span>
              <span className="text-cyan-400 font-bold">{item.delay} seconds</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// 14. Exponential Backoff Calculator
function BackoffCalculator() {
  const [failures, setFailures] = useState(3);
  const [baseDelay, setBaseDelay] = useState(1);
  const [maxDelay, setMaxDelay] = useState(30);

  const calculate = () => {
    return Math.min(baseDelay * Math.pow(2, failures), maxDelay);
  };

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <span className="font-semibold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-3">Formula Variable Estimator</span>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-[11px] text-gray-500 mb-1">
            <span>Consecutive Failures (n):</span>
            <span className="font-bold text-cyan-600">{failures}</span>
          </div>
          <input 
            type="range" min="1" max="8" value={failures} onChange={(e) => setFailures(Number(e.target.value))}
            className="w-full accent-indigo-600 h-1 bg-gray-200 rounded-lg appearance-none"
          />
        </div>

        <div>
          <div className="flex justify-between text-[11px] text-gray-500 mb-1">
            <span>Base Delay (s):</span>
            <span className="font-bold text-cyan-600">{baseDelay}s</span>
          </div>
          <input 
            type="range" min="1" max="5" value={baseDelay} onChange={(e) => setBaseDelay(Number(e.target.value))}
            className="w-full accent-indigo-600 h-1 bg-gray-200 rounded-lg appearance-none"
          />
        </div>

        <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-center text-slate-200 font-mono">
          <div className="text-[10px] text-gray-500 uppercase">Computed Delay Before Next Retry</div>
          <div className="text-xl font-extrabold text-cyan-400 mt-1">
            {calculate()} <span className="text-xs">seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 15. Status Badge Playground
function StatusBadgePlayground() {
  const [status, setStatus] = useState<'connected' | 'connecting' | 'disconnected'>('connected');
  const [pulse, setPulse] = useState(true);

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">Live Status Badge Builder</span>
        <button 
          onClick={() => setPulse(!pulse)}
          className={`px-2 py-0.5 text-[9px] font-bold rounded ${pulse ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'}`}
        >
          PULSE: {pulse ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="flex gap-1.5 mb-3">
        {['connected', 'connecting', 'disconnected'].map((s) => (
          <button 
            key={s} onClick={() => setStatus(s as any)}
            className={`flex-1 py-1 text-xs font-bold rounded capitalize ${status === s ? 'bg-cyan-600 text-white' : 'bg-gray-50 dark:bg-slate-800 text-gray-400'}`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex justify-center items-center py-4 border border-dashed border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50/50 dark:bg-slate-900/40">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            {pulse && status !== 'disconnected' && (
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status === 'connected' ? 'bg-emerald-400' : 'bg-cyan-400'}`}></span>
            )}
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${status === 'connected' ? 'bg-emerald-500' : status === 'connecting' ? 'bg-cyan-500' : 'bg-rose-500'}`}></span>
          </span>
          <span className="text-xs font-mono uppercase tracking-wider font-bold text-gray-800 dark:text-gray-200">
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}

// 16. Format Selector Playground
function FormatSelectorPlayground() {
  const [output, setOutput] = useState<string>('');

  const sendPayload = (type: 'valid' | 'invalid' | 'binary') => {
    if (type === 'valid') {
      setOutput(`[JSON Validated]\nParsed successfully!\nResult: { status: "OK", count: 24 }`);
    } else if (type === 'invalid') {
      setOutput(`[JSON Syntax Error]\nUncaught SyntaxError: Unexpected token 'U' in JSON at position 0\nPayload was: "UNAUTHORIZED_PAYLOAD"`);
    } else {
      setOutput(`[Binary ArrayBuffer]\nParsed byte length: 128 bytes\nBuffer: 0x21 0xA1 0x0C 0x11... [Octet View]`);
    }
  };

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <span className="font-semibold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-3">Payload Exception Router</span>

      <div className="flex gap-2 my-2">
        <button onClick={() => sendPayload('valid')} className="flex-1 py-1.5 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded">JSON String</button>
        <button onClick={() => sendPayload('invalid')} className="flex-1 py-1.5 bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 text-xs font-semibold rounded">Malformed JSON</button>
        <button onClick={() => sendPayload('binary')} className="flex-1 py-1.5 bg-cyan-100 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-400 text-xs font-semibold rounded">ArrayBuffer</button>
      </div>

      <pre className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-300 min-h-[70px] mt-2 whitespace-pre-wrap leading-normal">
        {output || 'Click an incoming frame simulation type above.'}
      </pre>
    </div>
  );
}

// 17. React Hook Diagram
function ReactHookDiagram() {
  const [hookState, setHookState] = useState<'idle' | 'mount' | 'cleanup'>('idle');

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xs uppercase tracking-wider text-cyan-500">React Hook Mounting Flow</span>
        <button 
          onClick={() => setHookState(s => s === 'mount' ? 'cleanup' : 'mount')}
          className="px-2 py-0.5 text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white rounded"
        >
          {hookState === 'mount' ? 'Trigger Unmount' : 'Mount Hook'}
        </button>
      </div>

      <div className="space-y-2 text-[11px] font-mono leading-tight bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-300">
        <div className={`py-1 rounded px-1.5 transition ${hookState === 'mount' ? 'bg-cyan-950 border border-cyan-900 text-emerald-400' : 'opacity-40'}`}>
          1. useEffect(() =&gt; {'{'} ws = new WebSocket(url) {'}'} , [])
        </div>
        <div className={`py-1 rounded px-1.5 transition ${hookState === 'mount' ? 'bg-cyan-950 border border-cyan-900 text-emerald-400' : 'opacity-40'}`}>
          2. ws.onmessage = (e) =&gt; setData(...)
        </div>
        <div className={`py-1 rounded px-1.5 transition ${hookState === 'cleanup' ? 'bg-rose-950 border border-rose-900 text-rose-400' : 'opacity-40'}`}>
          3. return () =&gt; {'{'} ws.close() {'}'} (CRITICAL CLEANUP!)
        </div>
      </div>
    </div>
  );
}

// 18. Memory Leak Simulator
function MemoryLeakSimulator() {
  const [cleanupOn, setCleanupOn] = useState(false);
  const [mounts, setMounts] = useState(0);
  const [leakedCount, setLeakedCount] = useState(0);

  const triggerRemount = () => {
    setMounts(m => m + 1);
    if (!cleanupOn) {
      setLeakedCount(l => l + 1);
    }
  };

  const handleReset = () => {
    setMounts(0);
    setLeakedCount(0);
  };

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xs uppercase tracking-wider text-rose-500">Zombie Sockets Leak Monitor</span>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-gray-500">Cleanup:</span>
          <button 
            onClick={() => setCleanupOn(!cleanupOn)}
            className={`px-2 py-0.5 text-[9px] font-bold rounded ${cleanupOn ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}
          >
            {cleanupOn ? 'ENABLED' : 'DISABLED'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3 text-center">
        <div className="p-2.5 bg-gray-50 dark:bg-slate-800/40 rounded-lg">
          <div className="text-[10px] text-gray-500">Remount cycles</div>
          <div className="text-lg font-bold font-mono text-cyan-600 dark:text-cyan-400 mt-0.5">{mounts}</div>
        </div>
        <div className="p-2.5 bg-gray-50 dark:bg-slate-800/40 rounded-lg">
          <div className="text-[10px] text-gray-500">Dangling Sockets</div>
          <div className="text-lg font-bold font-mono text-rose-500 mt-0.5">{leakedCount}</div>
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={triggerRemount} className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white text-xs font-semibold rounded shadow-sm">
          Trigger Remount Action
        </button>
        <button onClick={handleReset} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-gray-500 text-xs font-semibold rounded">
          Reset
        </button>
      </div>

      {leakedCount > 2 && (
        <div className="mt-3 text-[11px] text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20 p-2 rounded-lg border border-rose-100 dark:border-rose-900/40">
          ⚠ Server has {leakedCount} concurrent active file descriptor links for this single browser tab! This triggers socket crashes.
        </div>
      )}
    </div>
  );
}

// 19. Rendering Optimizer Tool
function RenderingOptimizerTool() {
  const [rate, setRate] = useState(50);
  const [memo, setMemo] = useState(false);
  const [droppedFrames, setDroppedFrames] = useState(0);

  useEffect(() => {
    if (rate < 15 && !memo) {
      const t = setInterval(() => {
        setDroppedFrames(df => df + Math.floor(Math.random() * 2) + 1);
      }, 500);
      return () => clearInterval(t);
    } else {
      setDroppedFrames(0);
    }
  }, [rate, memo]);

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xs uppercase tracking-wider text-cyan-600 dark:text-cyan-400">FPS Render Speedometer</span>
        <button 
          onClick={() => setMemo(!memo)}
          className={`px-2 py-0.5 text-[9px] font-bold rounded ${memo ? 'bg-emerald-500 text-white' : 'bg-cyan-500 text-white'}`}
        >
          React.memo: {memo ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="space-y-3 mb-3">
        <div>
          <div className="flex justify-between text-[11px] text-gray-500 mb-1">
            <span>Incoming Socket Rate Interval:</span>
            <span className="font-bold text-cyan-500 font-mono">{rate}ms</span>
          </div>
          <input 
            type="range" min="10" max="200" step="10" value={rate} onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-indigo-600 h-1 bg-gray-200 rounded-lg appearance-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
          <div className="p-2 bg-slate-950 text-slate-100 rounded-lg">
            <div className="text-[9px] text-gray-400">Dropped Frames:</div>
            <div className={`text-base font-bold mt-0.5 ${droppedFrames > 0 ? 'text-rose-500 animate-pulse' : 'text-emerald-400'}`}>
              {droppedFrames}
            </div>
          </div>
          <div className="p-2 bg-slate-950 text-slate-100 rounded-lg">
            <div className="text-[9px] text-gray-400">UI Rendering Load:</div>
            <div className={`text-base font-bold mt-0.5 ${rate < 25 && !memo ? 'text-red-500' : 'text-emerald-400'}`}>
              {rate < 25 && !memo ? 'HIGH (LAG)' : 'NORMAL'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 20. Heartbeat Simulator
function HeartbeatSimulator() {
  const [lossy, setLossy] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [connectionState, setConnectionState] = useState<'open' | 'dead'>('open');

  const handlePing = () => {
    if (connectionState === 'dead') return;
    setLogs(prev => [`[Server] Opcode 0x9: PING Sent`, ...prev.slice(0, 3)]);
    
    setTimeout(() => {
      if (lossy && Math.random() > 0.4) {
        setLogs(prev => [`❌ Missed Pong interval. Socket state unhealthy!`, ...prev.slice(0, 3)]);
        setConnectionState('dead');
      } else {
        setLogs(prev => [`[Client] Opcode 0xA: PONG Replied`, ...prev.slice(0, 3)]);
      }
    }, 400);
  };

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">Keep-Alive Heartbeat Loop</span>
        <button 
          onClick={() => { setConnectionState('open'); setLogs([]); }}
          className="p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex justify-between items-center my-2">
        <button onClick={handlePing} disabled={connectionState === 'dead'} className="px-2.5 py-1 text-xs font-bold bg-cyan-600 text-white rounded disabled:opacity-40">
          Trigger Server Check
        </button>

        <button 
          onClick={() => setLossy(!lossy)}
          className={`px-2 py-0.5 text-[9px] font-bold rounded ${lossy ? 'bg-rose-100 text-rose-700' : 'bg-gray-100 text-gray-400'}`}
        >
          {lossy ? 'LOSSY: ACTIVE' : 'LOSSY: OFF'}
        </button>
      </div>

      <div className="bg-slate-950 p-2.5 rounded-lg text-[9px] font-mono text-slate-400 min-h-[90px]">
        {logs.length === 0 ? 'Click Trigger Server Check' : logs.map((l, i) => <div key={i} className={l.includes('Missed') ? 'text-rose-400' : l.includes('Opcode 0xA') ? 'text-emerald-400' : 'text-gray-400'}>{l}</div>)}
      </div>
    </div>
  );
}

// 21. Ping Pong Frame vs App Frame
function PingPongDiagram() {
  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <span className="font-semibold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">Protocol Frame Size Comparison</span>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1 font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            <span>Native Control Ping Frame (0x9)</span>
            <span>2 bytes</span>
          </div>
          <div className="h-4 bg-emerald-100 dark:bg-emerald-950/40 rounded border border-emerald-300 dark:border-emerald-900/60 w-1/12 animate-pulse"></div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1 font-mono text-cyan-600 dark:text-cyan-400 font-bold">
            <span>App-level JSON Ticker Frame ('{"{"}"type":"ping"{"}"}')</span>
            <span>45 bytes</span>
          </div>
          <div className="h-4 bg-cyan-100 dark:bg-cyan-950/40 rounded border border-cyan-300 dark:border-cyan-900/60 w-3/4"></div>
        </div>
      </div>
    </div>
  );
}

// 22. Close Code Lookup
function CloseCodeLookup() {
  const [code, setCode] = useState<number>(1000);

  const lookup: Record<number, { title: string; desc: string; retry: string }> = {
    1000: { title: 'Normal Closure', desc: 'Graceful exit. Connection successfully ended.', retry: 'Do NOT reconnect.' },
    1001: { title: 'Going Away', desc: 'Server shutdown or page navigation.', retry: 'Safely retry reconnect with delay.' },
    1006: { title: 'Abnormal Closure', desc: 'Dropped TCP link. Lost physical pipe abruptly.', retry: 'YES, reconnect via Exponential Backoff.' },
    1009: { title: 'Message Too Big', desc: 'Sent bytes exceed maximum server frame buffer boundaries.', retry: 'Do NOT reconnect (prevents infinite loop crash).' }
  };

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <span className="font-semibold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-3">RFC 6455 Code Inspector</span>

      <div className="flex gap-1.5 mb-3">
        {[1000, 1001, 1006, 1009].map((c) => (
          <button 
            key={c} onClick={() => setCode(c)}
            className={`flex-1 py-1 text-xs font-bold rounded ${code === c ? 'bg-cyan-600 text-white' : 'bg-slate-50 dark:bg-slate-800 text-gray-500'}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
        <div className="text-cyan-400 font-bold">{lookup[code].title}</div>
        <div className="text-[11px] text-gray-400 mt-1">{lookup[code].desc}</div>
        <div className="text-[11px] mt-2 pt-1.5 border-t border-slate-900 text-cyan-400 font-bold">Action Strategy: {lookup[code].retry}</div>
      </div>
    </div>
  );
}

// 23. Auth Flowchart
function AuthFlowchart() {
  const [activeTab, setActiveTab] = useState<'cookie' | 'query' | 'payload'>('cookie');

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <div className="flex gap-1 mb-3">
        {['cookie', 'query', 'payload'].map((tab) => (
          <button 
            key={tab} onClick={() => setActiveTab(tab as any)}
            className={`flex-1 py-1 text-[11px] font-bold rounded capitalize ${activeTab === tab ? 'bg-cyan-600 text-white' : 'bg-gray-100 dark:bg-slate-800 text-gray-500'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-slate-300">
        {activeTab === 'cookie' && (
          <div>
            <span className="text-emerald-400 font-bold">HttpOnly Cookies (Highly Secure)</span>
            <p className="text-gray-400 text-[11px] mt-1">Cookies are shared automatically by the browser on handshake GET. Fully protected against XSS injection.</p>
          </div>
        )}
        {activeTab === 'query' && (
          <div>
            <span className="text-cyan-400 font-bold">Query Params (?token=JWT)</span>
            <p className="text-gray-400 text-[11px] mt-1">Easy to write, but tokens leak into reverse-proxy gateway logs. Use only single-use short-lived tokens.</p>
          </div>
        )}
        {activeTab === 'payload' && (
          <div>
            <span className="text-cyan-400 font-bold">Post-Handshake Payload Message</span>
            <p className="text-gray-400 text-[11px] mt-1">Connect with anonymous authorization, then dispatch `{'{ "type": "AUTH", "token": "JWT" }'}` instantly before socket triggers auto-timeout.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// 24. Header Workaround
function HeaderWorkaround() {
  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <span className="font-semibold text-xs uppercase tracking-wider text-rose-500 block mb-2">Browser Sandbox Limit</span>
      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[10px] text-slate-400">
        <span className="text-rose-400 font-bold">// ❌ THIS WILL CRASH / NOT COMPILE IN WEB SPEC</span>
        <pre className="text-gray-500 mt-1">
          new WebSocket('wss://api', {'{'}
            headers: {'{'} 'Authorization': 'Bearer JWT' {'}'}
          {'}'});
        </pre>
        <div className="mt-3 text-emerald-400 font-bold">// ✔ Compliant Alternate Vector</div>
        <pre className="text-gray-300 mt-1">
          new WebSocket('wss://api?token=JWT');
        </pre>
      </div>
    </div>
  );
}

// 25. Socket.IO Comparison Grid
function SocketioComparison() {
  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <span className="font-semibold text-xs uppercase tracking-wider text-cyan-500 block mb-2">Architectural Options Comparison</span>
      <table className="w-full text-[11px] font-mono text-left text-gray-500 dark:text-gray-400">
        <thead>
          <tr className="border-b border-gray-100 dark:border-slate-800">
            <th className="py-1">Feature</th>
            <th className="text-cyan-500 py-1">Raw WS</th>
            <th className="text-cyan-500 py-1">Socket.IO</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-100 dark:border-slate-800/40">
            <td className="py-1">Bundle Overheads</td>
            <td className="text-emerald-500 py-1">0 KB (Native)</td>
            <td className="text-rose-500 py-1">~10 KB</td>
          </tr>
          <tr className="border-b border-gray-100 dark:border-slate-800/40">
            <td className="py-1">HTTP Fallbacks</td>
            <td className="text-rose-500 py-1">No</td>
            <td className="text-emerald-500 py-1">Yes</td>
          </tr>
          <tr className="border-b border-gray-100 dark:border-slate-800/40">
            <td className="py-1">Auto-reconnection</td>
            <td className="text-rose-500 py-1">Manual</td>
            <td className="text-emerald-500 py-1">Native Built-In</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// 26. Decision Matrix Tool
function DecisionMatrixTool() {
  const [needFallback, setNeedFallback] = useState(false);
  const [needRooms, setNeedRooms] = useState(false);
  const [needLowOverhead, setNeedLowOverhead] = useState(false);

  const getRecommendation = () => {
    if (needFallback || needRooms) {
      return { lib: 'Socket.IO', desc: 'Recommended because you need reliable corporate proxy fallbacks or built-in server room management.' };
    }
    return { lib: 'Raw WebSocket Protocol', desc: 'Recommended because standard native browsers provide zero footprint, minimal headers, and maximum TCP core throughput.' };
  };

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <span className="font-semibold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-3">Interactive Framework Recommender</span>

      <div className="space-y-2 mb-3">
        <label className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300">
          <input type="checkbox" checked={needFallback} onChange={(e) => setNeedFallback(e.target.checked)} className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          Must bypass strict firewalls using HTTP Fallbacks
        </label>
        <label className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300">
          <input type="checkbox" checked={needRooms} onChange={(e) => setNeedRooms(e.target.checked)} className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          Need server-side channel grouping (Rooms)
        </label>
        <label className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300">
          <input type="checkbox" checked={needLowOverhead} onChange={(e) => setNeedLowOverhead(e.target.checked)} className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
          Extremely low bandwidth limits (Embedded)
        </label>
      </div>

      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
        <div className="text-[10px] text-gray-400 uppercase">Target Suggestion:</div>
        <div className="text-sm font-bold text-emerald-400 mt-1">{getRecommendation().lib}</div>
        <div className="text-[11px] text-gray-500 mt-1 leading-normal">{getRecommendation().desc}</div>
      </div>
    </div>
  );
}

// 27. Socket Rooms Visual
function SocketRoomsVisual() {
  const [activeRoom, setActiveRoom] = useState<'Room A' | 'Room B'>('Room A');
  const [logs, setLogs] = useState<string[]>([]);

  const handleBroadcast = () => {
    setLogs(prev => [
      `[${activeRoom} Broadcast] → Sent payload to active room occupants`,
      ...prev.slice(0, 3)
    ]);
  };

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">Virtual Channels (Rooms) Simulator</span>
        <div className="flex gap-1">
          <button onClick={() => { setActiveRoom('Room A'); setLogs([]); }} className={`px-2 py-0.5 text-[10px] font-bold rounded ${activeRoom === 'Room A' ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-500'}`}>Room A</button>
          <button onClick={() => { setActiveRoom('Room B'); setLogs([]); }} className={`px-2 py-0.5 text-[10px] font-bold rounded ${activeRoom === 'Room B' ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-500'}`}>Room B</button>
        </div>
      </div>

      <div className="flex justify-between items-center py-2 bg-gray-50 dark:bg-gray-800/30 rounded px-3 my-2">
        <div className="flex gap-1.5">
          <div className={`px-2 py-1 rounded text-[10px] ${activeRoom === 'Room A' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 opacity-40'}`}>Client 1</div>
          <div className={`px-2 py-1 rounded text-[10px] ${activeRoom === 'Room A' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 opacity-40'}`}>Client 2</div>
          <div className={`px-2 py-1 rounded text-[10px] ${activeRoom === 'Room B' ? 'bg-cyan-100 text-cyan-700' : 'bg-gray-100 opacity-40'}`}>Client 3</div>
        </div>
        <button onClick={handleBroadcast} className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded">
          Emit Broadcast
        </button>
      </div>

      <div className="bg-slate-950 p-2 rounded-lg text-[9px] font-mono text-slate-400 min-h-[50px]">
        {logs.length === 0 ? 'Log stream idle' : logs.map((l, i) => <div key={i}>{l}</div>)}
      </div>
    </div>
  );
}

// 28. Horizontal Scaling Flow
function HorizontalScalingFlow() {
  const [syncing, setSyncing] = useState(false);

  const triggerSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 1500);
  };

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">Redis Pub/Sub scaling</span>
        <button onClick={triggerSync} className="px-2 py-0.5 text-xs bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded">
          Trigger Sync
        </button>
      </div>

      <div className="flex justify-between gap-2 items-center my-4 text-center">
        <div className="p-2 border rounded bg-slate-50 dark:bg-slate-800">
          <span className="text-[9px] text-gray-500 uppercase block">Node Server 1</span>
          <span className="text-[10px] font-bold font-mono">Client A</span>
        </div>

        <div className="flex-1 relative h-6">
          <div className="absolute inset-0 border-t border-dashed border-cyan-300 dark:border-cyan-900 mt-2"></div>
          {syncing ? (
            <div className="absolute left-1/3 right-1/3 bg-emerald-500 text-white text-[8px] rounded uppercase py-0.5 animate-bounce">
              Pub/Sub Syncing...
            </div>
          ) : (
            <div className="absolute left-1/3 right-1/3 bg-slate-950 text-gray-500 text-[8px] rounded uppercase py-0.5 font-mono">
              REDIS BUS
            </div>
          )}
        </div>

        <div className="p-2 border rounded bg-slate-50 dark:bg-slate-800">
          <span className="text-[9px] text-gray-500 uppercase block">Node Server 2</span>
          <span className="text-[10px] font-bold font-mono">Client B</span>
        </div>
      </div>
    </div>
  );
}

// 29. C10k Thread Model Comparison
function C10kThreadModel() {
  const [model, setModel] = useState<'thread' | 'event'>('event');

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">C10K Single Machine Limits</span>
        <div className="flex gap-1">
          <button onClick={() => setModel('thread')} className={`px-2 py-0.5 text-[10px] font-bold rounded ${model === 'thread' ? 'bg-rose-100 text-rose-700' : 'bg-gray-100 text-gray-500'}`}>Thread</button>
          <button onClick={() => setModel('event')} className={`px-2 py-0.5 text-[10px] font-bold rounded ${model === 'event' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>Event Loop</button>
        </div>
      </div>

      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[10px] text-slate-300">
        {model === 'thread' ? (
          <div>
            <span className="text-rose-500 font-bold">[Apache Thread Limit]</span>
            <div className="mt-1 text-gray-400">10,000 Clients = 10,000 OS Threads.</div>
            <div className="text-gray-400">Memory overhead: ~24 GB RAM.</div>
            <div className="text-rose-400 mt-1 font-bold">Status: CPU overload.</div>
          </div>
        ) : (
          <div>
            <span className="text-emerald-400 font-bold">[Node Epoll Multiplex]</span>
            <div className="mt-1 text-gray-400">10,000 Sockets = 1 single Event Thread loop.</div>
            <div className="text-gray-400">Memory overhead: ~150 MB RAM.</div>
            <div className="text-emerald-400 mt-1 font-bold">Status: STABLE operation!</div>
          </div>
        )}
      </div>
    </div>
  );
}

// 30. Proxy Timeout Simulator
function ProxyTimeoutSimulator() {
  const [proxyTimeout, setProxyTimeout] = useState(30);
  const [keepAlive, setKeepAlive] = useState(45);

  const getStatus = () => {
    if (keepAlive > proxyTimeout) {
      return { status: 'Terminated abruptly', color: 'text-red-500', desc: 'Proxy idle timeout triggers before client keep-alive. Socket disconnected.' };
    }
    return { status: 'Kept alive successfully', color: 'text-emerald-500', desc: 'Heartbeat triggers inside proxy timeframe. Stable open socket link.' };
  };

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <span className="font-semibold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-3">Heartbeat Timeout Configurator</span>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-[11px] text-gray-500 mb-1">
            <span>Proxy TCP Idle Timeout:</span>
            <span className="font-bold text-cyan-500 font-mono">{proxyTimeout}s</span>
          </div>
          <input 
            type="range" min="10" max="60" step="5" value={proxyTimeout} onChange={(e) => setProxyTimeout(Number(e.target.value))}
            className="w-full accent-indigo-600 h-1 bg-gray-200 rounded-lg appearance-none"
          />
        </div>

        <div>
          <div className="flex justify-between text-[11px] text-gray-500 mb-1">
            <span>Client Keep-Alive Heartbeat:</span>
            <span className="font-bold text-cyan-500 font-mono">{keepAlive}s</span>
          </div>
          <input 
            type="range" min="10" max="60" step="5" value={keepAlive} onChange={(e) => setKeepAlive(Number(e.target.value))}
            className="w-full accent-indigo-600 h-1 bg-gray-200 rounded-lg appearance-none"
          />
        </div>

        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
          <div className={`text-xs font-bold ${getStatus().color}`}>{getStatus().status}</div>
          <p className="text-[11px] text-gray-400 mt-1 leading-normal">{getStatus().desc}</p>
        </div>
      </div>
    </div>
  );
}

// 31. Testing Playground
function TestingPlayground() {
  const [testLog, setTestLog] = useState('');

  const runTest = () => {
    setTestLog('Running Jest WebSocket mock environment test...\n');
    setTimeout(() => {
      setTestLog(prev => prev + 'PASS  src/__tests__/WebSocketClient.test.ts\n✔ client receives server frame successfully (42ms)\n\nTest Suites: 1 passed, 1 total\nTests:       1 passed, 1 total');
    }, 800);
  };

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">Mock Sandbox Test Runner</span>
        <button onClick={runTest} className="px-2.5 py-1 text-xs bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded flex items-center gap-1">
          <Play className="w-3 h-3" /> Run Mock Test
        </button>
      </div>

      <pre className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[10px] text-emerald-400 min-h-[90px] whitespace-pre-wrap leading-tight">
        {testLog || 'Click Run Mock Test above to inspect simulated Jest suite checks.'}
      </pre>
    </div>
  );
}

// 32. Order Race Simulator
function OrderRaceSimulator() {
  const [sequencing, setSequencing] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const handleSimulate = () => {
    setLogs([]);
    if (!sequencing) {
      setLogs([
        'Sent: [Msg 1] "Hello"',
        'Sent: [Msg 2] "How are you?"',
        '-- Packet Drop on Reconnect --',
        'Server Received: "How are you?" (Msg 2 arrived out of order!)',
        'Server Received: "Hello" (Msg 1 arrived late)',
        '❌ UI State Corrupted: chat log shows messages flipped.'
      ]);
    } else {
      setLogs([
        'Sent: [ID: 1] "Hello"',
        'Sent: [ID: 2] "How are you?"',
        '-- Packet Drop on Reconnect --',
        'Server Received: [ID: 2] "How are you?" (Buffered, waiting for ID 1)',
        'Server Received: [ID: 1] "Hello"',
        '✔ Server correctly sorted and processed ID 1 followed by ID 2.'
      ]);
    }
  };

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-950 shadow-sm text-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xs uppercase tracking-wider text-cyan-500">Order Race Condition</span>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-gray-500">Seq Key:</span>
          <button 
            onClick={() => setSequencing(!sequencing)}
            className={`px-2 py-0.5 text-[9px] font-bold rounded ${sequencing ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}
          >
            {sequencing ? 'ENABLED' : 'DISABLED'}
          </button>
        </div>
      </div>

      <button onClick={handleSimulate} className="w-full mb-3 py-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded shadow-sm">
        Simulate Reconnect Transmissions
      </button>

      <div className="bg-slate-950 p-2.5 rounded-lg text-[9px] font-mono text-slate-400 min-h-[90px] whitespace-pre-wrap leading-relaxed">
        {logs.length === 0 ? 'Click simulate' : logs.map((l, i) => <div key={i} className={l.includes('❌') ? 'text-rose-400' : l.includes('✔') ? 'text-emerald-400' : 'text-gray-400'}>{l}</div>)}
      </div>
    </div>
  );
}

// 33. Missed Messages Snapshot Replay
function MissedMessagesPlayground() {
  const [strategy, setStrategy] = useState<'snapshot' | 'replay'>('snapshot');
  const [logs, setLogs] = useState<string[]>([]);

  const handleSync = () => {
    if (strategy === 'snapshot') {
      setLogs([
        'Reconnected to stream.',
        'Requesting FULL static snapshot of database...',
        'Received: { items: [40, 41, 42, 43, 44] }',
        '✔ Synced successfully. UI rebuilt completely.'
      ]);
    } else {
      setLogs([
        'Reconnected to stream.',
        'Sent: ?lastSeenId=41',
        'Server matching log sequences since ID 41...',
        'Replayed missed IDs: [42, 43, 44]',
        '✔ Caught up incrementally! (Minimal bandwith payload)'
      ]);
    }
  };

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">Missed Messages Catchup</span>
        <div className="flex gap-1">
          <button onClick={() => { setStrategy('snapshot'); setLogs([]); }} className={`px-2 py-0.5 text-[10px] font-bold rounded ${strategy === 'snapshot' ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-500'}`}>Snapshot</button>
          <button onClick={() => { setStrategy('replay'); setLogs([]); }} className={`px-2 py-0.5 text-[10px] font-bold rounded ${strategy === 'replay' ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-500'}`}>Replay</button>
        </div>
      </div>

      <button onClick={handleSync} className="w-full mb-3 py-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded">
        Trigger Recovery Sync
      </button>

      <div className="bg-slate-950 p-2 rounded-lg text-[9px] font-mono text-slate-400 min-h-[85px]">
        {logs.length === 0 ? 'Click trigger recovery' : logs.map((l, i) => <div key={i}>{l}</div>)}
      </div>
    </div>
  );
}

// 34. Throttling Simulator
function ThrottlingSimulator() {
  const [throttled, setThrottled] = useState(false);
  const [updates, setUpdates] = useState(0);
  const [renderedCycles, setRenderedCycles] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setUpdates(u => u + 25);
      if (throttled) {
        setRenderedCycles(rc => rc + 1);
      } else {
        setRenderedCycles(rc => rc + 25);
      }
    }, 1000);
    return () => clearInterval(t);
  }, [throttled]);

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xs uppercase tracking-wider text-cyan-500">Update Throttle batching</span>
        <button 
          onClick={() => setThrottled(!throttled)}
          className={`px-2 py-0.5 text-[9px] font-bold rounded ${throttled ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}
        >
          Batching (200ms): {throttled ? 'ACTIVE' : 'OFF'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs font-mono text-center">
        <div className="p-2 bg-slate-950 text-slate-200 rounded">
          <div className="text-[9px] text-gray-500">Socket Messages:</div>
          <div className="text-base font-bold text-cyan-400 mt-0.5">{updates} / s</div>
        </div>
        <div className="p-2 bg-slate-950 text-slate-200 rounded">
          <div className="text-[9px] text-gray-500">React UI Re-renders:</div>
          <div className={`text-base font-bold mt-0.5 ${throttled ? 'text-emerald-400' : 'text-rose-400 animate-pulse'}`}>{renderedCycles} / s</div>
        </div>
      </div>
    </div>
  );
}

// 35. Binary Frame Inspector
function BinaryFrameInspector() {
  const [text, setText] = useState('HI');

  const getBytes = () => {
    let raw = '';
    for (let i = 0; i < text.length; i++) {
      raw += text.charCodeAt(i).toString(2).padStart(8, '0') + ' ';
    }
    return raw.trim();
  };

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <span className="font-semibold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">Binary Payload Byte Encoder</span>
      
      <div className="space-y-3">
        <div className="flex gap-2 items-center">
          <span className="text-xs text-gray-500">Plain UTF-8 Text:</span>
          <input 
            type="text" value={text} onChange={(e) => setText(e.target.value.substring(0, 4))}
            className="flex-1 border dark:border-slate-800 rounded px-2 py-0.5 text-xs text-slate-800 dark:text-slate-100 dark:bg-slate-900"
          />
        </div>

        <div className="p-2.5 bg-slate-950 rounded-lg text-[10px] font-mono text-slate-300 space-y-1">
          <div className="flex justify-between border-b border-slate-900 pb-0.5 text-cyan-400 font-bold">
            <span>Opcode Header:</span>
            <span>0x2 (Binary Frame)</span>
          </div>
          <div className="flex justify-between border-b border-slate-900 py-0.5">
            <span>Payload binary bits:</span>
            <span className="text-cyan-400">{getBytes() || '00000000'}</span>
          </div>
          <div className="text-[9px] text-gray-500 italic mt-1">Binary payloads bypass browser UTF-8 validation processes, conserving client CPU cycles.</div>
        </div>
      </div>
    </div>
  );
}

// 36. Chat Room Simulator
function ChatRoomSimulator() {
  const [optimistic, setOptimistic] = useState(true);
  const [messages, setMessages] = useState<{ sender: string; text: string; pending: boolean }[]>([]);
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;

    if (optimistic) {
      const newMsg = { sender: 'Me', text, pending: true };
      setMessages(prev => [...prev, newMsg]);
      setText('');

      setTimeout(() => {
        setMessages(prev => prev.map(m => m.text === newMsg.text ? { ...m, pending: false } : m));
      }, 1000);
    } else {
      setText('');
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'Me', text, pending: false }]);
      }, 1000);
    }
  };

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">Optimistic UI Sandbox</span>
        <button 
          onClick={() => setOptimistic(!optimistic)}
          className={`px-2 py-0.5 text-[9px] font-bold rounded ${optimistic ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}
        >
          Optimistic: {optimistic ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="h-[75px] border dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded p-2 overflow-y-auto mb-2 space-y-1 text-[11px] font-mono">
        {messages.length === 0 ? (
          <div className="text-gray-400 text-center py-4">No active messages</div>
        ) : (
          messages.map((m, idx) => (
            <div key={idx} className="flex justify-between">
              <span>{m.sender}: "{m.text}"</span>
              {m.pending ? (
                <span className="text-cyan-500 animate-pulse text-[9px]">sending...</span>
              ) : (
                <span className="text-emerald-500 text-[9px]">delivered</span>
              )}
            </div>
          ))
        )}
      </div>

      <div className="flex gap-1">
        <input 
          type="text" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Type payload..."
          className="flex-1 border dark:border-slate-800 rounded px-2 py-1 text-xs dark:bg-slate-900 dark:text-slate-100"
        />
        <button onClick={handleSend} className="px-2.5 py-1 bg-cyan-600 text-white font-bold rounded text-xs">Send</button>
      </div>
    </div>
  );
}

// 37. Typing Indicator Playground
function TypingIndicatorPlayground() {
  const [typing, setTyping] = useState(false);
  const [packets, setPackets] = useState(0);

  const handleTyping = () => {
    if (typing) return;
    setTyping(true);
    setPackets(p => p + 1);

    setTimeout(() => {
      setTyping(false);
    }, 2000);
  };

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <span className="font-semibold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">Throttled Indicator Emitter</span>

      <div className="space-y-3">
        <input 
          type="text" placeholder="Type inside to test packet trigger..." onChange={handleTyping}
          className="w-full border dark:border-slate-800 rounded px-2 py-1.5 text-xs dark:bg-slate-900 dark:text-slate-100"
        />

        <div className="flex justify-between items-center text-xs font-mono bg-slate-950 p-2.5 rounded text-slate-200">
          <span className="text-gray-400">Typing socket events sent:</span>
          <span className="text-emerald-400 font-bold">{packets} packets</span>
        </div>
      </div>
    </div>
  );
}

// 38. Backpressure Flow Control Simulator
function BackpressureSimulator() {
  const [rate, setRate] = useState(50);
  const [buffer, setBuffer] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setBuffer(b => Math.max(0, b + Math.floor(rate / 10) - 4));
    }, 1000);
    return () => clearInterval(t);
  }, [rate]);

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">Flow Backpressure Buffer</span>
        <button onClick={() => setBuffer(0)} className="p-0.5 text-gray-400 hover:text-gray-600">
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-[11px] text-gray-500 mb-1">
            <span>Incoming Frame speed rate:</span>
            <span className="font-bold text-cyan-500 font-mono">{rate} f/s</span>
          </div>
          <input 
            type="range" min="10" max="100" value={rate} onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-indigo-600 h-1 bg-gray-200 rounded-lg appearance-none"
          />
        </div>

        <div className="p-2.5 bg-slate-950 rounded-lg text-xs font-mono text-slate-300 flex justify-between items-center">
          <span>Buffered packets:</span>
          <span className={`font-bold ${buffer > 30 ? 'text-rose-500 animate-pulse' : 'text-emerald-400'}`}>{buffer} packets</span>
        </div>
      </div>
    </div>
  );
}

// 39. Security Checklist Tool
function SecurityChecklistTool() {
  const [status, setStatus] = useState<string>('');

  const runAttack = (type: 'origin' | 'dos') => {
    setStatus('Launching simulated exploit attack on endpoint...\n');
    setTimeout(() => {
      if (type === 'origin') {
        setStatus(`[CRITICAL] Cross-Origin Rejected!\nOrigin "https://malicious-web.com" failed CORS whitelist constraints.`);
      } else {
        setStatus(`[RATE LIMIT] Connection throttled.\nIp 192.168.1.1 exceeded max handbook packets/sec threshold.`);
      }
    }, 800);
  };

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xs uppercase tracking-wider text-rose-500">Security Penetration Sandbox</span>
      </div>

      <div className="flex gap-2 mb-2">
        <button onClick={() => runAttack('origin')} className="flex-1 py-1 px-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded transition">Test Origin Hijack</button>
        <button onClick={() => runAttack('dos')} className="flex-1 py-1 px-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded transition">Test Flooding DoS</button>
      </div>

      <pre className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[9px] text-rose-400 min-h-[60px] whitespace-pre-wrap leading-tight">
        {status || 'Click attack simulators above to test gateway rules.'}
      </pre>
    </div>
  );
}

// 40. Tradeoffs Visualizer
function TradeoffsVisualizer() {
  const [userScale, setUserScale] = useState(50);

  const getCost = () => {
    return Math.floor(userScale * 18);
  };

  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm text-sm">
      <span className="font-semibold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-3">Server Resource footprint</span>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-[11px] text-gray-500 mb-1">
            <span>Concurrent active socket links:</span>
            <span className="font-bold text-cyan-500 font-mono">{userScale * 100} users</span>
          </div>
          <input 
            type="range" min="1" max="100" value={userScale} onChange={(e) => setUserScale(Number(e.target.value))}
            className="w-full accent-indigo-600 h-1 bg-gray-200 rounded-lg appearance-none"
          />
        </div>

        <div className="p-2.5 bg-slate-950 rounded-lg text-xs font-mono text-slate-300 space-y-1">
          <div className="flex justify-between border-b border-slate-900 pb-0.5">
            <span>TCP open connections count:</span>
            <span className="text-cyan-400 font-bold">{userScale * 100} sockets</span>
          </div>
          <div className="flex justify-between">
            <span>RAM allocation cost:</span>
            <span className="text-cyan-400 font-bold">~{(getCost() / 10).toFixed(1)} MB</span>
          </div>
        </div>
      </div>
    </div>
  );
}
