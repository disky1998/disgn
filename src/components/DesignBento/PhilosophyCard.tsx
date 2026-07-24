import React from 'react';
import { DecadeData } from '../../types/designHistory';
import { Quote, History } from 'lucide-react';

interface Props {
  decade: DecadeData;
  isLight?: boolean;
}

export const PhilosophyCard: React.FC<Props> = ({ decade, isLight = false }) => {
  return (
    <div className={`p-6 sm:p-8 md:p-10 rounded-3xl backdrop-blur-xl border transition-all duration-500 shadow-2xl flex flex-col justify-between overflow-hidden relative ${
      isLight
        ? 'bg-white/90 border-slate-200/80 shadow-slate-200/50 text-slate-900'
        : 'bg-slate-900/70 border-slate-800/80 shadow-black/60 text-slate-100'
    }`}>
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Quote className="w-5 h-5 text-amber-500" />
          <span className={`text-xs font-mono font-bold tracking-widest uppercase ${
            isLight ? 'text-slate-500' : 'text-slate-400'
          }`}>
            DESIGN PHILOSOPHY // 设计哲学
          </span>
        </div>

        <blockquote className={`text-xl sm:text-2xl font-serif italic leading-snug my-2 border-l-4 pl-4 ${
          isLight ? 'text-slate-900 font-bold' : 'text-slate-100'
        }`} style={{ borderColor: decade.palette.primary }}>
          {decade.philosophy}
        </blockquote>

        {decade.philosophyAuthor && (
          <div className={`text-xs font-mono mt-2 text-right ${
            isLight ? 'text-slate-600 font-bold' : 'text-slate-400'
          }`}>
            —— {decade.philosophyAuthor}
          </div>
        )}

        <div className={`mt-4 text-xs sm:text-sm leading-relaxed p-4 rounded-2xl border ${
          isLight ? 'bg-slate-100/90 border-slate-200 text-slate-700 shadow-sm' : 'bg-slate-950/40 border-white/5 text-slate-300'
        }`}>
          <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>时代语境：</span>
          {decade.context}
        </div>
      </div>

      {/* 关键历史里程碑事件 */}
      <div className={`mt-6 pt-6 border-t ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
        <div className={`flex items-center gap-2 mb-3 text-xs font-mono font-bold ${
          isLight ? 'text-slate-600' : 'text-slate-400'
        }`}>
          <History className="w-4 h-4 text-blue-500" />
          <span>关键历史里程碑 (Key Milestones):</span>
        </div>

        <div className="space-y-3">
          {decade.keyEvents.map((event, idx) => (
            <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
              <span className="font-mono font-extrabold text-amber-500 shrink-0">{event.year}</span>
              <div>
                <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>{event.title}</span>
                <span className={`ml-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>- {event.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
