import React from 'react';

interface Props {
  styleType: 'retroGrid' | 'memphisPattern' | 'grungeNoise' | 'aquaReflection' | 'flatVector' | 'spatialNebula';
  accentColor: string;
}

export const SVGStyleGraphic: React.FC<Props> = ({ styleType, accentColor }) => {
  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden select-none">
      {styleType === 'retroGrid' && (
        <svg className="w-full h-full max-h-[220px]" viewBox="0 0 400 200" fill="none">
          {/* 70s 暖色调复古平滑弧线 */}
          <g stroke={accentColor} strokeWidth="3" opacity="0.4">
            <circle cx="200" cy="100" r="40" className="animate-pulse" />
            <circle cx="200" cy="100" r="70" strokeDasharray="6 6" />
            <circle cx="200" cy="100" r="100" />
            <line x1="50" y1="100" x2="350" y2="100" strokeWidth="2" />
            <line x1="200" y1="10" x2="200" y2="190" strokeWidth="2" />
          </g>
          {/* 复古工业条纹按键块 */}
          {Array.from({ length: 9 }).map((_, i) => (
            <rect
              key={i}
              x={60 + i * 32}
              y={145}
              width="22"
              height="26"
              rx="4"
              fill={i % 3 === 0 ? accentColor : '#d1d5db'}
              opacity={0.8}
            />
          ))}
        </svg>
      )}

      {styleType === 'memphisPattern' && (
        <svg className="w-full h-full max-h-[220px]" viewBox="0 0 400 200" fill="none">
          {/* 80s 孟菲斯锯齿波浪 */}
          <path
            d="M 20 50 Q 50 10 80 50 T 140 50 T 200 50 T 260 50 T 320 50 T 380 50"
            stroke="#ec4899"
            strokeWidth="5"
            fill="none"
          />
          <path
            d="M 20 150 Q 60 190 100 150 T 180 150 T 260 150 T 340 150"
            stroke="#06b6d4"
            strokeWidth="4"
            strokeDasharray="8 6"
            fill="none"
          />
          {/* 斑点矩阵 */}
          {Array.from({ length: 5 }).map((_, r) =>
            Array.from({ length: 8 }).map((_, c) => (
              <circle
                key={`${r}-${c}`}
                cx={120 + c * 24}
                cy={75 + r * 15}
                r="3"
                fill={r % 2 === 0 ? '#eab308' : '#ffffff'}
                opacity="0.7"
              />
            ))
          )}
          {/* 悬浮三维感粉色非对称多边形 */}
          <polygon points="50,110 90,80 110,130" fill="#ec4899" opacity="0.8" />
        </svg>
      )}

      {styleType === 'grungeNoise' && (
        <svg className="w-full h-full max-h-[220px]" viewBox="0 0 400 200" fill="none">
          {/* 90s 解构撕裂排版网格 */}
          <g stroke="#64748b" strokeWidth="1.5" opacity="0.6">
            <line x1="20" y1="30" x2="380" y2="30" />
            <line x1="20" y1="70" x2="380" y2="70" strokeDasharray="3 3" />
            <line x1="20" y1="170" x2="380" y2="170" />
            <line x1="80" y1="10" x2="40" y2="190" stroke="#ef4444" strokeWidth="2" />
          </g>
          {/* 摇滚解构色块与扭曲贴画 */}
          <rect x="130" y="45" width="140" height="90" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
          <text x="145" y="95" fill="#ef4444" fontSize="24" fontFamily="monospace" fontWeight="bold" letterSpacing="4">
            GRUNGE90
          </text>
          <text x="147" y="115" fill="#64748b" fontSize="10" fontFamily="monospace">
            DISRUPT // TYPO // NOISE
          </text>
        </svg>
      )}

      {styleType === 'aquaReflection' && (
        <svg className="w-full h-full max-h-[220px]" viewBox="0 0 400 200" fill="none">
          {/* 00s Aqua 高光玻璃弧度与水滴涟漪 */}
          <defs>
            <linearGradient id="aquaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <rect x="80" y="30" width="240" height="140" rx="30" fill="url(#aquaGrad)" stroke="#60a5fa" strokeWidth="2" />
          {/* 顶层透明玻璃高光弧 */}
          <path d="M 90 40 Q 200 80 310 40 L 310 30 L 90 30 Z" fill="#ffffff" opacity="0.5" />
          {/* 水滴光斑 */}
          <ellipse cx="140" cy="110" rx="40" ry="20" fill="#ffffff" opacity="0.15" />
          <circle cx="270" cy="120" r="14" fill="#ffffff" opacity="0.3" />
        </svg>
      )}

      {styleType === 'flatVector' && (
        <svg className="w-full h-full max-h-[220px]" viewBox="0 0 400 200" fill="none">
          {/* 10s Material Design 矢量卡片平铺 */}
          <rect x="40" y="40" width="140" height="120" rx="12" fill="#10b981" opacity="0.9" />
          <rect x="200" y="40" width="160" height="55" rx="12" fill="#059669" opacity="0.8" />
          <rect x="200" y="105" width="160" height="55" rx="12" fill="#34d399" opacity="0.8" />
          <circle cx="110" cy="85" r="22" fill="#ffffff" opacity="0.9" />
        </svg>
      )}

      {styleType === 'spatialNebula' && (
        <svg className="w-full h-full max-h-[220px]" viewBox="0 0 400 200" fill="none">
          {/* 2026 空间计算全息拓扑网格 */}
          <g stroke="#8b5cf6" strokeWidth="1" opacity="0.5">
            <ellipse cx="200" cy="100" rx="160" ry="70" strokeDasharray="4 4" />
            <ellipse cx="200" cy="100" rx="110" ry="45" />
            <ellipse cx="200" cy="100" rx="60" ry="22" stroke="#06b6d4" strokeWidth="1.5" />
          </g>
          {/* Bento UI 空间悬浮块 */}
          <rect x="130" y="65" width="140" height="70" rx="16" fill="#8b5cf6" fillOpacity="0.15" stroke="#c084fc" strokeWidth="1.5" />
          <circle cx="200" cy="100" r="6" fill="#06b6d4" className="animate-ping" />
        </svg>
      )}
    </div>
  );
};
