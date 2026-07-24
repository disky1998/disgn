import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PageId } from '../types';
import { ShieldCheck, Cpu, Terminal, ArrowRight, Zap, Database, Lock } from 'lucide-react';

// Procedural 3D Data Globe Shader
const DataGlobeMesh: React.FC<{ isLight: boolean }> = ({ isLight }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorPrimary: { value: new THREE.Color(isLight ? 0x0284c7 : 0x00f3ff) },
      uColorSecondary: { value: new THREE.Color(isLight ? 0xea580c : 0xff4d00) }
    }),
    [isLight]
  );

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.uTime.value = state.clock.getElapsedTime();
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float uTime;

    void main() {
      vUv = uv;
      vNormal = normal;
      vec3 pos = position;
      
      // Sine wave displacement (breathing effect)
      float displacement = sin(pos.x * 4.0 + uTime * 2.0) * cos(pos.y * 4.0 + uTime * 1.5) * 0.12;
      pos += normal * displacement;
      
      vPosition = pos;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float uTime;
    uniform vec3 uColorPrimary;
    uniform vec3 uColorSecondary;

    void main() {
      // Wireframe / Grid lines
      float gridX = abs(sin(vUv.x * 60.0));
      float gridY = abs(sin(vUv.y * 30.0));
      float linePattern = smoothstep(0.95, 0.99, gridX) + smoothstep(0.95, 0.99, gridY);

      // Scanline passing through globe
      float scanline = smoothstep(0.0, 0.1, abs(sin(vPosition.y * 3.0 - uTime * 2.0)));
      
      // Color mixing
      vec3 finalColor = mix(uColorPrimary, uColorSecondary, clamp(vPosition.y + 1.0, 0.0, 1.0));
      float alpha = linePattern * 0.8 + (1.0 - scanline) * 0.4;

      // Rim light glow
      float rim = 1.0 - max(0.0, dot(vec3(0.0, 0.0, 1.0), vNormal));
      alpha += pow(rim, 3.0) * 0.6;

      gl_FragColor = vec4(finalColor, alpha);
    }
  `;

  return (
    <group>
      {/* Outer Wireframe Globe */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.2, 16]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent={true}
          wireframe={true}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Core Glowing Sphere */}
      <mesh scale={[1.8, 1.8, 1.8]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={isLight ? '#0284c7' : '#00f3ff'}
          transparent={true}
          opacity={0.1}
          wireframe={false}
        />
      </mesh>
    </group>
  );
};

// Parallax Starfield / Particle Cloud
const StarfieldParallax: React.FC<{ isLight: boolean }> = ({ isLight }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const particlesCount = 800;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 20;
      pos[i + 1] = (Math.random() - 0.5) * 20;
      pos[i + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={isLight ? '#0284c7' : '#00f3ff'}
        transparent={true}
        opacity={0.5}
        sizeAttenuation={true}
      />
    </points>
  );
};

interface HeroSectionProps {
  onNavigate: (page: PageId) => void;
  isLight: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, isLight }) => {
  return (
    <section className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden cyber-grid">
      
      {/* Background 3D Canvas */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <DataGlobeMesh isLight={isLight} />
          <StarfieldParallax isLight={isLight} />
        </Canvas>
      </div>

      {/* Cyber Ambient Localized Blur Spots */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#00f3ff]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#ff4d00]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full flex-1 flex flex-col justify-center">
        
        {/* Holographic Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full glass-panel border border-cyan-500/40 text-xs font-mono mb-6 self-start animate-pulse-glow">
          <span className="w-2 h-2 rounded-full bg-[#ff4d00]"></span>
          <span className="text-[#00f3ff] font-bold">MCP-2099 v4.0</span>
          <span className="text-slate-400">| 神经网络共识引擎就绪</span>
        </div>

        {/* Cinematic Title & Typography */}
        <div className="max-w-4xl mb-8">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05]">
            <span className="block text-slate-100">重塑未来工程</span>
            <span className="block bg-gradient-to-r from-[#00f3ff] via-cyan-300 to-[#ff4d00] bg-clip-text text-transparent glow-cyan">
              超能神经元矩阵
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-sans leading-relaxed">
            MCP-2099 是专为 2099 纪元构建的开源神经架构开发者平台。融合 WebGL 自定义量子 Shader、3D 大脑拓扑算力与实时去中心化智能合约协议。
          </p>
        </div>

        {/* CTA Interactive Action Buttons */}
        <div className="flex flex-wrap gap-4 items-center mb-16">
          <button
            onClick={() => onNavigate('dashboard')}
            className="group px-8 py-4 rounded-xl font-mono font-bold text-sm bg-gradient-to-r from-[#00f3ff] to-cyan-500 text-slate-950 shadow-[0_0_25px_rgba(0,243,255,0.4)] hover:shadow-[0_0_40px_rgba(0,243,255,0.7)] hover:scale-105 transition-all flex items-center space-x-3 active:scale-95"
          >
            <span>初始化控制台</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('neural')}
            className="px-8 py-4 rounded-xl font-mono font-bold text-sm glass-panel border border-cyan-500/40 text-[#00f3ff] hover:bg-cyan-500/10 hover:border-cyan-400 transition-all flex items-center space-x-3"
          >
            <Cpu className="w-4 h-4 text-[#ff4d00]" />
            <span>探索 AI 神经元内核</span>
          </button>

          <button
            onClick={() => onNavigate('protocol')}
            className="px-6 py-4 rounded-xl font-mono text-xs text-slate-400 hover:text-white transition-colors flex items-center space-x-2"
          >
            <Terminal className="w-4 h-4" />
            <span>查看协议规格说明书</span>
          </button>
        </div>

        {/* Telemetry Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
          <div className="glass-panel p-4 rounded-xl border border-cyan-500/20">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>全网处理算力</span>
              <Zap className="w-3.5 h-3.5 text-[#00f3ff]" />
            </div>
            <div className="text-xl font-bold font-mono text-white">409.8 PFLOPS</div>
            <div className="text-[10px] text-emerald-400 mt-1 font-mono">↑ 实时提升 14.2%</div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-cyan-500/20">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>活跃量子节点</span>
              <Database className="w-3.5 h-3.5 text-[#ff4d00]" />
            </div>
            <div className="text-xl font-bold font-mono text-white">12,480 节点</div>
            <div className="text-[10px] text-cyan-400 mt-1 font-mono">跨洲际低延时拓扑</div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-cyan-500/20">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>零知识证明耗时</span>
              <Lock className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-xl font-bold font-mono text-white">0.04 ms</div>
            <div className="text-[10px] text-[#00f3ff] mt-1 font-mono">量子加密级屏障</div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-cyan-500/20">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>共识校验成功率</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xl font-bold font-mono text-white">99.9999%</div>
            <div className="text-[10px] text-slate-400 mt-1 font-mono">容错机制运行中</div>
          </div>
        </div>

      </div>
    </section>
  );
};
