import React, { useState } from 'react';
import { Terminal, Copy, Check, FileCode } from 'lucide-react';

interface CodeViewerProps {
  title: string;
  code: string;
  language?: string;
}

export default function CodeViewer({ title, code, language = 'javascript' }: CodeViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  // Simple, elegant custom tokenizer to make code syntax pop in the dark theme
  const highlightCode = (rawCode: string) => {
    if (!rawCode) return '';
    
    // Escape HTML entities to prevent rendering issues
    let html = rawCode
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Keywords (const, let, function, return, export, import, from, etc)
    const keywords = /\b(const|let|var|function|return|export|import|from|default|class|extends|static|async|await|try|catch|if|else|new|extends|false|true|null|undefined)\b/g;
    html = html.replace(keywords, '<span class="text-cyan-400 font-semibold">$1</span>');

    // Testing globals (describe, test, it, expect, beforeEach, afterEach, beforeAll, afterAll, jest, cy)
    const testGlobals = /\b(describe|test|it|expect|beforeEach|afterEach|beforeAll|afterAll|jest|cy)\b/g;
    html = html.replace(testGlobals, '<span class="text-cyan-400 font-semibold">$1</span>');

    // Matchers and methods (toBe, toEqual, toMatchSnapshot, toHaveBeenCalled, toHaveBeenCalledWith, visit, get, click, type, wait, intercept, mockReturnValue, mockResolvedValue, spyOn)
    const testMatchers = /\.(toBe|toEqual|toMatchSnapshot|toHaveBeenCalled|toHaveBeenCalledWith|visit|get|click|type|wait|intercept|mockReturnValue|mockResolvedValue|spyOn|mockRestore|should|mount|realHover)\b/g;
    html = html.replace(testMatchers, '.<span class="text-emerald-400">$1</span>');

    // Strings
    const singleQuotes = /'([^'\\]*(?:\\.[^'\\]*)*)'/g;
    const doubleQuotes = /"([^"\\]*(?:\\.[^"\\]*)*)"/g;
    const templateLiterals = /`([^`\\]*(?:\\.[^`\\]*)*)`/g;
    html = html.replace(singleQuotes, '<span class="text-cyan-300">\'$1\'</span>');
    html = html.replace(doubleQuotes, '<span class="text-cyan-300">"$1"</span>');
    html = html.replace(templateLiterals, '<span class="text-cyan-300">`$1`</span>');

    // Comments (both single-line and multi-line)
    const singleLineComment = /(\/\/.*)/g;
    html = html.replace(singleLineComment, '<span class="text-slate-500 italic">$1</span>');

    return html;
  };

  const lines = code.split('\n');

  return (
    <div className="bg-slate-950 rounded-xl border border-slate-800/80 overflow-hidden flex flex-col h-full shadow-lg">
      {/* Header bar */}
      <div className="bg-slate-900/80 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono text-slate-300 font-medium">{title}</span>
        </div>
        
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-all flex items-center gap-1.5 text-xs font-mono border border-slate-700/30"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 text-[10px]">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[10px]">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code body */}
      <div className="p-4 flex-1 overflow-auto font-mono text-xs leading-relaxed max-h-[350px] scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, index) => (
              <tr key={index} className="hover:bg-slate-900/40 group">
                {/* Line number */}
                <td className="w-8 text-right pr-4 text-slate-600 select-none border-r border-slate-800/40 text-[10px] group-hover:text-slate-400 transition-colors">
                  {index + 1}
                </td>
                {/* Line text */}
                <td className="pl-4 whitespace-pre text-slate-300">
                  <span dangerouslySetInnerHTML={{ __html: highlightCode(line) }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
