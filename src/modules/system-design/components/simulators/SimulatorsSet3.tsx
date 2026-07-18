import React, { useState, useEffect } from "react";
import { Server, Database, AlertCircle, Play, Sliders, RefreshCw, Layers, Inbox, Cpu } from "lucide-react";

// ==========================================
// SIMULATOR 13: Eventual Consistency Replication Lag
// ==========================================
export function SimulatorEventualConsistency() {
  const [leaderVal, setLeaderVal] = useState("A");
  const [fol1Val, setFol1Val] = useState("A");
  const [fol2Val, setFol2Val] = useState("A");
  const [fol3Val, setFol3Val] = useState("A");
  const [repLag, setRepLag] = useState(1500); // ms
  const [isSyncing, setIsSyncing] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleWrite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newVal = inputValue;
    setInputValue("");
    setLeaderVal(newVal);
    setIsSyncing(true);

    // Replicate with lag
    setTimeout(() => {
      setFol1Val(newVal);
    }, repLag * 0.5);

    setTimeout(() => {
      setFol2Val(newVal);
    }, repLag * 0.8);

    setTimeout(() => {
      setFol3Val(newVal);
      setIsSyncing(false);
    }, repLag);
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Write controller */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Replication Config</h5>
          
          <form onSubmit={handleWrite} className="space-y-2">
            <label className="text-xs text-slate-400 block font-semibold">Write value to Leader</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="e.g. X = 42"
                className="flex-1 bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-3 py-1.5 rounded text-xs cursor-pointer">Write</button>
            </div>
          </form>

          <div className="space-y-1">
            <label className="text-xs text-slate-400 block font-semibold">Replication Lag Delay</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="500"
                max="4000"
                step="500"
                value={repLag}
                onChange={(e) => setRepLag(Number(e.target.value))}
                className="w-full accent-cyan-500 h-1 bg-slate-800 rounded"
              />
              <span className="text-xs font-mono text-cyan-400 w-12 text-right">{repLag}ms</span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800 text-[11px] text-slate-400 leading-normal">
            💡 Reads directed to Followers immediately post-write will serve old data until background replication complete (stale-data window).
          </div>
        </div>

        {/* Database nodes */}
        <div className="md:col-span-2 bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-2 text-xs">
            <span className="font-bold text-slate-200">Eventual Replication Loop</span>
            {isSyncing ? (
              <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded flex items-center gap-1 font-mono font-bold animate-pulse">
                <RefreshCw className="w-3 animate-spin" /> SYNCHRONIZING...
              </span>
            ) : (
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono font-bold">
                ✓ CONVERGED
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center my-4">
            <div className="bg-cyan-950/20 p-3 rounded-lg border border-cyan-500/40">
              <Database className="w-6 h-6 text-cyan-400 mx-auto mb-1" />
              <div className="text-[10px] text-slate-400 font-mono">Leader (Master)</div>
              <div className="text-lg font-bold text-slate-100 mt-1 font-mono">{leaderVal}</div>
            </div>

            <div className={`p-3 rounded-lg border transition ${fol1Val !== leaderVal ? "border-cyan-500/40 bg-cyan-950/10" : "border-slate-800 bg-slate-900"}`}>
              <Database className={`w-6 h-6 mx-auto mb-1 ${fol1Val !== leaderVal ? "text-cyan-400 animate-pulse" : "text-slate-400"}`} />
              <div className="text-[10px] text-slate-400 font-mono">Follower 1</div>
              <div className="text-lg font-bold text-slate-100 mt-1 font-mono">{fol1Val}</div>
            </div>

            <div className={`p-3 rounded-lg border transition ${fol2Val !== leaderVal ? "border-cyan-500/40 bg-cyan-950/10" : "border-slate-800 bg-slate-900"}`}>
              <Database className={`w-6 h-6 mx-auto mb-1 ${fol2Val !== leaderVal ? "text-cyan-400 animate-pulse" : "text-slate-400"}`} />
              <div className="text-[10px] text-slate-400 font-mono">Follower 2</div>
              <div className="text-lg font-bold text-slate-100 mt-1 font-mono">{fol2Val}</div>
            </div>

            <div className={`p-3 rounded-lg border transition ${fol3Val !== leaderVal ? "border-cyan-500/40 bg-cyan-950/10" : "border-slate-800 bg-slate-900"}`}>
              <Database className={`w-6 h-6 mx-auto mb-1 ${fol3Val !== leaderVal ? "text-cyan-400 animate-pulse" : "text-slate-400"}`} />
              <div className="text-[10px] text-slate-400 font-mono">Follower 3</div>
              <div className="text-lg font-bold text-slate-100 mt-1 font-mono">{fol3Val}</div>
            </div>
          </div>

          <div className="text-xs bg-slate-900 p-2.5 rounded text-slate-400 text-center font-mono">
            {isSyncing ? (
              <span className="text-cyan-400">⚠️ Distributed system in inconsistent state! Reads on Follower 3 return stale data.</span>
            ) : (
              <span className="text-emerald-400">✓ All replicas reconciled. Ultimate eventual consistency state achieved.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SIMULATOR 14: CAP Theorem Network Partition
// ==========================================
export function SimulatorCAPTheorem() {
  const [setting, setSetting] = useState<"CP" | "AP">("CP");
  const [partitionActive, setPartitionActive] = useState(true);
  const [dbVal, setDbVal] = useState("Initial val");
  const [logs, setLogs] = useState<string[]>([]);

  const handleWrite = () => {
    setLogs([]);
    if (partitionActive) {
      if (setting === "CP") {
        setLogs(prev => [...prev, "Writing request routed to partitioned nodes.", "❌ TRANSACTION CANCELLED to enforce Consistency (CP).", "Database throws: '503 Connection Lost: Replicas unreachable'."]);
      } else {
        setLogs(prev => [...prev, "Writing request routed to partitioned nodes.", "✓ WRITE COMMITTED on local node to preserve Availability (AP).", "⚠️ Risk: Partitioned node holds stale data. Reconciles post-connection restore."]);
        setDbVal("New written data");
      }
    } else {
      setLogs(prev => [...prev, "✓ Cluster healthy. Transaction committed instantly everywhere."]);
      setDbVal("New written data");
    }
  };

  const handleTogglePartition = () => {
    setPartitionActive(!partitionActive);
    setLogs([]);
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Toggle settings */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">CAP Tradeoff Selector</h5>
          
          <div className="flex gap-2">
            <button
              onClick={() => { setSetting("CP"); setLogs([]); }}
              className={`flex-1 py-1.5 rounded text-xs font-semibold ${setting === "CP" ? "bg-red-600 text-white shadow-lg" : "bg-slate-800 text-slate-400"}`}
            >
              CP (Consistency)
            </button>
            <button
              onClick={() => { setSetting("AP"); setLogs([]); }}
              className={`flex-1 py-1.5 rounded text-xs font-semibold ${setting === "AP" ? "bg-emerald-600 text-white shadow-lg" : "bg-slate-800 text-slate-400"}`}
            >
              AP (Availability)
            </button>
          </div>

          <button
            onClick={handleTogglePartition}
            className={`w-full py-2 rounded text-xs font-bold border ${
              partitionActive ? "bg-red-950/20 border-red-500 text-red-400" : "bg-slate-900 border-slate-800 text-slate-400"
            }`}
          >
            {partitionActive ? "⚡ Partition: SPLIT ACTIVE" : "✓ Network: HEALTHY"}
          </button>

          <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800 text-[11px] text-slate-400 leading-normal">
            {setting === "CP" 
              ? "CP system: blocks writes and reads when split, guaranteeing no node serves divergent stale data."
              : "AP system: accepts writes locally, staying online for users but creating temporary state divergence."}
          </div>
        </div>

        {/* Visual pipeline */}
        <div className="md:col-span-2 bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-2 text-xs">
            <span className="font-bold text-slate-200">CAP Network Split Sandbox</span>
            <button onClick={handleWrite} className="bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1 rounded text-[11px] font-bold cursor-pointer">
              Trigger Write
            </button>
          </div>

          <div className="flex justify-around items-center my-4 font-mono text-xs relative">
            <div className="p-3 bg-slate-900 rounded border border-slate-800 text-center w-28">
              <span className="font-bold text-slate-300">Node NYC</span>
              <div className="text-[10px] text-emerald-400 mt-1">Value: {dbVal}</div>
            </div>

            {/* Split Indicator */}
            <div className="flex flex-col items-center">
              <span className="h-0.5 w-10 border-t border-dashed border-slate-700"></span>
              {partitionActive && (
                <span className="text-[10px] text-red-500 font-bold border border-red-500/20 bg-red-500/10 px-1 py-0.5 rounded animate-pulse my-1">
                  BROKEN WIRE
                </span>
              )}
            </div>

            <div className="p-3 bg-slate-900 rounded border border-slate-800 text-center w-28">
              <span className="font-bold text-slate-300">Node Dublin</span>
              <div className="text-[10px] text-emerald-400 mt-1">
                Value: {partitionActive && setting === "AP" ? "Initial val" : dbVal}
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-2 rounded text-[10px] font-mono text-slate-400 h-20 overflow-y-auto space-y-0.5">
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
// SIMULATOR 15: Infinite Scroll & Virtualization
// ==========================================
export function SimulatorInfiniteScroll() {
  const [virtualized, setVirtualized] = useState(true);
  const [itemCount, setItemCount] = useState(25);
  const [activeDomNodes, setActiveDomNodes] = useState(6);

  useEffect(() => {
    if (virtualized) {
      // Virtualization keeps active DOM elements fixed
      setActiveDomNodes(6);
    } else {
      // Non-virtualized renders everything
      setActiveDomNodes(itemCount);
    }
  }, [itemCount, virtualized]);

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Settings control */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1"><Layers className="w-3.5 h-3.5 text-emerald-400" /> Virtualization Panel</h5>

          <div className="space-y-2">
            <label className="flex items-center justify-between cursor-pointer bg-slate-900 p-2.5 rounded border border-slate-800">
              <span className="text-xs font-medium text-slate-300">DOM Virtualization</span>
              <input
                type="checkbox"
                checked={virtualized}
                onChange={() => setVirtualized(!virtualized)}
                className="rounded border-slate-800 text-emerald-500 focus:ring-emerald-500"
              />
            </label>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400 block font-semibold">Total Scrolled Feed Items</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="10"
                max="150"
                step="10"
                value={itemCount}
                onChange={(e) => setItemCount(Number(e.target.value))}
                className="w-full accent-emerald-500 h-1 bg-slate-800 rounded"
              />
              <span className="text-xs font-mono text-emerald-400 w-12 text-right">{itemCount} items</span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-2 rounded border border-slate-800 text-[11px] text-slate-400 leading-normal">
            {virtualized ? (
              <span className="text-emerald-400">✓ Rendering stays fast! Only off-screen elements are recycled and purged from DOM tree.</span>
            ) : (
              <span className="text-red-400">⚠️ Risk: Stacking {itemCount} full HTML complex card elements increases DOM memory usage, eventual frame lag.</span>
            )}
          </div>
        </div>

        {/* Console stats */}
        <div className="md:col-span-2 bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-200 border-b border-slate-800 pb-2 mb-2">DOM Node Leak Monitor</div>

          <div className="flex justify-around items-center my-4">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-center w-36">
              <span className="text-[10px] text-slate-400 uppercase">Items in Feed</span>
              <div className="text-2xl font-bold text-slate-200 font-mono">{itemCount}</div>
            </div>

            <div className={`p-4 rounded-lg border text-center w-36 ${activeDomNodes > 40 ? "border-red-500 bg-red-950/10" : "border-emerald-500 bg-emerald-950/10"}`}>
              <span className="text-[10px] text-slate-400 uppercase">Active DOM Nodes</span>
              <div className={`text-2xl font-bold font-mono ${activeDomNodes > 40 ? "text-red-400" : "text-emerald-400"}`}>
                {activeDomNodes}
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-400 text-center bg-slate-900 p-2.5 rounded border border-slate-800 leading-snug">
            {virtualized 
              ? "⚡ CPU locks memory. Scrolling stays strictly 60 FPS across low-end mobile architectures."
              : "🐢 Memory bloating. Cumulative Layout Shifting (CLS) and thread garbage collection freezes possible."}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SIMULATOR 16: Cursor vs Offset Pagination
// ==========================================
export function SimulatorPagination() {
  const [strategy, setStrategy] = useState<"Offset" | "Cursor">("Offset");
  const [items, setItems] = useState<string[]>(["Product A", "Product B", "Product C", "Product D", "Product E"]);
  const [logs, setLogs] = useState<string[]>([]);

  const handleInsert = () => {
    // Insert new item at the top (concurrent creation simulation)
    const newName = `New Product ${Math.round(Math.random()*100)}`;
    setItems(prev => [newName, ...prev]);
    setLogs(prev => [
      ...prev,
      `Concurrently added: "${newName}" at index 0 in Database.`,
      strategy === "Offset"
        ? "⚠️ Offset shift! Page 1 (offset 0) indices slid down. Next Offset Query reads shifted rows (duplicate item view)."
        : "✓ Cursor stabilized. Query checks WHERE ID < last_seen_id, bypassing any new top additions perfectly."
    ]);
  };

  const handleReset = () => {
    setItems(["Product A", "Product B", "Product C", "Product D", "Product E"]);
    setLogs([]);
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Toggle selectors */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Pagination Type</h5>
          
          <div className="flex flex-col gap-2">
            <button
              onClick={() => { setStrategy("Offset"); setLogs([]); }}
              className={`py-2 px-3 rounded text-xs text-left transition ${strategy === "Offset" ? "bg-cyan-600 text-white shadow-lg" : "bg-slate-900 text-slate-400"}`}
            >
              ⚠️ Offset-based skip (LIMIT/OFFSET)
            </button>
            <button
              onClick={() => { setStrategy("Cursor"); setLogs([]); }}
              className={`py-2 px-3 rounded text-xs text-left transition ${strategy === "Cursor" ? "bg-emerald-600 text-white shadow-lg" : "bg-slate-900 text-slate-400"}`}
            >
              🚀 Cursor-based (WHERE id &lt; cursor)
            </button>
          </div>

          <div className="flex gap-2 border-t border-slate-800 pt-3">
            <button onClick={handleInsert} className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-1.5 px-3 rounded text-xs cursor-pointer">
              Add New DB Entry
            </button>
            <button onClick={handleReset} className="px-2 py-1.5 border border-slate-800 rounded hover:text-white text-xs">Reset</button>
          </div>
        </div>

        {/* Database List rendering */}
        <div className="md:col-span-2 bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-200 border-b border-slate-800 pb-2 mb-2">Live Table State</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-mono mb-1.5">DB Rows (Top of Table)</div>
              <div className="space-y-1 text-xs">
                {items.slice(0, 5).map((item, idx) => (
                  <div key={idx} className="bg-slate-900 p-1.5 rounded border border-slate-800 font-mono flex justify-between items-center">
                    <span>{item}</span>
                    <span className="text-[9px] text-slate-500">Row {idx}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-[10px] font-mono text-slate-400 flex flex-col justify-between h-36">
              <div className="text-slate-500 border-b border-slate-800 pb-1 font-sans">Database Query Engine Logs</div>
              <div className="flex-1 overflow-y-auto space-y-1 mt-1">
                {logs.map((log, idx) => (
                  <div key={idx} className={log.includes("⚠️") ? "text-cyan-400" : "text-cyan-400"}>&gt; {log}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SIMULATOR 17: Rate Limiting (Token Bucket)
// ==========================================
export function SimulatorRateLimiter() {
  const [tokens, setTokens] = useState(5);
  const [maxTokens, setMaxTokens] = useState(5);
  const [refillRate, setRefillRate] = useState(2000); // ms per token
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTokens(prev => {
        if (prev < maxTokens) {
          return prev + 1;
        }
        return prev;
      });
    }, refillRate);

    return () => clearInterval(timer);
  }, [refillRate, maxTokens]);

  const handleRequest = () => {
    if (tokens > 0) {
      setTokens(prev => prev - 1);
      setLogs(prev => [`✓ 200 OK: Request processed. Token consumed. [Remaining: ${tokens - 1}]`, ...prev.slice(0, 4)]);
    } else {
      setLogs(prev => ["❌ 429 Too Many Requests: Rate limit exceeded. Token bucket depleted.", ...prev.slice(0, 4)]);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Configurations */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1"><Sliders className="w-3.5 h-3.5 text-cyan-400" /> Limiter Controls</h5>

          <div className="space-y-1">
            <label className="text-xs text-slate-400 block font-semibold">Bucket Max Capacity</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="2"
                max="10"
                value={maxTokens}
                onChange={(e) => { setMaxTokens(Number(e.target.value)); setTokens(Number(e.target.value)); }}
                className="w-full accent-cyan-500 h-1 bg-slate-800 rounded"
              />
              <span className="text-xs font-mono text-cyan-400 w-8 text-right">{maxTokens}</span>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400 block font-semibold">Token Refill Speed</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="500"
                max="3000"
                step="500"
                value={refillRate}
                onChange={(e) => setRefillRate(Number(e.target.value))}
                className="w-full accent-cyan-500 h-1 bg-slate-800 rounded"
              />
              <span className="text-xs font-mono text-cyan-400 w-16 text-right">{(refillRate / 1000).toFixed(1)}s</span>
            </div>
          </div>

          <button onClick={handleRequest} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 rounded text-xs cursor-pointer shadow-lg shadow-cyan-500/10">
            Call API endpoint
          </button>
        </div>

        {/* Bucket Visualization */}
        <div className="md:col-span-2 bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-200 border-b border-slate-800 pb-2 mb-2">Token Bucket Visualizer</div>

          <div className="flex-1 flex justify-center items-center my-4">
            <div className="relative w-36 h-36 border-2 border-slate-700 border-t-transparent rounded-b-xl flex flex-wrap-reverse items-start justify-center gap-1 p-2.5 bg-slate-900/50">
              {Array.from({ length: tokens }).map((_, idx) => (
                <div key={idx} className="w-5.5 h-5.5 rounded-full bg-cyan-400 shadow-md shadow-cyan-500/20 animate-bounce"></div>
              ))}
              {tokens === 0 && (
                <span className="text-[10px] text-red-400 uppercase font-bold animate-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  DEPLETED
                </span>
              )}
            </div>
          </div>

          <div className="bg-slate-900 p-2 rounded text-[10px] font-mono text-slate-400 h-20 overflow-y-auto space-y-0.5">
            {logs.map((log, idx) => (
              <div key={idx} className={log.includes("❌") ? "text-red-400" : "text-emerald-400"}>&gt; {log}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SIMULATOR 18: Message Queue Thread Offloading
// ==========================================
export function SimulatorMessageQueue() {
  const [queue, setQueue] = useState<string[]>([]);
  const [workers, setWorkers] = useState(1);
  const [logs, setLogs] = useState<string[]>([]);

  const handleAddTask = (type: string) => {
    setQueue(prev => [...prev, `${type}_Job_${Math.round(Math.random() * 1000)}`]);
    setLogs(prev => [`Producer: Pushed heavy job [${type}] into message queue.`, ...prev.slice(0, 4)]);
  };

  // Background worker loop
  useEffect(() => {
    if (queue.length === 0) return;

    const timer = setTimeout(() => {
      // Dequeue first element
      const processed = queue[0];
      setQueue(prev => prev.slice(1));
      setLogs(prev => [`Worker Node: Successfully completed [${processed}]. Task removed from Queue.`, ...prev.slice(0, 4)]);
    }, 2000 / workers); // faster with more workers

    return () => clearTimeout(timer);
  }, [queue, workers]);

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Actions */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1"><Inbox className="w-3.5 h-3.5 text-cyan-400" /> Queue Operations</h5>
          
          <div className="space-y-2">
            <span className="text-xs text-slate-400 block font-semibold">Spawn Asynchronous Tasks:</span>
            <div className="flex gap-1.5">
              <button onClick={() => handleAddTask("TranscodeVideo")} className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-1 px-2 rounded text-[10px] cursor-pointer">
                🎥 Video conversion
              </button>
              <button onClick={() => handleAddTask("SendEmails")} className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-1 px-2 rounded text-[10px] cursor-pointer">
                📧 10k welcome mailers
              </button>
            </div>
          </div>

          <div className="space-y-1 border-t border-slate-800 pt-3">
            <label className="text-xs text-slate-400 block font-semibold">Active Workers Count</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="1"
                max="3"
                value={workers}
                onChange={(e) => setWorkers(Number(e.target.value))}
                className="w-full accent-indigo-500 h-1 bg-slate-800 rounded"
              />
              <span className="text-xs font-mono text-cyan-400 w-8 text-right">{workers}</span>
            </div>
          </div>
        </div>

        {/* Queue Stack visual */}
        <div className="md:col-span-2 bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-200 border-b border-slate-800 pb-2 mb-2">Message Queue Buffer Stack</div>

          <div className="flex-1 flex items-center justify-start gap-2 my-3 overflow-x-auto min-h-16 py-1">
            {queue.length === 0 ? (
              <span className="text-xs text-slate-600 italic font-mono mx-auto">Queue is currently empty. System relaxed...</span>
            ) : (
              queue.map((task, idx) => (
                <div key={idx} className="bg-cyan-950/40 border border-cyan-500/40 px-2.5 py-1.5 rounded-md text-[10px] font-mono text-cyan-300 min-w-28 flex flex-col items-center">
                  <span className="font-bold truncate">{task.split("_")[0]}</span>
                  <span className="text-[8px] text-slate-500 mt-0.5">ID: {task.split("_")[2]}</span>
                </div>
              ))
            )}
          </div>

          <div className="bg-slate-900 p-2 rounded text-[10px] font-mono text-slate-400 h-20 overflow-y-auto space-y-0.5">
            {logs.map((log, idx) => (
              <div key={idx} className={log.includes("completed") ? "text-emerald-400" : "text-slate-300"}>&gt; {log}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
