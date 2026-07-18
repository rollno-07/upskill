/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, RefreshCw, Layers, Eye, ShieldAlert, CheckCircle, 
  Settings, HelpCircle, Phone, Monitor, Search, ChevronRight,
  Code, Sliders, Volume2, Move, AlertTriangle, ArrowRight, Layout, Info
} from 'lucide-react';

interface VisualizerProps {
  visualId: string;
  visualDescription: string;
  questionId: number;
}

export default function Visualizer({ visualId, visualDescription, questionId }: VisualizerProps) {
  const [resetKey, setResetKey] = useState(0);

  // Trigger a state reset whenever questionId changes
  useEffect(() => {
    setResetKey(prev => prev + 1);
  }, [questionId]);

  return (
    <div key={resetKey} className="w-full h-full flex flex-col bg-[#0e0e0e] border border-white/10 rounded-lg overflow-hidden">
      {/* Header Banner */}
      <div className="px-4 py-2 bg-white/5 border-b border-white/10 flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#E0FF4F] flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5" />
          Interactive Concept Simulator
        </span>
        <span className="text-[9px] font-mono uppercase opacity-50 bg-white/10 px-1.5 py-0.5 rounded">
          ID: {visualId}
        </span>
      </div>

      {/* Description text */}
      <div className="p-4 bg-white/2 text-xs text-white/70 border-b border-white/5 flex items-start gap-2">
        <Info className="w-4 h-4 text-[#E0FF4F] shrink-0 mt-0.5" />
        <p>{visualDescription}</p>
      </div>

      {/* Interactive visual canvas container */}
      <div className="flex-1 p-4 sm:p-6 flex flex-col justify-center items-center overflow-y-auto relative min-h-[250px] w-full">
        {renderVisualizer(visualId)}
      </div>
    </div>
  );
}

// Visualizer Dispatcher
function renderVisualizer(id: string) {
  switch (id) {
    case 'html-basics-diagram':
      return <HTMLBasicsTree />;
    case 'doctype-visualizer':
      return <DoctypeVisualizer />;
    case 'tag-vs-element':
      return <TagVsElementAnatomy />;
    case 'div-vs-span-demo':
      return <DivVsSpanDemo />;
    case 'script-loading-timeline':
      return <ScriptLoadingTimeline />;
    case 'get-vs-post-visualizer':
      return <GetVsPostVisualizer />;
    case 'srcset-viewport-calculator':
      return <SrcsetViewportCalculator />;
    case 'lazy-scroll-timeline':
      return <LazyScrollTimeline />;
    case 'innerhtml-vs-textcontent':
      return <InnerHTMLVsTextContent />;
    case 'xss-attack-simulation':
      return <XSSAttackSimulation />;
    case 'og-card-generator':
      return <OGCardGenerator />;
    case 'css-specificity-pyramid':
      return <CSSSpecificityPyramid />;
    case 'web-house-builder':
      return <WebHouseBuilder />;
    case 'tabnabbing-visualizer':
      return <TabnabbingVisualizer />;
    case 'viewport-width-simulator':
      return <ViewportWidthSimulator />;
    case 'block-vs-inline-playground':
      return <BlockVsInlinePlayground />;
    case 'form-inputs-showroom':
      return <FormInputsShowroom />;
    case 'validation-playground':
      return <ValidationPlayground />;
    case 'table-structure-builder':
      return <TableStructureBuilder />;
    case 'picture-art-direction':
      return <PictureArtDirection />;
    case 'canvas-doodle-pad':
      return <CanvasDoodlePad />;
    case 'svg-vs-canvas-zoomer':
      return <SvgVsCanvasZoomer />;
    case 'entities-translator-deck':
      return <EntitiesTranslatorDeck />;
    case 'div-clicker-simulator':
      return <DivClickerSimulator />;
    case 'aria-inspector-tool':
      return <AriaInspectorTool />;
    case 'first-rule-aria':
      return <FirstRuleAriaInspector />;
    case 'heading-tree-builder':
      return <HeadingTreeBuilder />;
    case 'seo-audit-report':
      return <SeoAuditReport />;
    default:
      return <FallbackVisualizer id={id} />;
  }
}

// 1. Fallback / Adaptive Visualizer
function FallbackVisualizer({ id }: { id: string }) {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { name: "Parser Input", desc: "HTML source code tokenizer parses incoming text streams into semantic tags." },
    { name: "Tree Construction", desc: "The engine links parent nodes, resolving layout hierarchies." },
    { name: "Visual Paint", desc: "Rasterizer paints nodes with computed layout metrics inside the viewport." }
  ];

  return (
    <div className="w-full max-w-sm space-y-4 text-center">
      <div className="text-[10px] font-mono text-[#E0FF4F] uppercase tracking-widest">Aesthetic Concept Mapping</div>
      <div className="relative w-40 h-40 mx-auto">
        <svg viewBox="0 0 100 100" className="w-full h-full animate-pulse">
          <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
          <polygon points="50,15 80,75 20,75" fill="none" stroke="#E0FF4F" strokeWidth="1.5" />
          <circle cx="50" cy="15" r="4" fill={activeStep === 0 ? "#E0FF4F" : "white"} />
          <circle cx="80" cy="75" r="4" fill={activeStep === 1 ? "#E0FF4F" : "white"} />
          <circle cx="20" cy="75" r="4" fill={activeStep === 2 ? "#E0FF4F" : "white"} />
          <path d="M 50 50 L 50 15 M 50 50 L 80 75 M 50 50 L 20 75" stroke="white" strokeWidth="0.5" opacity="0.2" />
        </svg>
      </div>
      <div className="grid grid-cols-3 gap-1 bg-white/5 p-1 rounded border border-white/10 text-[9px] font-mono">
        {steps.map((step, idx) => (
          <button 
            key={idx}
            onClick={() => setActiveStep(idx)}
            className={`py-1 rounded text-center transition-all ${activeStep === idx ? 'bg-[#E0FF4F] text-black font-semibold' : 'opacity-50 hover:opacity-100 text-white'}`}
          >
            STEP {idx + 1}
          </button>
        ))}
      </div>
      <div className="p-3 bg-white/5 rounded border border-white/5 text-left text-xs min-h-[64px]">
        <div className="font-semibold text-white/90 mb-0.5">{steps[activeStep].name}</div>
        <div className="text-white/60 text-[11px] leading-relaxed">{steps[activeStep].desc}</div>
      </div>
    </div>
  );
}

// 2. HTML Basics Tree
function HTMLBasicsTree() {
  const [selectedNode, setSelectedNode] = useState<string | null>("html");
  const nodeInfo: { [key: string]: { tag: string; role: string; desc: string } } = {
    html: { tag: "<html>", role: "Root Document Container", desc: "Represents the supreme boundary of an HTML document. All other elements nest inside it." },
    head: { tag: "<head>", role: "Metadata Subtree", desc: "Houses document definitions not visible to readers, such as script tags, styles, and viewport meta markers." },
    body: { tag: "<body>", role: "Render Viewport Container", desc: "Contains all readable text, images, buttons, and blocks visible in the client browser frame." },
    h1: { tag: "<h1>", role: "Primary Heading Element", desc: "Marks the absolute highest semantic title block, indexing primary document search topics." },
    p: { tag: "<p>", role: "Text Paragraph block", desc: "Groups lines of text flow into a block container with default vertical paragraph margins." }
  };

  return (
    <div className="w-full max-w-md flex flex-col md:flex-row gap-4 items-center justify-center">
      {/* Visual DOM Tree graph */}
      <div className="space-y-2 border border-white/10 p-4 rounded bg-white/2 shrink-0 w-full md:w-48 text-xs font-mono">
        <div 
          onClick={() => setSelectedNode("html")}
          className={`p-1.5 rounded cursor-pointer transition ${selectedNode === "html" ? 'bg-[#E0FF4F] text-black font-semibold' : 'hover:bg-white/5'}`}
        >
          📁 html
        </div>
        <div className="pl-4 border-l border-white/10 space-y-2">
          <div 
            onClick={() => setSelectedNode("head")}
            className={`p-1.5 rounded cursor-pointer transition ${selectedNode === "head" ? 'bg-[#E0FF4F] text-black font-semibold' : 'hover:bg-white/5'}`}
          >
            📁 head
          </div>
          <div 
            onClick={() => setSelectedNode("body")}
            className={`p-1.5 rounded cursor-pointer transition ${selectedNode === "body" ? 'bg-[#E0FF4F] text-black font-semibold' : 'hover:bg-white/5'}`}
          >
            📁 body
          </div>
          <div className="pl-4 border-l border-white/10 space-y-1">
            <div 
              onClick={() => setSelectedNode("h1")}
              className={`p-1.5 rounded cursor-pointer transition ${selectedNode === "h1" ? 'bg-[#E0FF4F] text-black font-semibold' : 'hover:bg-white/5'}`}
            >
              📄 h1 (Heading)
            </div>
            <div 
              onClick={() => setSelectedNode("p")}
              className={`p-1.5 rounded cursor-pointer transition ${selectedNode === "p" ? 'bg-[#E0FF4F] text-black font-semibold' : 'hover:bg-white/5'}`}
            >
              📄 p (Paragraph)
            </div>
          </div>
        </div>
      </div>

      {/* Selected Node Details */}
      <div className="flex-1 p-4 bg-white/5 border border-white/10 rounded space-y-2 text-left">
        <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
          <span className="font-mono text-sm text-[#E0FF4F] font-bold">{nodeInfo[selectedNode || "html"].tag}</span>
          <span className="text-[10px] uppercase font-mono text-white/40">{nodeInfo[selectedNode || "html"].role}</span>
        </div>
        <p className="text-xs text-white/80 leading-relaxed">
          {nodeInfo[selectedNode || "html"].desc}
        </p>
      </div>
    </div>
  );
}

// 3. DOCTYPE Visualizer
function DoctypeVisualizer() {
  const [standardsMode, setStandardsMode] = useState(true);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-white/50">Rendering Engine Mode:</span>
        <button 
          onClick={() => setStandardsMode(!standardsMode)}
          className="px-3 py-1 text-xs font-mono rounded border transition bg-[#E0FF4F] text-black border-[#E0FF4F] hover:bg-black hover:text-[#E0FF4F]"
        >
          {standardsMode ? "Standards Mode" : "Quirks Mode"}
        </button>
      </div>

      <div className="relative border border-white/10 p-4 rounded bg-black flex flex-col items-center justify-center min-h-[160px]">
        {standardsMode ? (
          <div className="w-full max-w-xs p-4 border-2 border-[#E0FF4F] bg-white/5 rounded text-center space-y-2 transition-all">
            <span className="text-xs font-mono text-[#E0FF4F] font-bold">Standard Layout</span>
            <p className="text-[11px] text-white/70">
              CSS boxes render with strict standard sizing algorithms. Margins and borders map exactly to specification.
            </p>
          </div>
        ) : (
          <div className="w-full max-w-xs p-8 border-8 border-red-500/80 bg-red-950/20 text-center space-y-1 transition-all animate-shake">
            <span className="text-xs font-mono text-red-400 font-bold">Quirks Mode (Legacy)</span>
            <p className="text-[10px] text-white/60">
              Rendering breaks box sizing bounds, collapsing margins and shifting alignment to mimic Internet Explorer 5 specs!
            </p>
          </div>
        )}
      </div>

      <div className="p-3 bg-white/5 border border-white/10 rounded text-left">
        <span className="text-[10px] font-mono text-[#E0FF4F] uppercase tracking-wider block mb-1">Impact Analysis</span>
        <p className="text-[11px] text-white/60 leading-relaxed">
          {standardsMode 
            ? "Tells browsers to use strict modern CSS specifications. Everything aligns perfectly with modern styling patterns." 
            : "Without DOCTYPE, browsers fall back to rendering models from 1999, causing padding calculations to stretch incorrectly."
          }
        </p>
      </div>
    </div>
  );
}

// 4. Tag vs Element Anatomy
function TagVsElementAnatomy() {
  const [activeHighlight, setActiveHighlight] = useState<string | null>("element");

  const highlights: { [key: string]: { name: string; desc: string; cls: string } } = {
    element: {
      name: "The Complete Element",
      desc: "The entire collection of node code, encompassing opening tags, classes, nested contents, and ending tags.",
      cls: "border-[#E0FF4F] text-[#E0FF4F] bg-[#E0FF4F]/5"
    },
    opentag: {
      name: "Opening Tag (<p ...>)",
      desc: "Declares where the element boundary begins and hosts custom attributes.",
      cls: "text-blue-400 bg-blue-950/20"
    },
    attribute: {
      name: "Attribute (class=\"text\")",
      desc: "Key-value pair configured inside the tag providing auxiliary details like design hooks.",
      cls: "text-purple-400 bg-purple-950/20"
    },
    content: {
      name: "Inner Content / Children",
      desc: "The actual nested payloads (text or other elements) residing inside the element bounds.",
      cls: "text-orange-400 bg-orange-950/20"
    },
    closetag: {
      name: "Closing Tag (</p>)",
      desc: "An angled bracket container housing a slash to safely close parsing operations.",
      cls: "text-teal-400 bg-teal-950/20"
    }
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      {/* Code Interactive Display */}
      <div className="p-6 bg-black rounded border border-white/10 text-center font-mono text-base tracking-wide leading-relaxed relative">
        <div className={`p-2 border transition rounded ${activeHighlight === 'element' ? highlights.element.cls : 'border-transparent'}`}>
          <span 
            onMouseEnter={() => setActiveHighlight("opentag")}
            onMouseLeave={() => setActiveHighlight("element")}
            className={`cursor-pointer transition px-1 rounded ${activeHighlight === 'opentag' ? highlights.opentag.cls : ''}`}
          >
            &lt;p 
            <span 
              onMouseEnter={(e) => { e.stopPropagation(); setActiveHighlight("attribute"); }}
              onMouseLeave={() => setActiveHighlight("opentag")}
              className={`cursor-pointer transition px-1 rounded font-bold ${activeHighlight === 'attribute' ? highlights.attribute.cls : ''}`}
            >
              {" "}class="intro"
            </span>
            &gt;
          </span>
          <span 
            onMouseEnter={() => setActiveHighlight("content")}
            onMouseLeave={() => setActiveHighlight("element")}
            className={`cursor-pointer transition px-1 rounded ${activeHighlight === 'content' ? highlights.content.cls : ''}`}
          >
            Hello Web!
          </span>
          <span 
            onMouseEnter={() => setActiveHighlight("closetag")}
            onMouseLeave={() => setActiveHighlight("element")}
            className={`cursor-pointer transition px-1 rounded ${activeHighlight === 'closetag' ? highlights.closetag.cls : ''}`}
          >
            &lt;/p&gt;
          </span>
        </div>
      </div>

      {/* Anatomy Detail Card */}
      {activeHighlight && (
        <div className={`p-4 rounded border transition duration-300 ${highlights[activeHighlight].cls.split(' ')[0]} border-white/20 bg-white/5 text-left`}>
          <div className="font-mono text-xs font-bold mb-1 uppercase tracking-wider">{highlights[activeHighlight].name}</div>
          <p className="text-[11px] text-white/80 leading-relaxed">{highlights[activeHighlight].desc}</p>
        </div>
      )}
    </div>
  );
}

// 5. Div vs Span Layout Demonstration
function DivVsSpanDemo() {
  const [useDiv, setUseDiv] = useState(true);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-white/50">Element Wrap Type:</span>
        <div className="flex rounded border border-white/10 overflow-hidden text-xs font-mono">
          <button 
            onClick={() => setUseDiv(true)}
            className={`px-3 py-1 transition-all ${useDiv ? 'bg-[#E0FF4F] text-black font-bold' : 'opacity-60 hover:opacity-100 text-white'}`}
          >
            Div (Block)
          </button>
          <button 
            onClick={() => setUseDiv(false)}
            className={`px-3 py-1 transition-all ${!useDiv ? 'bg-[#E0FF4F] text-black font-bold' : 'opacity-60 hover:opacity-100 text-white'}`}
          >
            Span (Inline)
          </button>
        </div>
      </div>

      <div className="border border-white/10 p-4 rounded bg-black min-h-[140px] text-xs leading-relaxed text-left space-y-3">
        <p className="text-white/40 border-b border-white/5 pb-1 text-[10px] uppercase font-mono">Simulated Viewport Rendering</p>
        <div>
          <span>This is text preceding our element. </span>
          {useDiv ? (
            <div className="my-2 p-2 border border-blue-500 bg-blue-950/20 text-blue-400 font-bold rounded">
              I am a &lt;div&gt; block wrapper element!
            </div>
          ) : (
            <span className="mx-1 px-1.5 py-0.5 border border-purple-500 bg-purple-950/20 text-purple-400 font-bold rounded">
              I am a &lt;span&gt; inline element!
            </span>
          )}
          <span> This is text continuing directly after our element.</span>
        </div>
      </div>

      <div className="p-3 bg-white/5 border border-white/10 rounded text-left text-[11px] text-white/60 leading-relaxed">
        {useDiv ? (
          <p>
            <strong className="text-[#E0FF4F]">Block Behavior:</strong> The Div forces itself onto a clean line, pushing all surrounding elements away and expanding to fill 100% of the available layout width.
          </p>
        ) : (
          <p>
            <strong className="text-[#E0FF4F]">Inline Behavior:</strong> The Span wraps neatly alongside the standard flow of content, occupying only the precise size necessary to contain its inner text.
          </p>
        )}
      </div>
    </div>
  );
}

// 6. Script Loading Timeline (async/defer)
function ScriptLoadingTimeline() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeType, setActiveType] = useState<'normal' | 'async' | 'defer'>('normal');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return p + 2;
        });
      }, 50);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const resetTimeline = () => {
    setProgress(0);
    setIsPlaying(false);
  };

  const tracks = {
    normal: {
      parse1: [0, 30],
      download: [30, 65],
      execute: [65, 80],
      parse2: [80, 100]
    },
    async: {
      parse: [0, 50], // interrupted
      download: [0, 40],
      execute: [40, 55],
      resumeParse: [55, 100]
    },
    defer: {
      parse: [0, 75],
      download: [0, 50],
      execute: [75, 100]
    }
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-white/50">Load Configuration:</span>
        <div className="flex rounded border border-white/10 overflow-hidden text-xs font-mono">
          {(['normal', 'async', 'defer'] as const).map(type => (
            <button
              key={type}
              onClick={() => { setActiveType(type); resetTimeline(); }}
              className={`px-2.5 py-1 transition-all capitalize ${activeType === type ? 'bg-[#E0FF4F] text-black font-bold' : 'opacity-60 hover:opacity-100 text-white'}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="border border-white/10 p-4 rounded bg-black space-y-4 text-xs font-mono text-left">
        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-full bg-white/10 text-[#E0FF4F] hover:bg-white/20 transition"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button 
            onClick={resetTimeline}
            className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <div className="flex-1 h-1.5 bg-white/10 rounded overflow-hidden">
            <div className="h-full bg-[#E0FF4F] transition-all duration-75" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Tracks representation */}
        <div className="space-y-3 relative py-2">
          {/* Vertical dynamic scan line */}
          <div className="absolute top-0 bottom-0 w-[1px] bg-[#E0FF4F] z-10" style={{ left: `${progress}%` }}></div>

          {/* HTML Parsing Track */}
          <div>
            <div className="text-[10px] text-white/40 mb-1">HTML Parsing</div>
            <div className="h-4 bg-white/5 rounded overflow-hidden relative">
              {activeType === 'normal' && (
                <>
                  <div className="absolute top-0 bottom-0 bg-blue-500/80" style={{ left: '0%', width: '30%' }}></div>
                  <div className="absolute top-0 bottom-0 bg-blue-500/80" style={{ left: '80%', width: '20%' }}></div>
                </>
              )}
              {activeType === 'async' && (
                <>
                  <div className="absolute top-0 bottom-0 bg-blue-500/80" style={{ left: '0%', width: '40%' }}></div>
                  <div className="absolute top-0 bottom-0 bg-blue-500/80" style={{ left: '55%', width: '45%' }}></div>
                </>
              )}
              {activeType === 'defer' && (
                <div className="absolute top-0 bottom-0 bg-blue-500/80" style={{ left: '0%', width: '75%' }}></div>
              )}
            </div>
          </div>

          {/* Script Download Track */}
          <div>
            <div className="text-[10px] text-white/40 mb-1">Script Network Download</div>
            <div className="h-4 bg-white/5 rounded overflow-hidden relative">
              {activeType === 'normal' && (
                <div className="absolute top-0 bottom-0 bg-yellow-500/50" style={{ left: '30%', width: '35%' }}></div>
              )}
              {activeType === 'async' && (
                <div className="absolute top-0 bottom-0 bg-yellow-500/50" style={{ left: '0%', width: '40%' }}></div>
              )}
              {activeType === 'defer' && (
                <div className="absolute top-0 bottom-0 bg-yellow-500/50" style={{ left: '0%', width: '50%' }}></div>
              )}
            </div>
          </div>

          {/* Script Execution Track */}
          <div>
            <div className="text-[10px] text-white/40 mb-1">Script Execution</div>
            <div className="h-4 bg-white/5 rounded overflow-hidden relative">
              {activeType === 'normal' && (
                <div className="absolute top-0 bottom-0 bg-red-500/80 animate-pulse" style={{ left: '65%', width: '15%' }}></div>
              )}
              {activeType === 'async' && (
                <div className="absolute top-0 bottom-0 bg-red-500/80 animate-pulse" style={{ left: '40%', width: '15%' }}></div>
              )}
              {activeType === 'defer' && (
                <div className="absolute top-0 bottom-0 bg-red-500/80 animate-pulse" style={{ left: '75%', width: '25%' }}></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 7. GET vs POST Form submission visualizer
function GetVsPostVisualizer() {
  const [method, setMethod] = useState<'GET' | 'POST'>('GET');
  const [nameInput, setNameInput] = useState('Alice');
  const [passInput, setPassInput] = useState('secret123');

  return (
    <div className="w-full max-w-sm space-y-4 text-xs">
      <div className="flex items-center justify-between">
        <span className="font-mono text-white/50">Form Submission Method:</span>
        <div className="flex rounded border border-white/10 overflow-hidden font-mono">
          <button 
            onClick={() => setMethod('GET')}
            className={`px-3 py-1 ${method === 'GET' ? 'bg-[#E0FF4F] text-black font-bold' : 'opacity-60 text-white'}`}
          >
            GET
          </button>
          <button 
            onClick={() => setMethod('POST')}
            className={`px-3 py-1 ${method === 'POST' ? 'bg-[#E0FF4F] text-black font-bold' : 'opacity-60 text-white'}`}
          >
            POST
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-left">
        <div>
          <label className="text-[10px] font-mono text-white/40 block mb-1">username</label>
          <input 
            type="text" 
            value={nameInput} 
            onChange={(e) => setNameInput(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white font-mono"
          />
        </div>
        <div>
          <label className="text-[10px] font-mono text-white/40 block mb-1">password</label>
          <input 
            type="password" 
            value={passInput} 
            onChange={(e) => setPassInput(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white font-mono"
          />
        </div>
      </div>

      {/* Result mapping */}
      <div className="p-4 bg-black rounded border border-white/10 font-mono text-left space-y-3">
        <div>
          <span className="text-[10px] text-[#E0FF4F] uppercase tracking-wider block mb-1">Compiled HTTP Request</span>
          <div className="bg-white/5 p-2 rounded text-[10px] whitespace-pre overflow-x-auto text-blue-300">
            {method === 'GET' ? (
              <>
                <span className="text-yellow-400">GET</span> /api/login?name={encodeURIComponent(nameInput)}&pass={encodeURIComponent(passInput)} HTTP/1.1{"\n"}
                Host: google.aistudio.com{"\n"}
                User-Agent: Client-Agent{"\n"}
                Accept: */*
              </>
            ) : (
              <>
                <span className="text-yellow-400">POST</span> /api/login HTTP/1.1{"\n"}
                Host: google.aistudio.com{"\n"}
                Content-Type: application/x-www-form-urlencoded{"\n"}
                Content-Length: {(nameInput.length + passInput.length + 11).toString()}{"\n"}
                {"\n"}
                <span className="text-red-300">name={nameInput}&pass={passInput}</span>
              </>
            )}
          </div>
        </div>

        <div className="text-[11px] text-white/60 leading-normal">
          {method === 'GET' 
            ? "⚠️ WARNING: Sensitive inputs like passwords are leaked directly into the browser path logs, URLs, and referral metrics!" 
            : "✅ SECURE: Password characters are packaged safely inside the request payload body, invisible in URLs."
          }
        </div>
      </div>
    </div>
  );
}

// 8. Srcset Viewport and Device Pixel Density Calculator
function SrcsetViewportCalculator() {
  const [viewportWidth, setViewportWidth] = useState(800);
  const [dpr, setDpr] = useState<1 | 2 | 3>(2);

  const calculatedPixelWidth = viewportWidth * dpr;

  let selectedAsset = "small-400w.jpg";
  if (calculatedPixelWidth > 1200) {
    selectedAsset = "large-1600w.jpg";
  } else if (calculatedPixelWidth > 600) {
    selectedAsset = "medium-800w.jpg";
  }

  return (
    <div className="w-full max-w-sm space-y-4 font-mono text-xs text-left">
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-white/50">Simulated Screen Width:</span>
          <span className="text-[#E0FF4F]">{viewportWidth}px</span>
        </div>
        <input 
          type="range" 
          min="320" 
          max="1440" 
          value={viewportWidth} 
          onChange={(e) => setViewportWidth(parseInt(e.target.value))}
          className="w-full accent-[#E0FF4F]"
        />
      </div>

      <div>
        <span className="text-white/50 block mb-1">Device Pixel Ratio (DPR / Retina):</span>
        <div className="flex gap-2">
          {([1, 2, 3] as const).map(val => (
            <button
              key={val}
              onClick={() => setDpr(val)}
              className={`flex-1 py-1 rounded border transition ${dpr === val ? 'bg-[#E0FF4F] text-black border-[#E0FF4F]' : 'border-white/10 hover:border-white/30'}`}
            >
              {val}x (Density)
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 bg-black border border-white/10 rounded space-y-2">
        <div className="flex justify-between text-[11px] border-b border-white/5 pb-1">
          <span className="text-white/40">Total Physical Pixels:</span>
          <span className="text-white font-bold">{calculatedPixelWidth}px</span>
        </div>
        <div className="flex justify-between text-[11px] border-b border-white/5 pb-1">
          <span className="text-white/40">Downloaded Graphic Asset:</span>
          <span className="text-[#E0FF4F] font-bold">{selectedAsset}</span>
        </div>
        <div className="text-[10px] text-white/50 leading-relaxed mt-2 pt-1 border-t border-white/5">
          Based on <code>srcset="small.jpg 400w, medium.jpg 800w, large.jpg 1600w"</code>, the browser dynamically matches physical pixel resolution to conserve cell data.
        </div>
      </div>
    </div>
  );
}

// 9. Lazy Scroll Loading Simulator
function LazyScrollTimeline() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const [images, setImages] = useState([
    { id: 1, top: 50, loaded: true, type: "Eager" },
    { id: 2, top: 180, loaded: false, type: "Lazy" },
    { id: 3, top: 320, loaded: false, type: "Lazy" },
    { id: 4, top: 480, loaded: false, type: "Lazy" }
  ]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const progress = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
    setScrollProgress(progress);

    // Trigger visual load events for images entering the viewport area (e.g. height 120px)
    const viewportHeight = 150;
    setImages(prev => prev.map(img => {
      const isVisible = img.top < target.scrollTop + viewportHeight + 40;
      if (isVisible && !img.loaded) {
        return { ...img, loaded: true };
      }
      return img;
    }));
  };

  return (
    <div className="w-full max-w-xs space-y-4">
      <div className="flex justify-between text-[10px] font-mono text-white/40">
        <span>SCROLL DOWN DEVICE</span>
        <span>SCROLL: {Math.round(scrollProgress)}%</span>
      </div>

      {/* Simulated Smartphone Screen */}
      <div className="relative w-full h-[180px] border border-white/20 rounded-xl bg-neutral-950 overflow-hidden flex flex-col">
        {/* Scrollable area */}
        <div 
          ref={containerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-4 space-y-16 scrollbar-thin"
        >
          <div className="text-center font-mono text-[10px] opacity-40 py-2">--- Header Block ---</div>
          
          {images.map(img => (
            <div 
              key={img.id} 
              className={`p-4 border rounded text-left flex items-center justify-between transition-all duration-500 ${img.loaded ? 'bg-[#E0FF4F]/10 border-[#E0FF4F]/30' : 'bg-white/5 border-white/10 border-dashed opacity-40'}`}
              style={{ minHeight: '60px' }}
            >
              <div>
                <div className="text-[10px] font-mono font-bold text-white">Image #{img.id}</div>
                <div className="text-[9px] font-mono opacity-50">Strategy: {img.type}</div>
              </div>
              <div className={`px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider ${img.loaded ? 'bg-[#E0FF4F] text-black font-semibold' : 'bg-white/10 text-white/50 animate-pulse'}`}>
                {img.loaded ? "● Loaded" : "○ Deferring"}
              </div>
            </div>
          ))}
          
          <div className="h-20"></div>
        </div>
      </div>
    </div>
  );
}

// 10. InnerHTML vs TextContent Terminal comparison
function InnerHTMLVsTextContent() {
  const [typedText, setTypedText] = useState('<strong>Hello</strong> world!');

  return (
    <div className="w-full max-w-sm space-y-4 font-mono text-xs text-left">
      <div>
        <label className="text-white/40 text-[10px] uppercase block mb-1">Type HTML or Code Text Input</label>
        <input 
          type="text" 
          value={typedText}
          onChange={(e) => setTypedText(e.target.value)}
          className="w-full bg-white/5 border border-white/15 rounded px-2.5 py-1.5 text-white font-mono focus:border-[#E0FF4F] focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* InnerHTML */}
        <div className="p-3 bg-neutral-900 border border-white/10 rounded space-y-1.5">
          <span className="text-[10px] text-[#E0FF4F] font-bold block border-b border-white/5 pb-1">1. innerHTML</span>
          <div 
            className="text-[11px] p-2 bg-black/50 rounded min-h-[50px] break-words text-white leading-normal"
            dangerouslySetInnerHTML={{ __html: typedText || '&nbsp;' }}
          />
          <span className="text-[8px] text-white/40 block">Parses string characters as interactive HTML tags.</span>
        </div>

        {/* TextContent */}
        <div className="p-3 bg-neutral-900 border border-white/10 rounded space-y-1.5">
          <span className="text-[10px] text-blue-400 font-bold block border-b border-white/5 pb-1">2. textContent</span>
          <div className="text-[11px] p-2 bg-black/50 rounded min-h-[50px] break-words text-white/70 font-mono leading-normal">
            {typedText}
          </div>
          <span className="text-[8px] text-white/40 block">Escapes and prints content as literal, clean text elements.</span>
        </div>
      </div>
    </div>
  );
}

// 11. XSS Security Vulnerability attack simulation
function XSSAttackSimulation() {
  const [userInput, setUserInput] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [isHacked, setIsHacked] = useState(false);

  const handleTest = () => {
    setLogs([]);
    setIsHacked(false);

    if (userInput.includes('<script>') || userInput.includes('onerror') || userInput.includes('onload')) {
      setIsHacked(true);
      setLogs(prev => [
        ...prev,
        "⚠️ PARSING HAZARD: Raw script triggers matched!",
        "💥 BREACH COMPLETED: Client-session tokens stolen!",
        "💀 VULNERABILITY LEVEL: Critical XSS alert."
      ]);
    } else if (userInput.trim() === '') {
      setLogs(["📋 Awaiting valid text strings..."]);
    } else {
      setLogs([
        "✅ INPUT SAFE: Parsed content securely as flat text strings.",
        "🔒 SECURITY STATUS: Clean."
      ]);
    }
  };

  return (
    <div className="w-full max-w-sm space-y-4 font-mono text-xs text-left">
      <div>
        <label className="text-white/40 text-[9px] uppercase block mb-1">Enter profile description comment</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder='e.g. <img src="x" onerror="alert(1)">'
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="flex-1 bg-white/5 border border-white/15 rounded px-2.5 py-1.5 text-white font-mono focus:border-red-500 focus:outline-none"
          />
          <button 
            onClick={handleTest}
            className="px-3 bg-[#E0FF4F] text-black rounded font-bold hover:bg-white"
          >
            Run
          </button>
        </div>
      </div>

      <div className={`p-4 rounded border transition ${isHacked ? 'bg-red-950/20 border-red-500/30' : 'bg-white/5 border-white/10'}`}>
        <div className="flex justify-between border-b border-white/5 pb-1 mb-2 items-center">
          <span className="text-[10px] text-white/40">SIMULATION LOG CONSOLE</span>
          <span className={`px-1 rounded text-[8px] uppercase tracking-widest font-semibold ${isHacked ? 'bg-red-500 text-white animate-pulse' : 'bg-green-600 text-white'}`}>
            {isHacked ? "⚠️ Vulnerable" : "🛡️ Secured"}
          </span>
        </div>
        <div className="space-y-1.5 min-h-[64px]">
          {logs.length > 0 ? (
            logs.map((log, idx) => (
              <div key={idx} className={isHacked ? 'text-red-400' : 'text-green-400'}>{log}</div>
            ))
          ) : (
            <div className="text-white/30 italic">Type a script tag and execute to view warnings...</div>
          )}
        </div>
      </div>
    </div>
  );
}

// 12. Open Graph Link Preview Card Generator
function OGCardGenerator() {
  const [title, setTitle] = useState('HTML5 Masterclasses');
  const [desc, setDesc] = useState('Learn advanced semantic structuring and CSS specifications.');
  const [colorAccent, setColorAccent] = useState('#E0FF4F');

  return (
    <div className="w-full max-w-sm space-y-4 font-mono text-xs text-left">
      <div className="space-y-2">
        <div>
          <label className="text-white/40 text-[9px] block mb-0.5">og:title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-[11px]"
          />
        </div>
        <div>
          <label className="text-white/40 text-[9px] block mb-0.5">og:description</label>
          <input 
            type="text" 
            value={desc} 
            onChange={(e) => setDesc(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-[11px]"
          />
        </div>
      </div>

      {/* Preview Card */}
      <div className="border border-white/15 rounded-lg overflow-hidden bg-neutral-900 shadow-xl">
        <div className="px-3 py-1.5 bg-neutral-800 border-b border-white/5 flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-[8px] text-white/30 pl-2">Social App Preview</span>
        </div>
        
        {/* Dynamic Image block */}
        <div 
          className="h-28 flex flex-col justify-end p-3 relative transition-all"
          style={{ background: `linear-gradient(135deg, ${colorAccent}44, #000000)` }}
        >
          <div className="absolute top-2 right-2 bg-black/60 px-1.5 py-0.5 rounded text-[7px] text-white/50">og:image</div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-black/50 mb-2">
            <Code className="w-4 h-4 text-[#E0FF4F]" />
          </div>
          <span className="text-[8px] uppercase tracking-widest text-[#E0FF4F]">google.aistudio</span>
        </div>

        {/* Text block */}
        <div className="p-3 space-y-1">
          <h4 className="font-sans font-bold text-sm text-white leading-tight break-words">{title}</h4>
          <p className="font-sans text-[11px] text-white/60 leading-normal line-clamp-2">{desc}</p>
        </div>
      </div>
    </div>
  );
}

// 13. CSS Specificity Pyramid calculator
function CSSSpecificityPyramid() {
  const [inlineVal, setInlineVal] = useState(0);
  const [idVal, setIdVal] = useState(1);
  const [classVal, setClassVal] = useState(2);
  const [elementVal, setElementVal] = useState(3);

  const calculateTotal = () => {
    return (inlineVal * 1000) + (idVal * 100) + (classVal * 10) + elementVal;
  };

  return (
    <div className="w-full max-w-sm space-y-4 font-mono text-xs text-left">
      <div className="text-center pb-2 border-b border-white/5">
        <span className="text-[10px] text-white/40 block">SPECIFICITY SCORE CALCULATION</span>
        <div className="text-4xl font-serif text-[#E0FF4F] font-bold mt-1">
          {inlineVal},{idVal},{classVal},{elementVal}
        </div>
      </div>

      <div className="space-y-3">
        {/* 1. Inline */}
        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span>Inline Style (<code>style="..."</code>)</span>
            <span className="text-red-400 font-bold">x1000</span>
          </div>
          <div className="flex gap-2 items-center">
            <input 
              type="range" min="0" max="9" value={inlineVal} 
              onChange={(e) => setInlineVal(parseInt(e.target.value))}
              className="flex-1 accent-red-400"
            />
            <span className="w-4 text-right font-bold text-red-400">{inlineVal}</span>
          </div>
        </div>

        {/* 2. IDs */}
        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span>IDs (<code>#featured-id</code>)</span>
            <span className="text-yellow-400 font-bold">x100</span>
          </div>
          <div className="flex gap-2 items-center">
            <input 
              type="range" min="0" max="9" value={idVal} 
              onChange={(e) => setIdVal(parseInt(e.target.value))}
              className="flex-1 accent-yellow-400"
            />
            <span className="w-4 text-right font-bold text-yellow-400">{idVal}</span>
          </div>
        </div>

        {/* 3. Classes / Attributes */}
        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span>Classes & Attributes (<code>.btn</code>)</span>
            <span className="text-[#E0FF4F] font-bold">x10</span>
          </div>
          <div className="flex gap-2 items-center">
            <input 
              type="range" min="0" max="9" value={classVal} 
              onChange={(e) => setClassVal(parseInt(e.target.value))}
              className="flex-1 accent-[#E0FF4F]"
            />
            <span className="w-4 text-right font-bold text-[#E0FF4F]">{classVal}</span>
          </div>
        </div>

        {/* 4. Elements */}
        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span>Elements & Pseudo-classes (<code>div, p</code>)</span>
            <span className="text-blue-400 font-bold">x1</span>
          </div>
          <div className="flex gap-2 items-center">
            <input 
              type="range" min="0" max="9" value={elementVal} 
              onChange={(e) => setElementVal(parseInt(e.target.value))}
              className="flex-1 accent-blue-400"
            />
            <span className="w-4 text-right font-bold text-blue-400">{elementVal}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 14. Web House Builder - HTML, CSS, JS explanation
function WebHouseBuilder() {
  const [htmlActive, setHtmlActive] = useState(true);
  const [cssActive, setCssActive] = useState(false);
  const [jsActive, setJsActive] = useState(false);

  return (
    <div className="w-full max-w-sm space-y-4 text-xs font-mono text-left">
      <div className="flex gap-2 bg-white/5 p-1 rounded border border-white/10">
        <button 
          onClick={() => setHtmlActive(!htmlActive)}
          className={`flex-1 py-1 rounded text-center transition ${htmlActive ? 'bg-orange-500 text-white font-bold' : 'opacity-40'}`}
        >
          HTML Skeleton
        </button>
        <button 
          onClick={() => setCssActive(!cssActive)}
          className={`flex-1 py-1 rounded text-center transition ${cssActive ? 'bg-blue-500 text-white font-bold' : 'opacity-40'}`}
        >
          CSS Style
        </button>
        <button 
          onClick={() => setJsActive(!jsActive)}
          className={`flex-1 py-1 rounded text-center transition ${jsActive ? 'bg-[#E0FF4F] text-black font-bold' : 'opacity-40'}`}
        >
          JS Action
        </button>
      </div>

      <div className="relative border border-white/10 rounded bg-black min-h-[160px] flex flex-col items-center justify-center p-4">
        {/* House Visual model */}
        <div className="relative w-32 h-28 border-b-2 border-white/20">
          {/* HTML Structure */}
          {htmlActive && (
            <div className="absolute inset-0 border-x border-t border-orange-500/80 transition-all duration-300">
              {/* Roof skeleton outline */}
              <div className="absolute -top-10 left-0 right-0 h-10 border-t border-l border-orange-500/80 rotate-45 origin-bottom-left" style={{ width: '113px' }}></div>
              <div className="absolute -top-10 right-0 left-0 h-10 border-t border-r border-orange-500/80 -rotate-45 origin-bottom-right" style={{ width: '113px' }}></div>
              
              {/* Window box skeleton */}
              <div className="absolute top-4 left-4 w-6 h-6 border border-orange-500/50 flex items-center justify-center text-[8px] text-orange-500 font-bold">Window</div>
              
              {/* Door box skeleton */}
              <div className="absolute bottom-0 right-4 w-8 h-14 border border-orange-500/80 flex items-center justify-center text-[8px] text-orange-500 font-bold">Door</div>
            </div>
          )}

          {/* CSS Design */}
          {cssActive && htmlActive && (
            <div className="absolute inset-0 bg-blue-900/40 border-x border-t-4 border-blue-400 transition-all duration-300">
              {/* Colored styled roof */}
              <div className="absolute -top-[33px] left-[62px] w-0 h-0 border-l-[66px] border-l-transparent border-r-[66px] border-r-transparent border-b-[33px] border-b-blue-500 -translate-x-1/2"></div>
              {/* Colored styled window */}
              <div className="absolute top-4 left-4 w-6 h-6 bg-yellow-200/50 border border-yellow-200 rounded-sm"></div>
              {/* Colored styled door */}
              <div className="absolute bottom-0 right-4 w-8 h-14 bg-amber-700 border-l-2 border-amber-900"></div>
            </div>
          )}

          {/* JS Interactive actions */}
          {jsActive && cssActive && htmlActive && (
            <div className="absolute top-4 left-4 w-6 h-6 bg-yellow-300 border border-yellow-100 rounded-sm shadow-[0_0_15px_#fde047] animate-pulse">
              <span className="absolute text-[6px] text-black font-bold flex items-center justify-center w-full h-full">LIT!</span>
            </div>
          )}
        </div>
      </div>

      <p className="text-[11px] text-white/50 leading-relaxed text-center">
        {!htmlActive 
          ? "⚠️ Add HTML Skeleton first! Without HTML, nothing exists to style or script." 
          : cssActive 
            ? jsActive 
              ? "⚡ Javascript turns on automation: clicking components flips visual states (e.g. windows light up!)" 
              : "🎨 CSS applied: wood paint finishes, roof geometry fills, and shapes layout styled nicely." 
            : "🧱 HTML raw structural nodes: boundaries are defined, but flat, unstyled, and lifeless."
        }
      </p>
    </div>
  );
}

// 15. Tabnabbing Vulnerability visualizer
function TabnabbingVisualizer() {
  const [activeTab, setActiveTab] = useState<'normal' | 'exploit'>('normal');

  return (
    <div className="w-full max-w-sm space-y-4 font-mono text-xs text-left">
      <div className="flex gap-2">
        <button 
          onClick={() => setActiveTab('normal')}
          className={`flex-1 py-1 rounded text-center transition ${activeTab === 'normal' ? 'bg-[#E0FF4F] text-black font-bold' : 'bg-white/5 opacity-50'}`}
        >
          Secure: rel="noopener"
        </button>
        <button 
          onClick={() => setActiveTab('exploit')}
          className={`flex-1 py-1 rounded text-center transition ${activeTab === 'exploit' ? 'bg-red-500 text-white font-bold' : 'bg-white/5 opacity-50'}`}
        >
          Exploit: No rel tags
        </button>
      </div>

      <div className="p-4 bg-black border border-white/10 rounded space-y-3 relative overflow-hidden min-h-[140px]">
        {activeTab === 'normal' ? (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span>Link connection completely decoupled!</span>
            </div>
            <p className="text-[11px] text-white/70 leading-relaxed">
              When <code>rel="noopener"</code> is declared, <code>window.opener</code> inside the spawned target page returns <code>null</code>. The parent window remains completely untrusted and isolated.
            </p>
          </div>
        ) : (
          <div className="space-y-2 animate-shake">
            <div className="flex items-center gap-1.5 text-red-500">
              <AlertTriangle className="w-4 h-4" />
              <span>Reverse Tabnabbing Attack!</span>
            </div>
            <p className="text-[11px] text-white/70 leading-relaxed">
              Without protections, the newly opened window gets direct handle reference back. It executes <code>window.opener.location = 'phishing-clone.html'</code> to hijack the original tab!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// 16. Viewport Width Simulator
function ViewportWidthSimulator() {
  const [mode, setMode] = useState<'mobile' | 'desktop'>('mobile');

  return (
    <div className="w-full max-w-sm space-y-4 text-xs font-mono text-left">
      <div className="flex justify-between items-center">
        <span>Device Viewport:</span>
        <div className="flex rounded border border-white/10 overflow-hidden">
          <button 
            onClick={() => setMode('mobile')}
            className={`px-3 py-1 ${mode === 'mobile' ? 'bg-[#E0FF4F] text-black font-bold' : 'opacity-60 text-white'}`}
          >
            Mobile (360px)
          </button>
          <button 
            onClick={() => setMode('desktop')}
            className={`px-3 py-1 ${mode === 'desktop' ? 'bg-[#E0FF4F] text-black font-bold' : 'opacity-60 text-white'}`}
          >
            Desktop (980px)
          </button>
        </div>
      </div>

      <div className="relative border border-white/10 rounded bg-black min-h-[160px] flex items-center justify-center p-4">
        {mode === 'mobile' ? (
          <div className="w-44 border-2 border-white/30 rounded-xl p-3 bg-neutral-900 shadow-xl space-y-2 text-[10px] leading-tight">
            <div className="flex justify-between items-center border-b border-white/5 pb-1">
              <Phone className="w-3 h-3 text-[#E0FF4F]" />
              <span className="text-[#E0FF4F] text-[8px]">initial-scale=1</span>
            </div>
            <p className="text-white font-sans text-xs font-bold leading-none">Responsive Content</p>
            <p className="text-white/60 text-[9px] font-sans leading-normal">
              Text blocks stack cleanly and adapt directly to vertical scroll patterns. Highly readable.
            </p>
          </div>
        ) : (
          <div className="w-72 border border-white/10 rounded p-2 bg-neutral-900 shadow-xl text-[9px] scale-90 origin-center space-y-1 text-center">
            <div className="flex justify-start gap-1 border-b border-white/5 pb-1">
              <Monitor className="w-3 h-3 text-white/40" />
              <span className="text-white/30 text-[7px]">Simulating unscaled mobile page load</span>
            </div>
            <p className="text-[14px] text-white font-sans font-bold leading-none scale-[0.3] origin-center translate-y-1">TINY DESKTOP TEXT BOX</p>
            <div className="w-full h-8 bg-white/5 rounded-sm flex items-center justify-center text-[7px] text-white/30">
              Users must pinch and zoom to read!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 17. Block vs Inline Playground
function BlockVsInlinePlayground() {
  const [activeTab, setActiveTab] = useState<'block' | 'inline'>('block');

  return (
    <div className="w-full max-w-sm space-y-4 font-mono text-xs text-left">
      <div className="flex justify-between items-center">
        <span>Display Mode:</span>
        <div className="flex rounded border border-white/10 overflow-hidden">
          <button 
            onClick={() => setActiveTab('block')}
            className={`px-3 py-1 ${activeTab === 'block' ? 'bg-[#E0FF4F] text-black font-bold' : 'opacity-60 text-white'}`}
          >
            Block
          </button>
          <button 
            onClick={() => setActiveTab('inline')}
            className={`px-3 py-1 ${activeTab === 'inline' ? 'bg-[#E0FF4F] text-black font-bold' : 'opacity-60 text-white'}`}
          >
            Inline
          </button>
        </div>
      </div>

      <div className="border border-white/10 p-4 rounded bg-black min-h-[140px] flex flex-col justify-center gap-2">
        {activeTab === 'block' ? (
          <div className="space-y-1.5 w-full">
            <div className="p-1.5 border border-blue-500 bg-blue-950/20 text-blue-400 font-bold rounded text-center">
              Element 1 (block)
            </div>
            <div className="p-1.5 border border-blue-500 bg-blue-950/20 text-blue-400 font-bold rounded text-center">
              Element 2 (block)
            </div>
          </div>
        ) : (
          <div className="text-center p-2 border border-purple-500/30 bg-purple-950/10 rounded">
            <span className="mx-1 px-1.5 py-0.5 border border-purple-500 bg-purple-950/20 text-purple-400 font-bold rounded">
              Element 1 (inline)
            </span>
            <span className="mx-1 px-1.5 py-0.5 border border-purple-500 bg-purple-950/20 text-purple-400 font-bold rounded">
              Element 2 (inline)
            </span>
          </div>
        )}
      </div>

      <p className="text-[10px] text-white/50 leading-relaxed text-center">
        {activeTab === 'block' 
          ? "Block elements occupy the entire horizontal line width, stacking sequentially vertically." 
          : "Inline elements sit tightly alongside each other inside the same line, wrapping text flows naturally."
        }
      </p>
    </div>
  );
}

// 18. Form Inputs Showroom
function FormInputsShowroom() {
  const [valEmail, setValEmail] = useState('');
  const [valRange, setValRange] = useState(50);
  const [valColor, setValColor] = useState('#E0FF4F');

  return (
    <div className="w-full max-w-sm space-y-4 font-mono text-xs text-left">
      <div className="space-y-3">
        <div>
          <label className="text-[10px] text-white/40 block mb-1">type="email" validation</label>
          <input 
            type="email" 
            placeholder="user@domain.com"
            value={valEmail}
            onChange={(e) => setValEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-[11px]"
          />
          <div className="text-[9px] text-[#E0FF4F] mt-1">
            Valid format: {valEmail.includes('@') && valEmail.includes('.') ? "✅ Valid" : "❌ Awaiting format"}
          </div>
        </div>

        <div>
          <label className="text-[10px] text-white/40 block mb-1">type="range" slider</label>
          <div className="flex gap-2 items-center">
            <input 
              type="range" 
              min="0" max="100" 
              value={valRange}
              onChange={(e) => setValRange(parseInt(e.target.value))}
              className="flex-1 accent-[#E0FF4F]"
            />
            <span className="w-8 text-right font-bold text-white">{valRange}%</span>
          </div>
        </div>

        <div>
          <label className="text-[10px] text-white/40 block mb-1">type="color" wheel</label>
          <div className="flex gap-3 items-center">
            <input 
              type="color" 
              value={valColor}
              onChange={(e) => setValColor(e.target.value)}
              className="w-10 h-6 bg-transparent border-0 rounded cursor-pointer"
            />
            <span className="font-mono text-[11px] text-white/80">{valColor}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 19. Validation Playground
function ValidationPlayground() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.length < 5) {
      setError('❌ Required length not met: Must be at least 5 characters!');
    } else {
      setError('✅ Form validation passed successfully!');
    }
  };

  return (
    <div className="w-full max-w-sm space-y-4 text-xs font-mono text-left">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="text-[10px] text-white/40 block mb-1">Required Field (MinLength: 5)</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Input text..."
              value={value}
              onChange={(e) => { setValue(e.target.value); setError(''); }}
              className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-[11px] focus:border-[#E0FF4F] focus:outline-none"
            />
            <button 
              type="submit"
              className="px-3 bg-[#E0FF4F] text-black font-bold rounded"
            >
              Verify
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className={`p-3 rounded border text-[11px] ${error.startsWith('❌') ? 'bg-red-950/20 border-red-500/30 text-red-400' : 'bg-green-950/20 border-green-500/30 text-green-400'}`}>
          {error}
        </div>
      )}
    </div>
  );
}

// 20. Table Structure Builder
function TableStructureBuilder() {
  const [highlightPart, setHighlightPart] = useState<string | null>(null);

  return (
    <div className="w-full max-w-sm space-y-4 text-xs font-mono text-left">
      <div className="flex gap-1.5 bg-white/5 p-1 rounded border border-white/10 text-[9px] uppercase font-semibold">
        <button onMouseEnter={() => setHighlightPart('thead')} onMouseLeave={() => setHighlightPart(null)} className={`flex-1 py-1 rounded transition ${highlightPart === 'thead' ? 'bg-[#E0FF4F] text-black' : 'opacity-60'}`}>thead</button>
        <button onMouseEnter={() => setHighlightPart('tbody')} onMouseLeave={() => setHighlightPart(null)} className={`flex-1 py-1 rounded transition ${highlightPart === 'tbody' ? 'bg-[#E0FF4F] text-black' : 'opacity-60'}`}>tbody</button>
        <button onMouseEnter={() => setHighlightPart('tr')} onMouseLeave={() => setHighlightPart(null)} className={`flex-1 py-1 rounded transition ${highlightPart === 'tr' ? 'bg-[#E0FF4F] text-black' : 'opacity-60'}`}>tr (rows)</button>
      </div>

      <div className="border border-white/10 rounded bg-black overflow-hidden">
        <table className="w-full text-left text-[11px]">
          <thead className={`transition ${highlightPart === 'thead' ? 'bg-blue-500/20' : ''}`}>
            <tr className={`border-b border-white/10 ${highlightPart === 'tr' ? 'border-[#E0FF4F] border-b-2' : ''}`}>
              <th className="p-2 text-white/50 uppercase font-mono tracking-wider font-semibold">Heading Col</th>
              <th className="p-2 text-white/50 uppercase font-mono tracking-wider font-semibold">Data Metric</th>
            </tr>
          </thead>
          <tbody className={`divide-y divide-white/5 transition ${highlightPart === 'tbody' ? 'bg-purple-500/20' : ''}`}>
            <tr className={highlightPart === 'tr' ? 'bg-[#E0FF4F]/5' : ''}>
              <td className="p-2 text-white">Record 1</td>
              <td className="p-2 text-white/80">Value Alpha</td>
            </tr>
            <tr className={highlightPart === 'tr' ? 'bg-[#E0FF4F]/5' : ''}>
              <td className="p-2 text-white">Record 2</td>
              <td className="p-2 text-white/80">Value Beta</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-[10px] text-white/50 text-center leading-relaxed">
        Hover element types above to highlight their table hierarchy boundaries in the visual grid.
      </p>
    </div>
  );
}

// 21. Picture Art Direction breakpoints
function PictureArtDirection() {
  const [width, setWidth] = useState(600);

  let activeSource = "fallback.jpg (Default mobile viewport)";
  if (width >= 800) {
    activeSource = "large-desktop.avif (Big screens)";
  } else if (width >= 500) {
    activeSource = "medium-tablet.jpg (Tablet viewport)";
  }

  return (
    <div className="w-full max-w-sm space-y-4 text-xs font-mono text-left">
      <div>
        <div className="flex justify-between items-center mb-1">
          <span>Simulate Viewport Scale:</span>
          <span className="text-[#E0FF4F]">{width}px</span>
        </div>
        <input 
          type="range" min="320" max="1000" value={width}
          onChange={(e) => setWidth(parseInt(e.target.value))}
          className="w-full accent-[#E0FF4F]"
        />
      </div>

      <div className="p-4 bg-black border border-white/10 rounded space-y-3">
        <span className="text-[10px] text-white/40 block">Visual Image Art-Direction Mapping</span>
        <div className="h-16 bg-white/5 rounded border border-white/5 flex items-center justify-center font-bold text-[#E0FF4F] text-center p-2 text-[11px]">
          {activeSource}
        </div>
        <p className="text-[10px] text-white/50 leading-relaxed">
          The browser inspects nested <code>&lt;source media="..."&gt;</code> markers and loads ONLY the matching responsive file.
        </p>
      </div>
    </div>
  );
}

// 22. Canvas Doodle Drawing Pad
function CanvasDoodlePad() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#E0FF4F');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const handleMouseDown = () => setIsDrawing(true);
  const handleMouseUp = () => setIsDrawing(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  return (
    <div className="w-full max-w-sm space-y-4 text-xs font-mono text-left">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {['#E0FF4F', '#ef4444', '#3b82f6'].map(col => (
            <button 
              key={col} 
              onClick={() => setColor(col)}
              className="w-5 h-5 rounded-full border border-white/20 transition-all"
              style={{ backgroundColor: col, outline: color === col ? '2px solid white' : 'none' }}
            />
          ))}
        </div>
        <button 
          onClick={clearCanvas}
          className="px-2 py-0.5 rounded border border-white/10 hover:bg-white/10 transition text-[9px]"
        >
          Clear Grid
        </button>
      </div>

      <canvas 
        ref={canvasRef}
        width={300}
        height={130}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        className="w-full h-[130px] border border-white/10 rounded cursor-crosshair"
      />
    </div>
  );
}

// 23. SVG vs Canvas zooming rendering
function SvgVsCanvasZoomer() {
  const [zoom, setZoom] = useState(1);

  return (
    <div className="w-full max-w-sm space-y-4 text-xs font-mono text-left">
      <div>
        <div className="flex justify-between items-center mb-1">
          <span>Magnify Layout:</span>
          <span className="text-[#E0FF4F]">{zoom}x Zoom</span>
        </div>
        <input 
          type="range" min="1" max="8" step="0.5" value={zoom}
          onChange={(e) => setZoom(parseFloat(e.target.value))}
          className="w-full accent-[#E0FF4F]"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* SVG Graphic */}
        <div className="p-3 bg-neutral-900 border border-white/10 rounded text-center space-y-2">
          <span className="text-[10px] text-white/40 block uppercase">1. Vector (SVG)</span>
          <div className="h-20 bg-black rounded flex items-center justify-center overflow-hidden">
            <svg 
              width="60" height="60" viewBox="0 0 100 100"
              style={{ transform: `scale(${zoom})`, transition: 'transform 100s linear' }}
            >
              <circle cx="50" cy="50" r="40" fill="none" stroke="#E0FF4F" strokeWidth="6" />
            </svg>
          </div>
          <span className="text-[9px] text-[#E0FF4F]">Crisp vector edges!</span>
        </div>

        {/* Canvas Graphic */}
        <div className="p-3 bg-neutral-900 border border-white/10 rounded text-center space-y-2">
          <span className="text-[10px] text-white/40 block uppercase">2. Raster (Canvas)</span>
          <div className="h-20 bg-black rounded flex items-center justify-center overflow-hidden">
            <div 
              className="w-12 h-12 rounded-full border-4 border-blue-400"
              style={{ 
                transform: `scale(${zoom})`,
                imageRendering: 'pixelated',
                transition: 'transform 100s linear'
              }}
            ></div>
          </div>
          <span className="text-[9px] text-blue-300">Edges pixelate & blur!</span>
        </div>
      </div>
    </div>
  );
}

// 24. Entities Translator Deck
function EntitiesTranslatorDeck() {
  const [inputVal, setInputVal] = useState('Safety < First & Next >');

  const escapeHtml = (str: string) => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  return (
    <div className="w-full max-w-sm space-y-4 font-mono text-xs text-left">
      <div>
        <label className="text-white/40 text-[9px] uppercase block mb-1">Raw Markup Content Input</label>
        <input 
          type="text" 
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-white"
        />
      </div>

      <div className="p-3 bg-black border border-white/10 rounded space-y-2">
        <span className="text-[10px] text-white/40 block">Escaped Entity Outcome Code</span>
        <div className="p-2 bg-white/5 rounded text-[#E0FF4F] break-words text-[11px]">
          {escapeHtml(inputVal)}
        </div>
        <p className="text-[10px] text-white/50 leading-relaxed mt-1">
          Converting special tags protects the compiler layout from parsing breakdowns.
        </p>
      </div>
    </div>
  );
}

// 25. Div Clicker vs Button Simulator (Accessibility)
function DivClickerSimulator() {
  const [logs, setLogs] = useState<string[]>([]);

  const handleAction = (type: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] Triggered click event from: ${type}`, ...prev.slice(0, 3)]);
  };

  return (
    <div className="w-full max-w-sm space-y-4 font-mono text-xs text-left">
      <div className="grid grid-cols-2 gap-3">
        {/* Invalid Div */}
        <div className="p-3 bg-neutral-900 border border-white/10 rounded text-center space-y-2">
          <span className="text-[10px] text-red-400 block font-bold">❌ Generic Div</span>
          <div 
            onClick={() => handleAction("Div Tag")}
            className="p-2 bg-white/5 hover:bg-white/10 cursor-pointer rounded text-[11px]"
          >
            Click Me
          </div>
          <span className="text-[8px] text-white/30 block leading-tight">No Tabindex! Inoperable by keyboard users.</span>
        </div>

        {/* Valid Button */}
        <div className="p-3 bg-neutral-900 border border-white/10 rounded text-center space-y-2">
          <span className="text-[10px] text-green-400 block font-bold">✅ Native Button</span>
          <button 
            onClick={() => handleAction("Button Tag")}
            className="w-full p-2 bg-[#E0FF4F] text-black font-bold rounded text-[11px]"
          >
            Click Me
          </button>
          <span className="text-[8px] text-white/30 block leading-tight">Natively focusable and triggers on Space/Enter keys!</span>
        </div>
      </div>

      {/* Trigger Event Log list */}
      <div className="p-3 bg-black border border-white/10 rounded min-h-[64px] space-y-1">
        <span className="text-[9px] text-white/40 uppercase block mb-1">Runtime Action Events</span>
        {logs.length > 0 ? (
          logs.map((log, idx) => (
            <div key={idx} className="text-[10px] text-white/80">{log}</div>
          ))
        ) : (
          <div className="text-white/30 italic">Click the visualizer items above to log events...</div>
        )}
      </div>
    </div>
  );
}

// 26. Aria Tree Inspector
function AriaInspectorTool() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full max-w-sm space-y-4 font-mono text-xs text-left">
      <div className="p-3 bg-neutral-900 border border-white/10 rounded space-y-3">
        <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
          <span>disclosure-card</span>
          <button 
            onClick={() => setExpanded(!expanded)}
            className="px-2.5 py-1 text-[10px] rounded bg-[#E0FF4F] text-black font-semibold"
          >
            {expanded ? "Collapse Block" : "Expand Block"}
          </button>
        </div>

        <div className="space-y-1.5">
          <div className="text-[#E0FF4F] text-[10px]">Active Accessible State Parameters:</div>
          <div className="p-2 bg-black rounded text-blue-300 text-[10px] space-y-1">
            <div>aria-controls="panel-id"</div>
            <div className="font-bold">aria-expanded="{expanded.toString()}"</div>
            <div>role="region"</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 27. First Rule of ARIA checklist comparison
function FirstRuleAriaInspector() {
  return (
    <div className="w-full max-w-sm space-y-3 font-mono text-[11px] text-left">
      <div className="p-3 bg-neutral-900 border border-white/10 rounded space-y-2">
        <span className="text-red-400 font-bold uppercase text-[10px] block">Approach A: Custom DIV markup</span>
        <div className="p-1.5 bg-black/50 text-white/70 rounded">
          <code>&lt;div role="button" tabindex="0" aria-pressed="false"&gt;Button&lt;/div&gt;</code>
        </div>
        <div className="text-white/40 leading-tight">Requires: tabindex, custom key handlers for space/enter, active state ARIA syncing.</div>
      </div>

      <div className="p-3 bg-neutral-900 border border-white/10 rounded space-y-2">
        <span className="text-green-400 font-bold uppercase text-[10px] block">Approach B: Native Button element</span>
        <div className="p-1.5 bg-black/50 text-[#E0FF4F] rounded">
          <code>&lt;button&gt;Button&lt;/button&gt;</code>
        </div>
        <div className="text-[#E0FF4F] leading-tight font-semibold">Requires: Zero additional declarations. Operates flawlessly out of the box!</div>
      </div>
    </div>
  );
}

// 28. Heading tree outline builder
function HeadingTreeBuilder() {
  return (
    <div className="w-full max-w-sm space-y-3 font-mono text-xs text-left">
      <span className="text-[10px] text-white/40 block">Semantic Heading Tree outline</span>
      <div className="p-3 bg-black border border-white/10 rounded space-y-1.5">
        <div className="text-white font-bold">📄 h1: The Web Guide (Primary Title)</div>
        <div className="pl-4 text-blue-300 border-l border-white/10">📄 h2: Page Basics (Topic Head)</div>
        <div className="pl-8 text-[#E0FF4F] border-l border-white/10">📄 h3: HTML Syntax (Sub-topic details)</div>
        <div className="pl-4 text-blue-300 border-l border-white/10">📄 h2: Page Styles (Topic Head)</div>
      </div>
      <p className="text-[9px] text-white/50 leading-relaxed text-center">
        No skipped header rows! Ensures consistent outlines for screen-reader indexes.
      </p>
    </div>
  );
}

// 29. SEO Page Audit checklist reporter
function SeoAuditReport() {
  return (
    <div className="w-full max-w-sm space-y-3 font-mono text-[11px] text-left">
      <span className="text-[10px] text-white/40 block uppercase">Structural SEO Audit Dashboard</span>
      
      <div className="space-y-1.5">
        <div className="flex justify-between items-center bg-white/5 p-2 border border-white/10 rounded">
          <span>1. Primary Header Element</span>
          <span className="text-green-400 font-bold">PASS (1x h1)</span>
        </div>
        <div className="flex justify-between items-center bg-white/5 p-2 border border-white/10 rounded">
          <span>2. Alternate Image Descriptions</span>
          <span className="text-green-400 font-bold">PASS (All clear)</span>
        </div>
        <div className="flex justify-between items-center bg-white/5 p-2 border border-white/10 rounded">
          <span>3. Canonical URL defined</span>
          <span className="text-[#E0FF4F] font-bold">READY</span>
        </div>
      </div>
    </div>
  );
}
