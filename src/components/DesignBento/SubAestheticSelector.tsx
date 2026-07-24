import React from 'react';
import { SubAesthetic } from '../../data/subAestheticsData';
import { Layers, Sparkles } from 'lucide-react';

interface Props {
  subAesthetics: SubAesthetic[];
  activeSubId: string;
  onSelectSub: (sub: SubAesthetic) => void;
  isLight?: boolean;
}

export const SubAestheticSelector: React.FC<Props> = ({
  subAesthetics,
  activeSubId,
  onSelectSub,
  isLight = false,
}) => {
  return (
    <div className="w-full my-4">
      <div className="flex items-center gap-2 mb-3">
        <Layers className="w-4 h-4 text-purple-400" />
        <span className="text-xs font-mono font-bold tracking-widest uppercase text-slate-400">
          Sub-Aesthetic Taxonomy // 深度细分美学流派 (共 18 个分支)
        </span>
      </div>

      {/* 三个美学分支 Tab 卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {subAesthetics.map((sub) => {
          const isActive = sub.id === activeSubId;

          return (
            <button
              key={sub.id}
              onClick={() => onSelectSub(sub)}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group ${
                isActive
                  ? 'scale-[1.02] shadow-xl text-white'
                  : isLight
                    ? 'bg-white/90 border-slate-200 text-slate-700 hover:border-slate-400'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-600'
              }`}
              style={{
                borderColor: isActive ? sub.primaryColor : undefined,
                backgroundColor: isActive ? `${sub.primaryColor}20` : undefined,
                boxShadow: isActive ? `0 8px 25px -5px ${sub.primaryColor}40` : undefined,
              }}
            >
              {/* 激活指示线条 */}
              {isActive && (
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: sub.primaryColor }}
                ></div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold opacity-70 uppercase">
                  {sub.nameEn}
                </span>
                {isActive && <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />}
              </div>

              <div className="text-sm font-bold mt-1 group-hover:translate-x-1 transition-transform">
                {sub.name}
              </div>

              <div className="text-[11px] opacity-75 mt-1 line-clamp-1">
                {sub.description}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
