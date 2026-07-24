import { DecadeData } from '../types/designHistory';

export const DECADE_DATA: Record<string, DecadeData> = {
  '1970': {
    id: '1970',
    label: '1970s',
    yearRange: '1970 - 1979',
    title: '有机复古与工业理性',
    subtitle: '回归本质与大地色彩的温化时代',
    desc: '70年代处于冷战时期的工业理性与反主流文化膨胀的交汇点。以迪特·拉姆斯（Dieter Rams）倡导的“设计十原则”为巅峰，工业产品强调纯粹的功能结构、铝拉丝质感、暖大地色调与优雅的几何按键。',
    philosophy: '“Less, but better.”（少，但更好）',
    philosophyAuthor: 'Dieter Rams (博朗设计总监)',
    context: '石油危机与理性工业秩序的深刻博弈，极简主义在电子产品中崭露头角。',
    tech: ['彩色电视普及', '集成电路微型化', '早期CGI与LED显示', 'Braun SK4 工业范例'],
    keyEvents: [
      { year: '1972', title: 'Atari Pong 发布', description: '开启电子游戏交互界面的先河' },
      { year: '1976', title: 'Apple I 诞生', description: '个人电脑工业设计的萌芽' },
      { year: '1977', title: 'Braun ET66 计算器', description: '工业理性美学的巅峰表达' }
    ],
    prompt: '1970s warm retro industrial design aesthetic, Braun inspired vintage audio player, cream white plastic, warm orange accents, exposed chrome metal switches, tactile knobs, ultra detailed product shot.',
    stats: {
      rationalism: 65,
      expressionism: 35,
      functionality: 85,
      decoration: 25
    },
    palette: {
      primary: '#d97706', // 暖橙
      secondary: '#b45309',
      accent: '#f59e0b',
      bgGradient: 'from-[#1e1b18] via-[#2a241e] to-[#12100e]',
      cardBorder: 'rgba(217, 119, 6, 0.3)'
    },
    designElements: ['大地色调 (Earth Tones)', '克罗姆拉丝金属', '粗边框几何字体', '网格按键排布'],
    svgStyle: 'retroGrid'
  },
  '1980': {
    id: '1980',
    label: '1980s',
    yearRange: '1980 - 1989',
    title: '后现代主义与孟菲斯反叛',
    subtitle: '打破沉闷，宣告情感与色彩狂欢的到来',
    desc: '以埃托雷·索特萨斯（Ettore Sottsass）建立的“孟菲斯集团 (Memphis Group)”为代表，80年代彻底瓦解了严肃的现代主义教条。高饱和度霓虹撞色、非对称几何体、黑色锯齿波纹（Bacterio）与幽默感风靡全球。',
    philosophy: '“Form Follows Emotion.”（形式追随情感 / 多即是多）',
    philosophyAuthor: 'Ettore Sottsass (孟菲斯运动创始人)',
    context: '消费主义兴起，波普艺术与赛博朋克文化交融，个人电脑图形界面 (GUI) 的曙光。',
    tech: ['Apple Macintosh (1984 GUI)', 'Sony Walkman 随身听', '8位/16位像素游戏机', '合成器流行乐器'],
    keyEvents: [
      { year: '1981', title: '孟菲斯设计展首演', description: '米兰家具展上震撼世界的后现代主义反叛' },
      { year: '1984', title: 'Apple Macintosh 诞生', description: '首款面向大众的可视化桌面前端 GUI' },
      { year: '1985', title: 'NES 红白机时代', description: '像素风（Pixel Art）成为主流大众美学' }
    ],
    prompt: '1980s Memphis design group style, vibrant neon pink and teal, 3D geometric floating solids, black bacterio squiggles pattern, pop art pop culture, glossy plastic aesthetic.',
    stats: {
      rationalism: 25,
      expressionism: 85,
      functionality: 40,
      decoration: 90
    },
    palette: {
      primary: '#ec4899', // 霓虹粉
      secondary: '#06b6d4', // 亮青
      accent: '#eab308', // 明黄
      bgGradient: 'from-[#290e2b] via-[#1a0b2e] to-[#0d0718]',
      cardBorder: 'rgba(236, 72, 153, 0.4)'
    },
    designElements: ['孟菲斯撞色 (Memphis Pattern)', '非对称几何切割', '霓虹高饱和光感', '黑色斑点锯齿波'],
    svgStyle: 'memphisPattern'
  },
  '1990': {
    id: '1990',
    label: '1990s',
    yearRange: '1990 - 1999',
    title: '数字混沌与解构主义',
    subtitle: 'Photoshop 革命与摇滚朋克的规则破灭',
    desc: '90年代是数字工具普及带来的震撼解构期。大卫·卡森（David Carson）在《Ray Gun》杂志中撕碎了传统的版式网格；Photoshop 诞生让多图层叠加、暗色噪点颗粒、扭曲排版（Grunge Typo）成为反抗平庸的旗帜。',
    philosophy: '“Don\'t mistake legibility for communication.”（不要将易读性误认为沟通）',
    philosophyAuthor: 'David Carson (解构主义平面大师)',
    context: '互联网 Web 1.0 萌芽，胶片向数码转型，数字混沌中探寻排版边界。',
    tech: ['Adobe Photoshop 1.0', 'Web 1.0 (HTML/CSS)', 'CD-ROM 交互多媒体', 'Cyberpunk 美学爆发'],
    keyEvents: [
      { year: '1990', title: 'Photoshop v1.0 发布', description: '彻底颠覆图像合成与视觉设计的底层逻辑' },
      { year: '1992', title: 'Ray Gun 杂志发刊', description: '大卫·卡森开启解构主义排版新时代' },
      { year: '1998', title: 'iMac G3 果冻感透明设计', description: '工业设计脱离冷冰冰灰框，拥抱透明胶感' }
    ],
    prompt: '1990s grunge graphic design, dark gritty film grain texture, distorted typography overlay, dark cyan and rusted red tones, Photoshop layer collage style,cyber grunge aesthetic.',
    stats: {
      rationalism: 35,
      expressionism: 75,
      functionality: 50,
      decoration: 80
    },
    palette: {
      primary: '#64748b', // 工业蓝灰
      secondary: '#ef4444', // 摇滚血红
      accent: '#22c55e', // 早期终端绿
      bgGradient: 'from-[#0f172a] via-[#111827] to-[#030712]',
      cardBorder: 'rgba(100, 116, 139, 0.4)'
    },
    designElements: ['胶片噪点 (Film Grain)', '错位印刷与图层撕裂', '透明彩色塑料 (iMac G3)', '暗黑摇滚字形'],
    svgStyle: 'grungeNoise'
  },
  '2000': {
    id: '2000',
    label: '2000s',
    yearRange: '2000 - 2009',
    title: '拟物化与触摸交互革命',
    subtitle: '现实与虚拟的桥梁：皮革、高光与水滴玻璃',
    desc: '随着初代 iPhone (2007) 与 Web 2.0 的兴起，UI 设计迎来了拟物化（Skeuomorphism）的巅峰。为了帮助人类跨越实体键到电容屏的心理鸿沟，数字界面大量摹拟物理世界的皮革缝线、拉丝金属、高光玻璃球与凝胶按钮。',
    philosophy: '“Cognitive Bridge: Physical Metaphor.”（认知桥梁：现实物理隐喻）',
    philosophyAuthor: 'Steve Jobs & Apple Human Interface Group',
    context: '移动互联网爆发，用户首次建立触摸屏交互心智，现实隐喻降低认知成本。',
    tech: ['Apple iPhone / iOS (2007)', 'Capacitive Multi-Touch', 'Flash 交互动画', 'Aqua UI & Aero 玻璃'],
    keyEvents: [
      { year: '2001', title: 'Mac OS X Aqua UI', description: '水滴高光凝胶按钮震撼全球视觉界' },
      { year: '2007', title: '初代 iPhone 发布', description: '拟物化手势滑动交互定义现代智能手机' },
      { year: '2008', title: 'Windows Vista / Aero', description: '毛玻璃透视与 3D 窗口叠放界面普及' }
    ],
    prompt: '2000s skeuomorphic Apple Aqua UI style, glossy 3D glass sphere with internal fluid, realistic leather texture, chrome metal bezel, drop shadows, water bubble physics, ultra polished render.',
    stats: {
      rationalism: 55,
      expressionism: 55,
      functionality: 80,
      decoration: 75
    },
    palette: {
      primary: '#3b82f6', // 水晶蓝
      secondary: '#0284c7', // 深水蓝
      accent: '#38bdf8', // 高光天蓝
      bgGradient: 'from-[#07192f] via-[#0b2545] to-[#030d1a]',
      cardBorder: 'rgba(59, 130, 246, 0.5)'
    },
    designElements: ['拟物皮革缝线', 'Aqua 水滴高光球', '拉丝镀铬质感', '玻璃反光与弧形倒影'],
    svgStyle: 'aquaReflection'
  },
  '2010': {
    id: '2010',
    label: '2010s',
    yearRange: '2010 - 2019',
    title: '大扁平化与企业级极简',
    subtitle: '剥离冗余沉淀，跨端响应与数字效率至上',
    desc: 'Jony Ive 主导的 iOS 7 彻底清除了拟物装点，开启了全球的大扁平化（Flat Design）运动。Google 提出了 Material Design，以纸张物理层级为灵感，结合高纯度色块、无边框卡片与极简矢量图标，实现多终端的丝滑适配。',
    philosophy: '“Digital Efficiency & Authentic Flat.”（数字化纯粹与跨端效率）',
    philosophyAuthor: 'Google Material Design & Jony Ive (iOS 7)',
    context: '移动端多屏幕尺寸爆发，网页与App需要极轻量化加载与标准化组件库体系。',
    tech: ['Google Material Design', 'iOS 7 扁平化重构', 'Design System (Figma / Sketch)', '响应式布局 (RWD)'],
    keyEvents: [
      { year: '2013', title: 'iOS 7 正式发布', description: '宣告拟物化时代终结，全球迈向极简二维平面' },
      { year: '2014', title: 'Google Material Design', description: '建立基于物理纸张叠放与动效的规范体系' },
      { year: '2016', title: 'Figma 云端协同时代', description: '设计系统 (Design System) 成为企业级标配' }
    ],
    prompt: '2010s flat design illustration style, minimalist Google Material Design, solid vibrant vector color blocks, crisp card shadow, modern sans-serif typography, clean digital UI layout.',
    stats: {
      rationalism: 90,
      expressionism: 20,
      functionality: 95,
      decoration: 15
    },
    palette: {
      primary: '#10b981', // 翡翠绿
      secondary: '#059669',
      accent: '#34d399',
      bgGradient: 'from-[#062016] via-[#0a2e20] to-[#02100a]',
      cardBorder: 'rgba(16, 185, 129, 0.4)'
    },
    designElements: ['Material 阴影色阶', '矢量网格对齐', '纯色块 (Solid Color Blocks)', '无缝响应式卡片'],
    svgStyle: 'flatVector'
  },
  '2026': {
    id: '2026',
    label: '2020-2026',
    yearRange: '2020 - 2026',
    title: '空间 UI 与 AI 意图界面',
    subtitle: 'Bento Grid 规则、沉静透明度与多模态智能共生',
    desc: '当代设计步入了空间计算（VisionOS Spatial UI）与生成式 AI（Generative UI）的无界时代。Bento Grid 便当盒成为信息承载的基石；界面摒弃冗余菜单，根据用户“意图 (Intent)”实时生成自适应组件；磨砂毛玻璃与全息粒子散发沉静科技美学。',
    philosophy: '“Ambient Interface & Intent-Driven Flow.”（沉静空间界面与意图驱动流动）',
    philosophyAuthor: 'Apple VisionOS & Next-Gen AI Design Labs',
    context: 'Vision Pro 带来三维深度交互，LLM 与多模态 AI 实时重构个性化界面。',
    tech: ['Apple VisionOS 空间计算', 'Generative UI / Intent-Driven AI', 'WebGPU 实时三维光线追踪', 'Advanced Bento Architecture'],
    keyEvents: [
      { year: '2023', title: 'Apple Vision Pro 发布', description: '定义以眼睛和手势驱动的空间计算 UI 范式' },
      { year: '2024', title: 'Bento Grid 风靡全球', description: '信息密度与模块化视觉美学的极致平衡' },
      { year: '2026', title: 'AI 意图即时界面 (Intent UI)', description: '静态组件库退场，界面随交互神经实时演化生成' }
    ],
    prompt: '2026 futuristic spatial computing UI, Apple VisionOS inspired frosted glassmorphism, floating 3D Bento grid cards, glowing dynamic holographic particles, ethereal ambient lighting, hyper modern cyber interface.',
    stats: {
      rationalism: 75,
      expressionism: 80,
      functionality: 95,
      decoration: 65
    },
    palette: {
      primary: '#8b5cf6', // 空间紫
      secondary: '#06b6d4', // 全息青
      accent: '#c084fc', // 霓光紫
      bgGradient: 'from-[#17092c] via-[#0d122b] to-[#04020a]',
      cardBorder: 'rgba(139, 92, 246, 0.5)'
    },
    designElements: ['Bento Grid 便当盒', 'VisionOS 悬浮毛玻璃', '全息三维光粒子', 'AI 意图自适应'],
    svgStyle: 'spatialNebula'
  }
};

export const TIMELINE_YEARS = ['1970', '1980', '1990', '2000', '2010', '2026'];
