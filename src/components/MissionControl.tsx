import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { 
  Globe, Cpu, Server, Shield, Activity, HardDrive, Wifi, Lock, AlertTriangle, 
  Terminal as TerminalIcon, CheckCircle2, TrendingUp, Zap
} from 'lucide-react';
import { NodeMetrics } from '../types';

export const MissionControl: React.FC<{ isLight: boolean }> = ({ isLight }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Live Threat Counters Simulation
  const [threatCount, setThreatCount] = useState(148290);
  const [activeNodesCount, setActiveNodesCount] = useState(12480);
  const [cpuUsage, setCpuUsage] = useState(64);
  const [vramUsage, setVramUsage] = useState(78);
  const [selectedNode, setSelectedNode] = useState<NodeMetrics | null>(null);

  // Nodes Data
  const nodes: NodeMetrics[] = [
    { id: 'node-sh', name: '上海·张江量子算力中心', region: '亚洲-中国', status: 'ONLINE', latency: 4, load: 72, coordinates: [75, 42] },
    { id: 'node-[#ff4d00]', name: '东京·神经元枢纽', region: '东亚-日本', status: 'ONLINE', latency: 12, load: 85, coordinates: [82, 40] },
    { id: 'node-sf', name: '旧金山·硅谷内核', region: '北美-美国', status: 'ONLINE', latency: 48, load: 63, coordinates: [20, 38] },
    { id: 'node-[#00f3ff]', name: '法兰克福·光纤堡垒', region: '欧洲-德国', status: 'ONLINE', latency: 32, load: 91, coordinates: [48, 30] },
    { id: 'node-sg', name: '新加坡·赤道节点', region: '东南亚', status: 'SYNCING', latency: 18, load: 45, coordinates: [73, 56] },
    { id: 'node-ldn', name: '伦敦·量子计算所', region: '欧洲-英国', status: 'ONLINE', latency: 29, load: 58, coordinates: [44, 28] },
  ];

  // GSAP Stagger Entrance Animation
  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.bento-item');
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out'
        }
      );
    }
  }, []);

  // Simulate real-time ticking data
  useEffect(() => {
    const interval = setInterval(() => {
      setThreatCount((prev) => prev + Math.floor(Math.random() * 5));
      setCpuUsage((prev) => Math.min(98, Math.max(30, prev + Math.floor(Math.random() * 7) - 3)));
      setVramUsage((prev) => Math.min(95, Math.max(40, prev + Math.floor(Math.random() * 5) - 2)));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto cyber-grid">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-cyan-500/30">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#00f3ff] mb-1">
            <Activity className="w-4 h-4 text-[#ff4d00] animate-pulse" />
            <span>MISSION CONTROL CENTER // 任务控制中心平台</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-mono tracking-tight text-white glow-cyan">
            全域算力控制台 (BENTO_GRID)
          </h2>
        </div>

        <div className="mt-4 md:mt-0 flex items-center space-x-3 text-xs font-mono">
          <span className="glass-panel px-3 py-1.5 rounded-lg border border-cyan-500/30 text-slate-300">
            节点同步状态: <span className="text-emerald-400 font-bold">100% HEALTHY</span>
          </span>
        </div>
      </div>

      {/* Bento Grid Layout (High Density) */}
      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        
        {/* Widget 1: Global Node Map (Spans 2 cols & 2 rows on large screens) */}
        <div className="bento-item md:col-span-2 lg:col-span-2 lg:row-span-2 glass-panel p-5 rounded-2xl border border-cyan-500/30 flex flex-col justify-between relative overflow-hidden group">
          
          <div className="flex items-center justify-between mb-4 z-10">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-200">
              <Globe className="w-4 h-4 text-[#00f3ff]" />
              <span className="font-bold">全球点阵节点拓扑 map</span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
              {activeNodesCount} 活跃节点
            </span>
          </div>

          {/* Dot-matrix Stylized World Map Container */}
          <div className="relative w-full h-[280px] bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden my-2">
            
            {/* World Grid Lines */}
            <div className="absolute inset-0 cyber-grid opacity-30"></div>
            
            {/* Simulated Latitude & Longitude SVG Circles */}
            <svg className="absolute inset-0 w-full h-full stroke-cyan-500/15" fill="none">
              <ellipse cx="50%" cy="50%" rx="42%" ry="38%" strokeDasharray="4 4" />
              <ellipse cx="50%" cy="50%" rx="30%" ry="24%" strokeDasharray="3 3" />
              <line x1="0" y1="50%" x2="100%" y2="50%" strokeDasharray="2 2" />
              <line x1="50%" y1="0" x2="50%" y2="100%" strokeDasharray="2 2" />
            </svg>

            {/* Interactive Node Pins */}
            {nodes.map((node) => (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group/pin cursor-pointer focus:outline-none"
                style={{ left: `${node.coordinates[0]}%`, top: `${node.coordinates[1]}%` }}
              >
                {/* Ping Pulse Animation */}
                <span className="absolute -inset-2 rounded-full bg-[#00f3ff]/30 animate-ping"></span>
                <div className="relative w-3.5 h-3.5 rounded-full bg-[#00f3ff] border-2 border-slate-900 shadow-[0_0_10px_#00f3ff] group-hover/pin:scale-125 transition-transform" />
                
                {/* Hover Tooltip */}
                <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 hidden group-hover/pin:flex flex-col glass-panel p-2 rounded text-[10px] font-mono text-white whitespace-nowrap border border-cyan-500/50 z-30 shadow-xl">
                  <span className="font-bold text-[#00f3ff]">{node.name}</span>
                  <span className="text-slate-300">延时: {node.latency} ms | 负载: {node.load}%</span>
                </div>
              </button>
            ))}
          </div>

          {/* Selected Node Details or Default Info */}
          <div className="z-10 bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs font-mono">
            {selectedNode ? (
              <div className="flex justify-between items-center text-slate-200">
                <span>[当前选中] <strong className="text-[#00f3ff]">{selectedNode.name}</strong></span>
                <span className="text-emerald-400">STATUS: {selectedNode.status}</span>
                <span className="text-[#ff4d00]">PING: {selectedNode.latency}ms</span>
              </div>
            ) : (
              <div className="flex justify-between text-slate-400">
                <span>提示: 点击地图节点查看实时延时与计算负载</span>
                <span className="text-[#00f3ff]">QUANTUM_LINK_ACTIVE</span>
              </div>
            )}
          </div>
        </div>

        {/* Widget 2: CPU Telemetry Metric */}
        <div className="bento-item glass-panel p-5 rounded-2xl border border-cyan-500/30 flex flex-col justify-between">
          <div className="flex justify-between items-center text-xs font-mono text-slate-300 mb-2">
            <span className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-[#00f3ff]" />
              <span>量子 CPU 占用率</span>
            </span>
            <span className="text-[#00f3ff] font-bold">{cpuUsage}%</span>
          </div>

          {/* Animated SVG Progress Circle */}
          <div className="relative flex items-center justify-center my-4">
            <svg className="w-28 h-28 transform -rotate-90">
              <circle cx="56" cy="56" r="45" stroke="#1e293b" strokeWidth="8" fill="transparent" />
              <circle
                cx="56"
                cy="56"
                r="45"
                stroke="#00f3ff"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray="282.7"
                strokeDashoffset={282.7 - (282.7 * cpuUsage) / 100}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-xl font-bold font-mono text-white">{cpuUsage}%</span>
              <span className="text-[9px] font-mono text-slate-400">32 CORES</span>
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-400 flex justify-between">
            <span>Core Temp: 42°C</span>
            <span>Freq: 5.8 GHz</span>
          </div>
        </div>

        {/* Widget 3: Neural VRAM Metric */}
        <div className="bento-item glass-panel p-5 rounded-2xl border border-cyan-500/30 flex flex-col justify-between">
          <div className="flex justify-between items-center text-xs font-mono text-slate-300 mb-2">
            <span className="flex items-center space-x-2">
              <HardDrive className="w-4 h-4 text-[#ff4d00]" />
              <span>神经元 VRAM 显存</span>
            </span>
            <span className="text-[#ff4d00] font-bold">{vramUsage}%</span>
          </div>

          {/* SVG Bar Stack */}
          <div className="my-4 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">可用容量: 1024 GB</span>
              <span className="text-slate-200">{Math.round((1024 * vramUsage) / 100)} GB</span>
            </div>
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
              <div
                className="bg-gradient-to-r from-orange-500 to-[#ff4d00] h-full rounded-full transition-all duration-300"
                style={{ width: `${vramUsage}%` }}
              />
            </div>
            <div className="grid grid-cols-5 gap-1 pt-1">
              {[1, 2, 3, 4, 5].map((idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-sm ${
                    idx * 20 <= vramUsage ? 'bg-[#ff4d00]' : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-400 flex justify-between">
            <span>Buffer: SWAP_ACTIVE</span>
            <span>PCIe v6.0: 128 GB/s</span>
          </div>
        </div>

        {/* Widget 4: Security Threat Monitor */}
        <div className="bento-item glass-panel p-5 rounded-2xl border border-cyan-500/30 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-2">
            <span className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>量子防御墙 (FIREWALL)</span>
            </span>
            <span className="text-emerald-400 flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>SECURE</span>
            </span>
          </div>

          <div className="my-2">
            <div className="text-2xl font-black font-mono text-white mb-1">
              {threatCount.toLocaleString()}
            </div>
            <p className="text-[10px] font-mono text-slate-400">
              实时拦截网络恶意探测 / DDoS / 算力篡改攻击
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center justify-between">
            <span>AI 防御机制</span>
            <span className="font-bold">AUTONOMOUS</span>
          </div>
        </div>

        {/* Widget 5: Network Traffic Area Chart SVG */}
        <div className="bento-item md:col-span-2 glass-panel p-5 rounded-2xl border border-cyan-500/30 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-2">
            <span className="flex items-center space-x-2">
              <Wifi className="w-4 h-4 text-[#00f3ff]" />
              <span>网络吞吐量波形图 (Network Traffic I/O)</span>
            </span>
            <span className="text-cyan-400 font-bold">12.4 GB/s</span>
          </div>

          {/* Area Chart SVG */}
          <div className="h-24 w-full relative my-2">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
              <defs>
                <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="0" y1="25" x2="400" y2="25" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="50" x2="400" y2="50" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="75" x2="400" y2="75" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />

              {/* Area path */}
              <path
                d="M 0,80 Q 50,40 100,60 T 200,30 T 300,70 T 400,20 L 400,100 L 0,100 Z"
                fill="url(#trafficGradient)"
              />
              {/* Stroke line */}
              <path
                d="M 0,80 Q 50,40 100,60 T 200,30 T 300,70 T 400,20"
                fill="none"
                stroke="#00f3ff"
                strokeWidth="2.5"
              />
            </svg>
          </div>

          <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800">
            <span>IN: 7.8 GB/s</span>
            <span>OUT: 4.6 GB/s</span>
            <span>PACKET LOSS: 0.00%</span>
          </div>
        </div>

        {/* Widget 6: Quick Terminal CLI */}
        <div className="bento-item md:col-span-1 glass-panel p-5 rounded-2xl border border-cyan-500/30 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-2">
            <span className="flex items-center space-x-2">
              <TerminalIcon className="w-4 h-4 text-[#ff4d00]" />
              <span>快速指令 CLI</span>
            </span>
          </div>

          <div className="space-y-2 my-2 font-mono text-xs">
            <button className="w-full text-left p-2 rounded bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-[#00f3ff] hover:border-cyan-500/40 transition-colors flex items-center justify-between">
              <span>$ mcp-2099 --flush-cache</span>
              <Zap className="w-3 h-3 text-[#ff4d00]" />
            </button>
            <button className="w-full text-left p-2 rounded bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-[#00f3ff] hover:border-cyan-500/40 transition-colors flex items-center justify-between">
              <span>$ mcp-2099 --sync-nodes</span>
              <Zap className="w-3 h-3 text-[#ff4d00]" />
            </button>
          </div>

          <div className="text-[10px] font-mono text-slate-400">
            按 ENTER 在日志界面调试
          </div>
        </div>

      </div>

    </section>
  );
};
