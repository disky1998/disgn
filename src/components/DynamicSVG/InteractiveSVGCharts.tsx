import React, { useState } from 'react';
import { DECADE_DATA, TIMELINE_YEARS } from '../../data/designHistoryData';

interface LineChartProps {
  currentDecadeId: string;
  onSelectDecade: (id: string) => void;
  isLight?: boolean;
}

export const SemiCenturyLineChart: React.FC<LineChartProps> = ({
  currentDecadeId,
  onSelectDecade,
  isLight = false,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // SVG dimensions
  const width = 800;
  const height = 240;
  const paddingX = 60;
  const paddingY = 40;

  const pointsCount = TIMELINE_YEARS.length;
  const stepX = (width - paddingX * 2) / (pointsCount - 1);

  // 计算理性 (Rationalism) 和感性 (Expressionism) 坐标点
  const rationalPoints = TIMELINE_YEARS.map((year, idx) => {
    const data = DECADE_DATA[year];
    const x = paddingX + idx * stepX;
    const y = height - paddingY - (data.stats.rationalism / 100) * (height - paddingY * 2);
    return { x, y, year, data };
  });

  const expressionPoints = TIMELINE_YEARS.map((year, idx) => {
    const data = DECADE_DATA[year];
    const x = paddingX + idx * stepX;
    const y = height - paddingY - (data.stats.expressionism / 100) * (height - paddingY * 2);
    return { x, y, year, data };
  });

  // 创建平滑 Spline 路径
  const createSplinePath = (pts: { x: number; y: number }[]) => {
    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const curr = pts[i];
      const next = pts[i + 1];
      const mx = (curr.x + next.x) / 2;
      path += ` C ${mx} ${curr.y}, ${mx} ${next.y}, ${next.x} ${next.y}`;
    }
    return path;
  };

  const rationalPath = createSplinePath(rationalPoints);
  const expressionPath = createSplinePath(expressionPoints);

  return (
    <div className="w-full relative select-none">
      <svg className="w-full h-auto overflow-visible" viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <filter id="glow-rational" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-expression" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Y 轴背景网格基准线 */}
        {[0.2, 0.5, 0.8].map((ratio, i) => {
          const y = height - paddingY - ratio * (height - paddingY * 2);
          return (
            <line
              key={i}
              x1={paddingX}
              y1={y}
              x2={width - paddingX}
              y2={y}
              stroke={isLight ? '#e2e8f0' : '#1e293b'}
              strokeDasharray="4 4"
            />
          );
        })}

        {/* X 轴刻度文本 */}
        {TIMELINE_YEARS.map((year, idx) => {
          const x = paddingX + idx * stepX;
          const isActive = year === currentDecadeId;
          return (
            <g key={year} className="cursor-pointer" onClick={() => onSelectDecade(year)}>
              <text
                x={x}
                y={height - 10}
                textAnchor="middle"
                fontSize="12"
                fontWeight={isActive ? 'bold' : 'normal'}
                fill={isActive ? (isLight ? '#0f172a' : '#ffffff') : isLight ? '#64748b' : '#94a3b8'}
              >
                {DECADE_DATA[year].label}
              </text>
              {isActive && (
                <circle cx={x} cy={height - 2} r="3" fill="#3b82f6" />
              )}
            </g>
          );
        })}

        {/* 理性主义 Golden Curve (Blue) */}
        <path
          d={rationalPath}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3.5"
          filter="url(#glow-rational)"
          className="transition-all duration-500"
        />

        {/* 表现主义 Golden Curve (Pink/Amber) */}
        <path
          d={expressionPath}
          fill="none"
          stroke="#ec4899"
          strokeWidth="3.5"
          filter="url(#glow-expression)"
          className="transition-all duration-500"
        />

        {/* 数据交互节点 (Points) */}
        {rationalPoints.map((pt, idx) => {
          const isActive = pt.year === currentDecadeId;
          const isHovered = hoveredIdx === idx;

          return (
            <g
              key={`pts-${pt.year}`}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => onSelectDecade(pt.year)}
            >
              {/* 垂直对齐线 */}
              {(isActive || isHovered) && (
                <line
                  x1={pt.x}
                  y1={paddingY}
                  x2={pt.x}
                  y2={height - paddingY}
                  stroke={isLight ? '#cbd5e1' : '#334155'}
                  strokeDasharray="2 2"
                />
              )}

              {/* 理性节点 */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={isActive ? 7 : isHovered ? 6 : 4.5}
                fill="#3b82f6"
                stroke={isLight ? '#ffffff' : '#0f172a'}
                strokeWidth="2"
                className="transition-all duration-300"
              />

              {/* 表现节点 */}
              <circle
                cx={pt.x}
                cy={expressionPoints[idx].y}
                r={isActive ? 7 : isHovered ? 6 : 4.5}
                fill="#ec4899"
                stroke={isLight ? '#ffffff' : '#0f172a'}
                strokeWidth="2"
                className="transition-all duration-300"
              />
            </g>
          );
        })}
      </svg>

      {/* 悬停历史里程碑提示 Tooltip */}
      {hoveredIdx !== null && (
        <div
          className="absolute z-20 px-3 py-2 rounded-xl text-xs bg-slate-900/90 text-white border border-slate-700 shadow-xl backdrop-blur-md pointer-events-none transform -translate-x-1/2 -translate-y-full"
          style={{
            left: `${((paddingX + hoveredIdx * stepX) / width) * 100}%`,
            top: '30%',
          }}
        >
          <div className="font-bold text-slate-200">{DECADE_DATA[TIMELINE_YEARS[hoveredIdx]].title}</div>
          <div className="flex items-center gap-3 mt-1 text-[11px]">
            <span className="text-blue-400">理性: {DECADE_DATA[TIMELINE_YEARS[hoveredIdx]].stats.rationalism}%</span>
            <span className="text-pink-400">感性: {DECADE_DATA[TIMELINE_YEARS[hoveredIdx]].stats.expressionism}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

interface DonutProps {
  rationalism: number;
  expressionism: number;
  color: string;
}

export const FeatureGaugeDonut: React.FC<DonutProps> = ({ rationalism, expressionism, color }) => {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;

  const rationalOffset = circumference - (rationalism / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-28 h-28">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* 背景底环 */}
        <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />

        {/* 感性比例背景 */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#ec4899"
          strokeWidth="10"
          opacity="0.3"
        />

        {/* 理性动态主要环 */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={rationalOffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      {/* 中心数值 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
        <span className="text-xs font-mono font-bold">{rationalism}%</span>
        <span className="text-[9px] text-slate-400">理性权重</span>
      </div>
    </div>
  );
};
