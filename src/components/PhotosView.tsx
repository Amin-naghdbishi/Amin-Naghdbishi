import React, { useState, useEffect } from 'react';
import { PageType } from '../types';
import { photos } from '../data/photos';
import { SimpleNav } from './SimpleNav';
import { AsciiPottedFlowersFooter } from './AsciiPottedFlowersFooter';
import { RichMarkdownRenderer } from './RichMarkdownRenderer';

interface PhotosViewProps {
  onNavigate: (page: PageType) => void;
}

export const PhotosView: React.FC<PhotosViewProps> = ({ onNavigate }) => {
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const selectedPhoto = photos.find((p) => p.id === selectedPhotoId);

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
  if (selectedPhoto && isFullscreen) {
    return (
      <div
        id="fullscreen-photo-overlay"
        className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-4 sm:p-8"
      >
        <div className="flex items-center justify-between z-10">
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

          <span className="font-mono text-xs text-[#6ee7b7]" dir="ltr">
            {selectedPhoto.title}
          </span>
        </div>

        <div className="flex-1 w-full h-full flex items-center justify-center overflow-hidden my-auto p-2">
          <img
            src={selectedPhoto.imageUrl}
            alt={selectedPhoto.title}
            className="max-h-[90vh] max-w-[95vw] w-auto h-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="font-mono text-xs text-[#529d7c] text-center select-none z-10" dir="ltr">
          [ESC] یا کلیک روی بازگشت
        </div>
      </div>
    );
  }

  return (
    <div
      id="photos-page"
      className="min-h-screen w-full bg-[#042417] text-[#f4fbf7] flex flex-col justify-between selection:bg-white selection:text-[#042417]"
    >
      <div className="max-w-4xl w-full mx-auto px-6 sm:px-12 py-10 sm:py-16 flex-1">
        {selectedPhoto ? (
          /* Single Photo View */
          <div>
            {/* Top row: Single back button & Single Fullscreen button */}
            <div className="mb-8 flex items-center justify-between">
              <SimpleNav
                onBack={() => setSelectedPhotoId(null)}
                label="بازگشت به فهرست"
              />

              <a
                id="expand-photo-btn"
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

            <div
              onClick={() => setIsFullscreen(true)}
              className="cursor-pointer w-full flex justify-center bg-black py-4 mb-4"
              title="کلیک برای نمایش تمام صفحه"
            >
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="max-h-[75vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="font-mono text-xs text-[#87cbb0] mb-1" dir="ltr">
              {selectedPhoto.date} {selectedPhoto.location ? `| ${selectedPhoto.location}` : ''} {selectedPhoto.camera ? `| ${selectedPhoto.camera}` : ''}
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-white mb-4">
              {selectedPhoto.title}
            </h1>

            {selectedPhoto.description && (
              <div className="mt-4 pt-4 border-t border-[#093522]">
                <RichMarkdownRenderer
                  content={selectedPhoto.description}
                  className="text-sm sm:text-base text-[#beded0]"
                />
              </div>
            )}
          </div>
        ) : (
          /* Photos Grid */
          <div>
            <SimpleNav
              onBack={() => onNavigate('home')}
              label="بازگشت به خانه"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4">
              {photos.map((photo) => (
                <div key={photo.id} className="group">
                  <div
                    onClick={() => setSelectedPhotoId(photo.id)}
                    className="cursor-pointer aspect-square bg-black mb-3 overflow-hidden"
                  >
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="font-mono text-xs text-[#87cbb0] mb-0.5" dir="ltr">
                    {photo.date}
                  </div>

                  <h2 className="text-sm sm:text-base font-bold text-white">
                    <a
                      id={`photo-item-${photo.id}`}
                      href={`#photo-${photo.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedPhotoId(photo.id);
                      }}
                      className="ascii-link hover:text-[#9ef3cf] transition-colors"
                    >
                      {photo.title}
                    </a>
                  </h2>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Potted flowers footer */}
      <AsciiPottedFlowersFooter />
    </div>
  );
};
