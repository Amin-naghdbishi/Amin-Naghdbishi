import React, { useMemo } from 'react';
import { parseAnsiToSpans, isAnsiContent } from '../utils/ansi';
import { CopyButton } from './CopyButton';

interface AnsiArtRendererProps {
  content: string;
  caption?: string;
  title?: string;
  showCopy?: boolean;
  align?: 'center' | 'left' | 'right';
  className?: string;
  onFullscreen?: () => void;
}

export const AnsiArtRenderer: React.FC<AnsiArtRendererProps> = ({
  content,
  caption,
  title,
  showCopy = true,
  align = 'center',
  className = '',
  onFullscreen,
}) => {
  const hasAnsi = useMemo(() => isAnsiContent(content), [content]);
  const spans = useMemo(() => parseAnsiToSpans(content), [content]);

  const alignClass =
    align === 'center'
      ? 'mx-auto text-center'
      : align === 'left'
      ? 'sm:float-left sm:mr-6 sm:mb-4 clear-both text-left'
      : 'sm:float-right sm:ml-6 sm:mb-4 clear-both text-right';

  return (
    <div className={`my-6 w-full max-w-full ${alignClass} ${className}`}>
      <div className="bg-black p-4 sm:p-6 overflow-x-auto text-left relative group">
        {/* Top header row with Title / ANSI Badge and Minimal Copy Button */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#093522]/60 select-none">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] tracking-widest text-[#529d7c] uppercase">
              {hasAnsi ? 'ANSI ART' : 'ASCII ART'}
            </span>
            {title && (
              <span className="font-mono text-xs text-white">
                | {title}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onFullscreen && (
              <button
                type="button"
                onClick={onFullscreen}
                className="font-mono text-[11px] text-[#87cbb0] hover:text-white transition-colors px-1"
                title="بزرگ‌نمایی تمام صفحه"
              >
                [ Fullscreen ]
              </button>
            )}
            {showCopy && (
              <CopyButton textToCopy={content} label={hasAnsi ? 'Copy ANSI' : 'Copy ASCII'} />
            )}
          </div>
        </div>

        {/* Art Content Area */}
        <pre
          className="ascii-art text-white text-xs sm:text-sm font-mono inline-block text-left select-text leading-tight overflow-x-auto"
          dir="ltr"
          onClick={onFullscreen}
        >
          {spans.map((span, idx) => {
            const style: React.CSSProperties = {};
            if (span.fg) style.color = span.fg;
            if (span.bg) style.backgroundColor = span.bg;
            if (span.bold) style.fontWeight = 'bold';
            if (span.dim) style.opacity = 0.7;
            if (span.italic) style.fontStyle = 'italic';
            if (span.underline) style.textDecoration = 'underline';

            return (
              <span key={idx} style={style}>
                {span.content}
              </span>
            );
          })}
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
