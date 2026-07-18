import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Database, ChevronRight, Layers, ArrowRight, Play, CheckCircle, RefreshCw } from "lucide-react";

interface StepDetail {
  id: number;
  title: string;
  desc: string;
  oldAppAction: string;
  newAppAction: string;
  dbSchema: { name: string; type: string; status: "stable" | "added" | "dropped" }[];
}

export default function DbMigrationVisualizer() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: StepDetail[] = [
    {
      id: 0,
      title: "1. Original State (Pre-Migration)",
      desc: "The database table has a single column 'user_name'. Old App Container is running in production, reading and writing to this column.",
      oldAppAction: "Reads & Writes to 'user_name'",
      newAppAction: "Not Deployed Yet",
      dbSchema: [
        { name: "id", type: "INT PRIMARY KEY", status: "stable" },
        { name: "user_name", type: "VARCHAR(255)", status: "stable" }
      ]
    },
    {
      id: 1,
      title: "2. Expand (Create Column)",
      desc: "Schema is expanded by adding 'user_name_v2'. A database trigger or double-writing mechanism writes to BOTH 'user_name' and 'user_name_v2' to keep them in sync, while the old app continues to read from 'user_name'.",
      oldAppAction: "Reads 'user_name', writes to both (double-write)",
      newAppAction: "Deploying and testing in staging",
      dbSchema: [
        { name: "id", type: "INT PRIMARY KEY", status: "stable" },
        { name: "user_name", type: "VARCHAR(255)", status: "stable" },
        { name: "user_name_v2", type: "VARCHAR(500)", status: "added" }
      ]
    },
    {
      id: 2,
      title: "3. App Rollout (Data Sync & Promotion)",
      desc: "Historical records are backfilled. The New App Container is rolled out to production. It reads and writes exclusively to 'user_name_v2'. Old app containers are gradually decommissioned.",
      oldAppAction: "Gradually shutting down nodes...",
      newAppAction: "Reads & Writes to 'user_name_v2'",
      dbSchema: [
        { name: "id", type: "INT PRIMARY KEY", status: "stable" },
        { name: "user_name", type: "VARCHAR(255)", status: "stable" },
        { name: "user_name_v2", type: "VARCHAR(500)", status: "stable" }
      ]
    },
    {
      id: 3,
      title: "4. Contract (Decommission & Clean)",
      desc: "All old apps are gone. New app is 100% active. We can now safely run a database migration to drop the old 'user_name' column, reclaiming space and completing the contract phase with zero downtime.",
      oldAppAction: "Fully decommissioned",
      newAppAction: "Reads & Writes to 'user_name_v2' (stable production)",
      dbSchema: [
        { name: "id", type: "INT PRIMARY KEY", status: "stable" },
        { name: "user_name_v2", type: "VARCHAR(500)", status: "stable" }
      ]
    }
  ];

  const current = steps[activeStep];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white shadow-xl h-full flex flex-col justify-between">
      <div>
        {/* Header Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Database className="text-pink-400 w-5 h-5 animate-pulse" />
            <h3 className="font-semibold text-lg text-slate-100 font-sans">Expand-and-Contract DB Migration</h3>
          </div>
          <div className="flex gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
            {steps.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveStep(idx)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  activeStep === idx ? "bg-slate-800 text-pink-400" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Stage {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Step description */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 mb-4 min-h-[75px]">
          <h4 className="text-xs font-bold text-pink-400 mb-1 font-mono uppercase">{current.title}</h4>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">{current.desc}</p>
        </div>

        {/* Database Table Schema Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          
          {/* Applications block */}
          <div className="space-y-3 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/60">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-2">Microservice Containers</span>
            
            {/* Old App container status */}
            <div className={`p-2.5 rounded-lg border text-xs font-mono transition-all flex flex-col justify-between ${
              activeStep === 3 ? "border-slate-800 opacity-20 bg-transparent" : "border-cyan-500/30 bg-cyan-500/5"
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-cyan-400 font-sans">Old App Container (v1)</span>
                <span className={`px-1.5 py-0.5 rounded text-[8px] uppercase font-bold ${
                  activeStep === 3 ? "bg-slate-800 text-slate-500" : "bg-cyan-500/20 text-cyan-300"
                }`}>
                  {activeStep === 3 ? "offline" : "running"}
                </span>
              </div>
              <span className="text-[11px] text-slate-400">{current.oldAppAction}</span>
            </div>

            {/* New App container status */}
            <div className={`p-2.5 rounded-lg border text-xs font-mono transition-all flex flex-col justify-between ${
              activeStep === 0 ? "border-slate-800 opacity-25 bg-transparent" : "border-purple-500/40 bg-purple-500/5"
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-purple-400 font-sans">New App Container (v2)</span>
                <span className={`px-1.5 py-0.5 rounded text-[8px] uppercase font-bold ${
                  activeStep === 0 ? "bg-slate-800 text-slate-500" : "bg-purple-500/20 text-purple-300 animate-pulse"
                }`}>
                  {activeStep === 0 ? "not ready" : "running"}
                </span>
              </div>
              <span className="text-[11px] text-slate-400">{current.newAppAction}</span>
            </div>
          </div>

          {/* Table representation block */}
          <div className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Database Table: users</span>
                <span className="text-[10px] text-pink-400 font-mono">PostgreSQL</span>
              </div>

              {/* Columns list */}
              <div className="space-y-1.5 font-mono text-[11px]">
                {current.dbSchema.map((col, idx) => (
                  <motion.div
                    key={col.name}
                    layout
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`p-2 rounded-md border flex items-center justify-between ${
                      col.status === "added" 
                        ? "bg-green-500/10 border-green-500/30 text-green-300 shadow-[0_0_8px_rgba(34,197,94,0.15)]" 
                        : "bg-slate-900 border-slate-800 text-slate-300"
                    }`}
                  >
                    <span>{col.name}</span>
                    <span className="text-[10px] text-slate-500 font-bold">{col.type}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Schema State Indicators */}
            <div className="mt-3 flex gap-2 text-[9px] uppercase font-bold text-slate-500">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded bg-slate-800 border border-slate-700" />
                <span>Stable</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded bg-green-500/20 border border-green-500/40" />
                <span>Expanded</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer step controls */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
        <button
          onClick={() => setActiveStep(prev => (prev + 1) % steps.length)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold font-sans bg-pink-500 text-slate-950 hover:bg-pink-400 transition-all shadow"
        >
          <ChevronRight className="w-4 h-4" />
          <span>Advance Migration Stage</span>
        </button>

        <span className="text-slate-500 text-[11px] font-mono">
          Stage {activeStep + 1} of 4
        </span>
      </div>
    </div>
  );
}
