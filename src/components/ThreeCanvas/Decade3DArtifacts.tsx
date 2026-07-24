import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshWobbleMaterial, Sparkles, Torus, Sphere, Box, Cone } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  decadeId: string;
}

export const Decade3DArtifacts: React.FC<Props> = ({ decadeId }) => {
  const groupRef = useRef<THREE.Group>(null);

  // 基础平滑自转动效
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {decadeId === '1970' && <Artifact1970 />}
      {decadeId === '1980' && <Artifact1980 />}
      {decadeId === '1990' && <Artifact1990 />}
      {decadeId === '2000' && <Artifact2000 />}
      {decadeId === '2010' && <Artifact2010 />}
      {decadeId === '2026' && <Artifact2026 />}
    </group>
  );
};

// 1970s: 迪特·拉姆斯复古博朗收音机/计算器工业体
const Artifact1970 = () => {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group scale={1.2}>
        {/* 主体机身：暖奶油色圆角方块 */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.2, 1.4, 0.6]} />
          <meshStandardMaterial color="#f5f0eb" roughness={0.3} metalness={0.1} />
        </mesh>

        {/* 铝拉丝前面板网格 */}
        <mesh position={[0.4, 0, 0.31]}>
          <planeGeometry args={[1.1, 1.1]} />
          <meshStandardMaterial color="#d4cecb" roughness={0.5} metalness={0.8} />
        </mesh>

        {/* 复古金属旋钮 1 */}
        <mesh position={[-0.5, 0.3, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.15, 32]} />
          <meshStandardMaterial color="#333333" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* 暖橙指示按键 */}
        <mesh position={[-0.5, -0.3, 0.35]}>
          <boxGeometry args={[0.3, 0.2, 0.12]} />
          <meshStandardMaterial color="#d97706" roughness={0.2} emissive="#b45309" emissiveIntensity={0.3} />
        </mesh>

        {/* 铬合金支架底座 */}
        <Torus args={[1.3, 0.04, 16, 64]} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.8, 0]}>
          <meshStandardMaterial color="#e5e7eb" roughness={0.1} metalness={0.95} />
        </Torus>
      </group>
    </Float>
  );
};

// 1980s: 孟菲斯后现代三维几何狂欢
const Artifact1980 = () => {
  return (
    <group scale={1.1}>
      {/* 中心霓虹粉圆锥体 */}
      <Float speed={3} rotationIntensity={0.8} floatIntensity={1.2}>
        <Cone args={[0.9, 1.8, 4]} position={[0, 0.2, 0]} rotation={[0.2, 0, 0.4]}>
          <meshStandardMaterial color="#ec4899" roughness={0.1} metalness={0.2} />
        </Cone>
      </Float>

      {/* 亮黄悬浮球体 */}
      <Float speed={4} rotationIntensity={0.5} floatIntensity={1.5}>
        <Sphere args={[0.45, 32, 32]} position={[-1.2, 0.6, 0.5]}>
          <meshStandardMaterial color="#eab308" roughness={0.1} />
        </Sphere>
      </Float>

      {/* 青色锯齿斑纹环 */}
      <Float speed={2} rotationIntensity={1} floatIntensity={0.8}>
        <Torus args={[1.2, 0.1, 16, 32]} position={[0, -0.4, -0.3]} rotation={[1.2, 0.5, 0]}>
          <meshStandardMaterial color="#06b6d4" roughness={0.3} metalness={0.4} />
        </Torus>
      </Float>

      {/* 80s 经典黑色斑点小立方体 */}
      <Float speed={2.5} floatIntensity={1.8}>
        <Box args={[0.4, 0.4, 0.4]} position={[1.1, -0.5, 0.6]} rotation={[0.5, 0.8, 0]}>
          <meshStandardMaterial color="#111827" roughness={0.4} />
        </Box>
      </Float>
    </group>
  );
};

// 1990s: Grunge 摇滚解构破碎 3D 矩阵
const Artifact1990 = () => {
  const shards = [
    { pos: [-0.6, 0.5, 0.2], rot: [0.4, 0.2, -0.5], scale: [0.8, 0.3, 0.1], color: '#64748b' },
    { pos: [0.7, -0.3, -0.4], rot: [-0.3, 0.6, 0.2], scale: [0.6, 0.9, 0.1], color: '#ef4444' },
    { pos: [-0.2, -0.6, 0.5], rot: [0.8, -0.4, 0.1], scale: [0.9, 0.4, 0.1], color: '#334155' },
    { pos: [0.4, 0.7, 0.1], rot: [-0.2, -0.5, 0.8], scale: [0.5, 0.5, 0.15], color: '#22c55e' },
  ];

  return (
    <group scale={1.2}>
      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
        {/* 中心碎裂的核心体 */}
        <Box args={[0.9, 0.9, 0.9]}>
          <MeshWobbleMaterial factor={0.6} speed={2} color="#1e293b" roughness={0.7} />
        </Box>
      </Float>

      {/* 散落围绕的解构矩阵板块 */}
      {shards.map((s, idx) => (
        <Float key={idx} speed={3 + idx * 0.5} floatIntensity={1.2} rotationIntensity={1}>
          <Box args={s.scale as [number, number, number]} position={s.pos as [number, number, number]} rotation={s.rot as [number, number, number]}>
            <meshStandardMaterial color={s.color} roughness={0.8} metalness={0.3} wireframe={idx % 2 === 0} />
          </Box>
        </Float>
      ))}
    </group>
  );
};

// 2000s: Skeuomorphic Aqua 模拟水滴高光玻璃球
const Artifact2000 = () => {
  return (
    <group scale={1.2}>
      {/* 外层 Aqua 超高清双层透明水滴球 */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        <Sphere args={[1.0, 64, 64]} position={[0, 0, 0]}>
          <meshPhysicalMaterial
            color="#3b82f6"
            transmission={0.85}
            opacity={1}
            transparent
            roughness={0.05}
            ior={1.4}
            thickness={1.2}
            specularIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.05}
          />
        </Sphere>
      </Float>

      {/* 内部波动的小型彩色凝胶核 */}
      <Float speed={4} floatIntensity={1}>
        <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]}>
          <MeshWobbleMaterial factor={0.5} speed={3} color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.5} roughness={0.1} />
        </Sphere>
      </Float>

      {/* 外围拉丝镀铬金属双环 */}
      <Torus args={[1.35, 0.05, 16, 64]} rotation={[1.1, 0.3, 0]}>
        <meshStandardMaterial color="#ffffff" metalness={0.95} roughness={0.1} />
      </Torus>
    </group>
  );
};

// 2010s: Material Design 极简扁平阴影色板叠放
const Artifact2010 = () => {
  return (
    <group scale={1.2}>
      {/* 底层深翡翠绿板 */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <Box args={[1.8, 1.2, 0.06]} position={[-0.2, -0.2, -0.3]} rotation={[0.2, 0.3, -0.1]}>
          <meshStandardMaterial color="#047857" roughness={0.4} />
        </Box>
      </Float>

      {/* 中层标准 Material 翠绿板 */}
      <Float speed={2} rotationIntensity={0.25} floatIntensity={0.5}>
        <Box args={[1.6, 1.0, 0.06]} position={[0, 0, 0]} rotation={[0.2, 0.3, -0.1]}>
          <meshStandardMaterial color="#10b981" roughness={0.2} />
        </Box>
      </Float>

      {/* 顶层高亮小卡片 */}
      <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.7}>
        <Box args={[0.7, 0.7, 0.08]} position={[0.3, 0.3, 0.3]} rotation={[0.2, 0.3, -0.1]}>
          <meshStandardMaterial color="#34d399" roughness={0.1} metalness={0.1} />
        </Box>
      </Float>
    </group>
  );
};

// 2026: VisionOS 空间计算悬浮玻璃与全息星云粒子
const Artifact2026 = () => {
  return (
    <group scale={1.1}>
      {/* 全息三维 Sparkles 动态粒子云 */}
      <Sparkles count={80} scale={4} size={3} speed={0.6} opacity={0.8} color="#c084fc" />

      {/* VisionOS 磨砂毛玻璃 Bento 悬浮卡 1 */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
        <Box args={[1.6, 1.1, 0.08]} position={[-0.2, 0.2, 0]} rotation={[0.1, -0.2, 0.05]}>
          <meshPhysicalMaterial
            color="#8b5cf6"
            transmission={0.9}
            opacity={1}
            transparent
            roughness={0.15}
            ior={1.2}
            thickness={0.5}
            clearcoat={1}
          />
        </Box>
      </Float>

      {/* 空间发光全息球 */}
      <Float speed={3} floatIntensity={1.2}>
        <Sphere args={[0.35, 32, 32]} position={[0.7, -0.3, 0.4]}>
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.8} roughness={0.1} />
        </Sphere>
      </Float>

      {/* 细光纤维空间拓扑环 */}
      <Torus args={[1.5, 0.02, 16, 100]} rotation={[0.8, 1.2, 0.5]}>
        <meshStandardMaterial color="#c084fc" emissive="#8b5cf6" emissiveIntensity={0.6} />
      </Torus>
    </group>
  );
};
