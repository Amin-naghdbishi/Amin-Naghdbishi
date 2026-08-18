import React from 'react';
import { CopyButton } from './CopyButton';

interface WritingBoxRendererProps {
  content: string;
  title?: string;
  caption?: string;
  showCopy?: boolean;
}

export const WritingBoxRenderer: React.FC<WritingBoxRendererProps> = ({
  content,
  title = 'WRITING / RAW DRAFT',
  caption,
  showCopy = true,
}) => {
  return (
    <div className="my-6 w-full max-w-full">
      <div className="bg-[#02180e] border border-[#0d593d]/50 p-4 sm:p-5 relative group">
        {/* Minimal header */}
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#0d593d]/40 select-none">
          <div className="flex items-center gap-2 font-mono text-xs text-[#529d7c] tracking-widest uppercase">
            <span>[ {title} ]</span>
          </div>

          {showCopy && <CopyButton textToCopy={content} label="Copy Raw" />}
        </div>

        {/* Pure Raw unrendered content preserving all special characters, LaTeX, Markdown, indentation */}
        <pre
          className="font-mono text-xs sm:text-sm text-[#e2f4ec] leading-relaxed whitespace-pre-wrap select-text break-words"
          dir="ltr"
        >
          {content}
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
