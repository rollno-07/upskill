import { useState, useEffect } from "react";
import { ExplainerResponse, QuestionData } from "../types";
import { Sparkles, Loader2, ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle, ChevronRight, HelpCircle } from "lucide-react";

interface Props {
  question: QuestionData;
}

export default function DynamicExplainerPanel({ question }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [explanationData, setExplanationData] = useState<ExplainerResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Clear or fetch data when the selected question changes
  useEffect(() => {
    setExplanationData(null);
    setError(null);
  }, [question.id]);

  const fetchAIExplanation = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: question.id,
          question: question.question,
          concept: question.concept,
          answer: question.answer
        })
      });

      if (!response.ok) {
        throw new Error("Failed to contact the server. Please verify connections.");
      }

      const data: ExplainerResponse = await response.json();
      setExplanationData(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred while generating explanation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white shadow-xl h-full flex flex-col justify-between">
      <div>
        {/* Topic Header info */}
        <div className="flex items-start gap-3 border-b border-slate-800 pb-3 mb-4">
          <HelpCircle className="text-cyan-400 w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">
              Q{question.id} — {question.category}
            </span>
            <h3 className="font-semibold text-base text-slate-100 font-sans mt-0.5 leading-snug">
              {question.question}
            </h3>
          </div>
        </div>

        {/* Standard core answer */}
        <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 mb-4 text-xs font-sans">
          <span className="text-[10px] uppercase tracking-wider font-bold text-cyan-400 block mb-1.5 font-mono">Standard Answer</span>
          <p className="text-slate-300 leading-relaxed font-sans">{question.answer}</p>
          <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-start gap-1.5 text-slate-400">
            <span className="font-bold text-[10px] uppercase font-mono text-slate-500">Takeaway:</span>
            <span className="text-[11px] leading-tight text-slate-300">{question.keyTakeaway}</span>
          </div>
        </div>

        {/* AI Action Trigger */}
        {!explanationData && !loading && (
          <div className="flex flex-col items-center justify-center py-6 border border-dashed border-slate-800 rounded-xl bg-slate-950/20">
            <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse mb-3" />
            <h4 className="text-xs font-bold text-slate-300 mb-1">Deepen Your Understanding</h4>
            <p className="text-[10px] text-slate-500 text-center max-w-[280px] leading-normal mb-4">
              Get an advanced Staff DevOps analysis, trade-off details, and a dynamic interactive flowchart schema.
            </p>
            <button
              onClick={fetchAIExplanation}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-cyan-400 text-slate-950 rounded-lg hover:bg-cyan-300 transition-all font-sans"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Generate AI Architectural Diagram & Deep-Dive</span>
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mb-4" />
            <span className="text-xs font-mono text-cyan-400 animate-pulse">Consulting Gemini Architect...</span>
            <span className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">Compiling schema structures</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-400">
            <AlertTriangle className="w-5 h-5 mb-1 text-red-400" />
            <p className="font-bold">Generation Failed</p>
            <p className="text-slate-400 mt-1">{error}</p>
            <button 
              onClick={fetchAIExplanation}
              className="mt-3 px-3 py-1.5 bg-red-500/20 text-red-200 rounded border border-red-500/30 hover:bg-red-500/30 transition-all text-[11px]"
            >
              Retry Call
            </button>
          </div>
        )}

        {/* Rich Explanation and Generated Visual Flowchart */}
        {explanationData && (
          <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
            
            {/* Dynamic flowchart container */}
            <div className="border border-slate-800 rounded-xl p-3 bg-slate-950/60">
              <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500 block mb-3 font-mono">
                {explanationData.isFallback ? "Conceptual Pipeline Map" : "Dynamic Conceptual Flowchart"}
              </span>
              
              {/* Nodes Stack */}
              <div className="space-y-2">
                {explanationData.flowchart.map((step, idx) => {
                  let statusColor = "bg-slate-900 border-slate-800 text-slate-300";
                  let badge = "Step";
                  
                  if (step.status === "input") {
                    statusColor = "bg-cyan-950/40 border-cyan-500/50 text-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.15)]";
                    badge = "Trigger";
                  } else if (step.status === "gate") {
                    statusColor = "bg-amber-950/35 border-amber-500/50 text-amber-300";
                    badge = "Gate";
                  } else if (step.status === "active") {
                    statusColor = "bg-purple-950/30 border-purple-500/50 text-purple-300";
                    badge = "Action";
                  } else if (step.status === "output") {
                    statusColor = "bg-green-950/30 border-green-500/50 text-green-300 shadow-[0_0_8px_rgba(34,197,94,0.15)]";
                    badge = "Deliver";
                  }

                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <div className={`w-full border p-2.5 rounded-lg flex items-start gap-3 transition-all ${statusColor}`}>
                        <div className="w-5 h-5 rounded-md bg-black/40 border border-slate-700/60 flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">
                          {step.stepNumber}
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs tracking-tight">{step.title}</span>
                            <span className="text-[8px] uppercase tracking-wider px-1 py-0.25 bg-black/30 rounded font-bold font-mono">
                              {badge}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 block mt-1 leading-relaxed">
                            {step.description}
                          </span>
                        </div>
                      </div>

                      {/* Connecting Chevron Arrow down */}
                      {idx < explanationData.flowchart.length - 1 && (
                        <div className="h-4 flex items-center justify-center text-slate-600">
                          <ChevronRight className="w-4 h-4 rotate-90" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* In-depth staff explanation text */}
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/60 text-xs leading-relaxed text-slate-300 font-sans">
              <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 block mb-2 font-mono">
                Staff Engineer Deep-Dive
              </span>
              <p className="whitespace-pre-wrap">{explanationData.detailedExplanation}</p>
            </div>

            {/* Pros & Cons Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              <div className="bg-green-500/5 border border-green-500/20 p-3 rounded-lg">
                <span className="text-[10px] uppercase font-bold tracking-widest text-green-400 block mb-2 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 fill-green-500/10" />
                  <span>Key Benefits</span>
                </span>
                <ul className="space-y-1.5">
                  {explanationData.pros.map((pro, index) => (
                    <li key={index} className="text-[10px] text-slate-300 leading-tight list-disc list-inside">
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-500/5 border border-red-500/20 p-3 rounded-lg">
                <span className="text-[10px] uppercase font-bold tracking-widest text-red-400 block mb-2 font-mono flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Key Risks / Pitfalls</span>
                </span>
                <ul className="space-y-1.5">
                  {explanationData.cons.map((con, index) => (
                    <li key={index} className="text-[10px] text-slate-300 leading-tight list-disc list-inside">
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Footer Disclaimer */}
      {explanationData && (
        <div className="mt-4 pt-2 border-t border-slate-800 flex items-center justify-between text-[9px] text-slate-500 font-mono">
          <span>Model: gemini-3.5-flash</span>
          <span>Double-check with actual setups</span>
        </div>
      )}
    </div>
  );
}
