import React, { useState, useEffect } from "react";
import { FolderUp, Search, Database, Link, Heart, ArrowRight } from "lucide-react";

// ==========================================
// SIMULATOR 19: Chunked / Resumable Uploads
// ==========================================
export function SimulatorChunkedUpload() {
  const [chunks, setChunks] = useState<Array<"empty" | "uploaded" | "failed">>([
    "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"
  ]);
  const [activeChunk, setActiveChunk] = useState<number | null>(null);
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "paused" | "success">("idle");
  const [logs, setLogs] = useState<string[]>([]);

  const handleStart = () => {
    setUploadState("uploading");
    setLogs(prev => ["Triggering multipart session registration...", "Sliced raw video file into 8 discrete 5MB chunks.", "Initiating parallel upload pipelines...", ...prev]);
  };

  const handlePause = () => {
    setUploadState("paused");
    setLogs(prev => ["🚨 Network connection interrupted!", "Uploading paused. Storing active byte checkpoints server-side...", ...prev]);
  };

  const handleResume = () => {
    setUploadState("uploading");
    setLogs(prev => ["✓ Network link re-established.", "Querying database for uploaded offsets...", "Resuming stream from exact last checkpoint (saving network bandwidth)...", ...prev]);
  };

  // Upload loop
  useEffect(() => {
    if (uploadState !== "uploading") return;

    // Find first empty chunk
    const nextIdx = chunks.findIndex(c => c === "empty");
    if (nextIdx === -1) {
      setUploadState("success");
      setLogs(prev => ["✓ All 8 parts compiled successfully on Object Storage!", "Master video chunk validated. Success!", ...prev]);
      return;
    }

    setActiveChunk(nextIdx);

    const timer = setTimeout(() => {
      setChunks(prev => {
        const copy = [...prev];
        copy[nextIdx] = "uploaded";
        return copy;
      });
      setLogs(prev => [`✓ Segment Part ${nextIdx + 1} / 8 uploaded successfully.`, ...prev]);
    }, 1200);

    return () => clearTimeout(timer);
  }, [chunks, uploadState]);

  const reset = () => {
    setChunks(["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"]);
    setActiveChunk(null);
    setUploadState("idle");
    setLogs([]);
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Controls */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Upload Controller</h5>
          
          <div className="flex flex-col gap-2">
            {uploadState === "idle" && (
              <button onClick={handleStart} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 rounded text-xs cursor-pointer shadow-lg shadow-cyan-500/10">
                Start Multipart Upload
              </button>
            )}

            {uploadState === "uploading" && (
              <button onClick={handlePause} className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded text-xs cursor-pointer">
                Simulate Disconnect
              </button>
            )}

            {uploadState === "paused" && (
              <button onClick={handleResume} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded text-xs cursor-pointer">
                Resume Upload
              </button>
            )}

            {uploadState === "success" && (
              <button onClick={reset} className="border border-slate-800 hover:text-white py-2 rounded text-xs font-bold">
                Reset State
              </button>
            )}
          </div>

          <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800 text-[11px] text-slate-400 leading-normal">
            If connection drops, resumable protocols bypass re-uploading completed chunks (saving user mobile data caps).
          </div>
        </div>

        {/* Visual Bar segments */}
        <div className="md:col-span-2 bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-200 border-b border-slate-800 pb-2 mb-2">Segment upload checklist (Multipart)</div>

          <div className="flex-1 flex flex-col justify-center my-4">
            <div className="grid grid-cols-8 gap-1.5 w-full max-w-sm mx-auto">
              {chunks.map((state, idx) => (
                <div
                  key={idx}
                  className={`h-8 rounded flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                    state === "uploaded"
                      ? "bg-emerald-600 text-white"
                      : activeChunk === idx && uploadState === "uploading"
                      ? "bg-cyan-500 text-white animate-pulse"
                      : "bg-slate-800 text-slate-500"
                  }`}
                >
                  P{idx + 1}
                </div>
              ))}
            </div>
            {uploadState === "paused" && (
              <p className="text-center text-[10px] text-red-400 font-mono mt-3 animate-pulse">
                Paused checkpoint locked at Chunk {chunks.filter(c => c === "uploaded").length + 1}
              </p>
            )}
          </div>

          <div className="bg-slate-900 p-2 rounded text-[10px] font-mono text-slate-400 h-20 overflow-y-auto space-y-0.5">
            {logs.slice(0, 4).map((log, idx) => (
              <div key={idx} className="text-cyan-400">&gt; {log}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SIMULATOR 20: Search Autocomplete (Trie)
// ==========================================
export function SimulatorAutocomplete() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [debouncing, setDebouncing] = useState(false);

  // Simulated Trie Dictionary
  const DICTIONARY = [
    "system design", "system design interview", "systems engineering", "scalability", "scaler database", "caching", "cache aside"
  ];

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    setDebouncing(true);

    const timer = setTimeout(() => {
      const match = DICTIONARY.filter(item => item.startsWith(query.toLowerCase()));
      setSuggestions(match);
      setDebouncing(false);
    }, 400); // 400ms debounce delay

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Input */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-cyan-400" /> Auto-Complete Interface
          </h5>

          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search concepts (e.g. sys, scal, cach)..."
              className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            {debouncing && (
              <span className="absolute right-3.5 top-2 w-4 h-4 border-2 border-t-transparent border-cyan-400 rounded-full animate-spin"></span>
            )}
          </div>

          <div className="bg-slate-900/60 p-2 rounded border border-slate-800 text-[11px] text-slate-400">
            Debouncing prevents issuing query API calls on every rapid keystroke, reducing downstream server billing costs significantly.
          </div>
        </div>

        {/* Dynamic Suggester Whiteboard */}
        <div className="md:col-span-2 bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-200 border-b border-slate-800 pb-2 mb-2">Trie Node suggestions matcher</div>

          <div className="flex-1 flex flex-col justify-center my-2">
            {suggestions.length > 0 ? (
              <div className="space-y-1 max-w-sm mx-auto w-full">
                {suggestions.map((s, idx) => (
                  <div key={idx} className="bg-slate-900 p-2 rounded border border-slate-800 text-xs font-mono text-cyan-400 flex items-center gap-2">
                    <span className="text-[10px] text-slate-500">Node Match:</span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            ) : query && !debouncing ? (
              <p className="text-center text-xs text-slate-500 italic">No node branches match prefix: "{query}"</p>
            ) : (
              <p className="text-center text-xs text-slate-500 italic">Type a few characters to see the Trie match suggestions...</p>
            )}
          </div>

          <div className="text-[10px] text-slate-400 font-mono text-center mt-2">
            🔍 Trie complexity is O(L) where L is the search term character length, completely independent of database size.
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SIMULATOR 21: Database Sharding Key Router
// ==========================================
export function SimulatorSharding() {
  const [shardKey, setShardKey] = useState("105"); // User ID
  const [assignedShard, setAssignedShard] = useState<string | null>(null);

  const handleRoute = (e: React.FormEvent) => {
    e.preventDefault();
    const id = parseInt(shardKey);
    if (isNaN(id)) return;

    // Hash sharding (id % 3)
    const index = id % 3;
    setAssignedShard(`Shard ${index + 1} (Database Instance ${index + 1})`);
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sharding control */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1"><Database className="w-3.5 h-3.5 text-cyan-400" /> Hash Router</h5>
          
          <form onSubmit={handleRoute} className="space-y-2">
            <label className="text-xs text-slate-400 block font-semibold">Insert User ID (Numerical)</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={shardKey}
                onChange={(e) => setShardKey(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-white"
              />
              <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-3 py-1 rounded text-xs cursor-pointer">Route</button>
            </div>
          </form>

          <div className="bg-slate-900/60 p-2 rounded border border-slate-800 text-[11px] text-slate-400 leading-normal">
            Uses modulo hashing `user_id % 3` to spread accounts evenly, ensuring individual databases scale storage volumes horizontally.
          </div>
        </div>

        {/* Shards visualisation */}
        <div className="md:col-span-2 bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-200 border-b border-slate-800 pb-2 mb-2">Partitioned Cluster Topology</div>

          <div className="grid grid-cols-3 gap-2.5 my-3 text-center">
            {["Shard 1", "Shard 2", "Shard 3"].map((shard, idx) => (
              <div
                key={shard}
                className={`p-3 rounded-lg border transition-all ${
                  assignedShard?.includes(shard)
                    ? "border-cyan-500 bg-cyan-950/20 text-cyan-400 shadow-lg shadow-cyan-500/10 scale-105"
                    : "border-slate-800 bg-slate-900 text-slate-500"
                }`}
              >
                <Database className="w-5 h-5 mx-auto mb-1" />
                <div className="text-[10px] font-mono font-bold">{shard}</div>
                <div className="text-[9px] text-slate-500 font-mono mt-0.5">IDs % 3 = {idx}</div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 p-2.5 rounded font-mono text-xs text-slate-300 min-h-12 flex items-center justify-center text-center">
            {assignedShard ? (
              <span className="text-cyan-400 flex items-center gap-1">
                🚀 Routed input {shardKey} directly to <span className="font-bold">{assignedShard}</span>. Zero cross-shard scan latency!
              </span>
            ) : (
              <span className="text-slate-500">Insert ID and click Route to test sharded partition indexes...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SIMULATOR 22: URL Shortener Machine
// ==========================================
export function SimulatorUrlShortener() {
  const [longUrl, setLongUrl] = useState("https://google.com/search?q=system_design");
  const [shortKey, setShortKey] = useState("");
  const [clicks, setClicks] = useState(0);

  const handleShorten = (e: React.FormEvent) => {
    e.preventDefault();
    if (!longUrl.trim()) return;

    // Simulate auto-increment seed to Base62
    const seed = Math.floor(Math.random() * 10000000);
    const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let num = seed;
    let result = "";
    while (num > 0) {
      result = ALPHABET[num % 62] + result;
      num = Math.floor(num / 62);
    }
    setShortKey(result.substring(0, 6));
    setClicks(0);
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Input */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Link className="w-3.5 h-3.5 text-cyan-400" /> Shortener Converter
          </h5>

          <form onSubmit={handleShorten} className="space-y-2">
            <label className="text-xs text-slate-400 block font-semibold">Long Destination URL</label>
            <input
              type="text"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
            />
            <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 rounded text-xs cursor-pointer">
              Shorten URL
            </button>
          </form>
        </div>

        {/* Conversion results */}
        <div className="md:col-span-2 bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-200 border-b border-slate-800 pb-2 mb-2">Short URL Dictionary Mapping</div>

          <div className="flex-1 flex flex-col justify-center items-center my-3 gap-3">
            {shortKey ? (
              <div className="space-y-2 text-center">
                <div className="flex items-center gap-2 justify-center">
                  <span className="bg-slate-900 px-3 py-1 rounded border border-slate-800 font-mono text-xs text-slate-400 truncate max-w-40">{longUrl}</span>
                  <ArrowRight className="w-3.5 text-slate-500" />
                  <span className="bg-cyan-950/40 text-cyan-400 px-3 py-1 rounded border border-cyan-500/20 font-mono text-xs font-bold">
                    short.ly/{shortKey}
                  </span>
                </div>
                <button
                  onClick={() => setClicks(prev => prev + 1)}
                  className="bg-slate-800 hover:text-white px-3 py-1 rounded text-[10px] font-semibold text-slate-300"
                >
                  🚀 Test Redirect Click (HTTP 301)
                </button>
                <p className="text-[10px] text-slate-500 font-mono">Redirect count stored in cache: {clicks} hit(s)</p>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">Click Shorten to generate base-62 dictionary mapping keys...</p>
            )}
          </div>

          <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-[10px] text-slate-400 font-sans text-center">
            HTTP 301 Redirect header lets browsers cache destinations permanently, bypassing shortened endpoints on future taps to conserve resource bills.
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SIMULATOR 23: Online Presence (Redis Heartbeats)
// ==========================================
export function SimulatorPresence() {
  const [bobOnline, setBobOnline] = useState(true);
  const [countdown, setCountdown] = useState(12);

  useEffect(() => {
    if (bobOnline) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, bobOnline]);

  const handleDisconnectBob = () => {
    setBobOnline(false);
    setCountdown(12); // start countdown sweep
  };

  const handleReconnectBob = () => {
    setBobOnline(true);
    setCountdown(12);
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Bob Controller */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 text-cyan-500" /> Bob Session</h5>

          <div className="flex flex-col gap-2">
            {bobOnline ? (
              <button onClick={handleDisconnectBob} className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded text-xs cursor-pointer">
                Simulate Bob Disconnection
              </button>
            ) : (
              <button onClick={handleReconnectBob} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded text-xs cursor-pointer">
                Reconnect Bob (Resume heartbeats)
              </button>
            )}
          </div>

          <div className="bg-slate-900/60 p-2 rounded border border-slate-800 text-[11px] text-slate-400 leading-normal">
            Clients stream WebSocket heartbeat logs every 4 seconds. If inactive longer than 12 seconds, Redis automatically drops status keys.
          </div>
        </div>

        {/* Pulse indicators */}
        <div className="md:col-span-2 bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-200 border-b border-slate-800 pb-2 mb-2">Team Presence Dashboard</div>

          <div className="flex-1 flex justify-around items-center my-3">
            {/* Alice */}
            <div className="text-center font-mono text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse mr-1"></span>
              <span className="text-slate-200 font-bold">Alice</span>
              <div className="text-[9px] text-emerald-400 mt-1">✓ online (HB active)</div>
            </div>

            {/* Bob */}
            <div className="text-center font-mono text-xs">
              <span className={`w-2.5 h-2.5 rounded-full inline-block mr-1 ${bobOnline ? "bg-emerald-500 animate-pulse" : countdown > 0 ? "bg-cyan-500" : "bg-slate-600"}`}></span>
              <span className="text-slate-200 font-bold">Bob</span>
              {bobOnline ? (
                <div className="text-[9px] text-emerald-400 mt-1">✓ online (HB active)</div>
              ) : countdown > 0 ? (
                <div className="text-[9px] text-cyan-400 mt-1 animate-pulse">Offline sweep count: {countdown}s</div>
              ) : (
                <div className="text-[9px] text-slate-500 mt-1">● offline (TTL expired)</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SIMULATOR 24: REST vs GraphQL Payloads
// ==========================================
export function SimulatorRESTvsGraphQL() {
  const [apiType, setApiType] = useState<"REST" | "GraphQL">("REST");
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = () => {
    setLoading(true);
    setLogs([]);

    if (apiType === "REST") {
      setLogs(prev => [...prev, "Issuing sequence calls (Waterfall)...", "1. GET /api/v1/users/1 [Response size: 45KB]"]);
      setTimeout(() => {
        setLogs(prev => [...prev, "2. GET /api/v1/users/1/posts [Response size: 120KB]"]);
      }, 600);
      setTimeout(() => {
        setLogs(prev => [...prev, "3. GET /api/v1/users/1/followers [Response size: 85KB]", "✓ Total Payload downloaded: 250KB over 3 TCP socket runs."]);
        setLoading(false);
      }, 1500);
    } else {
      setLogs(prev => [...prev, "Issuing single query body...", "POST /api/graphql [Query: { user { name, posts { title } } }]"]);
      setTimeout(() => {
        setLogs(prev => [...prev, "✓ Server resolved nested schemas in 1 DB join block.", "✓ Total Payload downloaded: 12KB (exact fields requested) over 1 TCP socket run."]);
        setLoading(false);
      }, 900);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Toggle selectors */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Interface Format</h5>
          
          <div className="flex gap-2">
            <button
              onClick={() => { setApiType("REST"); setLogs([]); }}
              className={`flex-1 py-1.5 rounded text-xs font-semibold ${apiType === "REST" ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-400"}`}
            >
              REST (Waterfall)
            </button>
            <button
              onClick={() => { setApiType("GraphQL"); setLogs([]); }}
              className={`flex-1 py-1.5 rounded text-xs font-semibold ${apiType === "GraphQL" ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400"}`}
            >
              GraphQL (Custom)
            </button>
          </div>

          <button onClick={handleFetch} disabled={loading} className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white py-2 rounded text-xs font-bold cursor-pointer">
            Trigger Profile fetch
          </button>
        </div>

        {/* Network panel */}
        <div className="md:col-span-2 bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-200 border-b border-slate-800 pb-2 mb-2">Network Logger Monitor</div>

          <div className="bg-slate-900 p-2.5 rounded font-mono text-xs text-slate-300 h-24 overflow-y-auto space-y-1">
            {logs.length > 0 ? (
              logs.map((log, idx) => (
                <div key={idx} className={log.includes("✓") ? "text-emerald-400" : log.includes("GET") || log.includes("POST") ? "text-cyan-400 font-bold" : "text-slate-400"}>
                  &gt; {log}
                </div>
              ))
            ) : (
              <span className="text-slate-500">Click Trigger Profile fetch to visualize transfer size and socket loop differences...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
