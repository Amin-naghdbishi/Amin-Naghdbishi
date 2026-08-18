import React, { useState } from 'react';
import { PageType } from '../types';
import { articles } from '../data/articles';
import { SimpleNav } from './SimpleNav';
import { ArticleContentRenderer } from './ArticleContentRenderer';
import { AsciiPottedFlowersFooter } from './AsciiPottedFlowersFooter';

interface ArticlesViewProps {
  onNavigate: (page: PageType) => void;
}

export const ArticlesView: React.FC<ArticlesViewProps> = ({ onNavigate }) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const selectedArticle = articles.find((a) => a.id === selectedArticleId);

  return (
    <div
      id="articles-page"
      className="min-h-screen w-full bg-[#042417] text-[#f4fbf7] flex flex-col justify-between selection:bg-white selection:text-[#042417]"
    >
      <div className="max-w-2xl w-full mx-auto px-6 sm:px-12 py-10 sm:py-16 flex-1">
        {selectedArticle ? (
          /* Single Article Reader */
          <article>
            <SimpleNav
              onBack={() => setSelectedArticleId(null)}
              label="بازگشت به فهرست"
            />

            <div className="font-mono text-xs text-[#87cbb0] mb-2" dir="ltr">
              {selectedArticle.date}
            </div>

            <h1 className="font-amiri text-2xl sm:text-3xl font-bold text-white mb-8 leading-snug">
              {selectedArticle.title}
            </h1>

            <ArticleContentRenderer
              content={selectedArticle.content}
              blocks={selectedArticle.blocks}
            />

            <div className="mt-12 pt-8">
              <SimpleNav
                onBack={() => setSelectedArticleId(null)}
                label="بازگشت به فهرست"
              />
            </div>
          </article>
        ) : (
          /* Articles List */
          <div>
            <SimpleNav
              onBack={() => onNavigate('home')}
              label="بازگشت به خانه"
            />

            <div className="space-y-8 mt-4">
              {articles.map((article) => (
                <div key={article.id} className="group">
                  <div className="font-mono text-xs text-[#87cbb0] mb-1" dir="ltr">
                    {article.date}
                  </div>

                  <h2 className="font-amiri text-lg sm:text-xl font-bold text-white mb-2">
                    <a
                      id={`article-item-${article.id}`}
                      href={`#article-${article.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedArticleId(article.id);
                      }}
                      className="ascii-link hover:text-[#9ef3cf] transition-colors"
                    >
                      {article.title}
                    </a>
                  </h2>

                  <p className="font-vazir text-base text-[#beded0] leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
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
