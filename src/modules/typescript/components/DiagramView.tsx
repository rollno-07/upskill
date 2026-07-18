import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Cpu, Zap, Sparkles, Brain, CheckCircle2 } from 'lucide-react';

interface DiagramViewProps {
  questionId: number;
  category: string;
}

export const DiagramView: React.FC<DiagramViewProps> = ({ questionId, category }) => {
  // We can render custom interactive widgets based on the selected question or general category.
  // 1. Fundamentals / Superset
  // 2. Union vs Intersection
  // 3. Type Inference
  // 4. Discriminated Unions
  // 5. Generics Machine

  // Determine which diagram type to show
  let diagramType = 'default';
  if (questionId === 1 || questionId === 2) {
    diagramType = 'superset';
  } else if (questionId === 3) {
    diagramType = 'inference';
  } else if (questionId === 5 || questionId === 6 || questionId === 57) {
    diagramType = 'union_intersection';
  } else if (questionId === 12 || questionId === 13) {
    diagramType = 'generics';
  } else if (questionId === 34 || questionId === 53) {
    diagramType = 'discriminated';
  } else if (category === 'Mappers & Utilities') {
    diagramType = 'mappers';
  }

  return (
    <div className="flex-1 min-h-[340px] bg-[#111112] border border-[#242426] rounded-sm p-6 flex flex-col relative overflow-hidden">
      {/* Abstract Grid Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#22d3ee 1px, transparent 1px)`,
          backgroundSize: '16px 16px'
        }}
      />

      <div className="flex justify-between items-center mb-4 z-10 border-b border-[#1C1C1E] pb-3">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] animate-pulse" />
          <h4 className="text-[10px] uppercase tracking-widest text-[#8E8E93] font-mono">
            Interactive Concept Visualizer
          </h4>
        </div>
        <div className="px-2 py-0.5 bg-[#1C1C1E] border border-[#242426] rounded text-[9px] font-mono text-[#22d3ee] uppercase">
          {diagramType} Mode
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center relative z-10">
        <AnimatePresence mode="wait">
          {diagramType === 'superset' && <SupersetDiagram key="superset" />}
          {diagramType === 'inference' && <InferenceDiagram key="inference" />}
          {diagramType === 'union_intersection' && <UnionIntersectionDiagram key="union" />}
          {diagramType === 'generics' && <GenericsDiagram key="generics" />}
          {diagramType === 'discriminated' && <DiscriminatedDiagram key="discriminated" />}
          {diagramType === 'mappers' && <MappersDiagram key="mappers" />}
          {diagramType === 'default' && <WaveFunctionDiagram key="default" questionId={questionId} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ============================================================================
   1. SUPERSET DIAGRAM (TypeScript is a Superset of JavaScript)
   ============================================================================ */
const SupersetDiagram: React.FC = () => {
  const [activeCircle, setActiveCircle] = useState<'js' | 'ts' | null>('ts');

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-6">
      <div className="relative w-72 h-56 flex items-center justify-center">
        {/* TypeScript Circle (The Superset) */}
        <motion.div 
          className={`absolute w-56 h-56 rounded-full border-2 flex items-start justify-center pt-4 cursor-pointer transition-all duration-300 ${
            activeCircle === 'ts' 
              ? 'bg-[#1C1C1E]/60 border-[#22d3ee] shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
              : 'border-[#242426] bg-[#0E0E10]/20 hover:border-[#48484A]'
          }`}
          onClick={() => setActiveCircle('ts')}
          layout
        >
          <span className="text-xs font-mono tracking-wider font-semibold text-[#22d3ee]">TypeScript (TS)</span>
        </motion.div>

        {/* JavaScript Circle (The Nested Subset) */}
        <motion.div 
          className={`absolute w-32 h-32 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${
            activeCircle === 'js' 
              ? 'bg-[#1C1C1E]/90 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.15)] z-20' 
              : 'border-[#242426] bg-[#0E0E10]/50 hover:border-[#48484A] z-10'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setActiveCircle('js');
          }}
          layout
        >
          <span className="text-xs font-mono tracking-wider text-yellow-500 font-semibold">JavaScript (JS)</span>
        </motion.div>
      </div>

      <div className="bg-[#161618] border border-[#242426] p-4 rounded-sm w-full max-w-md text-xs text-[#AEAEB2] leading-relaxed">
        {activeCircle === 'ts' ? (
          <div>
            <span className="text-[#22d3ee] font-semibold block mb-1">TypeScript Superset Boundary:</span>
            Adds compile-time type checkers, custom interfaces, static validations, generics, and strict configurations. Everything in JavaScript runs flawlessly here.
          </div>
        ) : (
          <div>
            <span className="text-yellow-500 font-semibold block mb-1">JavaScript Core Subset:</span>
            Standard dynamic language runtime, values carry dynamic types evaluated strictly at runtime. No type checks exist during code writing or compilation.
          </div>
        )}
      </div>
    </div>
  );
};

/* ============================================================================
   2. TYPE INFERENCE DIAGRAM
   ============================================================================ */
const InferenceDiagram: React.FC = () => {
  const [selectedVar, setSelectedVar] = useState<number>(0);
  const vars = [
    { code: 'let score = 100;', type: 'number', desc: 'Inferred as number from the literal 100.' },
    { code: 'let label = "Archived";', type: 'string', desc: 'Inferred as string from double-quoted text.' },
    { code: 'let checked = true;', type: 'boolean', desc: 'Inferred as boolean from the keyword true.' },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-6">
      <div className="grid grid-cols-3 gap-3 w-full max-w-md">
        {vars.map((v, i) => (
          <button
            key={i}
            onClick={() => setSelectedVar(i)}
            className={`p-3 border rounded text-left transition-all-custom ${
              selectedVar === i 
                ? 'border-[#22d3ee] bg-[#1C1C1E]' 
                : 'border-[#242426] bg-[#0F0F11] hover:bg-[#151517]'
            }`}
          >
            <div className="text-[10px] text-[#8E8E93] font-mono mb-1">CODE</div>
            <code className="text-xs font-mono text-[#E5E5E7] block truncate">{v.code}</code>
          </button>
        ))}
      </div>

      <div className="relative w-full max-w-md h-28 bg-[#161618] border border-[#242426] p-4 flex items-center justify-between rounded-sm overflow-hidden">
        <div className="space-y-1.5 flex-1 pr-4">
          <div className="text-[10px] text-[#8E8E93] uppercase font-mono tracking-wider">Inference Analysis</div>
          <div className="text-xs text-[#AEAEB2] leading-relaxed">{vars[selectedVar].desc}</div>
        </div>

        <div className="flex flex-col items-center justify-center bg-[#0F0F11] border border-[#242426] p-3 rounded-sm w-28 text-center">
          <span className="text-[9px] uppercase font-mono tracking-widest text-[#22d3ee] mb-1">Inferred Type</span>
          <motion.code 
            key={selectedVar}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-sm font-mono font-bold text-white bg-[#1C1C1E] px-2 py-0.5 border border-[#2C2C2E] rounded"
          >
            {vars[selectedVar].type}
          </motion.code>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   3. UNION VS INTERSECTION DIAGRAM
   ============================================================================ */
const UnionIntersectionDiagram: React.FC = () => {
  const [mode, setMode] = useState<'union' | 'intersection'>('union');

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-6">
      <div className="flex space-x-3 bg-[#0F0F11] p-1 border border-[#242426] rounded">
        <button
          onClick={() => setMode('union')}
          className={`px-4 py-1.5 text-xs font-mono rounded transition-colors ${
            mode === 'union' 
              ? 'bg-[#22d3ee] text-black font-semibold' 
              : 'text-[#8E8E93] hover:text-white'
          }`}
        >
          Union (A | B)
        </button>
        <button
          onClick={() => setMode('intersection')}
          className={`px-4 py-1.5 text-xs font-mono rounded transition-colors ${
            mode === 'intersection' 
              ? 'bg-[#22d3ee] text-black font-semibold' 
              : 'text-[#8E8E93] hover:text-white'
          }`}
        >
          Intersection (A & B)
        </button>
      </div>

      <div className="relative w-72 h-36 flex items-center justify-center">
        {/* Venn Diagrams overlapping circles */}
        <div className={`absolute left-10 w-28 h-28 rounded-full border border-dashed transition-all duration-300 ${
          mode === 'union' 
            ? 'bg-[#22d3ee]/20 border-[#22d3ee] z-10' 
            : 'bg-transparent border-[#242426]'
        }`} />
        <div className={`absolute right-10 w-28 h-28 rounded-full border border-dashed transition-all duration-300 ${
          mode === 'union' 
            ? 'bg-[#22d3ee]/20 border-[#22d3ee] z-10' 
            : 'bg-transparent border-[#242426]'
        }`} />

        {/* Overlapping intersection shape */}
        <div className={`absolute w-12 h-20 bg-transparent transition-all duration-300 ${
          mode === 'intersection' 
            ? 'bg-[#22d3ee]/50 border-l border-r border-[#22d3ee] scale-110 z-20 shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
            : ''
        }`} style={{ borderRadius: '50% 50%' }} />

        <div className="absolute left-16 text-[10px] font-mono text-white select-none z-20">Set A</div>
        <div className="absolute right-16 text-[10px] font-mono text-white select-none z-20">Set B</div>
      </div>

      <div className="bg-[#161618] border border-[#242426] p-4 rounded-sm w-full max-w-md text-xs text-[#AEAEB2] leading-relaxed">
        {mode === 'union' ? (
          <div>
            <span className="text-[#22d3ee] font-semibold block mb-1">Union (OR Logic):</span>
            Accepts values belonging to Set A OR Set B. To perform exclusive properties of either set, you must use a type guard to narrow the type first.
          </div>
        ) : (
          <div>
            <span className="text-[#22d3ee] font-semibold block mb-1">Intersection (AND Logic):</span>
            Accepts objects that possess ALL properties of Set A AND Set B simultaneously. Perfect for combining multiple interface specifications.
          </div>
        )}
      </div>
    </div>
  );
};

/* ============================================================================
   4. GENERICS DIAGRAM
   ============================================================================ */
const GenericsDiagram: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'string' | 'number' | 'boolean'>('string');
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const triggerRun = () => {
    setIsRunning(true);
    setIsCompleted(false);
    setTimeout(() => {
      setIsRunning(false);
      setIsCompleted(true);
    }, 1200);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-6">
      <div className="flex space-x-2">
        {(['string', 'number', 'boolean'] as const).map((t) => (
          <button
            key={t}
            onClick={() => {
              setSelectedType(t);
              setIsCompleted(false);
            }}
            disabled={isRunning}
            className={`px-3 py-1.5 text-xs font-mono rounded border transition-colors ${
              selectedType === t 
                ? 'border-[#22d3ee] bg-[#1C1C1E] text-white' 
                : 'border-[#242426] bg-[#0F0F11] text-[#8E8E93] hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* The Generic identity Box */}
      <div className="flex items-center space-x-6 w-full max-w-sm justify-between bg-[#161618] p-5 border border-[#242426] rounded-sm relative overflow-hidden">
        {/* Input */}
        <div className="text-center w-20">
          <div className="text-[9px] uppercase tracking-wider font-mono text-[#8E8E93] mb-1">Input Value</div>
          <div className="text-xs font-mono py-1 border border-[#242426] rounded bg-[#0F0F11] truncate px-1 text-white">
            {selectedType === 'string' && '"Alice"'}
            {selectedType === 'number' && '42'}
            {selectedType === 'boolean' && 'true'}
          </div>
        </div>

        {/* Center Machine */}
        <div className="flex-1 flex flex-col items-center">
          <button 
            onClick={triggerRun}
            disabled={isRunning}
            className={`relative w-12 h-12 rounded-sm flex items-center justify-center border transition-all-custom ${
              isRunning 
                ? 'bg-[#22d3ee]/20 border-[#22d3ee] animate-pulse scale-95' 
                : 'bg-[#1C1C1E] border-[#242426] hover:border-[#22d3ee] hover:bg-[#2C2C2E]'
            }`}
          >
            <Cpu className={`w-5 h-5 ${isRunning ? 'text-[#22d3ee] animate-spin' : 'text-[#8E8E93]'}`} />
          </button>
          <span className="text-[9px] font-mono mt-1 text-[#8E8E93]">identity&lt;T&gt;</span>
        </div>

        {/* Output */}
        <div className="text-center w-20">
          <div className="text-[9px] uppercase tracking-wider font-mono text-[#8E8E93] mb-1">Output Type</div>
          <div className={`text-xs font-mono py-1 border rounded transition-all duration-300 ${
            isCompleted 
              ? 'border-[#22d3ee] bg-[#1C1C1E] text-[#22d3ee] font-semibold' 
              : 'border-[#242426] bg-[#0F0F11]/50 text-[#48484A]'
          }`}>
            {isCompleted ? selectedType : '?'}
          </div>
        </div>
      </div>

      <div className="text-[11px] text-[#8E8E93] font-mono text-center">
        {isRunning ? (
          <span className="text-[#22d3ee]">Processing generic types...</span>
        ) : isCompleted ? (
          <span className="text-white">Generic resolved: identity&lt;{selectedType}&gt; was strictly verified!</span>
        ) : (
          <span>Click the center machine to resolve the generic type.</span>
        )}
      </div>
    </div>
  );
};

/* ============================================================================
   5. DISCRIMINATED UNIONS DIAGRAM
   ============================================================================ */
const DiscriminatedDiagram: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<'success' | 'error'>('success');

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-6">
      <div className="flex space-x-3 bg-[#0F0F11] p-1 border border-[#242426] rounded">
        <button
          onClick={() => setSelectedTag('success')}
          className={`px-4 py-1.5 text-xs font-mono rounded transition-colors ${
            selectedTag === 'success' 
              ? 'bg-[#22d3ee] text-black font-semibold' 
              : 'text-[#8E8E93] hover:text-white'
          }`}
        >
          Tag: "success"
        </button>
        <button
          onClick={() => setSelectedTag('error')}
          className={`px-4 py-1.5 text-xs font-mono rounded transition-colors ${
            selectedTag === 'error' 
              ? 'bg-[#22d3ee] text-black font-semibold' 
              : 'text-[#8E8E93] hover:text-white'
          }`}
        >
          Tag: "error"
        </button>
      </div>

      {/* Switch flowchart */}
      <div className="relative w-full max-w-sm h-32 border border-[#242426] bg-[#161618] rounded-sm p-4 flex items-center justify-between">
        {/* Source Payload */}
        <div className="flex flex-col items-center">
          <span className="text-[8px] uppercase font-mono tracking-widest text-[#8E8E93] mb-1">Payload</span>
          <div className="border border-[#2C2C2E] p-2 rounded bg-[#0F0F11] font-mono text-xs text-white">
            status: <span className="text-[#22d3ee]">"{selectedTag}"</span>
          </div>
        </div>

        {/* Pipeline Lines */}
        <div className="flex-1 flex flex-col justify-between h-full py-4 px-3 relative">
          {/* Top route */}
          <div className={`h-0.5 border-t-2 transition-all duration-300 ${
            selectedTag === 'success' ? 'border-[#22d3ee]' : 'border-[#242426]'
          }`} />
          {/* Bottom route */}
          <div className={`h-0.5 border-t-2 transition-all duration-300 ${
            selectedTag === 'error' ? 'border-[#22d3ee]' : 'border-[#242426]'
          }`} />
        </div>

        {/* Unlocked Route outputs */}
        <div className="space-y-4">
          <div className={`p-2 border rounded text-xs font-mono transition-all duration-300 ${
            selectedTag === 'success' 
              ? 'border-green-500 bg-green-950/20 text-green-400 font-semibold' 
              : 'border-[#242426] opacity-30 text-[#48484A]'
          }`}>
            data: string[]
          </div>
          <div className={`p-2 border rounded text-xs font-mono transition-all duration-300 ${
            selectedTag === 'error' 
              ? 'border-red-500 bg-red-950/20 text-red-400 font-semibold' 
              : 'border-[#242426] opacity-30 text-[#48484A]'
          }`}>
            message: string
          </div>
        </div>
      </div>

      <p className="text-xs text-[#AEAEB2] max-w-md leading-relaxed text-center">
        Testing the discriminant <code className="bg-[#1C1C1E] px-1 text-[#22d3ee]">status</code> allows the compiler to narrow down the exact properties of the payload, blocking the access of any invalid parameters.
      </p>
    </div>
  );
};

/* ============================================================================
   6. MAPPERS DIAGRAM (Utility and mapped types)
   ============================================================================ */
const MappersDiagram: React.FC = () => {
  const [appliedMapper, setAppliedMapper] = useState<'Original' | 'Partial' | 'Readonly'>('Original');

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-6">
      <div className="flex space-x-2">
        {(['Original', 'Partial', 'Readonly'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setAppliedMapper(m)}
            className={`px-3 py-1.5 text-xs font-mono rounded border transition-colors ${
              appliedMapper === m 
                ? 'border-[#22d3ee] bg-[#1C1C1E] text-white font-semibold' 
                : 'border-[#242426] bg-[#0F0F11] text-[#8E8E93]'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Code viewer comparing inputs */}
      <div className="w-full max-w-sm bg-[#161618] border border-[#242426] p-4 rounded-sm font-mono text-xs space-y-2 text-[#AEAEB2]">
        <div className="text-[9px] uppercase tracking-wider text-[#8E8E93] pb-1 border-b border-[#242426] font-sans">
          Resulting Type Interface
        </div>
        <pre className="text-white leading-relaxed">
          {appliedMapper === 'Original' && `interface Todo {
  title: string;
  completed: boolean;
}`}
          {appliedMapper === 'Partial' && `interface Todo {
  title?: string | undefined;
  completed?: boolean | undefined;
}`}
          {appliedMapper === 'Readonly' && `interface Todo {
  readonly title: string;
  readonly completed: boolean;
}`}
        </pre>
      </div>

      <p className="text-[11px] text-[#8E8E93] text-center max-w-sm">
        {appliedMapper === 'Original' && 'The initial type contract has required attributes.'}
        {appliedMapper === 'Partial' && 'Each parameter is now optional (appended with a ? modifier).'}
        {appliedMapper === 'Readonly' && 'Each parameter is now immutable and cannot be rewritten.'}
      </p>
    </div>
  );
};

/* ============================================================================
   7. DEFAULT WAVE FUNCTION DIAGRAM (Quantum Schrodinger Wave Mockup)
   ============================================================================ */
interface WaveFunctionDiagramProps {
  questionId: number;
}
const WaveFunctionDiagram: React.FC<WaveFunctionDiagramProps> = ({ questionId }) => {
  const [phase, setPhase] = useState(0);

  // Simple interval simulation for waves
  React.useEffect(() => {
    const handle = setInterval(() => {
      setPhase((p) => (p + 5) % 360);
    }, 80);
    return () => clearInterval(handle);
  }, []);

  // Compute animated wave paths
  const wavePath = React.useMemo(() => {
    const points: string[] = [];
    const amplitude = 30;
    const frequency = 0.05;
    for (let x = 0; x <= 400; x += 5) {
      const rad = (x * frequency) + (phase * Math.PI / 180);
      const y = 100 + Math.sin(rad) * amplitude * Math.cos(rad * 0.4);
      points.push(`${x === 0 ? 'M' : 'L'} ${x} ${y}`);
    }
    return points.join(' ');
  }, [phase]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
      <div className="relative w-full h-44 border border-[#242426] bg-[#0E0E10] flex items-center justify-center p-3 rounded-sm overflow-hidden">
        <svg viewBox="0 0 400 200" className="w-full h-full opacity-60">
          <line x1="0" y1="100" x2="400" y2="100" stroke="#242426" strokeWidth="1" />
          <path d={wavePath} fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="3 3" />
          
          {/* Moving nodes */}
          <circle cx="100" cy="100" r="3" fill="#22d3ee" />
          <circle cx="200" cy="100" r="3" fill="#22d3ee" />
          <circle cx="300" cy="100" r="3" fill="#22d3ee" />
          
          <text x="15" y="30" fill="#48484A" fontSize="8" fontFamily="monospace">TYPE_COMPILER_RUNNING</text>
          <text x="15" y="180" fill="#48484A" fontSize="8" fontFamily="monospace">CONCEPT_ID: {questionId}</text>
        </svg>

        <div className="absolute bottom-3 right-3 flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5 text-[#22d3ee] animate-pulse" />
          <span className="text-[8px] font-mono text-[#22d3ee] tracking-widest uppercase">LOCKED</span>
        </div>
      </div>

      <div className="text-[11px] text-[#8E8E93] text-center max-w-sm">
        This concept is fully covered. Click the tabs above to explore the detailed answers, raw code examples, or test yourself with the interactive quiz!
      </div>
    </div>
  );
};
