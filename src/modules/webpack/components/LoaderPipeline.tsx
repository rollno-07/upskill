/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ArrowRight, Settings2, FileText, Check, Cpu, RefreshCw, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PipelineFile {
  name: string;
  type: "ts" | "css" | "png";
  rawContent: string;
}

const FILE_TEMPLATES: Record<string, PipelineFile> = {
  ts: {
    name: "UserProfile.tsx",
    type: "ts",
    rawContent: `interface User {\n  id: number;\n  name: string;\n  isAdmin?: boolean;\n}\n\nexport const UserProfile = ({ user }: { user: User }) => {\n  const greeting = user.isAdmin ?? false ? "Hello Admin!" : "Hello User!";\n  return <div>{greeting} - {user.name}</div>;\n};`
  },
  css: {
    name: "card.module.css",
    type: "css",
    rawContent: `.card {\n  padding: 16px;\n  border-radius: 8px;\n  background-color: var(--card-bg);\n}\n\n.title {\n  font-size: 1.25rem;\n  font-weight: 600;\n}`
  },
  png: {
    name: "avatar.png",
    type: "png",
    rawContent: "[Raw Binary PNG Asset Data (54KB)]"
  }
};

export function LoaderPipeline() {
  const [selectedFileType, setSelectedFileType] = useState<"ts" | "css" | "png">("ts");
  const [activeStep, setActiveStep] = useState<number>(0); // 0: raw, 1: mid-stage, 2: final transform
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const activeFile = FILE_TEMPLATES[selectedFileType];

  // Pipeline transitions logic
  const getLoaderChain = () => {
    switch (selectedFileType) {
      case "ts":
        return ["ts-loader", "babel-loader"];
      case "css":
        return ["css-loader", "style-loader"];
      case "png":
        return ["asset/resource"];
    }
  };

  const getStepTitle = (stepIndex: number) => {
    const loaders = getLoaderChain();
    if (stepIndex === 0) return "Source Input File";
    if (stepIndex === 1) {
      if (loaders.length === 1) return "Asset Module Processing";
      return `Processed by ${loaders[0]}`;
    }
    return loaders.length > 1 ? `Processed by ${loaders[1]}` : "Emitted Output Module";
  };

  const getStepDescription = (stepIndex: number) => {
    if (stepIndex === 0) return "Raw code written by developer containing advanced syntax.";
    const loaders = getLoaderChain();
    if (selectedFileType === "ts") {
      if (stepIndex === 1) return "Transpiles TypeScript definitions away, compiling down to clean ESNext JS.";
      return "Transpiles modern ESNext arrow functions and optional chaining to standard browser-compatible ES5 JS.";
    } else if (selectedFileType === "css") {
      if (stepIndex === 1) return "Parses CSS, resolving background URLs and class exports into a JS string module.";
      return "Dynamically injects the processed CSS string into the DOM header inside <style> tags at runtime.";
    } else {
      return "Built-in Asset module emits physical file to static dist directory and returns its output URL string.";
    }
  };

  const getStepContent = (stepIndex: number) => {
    if (stepIndex === 0) return activeFile.rawContent;

    if (selectedFileType === "ts") {
      if (stepIndex === 1) {
        return `// compiled from UserProfile.tsx (Types stripped)\nexport const UserProfile = ({ user }) => {\n  const greeting = user.isAdmin ?? false ? "Hello Admin!" : "Hello User!";\n  return React.createElement("div", null, greeting, " - ", user.name);\n};`;
      }
      return `// transpiled down to browser compatible ES5 JS\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.UserProfile = void 0;\nvar UserProfile = function (_a) {\n  var user = _a.user;\n  var _b = user.isAdmin, isAdmin = _b === void 0 ? false : _b;\n  var greeting = isAdmin ? "Hello Admin!" : "Hello User!";\n  return React.createElement("div", null, greeting, " - ", user.name);\n};\nexports.UserProfile = UserProfile;`;
    }

    if (selectedFileType === "css") {
      if (stepIndex === 1) {
        return `// CSS parsed as a Javascript Module String export\nexports.locals = {\n  "card": "card_f83bc",\n  "title": "title_a13b9"\n};\nexports.toString = function() {\n  return ".card_f83bc { padding: 16px; border-radius: 8px; background: var(--card-bg); }\\n.title_a13b9 { font-size: 1.25rem; font-weight: 600; }";\n};`;
      }
      return `// Dynamic CSS script injection (style-loader)\nvar content = require("./card.module.css");\nif (typeof content === 'string') content = [[module.id, content, '']];\nvar update = require("style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content);\nif (content.locals) module.exports = content.locals;`;
    }

    // png
    return `// Webpack 5 Asset Module resource reference\nmodule.exports = __webpack_public_path__ + "static/media/avatar.83bc8d9f.png";`;
  };

  const triggerPipeline = () => {
    setIsProcessing(true);
    setActiveStep(0);
    
    setTimeout(() => {
      setActiveStep(1);
    }, 1200);

    const loaders = getLoaderChain();
    if (loaders.length > 1) {
      setTimeout(() => {
        setActiveStep(2);
        setIsProcessing(false);
      }, 2500);
    } else {
      setTimeout(() => {
        setIsProcessing(false);
      }, 1500);
    }
  };

  const loaders = getLoaderChain();

  return (
    <div id="loader-pipeline" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-slate-100 font-sans shadow-2xl overflow-hidden">
      {/* Header and description */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-4 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h4 className="text-lg font-bold tracking-tight text-white">Interactive Loader Transformation Pipeline</h4>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Loaders parse non-JS modules. They apply file-level pre-processors in a **right-to-left** sequence. Select a file type to run the transformation chain!
          </p>
        </div>
        <div className="flex bg-slate-950/40 p-1.5 rounded-xl border border-white/10 gap-1">
          {(["ts", "css", "png"] as const).map(type => (
            <button
              key={type}
              onClick={() => {
                setSelectedFileType(type);
                setActiveStep(0);
                setIsProcessing(false);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold font-mono transition uppercase ${
                selectedFileType === type
                  ? "bg-cyan-500 text-white shadow-md"
                  : "text-slate-450 hover:text-slate-200"
              }`}
            >
              {type === "ts" ? "TypeScript" : type === "css" ? "CSS" : "PNG Asset"}
            </button>
          ))}
        </div>
      </div>

      {/* Pipeline Chain Visualizer */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Pipeline Nodes */}
        <div className="md:col-span-12 flex flex-col md:flex-row justify-between items-center bg-slate-950/40 p-4 rounded-xl border border-white/10 gap-4 mb-4">
          {/* Node 1: Raw File */}
          <div className={`flex items-center gap-3 p-3 rounded-lg border transition ${activeStep === 0 ? "border-cyan-500 bg-cyan-950/40 shadow-lg shadow-cyan-500/10" : "border-white/5 bg-white/5"}`}>
            <FileText className="w-5 h-5 text-cyan-400" />
            <div className="text-left">
              <div className="text-xs font-semibold font-mono text-white">{activeFile.name}</div>
              <div className="text-[10px] text-slate-400">Source Input</div>
            </div>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-500 hidden md:block" />

          {/* Node 2: Loader 1 */}
          <div className={`flex items-center gap-3 p-3 rounded-lg border transition ${
            activeStep === 1 ? "border-cyan-500 bg-cyan-950/40 shadow-lg shadow-cyan-500/10" : "border-white/5 bg-white/5"
          }`}>
            <Settings2 className="w-5 h-5 text-cyan-400" />
            <div className="text-left">
              <div className="text-xs font-semibold font-mono text-white">{loaders[0]}</div>
              <div className="text-[10px] text-slate-400">Loader Stage 1</div>
            </div>
          </div>

          {loaders.length > 1 && (
            <>
              <ArrowRight className="w-4 h-4 text-slate-500 hidden md:block" />
              {/* Node 3: Loader 2 */}
              <div className={`flex items-center gap-3 p-3 rounded-lg border transition ${
                activeStep === 2 ? "border-cyan-500 bg-cyan-950/40 shadow-lg shadow-cyan-500/10" : "border-white/5 bg-white/5"
              }`}>
                <Settings2 className="w-5 h-5 text-cyan-400" />
                <div className="text-left">
                  <div className="text-xs font-semibold font-mono text-white">{loaders[1]}</div>
                  <div className="text-[10px] text-slate-400">Loader Stage 2</div>
                </div>
              </div>
            </>
          )}

          <ArrowRight className="w-4 h-4 text-slate-500 hidden md:block" />

          {/* Node 4: Output bundle chunk */}
          <div className={`flex items-center gap-3 p-3 rounded-lg border transition ${
            (loaders.length === 1 && activeStep === 1) || (loaders.length > 1 && activeStep === 2)
              ? "border-emerald-500 bg-emerald-950/40 shadow-lg shadow-emerald-500/10"
              : "border-white/5 bg-white/5"
          }`}>
            <Cpu className="w-5 h-5 text-emerald-400" />
            <div className="text-left">
              <div className="text-xs font-semibold font-mono">
                {selectedFileType === "png" ? "copy-resource" : "js-module"}
              </div>
              <div className="text-[10px] text-emerald-400 font-semibold">Packed for Chunk</div>
            </div>
          </div>
        </div>

        {/* Code View Inspector */}
        <div className="md:col-span-8 flex flex-col gap-3">
          <div className="flex justify-between items-center bg-slate-950/50 px-4 py-2 border border-white/10 rounded-t-xl">
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-white">{getStepTitle(activeStep)}</span>
              <span className="text-[10px] text-slate-450">{getStepDescription(activeStep)}</span>
            </div>
            <button
              id="run-pipeline-btn"
              disabled={isProcessing}
              onClick={triggerPipeline}
              className="flex items-center gap-1.5 px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg text-xs font-semibold shadow-md transition hover:scale-103"
            >
              <RefreshCw className={`w-3 h-3 ${isProcessing ? "animate-spin" : ""}`} />
              Run Pipeline
            </button>
          </div>

          <div className="bg-slate-950/45 p-4 border border-white/10 border-t-0 rounded-b-xl min-h-[220px] font-mono text-xs text-cyan-300 overflow-y-auto whitespace-pre leading-relaxed scrollbar-thin scrollbar-thumb-white/10 text-left">
            <code>{getStepContent(activeStep)}</code>
          </div>
        </div>

        {/* Informational Panel */}
        <div className="md:col-span-4 bg-slate-950/40 rounded-xl border border-white/10 p-4 h-full flex flex-col justify-between">
          <div className="space-y-4 text-left">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">Understanding loaders</h5>
            <div className="space-y-3">
              <div className="text-[11px] text-slate-300 leading-relaxed">
                Webpack parses stylesheets and templates by applying an ordered chain of transforms.
              </div>
              <div className="bg-white/5 p-2.5 rounded-lg border border-white/10">
                <div className="text-[11px] font-semibold text-cyan-300 mb-1">Execution order:</div>
                <p className="text-[10px] text-slate-400 leading-relaxed font-mono">
                  use: ["style-loader", "css-loader"]
                </p>
                <p className="text-[10px] text-slate-400 leading-relaxed mt-1">
                  Executes <span className="text-white">css-loader</span> first (parsing rules), then <span className="text-white">style-loader</span> (runtime injection). This goes right-to-left.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-slate-500 flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            Webpack 5 has built-in asset modules.
          </div>
        </div>
      </div>
    </div>
  );
}
