import React, { useMemo } from 'react';
import katex from 'katex';

interface MarkdownRendererProps {
  content: string;
  latex?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, latex }) => {
  // Safe KaTeX rendering
  const renderedLatex = useMemo(() => {
    if (!latex) return null;
    try {
      return katex.renderToString(latex, {
        throwOnError: false,
        displayMode: true,
      });
    } catch (e) {
      console.error(e);
      return `<span class="text-red-500 font-mono text-xs">Latex error: ${latex}</span>`;
    }
  }, [latex]);

  // Dynamic light Markdown parser for formatting answers beautifully
  const parsedHTML = useMemo(() => {
    const lines = content.split('\n');
    let inList = false;
    const htmlLines: string[] = [];

    lines.forEach((line) => {
      const trimmed = line.trim();

      // Check for headings
      if (trimmed.startsWith('### ')) {
        if (inList) {
          htmlLines.push('</ul>');
          inList = false;
        }
        const text = trimmed.slice(4);
        htmlLines.push(`<h4 class="text-xs uppercase tracking-[0.2em] text-[#22d3ee] font-semibold mt-6 mb-3 font-sans">${text}</h4>`);
        return;
      }

      if (trimmed.startsWith('## ')) {
        if (inList) {
          htmlLines.push('</ul>');
          inList = false;
        }
        const text = trimmed.slice(3);
        htmlLines.push(`<h3 class="text-lg font-serif italic text-white mt-5 mb-3 font-serif">${text}</h3>`);
        return;
      }

      // Check for list items
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        if (!inList) {
          htmlLines.push('<ul class="space-y-2.5 my-3 list-none">');
          inList = true;
        }
        const text = trimmed.slice(2);
        // Process bold and inline code backticks inside the list item
        const processedText = processInlineStyles(text);
        htmlLines.push(`
          <li class="flex items-start text-sm text-[#AEAEB2] leading-relaxed">
            <span class="text-[#22d3ee] mr-3 font-semibold select-none">•</span>
            <div class="flex-1">${processedText}</div>
          </li>
        `);
        return;
      }

      // Numbered lists
      if (/^\d+\.\s/.test(trimmed)) {
        if (inList) {
          htmlLines.push('</ul>');
          inList = false;
        }
        const match = trimmed.match(/^(\d+)\.\s(.*)/);
        if (match) {
          const num = match[1];
          const text = match[2];
          const processedText = processInlineStyles(text);
          htmlLines.push(`
            <div class="flex items-start text-sm text-[#AEAEB2] leading-relaxed my-3">
              <span class="font-mono text-xs text-[#22d3ee] bg-[#1C1C1E] border border-[#242426] px-2 py-0.5 rounded mr-3 select-none">${num}</span>
              <div class="flex-1 pt-0.5">${processedText}</div>
            </div>
          `);
          return;
        }
      }

      // If we were in a list, close it
      if (inList && trimmed === '') {
        htmlLines.push('</ul>');
        inList = false;
        return;
      }

      if (trimmed === '') {
        htmlLines.push('<div class="h-3"></div>');
        return;
      }

      // Otherwise, treat as regular paragraph
      if (inList) {
        htmlLines.push('</ul>');
        inList = false;
      }

      const processedParagraph = processInlineStyles(trimmed);
      htmlLines.push(`<p class="text-sm text-[#AEAEB2] leading-relaxed mb-4">${processedParagraph}</p>`);
    });

    if (inList) {
      htmlLines.push('</ul>');
    }

    return htmlLines.join('\n');
  }, [content]);

  // Helper to parse bolds and inline backticks
  function processInlineStyles(text: string): string {
    let result = text;
    // Replace bold
    result = result.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-medium">$1</strong>');
    // Replace `code`
    result = result.replace(/`(.*?)`/g, '<code class="bg-[#242426] border border-[#2C2C2E] px-1.5 py-0.5 rounded text-xs font-mono text-[#22d3ee]">$1</code>');
    return result;
  }

  return (
    <div className="space-y-4">
      {/* KaTeX Formula Display if present */}
      {renderedLatex && (
        <div className="my-6 p-5 bg-[#161618] border border-[#242426] rounded-sm transition-all-custom relative overflow-hidden group">
          <div className="absolute top-2 left-3 text-[9px] font-mono tracking-widest text-[#48484A] uppercase select-none">
            Mathematical Expression
          </div>
          <div 
            className="text-center text-lg py-3 text-white overflow-x-auto select-all"
            dangerouslySetInnerHTML={{ __html: renderedLatex }} 
          />
        </div>
      )}

      {/* Main parsed markdown */}
      <div 
        className="prose prose-invert max-w-none text-sm text-[#AEAEB2] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: parsedHTML }}
      />
    </div>
  );
};
