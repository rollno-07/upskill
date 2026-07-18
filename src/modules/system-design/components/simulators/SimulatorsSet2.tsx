import React, { useState, useEffect } from "react";
import { Server, Cpu, Layers, HardDrive, RefreshCw, AlertTriangle, ShieldCheck, Check, Users, HelpCircle } from "lucide-react";

// ==========================================
// SIMULATOR 7: Horizontal vs Vertical Scaling
// ==========================================
export function SimulatorScaling() {
  const [scalingType, setScalingType] = useState<"Vertical" | "Horizontal">("Vertical");
  const [traffic, setTraffic] = useState(200); // Requests/sec
  const [numServers, setNumServers] = useState(1);
  const [serverCpu, setServerCpu] = useState(10);
  const [isCrashed, setIsCrashed] = useState(false);

  useEffect(() => {
    if (scalingType === "Vertical") {
      // Single server CPU goes up linearly with traffic
      const cpuValue = Math.min(Math.round((traffic / 300) * 100), 100);
      setServerCpu(cpuValue);
      setIsCrashed(cpuValue >= 100);
    } else {
      // Horizontal spreads load among multiple servers
      const activeServers = Math.max(numServers, 1);
      const calculatedCpu = Math.min(Math.round((traffic / (250 * activeServers)) * 100), 100);
      setServerCpu(calculatedCpu);
      setIsCrashed(calculatedCpu >= 100);
    }
  }, [traffic, scalingType, numServers]);

  const addServer = () => {
    if (scalingType === "Horizontal") {
      setNumServers(prev => Math.min(prev + 1, 5));
    }
  };

  const removeServer = () => {
    if (scalingType === "Horizontal") {
      setNumServers(prev => Math.max(prev - 1, 1));
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sliders and selection */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Scale Configuration</h5>
          
          <div className="flex gap-2">
            <button
              onClick={() => { setScalingType("Vertical"); setNumServers(1); }}
              className={`flex-1 py-1.5 rounded text-xs font-semibold ${scalingType === "Vertical" ? "bg-cyan-600 text-white shadow-lg" : "bg-slate-800 text-slate-400"}`}
            >
              Vertical (Scale Up)
            </button>
            <button
              onClick={() => { setScalingType("Horizontal"); }}
              className={`flex-1 py-1.5 rounded text-xs font-semibold ${scalingType === "Horizontal" ? "bg-emerald-600 text-white shadow-lg" : "bg-slate-800 text-slate-400"}`}
            >
              Horizontal (Scale Out)
            </button>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400 block font-semibold">Incoming Request Load</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="50"
                max="1000"
                step="50"
                value={traffic}
                onChange={(e) => setTraffic(Number(e.target.value))}
                className="w-full accent-cyan-500 h-1 bg-slate-800 rounded"
              />
              <span className="text-xs font-mono text-cyan-400 w-16 text-right">{traffic} req/s</span>
            </div>
          </div>

          {scalingType === "Horizontal" && (
            <div className="space-y-2">
              <label className="text-xs text-slate-400 block font-semibold">Server Instances Pool</label>
              <div className="flex items-center justify-between bg-slate-900 p-2 rounded border border-slate-800">
                <span className="text-xs font-mono text-slate-300">{numServers} Server Node(s)</span>
                <div className="flex gap-1.5">
                  <button onClick={removeServer} className="px-2 py-0.5 bg-slate-800 rounded text-xs text-slate-300 font-bold hover:text-white">-</button>
                  <button onClick={addServer} className="px-2 py-0.5 bg-slate-800 rounded text-xs text-slate-300 font-bold hover:text-white">+</button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-slate-900/50 p-2 rounded border border-slate-800 text-[11px] text-slate-400 font-sans leading-relaxed">
            {scalingType === "Vertical" ? (
              <span className="text-cyan-300">
                ⚠️ Vertical scaling modifies a single machine. Increasing load linearly heats the CPU. At 100% capacity, the server crashes.
              </span>
            ) : (
              <span className="text-emerald-400">
                ✅ Horizontal scaling adds sibling node replicas. A Load Balancer distributes requests, dispersing CPU temperatures perfectly.
              </span>
            )}
          </div>
        </div>

        {/* Dashboard Visualisation */}
        <div className="lg:col-span-2 bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-2">
            <span className="text-xs font-bold text-slate-200">Live Server Cluster Dashboard</span>
            {isCrashed ? (
              <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded flex items-center gap-1 font-mono font-bold animate-pulse">
                <AlertTriangle className="w-3" /> CLUSTER FAILURE
              </span>
            ) : (
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono font-bold">
                ● ACTIVE
              </span>
            )}
          </div>

          <div className="flex-1 flex flex-wrap gap-4 items-center justify-center my-4">
            {scalingType === "Vertical" ? (
              <div className={`p-4 rounded-lg border w-44 flex flex-col items-center gap-2 transition ${isCrashed ? "bg-red-950/20 border-red-500" : "bg-slate-900 border-slate-800"}`}>
                <Cpu className={`w-8 h-8 ${isCrashed ? "text-red-500 animate-spin" : "text-cyan-500"}`} />
                <div className="text-center font-mono text-xs">
                  <div className="font-bold text-slate-200">GIANT_SERVER_01</div>
                  <div className="text-[10px] text-slate-400">Vertical Core System</div>
                  <div className={`font-bold mt-1 ${isCrashed ? "text-red-400" : "text-cyan-400"}`}>CPU: {serverCpu}%</div>
                </div>
              </div>
            ) : (
              Array.from({ length: numServers }).map((_, idx) => (
                <div key={idx} className={`p-3 rounded-lg border w-28 flex flex-col items-center gap-1.5 transition ${isCrashed ? "bg-red-950/20 border-red-500" : "bg-slate-900 border-slate-800"}`}>
                  <Server className={`w-6 h-6 ${isCrashed ? "text-red-500" : "text-emerald-500"}`} />
                  <div className="text-center font-mono text-[10px]">
                    <div className="font-bold text-slate-200">NODE_{String(idx + 1).padStart(2, "0")}</div>
                    <div className={`font-bold mt-1 ${isCrashed ? "text-red-400" : "text-emerald-400"}`}>CPU: {serverCpu}%</div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-xs bg-slate-900 p-2.5 rounded text-slate-400 font-mono text-center flex items-center justify-center gap-1">
            {isCrashed ? (
              <span className="text-red-400">🔥 Server crashed! Limit exceeded. Scale horizontally or reduce traffic to recover.</span>
            ) : (
              <span className="text-slate-300">📈 System serving {traffic} reqs/sec comfortably at ${scalingType === "Vertical" ? "120" : (40 * numServers)}/mo.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SIMULATOR 8: Load Balancer
// ==========================================
export function SimulatorLoadBalancer() {
  const [algo, setAlgo] = useState<"RoundRobin" | "LeastConn" | "IPHash">("RoundRobin");
  const [node1Status, setNode1Status] = useState<"Alive" | "Dead">("Alive");
  const [node2Status, setNode2Status] = useState<"Alive" | "Dead">("Alive");
  const [node3Status, setNode3Status] = useState<"Alive" | "Dead">("Alive");
  const [routedPath, setRoutedPath] = useState<string | null>(null);

  const handleTriggerRequest = () => {
    const aliveNodes: string[] = [];
    if (node1Status === "Alive") aliveNodes.push("Node A");
    if (node2Status === "Alive") aliveNodes.push("Node B");
    if (node3Status === "Alive") aliveNodes.push("Node C");

    if (aliveNodes.length === 0) {
      setRoutedPath("ERROR: No healthy servers available in downstream pool.");
      return;
    }

    if (algo === "RoundRobin") {
      const selected = aliveNodes[Math.floor(Math.random() * aliveNodes.length)];
      setRoutedPath(`Request routed sequentially to ${selected}.`);
    } else if (algo === "LeastConn") {
      // Node A is simulated to have least connections
      const target = aliveNodes.includes("Node A") ? "Node A" : aliveNodes[0];
      setRoutedPath(`Routed to ${target} (Least active TCP thread count).`);
    } else {
      setRoutedPath(`Sticky session routing based on IP Hash -> Routed to ${aliveNodes[0]}.`);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left algorithms */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">LB Routing Strategy</h5>
          
          <div className="space-y-1.5">
            {["RoundRobin", "LeastConn", "IPHash"].map((a) => (
              <button
                key={a}
                onClick={() => { setAlgo(a as any); setRoutedPath(null); }}
                className={`w-full py-2 px-3 rounded text-xs text-left font-medium transition ${
                  algo === a ? "bg-cyan-600 text-white shadow-lg" : "bg-slate-900 text-slate-400 hover:text-white"
                }`}
              >
                {a === "RoundRobin" ? "🔄 Round Robin" : a === "LeastConn" ? "⚡ Least Connections" : "🔑 IP Hash Session"}
              </button>
            ))}
          </div>

          <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800 text-[11px] text-slate-400 leading-normal">
            {algo === "RoundRobin" && "Loops through the server list sequentially. Highly simple, assumes equal capacity."}
            {algo === "LeastConn" && "Routes to the server with fewest active TCP handles. Best for long-lived heavy jobs."}
            {algo === "IPHash" && "Hashes client IP to assign a dedicated server. Guarantees session sticky cache locality."}
          </div>
        </div>

        {/* Right whiteboard */}
        <div className="md:col-span-2 bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-2 text-xs">
            <span className="font-bold text-slate-200">Load Balancer & Clustered Downstream Nodes</span>
            <button
              onClick={handleTriggerRequest}
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1 rounded text-[11px] font-bold cursor-pointer"
            >
              Push Client Query
            </button>
          </div>

          <div className="flex-1 flex flex-col md:flex-row items-center justify-around my-4 gap-4">
            {/* Server A */}
            <div className="flex flex-col items-center gap-1.5">
              <div className={`p-2.5 rounded border flex flex-col items-center ${node1Status === "Alive" ? "border-emerald-500 bg-slate-900" : "border-red-500 bg-slate-900/20"}`}>
                <Server className={`w-5 h-5 ${node1Status === "Alive" ? "text-emerald-400" : "text-red-400"}`} />
                <span className="text-[10px] font-mono text-slate-300 mt-1">NODE_A</span>
              </div>
              <button
                onClick={() => { setNode1Status(node1Status === "Alive" ? "Dead" : "Alive"); setRoutedPath(null); }}
                className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${node1Status === "Alive" ? "bg-red-950 text-red-400" : "bg-emerald-950 text-emerald-400"}`}
              >
                {node1Status === "Alive" ? "Kill node" : "Revive"}
              </button>
            </div>

            {/* Server B */}
            <div className="flex flex-col items-center gap-1.5">
              <div className={`p-2.5 rounded border flex flex-col items-center ${node2Status === "Alive" ? "border-emerald-500 bg-slate-900" : "border-red-500 bg-slate-900/20"}`}>
                <Server className={`w-5 h-5 ${node2Status === "Alive" ? "text-emerald-400" : "text-red-400"}`} />
                <span className="text-[10px] font-mono text-slate-300 mt-1">NODE_B</span>
              </div>
              <button
                onClick={() => { setNode2Status(node2Status === "Alive" ? "Dead" : "Alive"); setRoutedPath(null); }}
                className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${node2Status === "Alive" ? "bg-red-950 text-red-400" : "bg-emerald-950 text-emerald-400"}`}
              >
                {node2Status === "Alive" ? "Kill node" : "Revive"}
              </button>
            </div>

            {/* Server C */}
            <div className="flex flex-col items-center gap-1.5">
              <div className={`p-2.5 rounded border flex flex-col items-center ${node3Status === "Alive" ? "border-emerald-500 bg-slate-900" : "border-red-500 bg-slate-900/20"}`}>
                <Server className={`w-5 h-5 ${node3Status === "Alive" ? "text-emerald-400" : "text-red-400"}`} />
                <span className="text-[10px] font-mono text-slate-300 mt-1">NODE_C</span>
              </div>
              <button
                onClick={() => { setNode3Status(node3Status === "Alive" ? "Dead" : "Alive"); setRoutedPath(null); }}
                className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${node3Status === "Alive" ? "bg-red-950 text-red-400" : "bg-emerald-950 text-emerald-400"}`}
              >
                {node3Status === "Alive" ? "Kill node" : "Revive"}
              </button>
            </div>
          </div>

          <div className="bg-slate-900 p-2.5 rounded font-mono text-xs text-slate-300 min-h-12 flex items-center justify-center text-center">
            {routedPath ? (
              <span className={routedPath.includes("ERROR") ? "text-red-400" : "text-cyan-400"}>&gt; {routedPath}</span>
            ) : (
              <span className="text-slate-500">Click "Push Client Query" to see load balancing flow in action...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SIMULATOR 9: Caching Layers
// ==========================================
export function SimulatorCachingLayers() {
  const [layers, setLayers] = useState({
    Browser: true,
    CDN: true,
    Redis: true
  });
  const [logs, setLogs] = useState<string[]>([]);
  const [queryTime, setQueryTime] = useState<number | null>(null);
  const [queryState, setQueryState] = useState<"idle" | "evaluating" | "done">("idle");

  const runQuery = () => {
    setQueryState("evaluating");
    setLogs([]);
    setQueryTime(null);

    setLogs(prev => [...prev, "Checking Browser cache..."]);

    setTimeout(() => {
      if (layers.Browser) {
        setLogs(prev => [...prev, "✓ Browser cache HIT (Local Memory).", "Returning asset instantly in <1ms."]);
        setQueryTime(1);
        setQueryState("done");
        return;
      }

      setLogs(prev => [...prev, "✗ Browser Cache MISS. DNS resolving to nearest CDN Edge node..."]);
      
      setTimeout(() => {
        if (layers.CDN) {
          setLogs(prev => [...prev, "✓ CDN Cache HIT (Geolocated Edge Server).", "Asset returned in ~15ms."]);
          setQueryTime(15);
          setQueryState("done");
          return;
        }

        setLogs(prev => [...prev, "✗ CDN Cache MISS. Querying core Application Server gateway..."]);
        
        setTimeout(() => {
          if (layers.Redis) {
            setLogs(prev => [...prev, "✓ Redis Cache HIT (Distributed Server RAM cache).", "Payload serialized and returned in ~4ms."]);
            setQueryTime(4);
            setQueryState("done");
            return;
          }

          setLogs(prev => [...prev, "✗ Redis Cache MISS. Critical Database Query fallback...", "Running SELECT * FROM table WHERE id = X on disk arrays..."]);
          
          setTimeout(() => {
            setLogs(prev => [...prev, "✓ Database scan complete. Record returned.", "Slow Disk speed response time: ~120ms."]);
            setQueryTime(120);
            setQueryState("done");
          }, 1200);

        }, 800);

      }, 800);

    }, 800);
  };

  const toggleLayer = (layer: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
    setQueryState("idle");
    setQueryTime(null);
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Toggle Layers */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1"><Layers className="w-3.5 h-3.5 text-cyan-400" /> Active Cache Layers</h5>
          
          <div className="space-y-2">
            {Object.keys(layers).map((layer) => (
              <label key={layer} className="flex items-center justify-between cursor-pointer bg-slate-900 p-2.5 rounded border border-slate-800">
                <span className="text-xs font-medium text-slate-300">{layer} Cache</span>
                <input
                  type="checkbox"
                  checked={layers[layer as keyof typeof layers]}
                  onChange={() => toggleLayer(layer as any)}
                  className="rounded border-slate-800 text-cyan-500 focus:ring-cyan-500"
                />
              </label>
            ))}
          </div>

          <div className="bg-slate-900/60 p-2 rounded border border-slate-800 text-[11px] text-slate-400">
            Toggle layers off to witness how database fallbacks amplify response latencies.
          </div>
        </div>

        {/* Visual pipeline */}
        <div className="md:col-span-2 bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-2 text-xs">
            <span className="font-bold text-slate-200">Cache Layer Evaluation</span>
            <button
              onClick={runQuery}
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1 rounded text-[11px] font-bold cursor-pointer"
            >
              Request Data
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center my-3 gap-1">
            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
              <div className={`p-2 rounded border ${layers.Browser ? "border-emerald-500 bg-emerald-950/10 text-emerald-400" : "border-slate-800 text-slate-600"}`}>1. Browser</div>
              <div className={`p-2 rounded border ${layers.CDN ? "border-emerald-500 bg-emerald-950/10 text-emerald-400" : "border-slate-800 text-slate-600"}`}>2. CDN Edge</div>
              <div className={`p-2 rounded border ${layers.Redis ? "border-emerald-500 bg-emerald-950/10 text-emerald-400" : "border-slate-800 text-slate-600"}`}>3. Redis RAM</div>
              <div className="p-2 rounded border border-cyan-500 bg-cyan-950/10 text-cyan-400">4. Database Disk</div>
            </div>
          </div>

          <div className="bg-slate-900 p-2 text-[10px] font-mono text-slate-400 h-24 overflow-y-auto space-y-0.5 mb-2">
            {logs.map((log, idx) => (
              <div key={idx} className={log.includes("✓") ? "text-emerald-400" : log.includes("✗") ? "text-red-400" : "text-slate-300"}>&gt; {log}</div>
            ))}
          </div>

          {queryTime !== null && (
            <div className="text-center bg-slate-900 p-2 rounded text-xs font-mono">
              ⚡ Data retrieved in: <span className={queryTime > 50 ? "text-red-400 font-bold" : "text-emerald-400"}>{queryTime}ms</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SIMULATOR 10: Cache Invalidation
// ==========================================
export function SimulatorCacheInvalidation() {
  const [dbVal, setDbVal] = useState("Apple ($100)");
  const [cacheVal, setCacheVal] = useState("Apple ($100)");
  const [strategy, setStrategy] = useState<"CacheAside" | "WriteThrough">("CacheAside");
  const [inputPrice, setInputPrice] = useState("100");
  const [logs, setLogs] = useState<string[]>([]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedVal = `Apple ($${inputPrice})`;
    setLogs([]);

    if (strategy === "CacheAside") {
      setLogs(prev => [...prev, "Writing new price to SQL database...", "Ejecting stale key from Redis cache directly (Active Cache Aside)..."]);
      setDbVal(updatedVal);
      setCacheVal("Ejected (Empty Cache)");
      
      setTimeout(() => {
        setLogs(prev => [...prev, "Future client queries will trigger Cache MISS, fetch from DB, and repopulate Redis cache."]);
      }, 1000);
    } else {
      setLogs(prev => [...prev, "Writing synchronously to database AND cache concurrently (Write Through)...", "Double write committed. Cache price synchronized immediately."]);
      setDbVal(updatedVal);
      setCacheVal(updatedVal);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Strategy Selector */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Invalidation Strategy</h5>
          
          <div className="flex flex-col gap-2">
            <button
              onClick={() => { setStrategy("CacheAside"); setLogs([]); }}
              className={`py-2 px-3 rounded text-xs text-left transition ${strategy === "CacheAside" ? "bg-cyan-600 text-white shadow-lg" : "bg-slate-900 text-slate-400"}`}
            >
              🧹 Active Cache-Aside
            </button>
            <button
              onClick={() => { setStrategy("WriteThrough"); setLogs([]); }}
              className={`py-2 px-3 rounded text-xs text-left transition ${strategy === "WriteThrough" ? "bg-emerald-600 text-white shadow-lg" : "bg-slate-900 text-slate-400"}`}
            >
              ⚡ Write-Through Cache
            </button>
          </div>

          <form onSubmit={handleUpdate} className="space-y-2 border-t border-slate-800 pt-3">
            <label className="text-xs text-slate-400 block font-semibold">Change Apple Price ($)</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={inputPrice}
                onChange={(e) => setInputPrice(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white"
              />
              <button type="submit" className="bg-cyan-600 text-white px-3 py-1 rounded text-xs font-bold cursor-pointer hover:bg-cyan-500">Update</button>
            </div>
          </form>
        </div>

        {/* Console logs */}
        <div className="md:col-span-2 bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-200 border-b border-slate-800 pb-2 mb-2">Cluster Sync Panel</div>

          <div className="grid grid-cols-2 gap-4 text-center text-xs my-3">
            <div className="bg-slate-900 p-3 rounded border border-slate-800">
              <div className="text-[10px] text-slate-400 font-mono uppercase mb-1">Database Disk</div>
              <div className="text-slate-100 font-bold">{dbVal}</div>
            </div>

            <div className="bg-slate-900 p-3 rounded border border-slate-800">
              <div className="text-[10px] text-slate-400 font-mono uppercase mb-1">Redis Cache RAM</div>
              <div className={`font-bold ${cacheVal.includes("Ejected") ? "text-cyan-400 font-normal italic" : "text-emerald-400"}`}>{cacheVal}</div>
            </div>
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

// ==========================================
// SIMULATOR 11: Optimistic Locking
// ==========================================
export function SimulatorOptimisticLocking() {
  const [dbVal, setDbVal] = useState("Original content text.");
  const [dbVersion, setDbVersion] = useState(1);
  const [agentAVal, setAgentAVal] = useState("Original content text.");
  const [agentBVal, setAgentBVal] = useState("Original content text.");
  const [logs, setLogs] = useState<string[]>([]);

  const handleSaveA = () => {
    // Agent A saves. DB version is 1. Saves and increments.
    setLogs(prev => [...prev, "Agent A clicked Save. Database checking version: expected version = 1."]);
    
    setLogs(prev => [...prev, "✓ Match found. Transaction COMMITTED. Incremented version to 2."]);
    setDbVal(agentAVal);
    setDbVersion(2);
  };

  const handleSaveB = () => {
    // Agent B tries to save but holds old version 1, while database has version 2.
    setLogs(prev => [...prev, "Agent B clicked Save. Database checking version: expected version = 1."]);
    
    if (dbVersion > 1) {
      setLogs(prev => [...prev, "❌ CONFLICT DETECTED! Database is version 2, Agent B tried to commit stale version 1.", "Write ABORTED to prevent overwriting Agent A's changes."]);
    } else {
      setLogs(prev => [...prev, "✓ Match found. Transaction COMMITTED."]);
      setDbVal(agentBVal);
      setDbVersion(2);
    }
  };

  const handleReset = () => {
    setDbVal("Original content text.");
    setDbVersion(1);
    setAgentAVal("Original content text.");
    setAgentBVal("Original content text.");
    setLogs([]);
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Agent A Screen */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-3">
          <div className="text-[10px] uppercase font-bold text-slate-400 flex justify-between">
            <span>Agent A Console</span>
            <span className="text-emerald-400 font-mono">Locks: Version 1</span>
          </div>
          <textarea
            value={agentAVal}
            onChange={(e) => setAgentAVal(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white h-20 resize-none focus:outline-none"
          />
          <button onClick={handleSaveA} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1 px-3 rounded text-xs cursor-pointer">
            Save Changes (Agent A)
          </button>
        </div>

        {/* Agent B Screen */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-3">
          <div className="text-[10px] uppercase font-bold text-slate-400 flex justify-between">
            <span>Agent B Console</span>
            <span className="text-emerald-400 font-mono">Locks: Version 1</span>
          </div>
          <textarea
            value={agentBVal}
            onChange={(e) => setAgentBVal(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white h-20 resize-none focus:outline-none"
          />
          <button onClick={handleSaveB} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-1 px-3 rounded text-xs cursor-pointer">
            Save Changes (Agent B)
          </button>
        </div>

        {/* SQL Database Store */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase">
            <span>Central SQL Database</span>
            <button onClick={handleReset} className="text-slate-400 underline hover:text-white">Reset DB</button>
          </div>

          <div className="my-2 bg-slate-900 p-2.5 rounded border border-slate-800 text-xs text-center">
            <div className="text-slate-100 font-mono font-bold">Record: "{dbVal}"</div>
            <div className="text-[10px] text-slate-400 font-mono mt-1">Row Version: {dbVersion}</div>
          </div>

          <div className="bg-slate-900 p-2 rounded text-[9px] font-mono text-slate-400 h-24 overflow-y-auto space-y-0.5">
            {logs.map((log, idx) => (
              <div key={idx} className={log.includes("❌") ? "text-red-400" : log.includes("✓") ? "text-emerald-400" : "text-slate-400"}>&gt; {log}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SIMULATOR 12: Collaborative Document Editor (OT vs CRDT)
// ==========================================
export function SimulatorCollaborativeEditor() {
  const [docVal, setDocVal] = useState("Hello");
  const [user1Val, setUser1Val] = useState("Hello");
  const [user2Val, setUser2Val] = useState("Hello");
  const [logs, setLogs] = useState<string[]>([]);
  const [lagEnabled, setLagEnabled] = useState(false);

  const triggerMerge = () => {
    setLogs([]);
    const changed1 = user1Val;
    const changed2 = user2Val;

    setLogs(prev => [...prev, "WebSocket synchronizer caught simultaneous document keystrokes."]);

    if (lagEnabled) {
      // Overwrite clash simulation without conflict resolution
      setLogs(prev => [...prev, "⚠️ No conflict algorithm active: simple last-write-wins (LWW) override applied.", "User 2's edits overwrote User 1's inputs! Data lost."]);
      setDocVal(changed2);
      setUser1Val(changed2);
    } else {
      // OT/CRDT resolver
      setLogs(prev => [...prev, "✓ Operational Transformation (OT) engine resolving indices...", "Inserting User 1's values and shifting User 2's offsets deterministically.", "Converged document synchronized safely!"]);
      
      // Smart merged representation
      const merged = changed1 + " " + changed2.replace("Hello", "").trim();
      setDocVal(merged);
      setUser1Val(merged);
      setUser2Val(merged);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* User 1 Editor */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
          <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-cyan-400" /> User A Editor</div>
          <input
            type="text"
            value={user1Val}
            onChange={(e) => setUser1Val(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white"
          />
        </div>

        {/* User 2 Editor */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
          <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-cyan-400" /> User B Editor</div>
          <input
            type="text"
            value={user2Val}
            onChange={(e) => setUser2Val(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white"
          />
        </div>

        {/* Central Sync control */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <label className="flex items-center justify-between cursor-pointer mb-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">Disable Conflict Solver</span>
              <input
                type="checkbox"
                checked={lagEnabled}
                onChange={() => setLagEnabled(!lagEnabled)}
                className="rounded border-slate-800 bg-slate-900 text-red-500 focus:ring-red-500"
              />
            </label>
            <button onClick={triggerMerge} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-1.5 px-3 rounded text-xs cursor-pointer">
              Sync edits over network
            </button>
          </div>

          <div className="bg-slate-900 p-2 rounded border border-slate-800 my-2 text-center text-xs">
            <div className="text-slate-400 text-[9px] uppercase font-mono">Central Server Doc State</div>
            <div className="text-slate-200 font-bold font-mono">"{docVal}"</div>
          </div>

          <div className="bg-slate-900 p-2 rounded text-[9px] font-mono text-slate-400 h-20 overflow-y-auto space-y-0.5">
            {logs.map((log, idx) => (
              <div key={idx} className={log.includes("⚠️") ? "text-red-400" : log.includes("✓") ? "text-emerald-400" : "text-slate-400"}>&gt; {log}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
