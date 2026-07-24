import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

// Holographic Ring GLSL Shader Component
const HolographicRingShader: React.FC<{ isLight: boolean }> = ({ isLight }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useRef({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(isLight ? 0x0284c7 : 0x00f3ff) },
    uAccent: { value: new THREE.Color(isLight ? 0xea580c : 0xff4d00) }
  });

  useEffect(() => {
    uniforms.current.uColor.value.set(isLight ? 0x0284c7 : 0x00f3ff);
    uniforms.current.uAccent.value.set(isLight ? 0xea580c : 0xff4d00);
  }, [isLight]);

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.current.uTime.value = state.clock.getElapsedTime();
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.4;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    void main() {
      vUv = uv;
      vPosition = position;
      vec3 pos = position;
      pos.z += sin(pos.x * 5.0 + uTime * 3.0) * 0.08;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    uniform vec3 uColor;
    uniform vec3 uAccent;

    void main() {
      float dist = length(vUv - vec2(0.5));
      float ring = smoothstep(0.35, 0.38, dist) - smoothstep(0.42, 0.45, dist);
      
      // Pulse & scanlines
      float scanline = sin(vUv.y * 120.0 + uTime * 10.0) * 0.15 + 0.85;
      float noise = sin(vUv.x * 40.0 + uTime * 6.0) * cos(vUv.y * 40.0 - uTime * 4.0);
      
      vec3 finalColor = mix(uColor, uAccent, noise * 0.5 + 0.5);
      float alpha = ring * scanline * 0.85;
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `;

  return (
    <mesh ref={meshRef}>
      <ringGeometry args={[1.6, 2.3, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        transparent={true}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

interface LoaderProps {
  onComplete: () => void;
  isLight: boolean;
}

export const CinematicLoader: React.FC<LoaderProps> = ({ onComplete, isLight }) => {
  const [progress, setProgress] = useState(0);
  const [scrambledText, setScrambledText] = useState('初始化 MCP-2099 内核...');
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const loaderSteps = [
    '加载量子协议算法 (QUANTUM_STATION_v4)',
    '解密 MCP-2099 神经元矩阵...',
    '构建 3D Simplex 算力拓扑网络...',
    '验证 2099 区块链共识校验码...',
    '系统链路初始化完毕：欢迎接入'
  ];

  useEffect(() => {
    let currentStep = 0;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        // Update Chinese decrypted status text
        const stepIndex = Math.floor((next / 100) * loaderSteps.length);
        if (stepIndex !== currentStep && stepIndex < loaderSteps.length) {
          currentStep = stepIndex;
          setScrambledText(loaderSteps[stepIndex]);
        }
        return next;
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setScrambledText('MCP-2099 神经元操作系统 // 就绪');
      
      const timer = setTimeout(() => {
        if (overlayRef.current) {
          gsap.to(overlayRef.current, {
            opacity: 0,
            scale: 1.05,
            duration: 0.9,
            ease: 'power3.inOut',
            onComplete: () => {
              onComplete();
            }
          });
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-colors duration-300 ${
        isLight ? 'bg-[#f0f4f8] text-slate-900' : 'bg-[#050505] text-[#00f3ff]'
      } scanlines`}
    >
      {/* Background WebGL 3D Canvas */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <HolographicRingShader isLight={isLight} />
        </Canvas>
      </div>

      {/* Central Content */}
      <div className="relative z-10 flex flex-col items-center max-w-lg px-6 text-center">
        {/* Holographic Logo Badge */}
        <div className="relative mb-8 flex items-center justify-center">
          <div className={`w-20 h-20 rounded-full border-2 border-dashed ${isLight ? 'border-sky-600' : 'border-[#00f3ff]'} animate-radar flex items-center justify-center`}>
          </div>
          <div className="absolute text-xl font-bold font-mono tracking-widest glow-cyan">
            MCP-99
          </div>
        </div>

        {/* System Decryption Title */}
        <div ref={textRef} className="h-10 text-sm md:text-base font-mono font-semibold tracking-wider text-center uppercase mb-6 px-4 py-2 glass-panel rounded-md border border-cyan-500/30">
          <span className="text-[#ff4d00] mr-2">&gt;</span>
          {scrambledText}
        </div>

        {/* Progress Bar Container */}
        <div className="w-80 max-w-full bg-slate-900/60 p-1 rounded-full border border-cyan-500/30 mb-3 shadow-[0_0_15px_rgba(0,243,255,0.2)]">
          <div
            className={`h-2.5 rounded-full transition-all duration-150 ${
              isLight ? 'bg-gradient-to-r from-sky-500 to-orange-500' : 'bg-gradient-to-r from-[#00f3ff] to-[#ff4d00]'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Numeric Telemetry */}
        <div className="flex justify-between w-80 text-xs font-mono text-slate-400">
          <span>核心模块: [ 0x88F_NEURAL ]</span>
          <span className={`font-bold ${isLight ? 'text-sky-600' : 'text-[#00f3ff]'}`}>{progress}%</span>
        </div>
      </div>

      {/* Footer Cyber Details */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between text-[10px] font-mono text-slate-500 tracking-widest border-t border-slate-800 pt-2">
        <span>MCP-2099 OS v99.4.0</span>
        <span>SECURITY_HASH: 0x99A_2099_NEURAL</span>
        <span>NEURAL LINK: ESTABLISHED</span>
      </div>
    </div>
  );
};
