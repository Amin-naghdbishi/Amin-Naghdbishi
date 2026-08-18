import React from 'react';

export const AsciiPottedFlowersFooter: React.FC = () => {
  return (
    <footer
      id="ascii-flowers-footer"
      className="w-full bg-black border-t border-[#093522] mt-16 py-6 px-2 sm:px-4 select-none overflow-hidden text-center"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
        {/* Mobile View: 4 Colorful ASCII Potted Flowers (No scroll) */}
        <div className="block md:hidden w-full overflow-hidden text-center">
          <pre
            className="ascii-art text-xs font-mono inline-block text-left"
            dir="ltr"
          >
            {/* Layer 1: Blossoms (4 pots) */}
            <span className="text-[#ff7b90]">   (@)     </span>
            <span className="text-[#fbbf24]">   \*/     </span>
            <span className="text-[#a78bfa]">   (O)     </span>
            <span className="text-[#f472b6]">  (♥)      </span>
            {'\n'}
            {/* Layer 2: Petals & centers */}
            <span className="text-[#ff7b90]">  ((|))    </span>
            <span className="text-[#fbbf24]">  /|/|\    </span>
            <span className="text-[#a78bfa]">  - O -    </span>
            <span className="text-[#f472b6]"> ((|))     </span>
            {'\n'}
            {/* Layer 3: Leaves & Stems */}
            <span className="text-[#4ade80]">  _\|/_    </span>
            <span className="text-[#4ade80]">   \|/     </span>
            <span className="text-[#4ade80]">  _\|/_    </span>
            <span className="text-[#4ade80]">   \|/     </span>
            {'\n'}
            {/* Layer 4: Pots Top */}
            <span className="text-[#d97706]"> [=====]   </span>
            <span className="text-[#b45309]">  [===]    </span>
            <span className="text-[#d97706]"> [=====]   </span>
            <span className="text-[#b45309]">  [===]    </span>
            {'\n'}
            {/* Layer 5: Pots Body */}
            <span className="text-[#92400e]">  \___/    </span>
            <span className="text-[#78350f]">   \_/     </span>
            <span className="text-[#92400e]">  \___/    </span>
            <span className="text-[#78350f]">   \_/     </span>
          </pre>
        </div>

        {/* Desktop View: 12 Colorful ASCII Potted Flowers (No scroll) */}
        <div className="hidden md:block w-full overflow-hidden text-center">
          <pre
            className="ascii-art text-xs sm:text-[13px] font-mono inline-block text-left"
            dir="ltr"
          >
            {/* Layer 1: Blossoms (12 pots) */}
            <span className="text-[#ff7b90]">   (@)     </span>
            <span className="text-[#fbbf24]">   \*/     </span>
            <span className="text-[#a78bfa]">   (O)     </span>
            <span className="text-[#38bdf8]">   {`{}`}     </span>
            <span className="text-[#f472b6]">  (♥)      </span>
            <span className="text-[#34d399]">   (*)     </span>
            <span className="text-[#facc15]">   (@)     </span>
            <span className="text-[#c084fc]">   \*/     </span>
            <span className="text-[#fb7185]">   (O)     </span>
            <span className="text-[#67e8f9]">   {`{}`}     </span>
            <span className="text-[#a3e635]">   (*)     </span>
            <span className="text-[#e879f9]">  (♥)      </span>
            {'\n'}
            {/* Layer 2: Petals & centers */}
            <span className="text-[#ff7b90]">  ((|))    </span>
            <span className="text-[#fbbf24]">  /|/|\    </span>
            <span className="text-[#a78bfa]">  - O -    </span>
            <span className="text-[#38bdf8]">  {`{ # }`}   </span>
            <span className="text-[#f472b6]"> ((|))     </span>
            <span className="text-[#34d399]">  /|*|\    </span>
            <span className="text-[#facc15]">  ((|))    </span>
            <span className="text-[#c084fc]">  /|/|\    </span>
            <span className="text-[#fb7185]">  - O -    </span>
            <span className="text-[#67e8f9]">  {`{ # }`}   </span>
            <span className="text-[#a3e635]">  /|*|\    </span>
            <span className="text-[#e879f9]"> ((|))     </span>
            {'\n'}
            {/* Layer 3: Leaves & Stems */}
            <span className="text-[#4ade80]">  _\|/_    </span>
            <span className="text-[#4ade80]">   \|/     </span>
            <span className="text-[#4ade80]">  _\|/_    </span>
            <span className="text-[#4ade80]">   \|/     </span>
            <span className="text-[#4ade80]">  _\|/_    </span>
            <span className="text-[#4ade80]">   \|/     </span>
            <span className="text-[#4ade80]">  _\|/_    </span>
            <span className="text-[#4ade80]">   \|/     </span>
            <span className="text-[#4ade80]">  _\|/_    </span>
            <span className="text-[#4ade80]">   \|/     </span>
            <span className="text-[#4ade80]">  _\|/_    </span>
            <span className="text-[#4ade80]">   \|/     </span>
            {'\n'}
            {/* Layer 4: Pots Top */}
            <span className="text-[#d97706]"> [=====]   </span>
            <span className="text-[#b45309]">  [===]    </span>
            <span className="text-[#d97706]"> [=====]   </span>
            <span className="text-[#b45309]">  [===]    </span>
            <span className="text-[#d97706]"> [=====]   </span>
            <span className="text-[#b45309]">  [===]    </span>
            <span className="text-[#d97706]"> [=====]   </span>
            <span className="text-[#b45309]">  [===]    </span>
            <span className="text-[#d97706]"> [=====]   </span>
            <span className="text-[#b45309]">  [===]    </span>
            <span className="text-[#d97706]"> [=====]   </span>
            <span className="text-[#b45309]">  [===]    </span>
            {'\n'}
            {/* Layer 5: Pots Body */}
            <span className="text-[#92400e]">  \___/    </span>
            <span className="text-[#78350f]">   \_/     </span>
            <span className="text-[#92400e]">  \___/    </span>
            <span className="text-[#78350f]">   \_/     </span>
            <span className="text-[#92400e]">  \___/    </span>
            <span className="text-[#78350f]">   \_/     </span>
            <span className="text-[#92400e]">  \___/    </span>
            <span className="text-[#78350f]">   \_/     </span>
            <span className="text-[#92400e]">  \___/    </span>
            <span className="text-[#78350f]">   \_/     </span>
            <span className="text-[#92400e]">  \___/    </span>
            <span className="text-[#78350f]">   \_/     </span>
          </pre>
        </div>
      </div>
    </footer>
  );
};
