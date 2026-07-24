import React from 'react';
import { DecadeData } from '../../types/designHistory';
import { Cpu } from 'lucide-react';

interface Props {
  decade: DecadeData;
  isLight?: boolean;
}

export const DecadeHeroCard: React.FC<Props> = ({ decade, isLight = false }) => {
  return (
    <div className={`p-6 sm:p-8 md:p-10 rounded-3xl backdrop-blur-xl border transition-all duration-500 shadow-2xl flex flex-col justify-between relative overflow-hidden group ${
      isLight
        ? 'bg-white/90 border-slate-200/80 shadow-slate-200/50 text-slate-900'
        : 'bg-slate-900/70 border-slate-800/80 shadow-black/60 text-slate-100'
    }`}>
      {/* 背景柔光 */}
      <div
        className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full filter blur-3xl opacity-20 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: decade.palette.primary }}
      ></div>

      <div className="z-10 space-y-4">
        <div className="flex items-center justify-between">
          <span className={`text-xs font-mono font-bold tracking-widest uppercase ${
            isLight ? 'text-slate-500' : 'text-slate-400'
          }`}>
            {decade.yearRange}
          </span>
          <span
            className="px-3.5 py-1 rounded-full text-xs font-mono font-bold border shadow-sm"
            style={{
              borderColor: decade.palette.cardBorder,
              color: decade.palette.primary,
              backgroundColor: `${decade.palette.primary}18`,
            }}
          >
            {decade.label}
          </span>
        </div>

        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight ${
          isLight
            ? 'text-slate-900'
            : 'text-white'
        }`}>
          {decade.title}
        </h2>
        <p className={`text-base font-semibold ${
          isLight ? 'text-slate-700' : 'text-slate-300'
        }`}>
          {decade.subtitle}
        </p>

        <p className={`text-sm sm:text-base leading-relaxed font-normal ${
          isLight ? 'text-slate-700' : 'text-slate-300'
        }`}>
          {decade.desc}
        </p>
      </div>

      {/* 底部核心技术标杆 Tag 列表 */}
      <div className={`z-10 pt-6 mt-6 border-t flex flex-wrap items-center gap-2 ${
        isLight ? 'border-slate-200' : 'border-white/10'
      }`}>
        <div className={`flex items-center text-xs font-mono font-bold mr-2 ${
          isLight ? 'text-slate-600' : 'text-slate-400'
        }`}>
          <Cpu className="w-4 h-4 mr-1.5 text-blue-500" />
          <span>核心技术标杆:</span>
        </div>
        {decade.tech.map((t, idx) => (
          <span
            key={idx}
            className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-colors ${
              isLight
                ? 'bg-slate-100 text-slate-800 border-slate-200 shadow-sm'
                : 'bg-slate-800/80 text-slate-200 border-slate-700/60'
            }`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};
