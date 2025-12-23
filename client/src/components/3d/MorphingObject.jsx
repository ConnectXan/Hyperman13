import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { servicesConfig } from '../../data/servicesConfig';
import { useStore } from '../../hooks/useStore';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';
import { MeshTransmissionMaterial } from '@react-three/drei';
export function MorphingObject() {
    const meshRef = useRef();
    const { activeServiceId } = useStore();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = t * 0.1;
            meshRef.current.rotation.y = t * 0.2;
            meshRef.current.rotation.z = t * 0.1;

            const service = servicesConfig.find(s => s.id === activeServiceId);
            const targetColor = service ? new THREE.Color(service.color) : new THREE.Color(isDark ? '#333333' : '#dddddd');

            meshRef.current.material.color.lerp(targetColor, 0.1);
            meshRef.current.material.emissive.lerp(targetColor, 0.1);

            // Subtle pulsing effect on hover
            const pulse = activeServiceId ? 1.0 + Math.sin(t * 5) * 0.1 : 1.0;
            meshRef.current.scale.set(pulse, pulse, pulse);
        }
    });

    return (
        <mesh ref={meshRef}>
            <torusKnotGeometry args={[1.5, 0.4, 200, 32]} />
            <MeshTransmissionMaterial
                transmission={isDark ? 0.95 : 0.9}
                thickness={0.2}
                roughness={0.1}
                chromaticAberration={0.05}
                anisotropicBlur={0.1}
                distortion={0.1}
                distortionScale={0.1}
                temporalDistortion={0.2}
                iridescence={1}
                iridescenceIOR={1}
                iridescenceThicknessRange={[0, 1400]}
                emissiveIntensity={0.5}
            />
        </mesh>
    );
}
