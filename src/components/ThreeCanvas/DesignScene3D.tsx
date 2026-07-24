import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei';
import { Decade3DArtifacts } from './Decade3DArtifacts';

interface Props {
  decadeId: string;
  isLight?: boolean;
}

export const DesignScene3D: React.FC<Props> = ({ decadeId, isLight = false }) => {
  return (
    <div className="w-full h-full relative min-h-[300px] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={isLight ? 0.8 : 0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, -5, -2]} intensity={0.5} color="#8b5cf6" />
        <pointLight position={[0, 0, 3]} intensity={0.8} />

        <Suspense fallback={null}>
          <Decade3DArtifacts decadeId={decadeId} />

          <ContactShadows
            position={[0, -1.4, 0]}
            opacity={0.5}
            scale={6}
            blur={2.5}
            far={4}
          />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 1.6}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>

      {/* 3D 悬浮交互提示微型徽章 */}
      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider bg-black/40 backdrop-blur-md text-slate-300 border border-white/10 pointer-events-none flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        3D 拖拽可旋转视角
      </div>
    </div>
  );
};
