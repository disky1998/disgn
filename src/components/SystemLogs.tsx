import React, { useEffect, useRef, useState } from 'react';
import { LogEntry } from '../types';
import { Terminal, Filter, Play, Pause, Copy, Trash2, Search, Send, Check } from 'lucide-react';

export const SystemLogs: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const [isStreaming, setIsStreaming] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);
  const [commandInput, setCommandInput] = useState('');
  const [copied, setCopied] = useState(false);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const sources = ['KERNEL', 'QUANTUM_LINK', 'NEURAL_CORE', 'FIREWALL', 'BLOCKCHAIN', 'SYNAPSE'];

  const sampleMessages = [
    { level: 'INFO', msg: '完成 0x99_NEURAL 核心节点零知识密文打包，耗时 0.024ms' },
    { level: 'INFO', msg: '尝试重新平衡 12,480 个跨洲节点算力拓扑' },
    { level: 'SEC', msg: '防御墙拦截源自 198.51.100.99 伪造签名探测，IP 封禁 24h' },
    { level: 'WARN', msg: '检测到南美 node-br-04 神经突触延时波动 (+14ms)' },
    { level: 'QUANTUM', msg: '触发量子缠绕态密钥轮换，新 Hash: 0x88A_99F_2099' },
    { level: 'CRIT', msg: '自动恢复机制已隔离异常内存通道 #3' },
    { level: 'INFO', msg: '自适应 ADAM_QUANTUM 神经网络梯度收敛损失下降至 0.0003' },
  ];

  // Initialize initial logs
  useEffect(() => {
    const initial: LogEntry[] = [];
    const now = new Date();

    for (let i = 15; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 1200);
      const sample = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
      initial.push({
        id: Math.random().toString(36).substring(2, 9),
        timestamp: time.toISOString().substring(11, 23),
        level: sample.level as LogEntry['level'],
        source: sources[Math.floor(Math.random() * sources.length)],
        message: sample.msg,
      });
    }

    setLogs(initial);
  }, []);

  // Live Stream Logging Generator
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      const sample = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
      const newLog: LogEntry = {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toISOString().substring(11, 23),
        level: sample.level as LogEntry['level'],
        source: sources[Math.floor(Math.random() * sources.length)],
        message: sample.msg,
      };

      setLogs((prev) => [...prev.slice(-150), newLog]);
    }, 1500);

    return () => clearInterval(interval);
  }, [isStreaming]);

  // Auto scroll effect
  useEffect(() => {
    if (autoScroll && logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  // Handle Command Submission
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    const newLog: LogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString().substring(11, 23),
      level: 'INFO',
      source: 'USER_CLI',
      message: `执行指令: $ ${commandInput.trim()}`,
    };

    setLogs((prev) => [...prev, newLog]);
    setCommandInput('');
  };

  const filteredLogs = logs.filter((log) => {
    if (filterLevel === 'ALL') return true;
    return log.level === filterLevel;
  });

  const handleCopy = () => {
    const text = filteredLogs.map((l) => `[${l.timestamp}] [${l.level}] [${l.source}] ${l.message}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="min-h-screen pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto cyber-grid">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-4 border-b border-cyan-500/30">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#00f3ff] mb-1">
            <Terminal className="w-4 h-4 text-[#ff4d00]" />
            <span>REALTIME SYSTEM LOGS // 实时系统日志流</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-mono tracking-tight text-white glow-cyan">
            LOGS_FEED (终端监控)
          </h2>
        </div>

        {/* Toolbar Controls */}
        <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-2 font-mono text-xs">
          
          {/* Pause / Play Toggle */}
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={`px-3 py-1.5 rounded-lg border flex items-center space-x-1.5 transition-all ${
              isStreaming
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
            }`}
          >
            {isStreaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isStreaming ? '暂停推流' : '恢复推流'}</span>
          </button>

          {/* Copy Logs */}
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg glass-panel border border-cyan-500/30 text-slate-300 hover:text-white flex items-center space-x-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '已复制' : '复制日志'}</span>
          </button>

          {/* Clear Logs */}
          <button
            onClick={() => setLogs([])}
            className="px-3 py-1.5 rounded-lg glass-panel border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 flex items-center space-x-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>清屏</span>
          </button>
        </div>
      </div>

      {/* Filter Level Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-4 font-mono text-xs">
        <span className="text-slate-400 flex items-center space-x-1 mr-2">
          <Filter className="w-3.5 h-3.5 text-[#00f3ff]" />
          <span>级别过滤:</span>
        </span>

        {['ALL', 'INFO', 'WARN', 'SEC', 'QUANTUM', 'CRIT'].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setFilterLevel(lvl)}
            className={`px-3 py-1 rounded-md border transition-all ${
              filterLevel === lvl
                ? 'bg-[#00f3ff]/20 text-[#00f3ff] border-[#00f3ff]/60 font-bold shadow-[0_0_10px_rgba(0,243,255,0.3)]'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {lvl}
          </button>
        ))}

        <label className="ml-auto flex items-center space-x-2 text-slate-400 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={autoScroll}
            onChange={(e) => setAutoScroll(e.target.checked)}
            className="accent-[#00f3ff]"
          />
          <span>自动滚屏</span>
        </label>
      </div>

      {/* Main Terminal Feed Container */}
      <div className="glass-panel rounded-2xl border border-cyan-500/40 p-4 relative flex flex-col h-[560px] scanlines">
        
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400 mb-3">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 text-slate-300">mcp-2099-kernel.log --tail</span>
          </div>
          <span>LOG_ENTRIES: {filteredLogs.length}</span>
        </div>

        {/* Terminal Log Stream Scroll Area */}
        <div
          ref={logContainerRef}
          className="flex-1 overflow-y-auto font-mono text-xs space-y-2 pr-2 selection:bg-cyan-500 selection:text-black"
        >
          {filteredLogs.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-500 italic">
              暂无匹配的系统日志条目...
            </div>
          ) : (
            filteredLogs.map((log) => {
              let badgeColor = 'bg-slate-800 text-slate-300 border-slate-700';
              if (log.level === 'INFO') badgeColor = 'bg-cyan-500/20 text-[#00f3ff] border-cyan-500/40';
              if (log.level === 'WARN') badgeColor = 'bg-amber-500/20 text-amber-400 border-amber-500/40';
              if (log.level === 'SEC') badgeColor = 'bg-rose-500/20 text-rose-400 border-rose-500/40';
              if (log.level === 'QUANTUM') badgeColor = 'bg-purple-500/20 text-purple-400 border-purple-500/40';
              if (log.level === 'CRIT') badgeColor = 'bg-red-600 text-white font-bold animate-pulse';

              return (
                <div
                  key={log.id}
                  className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 p-2 rounded hover:bg-slate-900/80 transition-colors border border-transparent hover:border-slate-800"
                >
                  <span className="text-slate-500 shrink-0 font-light">[{log.timestamp}]</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] border font-bold shrink-0 ${badgeColor}`}>
                    {log.level}
                  </span>
                  <span className="text-slate-400 text-[11px] shrink-0">[{log.source}]</span>
                  <span className="text-slate-200 break-all">{log.message}</span>
                </div>
              );
            })
          )}
        </div>

        {/* Terminal Interactive Command Bar */}
        <form onSubmit={handleCommandSubmit} className="mt-3 pt-3 border-t border-slate-800 flex items-center space-x-2">
          <span className="text-[#ff4d00] font-mono font-bold">&gt;</span>
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            placeholder="输入终端调试命令 (如: --query-status, --optimize-synapses)..."
            className="flex-1 bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-[#00f3ff] transition-colors"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#00f3ff] text-slate-950 font-mono font-bold text-xs hover:bg-cyan-400 transition-colors flex items-center space-x-1"
          >
            <span>发送</span>
            <Send className="w-3 h-3" />
          </button>
        </form>

      </div>

    </section>
  );
};
