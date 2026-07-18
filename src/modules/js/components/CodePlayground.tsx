import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, AlertTriangle, Terminal } from 'lucide-react';

interface CodePlaygroundProps {
  initialCode: string;
  expectedOutput?: string;
}

export function CodePlayground({ initialCode, expectedOutput }: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCode(initialCode);
    setOutput([]);
    setHasError(false);
  }, [initialCode]);

  const executeCode = () => {
    const logs: string[] = [];
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    // Redirect logs
    console.log = (...args: any[]) => {
      logs.push(args.map(arg => {
        if (typeof arg === 'object') {
          try {
            return JSON.stringify(arg);
          } catch (e) {
            return String(arg);
          }
        }
        return String(arg);
      }).join(' '));
    };

    console.warn = (...args: any[]) => {
      logs.push(`[WARN] ${args.join(' ')}`);
    };

    console.error = (...args: any[]) => {
      logs.push(`[ERROR] ${args.join(' ')}`);
    };

    try {
      // Evaluate within a scoped sandbox Function
      // We also define a mock setTimeout that runs synchronously for the simple playground evaluation
      const runner = new Function('console', `
        try {
          ${code}
        } catch (e) {
          console.error(e.message);
          throw e;
        }
      `);
      
      runner({
        log: console.log,
        warn: console.warn,
        error: console.error
      });
      
      setHasError(false);
      if (logs.length === 0) {
        logs.push('// Code executed successfully with no console output.');
      }
    } catch (e: any) {
      setHasError(true);
      logs.push(`Compilation / Runtime Error: ${e.message}`);
    } finally {
      // Restore console
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
    }

    setOutput(logs);
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput([]);
    setHasError(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#0d0d10] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Code Editor Header */}
      <div className="px-4 py-2.5 bg-zinc-950 border-b border-zinc-800 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
          <span className="text-[10px] text-zinc-500 font-mono ml-2">sandbox.js</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            id="playground-reset-btn"
            onClick={resetCode}
            className="p-1 text-zinc-400 hover:text-zinc-200 transition-colors rounded hover:bg-zinc-800"
            title="Reset Playground Code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            id="playground-run-btn"
            onClick={executeCode}
            className="flex items-center gap-1.5 px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-[10px] font-bold text-white rounded uppercase tracking-wider transition-colors shadow-md shadow-cyan-900/20"
          >
            <Play className="w-3 h-3 fill-white" />
            Run
          </button>
        </div>
      </div>

      {/* Editor & Console Split */}
      <div className="flex-1 grid grid-rows-2 h-full min-h-[300px]">
        {/* Editor Pane */}
        <div className="relative border-b border-zinc-800 bg-zinc-950 font-mono text-[11px] flex flex-col p-2 overflow-auto">
          <div className="flex-1 flex">
            {/* Simulated Line Numbers */}
            <div className="text-zinc-600 text-right pr-3 select-none border-r border-zinc-900/50 mr-3 w-6 leading-relaxed">
              {Array.from({ length: Math.max(code.split('\n').length, 5) }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            {/* Textarea Code Input */}
            <textarea
              id="playground-textarea"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 bg-transparent text-cyan-200 border-none outline-none resize-none font-mono text-[11.5px] leading-relaxed focus:ring-0 p-0 w-full"
              spellCheck={false}
              placeholder="// Write or edit your JavaScript here..."
            />
          </div>
        </div>

        {/* Console Output Pane */}
        <div className="bg-[#050507] p-4 flex flex-col font-mono text-xs overflow-hidden">
          <div className="flex justify-between items-center text-[10px] text-zinc-500 border-b border-zinc-900 pb-2 mb-2 uppercase tracking-widest">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-zinc-500" />
              <span>Output Console</span>
            </div>
            {hasError && (
              <span className="text-red-400 flex items-center gap-1 font-bold">
                <AlertTriangle className="w-3 h-3" /> Failed
              </span>
            )}
          </div>
          <div className="flex-1 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-800 text-left">
            {output.length === 0 ? (
              <span className="text-zinc-600 italic">// Click 'Run' to compile and execute the concept in the browser heap sandbox...</span>
            ) : (
              output.map((line, i) => (
                <div
                  key={i}
                  className={`whitespace-pre-wrap leading-relaxed ${
                    hasError && i === output.length - 1
                      ? 'text-red-400 border-l-2 border-red-500 pl-2 bg-red-950/20 py-1 rounded'
                      : line.startsWith('[WARN]')
                      ? 'text-yellow-400'
                      : line.startsWith('[ERROR]')
                      ? 'text-red-400'
                      : line.startsWith('//')
                      ? 'text-zinc-500'
                      : 'text-zinc-300'
                  }`}
                >
                  {line}
                </div>
              ))
            )}
          </div>
          {expectedOutput && (
            <div className="mt-2 pt-2 border-t border-zinc-900 text-[10px] text-zinc-500">
              <span className="font-bold uppercase text-cyan-400/80 mr-1.5">Expected Spec Output:</span>
              <code className="bg-zinc-950/80 px-1.5 py-0.5 rounded text-zinc-400 border border-zinc-900">{expectedOutput}</code>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
