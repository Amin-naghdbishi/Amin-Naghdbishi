import React from 'react';
import { PageType } from '../types';

interface SimpleNavProps {
  onBack: () => void;
  label?: string;
}

export const SimpleNav: React.FC<SimpleNavProps> = ({
  onBack,
  label = 'بازگشت به خانه',
}) => {
  return (
    <div className="mb-10 flex items-center">
      <a
        href="#back"
        onClick={(e) => {
          e.preventDefault();
          onBack();
        }}
        className="ascii-link font-mono text-sm text-[#9ee3c6] hover:text-white transition-colors select-none"
        dir="ltr"
      >
        &lt;- [{label}]
      </a>
    </div>
  );
};
