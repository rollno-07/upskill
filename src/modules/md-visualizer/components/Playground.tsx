import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Square, Layers, Move, AlignJustify, Grid3X3, 
  Settings, Sliders, Type, Zap, RefreshCw, Eye, BookOpen
} from "lucide-react";
import { SandboxType } from "../types";

export interface PlaygroundProps {
  type: SandboxType;
  config?: any;
}

export default function Playground({ type, config }: PlaygroundProps) {
  // Master container rendering correct sandbox based on type
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl" id="sandbox-container">
      <div className="bg-slate-950/80 border-b border-slate-800 px-5 py-3 flex items-center justify-between" id="sandbox-header">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-sky-500/10 text-sky-400 rounded-lg">
            {getIconForType(type)}
          </div>
          <div>
            <span className="text-xs text-sky-400 font-mono font-bold tracking-widest uppercase">INTERACTIVE DEMO</span>
            <h4 className="text-sm font-semibold text-slate-200">{getSandboxName(type)}</h4>
          </div>
        </div>
        <div className="text-[10px] font-mono text-slate-500 bg-slate-900/60 px-2 py-1 rounded border border-slate-800">
          STATE: DYNAMIC
        </div>
      </div>
      
      <div className="p-6 text-slate-300" id="sandbox-body">
        {renderSandbox(type, config)}
      </div>
    </div>
  );
}

function getIconForType(type: SandboxType) {
  switch (type) {
    case "BOX_MODEL": return <Square size={16} />;
    case "SELECTORS": return <Sliders size={16} />;
    case "POSITIONING": return <Move size={16} />;
    case "Z_INDEX": return <Layers size={16} />;
    case "FLEXBOX": return <AlignJustify size={16} />;
    case "GRID": return <Grid3X3 size={16} />;
    case "VARIABLES": return <Settings size={16} />;
    case "RESPONSIVE": return <RefreshCw size={16} />;
    case "FONT_UNITS": return <Type size={16} />;
    case "TRANSITIONS": return <Zap size={16} />;
    case "LOGICAL_PROPERTIES": return <RefreshCw size={16} />;
    case "OBJECT_FIT": return <Eye size={16} />;
    default: return <Settings size={16} />;
  }
}

function getSandboxName(type: SandboxType) {
  switch (type) {
    case "BOX_MODEL": return "Box Model & Display Explorer";
    case "SELECTORS": return "CSS Selector & Specificity Calculator";
    case "POSITIONING": return "Coordinates & Position Engine";
    case "Z_INDEX": return "Stacking Context & 3D Depth Layering";
    case "FLEXBOX": return "Flexbox Alignment & Ratio Sandbox";
    case "GRID": return "CSS Grid 2D Blueprint Board";
    case "VARIABLES": return "Native Variables & calc() Card Builder";
    case "RESPONSIVE": return "Media vs Container Query Resizer";
    case "FONT_UNITS": return "Sizing & Font Unit compounding scale";
    case "TRANSITIONS": return "Animations & GPU Rendering Pipeline Analyzer";
    case "LOGICAL_PROPERTIES": return "Logical vs Physical Language Mapper";
    case "OBJECT_FIT": return "Object-Fit & Aspect-Ratio Cropper";
    default: return "Interactive Playground";
  }
}

function renderSandbox(type: SandboxType, config?: any) {
  switch (type) {
    case "BOX_MODEL": return <BoxModelSandbox config={config} />;
    case "SELECTORS": return <SelectorsSandbox config={config} />;
    case "POSITIONING": return <PositioningSandbox config={config} />;
    case "Z_INDEX": return <ZIndexSandbox config={config} />;
    case "FLEXBOX": return <FlexboxSandbox config={config} />;
    case "GRID": return <GridSandbox config={config} />;
    case "VARIABLES": return <VariablesSandbox config={config} />;
    case "RESPONSIVE": return <ResponsiveSandbox config={config} />;
    case "FONT_UNITS": return <FontUnitsSandbox config={config} />;
    case "TRANSITIONS": return <TransitionsSandbox config={config} />;
    case "LOGICAL_PROPERTIES": return <LogicalPropertiesSandbox config={config} />;
    case "OBJECT_FIT": return <ObjectFitSandbox config={config} />;
    default: return <div className="text-center text-slate-500 py-10">Select a concept to open the interactive sandbox</div>;
  }
}

/* ==========================================================================
   1. BOX MODEL SANDBOX
   ========================================================================== */
function BoxModelSandbox({ config }: { config?: any }) {
  const [padding, setPadding] = useState(config?.padding || 16);
  const [border, setBorder] = useState(config?.border || 4);
  const [margin, setMargin] = useState(config?.margin || 16);
  const [boxSizing, setBoxSizing] = useState(config?.boxSizing || "content-box");
  const [displayMode, setDisplayMode] = useState("block");
  const [visibility, setVisibility] = useState("visible");
  const [opacity, setOpacity] = useState(1);
  const [showCollapse, setShowCollapse] = useState(false);

  // Sync with dynamic configs from questions
  useEffect(() => {
    if (config?.tab === "visibility") {
      setVisibility("hidden");
      setDisplayMode("block");
      setOpacity(1);
    } else if (config?.tab === "opacity") {
      setOpacity(0);
      setVisibility("visible");
      setDisplayMode("block");
    } else if (config?.tab === "display-types") {
      setDisplayMode("inline-block");
    } else if (config?.tab === "margin-collapse") {
      setShowCollapse(true);
    } else {
      setVisibility("visible");
      setOpacity(1);
    }
  }, [config]);

  const targetWidth = 140;
  const targetHeight = 80;

  // Sizing Math
  const totalWidth = targetWidth + (boxSizing === "content-box" ? (padding * 2 + border * 2) : 0);
  const totalHeight = targetHeight + (boxSizing === "content-box" ? (padding * 2 + border * 2) : 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="box-model-sandbox">
      {/* Controls */}
      <div className="lg:col-span-5 space-y-5 bg-slate-950/40 p-4 rounded-xl border border-slate-800" id="box-model-controls">
        <h5 className="text-xs font-bold font-mono text-slate-400 tracking-wider uppercase border-b border-slate-800 pb-2">Properties</h5>
        
        {/* Box Sizing */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1.5">box-sizing</label>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => setBoxSizing("content-box")}
              className={`text-xs py-1.5 px-3 rounded-lg font-mono font-medium border transition-all ${boxSizing === "content-box" ? "bg-sky-500/20 text-sky-400 border-sky-500" : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800"}`}>
              content-box
            </button>
            <button 
              onClick={() => setBoxSizing("border-box")}
              className={`text-xs py-1.5 px-3 rounded-lg font-mono font-medium border transition-all ${boxSizing === "border-box" ? "bg-sky-500/20 text-sky-400 border-sky-500" : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800"}`}>
              border-box
            </button>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-orange-400">margin</span>
              <span>{margin}px</span>
            </div>
            <input type="range" min="0" max="40" value={margin} onChange={(e) => setMargin(Number(e.target.value))} className="w-full accent-orange-500" />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-yellow-400">border-width</span>
              <span>{border}px</span>
            </div>
            <input type="range" min="0" max="15" value={border} onChange={(e) => setBorder(Number(e.target.value))} className="w-full accent-yellow-500" />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-emerald-400">padding</span>
              <span>{padding}px</span>
            </div>
            <input type="range" min="0" max="40" value={padding} onChange={(e) => setPadding(Number(e.target.value))} className="w-full accent-emerald-500" />
          </div>
        </div>

        {/* Display modes */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1.5">display / visibility</label>
          <div className="grid grid-cols-3 gap-1.5 mb-2">
            {["block", "inline-block", "inline"].map((m) => (
              <button 
                key={m}
                onClick={() => setDisplayMode(m)}
                className={`text-[10px] py-1 px-1 rounded font-mono border transition-all ${displayMode === m ? "bg-sky-500/20 text-sky-400 border-sky-500" : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800"}`}>
                {m}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <label className="text-[10px] text-slate-400 font-mono block mb-1">visibility</label>
              <select 
                value={visibility} 
                onChange={(e) => setVisibility(e.target.value)}
                className="w-full text-xs bg-slate-900 border border-slate-800 rounded px-2 py-1 font-mono text-slate-300">
                <option value="visible">visible</option>
                <option value="hidden">hidden</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-slate-400 font-mono block mb-1">opacity</label>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.1" 
                value={opacity} 
                onChange={(e) => setOpacity(Number(e.target.value))} 
                className="w-full accent-sky-500" 
              />
            </div>
          </div>
        </div>

        {/* Toggle Collapse */}
        <div className="flex items-center justify-between border-t border-slate-850 pt-2 text-xs">
          <span className="text-slate-400">Simulate Collapsing Margins</span>
          <button 
            onClick={() => setShowCollapse(!showCollapse)}
            className={`px-2.5 py-1 rounded border text-[10px] font-mono transition-all ${showCollapse ? "bg-orange-500/20 text-orange-400 border-orange-500" : "bg-slate-900 text-slate-500 border-slate-800"}`}>
            {showCollapse ? "ACTIVE" : "OFF"}
          </button>
        </div>
      </div>

      {/* Visual Workspace */}
      <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-950 p-6 rounded-xl border border-slate-800 relative min-h-[320px]" id="box-model-visual-workspace">
        
        {showCollapse ? (
          /* Collapsing Margins Visualizer */
          <div className="w-full flex flex-col items-center gap-4 py-4" id="margin-collapse-visual">
            <span className="text-xs text-orange-400 font-mono absolute top-3 left-4">Margin Collapsing Arena</span>
            
            <div className="w-full max-w-[200px] border border-slate-800 p-2 rounded bg-slate-900/40 text-center text-[10px] font-mono">
              <div className="bg-sky-500/20 text-sky-400 p-3 rounded font-bold border border-sky-500/30">Box A</div>
              <div className="h-6 bg-orange-500/10 border-x border-orange-500/20 flex items-center justify-center text-orange-400 text-[10px]" style={{ height: `${margin}px` }}>
                margin-bottom: {margin}px
              </div>
              <div className="bg-amber-500/20 text-amber-400 p-3 rounded font-bold border border-amber-500/30">Box B</div>
              <span className="text-[10px] text-slate-500 mt-2 block">
                Total Gap: <strong className="text-orange-400 font-mono">{margin}px</strong> <span className="text-slate-600">(not {margin * 2}px!)</span>
              </span>
            </div>
          </div>
        ) : (
          /* Standard Box Model concentric visualization */
          <div className="w-full flex flex-col items-center justify-center scale-90" id="standard-box-visual">
            {/* Margins */}
            <div 
              className="bg-orange-500/5 border border-dashed border-orange-500/30 rounded-lg flex items-center justify-center p-3 transition-all relative"
              style={{ margin: `${margin}px` }}>
              <span className="absolute top-0.5 left-1.5 text-[9px] font-mono text-orange-500/80">margin</span>

              {/* Borders */}
              <div 
                className="bg-yellow-500/10 border border-yellow-500 rounded flex items-center justify-center transition-all relative"
                style={{ borderWidth: `${border}px`, borderColor: border > 0 ? "rgb(234, 179, 8)" : "transparent" }}>
                <span className="absolute top-0.5 left-1.5 text-[9px] font-mono text-yellow-500">border</span>

                {/* Padding */}
                <div 
                  className="bg-emerald-500/10 border border-dashed border-emerald-500/30 rounded flex items-center justify-center p-2 transition-all relative"
                  style={{ padding: `${padding}px` }}>
                  <span className="absolute top-0.5 left-1.5 text-[9px] font-mono text-emerald-500">padding</span>

                  {/* Content Box */}
                  <div 
                    className="bg-sky-500/30 border border-sky-400 rounded flex flex-col items-center justify-center text-sky-200 transition-all font-mono shadow-inner select-none"
                    style={{ 
                      width: `${targetWidth}px`, 
                      height: `${targetHeight}px`,
                      display: displayMode === "block" ? "flex" : displayMode,
                      visibility: visibility as any,
                      opacity: opacity
                    }}>
                    <span className="text-xs font-bold text-sky-100">content</span>
                    <span className="text-[10px] text-sky-300">{targetWidth} x {targetHeight}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculations Box */}
            <div className="mt-6 w-full max-w-sm bg-slate-900 border border-slate-800 p-3 rounded-lg text-xs space-y-1 font-mono" id="box-model-calculations">
              <div className="flex justify-between border-b border-slate-800 pb-1.5 mb-1.5 text-slate-400">
                <span>Rendering Metric</span>
                <span className="text-sky-400">box-sizing: {boxSizing}</span>
              </div>
              <div className="flex justify-between">
                <span>Calculated Width:</span>
                <span>{targetWidth} + {boxSizing === "content-box" ? `(${padding}*2 padding + ${border}*2 border)` : "0"} = <strong className="text-sky-400">{totalWidth}px</strong></span>
              </div>
              <div className="flex justify-between">
                <span>Calculated Height:</span>
                <span>{targetHeight} + {boxSizing === "content-box" ? `(${padding}*2 padding + ${border}*2 border)` : "0"} = <strong className="text-sky-400">{totalHeight}px</strong></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ==========================================================================
   2. SELECTORS & SPECIFICITY SANDBOX
   ========================================================================== */
function SelectorsSandbox({ config }: { config?: any }) {
  const [selector, setSelector] = useState(config?.selectorA || "div.card p");
  const [customSelector, setCustomSelector] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const presets = [
    { text: "Universal (*)", sel: "*" },
    { text: "Elements (p)", sel: "p" },
    { text: "Class (.badge)", sel: ".badge" },
    { text: "ID (#card)", sel: "#card" },
    { text: "Compounded (div.card p)", sel: "div.card p" },
    { text: "Child selector (div > span)", sel: "div > span" },
    { text: "Pseudo state (button:hover)", sel: "button:hover" },
    { text: "Negation selector (div:not(.header))", sel: "div:not(.header)" }
  ];

  // Specificity math function
  const calculateSpecificity = (selString: string) => {
    let ids = 0;
    let classes = 0;
    let elements = 0;

    // Standardized regex parsing for basic CSS rules
    const clean = selString.replace(/:not\(([^)]+)\)/g, " $1 "); // Negations pass content
    
    // Count IDs
    const idMatches = clean.match(/#[a-zA-Z0-9_-]+/g);
    if (idMatches) ids += idMatches.length;

    // Count classes, attributes, pseudo-classes
    const classMatches = clean.match(/\.[a-zA-Z0-9_-]+/g);
    if (classMatches) classes += classMatches.length;
    
    const attrMatches = clean.match(/\[[^\]]+\]/g);
    if (attrMatches) classes += attrMatches.length;
    
    const pseudoMatches = clean.match(/:[a-zA-Z0-9_-]+/g);
    if (pseudoMatches) {
      // Filter out double colons pseudo-elements and :not container itself
      pseudoMatches.forEach(p => {
        if (!p.startsWith("::") && p !== ":not") classes++;
      });
    }

    // Count elements & pseudo-elements
    const pseudoElems = clean.match(/::[a-zA-Z0-9_-]+/g);
    if (pseudoElems) elements += pseudoElems.length;

    const tags = clean.replace(/[#.[\]:].*/g, " ").trim().split(/\s+/).filter(Boolean);
    tags.forEach(t => {
      // Avoid symbols or combinators
      if (["+", ">", "~", "*"].indexOf(t) === -1 && t.match(/^[a-zA-Z]+$/)) {
        elements++;
      }
    });

    return { ids, classes, elements };
  };

  const activeSelector = customSelector || selector;
  const { ids, classes, elements } = calculateSpecificity(activeSelector);

  // Mock checking matches inside our tree
  const checkMatch = (elementId: string, tags: string[], cls: string[]) => {
    const sel = activeSelector.toLowerCase().trim();
    if (sel === "*") return true;

    // Simple matching simulations
    if (sel.includes(`#${elementId}`)) return true;
    
    let tagMatch = false;
    tags.forEach(t => {
      if (sel.includes(t)) tagMatch = true;
    });

    let classMatch = false;
    cls.forEach(c => {
      if (sel.includes(`.${c}`)) classMatch = true;
    });

    // Handle combinators simplistically
    if (sel.includes(">") && sel.includes("span") && elementId === "span-node") return true;
    if (sel.includes("+") && sel.includes("p") && elementId === "p-node") return true;

    return tagMatch || classMatch;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="selectors-sandbox">
      {/* Controls */}
      <div className="lg:col-span-5 space-y-4 bg-slate-950/40 p-4 rounded-xl border border-slate-800" id="selectors-controls">
        <h5 className="text-xs font-bold font-mono text-slate-400 tracking-wider uppercase border-b border-slate-800 pb-2">CSS Specificity Engine</h5>
        
        {/* Presets */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1.5">Preset Selectors</label>
          <div className="grid grid-cols-2 gap-1.5">
            {presets.map((p) => (
              <button 
                key={p.sel}
                onClick={() => { setCustomSelector(""); setSelector(p.sel); }}
                className={`text-[10px] text-left py-1 px-2.5 rounded font-mono border transition-all truncate ${activeSelector === p.sel ? "bg-sky-500/20 text-sky-400 border-sky-500" : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850"}`}>
                {p.text}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Custom CSS Selector</label>
          <input 
            type="text" 
            placeholder="Type your own CSS selector (e.g. div.active > span)"
            value={customSelector}
            onChange={(e) => setCustomSelector(e.target.value)}
            className="w-full text-xs font-mono bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Specificity score card */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2" id="specificity-score-card">
          <span className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest block">Computed Specificity Value</span>
          
          <div className="grid grid-cols-3 gap-2 text-center py-2" id="specificity-numbers">
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg py-2">
              <span className="text-lg font-bold text-orange-400 font-mono">{ids}</span>
              <span className="text-[9px] text-slate-500 block uppercase font-bold tracking-wider">IDs</span>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg py-2">
              <span className="text-lg font-bold text-emerald-400 font-mono">{classes}</span>
              <span className="text-[9px] text-slate-500 block uppercase font-bold tracking-wider">Classes</span>
            </div>
            <div className="bg-sky-500/10 border border-sky-500/20 rounded-lg py-2">
              <span className="text-lg font-bold text-sky-400 font-mono">{elements}</span>
              <span className="text-[9px] text-slate-500 block uppercase font-bold tracking-wider">Elements</span>
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-400 text-center bg-slate-900/40 p-2 rounded border border-slate-850">
            Specificity Vector: <strong className="text-sky-400">({ids}, {classes}, {elements})</strong>
          </div>
        </div>
      </div>

      {/* DOM Visual Workspace */}
      <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950 p-5 rounded-xl border border-slate-800" id="selectors-visual-workspace">
        <div className="mb-4">
          <span className="text-xs text-sky-400 font-mono block mb-2">Live DOM Matching Simulation</span>
          <p className="text-[11px] text-slate-400">Elements matching <strong className="text-sky-400 font-mono">"{activeSelector}"</strong> glow with a cyan border!</p>
        </div>

        {/* Mock DOM tree visualization */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-3 relative" id="mock-dom-tree">
          {/* Card node */}
          <div className={`p-4 border rounded-lg transition-all ${checkMatch("card", ["div"], ["card"]) ? "border-sky-500 bg-sky-500/5 ring-1 ring-sky-500/20" : "border-slate-800 bg-slate-950/40 text-slate-400"}`}>
            <span className="text-[10px] font-bold text-slate-500 block mb-2">&lt;div id="card" class="card"&gt;</span>
            
            <div className="space-y-2">
              {/* Span node */}
              <div className={`p-2 border rounded transition-all ml-4 ${checkMatch("span-node", ["span"], ["badge"]) ? "border-sky-500 bg-sky-500/5" : "border-slate-800 text-slate-400 bg-slate-950/20"}`}>
                <span className="text-[10px] font-bold text-slate-500 block mb-1">&lt;span class="badge"&gt;</span>
                <span className="text-xs text-slate-300">Badge Content</span>
                <span className="text-[10px] font-bold text-slate-500 block mt-1">&lt;/span&gt;</span>
              </div>

              {/* P Node */}
              <div className={`p-2 border rounded transition-all ml-4 ${checkMatch("p-node", ["p"], ["text"]) ? "border-sky-500 bg-sky-500/5" : "border-slate-800 text-slate-400 bg-slate-950/20"}`}>
                <span className="text-[10px] font-bold text-slate-500 block mb-1">&lt;p class="text"&gt;</span>
                <span className="text-xs text-slate-300">Standard Paragraph Content</span>
                <span className="text-[10px] font-bold text-slate-500 block mt-1">&lt;/p&gt;</span>
              </div>
            </div>

            <span className="text-[10px] font-bold text-slate-500 block mt-2">&lt;/div&gt;</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   3. POSITIONING SANDBOX
   ========================================================================== */
function PositioningSandbox({ config }: { config?: any }) {
  const [position, setPosition] = useState("absolute");
  const [parentPosition, setParentPosition] = useState("relative");
  const [top, setTop] = useState(10);
  const [left, setLeft] = useState(10);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="positioning-sandbox">
      {/* Controls */}
      <div className="lg:col-span-5 space-y-4 bg-slate-950/40 p-4 rounded-xl border border-slate-800" id="positioning-controls">
        <h5 className="text-xs font-bold font-mono text-slate-400 tracking-wider uppercase border-b border-slate-800 pb-2">Coordinates Engine</h5>

        {/* Target Position Select */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1.5">target.position</label>
          <div className="grid grid-cols-3 gap-1.5">
            {["relative", "absolute", "fixed", "sticky"].map((pos) => (
              <button 
                key={pos}
                onClick={() => setPosition(pos)}
                className={`text-[10px] py-1.5 px-1 rounded font-mono border transition-all ${position === pos ? "bg-sky-500/20 text-sky-400 border-sky-500" : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800"}`}>
                {pos}
              </button>
            ))}
          </div>
        </div>

        {/* Parent Position */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1.5">parent.position</label>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => setParentPosition("static")}
              className={`text-xs py-1.5 px-3 rounded-lg font-mono border transition-all ${parentPosition === "static" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500" : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800"}`}>
              static
            </button>
            <button 
              onClick={() => setParentPosition("relative")}
              className={`text-xs py-1.5 px-3 rounded-lg font-mono border transition-all ${parentPosition === "relative" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500" : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800"}`}>
              relative
            </button>
          </div>
        </div>

        {/* Offsets */}
        <div className="space-y-4 pt-2">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-sky-400">top</span>
              <span>{top}px</span>
            </div>
            <input type="range" min="-30" max="80" value={top} onChange={(e) => setTop(Number(e.target.value))} className="w-full accent-sky-500" />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-sky-400">left</span>
              <span>{left}px</span>
            </div>
            <input type="range" min="-30" max="80" value={left} onChange={(e) => setLeft(Number(e.target.value))} className="w-full accent-sky-500" />
          </div>
        </div>
      </div>

      {/* Visual Workspace */}
      <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950 p-5 rounded-xl border border-slate-800 min-h-[300px] relative" id="positioning-visual-workspace">
        <div>
          <span className="text-xs text-sky-400 font-mono block mb-1">Positioning Coordinates Workspace</span>
          <p className="text-[10px] text-slate-500">
            {position === "absolute" && parentPosition === "static" 
              ? "⚡ Since Parent is static, absolute Target tracks coordinates relative to outer black border (the initial viewport container)!" 
              : position === "absolute" && parentPosition === "relative" 
              ? "✅ Target absolute positioning coordinates anchor perfectly within parent borders!"
              : `Target positioned ${position} is rendered relative to normal flow.`}
          </p>
        </div>

        {/* Sandbox viewport representation */}
        <div className="w-full h-[220px] bg-slate-900 rounded-lg border border-slate-850 p-4 relative overflow-hidden flex items-center justify-center mt-3" id="positioning-sandbox-viewport">
          {/* Parent Element */}
          <div 
            className="w-[180px] h-[120px] border border-dashed border-emerald-500 rounded bg-emerald-500/5 relative flex items-center justify-center text-center transition-all"
            style={{ position: parentPosition as any }}>
            <span className="absolute top-1 left-2 text-[8px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Parent ({parentPosition})</span>

            {/* Target Element */}
            <div 
              className="w-[75px] h-[45px] bg-sky-500/20 border border-sky-400 rounded flex flex-col items-center justify-center font-mono text-sky-200 shadow-lg text-[10px] select-none transition-all z-10"
              style={{ 
                position: position as any, 
                top: `${top}px`, 
                left: `${left}px` 
              }}>
              <span className="font-bold">Target</span>
              <span>{position}</span>
            </div>

            <span className="text-[10px] text-slate-500 pointer-events-none select-none">Static sibling block</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   4. Z-INDEX & STACKING CONTEXT SANDBOX
   ========================================================================== */
function ZIndexSandbox({ config }: { config?: any }) {
  const [parentAZIndex, setParentAZIndex] = useState(1);
  const [parentBZIndex, setParentBZIndex] = useState(2);
  const [childAZIndex, setChildAZIndex] = useState(999);
  const [childBZIndex, setChildBZIndex] = useState(1);
  const [isIsolated, setIsIsolated] = useState(true);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="zindex-sandbox">
      {/* Controls */}
      <div className="lg:col-span-5 space-y-4 bg-slate-950/40 p-4 rounded-xl border border-slate-800" id="zindex-controls">
        <h5 className="text-xs font-bold font-mono text-slate-400 tracking-wider uppercase border-b border-slate-800 pb-2">Stacking Context Engine</h5>

        {/* Parent A / B Controls */}
        <div className="space-y-3">
          <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
            <span className="text-xs font-bold text-amber-400 font-mono block mb-2">PARENT A (Orange)</span>
            <div className="flex items-center justify-between">
              <label className="text-[10px] text-slate-400">z-index</label>
              <input type="number" value={parentAZIndex} onChange={(e) => setParentAZIndex(Number(e.target.value))} className="w-14 text-xs bg-slate-950 border border-slate-800 px-2 py-1 rounded text-center text-slate-200" />
            </div>
            <div className="flex items-center justify-between mt-2 border-t border-slate-850 pt-2">
              <span className="text-[10px] text-slate-400">child-a.z-index</span>
              <input type="number" value={childAZIndex} onChange={(e) => setChildAZIndex(Number(e.target.value))} className="w-14 text-xs bg-slate-950 border border-slate-800 px-2 py-1 rounded text-center text-slate-200" />
            </div>
          </div>

          <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
            <span className="text-xs font-bold text-emerald-400 font-mono block mb-2">PARENT B (Green)</span>
            <div className="flex items-center justify-between">
              <label className="text-[10px] text-slate-400">z-index</label>
              <input type="number" value={parentBZIndex} onChange={(e) => setParentBZIndex(Number(e.target.value))} className="w-14 text-xs bg-slate-950 border border-slate-800 px-2 py-1 rounded text-center text-slate-200" />
            </div>
            <div className="flex items-center justify-between mt-2 border-t border-slate-850 pt-2">
              <span className="text-[10px] text-slate-400">child-b.z-index</span>
              <input type="number" value={childBZIndex} onChange={(e) => setChildBZIndex(Number(e.target.value))} className="w-14 text-xs bg-slate-950 border border-slate-800 px-2 py-1 rounded text-center text-slate-200" />
            </div>
          </div>
        </div>

        {/* Create Stacking Context Trigger */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-850">
          <div className="text-xs">
            <span className="block font-medium text-slate-300">Isolate Parent A</span>
            <span className="text-[9px] text-slate-500 block font-mono">(opacity: 0.99 stacking context)</span>
          </div>
          <button 
            onClick={() => setIsIsolated(!isIsolated)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${isIsolated ? "bg-sky-500/20 text-sky-400 border-sky-500" : "bg-slate-900 text-slate-500 border-slate-800 hover:bg-slate-850"}`}>
            {isIsolated ? "ACTIVE" : "DISABLED"}
          </button>
        </div>
      </div>

      {/* Visual Workspace */}
      <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950 p-5 rounded-xl border border-slate-800 min-h-[300px]" id="zindex-visual-workspace">
        <div>
          <span className="text-xs text-sky-400 font-mono block mb-1">Stacking Layer Perspective</span>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            {isIsolated 
              ? "⚠️ Since Parent A is isolated, Child A is locked inside. No matter how high its z-index is (even 999!), it cannot render in front of Parent B / Child B because Parent A has a lower z-index!"
              : "✅ Without Stacking Context isolation on Parent A, children z-indexes are evaluated directly against each other."}
          </p>
        </div>

        {/* Card Stacking Area */}
        <div className="w-full h-[200px] bg-slate-900 rounded-lg border border-slate-850 relative flex items-center justify-center overflow-hidden" id="z-index-workspace-stage">
          {/* Parent A */}
          <div 
            className="w-[140px] h-[100px] border border-amber-500/50 bg-amber-500/10 rounded-lg absolute flex flex-col justify-between p-2 shadow-2xl transition-all"
            style={{ 
              zIndex: parentAZIndex,
              opacity: isIsolated ? 0.99 : 1,
              transform: "translate(-30px, -20px)"
            }}>
            <span className="text-[8px] font-mono font-bold text-amber-400 uppercase tracking-wide">Parent A (z-index: {parentAZIndex})</span>
            
            {/* Child A */}
            <div 
              className="w-[90px] h-[45px] bg-orange-500 border border-orange-400 rounded shadow-md flex flex-col justify-center items-center text-[10px] text-white font-mono z-10 self-end transition-all"
              style={{ zIndex: childAZIndex }}>
              <span className="font-bold">Child A</span>
              <span>z-index: {childAZIndex}</span>
            </div>
          </div>

          {/* Parent B */}
          <div 
            className="w-[140px] h-[100px] border border-emerald-500/50 bg-emerald-500/10 rounded-lg absolute flex flex-col justify-between p-2 shadow-2xl transition-all"
            style={{ 
              zIndex: parentBZIndex,
              transform: "translate(30px, 20px)"
            }}>
            <span className="text-[8px] font-mono font-bold text-emerald-400 uppercase tracking-wide">Parent B (z-index: {parentBZIndex})</span>
            
            {/* Child B */}
            <div 
              className="w-[90px] h-[45px] bg-emerald-500 border border-emerald-400 rounded shadow-md flex flex-col justify-center items-center text-[10px] text-white font-mono transition-all"
              style={{ zIndex: childBZIndex }}>
              <span className="font-bold">Child B</span>
              <span>z-index: {childBZIndex}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   5. FLEXBOX SANDBOX
   ========================================================================== */
function FlexboxSandbox({ config }: { config?: any }) {
  const [direction, setDirection] = useState("row");
  const [justify, setJustify] = useState("space-between");
  const [align, setAlign] = useState("center");
  const [gap, setGap] = useState(16);
  const [grow, setGrow] = useState(false);
  const [flexBasis, setFlexBasis] = useState("auto");

  // Sync questions preset
  useEffect(() => {
    if (config?.mainAxis) {
      setJustify(config.mainAxis);
    }
    if (config?.crossAxis) {
      setAlign(config.crossAxis);
    }
  }, [config]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="flexbox-sandbox">
      {/* Controls */}
      <div className="lg:col-span-5 space-y-4 bg-slate-950/40 p-4 rounded-xl border border-slate-800 text-xs" id="flexbox-controls">
        <h5 className="text-xs font-bold font-mono text-slate-400 tracking-wider uppercase border-b border-slate-800 pb-2">Flexbox Layout Controller</h5>

        {/* Direction */}
        <div>
          <label className="text-slate-350 font-semibold block mb-1">flex-direction</label>
          <div className="grid grid-cols-2 gap-1.5 font-mono">
            {["row", "column"].map((dir) => (
              <button 
                key={dir}
                onClick={() => setDirection(dir)}
                className={`py-1.5 rounded border text-[10px] uppercase transition-all ${direction === dir ? "bg-sky-500/20 text-sky-400 border-sky-500" : "bg-slate-900 border-slate-800 hover:bg-slate-850 text-slate-400"}`}>
                {dir}
              </button>
            ))}
          </div>
        </div>

        {/* Justify Content */}
        <div>
          <label className="text-slate-350 font-semibold block mb-1">justify-content</label>
          <select 
            value={justify} 
            onChange={(e) => setJustify(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 font-mono text-slate-300">
            <option value="flex-start">flex-start (aligns left)</option>
            <option value="center">center</option>
            <option value="flex-end">flex-end</option>
            <option value="space-between">space-between</option>
            <option value="space-around">space-around</option>
          </select>
        </div>

        {/* Align Items */}
        <div>
          <label className="text-slate-350 font-semibold block mb-1">align-items</label>
          <select 
            value={align} 
            onChange={(e) => setAlign(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 font-mono text-slate-300">
            <option value="stretch">stretch</option>
            <option value="center">center</option>
            <option value="flex-start">flex-start</option>
            <option value="flex-end">flex-end</option>
          </select>
        </div>

        {/* Gap slider */}
        <div>
          <div className="flex justify-between font-mono mb-1 text-[10px]">
            <span>gap</span>
            <span>{gap}px</span>
          </div>
          <input type="range" min="0" max="40" value={gap} onChange={(e) => setGap(Number(e.target.value))} className="w-full accent-sky-500" />
        </div>

        {/* Grow Option */}
        <div className="flex items-center justify-between border-t border-slate-850 pt-3">
          <div>
            <span className="block font-semibold">flex-grow: 1 (equal division)</span>
            <span className="text-[9px] text-slate-500 block font-mono">Bypasses initial items size</span>
          </div>
          <button 
            onClick={() => setGrow(!grow)}
            className={`px-3 py-1 text-xs rounded border font-mono transition-all ${grow ? "bg-emerald-500/20 text-emerald-400 border-emerald-500" : "bg-slate-900 text-slate-500 border-slate-800"}`}>
            {grow ? "ON" : "OFF"}
          </button>
        </div>
      </div>

      {/* Visual Workspace */}
      <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950 p-5 rounded-xl border border-slate-800 min-h-[300px]" id="flexbox-visual-workspace">
        <div>
          <span className="text-xs text-sky-400 font-mono block mb-1">Flex Container Viewport</span>
          <p className="text-[10px] text-slate-500">Elements layout horizontally (rows) or vertically (columns), dynamically adjusting space.</p>
        </div>

        {/* Visual representation */}
        <div 
          className="w-full h-[220px] bg-slate-900 rounded-lg border border-slate-850 p-4 transition-all"
          style={{ 
            display: "flex", 
            flexDirection: direction as any,
            justifyContent: justify as any,
            alignItems: align as any,
            gap: `${gap}px`
          }}>
          {/* Flex Items */}
          {[1, 2, 3].map((num) => (
            <div 
              key={num} 
              className={`border rounded-lg p-3 text-center font-mono font-bold text-xs select-none transition-all flex items-center justify-center ${grow ? "bg-sky-500/20 text-sky-400 border-sky-400" : "bg-slate-950 border-slate-800 text-slate-400"}`}
              style={{ 
                flexGrow: grow ? 1 : 0,
                flexShrink: 1,
                flexBasis: flexBasis,
                height: align === "stretch" && direction === "row" ? "100%" : num === 1 ? "40px" : num === 2 ? "65px" : "50px",
                width: direction === "column" && align === "stretch" ? "100%" : "60px"
              }}>
              Item {num}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   6. GRID SANDBOX
   ========================================================================== */
function GridSandbox({ config }: { config?: any }) {
  const [columns, setColumns] = useState("repeat(3, 1fr)");
  const [autoFlow, setAutoFlow] = useState("row");
  const [gap, setGap] = useState(12);
  const [spanItem, setSpanItem] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="grid-sandbox">
      {/* Controls */}
      <div className="lg:col-span-5 space-y-4 bg-slate-950/40 p-4 rounded-xl border border-slate-800 text-xs" id="grid-controls">
        <h5 className="text-xs font-bold font-mono text-slate-400 tracking-wider uppercase border-b border-slate-800 pb-2">Grid Layout controller</h5>

        {/* Columns Setup */}
        <div>
          <label className="text-slate-350 font-semibold block mb-1">grid-template-columns</label>
          <select 
            value={columns} 
            onChange={(e) => setColumns(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 font-mono text-slate-300">
            <option value="repeat(3, 1fr)">repeat(3, 1fr)</option>
            <option value="1fr 2fr 1fr">1fr 2fr 1fr</option>
            <option value="100px 1fr 1fr">100px 1fr 1fr</option>
          </select>
        </div>

        {/* Auto Flow */}
        <div>
          <label className="text-slate-350 font-semibold block mb-1">grid-auto-flow</label>
          <select 
            value={autoFlow} 
            onChange={(e) => setAutoFlow(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 font-mono text-slate-300">
            <option value="row">row (standard)</option>
            <option value="column">column</option>
            <option value="row dense">row dense</option>
          </select>
        </div>

        {/* Gap */}
        <div>
          <div className="flex justify-between font-mono mb-1 text-[10px]">
            <span>gap</span>
            <span>{gap}px</span>
          </div>
          <input type="range" min="4" max="24" value={gap} onChange={(e) => setGap(Number(e.target.value))} className="w-full accent-sky-500" />
        </div>

        {/* Custom Spans */}
        <div className="flex items-center justify-between border-t border-slate-850 pt-3">
          <div>
            <span className="block font-semibold">Span Item 1 (grid-column: span 2)</span>
            <span className="text-[9px] text-slate-500 block font-mono">Forces layout adaptation</span>
          </div>
          <button 
            onClick={() => setSpanItem(!spanItem)}
            className={`px-3 py-1 text-xs rounded border font-mono transition-all ${spanItem ? "bg-emerald-500/20 text-emerald-400 border-emerald-500" : "bg-slate-900 text-slate-500 border-slate-800"}`}>
            {spanItem ? "ACTIVE" : "OFF"}
          </button>
        </div>
      </div>

      {/* Visual Workspace */}
      <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950 p-5 rounded-xl border border-slate-800 min-h-[300px]" id="grid-visual-workspace">
        <div>
          <span className="text-xs text-sky-400 font-mono block mb-1">Grid 2D blueprint Board</span>
          <p className="text-[10px] text-slate-500">Calculates intersecting tracks across rows and columns dynamically.</p>
        </div>

        {/* Grid Container */}
        <div 
          className="w-full h-[220px] bg-slate-900 rounded-lg border border-slate-850 p-4 transition-all"
          style={{ 
            display: "grid", 
            gridTemplateColumns: columns,
            gridAutoFlow: autoFlow,
            gap: `${gap}px`,
            gridAutoRows: "45px"
          }}>
          {/* Grid Items */}
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div 
              key={num} 
              className={`border border-slate-800 rounded-lg p-2 flex flex-col items-center justify-center font-mono text-[10px] font-bold shadow-inner transition-all select-none ${num === 1 && spanItem ? "bg-sky-500/20 text-sky-400 border-sky-400" : "bg-slate-950 text-slate-500"}`}
              style={{ 
                gridColumn: num === 1 && spanItem ? "span 2" : "auto"
              }}>
              <span>Item {num}</span>
              {num === 1 && spanItem && <span className="text-[8px] text-sky-500">span 2</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   7. VARIABLES & CALC SANDBOX
   ========================================================================== */
function VariablesSandbox({ config }: { config?: any }) {
  const [primaryColor, setPrimaryColor] = useState("#3b82f6");
  const [padding, setPadding] = useState(16);
  const [borderRadius, setBorderRadius] = useState(12);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="variables-sandbox">
      {/* Controls */}
      <div className="lg:col-span-5 space-y-4 bg-slate-950/40 p-4 rounded-xl border border-slate-800 text-xs" id="variables-controls">
        <h5 className="text-xs font-bold font-mono text-slate-400 tracking-wider uppercase border-b border-slate-800 pb-2">CSS Custom Properties</h5>

        {/* Variable 1 */}
        <div>
          <label className="text-slate-350 font-semibold block mb-1">--primary-color</label>
          <div className="flex gap-2">
            <input 
              type="color" 
              value={primaryColor} 
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-8 h-8 rounded border border-slate-800 cursor-pointer bg-transparent"
            />
            <input 
              type="text" 
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 rounded px-2 font-mono text-xs text-slate-300"
            />
          </div>
        </div>

        {/* Variable 2 */}
        <div>
          <div className="flex justify-between font-mono mb-1 text-[10px]">
            <span>--padding</span>
            <span>{padding}px</span>
          </div>
          <input type="range" min="8" max="28" value={padding} onChange={(e) => setPadding(Number(e.target.value))} className="w-full accent-sky-500" />
        </div>

        {/* Variable 3 */}
        <div>
          <div className="flex justify-between font-mono mb-1 text-[10px]">
            <span>--border-radius</span>
            <span>{borderRadius}px</span>
          </div>
          <input type="range" min="0" max="24" value={borderRadius} onChange={(e) => setBorderRadius(Number(e.target.value))} className="w-full accent-sky-500" />
        </div>

        {/* Live CSS block */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[10px] text-slate-400" id="variables-css-preview">
          <span className="text-[9px] text-slate-500 uppercase font-bold block mb-1.5">Live Style Rule compiles:</span>
          <div>:root &#123;</div>
          <div className="pl-4 text-sky-400">--primary-color: {primaryColor};</div>
          <div className="pl-4 text-emerald-400">--padding: {padding}px;</div>
          <div className="pl-4 text-amber-400">--border-radius: {borderRadius}px;</div>
          <div>&#125;</div>
          <div className="mt-2 text-slate-500">/* calc() Formula applied: */</div>
          <div className="text-purple-400">padding: calc(var(--padding) * 1.5);</div>
        </div>
      </div>

      {/* Visual Workspace */}
      <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950 p-5 rounded-xl border border-slate-800 min-h-[300px]" id="variables-visual-workspace">
        <div>
          <span className="text-xs text-sky-400 font-mono block mb-1">Live Theme Render</span>
          <p className="text-[10px] text-slate-500">Variables are live parameters rendering the components on screen.</p>
        </div>

        {/* Render Card */}
        <div className="w-full flex items-center justify-center p-6 bg-slate-900 rounded-lg border border-slate-850 mt-3" id="variable-card-holder">
          <div 
            className="w-full max-w-[240px] bg-slate-950 border border-slate-800 shadow-2xl relative transition-all"
            style={{ 
              borderRadius: `${borderRadius}px`,
              padding: `${padding * 1.5}px` // Applying mock calc Formula!
            }}>
            {/* Header Tag with dynamic background color */}
            <div 
              className="text-[9px] uppercase font-bold px-2 py-0.5 rounded text-white inline-block mb-3 transition-all"
              style={{ backgroundColor: primaryColor }}>
              Interactive Card
            </div>
            <h6 className="text-sm font-bold text-slate-200 mb-1">Dynamic Stylesheet</h6>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              This block reads borders, paddings, and header colors directly from variables!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   8. RESPONSIVE & CONTAINER QUERIES SANDBOX
   ========================================================================== */
function ResponsiveSandbox({ config }: { config?: any }) {
  const [containerWidth, setContainerWidth] = useState(480);
  const [queryType, setQueryType] = useState("container"); // container vs media

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="responsive-sandbox">
      {/* Controls */}
      <div className="lg:col-span-5 space-y-4 bg-slate-950/40 p-4 rounded-xl border border-slate-800 text-xs" id="responsive-controls">
        <h5 className="text-xs font-bold font-mono text-slate-400 tracking-wider uppercase border-b border-slate-800 pb-2">Queries Inspector</h5>

        {/* Query Type selector */}
        <div>
          <label className="text-slate-350 font-semibold block mb-1.5">Query Paradigm</label>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => setQueryType("media")}
              className={`text-xs py-1.5 px-3 rounded-lg font-mono border transition-all ${queryType === "media" ? "bg-amber-500/20 text-amber-400 border-amber-500" : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850"}`}>
              @media (Viewport)
            </button>
            <button 
              onClick={() => setQueryType("container")}
              className={`text-xs py-1.5 px-3 rounded-lg font-mono border transition-all ${queryType === "container" ? "bg-sky-500/20 text-sky-400 border-sky-500" : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850"}`}>
              @container (Local)
            </button>
          </div>
        </div>

        {/* Resizer Slider */}
        <div>
          <div className="flex justify-between font-mono mb-1 text-[10px]">
            <span>Simulated Parent Container Width</span>
            <span className="text-sky-400 font-bold">{containerWidth}px</span>
          </div>
          <input 
            type="range" 
            min="260" 
            max="560" 
            value={containerWidth} 
            onChange={(e) => setContainerWidth(Number(e.target.value))} 
            className="w-full accent-sky-500" 
          />
        </div>

        {/* Explain Card */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[10px] text-slate-400 leading-relaxed font-mono">
          {queryType === "container" 
            ? "💡 Container Queries trigger layout changes strictly based on parent sizes. Squeeze parent size and the card automatically switches to vertical list mode!" 
            : "❌ Media queries ignore parent widths, meaning the component cannot adapt locally if placed inside narrow sidebars unless viewports resize!"}
        </div>
      </div>

      {/* Visual Workspace */}
      <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950 p-5 rounded-xl border border-slate-800 min-h-[300px]" id="responsive-visual-workspace">
        <div>
          <span className="text-xs text-sky-400 font-mono block mb-1">Queries Sandboxed Viewport</span>
          <p className="text-[10px] text-slate-500">Drag or slide parent dimensions to watch responsive behaviors trigger.</p>
        </div>

        {/* Parent Box resizer container */}
        <div className="w-full flex justify-center py-4 relative" id="responsive-interactive-container">
          <div 
            className="border-2 border-dashed border-slate-700 bg-slate-900/40 p-4 rounded-xl transition-all relative"
            style={{ width: `${containerWidth}px` }}>
            <span className="absolute top-1 left-2 text-[8px] font-mono text-slate-500">PARENT CONTAINER: {containerWidth}px</span>

            {/* Simulated Responsive Component */}
            <div className={`mt-3 border rounded-xl p-3 transition-all bg-slate-950 ${containerWidth > 420 && queryType === "container" ? "flex items-center gap-4 border-sky-500/55 bg-sky-500/5" : "border-slate-800"}`}>
              {/* Photo placeholder */}
              <div className={`aspect-video bg-slate-800 rounded-lg flex items-center justify-center font-mono text-[9px] text-slate-500 transition-all ${containerWidth > 420 && queryType === "container" ? "w-28 h-16 shrink-0 mb-0" : "w-full mb-3"}`}>
                [IMG]
              </div>
              
              <div className="flex-1 text-left">
                <div className="text-[9px] font-mono font-bold text-sky-400 mb-0.5">CONTAINER BREAKPOINT: 420px</div>
                <h6 className="text-xs font-bold text-slate-200">Responsive Item</h6>
                <p className="text-[10px] text-slate-400 mt-1">
                  {containerWidth > 420 && queryType === "container" ? "Grid rows are aligned horizontally." : "Content is stacked vertically due to small size."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   9. SIZING & FONT UNITS SANDBOX
   ========================================================================== */
function FontUnitsSandbox({ config }: { config?: any }) {
  const [rootSize, setRootSize] = useState(config?.rootSize || 16);
  const [parentSize, setParentSize] = useState(1.2); // in em
  const [useCompounding, setUseCompounding] = useState(false);

  useEffect(() => {
    if (config?.activeTab === "compounding-test") {
      setUseCompounding(true);
    }
  }, [config]);

  // Calculations
  const parentPx = rootSize * parentSize;
  const childEmPx = parentPx * 1.2;
  const childRemPx = rootSize * 1.2;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="font-units-sandbox">
      {/* Controls */}
      <div className="lg:col-span-5 space-y-4 bg-slate-950/40 p-4 rounded-xl border border-slate-800 text-xs" id="font-units-controls">
        <h5 className="text-xs font-bold font-mono text-slate-400 tracking-wider uppercase border-b border-slate-800 pb-2">Font Sizing Core</h5>

        {/* Root html font size */}
        <div>
          <div className="flex justify-between font-mono mb-1 text-[10px]">
            <span>Root Font Size (html)</span>
            <span className="text-sky-400">{rootSize}px</span>
          </div>
          <input type="range" min="12" max="24" value={rootSize} onChange={(e) => setRootSize(Number(e.target.value))} className="w-full accent-sky-500" />
        </div>

        {/* Parent font size in em */}
        <div>
          <div className="flex justify-between font-mono mb-1 text-[10px]">
            <span>Parent Font Size (body)</span>
            <span className="text-sky-400">{parentSize}em ({parentPx.toFixed(1)}px)</span>
          </div>
          <input type="range" min="0.8" max="1.8" step="0.1" value={parentSize} onChange={(e) => setParentSize(Number(e.target.value))} className="w-full accent-sky-500" />
        </div>

        {/* Highlight display */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2 font-mono text-[10px]" id="font-units-calculations">
          <span className="text-[9px] text-slate-500 uppercase font-bold block">Compiling mathematical scale:</span>
          
          <div className="flex justify-between border-b border-slate-850 pb-1.5">
            <span className="text-amber-400">Child (1.2em):</span>
            <strong className="text-amber-400">{childEmPx.toFixed(1)}px</strong>
          </div>
          <p className="text-[9px] text-slate-500 pl-2">Formula: parent ({parentPx}px) * 1.2 = {childEmPx.toFixed(1)}px (compounds dynamically!)</p>

          <div className="flex justify-between border-b border-slate-850 pb-1.5 pt-1">
            <span className="text-emerald-400">Child (1.2rem):</span>
            <strong className="text-emerald-400">{childRemPx.toFixed(1)}px</strong>
          </div>
          <p className="text-[9px] text-slate-500 pl-2">Formula: root ({rootSize}px) * 1.2 = {childRemPx.toFixed(1)}px (rem stays flat and constant!)</p>
        </div>
      </div>

      {/* Visual Workspace */}
      <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950 p-5 rounded-xl border border-slate-800 min-h-[300px]" id="font-units-visual-workspace">
        <div>
          <span className="text-xs text-sky-400 font-mono block mb-1">Compounding visual nest</span>
          <p className="text-[10px] text-slate-500">Nest size elements to watch cascading font scaling compound.</p>
        </div>

        {/* Visual blocks nested */}
        <div className="w-full bg-slate-900 border border-slate-850 p-4 rounded-xl flex flex-col gap-3 relative mt-3" id="font-units-playground-viewport">
          <div className="border border-slate-800 rounded bg-slate-950/45 p-3">
            <span className="text-[9px] font-mono text-slate-500 uppercase block">Parent Scope ({parentSize}em)</span>
            
            <div className="grid grid-cols-2 gap-4 mt-2">
              {/* EM Box */}
              <div className="border border-amber-500/30 rounded p-2.5 bg-amber-500/5">
                <span className="text-[8px] font-mono text-amber-400 block mb-1.5">font-size: 1.2em</span>
                <span className="font-bold text-slate-200 block" style={{ fontSize: `${childEmPx}px` }}>EM TEXT</span>
                <span className="text-[10px] text-slate-400 mt-1 block">Compounded</span>
              </div>

              {/* REM Box */}
              <div className="border border-emerald-500/30 rounded p-2.5 bg-emerald-500/5">
                <span className="text-[8px] font-mono text-emerald-400 block mb-1.5">font-size: 1.2rem</span>
                <span className="font-bold text-slate-200 block" style={{ fontSize: `${childRemPx}px` }}>REM TEXT</span>
                <span className="text-[10px] text-slate-400 mt-1 block">Constant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   10. TRANSITIONS & ANIMATIONS PERFORMANCE SANDBOX
   ========================================================================== */
function TransitionsSandbox({ config }: { config?: any }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [perfMode, setPerfMode] = useState("optimized"); // unoptimized vs optimized

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="transitions-sandbox">
      {/* Controls */}
      <div className="lg:col-span-5 space-y-4 bg-slate-950/40 p-4 rounded-xl border border-slate-800 text-xs" id="transitions-controls">
        <h5 className="text-xs font-bold font-mono text-slate-400 tracking-wider uppercase border-b border-slate-800 pb-2">Animation Performance</h5>

        {/* Toggle Mode */}
        <div>
          <label className="text-slate-350 font-semibold block mb-1.5">Optimization Profile</label>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => { setPerfMode("unoptimized"); setIsPlaying(false); }}
              className={`text-xs py-1.5 px-3 rounded-lg font-mono border transition-all ${perfMode === "unoptimized" ? "bg-red-500/20 text-red-400 border-red-500" : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850"}`}>
              Unoptimized (width/top)
            </button>
            <button 
              onClick={() => { setPerfMode("optimized"); setIsPlaying(false); }}
              className={`text-xs py-1.5 px-3 rounded-lg font-mono border transition-all ${perfMode === "optimized" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500" : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850"}`}>
              Optimized (transform/opacity)
            </button>
          </div>
        </div>

        {/* Trigger */}
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-full bg-sky-500 hover:bg-sky-600 text-slate-950 py-2 rounded-lg font-bold font-mono transition-all text-center uppercase tracking-wider block">
          {isPlaying ? "STOP ANIMATION" : "START ANIMATION"}
        </button>

        {/* Browser rendering pipeline checks */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[9px] space-y-1.5 text-slate-400">
          <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Browser Pipeline Audit</span>
          <div className="flex justify-between">
            <span>1. Style Recalculate:</span>
            <span className="text-emerald-400">✓ Done</span>
          </div>
          <div className="flex justify-between">
            <span>2. Layout (Reflow):</span>
            <span>{perfMode === "unoptimized" ? "⚠️ TRASH (Forces heavy math)" : "✓ Bypassed (GPU Handled)"}</span>
          </div>
          <div className="flex justify-between">
            <span>3. Paint (Repaint):</span>
            <span>{perfMode === "unoptimized" ? "⚠️ EXHAUSTING (Redraws pixels)" : "✓ Bypassed (GPU Handled)"}</span>
          </div>
          <div className="flex justify-between">
            <span>4. Composite:</span>
            <span className="text-emerald-400">✓ GPU Composited</span>
          </div>
        </div>
      </div>

      {/* Visual Workspace */}
      <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950 p-5 rounded-xl border border-slate-800 min-h-[300px]" id="transitions-visual-workspace">
        <div>
          <span className="text-xs text-sky-400 font-mono block mb-1">FPS Render Stage</span>
          <p className="text-[10px] text-slate-500">Unoptimized properties trigger browser reflow loops, generating visual lags on slow devices.</p>
        </div>

        {/* Animated Object container */}
        <div className="w-full h-[180px] bg-slate-900 border border-slate-850 rounded-lg relative overflow-hidden flex items-center justify-center mt-3" id="transitions-play-stage">
          {perfMode === "optimized" ? (
            /* Optimized Animation using Transforms */
            <motion.div 
              animate={isPlaying ? { scale: 1.4, opacity: 0.5, y: -20 } : { scale: 1, opacity: 1, y: 0 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", repeatType: "reverse" }}
              className="w-16 h-16 rounded-xl bg-gradient-to-tr from-emerald-400 to-sky-500 flex items-center justify-center text-xs font-mono font-bold text-slate-950 select-none shadow-xl border border-white/20">
              GPU
            </motion.div>
          ) : (
            /* Unoptimized Animation altering Width/Top */
            <motion.div 
              animate={isPlaying ? { width: 140, height: 140, marginTop: -30 } : { width: 64, height: 64, marginTop: 0 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", repeatType: "reverse" }}
              className="bg-gradient-to-tr from-red-500 to-orange-500 flex items-center justify-center text-xs font-mono font-bold text-white select-none shadow-xl rounded-xl border border-white/10"
              style={{ width: 64, height: 64 }}>
              CPU
            </motion.div>
          )}

          {/* Performance Warning Overlays */}
          {isPlaying && (
            <div className={`absolute top-2 right-2 px-2.5 py-1 rounded text-[9px] font-mono font-bold animate-pulse ${perfMode === "optimized" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>
              {perfMode === "optimized" ? "60 FPS (Silky Smooth)" : "CPU REFLOWING GRID"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   11. LOGICAL VS PHYSICAL PROPERTIES SANDBOX
   ========================================================================== */
function LogicalPropertiesSandbox({ config }: { config?: any }) {
  const [writingMode, setWritingMode] = useState("horizontal-tb"); // horizontal-tb, vertical-rl
  const [useLogical, setUseLogical] = useState(true);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="logical-sandbox">
      {/* Controls */}
      <div className="lg:col-span-5 space-y-4 bg-slate-950/40 p-4 rounded-xl border border-slate-800 text-xs" id="logical-controls">
        <h5 className="text-xs font-bold font-mono text-slate-400 tracking-wider uppercase border-b border-slate-800 pb-2">Writing Mode Mapper</h5>

        {/* Writing Mode select */}
        <div>
          <label className="text-slate-350 font-semibold block mb-1.5">writing-mode</label>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => setWritingMode("horizontal-tb")}
              className={`text-xs py-1.5 px-3 rounded-lg font-mono border transition-all ${writingMode === "horizontal-tb" ? "bg-sky-500/20 text-sky-400 border-sky-500" : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850"}`}>
              horizontal-tb
            </button>
            <button 
              onClick={() => setWritingMode("vertical-rl")}
              className={`text-xs py-1.5 px-3 rounded-lg font-mono border transition-all ${writingMode === "vertical-rl" ? "bg-sky-500/20 text-sky-400 border-sky-500" : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850"}`}>
              vertical-rl
            </button>
          </div>
        </div>

        {/* Logical vs Physical styling toggle */}
        <div>
          <label className="text-slate-350 font-semibold block mb-1.5">Property Model</label>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => setUseLogical(true)}
              className={`text-xs py-1.5 px-3 rounded-lg font-mono border transition-all ${useLogical ? "bg-emerald-500/20 text-emerald-400 border-emerald-500" : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850"}`}>
              Logical Property
            </button>
            <button 
              onClick={() => setUseLogical(false)}
              className={`text-xs py-1.5 px-3 rounded-lg font-mono border transition-all ${!useLogical ? "bg-red-500/20 text-red-400 border-red-500" : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850"}`}>
              Physical Property
            </button>
          </div>
        </div>

        {/* Live CSS Compiling */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[9px] text-slate-400">
          <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Applied style rules:</span>
          {useLogical ? (
            <div className="text-emerald-400">
              margin-inline-start: 24px;<br />
              padding-block-end: 12px;
            </div>
          ) : (
            <div className="text-red-400">
              margin-left: 24px;<br />
              padding-bottom: 12px;
            </div>
          )}
        </div>
      </div>

      {/* Visual Workspace */}
      <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950 p-5 rounded-xl border border-slate-800 min-h-[300px]" id="logical-visual-workspace">
        <div>
          <span className="text-xs text-sky-400 font-mono block mb-1">Live Language Mapping Space</span>
          <p className="text-[10px] text-slate-500">Logical properties adapt margins and paddings dynamically when changing from horizontal lines to vertical lines!</p>
        </div>

        {/* Physical vs Logical Visual Representation */}
        <div className="w-full bg-slate-900 border border-slate-850 rounded-xl p-4 flex items-center justify-center mt-3" id="logical-stage">
          <div className="border border-slate-800 rounded bg-slate-950 p-4 max-w-sm transition-all relative">
            {/* Writing container */}
            <div 
              style={{ writingMode: writingMode as any }}
              className="text-xs text-slate-300 font-serif leading-relaxed h-[120px] transition-all">
              <div 
                className="inline-block transition-all bg-sky-500/10 border border-sky-400/30 rounded p-1"
                style={{
                  marginInlineStart: useLogical ? "24px" : "0",
                  paddingBlockEnd: useLogical ? "12px" : "0",
                  marginLeft: !useLogical ? "24px" : "0",
                  paddingBottom: !useLogical ? "12px" : "0"
                }}>
                <span className="font-sans font-bold text-sky-400 block mb-1">[HIGHLIGHTED CELL]</span>
                This block offsets automatically when changing writing orientation under Logical Properties!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   12. OBJECT-FIT & ASPECT-RATIO SANDBOX
   ========================================================================== */
function ObjectFitSandbox({ config }: { config?: any }) {
  const [objectFit, setObjectFit] = useState(config?.fitMode || "cover");
  const [aspectRatio, setAspectRatio] = useState(config?.aspectRatio || "16:9");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="objectfit-sandbox">
      {/* Controls */}
      <div className="lg:col-span-5 space-y-4 bg-slate-950/40 p-4 rounded-xl border border-slate-800 text-xs" id="objectfit-controls">
        <h5 className="text-xs font-bold font-mono text-slate-400 tracking-wider uppercase border-b border-slate-800 pb-2">Image Cropper</h5>

        {/* Object Fit select */}
        <div>
          <label className="text-slate-350 font-semibold block mb-1.5">object-fit</label>
          <select 
            value={objectFit} 
            onChange={(e) => setObjectFit(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 font-mono text-slate-300">
            <option value="cover">cover (crops cleanly)</option>
            <option value="contain">contain (letterbox margins)</option>
            <option value="fill">fill (stretches elements)</option>
            <option value="none">none (actual image pixels)</option>
          </select>
        </div>

        {/* Aspect Ratio select */}
        <div>
          <label className="text-slate-350 font-semibold block mb-1.5">aspect-ratio</label>
          <select 
            value={aspectRatio} 
            onChange={(e) => setAspectRatio(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 font-mono text-slate-300">
            <option value="16 / 9">16 / 9 (wide screen)</option>
            <option value="4 / 3">4 / 3 (standard photo)</option>
            <option value="1 / 1">1 / 1 (square card)</option>
            <option value="2 / 3">2 / 3 (vertical poster)</option>
          </select>
        </div>

        {/* Explanatory blocks */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[10px] text-slate-400 leading-relaxed font-mono">
          {objectFit === "cover" 
            ? "💡 Cover crops the sides of the image to perfectly fill boundaries without distortion!" 
            : objectFit === "fill" 
            ? "⚠️ Fill forces pixels to stretch into aspect boundaries, distorting visual curves!" 
            : "✓ Contain shrinks and expands image lines until everything fits within boundaries without cropping."}
        </div>
      </div>

      {/* Visual Workspace */}
      <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950 p-5 rounded-xl border border-slate-800 min-h-[300px]" id="objectfit-visual-workspace">
        <div>
          <span className="text-xs text-sky-400 font-mono block mb-1">Aspect Cropping Window</span>
          <p className="text-[10px] text-slate-500">Image scales fluidly inside a bounding container reserving proportions.</p>
        </div>

        {/* Outer Frame */}
        <div className="w-full flex items-center justify-center py-4 bg-slate-900 border border-slate-850 rounded-xl mt-3" id="object-fit-playground-frame">
          <div 
            className="w-full max-w-[280px] bg-slate-950 border border-slate-800 rounded-lg overflow-hidden flex items-center justify-center shadow-xl transition-all relative"
            style={{ aspectRatio: aspectRatio.replace(/\s+/g, "") }}>
            
            <img 
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop" 
              alt="Test Sea View" 
              className="w-full h-full block transition-all"
              style={{ objectFit: objectFit as any }}
              referrerPolicy="no-referrer"
            />
            
            <div className="absolute bottom-2 left-2 bg-slate-950/80 border border-slate-800 px-2 py-0.5 rounded text-[8px] font-mono text-slate-400 uppercase tracking-wide">
              {aspectRatio} image frame
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
