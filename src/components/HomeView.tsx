import React, { useState } from 'react';
import { PageType } from '../types';
import { articles } from '../data/articles';
import { photos } from '../data/photos';
import { paintings } from '../data/paintings';
import { asciiArts } from '../data/ascii';
import { AnsiArtRenderer } from './AnsiArtRenderer';
import { AsciiPottedFlowersFooter } from './AsciiPottedFlowersFooter';

interface HomeViewProps {
  onNavigate: (page: PageType) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Buttons order: Main content types first, and 'about' placed strictly below them
  const navItems: { id: PageType; titleEn: string; titleFa: string }[] = [
    {
      id: 'articles',
      titleEn: 'ARTICLES',
      titleFa: 'نوشته‌ها',
    },
    {
      id: 'ascii',
      titleEn: 'ASCII ART',
      titleFa: 'هنر اسکی',
    },
    {
      id: 'paintings',
      titleEn: 'PAINTINGS',
      titleFa: 'نقاشی‌ها',
    },
    {
      id: 'photos',
      titleEn: 'PHOTOS',
      titleFa: 'عکس‌ها',
    },
    {
      id: 'about',
      titleEn: 'ABOUT ME',
      titleFa: 'درباره من',
    },
  ];

  // Featured items
  const topAscii = asciiArts.find((a) => a.featured) || asciiArts[0];
  const topArticle = articles.find((a) => a.featured) || articles[0];
  const topPainting = paintings.find((p) => p.featured) || paintings[0];
  const topPhoto = photos.find((p) => p.featured) || photos[0];

  return (
    <div
      id="home-page"
      className="relative min-h-screen w-full bg-[#042417] text-[#f2f7f4] flex flex-col justify-between selection:bg-white selection:text-[#042417]"
    >
      {/* 
        Background image 'me.png':
        Hidden on mobile (< md) so site green background shows; visible on desktop (md+)
      */}
      <div
        className="hidden md:block absolute top-0 left-0 right-0 h-screen pointer-events-none z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/me.png')`,
        }}
      />

      {/* 
        Section 1: Full-height clean canvas with ASCII-framed buttons aligned to the RIGHT
      */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-between px-6 sm:px-12 py-10">
        {/* Empty top for pure silence */}
        <div className="h-6" />

        {/* Buttons aligned to the RIGHT side in pure, non-wrapping ASCII frames */}
        <div className="w-full max-w-5xl mx-auto flex flex-col items-end justify-center my-auto">
          <div className="flex flex-col gap-5 w-fit">
            {navItems.map((item) => {
              const isHovered = hoveredId === item.id;
              return (
                <a
                  key={item.id}
                  id={`nav-${item.id}`}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.id);
                  }}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="ascii-link group cursor-pointer block select-none bg-transparent"
                >
                  {/* ASCII Frame Box - completely transparent body, ASCII borders turn white on hover */}
                  <div
                    className={`font-mono transition-colors duration-150 whitespace-nowrap bg-transparent ${
                      isHovered ? 'text-white' : 'text-[#87cbb0]'
                    }`}
                  >
                    {/* Top ASCII border */}
                    <div className="text-xs sm:text-sm tracking-tighter select-none whitespace-nowrap leading-none">
                      +----------------------------------+
                    </div>
                    
                    {/* Inner content box: right-aligned English & Persian text, NO background */}
                    <div className="flex items-center justify-between px-1 py-2 bg-transparent my-[1px] min-w-[250px] sm:min-w-[280px]">
                      <span className="text-xs sm:text-sm select-none pl-1">|</span>
                      
                      <div className="flex-1 px-4 flex flex-col items-end text-right">
                        {/* English text (smaller, uppercase, aligned right) */}
                        <span
                          className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-widest transition-colors ${
                            isHovered ? 'text-white' : 'text-[#87cbb0]'
                          }`}
                          dir="ltr"
                        >
                          {item.titleEn}
                        </span>

                        {/* Persian text (larger, bold white, aligned right) */}
                        <span
                          className="font-vazir text-xl sm:text-2xl font-bold text-white leading-tight mt-0.5"
                          dir="rtl"
                        >
                          {item.titleFa}
                        </span>
                      </div>

                      <span className="text-xs sm:text-sm select-none pr-1">|</span>
                    </div>

                    {/* Bottom ASCII border */}
                    <div className="text-xs sm:text-sm tracking-tighter select-none whitespace-nowrap leading-none">
                      +----------------------------------+
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Minimal Scroll Down hint */}
        <div className="w-full text-center pb-4 select-none">
          <a
            href="#featured-section"
            onClick={(e) => {
              e.preventDefault();
              const elem = document.getElementById('featured-section');
              elem?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="ascii-link font-mono text-xs text-[#87cbb0]/80 hover:text-white transition-colors"
            dir="ltr"
          >
            [اسکرول به پایین برای برگزیده‌ها] ↓
          </a>
        </div>
      </div>

      {/* 
        Section 2: Clean and quiet Featured previews without straight dividers or green borders
        Order: 1. ASCII Art, 2. Article, 3. Painting, 4. Photo
      */}
      <div
        id="featured-section"
        className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-12 pt-16 pb-12 space-y-24"
      >
        
        {/* ۱. هنر اسکی برتر */}
        {topAscii && (
          <section id="featured-ascii" className="space-y-4">
            <div className="flex items-center justify-between pb-2">
              <h2 className="font-amiri text-2xl font-bold text-white">
                <a
                  href="#ascii"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('ascii');
                  }}
                  className="ascii-link hover:text-[#9ee3c6]"
                >
                  {topAscii.title}
                </a>
              </h2>
              <a
                href="#ascii"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('ascii');
                }}
                className="ascii-link font-mono text-xs text-[#9ee3c6] hover:text-white"
                dir="ltr"
              >
                [هنر اسکی] -&gt;
              </a>
            </div>

            <div
              onClick={() => onNavigate('ascii')}
              className="cursor-pointer bg-black p-6 overflow-x-auto text-center"
              title="کلیک برای مشاهده در گالری"
            >
              <AnsiArtRenderer
                content={topAscii.art}
                showCopy={false}
                className="!my-0 pointer-events-none"
              />
            </div>
          </section>
        )}

        {/* ۲. مقاله برتر */}
        {topArticle && (
          <section id="featured-article" className="space-y-4">
            <div className="flex items-center justify-between pb-2">
              <div className="font-mono text-xs text-[#6ee7b7]" dir="ltr">
                {topArticle.date}
              </div>
              <a
                href="#articles"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('articles');
                }}
                className="ascii-link font-mono text-xs text-[#9ee3c6] hover:text-white"
                dir="ltr"
              >
                [نوشته‌ها] -&gt;
              </a>
            </div>

            <h2 className="font-amiri text-2xl sm:text-3xl font-bold text-white">
              <a
                href="#article-top"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('articles');
                }}
                className="ascii-link hover:text-[#9ee3c6] transition-colors"
              >
                {topArticle.title}
              </a>
            </h2>

            <p className="font-vazir text-base sm:text-lg text-[#e2f4ec] leading-relaxed max-w-3xl font-light">
              {topArticle.excerpt}
            </p>

            <div>
              <a
                href="#read-more"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('articles');
                }}
                className="ascii-link font-mono text-sm text-[#34d399] hover:text-white"
                dir="ltr"
              >
                &lt;- [ادامه مطلب را بخوانید]
              </a>
            </div>
          </section>
        )}

        {/* ۳. نقاشی برتر */}
        {topPainting && (
          <section id="featured-painting" className="space-y-4">
            <div className="flex items-center justify-between pb-2">
              <h2 className="font-amiri text-2xl font-bold text-white">
                <a
                  href="#paintings"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('paintings');
                  }}
                  className="ascii-link hover:text-[#9ee3c6]"
                >
                  {topPainting.title}
                </a>
              </h2>
              <a
                href="#paintings"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('paintings');
                }}
                className="ascii-link font-mono text-xs text-[#9ee3c6] hover:text-white"
                dir="ltr"
              >
                [نقاشی‌ها] -&gt;
              </a>
            </div>

            <div
              onClick={() => onNavigate('paintings')}
              className="cursor-pointer bg-black p-3 overflow-hidden flex justify-center"
            >
              <img
                src={topPainting.imageUrl}
                alt={topPainting.title}
                className="w-auto h-auto max-h-[500px] object-contain hover:scale-[1.01] transition-transform duration-300"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </section>
        )}

        {/* ۴. عکس برتر */}
        {topPhoto && (
          <section id="featured-photo" className="space-y-4">
            <div className="flex items-center justify-between pb-2">
              <h2 className="font-amiri text-2xl font-bold text-white">
                <a
                  href="#photos"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('photos');
                  }}
                  className="ascii-link hover:text-[#9ee3c6]"
                >
                  {topPhoto.title}
                </a>
              </h2>
              <a
                href="#photos"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('photos');
                }}
                className="ascii-link font-mono text-xs text-[#9ee3c6] hover:text-white"
                dir="ltr"
              >
                [عکس‌ها] -&gt;
              </a>
            </div>

            <div
              onClick={() => onNavigate('photos')}
              className="cursor-pointer bg-black p-3 overflow-hidden flex justify-center"
            >
              <img
                src={topPhoto.imageUrl}
                alt={topPhoto.title}
                className="w-auto h-auto max-h-[500px] object-contain hover:scale-[1.01] transition-transform duration-300"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </section>
        )}
      </div>

      {/* Footer with colorful potted ASCII flowers */}
      <AsciiPottedFlowersFooter />
    </div>
  );
};
