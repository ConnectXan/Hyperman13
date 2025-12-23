import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import { MorphingObject } from './MorphingObject';

import { useTheme } from '../../context/ThemeContext';

export function Experience() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            backgroundColor: isDark ? '#050505' : '#F9F7F0'
        }}>
            <Canvas
                dpr={[1, 2]}
                camera={{ position: [0, 0, 6], fov: 45 }}
                gl={{
                    antialias: true,
                    toneMappingExposure: isDark ? 1.8 : 1.0, // Back to 1.0 for natural beige
                    clearColor: isDark ? '#050505' : '#F9F7F0'
                }}
            >
                <Suspense fallback={null}>
                    <Environment preset={isDark ? "night" : "city"} /> {/* "city" often has more neutral/directional light */}

                    <ambientLight intensity={isDark ? 0.05 : 0.5} />

                    <pointLight position={[10, 10, 10]} intensity={isDark ? 1.5 : 3} color="#ffffff" />
                    <pointLight position={[-10, -5, -5]} intensity={isDark ? 0.5 : 1} color="#ffffff" />

                    <MorphingObject />

                    <ContactShadows
                        position={[0, -2, 0]}
                        opacity={isDark ? 0.3 : 0.4}
                        scale={15}
                        blur={2}
                        far={5}
                        resolution={256}
                        color={isDark ? "#000000" : "#5C5248"}
                    />
                    <EffectComposer>
                        <Bloom
                            luminanceThreshold={isDark ? 0.05 : 0.2}
                            luminanceSmoothing={0.9}
                            height={300}
                            intensity={isDark ? 1.2 : 1.0}
                        />
                        <DepthOfField
                            focusDistance={0.01}
                            focalLength={0.05}
                            bokehScale={isDark ? 5 : 2}
                        />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    );
}
