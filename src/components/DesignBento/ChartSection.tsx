import React from 'react';
import { DecadeData } from '../../types/designHistory';
import { SemiCenturyLineChart, FeatureGaugeDonut } from '../DynamicSVG/InteractiveSVGCharts';
import { TrendingUp, PieChart, Activity } from 'lucide-react';

interface Props {
  decade: DecadeData;
  onSelectDecade: (id: string) => void;
  isLight?: boolean;
}

export const ChartSection: React.FC<Props> = ({ decade, onSelectDecade, isLight = false }) => {
  return (
    <div className="space-y-6">
      {/* 标题栏 */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 px-2">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-500" />
            <span>半世纪范式平衡与数据深度透视 (1970-2026)</span>
          </h3>
          <p className={`text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed ${isLight ? 'text-slate-600 font-medium' : 'text-slate-400'}`}>
            半世纪以来设计在“功能理性”与“情感表现”双重引力场中的摆动轨迹。点击曲线节点可快速切换时代视界。
          </p>
        </div>

        {/* 颜色图例说明 */}
        <div className={`flex items-center gap-4 text-xs font-mono p-2.5 rounded-xl border shrink-0 ${
          isLight ? 'bg-white border-slate-200 text-slate-700 shadow-sm' : 'bg-slate-900/60 border-slate-800 text-slate-300'
        }`}>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50"></span>
            <span>理性主义 (Rationalism)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-pink-500 shadow-sm shadow-pink-500/50"></span>
            <span>表现主义 (Expressionism)</span>
          </div>
        </div>
      </div>

      {/* 主数据卡片包含 SVG 趋势图与当前年代 Feature Gauge */}
      <div className={`p-4 sm:p-6 md:p-8 rounded-3xl backdrop-blur-xl border transition-all duration-500 shadow-xl grid grid-cols-1 lg:grid-cols-4 gap-6 ${
        isLight
          ? 'bg-white/85 border-slate-200 shadow-slate-200/50 text-slate-800'
          : 'bg-slate-900/70 border-slate-800/80 shadow-black/60 text-slate-100'
      }`}>
        {/* 左侧 3 列：SVG 光效趋势图 */}
        <div className="lg:col-span-3 space-y-4">
          <div className={`flex items-center justify-between text-xs font-mono ${isLight ? 'text-slate-600 font-bold' : 'text-slate-400'}`}>
            <span className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              设计范式摆动曲线图 (Continuous Spline Curve)
            </span>
            <span>Y 轴: 相对权重 (%)</span>
          </div>

          <SemiCenturyLineChart
            currentDecadeId={decade.id}
            onSelectDecade={onSelectDecade}
            isLight={isLight}
          />
        </div>

        {/* 右侧 1 列：当前年代特征权重圆环 Gauge */}
        <div className={`lg:col-span-1 border-t lg:border-t-0 lg:border-l pt-6 lg:pt-0 lg:pl-6 flex flex-col justify-between items-center text-center ${
          isLight ? 'border-slate-200' : 'border-white/10'
        }`}>
          <div className="w-full text-left">
            <div className={`flex items-center gap-1.5 text-xs font-mono ${isLight ? 'text-slate-600 font-bold' : 'text-slate-400'}`}>
              <PieChart className="w-4 h-4 text-purple-500" />
              <span>{decade.label} 特征比例</span>
            </div>
            <div className={`text-lg font-bold mt-1 ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>{decade.title}</div>
          </div>

          <div className="my-4">
            <FeatureGaugeDonut
              rationalism={decade.stats.rationalism}
              expressionism={decade.stats.expressionism}
              color={decade.palette.primary}
            />
          </div>

          <div className="w-full space-y-2 text-xs font-mono">
            <div className={`flex justify-between p-2 rounded-lg border ${
              isLight ? 'bg-slate-100/90 border-slate-200 text-slate-800' : 'bg-slate-950/40 border-white/5 text-slate-200'
            }`}>
              <span className="text-blue-500 font-bold">理性主义</span>
              <span className="font-bold">{decade.stats.rationalism}%</span>
            </div>
            <div className={`flex justify-between p-2 rounded-lg border ${
              isLight ? 'bg-slate-100/90 border-slate-200 text-slate-800' : 'bg-slate-950/40 border-white/5 text-slate-200'
            }`}>
              <span className="text-pink-500 font-bold">表现主义</span>
              <span className="font-bold">{decade.stats.expressionism}%</span>
            </div>
            <div className={`flex justify-between p-2 rounded-lg border ${
              isLight ? 'bg-slate-100/90 border-slate-200 text-slate-800' : 'bg-slate-950/40 border-white/5 text-slate-200'
            }`}>
              <span className="text-emerald-500 font-bold">功能效率</span>
              <span className="font-bold">{decade.stats.functionality}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
