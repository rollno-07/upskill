/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Zap, HelpCircle, HardDrive, CheckCircle2, RefreshCw, Layers2, Sparkles, FileSpreadsheet, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function OptimizationSandbox() {
  const [activeTab, setActiveTab] = useState<"tree" | "split">("tree");

  // Tree shaking states
  const [isTreeShakingEnabled, setIsTreeShakingEnabled] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);

  // Split chunks states
  const [isSplitChunksEnabled, setIsSplitChunksEnabled] = useState<boolean>(false);
  const [simulateEditCount, setSimulateEditCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chunkLogs, setChunkLogs] = useState<string[]>([]);

  const handleTriggerShake = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsTreeShakingEnabled(prev => !prev);
      setIsShaking(false);
    }, 1000);
  };

  const runCodeEditSimulation = () => {
    setIsLoading(true);
    setChunkLogs([]);
    setTimeout(() => {
      setSimulateEditCount(prev => prev + 1);
      setIsLoading(false);
      
      if (isSplitChunksEnabled) {
        setChunkLogs([
          "Detected modification in './src/App.tsx'...",
          "Compiling changes...",
          "Emit: dist/main.4a8b9c.js [120 KB] (New Content Hash)",
          "Skip: dist/vendor.33bf8e.js [1.8 MB] (Unchanged, Loaded from client browser cache! ✅)"
        ]);
      } else {
        setChunkLogs([
          "Detected modification in './src/App.tsx'...",
          "Compiling entire application...",
          "Emit: dist/bundle.99cf2a.js [1.95 MB] (Entire monolithic bundle rebuilt and cache invalidated! ❌)"
        ]);
      }
    }, 1200);
  };

  return (
    <div id="optimization-sandbox" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-slate-100 font-sans shadow-2xl overflow-hidden">
      {/* Tab select header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-4 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            <h4 className="text-lg font-bold tracking-tight text-white">Interactive Optimization Sandbox</h4>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Optimize your bundles for extreme speed, utilizing dead-code elimination (Tree Shaking) and chunk partitioning (Split Chunks).
          </p>
        </div>

        <div className="flex bg-slate-950/40 p-1.5 rounded-xl border border-white/10 gap-1">
          <button
            onClick={() => setActiveTab("tree")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              activeTab === "tree"
                ? "bg-cyan-500 text-white shadow-md"
                : "text-slate-450 hover:text-slate-200"
            }`}
          >
            Tree Shaking Sandbox
          </button>
          <button
            onClick={() => setActiveTab("split")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              activeTab === "split"
                ? "bg-cyan-500 text-white shadow-md"
                : "text-slate-450 hover:text-slate-200"
            }`}
          >
            SplitChunks & Caching
          </button>
        </div>
      </div>

      {/* Tab 1: Tree Shaking */}
      {activeTab === "tree" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* File source code math.ts */}
          <div className="lg:col-span-5 bg-slate-950/40 p-4 rounded-xl border border-white/10 flex flex-col justify-between h-[340px]">
            <div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-3">
                <span className="text-xs font-mono font-semibold text-white">File: utils/math.ts</span>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30 font-mono">ES Modules</span>
              </div>
              <p className="text-[10px] text-slate-400 mb-3 leading-relaxed">
                Contains exports of diverse math procedures. Our application code ONLY imports <span className="font-mono text-white">add</span> and <span className="font-mono text-white">square</span>.
              </p>
            </div>

            <div className="flex-1 font-mono text-[11px] leading-relaxed text-slate-355 space-y-2.5 overflow-y-auto pr-2 text-left">
              <div className="p-1.5 rounded border border-white/5 bg-white/5">
                <span className="text-emerald-400">export</span> const <span className="text-cyan-300">add</span> = (a, b) =&gt; a + b;
                <div className="text-[9px] text-emerald-400 font-sans mt-0.5 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Imported in index.ts
                </div>
              </div>

              <div className={`p-1.5 rounded border transition-all duration-500 ${isTreeShakingEnabled ? "border-rose-950/40 bg-rose-950/5 opacity-30 strike-through line-through" : "border-white/5 bg-white/5"}`}>
                <span className="text-slate-500">export</span> const <span className="text-slate-400">subtract</span> = (a, b) =&gt; a - b;
                {!isTreeShakingEnabled && <div className="text-[9px] text-cyan-400 font-sans mt-0.5 font-semibold">⚠ Unused Export (Dead Code)</div>}
              </div>

              <div className={`p-1.5 rounded border transition-all duration-500 ${isTreeShakingEnabled ? "border-rose-950/40 bg-rose-950/5 opacity-30 strike-through line-through" : "border-white/5 bg-white/5"}`}>
                <span className="text-slate-500">export</span> const <span className="text-slate-400">multiply</span> = (a, b) =&gt; a * b;
                {!isTreeShakingEnabled && <div className="text-[9px] text-cyan-400 font-sans mt-0.5 font-semibold">⚠ Unused Export (Dead Code)</div>}
              </div>

              <div className="p-1.5 rounded border border-white/5 bg-white/5">
                <span className="text-emerald-400">export</span> const <span className="text-cyan-300">square</span> = x =&gt; x * x;
                <div className="text-[9px] text-emerald-400 font-sans mt-0.5 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Imported in index.ts
                </div>
              </div>
            </div>
          </div>

          {/* Graphical bundle outcome */}
          <div className="lg:col-span-7 bg-slate-950/40 p-4 rounded-xl border border-white/10 flex flex-col justify-between h-[340px] relative">
            <div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-3">
                <span className="text-xs font-mono font-semibold text-white">Compilation Bundle Output</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400">Dead Code Stripper</span>
                  <button
                    id="toggle-tree-shaking-btn"
                    onClick={handleTriggerShake}
                    disabled={isShaking}
                    className={`px-3 py-1 rounded text-xs font-bold transition flex items-center gap-1.5 ${
                      isTreeShakingEnabled
                        ? "bg-rose-500 hover:bg-rose-600 text-white"
                        : "bg-cyan-500 hover:bg-cyan-400 text-white"
                    }`}
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isShaking ? "animate-spin" : ""}`} />
                    {isTreeShakingEnabled ? "Disable Optimization" : "Shake Dead Code"}
                  </button>
                </div>
              </div>

              {/* Graphical demonstration tree */}
              <div className="flex flex-col items-center justify-center py-6 relative">
                <div className="flex items-center gap-6">
                  {/* Minified bundle mock block */}
                  <div className="border border-white/10 p-4 rounded-xl bg-white/5 text-center relative z-10 w-44">
                    <HardDrive className="w-8 h-8 mx-auto text-cyan-400 mb-2" />
                    <div className="text-xs font-bold text-white">dist/main.bundle.js</div>
                    <div className="text-lg font-extrabold text-white mt-1.5 font-mono">
                      {isTreeShakingEnabled ? "1.8 KB" : "4.2 KB"}
                    </div>
                    <div className="text-[9px] text-cyan-300 font-mono mt-0.5">Physical File Size</div>
                  </div>

                  <ArrowRight className="w-5 h-5 text-slate-500" />

                  {/* Diagnostic stats */}
                  <div className="space-y-2 text-left">
                    <div className="text-xs font-semibold text-slate-400">Compiler Diagnoses:</div>
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      <span>Webpack Minifier: <span className="text-white font-bold">TerserPlugin</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className={`w-2.5 h-2.5 rounded-full ${isTreeShakingEnabled ? "bg-emerald-500" : "bg-slate-600"}`}></span>
                      <span>Dead Exports Pruned: <span className="text-white font-bold">{isTreeShakingEnabled ? "2 / 4" : "0 / 4"}</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
                      <span>Module Syntax: <span className="text-cyan-300 font-bold">ES6 (Static)</span></span>
                    </div>
                  </div>
                </div>

                {/* Shaking visual leaf container */}
                {isShaking && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: [1, 1.1, 1], opacity: 1 }}
                    className="absolute inset-0 bg-cyan-950/20 border border-cyan-500/30 rounded-lg flex items-center justify-center backdrop-blur-xs text-xs font-bold text-cyan-300"
                  >
                    ⚡ Webpack analyzing module static graph & pruning exports...
                  </motion.div>
                )}
              </div>
            </div>

            {/* Informative footer */}
            <div className="bg-white/5 border border-white/5 p-3 rounded-lg text-[10px] text-slate-400 leading-relaxed text-left">
              💡 **Tree Shaking Prerequisites**: Webpack requires **static ES6 Module syntax** (`import` & `export`) to crawl references before runtime execution. Standard CommonJS dynamic queries (`require()`) *cannot* be shaken. You must also declare `"sideEffects": false` in your `package.json`.
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: SplitChunks & Long-term Caching */}
      {activeTab === "split" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Configuration and switches */}
          <div className="lg:col-span-5 bg-slate-950/40 p-4 rounded-xl border border-white/10 flex flex-col justify-between h-[340px]">
            <div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-3">
                <span className="text-xs font-mono font-semibold text-white">SplitChunks Configuration</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 font-mono">Caching Engine</span>
              </div>
              <p className="text-[10px] text-slate-400 mb-4 leading-relaxed text-left">
                Splits heavy third-party vendor modules from frequently changing app logic, enabling permanent browser client caching.
              </p>

              <div className="space-y-3">
                {/* Switch toggler */}
                <div className="flex items-center justify-between bg-white/5 p-2.5 border border-white/10 rounded-lg">
                  <div className="text-left">
                    <span className="text-xs font-bold text-white">optimization.splitChunks</span>
                    <p className="text-[9px] text-slate-400 mt-0.5">Partition libraries to separate files</p>
                  </div>
                  <button
                    id="toggle-split-chunks-btn"
                    onClick={() => {
                      setIsSplitChunksEnabled(prev => !prev);
                      setChunkLogs([]);
                    }}
                    className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase transition ${
                      isSplitChunksEnabled
                        ? "bg-emerald-500 text-white"
                        : "bg-white/5 text-slate-400 border border-white/10 hover:text-white"
                    }`}
                  >
                    {isSplitChunksEnabled ? "ON (Split)" : "OFF (Monolith)"}
                  </button>
                </div>

                {/* Edit simulator trigger */}
                <button
                  id="simulate-code-edit-btn"
                  onClick={runCodeEditSimulation}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white rounded-lg text-xs font-semibold border border-white/10 transition"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
                  Edit App Code (Trigger Rebuild)
                </button>
              </div>
            </div>

            {/* Simulated browser logs output */}
            <div className="bg-slate-950/50 p-3 rounded-lg border border-white/5 h-[105px] overflow-y-auto text-left">
              <div className="text-[9px] font-mono font-bold text-slate-500 border-b border-white/5 pb-1 mb-1.5 uppercase">Compiler Output & Hash Check</div>
              <div className="font-mono text-[9.5px] space-y-1 text-slate-400">
                {chunkLogs.length === 0 ? (
                  <div className="text-slate-550 italic text-center py-2">Click "Edit App Code" to simulate cache behavior.</div>
                ) : (
                  chunkLogs.map((log, i) => (
                    <div key={i} className={log.includes("Skip:") || log.includes("cache!") ? "text-emerald-400 font-medium" : "text-slate-300"}>
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Bundle representation cards */}
          <div className="lg:col-span-7 bg-slate-950/40 p-4 rounded-xl border border-white/10 flex flex-col justify-between h-[340px]">
            <div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-3">
                <span className="text-xs font-mono font-semibold text-white">Browser Network Downloads</span>
                <span className="text-[10px] text-slate-400 font-mono">Build #{simulateEditCount}</span>
              </div>
              <p className="text-[10px] text-slate-400 mb-4 leading-relaxed text-left">
                This is what the client browser has to fetch over the network on page load:
              </p>
            </div>

            {/* Split Chunks physical visual representation */}
            <div className="flex-1 flex flex-col justify-center space-y-3">
              {!isSplitChunksEnabled ? (
                /* MONOLITHIC CHUNKS */
                <div className="space-y-2">
                  <div className="border border-white/5 bg-white/5 p-3 rounded-lg flex justify-between items-center hover:bg-white/10 transition">
                    <div className="flex items-center gap-2 text-left">
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-500"></div>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-bold text-white">
                          dist/bundle.{simulateEditCount > 0 ? "99cf2a" : "a28d11"}.js
                        </span>
                        <span className="text-[9px] text-slate-450 font-semibold uppercase tracking-wider">Monolithic bundle (All React + lodash + app code)</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-white bg-slate-950 px-2 py-0.5 rounded border border-white/5">1.95 MB</span>
                  </div>
                  <div className="text-[10px] text-rose-400 italic text-center">
                    ⚠ Warning: High initial download payload. Any code modification invalidates the entire 1.95MB file cache!
                  </div>
                </div>
              ) : (
                /* SPLIT CHUNKS */
                <div className="space-y-2">
                  {/* App script chunk */}
                  <div className="border border-cyan-500/20 bg-cyan-500/10 p-2.5 rounded-lg flex justify-between items-center hover:bg-cyan-500/15 transition">
                    <div className="flex items-center gap-2 text-left">
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></div>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-bold text-cyan-200">
                          dist/main.{simulateEditCount > 0 ? "4a8b9c" : "7c83b2"}.js
                        </span>
                        <span className="text-[9px] text-slate-450 font-semibold uppercase tracking-wider">Application logic code</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-cyan-300 bg-slate-950 px-2 py-0.5 rounded border border-white/5">120 KB</span>
                  </div>

                  {/* Vendor chunk */}
                  <div className="border border-emerald-500/20 bg-emerald-500/10 p-2.5 rounded-lg flex justify-between items-center hover:bg-emerald-500/15 transition">
                    <div className="flex items-center gap-2 text-left">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-bold text-emerald-200">
                          dist/vendor.33bf8e.js
                        </span>
                        <span className="text-[9px] text-slate-450 font-semibold uppercase tracking-wider">Libraries (React, ReactRouter, Lodash)</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-emerald-300 bg-slate-950 px-2 py-0.5 rounded border border-white/5">1.8 MB</span>
                  </div>

                  {simulateEditCount > 0 && (
                    <div className="text-[10px] text-emerald-400 font-semibold text-center flex items-center justify-center gap-1 mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Optimal Load Speed: Only 120 KB downloaded; 1.8 MB loaded from browser cache instantly!
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Informational footer */}
            <div className="bg-white/5 border border-white/5 p-2.5 rounded-lg text-[10px] text-slate-400 leading-relaxed mt-2 text-left">
              💡 **optimization.splitChunks** isolates modules from `node_modules` into a shared `vendor` bundle. It creates separate contenthashes so code refactoring only updates the active application chunks.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
