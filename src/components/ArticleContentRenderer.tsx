import React, { useState, useEffect } from 'react';
import { ContentBlock } from '../types';
import { RichMarkdownRenderer } from './RichMarkdownRenderer';
import { MathRenderer } from './MathRenderer';
import { CodeBlockRenderer } from './CodeBlockRenderer';
import { WritingBoxRenderer } from './WritingBoxRenderer';
import { AnsiArtRenderer } from './AnsiArtRenderer';
import { CopyButton } from './CopyButton';
import { isAnsiContent } from '../utils/ansi';

interface ArticleContentRendererProps {
  content?: string;
  blocks?: ContentBlock[];
}

export const ArticleContentRenderer: React.FC<ArticleContentRendererProps> = ({
  content,
  blocks: explicitBlocks,
}) => {
  const [fullscreenMedia, setFullscreenMedia] = useState<{
    type: 'img' | 'ascii' | 'ansi';
    data: string;
    caption?: string;
  } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && fullscreenMedia) {
        setFullscreenMedia(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenMedia]);

  // Parse string content into structured ContentBlocks if explicitBlocks not provided
  const blocks: ContentBlock[] = React.useMemo(() => {
    if (explicitBlocks && explicitBlocks.length > 0) {
      return explicitBlocks;
    }

    if (!content) return [];

    const parsedBlocks: ContentBlock[] = [];
    const lines = content.split('\n');
    let currentMarkdownLines: string[] = [];

    let currentMode: 'none' | 'ascii' | 'ansi' | 'writing' | 'code' | 'math' = 'none';
    let currentBlockBuffer: string[] = [];
    let currentBlockMeta: {
      align?: 'center' | 'left' | 'right';
      caption?: string;
      language?: string;
      title?: string;
    } = {};

    const flushMarkdown = () => {
      if (currentMarkdownLines.length > 0) {
        const textVal = currentMarkdownLines.join('\n').trim();
        if (textVal) {
          parsedBlocks.push({ type: 'markdown', content: textVal });
        }
        currentMarkdownLines = [];
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const rawLine = lines[i];
      const trimmed = rawLine.trim();

      // Handling active multi-line block modes
      if (currentMode !== 'none') {
        let isEnd = false;

        if (currentMode === 'ascii' && (trimmed.startsWith('[/ascii') || trimmed === '[/asciicenter]' || trimmed === '[/asciileft]' || trimmed === '[/asciiright]')) {
          isEnd = true;
          parsedBlocks.push({
            type: 'ascii',
            content: currentBlockBuffer.join('\n'),
            align: currentBlockMeta.align || 'center',
            caption: currentBlockMeta.caption,
          });
        } else if (currentMode === 'ansi' && (trimmed.startsWith('[/ansi') || trimmed === '```')) {
          isEnd = true;
          parsedBlocks.push({
            type: 'ansi',
            content: currentBlockBuffer.join('\n'),
            align: currentBlockMeta.align || 'center',
            caption: currentBlockMeta.caption,
          });
        } else if (currentMode === 'writing' && (trimmed.startsWith('[/writing') || trimmed.startsWith('[/raw'))) {
          isEnd = true;
          parsedBlocks.push({
            type: 'writing',
            content: currentBlockBuffer.join('\n'),
            title: currentBlockMeta.title,
            caption: currentBlockMeta.caption,
          });
        } else if (currentMode === 'code' && (trimmed.startsWith('[/code') || trimmed === '```')) {
          isEnd = true;
          parsedBlocks.push({
            type: 'code',
            code: currentBlockBuffer.join('\n'),
            language: currentBlockMeta.language,
            caption: currentBlockMeta.caption,
          });
        } else if (currentMode === 'math' && (trimmed.startsWith('[/math') || trimmed === '$$')) {
          isEnd = true;
          parsedBlocks.push({
            type: 'math',
            latex: currentBlockBuffer.join('\n'),
            caption: currentBlockMeta.caption,
          });
        } else {
          currentBlockBuffer.push(rawLine);
          continue;
        }

        if (isEnd) {
          currentMode = 'none';
          currentBlockBuffer = [];
          currentBlockMeta = {};
          continue;
        }
      }

      // Check ASCII block starts
      const asciiMatch = trimmed.match(/^\[(asciicenter|asciileft|asciiright)(?::\s*([^\]]*))?\]$/i);
      if (asciiMatch) {
        flushMarkdown();
        currentMode = 'ascii';
        const alignType = asciiMatch[1].toLowerCase();
        currentBlockMeta = {
          align: alignType.includes('left') ? 'left' : alignType.includes('right') ? 'right' : 'center',
          caption: asciiMatch[2] ? asciiMatch[2].trim() : undefined,
        };
        currentBlockBuffer = [];
        continue;
      }

      // Check ANSI block starts
      const ansiMatch = trimmed.match(/^\[(ansicenter|ansileft|ansiright|ansi)(?::\s*([^\]]*))?\]$/i);
      if (ansiMatch) {
        flushMarkdown();
        currentMode = 'ansi';
        const alignType = ansiMatch[1].toLowerCase();
        currentBlockMeta = {
          align: alignType.includes('left') ? 'left' : alignType.includes('right') ? 'right' : 'center',
          caption: ansiMatch[2] ? ansiMatch[2].trim() : undefined,
        };
        currentBlockBuffer = [];
        continue;
      }

      // Check Writing Block starts: [writing: Title | Caption] or [writing]
      const writingMatch = trimmed.match(/^\[(writing|raw)(?::\s*([^\]]*))?\]$/i);
      if (writingMatch) {
        flushMarkdown();
        currentMode = 'writing';
        let title = 'WRITING / RAW NOTE';
        let caption: string | undefined = undefined;
        if (writingMatch[2]) {
          const parts = writingMatch[2].split('|');
          title = parts[0].trim() || title;
          caption = parts[1] ? parts[1].trim() : undefined;
        }
        currentBlockMeta = { title, caption };
        currentBlockBuffer = [];
        continue;
      }

      // Check Code Block starts: [code:python | caption]
      const codeMatch = trimmed.match(/^\[code(?::\s*([^\]]*))?\]$/i);
      if (codeMatch) {
        flushMarkdown();
        currentMode = 'code';
        let language = 'text';
        let caption: string | undefined = undefined;
        if (codeMatch[1]) {
          const parts = codeMatch[1].split('|');
          language = parts[0].trim() || 'text';
          caption = parts[1] ? parts[1].trim() : undefined;
        }
        currentBlockMeta = { language, caption };
        currentBlockBuffer = [];
        continue;
      }

      // Check Math Block starts: [math: caption]
      const mathMatch = trimmed.match(/^\[math(?::\s*([^\]]*))?\]$/i);
      if (mathMatch) {
        flushMarkdown();
        currentMode = 'math';
        currentBlockMeta = { caption: mathMatch[1] ? mathMatch[1].trim() : undefined };
        currentBlockBuffer = [];
        continue;
      }

      // Check Image directive: [imgcenter: URL | Caption]
      const imgMatch = trimmed.match(/^\[(imgcenter|imgleft|imgright):\s*([^\]]+)\]$/i);
      if (imgMatch) {
        flushMarkdown();
        const alignStr = imgMatch[1].toLowerCase();
        const align: 'center' | 'left' | 'right' = alignStr.includes('left')
          ? 'left'
          : alignStr.includes('right')
          ? 'right'
          : 'center';

        const payload = imgMatch[2].trim();
        let url = payload;
        let caption: string | undefined = undefined;

        if (payload.includes('|')) {
          const parts = payload.split('|');
          url = parts[0].trim();
          caption = parts.slice(1).join('|').trim();
        }

        parsedBlocks.push({
          type: 'image',
          url,
          caption,
          align,
        });
        continue;
      }

      // Normal markdown line
      currentMarkdownLines.push(rawLine);
    }

    flushMarkdown();
    return parsedBlocks;
  }, [content, explicitBlocks]);

  return (
    <div className="article-content space-y-6">
      {/* Fullscreen Overlay */}
      {fullscreenMedia && (
        <div
          id="article-fullscreen-overlay"
          className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-4 sm:p-8"
        >
          <div className="flex items-center justify-between z-10">
            <a
              href="#close"
              onClick={(e) => {
                e.preventDefault();
                setFullscreenMedia(null);
              }}
              className="ascii-link font-mono text-sm text-[#9ee3c6] hover:text-white transition-colors select-none"
              dir="ltr"
            >
              &lt;- [بازگشت]
            </a>

            {fullscreenMedia.caption && (
              <span className="font-mono text-xs text-[#6ee7b7]" dir="rtl">
                {fullscreenMedia.caption}
              </span>
            )}
          </div>

          <div className="flex-1 w-full h-full flex items-center justify-center overflow-auto my-auto p-2">
            {fullscreenMedia.type === 'img' ? (
              <img
                src={fullscreenMedia.data}
                alt={fullscreenMedia.caption || 'Article media'}
                className="max-h-[90vh] max-w-[95vw] w-auto h-auto object-contain"
                referrerPolicy="no-referrer"
              />
            ) : fullscreenMedia.type === 'ansi' ? (
              <div className="overflow-auto max-w-[95vw] max-h-[85vh]">
                <AnsiArtRenderer
                  content={fullscreenMedia.data}
                  showCopy={true}
                  align="center"
                />
              </div>
            ) : (
              <pre
                className="ascii-art text-white text-xs sm:text-sm md:text-base font-mono inline-block text-left select-text"
                dir="ltr"
              >
                {fullscreenMedia.data.trim()}
              </pre>
            )}
          </div>

          <div className="font-mono text-xs text-[#529d7c] text-center select-none z-10" dir="ltr">
            [ESC] یا کلیک روی بازگشت
          </div>
        </div>
      )}

      {/* Render all content blocks */}
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'markdown':
            return (
              <RichMarkdownRenderer
                key={idx}
                content={block.content}
                className="my-3"
              />
            );

          case 'math':
            return (
              <MathRenderer
                key={idx}
                latex={block.latex}
                caption={block.caption}
                displayMode={true}
                showCopy={true}
              />
            );

          case 'code':
            return (
              <CodeBlockRenderer
                key={idx}
                code={block.code}
                language={block.language}
                filename={block.filename}
                caption={block.caption}
                showCopy={true}
              />
            );

          case 'writing':
            return (
              <WritingBoxRenderer
                key={idx}
                content={block.content}
                title={block.title}
                caption={block.caption}
                showCopy={true}
              />
            );

          case 'image': {
            const alignClass =
              block.align === 'center'
                ? 'mx-auto text-center'
                : block.align === 'left'
                ? 'sm:float-left sm:mr-6 sm:mb-4 sm:max-w-sm clear-both text-left'
                : 'sm:float-right sm:ml-6 sm:mb-4 sm:max-w-sm clear-both text-right';

            return (
              <div key={idx} className={`my-6 my-img-block ${alignClass}`}>
                <div
                  onClick={() =>
                    setFullscreenMedia({
                      type: 'img',
                      data: block.url,
                      caption: block.caption,
                    })
                  }
                  className="inline-block cursor-pointer bg-black p-2"
                  title="کلیک برای بزرگ‌نمایی"
                >
                  <img
                    src={block.url}
                    alt={block.alt || block.caption || 'تصویر مقاله'}
                    className="max-h-[60vh] max-w-full w-auto object-contain"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {block.caption && (
                  <div className="mt-1.5 px-1">
                    <RichMarkdownRenderer
                      content={block.caption}
                      className="text-xs text-[#87cbb0]"
                    />
                  </div>
                )}
              </div>
            );
          }

          case 'ascii': {
            const isAnsi = isAnsiContent(block.content);
            if (isAnsi) {
              return (
                <AnsiArtRenderer
                  key={idx}
                  content={block.content}
                  caption={block.caption}
                  title={block.title}
                  align={block.align || 'center'}
                  showCopy={true}
                  onFullscreen={() =>
                    setFullscreenMedia({
                      type: 'ansi',
                      data: block.content,
                      caption: block.caption,
                    })
                  }
                />
              );
            }

            const alignClass =
              block.align === 'center'
                ? 'mx-auto text-center'
                : block.align === 'left'
                ? 'sm:float-left sm:mr-6 sm:mb-4 clear-both text-left'
                : 'sm:float-right sm:ml-6 sm:mb-4 clear-both text-right';

            return (
              <div key={idx} className={`my-6 my-ascii-block ${alignClass}`}>
                <div className="bg-black p-4 max-w-full overflow-x-auto text-left relative group">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#093522]/60 select-none">
                    <span className="font-mono text-[10px] tracking-widest text-[#529d7c]">
                      ASCII ART {block.title ? `| ${block.title}` : ''}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setFullscreenMedia({
                            type: 'ascii',
                            data: block.content,
                            caption: block.caption,
                          })
                        }
                        className="font-mono text-[11px] text-[#87cbb0] hover:text-white transition-colors px-1"
                        title="بزرگ‌نمایی تمام صفحه"
                      >
                        [ Fullscreen ]
                      </button>
                      <CopyButton textToCopy={block.content} label="Copy ASCII" />
                    </div>
                  </div>

                  <pre
                    onClick={() =>
                      setFullscreenMedia({
                        type: 'ascii',
                        data: block.content,
                        caption: block.caption,
                      })
                    }
                    className="ascii-art text-white text-xs sm:text-sm font-mono inline-block text-left select-text cursor-pointer leading-tight"
                    dir="ltr"
                    title="کلیک برای بزرگ‌نمایی"
                  >
                    {block.content.trim()}
                  </pre>
                </div>

                {block.caption && (
                  <div className="mt-1.5 px-1 text-right">
                    <RichMarkdownRenderer
                      content={block.caption}
                      className="text-xs text-[#87cbb0]"
                    />
                  </div>
                )}
              </div>
            );
          }

          case 'ansi':
            return (
              <AnsiArtRenderer
                key={idx}
                content={block.content}
                caption={block.caption}
                title={block.title}
                align={block.align || 'center'}
                showCopy={true}
                onFullscreen={() =>
                  setFullscreenMedia({
                    type: 'ansi',
                    data: block.content,
                    caption: block.caption,
                  })
                }
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
};
