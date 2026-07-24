import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { Cpu, Activity, Zap, RefreshCw, Layers, Radio } from 'lucide-react';

// Custom 3D Brain Mesh Shader using Simplex Noise Sine Displacement & Vein Firing
const BrainMeshShader: React.FC<{ isLight: boolean }> = ({ isLight }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorCore: { value: new THREE.Color(isLight ? 0x0284c7 : 0x00f3ff) },
      uColorVein: { value: new THREE.Color(isLight ? 0xea580c : 0xff4d00) }
    }),
    [isLight]
  );

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.uTime.value = state.clock.getElapsedTime();
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
      meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.1;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float uTime;

    // Pseudo-simplex noise function
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 = v - i + dot(i, C.xxx) ;
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute( permute( permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      float n_ = 0.142857142857;
      vec3  ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      vUv = uv;
      vNormal = normal;
      vec3 pos = position;
      
      // Organic Brain Surface displacement
      float noiseVal = snoise(pos * 1.8 + vec3(uTime * 0.4));
      pos += normal * noiseVal * 0.35;
      
      vPosition = pos;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float uTime;
    uniform vec3 uColorCore;
    uniform vec3 uColorVein;

    void main() {
      // Branching vein pattern simulation
      float veinPattern = sin(vPosition.x * 12.0 + uTime * 2.0) * cos(vPosition.y * 12.0 - uTime * 1.5) * sin(vPosition.z * 12.0);
      veinPattern = smoothstep(0.4, 0.8, abs(veinPattern));

      // Neural firing pulse effect
      float pulse = sin(vPosition.y * 5.0 - uTime * 4.0) * 0.5 + 0.5;

      vec3 finalColor = mix(uColorCore, uColorVein, veinPattern * pulse);
      
      // Fresnel rim glow
      float rim = 1.0 - max(0.0, dot(vec3(0.0, 0.0, 1.0), vNormal));
      float alpha = 0.75 + pow(rim, 2.5) * 0.25;

      gl_FragColor = vec4(finalColor, alpha);
    }
  `;

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.8, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// 400 Orbiting Nodes with Physics Repulsion & Hover Light Up
const OrbitingNodesCloud: React.FC<{ isLight: boolean }> = ({ isLight }) => {
  const nodeCount = 400;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Initialize node positions & velocities for physics repulsion
  const nodeData = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const velocities: THREE.Vector3[] = [];
    const scales: number[] = [];
    const baseColor = new THREE.Color(isLight ? 0x0284c7 : 0x00f3ff);

    for (let i = 0; i < nodeCount; i++) {
      const radius = 2.4 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions.push(new THREE.Vector3(x, y, z));
      velocities.push(new THREE.Vector3((Math.random() - 0.5) * 0.005, (Math.random() - 0.5) * 0.005, (Math.random() - 0.5) * 0.005));
      scales.push(0.04 + Math.random() * 0.04);
    }

    return { positions, velocities, scales, baseColor };
  }, [isLight, nodeCount]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const activeColor = useMemo(() => new THREE.Color(isLight ? 0xea580c : 0xff4d00), [isLight]);

  useFrame(() => {
    if (!meshRef.current) return;

    // Apply simple repulsion between clumping nodes
    for (let i = 0; i < nodeCount; i++) {
      const p1 = nodeData.positions[i];

      // Orbit around center
      p1.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.003);

      // Pairwise repulsion logic
      for (let j = i + 1; j < nodeCount; j += 12) {
        const p2 = nodeData.positions[j];
        const dist = p1.distanceTo(p2);
        if (dist < 0.25) {
          const force = p1.clone().sub(p2).normalize().multiplyScalar(0.002);
          p1.add(force);
          p2.sub(force);
        }
      }

      dummy.position.copy(p1);
      const scale = hoveredIndex === i ? nodeData.scales[i] * 2.5 : nodeData.scales[i];
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Color hover light up
      if (hoveredIndex === i) {
        meshRef.current.setColorAt(i, activeColor);
      } else {
        meshRef.current.setColorAt(i, nodeData.baseColor);
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (e.instanceId !== undefined) {
      setHoveredIndex(e.instanceId);
    }
  };

  const handlePointerOut = () => {
    setHoveredIndex(null);
  };

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, nodeCount]}
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerOut}
    >
      <sphereGeometry args={[1, 12, 12]} />
      <meshBasicMaterial transparent opacity={0.85} />
    </instancedMesh>
  );
};

export const SentientCore: React.FC<{ isLight: boolean }> = ({ isLight }) => {
  const [learningRate, setLearningRate] = useState('0.0094');
  const [activeSynapses, setActiveSynapses] = useState('98,420,102');
  const [coreState, setCoreState] = useState<'IDLE' | 'COMPUTING' | 'OVERCLOCK'>('COMPUTING');

  return (
    <section className="min-h-screen pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-between cyber-grid">
      
      {/* Title & Telemetry Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-4 border-b border-cyan-500/30 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#00f3ff] mb-1">
            <Radio className="w-4 h-4 animate-pulse text-[#ff4d00]" />
            <span>AI NEURAL CORE // 神经网络原生引擎</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold font-mono tracking-tight text-white glow-cyan">
            SENTIENT_CORE (感知脑核)
          </h2>
        </div>

        {/* Status Pills */}
        <div className="flex items-center space-x-3 font-mono text-xs">
          <div className="glass-panel px-3 py-1.5 rounded-lg border border-cyan-500/30 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-slate-300">状态: </span>
            <span className="text-emerald-400 font-bold">{coreState}</span>
          </div>

          <div className="glass-panel px-3 py-1.5 rounded-lg border border-cyan-500/30">
            <span className="text-slate-400">算力吞吐: </span>
            <span className="text-[#00f3ff] font-bold">1.28 TFLOPS/s</span>
          </div>
        </div>
      </div>

      {/* Main Grid Section: 3D Brain Canvas + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1">
        
        {/* Left Column: 3D Brain WebGL Container */}
        <div className="lg:col-span-8 h-[480px] md:h-[580px] glass-panel-glow rounded-2xl relative overflow-hidden border border-cyan-500/40">
          
          {/* Canvas WebGL */}
          <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
            <ambientLight intensity={0.7} />
            <pointLight position={[5, 5, 5]} intensity={1.2} />
            <BrainMeshShader isLight={isLight} />
            <OrbitingNodesCloud isLight={isLight} />
          </Canvas>

          {/* Interactive Overlay Guidance */}
          <div className="absolute top-4 left-4 glass-panel px-3 py-1.5 rounded-md text-[11px] font-mono text-slate-300 pointer-events-none flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f3ff]"></span>
            <span>悬停于 400 个 3D 节点触发突触点亮</span>
          </div>

          {/* Holographic Bottom Coordinates */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[10px] font-mono text-slate-400 pointer-events-none border-t border-cyan-500/20 pt-2">
            <span>SIMPLEX_DISPLACEMENT: 0.35</span>
            <span>NEURON_NODES: 400_ACTIVE</span>
            <span>REFLEX_LATENCY: 0.12ms</span>
          </div>
        </div>

        {/* Right Column: Cyber Control & Telemetry Panel */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          
          {/* Card 1: Synaptic Firing Stats */}
          <div className="glass-panel p-5 rounded-xl border border-cyan-500/30">
            <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-300">
              <span className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-[#ff4d00]" />
                <span className="font-bold text-white">神经网络突触链路</span>
              </span>
              <span className="text-[#00f3ff]">LIVE</span>
            </div>
            
            <div className="text-3xl font-mono font-black text-white mb-2">{activeSynapses}</div>
            
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
              <div className="bg-gradient-to-r from-[#00f3ff] to-[#ff4d00] h-full w-[84%] animate-pulse"></div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              大脑核基于 3D 物理斥力演化算法，实时根据输入特征向量完成突触拓扑重构。
            </p>
          </div>

          {/* Card 2: Neural Hyperparameters */}
          <div className="glass-panel p-5 rounded-xl border border-cyan-500/30 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-2">
              <span className="flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-[#00f3ff]" />
                <span className="font-bold text-white">感知模型超参数</span>
              </span>
              <span className="text-slate-500">v99.2</span>
            </div>

            <div className="flex justify-between items-center text-xs font-mono py-1.5 border-b border-slate-800">
              <span className="text-slate-400">学习率 (Learning Rate):</span>
              <span className="text-[#00f3ff] font-bold">{learningRate}</span>
            </div>

            <div className="flex justify-between items-center text-xs font-mono py-1.5 border-b border-slate-800">
              <span className="text-slate-400">量子张量激活层:</span>
              <span className="text-white font-bold">1,024 Layers</span>
            </div>

            <div className="flex justify-between items-center text-xs font-mono py-1.5 border-b border-slate-800">
              <span className="text-slate-400">自适应梯度正则化:</span>
              <span className="text-emerald-400 font-bold">ADAM_QUANTUM</span>
            </div>

            <div className="flex justify-between items-center text-xs font-mono py-1.5">
              <span className="text-slate-400">模型收敛损失 (Loss):</span>
              <span className="text-[#ff4d00] font-bold">0.000412</span>
            </div>
          </div>

          {/* Card 3: Interactive Overclock & Re-tune Controls */}
          <div className="glass-panel p-5 rounded-xl border border-cyan-500/30">
            <h4 className="text-xs font-mono font-bold text-slate-300 mb-3 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-[#ff4d00]" />
              <span>感知内核调度干预</span>
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setCoreState('OVERCLOCK');
                  setLearningRate('0.0482');
                  setActiveSynapses('142,900,550');
                }}
                className="px-3 py-2.5 rounded-lg text-xs font-mono font-semibold bg-[#ff4d00]/20 text-[#ff4d00] border border-[#ff4d00]/50 hover:bg-[#ff4d00]/30 transition-all flex items-center justify-center space-x-1.5"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>超频调优</span>
              </button>

              <button
                onClick={() => {
                  setCoreState('COMPUTING');
                  setLearningRate('0.0094');
                  setActiveSynapses('98,420,102');
                }}
                className="px-3 py-2.5 rounded-lg text-xs font-mono font-semibold bg-cyan-500/20 text-[#00f3ff] border border-cyan-500/50 hover:bg-cyan-500/30 transition-all flex items-center justify-center space-x-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>重置节点</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
