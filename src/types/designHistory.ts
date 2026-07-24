export interface DecadeData {
  id: string;
  label: string;
  yearRange: string;
  title: string;
  subtitle: string;
  desc: string;
  philosophy: string;
  philosophyAuthor?: string;
  context: string;
  tech: string[];
  keyEvents: { year: string; title: string; description: string }[];
  prompt: string;
  stats: {
    rationalism: number; // 理性
    expressionism: number; // 感性
    functionality: number; // 功能
    decoration: number; // 装饰
  };
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    bgGradient: string;
    cardBorder: string;
  };
  designElements: string[];
  svgStyle: 'retroGrid' | 'memphisPattern' | 'grungeNoise' | 'aquaReflection' | 'flatVector' | 'spatialNebula';
}
