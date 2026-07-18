/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Play, Terminal, HelpCircle, ShieldAlert, MonitorPlay, Zap, ArrowRight, ArrowLeft, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function DevServerConsole() {
  const [activeMode, setActiveMode] = useState<"hmr" | "proxy">("hmr");

  // HMR demo states
  const [counterState, setCounterState] = useState<number>(12);
  const [buttonColor, setButtonColor] = useState<"blue" | "red" | "emerald" | "amber">("blue");
  const [hmrHistory, setHmrHistory] = useState<string[]>(["[hmr] DevServer loaded.", "[hmr] Waiting for source code alterations..."]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Proxy demo states
  const [proxyStep, setProxyStep] = useState<number>(-1); // -1: idle, 0: fetch, 1: proxy, 2: response
  const [proxyLogs, setProxyLogs] = useState<string[]>([]);

  const handleApplyHmr = (color: typeof buttonColor) => {
    setHmrHistory(prev => [...prev, `[hmr] Detected update in Button.tsx (CSS color change to ${color})`]);
    setHmrHistory(prev => [...prev, `[hmr] HOT MODULE REPLACEMENT: Patching modified files...`]);
    
    // Simulate short compilation flash
    setIsRefreshing(true);
    setTimeout(() => {
      setButtonColor(color);
      setIsRefreshing(false);
      setHmrHistory(prev => [...prev, "✓ [hmr] Button styling hot patched successfully. React State preserved!"]);
    }, 600);
  };

  const handleApplyFullReload = (color: typeof buttonColor) => {
    setHmrHistory(prev => [...prev, `[compiler] Detected modification in Button.tsx (Full Page Reload required)`]);
    
    setIsRefreshing(true);
    setTimeout(() => {
      setButtonColor(color);
      setCounterState(0); // Reset state!
      setIsRefreshing(false);
      setHmrHistory(prev => [
        "[compiler] Build complete. Browser triggering FULL PAGE RELOAD...",
        "[compiler] Client state wiped. Counter reset to default (0)."
      ]);
    }, 1100);
  };

  const executeProxyFetch = () => {
    setProxyStep(0);
    setProxyLogs(["[browser] Triggering API fetch: get('/api/users')"]);
    
    // Step 1: Request goes to dev server
    setTimeout(() => {
      setProxyStep(1);
      setProxyLogs(prev => [
        ...prev,
        "[dev-server] Intercepted path matched proxy rule: '/api'",
        "[dev-server] Rewriting Host and forwarding client request to 'http://localhost:5000/api/users'"
      ]);
    }, 1200);

    // Step 2: DevServer communicates with backend server and returns response
    setTimeout(() => {
      setProxyStep(2);
      setProxyLogs(prev => [
        ...prev,
        "[backend-api] Received request, bypassing CORS check (Server-to-Server is exempt from browser CORS!)",
        "[backend-api] Returning HTTP 200 OK: [{ id: 1, name: 'John Doe' }]",
        "[dev-server] Returning payload response back to client browser"
      ]);
    }, 2400);

    // Final completed step
    setTimeout(() => {
      setProxyStep(3);
      setProxyLogs(prev => [
        ...prev,
        "✓ [browser] fetch('/api/users') succeeded with payload. User interface refreshed."
      ]);
    }, 3500);
  };

  return (
    <div id="dev-server-console" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-slate-100 font-sans shadow-2xl overflow-hidden">
      {/* Tab toggle headers */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-4 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <MonitorPlay className="w-5 h-5 text-cyan-400" />
            <h4 className="text-lg font-bold tracking-tight text-white">Interactive Local Development Server</h4>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Discover local dev ecosystems, contrasting Live Hot Module Replacement state protection against full-blown CORS proxy forwarding.
          </p>
        </div>

        <div className="flex bg-slate-950/40 p-1.5 rounded-xl border border-white/10 gap-1">
          <button
            onClick={() => {
              setActiveMode("hmr");
              setHmrHistory(["[hmr] DevServer loaded.", "[hmr] Waiting for source code alterations..."]);
            }}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              activeMode === "hmr"
                ? "bg-cyan-500 text-white shadow-md"
                : "text-slate-450 hover:text-slate-200"
            }`}
          >
            Hot Module Replacement
          </button>
          <button
            onClick={() => {
              setActiveMode("proxy");
              setProxyStep(-1);
              setProxyLogs([]);
            }}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              activeMode === "proxy"
                ? "bg-cyan-500 text-white shadow-md"
                : "text-slate-450 hover:text-slate-200"
            }`}
          >
            API DevServer Proxy
          </button>
        </div>
      </div>

      {/* Mode 1: HMR Sandbox */}
      {activeMode === "hmr" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Running counter application frame */}
          <div className="lg:col-span-5 bg-slate-950/40 p-4 rounded-xl border border-white/10 flex flex-col justify-between h-[360px] relative">
            <div className="absolute top-3 left-3 bg-white/5 border border-white/5 px-2 py-0.5 rounded text-[10px] font-mono text-cyan-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live App Frame (localhost:3000)
            </div>

            <div className="flex-1 flex flex-col justify-center items-center py-6 mt-4">
              <div className="text-center space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-550">React Demo State Counter</span>
                <div className="text-5xl font-extrabold font-mono text-white">{counterState}</div>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => setCounterState(prev => prev - 1)}
                    className="w-10 h-10 bg-white/5 hover:bg-white/10 text-slate-200 rounded-lg font-bold border border-white/5 transition"
                  >
                    -
                  </button>
                  <button
                    onClick={() => setCounterState(prev => prev + 1)}
                    className="w-10 h-10 bg-white/5 hover:bg-white/10 text-slate-200 rounded-lg font-bold border border-white/5 transition"
                  >
                    +
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    className={`px-6 py-2.5 rounded-lg text-xs font-bold text-white shadow-md transition-all duration-300 ${
                      buttonColor === "blue" ? "bg-cyan-600 hover:bg-cyan-500" :
                      buttonColor === "red" ? "bg-rose-600 hover:bg-rose-500" :
                      buttonColor === "emerald" ? "bg-emerald-600 hover:bg-emerald-500" :
                      "bg-cyan-600 hover:bg-cyan-500"
                    }`}
                  >
                    Modified Styled Button
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-2 text-[9.5px] text-slate-400 border border-white/5 rounded text-center">
              💡 Increment the counter, then change button styling below to compare reload mechanisms.
            </div>

            {/* Micro loading overlay */}
            <AnimatePresence>
              {isRefreshing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center rounded-xl"
                >
                  <div className="flex flex-col items-center gap-2">
                    <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin" />
                    <span className="text-xs font-mono text-slate-300">Compiling update module...</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* HMR Controls Panel */}
          <div className="lg:col-span-7 bg-slate-950/40 p-4 rounded-xl border border-white/10 flex flex-col justify-between h-[360px]">
            <div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-3">
                <span className="text-xs font-mono font-semibold text-white">HMR vs Reload Controller</span>
                <span className="text-[10px] text-slate-450 font-mono">Dev Sandbox</span>
              </div>

              {/* Theme choice simulator */}
              <div className="space-y-3">
                <span className="text-xs text-slate-400 font-medium block text-left">1. Simulate Code Edit (Choose a new button color):</span>
                <div className="grid grid-cols-4 gap-2">
                  {(["blue", "red", "emerald", "amber"] as const).map(color => {
                    const activeColorClass = 
                      color === "blue" ? "bg-cyan-500 border-cyan-400" :
                      color === "red" ? "bg-rose-500 border-rose-400" :
                      color === "emerald" ? "bg-emerald-500 border-emerald-400" :
                      "bg-cyan-500 border-cyan-400";

                    return (
                      <button
                        key={color}
                        onClick={() => {
                          // Preview choice directly requires executing HMR or Reload
                        }}
                        className={`py-3 px-1 rounded-lg border-2 text-[10px] font-mono font-bold uppercase transition flex items-center justify-center gap-1.5 ${activeColorClass} bg-opacity-10 text-slate-300 hover:bg-opacity-20`}
                      >
                        <span className={`w-2.5 h-2.5 rounded-full ${activeColorClass}`}></span>
                        {color}
                      </button>
                    );
                  })}
                </div>

                <span className="text-xs text-slate-400 font-medium block pt-1 text-left">2. Trigger DevServer Compile Actions:</span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleApplyHmr("red")}
                    className="flex flex-col items-center bg-cyan-950/20 border border-cyan-500 hover:bg-cyan-900/30 p-2.5 rounded-xl transition text-left"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                      <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> Apply via HMR
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 leading-normal text-center">Live patches files. Keeps Counter State intact!</span>
                  </button>

                  <button
                    onClick={() => handleApplyFullReload("emerald")}
                    className="flex flex-col items-center bg-white/5 hover:bg-white/10 border border-white/5 p-2.5 rounded-xl transition text-left"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                      <RefreshCw className="w-3.5 h-3.5 text-slate-450" /> Full Page Reload
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 leading-normal text-center font-sans">Full client restart. Erases Counter State (resets to 0).</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Terminal monitor */}
            <div className="bg-slate-950/50 p-3 rounded-lg border border-white/5 h-[105px] overflow-y-auto text-left">
              <div className="text-[9px] font-mono font-bold text-slate-500 border-b border-white/5 pb-1 mb-1.5 uppercase flex justify-between">
                <span>DevServer WebpackStdout HMR Console</span>
                <span className="text-emerald-500 font-semibold">Online</span>
              </div>
              <div className="font-mono text-[9.5px] space-y-1 text-slate-350">
                {hmrHistory.map((log, i) => (
                  <div key={i} className={log.includes("HOT") || log.includes("preserved!") ? "text-cyan-400 font-bold" : log.includes("Reset") || log.includes("Counter") ? "text-rose-400" : "text-slate-300"}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Proxy Simulator */}
      {activeMode === "proxy" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Visual flow representation */}
          <div className="lg:col-span-8 bg-slate-950/40 p-4 rounded-xl border border-white/10 flex flex-col justify-between h-[360px]">
            <div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-3">
                <span className="text-xs font-mono font-semibold text-white">API CORS Proxy Flow Map</span>
                <button
                  id="fetch-proxy-data-btn"
                  onClick={executeProxyFetch}
                  disabled={proxyStep >= 0 && proxyStep < 3}
                  className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-white rounded text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" />
                  Fetch API Data
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mb-4 leading-relaxed text-left">
                Browser security blocks client-side API requests across ports (CORS constraint). Webpack's Node server acts as a proxy intermediary to circumvent this block securely.
              </p>
            </div>

            {/* Visual Proxy Graph Nodes */}
            <div className="flex-1 flex flex-col md:flex-row justify-between items-center relative gap-4 py-4 px-2">
              {/* Node 1: Browser client */}
              <div className={`p-3 rounded-xl border w-full md:w-36 text-center transition ${proxyStep === 0 ? "border-cyan-500 bg-cyan-950/40 shadow-lg scale-102" : "border-white/5 bg-white/5"}`}>
                <div className="text-xs font-bold text-white">Client Browser</div>
                <div className="text-[9px] text-cyan-300 font-mono mt-1">localhost:3000</div>
                {proxyStep === 0 && <span className="text-[8px] px-1 bg-cyan-500/20 text-cyan-400 rounded mt-1.5 inline-block animate-pulse">Sending fetch()</span>}
              </div>

              {/* Flow Arrow 1 */}
              <div className="flex flex-col items-center">
                <ArrowRight className={`w-5 h-5 text-slate-500 hidden md:block ${proxyStep === 0 ? "text-cyan-400 animate-[bounce_1s_infinite]" : ""}`} />
                <span className="text-[8px] font-mono text-slate-450 hidden md:block">/api/users</span>
              </div>

              {/* Node 2: Webpack Dev Server */}
              <div className={`p-3 rounded-xl border w-full md:w-36 text-center transition ${proxyStep === 1 ? "border-cyan-500 bg-cyan-950/40 shadow-lg scale-102" : "border-white/5 bg-white/5"}`}>
                <div className="text-xs font-bold text-white">Webpack Server</div>
                <div className="text-[9px] text-cyan-300 font-mono mt-1">localhost:3000</div>
                {proxyStep === 1 && <span className="text-[8px] px-1 bg-cyan-500/20 text-cyan-400 rounded mt-1.5 inline-block">Proxy Forwarding</span>}
              </div>

              {/* Flow Arrow 2 */}
              <div className="flex flex-col items-center">
                <ArrowRight className={`w-5 h-5 text-slate-500 hidden md:block ${proxyStep === 1 ? "text-cyan-400 animate-[bounce_1s_infinite]" : ""}`} />
                <span className="text-[8px] font-mono text-slate-450 hidden md:block">/users</span>
              </div>

              {/* Node 3: Backend API Server */}
              <div className={`p-3 rounded-xl border w-full md:w-36 text-center transition ${proxyStep === 2 ? "border-emerald-500 bg-emerald-950/40 shadow-lg scale-102" : "border-white/5 bg-white/5"}`}>
                <div className="text-xs font-bold text-white">Backend Server</div>
                <div className="text-[9px] text-emerald-400 font-mono mt-1">localhost:5000</div>
                {proxyStep === 2 && <span className="text-[8px] px-1 bg-emerald-500/20 text-emerald-400 rounded mt-1.5 inline-block">JSON Response</span>}
              </div>
            </div>

            <div className="bg-white/5 border border-white/5 p-2 text-[9.5px] text-slate-400 rounded text-left">
              ✔ Server-to-server HTTP communication is exempt from CORS constraints. By requesting paths matching `/api` locally, DevServer forwards requests to backend engines without triggering browser errors.
            </div>
          </div>

          {/* Proxy Info Log terminal */}
          <div className="lg:col-span-4 bg-slate-950/40 p-4 rounded-xl border border-white/10 flex flex-col justify-between h-[360px]">
            <div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-3">
                <span className="text-xs font-mono font-semibold text-white">Proxy Log terminal</span>
              </div>

              <div className="font-mono text-[9.5px] space-y-2 text-slate-350 min-h-[200px] max-h-[220px] overflow-y-auto pr-1 text-left">
                {proxyLogs.length === 0 ? (
                  <div className="text-slate-550 italic py-12 text-center">Click "Fetch API Data" to watch CORS bypass animation logs.</div>
                ) : (
                  proxyLogs.map((log, i) => {
                    const isSuccess = log.includes("✓") || log.includes("exempt");
                    return (
                      <div key={i} className={isSuccess ? "text-emerald-400 leading-normal" : "text-slate-300 leading-normal"}>
                        {log}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5 p-2 bg-white/5 border border-white/5 text-[9px] text-slate-400 rounded text-left">
              <ShieldAlert className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span>CORS blocks client-side requests but not Node servers!</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
