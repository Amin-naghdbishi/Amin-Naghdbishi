import React, { useState, useEffect } from 'react';
import { PageType } from '../types';
import { asciiArts } from '../data/ascii';
import { SimpleNav } from './SimpleNav';
import { AsciiPottedFlowersFooter } from './AsciiPottedFlowersFooter';
import { AnsiArtRenderer } from './AnsiArtRenderer';
import { RichMarkdownRenderer } from './RichMarkdownRenderer';
import { CopyButton } from './CopyButton';
import { isAnsiContent } from '../utils/ansi';

interface AsciiGalleryViewProps {
  onNavigate: (page: PageType) => void;
}

export const AsciiGalleryView: React.FC<AsciiGalleryViewProps> = ({ onNavigate }) => {
  const [selectedArtId, setSelectedArtId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const selectedArt = asciiArts.find((item) => item.id === selectedArtId);

  // Close fullscreen on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Fullscreen view
  if (selectedArt && isFullscreen) {
    const isAnsi = isAnsiContent(selectedArt.art);

    return (
      <div
        id="fullscreen-ascii-overlay"
        className="fixed inset-0 z-50 bg-black text-white p-6 sm:p-10 flex flex-col justify-between overflow-auto"
      >
        <div className="flex items-center justify-between mb-4">
          <a
            href="#close-fullscreen"
            onClick={(e) => {
              e.preventDefault();
              setIsFullscreen(false);
            }}
            className="ascii-link font-mono text-sm text-[#9ee3c6] hover:text-white transition-colors select-none"
            dir="ltr"
          >
            &lt;- [بازگشت]
          </a>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#6ee7b7]" dir="ltr">
              {selectedArt.title}
            </span>
            <CopyButton
              textToCopy={selectedArt.art}
              label={isAnsi ? 'Copy ANSI' : 'Copy ASCII'}
            />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center my-auto overflow-auto py-6">
          {isAnsi ? (
            <AnsiArtRenderer
              content={selectedArt.art}
              showCopy={false}
              className="!my-0 max-w-full"
            />
          ) : (
            <pre
              className="ascii-art text-white text-xs sm:text-sm md:text-base font-mono inline-block text-left select-text leading-tight"
              dir="ltr"
            >
              {selectedArt.art.trim()}
            </pre>
          )}
        </div>

        <div className="font-mono text-xs text-[#529d7c] text-center mt-4 select-none" dir="ltr">
          [ESC] یا کلیک روی بازگشت
        </div>
      </div>
    );
  }

  return (
    <div
      id="ascii-gallery-page"
      className="min-h-screen w-full bg-[#042417] text-[#f4fbf7] flex flex-col justify-between selection:bg-white selection:text-[#042417]"
    >
      <div className="max-w-3xl w-full mx-auto px-6 sm:px-12 py-10 sm:py-16 flex-1">
        {selectedArt ? (
          /* Single ASCII/ANSI Art view */
          <div>
            {/* Top row: Single back button & Single Fullscreen button */}
            <div className="mb-8 flex items-center justify-between">
              <SimpleNav
                onBack={() => setSelectedArtId(null)}
                label="بازگشت به فهرست"
              />

              <a
                id="expand-ascii-btn"
                href="#fullscreen"
                onClick={(e) => {
                  e.preventDefault();
                  setIsFullscreen(true);
                }}
                className="ascii-link font-mono text-sm text-[#9ee3c6] hover:text-white transition-colors select-none mb-10"
                dir="ltr"
              >
                [بزرگ‌نمایی تمام صفحه] -&gt;
              </a>
            </div>

            <div className="font-mono text-xs text-[#87cbb0] mb-2" dir="ltr">
              {selectedArt.date}
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-white mb-6">
              {selectedArt.title}
            </h1>

            {/* Black Background ASCII/ANSI Canvas with Copy button */}
            <AnsiArtRenderer
              content={selectedArt.art}
              showCopy={true}
              align="center"
              onFullscreen={() => setIsFullscreen(true)}
            />

            {/* Rich Markdown / Math Description if present */}
            {selectedArt.description && (
              <div className="mt-6 pt-4 border-t border-[#093522]">
                <RichMarkdownRenderer
                  content={selectedArt.description}
                  className="text-sm sm:text-base text-[#beded0]"
                />
              </div>
            )}
          </div>
        ) : (
          /* ASCII/ANSI List */
          <div>
            <SimpleNav
              onBack={() => onNavigate('home')}
              label="بازگشت به خانه"
            />

            <div className="space-y-12 mt-4">
              {asciiArts.map((item) => {
                const isAnsi = isAnsiContent(item.art);

                return (
                  <div key={item.id} className="group">
                    <div className="flex items-center justify-between font-mono text-xs text-[#87cbb0] mb-1" dir="ltr">
                      <span>{item.date}</span>
                      <span className="text-[10px] text-[#529d7c] uppercase">
                        {isAnsi ? 'ANSI' : 'ASCII'}
                      </span>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-white mb-3">
                      <a
                        id={`ascii-item-${item.id}`}
                        href={`#ascii-${item.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedArtId(item.id);
                        }}
                        className="ascii-link hover:text-[#9ef3cf] transition-colors"
                      >
                        {item.title}
                      </a>
                    </h2>

                    {/* Black Background ASCII/ANSI Preview */}
                    <div
                      onClick={() => setSelectedArtId(item.id)}
                      className="cursor-pointer bg-black p-4 overflow-x-auto text-center"
                    >
                      {isAnsi ? (
                        <AnsiArtRenderer
                          content={item.art}
                          showCopy={false}
                          className="!my-0 pointer-events-none"
                        />
                      ) : (
                        <pre
                          className="ascii-art text-white text-xs font-mono inline-block text-left select-none leading-tight"
                          dir="ltr"
                        >
                          {item.art.trim()}
                        </pre>
                      )}
                    </div>

                    {item.description && (
                      <div className="mt-2 text-xs text-[#87cbb0] line-clamp-2">
                        {item.description}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Potted flowers footer */}
      <AsciiPottedFlowersFooter />
    </div>
  );
};
