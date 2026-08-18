import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { CodeBlockRenderer } from './CodeBlockRenderer';

interface RichMarkdownRendererProps {
  content: string;
  className?: string;
}

export const RichMarkdownRenderer: React.FC<RichMarkdownRendererProps> = ({
  content,
  className = '',
}) => {
  return (
    <div className={`rich-markdown font-vazir text-base sm:text-lg leading-relaxed text-[#e2f4ec] font-light ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-amiri text-2xl sm:text-3xl font-bold text-white mt-8 mb-4 border-b border-[#0d593d]/50 pb-2">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-amiri text-xl sm:text-2xl font-bold text-white mt-7 mb-3">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-amiri text-lg sm:text-xl font-bold text-[#b4f0d6] mt-6 mb-2">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="my-4 leading-relaxed text-[#e2f4ec] font-light">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-white font-normal sm:font-semibold">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-[#a8ebd0]">
              {children}
            </em>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside my-4 space-y-1.5 pr-4 text-[#d1ece0]">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside my-4 space-y-1.5 pr-4 text-[#d1ece0]">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-r-2 border-[#10b981] pr-4 my-6 py-1 text-[#a8ebd0] bg-[#021a10]/40 font-serif italic">
              {children}
            </blockquote>
          ),
          hr: () => (
            <hr className="my-8 border-[#0d593d]/50" />
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-[#34d399] underline underline-offset-4 hover:text-white transition-colors"
            >
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto">
              <table className="min-w-full border border-[#0d593d] text-sm text-right">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[#021f14] border-b border-[#0d593d] text-white">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-[#093522]">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-[#032b1c]/50 transition-colors">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2.5 font-bold font-mono text-xs text-[#6ee7b7]">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2 text-[#e2f4ec] font-vazir">
              {children}
            </td>
          ),
          code: ({ inline, className, children }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');

            if (!inline && (match || codeString.includes('\n'))) {
              return (
                <CodeBlockRenderer
                  code={codeString}
                  language={match ? match[1] : undefined}
                />
              );
            }

            return (
              <code className="font-mono text-xs sm:text-sm bg-black/60 text-[#34d399] px-1.5 py-0.5 border border-[#0d593d]/40 mx-0.5 inline-block" dir="ltr">
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
