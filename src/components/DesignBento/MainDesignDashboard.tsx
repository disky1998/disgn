import React, { useState } from 'react';
import { DECADE_DATA } from '../../data/designHistoryData';
import { TimelineNav } from './TimelineNav';
import { DecadeHeroCard } from './DecadeHeroCard';
import { StyleShowcaseCard } from './StyleShowcaseCard';
import { PhilosophyCard } from './PhilosophyCard';
import { ChartSection } from './ChartSection';
import { Moon, Sun, Compass } from 'lucide-react';

export const MainDesignDashboard: React.FC = () => {
  const [selectedDecadeId, setSelectedDecadeId] = useState<string>('1970');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const currentDecade = DECADE_DATA[selectedDecadeId];
  const isLight = theme === 'light';

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`min-h-screen relative font-sans transition-colors duration-700 selection:bg-blue-500 selection:text-white ${
      isLight ? 'bg-[#f8fafc] text-slate-900' : 'bg-[#07090e] text-slate-100'
    }`}>
      {/* 动态背景柔光 */}
      <div
        className="fixed top-0 left-1/3 w-[700px] h-[700px] rounded-full filter blur-[180px] opacity-15 pointer-events-none transition-all duration-1000 z-0"
        style={{ backgroundColor: currentDecade.palette.primary }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16 space-y-10">

        {/* Anti-Slop 杂志级 Header 区域 */}
        <header className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-10 border-b ${
          isLight ? 'border-slate-200/80' : 'border-white/10'
        }`}>
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight flex flex-wrap items-center gap-4">
              <span>设计之境</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 font-mono font-extrabold">
                1970 - 2026
              </span>
            </h1>

            <p className={`text-base sm:text-xl max-w-3xl leading-relaxed font-normal ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}>
              半世纪美学演进长河 · 18 个细分流派与高精 3D 沉浸展示
            </p>
          </div>

          {/* 右侧主题切换按钮 */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={toggleTheme}
              className={`px-5 py-3 rounded-2xl border transition-all duration-300 shadow-xl flex items-center gap-2.5 text-xs font-mono font-bold tracking-wider active:scale-95 ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50 shadow-slate-200/60'
                  : 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800 shadow-black/80'
              }`}
            >
              {isLight ? <Moon className="w-4 h-4 text-indigo-500" /> : <Sun className="w-4 h-4 text-amber-400" />}
              <span>{isLight ? '切换深色' : '切换暖白'}</span>
            </button>
          </div>
        </header>

        {/* 粘性时间轴导航 */}
        <TimelineNav
          currentDecadeId={selectedDecadeId}
          onSelectDecade={setSelectedDecadeId}
          isLight={isLight}
        />

        {/* 核心 Bento Grid / 杂志编排区 */}
        <main key={selectedDecadeId} className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-fadeIn">
          
          {/* Bento 1: 年代主题 Hero 卡片 */}
          <div className="lg:col-span-2 animate-scaleIn">
            <DecadeHeroCard decade={currentDecade} isLight={isLight} />
          </div>

          {/* Bento 2: 设计哲学与历史节点 */}
          <div className="lg:col-span-2 animate-scaleIn">
            <PhilosophyCard decade={currentDecade} isLight={isLight} />
          </div>

          {/* Bento 3: 【核心】左图右字巨幅沉浸展台 (传入 onSelectDecade 支撑跨年代连贯流转) */}
          <div className="lg:col-span-4 mt-2 animate-fadeIn">
            <StyleShowcaseCard
              decade={currentDecade}
              onSelectDecade={setSelectedDecadeId}
              isLight={isLight}
            />
          </div>

          {/* Bento 4: 时代特征美学要素 */}
          <div className={`p-6 sm:p-8 rounded-3xl backdrop-blur-xl border transition-all duration-500 shadow-2xl lg:col-span-4 animate-fadeIn ${
            isLight
              ? 'bg-white/90 border-slate-200/80 shadow-slate-200/50 text-slate-800'
              : 'bg-slate-900/70 border-slate-800/80 shadow-black/60 text-slate-100'
          }`}>
            <div className="flex items-center gap-2.5 mb-4">
              <Compass className="w-5 h-5 text-emerald-500" />
              <span className={`text-xs font-mono font-bold tracking-widest uppercase ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                DESIGN DNA // 时代视觉基因
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-4">{currentDecade.label} 核心法则</h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {currentDecade.designElements.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border flex items-center gap-3 text-sm font-semibold transition-all ${
                    isLight
                      ? 'bg-slate-100/90 border-slate-200 text-slate-800 shadow-sm hover:bg-white'
                      : 'bg-slate-950/40 border-white/5 text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: currentDecade.palette.accent }}></span>
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bento 5: 深度数据趋势分析 */}
          <div className="lg:col-span-4 mt-2 animate-fadeIn">
            <ChartSection
              decade={currentDecade}
              onSelectDecade={setSelectedDecadeId}
              isLight={isLight}
            />
          </div>

        </main>

        {/* 杂志级纯净 Footer */}
        <footer className={`pt-12 border-t text-center text-xs font-mono flex flex-col md:flex-row items-center justify-between gap-4 ${
          isLight ? 'border-slate-200 text-slate-600' : 'border-white/10 text-slate-500'
        }`}>
          <div>
            《从形式破局到智能共生》半世纪设计史交互大屏
          </div>
          <div className={`flex items-center gap-4 ${isLight ? 'text-slate-700 font-bold' : 'text-slate-400'}`}>
            <span>54 HD Aesthetic Artworks</span>
            <span>•</span>
            <span>Taste-Skill Anti-Slop Edition</span>
          </div>
        </footer>

      </div>
    </div>
  );
};
