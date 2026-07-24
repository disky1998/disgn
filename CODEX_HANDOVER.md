# 设计史半世纪演进 (1970-2026) - 项目交接文档 (Codex Handoff Document)

本文档旨在为 **Codex** 或后续开发者提供完整、规范的项目交接说明，帮助快速了解项目架构、代码目录、数据模型、3D/SVG 组件实现及后续开发拓展指南。

---

## 1. 项目概述 (Project Overview)

- **项目名称**：设计史半世纪演进 (1970-2026) 3D 沉浸式交互探索大屏
- **技术栈**：React 18 + TypeScript + Vite + Three.js (`@react-three/fiber`, `@react-three/drei`) + Tailwind CSS (v4) + Lucide Icons
- **使命**：将 1970~2026 半世纪的设计美学演进史重构为一个具备 **3D 实时渲染雕塑**、**动态 SVG 矢量图形**、**18 个细分美学流派** 与 **180+ 张 3D 黑胶唱片 Cover Flow 轮播画廊** 的交互探索平台。

---

## 2. 核心架构与目录结构 (Directory & Architecture)

```
kind-carson/
├── index.html                   # HTML 模板与 Google 字体引入
├── package.json                 # 项目依赖 (Three.js, React Three Fiber, GSAP, Tailwind v4)
├── vite.config.ts               # Vite 配置文件
├── CODEX_HANDOVER.md            # 项目根目录交接文档
└── src/
    ├── main.tsx                 # 应用入口挂载
    ├── App.tsx                  # 根组件 (挂载 MainDesignDashboard)
    ├── index.css                # 全局样式与 Tailwind v4 指令
    ├── types/
    │   └── designHistory.ts     # 核心 TypeScript 类型定义 (DecadeData, VinylRecordItem, SubAesthetic)
    ├── data/
    │   ├── designHistoryData.ts # 6 大主年代 (1970-2026) 历史哲学、理性/感性指标与 AI Prompt
    │   └── subAestheticsData.ts # 18 个细分流派 & 180+ 张唱片全量数据
    └── components/
        ├── DesignBento/         # Bento Grid 模块化主 UI
        │   ├── MainDesignDashboard.tsx  # 主大屏容器 (4 列 Bento 布局, 主题切换)
        │   ├── TimelineNav.tsx          # 粘性时间轴导航 (支持键盘 ← / → 快捷键)
        │   ├── DecadeHeroCard.tsx       # 年代主题 Hero 卡片与技术 Tag
        │   ├── PhilosophyCard.tsx       # 设计哲学名言与历史里程碑节点
        │   ├── StyleShowcaseCard.tsx    # 风格重构卡片 (整合 3D 唱片、3D 雕塑、SVG 与调色盘)
        │   ├── SubAestheticSelector.tsx # 18 细分流派 Tab 选择器
        │   └── ChartSection.tsx         # 数据范式平衡图表区
        ├── Vinyl3D/             # 3D 黑胶唱片展台与美学保护层
        │   ├── VinylCoverFlow3D.tsx     # 3D Cover-Flow 黑胶唱片轮播展台
        │   ├── RealAestheticArt.tsx     # 100% 对应真实美学作品的双重校验渲染保护层
        │   └── VinylCardCanvas.tsx      # Procedural 矢量美学画布组件
        ├── ThreeCanvas/         # Three.js 3D 实时渲染组件
        │   ├── DesignScene3D.tsx        # Three.js Canvas 场景配置与光源
        │   └── Decade3DArtifacts.tsx    # 6 个年代专属的 Three.js 三维雕塑组件
        └── DynamicSVG/          # 动态 SVG 组件
            ├── SVGStyleGraphic.tsx      # 6 款年代动态 SVG 矢量底纹
            └── InteractiveSVGCharts.tsx # 发光 Spline 趋势图与 Gauge 占比环
```

---

## 3. 核心数据模型 (Data Models)

### `DecadeData` (`src/types/designHistory.ts`)
定义大年代核心数据，包含 `id`, `label`, `title`, `philosophy`, `stats` (理性/感性权重), `palette` (调色盘), `prompt` (AI 提示词) 等。

### `SubAesthetic` (`src/data/subAestheticsData.ts`)
定义 18 个细分流派：
- **1970s**: 博朗工业极简主义、太空时代复古未来、70s 自由有机大地色。
- **1980s**: 孟菲斯后现代主义、8-Bit 像素街机艺术、霓虹赛博浪潮 (Synthwave)。
- **1990s**: Ray Gun 解构主义摇滚排版、Y2K 科技与 iMac G3 果冻感、酸性平面与数码混沌。
- **2000s**: Apple Aqua UI 水滴水晶玻璃、拟物化皮革与镀铬金属、Frutiger Aero 自然光感拟物。
- **2010s**: Google Material Design 纸层、瑞士新极简主义与大网格、Corporate Memphis 企业插画。
- **2026s**: VisionOS 空间计算沉浮毛玻璃、模块化 Bento Grid 便当盒、新粗糙主义与 AI 意图流。

### `VinylRecordItem`
每张唱片包含 `id`, `title`, `subtitle`, `coverImage`, `discColor`, `description`, `year`, `tags`。

---

## 4. 关键技术实现细节 (Technical Highlights)

### A. 3D Cover Flow 唱片轮播展台 (`VinylCoverFlow3D.tsx`)
- 在 3D 空间 (`perspective: 1200px`) 中基于景深与 X 轴偏移（`150px` 间隔）计算卡片位置。
- 选中的 Active 唱片中，**黑胶唱盘 (3D Vinyl Disc)** 在右上方以斜向 3D 角度平滑滑出并旋转自转。
- 解读文字区域与 3D 唱片展台分离置于底部，消除重叠与文字遮挡。

### B. 美学渲染保护层 (`RealAestheticArt.tsx`)
- 建立了标题与 ID 的双重校验层，确保博朗 SK4 唱机、ET66 计算器、KM3 搅拌机、iMac G3、Vision Pro 等核心典范能 **100% 精准匹配呈现对应的工业视觉**，防止乱混杂图。

### C. Three.js 3D 艺术雕塑 (`Decade3DArtifacts.tsx`)
- 采用 `@react-three/drei` 的 `<Float>`, `<MeshWobbleMaterial>`, `<ContactShadows>`, `<Sparkles>` 等组件。
- 00 年代 Aqua 玻璃球采用 `<meshPhysicalMaterial>` 实现高透折射 (`transmission={0.85}`, `ior={1.4}`)。

---

## 5. 开发与构建指令 (Commands & Setup)

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器 (默认端口 5173 / 5174)
npm run dev

# 3. TypeScript 检查与生产打包
npm run build

# 4. PowerShell 下绕过策略运行指令 (适用于 Windows)
powershell -ExecutionPolicy Bypass -Command "npm run dev"
powershell -ExecutionPolicy Bypass -Command "npm run build"
```

---

## 6. 后续开发与拓展建议 (Future Roadmap for Codex)

1. **音频/音效回馈 (Audio Integration)**：
   - 为 3D 唱片轮播加上黑胶唱片落针音效 (Vinyl Needle Drop) 与复古 Synthwave/70s 爵士背景乐片段。
2. **更多美学细节下钻 (Modal & Detail View)**：
   - 点击选中的唱片，支持弹出全屏大图、三维模型 3D 旋转预览与历史故事卡片。
3. **WebGPU 光线追踪 (WebGPU Ray-Tracing)**：
   - 在 2026 年代展示中引入 WebGPU 实时反射与全息光粒子。
