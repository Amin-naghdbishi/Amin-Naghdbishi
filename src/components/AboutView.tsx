import React from 'react';
import { PageType } from '../types';
import { aboutData } from '../data/about';
import { SimpleNav } from './SimpleNav';
import { AsciiPottedFlowersFooter } from './AsciiPottedFlowersFooter';

interface AboutViewProps {
  onNavigate: (page: PageType) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div
      id="about-page"
      className="min-h-screen w-full bg-[#042417] text-[#f4fbf7] flex flex-col justify-between selection:bg-white selection:text-[#042417]"
    >
      <div className="max-w-2xl w-full mx-auto px-6 sm:px-12 py-10 sm:py-16 flex-1">
        <SimpleNav onBack={() => onNavigate('home')} label="بازگشت به خانه" />

        {/* Header */}
        <div className="font-mono text-xs text-[#87cbb0] mb-2" dir="ltr">
          // ABOUT_ME // PROFILE
        </div>

        <h1 className="font-amiri text-3xl sm:text-4xl font-bold text-white mb-2 leading-snug">
          درباره من
        </h1>

        <p className="font-mono text-sm text-[#87cbb0] mb-8" dir="rtl">
          {aboutData.name} — {aboutData.subtitle}
        </p>

        {/* Bio Section */}
        <div className="mb-10 font-vazir text-base sm:text-lg leading-relaxed text-[#e2f4ec] whitespace-pre-line space-y-4 font-light">
          {aboutData.bio}
        </div>

        {/* ASCII divider */}
        <div className="font-mono text-xs text-[#529d7c] my-8 select-none overflow-hidden" dir="ltr">
          +-------------------------------------------------------------------------------+
        </div>

        {/* Contact Information & Channels */}
        <div className="space-y-6">
          <h2 className="font-amiri text-xl font-bold text-white mb-4">
            راه‌های ارتباطی و کانال‌ها
          </h2>

          <div className="space-y-4 font-mono text-sm">
            {/* Phone */}
            {aboutData.phone && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#0d593d] pb-2">
                <span className="text-[#87cbb0] font-sans text-xs sm:text-sm">شماره تماس:</span>
                <a
                  href={`tel:${aboutData.phone.replace(/\s+/g, '')}`}
                  className="ascii-link text-[#e2f4ec] hover:text-white"
                  dir="ltr"
                >
                  {aboutData.phone}
                </a>
              </div>
            )}

            {/* Email */}
            {aboutData.email && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#0d593d] pb-2">
                <span className="text-[#87cbb0] font-sans text-xs sm:text-sm">ایمیل:</span>
                <a
                  href={`mailto:${aboutData.email}`}
                  className="ascii-link text-[#e2f4ec] hover:text-white"
                  dir="ltr"
                >
                  {aboutData.email}
                </a>
              </div>
            )}

            {/* Telegram */}
            {aboutData.telegram && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#0d593d] pb-2">
                <span className="text-[#87cbb0] font-sans text-xs sm:text-sm">کانال / آیدی تلگرام:</span>
                <a
                  href={aboutData.telegram.startsWith('http') ? aboutData.telegram : `https://t.me/${aboutData.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ascii-link text-[#e2f4ec] hover:text-white"
                  dir="ltr"
                >
                  {aboutData.telegram}
                </a>
              </div>
            )}

            {/* Instagram */}
            {aboutData.instagram && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#0d593d] pb-2">
                <span className="text-[#87cbb0] font-sans text-xs sm:text-sm">اینستاگرام:</span>
                <a
                  href={aboutData.instagram.startsWith('http') ? aboutData.instagram : `https://instagram.com/${aboutData.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ascii-link text-[#e2f4ec] hover:text-white"
                  dir="ltr"
                >
                  {aboutData.instagram}
                </a>
              </div>
            )}

            {/* YouTube */}
            {aboutData.youtube && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#0d593d] pb-2">
                <span className="text-[#87cbb0] font-sans text-xs sm:text-sm">یوتیوب:</span>
                <a
                  href={aboutData.youtube.startsWith('http') ? aboutData.youtube : `https://youtube.com/${aboutData.youtube}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ascii-link text-[#e2f4ec] hover:text-white"
                  dir="ltr"
                >
                  {aboutData.youtube}
                </a>
              </div>
            )}

            {/* X / Twitter */}
            {aboutData.xTwitter && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#0d593d] pb-2">
                <span className="text-[#87cbb0] font-sans text-xs sm:text-sm">توییتر / X:</span>
                <a
                  href={aboutData.xTwitter.startsWith('http') ? aboutData.xTwitter : `https://x.com/${aboutData.xTwitter.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ascii-link text-[#e2f4ec] hover:text-white"
                  dir="ltr"
                >
                  {aboutData.xTwitter}
                </a>
              </div>
            )}

            {/* GitHub */}
            {aboutData.github && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#0d593d] pb-2">
                <span className="text-[#87cbb0] font-sans text-xs sm:text-sm">گیت‌هاب:</span>
                <a
                  href={aboutData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ascii-link text-[#e2f4ec] hover:text-white"
                  dir="ltr"
                >
                  {aboutData.github}
                </a>
              </div>
            )}

            {/* Location */}
            {aboutData.location && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#0d593d] pb-2">
                <span className="text-[#87cbb0] font-sans text-xs sm:text-sm">موقعیت:</span>
                <span className="text-[#e2f4ec]" dir="rtl">
                  {aboutData.location}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Interests & Topics */}
        {aboutData.skillsOrInterests && (
          <div className="mt-10">
            <h2 className="font-amiri text-xl font-bold text-white mb-3">
              زمینه‌های فعالیت و علایق
            </h2>
            <ul className="space-y-1.5 font-vazir text-sm text-[#cce8dc] list-none p-0">
              {aboutData.skillsOrInterests.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#87cbb0] font-mono select-none">&gt;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12 pt-6">
          <SimpleNav onBack={() => onNavigate('home')} label="بازگشت به خانه" />
        </div>
      </div>

      {/* Potted flowers footer */}
      <AsciiPottedFlowersFooter />
    </div>
  );
};
