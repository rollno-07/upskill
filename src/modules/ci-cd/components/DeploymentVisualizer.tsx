import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Settings, RefreshCw, Layers, ArrowRight, Play, AlertOctagon, CheckCircle, Radio, RotateCcw } from "lucide-react";

interface Node {
  id: number;
  version: "v1" | "v2" | "upgrading";
}

export default function DeploymentVisualizer() {
  const [strategy, setStrategy] = useState<"rolling" | "bluegreen" | "canary">("rolling");
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>("Active. Stable production environment.");
  
  // Rolling variables
  const [nodes, setNodes] = useState<Node[]>([
    { id: 1, version: "v1" },
    { id: 2, version: "v1" },
    { id: 3, version: "v1" },
    { id: 4, version: "v1" },
    { id: 5, version: "v1" },
    { id: 6, version: "v1" }
  ]);

  // Blue-Green state
  const [activeEnv, setActiveEnv] = useState<"blue" | "green">("blue");
  const [blueNodes, setBlueNodes] = useState<Node[]>([
    { id: 11, version: "v1" },
    { id: 12, version: "v1" },
    { id: 13, version: "v1" }
  ]);
  const [greenNodes, setGreenNodes] = useState<Node[]>([
    { id: 21, version: "v2" },
    { id: 22, version: "v2" },
    { id: 23, version: "v2" }
  ]);

  // Canary variables
  const [canaryNodes, setCanaryNodes] = useState<Node[]>([
    { id: 31, version: "v1" },
    { id: 32, version: "v1" },
    { id: 33, version: "v1" },
    { id: 34, version: "v1" },
    { id: 35, version: "v1" },
    { id: 36, version: "v2" } // 1 canary node
  ]);
  const [canaryWeight, setCanaryWeight] = useState<number>(10); // weight percent
  const [hasCanaryIncident, setHasCanaryIncident] = useState<boolean>(false);

  // Simulated request streams
  const [requests, setRequests] = useState<{ id: number; routeTo: "v1" | "v2" | "error"; offset: number }[]>([]);

  useEffect(() => {
    // Generate streaming requests for traffic visualization
    const interval = setInterval(() => {
      let route: "v1" | "v2" | "error" = "v1";

      if (strategy === "bluegreen") {
        route = activeEnv === "blue" ? "v1" : "v2";
      } else if (strategy === "canary") {
        if (hasCanaryIncident) {
          route = Math.random() * 100 < canaryWeight ? "error" : "v1";
        } else {
          route = Math.random() * 100 < canaryWeight ? "v2" : "v1";
        }
      } else {
        // rolling
        const v2Count = nodes.filter(n => n.version === "v2").length;
        const total = nodes.length;
        route = Math.random() * total < v2Count ? "v2" : "v1";
      }

      setRequests(prev => [...prev, {
        id: Date.now() + Math.random(),
        routeTo: route,
        offset: Math.random() * 40 - 20 // deviation from center
      }].slice(-15)); // keep last 15
    }, 400);

    return () => clearInterval(interval);
  }, [strategy, activeEnv, canaryWeight, nodes, hasCanaryIncident]);

  const resetAll = () => {
    setIsDeploying(false);
    setStatusText("Active. Stable production environment.");
    setNodes([
      { id: 1, version: "v1" },
      { id: 2, version: "v1" },
      { id: 3, version: "v1" },
      { id: 4, version: "v1" },
      { id: 5, version: "v1" },
      { id: 6, version: "v1" }
    ]);
    setActiveEnv("blue");
    setCanaryWeight(10);
    setHasCanaryIncident(false);
    setCanaryNodes([
      { id: 31, version: "v1" },
      { id: 32, version: "v1" },
      { id: 33, version: "v1" },
      { id: 34, version: "v1" },
      { id: 35, version: "v1" },
      { id: 36, version: "v2" }
    ]);
  };

  // Run deployment orchestrator
  const runDeployment = async () => {
    if (isDeploying) return;
    setIsDeploying(true);
    setHasCanaryIncident(false);

    if (strategy === "rolling") {
      setStatusText("Initiating Rolling Upgrade. Batch size: 2.");
      
      // Upgrade batch 1
      setNodes(prev => prev.map((n, i) => i < 2 ? { ...n, version: "upgrading" } : n));
      await delay(1500);
      setNodes(prev => prev.map((n, i) => i < 2 ? { ...n, version: "v2" } : n));
      setStatusText("Batch 1 completed (v2: 33%). Starting Batch 2...");

      // Upgrade batch 2
      setNodes(prev => prev.map((n, i) => i >= 2 && i < 4 ? { ...n, version: "upgrading" } : n));
      await delay(1500);
      setNodes(prev => prev.map((n, i) => i >= 2 && i < 4 ? { ...n, version: "v2" } : n));
      setStatusText("Batch 2 completed (v2: 66%). Starting final Batch 3...");

      // Upgrade batch 3
      setNodes(prev => prev.map((n, i) => i >= 4 ? { ...n, version: "upgrading" } : n));
      await delay(1500);
      setNodes(prev => prev.map((n, i) => i >= 4 ? { ...n, version: "v2" } : n));
      
      setStatusText("🎉 Rolling deployment successful! 100% of pods updated to v2 with zero downtime.");
      setIsDeploying(false);
    } else if (strategy === "bluegreen") {
      setStatusText("Pre-warming Green Environment. Running automated health and integration checks...");
      await delay(1800);
      setStatusText("Green Environment 100% healthy. Switching active router to Green...");
      await delay(1000);
      setActiveEnv("green");
      setStatusText("🎉 Active traffic switched to Green (v2). Blue environment cached for instant rollback capability.");
      setIsDeploying(false);
    } else if (strategy === "canary") {
      setStatusText("Routing 10% canary traffic to v2 instance. Monitoring error ratios...");
      setCanaryWeight(10);
      await delay(1500);
      setStatusText("Promoting canary to 25% target weight...");
      setCanaryWeight(25);
      await delay(1500);
      setStatusText("No errors detected. Ramping canary to 50% target traffic weight...");
      setCanaryWeight(50);
      await delay(1500);
      setStatusText("Canary stage validation successful. Transitioning 100% of traffic to v2...");
      setCanaryWeight(100);
      setCanaryNodes(prev => prev.map(n => ({ ...n, version: "v2" })));
      setStatusText("🎉 Canary rollout complete! Fully transitioned to v2 with zero recorded incidents.");
      setIsDeploying(false);
    }
  };

  const simulateCanaryIncident = () => {
    if (strategy !== "canary") return;
    setHasCanaryIncident(true);
    setStatusText("🚨 WARNING: Spikes in 500 error rates detected on Canary Node 6 (v2)! Error Rate: 34%.");
    
    setTimeout(() => {
      setStatusText("🛡️ AUTORECUPERATION: Health rule breach triggered. Initiating immediate automated rollback...");
      setTimeout(() => {
        setCanaryWeight(0);
        setHasCanaryIncident(false);
        setStatusText("✓ ROLLBACK SUCCESS: Canary route set to 0%. All active traffic safely redirected to v1 stable nodes.");
      }, 2000);
    }, 2000);
  };

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white shadow-xl h-full flex flex-col justify-between">
      <div>
        {/* Top bar controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Radio className="text-emerald-400 w-5 h-5 animate-pulse" />
            <h3 className="font-semibold text-lg text-slate-100 font-sans">Deployment Strategy Visualizer</h3>
          </div>
          <div className="flex gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => { setStrategy("rolling"); resetAll(); }}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                strategy === "rolling" ? "bg-slate-800 text-cyan-400" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Rolling Update
            </button>
            <button
              onClick={() => { setStrategy("bluegreen"); resetAll(); }}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                strategy === "bluegreen" ? "bg-slate-800 text-emerald-400" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Blue-Green (Proxy Swap)
            </button>
            <button
              onClick={() => { setStrategy("canary"); resetAll(); }}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                strategy === "canary" ? "bg-slate-800 text-amber-400" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Canary & Rollback
            </button>
          </div>
        </div>

        {/* State / Status Indicator Banner */}
        <div className={`text-xs p-2.5 rounded-lg border mb-5 flex items-center gap-2 font-mono ${
          hasCanaryIncident 
            ? "bg-red-500/10 border-red-500/30 text-red-400" 
            : isDeploying 
            ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
            : statusText.includes("successful") || statusText.includes("complete") || statusText.includes("SUCCESS")
            ? "bg-green-500/10 border-green-500/30 text-green-400"
            : "bg-slate-950 border-slate-800 text-slate-300"
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            hasCanaryIncident ? "bg-red-500 animate-ping" : isDeploying ? "bg-cyan-400 animate-spin" : "bg-green-500"
          }`} />
          <span>{statusText}</span>
        </div>

        {/* Interactive Interactive Diagram Area */}
        <div className="relative h-60 bg-slate-950/75 border border-slate-800/80 rounded-xl overflow-hidden flex flex-col justify-between p-4">
          
          {/* Traffic Source Header */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Inbound Traffic Proxy</span>
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping mt-1" />
          </div>

          {/* User Request Streams Animating Downwards */}
          <div className="absolute inset-x-0 top-10 bottom-24 overflow-hidden pointer-events-none">
            <AnimatePresence>
              {requests.map(req => {
                const isError = req.routeTo === "error";
                const isV2 = req.routeTo === "v2";
                
                return (
                  <motion.div
                    key={req.id}
                    initial={{ y: 0, opacity: 1, x: `calc(50% + ${req.offset}px)` }}
                    animate={{ y: 150, opacity: 0.2 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "linear" }}
                    className={`absolute w-2.5 h-2.5 rounded-full ${
                      isError 
                        ? "bg-red-500 shadow-[0_0_8px_#ef4444]" 
                        : isV2 
                        ? "bg-purple-400 shadow-[0_0_8px_#c084fc]" 
                        : "bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                    }`}
                  />
                );
              })}
            </AnimatePresence>
          </div>

          {/* Middle Router Layer */}
          <div className="h-16 flex items-center justify-center relative mt-12">
            <div className="bg-slate-800/90 border border-slate-700 px-4 py-2 rounded-lg shadow-md z-10 text-center">
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold block">Router Switch</span>
              <span className="text-xs font-mono font-bold text-slate-200">
                {strategy === "bluegreen" 
                  ? `Active target: ${activeEnv.toUpperCase()} (${activeEnv === "blue" ? "v1" : "v2"})` 
                  : strategy === "canary"
                  ? `Canary Weights: v1 (${100 - canaryWeight}%) | v2 (${canaryWeight}%)`
                  : `Rolling Distribution`
                }
              </span>
            </div>
          </div>

          {/* Bottom Nodes Layer */}
          <div className="flex justify-around items-center gap-2 border-t border-slate-800/50 pt-4 bg-slate-900/50 -mx-4 -mb-4 px-4 pb-4">
            {/* Strategy Specific Node Visualizers */}
            {strategy === "rolling" && (
              <div className="w-full flex justify-around gap-2">
                {nodes.map(node => (
                  <div key={node.id} className="flex flex-col items-center">
                    <motion.div
                      layout
                      className={`w-10 h-10 rounded-lg flex items-center justify-center border-2 font-mono text-xs font-bold transition-all duration-500 ${
                        node.version === "v2" 
                          ? "bg-purple-500/10 border-purple-500 text-purple-400" 
                          : node.version === "upgrading"
                          ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 animate-spin"
                          : "bg-cyan-500/10 border-cyan-500/70 text-cyan-400"
                      }`}
                    >
                      {node.version === "upgrading" ? "..." : node.version.toUpperCase()}
                    </motion.div>
                    <span className="text-[9px] text-slate-500 mt-1">Pod-{node.id}</span>
                  </div>
                ))}
              </div>
            )}

            {strategy === "bluegreen" && (
              <div className="w-full flex justify-between px-8 gap-8">
                {/* Blue Environment (v1) */}
                <div className={`flex-1 border p-2 rounded-xl flex flex-col items-center bg-slate-950/40 transition-all ${
                  activeEnv === "blue" ? "border-cyan-500/50 bg-cyan-500/5" : "border-slate-800 opacity-40"
                }`}>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 mb-2">Blue Cluster (Stable v1)</span>
                  <div className="flex gap-2">
                    {blueNodes.map(node => (
                      <div key={node.id} className="w-8 h-8 rounded-lg border-2 border-cyan-500/60 bg-cyan-500/10 flex items-center justify-center text-xs font-mono font-bold text-cyan-400">
                        V1
                      </div>
                    ))}
                  </div>
                </div>

                {/* Green Environment (v2) */}
                <div className={`flex-1 border p-2 rounded-xl flex flex-col items-center bg-slate-950/40 transition-all ${
                  activeEnv === "green" ? "border-purple-500/50 bg-purple-500/5" : "border-slate-800 opacity-40"
                }`}>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400 mb-2">Green Cluster (Target v2)</span>
                  <div className="flex gap-2">
                    {greenNodes.map(node => (
                      <div key={node.id} className="w-8 h-8 rounded-lg border-2 border-purple-500/60 bg-purple-500/10 flex items-center justify-center text-xs font-mono font-bold text-purple-400">
                        V2
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {strategy === "canary" && (
              <div className="w-full flex justify-around gap-2">
                {canaryNodes.map((node, i) => {
                  const isCanaryIndex = i === 5; // node 6 is canary
                  const isFailing = isCanaryIndex && hasCanaryIncident;
                  return (
                    <div key={node.id} className="flex flex-col items-center">
                      <motion.div
                        layout
                        className={`w-10 h-10 rounded-lg flex items-center justify-center border-2 font-mono text-xs font-bold transition-all duration-300 ${
                          isFailing
                            ? "bg-red-500/20 border-red-500 text-red-400 animate-pulse"
                            : isCanaryIndex 
                            ? "bg-amber-500/10 border-amber-500 text-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.2)]" 
                            : node.version === "v2"
                            ? "bg-purple-500/10 border-purple-500 text-purple-400"
                            : "bg-cyan-500/10 border-cyan-500/70 text-cyan-400"
                        }`}
                      >
                        {isCanaryIndex && !node.version.startsWith("v2") ? "CANARY" : node.version.toUpperCase()}
                      </motion.div>
                      <span className="text-[9px] text-slate-500 mt-1">
                        {isCanaryIndex ? "Canary 6" : `Node-${node.id}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Control Actions Panel */}
      <div className="mt-5 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={runDeployment}
            disabled={isDeploying}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold font-sans transition-all shadow ${
              isDeploying 
                ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
                : "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Trigger {strategy === "rolling" ? "Rolling" : strategy === "bluegreen" ? "Blue-Green" : "Canary"} Deployment</span>
          </button>

          {strategy === "canary" && (
            <button
              onClick={simulateCanaryIncident}
              disabled={isDeploying || canaryWeight === 0 || canaryWeight === 100}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all ${
                canaryWeight === 0 || canaryWeight === 100 ? "opacity-30 cursor-not-allowed" : ""
              }`}
            >
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>Simulate Canary Incident</span>
            </button>
          )}

          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Strategy</span>
          </button>
        </div>

        {/* Static Strategy Explainer Sub-note */}
        <div className="text-[10px] text-slate-500 font-sans max-w-[200px] leading-tight text-right">
          {strategy === "rolling" && "Rolling: Cost effective in-place upgrades. Runs mixed version environments."}
          {strategy === "bluegreen" && "Blue-Green: Cost-heavy duplicate resources. Switch active router. Instant swap back."}
          {strategy === "canary" && "Canary: Mitigate incident fallout. Routes a small subset of traffic to test v2 before full rollout."}
        </div>
      </div>
    </div>
  );
}
