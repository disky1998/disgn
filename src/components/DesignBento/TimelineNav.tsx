import React, { useEffect } from 'react';
import { TIMELINE_YEARS, DECADE_DATA } from '../../data/designHistoryData';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface Props {
  currentDecadeId: string;
  onSelectDecade: (id: string) => void;
  isLight?: boolean;
}

export const TimelineNav: React.FC<Props> = ({ currentDecadeId, onSelectDecade, isLight = false }) => {
  const currentIndex = TIMELINE_YEARS.indexOf(currentDecadeId);

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectDecade(TIMELINE_YEARS[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < TIMELINE_YEARS.length - 1) {
      onSelectDecade(TIMELINE_YEARS[currentIndex + 1]);
    }
  };

  // 支持键盘 ArrowLeft 和 ArrowRight 快捷切换
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentDecadeId]);

  return (
    <nav className="w-full max-w-6xl mx-auto sticky top-4 z-50 px-2 my-6">
      <div className={`p-2 md:p-3 rounded-2xl backdrop-blur-xl border transition-all duration-300 shadow-2xl flex items-center justify-between gap-2 ${
        isLight
          ? 'bg-white/80 border-slate-200 shadow-slate-200/50 text-slate-800'
          : 'bg-slate-900/80 border-slate-800 shadow-black/80 text-slate-100'
      }`}>

        {/* 左右快速导览箭头按钮 */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`p-2 rounded-xl transition-all ${
            currentIndex === 0
              ? 'opacity-30 cursor-not-allowed'
              : isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-slate-800 text-slate-200'
          }`}
          title="上一个年代 (Left Arrow)"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* 年代胶囊按钮列表 */}
        <div className="flex items-center space-x-2 md:space-x-3 overflow-x-auto no-scrollbar py-1">
          {TIMELINE_YEARS.map((year) => {
            const data = DECADE_DATA[year];
            const isActive = year === currentDecadeId;

            return (
              <button
                key={year}
                onClick={() => onSelectDecade(year)}
                className={`relative px-4 md:px-6 py-2.5 rounded-xl font-mono text-xs md:text-sm font-bold tracking-wider transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'scale-105 shadow-lg text-white'
                    : isLight
                      ? 'hover:bg-slate-100 text-slate-600'
                      : 'hover:bg-slate-800/80 text-slate-400'
                }`}
                style={{
                  backgroundColor: isActive ? data.palette.primary : 'transparent',
                  boxShadow: isActive ? `0 8px 20px -4px ${data.palette.primary}80` : 'none',
                }}
              >
                {isActive && <Sparkles className="w-3.5 h-3.5 animate-spin" />}
                <span>{data.label}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === TIMELINE_YEARS.length - 1}
          className={`p-2 rounded-xl transition-all ${
            currentIndex === TIMELINE_YEARS.length - 1
              ? 'opacity-30 cursor-not-allowed'
              : isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-slate-800 text-slate-200'
          }`}
          title="下一个年代 (Right Arrow)"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};
