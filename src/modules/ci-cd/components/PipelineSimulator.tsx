import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, RotateCcw, AlertTriangle, CheckCircle, Terminal, Cpu, GitPullRequest, ArrowRight, Activity } from "lucide-react";

interface Step {
  id: string;
  name: string;
  desc: string;
  status: "idle" | "running" | "success" | "failed";
  log: string;
}

export default function PipelineSimulator() {
  const [trigger, setTrigger] = useState<"push" | "pr" | "cron" | "manual">("push");
  const [forceFail, setForceFail] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [logs, setLogs] = useState<string[]>([]);
  const [artifactStored, setArtifactStored] = useState<boolean>(false);

  const initialSteps: Step[] = [
    { id: "checkout", name: "Git Checkout", desc: "Cloning repo branch & checking SHA", status: "idle", log: "Cloning repository refs/heads/main...\nChecking out commit SHA f8c2e90...\nDone." },
    { id: "install", name: "Restore Cache & Install", desc: "Downloading deps via lockfile", status: "idle", log: "Found node_modules cache key: linux-node-7b98a2f...\nCache restored in 1.4s.\nRunning npm ci...\nAudited 842 packages in 0.8s.\nDone." },
    { id: "lint", name: "Lint & Format", desc: "Checking syntax and styling", status: "idle", log: "Running npx prettier --check .\nAll files match style guide.\nRunning npx eslint ...\n0 errors, 0 warnings found." },
    { id: "test", name: "Unit Tests", desc: "Executing Jest test suite", status: "idle", log: "Running npm run test:unit...\nPASS  src/utils.test.ts\nPASS  src/auth.test.ts\nPASS  src/components/Button.test.ts" },
    { id: "build", name: "Build Artifact", desc: "Bundling production app", status: "idle", log: "Running npm run build...\nvite v6.2.3 building for production...\ntree-shaking applied: 142 modules trimmed.\ndist/assets/index-b09e2f.js (142.4 kB)\ndist/index.html (0.8 kB)\nBuild completed in 1.8s." },
    { id: "security", name: "Vulnerability Scan", desc: "SAST & Container Scan", status: "idle", log: "Running npm audit --audit-level=high...\n0 vulnerabilities found.\nScanning Docker Base Image with Trivy...\n✓ 0 critical/high issues detected." },
    { id: "deploy_staging", name: "Deploy Staging", desc: "Promoting to pre-prod environment", status: "idle", log: "Pushing build bundle to staging CDN...\nConfiguring proxy route...\nRunning post-deployment smoke tests...\nStaging Live: https://staging.app.internal" },
    { id: "manual_gate", name: "Manual Approval Gate", desc: "Awaiting SecOps release signoff", status: "idle", log: "Pipeline paused. Gated by environment protection rules.\nAwaiting human authorization...\nApproved by SecOps-Lead (np421402@gmail.com)." },
    { id: "deploy_prod", name: "Deploy Production", desc: "Zero-downtime rolling update", status: "idle", log: "Artifact promoted to Production cluster.\nBatch 1: Updating instances 1-3... Done.\nBatch 2: Updating instances 4-6... Done.\nExecuting post-deploy E2E check...\nSmoke tests: SUCCESS.\nProduction Live: https://my-app.com" }
  ];

  const [steps, setSteps] = useState<Step[]>(initialSteps);

  const resetPipeline = () => {
    setIsRunning(false);
    setCurrentStepIndex(-1);
    setSteps(initialSteps.map(s => ({ ...s, status: "idle" })));
    setLogs(["Pipeline reset. Ready to trigger."]);
    setArtifactStored(false);
  };

  const startPipeline = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentStepIndex(0);
    setArtifactStored(false);
    setSteps(initialSteps.map(s => ({ ...s, status: "idle" })));
    setLogs([
      `[Triggered] Pipeline initiated via Git [${trigger.toUpperCase()}] event.`,
      `Initializing ephemeral container runner with node:20-alpine image...`
    ]);
  };

  useEffect(() => {
    if (!isRunning || currentStepIndex < 0 || currentStepIndex >= steps.length) {
      if (currentStepIndex >= steps.length) {
        setIsRunning(false);
        setLogs(prev => [...prev, "🎉 Pipeline completed successfully! All quality gates passed.", "Application is in production state."]);
      }
      return;
    }

    const step = steps[currentStepIndex];
    
    // Set current step to running
    setSteps(prev => prev.map((s, idx) => idx === currentStepIndex ? { ...s, status: "running" } : s));
    setLogs(prev => [...prev, `[Running] ${step.name}...`]);

    const timer = setTimeout(() => {
      // Handle fail condition at test or security scan if forced
      if (forceFail && (step.id === "test" || step.id === "security")) {
        setSteps(prev => prev.map((s, idx) => idx === currentStepIndex ? { ...s, status: "failed" } : s));
        setLogs(prev => [
          ...prev,
          `❌ [FAILED] Error detected during ${step.name}!`,
          step.id === "test" 
            ? "Error: FAIL src/auth.test.ts - Expected true to be false (simulated fail)" 
            : "Error: Trivy found 1 Critical vulnerability in CVE-2026-991 - pipeline rejected",
          "🛑 Pipeline halted. Quality gate breached. Refusing merge to protect production."
        ]);
        setIsRunning(false);
        return;
      }

      // Success transition
      setSteps(prev => prev.map((s, idx) => idx === currentStepIndex ? { ...s, status: "success" } : s));
      
      const newLogs = step.log.split("\n").map(line => `  ${line}`);
      setLogs(prev => [...prev, ...newLogs, `✓ [PASSED] ${step.name}`]);

      if (step.id === "build") {
        setArtifactStored(true);
        setLogs(prev => [...prev, `📦 Stored immutable build artifact in registry: registry.local/my-app:f8c2e90`]);
      }

      // Move to next step
      setCurrentStepIndex(prev => prev + 1);
    }, 1800); // simulated timing

    return () => clearTimeout(timer);
  }, [isRunning, currentStepIndex, forceFail]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white shadow-xl h-full flex flex-col justify-between">
      <div>
        {/* Header Options */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Activity className="text-cyan-400 w-5 h-5 animate-pulse" />
            <h3 className="font-semibold text-lg text-slate-100 font-sans">Interactive Pipeline Simulator</h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Trigger:</span>
            <select
              value={trigger}
              onChange={(e: any) => setTrigger(e.target.value)}
              disabled={isRunning}
              className="bg-slate-800 text-xs text-slate-200 border border-slate-700 rounded px-2 py-1 focus:outline-none focus:border-cyan-500"
            >
              <option value="push">Git Push (Commit)</option>
              <option value="pr">Pull Request</option>
              <option value="cron">Scheduled (Cron)</option>
              <option value="manual">Manual Dispatch</option>
            </select>

            <button
              onClick={() => setForceFail(!forceFail)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-all ${
                forceFail 
                  ? "bg-red-500/20 text-red-300 border border-red-500/50" 
                  : "bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{forceFail ? "Forcing Failure On" : "Force Fail Gate"}</span>
            </button>
          </div>
        </div>

        {/* Pipeline Track Visual */}
        <div className="relative my-6 px-2 overflow-x-auto whitespace-nowrap pb-4 scrollbar-thin">
          <div className="flex items-start gap-3 min-w-[800px]">
            {steps.map((step, idx) => {
              const isCurrent = idx === currentStepIndex;
              const isPassed = step.status === "success";
              const isFailed = step.status === "failed";
              const isRunningStep = step.status === "running";

              return (
                <div key={step.id} className="flex items-center flex-1">
                  {/* Step Card */}
                  <div className="flex flex-col items-center flex-1">
                    <motion.div
                      layout
                      className={`relative w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        isPassed 
                          ? "bg-green-500/10 border-green-500 text-green-400" 
                          : isFailed 
                          ? "bg-red-500/10 border-red-500 text-red-400 animate-bounce" 
                          : isRunningStep 
                          ? "bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.3)]" 
                          : "bg-slate-800 border-slate-700 text-slate-500"
                      }`}
                    >
                      <span className="text-xs font-mono font-bold">{idx + 1}</span>
                      {isRunningStep && (
                        <span className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping opacity-75" />
                      )}
                    </motion.div>
                    
                    <span className={`text-[11px] font-medium mt-2 text-center break-words max-w-[90px] ${
                      isRunningStep ? "text-cyan-400 font-semibold" : isPassed ? "text-green-400" : isFailed ? "text-red-400 font-bold" : "text-slate-400"
                    }`}>
                      {step.name}
                    </span>
                    <span className="text-[9px] text-slate-500 text-center max-w-[90px] mt-0.5 leading-tight truncate">
                      {step.desc}
                    </span>
                  </div>

                  {/* Connecting Line */}
                  {idx < steps.length - 1 && (
                    <div className="flex-1 min-w-[20px] h-[2px] bg-slate-800 relative mx-1">
                      <div 
                        className={`absolute inset-y-0 left-0 transition-all duration-1000 ${
                          isPassed ? "bg-green-500 w-full" : isRunningStep ? "bg-cyan-400 w-1/2 animate-pulse" : isFailed ? "bg-red-500 w-full" : "w-0"
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Console logs */}
        <div className="mt-4 bg-black/50 rounded-lg p-3 border border-slate-800 h-44 overflow-y-auto font-mono text-xs flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-1 mb-2 text-slate-400">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] uppercase font-bold tracking-wider">Live Pipeline Runner Output</span>
            </div>
            {logs.map((log, index) => (
              <div 
                key={index} 
                className={`${
                  log.includes("❌") || log.includes("Error:") 
                    ? "text-red-400" 
                    : log.includes("✓") || log.includes("success") 
                    ? "text-green-400" 
                    : log.includes("[Running]")
                    ? "text-cyan-300"
                    : log.startsWith(" ")
                    ? "text-slate-400 pl-4"
                    : "text-slate-300"
                }`}
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer controls & Registry Status */}
      <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={startPipeline}
            disabled={isRunning}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold font-sans transition-all shadow ${
              isRunning 
                ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
                : "bg-cyan-500 text-slate-950 hover:bg-cyan-400"
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Trigger CI/CD Pipeline</span>
          </button>
          
          <button
            onClick={resetPipeline}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Registry & Staging state */}
        <div className="flex items-center gap-4 text-[11px] font-mono">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Artifact stored:</span>
            {artifactStored ? (
              <span className="text-green-400 flex items-center gap-0.5">
                <CheckCircle className="w-3 h-3 fill-green-500/20" /> Yes
              </span>
            ) : (
              <span className="text-slate-500">None</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
