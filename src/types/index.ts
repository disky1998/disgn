export type PageId = 'interface' | 'neural' | 'dashboard' | 'logs' | 'protocol';

export type ThemeMode = 'dark' | 'light';

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'SEC' | 'QUANTUM' | 'CRIT';
  source: string;
  message: string;
}

export interface NodeMetrics {
  id: string;
  name: string;
  region: string;
  status: 'ONLINE' | 'STANDBY' | 'SYNCING' | 'OVERLOAD';
  latency: number;
  load: number;
  coordinates: [number, number];
}

export interface SystemTelemetry {
  cpuUsage: number;
  quantumVram: number;
  netSpeed: number;
  activeSynapses: number;
  threatLevel: 'STABLE' | 'ELEVATED' | 'CRITICAL';
  securityBlocked: number;
}
