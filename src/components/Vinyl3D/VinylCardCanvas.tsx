import React from 'react';
import { VinylRecordItem } from '../../data/subAestheticsData';

interface Props {
  record: VinylRecordItem;
  subId?: string;
  primaryColor: string;
}

export const VinylCardCanvas: React.FC<Props> = ({ record, subId = '', primaryColor }) => {
  // 根据 record.id 或 subId 识别具体美学细分类型
  const idStr = record.id.toLowerCase();
  
  return (
    <div className="w-full h-full relative overflow-hidden select-none flex items-center justify-center bg-slate-950">
      
      {/* 1. 博朗工业极简 (Braun Industrial Functionalism) */}
      {(idStr.includes('braun') || subId.includes('braun')) && (
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
          <rect width="400" height="400" fill="#f4f0ec" />
          {/* 米白色冷调质感背景 */}
          <rect x="30" y="30" width="340" height="340" rx="16" fill="#e8e2dc" stroke="#d1c9c2" strokeWidth="2" />
          
          {/* 博朗标志性圆孔扬声器网格 */}
          <g fill="#9e948a" opacity="0.8">
            {Array.from({ length: 9 }).map((_, r) =>
              Array.from({ length: 12 }).map((_, c) => (
                <circle key={`${r}-${c}`} cx={70 + c * 22} cy={80 + r * 14} r="4" />
              ))
            )}
          </g>

          {/* 复古旋钮 1 - 带有拉丝刻度 */}
          <circle cx="120" cy="270" r="45" fill="#363432" />
          <circle cx="120" cy="270" r="40" fill="#242220" />
          <line x1="120" y1="230" x2="120" y2="250" stroke="#f4f0ec" strokeWidth="4" strokeLinecap="round" />
          <text x="120" y="335" textAnchor="middle" fill="#524c46" fontSize="11" fontFamily="monospace" fontWeight="bold">VOLUME</text>

          {/* 复古旋钮 2 */}
          <circle cx="280" cy="270" r="45" fill="#363432" />
          <circle cx="280" cy="270" r="40" fill="#242220" />
          <line x1="280" y1="270" x2="310" y2="270" stroke="#f4f0ec" strokeWidth="4" strokeLinecap="round" />
          <text x="280" y="335" textAnchor="middle" fill="#524c46" fontSize="11" fontFamily="monospace" fontWeight="bold">TUNING</text>

          {/* 橙色指示灯按钮 */}
          <rect x="185" y="245" width="30" height="50" rx="6" fill="#d97706" />
          <circle cx="200" cy="260" r="4" fill="#fef3c7" />

          {/* 博朗风格排版 */}
          <text x="50" y="360" fill="#242220" fontSize="16" fontFamily="sans-serif" fontWeight="900" letterSpacing="1">BRAUN</text>
          <text x="350" y="360" textAnchor="end" fill="#786e65" fontSize="12" fontFamily="monospace">DESIGN // RAMS</text>
        </svg>
      )}

      {/* 2. 太空时代 (Space Age Retro-Futurism) */}
      {(idStr.includes('space') || subId.includes('space')) && (
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
          <rect width="400" height="400" fill="#180c1e" />
          {/* 太空宇宙深紫 */}
          <circle cx="200" cy="200" r="140" fill="#e11d48" opacity="0.2" />
          <ellipse cx="200" cy="200" rx="160" ry="60" stroke="#fb7185" strokeWidth="3" transform="rotate(-20 200 200)" opacity="0.6" />
          
          {/* 70s 胶囊舱体造型 */}
          <rect x="90" y="110" width="220" height="180" rx="90" fill="#ffffff" stroke="#e11d48" strokeWidth="4" />
          <rect x="110" y="130" width="180" height="140" rx="70" fill="#180c1e" />
          
          {/* 舱面亚克力玻璃高光 */}
          <ellipse cx="200" cy="200" rx="70" ry="50" fill="#e11d48" opacity="0.4" />
          <path d="M 130 150 Q 200 120 270 150 A 60 40 0 0 0 130 150 Z" fill="#ffffff" opacity="0.3" />

          <text x="200" y="340" textAnchor="middle" fill="#fb7185" fontSize="14" fontFamily="monospace" letterSpacing="3">SPACE AGE // 1970s</text>
        </svg>
      )}

      {/* 3. 孟菲斯后现代主义 (Memphis Postmodernism) */}
      {(idStr.includes('memphis') || subId.includes('memphis')) && (
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
          <rect width="400" height="400" fill="#fdf2f8" />
          
          {/* 孟菲斯经典 Bacterio 斑点背景 */}
          {Array.from({ length: 8 }).map((_, r) =>
            Array.from({ length: 8 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={30 + c * 50} cy={30 + r * 50} r="4" fill="#111827" opacity="0.8" />
            ))
          )}

          {/* 锯齿波浪线 */}
          <path d="M 30 80 Q 70 30 110 80 T 190 80 T 270 80 T 350 80" stroke="#ec4899" strokeWidth="8" fill="none" />
          <path d="M 30 320 Q 70 270 110 320 T 190 320 T 270 320 T 350 320" stroke="#06b6d4" strokeWidth="6" fill="none" />

          {/* 撞色非对称几何雕塑 */}
          <polygon points="120,240 200,100 280,240" fill="#eab308" />
          <circle cx="200" cy="180" r="40" fill="#ec4899" />
          <rect x="150" y="220" width="100" height="30" fill="#06b6d4" transform="rotate(-10 200 235)" />

          <text x="200" y="370" textAnchor="middle" fill="#111827" fontSize="16" fontFamily="sans-serif" fontWeight="900" letterSpacing="2">MEMPHIS GROUP</text>
        </svg>
      )}

      {/* 4. 8-Bit 像素街机 (8-Bit Pixel Arcade) */}
      {(idStr.includes('pixel') || subId.includes('pixel') || idStr.includes('arc')) && (
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
          <rect width="400" height="400" fill="#090d16" />
          
          {/* 8-Bit 像素网格图形 */}
          <g fill="#06b6d4">
            {/* 吃豆人 / 👾 点阵图案 */}
            <rect x="160" y="100" width="80" height="20" />
            <rect x="140" y="120" width="120" height="20" />
            <rect x="120" y="140" width="160" height="40" />
            <rect x="120" y="180" width="40" height="40" />
            <rect x="240" y="180" width="40" height="40" />
            <rect x="140" y="220" width="120" height="20" />
            {/* 眼睛 */}
            <rect x="150" y="140" width="20" height="20" fill="#ffffff" />
            <rect x="230" y="140" width="20" height="20" fill="#ffffff" />
          </g>

          {/* NES 像素卡带条纹 */}
          <rect x="50" y="280" width="300" height="40" fill="#ef4444" />
          <text x="200" y="307" textAnchor="middle" fill="#ffffff" fontSize="18" fontFamily="monospace" fontWeight="bold">8-BIT ARCADE 1985</text>
        </svg>
      )}

      {/* 5. 霓虹赛博浪潮 (Synthwave) */}
      {(idStr.includes('synth') || subId.includes('synth') || idStr.includes('wave')) && (
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
          <rect width="400" height="400" fill="#150728" />
          
          {/* 网格太阳 */}
          <circle cx="200" cy="180" r="80" fill="url(#sunGrad)" />
          <defs>
            <linearGradient id="sunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          {/* 太阳分割平线 */}
          <line x1="120" y1="180" x2="280" y2="180" stroke="#150728" strokeWidth="4" />
          <line x1="120" y1="195" x2="280" y2="195" stroke="#150728" strokeWidth="6" />
          <line x1="120" y1="210" x2="280" y2="210" stroke="#150728" strokeWidth="8" />

          {/* 3D 霓虹紫透视网格地板 */}
          <g stroke="#06b6d4" strokeWidth="1.5" opacity="0.7">
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={i} x1="200" y1="220" x2={-100 + i * 75} y2="400" />
            ))}
            {[230, 250, 280, 320, 370].map((y, i) => (
              <line key={i} x1="0" y1={y} x2="400" y2={y} />
            ))}
          </g>
          <text x="200" y="375" textAnchor="middle" fill="#ec4899" fontSize="15" fontFamily="sans-serif" fontWeight="bold" letterSpacing="4">SYNTHWAVE // 80s</text>
        </svg>
      )}

      {/* 6. Ray Gun Grunge 排版 (Ray Gun Grunge) */}
      {(idStr.includes('grunge') || subId.includes('grunge')) && (
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
          <rect width="400" height="400" fill="#0f172a" />
          
          {/* 错位印刷与图层撕裂 */}
          <rect x="40" y="50" width="320" height="280" fill="#1e293b" stroke="#ef4444" strokeWidth="3" />
          <line x1="40" y1="140" x2="360" y2="120" stroke="#ef4444" strokeWidth="4" />
          
          <text x="60" y="110" fill="#ffffff" fontSize="32" fontFamily="monospace" fontWeight="bold" letterSpacing="-2">RAY GUN</text>
          <text x="63" y="112" fill="#ef4444" fontSize="32" fontFamily="monospace" fontWeight="bold" letterSpacing="-2" opacity="0.7">RAY GUN</text>

          <text x="60" y="200" fill="#64748b" fontSize="14" fontFamily="monospace">DAVID CARSON // 1993</text>
          <text x="60" y="230" fill="#94a3b8" fontSize="11" fontFamily="monospace">DONT MISTAKE LEGIBILITY</text>
          <text x="60" y="250" fill="#94a3b8" fontSize="11" fontFamily="monospace">FOR COMMUNICATION.</text>

          <rect x="220" y="180" width="110" height="110" fill="#ef4444" opacity="0.8" />
          <text x="275" y="245" textAnchor="middle" fill="#ffffff" fontSize="24" fontFamily="sans-serif" fontWeight="900">90s</text>
        </svg>
      )}

      {/* 7. Y2K 果冻感 (Y2K Translucent Gel) */}
      {(idStr.includes('y2k') || subId.includes('y2k')) && (
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
          <rect width="400" height="400" fill="#0369a1" />
          
          {/* 半透明果冻水滴与 iMac G3 胶感 */}
          <circle cx="200" cy="200" r="120" fill="#38bdf8" opacity="0.4" />
          <circle cx="200" cy="200" r="90" fill="#0284c7" />

          {/* 镀铬金属弧光 */}
          <path d="M 120 150 Q 200 90 280 150 A 90 90 0 0 1 120 150 Z" fill="#ffffff" opacity="0.6" />
          <ellipse cx="200" cy="200" rx="40" ry="20" fill="#ffffff" opacity="0.2" />

          <text x="200" y="350" textAnchor="middle" fill="#e0f2fe" fontSize="16" fontFamily="monospace" fontWeight="bold" letterSpacing="3">Y2K CYBER GEL // 1999</text>
        </svg>
      )}

      {/* 8. Apple Aqua 水印玻璃 (Apple Aqua UI) */}
      {(idStr.includes('aqua') || subId.includes('aqua')) && (
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
          <rect width="400" height="400" fill="#1e3a8a" />
          
          {/* Aqua 高光玻璃球体 */}
          <circle cx="200" cy="180" r="100" fill="url(#aquaSphere)" />
          <defs>
            <radialGradient id="aquaSphere" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="40%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </radialGradient>
          </defs>

          {/* 顶层透明弧形高光罩 */}
          <path d="M 120 140 Q 200 190 280 140 A 100 100 0 0 0 120 140 Z" fill="#ffffff" opacity="0.65" />
          <ellipse cx="200" cy="240" rx="50" ry="12" fill="#ffffff" opacity="0.25" />

          {/* 三色水滴按钮 */}
          <circle cx="160" cy="320" r="12" fill="#ef4444" />
          <circle cx="200" cy="320" r="12" fill="#eab308" />
          <circle cx="240" cy="320" r="12" fill="#22c55e" />

          <text x="200" y="365" textAnchor="middle" fill="#93c5fd" fontSize="13" fontFamily="monospace" fontWeight="bold">APPLE AQUA UI // 2001</text>
        </svg>
      )}

      {/* 9. 拟物化皮革金属 (Skeuomorphic) */}
      {(idStr.includes('skeuo') || subId.includes('skeuo')) && (
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
          <rect width="400" height="400" fill="#451a03" />
          
          {/* 拟物物理皮革缝线纹理 */}
          <rect x="30" y="30" width="340" height="340" rx="20" fill="#78350f" stroke="#b45309" strokeWidth="4" strokeDasharray="8 4" />
          <rect x="50" y="50" width="300" height="300" rx="16" fill="#92400e" />

          {/* 镀铬指南针/黄铜刻度 */}
          <circle cx="200" cy="200" r="80" fill="#fef3c7" stroke="#d97706" strokeWidth="8" />
          <line x1="200" y1="130" x2="200" y2="270" stroke="#b45309" strokeWidth="3" />
          <line x1="130" y1="200" x2="270" y2="200" stroke="#b45309" strokeWidth="3" />
          <polygon points="200,140 215,200 200,190" fill="#ef4444" />
          <polygon points="200,260 185,200 200,210" fill="#1e293b" />

          <text x="200" y="380" textAnchor="middle" fill="#fef3c7" fontSize="13" fontFamily="monospace" fontWeight="bold">SKEUOMORPHIC LEATHER</text>
        </svg>
      )}

      {/* 10. Frutiger Aero 自然光感 (Frutiger Aero) */}
      {(idStr.includes('aero') || subId.includes('aero')) && (
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
          <rect width="400" height="400" fill="#0284c7" />
          
          {/* Aero 清澈蓝天与绿草地面 */}
          <path d="M 0 250 Q 200 200 400 250 L 400 400 L 0 400 Z" fill="#22c55e" />

          {/* 透明高光玻璃窗口与气泡 */}
          <rect x="60" y="60" width="280" height="180" rx="16" fill="#ffffff" fillOpacity="0.25" stroke="#ffffff" strokeWidth="2" />
          <circle cx="120" cy="120" r="30" fill="#ffffff" opacity="0.3" />
          <circle cx="280" cy="100" r="18" fill="#ffffff" opacity="0.4" />

          <text x="200" y="340" textAnchor="middle" fill="#ffffff" fontSize="16" fontFamily="sans-serif" fontWeight="bold" letterSpacing="2">FRUTIGER AERO</text>
        </svg>
      )}

      {/* 11. Material Design (Material Design) */}
      {(idStr.includes('mat') || subId.includes('mat') || idStr.includes('paper')) && (
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
          <rect width="400" height="400" fill="#064e3b" />
          
          {/* Material 纸张切片与阴影 */}
          <rect x="40" y="60" width="320" height="240" rx="12" fill="#10b981" />
          <rect x="80" y="100" width="280" height="220" rx="12" fill="#34d399" />
          
          {/* Floating Action Button (FAB) */}
          <circle cx="310" cy="290" r="30" fill="#059669" />
          <text x="310" y="297" textAnchor="middle" fill="#ffffff" fontSize="24" fontWeight="bold">+</text>

          <text x="200" y="360" textAnchor="middle" fill="#a7f3d0" fontSize="15" fontFamily="sans-serif" fontWeight="bold" letterSpacing="2">MATERIAL DESIGN // 2014</text>
        </svg>
      )}

      {/* 12. 瑞士极简主义 (Swiss Minimalist) */}
      {(idStr.includes('swiss') || subId.includes('swiss')) && (
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
          <rect width="400" height="400" fill="#f8fafc" />
          
          {/* 瑞士严谨网格与大字号 Helvetica */}
          <line x1="40" y1="40" x2="360" y2="40" stroke="#0f172a" strokeWidth="4" />
          <text x="40" y="120" fill="#0f172a" fontSize="48" fontFamily="sans-serif" fontWeight="900" letterSpacing="-2">SWISS</text>
          <text x="40" y="170" fill="#6366f1" fontSize="48" fontFamily="sans-serif" fontWeight="900" letterSpacing="-2">GRID.</text>

          <line x1="40" y1="220" x2="360" y2="220" stroke="#cbd5e1" strokeWidth="1" />
          <text x="40" y="260" fill="#64748b" fontSize="12" fontFamily="monospace">HELVETICA // RATIONAL ORDER</text>
          <text x="40" y="280" fill="#64748b" fontSize="12" fontFamily="monospace">DESIGN SYSTEM // 2012</text>
        </svg>
      )}

      {/* 13. Corporate Memphis (Corporate Memphis) */}
      {(idStr.includes('corp') || subId.includes('corp')) && (
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
          <rect width="400" height="400" fill="#fffbe6" />
          
          {/* 企业极简无面夸张人物图形 */}
          <circle cx="200" cy="130" r="35" fill="#f59e0b" />
          <path d="M 140 300 Q 150 200 200 200 T 260 300 Z" fill="#6366f1" />
          <ellipse cx="150" cy="240" rx="40" ry="12" fill="#10b981" transform="rotate(-30 150 240)" />

          <text x="200" y="360" textAnchor="middle" fill="#1e293b" fontSize="14" fontFamily="sans-serif" fontWeight="bold">CORPORATE MEMPHIS</text>
        </svg>
      )}

      {/* 14. VisionOS 空间计算 (VisionOS Spatial Glass) */}
      {(idStr.includes('vos') || subId.includes('vos') || idStr.includes('vision')) && (
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
          <rect width="400" height="400" fill="#090514" />
          
          {/* 全息三维 Sparkles 星云粒子 */}
          <circle cx="200" cy="200" r="130" fill="#8b5cf6" opacity="0.25" />
          
          {/* VisionOS 悬浮毛玻璃 Bento Widget */}
          <rect x="70" y="90" width="260" height="180" rx="28" fill="#ffffff" fillOpacity="0.12" stroke="#c084fc" strokeWidth="1.5" />
          <rect x="90" y="110" width="100" height="60" rx="16" fill="#8b5cf6" fillOpacity="0.3" />
          <circle cx="270" cy="140" r="24" fill="#06b6d4" fillOpacity="0.8" />

          <text x="200" y="340" textAnchor="middle" fill="#c084fc" fontSize="15" fontFamily="monospace" fontWeight="bold" letterSpacing="3">VISIONOS SPATIAL UI</text>
        </svg>
      )}

      {/* 15. Bento Grid 模块化 (Bento Grid) */}
      {(idStr.includes('bento') || subId.includes('bento')) && (
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
          <rect width="400" height="400" fill="#05131a" />
          
          {/* Bento 便当盒多模块分割 */}
          <rect x="40" y="50" width="150" height="140" rx="16" fill="#06b6d4" fillOpacity="0.2" stroke="#06b6d4" strokeWidth="1.5" />
          <rect x="210" y="50" width="150" height="80" rx="16" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="1.5" />
          <rect x="210" y="145" width="150" height="145" rx="16" fill="#8b5cf6" fillOpacity="0.2" stroke="#8b5cf6" strokeWidth="1.5" />
          <rect x="40" y="205" width="150" height="85" rx="16" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5" />

          <text x="200" y="350" textAnchor="middle" fill="#06b6d4" fontSize="15" fontFamily="monospace" fontWeight="bold" letterSpacing="3">BENTO GRID ARCHITECTURE</text>
        </svg>
      )}

      {/* 16. 新粗糙主义 (Neo-Brutalism & Intent UI) */}
      {(idStr.includes('neo') || subId.includes('neo') || idStr.includes('intent')) && (
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
          <rect width="400" height="400" fill="#fff1f2" />
          
          {/* Neo-Brutalism 硬质黑阴影卡片 */}
          <rect x="65" y="85" width="270" height="190" rx="12" fill="#000000" />
          <rect x="55" y="75" width="270" height="190" rx="12" fill="#f43f5e" stroke="#000000" strokeWidth="4" />

          <text x="190" y="140" textAnchor="middle" fill="#ffffff" fontSize="22" fontFamily="sans-serif" fontWeight="900">NEO-BRUTALISM</text>
          <rect x="85" y="170" width="210" height="40" rx="8" fill="#facc15" stroke="#000000" strokeWidth="3" />
          <text x="190" y="196" textAnchor="middle" fill="#000000" fontSize="14" fontFamily="monospace" fontWeight="bold">INTENT-DRIVEN UI</text>

          <text x="200" y="340" textAnchor="middle" fill="#000000" fontSize="14" fontFamily="mono" fontWeight="bold">AI GENERATIVE 2026</text>
        </svg>
      )}

      {/* 默认兜底艺术底影（若无特殊匹配） */}
      {!idStr.includes('braun') && !idStr.includes('space') && !idStr.includes('memphis') &&
       !idStr.includes('pixel') && !idStr.includes('synth') && !idStr.includes('grunge') &&
       !idStr.includes('y2k') && !idStr.includes('aqua') && !idStr.includes('skeuo') &&
       !idStr.includes('aero') && !idStr.includes('mat') && !idStr.includes('swiss') &&
       !idStr.includes('corp') && !idStr.includes('vos') && !idStr.includes('bento') &&
       !idStr.includes('neo') && (
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
          <rect width="400" height="400" fill="#0f172a" />
          <circle cx="200" cy="180" r="100" fill={primaryColor} opacity="0.3" />
          <rect x="80" y="80" width="240" height="200" rx="16" fill="#1e293b" stroke={primaryColor} strokeWidth="2" />
          <text x="200" y="170" textAnchor="middle" fill="#ffffff" fontSize="18" font-family="sans-serif" fontWeight="bold">{record.title}</text>
          <text x="200" y="210" textAnchor="middle" fill={primaryColor} fontSize="12" font-family="monospace">{record.subtitle}</text>
        </svg>
      )}

    </div>
  );
};
