import { useState } from "react";
import { motion } from "motion/react";
import { Database, Zap, RefreshCw, Clock, Code, FileCode2, ArrowRight } from "lucide-react";

interface Layer {
  step: number;
  instruction: string;
  desc: string;
  status: "idle" | "cache" | "rebuilt";
  time: number;
  isSlow: boolean;
}

export default function DockerLayerCaching() {
  const [changeType, setChangeType] = useState<"code" | "deps">("code");
  const [isBuilding, setIsBuilding] = useState<boolean>(false);
  const [buildLogs, setBuildLogs] = useState<string[]>(["Select change type and click 'Build Container Image'"]);
  const [totalTime, setTotalTime] = useState<number>(0);

  const [layers, setLayers] = useState<Layer[]>([
    { step: 1, instruction: "FROM node:20-alpine", desc: "Base operating system + Node runtime environment", status: "idle", time: 0.1, isSlow: false },
    { step: 2, instruction: "COPY package*.json ./", desc: "Copy dependency lockfiles to work directory", status: "idle", time: 0.2, isSlow: false },
    { step: 3, instruction: "RUN npm ci", desc: "Perform clean, headless package installations", status: "idle", time: 6.5, isSlow: true },
    { step: 4, instruction: "COPY . .", desc: "Copy all remaining frontend application source files", status: "idle", time: 0.4, isSlow: false },
    { step: 5, instruction: "RUN npm run build", desc: "Compile code via Vite bundler to static assets", status: "idle", time: 3.2, isSlow: true }
  ]);

  const runBuild = async () => {
    if (isBuilding) return;
    setIsBuilding(true);
    setTotalTime(0);
    setLayers(prev => prev.map(l => ({ ...l, status: "idle" })));
    setBuildLogs(["Sending build context to Docker daemon...", "Step 1/5 : FROM node:20-alpine"]);

    await delay(600);

    // Step 1: Base image always cached
    setLayers(prev => prev.map((l, i) => i === 0 ? { ...l, status: "cache" } : l));
    setBuildLogs(prev => [...prev, " ---> Using cache (Loaded base OS structure)", "Step 2/5 : COPY package*.json ./"]);
    setTotalTime(t => t + 0.1);

    await delay(600);

    if (changeType === "code") {
      // Step 2 Cached
      setLayers(prev => prev.map((l, i) => i === 1 ? { ...l, status: "cache" } : l));
      setBuildLogs(prev => [...prev, " ---> Using cache (Lockfile unchanged)", "Step 3/5 : RUN npm ci"]);
      setTotalTime(t => t + 0.1);
      await delay(600);

      // Step 3 Cached (npm install is skipped!)
      setLayers(prev => prev.map((l, i) => i === 2 ? { ...l, status: "cache" } : l));
      setBuildLogs(prev => [...prev, " ---> Using cache (node_modules layer intact)", "Step 4/5 : COPY . ."]);
      setTotalTime(t => t + 0.1);
      await delay(600);

      // Step 4 Rebuilt (Since source code changed!)
      setLayers(prev => prev.map((l, i) => i === 3 ? { ...l, status: "rebuilt" } : l));
      setBuildLogs(prev => [...prev, " ---> App.tsx modification detected. Rebuilding layer.", "Step 5/5 : RUN npm run build"]);
      setTotalTime(t => t + 0.4);
      await delay(1000);

      // Step 5 Rebuilt (Build depends on step 4 change!)
      setLayers(prev => prev.map((l, i) => i === 4 ? { ...l, status: "rebuilt" } : l));
      setBuildLogs(prev => [
        ...prev, 
        " ---> Running Vite compiler...", 
        " ---> Compilation successful.", 
        "Successfully built image: sha256:d8c42b918"
      ]);
      setTotalTime(t => Math.round((t + 3.2) * 10) / 10);
      setIsBuilding(false);

    } else {
      // Modified dependencies
      // Step 2 Rebuilt
      setLayers(prev => prev.map((l, i) => i === 1 ? { ...l, status: "rebuilt" } : l));
      setBuildLogs(prev => [...prev, " ---> package.json modification detected. Copying updated lockfile.", "Step 3/5 : RUN npm ci"]);
      setTotalTime(t => t + 0.2);
      await delay(1000);

      // Step 3 Rebuilt (Full install forced!)
      setLayers(prev => prev.map((l, i) => i === 2 ? { ...l, status: "rebuilt" } : l));
      setBuildLogs(prev => [...prev, " ---> Cache invalidated. Executing clean node package install...", " ---> Auditing dependencies... (slow block)"]);
      setTotalTime(t => t + 6.5);
      await delay(2000);

      // Step 4 Rebuilt
      setLayers(prev => prev.map((l, i) => i === 3 ? { ...l, status: "rebuilt" } : l));
      setBuildLogs(prev => [...prev, "Step 4/5 : COPY . .", " ---> Copying application files."]);
      setTotalTime(t => t + 0.4);
      await delay(800);

      // Step 5 Rebuilt
      setLayers(prev => prev.map((l, i) => i === 4 ? { ...l, status: "rebuilt" } : l));
      setBuildLogs(prev => [
        ...prev, 
        "Step 5/5 : RUN npm run build",
        " ---> Running Vite compiler...",
        "Successfully built image: sha256:f9c34a210"
      ]);
      setTotalTime(t => Math.round((t + 3.2) * 10) / 10);
      setIsBuilding(false);
    }
  };

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white shadow-xl h-full flex flex-col justify-between">
      <div>
        {/* Header Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Zap className="text-amber-400 w-5 h-5 animate-pulse" />
            <h3 className="font-semibold text-lg text-slate-100 font-sans">Docker Layer Caching Simulator</h3>
          </div>
          
          <div className="flex gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setChangeType("code")}
              disabled={isBuilding}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                changeType === "code" ? "bg-slate-800 text-cyan-400" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Modify Code (App.tsx)</span>
            </button>
            <button
              onClick={() => setChangeType("deps")}
              disabled={isBuilding}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                changeType === "deps" ? "bg-slate-800 text-amber-400" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>Modify Deps (package.json)</span>
            </button>
          </div>
        </div>

        {/* Caching Diagram Layers */}
        <div className="space-y-2 mb-5">
          {layers.map((layer, idx) => {
            const isCached = layer.status === "cache";
            const isRebuilt = layer.status === "rebuilt";
            const isIdle = layer.status === "idle";

            return (
              <motion.div
                key={layer.step}
                layout
                className={`flex items-center justify-between border rounded-lg p-3 transition-all ${
                  isCached 
                    ? "bg-green-500/5 border-green-500/30 text-green-300" 
                    : isRebuilt 
                    ? "bg-amber-500/5 border-amber-500/40 text-amber-200" 
                    : "bg-slate-950/60 border-slate-800 text-slate-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Step counter */}
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-[10px] font-bold ${
                    isCached ? "bg-green-500/20 text-green-400" : isRebuilt ? "bg-amber-500/20 text-amber-400" : "bg-slate-800 text-slate-500"
                  }`}>
                    L{layer.step}
                  </div>
                  
                  <div>
                    <span className="font-mono text-xs font-bold font-sans block tracking-tight">
                      {layer.instruction}
                    </span>
                    <span className="text-[10px] text-slate-500 font-sans block leading-none mt-1">
                      {layer.desc}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  {isCached && (
                    <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-1.5 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider">
                      Using Cache
                    </span>
                  )}
                  {isRebuilt && (
                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider">
                      Rebuilding...
                    </span>
                  )}
                  <span className="text-[11px] text-slate-500">
                    {isCached ? "0.0s" : isIdle ? `--` : `${layer.time}s`}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Build console logs */}
        <div className="bg-black/50 border border-slate-800 rounded-lg p-3 h-28 overflow-y-auto font-mono text-[10px] space-y-0.5">
          {buildLogs.map((log, i) => (
            <div key={i} className={log.includes("Using cache") ? "text-green-400" : log.includes("Rebuilding") || log.includes("modification") ? "text-amber-400" : "text-slate-400"}>
              {log}
            </div>
          ))}
        </div>
      </div>

      {/* Footer statistics */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
        <button
          onClick={runBuild}
          disabled={isBuilding}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold font-sans transition-all shadow ${
            isBuilding 
              ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
              : "bg-amber-400 text-slate-950 hover:bg-amber-300"
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isBuilding ? "animate-spin" : ""}`} />
          <span>Build Container Image</span>
        </button>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>Simulated Build Duration:</span>
            <span className={`font-bold ${totalTime > 5 ? "text-amber-400" : totalTime > 0 ? "text-green-400" : "text-slate-500"}`}>
              {totalTime > 0 ? `${totalTime}s` : "--"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
