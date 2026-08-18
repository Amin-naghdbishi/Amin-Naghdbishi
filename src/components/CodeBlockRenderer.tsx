import React, { useMemo } from 'react';
import hljs from 'highlight.js';
import { CopyButton } from './CopyButton';

interface CodeBlockRendererProps {
  code: string;
  language?: string;
  filename?: string;
  caption?: string;
  showCopy?: boolean;
}

export const CodeBlockRenderer: React.FC<CodeBlockRendererProps> = ({
  code,
  language,
  filename,
  caption,
  showCopy = true,
}) => {
  const trimmedCode = code.trim();

  const highlightedHtml = useMemo(() => {
    try {
      if (language && hljs.getLanguage(language)) {
        return hljs.highlight(trimmedCode, { language }).value;
      }
      return hljs.highlightAuto(trimmedCode).value;
    } catch {
      return '';
    }
  }, [trimmedCode, language]);

  return (
    <div className="my-6 w-full max-w-full">
      <div className="bg-black border border-[#0d593d]/50 p-4 relative group">
        {/* Header bar */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#0d593d]/30 select-none">
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#529d7c] uppercase tracking-wider">
            <span>{language || filename || 'CODE'}</span>
            {filename && <span className="text-[#87cbb0]">({filename})</span>}
          </div>

          {showCopy && <CopyButton textToCopy={trimmedCode} label="Copy Code" />}
        </div>

        {/* Highlighted code */}
        <pre className="font-mono text-xs sm:text-sm text-gray-200 overflow-x-auto select-text leading-relaxed">
          {highlightedHtml ? (
            <code
              className={`hljs language-${language || 'text'}`}
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            />
          ) : (
            <code className="text-gray-200">{trimmedCode}</code>
          )}
        </pre>
      </div>

      {caption && (
        <div className="font-vazir text-xs text-[#87cbb0] mt-1.5 px-1 text-right" dir="rtl">
          {caption}
        </div>
      )}
    </div>
  );
};
