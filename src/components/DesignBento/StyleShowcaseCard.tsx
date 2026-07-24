import React, { useState, useEffect } from 'react';
import { DecadeData } from '../../types/designHistory';
import { SUB_AESTHETICS, SubAesthetic } from '../../data/subAestheticsData';
import { TIMELINE_YEARS } from '../../data/designHistoryData';
import { VinylCoverFlow3D } from '../Vinyl3D/VinylCoverFlow3D';
import { SubAestheticSelector } from './SubAestheticSelector';

interface Props {
  decade: DecadeData;
  onSelectDecade?: (decadeId: string) => void;
  isLight?: boolean;
}

export const StyleShowcaseCard: React.FC<Props> = ({ decade, onSelectDecade, isLight = false }) => {
  const currentSubList = SUB_AESTHETICS[decade.id] || [];
  const [activeSubIndex, setActiveSubIndex] = useState<number>(0);

  // 当年代切换时自动归零分支索引
  useEffect(() => {
    setActiveSubIndex(0);
  }, [decade.id]);

  const activeSub: SubAesthetic = currentSubList[activeSubIndex] || currentSubList[0];

  // =========================================================================
  // 连贯全纪元跨分支 / 跨年代向右流转算法
  // =========================================================================
  const handleNextFlow = (currentRecordIndex: number): { nextSubIndex?: number; nextRecordIndex?: number } | void => {
    // 1. 如果在当前分支内部，未到最后一张 -> 切下一张
    if (currentRecordIndex < activeSub.records.length - 1) {
      return { nextRecordIndex: currentRecordIndex + 1 };
    }

    // 2. 如果已到当前分支最后一张，但本年代还有下一个分支 -> 切下一个分支的第一张
    if (activeSubIndex < currentSubList.length - 1) {
      setActiveSubIndex(activeSubIndex + 1);
      return { nextRecordIndex: 0 };
    }

    // 3. 如果到了本年代最后一个分支的最后一张 -> 跨年代切下一个年代的第一个分支第一张！
    const currentDecadeIndex = TIMELINE_YEARS.indexOf(decade.id);
    if (currentDecadeIndex < TIMELINE_YEARS.length - 1 && onSelectDecade) {
      const nextDecadeId = TIMELINE_YEARS[currentDecadeIndex + 1];
      onSelectDecade(nextDecadeId);
      return { nextRecordIndex: 0 };
    } else if (onSelectDecade) {
      // 若已到 2026 尾声 -> 循环回 1970 头部
      onSelectDecade(TIMELINE_YEARS[0]);
      return { nextRecordIndex: 0 };
    }
  };

  // =========================================================================
  // 连贯全纪元跨分支 / 跨年代向左倒退算法
  // =========================================================================
  const handlePrevFlow = (currentRecordIndex: number): { nextSubIndex?: number; nextRecordIndex?: number } | void => {
    // 1. 如果在当前分支内部，未到第一张 -> 切上一张
    if (currentRecordIndex > 0) {
      return { nextRecordIndex: currentRecordIndex - 1 };
    }

    // 2. 如果已到当前分支第一张，但本年代还有上一个分支 -> 切上一个分支的最后一张
    if (activeSubIndex > 0) {
      const prevSubIndex = activeSubIndex - 1;
      const prevSub = currentSubList[prevSubIndex];
      setActiveSubIndex(prevSubIndex);
      return { nextRecordIndex: prevSub.records.length - 1 };
    }

    // 3. 如果到了本年代第一个分支的第一张 -> 跨年代切上一个年代的最后一个分支最后一张！
    const currentDecadeIndex = TIMELINE_YEARS.indexOf(decade.id);
    if (currentDecadeIndex > 0 && onSelectDecade) {
      const prevDecadeId = TIMELINE_YEARS[currentDecadeIndex - 1];
      onSelectDecade(prevDecadeId);
    } else if (onSelectDecade) {
      // 若已到 1970 头部 -> 循环回 2026 尾声
      onSelectDecade(TIMELINE_YEARS[TIMELINE_YEARS.length - 1]);
    }
  };

  return (
    <div className={`p-6 sm:p-8 rounded-3xl backdrop-blur-xl border transition-all duration-500 shadow-2xl flex flex-col justify-between overflow-hidden relative group ${
      isLight
        ? 'bg-white/90 border-slate-200/80 shadow-slate-200/50 text-slate-900'
        : 'bg-slate-900/70 border-slate-800/80 shadow-black/60 text-slate-100'
    }`}>
      {/* 顶部标题与分支切换页 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: activeSub ? activeSub.primaryColor : decade.palette.primary }}></span>
            <span className={`text-xs font-mono font-bold tracking-widest uppercase ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Sub-Aesthetic Gallery // 细分美学沉浸画廊
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold mt-1">
            {activeSub ? activeSub.name : decade.title}
          </h3>
        </div>

        {/* 细分美学分支选择器 */}
        <div className="w-full sm:w-auto">
          <SubAestheticSelector
            subAesthetics={currentSubList}
            activeSubId={activeSub ? activeSub.id : ''}
            onSelectSub={(sub) => {
              const idx = currentSubList.findIndex(s => s.id === sub.id);
              if (idx !== -1) setActiveSubIndex(idx);
            }}
            isLight={isLight}
          />
        </div>
      </div>

      {/* 核心“左图右字”巨幅沉浸展台 (注入连贯切图与跨年代流转) */}
      <div className="w-full my-2">
        {activeSub && (
          <VinylCoverFlow3D
            records={activeSub.records}
            subId={activeSub.id}
            primaryColor={activeSub.primaryColor}
            onNextFlow={handleNextFlow}
            onPrevFlow={handlePrevFlow}
            isLight={isLight}
          />
        )}
      </div>
    </div>
  );
};
