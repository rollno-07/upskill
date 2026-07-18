import React, { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, AlertCircle, CheckCircle2, Server, Globe, MessageSquare, Upload, Wifi, Bell, Shield } from "lucide-react";

// ==========================================
// SIMULATOR 1: General Approach Timeline
// ==========================================
export function SimulatorGeneralApproach() {
  const [activeStep, setActiveStep] = useState(0);
  const [logs, setLogs] = useState<string[]>(["Interview started. Interviewer asks: 'Design Uber'."]);

  const steps = [
    { title: "1. Clarify Scope", desc: "Define functional (order rides, track drivers) and non-functional requirements (scale, latency).", artifact: "Whiteboard: 'DAU: 10M, Max Latency < 500ms, consistency preferred.'" },
    { title: "2. Est. Scale", desc: "Do back-of-the-envelope calculations for bandwidth, read/write QPS, and disk storage.", artifact: "Math: 'Writes QPS: 100/sec, Read/GPS QPS: 10k/sec, Storage: 50GB/day.'" },
    { title: "3. High-Level Design", desc: "Sketch main boxes: Clients, Load Balancer, WebSockets, Dispatch Service, Geohash DB.", artifact: "Architecture Diagram drafted on canvas." },
    { title: "4. Deep-Dive Components", desc: "Drill into database sharding, caching strategies, and protocols (WebSockets vs Polling).", artifact: "Data Schema: 'DriverLocations: { driverId, coordinate, timestamp }'." },
    { title: "5. Discuss Tradeoffs", desc: "Identify single points of failure, address scale limits, consistency vs availability.", artifact: "Evaluation: 'Using Eventual Consistency for location updates to save CPU.'" }
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      const next = activeStep + 1;
      setActiveStep(next);
      setLogs(prev => [...prev, `Moved to Phase: ${steps[next].title}`, `Generated artifact: ${steps[next].artifact}`]);
    } else {
      setLogs(prev => [...prev, "Approach complete! Interviewer is highly impressed with your structural thinking."]);
    }
  };

  const reset = () => {
    setActiveStep(0);
    setLogs(["Interview started. Interviewer asks: 'Design Uber'."]);
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider font-display">System Design Roadmap</h4>
        <button onClick={reset} className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800 px-2 py-1 rounded">
          <RotateCcw className="w-3 text-emerald-400" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-4">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg border transition-all cursor-pointer text-xs ${
              idx === activeStep
                ? "bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-500/10 text-slate-100"
                : idx < activeStep
                ? "bg-slate-800/40 border-slate-700/50 text-slate-400"
                : "bg-slate-900/10 border-slate-800 text-slate-600"
            }`}
            onClick={() => {
              setActiveStep(idx);
              setLogs(prev => [...prev, `Jumped to Phase: ${steps[idx].title}`]);
            }}
          >
            <div className="font-bold flex items-center gap-1.5 mb-1">
              {idx < activeStep ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <span className="w-3.5 h-3.5 rounded-full bg-slate-800 border border-slate-600 inline-flex items-center justify-center text-[10px]">{idx+1}</span>}
              {step.title.split(".")[1] || step.title}
            </div>
            <p className="text-[11px] leading-snug">{step.desc.substring(0, 50)}...</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-xs mb-4">
        <div className="text-emerald-400 mb-1 font-bold">🎯 ACTIVE ARTIFACT:</div>
        <p className="text-slate-300">{steps[activeStep].artifact}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
          className="flex-1 py-2 rounded bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-slate-100 font-medium text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <Play className="w-3" /> Next Phase
        </button>
      </div>

      <div className="mt-4 bg-slate-950 p-3 rounded-lg border border-slate-800 h-24 overflow-y-auto text-[11px] font-mono text-slate-400 space-y-1">
        <div className="text-slate-500 border-b border-slate-800 pb-1 mb-1 font-sans">Interview Dialogue & Artifact Logs</div>
        {logs.map((log, idx) => (
          <div key={idx} className={log.includes("Artifact") ? "text-cyan-400" : log.includes("Phase") ? "text-emerald-400" : "text-slate-400"}>
            &gt; {log}
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// SIMULATOR 2: Clarifying Questions Whiteboard
// ==========================================
export function SimulatorClarifyingQuestions() {
  const [selectedSystem, setSelectedSystem] = useState<"Uber" | "Instagram" | "Spotify">("Uber");
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const systemDetails = {
    Uber: {
      scale: "10M Daily Active Users (DAU), 500k active drivers.",
      traffic: "Write-heavy for location pings (every 4s), read-heavy for rider queries.",
      latency: "Real-time dispatch matching under 1 second.",
      outOfScope: "Driver payroll, advertising campaigns, and food delivery are out of scope."
    },
    Instagram: {
      scale: "500M Daily Active Users (DAU), 100M images uploaded daily.",
      traffic: "Extremely read-heavy (100 reads for every 1 write request).",
      latency: "Feed load times under 200ms on global CDNs.",
      outOfScope: "Direct photo editing filters and video streaming infrastructure."
    },
    Spotify: {
      scale: "300M Monthly Active Users, 80M track library catalog.",
      traffic: "Metadata: read-heavy. Audio delivery: heavy CDN data bandwidth streams.",
      latency: "Song play start delay under 150ms.",
      outOfScope: "Artists uploading dashboards and podcast licensing platforms."
    }
  };

  const handleReveal = (field: string) => {
    setRevealed(prev => ({ ...prev, [selectedSystem + "_" + field]: true }));
  };

  const resetAll = () => {
    setRevealed({});
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          {["Uber", "Instagram", "Spotify"].map((sys) => (
            <button
              key={sys}
              onClick={() => setSelectedSystem(sys as any)}
              className={`px-3 py-1.5 rounded text-xs font-semibold font-display transition ${
                selectedSystem === sys ? "bg-cyan-600 text-white shadow-lg" : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {sys}
            </button>
          ))}
        </div>
        <button onClick={resetAll} className="text-[11px] text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded">
          Clear Board
        </button>
      </div>

      <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 relative min-h-64 flex flex-col justify-between font-mono">
        <div className="absolute top-2 right-2 flex items-center gap-1.5 text-[10px] text-slate-500 uppercase font-sans">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> Interview Whiteboard
        </div>

        <div className="space-y-4 my-2">
          <div className="text-cyan-400 text-xs font-bold font-sans">SYSTEM: {selectedSystem.toUpperCase()} DESIGN PARAMETERS</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {/* SCALE */}
            <div className="bg-slate-900/80 p-3 rounded border border-slate-800">
              <div className="text-[10px] text-slate-400 font-sans uppercase mb-1">Expected Scale</div>
              {revealed[selectedSystem + "_scale"] ? (
                <div className="text-slate-200 font-bold">{systemDetails[selectedSystem].scale}</div>
              ) : (
                <button onClick={() => handleReveal("scale")} className="w-full text-left text-cyan-400 hover:underline">
                  ❓ Ask: "What is the expected user scale?"
                </button>
              )}
            </div>

            {/* TRAFFIC */}
            <div className="bg-slate-900/80 p-3 rounded border border-slate-800">
              <div className="text-[10px] text-slate-400 font-sans uppercase mb-1">Traffic Mix</div>
              {revealed[selectedSystem + "_traffic"] ? (
                <div className="text-slate-200">{systemDetails[selectedSystem].traffic}</div>
              ) : (
                <button onClick={() => handleReveal("traffic")} className="w-full text-left text-cyan-400 hover:underline">
                  ❓ Ask: "Is this read-heavy or write-heavy?"
                </button>
              )}
            </div>

            {/* LATENCY */}
            <div className="bg-slate-900/80 p-3 rounded border border-slate-800">
              <div className="text-[10px] text-slate-400 font-sans uppercase mb-1">Latency SLA</div>
              {revealed[selectedSystem + "_latency"] ? (
                <div className="text-slate-200">{systemDetails[selectedSystem].latency}</div>
              ) : (
                <button onClick={() => handleReveal("latency")} className="w-full text-left text-cyan-400 hover:underline">
                  ❓ Ask: "What are our target latencies?"
                </button>
              )}
            </div>

            {/* SCOPE LIMIT */}
            <div className="bg-slate-900/80 p-3 rounded border border-slate-800">
              <div className="text-[10px] text-slate-400 font-sans uppercase mb-1">Out of Scope</div>
              {revealed[selectedSystem + "_outOfScope"] ? (
                <div className="text-slate-200 text-cyan-300">{systemDetails[selectedSystem].outOfScope}</div>
              ) : (
                <button onClick={() => handleReveal("outOfScope")} className="w-full text-left text-cyan-400 hover:underline">
                  ❓ Ask: "What features can we omit?"
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="text-[10px] text-slate-500 font-sans border-t border-slate-800/60 pt-2 mt-4">
          💡 *Senior Tip: Asking clarifying questions prevents over-engineering and keeps the design within the time constraints.*
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SIMULATOR 3: Live Comments/Chat Feed (Optimistic UI)
// ==========================================
export function SimulatorChatFeed() {
  const [messages, setMessages] = useState<Array<{ id: string; text: string; status: "pending" | "delivered" }>>([
    { id: "1", text: "Welcome to the system design masterclass!", status: "delivered" },
    { id: "2", text: "Feel free to ask questions about WebSocket clustering.", status: "delivered" }
  ]);
  const [inputText, setInputText] = useState("");
  const [optimisticMode, setOptimisticMode] = useState(true);
  const [latency, setLatency] = useState(1500); // ms
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const textToSend = inputText;
    setInputText("");
    const tempId = Date.now().toString();

    if (optimisticMode) {
      // Optimistic UI: Append instantly with pending status
      setMessages(prev => [...prev, { id: tempId, text: textToSend, status: "pending" }]);
      
      // Simulate slow server response
      setTimeout(() => {
        setMessages(prev =>
          prev.map(m => (m.id === tempId ? { ...m, status: "delivered" } : m))
        );
      }, latency);
    } else {
      // Standard UI: Show typing or loading indicator, wait for server response to append
      setIsTyping(true);
      setTimeout(() => {
        setMessages(prev => [...prev, { id: tempId, text: textToSend, status: "delivered" }]);
        setIsTyping(false);
      }, latency);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Controls Panel */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">WebSocket Simulator Setup</h5>
          
          <div className="space-y-1">
            <label className="text-xs text-slate-400 block font-semibold">Server Response Delay</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="4000"
                step="500"
                value={latency}
                onChange={(e) => setLatency(Number(e.target.value))}
                className="w-full accent-emerald-500 h-1 bg-slate-800 rounded"
              />
              <span className="text-xs font-mono text-emerald-400 w-12 text-right">{latency}ms</span>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={optimisticMode}
                onChange={() => setOptimisticMode(!optimisticMode)}
                className="rounded border-slate-800 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
              />
              <span className="text-xs text-slate-200 font-semibold select-none">Enable Optimistic UI</span>
            </label>
            <p className="text-[10px] text-slate-400 mt-1">
              {optimisticMode 
                ? "Message displays instantly with pending spinner, resolving asynchronously once server commits."
                : "Message remains hidden until server commits after network delay, causing noticeable lag."}
            </p>
          </div>

          <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="font-semibold text-slate-300">💡 UI Tradeoff:</div>
            <div>Optimistic UI yields higher customer satisfaction (sub-10ms perceived speed) but requires conflict-reversion logic if requests fail.</div>
          </div>
        </div>

        {/* Chat Feed Panel */}
        <div className="lg:col-span-2 flex flex-col h-72 border border-slate-800 bg-slate-950 rounded-lg overflow-hidden">
          <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-500" /> Real-time Chat Panel
            </span>
            <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded">
              WS Active
            </span>
          </div>

          {/* Message List */}
          <div className="flex-1 p-4 overflow-y-auto space-y-2 text-xs flex flex-col justify-end">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[80%] rounded-lg px-3 py-2 text-slate-100 ${
                  m.id.length > 5 ? "bg-emerald-950/40 border border-emerald-800 self-end" : "bg-slate-800 self-start"
                }`}
              >
                <p className="leading-relaxed">{m.text}</p>
                <div className="text-[9px] text-right text-slate-400 mt-0.5 flex items-center justify-end gap-1 font-mono">
                  {m.status === "pending" ? (
                    <span className="text-cyan-400 flex items-center gap-0.5 animate-pulse">
                      ⏳ sending...
                    </span>
                  ) : (
                    <span className="text-slate-400">✓ delivered</span>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="bg-slate-800 max-w-[80%] self-end rounded-lg px-3 py-2 text-slate-400 italic text-[11px] animate-pulse">
                Server processing...
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSend} className="bg-slate-900 p-2 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type comment here..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button type="submit" className="bg-emerald-600 text-slate-100 px-3 py-1.5 rounded text-xs hover:bg-emerald-500 cursor-pointer transition">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SIMULATOR 4: Scalable Image Upload (Presigned URL)
// ==========================================
export function SimulatorImageUpload() {
  const [strategy, setStrategy] = useState<"AppServer" | "Presigned">("Presigned");
  const [uploadState, setUploadState] = useState<"idle" | "requestUrl" | "uploading" | "optimizing" | "success">("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const [appCpu, setAppCpu] = useState(5);
  const [appRam, setAppRam] = useState(12); // in %

  const triggerUpload = () => {
    setLogs([]);
    if (strategy === "AppServer") {
      setUploadState("uploading");
      setLogs(prev => [...prev, "Uploading 12MB Image payload...", "API Request: POST /api/upload"]);
      setAppCpu(85);
      setAppRam(75);

      setTimeout(() => {
        setLogs(prev => [...prev, "Server holding binary buffer stream in RAM...", "Server writing file to disk..."]);
        setAppCpu(95);
        setAppRam(90);
      }, 1000);

      setTimeout(() => {
        setLogs(prev => [...prev, "Processing, cropping, and saving...", "Upload complete!"]);
        setUploadState("success");
        setAppCpu(5);
        setAppRam(14);
      }, 3000);

    } else {
      setUploadState("requestUrl");
      setLogs(prev => [...prev, "Client requesting short-lived Pre-Signed URL...", "Server validates upload metadata (5KB payload)"]);
      setAppCpu(12);
      
      setTimeout(() => {
        setLogs(prev => [...prev, "Pre-Signed S3 upload URL granted!", "Client uploading 12MB payload directly to Amazon S3..."]);
        setUploadState("uploading");
        setAppCpu(5); // App server stays completely free!
        setAppRam(12);
      }, 1000);

      setTimeout(() => {
        setLogs(prev => [...prev, "S3 received file! S3 triggers background Lambda for resizing...", "Client logs object key to DB..."]);
        setUploadState("optimizing");
      }, 2500);

      setTimeout(() => {
        setLogs(prev => [...prev, "Database synchronized! Optimized thumbnails generated.", "Success!"]);
        setUploadState("success");
      }, 4000);
    }
  };

  const reset = () => {
    setUploadState("idle");
    setLogs([]);
    setAppCpu(5);
    setAppRam(12);
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="flex gap-4 items-center mb-4">
        <label className="text-xs text-slate-400 font-semibold">Select Architecture:</label>
        <div className="flex gap-2">
          <button
            onClick={() => { setStrategy("AppServer"); reset(); }}
            className={`px-3 py-1 rounded text-xs transition ${strategy === "AppServer" ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-400"}`}
          >
            Traditional App Server
          </button>
          <button
            onClick={() => { setStrategy("Presigned"); reset(); }}
            className={`px-3 py-1 rounded text-xs transition ${strategy === "Presigned" ? "bg-emerald-600 text-white shadow-lg" : "bg-slate-800 text-slate-400"}`}
          >
            S3 Pre-Signed URL (Direct)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Performance Monitor */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-cyan-400" /> App Server Telemetry
          </h5>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span>CPU Load</span>
                <span className={appCpu > 70 ? "text-red-400 font-bold" : "text-emerald-400"}>{appCpu}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${appCpu > 70 ? "bg-red-500" : "bg-emerald-500"}`}
                  style={{ width: `${appCpu}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>RAM Usage</span>
                <span className={appRam > 70 ? "text-red-400 font-bold" : "text-emerald-400"}>{appRam}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${appRam > 70 ? "bg-red-500" : "bg-emerald-500"}`}
                  style={{ width: `${appRam}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 p-2 rounded border border-slate-800 text-[11px] text-slate-400">
            {strategy === "AppServer" ? (
              <span className="text-cyan-300">
                ⚠️ Warning: Streaming file uploads through application instances hogs node memory heap, leading to slower request threads or Out-Of-Memory (OOM) crashes.
              </span>
            ) : (
              <span className="text-emerald-400">
                ✅ S3 Direct allows your application threads to remain completely idle during large content transfers, maximizing client scale.
              </span>
            )}
          </div>
        </div>

        {/* Animation Visualizer */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
            <span className="text-xs font-bold text-slate-200">Interactive Execution Pipeline</span>
            {uploadState !== "idle" && (
              <button onClick={reset} className="text-[10px] text-slate-400 hover:text-white bg-slate-800 px-1.5 py-0.5 rounded">
                Reset
              </button>
            )}
          </div>

          <div className="flex-1 flex flex-col items-center justify-center my-4">
            {uploadState === "idle" && (
              <button
                onClick={triggerUpload}
                className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2.5 rounded font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/15"
              >
                <Upload className="w-4 h-4" /> Trigger 12MB Image Upload
              </button>
            )}

            {uploadState === "requestUrl" && (
              <div className="text-center animate-pulse space-y-2">
                <div className="w-8 h-8 rounded-full border-2 border-t-transparent border-cyan-500 animate-spin mx-auto"></div>
                <p className="text-xs text-cyan-400">Negotiating Pre-Signed S3 Key...</p>
              </div>
            )}

            {uploadState === "uploading" && (
              <div className="text-center space-y-2 w-full max-w-xs">
                <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 animate-[pulse_1s_infinite] w-2/3"></div>
                </div>
                <p className="text-xs text-slate-400">
                  {strategy === "AppServer" ? "Streaming binary array through App Gateway..." : "Shedding payload directly to Amazon S3 storage..."}
                </p>
              </div>
            )}

            {uploadState === "optimizing" && (
              <div className="text-center animate-pulse space-y-2">
                <div className="w-8 h-8 rounded-full border-2 border-t-transparent border-cyan-500 animate-spin mx-auto"></div>
                <p className="text-xs text-cyan-400">S3 Lambda Hook Trigger: Resizing Thumbnail...</p>
              </div>
            )}

            {uploadState === "success" && (
              <div className="text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <p className="text-xs font-bold text-emerald-400">File uploaded and metadata locked successfully!</p>
              </div>
            )}
          </div>

          <div className="bg-slate-900 p-2.5 rounded font-mono text-[10px] text-slate-400 h-24 overflow-y-auto space-y-1">
            {logs.map((log, idx) => (
              <div key={idx} className="text-cyan-400">&gt; {log}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SIMULATOR 5: CDN (Content Delivery Network)
// ==========================================
export function SimulatorCDN() {
  const [cdnEnabled, setCdnEnabled] = useState(true);
  const [selectedCity, setSelectedCity] = useState<"Tokyo" | "Paris" | "Sydney">("Tokyo");
  const [pingState, setPingState] = useState<"idle" | "pinging" | "success">("idle");
  const [latency, setLatency] = useState<number | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const handlePing = () => {
    setPingState("pinging");
    setLogs([]);
    
    setLogs(prev => [...prev, `Request triggered by client in ${selectedCity}...`]);
    
    if (cdnEnabled) {
      setTimeout(() => {
        setLogs(prev => [...prev, `Local CDN Edge discovered in ${selectedCity}!`, "Cache HIT: Asset returned immediately to user."]);
        setLatency(15); // very low latency
        setPingState("success");
      }, 600);
    } else {
      setTimeout(() => {
        setLogs(prev => [...prev, "CDN Bypass. Resolving Anycast IP...", "Connecting to primary Dublin Origin Server...", "Streaming static bundle over ocean fiber cables..."]);
      }, 800);
      
      setTimeout(() => {
        setLogs(prev => [...prev, "Asset returned from primary source of truth."]);
        setLatency(selectedCity === "Tokyo" ? 280 : selectedCity === "Paris" ? 110 : 340);
        setPingState("success");
      }, 2500);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Map Setup Controls */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-cyan-400" /> Geographical Network Config
          </h5>

          <div>
            <label className="text-xs text-slate-400 block font-semibold mb-2">User Location</label>
            <div className="flex gap-1.5">
              {["Tokyo", "Paris", "Sydney"].map((city) => (
                <button
                  key={city}
                  onClick={() => { setSelectedCity(city as any); setPingState("idle"); setLatency(null); }}
                  className={`flex-1 py-1 rounded text-xs border font-medium ${
                    selectedCity === city ? "bg-cyan-600 border-cyan-500 text-white" : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-800 pt-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs text-slate-200 font-semibold select-none">Enable CDN Edge Server</span>
              <input
                type="checkbox"
                checked={cdnEnabled}
                onChange={() => { setCdnEnabled(!cdnEnabled); setPingState("idle"); setLatency(null); }}
                className="sr-only peer"
              />
              <div className="relative w-9 h-5 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
            <p className="text-[10px] text-slate-400 mt-1">
              {cdnEnabled 
                ? "CDN intercepts the bundle statically at the local edge warehouse."
                : "All requests must route over transatlantic fibers to the main server cluster in Dublin."}
            </p>
          </div>
        </div>

        {/* Visual Map and Latency Gauge */}
        <div className="md:col-span-2 bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-2">
            <span className="text-xs font-bold text-slate-200">Interactive Latency Visualizer</span>
            <div className="flex items-center gap-4 text-[10px] text-slate-400">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-cyan-500 inline-block"></span> Dublin Origin</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-cyan-500 inline-block"></span> Local CDN Edge</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center my-4 min-h-36">
            {pingState === "idle" && (
              <button
                onClick={handlePing}
                className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2.5 rounded text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                <Wifi className="w-4 h-4 text-cyan-200" /> Fetch 'bundle.js'
              </button>
            )}

            {pingState === "pinging" && (
              <div className="text-center space-y-3 w-full">
                <div className="flex justify-center items-center gap-1 animate-pulse text-xs text-slate-400">
                  <span>Client ({selectedCity})</span>
                  <span className="w-12 h-0.5 border-t border-dashed border-cyan-400 animate-[bounce_1s_infinite]"></span>
                  {cdnEnabled ? <span className="text-cyan-400">Edge CDN</span> : <span className="text-cyan-400">Dublin Origin</span>}
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-t-transparent border-cyan-500 animate-spin mx-auto"></div>
              </div>
            )}

            {pingState === "success" && latency !== null && (
              <div className="text-center space-y-2">
                <div className="inline-flex flex-col items-center justify-center p-3 rounded-full bg-slate-900 border border-slate-800">
                  <span className="text-[10px] uppercase text-slate-400">Network Latency</span>
                  <span className={`text-2xl font-mono font-bold ${latency < 50 ? "text-emerald-400" : "text-cyan-400"}`}>
                    {latency}ms
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-sans">
                  {cdnEnabled 
                    ? `⚡ Near-instant payload delivery from Geolocated Edge cache near ${selectedCity}.`
                    : `🐢 Slower response times due to heavy geographical cable hops.`}
                </p>
              </div>
            )}
          </div>

          <div className="bg-slate-900 p-2 rounded text-[10px] font-mono text-slate-400 h-20 overflow-y-auto space-y-0.5">
            {logs.map((log, idx) => (
              <div key={idx} className={log.includes("HIT") ? "text-emerald-400" : "text-slate-300"}>&gt; {log}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SIMULATOR 6: Notification Pipeline
// ==========================================
export function SimulatorNotificationSystem() {
  const [recipientStatus, setRecipientStatus] = useState<"Online" | "Offline">("Online");
  const [logs, setLogs] = useState<string[]>([]);
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  const triggerNotification = (type: "Alert" | "SMS" | "Push") => {
    setLogs([]);
    setActiveNotification(null);
    setLogs(prev => [...prev, `Notification triggered: [Type: ${type}]`, "Decoupled job pushed to Redis Message Queue..."]);

    setTimeout(() => {
      setLogs(prev => [...prev, "Worker fetched notification task from queue.", `Reading database parameters for user profile...`]);
    }, 600);

    setTimeout(() => {
      if (recipientStatus === "Online") {
        setLogs(prev => [...prev, "Recipient detected: ONLINE.", "Routing message instantly via established WebSockets..."]);
        setActiveNotification("In-App Notification: You've received a secure notification alert!");
      } else {
        setLogs(prev => [...prev, "Recipient detected: OFFLINE.", "Routing to external Push Gateway...", `Posting payload to FCM/APNs Gateway APIs...`]);
        setActiveNotification("FCM Push Alert: [Device Screen Notification] You have a pending update.");
      }
    }, 1500);
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left config */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Bell className="w-3.5 h-3.5 text-cyan-400" /> Receiver Connection State
          </h5>

          <div className="flex gap-2">
            {["Online", "Offline"].map((status) => (
              <button
                key={status}
                onClick={() => { setRecipientStatus(status as any); setActiveNotification(null); setLogs([]); }}
                className={`flex-1 py-1.5 rounded text-xs border font-medium transition ${
                  recipientStatus === status
                    ? "bg-cyan-600 border-cyan-500 text-white"
                    : "bg-slate-900 border-slate-800 text-slate-400"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="bg-slate-900/60 p-2 rounded border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
            💡 Notification networks must check status first. Real-time in-app channels are much cheaper than pay-per-message SMS vectors.
          </div>
        </div>

        {/* Right visualization */}
        <div className="md:col-span-2 bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between relative">
          {activeNotification && (
            <div className="absolute top-2 right-2 animate-bounce bg-cyan-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
              🔔 Receive Alert!
            </div>
          )}

          <div className="text-xs font-bold text-slate-200 border-b border-slate-800 pb-2 mb-2">Notification Router Simulator</div>

          <div className="flex-1 flex flex-col items-center justify-center my-3 gap-3 min-h-36">
            {activeNotification ? (
              <div className="w-full max-w-xs bg-slate-900 border border-cyan-500/30 p-3 rounded-lg text-xs shadow-xl shadow-cyan-500/5">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                  <span className="font-bold text-slate-300 text-[10px] uppercase">Device Alert</span>
                </div>
                <p className="text-slate-100">{activeNotification}</p>
                <button onClick={() => setActiveNotification(null)} className="mt-2 text-[10px] text-slate-400 hover:text-white underline">
                  Clear Notification
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => triggerNotification("Alert")}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded text-xs font-semibold cursor-pointer"
                >
                  Send In-App Alert
                </button>
                <button
                  onClick={() => triggerNotification("SMS")}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded text-xs font-semibold cursor-pointer"
                >
                  Send Urgent SMS
                </button>
              </div>
            )}
          </div>

          <div className="bg-slate-900 p-2 rounded text-[10px] font-mono text-slate-400 h-20 overflow-y-auto space-y-0.5">
            {logs.map((log, idx) => (
              <div key={idx} className="text-cyan-400">&gt; {log}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
