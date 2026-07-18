import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  // Split content by paragraphs or blocks
  const lines = content.split('\n');
  const renderedBlocks: React.ReactNode[] = [];
  let currentList: { items: string[]; type: 'unordered' | 'ordered' } | null = null;
  let codeBlock: { lines: string[]; lang: string } | null = null;

  const flushList = (key: number) => {
    if (!currentList) return null;
    const listComponent = currentList.type === 'unordered' ? (
      <ul key={`list-${key}`} className="list-disc pl-6 my-3 space-y-2 text-gray-700 dark:text-gray-300">
        {currentList.items.map((item, idx) => (
          <li key={idx} className="leading-relaxed">
            {renderInlineFormatting(item)}
          </li>
        ))}
      </ul>
    ) : (
      <ol key={`list-${key}`} className="list-decimal pl-6 my-3 space-y-2 text-gray-700 dark:text-gray-300">
        {currentList.items.map((item, idx) => (
          <li key={idx} className="leading-relaxed">
            {renderInlineFormatting(item)}
          </li>
        ))}
      </ol>
    );
    currentList = null;
    return listComponent;
  };

  const flushCodeBlock = (key: number) => {
    if (!codeBlock) return null;
    const block = (
      <div key={`code-${key}`} className="my-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 overflow-hidden font-mono text-sm shadow-sm">
        {codeBlock.lang && (
          <div className="bg-gray-100 dark:bg-gray-800 px-4 py-1.5 text-xs text-gray-500 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
            <span>{codeBlock.lang.toUpperCase()}</span>
            <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded font-sans font-semibold">Active Code</span>
          </div>
        )}
        <pre className="p-4 overflow-x-auto text-gray-800 dark:text-gray-200 leading-relaxed">
          <code>{codeBlock.lines.join('\n')}</code>
        </pre>
      </div>
    );
    codeBlock = null;
    return block;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block check
    if (line.trim().startsWith('```')) {
      if (codeBlock) {
        // End code block
        const block = flushCodeBlock(i);
        if (block) renderedBlocks.push(block);
      } else {
        // Start code block
        const listBlock = flushList(i);
        if (listBlock) renderedBlocks.push(listBlock);
        const lang = line.trim().substring(3) || 'javascript';
        codeBlock = { lines: [], lang };
      }
      continue;
    }

    if (codeBlock) {
      codeBlock.lines.push(line);
      continue;
    }

    // Unordered List
    if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
      if (!currentList) {
        currentList = { items: [], type: 'unordered' };
      }
      currentList.items.push(line.trim().substring(2));
      continue;
    }

    // Ordered List
    if (/^\d+\.\s/.test(line.trim())) {
      if (!currentList) {
        currentList = { items: [], type: 'ordered' };
      }
      const match = line.trim().match(/^\d+\.\s(.*)/);
      if (match) {
        currentList.items.push(match[1]);
      }
      continue;
    }

    // Any other line ends lists
    if (currentList) {
      const listBlock = flushList(i);
      if (listBlock) renderedBlocks.push(listBlock);
    }

    const trimmed = line.trim();

    // Empty line
    if (trimmed === '') {
      continue;
    }

    // Headers
    if (trimmed.startsWith('# ')) {
      renderedBlocks.push(
        <h1 key={i} className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mt-6 mb-4">
          {renderInlineFormatting(trimmed.substring(2))}
        </h1>
      );
    } else if (trimmed.startsWith('## ')) {
      renderedBlocks.push(
        <h2 key={i} className="text-xl font-bold text-gray-900 dark:text-white mt-5 mb-3 border-b border-gray-100 dark:border-gray-800/60 pb-1">
          {renderInlineFormatting(trimmed.substring(3))}
        </h2>
      );
    } else if (trimmed.startsWith('### ')) {
      renderedBlocks.push(
        <h3 key={i} className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4 mb-2">
          {renderInlineFormatting(trimmed.substring(4))}
        </h3>
      );
    } else if (trimmed.startsWith('> ')) {
      // Blockquote
      renderedBlocks.push(
        <blockquote key={i} className="border-l-4 border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/20 pl-4 py-3 pr-2 my-4 rounded-r-lg text-gray-700 dark:text-gray-300 italic">
          {renderInlineFormatting(trimmed.substring(2))}
        </blockquote>
      );
    } else if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) {
      // Full LaTeX Block Math
      const equation = trimmed.slice(2, -2);
      renderedBlocks.push(
        <div key={i} className="my-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center shadow-inner font-serif">
          <div className="text-cyan-600 dark:text-cyan-400 text-lg overflow-x-auto py-2 font-mono scrollbar-none">
            {renderLatexEquation(equation)}
          </div>
          <div className="text-xs text-gray-400 mt-1 dark:text-gray-500 font-sans">
            [Equation Model Matrix]
          </div>
        </div>
      );
    } else {
      // Normal Paragraph
      renderedBlocks.push(
        <p key={i} className="text-gray-600 dark:text-gray-300 leading-relaxed my-3 text-base">
          {renderInlineFormatting(trimmed)}
        </p>
      );
    }
  }

  // Flush any lingering lists/code
  if (currentList) {
    const listBlock = flushList(9999);
    if (listBlock) renderedBlocks.push(listBlock);
  }
  if (codeBlock) {
    const codeBlockComp = flushCodeBlock(9999);
    if (codeBlockComp) renderedBlocks.push(codeBlockComp);
  }

  return <div className="space-y-2">{renderedBlocks}</div>;
}

// Function to handle custom inline markdown styling like bold, *italic*, `code`, and $latex$
function renderInlineFormatting(text: string): React.ReactNode {
  // Regex to split by bold, italic, code backticks, and inline math
  const tokenRegex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|\$.*?\$)/g;
  const parts = text.split(tokenRegex);

  if (parts.length === 1) return text;

  return parts.map((part, index) => {
    if (part.startsWith('') && part.endsWith('')) {
      return <strong key={index} className="font-semibold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={index} className="italic text-gray-800 dark:text-gray-200">{part.slice(1, -1)}</em>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-cyan-600 dark:text-cyan-400 font-mono text-sm font-medium">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('$') && part.endsWith('$')) {
      return (
        <span key={index} className="inline-flex items-center px-1 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-400 font-serif text-sm font-semibold mx-0.5">
          {renderLatexEquation(part.slice(1, -1))}
        </span>
      );
    }
    return part;
  });
}

// Custom parser to turn raw LaTeX-like equations into gorgeous formatted HTML math.
// Example: "Overhead_{HTTP} \gg Overhead_{WS}" or "Delay = T_{base} \times 2^{n}"
function renderLatexEquation(eq: string): React.ReactNode {
  // We can convert popular LaTeX patterns to nice styled spans.
  // We replace basic markers like:
  // - \times with ×
  // - \gg with »
  // - _{sub} with subscript
  // - ^{sup} with superscript
  // - \frac{num}{den} with fraction
  // - \approx with ≈

  let processed = eq
    .replace(/\\times/g, ' × ')
    .replace(/\\gg/g, ' ≫ ')
    .replace(/\\ll/g, ' ≪ ')
    .replace(/\\approx/g, ' ≈ ')
    .replace(/\\ge/g, ' ≥ ')
    .replace(/\\le/g, ' ≤ ')
    .replace(/\\neq/g, ' ≠ ')
    .replace(/\\infty/g, ' ∞ ')
    .replace(/\\Delta/g, ' Δ ')
    .replace(/\\/g, ' ') // fallback clean up of loose backslashes

  // Match subscripts like _{HTTP}
  const subscriptRegex = /_\{([^}]+)\}/g;
  // Match superscripts like ^{n}
  const superscriptRegex = /\^\{([^}]+)\}/g;

  // Since we are returning React nodes, let's create a custom component that formats it.
  return <EquationFormatter expression={processed} originalSub={subscriptRegex} originalSup={superscriptRegex} />;
}

interface EquationFormatterProps {
  expression: string;
  originalSub: RegExp;
  originalSup: RegExp;
}

const EquationFormatter: React.FC<EquationFormatterProps> = ({ expression, originalSub, originalSup }) => {
  // Custom tokenizer to parse parts of subscripts or superscripts
  // Let's parse text with tags
  // To keep it clean, we search for tokens and render them in spans
  const parts: React.ReactNode[] = [];
  let index = 0;

  // Let's look for sub/superscripts step by step
  const pattern = /(_\{[^}]+\}|\^\{[^}]+\})/g;
  const splits = expression.split(pattern);

  return (
    <span className="inline-flex items-center tracking-normal">
      {splits.map((part, idx) => {
        if (part.startsWith('_{') && part.endsWith('}')) {
          const val = part.slice(2, -1);
          return <sub key={idx} className="text-[10px] bottom-[-0.2em] text-cyan-500 font-semibold">{val}</sub>;
        }
        if (part.startsWith('^{') && part.endsWith('}')) {
          const val = part.slice(2, -1);
          return <sup key={idx} className="text-[10px] top-[-0.3em] text-cyan-500 font-semibold">{val}</sup>;
        }
        return <span key={idx}>{part}</span>;
      })}
    </span>
  );
};
