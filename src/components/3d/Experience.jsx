import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { MorphingObject } from './MorphingObject';

export function Experience() {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
            {/* 
        dpr: Handle pixel ratio for sharp rendering on mobile
        camera: Set FOV and position
        gl: Enhance tone mapping for "premium" lighting
      */}
            <Canvas
                dpr={[1, 2]}
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ antialias: true, toneMappingExposure: 1.5 }}
            >
                <Suspense fallback={null}>
                    <Environment preset="city" /> {/* "City" preset gives nice reflections */}

                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

                    <MorphingObject />

                    {/* Shadows to ground the object */}
                    <ContactShadows resolution={1024} scale={10} blur={2.5} opacity={0.5} far={10} />
                </Suspense>
            </Canvas>
        </div>
    );
}
