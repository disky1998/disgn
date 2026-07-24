import React, { useState } from 'react';
import { PageId, ThemeMode } from '../types';
import { Sun, Moon, Cpu, Terminal, Shield, Network, Activity, Menu, X } from 'lucide-react';

interface NavbarProps {
  activePage: PageId;
  onPageChange: (page: PageId) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onPageChange,
  theme,
  onToggleTheme
}) => {
  const [hoveredNav, setHoveredNav] = useState<PageId | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string; enLabel: string; icon: React.ReactNode }[] = [
    { id: 'interface', label: '界面主页', enLabel: 'INTERFACE', icon: <Cpu className="w-4 h-4" /> },
    { id: 'neural', label: '神经内核', enLabel: 'NEURAL NET', icon: <Network className="w-4 h-4" /> },
    { id: 'dashboard', label: '控制中心', enLabel: 'DASHBOARD', icon: <Activity className="w-4 h-4" /> },
    { id: 'logs', label: '系统日志', enLabel: 'LOGS', icon: <Terminal className="w-4 h-4" /> },
    { id: 'protocol', label: '协议规格', enLabel: 'PROTOCOL', icon: <Shield className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-4 left-0 right-0 z-40 px-4 md:px-8 max-w-7xl mx-auto pointer-events-auto">
      <div className="glass-panel-glow rounded-xl px-4 py-3 flex items-center justify-between transition-all duration-300 border border-cyan-500/30">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onPageChange('interface')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00f3ff] to-[#ff4d00] p-0.5 flex items-center justify-center shadow-[0_0_12px_rgba(0,243,255,0.4)] group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#050505] rounded-[7px] flex items-center justify-center">
              <span className="font-mono font-black text-sm text-[#00f3ff] group-hover:text-[#ff4d00] transition-colors">99</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-mono font-bold tracking-widest text-sm flex items-center space-x-1">
              <span className="text-[#00f3ff]">MCP</span>
              <span className="text-slate-400">//</span>
              <span className="text-[#ff4d00]">2099</span>
            </span>
            <span className="text-[9px] font-mono tracking-wider text-slate-400 uppercase">
              神经元操作系统 (Neural OS)
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            const isHovered = hoveredNav === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                onMouseEnter={() => setHoveredNav(item.id)}
                onMouseLeave={() => setHoveredNav(null)}
                className={`relative px-3 py-2 rounded-lg text-xs font-mono transition-all duration-200 flex items-center space-x-2 border ${
                  isActive
                    ? 'bg-cyan-500/15 text-[#00f3ff] border-cyan-500/50 shadow-[0_0_15px_rgba(0,243,255,0.2)]'
                    : 'text-slate-300 hover:text-white border-transparent hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                {/* Terminal Pointer Indicator */}
                <span className={`text-[#ff4d00] transition-opacity duration-150 ${isHovered || isActive ? 'opacity-100' : 'opacity-0'}`}>
                  &gt;
                </span>
                
                <span className={isActive ? 'text-[#00f3ff]' : 'text-slate-400'}>{item.icon}</span>
                <span className="font-medium tracking-wide">{item.label}</span>
                <span className="text-[10px] text-slate-500 hidden lg:inline-block">({item.enLabel})</span>
              </button>
            );
          })}
        </div>

        {/* Actions & Theme Toggle */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-700/60 transition-all shadow-sm"
            title={theme === 'dark' ? '切换至亮色模式' : '切换至暗色模式'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 animate-pulse" />
            ) : (
              <Moon className="w-4 h-4 text-sky-600" />
            )}
          </button>

          {/* Quick CTA Button: Initialize System */}
          <button
            onClick={() => onPageChange('dashboard')}
            className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-gradient-to-r from-[#ff4d00] to-orange-600 text-white shadow-[0_0_15px_rgba(255,77,0,0.4)] hover:shadow-[0_0_25px_rgba(255,77,0,0.7)] hover:scale-105 transition-all active:scale-95"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            <span>初始化控制台</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 glass-panel rounded-xl flex flex-col space-y-2 border border-cyan-500/30 animate-in fade-in slide-in-from-top-4 duration-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onPageChange(item.id);
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-3 rounded-lg text-sm font-mono flex items-center space-x-3 ${
                activePage === item.id
                  ? 'bg-cyan-500/20 text-[#00f3ff] border border-cyan-500/40'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
              <span className="text-xs text-slate-500">({item.enLabel})</span>
            </button>
          ))}
          <button
            onClick={() => {
              onPageChange('dashboard');
              setMobileMenuOpen(false);
            }}
            className="w-full mt-2 py-3 rounded-lg text-sm font-mono font-semibold bg-gradient-to-r from-[#ff4d00] to-orange-600 text-white text-center shadow-lg"
          >
            初始化控制台
          </button>
        </div>
      )}
    </nav>
  );
};
