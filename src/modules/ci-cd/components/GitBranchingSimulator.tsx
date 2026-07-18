import { useState } from "react";
import { motion } from "motion/react";
import { GitCommit, GitMerge, GitBranch, ArrowRight, CheckCircle, AlertTriangle, RefreshCw } from "lucide-react";

interface CommitNode {
  id: number;
  branch: "main" | "feature" | "develop" | "gitflow-feature-1" | "gitflow-feature-2";
  type: "commit" | "merge";
}

export default function GitBranchingSimulator() {
  const [model, setModel] = useState<"trunk" | "gitflow">("trunk");
  const [hasConflict, setHasConflict] = useState<boolean>(false);
  const [commits, setCommits] = useState<CommitNode[]>([
    { id: 1, branch: "main", type: "commit" },
    { id: 2, branch: "main", type: "commit" }
  ]);

  const resetSimulator = () => {
    setHasConflict(false);
    if (model === "trunk") {
      setCommits([
        { id: 1, branch: "main", type: "commit" },
        { id: 2, branch: "main", type: "commit" }
      ]);
    } else {
      setCommits([
        { id: 10, branch: "main", type: "commit" },
        { id: 11, branch: "develop", type: "commit" }
      ]);
    }
  };

  const addTrunkCommit = () => {
    setCommits(prev => {
      const nextId = prev.length + 1;
      const onBranch = Math.random() > 0.5;

      if (onBranch) {
        return [
          ...prev,
          { id: nextId, branch: "feature", type: "commit" },
          { id: nextId + 1, branch: "main", type: "merge" } // instant merge
        ];
      } else {
        return [
          ...prev,
          { id: nextId, branch: "main", type: "commit" }
        ];
      }
    });
  };

  const addGitflowFeature1 = () => {
    setCommits(prev => {
      const nextId = prev.length + 10;
      return [
        ...prev,
        { id: nextId, branch: "gitflow-feature-1", type: "commit" }
      ];
    });
  };

  const addGitflowFeature2 = () => {
    setCommits(prev => {
      const nextId = prev.length + 20;
      return [
        ...prev,
        { id: nextId, branch: "gitflow-feature-2", type: "commit" }
      ];
    });
  };

  const triggerGitflowMerge = () => {
    // If both features have commits, trigger a conflict!
    const hasF1 = commits.some(c => c.branch === "gitflow-feature-1");
    const hasF2 = commits.some(c => c.branch === "gitflow-feature-2");

    if (hasF1 && hasF2) {
      setHasConflict(true);
    } else if (hasF1) {
      setCommits(prev => [
        ...prev,
        { id: Date.now(), branch: "develop", type: "merge" }
      ]);
    } else if (hasF2) {
      setCommits(prev => [
        ...prev,
        { id: Date.now(), branch: "develop", type: "merge" }
      ]);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white shadow-xl h-full flex flex-col justify-between font-sans">
      <div>
        {/* Header Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <GitBranch className="text-violet-400 w-5 h-5 animate-pulse" />
            <h3 className="font-semibold text-lg text-slate-100">Branching & Integration Simulator</h3>
          </div>
          
          <div className="flex gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => { setModel("trunk"); setHasConflict(false); setCommits([{ id: 1, branch: "main", type: "commit" }, { id: 2, branch: "main", type: "commit" }]); }}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                model === "trunk" ? "bg-slate-800 text-violet-400" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Trunk-Based
            </button>
            <button
              onClick={() => { setModel("gitflow"); setHasConflict(false); setCommits([{ id: 10, branch: "main", type: "commit" }, { id: 11, branch: "develop", type: "commit" }]); }}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                model === "gitflow" ? "bg-slate-800 text-amber-400" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              GitFlow (Legacy)
            </button>
          </div>
        </div>

        {/* Visualizer Area */}
        <div className="relative h-44 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between overflow-x-auto overflow-y-hidden">
          
          {model === "trunk" ? (
            /* Trunk-Based tracks */
            <div className="h-full flex flex-col justify-around min-w-[500px]">
              {/* Feature track */}
              <div className="flex items-center gap-2 relative h-12">
                <span className="w-16 font-mono text-[10px] text-slate-500 uppercase font-bold text-right">Short Branch</span>
                <div className="flex-1 h-[1px] bg-dashed bg-slate-800 flex items-center relative gap-4 px-4">
                  {commits.filter(c => c.branch === "feature").map(c => (
                    <div key={c.id} className="w-6 h-6 rounded-full bg-violet-500/20 border border-violet-400 flex items-center justify-center">
                      <GitCommit className="w-3.5 h-3.5 text-violet-300" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Main track */}
              <div className="flex items-center gap-2 relative h-12">
                <span className="w-16 font-mono text-[10px] text-violet-400 uppercase font-bold text-right">Main</span>
                <div className="flex-1 h-[2px] bg-violet-600/40 flex items-center relative gap-6 px-4">
                  {commits.filter(c => c.branch === "main" || c.type === "merge").map(c => (
                    <div key={c.id} className={`w-7 h-7 rounded-full flex items-center justify-center border ${
                      c.type === "merge" ? "bg-green-500/10 border-green-400 text-green-300" : "bg-violet-500/10 border-violet-400 text-violet-300"
                    }`}>
                      {c.type === "merge" ? <GitMerge className="w-4 h-4" /> : <GitCommit className="w-4 h-4" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* GitFlow tracks */
            <div className="h-full flex flex-col justify-between min-w-[550px]">
              {/* Feature 1 track */}
              <div className="flex items-center gap-2 h-8">
                <span className="w-16 font-mono text-[9px] text-pink-400 uppercase font-bold text-right">Feature A</span>
                <div className="flex-1 h-[1px] bg-slate-800 flex items-center gap-4 px-4">
                  {commits.filter(c => c.branch === "gitflow-feature-1").map(c => (
                    <div key={c.id} className="w-5 h-5 rounded-full bg-pink-500/20 border border-pink-400 flex items-center justify-center">
                      <GitCommit className="w-3 h-3 text-pink-300" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature 2 track */}
              <div className="flex items-center gap-2 h-8">
                <span className="w-16 font-mono text-[9px] text-amber-400 uppercase font-bold text-right">Feature B</span>
                <div className="flex-1 h-[1px] bg-slate-800 flex items-center gap-4 px-4">
                  {commits.filter(c => c.branch === "gitflow-feature-2").map(c => (
                    <div key={c.id} className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center">
                      <GitCommit className="w-3 h-3 text-amber-300" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Develop track */}
              <div className="flex items-center gap-2 h-8">
                <span className="w-16 font-mono text-[9px] text-slate-400 uppercase font-bold text-right">Develop</span>
                <div className="flex-1 h-[2px] bg-slate-800 flex items-center gap-4 px-4">
                  {commits.filter(c => c.branch === "develop" || c.type === "merge").map((c, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                      {c.type === "merge" ? <GitMerge className="w-3.5 h-3.5" /> : <GitCommit className="w-3.5 h-3.5" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Main track */}
              <div className="flex items-center gap-2 h-8">
                <span className="w-16 font-mono text-[9px] text-slate-500 uppercase font-bold text-right">Main (Prod)</span>
                <div className="flex-1 h-[2px] bg-slate-900 flex items-center gap-4 px-4">
                  {commits.filter(c => c.branch === "main").map((c, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                      <GitCommit className="w-3.5 h-3.5" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* State Banner */}
        <div className="mt-3">
          {hasConflict ? (
            <div className="bg-red-500/15 border border-red-500/30 text-red-400 p-2 rounded-lg text-xs flex items-center gap-2 font-mono">
              <AlertTriangle className="w-4 h-4 text-red-400 animate-bounce" />
              <span>🚨 MERGE CONFLICT! Both Feature branches touch the same lines. Release process blocked. Requires manual refactoring.</span>
            </div>
          ) : (
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 text-xs text-slate-400">
              {model === "trunk" 
                ? "Trunk-Based: Short-lived branch merges directly to Main. Integrates daily, triggering automatic fast build/test runs."
                : "GitFlow: Features are built in complete isolation on branches. Merging back weeks later causes massive conflict friction."
              }
            </div>
          )}
        </div>
      </div>

      {/* Simulator Controls */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {model === "trunk" ? (
            <button
              onClick={addTrunkCommit}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-violet-500 text-slate-950 hover:bg-violet-400 transition-all shadow"
            >
              <GitCommit className="w-3.5 h-3.5" />
              <span>Commit & Merge Daily</span>
            </button>
          ) : (
            <>
              <button
                onClick={addGitflowFeature1}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs border border-pink-500/40 text-pink-400 hover:bg-pink-500/10 transition-all"
              >
                <GitCommit className="w-3.5 h-3.5" />
                <span>Work Feature A</span>
              </button>
              <button
                onClick={addGitflowFeature2}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs border border-amber-500/40 text-amber-400 hover:bg-amber-500/10 transition-all"
              >
                <GitCommit className="w-3.5 h-3.5" />
                <span>Work Feature B</span>
              </button>
              <button
                onClick={triggerGitflowMerge}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all"
              >
                <GitMerge className="w-3.5 h-3.5" />
                <span>Merge to Develop</span>
              </button>
            </>
          )}

          <button
            onClick={resetSimulator}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs border border-slate-700 text-slate-300 hover:bg-slate-800 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}
