/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Hammer, Cpu, Terminal, Sparkles, Code2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LifecyclePhase {
  id: string;
  name: string;
  description: string;
  plugins: string[];
}

const LIFECYCLE_PHASES: LifecyclePhase[] = [
  { id: "env", name: "environment", description: "The compiler is initializing and setting up the environment configuration.", plugins: ["CleanWebpackPlugin"] },
  { id: "entry", name: "entryOption", description: "Webpack processes configuration entry points and configures the input options.", plugins: [] },
  { id: "compile", name: "compile", description: "Compiler is starting. Prepares parameters for compiling modules.", plugins: [] },
  { id: "compilation", name: "compilation", description: "A new Compilation object is created. Webpack crawls, parses, and resolves modules.", plugins: ["DefinePlugin", "MiniCssExtractPlugin"] },
  { id: "emit", name: "emit", description: "Writers are about to emit output assets. Last chance to modify outputs.", plugins: ["HtmlWebpackPlugin"] },
  { id: "done", name: "done", description: "Compilation has successfully finished. Yields detailed build statistics and asset manifests.", plugins: ["BundleAnalyzerPlugin"] }
];

export function PluginLifecycle() {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(-1); // -1: idle
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activePlugin, setActivePlugin] = useState<string | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  const runBuild = () => {
    setIsPlaying(true);
    setCurrentPhaseIndex(0);
    setTerminalLogs([]);
    setActivePlugin(null);

    const stepIntervals = [1200, 2400, 3600, 5200, 6800, 8000];

    const logs = [
      { t: 100, msg: "Initializing Compiler instance..." },
      { t: 300, msg: "Hook [environment] fired." },
      { t: 600, msg: "⚡ Plugin CleanWebpackPlugin triggered: Wiping physical './dist' directory cleanly..." },
      
      { t: 1300, msg: "Hook [entryOption] fired. Processing primary entry point './src/index.ts'" },
      
      { t: 2500, msg: "Hook [compile] fired. Starting compiling routines..." },
      
      { t: 3700, msg: "Hook [compilation] fired. Creating core Compilation entity." },
      { t: 4000, msg: "⚡ Plugin DefinePlugin triggered: Performing find-and-replace text substitution on process.env.NODE_ENV with 'production'." },
      { t: 4500, msg: "⚡ Plugin MiniCssExtractPlugin triggered: Aggregating processed stylesheets and organizing separate css chunk 'styles.css'..." },
      
      { t: 5400, msg: "Hook [emit] fired. Webpack Preparing to write assets to './dist' output directory." },
      { t: 5800, msg: "⚡ Plugin HtmlWebpackPlugin triggered: Creating 'index.html', parsing script references, injecting '<script src=\"main.a38cd.js\"></script>' inside body." },
      
      { t: 6900, msg: "Hook [done] fired. Asset packaging finished." },
      { t: 7200, msg: "⚡ Plugin BundleAnalyzerPlugin triggered: Visualizing physical chunks treemap output on port 8888..." },
      { t: 7800, msg: "Build completed in 143ms. Output files generated." }
    ];

    // Log printer
    logs.forEach(log => {
      setTimeout(() => {
        setTerminalLogs(prev => [...prev, `[compiler] ${log.msg}`]);
        if (log.msg.includes("⚡ Plugin")) {
          // extract plugin name
          const match = log.msg.match(/Plugin (\w+)/);
          if (match) setActivePlugin(match[1]);
        } else if (log.msg.includes("Hook [")) {
          setActivePlugin(null);
        }
      }, log.t);
    });

    // Phase transition controller
    LIFECYCLE_PHASES.forEach((phase, index) => {
      setTimeout(() => {
        setCurrentPhaseIndex(index);
      }, index * 1350);
    });

    setTimeout(() => {
      setIsPlaying(false);
      setCurrentPhaseIndex(-1);
      setActivePlugin(null);
    }, 8500);
  };

  return (
    <div id="plugin-lifecycle" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-slate-100 font-sans shadow-2xl overflow-hidden">
      {/* Description Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-4 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Hammer className="w-5 h-5 text-cyan-400" />
            <h4 className="text-lg font-bold tracking-tight text-white">Interactive Plugin Compiler Lifecycle & Hooks</h4>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Plugins hook into Webpack's core compilation events. Unlike loaders (file preprocessors), plugins operate globally on assets and build steps.
          </p>
        </div>
        <button
          id="run-build-lifecycle-btn"
          disabled={isPlaying}
          onClick={runBuild}
          className={`flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-lg shadow-lg transition duration-250 ${
            isPlaying
              ? "bg-cyan-650 text-cyan-200 cursor-not-allowed"
              : "bg-cyan-500 hover:bg-cyan-400 text-white hover:scale-102"
          }`}
        >
          <Sparkles className={`w-3.5 h-3.5 ${isPlaying ? "animate-pulse" : ""}`} />
          {isPlaying ? "Running Lifecycle..." : "Run Build Lifecycle"}
        </button>
      </div>

      {/* Compiler pipeline steps visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Step Flow Column */}
        <div className="lg:col-span-7 space-y-3">
          <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono text-left">Compiler Phase Tracker</h5>
          <div className="grid grid-cols-1 gap-2.5">
            {LIFECYCLE_PHASES.map((phase, index) => {
              const isCurrent = currentPhaseIndex === index;
              const isPassed = currentPhaseIndex > index || currentPhaseIndex === -1 && isPlaying;
              
              let cardStyle = "border-white/5 bg-slate-950/20 opacity-50";
              if (isCurrent) {
                cardStyle = "border-cyan-500 bg-cyan-950/40 ring-2 ring-cyan-500/20 scale-101 opacity-100";
              } else if (isPassed) {
                cardStyle = "border-emerald-500/50 bg-emerald-950/20 opacity-80";
              } else if (currentPhaseIndex === -1) {
                cardStyle = "border-white/10 bg-white/5 opacity-100";
              }

              return (
                <div
                  key={phase.id}
                  className={`border rounded-xl p-3 flex justify-between items-center transition-all duration-350 ${cardStyle}`}
                >
                  <div className="text-left max-w-[75%]">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono font-bold text-slate-450 px-1.5 py-0.5 rounded bg-white/5 border border-white/5">
                        PHASE 0{index + 1}
                      </span>
                      <span className="text-xs font-mono font-bold text-white">{phase.name}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{phase.description}</p>
                  </div>
                  
                  {/* Hooked plugins indicators */}
                  <div className="flex flex-col gap-1 items-end">
                    {phase.plugins.length > 0 ? (
                      phase.plugins.map(p => {
                        const isPluginActive = activePlugin === p;
                        return (
                          <span
                            key={p}
                            className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border transition-all duration-300 ${
                              isPluginActive
                                ? "bg-cyan-500/25 text-cyan-300 border-cyan-400/80 animate-pulse scale-105"
                                : "bg-zinc-800/80 text-zinc-400 border-zinc-700/60"
                            }`}
                          >
                            🔌 {p}
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-[9px] font-mono text-zinc-600">No Hooks</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Real-time details and Console terminal */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Plugin anatomy info */}
          <div className="bg-slate-950/40 rounded-xl border border-white/10 p-4 text-left">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" /> Plugin Structure (Anatomy)
            </h5>
            <div className="text-[11px] text-slate-300 leading-relaxed mb-3">
              A Webpack plugin is an object with an <span className="font-mono text-cyan-300">apply</span> method. This allows it to hook directly into compile stages:
            </div>
            <pre className="text-[10px] font-mono text-emerald-400 bg-white/5 p-3 rounded-lg overflow-x-auto leading-relaxed border border-white/5">
              {`class MyCleanPlugin {
  apply(compiler) {
    // Hooks into 'emit' lifecycle event
    compiler.hooks.emit.tapAsync(
      'MyCleanPlugin', 
      (compilation, callback) => {
        console.log('Writing files...');
        callback();
      }
    );
  }
}`}
            </pre>
          </div>

          {/* Terminal Console Logs */}
          <div className="bg-slate-950/40 rounded-xl border border-white/10 p-4 flex-1 flex flex-col min-h-[220px] justify-between">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
              <span className="text-[10px] font-mono text-slate-450 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-slate-500" /> Compilation stdout console
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>

            <div className="flex-1 font-mono text-[10px] overflow-y-auto space-y-1 text-zinc-400 max-h-[160px] scrollbar-thin scrollbar-thumb-zinc-900">
              {terminalLogs.length === 0 && (
                <div className="text-zinc-600 italic text-center py-10">Press "Run Build Lifecycle" to view plugin triggers.</div>
              )}
              {terminalLogs.map((log, idx) => {
                const isPlugin = log.includes("⚡ Plugin");
                return (
                  <div
                    key={idx}
                    className={`leading-relaxed ${
                      isPlugin
                        ? "text-cyan-300 font-semibold bg-cyan-500/5 px-1 rounded border border-cyan-500/10"
                        : log.includes("SUCCEEDED") || log.includes("completed")
                        ? "text-emerald-400"
                        : "text-zinc-400"
                    }`}
                  >
                    {log}
                  </div>
                );
              })}
            </div>

            <div className="mt-3 pt-2 border-t border-zinc-900 text-[9px] text-zinc-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-zinc-400" />
              Plugins execute globally across compilation cycles.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
