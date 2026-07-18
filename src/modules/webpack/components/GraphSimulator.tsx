/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Play, RotateCcw, Plus, Trash, FileCode, CheckCircle, Info, FileJson, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GraphNode } from "../types";

export function GraphSimulator() {
  const [nodes, setNodes] = useState<GraphNode[]>([
    { id: "1", name: "index.ts", type: "ts", role: "entry", imports: ["2", "3", "4"], sizeKb: 2.1, content: "import { render } from './App';\nimport { log } from './utils';\nimport './theme.css';\n\nrender(document.getElementById('root'));\nlog('App initialized');" },
    { id: "2", name: "App.tsx", type: "ts", role: "helper", imports: ["5"], sizeKb: 4.5, content: "import { Button } from './components/Button';\n\nexport function App() {\n  return <Button>Click Me</Button>;\n}" },
    { id: "3", name: "utils.ts", type: "ts", role: "helper", imports: [], sizeKb: 1.8, content: "export function log(msg: string) {\n  console.log('[App]', msg);\n}\nexport function calc(x: number) {\n  return x * 10;\n}" },
    { id: "4", name: "theme.css", type: "css", role: "style", imports: [], sizeKb: 3.2, content: "body {\n  margin: 0;\n  font-family: sans-serif;\n  background: #f4f4f5;\n}" },
    { id: "5", name: "Button.tsx", type: "ts", role: "helper", imports: ["6"], sizeKb: 1.2, content: "import logo from '../assets/logo.png';\n\nexport function Button({ children }) {\n  return <button><img src={logo} />{children}</button>;\n}" },
    { id: "6", name: "logo.png", type: "png", role: "asset", imports: [], sizeKb: 42.0, content: "BINARY_IMAGE_DATA_BASE64_PNGRAS" },
  ]);

  const [activeNodeId, setActiveNodeId] = useState<string>("1");
  const [isBundling, setIsBundling] = useState(false);
  const [bundleStep, setBundleStep] = useState<number>(-1); // -1: idle, 0: parsing, 1: resolving, 2: packaging, 3: completed
  const [bundleLogs, setBundleLogs] = useState<string[]>([]);
  const [bundledOutputs, setBundledOutputs] = useState<{ name: string; size: string; content: string }[]>([]);

  const handleToggleImport = (sourceId: string, targetId: string) => {
    setNodes(prev =>
      prev.map(n => {
        if (n.id === sourceId) {
          const hasImport = n.imports.includes(targetId);
          const newImports = hasImport
            ? n.imports.filter(id => id !== targetId)
            : [...n.imports, targetId];
          
          // Generate new mock content
          const targetNode = nodes.find(t => t.id === targetId);
          const importStatement = `import './${targetNode?.name}';\n`;
          const newContent = hasImport
            ? n.content.replace(importStatement, "")
            : importStatement + n.content;

          return { ...n, imports: newImports, content: newContent };
        }
        return n;
      })
    );
  };

  const runBundler = () => {
    setIsBundling(true);
    setBundleStep(0);
    setBundleLogs([]);
    setBundledOutputs([]);

    const addLog = (msg: string, delay: number) => {
      setTimeout(() => {
        setBundleLogs(prev => [...prev, `[webpack] ${msg}`]);
      }, delay);
    };

    addLog("Compiler starting on entry point './src/index.ts'...", 100);
    addLog("Reading entry file: index.ts (2.1 KB)", 500);
    
    setTimeout(() => {
      setBundleStep(1);
    }, 1000);

    addLog("Parsing AST (Abstract Syntax Tree)... found imports: " + nodes[0].imports.map(id => nodes.find(n => n.id === id)?.name).join(", "), 1200);
    addLog("Resolving dependency tree modules recursively...", 1800);

    setTimeout(() => {
      setBundleStep(2);
    }, 2400);

    addLog("Loading module transformers...", 2600);
    addLog("Compiling index.ts, App.tsx, Button.tsx, utils.ts via ts-loader", 3000);
    addLog("Extracting stylesheets...", 3400);

    setTimeout(() => {
      setBundleStep(3);
      setIsBundling(false);

      // Compute sizes
      const jsSize = nodes
        .filter(n => n.type === "ts" || n.type === "js")
        .reduce((acc, curr) => acc + curr.sizeKb, 0) * 0.85; // simulate compression
      const cssSize = nodes
        .filter(n => n.type === "css")
        .reduce((acc, curr) => acc + curr.sizeKb, 0);
      const pngSize = nodes
        .filter(n => n.type === "png")
        .reduce((acc, curr) => acc + curr.sizeKb, 0);

      setBundledOutputs([
        {
          name: "dist/main.bundle.js",
          size: `${jsSize.toFixed(1)} KB`,
          content: `/* Webpack 5 Bundled Output */\n(() => {\n  "use strict";\n  const modules = {\n    ${nodes.filter(n => n.type === "ts").map(n => `"${n.name}": () => {\n      // ${n.name}\n      ${n.content.split("\n").join("\n      ")}\n    }`).join(",\n    ")}\n  };\n  // Webpack bootstrap runtime...\n  console.log("App running smoothly!");\n})();`
        },
        {
          name: "dist/styles.css",
          size: `${cssSize.toFixed(1)} KB`,
          content: `/* Extracted by MiniCssExtractPlugin */\n${nodes.filter(n => n.type === "css").map(n => `/* ${n.name} */\n${n.content}`).join("\n")}`
        },
        {
          name: `dist/${nodes.find(n => n.type === "png")?.name || "logo.png"}`,
          size: `${pngSize.toFixed(1)} KB`,
          content: "[Physical image file copied to output directory]"
        }
      ]);
    }, 4200);

    addLog("Emitting physical assets to dist/ directory...", 3800);
    addLog("Asset optimization complete. Build SUCCEEDED.", 4100);
  };

  const activeNode = nodes.find(n => n.id === activeNodeId) || nodes[0];

  return (
    <div id="graph-simulator" className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-slate-100 font-sans shadow-2xl overflow-hidden">
      {/* Title Panel */}
      <div className="lg:col-span-12 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-4 mb-2 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h4 className="text-lg font-bold tracking-tight text-white">Interactive Dependency Graph & Bundler</h4>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Webpack resolves recursive file imports starting from the <span className="text-cyan-400 font-semibold">Entry Point</span>, compiling and compressing them into physical output assets.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            id="reset-graph-btn"
            onClick={() => {
              setBundleStep(-1);
              setBundleLogs([]);
              setBundledOutputs([]);
              setIsBundling(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Build
          </button>
          <button
            id="run-bundler-btn"
            disabled={isBundling}
            onClick={runBundler}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg shadow-lg transition duration-250 ${
              isBundling
                ? "bg-cyan-650 text-cyan-200 cursor-not-allowed"
                : "bg-cyan-500 hover:bg-cyan-400 text-white hover:scale-102"
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${isBundling ? "animate-spin" : ""}`} />
            {isBundling ? "Bundling..." : "Build Dependency Graph"}
          </button>
        </div>
      </div>

      {/* Graph Visual Panel */}
      <div className="lg:col-span-7 bg-slate-950/40 backdrop-blur-md rounded-xl border border-white/10 p-4 flex flex-col min-h-[350px] relative justify-between overflow-hidden">
        <div className="absolute top-3 left-3 bg-white/5 border border-white/10 px-2 py-1 rounded text-[10px] text-slate-300 font-mono flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Interactive Graph View
        </div>

        {/* The Node Connections Map */}
        <div className="flex-1 flex items-center justify-center relative py-8 px-4">
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="18" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
              </marker>
              <marker id="arrow-disabled" viewBox="0 0 10 10" refX="18" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#3f3f46" />
              </marker>
            </defs>
            {/* Draw connectors */}
            {nodes.map(source => {
              const sEl = document.getElementById(`node-element-${source.id}`);
              if (!sEl) return null;
              const parentRect = sEl.parentElement?.getBoundingClientRect();
              if (!parentRect) return null;
              
              const sRect = sEl.getBoundingClientRect();
              const sx = sRect.left + sRect.width / 2 - parentRect.left;
              const sy = sRect.top + sRect.height / 2 - parentRect.top;

              return source.imports.map(targetId => {
                const tEl = document.getElementById(`node-element-${targetId}`);
                if (!tEl) return null;
                const tRect = tEl.getBoundingClientRect();
                const tx = tRect.left + tRect.width / 2 - parentRect.left;
                const ty = tRect.top + tRect.height / 2 - parentRect.top;

                const isTraceActive = isBundling && (
                  (bundleStep === 0 && source.id === "1") ||
                  (bundleStep === 1 && (source.id === "1" || source.id === "2" || source.id === "5")) ||
                  bundleStep >= 2
                );

                return (
                  <g key={`${source.id}-${targetId}`}>
                    <path
                      d={`M ${sx} ${sy} Q ${(sx + tx) / 2} ${(sy + ty) / 2 - 20}, ${tx} ${ty}`}
                      fill="none"
                      stroke={isTraceActive ? "#818cf8" : "#27272a"}
                      strokeWidth={isTraceActive ? 2 : 1.5}
                      strokeDasharray={isTraceActive ? "5 3" : undefined}
                      className={isTraceActive ? "animate-[dash_10s_linear_infinite]" : ""}
                      markerEnd={`url(#${isTraceActive ? "arrow" : "arrow-disabled"})`}
                    />
                  </g>
                );
              });
            })}
          </svg>

          {/* Node Cards */}
          <div className="grid grid-cols-3 gap-x-12 gap-y-16 relative z-10 w-full max-w-lg">
            {nodes.map(node => {
              const isSelected = activeNodeId === node.id;
              const isEntry = node.role === "entry";
              
              // Determine active trace styles during compilation
              let traceClass = "border-white/10 bg-white/5";
              if (isBundling) {
                if (bundleStep === 0 && node.id === "1") {
                  traceClass = "border-cyan-500 ring-2 ring-cyan-500/30 bg-cyan-950/40";
                } else if (bundleStep === 1 && (node.id === "1" || node.id === "2" || node.id === "3" || node.id === "4")) {
                  traceClass = "border-cyan-500 ring-2 ring-cyan-500/30 bg-cyan-950/40";
                } else if (bundleStep >= 2) {
                  traceClass = "border-emerald-500 bg-white/10";
                }
              } else if (isSelected) {
                traceClass = "border-cyan-500 ring-2 ring-cyan-500/25 bg-white/15";
              }

              return (
                <div
                  key={node.id}
                  id={`node-element-${node.id}`}
                  onClick={() => setActiveNodeId(node.id)}
                  className={`cursor-pointer rounded-xl border p-2.5 transition text-center select-none ${traceClass}`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className={`text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded ${
                      isEntry ? "bg-cyan-500/20 text-cyan-400" :
                      node.type === "css" ? "bg-cyan-500/20 text-cyan-400" :
                      node.type === "png" ? "bg-cyan-500/20 text-cyan-400" : "bg-zinc-800 text-zinc-300"
                    }`}>
                      {node.type}
                    </span>
                    <span className="text-xs font-semibold truncate max-w-full font-mono mt-1 text-zinc-100">
                      {node.name}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      {node.sizeKb.toFixed(1)} KB
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Toggles Panel */}
        <div className="border-t border-white/10 pt-3">
          <h5 className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mb-2">Configure Imports for Selected ({activeNode.name})</h5>
          <div className="flex flex-wrap gap-2">
            {nodes.filter(n => n.id !== activeNode.id).map(n => {
              const isImported = activeNode.imports.includes(n.id);
              return (
                <button
                  key={n.id}
                  onClick={() => handleToggleImport(activeNode.id, n.id)}
                  className={`px-2.5 py-1 rounded text-[10px] font-mono transition flex items-center gap-1.5 ${
                    isImported
                      ? "bg-cyan-600/80 hover:bg-cyan-600 text-cyan-100 border border-cyan-500/50"
                      : "bg-white/5 hover:bg-white/10 text-slate-400 border border-white/5"
                  }`}
                >
                  <span>{isImported ? "✓ Imports" : "+ Import"}</span>
                  <span className="font-semibold text-zinc-200">{n.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Code Inspector & Terminal Console */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        {/* Source Inspector */}
        <div className="bg-slate-950/40 backdrop-blur-md rounded-xl border border-white/10 p-4 flex flex-col h-[200px] justify-between">
          <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-slate-400" />
              Source File: <span className="text-white font-mono text-[11px] bg-white/5 px-1.5 py-0.5 rounded border border-white/10">{activeNode.name}</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">{activeNode.sizeKb} KB</span>
          </div>
          <pre className="flex-1 text-[11px] font-mono text-zinc-300 overflow-y-auto whitespace-pre leading-relaxed scrollbar-thin scrollbar-thumb-zinc-800">
            <code>{activeNode.content}</code>
          </pre>
        </div>

        {/* Live Compilation Console Logs */}
        <div className="bg-slate-950/40 backdrop-blur-md rounded-xl border border-white/10 p-4 flex flex-col flex-1 min-h-[160px] justify-between">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
            <span className="text-[11px] text-slate-400 font-mono ml-2">Build Output Log</span>
          </div>

          <div className="flex-1 font-mono text-[11px] overflow-y-auto space-y-1 text-zinc-400 max-h-[120px] scrollbar-none">
            {bundleStep === -1 && (
              <div className="text-zinc-500 italic text-center py-4">Click "Build Dependency Graph" to start the bundle engine.</div>
            )}
            {bundleLogs.map((log, idx) => {
              const isHighlight = log.includes("SUCCEEDED") || log.includes("complete");
              return (
                <div key={idx} className={isHighlight ? "text-emerald-400 font-semibold" : log.includes("Error") ? "text-rose-400" : "text-zinc-300"}>
                  {log}
                </div>
              );
            })}
            {isBundling && (
              <div className="text-cyan-400 animate-pulse text-[10px] mt-1 font-semibold">⚡ Compiling module dependencies...</div>
            )}
          </div>

          {/* Bundled Output Assets Section */}
          <AnimatePresence>
            {bundleStep === 3 && bundledOutputs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 pt-3 border-t border-white/10 bg-slate-950/50 p-2.5 rounded-lg border border-white/5"
              >
                <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 mb-1.5 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Bundler Output Assets
                </div>
                <div className="space-y-1">
                  {bundledOutputs.map((out, i) => (
                    <div key={i} className="flex justify-between items-center text-[11px] font-mono hover:bg-white/5 p-1 rounded transition">
                      <span className="text-cyan-300 font-semibold truncate max-w-[180px]">{out.name}</span>
                      <span className="text-slate-400 font-medium text-[10px] bg-white/5 px-1 py-0.5 rounded border border-white/5">{out.size}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
