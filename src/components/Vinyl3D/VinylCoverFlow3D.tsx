import React, { useState, useEffect } from 'react';
import { VinylRecordItem } from '../../data/subAestheticsData';
import { RealAestheticArt } from './RealAestheticArt';
import { ChevronLeft, ChevronRight, Sparkles, ExternalLink, Maximize2, X } from 'lucide-react';

interface Props {
  records: VinylRecordItem[];
  subId?: string;
  primaryColor: string;
  onNextFlow?: (currentIndex: number) => { nextRecordIndex?: number } | void;
  onPrevFlow?: (currentIndex: number) => { nextRecordIndex?: number } | void;
  isLight?: boolean;
}

export const VinylCoverFlow3D: React.FC<Props> = ({
  records,
  primaryColor,
  onNextFlow,
  onPrevFlow,
  isLight = false
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

  // 当重置流派或切换数据集时归零
  useEffect(() => {
    setActiveIndex(0);
  }, [records]);

  // =========================================================================
  // 连贯向右切图 (跨分支 / 跨年代)
  // =========================================================================
  const handleNext = () => {
    if (onNextFlow) {
      const res = onNextFlow(activeIndex);
      if (res && typeof res.nextRecordIndex === 'number') {
        setActiveIndex(res.nextRecordIndex);
      }
    } else {
      setActiveIndex((prev) => (prev < records.length - 1 ? prev + 1 : 0));
    }
  };

  // =========================================================================
  // 连贯向左倒退 (跨分支 / 跨年代)
  // =========================================================================
  const handlePrev = () => {
    if (onPrevFlow) {
      const res = onPrevFlow(activeIndex);
      if (res && typeof res.nextRecordIndex === 'number') {
        setActiveIndex(res.nextRecordIndex);
      }
    } else {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : records.length - 1));
    }
  };

  // 支持键盘 ArrowLeft 与 ArrowRight 平滑切图，Esc 关闭全屏放大
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isZoomModalOpen) {
        setIsZoomModalOpen(false);
      }
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, records.length, isZoomModalOpen]);

  const activeRecord = records[activeIndex] || records[0];

  return (
    <div className="w-full flex flex-col items-center select-none py-2 relative">
      
      {/* 巨幅沉浸展台：“左图右字”顶级杂志级版式 */}
      <div className={`w-full min-h-[460px] sm:min-h-[520px] rounded-3xl relative overflow-hidden flex flex-col lg:flex-row items-stretch justify-between transition-all duration-700 border ${
        isLight ? 'bg-white/90 border-slate-200/90 shadow-lg' : 'bg-slate-950/90 border-white/10 shadow-2xl'
      }`}>
        
        {/* 背景动态氛围色彩光场 */}
        <div
          className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full filter blur-[150px] opacity-25 pointer-events-none transition-all duration-1000"
          style={{ backgroundColor: primaryColor }}
        ></div>

        {/* ------------------------------------------------------------------------- */}
        {/* 【左侧 55% 区域】：巨幅高清艺术大图（单击浮跃放大全屏，左右悬浮毛玻璃按键） */}
        {/* ------------------------------------------------------------------------- */}
        <div className="lg:w-[55%] min-h-[340px] sm:min-h-[420px] lg:min-h-[520px] relative p-4 sm:p-6 lg:p-8 flex items-center justify-center overflow-hidden">
          
          {/* 左右两侧毛玻璃悬浮圆环导航按键 */}
          <button
            onClick={handlePrev}
            className={`absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-2xl hover:scale-110 active:scale-95 ${
              isLight
                ? 'bg-white/85 text-slate-800 border-slate-300 hover:bg-white shadow-slate-300/60'
                : 'bg-slate-900/85 text-white border-white/20 hover:bg-slate-800 shadow-black/80'
            }`}
            title="上一张大图 / 跨年代倒退 (←)"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          <button
            onClick={handleNext}
            className={`absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-2xl hover:scale-110 active:scale-95 ${
              isLight
                ? 'bg-white/85 text-slate-800 border-slate-300 hover:bg-white shadow-slate-300/60'
                : 'bg-slate-900/85 text-white border-white/20 hover:bg-slate-800 shadow-black/80'
            }`}
            title="下一张大图 / 跨年代流转 (→)"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* 巨幅大图容器 - 单击触发全屏浮跃放大 Modal */}
          <div className="w-full h-full max-w-lg aspect-square relative flex items-center justify-center">
            {records.map((rec, idx) => {
              const isActive = idx === activeIndex;
              if (!isActive) return null;

              return (
                <div
                  key={rec.id}
                  onClick={() => setIsZoomModalOpen(true)}
                  className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20 relative group transition-all duration-700 ease-out transform-gpu animate-scaleIn cursor-zoom-in"
                  title="单击放大查看高清全屏"
                >
                  {/* 高精美学大图 */}
                  <RealAestheticArt record={rec} primaryColor={primaryColor} />

                  {/* 实体胶片覆膜微光质感 */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-white/10 pointer-events-none"></div>

                  {/* 悬浮放大提示 Hover Icon */}
                  <div className="absolute top-4 right-4 p-2 rounded-full bg-black/60 backdrop-blur-md text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  {/* 序号标牌 */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono font-bold bg-black/70 backdrop-blur-md text-white border border-white/20 flex items-center gap-1.5 shadow-xl">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>0{idx + 1} / 0{records.length}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------------------- */}
        {/* 【右侧 45% 区域】：艺术杂志级文字排版与缩略图卡片 */}
        {/* ------------------------------------------------------------------------- */}
        <div key={activeRecord.id} className="lg:w-[45%] p-6 sm:p-8 lg:p-10 flex flex-col justify-between text-left relative z-10 space-y-6 animate-slideRight">
          
          <div className="space-y-4">
            {/* 年份与流派出处 */}
            <div className="flex items-center gap-3">
              <span
                className="px-3.5 py-1 rounded-full text-xs font-mono font-extrabold border tracking-wider shadow-sm"
                style={{
                  backgroundColor: `${primaryColor}20`,
                  color: primaryColor,
                  borderColor: `${primaryColor}40`,
                }}
              >
                {activeRecord.year} HISTORICAL ARCHIVE
              </span>
              <span className={`text-xs font-mono ${isLight ? 'text-slate-500 font-bold' : 'text-slate-400'}`}>
                {activeRecord.subtitle}
              </span>
            </div>

            {/* 巨幅艺术标题 */}
            <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {activeRecord.title}
            </h3>

            {/* 高质感艺术释义段落 */}
            <p className={`text-sm sm:text-base leading-relaxed font-normal p-4 sm:p-5 rounded-2xl border ${
              isLight
                ? 'bg-slate-100/90 border-slate-200/90 text-slate-700 shadow-sm'
                : 'bg-slate-900/70 border-white/10 text-slate-300'
            }`}>
              {activeRecord.description}
            </p>

            {/* 美学 Tag 标签组 */}
            <div className="flex flex-wrap gap-2 pt-1">
              {activeRecord.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className={`px-3 py-1 rounded-full text-xs font-mono border ${
                    isLight
                      ? 'bg-slate-100 text-slate-700 border-slate-300 font-medium'
                      : 'bg-slate-800 text-slate-200 border-slate-700/80'
                  }`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* 底部：快速选择缩略图栏 (Thumbnail Strip) + 学术直链 */}
          <div className={`pt-4 border-t flex items-center justify-between gap-4 ${
            isLight ? 'border-slate-200' : 'border-white/10'
          }`}>
            
            {/* 缩略图横排点击 */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {records.map((rec, i) => (
                <button
                  key={rec.id}
                  onClick={() => setActiveIndex(i)}
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 transition-all duration-300 shrink-0 ${
                    i === activeIndex
                      ? 'border-blue-500 scale-105 shadow-md shadow-blue-500/30'
                      : isLight
                        ? 'border-slate-300 opacity-60 hover:opacity-100'
                        : 'border-white/20 opacity-50 hover:opacity-100'
                  }`}
                  title={rec.title}
                >
                  <img src={rec.coverImage} alt={rec.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* 原始文献直链 */}
            {activeRecord.sourceUrl && (
              <a
                href={activeRecord.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-500 border border-blue-500/30 text-xs font-mono font-bold transition-all shrink-0"
                title="查看学术原始出处"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>档案 ↗</span>
              </a>
            )}

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 单击图片全屏动态放大 Modal Overlay (点击任意位置平滑收回) */}
      {/* ========================================================================= */}
      {isZoomModalOpen && (
        <div
          onClick={() => setIsZoomModalOpen(false)}
          className="fixed inset-0 z-50 bg-slate-950/92 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-8 cursor-pointer select-none animate-fadeIn"
          title="点击任意位置关闭"
        >
          {/* 背景彩光 */}
          <div
            className="absolute inset-0 opacity-25 filter blur-3xl pointer-events-none transition-all duration-1000"
            style={{ backgroundColor: primaryColor }}
          ></div>

          {/* 顶部关闭提醒 */}
          <div className="absolute top-6 right-6 z-10 flex items-center gap-2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all shadow-xl">
            <X className="w-6 h-6" />
          </div>

          {/* 居中 100% 高精大图浮跃面板 */}
          <div
            className="relative w-full max-w-4xl max-h-[85vh] aspect-square rounded-3xl overflow-hidden shadow-2xl border-2 border-white/30 animate-scaleIn shrink-0"
            onClick={(e) => e.stopPropagation()} // 防止点击大图误关
          >
            <RealAestheticArt record={activeRecord} primaryColor={primaryColor} />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-white/10 pointer-events-none"></div>

            {/* 大图下栏悬浮文字 */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 block">{activeRecord.year} • {activeRecord.subtitle}</span>
                <h3 className="text-xl sm:text-2xl font-bold">{activeRecord.title}</h3>
              </div>
              <button
                onClick={() => setIsZoomModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-mono text-xs font-bold transition-all"
              >
                关闭 (Esc)
              </button>
            </div>
          </div>

          {/* 底部点击退出提示 */}
          <div className="mt-4 text-xs font-mono text-slate-400 tracking-widest uppercase animate-pulse">
            ✦ 点击任意空白处收回 (Click anywhere to dismiss) ✦
          </div>
        </div>
      )}

    </div>
  );
};
