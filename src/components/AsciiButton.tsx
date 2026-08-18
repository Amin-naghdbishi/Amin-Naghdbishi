import React, { useState } from 'react';

interface AsciiButtonProps {
  id?: string;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  children: React.ReactNode;
  variant?: 'amber' | 'cyan' | 'emerald' | 'crimson' | 'muted';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullWidth?: boolean;
}

export const AsciiButton: React.FC<AsciiButtonProps> = ({
  id,
  onClick,
  href = '#',
  children,
  variant = 'cyan',
  size = 'md',
  className = '',
  fullWidth = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Variant color definitions (Rich retro terminal / artistic colors)
  const variantStyles = {
    amber: {
      border: isHovered ? 'text-[#fde047]' : 'text-[#f59e0b]',
      text: isHovered ? 'text-white' : 'text-[#fde047]',
      bg: isHovered ? 'bg-[#3b2d07]' : 'bg-[#1b1907]/60',
      tag: 'text-[#fef08a]',
    },
    cyan: {
      border: isHovered ? 'text-[#67e8f9]' : 'text-[#06b6d4]',
      text: isHovered ? 'text-white' : 'text-[#a5f3fc]',
      bg: isHovered ? 'bg-[#06333b]' : 'bg-[#031d22]/60',
      tag: 'text-[#67e8f9]',
    },
    emerald: {
      border: isHovered ? 'text-[#86efac]' : 'text-[#10b981]',
      text: isHovered ? 'text-white' : 'text-[#d1fae5]',
      bg: isHovered ? 'bg-[#064e3b]' : 'bg-[#022c22]/60',
      tag: 'text-[#86efac]',
    },
    crimson: {
      border: isHovered ? 'text-[#fca5a5]' : 'text-[#ef4444]',
      text: isHovered ? 'text-white' : 'text-[#fecaca]',
      bg: isHovered ? 'bg-[#450a0a]' : 'bg-[#270707]/60',
      tag: 'text-[#fca5a5]',
    },
    muted: {
      border: isHovered ? 'text-[#cbd5e1]' : 'text-[#64748b]',
      text: isHovered ? 'text-white' : 'text-[#94a3b8]',
      bg: isHovered ? 'bg-[#1e293b]' : 'bg-[#0f172a]/50',
      tag: 'text-[#94a3b8]',
    },
  }[variant];

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-3 py-1',
    lg: 'text-sm px-4 py-1.5',
  }[size];

  return (
    <a
      id={id}
      href={href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`ascii-link select-none font-mono ${fullWidth ? 'w-full block' : 'inline-block'} ${className}`}
    >
      <div className={`flex flex-col transition-all duration-150 ${variantStyles.border}`}>
        {/* Top ASCII border */}
        <div className="leading-none text-[10px] sm:text-xs overflow-hidden" dir="ltr">
          {isHovered ? '+===================================+' : '+-----------------------------------+'}
        </div>

        {/* Content with vertical ASCII side walls */}
        <div
          className={`flex items-center justify-between ${sizeClasses} ${variantStyles.bg} ${variantStyles.text} transition-colors`}
          dir="ltr"
        >
          <span className="opacity-70 font-bold select-none">|</span>
          <div className="px-2 text-center w-full flex items-center justify-center gap-1.5 font-bold">
            {children}
          </div>
          <span className="opacity-70 font-bold select-none">|</span>
        </div>

        {/* Bottom ASCII border */}
        <div className="leading-none text-[10px] sm:text-xs overflow-hidden" dir="ltr">
          {isHovered ? '+===================================+' : '+-----------------------------------+'}
        </div>
      </div>
    </a>
  );
};
